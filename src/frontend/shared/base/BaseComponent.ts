import { LitElement, PropertyValues } from 'lit';
import { ComponentMonitor } from '../../core/performance/component-monitor';

export class BaseComponent extends LitElement {
    protected monitor = ComponentMonitor.startMonitoring(this);

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.monitor.end();
    }

    protected override createRenderRoot(): ShadowRoot {
        const root = super.createRenderRoot() as ShadowRoot;
        root.addEventListener('keydown', ((e: Event) => {
            if (e instanceof KeyboardEvent) {
                this.handleKeyboardNavigation(e);
            }
        }) as EventListener);
        return root;
    }

    protected handleKeyboardNavigation(e: KeyboardEvent): void {
        // Default keyboard navigation
        if (e.key === 'Tab') {
            // Handle tab navigation
            const focusableElements = this.shadowRoot?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (focusableElements) {
                const elements = Array.from(focusableElements);
                if (elements.length > 0) {
                    const firstElement = elements[0] as HTMLElement;
                    const lastElement = elements[elements.length - 1] as HTMLElement;

                    if (e.shiftKey && document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    }

    protected dispatchCustomEvent<T>(name: string, detail: T): void {
        this.dispatchEvent(new CustomEvent(name, {
            detail,
            bubbles: true,
            composed: true
        }));
    }

    // Error handling without override
    protected handleError(error: Error, stack: string): void {
        console.error('Component Error:', error, stack);
        this.dispatchCustomEvent('component-error', { error, stack });
    }
}
