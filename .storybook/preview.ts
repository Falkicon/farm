import { webLightTheme } from '@fluentui/tokens';
import {
  provideFluentDesignSystem,
  allComponents
} from '@fluentui/web-components';

// Initialize the design system
provideFluentDesignSystem().register(allComponents);

// Apply theme tokens
const root = document.documentElement;
Object.entries(webLightTheme).forEach(([key, value]) => {
  root.style.setProperty(`--${key}`, value);
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
};
