import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { API_CONFIG } from '../../shared/config/api';

interface SystemStatus {
  backend: boolean;
  apiVersion: string | null;
  lastChecked: string | null;
}

@customElement('system-status-page')
export class SystemStatusPage extends LitElement {
  @state() private statuses: SystemStatus = {
    backend: false,
    apiVersion: null,
    lastChecked: null
  };

  static styles = css`
    .status-grid {
      display: grid;
      gap: 1rem;
      padding: 1rem;
    }
    .status-item {
      padding: 1rem;
      border-radius: 0.5rem;
      background: var(--surface-color, #fff);
      border: 1px solid #eee;
    }
    .status-indicator {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
    .status-success { background: #4caf50; }
    .status-error { background: #f44336; }
  `;

  async connectedCallback() {
    super.connectedCallback();
    await this.checkStatuses();
    // Refresh every 30 seconds
    setInterval(() => this.checkStatuses(), 30000);
  }

  async checkStatuses() {
    try {
      const healthCheck = await fetch(`${API_CONFIG.BASE_URL}/health`);
      const data = await healthCheck.json();

      this.statuses = {
        backend: data.status === 'ok',
        apiVersion: data.version,
        lastChecked: new Date().toLocaleTimeString()
      };
    } catch (e) {
      this.statuses.backend = false;
    }
  }

  render() {
    return html`
      <div class="status-grid">
        <h1>System Status</h1>
        
        <div class="status-item">
          <span class="status-indicator ${this.statuses.backend ? 'status-success' : 'status-error'}"></span>
          Backend Connection: ${this.statuses.backend ? 'Connected' : 'Disconnected'}
        </div>

        ${this.statuses.apiVersion ? html`
          <div class="status-item">
            API Version: ${this.statuses.apiVersion}
          </div>
        ` : ''}

        <div class="status-item">
          Last Checked: ${this.statuses.lastChecked}
        </div>
      </div>
    `;
  }
} 