import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../components/MetricCard';
import '../components/Sparkline';
import type { SystemMetrics } from '../../backend/services/system-metrics';
import { metricsApi } from '../../frontend/shared/api/metrics';

/**
 * Error response structure for metrics API
 * @internal
 */
interface MetricsError {
  error: string;
  message: string;
  details?: unknown;
}

/**
 * System status dashboard component
 *
 * @remarks
 * Provides a real-time dashboard view of system metrics including CPU usage,
 * memory utilization, and service status. Automatically updates metrics
 * and displays historical data using sparklines.
 *
 * @example
 * ```html
 * <system-status-page></system-status-page>
 * ```
 *
 * @csspart dashboard - The main dashboard container
 * @csspart section - Individual metric section container
 * @csspart section-header - Section header with title
 * @csspart status-card - Individual status card
 * @csspart feature-list - List of system features
 *
 * @fires {CustomEvent} feature-toggle - When a feature is toggled
 * @fires {CustomEvent} metric-update - When metrics are updated
 *
 * @cssprop --color-bg-primary - Background color of the dashboard
 * @cssprop --color-text-primary - Primary text color
 * @cssprop --color-accent - Accent color for highlights
 * @cssprop --system-spacing-4 - Base spacing unit
 * @cssprop --system-radius-lg - Border radius for cards
 *
 * @category System
 */
@customElement('system-status-page')
export class SystemStatusPage extends LitElement {
  static override styles = css`
    /* CSS Custom Properties for consistent theming */
    :host {
      --font-size-base: 14px;
      --font-size-sm: 12px;
      --font-size-lg: 16px;
      --font-size-xl: 20px;

      --font-weight-normal: 400;
      --font-weight-medium: 500;
      --font-weight-bold: 600;

      --color-bg-base: var(--color-bg-primary);
      --color-bg-card: rgba(30, 41, 59, 0.6);
      --color-bg-card-hover: rgba(30, 41, 59, 0.7);
      --color-bg-header: rgba(255, 255, 255, 0.03);

      --spacing-base: var(--system-spacing-4);
      --border-radius: var(--system-radius-lg);

      display: block;
      padding: var(--spacing-base);
      color: var(--color-text-primary);
      background: var(--color-bg-base);
      min-height: 100vh;
      font-size: var(--font-size-base);
    }

    .dashboard {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: calc(var(--spacing-base) * 2);
      max-width: 1400px;
      margin: 0 auto;
      position: relative;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: calc(var(--spacing-base) * 1.25);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: calc(var(--spacing-base) * 0.5);
      margin-bottom: var(--spacing-base);
      padding: calc(var(--spacing-base) * 0.75);
      background: var(--color-bg-header);
      border-radius: var(--border-radius);
      position: relative;
    }

    .section-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
      margin: 0;
      opacity: 0.9;
    }

    .info-icon {
      color: var(--color-text-secondary);
      cursor: help;
      transition: color 0.2s;
      opacity: 0.6;
    }

    .info-icon:hover {
      color: var(--color-accent);
      opacity: 1;
    }

    .status-card {
      background: var(--color-bg-card);
      border-radius: var(--border-radius);
      padding: var(--spacing-base);
      border: 1px solid rgba(255, 255, 255, 0.03);
      transition: background-color 0.2s;
    }

    .status-card:hover {
      background: var(--color-bg-card-hover);
    }

    .status-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: calc(var(--spacing-base) * 0.5) 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .status-row:last-child {
      border-bottom: none;
    }

    .status-label {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
      display: flex;
      align-items: center;
      gap: calc(var(--spacing-base) * 0.5);
      opacity: 0.8;
    }

    .status-value {
      font-family: var(--system-font-mono);
      color: var(--color-text-primary);
      font-size: var(--font-size-base);
      transition: color 0.2s;
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: calc(var(--spacing-base) * 0.5);
    }

    .feature-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: calc(var(--spacing-base) * 0.75);
      background: var(--color-bg-card);
      border-radius: calc(var(--border-radius) * 0.75);
      transition: background-color 0.2s;
      cursor: pointer;
      outline: none;
    }

    .feature-item:focus-visible {
      box-shadow: 0 0 0 2px var(--color-accent);
    }

    .feature-name {
      display: flex;
      align-items: center;
      gap: calc(var(--spacing-base) * 0.5);
      font-size: var(--font-size-base);
    }

    .feature-status {
      font-size: var(--font-size-sm);
      padding: calc(var(--spacing-base) * 0.25) calc(var(--spacing-base) * 0.5);
      border-radius: var(--system-radius-full);
      transition: all 0.2s;
      font-weight: var(--font-weight-medium);
    }

    .status-enabled {
      color: var(--color-success);
      background: var(--color-success-light);
    }

    .status-warning {
      color: var(--color-warning);
      background: var(--color-warning-light);
    }

    .status-disabled {
      color: var(--color-error);
      background: var(--color-error-light);
    }

    .metric-value {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-accent);
      margin-bottom: calc(var(--spacing-base) * 0.5);
      display: flex;
      align-items: baseline;
      gap: calc(var(--spacing-base) * 0.5);
    }

    .metric-trend {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-normal);
      opacity: 0.6;
      margin-left: calc(var(--spacing-base) * 0.5);
    }

    .metric-trend-up {
      color: var(--color-error);
    }

    .metric-trend-down {
      color: var(--color-success);
    }

    .metric-label {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: calc(var(--spacing-base) * 0.5);
      opacity: 0.8;
    }

    .sparkline-container {
      height: 45px;
      margin: calc(var(--spacing-base) * 1.25) 0;
      position: relative;
    }

    system-sparkline {
      --sparkline-line-width: 1.5px;
      --sparkline-dot-size: 0px;
      --sparkline-line-color: var(--color-accent);
      --sparkline-fill-opacity: 0.1;
    }

    .sparkline-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 calc(var(--spacing-base) * 0.5);
      pointer-events: none;
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      opacity: 0.6;
    }

    .metric-details {
      margin-top: var(--spacing-base);
      padding-top: var(--spacing-base);
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .threshold-indicator {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: calc(var(--spacing-base) * 0.5);
    }

    .threshold-normal {
      background-color: var(--color-success);
    }

    .threshold-warning {
      background-color: var(--color-warning);
    }

    .threshold-critical {
      background-color: var(--color-error);
    }

    .tooltip {
      position: absolute;
      background: rgba(0, 0, 0, 0.85);
      color: white;
      padding: calc(var(--spacing-base) * 0.5) var(--spacing-base);
      border-radius: calc(var(--border-radius) * 0.75);
      font-size: var(--font-size-sm);
      z-index: 1000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .status-card:hover .tooltip {
      opacity: 1;
    }

    .error {
      background: var(--color-error-light);
      color: var(--color-error);
      padding: var(--spacing-base);
      border-radius: var(--border-radius);
      margin: var(--spacing-base);
      font-size: var(--font-size-base);
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      color: var(--color-text-secondary);
      font-size: var(--font-size-lg);
    }

    .sparkline-tooltip {
      position: absolute;
      background: rgba(0, 0, 0, 0.85);
      color: white;
      padding: calc(var(--spacing-base) * 0.5);
      border-radius: calc(var(--border-radius) * 0.5);
      font-size: var(--font-size-sm);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
      z-index: 1000;
    }

    @media (max-width: 1200px) {
      .dashboard {
        grid-template-columns: 1fr;
        gap: var(--spacing-base);
      }

      .dashboard::before,
      .dashboard::after {
        display: none;
      }

      :host {
        --font-size-xl: 18px;
        --spacing-base: var(--system-spacing-3);
      }
    }
  `;

  /**
   * Current system metrics data
   * @internal
   */
  @state()
  private metrics: SystemMetrics | null = null;

  /**
   * Historical metrics data
   * @internal
   */
  @state()
  private metricsHistory: SystemMetrics[] = [];

  /**
   * Error state for metrics loading
   * @internal
   */
  @state()
  private error: MetricsError | null = null;

  private updateInterval: number | undefined;
  private retryCount = 0;
  private readonly maxRetries = 3;

  constructor() {
    super();
    void this.fetchMetrics();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.startMetricsPolling();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.stopMetricsPolling();
  }

  private async fetchMetrics() {
    try {
      const data = await metricsApi.getCurrentMetrics();
      this.metrics = data;
      if (this.isValidMetricData(data)) {
        this.metricsHistory = [...this.metricsHistory, data].slice(-50);
      }
      this.error = null;
      this.retryCount = 0;
    } catch (err) {
      console.error('Error fetching metrics:', err);
      this.handleError(err);
    }
  }

  /**
   * Validates metric data for visualization
   * @param metrics - Metrics data to validate
   * @returns Whether the metrics data is valid
   * @private
   */
  private isValidMetricData(data: SystemMetrics): boolean {
    return Boolean(
      data &&
        typeof data.timestamp === 'string' &&
        data.services?.api?.responseTime !== undefined &&
        typeof data.services?.api?.responseTime === 'number' &&
        !isNaN(data.services.api.responseTime) &&
        data.memory?.usedPercent !== undefined &&
        typeof data.memory?.usedPercent === 'number' &&
        !isNaN(data.memory.usedPercent) &&
        data.cpu?.usage !== undefined &&
        typeof data.cpu?.usage === 'number' &&
        !isNaN(data.cpu.usage),
    );
  }

  private handleError(err: unknown) {
    try {
      const errorData = err instanceof Error ? JSON.parse(err.message) : null;
      if (errorData && typeof errorData === 'object') {
        this.error = errorData as MetricsError;
      } else {
        this.error = {
          error: 'Connection Error',
          message: err instanceof Error ? err.message : 'Failed to connect to metrics service',
        };
      }

      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        setTimeout(() => {
          void this.fetchMetrics();
        }, 1000 * this.retryCount);
      }
    } catch {
      this.error = {
        error: 'Connection Error',
        message: err instanceof Error ? err.message : 'Failed to connect to metrics service',
      };
    }
  }

  private startMetricsPolling() {
    this.updateInterval = window.setInterval(() => {
      void this.fetchMetrics();
    }, 5000);
  }

  private stopMetricsPolling() {
    if (this.updateInterval) {
      window.clearInterval(this.updateInterval);
      this.updateInterval = undefined;
    }
  }

  /**
   * Gets threshold class based on metric value
   * @param value - Current metric value
   * @param type - Type of metric
   * @returns CSS class name for threshold
   * @private
   */
  private getThresholdClass(value: number, type: 'cpu' | 'memory'): string {
    const thresholds = {
      cpu: { warning: 70, critical: 90 },
      memory: { warning: 80, critical: 95 },
    };

    const limits = thresholds[type];
    if (value >= limits.critical) return 'threshold-critical';
    if (value >= limits.warning) return 'threshold-warning';
    return 'threshold-normal';
  }

  /**
   * Calculates trend direction for a metric
   * @param current - Current metric value
   * @param history - Historical values
   * @returns Trend indicator string
   * @private
   */
  private calculateTrend(current: number, history: number[]): TemplateResult | '' {
    if (history.length < 2) return '';
    const previous = history[history.length - 2];
    const diff = current - previous;
    if (Math.abs(diff) < 0.1) return '';
    return diff > 0
      ? html`<span class="metric-trend metric-trend-up">↑${diff.toFixed(1)}%</span>`
      : html`<span class="metric-trend metric-trend-down">↓${Math.abs(diff).toFixed(1)}%</span>`;
  }

  private handleFeatureClick(name: string, enabled: boolean) {
    const event = new CustomEvent('feature-toggle', {
      detail: { name, enabled },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Handles sparkline hover events
   * @param e - Mouse event
   * @param data - Data points for the sparkline
   * @private
   */
  private handleSparklineHover(e: MouseEvent, data: { value: number; timestamp: Date }[]) {
    const container = e.currentTarget as HTMLElement;
    const tooltip = container.querySelector('.sparkline-tooltip') as HTMLElement;
    if (!tooltip) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const index = Math.floor((x / rect.width) * data.length);
    const point = data[Math.min(index, data.length - 1)];

    if (point) {
      tooltip.style.left = `${x}px`;
      tooltip.style.top = '-25px';
      tooltip.textContent = `${point.value.toFixed(2)} at ${point.timestamp.toLocaleTimeString()}`;
      tooltip.style.opacity = '1';
    }
  }

  /**
   * Handles sparkline mouse leave events
   * @private
   */
  private handleSparklineLeave(e: MouseEvent) {
    const container = e.currentTarget as HTMLElement;
    const tooltip = container.querySelector('.sparkline-tooltip') as HTMLElement;
    if (tooltip) {
      tooltip.style.opacity = '0';
    }
  }

  /**
   * Renders the system status dashboard
   * @returns Dashboard template with current metrics
   */
  protected override render() {
    if (this.error) {
      return html`
        <div class="error">
          <h2>${this.error.error}</h2>
          <p>${this.error.message}</p>
          ${this.error.details ? html` <pre>${JSON.stringify(this.error.details, null, 2)}</pre> ` : ''}
          ${this.retryCount < this.maxRetries
            ? html` <p>Retrying... (Attempt ${this.retryCount} of ${this.maxRetries})</p> `
            : html` <p>Max retries reached. Please refresh the page to try again.</p> `}
        </div>
      `;
    }

    if (!this.metrics) {
      return html`
        <div class="loading">
          <h2>Loading system metrics...</h2>
        </div>
      `;
    }

    const validHistory = this.metricsHistory.filter((m) => this.isValidMetricData(m));

    const cpuTrend = this.calculateTrend(
      this.metrics.cpu?.usage ?? 0,
      validHistory.map((m) => m.cpu?.usage ?? 0),
    );

    const memoryTrend = this.calculateTrend(
      this.metrics.memory?.usedPercent ?? 0,
      validHistory.map((m) => m.memory?.usedPercent ?? 0),
    );

    const apiResponseTimeData = validHistory
      .map((m) => ({
        value: m.services?.api?.responseTime ?? 0,
        timestamp: new Date(m.timestamp),
      }))
      .filter((d) => !isNaN(d.value) && d.timestamp instanceof Date);

    const memoryUsageData = validHistory
      .map((m) => ({
        value: Math.round(m.memory?.usedPercent ?? 0),
        timestamp: new Date(m.timestamp),
      }))
      .filter((d) => !isNaN(d.value) && d.timestamp instanceof Date);

    const cpuUsageData = validHistory
      .map((m) => ({
        value: Math.round(m.cpu?.usage ?? 0),
        timestamp: new Date(m.timestamp),
      }))
      .filter((d) => !isNaN(d.value) && d.timestamp instanceof Date);

    const responseTime = this.metrics.services?.api?.responseTime ?? 0;
    const memoryUsedPercent = this.metrics.memory?.usedPercent ?? 0;
    const cpuUsage = this.metrics.cpu?.usage ?? 0;
    const cpuTemp = this.metrics.cpu?.temperature ?? 0;
    const cpuCores = this.metrics.cpu?.cores ?? 0;
    const memoryTotal = this.metrics.memory?.total ?? 0;
    const memoryUsed = this.metrics.memory?.used ?? 0;
    const platform = this.metrics.system?.platform ?? 'Unknown';
    const dbConnected = this.metrics.services?.database?.connected ?? false;
    const dbLatency = this.metrics.services?.database?.latency;

    return html`
      <div class="dashboard" role="main">
        <section class="section" role="region" aria-label="Core Services Status">
          <div class="section-header">
            <h2 class="section-title">Core Services</h2>
            <span class="info-icon" title="Status of core system services">ⓘ</span>
          </div>

          <div class="status-card">
            <div class="status-row">
              <span class="status-label">
                <span class="threshold-indicator threshold-normal"></span>
                Backend Status
              </span>
              <span class="status-value status-enabled">CONNECTED</span>
            </div>
            <div class="status-row">
              <span class="status-label">API Version</span>
              <span class="status-value">1.0.0</span>
            </div>
            <div class="status-row">
              <span class="status-label">Environment</span>
              <span class="status-value">${platform}</span>
            </div>
            <div class="status-row">
              <span class="status-label">Last Updated</span>
              <span class="status-value">${new Date(this.metrics.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>

          <div class="status-card">
            <div class="status-row">
              <span class="status-label">
                <span class="threshold-indicator ${dbConnected ? 'threshold-normal' : 'threshold-critical'}"></span>
                Database Status
              </span>
              <span class="status-value ${dbConnected ? 'status-enabled' : 'status-disabled'}">
                ${dbConnected ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>
            <div class="status-row">
              <span class="status-label">Latency</span>
              <span class="status-value">
                ${dbLatency ?? 'N/A'}ms
                ${dbLatency && dbLatency > 100 ? html` <span class="tooltip">High latency detected</span> ` : ''}
              </span>
            </div>
          </div>
        </section>

        <section class="section" role="region" aria-label="API Features Status">
          <div class="section-header">
            <h2 class="section-title">API Features</h2>
            <span class="info-icon" role="tooltip" aria-label="Status of API features and middleware">ⓘ</span>
          </div>

          <div class="feature-list" role="list">
            ${this.renderFeature('cors', true)} ${this.renderFeature('helmet', true)}
            ${this.renderFeature('rateLimit', true)} ${this.renderFeature('multipart', false)}
            ${this.renderFeature('cache', true)} ${this.renderFeature('jwt', true)}
          </div>
        </section>

        <section class="section" role="region" aria-label="Performance Metrics">
          <div class="section-header">
            <h2 class="section-title">Performance Metrics</h2>
            <span class="info-icon" role="tooltip" aria-label="Real-time system performance metrics">ⓘ</span>
          </div>

          <div class="status-card">
            <div class="metric-value">
              ${responseTime.toFixed(2)}ms
              ${responseTime > 100
                ? html` <span class="tooltip" role="tooltip">Response time is higher than recommended</span> `
                : ''}
            </div>
            <div class="metric-label">API Response Time</div>
            <div
              class="sparkline-container"
              @mousemove="${(e: MouseEvent) => this.handleSparklineHover(e, apiResponseTimeData)}"
              @mouseleave="${this.handleSparklineLeave}"
            >
              <div class="sparkline-tooltip"></div>
              <system-sparkline .data="${apiResponseTimeData}" .unit="ms"></system-sparkline>
              <div class="sparkline-overlay">
                <span>Last 5m</span>
                <span>Now</span>
              </div>
            </div>
          </div>

          <div class="status-card">
            <div class="metric-value">
              <span class="threshold-indicator ${this.getThresholdClass(memoryUsedPercent, 'memory')}"></span>
              ${Math.round(memoryUsedPercent)}% ${memoryTrend}
            </div>
            <div class="metric-label">Memory Usage</div>
            <div class="sparkline-container">
              <system-sparkline .data="${memoryUsageData}" .unit="%"></system-sparkline>
              <div class="sparkline-overlay">
                <span>Last 5m</span>
                <span>Now</span>
              </div>
            </div>
            <div class="metric-details">
              <div class="status-row">
                <span class="status-label">Total</span>
                <span class="status-value">${this.formatBytes(memoryTotal)}</span>
              </div>
              <div class="status-row">
                <span class="status-label">Used</span>
                <span class="status-value">${this.formatBytes(memoryUsed)}</span>
              </div>
            </div>
          </div>

          <div class="status-card">
            <div class="metric-value">
              <span class="threshold-indicator ${this.getThresholdClass(cpuUsage, 'cpu')}"></span>
              ${Math.round(cpuUsage)}% ${cpuTrend}
            </div>
            <div class="metric-label">CPU Usage</div>
            <div class="sparkline-container">
              <system-sparkline .data="${cpuUsageData}" .unit="%"></system-sparkline>
              <div class="sparkline-overlay">
                <span>Last 5m</span>
                <span>Now</span>
              </div>
            </div>
            <div class="metric-details">
              <div class="status-row">
                <span class="status-label">Cores</span>
                <span class="status-value">${cpuCores}</span>
              </div>
              <div class="status-row">
                <span class="status-label">Temperature</span>
                <span class="status-value ${cpuTemp > 80 ? 'status-warning' : ''}">${cpuTemp}°C</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  private renderFeature(name: string, enabled: boolean) {
    return html`
      <div
        class="feature-item"
        role="listitem"
        tabindex="0"
        @click="${() => this.handleFeatureClick(name, enabled)}"
        @keydown="${(e: KeyboardEvent) => e.key === 'Enter' && this.handleFeatureClick(name, enabled)}"
        aria-label="${name} feature is ${enabled ? 'enabled' : 'disabled'}"
      >
        <div class="feature-name">
          <span class="threshold-indicator ${enabled ? 'threshold-normal' : 'threshold-critical'}"></span>
          <span>${name}</span>
        </div>
        <span class="feature-status ${enabled ? 'status-enabled' : 'status-disabled'}">
          ${enabled ? 'ENABLED' : 'DISABLED'}
        </span>
      </div>
    `;
  }

  /**
   * Formats byte values to human-readable string
   * @param bytes - Value in bytes
   * @returns Formatted string with appropriate unit
   * @private
   */
  private formatBytes(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let value = bytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }
    return `${value.toFixed(1)} ${units[unitIndex]}`;
  }
}
