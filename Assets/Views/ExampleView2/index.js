(() => {
  // node_modules/@rikarin/preactor/dist/dom/dom-style.js
  var DomStyleWrapper = class {
    #domStyle;
    constructor(domStyle) {
      this.#domStyle = domStyle;
      return new Proxy(this, {
        set(target, prop, value) {
          target.setProperty(prop, value);
          return true;
        },
        get(target, prop) {
          return target[prop];
        }
      });
    }
    setProperty(name, value) {
      this.#domStyle.SetProperty(name, value);
    }
  };

  // node_modules/@rikarin/preactor/dist/dom/dom.js
  var DomWrapper = class _DomWrapper {
    #dom;
    #domStyleWrapper;
    #cachedChildren = null;
    #boundListeners = /* @__PURE__ */ new WeakMap();
    get _dom() {
      return this.#dom;
    }
    get ve() {
      return this.#dom.VisualElement;
    }
    get childNodes() {
      if (!this.#cachedChildren) {
        this.#cachedChildren = new Array(this.#dom.ChildNodes.Length);
        for (let i = 0; i < this.#dom.ChildNodes.Length; i++) {
          this.#cachedChildren[i] = new _DomWrapper(this.#dom.ChildNodes.get_Item(i));
        }
      }
      return this.#cachedChildren;
    }
    get firstChild() {
      return this.#dom.FirstChild ? new _DomWrapper(this.#dom.FirstChild) : null;
    }
    get parentNode() {
      return this.#dom.ParentNode ? new _DomWrapper(this.#dom.ParentNode) : null;
    }
    get nextSibling() {
      return this.#dom.NextSibling ? new _DomWrapper(this.#dom.NextSibling) : null;
    }
    get nodeType() {
      return this.#dom.NodeType;
    }
    get Id() {
      return this.#dom.Id;
    }
    set Id(value) {
      this.#dom.Id = value;
    }
    get key() {
      return this.#dom.Key;
    }
    set key(value) {
      this.#dom.Key = value;
    }
    get style() {
      return this.#domStyleWrapper;
    }
    get value() {
      return this.#dom.Value;
    }
    get checked() {
      return this.#dom.Checked;
    }
    get data() {
      return this.#dom.Data;
    }
    set data(value) {
      this.#dom.Data = value;
    }
    get classname() {
      return this.#dom.ClassName;
    }
    set classname(value) {
      this.#dom.ClassName = value;
    }
    constructor(dom) {
      this.#dom = dom;
      this.#domStyleWrapper = new DomStyleWrapper(dom.Style);
    }
    appendChild(child) {
      if (child) {
        this.#dom.AppendChild(child.#dom);
        this.#cachedChildren = null;
      }
    }
    removeChild(child) {
      if (child) {
        this.#dom.RemoveChild(child.#dom);
        this.#cachedChildren = null;
      }
    }
    insertBefore(a, b) {
      this.#dom.InsertBefore(a?._dom, b?._dom);
      this.#cachedChildren = null;
    }
    clearChildren() {
      this.#dom.ClearChildren();
      this.#cachedChildren = null;
    }
    focus() {
      this.#dom.Focus();
    }
    contains(element) {
      if (!element) {
        return false;
      }
      return this.#dom.Contains(element.#dom);
    }
    addEventListener(type, listener, useCapture) {
      let boundListener = this.#boundListeners.get(listener);
      if (!boundListener) {
        boundListener = listener.bind(this);
        this.#boundListeners.set(listener, boundListener);
      }
      this.#dom.AddEventListener(type, listener.bind(this), useCapture);
    }
    removeEventListener(type, listener, useCapture) {
      const boundListener = this.#boundListeners.get(listener);
      if (boundListener) {
        this.#dom.RemoveEventListener(type, listener.bind(this), useCapture);
        this.#boundListeners.delete(listener);
      }
    }
    setAttribute(name, value) {
      this.#dom.SetAttribute(name, value);
    }
    removeAttribute(name) {
      this.#dom.RemoveAttribute(name);
    }
  };

  // node_modules/@rikarin/preactor/dist/dom/document.js
  var DocumentWrapper = class {
    #doc;
    #body;
    get body() {
      return this.#body;
    }
    constructor(doc) {
      this.#doc = doc;
      this.#body = new DomWrapper(doc.Body);
    }
    addRuntimeUss(uss) {
      this.#doc.AddRuntimeUss(uss);
    }
    clearRuntimeStyleSheets() {
      this.#doc.ClearRuntimeStyleSheets();
    }
    createElement(tagName, _options) {
      return new DomWrapper(this.#doc.CreateElement(tagName));
    }
    createElementNS(_ns, tagName, _options) {
      return new DomWrapper(this.#doc.CreateElement(tagName));
    }
    createTextNode(text) {
      return new DomWrapper(this.#doc.CreateTextNode(text));
    }
    getElementById(id) {
      return new DomWrapper(this.#doc.GetElementById(id));
    }
    querySelectorAll(selector) {
      let doms = this.#doc.QuerySelectorAll(selector);
      let res = [];
      for (let i = 0; i < doms.Length; i++) {
        res.push(new DomWrapper(doms.get_Item(i)));
      }
      return res;
    }
    loadImage(path) {
      return this.#doc.LoadImage(path);
    }
    loadFont(path) {
      return this.#doc.LoadFont(path);
    }
    loadFontDefinition(path) {
      return this.#doc.LoadFontDefinition(path);
    }
  };

  // node_modules/css-simple-parser/dist/constants.js
  var TOKEN_TYPE = {
    SELECTOR: 1,
    BODY_START: 2,
    BODY_END: 3
  };

  // node_modules/css-simple-parser/dist/tokenizer.js
  var { SELECTOR, BODY_START, BODY_END } = TOKEN_TYPE;

  // node_modules/css-simple-parser/dist/parse.js
  var { SELECTOR: SELECTOR2, BODY_START: BODY_START2, BODY_END: BODY_END2 } = TOKEN_TYPE;

  // node_modules/@rikarin/preactor/dist/index.js
  globalThis.document = new DocumentWrapper(__document);

  // node_modules/@rikarin/preactor/preact/constants.js
  var MODE_HYDRATE = 1 << 5;
  var MODE_SUSPENDED = 1 << 7;
  var INSERT_VNODE = 1 << 16;
  var MATCHED = 1 << 17;
  var RESET_MODE = ~(MODE_HYDRATE | MODE_SUSPENDED);
  var EMPTY_OBJ = (
    /** @type {any} */
    {}
  );
  var EMPTY_ARR = [];

  // node_modules/@rikarin/preactor/preact/util.js
  var isArray = Array.isArray;
  function assign(obj, props) {
    for (let i in props)
      obj[i] = props[i];
    return (
      /** @type {O & P} */
      obj
    );
  }
  function removeNode(node) {
    if (node && node.parentNode)
      node.parentNode.removeChild(node);
  }
  var slice = EMPTY_ARR.slice;

  // node_modules/@rikarin/preactor/preact/diff/catch-error.js
  function _catchError(error, vnode, oldVNode, errorInfo) {
    let component, ctor, handled;
    for (; vnode = vnode._parent; ) {
      if ((component = vnode._component) && !component._processingException) {
        try {
          ctor = component.constructor;
          if (ctor && ctor.getDerivedStateFromError != null) {
            component.setState(ctor.getDerivedStateFromError(error));
            handled = component._dirty;
          }
          if (component.componentDidCatch != null) {
            component.componentDidCatch(error, errorInfo || {});
            handled = component._dirty;
          }
          if (handled) {
            return component._pendingError = component;
          }
        } catch (e) {
          error = e;
        }
      }
    }
    throw error;
  }

  // node_modules/@rikarin/preactor/preact/options.js
  var options = {
    _catchError
  };
  var options_default = options;

  // node_modules/@rikarin/preactor/preact/create-element.js
  var vnodeId = 0;
  function createElement(type, props, children) {
    let normalizedProps = {}, key, ref, i;
    for (i in props) {
      if (i == "key")
        key = props[i];
      else if (i == "ref")
        ref = props[i];
      else
        normalizedProps[i] = props[i];
    }
    if (arguments.length > 2) {
      normalizedProps.children = arguments.length > 3 ? slice.call(arguments, 2) : children;
    }
    if (typeof type == "function" && type.defaultProps != null) {
      for (i in type.defaultProps) {
        if (normalizedProps[i] === void 0) {
          normalizedProps[i] = type.defaultProps[i];
        }
      }
    }
    return createVNode(type, normalizedProps, key, ref, null);
  }
  function createVNode(type, props, key, ref, original) {
    const vnode = {
      type,
      props,
      key,
      ref,
      _children: null,
      _parent: null,
      _depth: 0,
      _dom: null,
      // _nextDom must be initialized to undefined b/c it will eventually
      // be set to dom.nextSibling which can return `null` and it is important
      // to be able to distinguish between an uninitialized _nextDom and
      // a _nextDom that has been set to `null`
      _nextDom: void 0,
      _component: null,
      constructor: void 0,
      _original: original == null ? ++vnodeId : original,
      _index: -1,
      _flags: 0
    };
    if (original == null && options_default.vnode != null)
      options_default.vnode(vnode);
    return vnode;
  }
  function Fragment(props) {
    return props.children;
  }

  // node_modules/@rikarin/preactor/preact/component.js
  function BaseComponent(props, context) {
    this.props = props;
    this.context = context;
  }
  BaseComponent.prototype.setState = function(update, callback) {
    let s;
    if (this._nextState != null && this._nextState !== this.state) {
      s = this._nextState;
    } else {
      s = this._nextState = assign({}, this.state);
    }
    if (typeof update == "function") {
      update = update(assign({}, s), this.props);
    }
    if (update) {
      assign(s, update);
    }
    if (update == null)
      return;
    if (this._vnode) {
      if (callback) {
        this._stateCallbacks.push(callback);
      }
      enqueueRender(this);
    }
  };
  BaseComponent.prototype.forceUpdate = function(callback) {
    if (this._vnode) {
      this._force = true;
      if (callback)
        this._renderCallbacks.push(callback);
      enqueueRender(this);
    }
  };
  BaseComponent.prototype.render = Fragment;
  function getDomSibling(vnode, childIndex) {
    if (childIndex == null) {
      return vnode._parent ? getDomSibling(vnode._parent, vnode._index + 1) : null;
    }
    let sibling;
    for (; childIndex < vnode._children.length; childIndex++) {
      sibling = vnode._children[childIndex];
      if (sibling != null && sibling._dom != null) {
        return sibling._dom;
      }
    }
    return typeof vnode.type == "function" ? getDomSibling(vnode) : null;
  }
  function renderComponent(component) {
    let oldVNode = component._vnode, oldDom = oldVNode._dom, commitQueue = [], refQueue = [];
    if (component._parentDom) {
      const newVNode = assign({}, oldVNode);
      newVNode._original = oldVNode._original + 1;
      if (options_default.vnode)
        options_default.vnode(newVNode);
      diff(
        component._parentDom,
        newVNode,
        oldVNode,
        component._globalContext,
        component._parentDom.namespaceURI,
        oldVNode._flags & MODE_HYDRATE ? [oldDom] : null,
        commitQueue,
        oldDom == null ? getDomSibling(oldVNode) : oldDom,
        !!(oldVNode._flags & MODE_HYDRATE),
        refQueue
      );
      newVNode._original = oldVNode._original;
      newVNode._parent._children[newVNode._index] = newVNode;
      commitRoot(commitQueue, newVNode, refQueue);
      if (newVNode._dom != oldDom) {
        updateParentDomPointers(newVNode);
      }
    }
  }
  function updateParentDomPointers(vnode) {
    if ((vnode = vnode._parent) != null && vnode._component != null) {
      vnode._dom = vnode._component.base = null;
      for (let i = 0; i < vnode._children.length; i++) {
        let child = vnode._children[i];
        if (child != null && child._dom != null) {
          vnode._dom = vnode._component.base = child._dom;
          break;
        }
      }
      return updateParentDomPointers(vnode);
    }
  }
  var rerenderQueue = [];
  var prevDebounce;
  var defer = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
  function enqueueRender(c) {
    if (!c._dirty && (c._dirty = true) && rerenderQueue.push(c) && !process._rerenderCount++ || prevDebounce !== options_default.debounceRendering) {
      prevDebounce = options_default.debounceRendering;
      (prevDebounce || defer)(process);
    }
  }
  var depthSort = (a, b) => a._vnode._depth - b._vnode._depth;
  function process() {
    let c;
    rerenderQueue.sort(depthSort);
    while (c = rerenderQueue.shift()) {
      if (c._dirty) {
        let renderQueueLength = rerenderQueue.length;
        renderComponent(c);
        if (rerenderQueue.length > renderQueueLength) {
          rerenderQueue.sort(depthSort);
        }
      }
    }
    process._rerenderCount = 0;
  }
  process._rerenderCount = 0;

  // node_modules/@rikarin/preactor/preact/diff/children.js
  function diffChildren(parentDom, renderResult, newParentVNode, oldParentVNode, globalContext, namespace, excessDomChildren, commitQueue, oldDom, isHydrating, refQueue) {
    let i, oldVNode, childVNode, newDom, firstChildDom;
    let oldChildren = oldParentVNode && oldParentVNode._children || EMPTY_ARR;
    let newChildrenLength = renderResult.length;
    newParentVNode._nextDom = oldDom;
    constructNewChildrenArray(newParentVNode, renderResult, oldChildren);
    oldDom = newParentVNode._nextDom;
    for (i = 0; i < newChildrenLength; i++) {
      childVNode = newParentVNode._children[i];
      if (childVNode == null)
        continue;
      if (childVNode._index === -1) {
        oldVNode = EMPTY_OBJ;
      } else {
        oldVNode = oldChildren[childVNode._index] || EMPTY_OBJ;
      }
      childVNode._index = i;
      diff(
        parentDom,
        childVNode,
        oldVNode,
        globalContext,
        namespace,
        excessDomChildren,
        commitQueue,
        oldDom,
        isHydrating,
        refQueue
      );
      newDom = childVNode._dom;
      if (childVNode.ref && oldVNode.ref != childVNode.ref) {
        if (oldVNode.ref) {
          applyRef(oldVNode.ref, null, childVNode);
        }
        refQueue.push(childVNode.ref, childVNode._component || newDom, childVNode);
      }
      if (firstChildDom == null && newDom != null) {
        firstChildDom = newDom;
      }
      if (childVNode._flags & INSERT_VNODE || oldVNode._children === childVNode._children) {
        oldDom = insert(childVNode, oldDom, parentDom);
      } else if (typeof childVNode.type == "function" && childVNode._nextDom !== void 0) {
        oldDom = childVNode._nextDom;
      } else if (newDom) {
        oldDom = newDom.nextSibling;
      }
      childVNode._nextDom = void 0;
      childVNode._flags &= ~(INSERT_VNODE | MATCHED);
    }
    newParentVNode._nextDom = oldDom;
    newParentVNode._dom = firstChildDom;
  }
  function constructNewChildrenArray(newParentVNode, renderResult, oldChildren) {
    let i;
    let childVNode;
    let oldVNode;
    const newChildrenLength = renderResult.length;
    let oldChildrenLength = oldChildren.length, remainingOldChildren = oldChildrenLength;
    let skew = 0;
    newParentVNode._children = [];
    for (i = 0; i < newChildrenLength; i++) {
      childVNode = renderResult[i];
      if (childVNode == null || typeof childVNode == "boolean" || typeof childVNode == "function") {
        childVNode = newParentVNode._children[i] = null;
        continue;
      } else if (typeof childVNode == "string" || typeof childVNode == "number" || // eslint-disable-next-line valid-typeof
      typeof childVNode == "bigint" || childVNode.constructor == String) {
        childVNode = newParentVNode._children[i] = createVNode(null, childVNode, null, null, null);
      } else if (isArray(childVNode)) {
        childVNode = newParentVNode._children[i] = createVNode(Fragment, { children: childVNode }, null, null, null);
      } else if (childVNode.constructor === void 0 && childVNode._depth > 0) {
        childVNode = newParentVNode._children[i] = createVNode(
          childVNode.type,
          childVNode.props,
          childVNode.key,
          childVNode.ref ? childVNode.ref : null,
          childVNode._original
        );
      } else {
        childVNode = newParentVNode._children[i] = childVNode;
      }
      const skewedIndex = i + skew;
      childVNode._parent = newParentVNode;
      childVNode._depth = newParentVNode._depth + 1;
      const matchingIndex = childVNode._index = findMatchingIndex(
        childVNode,
        oldChildren,
        skewedIndex,
        remainingOldChildren
      );
      oldVNode = null;
      if (matchingIndex !== -1) {
        oldVNode = oldChildren[matchingIndex];
        remainingOldChildren--;
        if (oldVNode) {
          oldVNode._flags |= MATCHED;
        }
      }
      const isMounting = oldVNode == null || oldVNode._original === null;
      if (isMounting) {
        if (matchingIndex == -1) {
          skew--;
        }
        if (typeof childVNode.type != "function") {
          childVNode._flags |= INSERT_VNODE;
        }
      } else if (matchingIndex !== skewedIndex) {
        if (matchingIndex == skewedIndex - 1) {
          skew--;
        } else if (matchingIndex == skewedIndex + 1) {
          skew++;
        } else {
          if (matchingIndex > skewedIndex) {
            skew--;
          } else {
            skew++;
          }
          childVNode._flags |= INSERT_VNODE;
        }
      }
    }
    if (remainingOldChildren) {
      for (i = 0; i < oldChildrenLength; i++) {
        oldVNode = oldChildren[i];
        if (oldVNode != null && (oldVNode._flags & MATCHED) === 0) {
          if (oldVNode._dom == newParentVNode._nextDom) {
            newParentVNode._nextDom = getDomSibling(oldVNode);
          }
          unmount(oldVNode, oldVNode);
        }
      }
    }
  }
  function insert(parentVNode, oldDom, parentDom) {
    if (typeof parentVNode.type == "function") {
      let children = parentVNode._children;
      for (let i = 0; children && i < children.length; i++) {
        if (children[i]) {
          children[i]._parent = parentVNode;
          oldDom = insert(children[i], oldDom, parentDom);
        }
      }
      return oldDom;
    } else if (parentVNode._dom != oldDom) {
      if (oldDom && parentVNode.type && !parentDom.contains(oldDom)) {
        oldDom = getDomSibling(parentVNode);
      }
      parentDom.insertBefore(parentVNode._dom, oldDom || null);
      oldDom = parentVNode._dom;
    }
    do {
      oldDom = oldDom && oldDom.nextSibling;
    } while (oldDom != null && oldDom.nodeType === 8);
    return oldDom;
  }
  function findMatchingIndex(childVNode, oldChildren, skewedIndex, remainingOldChildren) {
    const key = childVNode.key;
    const type = childVNode.type;
    let x = skewedIndex - 1;
    let y = skewedIndex + 1;
    let oldVNode = oldChildren[skewedIndex];
    let shouldSearch = remainingOldChildren > (oldVNode != null && (oldVNode._flags & MATCHED) === 0 ? 1 : 0);
    if (oldVNode === null || oldVNode && key == oldVNode.key && type === oldVNode.type && (oldVNode._flags & MATCHED) === 0) {
      return skewedIndex;
    } else if (shouldSearch) {
      while (x >= 0 || y < oldChildren.length) {
        if (x >= 0) {
          oldVNode = oldChildren[x];
          if (oldVNode && (oldVNode._flags & MATCHED) === 0 && key == oldVNode.key && type === oldVNode.type) {
            return x;
          }
          x--;
        }
        if (y < oldChildren.length) {
          oldVNode = oldChildren[y];
          if (oldVNode && (oldVNode._flags & MATCHED) === 0 && key == oldVNode.key && type === oldVNode.type) {
            return y;
          }
          y++;
        }
      }
    }
    return -1;
  }

  // node_modules/@rikarin/preactor/preact/diff/props.js
  function setStyle(style, key, value) {
    if (key[0] === "-") {
      style.setProperty(key, value == null ? "" : value);
    } else if (value == null) {
      style[key] = "";
    } else {
      style[key] = value;
    }
  }
  var eventClock = 0;
  var eventDispatchTimes = /* @__PURE__ */ new Map();
  function setProperty(dom, name, value, oldValue, namespace) {
    let useCapture;
    o:
      if (name === "style") {
        if (typeof value == "string") {
          dom.style.cssText = value;
        } else {
          if (typeof oldValue == "string") {
            dom.style.cssText = oldValue = "";
          }
          if (oldValue) {
            for (name in oldValue) {
              if (!(value && name in value)) {
                setStyle(dom.style, name, "");
              }
            }
          }
          if (value) {
            for (name in value) {
              if (!oldValue || value[name] !== oldValue[name]) {
                setStyle(dom.style, name, value[name]);
              }
            }
          }
        }
      } else if (name[0] === "o" && name[1] === "n") {
        useCapture = name !== (name = name.replace(/(PointerCapture)$|Capture$/i, "$1"));
        name = name.slice(2);
        if (!dom._listeners)
          dom._listeners = {};
        dom._listeners[name + useCapture] = value;
        if (value) {
          if (!oldValue) {
            value._attached = eventClock;
            dom.addEventListener(name, useCapture ? eventProxyCapture : eventProxy, useCapture);
          } else {
            value._attached = oldValue._attached;
          }
        } else {
          dom.removeEventListener(name, useCapture ? eventProxyCapture : eventProxy, useCapture);
        }
      } else {
        if (namespace == "http://www.w3.org/2000/svg") {
          name = name.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        } else if (name != "width" && name != "height" && name != "href" && name != "list" && name != "form" && // Default value in browsers is `-1` and an empty string is
        // cast to `0` instead
        name != "tabIndex" && name != "download" && name != "rowSpan" && name != "colSpan" && name != "role" && name != "popover" && name in dom.ve) {
          try {
            dom.setAttribute(name, value == null ? "" : value);
            break o;
          } catch (e) {
          }
        }
        if (typeof value == "function") {
        } else if (value != null && typeof value !== "undefined") {
          dom.setAttribute(name, name == "popover" && value == true ? "" : value);
        } else {
          dom.removeAttribute(name);
        }
      }
  }
  function createEventProxy(useCapture) {
    return function(e) {
      if (this._listeners) {
        let eventName = e.GetType().Name.replace("Event", "");
        eventName = eventName === "Change`1" ? "ValueChanged" : eventName;
        const eventHandler = this._listeners[eventName + useCapture];
        const key = e.timestamp;
        if (!eventDispatchTimes.has(key)) {
          eventDispatchTimes.set(key, eventClock++);
        }
        const dispatchTime = eventDispatchTimes.get(key);
        if (dispatchTime < eventHandler._attached) {
          return;
        }
        return eventHandler(options_default.event ? options_default.event(e) : e);
      }
    };
  }
  var eventProxy = createEventProxy(false);
  var eventProxyCapture = createEventProxy(true);

  // node_modules/@rikarin/preactor/preact/diff/index.js
  function diff(parentDom, newVNode, oldVNode, globalContext, namespace, excessDomChildren, commitQueue, oldDom, isHydrating, refQueue) {
    let tmp, newType = newVNode.type;
    if (newVNode.constructor !== void 0)
      return null;
    if (oldVNode._flags & MODE_SUSPENDED) {
      isHydrating = !!(oldVNode._flags & MODE_HYDRATE);
      oldDom = newVNode._dom = oldVNode._dom;
      excessDomChildren = [oldDom];
    }
    if (tmp = options_default._diff)
      tmp(newVNode);
    outer:
      if (typeof newType == "function") {
        try {
          let c, isNew, oldProps, oldState, snapshot, clearProcessingException;
          let newProps = newVNode.props;
          const isClassComponent = "prototype" in newType && newType.prototype.render;
          tmp = newType.contextType;
          let provider = tmp && globalContext[tmp._id];
          let componentContext = tmp ? provider ? provider.props.value : tmp._defaultValue : globalContext;
          if (oldVNode._component) {
            c = newVNode._component = oldVNode._component;
            clearProcessingException = c._processingException = c._pendingError;
          } else {
            if (isClassComponent) {
              newVNode._component = c = new newType(newProps, componentContext);
            } else {
              newVNode._component = c = new BaseComponent(newProps, componentContext);
              c.constructor = newType;
              c.render = doRender;
            }
            if (provider)
              provider.sub(c);
            c.props = newProps;
            if (!c.state)
              c.state = {};
            c.context = componentContext;
            c._globalContext = globalContext;
            isNew = c._dirty = true;
            c._renderCallbacks = [];
            c._stateCallbacks = [];
          }
          if (isClassComponent && c._nextState == null) {
            c._nextState = c.state;
          }
          if (isClassComponent && newType.getDerivedStateFromProps != null) {
            if (c._nextState == c.state) {
              c._nextState = assign({}, c._nextState);
            }
            assign(c._nextState, newType.getDerivedStateFromProps(newProps, c._nextState));
          }
          oldProps = c.props;
          oldState = c.state;
          c._vnode = newVNode;
          if (isNew) {
            if (isClassComponent && newType.getDerivedStateFromProps == null && c.componentWillMount != null) {
              c.componentWillMount();
            }
            if (isClassComponent && c.componentDidMount != null) {
              c._renderCallbacks.push(c.componentDidMount);
            }
          } else {
            if (isClassComponent && newType.getDerivedStateFromProps == null && newProps !== oldProps && c.componentWillReceiveProps != null) {
              c.componentWillReceiveProps(newProps, componentContext);
            }
            if (!c._force && (c.shouldComponentUpdate != null && c.shouldComponentUpdate(newProps, c._nextState, componentContext) === false || newVNode._original === oldVNode._original)) {
              if (newVNode._original !== oldVNode._original) {
                c.props = newProps;
                c.state = c._nextState;
                c._dirty = false;
              }
              newVNode._dom = oldVNode._dom;
              newVNode._children = oldVNode._children;
              newVNode._children.some((vnode) => {
                if (vnode)
                  vnode._parent = newVNode;
              });
              for (let i = 0; i < c._stateCallbacks.length; i++) {
                c._renderCallbacks.push(c._stateCallbacks[i]);
              }
              c._stateCallbacks = [];
              if (c._renderCallbacks.length) {
                commitQueue.push(c);
              }
              break outer;
            }
            if (c.componentWillUpdate != null) {
              c.componentWillUpdate(newProps, c._nextState, componentContext);
            }
            if (isClassComponent && c.componentDidUpdate != null) {
              c._renderCallbacks.push(() => {
                c.componentDidUpdate(oldProps, oldState, snapshot);
              });
            }
          }
          c.context = componentContext;
          c.props = newProps;
          c._parentDom = parentDom;
          c._force = false;
          let renderHook = options_default._render, count = 0;
          if (isClassComponent) {
            c.state = c._nextState;
            c._dirty = false;
            if (renderHook)
              renderHook(newVNode);
            tmp = c.render(c.props, c.state, c.context);
            for (let i = 0; i < c._stateCallbacks.length; i++) {
              c._renderCallbacks.push(c._stateCallbacks[i]);
            }
            c._stateCallbacks = [];
          } else {
            do {
              c._dirty = false;
              if (renderHook)
                renderHook(newVNode);
              tmp = c.render(c.props, c.state, c.context);
              c.state = c._nextState;
            } while (c._dirty && ++count < 25);
          }
          c.state = c._nextState;
          if (c.getChildContext != null) {
            globalContext = assign(assign({}, globalContext), c.getChildContext());
          }
          if (isClassComponent && !isNew && c.getSnapshotBeforeUpdate != null) {
            snapshot = c.getSnapshotBeforeUpdate(oldProps, oldState);
          }
          let isTopLevelFragment = tmp != null && tmp.type === Fragment && tmp.key == null;
          let renderResult = isTopLevelFragment ? tmp.props.children : tmp;
          diffChildren(
            parentDom,
            isArray(renderResult) ? renderResult : [renderResult],
            newVNode,
            oldVNode,
            globalContext,
            namespace,
            excessDomChildren,
            commitQueue,
            oldDom,
            isHydrating,
            refQueue
          );
          c.base = newVNode._dom;
          newVNode._flags &= RESET_MODE;
          if (c._renderCallbacks.length) {
            commitQueue.push(c);
          }
          if (clearProcessingException) {
            c._pendingError = c._processingException = null;
          }
        } catch (e) {
          newVNode._original = null;
          if (isHydrating || excessDomChildren != null) {
            newVNode._flags |= isHydrating ? MODE_HYDRATE | MODE_SUSPENDED : MODE_HYDRATE;
            while (oldDom && oldDom.nodeType === 8 && oldDom.nextSibling) {
              oldDom = oldDom.nextSibling;
            }
            excessDomChildren[excessDomChildren.indexOf(oldDom)] = null;
            newVNode._dom = oldDom;
          } else {
            newVNode._dom = oldVNode._dom;
            newVNode._children = oldVNode._children;
          }
          options_default._catchError(e, newVNode, oldVNode);
        }
      } else if (excessDomChildren == null && newVNode._original === oldVNode._original) {
        newVNode._children = oldVNode._children;
        newVNode._dom = oldVNode._dom;
      } else {
        newVNode._dom = diffElementNodes(
          oldVNode._dom,
          newVNode,
          oldVNode,
          globalContext,
          namespace,
          excessDomChildren,
          commitQueue,
          isHydrating,
          refQueue
        );
      }
    if (tmp = options_default.diffed)
      tmp(newVNode);
  }
  function commitRoot(commitQueue, root, refQueue) {
    root._nextDom = void 0;
    for (let i = 0; i < refQueue.length; i++) {
      applyRef(refQueue[i], refQueue[++i], refQueue[++i]);
    }
    if (options_default._commit)
      options_default._commit(root, commitQueue);
    commitQueue.some((c) => {
      try {
        commitQueue = c._renderCallbacks;
        c._renderCallbacks = [];
        commitQueue.some((cb) => {
          cb.call(c);
        });
      } catch (e) {
        options_default._catchError(e, c._vnode);
      }
    });
  }
  function diffElementNodes(dom, newVNode, oldVNode, globalContext, namespace, excessDomChildren, commitQueue, isHydrating, refQueue) {
    let oldProps = oldVNode.props;
    let newProps = newVNode.props;
    let nodeType = (
      /** @type {string} */
      newVNode.type
    );
    let i;
    let newHtml;
    let oldHtml;
    let newChildren;
    let value;
    let inputValue;
    let checked;
    if (nodeType === "svg")
      namespace = "http://www.w3.org/2000/svg";
    else if (nodeType === "math")
      namespace = "http://www.w3.org/1998/Math/MathML";
    else if (!namespace)
      namespace = "http://www.w3.org/1999/xhtml";
    if (excessDomChildren != null) {
      for (i = 0; i < excessDomChildren.length; i++) {
        value = excessDomChildren[i];
        if (value && "setAttribute" in value === !!nodeType && (nodeType ? value.localName === nodeType : value.nodeType === 3)) {
          dom = value;
          excessDomChildren[i] = null;
          break;
        }
      }
    }
    if (dom == null) {
      if (nodeType === null) {
        return document.createTextNode(newProps);
      }
      dom = document.createElementNS(namespace, nodeType, newProps.is && newProps);
      if (isHydrating) {
        if (options_default._hydrationMismatch)
          options_default._hydrationMismatch(newVNode, excessDomChildren);
        isHydrating = false;
      }
      excessDomChildren = null;
    }
    if (nodeType === null) {
      if (oldProps !== newProps && (!isHydrating || dom.data !== newProps)) {
        dom.data = newProps;
      }
    } else {
      excessDomChildren = excessDomChildren && slice.call(dom.childNodes);
      oldProps = oldVNode.props || EMPTY_OBJ;
      if (!isHydrating && excessDomChildren != null) {
        oldProps = {};
        for (i = 0; i < dom.attributes.length; i++) {
          value = dom.attributes[i];
          oldProps[value.name] = value.value;
        }
      }
      for (i in oldProps) {
        value = oldProps[i];
        if (i == "children") {
        } else if (i == "dangerouslySetInnerHTML") {
          oldHtml = value;
        } else if (!(i in newProps)) {
          if (i == "value" && "defaultValue" in newProps || i == "checked" && "defaultChecked" in newProps) {
            continue;
          }
          setProperty(dom, i, null, value, namespace);
        }
      }
      for (i in newProps) {
        value = newProps[i];
        if (i == "children") {
          newChildren = value;
        } else if (i == "dangerouslySetInnerHTML") {
          newHtml = value;
        } else if (i == "value") {
          inputValue = value;
        } else if (i == "checked") {
          checked = value;
        } else if ((!isHydrating || typeof value == "function") && oldProps[i] !== value) {
          setProperty(dom, i, value, oldProps[i], namespace);
        }
      }
      if (newHtml) {
        if (!isHydrating && (!oldHtml || newHtml.__html !== oldHtml.__html && newHtml.__html !== dom.innerHTML)) {
          dom.innerHTML = newHtml.__html;
        }
        newVNode._children = [];
      } else {
        if (oldHtml)
          dom.innerHTML = "";
        diffChildren(
          dom,
          isArray(newChildren) ? newChildren : [newChildren],
          newVNode,
          oldVNode,
          globalContext,
          nodeType === "foreignObject" ? "http://www.w3.org/1999/xhtml" : namespace,
          excessDomChildren,
          commitQueue,
          excessDomChildren ? excessDomChildren[0] : oldVNode._children && getDomSibling(oldVNode, 0),
          isHydrating,
          refQueue
        );
        if (excessDomChildren != null) {
          for (i = excessDomChildren.length; i--; ) {
            removeNode(excessDomChildren[i]);
          }
        }
      }
      if (!isHydrating) {
        i = "value";
        if (nodeType === "progress" && inputValue == null) {
          dom.removeAttribute("value");
        } else if (inputValue !== void 0 && // #2756 For the <progress>-element the initial value is 0,
        // despite the attribute not being present. When the attribute
        // is missing the progress bar is treated as indeterminate.
        // To fix that we'll always update it when it is 0 for progress elements
        (inputValue !== dom[i] || nodeType === "progress" && !inputValue || // This is only for IE 11 to fix <select> value not being updated.
        // To avoid a stale select value we need to set the option.value
        // again, which triggers IE11 to re-evaluate the select value
        nodeType === "option" && inputValue !== oldProps[i])) {
          setProperty(dom, i, inputValue, oldProps[i], namespace);
        }
        i = "checked";
        if (checked !== void 0 && checked !== dom[i]) {
          setProperty(dom, i, checked, oldProps[i], namespace);
        }
      }
    }
    return dom;
  }
  function applyRef(ref, value, vnode) {
    try {
      if (typeof ref == "function") {
        let hasRefUnmount = typeof ref._unmount == "function";
        if (hasRefUnmount) {
          ref._unmount();
        }
        if (!hasRefUnmount || value != null) {
          ref._unmount = ref(value);
        }
      } else
        ref.current = value;
    } catch (e) {
      options_default._catchError(e, vnode);
    }
  }
  function unmount(vnode, parentVNode, skipRemove) {
    let r;
    if (options_default.unmount)
      options_default.unmount(vnode);
    if (r = vnode.ref) {
      if (!r.current || r.current === vnode._dom) {
        applyRef(r, null, parentVNode);
      }
    }
    if ((r = vnode._component) != null) {
      if (r.componentWillUnmount) {
        try {
          r.componentWillUnmount();
        } catch (e) {
          options_default._catchError(e, parentVNode);
        }
      }
      r.base = r._parentDom = null;
    }
    if (r = vnode._children) {
      for (let i = 0; i < r.length; i++) {
        if (r[i]) {
          unmount(r[i], parentVNode, skipRemove || typeof vnode.type != "function");
        }
      }
    }
    if (!skipRemove) {
      removeNode(vnode._dom);
    }
    vnode._component = vnode._parent = vnode._dom = vnode._nextDom = void 0;
  }
  function doRender(props, state, context) {
    return this.constructor(props, context);
  }

  // node_modules/@rikarin/preactor/preact/render.js
  function render(vnode, parentDom, replaceNode) {
    if (options_default._root)
      options_default._root(vnode, parentDom);
    let isHydrating = typeof replaceNode == "function";
    let oldVNode = isHydrating ? null : replaceNode && replaceNode._children || parentDom._children;
    vnode = (!isHydrating && replaceNode || parentDom)._children = createElement(Fragment, null, [vnode]);
    let commitQueue = [], refQueue = [];
    diff(
      parentDom,
      // Determine the new vnode tree and store it on the DOM element on
      // our custom `_children` property.
      vnode,
      oldVNode || EMPTY_OBJ,
      EMPTY_OBJ,
      parentDom.namespaceURI,
      !isHydrating && replaceNode ? [replaceNode] : oldVNode ? null : parentDom.firstChild ? slice.call(parentDom.childNodes) : null,
      commitQueue,
      !isHydrating && replaceNode ? replaceNode : oldVNode ? oldVNode._dom : parentDom.firstChild,
      isHydrating,
      refQueue
    );
    commitRoot(commitQueue, vnode, refQueue);
  }

  // dist/tsc/Views/ExampleView2/index.js
  var App = () => {
    return createElement("div", { class: "w-full h-full justify-center items-center bg-red-500 text-white text-2xl" }, controller.Text);
  };
  render(createElement(App, null), document.body);
})();
