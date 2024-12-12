/**
 * Shared theme styles for system components using constructable stylesheets
 */

// Create shared stylesheet
const sharedStyles = new CSSStyleSheet();
sharedStyles.replaceSync(`
  /* Theme Variables */
  :host {
    /* Colors */
    --color-bg-primary: #1a1f2e;
    --color-bg-secondary: #242b3d;
    --color-text-primary: #ffffff;
    --color-text-secondary: #94a3b8;
    --color-border: rgba(255, 255, 255, 0.1);
    --color-success: #10B981;
    --color-error: #EF4444;
    --color-warning: #F59E0B;
    --color-info: #3B82F6;
    --color-metric: #0EA5E9;

    /* Layout */
    --system-layout-max-width: 1200px;
    --system-layout-padding: 2rem;
    --system-section-gap: 2rem;
    --system-card-gap: 1.5rem;

    /* Card */
    --system-card-bg: var(--color-bg-secondary);
    --system-card-radius: 12px;
    --system-card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --system-card-padding: 1.5rem;

    /* Typography */
    --system-font-family: system-ui, -apple-system, sans-serif;
    --system-mono-font: ui-monospace, monospace;
    --system-heading-size: 1.25rem;
    --system-title-size: 1rem;
    --system-text-size: 0.875rem;
    --system-mono-size: 0.875rem;

    /* Metrics */
    --system-metric-height: 60px;
    --system-metric-gap: 0.5rem;
    --system-metric-dot-size: 8px;
  }

  /* Base Styles */
  :host {
    display: block;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: var(--system-font-family);
    color: var(--color-text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--color-bg-primary);
  }

  /* Layout */
  .system-layout {
    width: 100%;
    max-width: var(--system-layout-max-width);
    margin: 0 auto;
    padding: var(--system-layout-padding);
    display: flex;
    flex-direction: column;
    gap: var(--system-section-gap);
  }

  /* Section */
  .system-section {
    display: flex;
    flex-direction: column;
    gap: var(--system-card-gap);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .section-title {
    font-size: var(--system-heading-size);
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
  }

  .section-info {
    color: var(--color-text-secondary);
    cursor: help;
  }

  /* Grid */
  .system-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--system-card-gap);
  }

  /* Card */
  .system-card {
    background: var(--system-card-bg);
    border-radius: var(--system-card-radius);
    box-shadow: var(--system-card-shadow);
    padding: var(--system-card-padding);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Status Header */
  .status-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .status-title {
    font-size: var(--system-title-size);
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
  }

  /* Status Badge */
  .system-status {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: var(--system-text-size);
    font-weight: 500;
    text-transform: capitalize;
  }

  .system-status::before {
    content: '';
    width: var(--system-metric-dot-size);
    height: var(--system-metric-dot-size);
    border-radius: 50%;
    background: currentColor;
  }

  .system-status-success {
    background: color-mix(in srgb, var(--color-success) 15%, transparent);
    color: var(--color-success);
  }

  .system-status-error {
    background: color-mix(in srgb, var(--color-error) 15%, transparent);
    color: var(--color-error);
  }

  .system-status-warning {
    background: color-mix(in srgb, var(--color-warning) 15%, transparent);
    color: var(--color-warning);
  }

  /* Status Details */
  .status-details {
    display: flex;
    flex-direction: column;
    gap: var(--system-metric-gap);
  }

  .status-metric {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  .status-metric:last-child {
    border-bottom: none;
  }

  .status-label {
    color: var(--color-text-secondary);
    font-size: var(--system-text-size);
  }

  .status-value {
    font-family: var(--system-mono-font);
    font-size: var(--system-mono-size);
    color: var(--color-text-primary);
  }

  /* Feature Toggle */
  .feature-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 6px;
    background: color-mix(in srgb, var(--color-info) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-info) 25%, transparent);
  }

  .feature-toggle[data-enabled="true"] {
    background: color-mix(in srgb, var(--color-success) 10%, transparent);
    border-color: color-mix(in srgb, var(--color-success) 25%, transparent);
  }

  .feature-icon {
    width: 16px;
    height: 16px;
    color: var(--color-text-secondary);
  }

  /* Performance Metrics */
  .metric-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .metric-value {
    font-family: var(--system-mono-font);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-metric);
  }

  .metric-label {
    font-size: var(--system-text-size);
    color: var(--color-text-secondary);
  }

  .metric-chart {
    width: 100%;
    height: var(--system-metric-height);
    background: color-mix(in srgb, var(--color-metric) 5%, transparent);
    border-radius: 6px;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    :host {
      --system-layout-padding: 1rem;
      --system-card-padding: 1rem;
      --system-section-gap: 1.5rem;
      --system-card-gap: 1rem;
    }

    .system-grid {
      grid-template-columns: 1fr;
    }
  }
`);

export { sharedStyles };
