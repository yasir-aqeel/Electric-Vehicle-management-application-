const REACT_STATICS = new Set([
  "childContextTypes",
  "contextType",
  "contextTypes",
  "defaultProps",
  "displayName",
  "getDefaultProps",
  "getDerivedStateFromError",
  "getDerivedStateFromProps",
  "mixins",
  "propTypes",
  "type",
]);

const KNOWN_STATICS = new Set([
  "name",
  "length",
  "prototype",
  "caller",
  "callee",
  "arguments",
  "arity",
]);

export default function hoistNonReactStatics(targetComponent, sourceComponent, blacklist = {}) {
  if (!sourceComponent || typeof sourceComponent !== "object" && typeof sourceComponent !== "function") {
    return targetComponent;
  }

  Object.getOwnPropertyNames(sourceComponent).forEach((key) => {
    if (KNOWN_STATICS.has(key) || REACT_STATICS.has(key) || blacklist[key]) {
      return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(sourceComponent, key);
    if (descriptor) {
      try {
        Object.defineProperty(targetComponent, key, descriptor);
      } catch {
        // Some framework-defined properties are read-only. Skipping them is safe.
      }
    }
  });

  return targetComponent;
}
