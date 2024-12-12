import { css } from 'lit';

export const systemStyles = css`
  :host {
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  :host(.system-component) {
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  .system-layout {
    width: 100%;
    max-width: var(--system-layout-max-width, 1200px);
    margin: 0 auto;
    padding: var(--system-layout-padding, 1rem);
    box-sizing: border-box;
    background: var(--system-layout-bg, transparent);
  }

  .system-grid {
    display: grid;
    grid-template-columns: repeat(var(--system-grid-columns, 12), 1fr);
    gap: var(--system-grid-gap, 1rem);
    width: 100%;
    box-sizing: border-box;
  }

  .system-card {
    grid-column: span var(--system-card-columns, 12);
    background: var(--system-card-bg, #fff);
    border-radius: var(--system-card-radius, 4px);
    box-shadow: var(--system-card-shadow, 0 2px 4px rgba(0,0,0,0.1));
    padding: var(--system-card-padding, 1rem);
    box-sizing: border-box;
  }

  .system-status {
    display: inline-flex;
    align-items: center;
    padding: var(--system-status-padding, 0.25rem 0.5rem);
    border-radius: var(--system-status-radius, 4px);
    font-size: var(--system-status-font-size, 0.875rem);
    font-weight: var(--system-status-font-weight, 500);
  }

  .system-status-success {
    background: var(--system-status-success-bg, #10B981);
    color: var(--system-status-success-color, white);
  }

  .system-status-error {
    background: var(--system-status-error-bg, #EF4444);
    color: var(--system-status-error-color, white);
  }

  .system-status-warning {
    background: var(--system-status-warning-bg, #F59E0B);
    color: var(--system-status-warning-color, white);
  }
`;
