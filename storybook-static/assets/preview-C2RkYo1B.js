const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DocsRenderer-CFRXHY34-CJvr0HWH.js","./iframe-BW3kdh3T.js","./index-CuVRQFde.js","./index-CvFNwxCN.js","./index-DntBg4sS.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./iframe-BW3kdh3T.js";
import "../sb-preview/runtime.js";
var excludeTags = Object.entries(globalThis.TAGS_OPTIONS ?? {}).reduce((acc, entry) => {
  let [tag, option] = entry;
  return option.excludeFromDocsStories && (acc[tag] = true), acc;
}, {});
var parameters = { docs: { renderer: async () => {
  let { DocsRenderer } = await __vitePreload(() => import("./DocsRenderer-CFRXHY34-CJvr0HWH.js").
  then((n) => n.am), true ? __vite__mapDeps([0,1,2,3,4]) : void 0, import.meta.url);
  return new DocsRenderer();
}, stories: { filter: (story) => (story.tags || []).filter((tag) => excludeTags[tag]).
length === 0 && !story.parameters.docs?.disable } } };
export {
  parameters
};
