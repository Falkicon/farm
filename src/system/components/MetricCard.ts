import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './Sparkline';

/**
 * Represents a single data point in the metric history
 */
interface MetricHistory {
  value: number;
  timestamp: Date;
}

/**
 * System metric card component for displaying metric values with history
 *
 * @remarks
 * Displays a metric with its current value, trend indicator, and historical
 * data visualization using a sparkline. Supports various units and states.
 *
 * @example
 * ```html
 * <system-metric-card
 *   label="CPU Usage"
 *   value="45"
 *   unit="%"
 *   .history=${[
 *     { value: 42, timestamp: new Date('2024-01-01') },
 *     { value: 45, timestamp: new Date('2024-01-02') }
 *   ]}
 * >
 *   <span slot="subtitle">System Load</span>
 * </system-metric-card>
 * ```
 *
 * @csspart metric-card - The main card container
 * @csspart metric-content - The content wrapper
 * @csspart metric-header - The header section with label and status
 * @csspart metric-value - The main value display
 * @csspart sparkline-container - The container for the sparkline
 *
 * @slot subtitle - Optional subtitle content below the metric value
 *
 * @cssprop --system-radius-lg - Border radius for the card
 * @cssprop --system-spacing-6 - Padding for the card
 * @cssprop --system-font-size-2xl - Font size for the metric value
 * @cssprop --color-accent - Color for the metric value
 * @cssprop --color-text-secondary - Color for labels and subtitles
 *
 * @category Metrics
 */
@customElement('system-metric-card')
export class MetricCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .metric-card {
      background: linear-gradient(165deg, rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.6));
      border-radius: var(--system-radius-lg);
      padding: var(--system-spacing-6);
      border: 1px solid rgba(255, 255, 255, 0.03);
      transition: all var(--system-transition-base);
      position: relative;
      backdrop-filter: blur(8px);
    }

    .metric-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .metric-content {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--system-spacing-4);
    }

    .metric-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--system-spacing-4);
    }

    .metric-value {
      font-size: var(--system-font-size-2xl);
      font-weight: 600;
      color: var(--color-accent);
      text-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
      font-family: var(--system-font-mono);
      letter-spacing: -0.02em;
      display: flex;
      align-items: baseline;
      gap: var(--system-spacing-1);
    }

    .metric-label {
      font-size: var(--system-font-size-sm);
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 500;
      opacity: 0.8;
    }

    .unit {
      font-size: 0.8em;
      opacity: 0.8;
      font-weight: 500;
    }

    .subtitle {
      font-size: var(--system-font-size-sm);
      color: var(--color-text-secondary);
      margin-top: var(--system-spacing-2);
    }

    :host([disabled]) .metric-card {
      opacity: 0.5;
      filter: grayscale(1);
      pointer-events: none;
    }

    .sparkline-container {
      margin-top: var(--system-spacing-4);
      height: 40px;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: var(--system-spacing-2);
      padding: var(--system-spacing-1) var(--system-spacing-2);
      border-radius: var(--system-radius-full);
      font-size: var(--system-font-size-xs);
      background: var(--color-bg-secondary);
    }

    .status.up {
      color: var(--color-success);
      background: var(--color-success-light);
    }

    .status.down {
      color: var(--color-error);
      background: var(--color-error-light);
    }
  `;

  /**
   * Label text for the metric
   * @type {string}
   * @default ''
   */
  @property({ type: String })
  label = '';

  /**
   * Current value of the metric
   * @type {number}
   * @default 0
   */
  @property({ type: Number })
  value = 0;

  /**
   * Unit of measurement (e.g., '%', 'MB', 'ms')
   * @type {string}
   * @default ''
   */
  @property({ type: String })
  unit = '';

  /**
   * Whether the metric card is disabled
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Historical data points for the metric
   * @type {MetricHistory[]}
   * @default []
   */
  @property({ attribute: false })
  history: MetricHistory[] = [];

  /**
   * Calculates the trend direction based on historical data
   * @returns {'up' | 'down' | 'neutral'} The trend direction
   * @private
   */
  private getTrend(): 'up' | 'down' | 'neutral' {
    if (this.history.length < 2) return 'neutral';
    const last = this.history[this.history.length - 1].value;
    const prev = this.history[this.history.length - 2].value;
    return last > prev ? 'up' : last < prev ? 'down' : 'neutral';
  }

  /**
   * Renders the metric card component
   * @returns The metric card template with current value and trend
   */
  protected override render() {
    const trend = this.getTrend();

    return html`
      <div class="metric-card" data-trend="${trend}">
        <div class="metric-content">
          <div class="metric-header">
            <div class="metric-label">${this.label}</div>
            ${trend !== 'neutral'
              ? html` <div class="status ${trend}">${trend === 'up' ? '↑' : '↓'} ${trend}</div> `
              : ''}
          </div>
          <div class="metric-value">${this.value}<span class="unit">${this.unit}</span></div>
          <slot name="subtitle"></slot>
        </div>
        <div class="sparkline-container">
          <system-sparkline
            .data="${this.history}"
            .unit="${this.unit}"
            .trend="${trend}"
          ></system-sparkline>
        </div>
      </div>
    `;
  }
}
