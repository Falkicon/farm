import { LitElement, PropertyValues } from 'lit';
import { ComponentMonitor, MonitorInstance } from '../../core/performance/component-monitor';

/**
 * Base component class that extends LitElement with common functionality
 *
 * @remarks
 * Provides shared functionality for all components including:
 * - Performance monitoring
 * - Keyboard navigation
 * - Error handling
 * - Custom event dispatching
 *
 * @example
 * ```typescript
 * class MyComponent extends BaseComponent {
 *   // Inherits all base functionality
 * }
 * ```
 *
 * @fires {CustomEvent} component-error - Fired when a component error occurs
 *
 * @category Core
 */
export class BaseComponent extends LitElement {
    /**
     * Performance monitoring instance for the component
     * @internal
     */
    protected monitor: MonitorInstance = ComponentMonitor.startMonitoring(this);

    /**
     * Lifecycle callback when component properties change
     * @param changedProperties - Map of changed properties with their previous values
     */
    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.monitor.end();
    }

    /**
     * Creates and configures the component's shadow root
     * @returns The configured shadow root with keyboard event listeners
     */
    protected override createRenderRoot(): ShadowRoot {
        const root = super.createRenderRoot() as ShadowRoot;
        root.addEventListener('keydown', ((e: Event) => {
            if (e instanceof KeyboardEvent) {
                this.handleKeyboardNavigation(e);
            }
        }) as EventListener);
        return root;
    }

    /**
     * Handles keyboard navigation within the component
     * @param e - Keyboard event to handle
     * @remarks
     * Implements circular tab navigation within focusable elements
     */
    protected handleKeyboardNavigation(e: KeyboardEvent): void {
        if (e.key === 'Tab') {
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

    /**
     * Dispatches a custom event with the specified name and detail
     * @param name - Name of the custom event
     * @param detail - Data to be included with the event
     * @typeParam T - Type of the event detail data
     */
    protected dispatchCustomEvent<T>(name: string, detail: T): void {
        this.dispatchEvent(new CustomEvent(name, {
            detail,
            bubbles: true,
            composed: true
        }));
    }

    /**
     * Handles component errors and dispatches error events
     * @param error - The error that occurred
     * @param stack - Error stack trace
     * @fires {CustomEvent} component-error
     */
    protected handleError(error: Error, stack: string): void {
        console.error('Component Error:', error, stack);
        this.dispatchCustomEvent('component-error', { error, stack });
    }
}
