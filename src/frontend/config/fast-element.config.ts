/**
 * @file Configuration for FAST Element and Fluent/Fabric web components
 * @module fast-element-config
 */

import {
  ButtonDefinition,
  SliderDefinition,
  FieldDefinition,
  TextAreaDefinition,
  LabelDefinition,
  TabsDefinition,
  TabPanelDefinition,
  TabDefinition,
  RadioDefinition,
  RadioGroupDefinition
} from '@fluentui/web-components';

import {
  CardDefinition,
  LoadingButtonDefinition
} from '@fabric-msft/fabric-web';

import { fabricLightTheme, setTheme } from '@fabric-msft/theme';
import { webLightTheme } from '@fluentui/tokens';

// Register Fluent components
ButtonDefinition.define(window.customElements);
SliderDefinition.define(window.customElements);
FieldDefinition.define(window.customElements);
TextAreaDefinition.define(window.customElements);
LabelDefinition.define(window.customElements);
TabsDefinition.define(window.customElements);
TabPanelDefinition.define(window.customElements);
TabDefinition.define(window.customElements);
RadioDefinition.define(window.customElements);
RadioGroupDefinition.define(window.customElements);

// Register Fabric components
CardDefinition.define(window.customElements);
LoadingButtonDefinition.define(window.customElements);

/**
 * Configures the design system by applying themes and base styles
 *
 * @remarks
 * This function handles:
 * - Applying Fluent theme tokens to the document root
 * - Setting up the Fabric light theme
 * - Configuring base typography and color styles
 *
 * @returns void
 */
export const configureDesignSystem = (): void => {
  // Apply Fluent theme tokens
  const root = document.documentElement;
  Object.entries(webLightTheme).forEach(([key, value]) => {
    root.style.setProperty(key, `${value}`);
  });

  // Apply Fabric theme
  setTheme(fabricLightTheme);

  // Add base styles
  root.style.setProperty('--base-font-family', '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif');
  root.style.setProperty('--base-font-size', '16px');
  root.style.setProperty('--base-font-weight', '400');
  root.style.setProperty('--neutral-foreground-rest', '#242424');
  root.style.setProperty('--neutral-fill-rest', '#ffffff');
  root.style.setProperty('--neutral-stroke-rest', '#e5e5e5');
};

/**
 * Initializes the FAST Element configuration
 *
 * @remarks
 * This is the main entry point for setting up the design system configuration
 *
 * @returns void
 */
export const initializeFastConfig = (): void => {
  configureDesignSystem();
};
