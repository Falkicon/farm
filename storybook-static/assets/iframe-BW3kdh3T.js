const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./app-card.stories-mEI8eadK.js","./lit-element-ByVOPM7m.js","./entry-preview-Dqb-CPww.js","./index-DntBg4sS.js","./entry-preview-docs-CPIVKCc3.js","./index-CvFNwxCN.js","./tiny-invariant-BFhMKKf2.js","./preview-4SlZpNfH.js","./index-CuVRQFde.js","./preview-BTBYgSpU.js","./preview-0qIFDi76.js","./preview-ImGss07R.js"])))=>i.map(i=>d[i]);
import "../sb-preview/runtime.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const { createBrowserChannel } = __STORYBOOK_MODULE_CHANNELS__;
const { addons } = __STORYBOOK_MODULE_PREVIEW_API__;
const channel = createBrowserChannel({ page: "preview" });
addons.setChannel(channel);
window.__STORYBOOK_ADDONS_CHANNEL__ = channel;
if (window.CONFIG_TYPE === "DEVELOPMENT") {
  window.__STORYBOOK_SERVER_CHANNEL__ = channel;
}
const importers = {
  "./src/frontend/components/app-card.stories.ts": async () => __vitePreload(() => import("./app-card.stories-mEI8eadK.js"),
  true ? __vite__mapDeps([0,1]) : void 0, import.meta.url)
};
async function importFn(path) {
  return importers[path]();
}
const { composeConfigs, PreviewWeb, ClientApi } = __STORYBOOK_MODULE_PREVIEW_API__;
const getProjectAnnotations = async (hmrPreviewAnnotationModules = []) => {
  const configs = await Promise.all([
    hmrPreviewAnnotationModules[0] ?? __vitePreload(() => import("./entry-preview-Dqb-CPww.js"),
    true ? __vite__mapDeps([2,1,3]) : void 0, import.meta.url),
    hmrPreviewAnnotationModules[1] ?? __vitePreload(() => import("./entry-preview-docs-CPIVKCc3.js"),
    true ? __vite__mapDeps([4,2,1,3,5,6]) : void 0, import.meta.url),
    hmrPreviewAnnotationModules[2] ?? __vitePreload(() => import("./preview-4SlZpNfH.js"),
    true ? __vite__mapDeps([7,8]) : void 0, import.meta.url),
    hmrPreviewAnnotationModules[3] ?? __vitePreload(() => import("./preview-C2RkYo1B.js"),
    true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[4] ?? __vitePreload(() => import("./preview-CZbwSCqS.js"),
    true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[5] ?? __vitePreload(() => import("./preview-BTBYgSpU.js"),
    true ? __vite__mapDeps([9,3]) : void 0, import.meta.url),
    hmrPreviewAnnotationModules[6] ?? __vitePreload(() => import("./preview-DW84CpCl.js"),
    true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[7] ?? __vitePreload(() => import("./preview-0qIFDi76.js"),
    true ? __vite__mapDeps([10,6]) : void 0, import.meta.url),
    hmrPreviewAnnotationModules[8] ?? __vitePreload(() => import("./preview-ImGss07R.js"),
    true ? __vite__mapDeps([11,3]) : void 0, import.meta.url),
    hmrPreviewAnnotationModules[9] ?? __vitePreload(() => import("./preview-CNId7xtz.js"),
    true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[10] ?? __vitePreload(() => import("./preview-3nZppWys.js"),
    true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[11] ?? __vitePreload(() => import("./preview-CjdNpTJn.js"),
    true ? [] : void 0, import.meta.url)
  ]);
  return composeConfigs(configs);
};
window.__STORYBOOK_PREVIEW__ = window.__STORYBOOK_PREVIEW__ || new PreviewWeb(importFn,
getProjectAnnotations);
window.__STORYBOOK_STORY_STORE__ = window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.
storyStore;
export {
  __vitePreload as _
};
