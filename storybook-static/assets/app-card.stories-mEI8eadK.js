import { i, r, x } from "./lit-element-ByVOPM7m.js";
const t = (t2) => (e, o) => {
  void 0 !== o ? o.addInitializer(() => {
    customElements.define(t2, e);
  }) : customElements.define(t2, e);
};
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let AppCard = class extends r {
  /**
   * Renders the card component
   * @returns The card template with content slot
   */
  render() {
    return x`
            <div
                class="card"
                part="card"
                style="
                    background-color: rgb(255, 255, 255);
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                "
            >
                <slot></slot>
            </div>
        `;
  }
};
AppCard.styles = i`
        :host {
            display: block;
        }
    `;
AppCard = __decorateClass([
  t("app-card")
], AppCard);
const meta = {
  title: "Components/AppCard",
  tags: ["autodocs"],
  render: (args) => x`
    <app-card
      .title=${args.title}
      .description=${args.description}
    ></app-card>
  `,
  argTypes: {
    title: {
      control: "text"
    },
    description: {
      control: "text"
    }
  }
};
var app_card_stories_default = meta;
const Primary = {
  args: {
    title: "Example Card",
    description: "This is a sample card component"
  }
};
Primary.parameters = {
  ...Primary.parameters,
  docs: {
    ...Primary.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    title: 'Example Card',\n    description: '\
This is a sample card component'\n  }\n}",
      ...Primary.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Primary"];
export {
  Primary,
  __namedExportsOrder,
  app_card_stories_default as default
};
