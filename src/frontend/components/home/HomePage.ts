import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { API_CONFIG } from '../../shared/config/api';

@customElement('home-page')
export class HomePage extends LitElement {
    @state() private systemStatus = {
        isLoading: true,
        isHealthy: false
    };

    static styles = css`
        :host {
            display: block;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .welcome-section {
            margin-bottom: 2rem;
        }

        h1 {
            color: var(--primary-color, #333);
            margin-bottom: 1rem;
            font-size: 2rem;
        }

        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .card {
            background: var(--surface-color, #fff);
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .card h2 {
            color: var(--primary-color, #333);
            margin-bottom: 1rem;
            font-size: 1.25rem;
        }

        .card ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .card li {
            margin-bottom: 0.5rem;
        }

        .card li:last-child {
            margin-bottom: 0;
        }

        a {
            color: var(--primary-color, #0066cc);
            text-decoration: none;
            transition: color 0.2s;
        }

        a:hover {
            color: var(--primary-hover-color, #0052a3);
            text-decoration: underline;
        }

        .status-indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 0.5rem;
        }

        .status-healthy { background: #4caf50; }
        .status-unhealthy { background: #f44336; }
        .status-loading {
            background: #ffd700;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
        }
    `;

    async connectedCallback() {
        super.connectedCallback();
        await this.checkSystemStatus();
    }

    async checkSystemStatus() {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/health`);
            const data = await response.json();
            this.systemStatus = {
                isLoading: false,
                isHealthy: data.status === 'ok'
            };
        } catch (e) {
            this.systemStatus = {
                isLoading: false,
                isHealthy: false
            };
        }
    }

    private getStatusIndicator() {
        if (this.systemStatus.isLoading) {
            return html`<span class="status-indicator status-loading"></span>Checking status...`;
        }
        return this.systemStatus.isHealthy
            ? html`<span class="status-indicator status-healthy"></span>Systems operational`
            : html`<span class="status-indicator status-unhealthy"></span>System issues detected`;
    }

    render() {
        return html`
            <div class="welcome-section">
                <h1>Welcome to Your Application</h1>
                <p>
                    This is your application dashboard. From here you can monitor system health,
                    access key features, and manage your application.
                </p>
            </div>

            <div class="card-grid">
                <div class="card">
                    <h2>System Status</h2>
                    <p>${this.getStatusIndicator()}</p>
                    <p>
                        Monitor the health and performance of your application's core systems.
                        Check connection status and more.
                    </p>
                    <p>
                        <a href="/system-status">View System Status →</a>
                    </p>
                </div>

                <div class="card">
                    <h2>Getting Started</h2>
                    <p>
                        Learn how to use and develop with this application.
                    </p>
                    <ul>
                        <li><a href="/docs/README.md">README</a></li>
                        <li><a href="/docs/ARCHITECTURE.md">Architecture Guide</a></li>
                        <li><a href="/docs/COMPONENTS.md">Component Guide</a></li>
                    </ul>
                </div>

                <div class="card">
                    <h2>Development</h2>
                    <ul>
                        <li><a href="/system-status">System Status</a></li>
                    </ul>
                </div>
            </div>
        `;
    }
}
