import { css } from 'lit';

// Export the styles that can be used in components
export const styles = css`
    :host {
        display: block;
    }
`;

// Inject Tailwind styles into the document
// This is a common pattern for using Tailwind with Web Components
const tailwindStylesheet = document.createElement('link');
tailwindStylesheet.rel = 'stylesheet';
tailwindStylesheet.href = '/styles/tailwind.css'; // Adjust path based on your build output
document.head.appendChild(tailwindStylesheet); 