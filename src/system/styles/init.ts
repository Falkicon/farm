// Import CSS files as strings
import themeStyles from './theme.css?inline';
import componentStyles from './components.css?inline';
import layoutStyles from './layouts.css?inline';

// Initialize system styles
export function initializeSystemStyles(): void {
  const STYLE_ID = 'system-styles';

  // Only initialize once
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  // Create style element
  const styleSheet = document.createElement('style');
  styleSheet.id = STYLE_ID;

  // Add styles in order of specificity
  styleSheet.textContent = `
    /* Theme Variables */
    ${themeStyles}

    /* Component Base Styles */
    ${componentStyles}

    /* Layout Styles */
    ${layoutStyles}
  `;

  // Insert at the beginning of head to ensure proper cascade
  document.head.insertBefore(styleSheet, document.head.firstChild);
}
