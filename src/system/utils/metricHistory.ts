interface MetricHistory {
  value: number;
  timestamp: Date;
}

export class MetricHistoryManager {
  private history: MetricHistory[] = [];
  private maxPoints: number;
  private updateInterval: number;
  private intervalId: number | null = null;
  private baseValue: number;
  private volatility: number;
  private onUpdate: (history: MetricHistory[]) => void;

  constructor(
    baseValue: number,
    options: {
      maxPoints?: number;
      updateInterval?: number;
      volatility?: number;
      onUpdate: (history: MetricHistory[]) => void;
    },
  ) {
    this.baseValue = baseValue;
    this.maxPoints = options.maxPoints || 50;
    this.updateInterval = options.updateInterval || 5000;
    this.volatility = options.volatility || 0.1;
    this.onUpdate = options.onUpdate;

    // Initialize with some historical data
    const now = new Date();
    for (let i = this.maxPoints; i > 0; i--) {
      this.history.push({
        value: this.generateValue(),
        timestamp: new Date(now.getTime() - i * this.updateInterval),
      });
    }
  }

  private generateValue(): number {
    const variation = (Math.random() - 0.5) * 2 * this.volatility;
    const newValue = this.baseValue * (1 + variation);
    return Number(newValue.toFixed(2));
  }

  start(): void {
    if (this.intervalId) return;

    this.intervalId = window.setInterval(() => {
      this.history.push({
        value: this.generateValue(),
        timestamp: new Date(),
      });

      if (this.history.length > this.maxPoints) {
        this.history.shift();
      }

      this.onUpdate([...this.history]);
    }, this.updateInterval);
  }

  stop(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getHistory(): MetricHistory[] {
    return [...this.history];
  }

  getCurrentValue(): number {
    return this.history[this.history.length - 1]?.value ?? this.baseValue;
  }
}

// Example usage:
/*
const responseTimeHistory = new MetricHistoryManager(120, {
  maxPoints: 50,
  updateInterval: 5000,
  volatility: 0.1,
  onUpdate: (history) => {
    // Update component with new data
  }
});

responseTimeHistory.start();
*/
