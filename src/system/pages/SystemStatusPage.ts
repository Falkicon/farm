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

type TimeRange = '5m' | '15m' | '1h' | '24h';

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
    :host {
      /* Fluent Design System Variables */
      --fluent-font-family: "Segoe UI Variable", "Segoe UI", system-ui, sans-serif;

      /* Spacing & Layout */
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 12px;
      --spacing-lg: 16px;
      --spacing-xl: 24px;

      /* Border Radius */
      --radius-sm: 3px;
      --radius-md: 4px;
      --radius-lg: 6px;
      --radius-pill: 999px;

      /* Elevation & Shadows */
      --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.13), 0 1px 1px rgba(0, 0, 0, 0.11);
      --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.13), 0 2px 2px rgba(0, 0, 0, 0.11);
      --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.13), 0 4px 4px rgba(0, 0, 0, 0.11);

      /* Colors */
      --layer1-bg: rgb(28, 28, 28);
      --layer2-bg: rgb(32, 32, 32);
      --layer3-bg: rgb(36, 36, 36);
      --card-stroke: rgba(255, 255, 255, 0.08);
      --text-primary: rgba(255, 255, 255, 0.95);
      --text-secondary: rgba(255, 255, 255, 0.78);
      --text-tertiary: rgba(255, 255, 255, 0.54);

      /* Status Colors */
      --status-success: rgb(108, 203, 95);
      --status-warning: rgb(252, 225, 0);
      --status-error: rgb(255, 99, 97);
      --status-success-bg: rgba(108, 203, 95, 0.1);
      --status-warning-bg: rgba(252, 225, 0, 0.1);
      --status-error-bg: rgba(255, 99, 97, 0.1);

      /* Accent Colors */
      --accent-primary: rgb(96, 205, 255);
      --accent-secondary: rgb(0, 120, 212);

      /* Motion */
      --motion-duration-fast: 100ms;
      --motion-duration-normal: 200ms;
      --motion-duration-slow: 300ms;
      --motion-ease-standard: cubic-bezier(0.33, 0, 0.67, 1);

      display: block;
      padding: var(--spacing-xl);
      color: var(--text-primary);
      background: var(--layer1-bg);
      min-height: 100vh;
      font-family: var(--fluent-font-family);
    }

    .dashboard {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-lg);
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      grid-column: 1 / -1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
    }

    .dashboard-title {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      color: var(--text-primary);
    }

    .section {
      grid-column: auto / span 1;
    }

    .section-header {
      margin-bottom: var(--spacing-md);
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
      color: var(--text-secondary);
    }

    .time-range-selector {
      display: inline-flex;
      background: var(--layer2-bg);
      border-radius: var(--radius-md);
      padding: 2px;
      border: 1px solid var(--card-stroke);
      box-shadow: var(--shadow-sm);
      gap: 2px;
    }

    .time-range-button {
      background: none;
      border: none;
      color: var(--text-secondary);
      padding: 6px var(--spacing-md);
      border-radius: var(--radius-sm);
      font-size: 13px;
      cursor: pointer;
      transition: all var(--motion-duration-fast) var(--motion-ease-standard);
      min-width: 44px;
      font-family: inherit;
      line-height: 20px;
      height: 32px;
      position: relative;
      overflow: hidden;
    }

    .time-range-button:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.08);
    }

    .time-range-button.active {
      background: var(--accent-secondary);
      color: var(--text-primary);
      font-weight: 500;
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .feature-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm) var(--spacing-lg);
      background: var(--layer2-bg);
      border-radius: var(--radius-md);
      border: 1px solid var(--card-stroke);
      cursor: pointer;
      transition: all var(--motion-duration-normal) var(--motion-ease-standard);
      min-height: 40px;
      gap: var(--spacing-md);
    }

    .feature-item:hover {
      border-color: var(--accent-primary);
      box-shadow: var(--shadow-md);
      transform: translateY(-1px);
      background: var(--layer3-bg);
    }

    .feature-name {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: 13px;
      color: var(--text-primary);
    }

    .feature-status {
      font-size: 11px;
      padding: 3px var(--spacing-md);
      border-radius: var(--radius-sm);
      background: var(--layer3-bg);
      font-weight: 500;
      letter-spacing: 0.8px;
    }

    .status-enabled {
      color: var(--status-success);
    }

    .status-disabled {
      color: var(--status-error);
    }

    .status-card {
      background: var(--layer2-bg);
      border-radius: var(--radius-md);
      padding: var(--spacing-lg);
      border: 1px solid var(--card-stroke);
      box-shadow: var(--shadow-sm);
      transition: all var(--motion-duration-normal) var(--motion-ease-standard);
      margin-bottom: var(--spacing-md);
    }

    .status-card:last-child {
      margin-bottom: 0;
    }

    .status-card:hover {
      border-color: var(--accent-primary);
      box-shadow: var(--shadow-lg);
      transform: translateY(-1px);
    }

    .metric-value {
      font-size: 28px;
      line-height: 36px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: var(--spacing-xs);
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    /* Special case for connection status */
    .status-card .metric-value:first-child {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.5px;
    }

    .metric-trend {
      font-size: 12px;
      padding: 2px var(--spacing-sm);
      border-radius: var(--radius-sm);
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      height: 20px;
      margin-left: var(--spacing-xs);
      letter-spacing: 0.5px;
    }

    .metric-trend-up {
      color: var(--status-error);
      background: var(--status-error-bg);
    }

    .metric-trend-down {
      color: var(--status-success);
      background: var(--status-success-bg);
    }

    .status-label {
      color: var(--text-secondary);
      font-size: 13px;
      margin-bottom: var(--spacing-sm);
    }

    @media (max-width: 1200px) {
      .dashboard {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-md);
      }

      .section {
        grid-column: auto / span 1;
      }
    }

    @media (max-width: 768px) {
      .dashboard {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
      }

      .section {
        grid-column: 1 / -1;
      }

      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
      }

      :host {
        padding: var(--spacing-lg);
      }

      .time-range-selector {
        width: 100%;
      }

      .time-range-button {
        flex: 1;
        text-align: center;
      }
    }

    .sparkline-container {
      height: 60px;
      margin: var(--spacing-lg) 0;
      padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
      background: var(--layer1-bg);
      border-radius: var(--radius-md);
      position: relative;
      border: 1px solid var(--card-stroke);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .sparkline-tooltip {
      position: absolute;
      top: var(--spacing-sm);
      left: 50%;
      transform: translateX(-50%);
      background: var(--layer3-bg);
      padding: 4px var(--spacing-sm);
      border-radius: var(--radius-sm);
      font-size: 11px;
      color: var(--text-primary);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--motion-duration-fast) var(--motion-ease-standard);
      z-index: 1;
      border: 1px solid var(--card-stroke);
      white-space: nowrap;
    }

    system-sparkline {
      flex: 1;
      --sparkline-line-color: var(--accent-primary);
      --sparkline-fill-opacity: 0.1;
      --sparkline-dot-size: 4px;
    }

    .sparkline-overlay {
      position: absolute;
      bottom: var(--spacing-xs);
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 var(--spacing-md);
      font-size: 11px;
      color: var(--text-tertiary);
      font-weight: 500;
      letter-spacing: 0.3px;
      pointer-events: none;
    }

    .metric-details {
      margin-top: var(--spacing-lg);
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--card-stroke);
    }

    .status-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-xs) 0;
      min-height: 28px;
      gap: var(--spacing-lg);
    }

    .status-row:last-child {
      padding-bottom: 0;
    }

    .status-row:first-child {
      padding-top: 0;
    }

    .status-label {
      color: var(--text-secondary);
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .status-value {
      font-family: "Cascadia Code", Consolas, monospace;
      color: var(--text-primary);
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-feature-settings: "tnum" 1;
    }

    .threshold-indicator {
      width: 6px;
      height: 6px;
      border-radius: var(--radius-pill);
      flex-shrink: 0;
      position: relative;
    }

    .threshold-indicator::after {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: inherit;
      opacity: 0.5;
      transition: opacity var(--motion-duration-normal) var(--motion-ease-standard);
    }

    .threshold-indicator.normal {
      background: var(--status-success);
    }

    .threshold-indicator.normal::after {
      background: var(--status-success-bg);
    }

    .threshold-indicator.warning {
      background: var(--status-warning);
    }

    .threshold-indicator.warning::after {
      background: var(--status-warning-bg);
    }

    .threshold-indicator.critical {
      background: var(--status-error);
    }

    .threshold-indicator.critical::after {
      background: var(--status-error-bg);
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

  @state()
  private selectedTimeRange: TimeRange = '5m';

  private readonly timeRanges: readonly TimeRange[] = ['5m', '15m', '1h', '24h'] as const;

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
  private getThresholdClass(value: number, type: 'cpu' | 'memory'): 'normal' | 'warning' | 'critical' {
    const thresholds = {
      cpu: { warning: 70, critical: 90 },
      memory: { warning: 80, critical: 95 },
    };

    const limits = thresholds[type];
    if (value >= limits.critical) return 'critical';
    if (value >= limits.warning) return 'warning';
    return 'normal';
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

  private renderTimeRangeSelector() {
    return html`
      <div class="time-range-selector">
        ${this.timeRanges.map(
          (range) => html`
            <button
              class="time-range-button ${range === this.selectedTimeRange ? 'active' : ''}"
              @click="${() => this.handleTimeRangeChange(range)}"
            >
              ${range}
            </button>
          `
        )}
      </div>
    `;
  }

  private handleTimeRangeChange(range: TimeRange) {
    this.selectedTimeRange = range;
    // Implement time range filtering logic here
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
        <div class="dashboard-header">
          <h1 class="dashboard-title">System Status</h1>
          ${this.renderTimeRangeSelector()}
        </div>

        <section class="section" role="region" aria-label="Core Services Status">
          <div class="section-header">
            <h2 class="section-title">Core Services</h2>
          </div>

          <div class="status-card">
            ${this.renderMetricValue('CONNECTED', '', 'normal')}
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
            ${this.renderMetricValue(
              dbConnected ? 'CONNECTED' : 'DISCONNECTED',
              '',
              dbConnected ? 'normal' : 'critical'
            )}
            <div class="status-row">
              <span class="status-label">Latency</span>
              <span class="status-value">
                ${dbLatency ?? 'N/A'}ms
                ${dbLatency && dbLatency > 100 ? html`<span class="tooltip">High latency detected</span>` : ''}
              </span>
            </div>
          </div>
        </section>

        <section class="section" role="region" aria-label="API Features">
          <div class="section-header">
            <h2 class="section-title">API Features</h2>
          </div>
          <div class="feature-list">
            ${this.renderFeature('cors', true)}
            ${this.renderFeature('helmet', true)}
            ${this.renderFeature('rateLimit', true)}
            ${this.renderFeature('multipart', false)}
            ${this.renderFeature('cache', true)}
            ${this.renderFeature('jwt', true)}
          </div>
        </section>

        <section class="section" role="region" aria-label="Performance Metrics">
          <div class="section-header">
            <h2 class="section-title">Performance Metrics</h2>
          </div>

          <div class="status-card">
            ${this.renderMetricValue(`${responseTime.toFixed(2)}ms`)}
            <div class="status-label">API Response Time</div>
            ${this.renderSparklineWithTooltip(apiResponseTimeData, 'ms')}
          </div>

          <div class="status-card">
            ${this.renderMetricValue(
              `${Math.round(memoryUsedPercent)}%`,
              memoryTrend,
              this.getThresholdClass(memoryUsedPercent, 'memory')
            )}
            <div class="status-label">Memory Usage</div>
            ${this.renderSparklineWithTooltip(memoryUsageData, '%')}
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
            ${this.renderMetricValue(
              `${Math.round(cpuUsage)}%`,
              cpuTrend,
              this.getThresholdClass(cpuUsage, 'cpu')
            )}
            <div class="status-label">CPU Usage</div>
            ${this.renderSparklineWithTooltip(cpuUsageData, '%')}
            <div class="metric-details">
              <div class="status-row">
                <span class="status-label">Cores</span>
                <span class="status-value">${cpuCores}</span>
              </div>
              <div class="status-row">
                <span class="status-label">Temperature</span>
                <span class="status-value">${cpuTemp}°C</span>
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

  private renderSparklineWithTooltip(data: { value: number; timestamp: Date }[], unit: string) {
    return html`
      <div
        class="sparkline-container"
        @mousemove="${(e: MouseEvent) => this.handleSparklineHover(e, data)}"
        @mouseleave="${this.handleSparklineLeave}"
      >
        <div class="sparkline-tooltip"></div>
        <system-sparkline
          .data="${data}"
          .unit="${unit}"
          .showMinMax="${true}"
          .animate="${true}"
        ></system-sparkline>
        <div class="sparkline-overlay">
          <span>Last ${this.selectedTimeRange}</span>
          <span>Now</span>
        </div>
      </div>
    `;
  }

  private renderMetricValue(value: string | number, trend?: TemplateResult | '', indicator?: 'normal' | 'warning' | 'critical') {
    return html`
      <div class="metric-value">
        ${indicator ? html`<span class="threshold-indicator ${indicator}"></span>` : ''}
        <span>${value}</span>
        ${trend || ''}
      </div>
    `;
  }
}
