/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// Import Fluent components
import {
    ButtonDefinition,
    CheckboxDefinition,
    DialogDefinition,
    DividerDefinition,
    LabelDefinition,
    MenuDefinition,
    ProgressBarDefinition,
    RadioDefinition,
    RadioGroupDefinition,
    SliderDefinition,
    SpinnerDefinition,
    SwitchDefinition,
    TabsDefinition,
    TabDefinition,
    TabPanelDefinition,
    FieldDefinition,
} from '@fluentui/web-components';

// Import Fabric components
import {
    AccordionMenuItemDefinition,
    AccordionMenuDefinition,
    CardDefinition,
    CarouselDefinition,
    FilterPillDefinition,
    LoadingButtonDefinition,
    MenuItemDefinition,
    MenuListDefinition,
    MenuDefinition as FabricMenuDefinition,
    MultiViewGroupDefinition,
    PopoverDefinition,
    SvgIconDefinition,
    TableCellDefinition,
    TableDefinition,
    TeachingBubbleDefinition,
    TooltipDefinition,
    WizardPanelDefinition,
    WizardStepDefinition,
    WizardDefinition,
} from '@fabric-msft/fabric-web';

// Import theme
import { setTheme, fabricLightTheme } from "@fabric-msft/theme";

// Define interfaces
interface FluentDialog extends HTMLElement {
    show: () => void;
    hide: () => void;
    showModal: () => void;
}

interface FabricLoadingButton extends HTMLElement {
    loading: boolean;
}

// Register Fluent components
[
    ButtonDefinition,
    CheckboxDefinition,
    DialogDefinition,
    DividerDefinition,
    LabelDefinition,
    MenuDefinition,
    ProgressBarDefinition,
    RadioDefinition,
    RadioGroupDefinition,
    SliderDefinition,
    SpinnerDefinition,
    SwitchDefinition,
    TabsDefinition,
    TabDefinition,
    TabPanelDefinition,
    FieldDefinition,
].forEach(def => def.define(window.customElements));

// Register Fabric components
[
    AccordionMenuItemDefinition,
    AccordionMenuDefinition,
    CardDefinition,
    CarouselDefinition,
    FilterPillDefinition,
    LoadingButtonDefinition,
    MenuItemDefinition,
    MenuListDefinition,
    FabricMenuDefinition,
    MultiViewGroupDefinition,
    PopoverDefinition,
    SvgIconDefinition,
    TableCellDefinition,
    TableDefinition,
    TeachingBubbleDefinition,
    TooltipDefinition,
    WizardPanelDefinition,
    WizardStepDefinition,
    WizardDefinition,
].forEach(def => def.define(window.customElements));

// Set theme
setTheme(fabricLightTheme);

const customStyles = `
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
    }

    #app {
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }

    .component-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1px;
      background: #e0e0e0;
      width: 100%;
      padding: 1px;
    }

    .component-cell {
      padding: 24px;
      background: white;
      display: flex;
      flex-direction: column;
      min-height: 180px;
    }

    .component-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #323130;
      padding-bottom: 8px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-family: 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
    }

    .component-type {
      font-size: 12px;
      font-weight: normal;
      color: #605e5c;
      text-transform: none;
      letter-spacing: normal;
    }

    .component-demo {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
      justify-content: center;
    }

    /* Ensure proper spacing for specific components */
    fluent-button, fabric-button {
      margin: 4px 0;
    }

    fluent-dialog, fabric-dialog {
      margin: 0;
    }
  </style>
`;

const appDiv = document.getElementById('app');
if (!appDiv) {
    throw new Error('Could not find app element');
}

appDiv.innerHTML = `
${customStyles}
<div class="component-grid">
    <!-- Fluent Components -->

    <!-- Button -->
    <div class="component-cell">
        <div class="component-title">
            Button
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-button appearance="primary" style="padding: 0 8px;" >Primary Button</fluent-button>
            <fluent-button appearance="neutral" style="padding: 0 8px;">Neutral Button</fluent-button>
            <fluent-button appearance="neutral" style="padding: 0 8px;">Neutral Button</fluent-button>
        </div>
    </div>

    <!-- Checkbox -->
    <div class="component-cell">
        <div class="component-title">
            Checkbox
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-checkbox>Check me</fluent-checkbox>
        </div>
    </div>

    <!-- Dialog -->
    <div class="component-cell">
        <div class="component-title">
            Dialog
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-button id="openDialog">Open Dialog</fluent-button>
            <fluent-dialog id="dialog" modal="true" trap-focus="true" aria-label="Simple dialog">
                <div style="padding: 20px;">
                    <h2>Dialog Title</h2>
                    <p>Dialog content goes here.</p>
                    <fluent-button id="closeDialog">Close</fluent-button>
                </div>
            </fluent-dialog>
        </div>
    </div>

    <!-- Divider -->
    <div class="component-cell">
        <div class="component-title">
            Divider
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-divider></fluent-divider>
        </div>
    </div>

    <!-- Label -->
    <div class="component-cell">
        <div class="component-title">
            Label
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-label>Sample Label</fluent-label>
        </div>
    </div>

    <!-- Menu -->
    <div class="component-cell">
        <div class="component-title">
            Menu
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-menu>
                <fluent-menu-item>Item 1</fluent-menu-item>
                <fluent-menu-item>Item 2</fluent-menu-item>
            </fluent-menu>
        </div>
    </div>

    <!-- Progress Bar -->
    <div class="component-cell">
        <div class="component-title">
            Progress Bar
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-progress-bar value="50" max="100"></fluent-progress-bar>
        </div>
    </div>

    <!-- Radio Group -->
    <div class="component-cell">
        <div class="component-title">
            Radio Group
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-radio-group>
                <fluent-radio value="1">Option 1</fluent-radio>
                <fluent-radio value="2">Option 2</fluent-radio>
            </fluent-radio-group>
        </div>
    </div>

    <!-- Slider -->
    <div class="component-cell">
        <div class="component-title">
            Slider
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-slider min="0" max="100" value="50"></fluent-slider>
        </div>
    </div>

    <!-- Spinner -->
    <div class="component-cell">
        <div class="component-title">
            Spinner
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-spinner></fluent-spinner>
        </div>
    </div>

    <!-- Switch -->
    <div class="component-cell">
        <div class="component-title">
            Switch
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-switch>Toggle me</fluent-switch>
        </div>
    </div>

    <!-- Tabs -->
    <div class="component-cell">
        <div class="component-title">
            Tabs
            <span class="component-type">Fluent</span>
        </div>
        <div class="component-demo">
            <fluent-tabs>
                <fluent-tab id="tab1">Tab 1</fluent-tab>
                <fluent-tab id="tab2">Tab 2</fluent-tab>
                <fluent-tab-panel id="panel1">Content 1</fluent-tab-panel>
                <fluent-tab-panel id="panel2">Content 2</fluent-tab-panel>
            </fluent-tabs>
        </div>
    </div>

    <!-- Fabric Components -->

    <!-- Accordion Menu -->
    <div class="component-cell">
        <div class="component-title">
            Accordion Menu
            <span class="component-type">Fabric</span>
        </div>
        <div class="component-demo">
            <fabric-accordion-menu>
                <fabric-accordion-menu-item>
                    <span slot="heading">Item 1</span>
                    <fabric-menu-list>
                        <fabric-menu-item>Subitem 1.1</fabric-menu-item>
                        <fabric-menu-item>Subitem 1.2</fabric-menu-item>
                    </fabric-menu-list>
                </fabric-accordion-menu-item>
            </fabric-accordion-menu>
        </div>
    </div>

    <!-- Card -->
    <div class="component-cell">
        <div class="component-title">
            Card
            <span class="component-type">Fabric</span>
        </div>
        <div class="component-demo">
            <fabric-card>
                <h3>Card Title</h3>
                <p>Card content goes here</p>
            </fabric-card>
        </div>
    </div>

    <!-- Carousel -->
    <div class="component-cell">
        <div class="component-title">
            Carousel
            <span class="component-type">Fabric</span>
        </div>
        <div class="component-demo">
            <fabric-carousel>
                <div style="padding: 20px; background: #f0f0f0;">Slide 1</div>
                <div style="padding: 20px; background: #f0f0f0;">Slide 2</div>
            </fabric-carousel>
        </div>
    </div>

    <!-- Filter Pill -->
    <div class="component-cell">
        <div class="component-title">
            Filter Pill
            <span class="component-type">Fabric</span>
        </div>
        <div class="component-demo">
            <fabric-filter-pill>Filter Label</fabric-filter-pill>
        </div>
    </div>

    <!-- Loading Button -->
    <div class="component-cell">
        <div class="component-title">
            Loading Button
            <span class="component-type">Fabric</span>
        </div>
        <div class="component-demo">
            <fabric-loading-button>Click Me</fabric-loading-button>
        </div>
    </div>

    <!-- Table -->
    <div class="component-cell">
        <div class="component-title">
            Table
            <span class="component-type">Fabric</span>
        </div>
        <div class="component-demo">
            <fabric-table>
                <thead>
                    <tr>
                        <fabric-table-cell>Header 1</fabric-table-cell>
                        <fabric-table-cell>Header 2</fabric-table-cell>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <fabric-table-cell>Cell 1</fabric-table-cell>
                        <fabric-table-cell>Cell 2</fabric-table-cell>
                    </tr>
                </tbody>
            </fabric-table>
        </div>
    </div>

    <!-- Teaching Bubble -->
    <div class="component-cell">
        <div class="component-title">
            Teaching Bubble
            <span class="component-type">Fabric</span>
        </div>
        <div class="component-demo">
            <fabric-button id="teachingBubbleTrigger">Show Teaching Bubble</fabric-button>
            <fabric-teaching-bubble anchor="teachingBubbleTrigger">
                <h3 slot="title">Teaching Bubble Title</h3>
                <p>This is a teaching bubble that helps users understand features.</p>
            </fabric-teaching-bubble>
        </div>
    </div>

    <!-- Wizard -->
    <div class="component-cell">
        <div class="component-title">
            Wizard
            <span class="component-type">Fabric</span>
        </div>
        <div class="component-demo">
            <fabric-wizard>
                <fabric-wizard-step>
                    <fabric-wizard-panel>
                        <h3>Step 1</h3>
                        <p>First step content</p>
                    </fabric-wizard-panel>
                </fabric-wizard-step>
            </fabric-wizard>
        </div>
    </div>
</div>
`;

// Add event listeners for interactive components
const dialog = document.getElementById('dialog') as FluentDialog;
const openButton = document.getElementById('openDialog');
const closeButton = document.getElementById('closeDialog');

openButton?.addEventListener('click', () => {
    dialog?.show();
});

closeButton?.addEventListener('click', () => {
    dialog?.hide();
});

// Loading button interaction
const loadingButton = document.querySelector('fabric-loading-button') as FabricLoadingButton;
loadingButton?.addEventListener('click', () => {
    loadingButton.loading = true;
    setTimeout(() => {
        loadingButton.loading = false;
    }, 2000);
});
