import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { API_CONFIG } from '../../shared/config/api';

interface SystemStatus {
  backend: boolean;
  apiVersion: string | null;
  lastChecked: string | null;
  database: {
    connected: boolean;
    latency: number | null;
    configured: boolean;
  };
  api: {
    responseTime: number | null;
    activeConnections: number | null;
  };
  system: {
    environment: string | null;
    nodeVersion: string | null;
    memoryUsage: number | null;
  };
  frontend: {
    buildVersion: string | null;
    memoryUsage: number | null;
    renderTime: number | null;
  };
}

@customElement('system-status-page')
export class SystemStatusPage extends LitElement {
  @state() private statuses: SystemStatus = {
    backend: false,
    apiVersion: null,
    lastChecked: null,
    database: {
      connected: false,
      latency: null,
      configured: false
    },
    api: {
      responseTime: null,
      activeConnections: null
    },
    system: {
      environment: null,
      nodeVersion: null,
      memoryUsage: null
    },
    frontend: {
      buildVersion: import.meta.env.VITE_APP_VERSION || 'dev',
      memoryUsage: null,
      renderTime: null
    }
  };

  static styles = css`
    .status-grid {
      display: grid;
      gap: 1rem;
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .status-section {
      margin-bottom: 2rem;
    }
    .status-section h2 {
      margin-bottom: 1rem;
      color: var(--primary-color, #333);
      font-size: 1.5rem;
    }
    .status-items {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
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
    .status-warning { background: #ff9800; }
    .metric-value {
      font-family: monospace;
      color: var(--primary-color, #666);
    }
  `;

  private startTime: number = 0;

  async connectedCallback() {
    super.connectedCallback();
    this.startTime = performance.now();
    await this.checkStatuses();
    // Refresh every 30 seconds
    setInterval(() => this.checkStatuses(), 30000);
  }

  private formatBytes(bytes: number | null): string {
    if (bytes === null) return 'N/A';
    const units = ['B', 'KB', 'MB', 'GB'];
    let value = bytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }
    return `${value.toFixed(2)} ${units[unitIndex]}`;
  }

  private formatTime(ms: number | null): string {
    if (ms === null) return 'N/A';
    return ms < 1000 ? `${ms.toFixed(2)}ms` : `${(ms/1000).toFixed(2)}s`;
  }

  async checkStatuses() {
    try {
      const start = performance.now();
      const healthCheck = await fetch(`${API_CONFIG.BASE_URL}/health`);
      const responseTime = performance.now() - start;
      const data = await healthCheck.json();

      // Update frontend metrics
      const frontendMemory = (performance as any).memory?.usedJSHeapSize;
      const renderTime = performance.now() - this.startTime;

      this.statuses = {
        backend: data.status === 'ok',
        apiVersion: data.version,
        lastChecked: new Date().toLocaleTimeString(),
        database: {
          connected: data.database?.connected ?? false,
          latency: data.database?.latency ?? null,
          configured: data.database?.configured ?? false
        },
        api: {
          responseTime: responseTime,
          activeConnections: data.connections?.active ?? null
        },
        system: {
          environment: data.environment ?? null,
          nodeVersion: data.nodeVersion ?? null,
          memoryUsage: data.memory?.heapUsed ?? null
        },
        frontend: {
          buildVersion: import.meta.env.VITE_APP_VERSION || 'dev',
          memoryUsage: frontendMemory ?? null,
          renderTime: renderTime
        }
      };
    } catch (e) {
      this.statuses.backend = false;
    }
  }

  render() {
    return html`
      <div class="status-grid">
        <h1>System Status</h1>

        <div class="status-section">
          <h2>Core Services</h2>
          <div class="status-items">
            <div class="status-item">
              <span class="status-indicator ${this.statuses.backend ? 'status-success' : 'status-error'}"></span>
              Backend Connection: ${this.statuses.backend ? 'Connected' : 'Disconnected'}
            </div>

            <div class="status-item">
              <span class="status-indicator ${this.statuses.database.configured ? (this.statuses.database.connected ? 'status-success' : 'status-error') : 'status-warning'}"></span>
              Database: ${this.statuses.database.configured ?
                (this.statuses.database.connected ? 'Connected' : 'Disconnected') :
                'Not Configured'}
              ${this.statuses.database.latency ? html`
                <br>
                <small>Latency: <span class="metric-value">${this.formatTime(this.statuses.database.latency)}</span></small>
              ` : ''}
            </div>
          </div>
        </div>

        <div class="status-section">
          <h2>Performance Metrics</h2>
          <div class="status-items">
            <div class="status-item">
              <h3>API Response Time</h3>
              <span class="metric-value">${this.formatTime(this.statuses.api.responseTime)}</span>
              ${this.statuses.api.activeConnections !== null ? html`
                <br>
                <small>Active Connections: <span class="metric-value">${this.statuses.api.activeConnections}</span></small>
              ` : ''}
            </div>

            <div class="status-item">
              <h3>Backend Memory Usage</h3>
              <span class="metric-value">${this.formatBytes(this.statuses.system.memoryUsage)}</span>
            </div>

            <div class="status-item">
              <h3>Frontend Memory Usage</h3>
              <span class="metric-value">${this.formatBytes(this.statuses.frontend.memoryUsage)}</span>
              <br>
              <small>Render Time: <span class="metric-value">${this.formatTime(this.statuses.frontend.renderTime)}</span></small>
            </div>
          </div>
        </div>

        <div class="status-section">
          <h2>Environment Information</h2>
          <div class="status-items">
            <div class="status-item">
              <h3>Versions</h3>
              <div>API: <span class="metric-value">${this.statuses.apiVersion || 'N/A'}</span></div>
              <div>Frontend: <span class="metric-value">${this.statuses.frontend.buildVersion || 'N/A'}</span></div>
              <div>Node.js: <span class="metric-value">${this.statuses.system.nodeVersion || 'N/A'}</span></div>
            </div>

            <div class="status-item">
              <h3>Environment</h3>
              <div>Mode: <span class="metric-value">${this.statuses.system.environment || 'N/A'}</span></div>
              <div>Last Updated: <span class="metric-value">${this.statuses.lastChecked || 'N/A'}</span></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
