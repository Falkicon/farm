import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { router } from '../router';

@customElement('app-shell')
export class AppShell extends LitElement {
    @state()
    private currentView: TemplateResult<1> = html``;

    static styles = css`
        :host {
            display: block;
            min-height: 100vh;
        }
        
        main {
            padding: 1rem;
            max-width: 1200px;
            margin: 0 auto;
        }
    `;

    async connectedCallback() {
        super.connectedCallback();
        await this.updateRoute(window.location.pathname);
        window.addEventListener('popstate', () => {
            void this.updateRoute(window.location.pathname);
        });
    }

    private async updateRoute(path: string) {
        const result = await router.resolve(path);
        if (result) {
            this.currentView = result as TemplateResult<1>;
        }
    }

    private async handleNavigation(event: Event) {
        event.preventDefault();
        const anchor = event.target as HTMLAnchorElement;
        const path = anchor.pathname;
        await this.updateRoute(path);
        history.pushState(null, '', path);
    }

    render() {
        return html`
            <main @click=${(e: Event) => {
                if ((e.target as HTMLElement).tagName === 'A') {
                    void this.handleNavigation(e);
                }
            }}>
                ${this.currentView}
            </main>
        `;
    }
} 