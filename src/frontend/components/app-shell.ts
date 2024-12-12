import { LitElement, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { router } from '../router';

@customElement('app-shell')
export class AppShell extends LitElement {
    @state()
    private currentView: TemplateResult = html``;

    // Use Light DOM for consistent style inheritance
    protected override createRenderRoot() {
        return this;
    }

    override async connectedCallback() {
        super.connectedCallback();
        await this.updateRoute(window.location.pathname);
        window.addEventListener('popstate', () => {
            void this.updateRoute(window.location.pathname);
        });

        // Handle navigation clicks
        window.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');
            if (anchor && anchor.href.startsWith(window.location.origin)) {
                e.preventDefault();
                const path = anchor.pathname;
                void this.updateRoute(path);
                history.pushState(null, '', path);
            }
        });
    }

    private async updateRoute(path: string) {
        try {
            const view = await router.resolve(path);
            this.currentView = view ?? html`<h1>Page Not Found</h1>`;
        } catch (error) {
            console.error('Navigation error:', error);
            this.currentView = html`<h1>Error: Page Not Found</h1>`;
        }
    }

    protected override render() {
        return html`
            <div class="app-shell">
                <main-nav class="main-nav"></main-nav>
                <main>${this.currentView}</main>
            </div>
        `;
    }
}
