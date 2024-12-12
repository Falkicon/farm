import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './Sparkline';

interface MetricHistory {
  value: number;
  timestamp: Date;
}

@customElement('system-metric-card')
export class MetricCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .metric-card {
      background: linear-gradient(
        165deg,
        rgba(30, 41, 59, 0.8),
        rgba(30, 41, 59, 0.6)
      );
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

  @property({ type: String })
  label = '';

  @property({ type: Number })
  value = 0;

  @property({ type: String })
  unit = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ attribute: false })
  history: MetricHistory[] = [];

  private getTrend(): 'up' | 'down' | 'neutral' {
    if (this.history.length < 2) return 'neutral';
    const last = this.history[this.history.length - 1].value;
    const prev = this.history[this.history.length - 2].value;
    return last > prev ? 'up' : last < prev ? 'down' : 'neutral';
  }

  protected override render() {
    const trend = this.getTrend();

    return html`
      <div class="metric-card" data-trend="${trend}">
        <div class="metric-content">
          <div class="metric-header">
            <div class="metric-label">${this.label}</div>
            ${trend !== 'neutral' ? html`
              <div class="status ${trend}">
                ${trend === 'up' ? '↑' : '↓'} ${trend}
              </div>
            ` : ''}
          </div>
          <div class="metric-value">
            ${this.value}<span class="unit">${this.unit}</span>
          </div>
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
