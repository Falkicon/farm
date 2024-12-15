// Import all available exports to check what's actually there
import {
    ButtonDefinition,
    FieldDefinition,
    SliderDefinition,
    LinkDefinition,
    CheckboxDefinition
} from '@fluentui/web-components';

import {
    LoadingButton,
    ButtonDefinition as FabricButtonDefinition
} from '@fabric-msft/fabric-web';

import {
    setTheme,
    fabricLightTheme
} from '@fabric-msft/theme';

// Document available exports
export const fluentExports = {
    // Component Definitions
    ButtonDefinition,
    FieldDefinition,
    SliderDefinition,
    LinkDefinition,
    CheckboxDefinition
};

export const fabricExports = {
    // Component Definitions
    LoadingButton,
    ButtonDefinition: FabricButtonDefinition,

    // Theme utilities
    setTheme,
    fabricLightTheme
};

// Export component types
export type {
    ButtonDefinition as FluentButtonDefinition,
    FieldDefinition as FluentFieldDefinition,
    SliderDefinition as FluentSliderDefinition,
    LinkDefinition as FluentLinkDefinition,
    CheckboxDefinition as FluentCheckboxDefinition
} from '@fluentui/web-components';

export type {
    LoadingButton as FabricLoadingButton,
    ButtonDefinition as FabricButtonDefinition
} from '@fabric-msft/fabric-web';

// Re-export theme utilities
export { setTheme, fabricLightTheme } from '@fabric-msft/theme';
