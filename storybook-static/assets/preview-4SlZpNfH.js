import "./index-CuVRQFde.js";
const { STORY_CHANGED, SELECT_STORY } = __STORYBOOK_MODULE_CORE_EVENTS__;
const { makeDecorator, addons } = __STORYBOOK_MODULE_PREVIEW_API__;
const { global } = __STORYBOOK_MODULE_GLOBAL__;
var PARAM_KEY = "links";
var { document, HTMLElement } = global;
var navigate = (params) => addons.getChannel().emit(SELECT_STORY, params);
var linksListener = (e) => {
  let { target } = e;
  if (!(target instanceof HTMLElement)) return;
  let element = target, { sbKind: kind, sbStory: story } = element.dataset;
  (kind || story) && (e.preventDefault(), navigate({ kind, story }));
};
var hasListener = false;
var on = () => {
  hasListener || (hasListener = true, document.addEventListener("click", linksListener));
};
var off = () => {
  hasListener && (hasListener = false, document.removeEventListener("click", linksListener));
};
var withLinks = makeDecorator({ name: "withLinks", parameterName: PARAM_KEY, wrapper: (getStory, context) => (on(),
addons.getChannel().once(STORY_CHANGED, off), getStory(context)) });
var decorators = [withLinks];
export {
  decorators
};
