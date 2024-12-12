import { css } from 'lit';

export const statusStyles = css`
  :host {
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  .status-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--system-status-header-margin, 0.5rem);
  }

  .status-title {
    font-size: var(--system-status-title-size, 1rem);
    font-weight: var(--system-status-title-weight, 500);
    margin: 0;
    color: var(--system-status-title-color, inherit);
  }

  .status-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .status-metric {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
    border-bottom: 1px solid var(--system-status-metric-border, rgba(0,0,0,0.1));
  }

  .status-metric:last-child {
    border-bottom: none;
  }

  .status-label {
    color: var(--system-status-label-color, #6B7280);
    font-size: var(--system-status-label-size, 0.875rem);
  }

  .status-value {
    font-family: var(--system-status-value-font, monospace);
    font-size: var(--system-status-value-size, 0.875rem);
    color: var(--system-status-value-color, inherit);
  }

  /* System grid overrides for status layout */
  .system-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
  }

  .system-card {
    background: var(--system-card-bg, #1a1f2e);
    color: var(--system-card-color, #fff);
  }
`;
