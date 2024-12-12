import { LitElement } from 'lit';

/**
 * Metrics collected for component performance monitoring
 */
export interface ComponentMetrics {
    renderTime: number;
    firstPaint: number;
    memoryUsage?: number;
    elementCount?: number;
}

/**
 * Return type for the monitoring instance
 */
export interface MonitorInstance {
    end: () => ComponentMetrics;
}

/**
 * Monitors component performance and collects metrics
 * @category Performance
 */
export class ComponentMonitor {
    private static metrics = new Map<string, ComponentMetrics[]>();

    /**
     * Starts monitoring a component's performance
     * @param component - The component to monitor
     * @returns A monitoring instance with an end method
     */
    static startMonitoring(component: LitElement): MonitorInstance {
        const start = performance.now();
        const name = component.constructor.name;

        return {
            end: () => {
                const metrics: ComponentMetrics = {
                    renderTime: performance.now() - start,
                    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
                    elementCount: component.shadowRoot?.childElementCount,
                };

                if (!this.metrics.has(name)) {
                    this.metrics.set(name, []);
                }
                this.metrics.get(name)?.push(metrics);

                // Report to analytics if threshold exceeded
                if (metrics.renderTime > 16.67) { // 60fps threshold
                    console.warn(`Slow render detected in ${name}: ${metrics.renderTime}ms`);
                }

                return metrics;
            }
        };
    }

    /**
     * Gets metrics for a specific component
     * @param componentName - Name of the component
     * @returns Array of collected metrics
     */
    static getMetrics(componentName: string): ComponentMetrics[] {
        return this.metrics.get(componentName) || [];
    }

    /**
     * Clears all collected metrics
     */
    static clearMetrics(): void {
        this.metrics.clear();
    }
}
