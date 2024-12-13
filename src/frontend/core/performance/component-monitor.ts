import type { BaseComponent } from '../../shared/base/BaseComponent';

/**
 * Interface for monitoring component performance
 */
export interface MonitorInstance {
  /**
   * Ends the monitoring session and records performance metrics
   */
  end(): void;
}

/**
 * Utility class for monitoring component performance
 */
export class ComponentMonitor {
  /**
   * Starts monitoring a component's performance
   * @param component - The component to monitor
   * @returns A monitor instance
   */
  static startMonitoring(component: BaseComponent): MonitorInstance {
    const startTime = performance.now();
    const componentName = component.constructor.name;

    return {
      end() {
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Log performance metrics
        console.debug(`Component ${componentName} rendered in ${duration.toFixed(2)}ms`);
      },
    };
  }
}
