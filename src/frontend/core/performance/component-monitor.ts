import { LitElement } from 'lit';

interface ComponentMetrics {
    renderTime: number;
    firstPaint: number;
    memoryUsage?: number;
    elementCount?: number;
}

export class ComponentMonitor {
    private static metrics = new Map<string, ComponentMetrics[]>();

    static startMonitoring(component: LitElement) {
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

    static getMetrics(componentName: string): ComponentMetrics[] {
        return this.metrics.get(componentName) || [];
    }

    static clearMetrics(): void {
        this.metrics.clear();
    }
} 