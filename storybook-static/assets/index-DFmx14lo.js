import { ae as React } from "./DocsRenderer-CFRXHY34-CJvr0HWH.js";
import "./iframe-BW3kdh3T.js";
import "../sb-preview/runtime.js";
import "./index-CuVRQFde.js";
import "./index-CvFNwxCN.js";
import "./index-DntBg4sS.js";
const emptyComponents = {};
const MDXContext = React.createContext(emptyComponents);
function useMDXComponents(components) {
  const contextComponents = React.useContext(MDXContext);
  return React.useMemo(
    function() {
      if (typeof components === "function") {
        return components(contextComponents);
      }
      return { ...contextComponents, ...components };
    },
    [contextComponents, components]
  );
}
function MDXProvider(properties) {
  let allComponents;
  if (properties.disableParentContext) {
    allComponents = typeof properties.components === "function" ? properties.components(
    emptyComponents) : properties.components || emptyComponents;
  } else {
    allComponents = useMDXComponents(properties.components);
  }
  return React.createElement(
    MDXContext.Provider,
    { value: allComponents },
    properties.children
  );
}
export {
  MDXProvider,
  useMDXComponents
};
