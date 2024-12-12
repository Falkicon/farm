import "./entry-preview-Dqb-CPww.js";
import { g as gt, c as cn, y as yn } from "./index-CvFNwxCN.js";
import { i as invariant } from "./tiny-invariant-BFhMKKf2.js";
import { B } from "./lit-element-ByVOPM7m.js";
import "./index-DntBg4sS.js";
const { global } = __STORYBOOK_MODULE_GLOBAL__;
__STORYBOOK_MODULE_PREVIEW_API__;
var { window: globalWindow } = global;
globalWindow.STORYBOOK_ENV = "web-components";
function isValidComponent(tagName) {
  if (!tagName) return false;
  if (typeof tagName == "string") return true;
  throw new Error('Provided component needs to be a string. e.g. component: "my-\
element"');
}
function isValidMetaData(customElements) {
  if (!customElements) return false;
  if (customElements.tags && Array.isArray(customElements.tags) || customElements.
  modules && Array.isArray(customElements.modules)) return true;
  throw new Error(`You need to setup valid meta data in your config.js via setCu\
stomElements().
    See the readme of addon-docs for web components for more details.`);
}
function getCustomElements() {
  return global.__STORYBOOK_CUSTOM_ELEMENTS__ || global.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__;
}
var { window: window$1, EventSource } = global;
typeof module < "u" && module?.hot?.decline && (module.hot.decline(), new EventSource(
"__webpack_hmr").addEventListener("message", function(event) {
  try {
    let { action } = JSON.parse(event.data);
    action === "built" && window$1.location.reload();
  } catch {
  }
}));
const { logger } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
const { useEffect, addons } = __STORYBOOK_MODULE_PREVIEW_API__;
function mapItem(item, category) {
  let type;
  switch (category) {
    case "attributes":
    case "properties":
      type = { name: item.type?.text || item.type };
      break;
    case "slots":
      type = { name: "string" };
      break;
    default:
      type = { name: "void" };
      break;
  }
  return { name: item.name, required: false, description: item.description, type,
  table: { category, type: { summary: item.type?.text || item.type }, defaultValue: {
  summary: item.default !== void 0 ? item.default : item.defaultValue } } };
}
function mapEvent(item) {
  let name = item.name.replace(/(-|_|:|\.|\s)+(.)?/g, (_match, _separator, chr) => chr ?
  chr.toUpperCase() : "").replace(/^([A-Z])/, (match) => match.toLowerCase());
  return name = `on${name.charAt(0).toUpperCase() + name.substr(1)}`, [{ name, action: {
  name: item.name }, table: { disable: true } }, mapItem(item, "events")];
}
function mapData(data, category) {
  return data && data.filter((item) => item && item.name).reduce((acc, item) => {
    if (item.kind === "method") return acc;
    switch (category) {
      case "events":
        mapEvent(item).forEach((argType) => {
          invariant(argType.name), acc[argType.name] = argType;
        });
        break;
      default:
        acc[item.name] = mapItem(item, category);
        break;
    }
    return acc;
  }, {});
}
var getMetaDataExperimental = (tagName, customElements) => {
  if (!isValidComponent(tagName) || !isValidMetaData(customElements)) return null;
  let metaData = customElements.tags.find((tag) => tag.name.toUpperCase() === tagName.
  toUpperCase());
  return metaData || logger.warn(`Component not found in custom-elements.json: ${tagName}`),
  metaData;
};
var getMetaDataV1 = (tagName, customElements) => {
  if (!isValidComponent(tagName) || !isValidMetaData(customElements)) return null;
  let metadata;
  return customElements?.modules?.forEach((_module) => {
    _module?.declarations?.forEach((declaration) => {
      declaration.tagName === tagName && (metadata = declaration);
    });
  }), metadata || logger.warn(`Component not found in custom-elements.json: ${tagName}`),
  metadata;
};
var getMetaData = (tagName, manifest) => manifest?.version === "experimental" ? getMetaDataExperimental(
tagName, manifest) : getMetaDataV1(tagName, manifest);
var extractArgTypesFromElements = (tagName, customElements) => {
  let metaData = getMetaData(tagName, customElements);
  return metaData && { ...mapData(metaData.members ?? [], "properties"), ...mapData(
  metaData.properties ?? [], "properties"), ...mapData(metaData.attributes ?? [],
  "attributes"), ...mapData(metaData.events ?? [], "events"), ...mapData(metaData.
  slots ?? [], "slots"), ...mapData(metaData.cssProperties ?? [], "css custom pr\
operties"), ...mapData(metaData.cssParts ?? [], "css shadow parts") };
};
var extractArgTypes = (tagName) => {
  let cem = getCustomElements();
  return extractArgTypesFromElements(tagName, cem);
};
var extractComponentDescription = (tagName) => {
  let metaData = getMetaData(tagName, getCustomElements());
  return metaData && metaData.description;
};
var LIT_EXPRESSION_COMMENTS = /<!--\?lit\$[0-9]+\$-->|<!--\??-->/g;
function skipSourceRender(context) {
  let sourceParams = context?.parameters.docs?.source, isArgsStory = context?.parameters.
  __isArgsStory;
  return sourceParams?.type === gt.DYNAMIC ? false : !isArgsStory || sourceParams?.
  code || sourceParams?.type === gt.CODE;
}
function sourceDecorator(storyFn, context) {
  let story = storyFn(), renderedForSource = context?.parameters.docs?.source?.excludeDecorators ?
  context.originalStoryFn(context.args, context) : story, source;
  if (useEffect(() => {
    let { id, unmappedArgs } = context;
    source && addons.getChannel().emit(yn, { id, source, args: unmappedArgs });
  }), !skipSourceRender(context)) {
    let container = window.document.createElement("div");
    renderedForSource instanceof DocumentFragment ? B(renderedForSource.cloneNode(
    true), container) : B(renderedForSource, container), source = container.innerHTML.
    replace(LIT_EXPRESSION_COMMENTS, "");
  }
  return story;
}
var decorators = [sourceDecorator];
var parameters = { docs: { extractArgTypes, extractComponentDescription, story: {
inline: true }, source: { type: gt.DYNAMIC, language: "html" } } };
var argTypesEnhancers = [cn];
export {
  argTypesEnhancers,
  decorators,
  parameters
};
