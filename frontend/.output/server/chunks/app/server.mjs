import { v as vue_cjs_prod, r as require$$0, s as serverRenderer } from '../handlers/renderer.mjs';
import { hasProtocol, joinURL, isEqual, withBase, withQuery } from 'ufo';
import axios from 'axios';
import { u as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'h3';
import 'unenv/runtime/mock/proxy';
import 'stream';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';

/**
 * SSR Window 4.0.2
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2021, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: December 13, 2021
 */
/* eslint-disable no-param-reassign */
function isObject$2(obj) {
    return (obj !== null &&
        typeof obj === 'object' &&
        'constructor' in obj &&
        obj.constructor === Object);
}
function extend$1(target = {}, src = {}) {
    Object.keys(src).forEach((key) => {
        if (typeof target[key] === 'undefined')
            target[key] = src[key];
        else if (isObject$2(src[key]) &&
            isObject$2(target[key]) &&
            Object.keys(src[key]).length > 0) {
            extend$1(target[key], src[key]);
        }
    });
}

const ssrDocument = {
    body: {},
    addEventListener() { },
    removeEventListener() { },
    activeElement: {
        blur() { },
        nodeName: '',
    },
    querySelector() {
        return null;
    },
    querySelectorAll() {
        return [];
    },
    getElementById() {
        return null;
    },
    createEvent() {
        return {
            initEvent() { },
        };
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() { },
            getElementsByTagName() {
                return [];
            },
        };
    },
    createElementNS() {
        return {};
    },
    importNode() {
        return null;
    },
    location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: '',
    },
};
function getDocument() {
    const doc = typeof document !== 'undefined' ? document : {};
    extend$1(doc, ssrDocument);
    return doc;
}

function nextTick(callback, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  return setTimeout(callback, delay);
}

/* eslint no-underscore-dangle: "off" */
function Autoplay(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  let timeout;
  swiper.autoplay = {
    running: false,
    paused: false
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });

  function run() {
    const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
    let delay = swiper.params.autoplay.delay;

    if ($activeSlideEl.attr('data-swiper-autoplay')) {
      delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
    }

    clearTimeout(timeout);
    timeout = nextTick(() => {
      let autoplayResult;

      if (swiper.params.autoplay.reverseDirection) {
        if (swiper.params.loop) {
          swiper.loopFix();
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit('autoplay');
        } else if (!swiper.isBeginning) {
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
          emit('autoplay');
        } else {
          stop();
        }
      } else if (swiper.params.loop) {
        swiper.loopFix();
        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        emit('autoplay');
      } else if (!swiper.isEnd) {
        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        emit('autoplay');
      } else if (!swiper.params.autoplay.stopOnLastSlide) {
        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
        emit('autoplay');
      } else {
        stop();
      }

      if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {
        run();
      }
    }, delay);
  }

  function start() {
    if (typeof timeout !== 'undefined') return false;
    if (swiper.autoplay.running) return false;
    swiper.autoplay.running = true;
    emit('autoplayStart');
    run();
    return true;
  }

  function stop() {
    if (!swiper.autoplay.running) return false;
    if (typeof timeout === 'undefined') return false;

    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }

    swiper.autoplay.running = false;
    emit('autoplayStop');
    return true;
  }

  function pause(speed) {
    if (!swiper.autoplay.running) return;
    if (swiper.autoplay.paused) return;
    if (timeout) clearTimeout(timeout);
    swiper.autoplay.paused = true;

    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
      swiper.autoplay.paused = false;
      run();
    } else {
      ['transitionend', 'webkitTransitionEnd'].forEach(event => {
        swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
      });
    }
  }

  function onVisibilityChange() {
    const document = getDocument();

    if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
      pause();
    }

    if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
      run();
      swiper.autoplay.paused = false;
    }
  }

  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
    if (e.target !== swiper.$wrapperEl[0]) return;
    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
      swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
    swiper.autoplay.paused = false;

    if (!swiper.autoplay.running) {
      stop();
    } else {
      run();
    }
  }

  function onMouseEnter() {
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
    } else {
      emit('autoplayPause');
      pause();
    }

    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
      swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
  }

  function onMouseLeave() {
    if (swiper.params.autoplay.disableOnInteraction) {
      return;
    }

    swiper.autoplay.paused = false;
    emit('autoplayResume');
    run();
  }

  function attachMouseEvents() {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.$el.on('mouseenter', onMouseEnter);
      swiper.$el.on('mouseleave', onMouseLeave);
    }
  }

  function detachMouseEvents() {
    swiper.$el.off('mouseenter', onMouseEnter);
    swiper.$el.off('mouseleave', onMouseLeave);
  }

  on('init', () => {
    if (swiper.params.autoplay.enabled) {
      start();
      const document = getDocument();
      document.addEventListener('visibilitychange', onVisibilityChange);
      attachMouseEvents();
    }
  });
  on('beforeTransitionStart', (_s, speed, internal) => {
    if (swiper.autoplay.running) {
      if (internal || !swiper.params.autoplay.disableOnInteraction) {
        swiper.autoplay.pause(speed);
      } else {
        stop();
      }
    }
  });
  on('sliderFirstMove', () => {
    if (swiper.autoplay.running) {
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        pause();
      }
    }
  });
  on('touchEnd', () => {
    if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
      run();
    }
  });
  on('destroy', () => {
    detachMouseEvents();

    if (swiper.autoplay.running) {
      stop();
    }

    const document = getDocument();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });
  Object.assign(swiper.autoplay, {
    pause,
    run,
    start,
    stop
  });
}

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^["{[]|^-?[0-9][0-9.]{0,14}$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor") {
    return;
  }
  return value;
}
function destr(val) {
  if (typeof val !== "string") {
    return val;
  }
  const _lval = val.toLowerCase();
  if (_lval === "true") {
    return true;
  }
  if (_lval === "false") {
    return false;
  }
  if (_lval === "null") {
    return null;
  }
  if (_lval === "nan") {
    return NaN;
  }
  if (_lval === "infinity") {
    return Infinity;
  }
  if (_lval === "undefined") {
    return void 0;
  }
  if (!JsonSigRx.test(val)) {
    return val;
  }
  try {
    if (suspectProtoRx.test(val) || suspectConstructorRx.test(val)) {
      return JSON.parse(val, jsonParseTransform);
    }
    return JSON.parse(val);
  } catch (_e) {
    return val;
  }
}
class FetchError extends Error {
  constructor() {
    super(...arguments);
    this.name = "FetchError";
  }
}
function createFetchError(request, error, response) {
  let message = "";
  if (request && response) {
    message = `${response.status} ${response.statusText} (${request.toString()})`;
  }
  if (error) {
    message = `${error.message} (${message})`;
  }
  const fetchError = new FetchError(message);
  Object.defineProperty(fetchError, "request", { get() {
    return request;
  } });
  Object.defineProperty(fetchError, "response", { get() {
    return response;
  } });
  Object.defineProperty(fetchError, "data", { get() {
    return response && response._data;
  } });
  return fetchError;
}
const payloadMethods = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(val) {
  if (val === void 0) {
    return false;
  }
  const t = typeof val;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(val)) {
    return true;
  }
  return val.constructor && val.constructor.name === "Object" || typeof val.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*`\-.^~]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift();
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  409,
  425,
  429,
  500,
  502,
  503,
  504
]);
function createFetch(globalOptions) {
  const { fetch: fetch2, Headers: Headers2 } = globalOptions;
  function onError(ctx) {
    if (ctx.options.retry !== false) {
      const retries = typeof ctx.options.retry === "number" ? ctx.options.retry : isPayloadMethod(ctx.options.method) ? 0 : 1;
      const responseCode = ctx.response && ctx.response.status || 500;
      if (retries > 0 && retryStatusCodes.has(responseCode)) {
        return $fetchRaw(ctx.request, __spreadProps(__spreadValues({}, ctx.options), {
          retry: retries - 1
        }));
      }
    }
    const err = createFetchError(ctx.request, ctx.error, ctx.response);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(err, $fetchRaw);
    }
    throw err;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _opts = {}) {
    const ctx = {
      request: _request,
      options: __spreadValues(__spreadValues({}, globalOptions.defaults), _opts),
      response: void 0,
      error: void 0
    };
    if (ctx.options.onRequest) {
      await ctx.options.onRequest(ctx);
    }
    if (typeof ctx.request === "string") {
      if (ctx.options.baseURL) {
        ctx.request = withBase(ctx.request, ctx.options.baseURL);
      }
      if (ctx.options.params) {
        ctx.request = withQuery(ctx.request, ctx.options.params);
      }
      if (ctx.options.body && isPayloadMethod(ctx.options.method)) {
        if (isJSONSerializable(ctx.options.body)) {
          ctx.options.body = JSON.stringify(ctx.options.body);
          ctx.options.headers = new Headers2(ctx.options.headers);
          if (!ctx.options.headers.has("content-type")) {
            ctx.options.headers.set("content-type", "application/json");
          }
          if (!ctx.options.headers.has("accept")) {
            ctx.options.headers.set("accept", "application/json");
          }
        }
      }
    }
    ctx.response = await fetch2(ctx.request, ctx.options).catch(async (error) => {
      ctx.error = error;
      if (ctx.options.onRequestError) {
        await ctx.options.onRequestError(ctx);
      }
      return onError(ctx);
    });
    const responseType = (ctx.options.parseResponse ? "json" : ctx.options.responseType) || detectResponseType(ctx.response.headers.get("content-type") || "");
    if (responseType === "json") {
      const data = await ctx.response.text();
      const parseFn = ctx.options.parseResponse || destr;
      ctx.response._data = parseFn(data);
    } else {
      ctx.response._data = await ctx.response[responseType]();
    }
    if (ctx.options.onResponse) {
      await ctx.options.onResponse(ctx);
    }
    if (!ctx.response.ok) {
      if (ctx.options.onResponseError) {
        await ctx.options.onResponseError(ctx);
      }
    }
    return ctx.response.ok ? ctx.response : onError(ctx);
  };
  const $fetch2 = function $fetch22(request, opts) {
    return $fetchRaw(request, opts).then((r) => r._data);
  };
  $fetch2.raw = $fetchRaw;
  $fetch2.create = (defaultOptions = {}) => createFetch(__spreadProps(__spreadValues({}, globalOptions), {
    defaults: __spreadValues(__spreadValues({}, globalOptions.defaults), defaultOptions)
  }));
  return $fetch2;
}
const _globalThis$2 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
const fetch = _globalThis$2.fetch || (() => Promise.reject(new Error("[ohmyfetch] global.fetch is not supported!")));
const Headers = _globalThis$2.Headers;
const $fetch = createFetch({ fetch, Headers });
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
function serialCaller(hooks, args) {
  return hooks.reduce((promise, hookFn) => promise.then(() => hookFn.apply(void 0, args)), Promise.resolve(null));
}
function parallelCaller(hooks, args) {
  return Promise.all(hooks.map((hook) => hook.apply(void 0, args)));
}
class Hookable {
  constructor() {
    this._hooks = {};
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, fn) {
    if (!name || typeof fn !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let deprecatedHookObj;
    while (this._deprecatedHooks[name]) {
      const deprecatedHook = this._deprecatedHooks[name];
      if (typeof deprecatedHook === "string") {
        deprecatedHookObj = { to: deprecatedHook };
      } else {
        deprecatedHookObj = deprecatedHook;
      }
      name = deprecatedHookObj.to;
    }
    if (deprecatedHookObj) {
      if (!deprecatedHookObj.message) {
        console.warn(`${originalName} hook has been deprecated` + (deprecatedHookObj.to ? `, please use ${deprecatedHookObj.to}` : ""));
      } else {
        console.warn(deprecatedHookObj.message);
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(fn);
    return () => {
      if (fn) {
        this.removeHook(name, fn);
        fn = null;
      }
    };
  }
  hookOnce(name, fn) {
    let _unreg;
    let _fn = (...args) => {
      _unreg();
      _unreg = null;
      _fn = null;
      return fn(...args);
    };
    _unreg = this.hook(name, _fn);
    return _unreg;
  }
  removeHook(name, fn) {
    if (this._hooks[name]) {
      const idx = this._hooks[name].indexOf(fn);
      if (idx !== -1) {
        this._hooks[name].splice(idx, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = deprecated;
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
    return () => {
      removeFns.splice(0, removeFns.length).forEach((unreg) => unreg());
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  callHook(name, ...args) {
    return serialCaller(this._hooks[name] || [], args);
  }
  callHookParallel(name, ...args) {
    return parallelCaller(this._hooks[name] || [], args);
  }
  callHookWith(caller, name, ...args) {
    return caller(this._hooks[name] || [], args);
  }
}
function createHooks() {
  return new Hookable();
}
function createContext() {
  let currentInstance = null;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  return {
    use: () => currentInstance,
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = null;
      isSingleton = false;
    },
    call: (instance, cb) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return cb();
      } finally {
        if (!isSingleton) {
          currentInstance = null;
        }
      }
    },
    async callAsync(instance, cb) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = cb();
        if (!isSingleton) {
          currentInstance = null;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace() {
  const contexts = {};
  return {
    get(key) {
      if (!contexts[key]) {
        contexts[key] = createContext();
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey] || (_globalThis$1[globalKey] = createNamespace());
const getContext = (key) => defaultNamespace.get(key);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis$1[asyncHandlersKey] || (_globalThis$1[asyncHandlersKey] = /* @__PURE__ */ new Set());
function createMock(name, overrides = {}) {
  const fn = function() {
  };
  fn.prototype.name = name;
  const props = {};
  return new Proxy(fn, {
    get(_target, prop) {
      if (prop === "caller") {
        return null;
      }
      if (prop === "__createMock__") {
        return createMock;
      }
      if (prop in overrides) {
        return overrides[prop];
      }
      return props[prop] = props[prop] || createMock(`${name}.${prop.toString()}`);
    },
    apply(_target, _this, _args) {
      return createMock(`${name}()`);
    },
    construct(_target, _args, _newT) {
      return createMock(`[${name}]`);
    },
    enumerate(_target) {
      return [];
    }
  });
}
const mockContext = createMock("mock");
function mock(warning) {
  console.warn(warning);
  return mockContext;
}
const unsupported = /* @__PURE__ */ new Set([
  "store",
  "spa",
  "fetchCounters"
]);
const todo = /* @__PURE__ */ new Set([
  "isHMR",
  "base",
  "payload",
  "from",
  "next",
  "error",
  "redirect",
  "redirected",
  "enablePreview",
  "$preview",
  "beforeNuxtRender",
  "beforeSerialize"
]);
const routerKeys = ["route", "params", "query"];
const staticFlags = {
  isClient: false,
  isServer: true,
  isDev: false,
  isStatic: void 0,
  target: "server",
  modern: false
};
const legacyPlugin = (nuxtApp) => {
  nuxtApp._legacyContext = new Proxy(nuxtApp, {
    get(nuxt, p) {
      if (unsupported.has(p)) {
        return mock(`Accessing ${p} is not supported in Nuxt 3.`);
      }
      if (todo.has(p)) {
        return mock(`Accessing ${p} is not yet supported in Nuxt 3.`);
      }
      if (routerKeys.includes(p)) {
        if (!("$router" in nuxtApp)) {
          return mock("vue-router is not being used in this project.");
        }
        switch (p) {
          case "route":
            return nuxt.$router.currentRoute.value;
          case "params":
          case "query":
            return nuxt.$router.currentRoute.value[p];
        }
      }
      if (p === "$config" || p === "env") {
        return useRuntimeConfig();
      }
      if (p in staticFlags) {
        return staticFlags[p];
      }
      if (p === "ssrContext") {
        return nuxt._legacyContext;
      }
      if (nuxt.ssrContext && p in nuxt.ssrContext) {
        return nuxt.ssrContext[p];
      }
      if (p === "nuxt") {
        return nuxt.payload;
      }
      if (p === "nuxtState") {
        return nuxt.payload.data;
      }
      if (p in nuxtApp.vueApp) {
        return nuxtApp.vueApp[p];
      }
      if (p in nuxtApp) {
        return nuxtApp[p];
      }
      return mock(`Accessing ${p} is not supported in Nuxt3.`);
    }
  });
};
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = __spreadValues({
    provide: void 0,
    globalName: "nuxt",
    payload: vue_cjs_prod.reactive(__spreadValues({
      data: {},
      state: {},
      _errors: {}
    }, { serverRendered: true })),
    isHydrating: false,
    _asyncDataPromises: {}
  }, options);
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  if (nuxtApp.ssrContext) {
    nuxtApp.ssrContext.nuxt = nuxtApp;
  }
  {
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    nuxtApp.ssrContext.payload = nuxtApp.payload;
  }
  {
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  let needsLegacyContext = false;
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return () => {
      };
    }
    if (isLegacyPlugin(plugin)) {
      needsLegacyContext = true;
      return (nuxtApp) => plugin(nuxtApp._legacyContext, nuxtApp.provide);
    }
    return plugin;
  });
  if (needsLegacyContext) {
    plugins2.unshift(legacyPlugin);
  }
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function isLegacyPlugin(plugin) {
  return !plugin[NuxtPluginIndicator];
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const vm = vue_cjs_prod.getCurrentInstance();
  if (!vm) {
    const nuxtAppInstance = nuxtAppCtx.use();
    if (!nuxtAppInstance) {
      throw new Error("nuxt instance unavailable");
    }
    return nuxtAppInstance;
  }
  return vm.appContext.app.$nuxt;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var vueRouter_cjs_prod = {};
/*!
  * vue-router v4.0.15
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var vue = require$$0;
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  const PolySymbol = (name) => hasSymbol ? Symbol(name) : "_vr_" + name;
  const matchedRouteKey = /* @__PURE__ */ PolySymbol("rvlm");
  const viewDepthKey = /* @__PURE__ */ PolySymbol("rvd");
  const routerKey = /* @__PURE__ */ PolySymbol("r");
  const routeLocationKey = /* @__PURE__ */ PolySymbol("rl");
  const routerViewLocationKey = /* @__PURE__ */ PolySymbol("rvl");
  function isESModule(obj) {
    return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === "Module";
  }
  const assign = Object.assign;
  function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
      const value = params[key];
      newParams[key] = Array.isArray(value) ? value.map(fn) : fn(value);
    }
    return newParams;
  }
  const noop = () => {
  };
  const TRAILING_SLASH_RE = /\/$/;
  const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
  function parseURL(parseQuery2, location2, currentLocation = "/") {
    let path, query = {}, searchString = "", hash = "";
    const searchPos = location2.indexOf("?");
    const hashPos = location2.indexOf("#", searchPos > -1 ? searchPos : 0);
    if (searchPos > -1) {
      path = location2.slice(0, searchPos);
      searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
      query = parseQuery2(searchString);
    }
    if (hashPos > -1) {
      path = path || location2.slice(0, hashPos);
      hash = location2.slice(hashPos, location2.length);
    }
    path = resolveRelativePath(path != null ? path : location2, currentLocation);
    return {
      fullPath: path + (searchString && "?") + searchString + hash,
      path,
      query,
      hash
    };
  }
  function stringifyURL(stringifyQuery2, location2) {
    const query = location2.query ? stringifyQuery2(location2.query) : "";
    return location2.path + (query && "?") + query + (location2.hash || "");
  }
  function stripBase(pathname, base) {
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
      return pathname;
    return pathname.slice(base.length) || "/";
  }
  function isSameRouteLocation(stringifyQuery2, a, b) {
    const aLastIndex = a.matched.length - 1;
    const bLastIndex = b.matched.length - 1;
    return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
  }
  function isSameRouteRecord(a, b) {
    return (a.aliasOf || a) === (b.aliasOf || b);
  }
  function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length)
      return false;
    for (const key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b[key]))
        return false;
    }
    return true;
  }
  function isSameRouteLocationParamsValue(a, b) {
    return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : a === b;
  }
  function isEquivalentArray(a, b) {
    return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
  }
  function resolveRelativePath(to, from) {
    if (to.startsWith("/"))
      return to;
    if (!to)
      return from;
    const fromSegments = from.split("/");
    const toSegments = to.split("/");
    let position = fromSegments.length - 1;
    let toPosition;
    let segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
      segment = toSegments[toPosition];
      if (position === 1 || segment === ".")
        continue;
      if (segment === "..")
        position--;
      else
        break;
    }
    return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
  }
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  const START = "";
  function normalizeBase(base) {
    if (!base) {
      {
        base = "/";
      }
    }
    if (base[0] !== "/" && base[0] !== "#")
      base = "/" + base;
    return removeTrailingSlash(base);
  }
  const BEFORE_HASH_RE = /^[^#]+#/;
  function createHref(base, location2) {
    return base.replace(BEFORE_HASH_RE, "#") + location2;
  }
  const computeScrollPosition = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset
  });
  let createBaseLocation = () => location.protocol + "//" + location.host;
  function createCurrentLocation(base, location2) {
    const { pathname, search: search2, hash } = location2;
    const hashPos = base.indexOf("#");
    if (hashPos > -1) {
      let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
      let pathFromHash = hash.slice(slicePos);
      if (pathFromHash[0] !== "/")
        pathFromHash = "/" + pathFromHash;
      return stripBase(pathFromHash, "");
    }
    const path = stripBase(pathname, base);
    return path + search2 + hash;
  }
  function useHistoryListeners(base, historyState, currentLocation, replace) {
    let listeners = [];
    let teardowns = [];
    let pauseState = null;
    const popStateHandler = ({ state }) => {
      const to = createCurrentLocation(base, location);
      const from = currentLocation.value;
      const fromState = historyState.value;
      let delta = 0;
      if (state) {
        currentLocation.value = to;
        historyState.value = state;
        if (pauseState && pauseState === from) {
          pauseState = null;
          return;
        }
        delta = fromState ? state.position - fromState.position : 0;
      } else {
        replace(to);
      }
      listeners.forEach((listener) => {
        listener(currentLocation.value, from, {
          delta,
          type: NavigationType.pop,
          direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
        });
      });
    };
    function pauseListeners() {
      pauseState = currentLocation.value;
    }
    function listen(callback) {
      listeners.push(callback);
      const teardown = () => {
        const index2 = listeners.indexOf(callback);
        if (index2 > -1)
          listeners.splice(index2, 1);
      };
      teardowns.push(teardown);
      return teardown;
    }
    function beforeUnloadListener() {
      const { history: history2 } = window;
      if (!history2.state)
        return;
      history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
    }
    function destroy() {
      for (const teardown of teardowns)
        teardown();
      teardowns = [];
      window.removeEventListener("popstate", popStateHandler);
      window.removeEventListener("beforeunload", beforeUnloadListener);
    }
    window.addEventListener("popstate", popStateHandler);
    window.addEventListener("beforeunload", beforeUnloadListener);
    return {
      pauseListeners,
      listen,
      destroy
    };
  }
  function buildState(back, current, forward, replaced = false, computeScroll = false) {
    return {
      back,
      current,
      forward,
      replaced,
      position: window.history.length,
      scroll: computeScroll ? computeScrollPosition() : null
    };
  }
  function useHistoryStateNavigation(base) {
    const { history: history2, location: location2 } = window;
    const currentLocation = {
      value: createCurrentLocation(base, location2)
    };
    const historyState = { value: history2.state };
    if (!historyState.value) {
      changeLocation(currentLocation.value, {
        back: null,
        current: currentLocation.value,
        forward: null,
        position: history2.length - 1,
        replaced: true,
        scroll: null
      }, true);
    }
    function changeLocation(to, state, replace2) {
      const hashIndex = base.indexOf("#");
      const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
      try {
        history2[replace2 ? "replaceState" : "pushState"](state, "", url);
        historyState.value = state;
      } catch (err) {
        {
          console.error(err);
        }
        location2[replace2 ? "replace" : "assign"](url);
      }
    }
    function replace(to, data) {
      const state = assign({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position });
      changeLocation(to, state, true);
      currentLocation.value = to;
    }
    function push(to, data) {
      const currentState = assign({}, historyState.value, history2.state, {
        forward: to,
        scroll: computeScrollPosition()
      });
      changeLocation(currentState.current, currentState, true);
      const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
      changeLocation(to, state, false);
      currentLocation.value = to;
    }
    return {
      location: currentLocation,
      state: historyState,
      push,
      replace
    };
  }
  function createWebHistory(base) {
    base = normalizeBase(base);
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta, triggerListeners = true) {
      if (!triggerListeners)
        historyListeners.pauseListeners();
      history.go(delta);
    }
    const routerHistory = assign({
      location: "",
      base,
      go,
      createHref: createHref.bind(null, base)
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => historyNavigation.location.value
    });
    Object.defineProperty(routerHistory, "state", {
      enumerable: true,
      get: () => historyNavigation.state.value
    });
    return routerHistory;
  }
  function createMemoryHistory(base = "") {
    let listeners = [];
    let queue = [START];
    let position = 0;
    base = normalizeBase(base);
    function setLocation(location2) {
      position++;
      if (position === queue.length) {
        queue.push(location2);
      } else {
        queue.splice(position);
        queue.push(location2);
      }
    }
    function triggerListeners(to, from, { direction, delta }) {
      const info = {
        direction,
        delta,
        type: NavigationType.pop
      };
      for (const callback of listeners) {
        callback(to, from, info);
      }
    }
    const routerHistory = {
      location: START,
      state: {},
      base,
      createHref: createHref.bind(null, base),
      replace(to) {
        queue.splice(position--, 1);
        setLocation(to);
      },
      push(to, data) {
        setLocation(to);
      },
      listen(callback) {
        listeners.push(callback);
        return () => {
          const index2 = listeners.indexOf(callback);
          if (index2 > -1)
            listeners.splice(index2, 1);
        };
      },
      destroy() {
        listeners = [];
        queue = [START];
        position = 0;
      },
      go(delta, shouldTrigger = true) {
        const from = this.location;
        const direction = delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
        position = Math.max(0, Math.min(position + delta, queue.length - 1));
        if (shouldTrigger) {
          triggerListeners(this.location, from, {
            direction,
            delta
          });
        }
      }
    };
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => queue[position]
    });
    return routerHistory;
  }
  function createWebHashHistory(base) {
    base = location.host ? base || location.pathname + location.search : "";
    if (!base.includes("#"))
      base += "#";
    return createWebHistory(base);
  }
  function isRouteLocation(route) {
    return typeof route === "string" || route && typeof route === "object";
  }
  function isRouteName(name) {
    return typeof name === "string" || typeof name === "symbol";
  }
  const START_LOCATION_NORMALIZED = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  };
  const NavigationFailureSymbol = /* @__PURE__ */ PolySymbol("nf");
  exports.NavigationFailureType = void 0;
  (function(NavigationFailureType) {
    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
  })(exports.NavigationFailureType || (exports.NavigationFailureType = {}));
  const ErrorTypeMessages = {
    [1]({ location: location2, currentLocation }) {
      return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
    },
    [2]({ from, to }) {
      return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
    },
    [4]({ from, to }) {
      return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
    },
    [8]({ from, to }) {
      return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
    },
    [16]({ from, to }) {
      return `Avoided redundant navigation to current location: "${from.fullPath}".`;
    }
  };
  function createRouterError(type, params) {
    {
      return assign(new Error(ErrorTypeMessages[type](params)), {
        type,
        [NavigationFailureSymbol]: true
      }, params);
    }
  }
  function isNavigationFailure(error, type) {
    return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
  }
  const propertiesToLog = ["params", "query", "hash"];
  function stringifyRoute(to) {
    if (typeof to === "string")
      return to;
    if ("path" in to)
      return to.path;
    const location2 = {};
    for (const key of propertiesToLog) {
      if (key in to)
        location2[key] = to[key];
    }
    return JSON.stringify(location2, null, 2);
  }
  const BASE_PARAM_PATTERN = "[^/]+?";
  const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
  function tokensToParser(segments, extraOptions) {
    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    const score = [];
    let pattern = options.start ? "^" : "";
    const keys = [];
    for (const segment of segments) {
      const segmentScores = segment.length ? [] : [90];
      if (options.strict && !segment.length)
        pattern += "/";
      for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
        const token = segment[tokenIndex];
        let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
        if (token.type === 0) {
          if (!tokenIndex)
            pattern += "/";
          pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
          subSegmentScore += 40;
        } else if (token.type === 1) {
          const { value, repeatable, optional, regexp } = token;
          keys.push({
            name: value,
            repeatable,
            optional
          });
          const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
          if (re2 !== BASE_PARAM_PATTERN) {
            subSegmentScore += 10;
            try {
              new RegExp(`(${re2})`);
            } catch (err) {
              throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
            }
          }
          let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
          if (!tokenIndex)
            subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
          if (optional)
            subPattern += "?";
          pattern += subPattern;
          subSegmentScore += 20;
          if (optional)
            subSegmentScore += -8;
          if (repeatable)
            subSegmentScore += -20;
          if (re2 === ".*")
            subSegmentScore += -50;
        }
        segmentScores.push(subSegmentScore);
      }
      score.push(segmentScores);
    }
    if (options.strict && options.end) {
      const i = score.length - 1;
      score[i][score[i].length - 1] += 0.7000000000000001;
    }
    if (!options.strict)
      pattern += "/?";
    if (options.end)
      pattern += "$";
    else if (options.strict)
      pattern += "(?:/|$)";
    const re = new RegExp(pattern, options.sensitive ? "" : "i");
    function parse(path) {
      const match = path.match(re);
      const params = {};
      if (!match)
        return null;
      for (let i = 1; i < match.length; i++) {
        const value = match[i] || "";
        const key = keys[i - 1];
        params[key.name] = value && key.repeatable ? value.split("/") : value;
      }
      return params;
    }
    function stringify(params) {
      let path = "";
      let avoidDuplicatedSlash = false;
      for (const segment of segments) {
        if (!avoidDuplicatedSlash || !path.endsWith("/"))
          path += "/";
        avoidDuplicatedSlash = false;
        for (const token of segment) {
          if (token.type === 0) {
            path += token.value;
          } else if (token.type === 1) {
            const { value, repeatable, optional } = token;
            const param = value in params ? params[value] : "";
            if (Array.isArray(param) && !repeatable)
              throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
            const text = Array.isArray(param) ? param.join("/") : param;
            if (!text) {
              if (optional) {
                if (segment.length < 2 && segments.length > 1) {
                  if (path.endsWith("/"))
                    path = path.slice(0, -1);
                  else
                    avoidDuplicatedSlash = true;
                }
              } else
                throw new Error(`Missing required param "${value}"`);
            }
            path += text;
          }
        }
      }
      return path;
    }
    return {
      re,
      score,
      keys,
      parse,
      stringify
    };
  }
  function compareScoreArray(a, b) {
    let i = 0;
    while (i < a.length && i < b.length) {
      const diff = b[i] - a[i];
      if (diff)
        return diff;
      i++;
    }
    if (a.length < b.length) {
      return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
    } else if (a.length > b.length) {
      return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
    }
    return 0;
  }
  function comparePathParserScore(a, b) {
    let i = 0;
    const aScore = a.score;
    const bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
      const comp = compareScoreArray(aScore[i], bScore[i]);
      if (comp)
        return comp;
      i++;
    }
    return bScore.length - aScore.length;
  }
  const ROOT_TOKEN = {
    type: 0,
    value: ""
  };
  const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
  function tokenizePath(path) {
    if (!path)
      return [[]];
    if (path === "/")
      return [[ROOT_TOKEN]];
    if (!path.startsWith("/")) {
      throw new Error(`Invalid path "${path}"`);
    }
    function crash(message) {
      throw new Error(`ERR (${state})/"${buffer}": ${message}`);
    }
    let state = 0;
    let previousState = state;
    const tokens = [];
    let segment;
    function finalizeSegment() {
      if (segment)
        tokens.push(segment);
      segment = [];
    }
    let i = 0;
    let char;
    let buffer = "";
    let customRe = "";
    function consumeBuffer() {
      if (!buffer)
        return;
      if (state === 0) {
        segment.push({
          type: 0,
          value: buffer
        });
      } else if (state === 1 || state === 2 || state === 3) {
        if (segment.length > 1 && (char === "*" || char === "+"))
          crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
        segment.push({
          type: 1,
          value: buffer,
          regexp: customRe,
          repeatable: char === "*" || char === "+",
          optional: char === "*" || char === "?"
        });
      } else {
        crash("Invalid state to consume buffer");
      }
      buffer = "";
    }
    function addCharToBuffer() {
      buffer += char;
    }
    while (i < path.length) {
      char = path[i++];
      if (char === "\\" && state !== 2) {
        previousState = state;
        state = 4;
        continue;
      }
      switch (state) {
        case 0:
          if (char === "/") {
            if (buffer) {
              consumeBuffer();
            }
            finalizeSegment();
          } else if (char === ":") {
            consumeBuffer();
            state = 1;
          } else {
            addCharToBuffer();
          }
          break;
        case 4:
          addCharToBuffer();
          state = previousState;
          break;
        case 1:
          if (char === "(") {
            state = 2;
          } else if (VALID_PARAM_RE.test(char)) {
            addCharToBuffer();
          } else {
            consumeBuffer();
            state = 0;
            if (char !== "*" && char !== "?" && char !== "+")
              i--;
          }
          break;
        case 2:
          if (char === ")") {
            if (customRe[customRe.length - 1] == "\\")
              customRe = customRe.slice(0, -1) + char;
            else
              state = 3;
          } else {
            customRe += char;
          }
          break;
        case 3:
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
          customRe = "";
          break;
        default:
          crash("Unknown state");
          break;
      }
    }
    if (state === 2)
      crash(`Unfinished custom RegExp for param "${buffer}"`);
    consumeBuffer();
    finalizeSegment();
    return tokens;
  }
  function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    const matcher = assign(parser, {
      record,
      parent,
      children: [],
      alias: []
    });
    if (parent) {
      if (!matcher.record.aliasOf === !parent.record.aliasOf)
        parent.children.push(matcher);
    }
    return matcher;
  }
  function createRouterMatcher(routes2, globalOptions) {
    const matchers = [];
    const matcherMap = /* @__PURE__ */ new Map();
    globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
    function getRecordMatcher(name) {
      return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
      const isRootAdd = !originalRecord;
      const mainNormalizedRecord = normalizeRouteRecord(record);
      mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
      const options = mergeOptions(globalOptions, record);
      const normalizedRecords = [
        mainNormalizedRecord
      ];
      if ("alias" in record) {
        const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
        for (const alias of aliases) {
          normalizedRecords.push(assign({}, mainNormalizedRecord, {
            components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
            path: alias,
            aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          }));
        }
      }
      let matcher;
      let originalMatcher;
      for (const normalizedRecord of normalizedRecords) {
        const { path } = normalizedRecord;
        if (parent && path[0] !== "/") {
          const parentPath = parent.record.path;
          const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
          normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
        }
        matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
        if (originalRecord) {
          originalRecord.alias.push(matcher);
        } else {
          originalMatcher = originalMatcher || matcher;
          if (originalMatcher !== matcher)
            originalMatcher.alias.push(matcher);
          if (isRootAdd && record.name && !isAliasRecord(matcher))
            removeRoute(record.name);
        }
        if ("children" in mainNormalizedRecord) {
          const children = mainNormalizedRecord.children;
          for (let i = 0; i < children.length; i++) {
            addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
          }
        }
        originalRecord = originalRecord || matcher;
        insertMatcher(matcher);
      }
      return originalMatcher ? () => {
        removeRoute(originalMatcher);
      } : noop;
    }
    function removeRoute(matcherRef) {
      if (isRouteName(matcherRef)) {
        const matcher = matcherMap.get(matcherRef);
        if (matcher) {
          matcherMap.delete(matcherRef);
          matchers.splice(matchers.indexOf(matcher), 1);
          matcher.children.forEach(removeRoute);
          matcher.alias.forEach(removeRoute);
        }
      } else {
        const index2 = matchers.indexOf(matcherRef);
        if (index2 > -1) {
          matchers.splice(index2, 1);
          if (matcherRef.record.name)
            matcherMap.delete(matcherRef.record.name);
          matcherRef.children.forEach(removeRoute);
          matcherRef.alias.forEach(removeRoute);
        }
      }
    }
    function getRoutes() {
      return matchers;
    }
    function insertMatcher(matcher) {
      let i = 0;
      while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0 && (matcher.record.path !== matchers[i].record.path || !isRecordChildOf(matcher, matchers[i])))
        i++;
      matchers.splice(i, 0, matcher);
      if (matcher.record.name && !isAliasRecord(matcher))
        matcherMap.set(matcher.record.name, matcher);
    }
    function resolve(location2, currentLocation) {
      let matcher;
      let params = {};
      let path;
      let name;
      if ("name" in location2 && location2.name) {
        matcher = matcherMap.get(location2.name);
        if (!matcher)
          throw createRouterError(1, {
            location: location2
          });
        name = matcher.record.name;
        params = assign(paramsFromLocation(currentLocation.params, matcher.keys.filter((k) => !k.optional).map((k) => k.name)), location2.params);
        path = matcher.stringify(params);
      } else if ("path" in location2) {
        path = location2.path;
        matcher = matchers.find((m) => m.re.test(path));
        if (matcher) {
          params = matcher.parse(path);
          name = matcher.record.name;
        }
      } else {
        matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
        if (!matcher)
          throw createRouterError(1, {
            location: location2,
            currentLocation
          });
        name = matcher.record.name;
        params = assign({}, currentLocation.params, location2.params);
        path = matcher.stringify(params);
      }
      const matched = [];
      let parentMatcher = matcher;
      while (parentMatcher) {
        matched.unshift(parentMatcher.record);
        parentMatcher = parentMatcher.parent;
      }
      return {
        name,
        path,
        params,
        matched,
        meta: mergeMetaFields(matched)
      };
    }
    routes2.forEach((route) => addRoute(route));
    return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
  }
  function paramsFromLocation(params, keys) {
    const newParams = {};
    for (const key of keys) {
      if (key in params)
        newParams[key] = params[key];
    }
    return newParams;
  }
  function normalizeRouteRecord(record) {
    return {
      path: record.path,
      redirect: record.redirect,
      name: record.name,
      meta: record.meta || {},
      aliasOf: void 0,
      beforeEnter: record.beforeEnter,
      props: normalizeRecordProps(record),
      children: record.children || [],
      instances: {},
      leaveGuards: /* @__PURE__ */ new Set(),
      updateGuards: /* @__PURE__ */ new Set(),
      enterCallbacks: {},
      components: "components" in record ? record.components || {} : { default: record.component }
    };
  }
  function normalizeRecordProps(record) {
    const propsObject = {};
    const props = record.props || false;
    if ("component" in record) {
      propsObject.default = props;
    } else {
      for (const name in record.components)
        propsObject[name] = typeof props === "boolean" ? props : props[name];
    }
    return propsObject;
  }
  function isAliasRecord(record) {
    while (record) {
      if (record.record.aliasOf)
        return true;
      record = record.parent;
    }
    return false;
  }
  function mergeMetaFields(matched) {
    return matched.reduce((meta2, record) => assign(meta2, record.meta), {});
  }
  function mergeOptions(defaults, partialOptions) {
    const options = {};
    for (const key in defaults) {
      options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
    }
    return options;
  }
  function isRecordChildOf(record, parent) {
    return parent.children.some((child) => child === record || isRecordChildOf(record, child));
  }
  const HASH_RE = /#/g;
  const AMPERSAND_RE = /&/g;
  const SLASH_RE = /\//g;
  const EQUAL_RE = /=/g;
  const IM_RE = /\?/g;
  const PLUS_RE = /\+/g;
  const ENC_BRACKET_OPEN_RE = /%5B/g;
  const ENC_BRACKET_CLOSE_RE = /%5D/g;
  const ENC_CARET_RE = /%5E/g;
  const ENC_BACKTICK_RE = /%60/g;
  const ENC_CURLY_OPEN_RE = /%7B/g;
  const ENC_PIPE_RE = /%7C/g;
  const ENC_CURLY_CLOSE_RE = /%7D/g;
  const ENC_SPACE_RE = /%20/g;
  function commonEncode(text) {
    return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
  }
  function encodeHash(text) {
    return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryValue(text) {
    return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
  }
  function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
  }
  function encodeParam(text) {
    return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
  }
  function decode(text) {
    try {
      return decodeURIComponent("" + text);
    } catch (err) {
    }
    return "" + text;
  }
  function parseQuery(search2) {
    const query = {};
    if (search2 === "" || search2 === "?")
      return query;
    const hasLeadingIM = search2[0] === "?";
    const searchParams = (hasLeadingIM ? search2.slice(1) : search2).split("&");
    for (let i = 0; i < searchParams.length; ++i) {
      const searchParam = searchParams[i].replace(PLUS_RE, " ");
      const eqPos = searchParam.indexOf("=");
      const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
      const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
      if (key in query) {
        let currentValue = query[key];
        if (!Array.isArray(currentValue)) {
          currentValue = query[key] = [currentValue];
        }
        currentValue.push(value);
      } else {
        query[key] = value;
      }
    }
    return query;
  }
  function stringifyQuery(query) {
    let search2 = "";
    for (let key in query) {
      const value = query[key];
      key = encodeQueryKey(key);
      if (value == null) {
        if (value !== void 0) {
          search2 += (search2.length ? "&" : "") + key;
        }
        continue;
      }
      const values = Array.isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
      values.forEach((value2) => {
        if (value2 !== void 0) {
          search2 += (search2.length ? "&" : "") + key;
          if (value2 != null)
            search2 += "=" + value2;
        }
      });
    }
    return search2;
  }
  function normalizeQuery(query) {
    const normalizedQuery = {};
    for (const key in query) {
      const value = query[key];
      if (value !== void 0) {
        normalizedQuery[key] = Array.isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
      }
    }
    return normalizedQuery;
  }
  function useCallbacks() {
    let handlers = [];
    function add(handler) {
      handlers.push(handler);
      return () => {
        const i = handlers.indexOf(handler);
        if (i > -1)
          handlers.splice(i, 1);
      };
    }
    function reset() {
      handlers = [];
    }
    return {
      add,
      list: () => handlers,
      reset
    };
  }
  function registerGuard(record, name, guard) {
    const removeFromList = () => {
      record[name].delete(guard);
    };
    vue.onUnmounted(removeFromList);
    vue.onDeactivated(removeFromList);
    vue.onActivated(() => {
      record[name].add(guard);
    });
    record[name].add(guard);
  }
  function onBeforeRouteLeave(leaveGuard) {
    const activeRecord = vue.inject(matchedRouteKey, {}).value;
    if (!activeRecord) {
      return;
    }
    registerGuard(activeRecord, "leaveGuards", leaveGuard);
  }
  function onBeforeRouteUpdate(updateGuard) {
    const activeRecord = vue.inject(matchedRouteKey, {}).value;
    if (!activeRecord) {
      return;
    }
    registerGuard(activeRecord, "updateGuards", updateGuard);
  }
  function guardToPromiseFn(guard, to, from, record, name) {
    const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return () => new Promise((resolve, reject) => {
      const next = (valid) => {
        if (valid === false)
          reject(createRouterError(4, {
            from,
            to
          }));
        else if (valid instanceof Error) {
          reject(valid);
        } else if (isRouteLocation(valid)) {
          reject(createRouterError(2, {
            from: to,
            to: valid
          }));
        } else {
          if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function")
            enterCallbackArray.push(valid);
          resolve();
        }
      };
      const guardReturn = guard.call(record && record.instances[name], to, from, next);
      let guardCall = Promise.resolve(guardReturn);
      if (guard.length < 3)
        guardCall = guardCall.then(next);
      guardCall.catch((err) => reject(err));
    });
  }
  function extractComponentsGuards(matched, guardType, to, from) {
    const guards = [];
    for (const record of matched) {
      for (const name in record.components) {
        let rawComponent = record.components[name];
        if (guardType !== "beforeRouteEnter" && !record.instances[name])
          continue;
        if (isRouteComponent(rawComponent)) {
          const options = rawComponent.__vccOpts || rawComponent;
          const guard = options[guardType];
          guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
        } else {
          let componentPromise = rawComponent();
          guards.push(() => componentPromise.then((resolved) => {
            if (!resolved)
              return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
            const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
            record.components[name] = resolvedComponent;
            const options = resolvedComponent.__vccOpts || resolvedComponent;
            const guard = options[guardType];
            return guard && guardToPromiseFn(guard, to, from, record, name)();
          }));
        }
      }
    }
    return guards;
  }
  function isRouteComponent(component) {
    return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
  }
  function useLink(props) {
    const router = vue.inject(routerKey);
    const currentRoute = vue.inject(routeLocationKey);
    const route = vue.computed(() => router.resolve(vue.unref(props.to)));
    const activeRecordIndex = vue.computed(() => {
      const { matched } = route.value;
      const { length } = matched;
      const routeMatched = matched[length - 1];
      const currentMatched = currentRoute.matched;
      if (!routeMatched || !currentMatched.length)
        return -1;
      const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
      if (index2 > -1)
        return index2;
      const parentRecordPath = getOriginalPath(matched[length - 2]);
      return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2;
    });
    const isActive = vue.computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
    const isExactActive = vue.computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e = {}) {
      if (guardEvent(e)) {
        return router[vue.unref(props.replace) ? "replace" : "push"](vue.unref(props.to)).catch(noop);
      }
      return Promise.resolve();
    }
    return {
      route,
      href: vue.computed(() => route.value.href),
      isActive,
      isExactActive,
      navigate
    };
  }
  const RouterLinkImpl = /* @__PURE__ */ vue.defineComponent({
    name: "RouterLink",
    props: {
      to: {
        type: [String, Object],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      }
    },
    useLink,
    setup(props, { slots }) {
      const link = vue.reactive(useLink(props));
      const { options } = vue.inject(routerKey);
      const elClass = vue.computed(() => ({
        [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
        [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
      }));
      return () => {
        const children = slots.default && slots.default(link);
        return props.custom ? children : vue.h("a", {
          "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
          href: link.href,
          onClick: link.navigate,
          class: elClass.value
        }, children);
      };
    }
  });
  const RouterLink = RouterLinkImpl;
  function guardEvent(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
      return;
    if (e.defaultPrevented)
      return;
    if (e.button !== void 0 && e.button !== 0)
      return;
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const target = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target))
        return;
    }
    if (e.preventDefault)
      e.preventDefault();
    return true;
  }
  function includesParams(outer, inner) {
    for (const key in inner) {
      const innerValue = inner[key];
      const outerValue = outer[key];
      if (typeof innerValue === "string") {
        if (innerValue !== outerValue)
          return false;
      } else {
        if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
          return false;
      }
    }
    return true;
  }
  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
  }
  const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
  const RouterViewImpl = /* @__PURE__ */ vue.defineComponent({
    name: "RouterView",
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    compatConfig: { MODE: 3 },
    setup(props, { attrs, slots }) {
      const injectedRoute = vue.inject(routerViewLocationKey);
      const routeToDisplay = vue.computed(() => props.route || injectedRoute.value);
      const depth = vue.inject(viewDepthKey, 0);
      const matchedRouteRef = vue.computed(() => routeToDisplay.value.matched[depth]);
      vue.provide(viewDepthKey, depth + 1);
      vue.provide(matchedRouteKey, matchedRouteRef);
      vue.provide(routerViewLocationKey, routeToDisplay);
      const viewRef = vue.ref();
      vue.watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
        if (to) {
          to.instances[name] = instance;
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) {
              to.leaveGuards = from.leaveGuards;
            }
            if (!to.updateGuards.size) {
              to.updateGuards = from.updateGuards;
            }
          }
        }
        if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
          (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
        }
      }, { flush: "post" });
      return () => {
        const route = routeToDisplay.value;
        const matchedRoute = matchedRouteRef.value;
        const ViewComponent = matchedRoute && matchedRoute.components[props.name];
        const currentName = props.name;
        if (!ViewComponent) {
          return normalizeSlot(slots.default, { Component: ViewComponent, route });
        }
        const routePropsOption = matchedRoute.props[props.name];
        const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
        const onVnodeUnmounted = (vnode) => {
          if (vnode.component.isUnmounted) {
            matchedRoute.instances[currentName] = null;
          }
        };
        const component = vue.h(ViewComponent, assign({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef
        }));
        return normalizeSlot(slots.default, { Component: component, route }) || component;
      };
    }
  });
  function normalizeSlot(slot, data) {
    if (!slot)
      return null;
    const slotContent = slot(data);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
  }
  const RouterView = RouterViewImpl;
  function createRouter(options) {
    const matcher = createRouterMatcher(options.routes, options);
    const parseQuery$1 = options.parseQuery || parseQuery;
    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    const routerHistory = options.history;
    const beforeGuards = useCallbacks();
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const currentRoute = vue.shallowRef(START_LOCATION_NORMALIZED);
    let pendingLocation = START_LOCATION_NORMALIZED;
    const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
    const encodeParams = applyToParams.bind(null, encodeParam);
    const decodeParams = applyToParams.bind(null, decode);
    function addRoute(parentOrRoute, route) {
      let parent;
      let record;
      if (isRouteName(parentOrRoute)) {
        parent = matcher.getRecordMatcher(parentOrRoute);
        record = route;
      } else {
        record = parentOrRoute;
      }
      return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
      const recordMatcher = matcher.getRecordMatcher(name);
      if (recordMatcher) {
        matcher.removeRoute(recordMatcher);
      }
    }
    function getRoutes() {
      return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
    }
    function hasRoute(name) {
      return !!matcher.getRecordMatcher(name);
    }
    function resolve(rawLocation, currentLocation) {
      currentLocation = assign({}, currentLocation || currentRoute.value);
      if (typeof rawLocation === "string") {
        const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
        const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
        const href2 = routerHistory.createHref(locationNormalized.fullPath);
        return assign(locationNormalized, matchedRoute2, {
          params: decodeParams(matchedRoute2.params),
          hash: decode(locationNormalized.hash),
          redirectedFrom: void 0,
          href: href2
        });
      }
      let matcherLocation;
      if ("path" in rawLocation) {
        matcherLocation = assign({}, rawLocation, {
          path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
        });
      } else {
        const targetParams = assign({}, rawLocation.params);
        for (const key in targetParams) {
          if (targetParams[key] == null) {
            delete targetParams[key];
          }
        }
        matcherLocation = assign({}, rawLocation, {
          params: encodeParams(rawLocation.params)
        });
        currentLocation.params = encodeParams(currentLocation.params);
      }
      const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
      const hash = rawLocation.hash || "";
      matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
      const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
        hash: encodeHash(hash),
        path: matchedRoute.path
      }));
      const href = routerHistory.createHref(fullPath);
      return assign({
        fullPath,
        hash,
        query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      }, matchedRoute, {
        redirectedFrom: void 0,
        href
      });
    }
    function locationAsObject(to) {
      return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
    }
    function checkCanceledNavigation(to, from) {
      if (pendingLocation !== to) {
        return createRouterError(8, {
          from,
          to
        });
      }
    }
    function push(to) {
      return pushWithRedirect(to);
    }
    function replace(to) {
      return push(assign(locationAsObject(to), { replace: true }));
    }
    function handleRedirectRecord(to) {
      const lastMatched = to.matched[to.matched.length - 1];
      if (lastMatched && lastMatched.redirect) {
        const { redirect } = lastMatched;
        let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
        if (typeof newTargetLocation === "string") {
          newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
          newTargetLocation.params = {};
        }
        return assign({
          query: to.query,
          hash: to.hash,
          params: to.params
        }, newTargetLocation);
      }
    }
    function pushWithRedirect(to, redirectedFrom) {
      const targetLocation = pendingLocation = resolve(to);
      const from = currentRoute.value;
      const data = to.state;
      const force = to.force;
      const replace2 = to.replace === true;
      const shouldRedirect = handleRedirectRecord(targetLocation);
      if (shouldRedirect)
        return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
          state: data,
          force,
          replace: replace2
        }), redirectedFrom || targetLocation);
      const toLocation = targetLocation;
      toLocation.redirectedFrom = redirectedFrom;
      let failure;
      if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
        failure = createRouterError(16, { to: toLocation, from });
        handleScroll();
      }
      return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
        if (failure2) {
          if (isNavigationFailure(failure2, 2)) {
            return pushWithRedirect(assign(locationAsObject(failure2.to), {
              state: data,
              force,
              replace: replace2
            }), redirectedFrom || toLocation);
          }
        } else {
          failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
        }
        triggerAfterEach(toLocation, from, failure2);
        return failure2;
      });
    }
    function checkCanceledNavigationAndReject(to, from) {
      const error = checkCanceledNavigation(to, from);
      return error ? Promise.reject(error) : Promise.resolve();
    }
    function navigate(to, from) {
      let guards;
      const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
      guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
      for (const record of leavingRecords) {
        record.leaveGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards).then(() => {
        guards = [];
        for (const guard of beforeGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
        for (const record of updatingRecords) {
          record.updateGuards.forEach((guard) => {
            guards.push(guardToPromiseFn(guard, to, from));
          });
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const record of to.matched) {
          if (record.beforeEnter && !from.matched.includes(record)) {
            if (Array.isArray(record.beforeEnter)) {
              for (const beforeEnter of record.beforeEnter)
                guards.push(guardToPromiseFn(beforeEnter, to, from));
            } else {
              guards.push(guardToPromiseFn(record.beforeEnter, to, from));
            }
          }
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        to.matched.forEach((record) => record.enterCallbacks = {});
        guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const guard of beforeResolveGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
    }
    function triggerAfterEach(to, from, failure) {
      for (const guard of afterGuards.list())
        guard(to, from, failure);
    }
    function finalizeNavigation(toLocation, from, isPush, replace2, data) {
      const error = checkCanceledNavigation(toLocation, from);
      if (error)
        return error;
      const isFirstNavigation = from === START_LOCATION_NORMALIZED;
      const state = {};
      if (isPush) {
        if (replace2 || isFirstNavigation)
          routerHistory.replace(toLocation.fullPath, assign({
            scroll: isFirstNavigation && state && state.scroll
          }, data));
        else
          routerHistory.push(toLocation.fullPath, data);
      }
      currentRoute.value = toLocation;
      handleScroll();
      markAsReady();
    }
    let removeHistoryListener;
    function setupListeners() {
      if (removeHistoryListener)
        return;
      removeHistoryListener = routerHistory.listen((to, _from, info) => {
        const toLocation = resolve(to);
        const shouldRedirect = handleRedirectRecord(toLocation);
        if (shouldRedirect) {
          pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
          return;
        }
        pendingLocation = toLocation;
        const from = currentRoute.value;
        navigate(toLocation, from).catch((error) => {
          if (isNavigationFailure(error, 4 | 8)) {
            return error;
          }
          if (isNavigationFailure(error, 2)) {
            pushWithRedirect(error.to, toLocation).then((failure) => {
              if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
                routerHistory.go(-1, false);
              }
            }).catch(noop);
            return Promise.reject();
          }
          if (info.delta)
            routerHistory.go(-info.delta, false);
          return triggerError(error, toLocation, from);
        }).then((failure) => {
          failure = failure || finalizeNavigation(toLocation, from, false);
          if (failure) {
            if (info.delta) {
              routerHistory.go(-info.delta, false);
            } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
              routerHistory.go(-1, false);
            }
          }
          triggerAfterEach(toLocation, from, failure);
        }).catch(noop);
      });
    }
    let readyHandlers = useCallbacks();
    let errorHandlers = useCallbacks();
    let ready;
    function triggerError(error, to, from) {
      markAsReady(error);
      const list = errorHandlers.list();
      if (list.length) {
        list.forEach((handler) => handler(error, to, from));
      } else {
        console.error(error);
      }
      return Promise.reject(error);
    }
    function isReady() {
      if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
        return Promise.resolve();
      return new Promise((resolve2, reject) => {
        readyHandlers.add([resolve2, reject]);
      });
    }
    function markAsReady(err) {
      if (!ready) {
        ready = !err;
        setupListeners();
        readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
        readyHandlers.reset();
      }
      return err;
    }
    function handleScroll(to, from, isPush, isFirstNavigation) {
      return Promise.resolve();
    }
    const go = (delta) => routerHistory.go(delta);
    const installedApps = /* @__PURE__ */ new Set();
    const router = {
      currentRoute,
      addRoute,
      removeRoute,
      hasRoute,
      getRoutes,
      resolve,
      options,
      push,
      replace,
      go,
      back: () => go(-1),
      forward: () => go(1),
      beforeEach: beforeGuards.add,
      beforeResolve: beforeResolveGuards.add,
      afterEach: afterGuards.add,
      onError: errorHandlers.add,
      isReady,
      install(app) {
        const router2 = this;
        app.component("RouterLink", RouterLink);
        app.component("RouterView", RouterView);
        app.config.globalProperties.$router = router2;
        Object.defineProperty(app.config.globalProperties, "$route", {
          enumerable: true,
          get: () => vue.unref(currentRoute)
        });
        const reactiveRoute = {};
        for (const key in START_LOCATION_NORMALIZED) {
          reactiveRoute[key] = vue.computed(() => currentRoute.value[key]);
        }
        app.provide(routerKey, router2);
        app.provide(routeLocationKey, vue.reactive(reactiveRoute));
        app.provide(routerViewLocationKey, currentRoute);
        const unmountApp = app.unmount;
        installedApps.add(app);
        app.unmount = function() {
          installedApps.delete(app);
          if (installedApps.size < 1) {
            pendingLocation = START_LOCATION_NORMALIZED;
            removeHistoryListener && removeHistoryListener();
            removeHistoryListener = null;
            currentRoute.value = START_LOCATION_NORMALIZED;
            ready = false;
          }
          unmountApp();
        };
      }
    };
    return router;
  }
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
  }
  function extractChangingRecords(to, from) {
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length);
    for (let i = 0; i < len; i++) {
      const recordFrom = from.matched[i];
      if (recordFrom) {
        if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
          updatingRecords.push(recordFrom);
        else
          leavingRecords.push(recordFrom);
      }
      const recordTo = to.matched[i];
      if (recordTo) {
        if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
          enteringRecords.push(recordTo);
        }
      }
    }
    return [leavingRecords, updatingRecords, enteringRecords];
  }
  function useRouter2() {
    return vue.inject(routerKey);
  }
  function useRoute2() {
    return vue.inject(routeLocationKey);
  }
  exports.RouterLink = RouterLink;
  exports.RouterView = RouterView;
  exports.START_LOCATION = START_LOCATION_NORMALIZED;
  exports.createMemoryHistory = createMemoryHistory;
  exports.createRouter = createRouter;
  exports.createRouterMatcher = createRouterMatcher;
  exports.createWebHashHistory = createWebHashHistory;
  exports.createWebHistory = createWebHistory;
  exports.isNavigationFailure = isNavigationFailure;
  exports.matchedRouteKey = matchedRouteKey;
  exports.onBeforeRouteLeave = onBeforeRouteLeave;
  exports.onBeforeRouteUpdate = onBeforeRouteUpdate;
  exports.parseQuery = parseQuery;
  exports.routeLocationKey = routeLocationKey;
  exports.routerKey = routerKey;
  exports.routerViewLocationKey = routerViewLocationKey;
  exports.stringifyQuery = stringifyQuery;
  exports.useLink = useLink;
  exports.useRoute = useRoute2;
  exports.useRouter = useRouter2;
  exports.viewDepthKey = viewDepthKey;
})(vueRouter_cjs_prod);
const useState = (key, init) => {
  const nuxt = useNuxtApp();
  const state = vue_cjs_prod.toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (vue_cjs_prod.isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
};
const useError = () => {
  const nuxtApp = useNuxtApp();
  return useState("error", () => nuxtApp.ssrContext.error);
};
const throwError = (_err) => {
  const nuxtApp = useNuxtApp();
  useError();
  const err = typeof _err === "string" ? new Error(_err) : _err;
  nuxtApp.callHook("app:error", err);
  {
    nuxtApp.ssrContext.error = nuxtApp.ssrContext.error || err;
  }
  return err;
};
const MIMES = {
  html: "text/html",
  json: "application/json"
};
const defer = typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function send(event2, data, type) {
  if (type) {
    defaultContentType(event2, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      event2.res.end(data);
      resolve(void 0);
    });
  });
}
function defaultContentType(event2, type) {
  if (type && !event2.res.getHeader("Content-Type")) {
    event2.res.setHeader("Content-Type", type);
  }
}
function sendRedirect(event2, location2, code = 302) {
  event2.res.statusCode = code;
  event2.res.setHeader("Location", location2);
  return send(event2, "Redirecting to " + location2, MIMES.html);
}
class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.statusMessage = "H3Error";
  }
}
function createError(input) {
  var _a;
  if (input instanceof H3Error) {
    return input;
  }
  const err = new H3Error((_a = input.message) != null ? _a : input.statusMessage);
  if (input.statusCode) {
    err.statusCode = input.statusCode;
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  }
  if (input.data) {
    err.data = input.data;
  }
  return err;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options = {}) => {
  if (!to) {
    to = "/";
  }
  if (isProcessingMiddleware()) {
    return to;
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = router.resolve(to).fullPath || "/";
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, options.redirectCode || 301));
    }
  }
  return options.replace ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  const checkPropConflicts = (props, main2, sub) => {
  };
  return vue_cjs_prod.defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = vue_cjs_prod.computed(() => {
        checkPropConflicts(props, "to", "href");
        return props.to || props.href || "";
      });
      const isExternal = vue_cjs_prod.computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      return () => {
        var _a, _b, _c;
        if (!isExternal.value) {
          return vue_cjs_prod.h(vue_cjs_prod.resolveComponent("RouterLink"), {
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue
          }, slots.default);
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        checkPropConflicts(props, "noRel", "rel");
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        return vue_cjs_prod.h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$h = defineNuxtLink({ componentName: "NuxtLink" });
var shared_cjs_prod = {};
Object.defineProperty(shared_cjs_prod, "__esModule", { value: true });
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `HYDRATE_EVENTS`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `HOISTED`,
  [-2]: `BAIL`
};
const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};
const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
const isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index2;
  let lastIndex = 0;
  for (index2 = match.index; index2 < str.length; index2++) {
    switch (str.charCodeAt(index2)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index2) {
      html += str.slice(lastIndex, index2);
    }
    lastIndex = index2 + 1;
    html += escaped;
  }
  return lastIndex !== index2 ? html + str.slice(lastIndex, index2) : html;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject$1(a);
  bValidType = isObject$1(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => val instanceof Date;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
};
shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
shared_cjs_prod.NO = NO;
shared_cjs_prod.NOOP = NOOP;
shared_cjs_prod.PatchFlagNames = PatchFlagNames;
shared_cjs_prod.camelize = camelize;
shared_cjs_prod.capitalize = capitalize;
shared_cjs_prod.def = def;
shared_cjs_prod.escapeHtml = escapeHtml;
shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
shared_cjs_prod.extend = extend;
shared_cjs_prod.generateCodeFrame = generateCodeFrame;
shared_cjs_prod.getGlobalThis = getGlobalThis;
shared_cjs_prod.hasChanged = hasChanged;
shared_cjs_prod.hasOwn = hasOwn;
shared_cjs_prod.hyphenate = hyphenate;
shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
shared_cjs_prod.invokeArrayFns = invokeArrayFns;
shared_cjs_prod.isArray = isArray;
shared_cjs_prod.isBooleanAttr = isBooleanAttr;
shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
shared_cjs_prod.isDate = isDate;
var isFunction_1 = shared_cjs_prod.isFunction = isFunction;
shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
shared_cjs_prod.isHTMLTag = isHTMLTag;
shared_cjs_prod.isIntegerKey = isIntegerKey;
shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
shared_cjs_prod.isMap = isMap;
shared_cjs_prod.isModelListener = isModelListener;
shared_cjs_prod.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
shared_cjs_prod.isObject = isObject$1;
shared_cjs_prod.isOn = isOn;
shared_cjs_prod.isPlainObject = isPlainObject;
shared_cjs_prod.isPromise = isPromise;
shared_cjs_prod.isReservedProp = isReservedProp;
shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
shared_cjs_prod.isSVGTag = isSVGTag;
shared_cjs_prod.isSet = isSet;
shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
shared_cjs_prod.isString = isString;
shared_cjs_prod.isSymbol = isSymbol;
shared_cjs_prod.isVoidTag = isVoidTag;
shared_cjs_prod.looseEqual = looseEqual;
shared_cjs_prod.looseIndexOf = looseIndexOf;
shared_cjs_prod.makeMap = makeMap;
shared_cjs_prod.normalizeClass = normalizeClass;
shared_cjs_prod.normalizeProps = normalizeProps;
shared_cjs_prod.normalizeStyle = normalizeStyle;
shared_cjs_prod.objectToString = objectToString;
shared_cjs_prod.parseStringStyle = parseStringStyle;
shared_cjs_prod.propsToAttrMap = propsToAttrMap;
shared_cjs_prod.remove = remove;
shared_cjs_prod.slotFlagsText = slotFlagsText;
shared_cjs_prod.stringifyStyle = stringifyStyle;
shared_cjs_prod.toDisplayString = toDisplayString;
shared_cjs_prod.toHandlerKey = toHandlerKey;
shared_cjs_prod.toNumber = toNumber;
shared_cjs_prod.toRawType = toRawType;
shared_cjs_prod.toTypeString = toTypeString;
function useHead(meta2) {
  const resolvedMeta = isFunction_1(meta2) ? vue_cjs_prod.computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const preload = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    beforeCreate() {
      const { _registeredComponents } = this.$nuxt.ssrContext;
      const { __moduleIdentifier } = this.$options;
      _registeredComponents.add(__moduleIdentifier);
    }
  });
});
const components = {};
function componentsPlugin_1c46d626(nuxtApp) {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
}
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var createElement = (tag, attrs, document2) => {
  const el = document2.createElement(tag);
  for (const key of Object.keys(attrs)) {
    let value = attrs[key];
    if (key === "key" || value === false) {
      continue;
    }
    if (key === "children") {
      el.textContent = value;
    } else {
      el.setAttribute(key, value);
    }
  }
  return el;
};
var htmlEscape = (str) => str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = htmlEscape(key);
    if (value !== true) {
      attribute += `="${htmlEscape(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var getTagKey = (props) => {
  const names = ["key", "id", "name", "property"];
  for (const n of names) {
    const value = typeof props.getAttribute === "function" ? props.hasAttribute(n) ? props.getAttribute(n) : void 0 : props[n];
    if (value !== void 0) {
      return { name: n, value };
    }
  }
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "htmlAttrs",
  "bodyAttrs"
];
var headObjToTags = (obj) => {
  const tags = [];
  for (const key of Object.keys(obj)) {
    if (obj[key] == null)
      continue;
    if (key === "title") {
      tags.push({ tag: key, props: { children: obj[key] } });
    } else if (key === "base") {
      tags.push({ tag: key, props: __spreadValues2({ key: "default" }, obj[key]) });
    } else if (acceptFields.includes(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          tags.push({ tag: key, props: item });
        });
      } else if (value) {
        tags.push({ tag: key, props: value });
      }
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a;
  const head = document2.head;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldElements = [];
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_a = j == null ? void 0 : j.tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldElements.push(j);
      }
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => createElement(tag.tag, tag.props, document2));
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldElements.length; i++) {
      const oldEl = oldElements[i];
      if (isEqualNode(oldEl, newEl)) {
        oldElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    head.insertBefore(t, headCountEl);
  });
  headCountEl.setAttribute("content", "" + (headCount - oldElements.length + newElements.length));
};
var createHead = () => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(objs.value);
        tags.forEach((tag) => {
          if (tag.tag === "meta" || tag.tag === "base" || tag.tag === "script") {
            const key = getTagKey(tag.props);
            if (key) {
              let index2 = -1;
              for (let i = 0; i < deduped.length; i++) {
                const prev = deduped[i];
                const prevValue = prev.props[key.name];
                const nextValue = tag.props[key.name];
                if (prev.tag === tag.tag && prevValue === nextValue) {
                  index2 = i;
                  break;
                }
              }
              if (index2 !== -1) {
                deduped.splice(index2, 1);
              }
            }
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document2 = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document2.title = title;
      }
      setAttrs(document2.documentElement, htmlAttrs);
      setAttrs(document2.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document2, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}>`;
  }
  return `<${tag.tag}${attrs}>${tag.props.children || ""}</${tag.tag}>`;
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  for (const tag of head.headTags) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs(__spreadProps2(__spreadValues2({}, htmlAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      }));
    },
    get bodyAttrs() {
      return stringifyAttrs(__spreadProps2(__spreadValues2({}, bodyAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      }));
    }
  };
};
function isObject(val) {
  return val !== null && typeof val === "object";
}
function _defu(baseObj, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObj, {}, namespace, merger);
  }
  const obj = Object.assign({}, defaults);
  for (const key in baseObj) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const val = baseObj[key];
    if (val === null || val === void 0) {
      continue;
    }
    if (merger && merger(obj, key, val, namespace)) {
      continue;
    }
    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = val.concat(obj[key]);
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      obj[key] = val;
    }
  }
  return obj;
}
function createDefu(merger) {
  return (...args) => args.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defu = createDefu();
const vueuseHead_429d0d1c = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    vue_cjs_prod.watchEffect(() => {
      head.updateDOM();
    });
  });
  const titleTemplate = vue_cjs_prod.ref();
  nuxtApp._useHead = (_meta) => {
    const meta2 = vue_cjs_prod.ref(_meta);
    if ("titleTemplate" in meta2.value) {
      titleTemplate.value = meta2.value.titleTemplate;
    }
    const headObj = vue_cjs_prod.computed(() => {
      const overrides = { meta: [] };
      if (titleTemplate.value && "title" in meta2.value) {
        overrides.title = typeof titleTemplate.value === "function" ? titleTemplate.value(meta2.value.title) : titleTemplate.value.replace(/%s/g, meta2.value.title);
      }
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => renderHeadToString(head);
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory(__spreadValues(__spreadValues({}, removeUndefinedProps(props)), ctx.attrs), ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = vue_cjs_prod.defineComponent({
  name: "Script",
  props: __spreadProps(__spreadValues({}, globalProps), {
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  }),
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const Link = vue_cjs_prod.defineComponent({
  name: "Link",
  props: __spreadProps(__spreadValues({}, globalProps), {
    as: String,
    crossorigin: String,
    disabled: Boolean,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  }),
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = vue_cjs_prod.defineComponent({
  name: "Base",
  props: __spreadProps(__spreadValues({}, globalProps), {
    href: String,
    target: String
  }),
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = vue_cjs_prod.defineComponent({
  name: "Title",
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = vue_cjs_prod.defineComponent({
  name: "Meta",
  props: __spreadProps(__spreadValues({}, globalProps), {
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  }),
  setup: setupForUseMeta((meta2) => ({
    meta: [meta2]
  }))
});
const Style = vue_cjs_prod.defineComponent({
  name: "Style",
  props: __spreadProps(__spreadValues({}, globalProps), {
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  }),
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = __spreadValues({}, props);
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = vue_cjs_prod.defineComponent({
  name: "Head",
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = vue_cjs_prod.defineComponent({
  name: "Html",
  props: __spreadProps(__spreadValues({}, globalProps), {
    manifest: String,
    version: String,
    xmlns: String
  }),
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = vue_cjs_prod.defineComponent({
  name: "Body",
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const metaConfig = { "globalMeta": { "charset": "utf-8", "viewport": "width=device-width, initial-scale=1", "meta": [], "link": [{ "rel": "shortcut icon", "type": "image/x-icon", "href": "/img/favicon.png" }, { "rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&family=Raleway:wght@300;400;500;600;700;800&display=swap" }], "style": [], "script": [], "name": "viewport", "content": "width=device-width, initial-scale=1", "title": "Eduman \u2013 Education & Online Courses Vue Nuxt Template" } };
const metaMixin = {
  created() {
    const instance = vue_cjs_prod.getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? vue_cjs_prod.computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const _699c5566 = defineNuxtPlugin((nuxtApp) => {
  useHead(vue_cjs_prod.markRaw(metaConfig.globalMeta));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => m.components.default === routeProps.Component.type);
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = {
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
};
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? vue_cjs_prod.h(component, props === true ? {} : props, slots) : vue_cjs_prod.h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = vue_cjs_prod.defineComponent({
  name: "NuxtPage",
  props: {
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props) {
    const nuxtApp = useNuxtApp();
    const isNested = vue_cjs_prod.inject(isNestedKey, false);
    vue_cjs_prod.provide(isNestedKey, true);
    return () => {
      return vue_cjs_prod.h(vueRouter_cjs_prod.RouterView, {}, {
        default: (routeProps) => {
          var _a;
          return routeProps.Component && _wrapIf(vue_cjs_prod.Transition, (_a = routeProps.route.meta.pageTransition) != null ? _a : defaultPageTransition, wrapInKeepAlive(routeProps.route.meta.keepalive, isNested && nuxtApp.isHydrating ? vue_cjs_prod.h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) : vue_cjs_prod.h(vue_cjs_prod.Suspense, {
            onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
            onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
          }, { default: () => vue_cjs_prod.h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) }))).default();
        }
      });
    };
  }
});
const defaultPageTransition = { name: "page", mode: "out-in" };
const _imports_0$e = publicAssetsURL(`img/logo/footer-logo.png`);
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$18 = {
  name: "app",
  data() {
    return {
      subscribeData: {
        Email: ""
      },
      subscribed: false,
      subscribeError: false,
      subscribeEmailError: false,
      errorMessage: ""
    };
  },
  methods: {
    async userSubscribe() {
      if (this.validateEmail(this.subscribeData.Email)) {
        axios.post("http://143.42.142.151:4000/basic/subscribe", this.subscribeData).then((response) => {
          console.log(response);
          this.subscribeError = false;
          this.subscribeEmailError = false;
          this.subscribed = true;
        }).catch((error) => {
          if (error.response) {
            this.subscribeError = true;
            this.errorMessage = error.response.data.message;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
            this.subscribeError = true;
            this.errorMessage = error.request;
          } else {
            console.log("Error", error.message);
            this.subscribeError = true;
            this.errorMessage = error.message;
          }
        });
      } else {
        this.subscribeEmailError = true;
      }
    },
    validateEmail(data) {
      console.log(data);
      const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data);
      return result;
    }
  }
};
function _sfc_ssrRender$13(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<footer${serverRenderer.exports.ssrRenderAttrs(_attrs)}><div class="footer-area pt-100"><div class="container"><div class="footer-main mb-60"><div class="row"><div class="col-xl-3 col-lg-3 col-md-6 col-sm-6"><div class="footer-widget f-w1 mb-40"><div class="footer-img">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$e)} alt="footer-logo"${_scopeId}>`);
      } else {
        return [
          vue_cjs_prod.createVNode("img", {
            src: _imports_0$e,
            alt: "footer-logo"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p>Great lesson ideas and lesson plans for ESL teachers! Educators can customize lessons as best plans to knowledge.</p></div><div class="footer-icon"><a href="#"><i class="fab fa-facebook-f"></i></a><a href="#"><i class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-instagram"></i></a><a href="#"><i class="fab fa-linkedin-in"></i></a></div></div></div><div class="col-xl-3 col-lg-3 col-md-6 col-sm-6"><div class="footer-widget f-w2 mb-40"><h3>Online Platform</h3><ul><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Proper Guidelines`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Proper Guidelines")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Digital Library`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Digital Library")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Compare Us`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Compare Us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Become Instructor`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Become Instructor")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Build Career`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Build Career")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div><div class="col-xl-3 col-lg-3 col-md-6 col-sm-6"><div class="footer-widget f-w3 mb-40"><h3>Browse Courses</h3><ul><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Development`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Development")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Business`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Business")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Health &amp; Fitness`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Health & Fitness")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Life Styles`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Life Styles")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Photography`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Photography")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div><div class="col-xl-3 col-lg-3 col-md-6 col-sm-6"><div class="footer-widget f-w4 mb-40"><h3>Insight Community</h3><ul><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Global Partners`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Global Partners")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Forum`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Forum")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Help &amp; Support`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Help & Support")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Community`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Community")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "#" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Documentation`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Documentation")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div></div></div><div class="copyright-area"><div class="container"><div class="row"><div class="col-xl-3 col-lg-3 col-md-6 col-sm-6"><div class="copyright-text border-line"><p>\xA9 Developed by <a href="https://alisor.com" target="_blank"><span>Alisor</span></a></p></div></div><div class="col-xl-4 col-lg-4 col-sm-6"><div class="copy-right-support border-line-2"><div class="copy-right-svg"><svg xmlns="http://www.w3.org/2000/svg" width="43.945" height="50" viewBox="0 0 43.945 50"><g id="headphones" transform="translate(-31)"><g id="Group_2171" data-name="Group 2171" transform="translate(36.859 20.508)"><g id="Group_2170" data-name="Group 2170"><path id="Path_2983" data-name="Path 2983" d="M95.395,210A4.4,4.4,0,0,0,91,214.395v11.914a4.395,4.395,0,1,0,8.789,0V214.395A4.4,4.4,0,0,0,95.395,210Z" transform="translate(-91 -210)" fill="#2467ec"></path></g></g><g id="Group_2173" data-name="Group 2173" transform="translate(31 23.669)"><g id="Group_2172" data-name="Group 2172"><path id="Path_2984" data-name="Path 2984" d="M33.93,243.6a7.268,7.268,0,0,1,.125-1.234A4.386,4.386,0,0,0,31,246.529v6.055a4.386,4.386,0,0,0,3.054,4.163,7.268,7.268,0,0,1-.125-1.234Z" transform="translate(-31 -242.366)" fill="#2467ec"></path></g></g><g id="Group_2175" data-name="Group 2175" transform="translate(48.578 20.508)"><g id="Group_2174" data-name="Group 2174"><path id="Path_2985" data-name="Path 2985" d="M227.113,210a4.4,4.4,0,0,0-4.395,4.395v11.914a4.4,4.4,0,0,0,4.395,4.395,4.335,4.335,0,0,0,1.259-.206,4.386,4.386,0,0,1-4.189,3.136h-4.664a4.395,4.395,0,1,0,0,2.93h4.664a7.333,7.333,0,0,0,7.324-7.324V214.395A4.4,4.4,0,0,0,227.113,210Z" transform="translate(-211 -210)" fill="#2467ec"></path></g></g><g id="Group_2177" data-name="Group 2177" transform="translate(71.891 23.669)"><g id="Group_2176" data-name="Group 2176"><path id="Path_2986" data-name="Path 2986" d="M449.722,242.366a7.266,7.266,0,0,1,.125,1.234v11.914a7.266,7.266,0,0,1-.125,1.234,4.386,4.386,0,0,0,3.055-4.163v-6.055A4.386,4.386,0,0,0,449.722,242.366Z" transform="translate(-449.722 -242.366)" fill="#2467ec"></path></g></g><g id="Group_2179" data-name="Group 2179" transform="translate(31)"><g id="Group_2178" data-name="Group 2178"><path id="Path_2987" data-name="Path 2987" d="M52.973,0A22,22,0,0,0,31,21.973v.037a7.253,7.253,0,0,1,3-1.361,19.02,19.02,0,0,1,37.952,0,7.256,7.256,0,0,1,3,1.361v-.037A22,22,0,0,0,52.973,0Z" transform="translate(-31)" fill="#2467ec"></path></g></g></g></svg></div><div class="copyright-svg-content"><p>Have a question? Call us 24/7</p><h5><a href="tel:(987)547587587">(987) 547587587</a></h5></div></div></div><div class="col-xl-5 col-lg-5 col-md-12"><div class="copyright-subcribe"><form class="widget__subscribe"><div class="field"><input${serverRenderer.exports.ssrRenderAttr("value", $data.subscribeData.Email)} type="email" placeholder="Enter Email"></div>`);
  if ($data.subscribeError) {
    _push(`<div class="my-20 text-center"><p class="text-md text-danger">${serverRenderer.exports.ssrInterpolate($data.errorMessage)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.subscribed) {
    _push(`<div class="my-20 text-center"><p class="text-md text-success">Thank you for subscribing</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.subscribeEmailError) {
    _push(`<div class="my-20 text-center"><p class="text-md text-danger">Please Enter Valid Email</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button type="submit">Subscribe<i class="fas fa-paper-plane"></i></button></form></div></div></div></div></div></div></div></footer>`);
}
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/FooterOne.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const FooterOne = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["ssrRender", _sfc_ssrRender$13]]);
const _imports_0$d = publicAssetsURL(`img/logo/logo-black.png`);
const _imports_1$8 = publicAssetsURL(`img/sing-up/sign-up.png`);
const _imports_2$8 = publicAssetsURL(`img/sing-up/sign-up-message.png`);
const _sfc_main$17 = {
  name: "app",
  data() {
    return {
      SignUpData: {
        FName: "",
        LName: "",
        Email: "",
        password: "",
        DOB: "",
        Gender: "",
        PrefferedSport: "",
        prefferedLocation: ""
      },
      SignInEmail: "",
      SignInPass: "",
      errorMessage: "",
      SignInError: false,
      SignUpError: false,
      loggedIn: false,
      SignInEmailError: false,
      SignUpEmailError: false,
      showSignIn: false,
      showSignUp: false,
      hideReminder: false,
      valueFour: 1,
      valueFive: 1,
      valueSix: 1,
      isSticky: false,
      showSidebar: false,
      menuOption: {
        menuShow: false,
        homeDropdown: false,
        eventsDropdown: false,
        shopDropdown: false,
        pagesDropDown: false,
        instructorDropDown: false,
        faqDropDown: false,
        eventDropDown: false,
        blogDropdown: false
      },
      isAdmin: false,
      searchQuery: ""
    };
  },
  methods: {
    handleSticky() {
      if (window.scrollY > 50) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
    handleSidebar() {
      this.showSidebar = true;
    },
    handleSidebarClose() {
      this.showSidebar = false;
    },
    handleSignIn() {
      return this.showSignIn = !this.showSignIn;
    },
    handleSignUp() {
      return this.showSignUp = !this.showSignUp;
    },
    handleReminder() {
      return this.hideReminder = !this.hideReminder;
    },
    handleIncreaseValue(value) {
      if (value === "valueFour") {
        this.valueFour++;
      }
      if (value === "valueFive") {
        this.valueFive++;
      }
      if (value === "valueSix") {
        this.valueSix++;
      }
    },
    handleDecreaseValue(value) {
      if (value === "valueFour" && this.valueFour > 0) {
        this.valueFour--;
      }
      if (value === "valueFive" && this.valueFive > 0) {
        this.valueFive--;
      }
      if (value === "valueSix" && this.valueSix > 0) {
        this.valueSix--;
      }
    },
    async userRegister() {
      if (this.validateEmail(this.SignUpData.Email)) {
        axios.post("http://143.42.142.151:4000/users/register", this.SignUpData).then((response) => {
          console.log(response);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("UserData", JSON.stringify(response.data));
          this.$router.go("/dashboard");
        }).catch((error) => {
          if (error.response) {
            this.SignUpError = true;
            this.errorMessage = error.response.data.message;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
            this.SignUpError = true;
            this.errorMessage = error.request;
          } else {
            console.log("Error", error.message);
            this.SignUpError = true;
            this.errorMessage = error.message;
          }
        });
      } else {
        this.SignUpEmailError = true;
      }
    },
    async userLogin() {
      if (this.validateEmail(this.SignInEmail)) {
        axios.post("http://143.42.142.151:4000/users/authenticate", {
          Email: this.SignInEmail,
          password: this.SignInPass
        }).then((res) => {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("UserData", JSON.stringify(res.data));
          this.$router.go("/dashboard");
        }).catch((error) => {
          if (error.response) {
            this.SignInError = true;
            this.errorMessage = error.response.data.message;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
            this.SignInError = true;
            this.errorMessage = error.request;
          } else {
            console.log("Error", error.message);
            this.SignInError = true;
            this.errorMessage = error.message;
          }
        });
      } else {
        this.SignInEmailError = true;
      }
    },
    validateEmail(data) {
      console.log(data);
      const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data);
      return result;
    },
    handleLogOut() {
      window.localStorage.clear();
      this.$router.replace("/");
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleSticky);
  },
  beforeMount() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
      if (JSON.parse(localStorage.UserData).Status === "Admin") {
        this.isAdmin = true;
      }
    }
  }
};
function _sfc_ssrRender$12(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-169bcd2a><header data-v-169bcd2a><div class="header-top-area d-none d-lg-block" data-v-169bcd2a><div class="container-fluid" data-v-169bcd2a><div class="header-top-inner" data-v-169bcd2a><div class="row align-items-center" data-v-169bcd2a><div class="col-xl-8 col-lg-8" data-v-169bcd2a><div class="header-top-icon" data-v-169bcd2a><a href="tel:(555)674890556" data-v-169bcd2a><i class="fas fa-phone" data-v-169bcd2a></i>(555) 674 890 556</a><a href="mailto:info@example.com" data-v-169bcd2a><i class="fal fa-envelope" data-v-169bcd2a></i>info@example.com</a><i class="fal fa-map-marker-alt" data-v-169bcd2a></i><span data-v-169bcd2a>3rd Avenue, San Francisco</span></div></div></div></div></div></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.isSticky ? "header-area sticky-header sticky" : "header-area sticky-header"}`)}" data-v-169bcd2a><div class="container-fluid" data-v-169bcd2a><div class="header-main-wrapper" data-v-169bcd2a><div class="row align-items-center" data-v-169bcd2a><div class="col-xl-7 col-lg-7 col-md-5 col-sm-9 col-9" data-v-169bcd2a><div class="header-left d-flex align-items-center" data-v-169bcd2a><div class="header-logo" data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$d)} alt="logo" data-v-169bcd2a${_scopeId}>`);
      } else {
        return [
          vue_cjs_prod.createVNode("img", {
            src: _imports_0$d,
            alt: "logo"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="main-menu menu-margin d-none d-xl-block" data-v-169bcd2a><nav id="mobile-menu" data-v-169bcd2a><ul data-v-169bcd2a><li data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li>`);
  if ($data.loggedIn) {
    _push(`<li data-v-169bcd2a>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/dashboard" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Dashboard`);
        } else {
          return [
            vue_cjs_prod.createTextVNode("Dashboard")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<li data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/about" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("About")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="menu-item-has-children" data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "javascript:void(0)" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Events`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Events")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<ul class="sub-menu" data-v-169bcd2a><li data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/event" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Upcoming Event`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Upcoming Event")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, null, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Expired Events `);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Expired Events ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></li><li data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Contact")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></nav></div></div></div><div class="col-xl-5 col-lg-5 col-md-7 col-sm-3 col-3" data-v-169bcd2a><div class="header-right d-flex align-items-center justify-content-end" data-v-169bcd2a><div class="header-search w-50 d-none d-xl-block mr-30" data-v-169bcd2a><div data-v-169bcd2a><div class="search-icon p-relative" data-v-169bcd2a><input class="mr-10 w-75"${serverRenderer.exports.ssrRenderAttr("value", $data.searchQuery)} required type="text" placeholder="Search courses..." data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    to: `/search?find=${$data.searchQuery}`
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fas fa-search" data-v-169bcd2a${_scopeId}></i>`);
      } else {
        return [
          vue_cjs_prod.createVNode("i", { class: "fas fa-search" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
  if ($data.loggedIn) {
    _push(`<div class="d-inline-flex justify-content-center align-items-center" data-v-169bcd2a><div class="user-btn-inner p-relative d-none d-md-block" data-v-169bcd2a><div class="user-btn-wrapper" data-v-169bcd2a><div class="user-btn-content" data-v-169bcd2a><a class="user-btn-sign-in" href="javascript:void(0)" data-v-169bcd2a>Log Out</a></div></div></div>`);
    if ($data.isAdmin) {
      _push(`<div class="d-none d-md-block" data-v-169bcd2a><a class="user-btn-sign-up edu-btn" href="/admin" data-v-169bcd2a>Admin</a></div>`);
    } else {
      _push(`<div class="d-none d-md-block" data-v-169bcd2a><a class="user-btn-sign-up edu-btn" href="/add-event" data-v-169bcd2a>Host Event</a></div>`);
    }
    _push(`</div>`);
  } else {
    _push(`<div class="d-inline-flex justify-content-center align-items-center" data-v-169bcd2a><div class="user-btn-inner p-relative d-none d-md-block" data-v-169bcd2a><div class="user-btn-wrapper" data-v-169bcd2a><div class="user-btn-content" data-v-169bcd2a><a class="user-btn-sign-in" href="javascript:void(0)" data-v-169bcd2a>Sign In</a></div></div></div><div class="d-none d-md-block" data-v-169bcd2a><a class="user-btn-sign-up edu-btn" href="javascript:void(0)" data-v-169bcd2a>Sign Up</a></div></div>`);
  }
  _push(`<div class="menu-bar d-xl-none ml-20" data-v-169bcd2a><a class="side-toggle" href="javascript:void(0)" data-v-169bcd2a><div class="bar-icon" data-v-169bcd2a><span data-v-169bcd2a></span><span data-v-169bcd2a></span><span data-v-169bcd2a></span></div></a></div></div></div></div></div></div></div></header><div class="fix" data-v-169bcd2a><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSidebar ? "side-info info-open" : "side-info"}`)}" data-v-169bcd2a><div class="side-info-content" data-v-169bcd2a><div class="offset-widget offset-logo mb-40" data-v-169bcd2a><div class="row align-items-center" data-v-169bcd2a><div class="col-9" data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$d)} alt="Logo" data-v-169bcd2a${_scopeId}>`);
      } else {
        return [
          vue_cjs_prod.createVNode("img", {
            src: _imports_0$d,
            alt: "Logo"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="col-3 text-end" data-v-169bcd2a><button class="side-info-close" data-v-169bcd2a><i class="fal fa-times" data-v-169bcd2a></i></button></div></div></div><div class="mobile-menu d-xl-none fix mb-30" data-v-169bcd2a><div class="sidebar-menu mm-menu" data-v-169bcd2a><ul data-v-169bcd2a><li data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li>`);
  if ($data.loggedIn) {
    _push(`<li data-v-169bcd2a>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/dashboard" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Dashboard`);
        } else {
          return [
            vue_cjs_prod.createTextVNode("Dashboard")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<li data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/about" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("About")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="${serverRenderer.exports.ssrRenderClass([[$data.menuOption.eventDropDown === true ? "active" : ""], "menu-item-has-children has-droupdown"])}" data-v-169bcd2a><a data-v-169bcd2a>Event</a><ul class="${serverRenderer.exports.ssrRenderClass([[$data.menuOption.eventDropDown === true ? "active" : ""], "sub-menu"])}" data-v-169bcd2a><li data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/event" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Upcoming Event`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Upcoming Event")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, null, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Expired Events `);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Expired Events ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></li><li data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Contact")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div><div class="offset-widget offset_searchbar mb-30" data-v-169bcd2a><div class="menu-search position-relative" data-v-169bcd2a><div class="filter-search-input" data-v-169bcd2a><input class="mr-10"${serverRenderer.exports.ssrRenderAttr("value", $data.searchQuery)} required type="text" placeholder="Search keyword" data-v-169bcd2a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    to: `/search/?find=${$data.searchQuery}`
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fal fa-search" data-v-169bcd2a${_scopeId}></i>`);
      } else {
        return [
          vue_cjs_prod.createVNode("i", { class: "fal fa-search" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div><div class="offset-widget offset_menu-top mb-20" data-v-169bcd2a><div class="header-menu-top-icon mb-20" data-v-169bcd2a><a href="tel:(555)674890556" data-v-169bcd2a><i class="fas fa-phone" data-v-169bcd2a></i>(555) 674 890 556</a><a href="mailto:info@example.com" data-v-169bcd2a><i class="fal fa-envelope" data-v-169bcd2a></i>info@example.com</a><i class="fal fa-map-marker-alt" data-v-169bcd2a></i><span data-v-169bcd2a>3rd Avenue, San Francisco</span></div></div><div class="offset-widget button mb-20" data-v-169bcd2a>`);
  if ($data.loggedIn) {
    _push(`<div data-v-169bcd2a>`);
    if ($data.isAdmin) {
      _push(`<div class="user-btn-content mb-20 mt-20" data-v-169bcd2a><a class="user-btn-sign-in" href="/admin" data-v-169bcd2a>Admin</a></div>`);
    } else {
      _push(`<div class="user-btn-content mb-20 mt-20" data-v-169bcd2a><a class="user-btn-sign-in" href="/add-event" data-v-169bcd2a>Host Event</a></div>`);
    }
    _push(`<a href="javascript:void(0)" class="edu-four-btn" data-v-169bcd2a>Log Out</a></div>`);
  } else {
    _push(`<div data-v-169bcd2a><div class="user-btn-content mb-20 mt-20" data-v-169bcd2a><a class="user-btn-sign-in" href="javascript:void(0)" data-v-169bcd2a>Sign In</a></div><a href="javascript:void(0)" class="edu-four-btn" data-v-169bcd2a>Sign Up</a></div>`);
  }
  _push(`</div></div></div></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSidebar ? "offcanvas-overlay overlay-open" : "offcanvas-overlay"}`)}" data-v-169bcd2a></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSignIn ? "signin-area open position-fixed" : "signin-area"}`)}" data-v-169bcd2a><div class="signin-area-wrapper" data-v-169bcd2a><div class="signup-box text-center" data-v-169bcd2a><div class="signup-text" data-v-169bcd2a><h3 data-v-169bcd2a>Sign in</h3></div><div class="signup-thumb" data-v-169bcd2a><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$8)} alt="image not found" data-v-169bcd2a></div></div><form class="signup-form-wrapper" data-v-169bcd2a><div class="signup-wrapper" data-v-169bcd2a><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignInEmail)} type="text" placeholder="Email or Username" data-v-169bcd2a></div><div class="signup-wrapper" data-v-169bcd2a><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignInPass)} type="password" placeholder="Password" data-v-169bcd2a></div>`);
  if ($data.SignInError) {
    _push(`<div class="my-20 text-center" data-v-169bcd2a><p class="text-md text-danger" data-v-169bcd2a>${serverRenderer.exports.ssrInterpolate($data.errorMessage)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.SignInEmailError) {
    _push(`<div class="my-20 text-center" data-v-169bcd2a><p class="text-md text-danger" data-v-169bcd2a>Please Enter Valid Email</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="sing-buttom mb-20" data-v-169bcd2a><button type="submit" class="sing-btn w-100" data-v-169bcd2a>Login</button></div><div class="registered wrapper" data-v-169bcd2a><div class="not-register" data-v-169bcd2a><span data-v-169bcd2a>Not registered?</span><span data-v-169bcd2a><a href="#" data-v-169bcd2a>Sign up</a></span></div><div class="forget-password" data-v-169bcd2a><a href="#" data-v-169bcd2a>Forgot password?</a></div></div></form></div></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSignIn ? "offcanvas-overlay overlay-open" : "offcanvas-overlay"}`)}" data-v-169bcd2a></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSignUp ? "signup-area open position-absolute" : "signup-area"}`)}" data-v-169bcd2a><div class="sign-up-wrapper" data-v-169bcd2a><div class="signup-box text-center" data-v-169bcd2a><div class="signup-text" data-v-169bcd2a><h3 data-v-169bcd2a>Sign up</h3></div><div class="signup-message" data-v-169bcd2a><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$8)} alt="image not found" data-v-169bcd2a></div><div class="signup-thumb" data-v-169bcd2a><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$8)} alt="image not found" data-v-169bcd2a></div></div><form class="signup-form-wrapper" data-v-169bcd2a><div class="signup-input-wrapper" data-v-169bcd2a><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignUpData.FName)} type="text" placeholder="First Name" data-v-169bcd2a><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignUpData.LName)} type="text" placeholder="Last Name" data-v-169bcd2a></div><div class="signup-wrapper" data-v-169bcd2a><label for="DOB" data-v-169bcd2a>Date of Birth</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignUpData.DOB)} type="Date" name="DOB" data-v-169bcd2a></div><div class="signup-wrapper" data-v-169bcd2a><select class="form-select" required data-v-169bcd2a><option value="" disabled selected data-v-169bcd2a>Gender *</option><option value="Male" data-v-169bcd2a>Male</option><option value="Female" data-v-169bcd2a>Female</option></select></div><div class="signup-wrapper" data-v-169bcd2a><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignUpData.Email)} type="text" placeholder="Email" data-v-169bcd2a></div><div class="signup-wrapper" data-v-169bcd2a><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignUpData.password)} type="password" placeholder="Password" data-v-169bcd2a></div><div class="signup-wrapper" data-v-169bcd2a><select class="form-select" required data-v-169bcd2a><option value="" disabled selected data-v-169bcd2a>Preffered Sports *</option><option value="Cricket" data-v-169bcd2a>Cricket</option><option value="Football" data-v-169bcd2a>Football</option><option value="Basketball" data-v-169bcd2a>Basketball</option><option value="Hockey" data-v-169bcd2a>Hockey</option><option value="Badminton" data-v-169bcd2a>Badminton</option><option value="Other" data-v-169bcd2a>Other</option></select></div><div class="signup-wrapper" data-v-169bcd2a><select class="form-select" required data-v-169bcd2a><option value="" disabled selected data-v-169bcd2a>Preffered State *</option><option value="Andhra Pradesh" data-v-169bcd2a>Andhra Pradesh</option><option value="Andaman and Nicobar Islands" data-v-169bcd2a>Andaman and Nicobar Islands</option><option value="Arunachal Pradesh" data-v-169bcd2a>Arunachal Pradesh</option><option value="Assam" data-v-169bcd2a>Assam</option><option value="Bihar" data-v-169bcd2a>Bihar</option><option value="Chandigarh" data-v-169bcd2a>Chandigarh</option><option value="Chhattisgarh" data-v-169bcd2a>Chhattisgarh</option><option value="Dadar and Nagar Haveli" data-v-169bcd2a>Dadar and Nagar Haveli</option><option value="Daman and Diu" data-v-169bcd2a>Daman and Diu</option><option value="Delhi" data-v-169bcd2a>Delhi</option><option value="Lakshadweep" data-v-169bcd2a>Lakshadweep</option><option value="Puducherry" data-v-169bcd2a>Puducherry</option><option value="Goa" data-v-169bcd2a>Goa</option><option value="Gujarat" data-v-169bcd2a>Gujarat</option><option value="Haryana" data-v-169bcd2a>Haryana</option><option value="Himachal Pradesh" data-v-169bcd2a>Himachal Pradesh</option><option value="Jammu and Kashmir" data-v-169bcd2a>Jammu and Kashmir</option><option value="Jharkhand" data-v-169bcd2a>Jharkhand</option><option value="Karnataka" data-v-169bcd2a>Karnataka</option><option value="Kerala" data-v-169bcd2a>Kerala</option><option value="Madhya Pradesh" data-v-169bcd2a>Madhya Pradesh</option><option value="Maharashtra" data-v-169bcd2a>Maharashtra</option><option value="Manipur" data-v-169bcd2a>Manipur</option><option value="Meghalaya" data-v-169bcd2a>Meghalaya</option><option value="Mizoram" data-v-169bcd2a>Mizoram</option><option value="Nagaland" data-v-169bcd2a>Nagaland</option><option value="Odisha" data-v-169bcd2a>Odisha</option><option value="Punjab" data-v-169bcd2a>Punjab</option><option value="Rajasthan" data-v-169bcd2a>Rajasthan</option><option value="Sikkim" data-v-169bcd2a>Sikkim</option><option value="Tamil Nadu" data-v-169bcd2a>Tamil Nadu</option><option value="Telangana" data-v-169bcd2a>Telangana</option><option value="Tripura" data-v-169bcd2a>Tripura</option><option value="Uttar Pradesh" data-v-169bcd2a>Uttar Pradesh</option><option value="Uttarakhand" data-v-169bcd2a>Uttarakhand</option><option value="West Bengal" data-v-169bcd2a>West Bengal</option></select></div><div class="signup-action" data-v-169bcd2a><div class="event-sidebar-list" data-v-169bcd2a><input required class="signup-checkbo" type="checkbox" id="sing-up" data-v-169bcd2a><label class="sign-check" for="sing-up" data-v-169bcd2a><span data-v-169bcd2a>Accept the terms and <a href="#" data-v-169bcd2a>Privacy Policy</a></span></label></div></div>`);
  if ($data.SignUpError) {
    _push(`<div class="my-20 text-center" data-v-169bcd2a><p class="text-md text-danger" data-v-169bcd2a>${serverRenderer.exports.ssrInterpolate($data.errorMessage)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.SignUpEmailError) {
    _push(`<div class="my-20 text-center" data-v-169bcd2a><p class="text-md text-danger" data-v-169bcd2a>Please Enter Valid Email</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="sing-buttom mb-20" data-v-169bcd2a><button class="sing-btn w-100" data-v-169bcd2a>Register now</button></div><div class="acount-login text-center" data-v-169bcd2a><span data-v-169bcd2a>Already have an account? <a href="#" data-v-169bcd2a>Log in</a></span></div></form></div></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSignUp ? "offcanvas-overlay overlay-open" : "offcanvas-overlay"}`)}" data-v-169bcd2a></div></div>`);
}
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/HeaderFour.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const HeaderFour = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["ssrRender", _sfc_ssrRender$12], ["__scopeId", "data-v-169bcd2a"]]);
const _imports_0$c = publicAssetsURL(`img/bg/error-thumb.png`);
const _sfc_main$16 = {
  name: "app",
  components: {
    FooterOne,
    HeaderFour
  }
};
function _sfc_ssrRender$11(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
  _push(`<div class="content-error-area pt-120 pb-120"><div class="container"><div class="row justify-content-center"><div class="col-xl-8"><div class="content-error-item text-center"><div class="error-thumb"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$c)} alt="image not found"></div><div class="section-title"><h2 class="mb-20">Oops! That page can&#39;t be found.</h2><p>We couldn&#39;t find any results for your search. Use more generic words or double check your spelling.</p></div><div class="error-btn">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "edu-btn"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Back to homepage`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Back to homepage")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div></div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ErrorPage/ErrorPageMain.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const __nuxt_component_0$g = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["ssrRender", _sfc_ssrRender$11]]);
const meta$k = void 0;
const courseItemsMixin = {
  data() {
    return {
      courseItemss: [
        {
          id: 1,
          courseImage: "/img/course/course-01.jpg",
          badge: "Development",
          badgeClass: "category-color category-color-1",
          title: "WordPress Development Course for Plugins & Themes",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "12 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$12.57",
          priceOld: "$24.50",
          courseTitle: "WordPress Development Course for Plugins & Themes",
          instructor: "Danial",
          instructorImage: "/img/portfilo/course-tutor-01.png",
          instructorUrl: "/instructor-profile",
          rating: "(25)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fal fa-star",
          clock: "1:33 Min",
          credit: "8 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "6 Years"
        },
        {
          id: 2,
          courseImage: "/img/course/course-02.jpg",
          badge: "Business",
          badgeClass: "category-color category-color-3",
          title: "Write Better Emails: Tactics for Smarter Team Communication",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "10 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "FREE",
          priceOld: "",
          courseTitle: "Write Better Emails: Tactics for Smarter Team Communication",
          instructor: "Eduman",
          instructorImage: "/img/portfilo/course-tutor-02.png",
          instructorUrl: "/instructor-profile",
          rating: "(20)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fal fa-star",
          clock: "1:40 Min",
          credit: "9 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "7 Years"
        },
        {
          id: 3,
          courseImage: "/img/course/course-03.jpg",
          badge: "Development",
          badgeClass: "category-color category-color-1",
          title: "Data Science Real-Life Data Science Exercises Included",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "9 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$22.14",
          priceOld: "",
          courseTitle: "Data Science Real-Life Data Science Exercises Included",
          instructor: "Mark Hanry",
          instructorImage: "/img/portfilo/course-tutor-03.png",
          instructorUrl: "/instructor-profile",
          rating: "(22)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star",
          clock: "1:45 Min",
          credit: "10 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "2 Years"
        },
        {
          id: 4,
          courseImage: "/img/course/course-04.jpg",
          badge: "Business",
          badgeClass: "category-color category-color-3",
          title: "MySQL Database : Beginner SQL Database Design",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "8 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$147.00",
          priceOld: "",
          courseTitle: "MySQL Database : Beginner SQL Database Design",
          instructor: "Danial",
          instructorImage: "/img/portfilo/course-tutor-04.png",
          instructorUrl: "/instructor-profile",
          rating: "(21)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star",
          clock: "1:25 Min",
          credit: "7 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "3 Years"
        },
        {
          id: 5,
          courseImage: "/img/course/course-05.jpg",
          badge: "Development",
          badgeClass: "category-color category-color-1",
          title: "Python and Django Full Stack Web Developer Bootcamp",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "13 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$21.00",
          priceOld: "",
          courseTitle: "Python and Django Full Stack Web Developer Bootcamp",
          instructor: "Junior Lucy",
          instructorImage: "/img/portfilo/course-tutor-05.png",
          instructorUrl: "/instructor-profile",
          rating: "(20)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star",
          clock: "1:35 Min",
          credit: "6 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "4 Years"
        },
        {
          id: 6,
          courseImage: "/img/course/course-06.jpg",
          badge: "Development",
          badgeClass: "category-color category-color-1",
          title: "Data Science Real-Life Data Science Exercises Included",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "14 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$12.00",
          priceOld: "",
          courseTitle: "Data Science Real-Life Data Science Exercises Included",
          instructor: "Mark Hanry",
          instructorImage: "/img/portfilo/course-tutor-06.png",
          instructorUrl: "/instructor-profile",
          rating: "(18)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star",
          clock: "1:23 Min",
          credit: "5 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "5 Years"
        },
        {
          id: 7,
          courseImage: "/img/course/course-07.jpg",
          badge: "Life Style",
          badgeClass: "category-color category-color-2",
          title: "Become a Super Human: Naturally & Safely Boost Testosterone",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "6 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$24.00",
          priceOld: "$48.00",
          courseTitle: "Become a Super Human: Naturally & Safely Boost Testosterone",
          instructor: "Edyal Romel",
          instructorImage: "/img/portfilo/course-tutor-01.png",
          instructorUrl: "/instructor-profile",
          rating: "(13)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fal fa-star",
          productRating5: "fal fa-star",
          clock: "1:15 Min",
          credit: "5 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "8 Years"
        },
        {
          id: 8,
          courseImage: "/img/course/course-08.jpg",
          badge: "Development",
          badgeClass: "category-color category-color-1",
          title: "Python and Django Full Stack Web Developer Bootcamp",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "4 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "FREE",
          priceOld: "",
          courseTitle: "Python and Django Full Stack Web Developer Bootcamp",
          instructor: "Junior Lucy",
          instructorImage: "/img/portfilo/course-tutor-02.png",
          instructorUrl: "/instructor-profile",
          rating: "(21)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fal fa-star",
          clock: "1:15 Min",
          credit: "4 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "6 Years"
        },
        {
          id: 9,
          courseImage: "/img/course/course-09.jpg",
          badge: "Development",
          badgeClass: "category-color category-color-1",
          title: "Machine Learning Hands-On Python & R In Data Science",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "15 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$12.57",
          priceOld: "",
          courseTitle: "Machine Learning Hands-On Python & R In Data Science",
          instructor: "Danial",
          instructorImage: "/img/portfilo/course-tutor-03.png",
          instructorUrl: "/instructor-profile",
          rating: "(27)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star",
          clock: "1:53 Min",
          credit: "5 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "7 Years"
        },
        {
          id: 10,
          courseImage: "/img/course/course-10.jpg",
          badge: "Development",
          badgeClass: "category-color category-color-1",
          title: "Understanding Java Script 2022 Edition",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "11 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$18.57",
          priceOld: "",
          courseTitle: "Understanding Java Script 2022 Edition",
          instructor: "Steve",
          instructorImage: "/img/portfilo/course-tutor-04.png",
          instructorUrl: "/instructor-profile",
          rating: "(29)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star",
          clock: "2:33 Min",
          credit: "9 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "5 Years"
        },
        {
          id: 11,
          courseImage: "/img/course/course-11.jpg",
          badge: "Development",
          badgeClass: "category-color category-color-1",
          title: "Data Science Real-Life Data Science Exercises Included",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "10 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$17.50",
          priceOld: "",
          courseTitle: "Data Science Real-Life Data Science Exercises Included",
          instructor: "Watson",
          instructorImage: "/img/portfilo/course-tutor-05.png",
          instructorUrl: "/instructor-profile",
          rating: "(17)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fal fa-star",
          productRating4: "fal fa-star",
          productRating5: "fal fa-star",
          clock: "1:17 Min",
          credit: "7 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "4 Years"
        },
        {
          id: 12,
          courseImage: "/img/course/course-12.jpg",
          badge: "Development",
          badgeClass: "category-color category-color-1",
          title: "Python for Financial Analysis and Algorithmic Trading",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "5 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$23.57",
          priceOld: "",
          courseTitle: "Python for Financial Analysis and Algorithmic Trading",
          instructor: "William",
          instructorImage: "/img/portfilo/course-tutor-06.png",
          instructorUrl: "/instructor-profile",
          rating: "(19)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star",
          clock: "1:39 Min",
          credit: "9 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "2 Years"
        },
        {
          id: 13,
          courseImage: "/img/course/course-13.jpg",
          badge: "Development",
          badgeClass: "category-color category-color-1",
          title: "Master Google Docs: Free online documents for personal",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "13 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$25.00",
          priceOld: "",
          courseTitle: "Master Google Docs: Free online documents for personal",
          instructor: "Peter",
          instructorImage: "/img/portfilo/course-tutor-01.png",
          instructorUrl: "/instructor-profile",
          rating: "(20)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fal fa-star",
          clock: "1:41 Min",
          credit: "7 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "3 Years"
        },
        {
          id: 14,
          courseImage: "/img/course/course-14.jpg",
          badge: "Business",
          badgeClass: "category-color category-color-3",
          title: "Spring & Hibernate for Beginners Spring Social Boot",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "14 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "$33.57",
          priceOld: "",
          courseTitle: "Spring & Hibernate for Beginners Spring Social Boot",
          instructor: "Suzan",
          instructorImage: "/img/portfilo/course-tutor-02.png",
          instructorUrl: "/instructor-profile",
          rating: "(22)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star",
          clock: "1:55 Min",
          credit: "8 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "4 Years"
        },
        {
          id: 15,
          courseImage: "/img/course/course-15.jpg",
          badge: "Business",
          badgeClass: "category-color category-color-3",
          title: "Accounting Financial Total Beginners to Advanced",
          level: "Level :",
          beginer: "Beginner",
          description: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family",
          infoList: [
            {
              infoListTitle: "Scratch to HTML"
            },
            {
              infoListTitle: "Learn how to code in Python"
            },
            {
              infoListTitle: "Unlimited backend database creation"
            },
            {
              infoListTitle: "Adobe XD Tutorials"
            }
          ],
          viewBtn: "View Details",
          wishIcon: "flaticon-like",
          shareIcon: "flaticon-previous",
          lesson: "16 Lessons",
          lessonIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16.471" height="16.471"viewBox="0 0 16.471 16.471"><g id="blackboard-8"transform="translate(-0.008)"><path id="Path_106" data-name="Path 101"d="M16,1.222H8.726V.483a.483.483,0,1,0-.965,0v.74H.491A.483.483,0,0,0,.008,1.7V13.517A.483.483,0,0,0,.491,14H5.24L4.23,15.748a.483.483,0,1,0,.836.483L6.354,14H7.761v1.99a.483.483,0,0,0,.965,0V14h1.407l1.288,2.231a.483.483,0,1,0,.836-.483L11.247,14H16a.483.483,0,0,0,.483-.483V1.7A.483.483,0,0,0,16,1.222Zm-.483.965v8.905H.973V2.187Zm0,10.847H.973v-.976H15.514Z"fill="#575757" /></g></svg>',
          price: "FREE",
          priceOld: "",
          courseTitle: "Accounting Financial Total Beginners to Advanced",
          instructor: "Joshef",
          instructorImage: "/img/portfilo/course-tutor-03.png",
          instructorUrl: "/instructor-profile",
          rating: "(23)",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star",
          clock: "1:19 Min",
          credit: "9 Credit",
          network: "Fresh",
          shortDesc: "Helping employees gain skills and development often take a back seat to business",
          applyBtn: "Apply now",
          year: "5 Years"
        }
      ],
      academicCourseItemss: [
        {
          id: 16,
          courseImage: "/img/course/academi-course-2.jpg",
          instructor: "Professor David",
          instructorImage: "/img/course/academic-tutor-1.png",
          title: "Bachelor of Business Administration ( Accounting)",
          year: "4 Years",
          credit: "8 Credit",
          description: "Helping employees gain skills and development often take a back seat to business",
          btn: "Apply now",
          shapeClass: "academic-shape"
        },
        {
          id: 17,
          courseImage: "/img/course/academi-course-3.jpg",
          instructor: "Professor Joseph",
          instructorImage: "/img/course/academic-tutor-2.png",
          title: "Intrepreneurship Essentials Business Course",
          year: "3 Years",
          credit: "9 Credit",
          description: "Helping employees gain skills and development often take a back seat to business",
          btn: "Apply now",
          shapeClass: "academic-shape d-none"
        },
        {
          id: 18,
          courseImage: "/img/course/academi-course-4.jpg",
          instructor: "Professor Michel",
          instructorImage: "/img/course/academic-tutor-3.png",
          title: "Financial Analysis Valuation for Lawyers Eduman",
          year: "5 Years",
          credit: "10 Credit",
          description: "Helping employees gain skills and development often take a back seat to business",
          btn: "Apply now",
          shapeClass: "academic-shape d-none"
        },
        {
          id: 19,
          courseImage: "/img/course/academi-course-2.jpg",
          instructor: "Professor David",
          instructorImage: "/img/course/academic-tutor-1.png",
          title: "Write Better Emails: Tactics for Smarter Team",
          year: "2 Years",
          credit: "8 Credit",
          description: "Helping employees gain skills and development often take a back seat to business",
          btn: "Apply now",
          shapeClass: "academic-shape"
        },
        {
          id: 20,
          courseImage: "/img/course/academi-course-3.jpg",
          instructor: "Professor Joseph",
          instructorImage: "/img/course/academic-tutor-2.png",
          title: "MySQL Database : Beginner SQL Database Design",
          year: "7 Years",
          credit: "9 Credit",
          description: "Helping employees gain skills and development often take a back seat to business",
          btn: "Apply now",
          shapeClass: "academic-shape d-none"
        },
        {
          id: 21,
          courseImage: "/img/course/academi-course-4.jpg",
          instructor: "Professor Michel",
          instructorImage: "/img/course/academic-tutor-3.png",
          title: "Data Science Real-Life Data Science Exercises",
          year: "8 Years",
          credit: "10 Credit",
          description: "Helping employees gain skills and development often take a back seat to business",
          btn: "Apply now",
          shapeClass: "academic-shape d-none"
        }
      ]
    };
  }
};
const _sfc_main$15 = {
  data() {
    return {
      innerValue: 1
    };
  },
  props: {
    modelValue: {
      type: Number
    },
    pageCount: {
      type: Number,
      required: true
    },
    initialPage: {
      type: Number,
      default: 1
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => {
      }
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: "Prev"
    },
    nextText: {
      type: String,
      default: "Next"
    },
    breakViewText: {
      type: String,
      default: "\u2026"
    },
    containerClass: {
      type: String,
      default: "pagination"
    },
    pageClass: {
      type: String,
      default: "page-item"
    },
    pageLinkClass: {
      type: String,
      default: "page-link"
    },
    prevClass: {
      type: String,
      default: "page-item"
    },
    prevLinkClass: {
      type: String,
      default: "page-link"
    },
    nextClass: {
      type: String,
      default: "page-item"
    },
    nextLinkClass: {
      type: String,
      default: "page-link"
    },
    breakViewClass: {
      type: String
    },
    breakViewLinkClass: {
      type: String
    },
    activeClass: {
      type: String,
      default: "active"
    },
    disabledClass: {
      type: String,
      default: "disabled"
    },
    noLiSurround: {
      type: Boolean,
      default: false
    },
    firstLastButton: {
      type: Boolean,
      default: false
    },
    firstButtonText: {
      type: String,
      default: "First"
    },
    lastButtonText: {
      type: String,
      default: "Last"
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selected: {
      get: function() {
        return this.modelValue || this.innerValue;
      },
      set: function(newValue) {
        this.innerValue = newValue;
      }
    },
    pages: function() {
      let items = {};
      if (this.pageCount <= this.pageRange) {
        for (let index2 = 0; index2 < this.pageCount; index2++) {
          let page = {
            index: index2,
            content: index2 + 1,
            selected: index2 === this.selected - 1
          };
          items[index2] = page;
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2);
        let setPageItem = (index2) => {
          let page = {
            index: index2,
            content: index2 + 1,
            selected: index2 === this.selected - 1
          };
          items[index2] = page;
        };
        let setBreakView = (index2) => {
          let breakView = {
            disabled: true,
            breakView: true
          };
          items[index2] = breakView;
        };
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        }
        let selectedRangeLow = 0;
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }
        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i);
        }
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1);
        }
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1);
        }
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i);
        }
      }
      return items;
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected)
        return;
      this.innerValue = selected;
      this.$emit("update:modelValue", selected);
      this.clickHandler(selected);
    },
    prevPage() {
      if (this.selected <= 1)
        return;
      this.handlePageSelected(this.selected - 1);
    },
    nextPage() {
      if (this.selected >= this.pageCount)
        return;
      this.handlePageSelected(this.selected + 1);
    },
    firstPageSelected() {
      return this.selected === 1;
    },
    lastPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0;
    },
    selectFirstPage() {
      if (this.selected <= 1)
        return;
      this.handlePageSelected(1);
    },
    selectLastPage() {
      if (this.selected >= this.pageCount)
        return;
      this.handlePageSelected(this.pageCount);
    }
  },
  beforeMount() {
    this.innerValue = this.initialPage;
  },
  beforeUpdate() {
    if (this.forcePage === void 0)
      return;
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage;
    }
  }
};
function _sfc_ssrRender$10(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if (!$props.noLiSurround) {
    _push(`<ul${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: $props.containerClass }, _attrs))}>`);
    if ($props.firstLastButton) {
      _push(`<li class="${serverRenderer.exports.ssrRenderClass([$props.pageClass, $options.firstPageSelected() ? $props.disabledClass : ""])}"><a class="${serverRenderer.exports.ssrRenderClass($props.pageLinkClass)}"${serverRenderer.exports.ssrRenderAttr("tabindex", $options.firstPageSelected() ? -1 : 0)}>${$props.firstButtonText}</a></li>`);
    } else {
      _push(`<!---->`);
    }
    if (!($options.firstPageSelected() && $props.hidePrevNext)) {
      _push(`<li class="${serverRenderer.exports.ssrRenderClass([$props.prevClass, $options.firstPageSelected() ? $props.disabledClass : ""])}"><a class="${serverRenderer.exports.ssrRenderClass($props.prevLinkClass)}"${serverRenderer.exports.ssrRenderAttr("tabindex", $options.firstPageSelected() ? -1 : 0)}>${$props.prevText}</a></li>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<!--[-->`);
    serverRenderer.exports.ssrRenderList($options.pages, (page) => {
      _push(`<li class="${serverRenderer.exports.ssrRenderClass([
        $props.pageClass,
        page.selected ? $props.activeClass : "",
        page.disabled ? $props.disabledClass : "",
        page.breakView ? $props.breakViewClass : ""
      ])}">`);
      if (page.breakView) {
        _push(`<a class="${serverRenderer.exports.ssrRenderClass([$props.pageLinkClass, $props.breakViewLinkClass])}" tabindex="0">`);
        serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "breakViewContent", {}, () => {
          _push(`${serverRenderer.exports.ssrInterpolate($props.breakViewText)}`);
        }, _push, _parent);
        _push(`</a>`);
      } else if (page.disabled) {
        _push(`<a class="${serverRenderer.exports.ssrRenderClass($props.pageLinkClass)}" tabindex="0">${serverRenderer.exports.ssrInterpolate(page.content)}</a>`);
      } else {
        _push(`<a class="${serverRenderer.exports.ssrRenderClass($props.pageLinkClass)}" tabindex="0">${serverRenderer.exports.ssrInterpolate(page.content)}</a>`);
      }
      _push(`</li>`);
    });
    _push(`<!--]-->`);
    if (!($options.lastPageSelected() && $props.hidePrevNext)) {
      _push(`<li class="${serverRenderer.exports.ssrRenderClass([$props.nextClass, $options.lastPageSelected() ? $props.disabledClass : ""])}"><a class="${serverRenderer.exports.ssrRenderClass($props.nextLinkClass)}"${serverRenderer.exports.ssrRenderAttr("tabindex", $options.lastPageSelected() ? -1 : 0)}>${$props.nextText}</a></li>`);
    } else {
      _push(`<!---->`);
    }
    if ($props.firstLastButton) {
      _push(`<li class="${serverRenderer.exports.ssrRenderClass([$props.pageClass, $options.lastPageSelected() ? $props.disabledClass : ""])}"><a class="${serverRenderer.exports.ssrRenderClass($props.pageLinkClass)}"${serverRenderer.exports.ssrRenderAttr("tabindex", $options.lastPageSelected() ? -1 : 0)}>${$props.lastButtonText}</a></li>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</ul>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: $props.containerClass }, _attrs))}>`);
    if ($props.firstLastButton) {
      _push(`<a class="${serverRenderer.exports.ssrRenderClass([$props.pageLinkClass, $options.firstPageSelected() ? $props.disabledClass : ""])}" tabindex="0">${$props.firstButtonText}</a>`);
    } else {
      _push(`<!---->`);
    }
    if (!($options.firstPageSelected() && $props.hidePrevNext)) {
      _push(`<a class="${serverRenderer.exports.ssrRenderClass([$props.prevLinkClass, $options.firstPageSelected() ? $props.disabledClass : ""])}" tabindex="0">${$props.prevText}</a>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<!--[-->`);
    serverRenderer.exports.ssrRenderList($options.pages, (page) => {
      _push(`<!--[-->`);
      if (page.breakView) {
        _push(`<a class="${serverRenderer.exports.ssrRenderClass([
          $props.pageLinkClass,
          $props.breakViewLinkClass,
          page.disabled ? $props.disabledClass : ""
        ])}" tabindex="0">`);
        serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "breakViewContent", {}, () => {
          _push(`${serverRenderer.exports.ssrInterpolate($props.breakViewText)}`);
        }, _push, _parent);
        _push(`</a>`);
      } else if (page.disabled) {
        _push(`<a class="${serverRenderer.exports.ssrRenderClass([
          $props.pageLinkClass,
          page.selected ? $props.activeClass : "",
          $props.disabledClass
        ])}" tabindex="0">${serverRenderer.exports.ssrInterpolate(page.content)}</a>`);
      } else {
        _push(`<a class="${serverRenderer.exports.ssrRenderClass([$props.pageLinkClass, page.selected ? $props.activeClass : ""])}" tabindex="0">${serverRenderer.exports.ssrInterpolate(page.content)}</a>`);
      }
      _push(`<!--]-->`);
    });
    _push(`<!--]-->`);
    if (!($options.lastPageSelected() && $props.hidePrevNext)) {
      _push(`<a class="${serverRenderer.exports.ssrRenderClass([$props.nextLinkClass, $options.lastPageSelected() ? $props.disabledClass : ""])}" tabindex="0">${$props.nextText}</a>`);
    } else {
      _push(`<!---->`);
    }
    if ($props.firstLastButton) {
      _push(`<a class="${serverRenderer.exports.ssrRenderClass([$props.pageLinkClass, $options.lastPageSelected() ? $props.disabledClass : ""])}" tabindex="0">${$props.lastButtonText}</a>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  }
}
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Pagination.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["ssrRender", _sfc_ssrRender$10]]);
const instructorProfilesMixin = {
  data() {
    return {
      instructorProfiless: [
        {
          id: 1,
          instructorImage: "/img/member/member-img-01.png",
          instructorTitle: "Charls David",
          instructorDesignation: "Data Scientist, Codexpand",
          instructorRating: "4.8 (54k+)",
          instructorCourse: "12 Courses"
        },
        {
          id: 2,
          instructorImage: "/img/member/member-img-02.png",
          instructorTitle: "Nicholson Ocak",
          instructorDesignation: "UI/UX Researcher ",
          instructorRating: "4.7 (58k+)",
          instructorCourse: "17 Courses"
        },
        {
          id: 3,
          instructorImage: "/img/member/member-img-03.png",
          instructorTitle: "Miriam Abate",
          instructorDesignation: "Web Developer",
          instructorRating: "4.5 (50k+)",
          instructorCourse: "16 Courses"
        },
        {
          id: 4,
          instructorImage: "/img/member/member-img-04.png",
          instructorTitle: "Vanbrunt Carl",
          instructorDesignation: "Entrepreneur",
          instructorRating: "4.9 (44k+)",
          instructorCourse: "18 Courses"
        },
        {
          id: 5,
          instructorImage: "/img/member/member-img-05.png",
          instructorTitle: "Anthony Peter",
          instructorDesignation: "Software Engineer",
          instructorRating: "5.0 (50k+)",
          instructorCourse: "11 Courses"
        },
        {
          id: 6,
          instructorImage: "/img/member/member-img-06.png",
          instructorTitle: "John Everton",
          instructorDesignation: "Data Scientist",
          instructorRating: "5.0 (60k+)",
          instructorCourse: "18 Courses"
        },
        {
          id: 7,
          instructorImage: "/img/member/member-img-07.png",
          instructorTitle: "Joseph Daniyel",
          instructorDesignation: "Sr. Developer, BDevs",
          instructorRating: "4.4 (30k+)",
          instructorCourse: "15 Courses"
        },
        {
          id: 8,
          instructorImage: "/img/member/member-img-08.png",
          instructorTitle: "Cristina Ena",
          instructorDesignation: "Drawing Expert",
          instructorRating: "4.9 (37k+)",
          instructorCourse: "17 Courses"
        },
        {
          id: 9,
          instructorImage: "/img/member/member-img-09.png",
          instructorTitle: "Jeanette Harrat",
          instructorDesignation: "Gym Instructor",
          instructorRating: "5.0 (55k+)",
          instructorCourse: "13 Courses"
        },
        {
          id: 10,
          instructorImage: "/img/member/member-img-10.png",
          instructorTitle: "Satterfield",
          instructorDesignation: "Software Engineer",
          instructorRating: "5.0 (47k+)",
          instructorCourse: "14 Courses"
        },
        {
          id: 11,
          instructorImage: "/img/member/member-img-11.png",
          instructorTitle: "Suny Czarnecki",
          instructorDesignation: "Digital Marketer, Conda",
          instructorRating: "4.9 (48k+)",
          instructorCourse: "18 Courses"
        },
        {
          id: 12,
          instructorImage: "/img/member/member-img-12.png",
          instructorTitle: "Vickie Garza",
          instructorDesignation: "Musician & Vocalist",
          instructorRating: "5.0 (52k+)",
          instructorCourse: "21 Courses"
        }
      ]
    };
  }
};
const meta$j = void 0;
const _sfc_main$14 = {
  name: "UserProfileMain",
  components: {
    FooterOne,
    Pagination,
    HeaderFour
  },
  data() {
    return {
      UserData: {
        id: "",
        FName: "",
        LName: "",
        Email: "",
        password: "",
        DOB: "",
        Gender: "",
        PrefferedSport: "",
        prefferedLocation: "",
        Biography: ""
      },
      updateData: {
        FName: "",
        LName: "",
        DOB: "",
        Gender: "",
        PrefferedSport: "",
        prefferedLocation: "",
        Biography: ""
      },
      loggedIn: false,
      eventData: "",
      dataLoaded: false,
      loaded: false,
      eventDataReceived: false,
      showEditDetails: false,
      showEditPass: false
    };
  },
  mounted() {
    if (localStorage.loggedIn) {
      this.UserData = JSON.parse(localStorage.UserData);
      this.loggedIn = localStorage.loggedIn;
    }
    this.getUserDetails();
    this.getEventData();
  },
  methods: {
    async getUserDetails() {
      console.log(this.UserData);
      await axios.get("http://143.42.142.151:4000/users/current", {
        params: { Id: this.UserData.id }
      }).then((res) => {
        console.log(res.data);
        this.UserData = res.data;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
      this.loaded = true;
    },
    async getEventData() {
      await axios.get("http://143.42.142.151:4000/events/getAllByUser", {
        params: { userId: this.UserData.id }
      }).then((res) => {
        console.log(res);
        this.eventData = res.data;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
      if (this.eventData.length !== 0) {
        this.eventDataReceived = true;
      }
      this.dataLoaded = true;
    },
    handleEditDetails() {
      this.updateData.FName = this.UserData.FName;
      this.updateData.LName = this.UserData.LName;
      this.updateData.Gender = this.UserData.Gender;
      this.updateData.DOB = this.UserData.DOB;
      this.updateData.PrefferedSport = this.UserData.PrefferedSport;
      this.updateData.prefferedLocation = this.UserData.prefferedLocation;
      this.updateData.Biography = this.UserData.Biography;
      return this.showEditDetails = !this.showEditDetails;
    },
    handleEditPass() {
      return this.showEditPass = !this.showEditPass;
    },
    async userUpdate() {
      await axios.post("http://143.42.142.151:4000/users/updateUser", {
        params: { Id: this.UserData.id, query: this.updateData }
      }).then((response) => {
        console.log(response);
        this.$router.go();
      }).catch((error) => {
        if (error.response) {
          this.detailsError = true;
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
          this.detailsError = true;
          this.errorMessage = error.request;
        } else {
          console.log("Error", error.message);
          this.detailsError = true;
          this.errorMessage = error.message;
        }
      });
    },
    getDateFormat(dateValue) {
      var dateObj = new Date(dateValue);
      var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      return formattedDate;
    }
  }
};
function _sfc_ssrRender$$(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-7d4c16cc>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
    _push(`<div class="course-detalies-area pt-120 pb-100" data-v-7d4c16cc><div class="container" data-v-7d4c16cc><div class="row" data-v-7d4c16cc><div class="col-xl-12 col-lg-12" data-v-7d4c16cc><div class="course-detelies-wrapper" data-v-7d4c16cc><div class="course-details-action w-100 mb-30" data-v-7d4c16cc><div class="w-100" data-v-7d4c16cc><h3 class="text-capitalize" data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate($data.UserData.FName)} ${serverRenderer.exports.ssrInterpolate($data.UserData.LName)}</h3><p class="mt-10" data-v-7d4c16cc><span class="font-weight-bold" data-v-7d4c16cc>Preffered Sports :</span> ${serverRenderer.exports.ssrInterpolate($data.UserData.PrefferedSport)}</p><p class="mt-10" data-v-7d4c16cc><span class="font-weight-bold" data-v-7d4c16cc>Preffered Loction :</span> ${serverRenderer.exports.ssrInterpolate($data.UserData.prefferedLocation)}</p></div><div class="course-details-action" data-v-7d4c16cc><div class="course-follow" data-v-7d4c16cc><a class="d-block link-text w-100 mt-10" data-v-7d4c16cc>Edit profile</a><a class="d-block link-text w-100 mt-10" data-v-7d4c16cc>Change password</a></div></div></div><div class="course-detiles-meta" data-v-7d4c16cc><div class="total-course" data-v-7d4c16cc><span data-v-7d4c16cc>Total Events Hosted</span><label class="mt-10" data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate($data.eventData.length)}</label></div><div class="course-details-action" data-v-7d4c16cc><div class="course-follow" data-v-7d4c16cc><a href="/add-event" class="edu-follow-btn" data-v-7d4c16cc>Host Event</a></div></div></div><div class="course-bio-text pt-45 pb-20" data-v-7d4c16cc><h3 data-v-7d4c16cc>Biography</h3>`);
    if ($data.UserData.Biography === "") {
      _push(`<p data-v-7d4c16cc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`);
    } else {
      _push(`<p data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate($data.UserData.Biography)}</p>`);
    }
    _push(`</div><div class="my-coeventAddedurse-info w-100 border-bottom border-secondary" data-v-7d4c16cc><h3 data-v-7d4c16cc>My Events</h3></div><div class="row pb-30" data-v-7d4c16cc>`);
    if ($data.dataLoaded) {
      _push(`<div data-v-7d4c16cc>`);
      if ($data.eventDataReceived) {
        _push(`<div data-v-7d4c16cc><!--[-->`);
        serverRenderer.exports.ssrRenderList($data.eventData, (data) => {
          _push(`<div class="col-lg-12 mt-10" data-v-7d4c16cc><div class="single-item mb-30" data-v-7d4c16cc><div class="col-lg-6 f-left" data-v-7d4c16cc><div class="event_date_inner" data-v-7d4c16cc><h4 data-v-7d4c16cc>`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            to: `/course-details/${data.id}`
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${serverRenderer.exports.ssrInterpolate(data.Name)}`);
              } else {
                return [
                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(data.Name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h4><p class="font-weight-bold" data-v-7d4c16cc>Event Start date : <span class="font-weight-normal" data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.startDate))}</span></p><p class="font-weight-bold" data-v-7d4c16cc>Event End date : <span class="font-weight-normal" data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.endDate))}</span></p></div></div><div class="event_info" data-v-7d4c16cc><h3 data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate(data.Sport)}</h3><div class="event-detalis d-flex align-items-center" data-v-7d4c16cc><div class="event-time mr-30 d-flex align-items-center" data-v-7d4c16cc><p class="font-weight-bold mt-15" data-v-7d4c16cc>Entry fees : </p><span data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate(data.entryFee)}</span></div><div class="event-time mr-30 d-flex align-items-center" data-v-7d4c16cc><i class="flaticon-clock-1" data-v-7d4c16cc></i><span data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate(data.Time)}</span></div><div class="event-location d-flex align-items-centere" data-v-7d4c16cc><i class="flaticon-pin" data-v-7d4c16cc></i><span data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate(data.Location)}</span></div></div><div class="event-aduence d-flex align-items-center" data-v-7d4c16cc><div class="aduence-thumb" data-v-7d4c16cc><p class="font-weight-bold mt-15" data-v-7d4c16cc>Organiser : </p></div><div class="adence-info" data-v-7d4c16cc><span data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate(data.Organiser1Name)}</span></div></div></div><div class="get-ticket-btn w-100" data-v-7d4c16cc><div class="m-4 w-full" data-v-7d4c16cc>`);
          if (data.approvalStatus === "Approved") {
            _push(`<div class="alert alert-success" role="alert" data-v-7d4c16cc> Your event submission is approved. </div>`);
          } else {
            _push(`<div class="alert alert-warning" role="alert" data-v-7d4c16cc> Your event submission is currently under review. We will notify you of any change in status through email. </div>`);
          }
          _push(`</div><div class="d-flex row justify-content-between" data-v-7d4c16cc><div class="d-inline-flex col-md-6 mt-10 justify-content-start" data-v-7d4c16cc><h3 class="w-full" data-v-7d4c16cc>Approval Status : `);
          if (data.approvalStatus === "Approved") {
            _push(`<span class="text-success font-weight-normal" data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate(data.approvalStatus)}</span>`);
          } else {
            _push(`<span class="text-warning font-weight-normal" data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate(data.approvalStatus)}</span>`);
          }
          _push(`</h3></div><div class="d-inline-flex col-md-6 justify-content-end" data-v-7d4c16cc><div class="d-none d-md-block" data-v-3ba90ccc="" data-v-7d4c16cc>`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            class: "user-btn-sign-up edu-btn",
            to: `/event-details/${data.id}`,
            "data-v-3ba90ccc": ""
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`View Details`);
              } else {
                return [
                  vue_cjs_prod.createTextVNode("View Details")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div data-v-7d4c16cc><div class="col-xl-6 col-lg-6 col-md-6 mt-20" data-v-7d4c16cc><div class="academic-box mb-30" data-v-7d4c16cc><h4 class="font-weight-bold" data-v-7d4c16cc>You don&#39;t have any events</h4></div></div></div>`);
      }
      _push(`</div>`);
    } else {
      _push(`<div class="d-flex justify-content-center mt-20 mb-20" data-v-7d4c16cc><div class="spinner-grow text-warning" role="status" data-v-7d4c16cc><span class="sr-only" data-v-7d4c16cc>Loading...</span></div></div>`);
    }
    _push(`</div></div></div></div></div></div>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`<div class="${serverRenderer.exports.ssrRenderClass(`${$data.showEditDetails ? "signup-area open position-absolute" : "signup-area"}`)}" data-v-7d4c16cc><div class="sign-up-wrapper" data-v-7d4c16cc><form class="signup-form-wrapper w-100" data-v-7d4c16cc><label data-v-7d4c16cc>Name</label><div class="signup-input-wrapper" data-v-7d4c16cc><input required${serverRenderer.exports.ssrRenderAttr("value", $data.updateData.FName)} type="text" placeholder="First Name" data-v-7d4c16cc><input required${serverRenderer.exports.ssrRenderAttr("value", $data.updateData.LName)} type="text" placeholder="Last Name" data-v-7d4c16cc></div><div class="signup-wrapper" data-v-7d4c16cc><label data-v-7d4c16cc>Date of birth</label><label for="DOB" data-v-7d4c16cc>Date of Birth</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.updateData.DOB)} type="Date" name="DOB" data-v-7d4c16cc></div><div class="signup-wrapper" data-v-7d4c16cc><label data-v-7d4c16cc>Gender</label><select class="form-select" required data-v-7d4c16cc><option value="" disabled selected data-v-7d4c16cc>Gender *</option><option value="Male" data-v-7d4c16cc>Male</option><option value="Female" data-v-7d4c16cc>Female</option></select></div><div class="signup-wrapper" data-v-7d4c16cc><label data-v-7d4c16cc>Preffered Sport</label><select class="form-select" required data-v-7d4c16cc><option value="" disabled selected data-v-7d4c16cc>Preffered Sports *</option><option value="Cricket" data-v-7d4c16cc>Cricket</option><option value="Football" data-v-7d4c16cc>Football</option><option value="Basketball" data-v-7d4c16cc>Basketball</option><option value="Hockey" data-v-7d4c16cc>Hockey</option><option value="Badminton" data-v-7d4c16cc>Badminton</option><option value="Other" data-v-7d4c16cc>Other</option></select></div><div class="signup-wrapper" data-v-7d4c16cc><label data-v-7d4c16cc>State</label><select class="form-select" required data-v-7d4c16cc><option value="" disabled selected data-v-7d4c16cc>Preffered State *</option><option value="Andhra Pradesh" data-v-7d4c16cc>Andhra Pradesh</option><option value="Andaman and Nicobar Islands" data-v-7d4c16cc>Andaman and Nicobar Islands</option><option value="Arunachal Pradesh" data-v-7d4c16cc>Arunachal Pradesh</option><option value="Assam" data-v-7d4c16cc>Assam</option><option value="Bihar" data-v-7d4c16cc>Bihar</option><option value="Chandigarh" data-v-7d4c16cc>Chandigarh</option><option value="Chhattisgarh" data-v-7d4c16cc>Chhattisgarh</option><option value="Dadar and Nagar Haveli" data-v-7d4c16cc>Dadar and Nagar Haveli</option><option value="Daman and Diu" data-v-7d4c16cc>Daman and Diu</option><option value="Delhi" data-v-7d4c16cc>Delhi</option><option value="Lakshadweep" data-v-7d4c16cc>Lakshadweep</option><option value="Puducherry" data-v-7d4c16cc>Puducherry</option><option value="Goa" data-v-7d4c16cc>Goa</option><option value="Gujarat" data-v-7d4c16cc>Gujarat</option><option value="Haryana" data-v-7d4c16cc>Haryana</option><option value="Himachal Pradesh" data-v-7d4c16cc>Himachal Pradesh</option><option value="Jammu and Kashmir" data-v-7d4c16cc>Jammu and Kashmir</option><option value="Jharkhand" data-v-7d4c16cc>Jharkhand</option><option value="Karnataka" data-v-7d4c16cc>Karnataka</option><option value="Kerala" data-v-7d4c16cc>Kerala</option><option value="Madhya Pradesh" data-v-7d4c16cc>Madhya Pradesh</option><option value="Maharashtra" data-v-7d4c16cc>Maharashtra</option><option value="Manipur" data-v-7d4c16cc>Manipur</option><option value="Meghalaya" data-v-7d4c16cc>Meghalaya</option><option value="Mizoram" data-v-7d4c16cc>Mizoram</option><option value="Nagaland" data-v-7d4c16cc>Nagaland</option><option value="Odisha" data-v-7d4c16cc>Odisha</option><option value="Punjab" data-v-7d4c16cc>Punjab</option><option value="Rajasthan" data-v-7d4c16cc>Rajasthan</option><option value="Sikkim" data-v-7d4c16cc>Sikkim</option><option value="Tamil Nadu" data-v-7d4c16cc>Tamil Nadu</option><option value="Telangana" data-v-7d4c16cc>Telangana</option><option value="Tripura" data-v-7d4c16cc>Tripura</option><option value="Uttar Pradesh" data-v-7d4c16cc>Uttar Pradesh</option><option value="Uttarakhand" data-v-7d4c16cc>Uttarakhand</option><option value="West Bengal" data-v-7d4c16cc>West Bengal</option></select></div><div class="signup-wrapper mb-20" data-v-7d4c16cc><label data-v-7d4c16cc>Biography</label><textarea class="form-textarea" rows="3" placeholder="Biography" data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate($data.updateData.Biography)}</textarea></div>`);
    if (_ctx.detailsError) {
      _push(`<div class="my-20 text-center" data-v-7d4c16cc><p class="text-md text-danger" data-v-7d4c16cc>${serverRenderer.exports.ssrInterpolate(_ctx.errorMessage)}</p></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="sing-buttom mb-20" data-v-7d4c16cc><button class="sing-btn w-100" data-v-7d4c16cc>Save Details</button></div></form></div></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showEditDetails ? "offcanvas-overlay overlay-open" : "offcanvas-overlay"}`)}" data-v-7d4c16cc></div></div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))} data-v-7d4c16cc><div class="d-flex justify-content-center align-items-center" data-v-7d4c16cc><div class="spinner-grow text-warning" role="status" data-v-7d4c16cc><span class="sr-only" data-v-7d4c16cc>Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UserProfile/UserProfileMain.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const __nuxt_component_0$f = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["ssrRender", _sfc_ssrRender$$], ["__scopeId", "data-v-7d4c16cc"]]);
const meta$i = void 0;
const _sfc_main$13 = {
  name: "aboutFeature",
  data() {
    return {
      featureList: [
        {
          id: 1,
          featureImage: "/img/icon/knowledge.png",
          featureTitle: "Indoor Sports",
          featureDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          id: 2,
          featureImage: "/img/icon/teacher.png",
          featureTitle: "Outdoor Sports",
          featureDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          id: 3,
          featureImage: "/img/icon/save-money.png",
          featureTitle: "Group Sports",
          featureDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ]
    };
  }
};
function _sfc_ssrRender$_(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "features-area section-bg fix long-padding pt-110" }, _attrs))}><div class="container"><div class="row"><div class="col-12"><div class="section-title text-center mb-60"><h2>Special <br> Event <span class="down-mark-line-2">Categories</span></h2></div></div><!--[-->`);
  serverRenderer.exports.ssrRenderList($data.featureList, (item) => {
    _push(`<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12"><div class="features-box text-center mb-30"><div class="features-svg"><img${serverRenderer.exports.ssrRenderAttr("src", item.featureImage)} alt="image not found"></div><div class="features-text"><h4>${serverRenderer.exports.ssrInterpolate(item.featureTitle)}</h4><p>${serverRenderer.exports.ssrInterpolate(item.featureDesc)}</p></div></div></div>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/AboutFeatureSection.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const __nuxt_component_0$e = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["ssrRender", _sfc_ssrRender$_]]);
const _sfc_main$12 = {
  name: "counter",
  data() {
    return {
      counterList: [
        {
          counterTitle: "68,806",
          counterDesc: "Active Users",
          counterImage: "/img/icon/counter-1.png"
        },
        {
          counterTitle: "5,740",
          counterDesc: "Events Hosted",
          counterImage: "/img/icon/counter-2.png"
        },
        {
          counterTitle: "470",
          counterDesc: "Skilled Organisers",
          counterImage: "/img/icon/counter-3.png"
        },
        {
          counterTitle: "100",
          counterDesc: "Events Categories ",
          counterImage: "/img/icon/counter-4.png"
        }
      ]
    };
  }
};
function _sfc_ssrRender$Z(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "counter-area pt-120 pb-75" }, _attrs))}><div class="container"><div class="row"><!--[-->`);
  serverRenderer.exports.ssrRenderList($data.counterList, (item) => {
    _push(`<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6"><div class="counter-box text-center mb-40"><div class="counter-icon"><img${serverRenderer.exports.ssrRenderAttr("src", item.counterImage)} alt="shape"><div class="count-number"><span class="counter">${serverRenderer.exports.ssrInterpolate(item.counterTitle)}</span><p>${serverRenderer.exports.ssrInterpolate(item.counterDesc)}</p></div></div></div></div>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/AboutCounter.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["ssrRender", _sfc_ssrRender$Z]]);
const _sfc_main$11 = {
  name: "PageTitle",
  props: {
    pageTitle: String,
    pageSubTitle: String
  }
};
function _sfc_ssrRender$Y(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
    class: "hero-arera course-item-height",
    style: { backgroundImage: `url(/img/slider/course-slider.jpg)` }
  }, _attrs))}><div class="container"><div class="row"><div class="col-xl-12"><div class="hero-course-1-text"><h2>${serverRenderer.exports.ssrInterpolate($props.pageTitle)}</h2></div><div class="course-title-breadcrumb"><nav><ol class="breadcrumb"><li class="breadcrumb-item">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="breadcrumb-item"><span>${serverRenderer.exports.ssrInterpolate($props.pageSubTitle)}</span></li></ol></nav></div></div></div></div></div>`);
}
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/PageTitle.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const PageTitle = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["ssrRender", _sfc_ssrRender$Y]]);
const _imports_0$b = publicAssetsURL(`img/shape/student-shape-03.png`);
const _imports_1$7 = publicAssetsURL(`img/shape/student-shape-04.png`);
const _imports_2$7 = publicAssetsURL(`img/shape/student-shape-05.png`);
const _imports_3$5 = publicAssetsURL(`img/shape/student-shape-06.png`);
const _imports_4$2 = publicAssetsURL(`img/shape/student-shape-07.png`);
const _imports_5$1 = publicAssetsURL(`img/student-choose/student.png`);
const _sfc_main$10 = {
  name: "student",
  props: {
    student_Space: String
  },
  data() {
    return {
      studentChoose: [
        {
          chooseTitle: "Lorem ipsum dolor sit amet"
        },
        {
          chooseTitle: "Lorem ipsum dolor sit amet"
        },
        {
          chooseTitle: "Lorem ipsum dolor sit amet"
        }
      ]
    };
  }
};
function _sfc_ssrRender$X(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
    class: $props.student_Space ? $props.student_Space : "student-choose-area fix pt-120 pb-110"
  }, _attrs))}><div class="container"><div class="row"><div class="col-xl-5 col-lg-5"><div class="student-wrapper"><div class="section-title mb-30"><h2>Why People <span class="down-mark-line">Choose</span> Us for Hosting Life Changing events.</h2></div><div class="sitdent-choose-content"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p></div><div class="student-choose-list"><ul><!--[-->`);
  serverRenderer.exports.ssrRenderList($data.studentChoose, (item) => {
    _push(`<li><i class="fas fa-check-circle"></i> ${serverRenderer.exports.ssrInterpolate(item.chooseTitle)}</li>`);
  });
  _push(`<!--]--></ul></div><div class="student-btn">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    class: "edu-sec-btn",
    to: "/about"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`More about us`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("More about us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div><div class="col-xl-2 col-lg-2"><div class="student-wrapper position-relative"><div class="shap-01"></div></div></div><div class="col-xl-5 col-lg-5"><div class="student-choose-wrapper position-relative"><div class="shap-02"></div><div class="shap-03"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$b)} alt="image not found"></div><div class="shap-04"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$7)} alt="image not found"></div><div class="shap-05"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$7)} alt="image not found"></div><div class="shap-06"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_3$5)} alt="image not found"></div><div class="shap-07"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_4$2)} alt="image not found"></div><div class="student-choose-thumb"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_5$1)} alt="image not found"></div></div></div></div></div></div>`);
}
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/StudentSection.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const StudentSection = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["ssrRender", _sfc_ssrRender$X]]);
const _imports_0$a = publicAssetsURL(`img/shape/features-shape.png`);
const _imports_1$6 = publicAssetsURL(`img/shape/features-shape-2.png`);
const _imports_2$6 = publicAssetsURL(`img/features/features.jpg`);
const _sfc_main$$ = {};
function _sfc_ssrRender$W(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}><div class="features-video-area"><div class="container"><div class="row justify-content-center"><div class="col-lg-10 col-md-9"><div><div class="features-video-wrapper"><div class="features-shape-wrapper-1"><img class="features-shape"${serverRenderer.exports.ssrRenderAttr("src", _imports_0$a)} alt="features-shape"> Get <span>help</span> from <br> this video </div><div class="features-shape-werapper-2"><span>65k+</span> <br>views daily <img class="features-shape-2"${serverRenderer.exports.ssrRenderAttr("src", _imports_1$6)} alt="features-shape-2"></div><div class="reatures-video-thumb"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$6)} alt="features-img"></div><div class="features-video-content"><div class="features-btn"><span class="popup-video" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-play"></i></span></div><div class="video-btn-text"><span>Watch Video <br>Intro</span></div></div></div></div></div></div></div><div class="features-video-modal"><div class="course-video-popup"><div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><iframe src="https://www.youtube.com/embed/wNwrSz3HYqE" title="YouTube video player"></iframe></div></div></div></div></div></div></div></div>`);
}
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/VideoSection.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const VideoSection = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["ssrRender", _sfc_ssrRender$W]]);
const _sfc_main$_ = {
  name: "knowUs",
  data() {
    return {
      knowUs: [
        {
          id: 1,
          knowUsImage: "/img/gallery/gallary-06.jpg",
          knowUsTitle: "Our mission & vision"
        },
        {
          id: 2,
          knowUsImage: "/img/gallery/gallary-07.jpg",
          knowUsTitle: "How we host"
        },
        {
          id: 3,
          knowUsImage: "/img/gallery/gallary-08.jpg",
          knowUsTitle: "Why we are trusted"
        }
      ]
    };
  }
};
function _sfc_ssrRender$V(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "know-us-better-area pb-90" }, _attrs))}><div class="container"><div class="know-us-border pt-110"><div class="row justify-content-center"><div class="col-xl-10 col-lg-12"><div class="row"><div class="col-xl-6 col-lg-6"><div class="section-title mb-55"><h2>Know us <span class="down-mark-line-2">Better</span> Than<br> Event Platform </h2></div></div><div class="col-xl-6 col-lg-6 justify-content-end"><div class="know-us-tittle mb-55"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div></div></div></div></div><div class="row"><!--[-->`);
  serverRenderer.exports.ssrRenderList($data.knowUs, (item) => {
    _push(`<div class="col-xl-4 col-lg-4 col-md-6"><div class="know-us-wrapper mb-30"><div class="know-us-better-thumb">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", item.knowUsImage)} alt="know-us-img"${_scopeId}>`);
        } else {
          return [
            vue_cjs_prod.createVNode("img", {
              src: item.knowUsImage,
              alt: "know-us-img"
            }, null, 8, ["src"])
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div><div class="know-us-text text-center">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<h3${_scopeId}>${serverRenderer.exports.ssrInterpolate(item.knowUsTitle)}</h3>`);
        } else {
          return [
            vue_cjs_prod.createVNode("h3", null, vue_cjs_prod.toDisplayString(item.knowUsTitle), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div></div></div>`);
  });
  _push(`<!--]--></div></div></div></div>`);
}
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/KnowUsSection.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const KnowUsSection = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["ssrRender", _sfc_ssrRender$V]]);
const _sfc_main$Z = {};
function _sfc_ssrRender$U(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "become-intructor-area pt-110 pb-120" }, _attrs))}><div class="container"><div class="row justify-content-center text-center"><div class="col-xl-6 col-md-8"><div class="become-intructor-text"><h2>Become an Organiser Today</h2><p>Join one of the world\u2019s largest online Event marketplaces. Our Organiser Support Team is ready to help you in any way they can</p>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    class: "edu-btn",
    to: "/contact"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Get started now`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Get started now")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div>`);
}
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BecomeInstructor/InstructorToday.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const InstructorToday = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["ssrRender", _sfc_ssrRender$U]]);
const _sfc_main$Y = {
  name: "affiliate",
  data() {
    return {
      affiliateList: [
        {
          id: 1,
          affiliateImage: "/img/brand/partner-01.png"
        },
        {
          id: 2,
          affiliateImage: "/img/brand/partner-02.png"
        },
        {
          id: 3,
          affiliateImage: "/img/brand/partner-03.png"
        },
        {
          id: 4,
          affiliateImage: "/img/brand/partner-04.png"
        },
        {
          id: 5,
          affiliateImage: "/img/brand/partner-05.png"
        },
        {
          id: 6,
          affiliateImage: "/img/brand/partner-06.png"
        },
        {
          id: 7,
          affiliateImage: "/img/brand/partner-07.png"
        },
        {
          id: 8,
          affiliateImage: "/img/brand/partner-08.png"
        },
        {
          id: 9,
          affiliateImage: "/img/brand/partner-09.png"
        },
        {
          id: 10,
          affiliateImage: "/img/brand/partner-10.png"
        }
      ]
    };
  }
};
function _sfc_ssrRender$T(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "affiliates-area pt-120 pb-120" }, _attrs))}><div class="container"><div class="row"><div class="col-xl-12"><div class="affiliates-wrapper"><!--[-->`);
  serverRenderer.exports.ssrRenderList($data.affiliateList, (item) => {
    _push(`<div class="singel-affiliates-img"><img${serverRenderer.exports.ssrRenderAttr("src", item.affiliateImage)} alt="affiliates-img"></div>`);
  });
  _push(`<!--]--></div></div></div></div></div>`);
}
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/AffiliateSection.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const AffiliateSection = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["ssrRender", _sfc_ssrRender$T]]);
const _sfc_main$X = {
  name: "app",
  components: {
    FooterOne,
    PageTitle,
    StudentSection,
    AboutFeatureSection: __nuxt_component_0$e,
    VideoSection,
    AboutCounter: __nuxt_component_1$1,
    KnowUsSection,
    InstructorToday,
    AffiliateSection,
    HeaderFour
  },
  data() {
    return {
      loggedIn: false,
      loaded: false
    };
  },
  mounted() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
    }
    this.loaded = true;
  }
};
function _sfc_ssrRender$S(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_StudentSection = vue_cjs_prod.resolveComponent("StudentSection");
  const _component_AboutFeatureSection = __nuxt_component_0$e;
  const _component_VideoSection = vue_cjs_prod.resolveComponent("VideoSection");
  const _component_AboutCounter = __nuxt_component_1$1;
  const _component_KnowUsSection = vue_cjs_prod.resolveComponent("KnowUsSection");
  const _component_InstructorToday = vue_cjs_prod.resolveComponent("InstructorToday");
  const _component_AffiliateSection = vue_cjs_prod.resolveComponent("AffiliateSection");
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, { isLoggedIn: $data.loggedIn }, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
      pageTitle: "About",
      pageSubTitle: "About"
    }, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_StudentSection, { student_Space: "student-choose-area fix pt-110 pb-90" }, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_AboutFeatureSection, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_VideoSection, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_AboutCounter, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_KnowUsSection, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_InstructorToday, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_AffiliateSection, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/AboutMain.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const __nuxt_component_0$d = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["ssrRender", _sfc_ssrRender$S]]);
const meta$h = void 0;
const _sfc_main$W = {
  name: "EventModal",
  data() {
    return {
      EventData: {
        Name: "",
        Sport: "",
        Category: "",
        startDate: "",
        endDate: "",
        Description: "",
        createdById: "",
        createdByFName: "",
        createdByLName: "",
        Address: "",
        Landmark: "",
        Prize1: "No Prize",
        Prize2: "No Prize",
        Prize3: "No Prize",
        consolationPrize: "No Prize",
        Time: "",
        Location: "",
        Rules: "",
        entryFee: "",
        Organiser1Name: "",
        Organiser1Phone: "",
        Organiser2Name: "",
        Organiser2Phone: "",
        createdById: "",
        createdByFName: "",
        createdByLName: ""
      },
      EventError: false,
      EventSuccess: false,
      errorMessage: "",
      addEventId: ""
    };
  },
  methods: {
    async addEvent() {
      const data = JSON.parse(localStorage.UserData);
      this.EventData.createdById = data.id;
      this.EventData.createdByFName = data.FName;
      this.EventData.createdByLName = data.LName;
      axios.post("http://143.42.142.151:4000/events/createEvent", this.EventData).then((response) => {
        console.log(response);
        this.addEventId = response.data.id;
        this.EventSuccess = true;
        this.EventData.Name = "";
        this.EventData.Sport = "";
        this.EventData.Category = "";
        this.EventData.startDate = "";
        this.EventData.endDate = "";
        this.EventData.Description = "";
        this.EventData.createdById = "";
        this.EventData.createdByFName = "";
        this.EventData.createdByLName = "";
        this.EventData.Address = "";
        this.EventData.Landmark = "";
        this.EventData.Prize1 = null;
        this.EventData.Prize2 = null;
        this.EventData.Prize3 = null;
        this.EventData.consolationPrize = null;
        this.EventData.Time = "";
        this.EventData.Location = "";
        this.EventData.Rules = "";
        this.EventData.entryFee = "";
        this.EventData.Organiser1Name = "";
        this.EventData.Organiser1Phone = "";
        this.EventData.Organiser2Name = "";
        this.EventData.Organiser2Phone = "";
        this.EventData.createdById = "";
        this.EventData.createdByFName = "";
        this.EventData.createdByLName = "";
      }).catch((error) => {
        if (error.response) {
          this.EventError = true;
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
          this.EventError = true;
          this.errorMessage = error.request;
        } else {
          console.log("Error", error.message);
          this.EventError = true;
          this.errorMessage = error.message;
        }
      });
    }
  },
  beforeMount() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
    }
  }
};
function _sfc_ssrRender$R(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "container" }, _attrs))} data-v-8b8afa60><div class="sign-up-wrapper" data-v-8b8afa60><div class="signup-box text-center" data-v-8b8afa60><div class="signup-text" data-v-8b8afa60><h3 data-v-8b8afa60>Host Event</h3></div><div class="signup-message" data-v-8b8afa60><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$8)} alt="image not found" data-v-8b8afa60></div><div class="signup-thumb" data-v-8b8afa60><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$8)} alt="image not found" data-v-8b8afa60></div></div><form class="signup-form-wrapper" data-v-8b8afa60><div class="mt-10 mb-20" data-v-8b8afa60><h3 data-v-8b8afa60>Event details</h3></div><div class="signup-input-wrapper" data-v-8b8afa60><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Name)} type="text" placeholder="Event Name" data-v-8b8afa60></div><div class="signup-wrapper" data-v-8b8afa60><select class="form-select" required data-v-8b8afa60><option value="" disabled selected data-v-8b8afa60>Select Sport *</option><option value="Cricket" data-v-8b8afa60>Cricket</option><option value="Football" data-v-8b8afa60>Football</option><option value="Basketball" data-v-8b8afa60>Basketball</option><option value="Hockey" data-v-8b8afa60>Hockey</option><option value="Badminton" data-v-8b8afa60>Badminton</option><option value="Other" data-v-8b8afa60>Other</option></select></div><div class="signup-wrapper" data-v-8b8afa60><select class="form-select" required data-v-8b8afa60><option value="" disabled selected data-v-8b8afa60>Category *</option><option value="Indoor" data-v-8b8afa60>Indoor</option><option value="Outdoor" data-v-8b8afa60>Outdoor</option><option value="Other" data-v-8b8afa60>Other</option></select></div><div class="signup-wrapper" data-v-8b8afa60><label for="fromDate" data-v-8b8afa60>From *</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.startDate)} type="Date" name="fromDate" data-v-8b8afa60></div><div class="signup-wrapper" data-v-8b8afa60><label for="toDate" data-v-8b8afa60>To *</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.endDate)} type="Date" name="toDate" data-v-8b8afa60></div><div class="signup-wrapper" data-v-8b8afa60><label for="time" data-v-8b8afa60>Time of Event *</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Time)} type="time" class="form-select" name="time" placeholder="Event Time" data-v-8b8afa60></div><div class="signup-input-wrapper mb-20" data-v-8b8afa60><textarea class="form-textarea" rows="3" placeholder="Event Description" data-v-8b8afa60>${serverRenderer.exports.ssrInterpolate($data.EventData.Description)}</textarea></div><div class="signup-input-wrapper mb-20" data-v-8b8afa60><textarea class="form-textarea" rows="1" placeholder="First Prize (optional)" data-v-8b8afa60>${serverRenderer.exports.ssrInterpolate($data.EventData.Prize1)}</textarea></div><div class="signup-input-wrapper mb-20" data-v-8b8afa60><textarea class="form-textarea" rows="1" placeholder="Second Prize (optional)" data-v-8b8afa60>${serverRenderer.exports.ssrInterpolate($data.EventData.Prize2)}</textarea></div><div class="signup-input-wrapper mb-20" data-v-8b8afa60><textarea class="form-textarea" rows="1" placeholder="Third Prize (optional)" data-v-8b8afa60>${serverRenderer.exports.ssrInterpolate($data.EventData.Prize3)}</textarea></div><div class="signup-input-wrapper mb-20" data-v-8b8afa60><textarea class="form-textarea" rows="1" placeholder="Consolation Prize (optional)" data-v-8b8afa60>${serverRenderer.exports.ssrInterpolate($data.EventData.consolationPrize)}</textarea></div><div class="signup-input-wrapper mb-20" data-v-8b8afa60><textarea class="form-textarea" rows="2" placeholder="Event Address" data-v-8b8afa60>${serverRenderer.exports.ssrInterpolate($data.EventData.Address)}</textarea></div><div class="signup-input-wrapper mb-20" data-v-8b8afa60><textarea class="form-textarea" rows="1" placeholder="Nearby Landmark" data-v-8b8afa60>${serverRenderer.exports.ssrInterpolate($data.EventData.Landmark)}</textarea></div><div class="signup-wrapper" data-v-8b8afa60><select class="form-select" data-v-8b8afa60><option value="" disabled selected data-v-8b8afa60>Select State *</option><option value="Andhra Pradesh" data-v-8b8afa60>Andhra Pradesh</option><option value="Andaman and Nicobar Islands" data-v-8b8afa60>Andaman and Nicobar Islands</option><option value="Arunachal Pradesh" data-v-8b8afa60>Arunachal Pradesh</option><option value="Assam" data-v-8b8afa60>Assam</option><option value="Bihar" data-v-8b8afa60>Bihar</option><option value="Chandigarh" data-v-8b8afa60>Chandigarh</option><option value="Chhattisgarh" data-v-8b8afa60>Chhattisgarh</option><option value="Dadar and Nagar Haveli" data-v-8b8afa60>Dadar and Nagar Haveli</option><option value="Daman and Diu" data-v-8b8afa60>Daman and Diu</option><option value="Delhi" data-v-8b8afa60>Delhi</option><option value="Lakshadweep" data-v-8b8afa60>Lakshadweep</option><option value="Puducherry" data-v-8b8afa60>Puducherry</option><option value="Goa" data-v-8b8afa60>Goa</option><option value="Gujarat" data-v-8b8afa60>Gujarat</option><option value="Haryana" data-v-8b8afa60>Haryana</option><option value="Himachal Pradesh" data-v-8b8afa60>Himachal Pradesh</option><option value="Jammu and Kashmir" data-v-8b8afa60>Jammu and Kashmir</option><option value="Jharkhand" data-v-8b8afa60>Jharkhand</option><option value="Karnataka" data-v-8b8afa60>Karnataka</option><option value="Kerala" data-v-8b8afa60>Kerala</option><option value="Madhya Pradesh" data-v-8b8afa60>Madhya Pradesh</option><option value="Maharashtra" data-v-8b8afa60>Maharashtra</option><option value="Manipur" data-v-8b8afa60>Manipur</option><option value="Meghalaya" data-v-8b8afa60>Meghalaya</option><option value="Mizoram" data-v-8b8afa60>Mizoram</option><option value="Nagaland" data-v-8b8afa60>Nagaland</option><option value="Odisha" data-v-8b8afa60>Odisha</option><option value="Punjab" data-v-8b8afa60>Punjab</option><option value="Rajasthan" data-v-8b8afa60>Rajasthan</option><option value="Sikkim" data-v-8b8afa60>Sikkim</option><option value="Tamil Nadu" data-v-8b8afa60>Tamil Nadu</option><option value="Telangana" data-v-8b8afa60>Telangana</option><option value="Tripura" data-v-8b8afa60>Tripura</option><option value="Uttar Pradesh" data-v-8b8afa60>Uttar Pradesh</option><option value="Uttarakhand" data-v-8b8afa60>Uttarakhand</option><option value="West Bengal" data-v-8b8afa60>West Bengal</option></select></div><div class="signup-input-wrapper mb-20" data-v-8b8afa60><textarea class="form-textarea" rows="3" placeholder="Event Rules and Regulations" data-v-8b8afa60>${serverRenderer.exports.ssrInterpolate($data.EventData.Rules)}</textarea></div><div class="signup-input-wrapper" data-v-8b8afa60><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.entryFee)} type="number" placeholder="Event Entry Fees" data-v-8b8afa60></div><div class="mt-10 mb-10" data-v-8b8afa60><h3 data-v-8b8afa60>Organiser details</h3></div><div class="signup-input-wrapper" data-v-8b8afa60><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Organiser1Name)} type="text" placeholder="First Organiser Name" data-v-8b8afa60></div><div class="signup-input-wrapper" data-v-8b8afa60><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Organiser1Phone)} type="tel" pattern="[6789][0-9]{9}" placeholder="First Organiser Number" data-v-8b8afa60></div><div class="signup-input-wrapper" data-v-8b8afa60><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Organiser2Name)} type="text" placeholder="Second Organiser Name" data-v-8b8afa60></div><div class="signup-input-wrapper" data-v-8b8afa60><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Organiser2Phone)} type="tel" pattern="[6789][0-9]{9}" placeholder="Second Organiser Number" data-v-8b8afa60></div>`);
  if ($data.EventError) {
    _push(`<div class="my-20 text-center" data-v-8b8afa60><p class="text-md text-danger" data-v-8b8afa60>${serverRenderer.exports.ssrInterpolate($data.errorMessage)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.EventSuccess) {
    _push(`<div class="m-4 w-full" data-v-8b8afa60><div class="alert alert-success" role="alert" data-v-8b8afa60> Your event is submitted succesfully. We will notify you of any change in status through email.<br data-v-8b8afa60><span class="mt-4 d-block" data-v-8b8afa60>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      class: "text-primary link-hover",
      to: `/event-details/${$data.addEventId}`
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`View Details`);
        } else {
          return [
            vue_cjs_prod.createTextVNode("View Details")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</span></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="sing-buttom mb-20" data-v-8b8afa60><button type="submit" class="sing-btn w-100" data-v-8b8afa60>Host Event</button></div></form></div></div>`);
}
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/EventAdd.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const EventAdd = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["ssrRender", _sfc_ssrRender$R], ["__scopeId", "data-v-8b8afa60"]]);
const _sfc_main$V = {
  name: "app",
  components: {
    FooterOne,
    PageTitle,
    HeaderFour,
    EventAdd
  },
  data() {
    return {
      loggedIn: false,
      loaded: false
    };
  },
  mounted() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
    }
    this.loaded = true;
  }
};
function _sfc_ssrRender$Q(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_EventAdd = vue_cjs_prod.resolveComponent("EventAdd");
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, { isLoggedIn: $data.loggedIn }, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
      pageTitle: "Host Event",
      pageSubTitle: "Host Event"
    }, null, _parent));
    _push(`<div class="event-ara pt-120 pb-90">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_EventAdd, null, null, _parent));
    _push(`</div>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AddEvent/AddEventMain.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const __nuxt_component_0$c = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["ssrRender", _sfc_ssrRender$Q]]);
const meta$g = void 0;
const _sfc_main$U = {
  name: "AdminTiles",
  data() {
    return {
      pendingCount: "",
      totalCount: "",
      featuredCount: "",
      userCount: "",
      adminCount: ""
    };
  },
  methods: {
    async getEventCount() {
      await axios.get("http://143.42.142.151:4000/events/getEventCount", {
        params: { approvalStatus: "Approved" }
      }).then((res) => {
        console.log(res.data.EventCount);
        this.totalCount = res.data.EventCount;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
    },
    async getPendingCount() {
      await axios.get("http://143.42.142.151:4000/events/getEventCount", {
        params: { approvalStatus: "Pending" }
      }).then((res) => {
        console.log(res.data.EventCount);
        this.pendingCount = res.data.EventCount;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
    },
    async getFeaturedCount() {
      await axios.get("http://143.42.142.151:4000/events/getEventCount", {
        params: { Featured: "Yes" }
      }).then((res) => {
        console.log(res.data.EventCount);
        this.featuredCount = res.data.EventCount;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
    }
  },
  beforeMount() {
    this.getEventCount();
    this.getFeaturedCount();
    this.getPendingCount();
  }
};
function _sfc_ssrRender$P(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "membership-area pt-110" }, _attrs))} data-v-4f02f683><div class="container" data-v-4f02f683><div class="row justify-content-center" data-v-4f02f683><div class="col-xl-6 col-lg-6" data-v-4f02f683><div class="section-title text-center mb-40" data-v-4f02f683><h2 data-v-4f02f683>Administrator Actions</h2></div><div class="pricing-tab mb-60" data-v-4f02f683><ul class="nav nav-tabs justify-content-center" id="priceTab" role="tablist" data-v-4f02f683><li class="nav-item" role="presentation" data-v-4f02f683><button class="nav-link active" id="events-tab" data-bs-toggle="tab" data-bs-target="#events" type="button" role="tab" aria-controls="events" aria-selected="true" data-v-4f02f683>Events</button></li><li class="nav-item" role="presentation" data-v-4f02f683><button class="nav-link" id="users-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab" aria-controls="users" aria-selected="false" data-v-4f02f683>Users</button></li></ul></div></div><div class="tab-content" id="priceTabContent" style="${serverRenderer.exports.ssrRenderStyle({ "visibility": "visible", "animation-delay": "0.5s", "animation-name": "fadeInUp" })}" data-v-4f02f683><div class="tab-pane fade active show" id="events" role="tabpanel" aria-labelledby="events-tab" data-v-4f02f683><div class="row" data-v-4f02f683><div class="col-xl-4 col-lg-6 col-md-6" data-v-4f02f683><div class="admin-tile mb-30" data-v-4f02f683><div class="membership-info" data-v-4f02f683><h4 data-v-4f02f683>Pending</h4><div class="membership-price" data-v-4f02f683><span data-v-4f02f683>${serverRenderer.exports.ssrInterpolate($data.pendingCount)}</span><p data-v-4f02f683>Events awaiting </p></div></div><a class="membership-btn" href="/pending" data-v-4f02f683>Show All</a></div></div><div class="col-xl-4 col-lg-6 col-md-6" data-v-4f02f683><div class="admin-tile mb-30" data-v-4f02f683><div class="membership-info" data-v-4f02f683><h4 data-v-4f02f683>Featured</h4><div class="membership-price" data-v-4f02f683><span data-v-4f02f683>${serverRenderer.exports.ssrInterpolate($data.featuredCount)} / 6</span><p data-v-4f02f683>Set featured events (total 6) </p></div></div><a class="membership-btn" href="/pending" data-v-4f02f683>Set Featured</a></div></div><div class="col-xl-4 col-lg-6 col-md-6" data-v-4f02f683><div class="admin-tile mb-30" data-v-4f02f683><div class="membership-info" data-v-4f02f683><h4 data-v-4f02f683>Approved Events</h4><div class="membership-price" data-v-4f02f683><span data-v-4f02f683>${serverRenderer.exports.ssrInterpolate($data.totalCount)}</span><p data-v-4f02f683>All approved events </p></div></div><a class="membership-btn" href="/approved" data-v-4f02f683>Show All</a></div></div></div></div><div class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab" data-v-4f02f683><div class="row" data-v-4f02f683><div class="col-xl-6 col-lg-6 col-md-6" data-v-4f02f683><div class="admin-tile mb-30" data-v-4f02f683><div class="membership-info" data-v-4f02f683><h4 data-v-4f02f683>All Users</h4><div class="membership-price" data-v-4f02f683><span data-v-4f02f683>${serverRenderer.exports.ssrInterpolate($data.userCount)}</span><p data-v-4f02f683>All users</p></div></div><a class="membership-btn" href="#" data-v-4f02f683>Show All</a></div></div><div class="col-xl-6 col-lg-6 col-md-6" data-v-4f02f683><div class="admin-tile mb-30" data-v-4f02f683><div class="membership-info" data-v-4f02f683><h4 data-v-4f02f683>Admin Users</h4><div class="membership-price" data-v-4f02f683><span data-v-4f02f683>${serverRenderer.exports.ssrInterpolate($data.adminCount)}</span><p data-v-4f02f683>All admin users</p></div></div><a class="membership-btn" href="#" data-v-4f02f683>Show All</a></div></div></div></div></div></div></div></section>`);
}
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Admin/AdminTiles.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const __nuxt_component_0$b = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["ssrRender", _sfc_ssrRender$P], ["__scopeId", "data-v-4f02f683"]]);
const _sfc_main$T = {
  name: "AdminMain",
  components: {
    FooterOne,
    PageTitle,
    HeaderFour,
    AdminTiles: __nuxt_component_0$b
  },
  data() {
    return {
      loaded: false
    };
  },
  beforeMount() {
    if (localStorage.loggedIn) {
      this.loaded = localStorage.loggedIn;
    }
  }
};
function _sfc_ssrRender$O(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_AdminTiles = __nuxt_component_0$b;
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
      pageTitle: "Admin Dashboard",
      pageSubTitle: "Admin"
    }, null, _parent));
    _push(`<div class="event-ara pt-120 pb-90"><div class="container">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_AdminTiles, null, null, _parent));
    _push(`</div></div>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Admin/AdminMain.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const __nuxt_component_0$a = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["ssrRender", _sfc_ssrRender$O]]);
const meta$f = void 0;
const blogItemsMixin = {
  data() {
    return {
      blogItemss: [
        {
          id: 1,
          blogImage: "/img/blog/blog-01.jpg",
          blogTitle: "Ask the Expert: Typography Talk with Brian Hoff",
          blogDate: "23 Jan 2022",
          blogUser: "Brian Hoff",
          blogTag: "Development",
          blogDesc: "There are so many websites out there that have not considered the overall usability of their visually impaired users.When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind. The participants ...",
          blogDescHidden: "d-none",
          blogBtn: "Read more"
        },
        {
          id: 2,
          blogImage: "/img/blog/blog-02.jpg",
          blogTitle: "Stop Redesigning And Start Your Tuning Your Site Instead",
          blogDate: "25 Jan 2022",
          blogUser: "Mark Hanry",
          blogTag: "Business",
          blogDesc: "Entrepreneurs and go-getters often feel as if they carry the weight of an entire organization on their backs, and therefore could always use a little extra motivation. Everyone must work, but for many of us that job isn\u2019t just a paycheck, it\u2019s an opportunity to express ourselves and make ...",
          blogDescHidden: "d-none",
          blogBtn: "Read more"
        },
        {
          id: 3,
          blogImage: "/img/blog/blog-03.jpg",
          blogTitle: "How To Teach Web Design to the New Students",
          blogDate: "28 Jan 2022",
          blogUser: "Eduman",
          blogTag: "Web Design",
          blogDesc: "There are so many websites out there that have not considered the overall usability of their visually impaired users. When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind. The participants ...",
          blogDescHidden: "d-none",
          blogBtn: "Read more"
        },
        {
          id: 4,
          blogImage: "/img/course/course-10.jpg",
          blogTitle: "The Importance Intrinsic Motivation.",
          blogDate: "March 15, 2022",
          blogUser: "Eduman",
          blogTag: "Web Design",
          blogDesc: "There are so many websites out there that have not considered the overall usability of their visually impaired users. When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind. The participants ...",
          blogDescHidden: "d-none",
          blogBtn: "Read more"
        },
        {
          id: 5,
          blogImage: "/img/course/course-11.jpg",
          blogTitle: "A Better Alternative To Grading Student.",
          blogDate: "28 Jan 2022",
          blogUser: "Eduman",
          blogTag: "Web Design",
          blogDesc: "There are so many websites out there that have not considered the overall usability of their visually impaired users. When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind. The participants ...",
          blogDescHidden: "d-none",
          blogBtn: "Read more"
        },
        {
          id: 6,
          blogImage: "/img/course/course-15.jpg",
          blogTitle: "Strategic Social Media And Evolution of Visual",
          blogDate: "28 Jan 2022",
          blogUser: "Eduman",
          blogTag: "Web Design",
          blogDesc: "There are so many websites out there that have not considered the overall usability of their visually impaired users. When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind. The participants ...",
          blogDescHidden: "d-none",
          blogBtn: "Read more"
        }
      ]
    };
  }
};
const _sfc_main$S = {
  name: "app",
  mixins: [blogItemsMixin]
};
function _sfc_ssrRender$N(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "sidebar-widget-wrapper" }, _attrs))}><div class="sidebar__search p-relative mb-30"><form action="#"><input type="text" placeholder="Search for courses..."><button type="submit"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 584.4 584.4" style="${serverRenderer.exports.ssrRenderStyle({ "enable-background": "new 0 0 584.4 584.4" })}" xml:space="preserve"><g><g><path class="st0" d="M565.7,474.9l-61.1-61.1c-3.8-3.8-8.8-5.9-13.9-5.9c-6.3,0-12.1,3-15.9,8.3c-16.3,22.4-36,42.1-58.4,58.4    c-4.8,3.5-7.8,8.8-8.3,14.5c-0.4,5.6,1.7,11.3,5.8,15.4l61.1,61.1c12.1,12.1,28.2,18.8,45.4,18.8c17.1,0,33.3-6.7,45.4-18.8    C590.7,540.6,590.7,499.9,565.7,474.9z"></path><path class="st1" d="M254.6,509.1c140.4,0,254.5-114.2,254.5-254.5C509.1,114.2,394.9,0,254.6,0C114.2,0,0,114.2,0,254.5    C0,394.9,114.2,509.1,254.6,509.1z M254.6,76.4c98.2,0,178.1,79.9,178.1,178.1s-79.9,178.1-178.1,178.1S76.4,352.8,76.4,254.5    S156.3,76.4,254.6,76.4z"></path></g></g></svg></button></form></div><div class="sidebar__widget mb-30"><div class="sidebar__widget-head mb-35"><h4 class="sidebar__widget-title">Recent posts</h4></div><div class="sidebar__widget-content"><div class="rc__post-wrapper"><!--[-->`);
  serverRenderer.exports.ssrRenderList(_ctx.blogItemss.slice(3, 6), (item) => {
    _push(`<div class="rc__post d-flex align-items-center"><div class="rc__thumb mr-20">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      to: `/blog-details/${item.id}`
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", item.blogImage)} alt="img not found"${_scopeId}>`);
        } else {
          return [
            vue_cjs_prod.createVNode("img", {
              src: item.blogImage,
              alt: "img not found"
            }, null, 8, ["src"])
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div><div class="rc__content"><div class="rc__meta"><span>${serverRenderer.exports.ssrInterpolate(item.blogDate)}</span></div><h6 class="rc__title">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      to: `/blog-details/${item.id}`
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${serverRenderer.exports.ssrInterpolate(item.blogTitle)}`);
        } else {
          return [
            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.blogTitle), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</h6></div></div>`);
  });
  _push(`<!--]--></div></div></div><div class="sidebar__widget mb-30"><div class="sidebar__widget-head mb-35"><h4 class="sidebar__widget-title">Category</h4></div><div class="sidebar__widget-content"><div class="sidebar__category"><ul><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Data Science(2)`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Data Science(2)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Video and Tips (4)`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Video and Tips (4)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Education (8)`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Education (8)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Business (5)`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Business (5)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`UX Design (3)`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("UX Design (3)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div></div><div class="sidebar__widget mb-30"><div class="sidebar__widget-head mb-35"><h4 class="sidebar__widget-title">Tags</h4></div><div class="sidebar__widget-content"><div class="sidebar__tag">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Art and Design`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Art and Design")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Course`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Course")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Videos`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Videos")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`App`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("App")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Education`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Education")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Data Science`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Data Science")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Machine Learning`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Machine Learning")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Tips`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Tips")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Blog/BlogSidebar.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["ssrRender", _sfc_ssrRender$N]]);
const _imports_0$9 = publicAssetsURL(`img/blog/blog-04.jpg`);
const _imports_1$5 = publicAssetsURL(`img/member/member-img-04.png`);
const _imports_2$5 = publicAssetsURL(`img/member/member-img-01.png`);
const _imports_3$4 = publicAssetsURL(`img/member/member-img-02.png`);
const meta$e = void 0;
const _imports_0$8 = publicAssetsURL(`img/blog/blog-01.jpg`);
const _sfc_main$R = {
  name: "app",
  mixins: [blogItemsMixin],
  components: {
    FooterOne,
    BlogSidebar: __nuxt_component_1,
    HeaderFour
  }
};
function _sfc_ssrRender$M(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_BlogSidebar = __nuxt_component_1;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
  _push(`<div class="hero-arera course-item-height" style="${serverRenderer.exports.ssrRenderStyle({ backgroundImage: `url(/img/slider/course-slider.jpg)` })}"><div class="container"><div class="row"><div class="col-xl-12"><div class="hero-course-1-text"><h2>How to teach web design to the new students</h2></div><div class="course-title-breadcrumb"><nav><ol class="breadcrumb"><li class="breadcrumb-item">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="breadcrumb-item"><span>How to teach web design to the new students</span></li></ol></nav></div></div></div></div></div><div class="blog-area pt-120 pb-90"><div class="container"><div class="row"><div class="col-xl-8 col-lg-12"><div class="blog-main-wrapper mb-0"><div class="row"><div class="col-xl-12 col-lg-12 col-md-12"><div class="blog-wrapper position-relative blog-details-wrapper mb-30"><div class="blog-thumb"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$8)} alt="blog-img"></div><div class="blog-tag"><i class="fal fa-folder-open"></i>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Development`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Development")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="blog-content-wrapper"><div class="blog-meta"><div class="blog-date"><i class="flaticon-calendar"></i><span>23 Jan 2020</span></div><div class="blog-user"><i class="flaticon-avatar"></i><span>Eduman</span></div></div><div class="blog-content"><p>When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind. There are so many websites out there that have not considered the overall usability of their visually impaired users. The participants will get general ideas of the land management system of business. Everyone must work, but for many of us that job isn\u2019t just a paycheck, it\u2019s an opportunity to express ourselves and make something better. Entrepreneurs and go-getters often feel as if they carry the weight of an entire organization on their backs, and therefore could always use a little extra motivation.</p><blockquote><p>Tosser argy-bargy mush loo at public school Elizabeth up the duff buggered chinwag on your bike mate don\u2019t get shirty with me super, Jeffrey bobby Richard cheesed off spend a penny a load of old tosh blag horse.</p><p class="mb-0"><cite>Eduman</cite></p></blockquote><p>Cheeky bugger cracking goal starkers lemon squeezy lost the plot pardon me no biggie the BBC burke gosh boot so I said wellies, zonked a load of old tosh bodge barmy skive off he legged it morish spend a penny my good sir wind up hunky-dory. Naff grub elizabeth cheesed off don\u2019t get shirty with me arse over tit mush a blinding shot young delinquent bloke boot blatant.</p><p><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$9)} alt="img"></p><h4 class="mb-20">Typography is the powerful element you will ever need</h4><p>The participants will get general ideas of the land management system of business. Everyone must work, but for many of us that job isn\u2019t just a paycheck, it\u2019s an opportunity to express ourselves and make something better. Entrepreneurs and go-getters often feel as if they carry the weight of an entire organization on their backs, and therefore could always use a little extra motivation.</p><p>When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind. There are so many websites out there that have not considered the overall usability of their visually impaired users.</p><div class="blog__details__tag tagcloud"><span>Post Tags : </span>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Class`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Class")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Course`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Course")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Design`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Design")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Science`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Science")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div><div class="latest-comments mb-50 mt-50"><h3>3 Comments</h3><ul><li><div class="comments-box"><div class="comments-info d-flex"><div class="comments-avatar mr-20"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$5)} alt="img not found"></div><div class="avatar-name"><h5>Eleanor Fant</h5><span class="post-meta"> July 14, 2022</span></div></div><div class="comments-text ml-65"><p>So I said lurgy dropped a clanger Jeffrey bugger cuppa gosh David blatant have it, standard A bit of how&#39;s your father my lady absolutely.</p><div class="comments-replay"><a href="#">Reply</a></div></div></div></li><li class="children"><div class="comments-box"><div class="comments-info d-flex"><div class="comments-avatar mr-20"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$5)} alt="img not found"></div><div class="avatar-name"><h5>Dominic</h5><span class="post-meta">April 16, 2022 </span></div></div><div class="comments-text ml-65"><p>David blatant have it, standard A bit of how&#39;s your father my lady absolutely.</p><div class="comments-replay"><a href="#">Reply</a></div></div></div><ul><li class="children-2"><div class="comments-box"><div class="comments-info d-flex"><div class="comments-avatar mr-20"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_3$4)} alt="img not found"></div><div class="avatar-name"><h5>Von Rails</h5><span class="post-meta">April 18, 2022 </span></div></div><div class="comments-text ml-65"><p>He nicked it get stuffed mate spend a penny plastered.!</p><div class="comments-replay"><a href="#">Reply</a></div></div></div></li></ul></li></ul><ul><li><div class="comments-box"><div class="comments-info d-flex"><div class="comments-avatar mr-20"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$5)} alt="img not found"></div><div class="avatar-name"><h5>Eleanor Fant</h5><span class="post-meta"> July 14, 2022</span></div></div><div class="comments-text ml-65"><p>So I said lurgy dropped a clanger Jeffrey bugger cuppa gosh David blatant have it, standard A bit of how&#39;s your father my lady absolutely. </p><div class="comments-replay"><a href="#">Reply</a></div></div></div></li><li class="children"><div class="comments-box"><div class="comments-info d-flex"><div class="comments-avatar mr-20"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$5)} alt="img not found"></div><div class="avatar-name"><h5>Dominic</h5><span class="post-meta">April 16, 2022 </span></div></div><div class="comments-text ml-65"><p>David blatant have it, standard A bit of how&#39;s your father my lady absolutely.</p><div class="comments-replay"><a href="#">Reply</a></div></div></div></li></ul></div><div class="blog__comment"><h3>Leave a Comment</h3><form action="#"><div class="row"><div class="col-xxl-6 col-xl-6 col-lg-6"><div class="blog__comment-input"><input type="text" placeholder="Your Name"></div></div><div class="col-xxl-6 col-xl-6 col-lg-6"><div class="blog__comment-input"><input type="email" placeholder="Your Email"></div></div><div class="col-xxl-12"><div class="blog__comment-input"><input type="text" placeholder="Website"></div></div><div class="col-xxl-12"><div class="blog__comment-input"><textarea placeholder="Enter your comment ..."></textarea></div></div><div class="col-xxl-12"><div class="blog__comment-agree d-flex align-items-center mb-20"><input class="e-check-input" type="checkbox" id="e-agree"><label class="e-check-label" for="e-agree">Save my name, email, and website in this browser for the next time I comment.</label></div></div><div class="col-xxl-12"><div class="blog__comment-btn"><button type="submit" class="edu-btn">Post Comment</button></div></div></div></form></div></div></div></div></div></div><div class="col-xl-4 col-lg-8 col-md-8">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_BlogSidebar, null, null, _parent));
  _push(`</div></div></div></div></div>`);
}
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlogDetails/BlogDetailsMain.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const __nuxt_component_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["ssrRender", _sfc_ssrRender$M]]);
const meta$d = void 0;
const _sfc_main$Q = {
  name: "app",
  data() {
    return {
      contactData: {
        Name: "",
        Email: "",
        Phone: "",
        Subject: "",
        Message: ""
      },
      contactSubmitted: false,
      contactError: false,
      contactEmailError: false,
      errorMessage: ""
    };
  },
  methods: {
    async contactSubmit() {
      if (this.validateEmail(this.contactData.Email)) {
        axios.post("http://143.42.142.151:4000/basic/contactSubmit", this.contactData).then((response) => {
          console.log(response);
          this.contactError = false;
          this.contactEmailError = false;
          this.contactSubmitted = true;
          this.contactData.Name = "";
          this.contactData.Email = "";
          this.contactData.Phone = "";
          this.contactData.Subject = "";
          this.contactData.Message = "";
        }).catch((error) => {
          if (error.response) {
            this.contactError = true;
            this.errorMessage = error.response.data.message;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
            this.contactError = true;
            this.errorMessage = error.request;
          } else {
            console.log("Error", error.message);
            this.contactError = true;
            this.errorMessage = error.message;
          }
        });
      } else {
        this.contactEmailError = true;
      }
    },
    validateEmail(data) {
      console.log(data);
      const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data);
      return result;
    }
  }
};
function _sfc_ssrRender$L(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "contact-area pt-120 pb-90" }, _attrs))}><div class="container"><div class="row"><div class="col-xl-8 col-lg-7 col-md-12"><div class="contact-area-wrapper"><div class="section-title mb-50"><h2>Get in Touch</h2></div><div class="contact-form"><form><div class="row"><div class="col-xl-6"><div class="contact-from-input mb-20"><input${serverRenderer.exports.ssrRenderAttr("value", $data.contactData.Name)} type="text" placeholder="Name"></div></div><div class="col-xl-6"><div class="contact-from-input mb-20"><input${serverRenderer.exports.ssrRenderAttr("value", $data.contactData.Phone)} type="text" placeholder="Phone"></div></div><div class="col-xl-6"><div class="contact-from-input mb-20"><input${serverRenderer.exports.ssrRenderAttr("value", $data.contactData.Email)} type="text" placeholder="Email"></div></div><div class="col-xl-6"><div class="contact-select"><select class="mb-20"><option value="" disabled selected>Subject</option><option value="Query">Query</option><option value="Event Inquiry">Event Inquiry</option></select></div></div><div class="col-xl-12"><div class="contact-from-input mb-20"><textarea placeholder="Message" name="message">${serverRenderer.exports.ssrInterpolate($data.contactData.Message)}</textarea></div></div>`);
  if ($data.contactError) {
    _push(`<div class="my-20 text-center"><p class="text-md text-danger">${serverRenderer.exports.ssrInterpolate($data.errorMessage)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.contactSubmitted) {
    _push(`<div class="my-20 text-center"><p class="text-md text-success">Thank you for contacting us. We will get back to you shortly regarding your request.</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.contactEmailError) {
    _push(`<div class="my-20 text-center"><p class="text-md text-danger">Please Enter Valid Email</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="colxl-2"><div class="cont-btn mb-20"><button type="submit" class="cont-btn">Submit</button></div></div></div></form></div></div><div class="row"><div class="col-12"><div class="google-map-area contact-map pt-100 mb-30"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25617.295747478598!2d-73.69385403215021!3d40.752382720949164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1646544470201!5m2!1sen!2sbd"></iframe></div></div></div></div><div class="col-xl-4 col-lg-5 col-md-8"><div class="sidebar-widget-wrapper"><div class="support-contact mb-30"><div class="support-tittle"><h4>Support Contact</h4></div><div class="support-contact-inner"><div class="support-item"><div class="support-icon"><svg id="Layer_6" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" width="21.375" height="21.375" viewBox="0 0 21.375 21.375"><path id="Path_8" data-name="Path 8" d="M1.688,16.386c.038-.031,4.3-3.085,5.463-2.885.556.1.875.477,1.513,1.238.1.123.35.415.541.624a8.877,8.877,0,0,0,1.176-.479,9.761,9.761,0,0,0,4.5-4.5A8.876,8.876,0,0,0,15.363,9.2c-.209-.192-.5-.439-.628-.544-.756-.634-1.135-.953-1.233-1.51C13.3,6,16.354,1.725,16.386,1.687A1.631,1.631,0,0,1,17.6,1c1.238,0,4.774,4.586,4.774,5.359,0,.045-.065,4.608-5.691,10.331C10.966,22.31,6.4,22.375,6.359,22.375,5.586,22.375,1,18.84,1,17.6A1.629,1.629,0,0,1,1.688,16.386Zm4.75,4.56c.623-.051,4.452-.556,9.239-5.26,4.727-4.813,5.22-8.653,5.269-9.248a19.276,19.276,0,0,0-3.353-3.962c-.028.029-.066.071-.115.127a25.216,25.216,0,0,0-2.546,4.32,8.469,8.469,0,0,0,.724.649,7.149,7.149,0,0,1,1.077,1.013l.173.242-.051.293A8.135,8.135,0,0,1,16.166,11,11.193,11.193,0,0,1,11,16.166a8.115,8.115,0,0,1-1.882.688l-.293.051-.242-.173A7.209,7.209,0,0,1,7.568,15.65c-.223-.266-.522-.622-.634-.722A25.054,25.054,0,0,0,2.6,17.477c-.059.05-.1.088-.128.113a19.259,19.259,0,0,0,3.962,3.354Z" transform="translate(-1 -1)" fill="#2467ec"></path></svg></div><div class="support-info-phone"><span>Phone</span><p>Mobile :<a href="tel:(+88)872-670-780"> (+88) 872-670-780</a></p><p>Hotline :<a href="tel:(+88)422-655-793"> (+88) 422-655-793</a></p></div></div><div class="support-item"><div class="support-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22.57" height="16.271" viewBox="0 0 22.57 16.271"><g id="email_3_" data-name="email (3)" transform="translate(-1.25 -4.25)"><path id="Path_10" data-name="Path 10" d="M20.933,20.521H4.137A2.9,2.9,0,0,1,1.25,17.634V7.137A2.9,2.9,0,0,1,4.137,4.25h16.8A2.9,2.9,0,0,1,23.82,7.137v10.5A2.9,2.9,0,0,1,20.933,20.521Zm-16.8-14.7A1.312,1.312,0,0,0,2.825,7.137v10.5a1.312,1.312,0,0,0,1.312,1.312h16.8a1.312,1.312,0,0,0,1.312-1.312V7.137a1.312,1.312,0,0,0-1.312-1.312Z" transform="translate(0 0)" fill="#2467ec"></path><path id="Path_11" data-name="Path 11" d="M12.534,13.7a3.412,3.412,0,0,1-1.732-.472L1.638,7.778a.8.8,0,0,1-.283-1.05A.777.777,0,0,1,2.4,6.455l9.175,5.438a1.774,1.774,0,0,0,1.848,0L22.6,6.455a.777.777,0,0,1,1.05.273.8.8,0,0,1-.283,1.05l-9.1,5.448a3.412,3.412,0,0,1-1.732.472Z" transform="translate(0.001 0.105)" fill="#2467ec"></path></g></svg></div><div class="support-info-email"><span>Email</span><a href="mailto:Info@example.com">Info@example.com</a><a href="mailto:Contact@example.com">Contact@example.com</a></div></div><div class="support-item"><div class="support-icon"><svg xmlns="http://www.w3.org/2000/svg" width="17.41" height="21.729" viewBox="0 0 17.41 21.729"><g id="pin" transform="translate(-50.885)"><g id="Group_2184" data-name="Group 2184" transform="translate(55.556 4.671)"><g id="Group_2183" data-name="Group 2183"><path id="Path_3602" data-name="Path 3602" d="M164.981,110.062a4.034,4.034,0,1,0,4.034,4.034A4.039,4.039,0,0,0,164.981,110.062Zm0,6.369a2.335,2.335,0,1,1,2.335-2.335A2.338,2.338,0,0,1,164.981,116.431Z" transform="translate(-160.947 -110.062)" fill="#2467ec"></path></g></g><g id="Group_2186" data-name="Group 2186" transform="translate(50.885)"><g id="Group_2185" data-name="Group 2185"><path id="Path_3603" data-name="Path 3603" d="M59.59,0a8.715,8.715,0,0,0-8.7,8.7v.241c0,2.428,1.392,5.256,4.137,8.408A35.783,35.783,0,0,0,59.056,21.3l.534.431.534-.431a35.775,35.775,0,0,0,4.035-3.944c2.745-3.151,4.137-5.98,4.137-8.408V8.705A8.715,8.715,0,0,0,59.59,0ZM66.6,8.946c0,4.1-5.286,9.068-7.006,10.576-1.721-1.508-7.006-6.474-7.006-10.576V8.705a7.006,7.006,0,0,1,14.013,0Z" transform="translate(-50.885)" fill="#2467ec"></path></g></g></g></svg></div><div class="support-info-location"><span>Location</span><a href="#">Abbot Kinney Blvd. New York, <br> USA-5785</a></div></div></div></div></div></div></div></div></div>`);
}
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contact/ContactFormSection.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const __nuxt_component_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["ssrRender", _sfc_ssrRender$L]]);
const _sfc_main$P = {
  name: "app",
  components: {
    FooterOne,
    PageTitle,
    ContactFormSection: __nuxt_component_0$8,
    HeaderFour
  },
  data() {
    return {
      loggedIn: false,
      loaded: false
    };
  },
  mounted() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
    }
    this.loaded = true;
  }
};
function _sfc_ssrRender$K(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_ContactFormSection = __nuxt_component_0$8;
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, { isLoggedIn: $data.loggedIn }, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
      pageTitle: "Contact",
      pageSubTitle: "Contact"
    }, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_ContactFormSection, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contact/ContactMain.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const __nuxt_component_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["ssrRender", _sfc_ssrRender$K]]);
const meta$c = void 0;
const _sfc_main$O = {
  name: "EditEvent",
  props: {
    eventId: {
      type: String,
      default: ""
    }
  },
  components: {
    FooterOne,
    PageTitle,
    HeaderFour
  },
  data() {
    return {
      EventData: {
        Name: "",
        Sport: "",
        Category: "",
        startDate: "",
        endDate: "",
        Description: "",
        createdById: "",
        createdByFName: "",
        createdByLName: "",
        Address: "",
        Landmark: "",
        Prize1: null,
        Prize2: null,
        Prize3: null,
        consolationPrize: null,
        Time: "",
        Location: "",
        Rules: "",
        entryFee: "",
        Organiser1Name: "",
        Organiser1Phone: "",
        Organiser2Name: "",
        Organiser2Phone: "",
        createdById: "",
        createdByFName: "",
        createdByLName: "",
        approvalStatus: "Pending",
        Featured: "No"
      },
      EventError: false,
      EventSuccess: false,
      errorMessage: "",
      addEventId: "",
      isAdmin: "",
      loaded: false
    };
  },
  methods: {
    async getEventDetails() {
      await axios.get("http://143.42.142.151:4000/events/getEventById", {
        params: { Id: this.eventId }
      }).then((res) => {
        console.log(res);
        this.EventData.Name = res.data.Name;
        this.EventData.Sport = res.data.Sport;
        this.EventData.Category = res.data.Category;
        this.EventData.startDate = res.data.startDate;
        this.EventData.endDate = res.data.endDate;
        this.EventData.Description = res.data.Description;
        this.EventData.createdById = res.data.createdById;
        this.EventData.createdByFName = res.data.createdByFName;
        this.EventData.createdByLName = res.data.createdByLName;
        this.EventData.Address = res.data.Address;
        this.EventData.Landmark = res.data.Landmark;
        this.EventData.Prize1 = res.data.Prize1;
        this.EventData.Prize2 = res.data.Prize2;
        this.EventData.Prize3 = res.data.Prize3;
        this.EventData.consolationPrize = res.data.consolationPrize;
        this.EventData.Time = res.data.Time;
        this.EventData.Location = res.data.Location;
        this.EventData.Rules = res.data.Rules;
        this.EventData.entryFee = res.data.entryFee;
        this.EventData.Organiser1Name = res.data.Organiser1Name;
        this.EventData.Organiser1Phone = res.data.Organiser1Phone;
        this.EventData.Organiser2Name = res.data.Organiser2Name;
        this.EventData.Organiser2Phone = res.data.Organiser2Phone;
        this.EventData.createdById = res.data.createdById;
        this.EventData.createdByFName = res.data.createdByFName;
        this.EventData.createdByLName = res.data.createdByLName;
        this.loaded = true;
        if (JSON.parse(localStorage.UserData).id !== this.EventData.createdById) {
          if (this.isAdmin === false) {
            this.$router.replace("/dashboard");
          }
        }
      }).catch((error) => {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
      this.loaded = true;
    },
    async editEvent() {
      await axios.post("http://143.42.142.151:4000/events/updateEvent", {
        params: { Id: this.eventId, query: this.EventData }
      }).then((response) => {
        console.log(response);
        this.EventSuccess = true;
      }).catch((error) => {
        if (error.response) {
          this.EventError = true;
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
          this.EventError = true;
          this.errorMessage = error.request;
        } else {
          console.log("Error", error.message);
          this.EventError = true;
          this.errorMessage = error.message;
        }
      });
    }
  },
  beforeMount() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
      if (JSON.parse(localStorage.UserData).Status === "Admin") {
        this.isAdmin = true;
      }
    }
    this.getEventDetails();
  }
};
function _sfc_ssrRender$J(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-18af0550>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
      pageTitle: "Edit Event",
      pageSubTitle: "Edit Event"
    }, null, _parent));
    _push(`<div class="container" data-v-18af0550><div class="sign-up-wrapper" data-v-18af0550><div class="signup-box text-center" data-v-18af0550><div class="signup-text" data-v-18af0550><h3 data-v-18af0550>Edit Event</h3></div><div class="signup-message" data-v-18af0550><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$8)} alt="image not found" data-v-18af0550></div><div class="signup-thumb" data-v-18af0550><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$8)} alt="image not found" data-v-18af0550></div></div><form class="signup-form-wrapper" data-v-18af0550><div class="mt-10 mb-20" data-v-18af0550><h3 data-v-18af0550>Event details</h3></div><div class="signup-wrapper" data-v-18af0550><label data-v-18af0550>Event Name*</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Name)} type="text" class="form-field" placeholder="Event Name" data-v-18af0550></div><div class="signup-wrapper" data-v-18af0550><label data-v-18af0550>Sport*</label><select class="form-field" required data-v-18af0550><option value="" disabled selected data-v-18af0550>Select Sport *</option><option value="Cricket" data-v-18af0550>Cricket</option><option value="Football" data-v-18af0550>Football</option><option value="Basketball" data-v-18af0550>Basketball</option><option value="Hockey" data-v-18af0550>Hockey</option><option value="Badminton" data-v-18af0550>Badminton</option><option value="Other" data-v-18af0550>Other</option></select></div><div class="signup-wrapper" data-v-18af0550><label data-v-18af0550>Category*</label><select class="form-field" required data-v-18af0550><option value="" disabled selected data-v-18af0550>Category *</option><option value="Indoor" data-v-18af0550>Indoor</option><option value="Outdoor" data-v-18af0550>Outdoor</option><option value="Other" data-v-18af0550>Other</option></select></div><div class="signup-wrapper" data-v-18af0550><label for="fromDate" data-v-18af0550>From *</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.startDate)} type="Date" name="fromDate" data-v-18af0550></div><div class="signup-wrapper" data-v-18af0550><label for="toDate" data-v-18af0550>To *</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.endDate)} type="Date" name="toDate" data-v-18af0550></div><div class="signup-wrapper" data-v-18af0550><label for="time" data-v-18af0550>Time of Event *</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Time)} type="time" class="form-field" name="time" placeholder="Event Time" data-v-18af0550></div><div class="signup-wrapper mb-20" data-v-18af0550><label data-v-18af0550>Event Description*</label><textarea class="form-textarea" rows="3" placeholder="Event Description" data-v-18af0550>${serverRenderer.exports.ssrInterpolate($data.EventData.Description)}</textarea></div><div class="signup-wrapper mb-20" data-v-18af0550><label data-v-18af0550>First Prize*</label><textarea class="form-textarea" rows="1" placeholder="First Prize (optional)" data-v-18af0550>${serverRenderer.exports.ssrInterpolate($data.EventData.Prize1)}</textarea></div><div class="signup-wrapper mb-20" data-v-18af0550><label data-v-18af0550>Second Prize*</label><textarea class="form-textarea" rows="1" placeholder="Second Prize (optional)" data-v-18af0550>${serverRenderer.exports.ssrInterpolate($data.EventData.Prize2)}</textarea></div><div class="signup-wrapper mb-20" data-v-18af0550><label data-v-18af0550>Third Prize*</label><textarea class="form-textarea" rows="1" placeholder="Third Prize (optional)" data-v-18af0550>${serverRenderer.exports.ssrInterpolate($data.EventData.Prize3)}</textarea></div><div class="signup-wrapper mb-20" data-v-18af0550><label data-v-18af0550>Consolation Prize*</label><textarea class="form-textarea" rows="1" placeholder="Consolation Prize (optional)" data-v-18af0550>${serverRenderer.exports.ssrInterpolate($data.EventData.consolationPrize)}</textarea></div><div class="signup-wrapper mb-20" data-v-18af0550><label data-v-18af0550>Event Address*</label><textarea class="form-textarea" rows="2" placeholder="Event Address" data-v-18af0550>${serverRenderer.exports.ssrInterpolate($data.EventData.Address)}</textarea></div><div class="signup-wrapper mb-20" data-v-18af0550><label data-v-18af0550>Nearest Landmark*</label><textarea class="form-textarea" rows="1" placeholder="Nearby Landmark" data-v-18af0550>${serverRenderer.exports.ssrInterpolate($data.EventData.Landmark)}</textarea></div><div class="signup-wrapper" data-v-18af0550><label data-v-18af0550>State*</label><select class="form-field" data-v-18af0550><option value="" disabled selected data-v-18af0550>Select State *</option><option value="Delhi" data-v-18af0550>Delhi</option><option value="Haryana" data-v-18af0550>Haryana</option><option value="UP" data-v-18af0550>UP</option><option value="Gujarat" data-v-18af0550>Gujarat</option><option value="Rajasthan" data-v-18af0550>Rajasthan</option><option value="Maharashtra" data-v-18af0550>Maharashtra</option></select></div><div class="signup-wrapper mb-20" data-v-18af0550><label data-v-18af0550>Event Rules*</label><textarea class="form-textarea" rows="3" placeholder="Event Rules and Regulations" data-v-18af0550>${serverRenderer.exports.ssrInterpolate($data.EventData.Rules)}</textarea></div><div class="signup-wrapper" data-v-18af0550><label data-v-18af0550>Event Entry Fees*</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.entryFee)} type="number" class="form-field" placeholder="Event Entry Fees" data-v-18af0550></div><div class="mt-10 mb-10" data-v-18af0550><h3 data-v-18af0550>Organiser details</h3></div><div class="signup-wrapper" data-v-18af0550><label data-v-18af0550>First Event Organiser*</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Organiser1Name)} type="text" class="form-field" placeholder="First Organiser Name" data-v-18af0550></div><div class="signup-wrapper" data-v-18af0550><label data-v-18af0550>First Organiser Phone*</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Organiser1Phone)} type="tel" pattern="[6789][0-9]{9}" placeholder="First Organiser Number" data-v-18af0550></div><div class="signup-wrapper" data-v-18af0550><label data-v-18af0550>Second Event Organiser*</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Organiser2Name)} type="text" class="form-field" placeholder="Second Organiser Name" data-v-18af0550></div><div class="signup-wrapper" data-v-18af0550><label data-v-18af0550>Second Organiser Phone*</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.EventData.Organiser2Phone)} type="tel" pattern="[6789][0-9]{9}" placeholder="Second Organiser Number" data-v-18af0550></div>`);
    if ($data.EventError) {
      _push(`<div class="my-20 text-center" data-v-18af0550><p class="text-md text-danger" data-v-18af0550>${serverRenderer.exports.ssrInterpolate($data.errorMessage)}</p></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($data.EventSuccess) {
      _push(`<div class="m-4 w-full" data-v-18af0550><div class="alert alert-success" role="alert" data-v-18af0550> Your event is editted succesfully. We will notify you of any change in status through email.<br data-v-18af0550><span class="mt-4 d-block" data-v-18af0550>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "text-primary link-hover",
        to: `/event-details/${$props.eventId}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View Details`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("View Details")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="sing-buttom mb-20" data-v-18af0550><button type="submit" class="sing-btn w-100" data-v-18af0550>Save Event</button></div></form></div></div>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))} data-v-18af0550><div class="d-flex justify-content-center align-items-center" data-v-18af0550><div class="spinner-grow text-warning" role="status" data-v-18af0550><span class="sr-only" data-v-18af0550>Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AddEvent/EditEvent.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const EditEvent = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["ssrRender", _sfc_ssrRender$J], ["__scopeId", "data-v-18af0550"]]);
const meta$b = void 0;
const _imports_0$7 = publicAssetsURL(`img/course/course-meta.png`);
const _sfc_main$N = {
  name: "app",
  props: {
    eventId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loggedIn: false,
      eventData: "",
      loaded: false,
      selfUpload: false,
      isAdmin: false,
      isApproved: false,
      isFeatured: false,
      status: ""
    };
  },
  components: {
    FooterOne,
    PageTitle,
    HeaderFour
  },
  beforeMount() {
    this.getEventDetails();
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
      if (JSON.parse(localStorage.UserData).Status === "Admin") {
        this.isAdmin = true;
      }
    }
  },
  methods: {
    async getEventDetails() {
      await axios.get("http://143.42.142.151:4000/events/getEventById", {
        params: { Id: this.eventId }
      }).then((res) => {
        console.log(res);
        this.eventData = res.data;
        if (JSON.parse(localStorage.UserData).id === this.eventData.createdById) {
          this.selfUpload = true;
        }
        if (this.eventData.approvalStatus === "Approved") {
          this.isApproved = true;
        }
        if (this.eventData.Featured === "Yes") {
          this.isFeatured = true;
        }
        const currentDate = new Date();
        var eventStartDate = new Date(this.eventData.startDate);
        var eventEndDate = new Date(this.eventData.endDate);
        if (eventEndDate < currentDate) {
          this.status = "Expired";
        } else if (eventStartDate <= currentDate && currentDate < eventEndDate) {
          this.status = "In Progress";
        } else {
          this.status = "Upcoming Soon";
        }
      }).catch((error) => {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
      this.loaded = true;
    },
    async approveEvent() {
      await axios.post("http://143.42.142.151:4000/events/updateEvent", {
        params: { Id: this.eventId, query: { approvalStatus: "Approved" } }
      }).then((res) => {
        console.log(res);
        this.$router.go();
      }).catch((error) => {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
    },
    async disapproveEvent() {
      await axios.post("http://143.42.142.151:4000/events/updateEvent", {
        params: { Id: this.eventId, query: { approvalStatus: "Disapproved" } }
      }).then((res) => {
        console.log(res);
        this.removeFeatured();
      }).catch((error) => {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
    },
    async removeFeatured() {
      await axios.post("http://143.42.142.151:4000/events/updateEvent", {
        params: { Id: this.eventId, query: { Featured: "No" } }
      }).then((res) => {
        console.log(res);
        this.$router.go();
      }).catch((error) => {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
    },
    async setFeatured() {
      await axios.post("http://143.42.142.151:4000/events/updateEvent", {
        params: { Id: this.eventId, query: { Featured: "Yes" } }
      }).then((res) => {
        console.log(res);
        this.$router.go();
      }).catch((error) => {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
    },
    getDateFormat(dateValue) {
      var dateObj = new Date(dateValue);
      var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      return formattedDate;
    }
  }
};
function _sfc_ssrRender$I(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-2822f374>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
      pageTitle: "Event Details",
      pageSubTitle: "Event Details"
    }, null, _parent));
    _push(`<div class="event-detalis-area pt-120 pb-90" data-v-2822f374><div class="container" data-v-2822f374><div class="row" data-v-2822f374><div class="col-xl-8 col-lg-12" data-v-2822f374><div class="event-main-wrapper mb-30" data-v-2822f374><div class="row course-detelis-meta mb-30" data-v-2822f374><div class="course-meta-wrapper border-line-meta col" data-v-2822f374><div class="course-meta-img" data-v-2822f374>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "javascript:void(0)" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$7)} alt="course-meta" data-v-2822f374${_scopeId}>`);
        } else {
          return [
            vue_cjs_prod.createVNode("img", {
              src: _imports_0$7,
              alt: "course-meta"
            })
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div><div class="course-meta-text" data-v-2822f374><span data-v-2822f374>Hosted by</span><h6 data-v-2822f374>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "javascript:void(0)" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${serverRenderer.exports.ssrInterpolate($data.eventData.createdByFName)} ${serverRenderer.exports.ssrInterpolate($data.eventData.createdByLName)}`);
        } else {
          return [
            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($data.eventData.createdByFName) + " " + vue_cjs_prod.toDisplayString($data.eventData.createdByLName), 1)
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</h6></div></div><div class="course-Enroll border-line-meta col" data-v-2822f374><p class="text-center" data-v-2822f374>Sport</p><span class="text-center" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Sport)}</span></div><div class="course-update border-line-meta col" data-v-2822f374><p class="text-center" data-v-2822f374>State</p><span class="text-center" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Location)}</span></div><div class="course-category col" data-v-2822f374><p class="text-center" data-v-2822f374>Category</p><span class="text-center" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Category)}</span></div></div><div class="event-contact-info" data-v-2822f374><h2 data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Name)}</h2></div><div class="event-introduction" data-v-2822f374><div class="introduction-info mb-40" data-v-2822f374><h4 data-v-2822f374>Description</h4><p data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Description)}</p></div></div><div class="mb-40" data-v-2822f374><div class="even-point-tittle" data-v-2822f374><h4 data-v-2822f374>Prizes</h4></div><div class="event-point-info" data-v-2822f374><ul data-v-2822f374><li data-v-2822f374><span class="inr-font" data-v-2822f374>First Prize : <span class="text-black" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Prize1)}</span></span></li><li data-v-2822f374><span class="inr-font" data-v-2822f374>Second Prize : <span class="text-black" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Prize2)}</span></span></li><li data-v-2822f374><span class="inr-font" data-v-2822f374>Third Prize : <span class="text-black" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Prize3)}</span></span></li><li data-v-2822f374><span class="inr-font" data-v-2822f374>Consolation Prize : <span class="text-black" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.consolationPrize)}</span></span></li></ul></div></div><div class="mb-40" data-v-2822f374><div class="even-point-tittle" data-v-2822f374><h4 data-v-2822f374>Rules and Restrictions</h4></div><div class="event-point-info" data-v-2822f374><p data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Rules)}</p></div></div><div class="google-map-area event-map pt-45" data-v-2822f374><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25621.6685132309!2d-73.76450733964063!3d40.741031946556575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1646544624845!5m2!1sen!2sbd" data-v-2822f374></iframe></div></div></div><div class="col-xl-4 col-lg-8 col-md-8" data-v-2822f374><div class="sidebar-widget-wrapper" data-v-2822f374><div class="event-speaker-wrapper mb-30 theme-blue" data-v-2822f374><div class="event-speaker-info" data-v-2822f374><h4 class="text-white" data-v-2822f374>Organisers</h4></div><div class="event-organiser-content mb-10 text-center" data-v-2822f374><span data-v-2822f374><a href="#" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Organiser1Name)}</a></span><p data-v-2822f374><a href="#" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Organiser1Phone)}</a></p></div><div class="event-organiser-content text-center" data-v-2822f374><span data-v-2822f374><a href="#" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Organiser2Name)}</a></span><p data-v-2822f374><a href="#" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Organiser2Phone)}</a></p></div></div><div class="event-information-wrapper mb-30" data-v-2822f374><div class="event-price-info" data-v-2822f374><div class="event-ticket-cost" data-v-2822f374><span data-v-2822f374>Entry Fees:</span></div><div class="event-price" data-v-2822f374><p class="inr-font mr-10" data-v-2822f374>INR</p><span data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.entryFee)}</span></div></div><div class="event-information-list" data-v-2822f374><ul data-v-2822f374><li data-v-2822f374><div class="information-list" data-v-2822f374><i class="flaticon-bookmark-white" data-v-2822f374></i><span data-v-2822f374>Sport</span></div><div class="information-list" data-v-2822f374><span data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Sport)}</span></div></li><li data-v-2822f374><div class="information-list" data-v-2822f374><i class="flaticon-calendar" data-v-2822f374></i><span data-v-2822f374>Start Date</span></div><div class="information-list" data-v-2822f374><span data-v-2822f374>${serverRenderer.exports.ssrInterpolate($options.getDateFormat($data.eventData.startDate))}</span></div></li><li data-v-2822f374><div class="information-list" data-v-2822f374><i class="flaticon-calendar" data-v-2822f374></i><span data-v-2822f374>End Date</span></div><div class="information-list" data-v-2822f374><span data-v-2822f374>${serverRenderer.exports.ssrInterpolate($options.getDateFormat($data.eventData.endDate))}</span></div></li><li data-v-2822f374><div class="information-list" data-v-2822f374><i class="flaticon-clock" data-v-2822f374></i><span data-v-2822f374>Schedule</span></div><div class="information-list" data-v-2822f374><span data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Time)}</span></div></li><li data-v-2822f374><div class="information-list" data-v-2822f374><i class="flaticon-place" data-v-2822f374></i><span data-v-2822f374>Location</span></div><div class="information-list" data-v-2822f374><span data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Address)}</span></div></li><li data-v-2822f374><div class="information-list" data-v-2822f374><i class="flaticon-menu-2" data-v-2822f374></i><span data-v-2822f374>Category</span></div><div class="information-list" data-v-2822f374><span data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Category)}</span></div></li><li data-v-2822f374><div class="information-list" data-v-2822f374><i class="flaticon-global" data-v-2822f374></i><span data-v-2822f374>Landmark</span></div><div class="information-list" data-v-2822f374><span data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.Landmark)}</span></div></li></ul></div>`);
    if ($data.status === "Expired") {
      _push(`<div data-v-2822f374><h4 class="text-danger border-top border-secondary pt-10 mt-10" data-v-2822f374><span class="text-black font-bold" data-v-2822f374>Status : </span>${serverRenderer.exports.ssrInterpolate($data.status)}</h4></div>`);
    } else {
      _push(`<div data-v-2822f374>`);
      if ($data.status === "Upcoming Soon") {
        _push(`<h4 class="text-success text-center border-top border-bottom border-secondary pt-10 pb-10 mt-10" data-v-2822f374><span class="text-black font-bold" data-v-2822f374>Status : </span>${serverRenderer.exports.ssrInterpolate($data.status)}</h4>`);
      } else {
        _push(`<h4 class="text-warning border-top border-secondary pt-10 mt-10" data-v-2822f374><span class="text-black font-bold" data-v-2822f374>Status : </span>${serverRenderer.exports.ssrInterpolate($data.status)}</h4>`);
      }
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: `${$data.isApproved ? "event-btn border-top border-secondary mt-30" : "d-none"}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Join this Event`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Join this Event")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    }
    _push(`</div>`);
    if ($data.selfUpload) {
      _push(`<div class="event-sponsor-wrapper mb-30" data-v-2822f374><div class="sopnsor-tittle" data-v-2822f374><h4 data-v-2822f374>Approval Status </h4>`);
      if ($data.eventData.approvalStatus === "Approved") {
        _push(`<h4 class="text-success border-top border-secondary pt-10 mt-10" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.approvalStatus)}</h4>`);
      } else if ($data.eventData.approvalStatus === "Disapproved") {
        _push(`<h4 class="text-danger border-top border-secondary pt-10 mt-10" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.approvalStatus)}</h4>`);
      } else {
        _push(`<h4 class="text-warning border-top border-secondary pt-10 mt-10" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.approvalStatus)}</h4>`);
      }
      _push(`</div><div class="sponsor-thumb" data-v-2822f374>`);
      if ($data.eventData.approvalStatus === "Approved") {
        _push(`<div class="alert alert-success" role="alert" data-v-2822f374> Your event submission is approved and active. </div>`);
      } else if ($data.eventData.approvalStatus === "Disapproved") {
        _push(`<div class="alert alert-danger" role="alert" data-v-2822f374> Your event submission is Disapproved and inactive. Please contact us for more info. </div>`);
      } else {
        _push(`<div class="alert alert-warning" role="alert" data-v-2822f374> Your event submission is currently under review. We will notify you of any change in status through email. </div>`);
      }
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/edit-event/${$props.eventId}`,
        class: "btn btn-primary w-100"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Edit Event`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Edit Event")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($data.isAdmin) {
      _push(`<div class="event-sponsor-wrapper mb-30" data-v-2822f374><div class="sopnsor-tittle" data-v-2822f374><h4 data-v-2822f374>Approval Status </h4>`);
      if ($data.eventData.approvalStatus === "Approved") {
        _push(`<h4 class="text-success border-top border-secondary pt-10 mt-10" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.approvalStatus)}</h4>`);
      } else if ($data.eventData.approvalStatus === "Disapproved") {
        _push(`<h4 class="text-danger border-top border-secondary pt-10 mt-10" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.approvalStatus)}</h4>`);
      } else {
        _push(`<h4 class="text-warning border-top border-secondary pt-10 mt-10" data-v-2822f374>${serverRenderer.exports.ssrInterpolate($data.eventData.approvalStatus)}</h4>`);
      }
      _push(`</div><div class="sponsor-thumb" data-v-2822f374>`);
      if (!$data.isApproved) {
        _push(`<div class="w-100" data-v-2822f374><button type="button" class="btn btn-success w-100" data-v-2822f374>Approve</button></div>`);
      } else {
        _push(`<div class="w-100" data-v-2822f374>`);
        if ($data.isFeatured) {
          _push(`<button type="button" class="btn btn-danger w-100" data-v-2822f374>Remove from featured</button>`);
        } else {
          _push(`<button type="button" class="btn btn-primary w-100" data-v-2822f374>Set as featured</button>`);
        }
        _push(`</div>`);
      }
      _push(`<button type="button" class="btn btn-danger w-100" data-v-2822f374>Disapprove</button>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/edit-event/${$props.eventId}`,
        class: "btn btn-primary w-100"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Edit Event`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Edit Event")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></div></div></div>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))} data-v-2822f374><div class="d-flex justify-content-center align-items-center" data-v-2822f374><div class="spinner-grow text-warning" role="status" data-v-2822f374><span class="sr-only" data-v-2822f374>Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EventDetails/EventDetailsMain.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const __nuxt_component_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["ssrRender", _sfc_ssrRender$I], ["__scopeId", "data-v-2822f374"]]);
const meta$a = void 0;
const _imports_0$6 = publicAssetsURL(`img/event/event-01.png`);
const _imports_1$4 = publicAssetsURL(`img/event/event-02.png`);
const _imports_2$4 = publicAssetsURL(`img/event/event-03.png`);
const _imports_3$3 = publicAssetsURL(`img/event/event-04.png`);
const _imports_4$1 = publicAssetsURL(`img/event/event-05.png`);
const _sfc_main$M = {
  name: "UpcomingEventsDash",
  components: {
    paginate: Pagination
  },
  data() {
    return {
      searchQuery: "",
      searchDate: "",
      searchLocation: "",
      getData: "",
      loaded: false,
      pageCount: "",
      page: 1,
      size: 10
    };
  },
  mounted() {
    this.getApprovedEvent();
  },
  methods: {
    status(startDate, endDate) {
      const currentDate = new Date();
      var eventStartDate = new Date(startDate);
      var eventEndDate = new Date(endDate);
      if (eventEndDate < currentDate) {
        return "Expired";
      } else if (eventStartDate <= currentDate && currentDate < eventEndDate) {
        return "In Progress";
      } else {
        return "Upcoming Soon";
      }
    },
    clickCallback: function() {
      this.getEventData();
    },
    async getApprovedEvent() {
      var dataQuery = {
        $and: [
          { approvalStatus: "Approved" },
          { startDate: { $gt: new Date() } }
        ]
      };
      await axios.get("http://143.42.142.151:4000/events/getAllFiltered", {
        params: {
          dataQuery,
          page: this.page,
          size: this.size
        }
      }).then((res) => {
        console.log(res);
        this.getData = res.data.docs;
        this.pageCount = res.data.totalPages;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
      if (this.getData.length !== 0) {
        this.loaded = true;
      }
    },
    getDateFormat(dateValue) {
      var dateObj = new Date(dateValue);
      var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      return formattedDate;
    }
  }
};
function _sfc_ssrRender$H(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_paginate = vue_cjs_prod.resolveComponent("paginate");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "event-ara pt-120 pb-90" }, _attrs))} data-v-70e972a8><div class="container" data-v-70e972a8><div class="row" data-v-70e972a8><div class="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-12 col-sm justify-content-center mb-30" data-v-70e972a8><div class="section-title mb-20 text-center" data-v-70e972a8><h2 data-v-70e972a8>Upcoming <span class="down-mark-line" data-v-70e972a8>Events</span></h2></div></div></div>`);
  if ($data.loaded) {
    _push(`<div class="row" data-v-70e972a8><div class="col-xl-8 col-lg-7" data-v-70e972a8><!--[-->`);
    serverRenderer.exports.ssrRenderList($data.getData, (data) => {
      _push(`<div class="single-item mb-30" data-v-70e972a8><div class="event_date f-left" data-v-70e972a8><div class="event_date_inner" data-v-70e972a8><h4 data-v-70e972a8>${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.startDate))}</h4><span data-v-70e972a8>${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.endDate))}</span></div></div><div class="event_info" data-v-70e972a8><h3 data-v-70e972a8>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(data.Name)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(data.Name), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</h3><div class="event-detalis d-flex align-items-center" data-v-70e972a8><div class="event-time mr-30 d-flex align-items-center" data-v-70e972a8><i class="flaticon-clock-1" data-v-70e972a8></i><span data-v-70e972a8>${serverRenderer.exports.ssrInterpolate(data.Time)}</span></div><div class="event-location d-flex align-items-centere" data-v-70e972a8><i class="flaticon-pin" data-v-70e972a8></i><span data-v-70e972a8>${serverRenderer.exports.ssrInterpolate(data.Location)}</span></div></div><div class="event-aduence d-flex align-items-center" data-v-70e972a8><div class="aduence-thumb" data-v-70e972a8><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$6)} alt="event-thumb" data-v-70e972a8><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$4)} alt="event-thumb" data-v-70e972a8><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$4)} alt="event-thumb" data-v-70e972a8><img${serverRenderer.exports.ssrRenderAttr("src", _imports_3$3)} alt="event-thumb" data-v-70e972a8><img${serverRenderer.exports.ssrRenderAttr("src", _imports_4$1)} alt="event-thumb" data-v-70e972a8></div></div></div><div class="get-ticket-btn" data-v-70e972a8>`);
      if ($options.status(data.startDate, data.endDate) == "Upcoming Soon") {
        _push(`<h4 class="text-success text-center pt-10 pb-10 mt-10" data-v-70e972a8>${serverRenderer.exports.ssrInterpolate($options.status(data.startDate, data.endDate))}</h4>`);
      } else if ($options.status(data.startDate, data.endDate) == "In Progress") {
        _push(`<h4 class="text-warning pt-10 mt-10" data-v-70e972a8>${serverRenderer.exports.ssrInterpolate($options.status(data.startDate, data.endDate))}</h4>`);
      } else {
        _push(`<h4 class="text-danger pt-10 mt-10" data-v-70e972a8>${serverRenderer.exports.ssrInterpolate($options.status(data.startDate, data.endDate))}</h4>`);
      }
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "get-btn mt-30",
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Show Details`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Show Details")
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div></div>`);
    });
    _push(`<!--]--><div class="mt-10" data-v-70e972a8>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_paginate, {
      modelValue: $data.page,
      "onUpdate:modelValue": ($event) => $data.page = $event,
      "page-count": $data.pageCount,
      "page-range": 3,
      "margin-pages": 2,
      "click-handler": $options.clickCallback,
      "prev-text": "Prev",
      "next-text": "Next",
      "container-class": "pagination justify-content-center",
      "page-class": "page-item"
    }, null, _parent));
    _push(`</div></div><div class="col-xl-4 col-lg-5 col-md-8" data-v-70e972a8><div class="sidebar-widget-wrapper" data-v-70e972a8><div class="side-bar-widget mb-30" data-v-70e972a8><div class="event-sidebar" data-v-70e972a8><div class="find-event" data-v-70e972a8><div class="find-event-info" data-v-70e972a8><h4 data-v-70e972a8>Find Events</h4></div><div class="find-event-wrapper mb-25" data-v-70e972a8><div class="find-event-input" data-v-70e972a8><input${serverRenderer.exports.ssrRenderAttr("value", $data.searchDate)} type="date" data-v-70e972a8></div></div><div class="find-event-wrapper mb-25" data-v-70e972a8><div class="find-event-input" data-v-70e972a8><select class="find-event-select" data-v-70e972a8><option value="" selected data-v-70e972a8>All States</option><option value="Andhra Pradesh" data-v-70e972a8>Andhra Pradesh</option><option value="Andaman and Nicobar Islands" data-v-70e972a8>Andaman and Nicobar Islands</option><option value="Arunachal Pradesh" data-v-70e972a8>Arunachal Pradesh</option><option value="Assam" data-v-70e972a8>Assam</option><option value="Bihar" data-v-70e972a8>Bihar</option><option value="Chandigarh" data-v-70e972a8>Chandigarh</option><option value="Chhattisgarh" data-v-70e972a8>Chhattisgarh</option><option value="Dadar and Nagar Haveli" data-v-70e972a8>Dadar and Nagar Haveli</option><option value="Daman and Diu" data-v-70e972a8>Daman and Diu</option><option value="Delhi" data-v-70e972a8>Delhi</option><option value="Lakshadweep" data-v-70e972a8>Lakshadweep</option><option value="Puducherry" data-v-70e972a8>Puducherry</option><option value="Goa" data-v-70e972a8>Goa</option><option value="Gujarat" data-v-70e972a8>Gujarat</option><option value="Haryana" data-v-70e972a8>Haryana</option><option value="Himachal Pradesh" data-v-70e972a8>Himachal Pradesh</option><option value="Jammu and Kashmir" data-v-70e972a8>Jammu and Kashmir</option><option value="Jharkhand" data-v-70e972a8>Jharkhand</option><option value="Karnataka" data-v-70e972a8>Karnataka</option><option value="Kerala" data-v-70e972a8>Kerala</option><option value="Madhya Pradesh" data-v-70e972a8>Madhya Pradesh</option><option value="Maharashtra" data-v-70e972a8>Maharashtra</option><option value="Manipur" data-v-70e972a8>Manipur</option><option value="Meghalaya" data-v-70e972a8>Meghalaya</option><option value="Mizoram" data-v-70e972a8>Mizoram</option><option value="Nagaland" data-v-70e972a8>Nagaland</option><option value="Odisha" data-v-70e972a8>Odisha</option><option value="Punjab" data-v-70e972a8>Punjab</option><option value="Rajasthan" data-v-70e972a8>Rajasthan</option><option value="Sikkim" data-v-70e972a8>Sikkim</option><option value="Tamil Nadu" data-v-70e972a8>Tamil Nadu</option><option value="Telangana" data-v-70e972a8>Telangana</option><option value="Tripura" data-v-70e972a8>Tripura</option><option value="Uttar Pradesh" data-v-70e972a8>Uttar Pradesh</option><option value="Uttarakhand" data-v-70e972a8>Uttarakhand</option><option value="West Bengal" data-v-70e972a8>West Bengal</option></select><i class="flaticon-pin-1" data-v-70e972a8></i></div></div><div class="find-event-wrapper mb-25" data-v-70e972a8><div class="find-event-input" data-v-70e972a8><input${serverRenderer.exports.ssrRenderAttr("value", $data.searchQuery)} type="text" placeholder="Search keyword...." data-v-70e972a8><i class="flaticon-search" data-v-70e972a8></i></div></div></div><div class="zoom-btn" data-v-70e972a8>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      to: `/search/?find=${$data.searchQuery}&location=${$data.searchLocation}&date=${$data.searchDate}`,
      class: "event-btn"
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Find Event`);
        } else {
          return [
            vue_cjs_prod.createTextVNode("Find Event")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div></div></div></div></div></div>`);
  } else {
    _push(`<div class="row" data-v-70e972a8><h4 class="text-black" data-v-70e972a8>No Events Yet</h4></div>`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Event/UpcomingEvents.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const UpcomingEvents = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["ssrRender", _sfc_ssrRender$H], ["__scopeId", "data-v-70e972a8"]]);
const _sfc_main$L = {
  name: "app",
  components: {
    FooterOne,
    PageTitle,
    HeaderFour,
    UpcomingEvents
  },
  data() {
    return {
      loggedIn: false,
      loaded: false
    };
  },
  mounted() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
    }
    this.loaded = true;
  }
};
function _sfc_ssrRender$G(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_UpcomingEvents = vue_cjs_prod.resolveComponent("UpcomingEvents");
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
      pageTitle: "Upcoming Events",
      pageSubTitle: "Upcoming Events"
    }, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_UpcomingEvents, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Event/EventMain.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const __nuxt_component_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["ssrRender", _sfc_ssrRender$G]]);
const meta$9 = void 0;
const _sfc_main$K = {
  name: "ExpiredEvents",
  components: {},
  data() {
    return {
      searchQuery: "",
      searchDate: "",
      searchLocation: "",
      getData: "",
      loaded: false
    };
  },
  mounted() {
    this.getExpirededEvent();
  },
  methods: {
    async getExpirededEvent() {
      var dataQuery = {
        $and: [
          { approvalStatus: "Approved" },
          { endDate: { $lt: new Date() } }
        ]
      };
      await axios.get("http://143.42.142.151:4000/events/getAllFiltered", {
        params: dataQuery
      }).then((res) => {
        console.log(res);
        this.getData = res.data.docs;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
      if (this.getData.length !== 0) {
        this.loaded = true;
      }
    },
    getDateFormat(dateValue) {
      var dateObj = new Date(dateValue);
      var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      return formattedDate;
    }
  }
};
function _sfc_ssrRender$F(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "event-ara pt-120 pb-90" }, _attrs))} data-v-8941b96c><div class="container" data-v-8941b96c><div class="row" data-v-8941b96c><div class="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-12 col-sm justify-content-center mb-30" data-v-8941b96c><div class="section-title mb-20 text-center" data-v-8941b96c><h2 data-v-8941b96c>Expired <span class="down-mark-line" data-v-8941b96c>Events</span></h2></div></div></div>`);
  if ($data.loaded) {
    _push(`<div class="row" data-v-8941b96c><div class="col-xl-8 col-lg-7" data-v-8941b96c><!--[-->`);
    serverRenderer.exports.ssrRenderList($data.getData, (data) => {
      _push(`<div class="single-item mb-30" data-v-8941b96c><div class="event_date f-left" data-v-8941b96c><div class="event_date_inner" data-v-8941b96c><h4 data-v-8941b96c>${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.startDate))}</h4><span data-v-8941b96c>${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.endDate))}</span></div></div><div class="event_info" data-v-8941b96c><h3 data-v-8941b96c>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(data.Name)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(data.Name), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</h3><div class="event-detalis d-flex align-items-center" data-v-8941b96c><div class="event-time mr-30 d-flex align-items-center" data-v-8941b96c><i class="flaticon-clock-1" data-v-8941b96c></i><span data-v-8941b96c>${serverRenderer.exports.ssrInterpolate(data.Time)}</span></div><div class="event-location d-flex align-items-centere" data-v-8941b96c><i class="flaticon-pin" data-v-8941b96c></i><span data-v-8941b96c>${serverRenderer.exports.ssrInterpolate(data.Location)}</span></div></div><div class="event-aduence d-flex align-items-center" data-v-8941b96c><div class="aduence-thumb" data-v-8941b96c><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$6)} alt="event-thumb" data-v-8941b96c><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$4)} alt="event-thumb" data-v-8941b96c><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$4)} alt="event-thumb" data-v-8941b96c><img${serverRenderer.exports.ssrRenderAttr("src", _imports_3$3)} alt="event-thumb" data-v-8941b96c><img${serverRenderer.exports.ssrRenderAttr("src", _imports_4$1)} alt="event-thumb" data-v-8941b96c></div></div></div><div class="get-ticket-btn" data-v-8941b96c>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "get-btn",
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Show Details`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Show Details")
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div></div>`);
    });
    _push(`<!--]--></div><div class="col-xl-4 col-lg-5 col-md-8" data-v-8941b96c><div class="sidebar-widget-wrapper" data-v-8941b96c><div class="side-bar-widget mb-30" data-v-8941b96c><div class="event-sidebar" data-v-8941b96c><div class="find-event" data-v-8941b96c><div class="find-event-info" data-v-8941b96c><h4 data-v-8941b96c>Find Events</h4></div><div class="find-event-wrapper mb-25" data-v-8941b96c><div class="find-event-input" data-v-8941b96c><input${serverRenderer.exports.ssrRenderAttr("value", $data.searchDate)} type="date" data-v-8941b96c><i class="flaticon-calendar" data-v-8941b96c></i></div></div><div class="find-event-wrapper mb-25" data-v-8941b96c><div class="find-event-input" data-v-8941b96c><select class="find-event-select" data-v-8941b96c><option value="" disabled selected data-v-8941b96c>Select State *</option><option value="Andhra Pradesh" data-v-8941b96c>Andhra Pradesh</option><option value="Andaman and Nicobar Islands" data-v-8941b96c>Andaman and Nicobar Islands</option><option value="Arunachal Pradesh" data-v-8941b96c>Arunachal Pradesh</option><option value="Assam" data-v-8941b96c>Assam</option><option value="Bihar" data-v-8941b96c>Bihar</option><option value="Chandigarh" data-v-8941b96c>Chandigarh</option><option value="Chhattisgarh" data-v-8941b96c>Chhattisgarh</option><option value="Dadar and Nagar Haveli" data-v-8941b96c>Dadar and Nagar Haveli</option><option value="Daman and Diu" data-v-8941b96c>Daman and Diu</option><option value="Delhi" data-v-8941b96c>Delhi</option><option value="Lakshadweep" data-v-8941b96c>Lakshadweep</option><option value="Puducherry" data-v-8941b96c>Puducherry</option><option value="Goa" data-v-8941b96c>Goa</option><option value="Gujarat" data-v-8941b96c>Gujarat</option><option value="Haryana" data-v-8941b96c>Haryana</option><option value="Himachal Pradesh" data-v-8941b96c>Himachal Pradesh</option><option value="Jammu and Kashmir" data-v-8941b96c>Jammu and Kashmir</option><option value="Jharkhand" data-v-8941b96c>Jharkhand</option><option value="Karnataka" data-v-8941b96c>Karnataka</option><option value="Kerala" data-v-8941b96c>Kerala</option><option value="Madhya Pradesh" data-v-8941b96c>Madhya Pradesh</option><option value="Maharashtra" data-v-8941b96c>Maharashtra</option><option value="Manipur" data-v-8941b96c>Manipur</option><option value="Meghalaya" data-v-8941b96c>Meghalaya</option><option value="Mizoram" data-v-8941b96c>Mizoram</option><option value="Nagaland" data-v-8941b96c>Nagaland</option><option value="Odisha" data-v-8941b96c>Odisha</option><option value="Punjab" data-v-8941b96c>Punjab</option><option value="Rajasthan" data-v-8941b96c>Rajasthan</option><option value="Sikkim" data-v-8941b96c>Sikkim</option><option value="Tamil Nadu" data-v-8941b96c>Tamil Nadu</option><option value="Telangana" data-v-8941b96c>Telangana</option><option value="Tripura" data-v-8941b96c>Tripura</option><option value="Uttar Pradesh" data-v-8941b96c>Uttar Pradesh</option><option value="Uttarakhand" data-v-8941b96c>Uttarakhand</option><option value="West Bengal" data-v-8941b96c>West Bengal</option></select><i class="flaticon-pin-1" data-v-8941b96c></i></div></div><div class="find-event-wrapper mb-25" data-v-8941b96c><div class="find-event-input" data-v-8941b96c><input${serverRenderer.exports.ssrRenderAttr("value", $data.searchQuery)} type="text" placeholder="Search keyword...." data-v-8941b96c><i class="flaticon-search" data-v-8941b96c></i></div></div></div><div class="zoom-btn" data-v-8941b96c>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      to: `/search/?find=${$data.searchQuery}&location=${$data.searchLocation}&date=${$data.searchDate}`,
      class: "event-btn"
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Find Event`);
        } else {
          return [
            vue_cjs_prod.createTextVNode("Find Event")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div></div></div></div></div></div>`);
  } else {
    _push(`<div class="row" data-v-8941b96c><h4 class="text-black" data-v-8941b96c>No Expired Events</h4></div>`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Event/ExpiredEvents.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const ExpiredEvents = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["ssrRender", _sfc_ssrRender$F], ["__scopeId", "data-v-8941b96c"]]);
const _sfc_main$J = {
  name: "app",
  components: {
    FooterOne,
    PageTitle,
    HeaderFour,
    ExpiredEvents
  },
  data() {
    return {
      loggedIn: false,
      loaded: false
    };
  },
  mounted() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
    }
    this.loaded = true;
  }
};
function _sfc_ssrRender$E(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_ExpiredEvents = vue_cjs_prod.resolveComponent("ExpiredEvents");
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
      pageTitle: "Expired Events",
      pageSubTitle: "Expired Events"
    }, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_ExpiredEvents, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Event/ExpiredEventMain.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const ExpiredEventMain = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["ssrRender", _sfc_ssrRender$E]]);
const meta$8 = void 0;
const _imports_0$5 = publicAssetsURL(`img/shape/shape-03.png`);
const _imports_1$3 = publicAssetsURL(`img/shape/shape-01.png`);
const _imports_2$3 = publicAssetsURL(`img/shape/shape-02.png`);
const _imports_3$2 = publicAssetsURL(`img/shape/slider-shape-6.png`);
const _imports_4 = publicAssetsURL(`img/shape/shape-04.png`);
const _imports_5 = publicAssetsURL(`img/shape/slider-card-1.png`);
const _imports_6 = publicAssetsURL(`img/shape/slider-card-2.png`);
const _imports_7 = publicAssetsURL(`img/shape/slider-card-3.png`);
const _imports_8 = publicAssetsURL(`img/shape/slider-card-4.png`);
const _sfc_main$I = {};
function _sfc_ssrRender$D(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<section${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
    class: "slider-area hero-height position-relative fix",
    style: { backgroundImage: `url(/img/slider/Image.jpg)` }
  }, _attrs))}><img class="shape-3 d-none d-xxl-block"${serverRenderer.exports.ssrRenderAttr("src", _imports_0$5)} alt="image not found"><div class="container"><div class="row"><div class="col-xl-6 col-lg-6 col-md-6"><div class="hero-text pt-95"><h5>Discover your journey</h5><h2>Discover <span class="down-mark-line">4500+</span> Events from top Organisers Around the World</h2><p>Host your own Events to the next level.</p><div class="hero-btn">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    class: "edu-btn",
    to: "/event"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`View all events`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("View all events")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div><div class="col-xl-6 col-lg-6 col-md-6"><div class="hero-right position-relative"><img data-depth="0.2" class="shape shape-1"${serverRenderer.exports.ssrRenderAttr("src", _imports_1$3)} alt="shape"><img data-depth="0.2" class="shape-2"${serverRenderer.exports.ssrRenderAttr("src", _imports_2$3)} alt="shape"><img class="shape-6"${serverRenderer.exports.ssrRenderAttr("src", _imports_3$2)} alt="shape"><div class="shape-4"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_4)} alt="shape"><h5 class="hero-shape-text">Top Rated Organisers</h5></div><div class="shape-5"><div class="course-card"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_5)} alt="image not found"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_6)} alt="image not found"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_7)} alt="image not found"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_8)} alt="image not found"><span><i class="far fa-plus"></i></span></div><h5>More than <span>500+</span> events completed around the world</h5></div></div></div></div></div></section>`);
}
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/HeroSection.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const HeroSectionVue = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["ssrRender", _sfc_ssrRender$D]]);
const _sfc_main$H = {
  name: "category",
  data() {
    return {
      CategoryList: [
        {
          categoryTitle: "Indoor",
          categoryDesc: "Take your journey indoors",
          categoryIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45.01" viewBox="0 0 45 45.01"><g id="code" transform="translate(-0.061)"><path id="Path_8754" data-name="Path 8754"d="M29.775,60.8a8.79,8.79,0,0,1-5.352-8.1V28.787A8.777,8.777,0,0,1,33.19,20H27.852a8.791,8.791,0,0,0-8.791,8.791V52.7a8.791,8.791,0,0,0,8.791,8.791h1.886C29.746,61.262,29.758,61.032,29.775,60.8Z"transform="translate(-17.33 -18.242)" fill="#c8d6f0" /><path id="Path_8755" data-name="Path 8755"d="M11.753,45.01H10.61A10.561,10.561,0,0,1,.061,34.461V10.549A10.561,10.561,0,0,1,10.61,0H26.786A10.561,10.561,0,0,1,37.335,10.549V22.5a1.758,1.758,0,0,1-3.516,0V10.549a7.041,7.041,0,0,0-7.033-7.033H10.61a7.041,7.041,0,0,0-7.033,7.033V34.461a7.041,7.041,0,0,0,7.033,7.033h1.143A1.758,1.758,0,0,1,11.753,45.01ZM30.214,16.175a1.758,1.758,0,0,0-1.758-1.758H25.467A2.64,2.64,0,0,1,22.83,11.78V8.791a1.758,1.758,0,0,0-3.516,0V11.78a6.161,6.161,0,0,0,6.154,6.154h2.989A1.758,1.758,0,0,0,30.214,16.175Z"transform="translate(0)" fill="#2467ec" /><path id="Path_8756" data-name="Path 8756"d="M181.9,329.576a1.758,1.758,0,0,1-1.233-3.011l4.592-4.519a1.747,1.747,0,0,0,0-2.462l-4.6-4.586a1.758,1.758,0,1,1,2.483-2.489l4.6,4.586a5.28,5.28,0,0,1,0,7.446l-.008.008-4.6,4.524A1.753,1.753,0,0,1,181.9,329.576Zm-15.1-.525a1.758,1.758,0,0,0-.02-2.486l-4.592-4.519a1.747,1.747,0,0,1,0-2.463l4.6-4.586a1.758,1.758,0,1,0-2.483-2.489l-4.6,4.585a5.28,5.28,0,0,0,0,7.446l.008.008,4.6,4.524a1.758,1.758,0,0,0,2.486-.02Zm6.59-.747,4.044-14.066a1.758,1.758,0,0,0-3.38-.972l-4.044,14.066a1.758,1.758,0,1,0,3.38.972Z"transform="translate(-144.217 -284.566)" fill="#ffb013" /></g></svg>'
        },
        {
          categoryTitle: "Outdoor",
          categoryDesc: "Take your journey Outdoors",
          categoryIcon: '<svg id="briefcase" xmlns="http://www.w3.org/2000/svg" width="45" height="45"viewBox="0 0 45 45"><path id="Path_8750" data-name="Path 8750" d="M25.273,163.906V147.031A7.031,7.031,0,0,1,32.3,140H27.031A7.031,7.031,0,0,0,20,147.031v16.875a7.031,7.031,0,0,0,7.031,7.031H32.3A7.031,7.031,0,0,1,25.273,163.906Z"transform="translate(-18.242 -127.695)" fill="#c9d7f1" /><path id="Path_8751" data-name="Path 8751"d="M171.82,7.031a1.758,1.758,0,0,1-1.758-1.758A1.76,1.76,0,0,0,168.3,3.516h-7.031a1.76,1.76,0,0,0-1.758,1.758,1.758,transform="translate(-142.289)" fill="#ffb013" /><g id="Group_4443" data-name="Group 4443" transform="translate(0 10.547)"><path id="Path_8752" data-name="Path 8752"d="M36.211,154.453H8.789A8.8,8.8,0,0,1,0,145.664V128.789A8.8,8.8,0,0,1,8.789,120H36.211A8.8,8.8,0,0,1,45,128.789v16.875A8.8,8.8,0,0,1,36.211,154.453ZM8.789,123.516a5.279,5.279,0,0,0-5.273,5.273v16.875a5.279,5.279,0,0,0,5.273,5.273H36.211a5.279,5.279,0,0,0,5.273-5.273V128.789a5.279,5.279,0,0,0-5.273-5.273Z"transform="translate(0 -120)" fill="#2467ec" /><path id="Path_8753" data-name="Path 8753"d="M109.18,196a1.758,1.758,0,0,0-1.758,1.758,5.279,5.279,0,0,1-5.273,5.273H88.789a5.279,5.279,0,0,1-5.273-5.273,1.758,1.758,0,0,0-3.516,0,8.8,8.8,0,0,0,8.789,8.789h4.922V208.3a1.758,1.758,0,1,0,3.516,0v-1.758h4.922a8.8,8.8,0,0,0,8.789-8.789A1.758,1.758,0,0,0,109.18,196Z"transform="translate(-72.969 -189.32)" fill="#2467ec" /></g></svg>'
        },
        {
          categoryTitle: "Sports",
          categoryDesc: "Discover the sports you are good at",
          categoryIcon: '<svg id="collection" xmlns="http://www.w3.org/2000/svg" width="44.998" height="44.998"viewBox="0 0 44.998 44.998"><path id="Path_8761" data-name="Path 8761"d="M25.273,341.834v-.439A4.394,4.394,0,0,1,29.668,337H24.394A4.394,4.394,0,0,0,20,341.394v.439a8.789,8.789,0,0,0,8.789,8.789h5.273A8.789,8.789,0,0,1,25.273,341.834Z"transform="translate(-18.242 -307.382)" fill="#c9d7f1" /><path id="Path_8762" data-name="Path 8762"d="M39.725,24.433a1.758,1.758,0,0,1-1.758-1.758V10.546a7.039,7.039,0,0,0-7.031-7.031H14.062a7.039,7.039,0,0,0-7.031,7.031V22.675a1.758,1.758,0,0,1-3.515,0V10.546A10.558,10.558,0,0,1,14.062,0H30.936A10.558,10.558,0,0,1,41.483,10.546V22.675A1.758,1.758,0,0,1,39.725,24.433Zm-13.271-12.3a2.2,2.2,0,1,0-2.2-2.2A2.2,2.2,0,0,0,26.454,12.128ZM45,34.452v-.439a6.159,6.159,0,0,0-6.152-6.152h-5.7a7.041,7.041,0,0,0-6.3,3.883,4.85,4.85,0,0,1-8.687,0,7.041,7.041,0,0,0-6.3-3.883h-5.7A6.159,6.159,0,0,0,0,34.012v.439A10.558,10.558,0,0,0,10.546,45H34.452A10.558,10.558,0,0,0,45,34.452ZM11.854,31.376A3.5,3.5,0,0,1,15,33.291a8.352,8.352,0,0,0,15,0,3.5,3.5,0,0,1,3.145-1.915h5.7a2.64,2.64,0,0,1,2.637,2.637v.439a7.039,7.039,0,0,1-7.031,7.031H10.546a7.039,7.039,0,0,1-7.031-7.031v-.439a2.64,2.64,0,0,1,2.637-2.637Z"fill="#2467ec" /><path id="Path_8763" data-name="Path 8763"d="M123.758,157.5a1.758,1.758,0,0,1-1.293-2.948s3.5-3.8,3.537-3.834a6.137,6.137,0,0,1,7.93-.251l.023.018,2.673,2.186c1.263.994,2.255.93,3.311-.214l2.528-2.964a1.758,1.758,0,1,1,2.675,2.281s-2.575,3.018-2.588,3.033a5.778,5.778,0,0,1-4.115,2.079,6.174,6.174,0,0,1-4-1.466l-.022-.018-2.673-2.186a2.63,2.63,0,0,0-3.334.067l-3.355,3.648A1.753,1.753,0,0,1,123.758,157.5Z"transform="translate(-111.278 -135.796)" fill="#ffb013" /></svg>'
        },
        {
          categoryTitle: "Party",
          categoryDesc: "Take up your self in the next level",
          categoryIcon: '<svg id="content-marketing" xmlns="http://www.w3.org/2000/svg" width="45" height="45"viewBox="0 0 45 45"><path id="Path_8764" data-name="Path 8764"d="M54.784,57.956l-1.251,1.251L47.37,53.046a10.955,10.955,0,0,1-3-5.6l-1-4.98,4.98,1c.168.034.334.072.5.114l1.316,7.169a10.955,10.955,0,0,0,3,5.6Zm-29.51-6.173V27.877a8.789,8.789,0,0,1,8.789-8.789l18.628-.068,0-.019-23.906.088A8.789,8.789,0,0,0,20,27.877V51.783a8.789,8.789,0,0,0,8.789,8.789l4.575-.028A8.79,8.79,0,0,1,25.273,51.783Z"transform="translate(-18.242 -17.33)" fill="#c9d7f1" /><path id="Path_8765" data-name="Path 8765"d="M27.246,45h-16.7A10.559,10.559,0,0,1,0,34.453V10.547A10.559,10.559,0,0,1,10.547,0H34.453A10.559,10.559,0,0,1,45,10.547V27.378a1.758,1.758,0,1,1-3.516,0V10.547a7.039,7.039,0,0,0-7.031-7.031H10.547a7.039,7.039,0,0,0-7.031,7.031V34.453a7.039,7.039,0,0,0,7.031,7.031h16.7a1.758,1.758,0,1,1,0,3.516Zm15.875-1.879a6.423,6.423,0,0,0,0-9.074l-6.162-6.162a12.672,12.672,0,0,0-6.5-3.477l-4.98-1a1.758,1.758,0,0,0-2.068,2.068l1,4.98a12.673,12.673,0,0,0,3.477,6.5l6.162,6.162a6.416,6.416,0,0,0,9.074,0ZM29.772,27.856a9.167,9.167,0,0,1,4.7,2.515l6.162,6.162a2.9,2.9,0,1,1-4.1,4.1l-6.162-6.162a9.168,9.168,0,0,1-2.515-4.7l-.479-2.4Z"fill="#2467ec" /><path id="Path_8766" data-name="Path 8766"d="M125.664,103.131H109.58a1.758,1.758,0,0,1,0-3.516h16.084a1.758,1.758,0,0,1,0,3.516Zm1.758,5.273a1.758,1.758,0,0,0-1.758-1.758H101.758a1.758,1.758,0,0,0,0,3.516h23.906A1.758,1.758,0,0,0,127.422,108.4Zm-17.578,7.031a1.758,1.758,0,0,0-1.758-1.758h-6.328a1.758,1.758,0,0,0,0,3.516h6.328A1.758,1.758,0,0,0,109.844,115.436ZM100,101.2a2.2,2.2,0,1,0,2.2-2.2A2.2,2.2,0,0,0,100,101.2Z" transform="translate(-91.211 -90.299)" fill="#ffb013" /></svg>'
        },
        {
          categoryTitle: "Life Styles",
          categoryDesc: "Improve your life style",
          categoryIcon: '<svg id="Swimming_Pool" xmlns="http://www.w3.org/2000/svg" width="45" height="45"viewBox="0 0 45 45"><g id="Group_4446" data-name="Group 4446" transform="translate(1.758 12.305)"><path id="Path_8767" data-name="Path 8767"d="M25.273,163.906V147.031A7.031,7.031,0,0,1,32.3,140H27.031A7.031,7.031,0,0,0,20,147.031v16.875a7.031,7.031,0,0,0,7.031,7.031H32.3A7.031,7.031,0,0,1,25.273,163.906Z"transform="translate(-20 -140)" fill="#c9d7f1" /></g><path id="Path_8768" data-name="Path 8768"d="M36.211,10.547H31.289V5.273a1.758,1.758,0,0,1,3.516,0,1.758,1.758,0,0,0,3.516,0,5.273,5.273,0,0,0-10.547,0v5.273H17.227V5.273a1.758,1.758,0,0,1,3.516,0,1.758,1.758,0,0,0,3.516,0,5.273,5.273,0,0,0-10.547,0v5.273H8.789A8.8,8.8,0,0,0,0,19.336V36.211A8.8,8.8,0,0,0,8.789,45H36.211A8.8,8.8,0,0,0,45,36.211V19.336A8.8,8.8,0,0,0,36.211,10.547Zm-8.437,3.516v3.516H17.227V14.063ZM41.484,36.211a5.279,5.279,0,0,1-5.273,5.273H8.789a5.279,5.279,0,0,1-5.273-5.273V19.336a5.279,5.279,0,0,1,5.273-5.273h4.922v11.6a1.758,1.758,0,0,0,3.516,0v-4.57H27.773v4.57a1.758,1.758,0,0,0,3.516,0v-11.6h4.922a5.279,5.279,0,0,1,5.273,5.273Z"fill="#2467ec" /><path id="Path_8769" data-name="Path 8769"d="M105.883,352a1.758,1.758,0,0,0-1.758,1.758,1.758,1.758,0,0,1-3.516,0,1.758,1.758,0,0,0-3.516,0,1.758,1.758,0,0,1-3.516,0,1.758,1.758,0,0,0-3.516,0,1.758,1.758,0,0,1-3.516,0,1.758,1.758,0,0,0-3.516,0,1.758,1.758,0,0,1-3.516,0,1.758,1.758,0,0,0-3.516,0,5.27,5.27,0,0,0,8.789,3.926,5.261,5.261,0,0,0,7.031,0,5.261,5.261,0,0,0,7.031,0,5.27,5.27,0,0,0,8.789-3.926A1.758,1.758,0,0,0,105.883,352Z"transform="translate(-69.32 -321.063)" fill="#ffb013" /></svg>'
        },
        {
          categoryTitle: "Photography",
          categoryDesc: "Become the great photographer",
          categoryIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="44.991" viewBox="0 0 45 44.991"><g id="no-photo" transform="translate(0 -0.049)"><path id="Path_8770" data-name="Path 8770"d="M41.972,125.675l-.773.881a8.788,8.788,0,1,1,1.983-17.129A8.81,8.81,0,0,0,41.972,125.675Zm-11.035-23.8-4.15.015A8.787,8.787,0,0,0,18,110.679v14.148a8.787,8.787,0,0,0,8.787,8.787l4.575-.027a8.788,8.788,0,0,1-8.089-8.76V110.679A8.885,8.885,0,0,1,30.937,101.876Z"transform="translate(-16.418 -92.879)" fill="#c9d7f1" /><path id="Path_8771" data-name="Path 8771"d="M23.9,42.316H10.545A10.557,10.557,0,0,1,0,31.771V17.624A10.557,10.557,0,0,1,10.545,7.079h1.718l.682-2.106A7.1,7.1,0,0,1,19.714.049h8.647a7.1,7.1,0,0,1,6.77,4.924l.713,2.2a10.6,10.6,0,0,1,9.147,10.453V23.6a1.758,1.758,0,0,1-3.515,0V17.624a7.051,7.051,0,0,0-6.957-7.029A1.757,1.757,0,0,1,32.866,9.38L31.787,6.057a3.591,3.591,0,0,0-3.426-2.493H19.714a3.591,3.591,0,0,0-3.425,2.492L15.213,9.378a1.757,1.757,0,0,1-1.672,1.216h-3a7.038,7.038,0,0,0-7.03,7.03V31.772a7.038,7.038,0,0,0,7.03,7.03H23.9A1.757,1.757,0,0,1,23.9,42.316Zm1.017-6.887a1.758,1.758,0,0,0-.277-3.5,7.047,7.047,0,0,1-7.594-7.008c.289-9.081,13.321-9.412,14.051-.353a1.757,1.757,0,0,0,3.511-.173c-1.1-13.6-20.643-13.093-21.077.526A10.557,10.557,0,0,0,24.077,35.462c.28,0,.564-.011.842-.033Z"fill="#2467ec" /><path id="Path_8772" data-name="Path 8772"d="M219.527,83.564h-7.654a1.758,1.758,0,0,1,0-3.515h7.654A1.758,1.758,0,0,1,219.527,83.564Zm11.528,26.362,5.084-5.084a1.758,1.758,0,0,0-2.485-2.486l-5.084,5.084-5.084-5.084A1.758,1.758,0,0,0,221,104.842l5.084,5.084L221,115.01a1.757,1.757,0,0,0,2.485,2.486l5.084-5.084,5.084,5.084a1.757,1.757,0,1,0,2.485-2.486Z"transform="translate(-191.662 -72.97)" fill="#ffb013" /> </g></svg>'
        },
        {
          categoryTitle: "Art & Design",
          categoryDesc: "Grow your design skills",
          categoryIcon: '<svg id="Vector" xmlns="http://www.w3.org/2000/svg" width="45" height="45"viewBox="0 0 45 45"><g id="Group_4444" data-name="Group 4444" transform="translate(8.437 5.273)"><path id="Path_8757" data-name="Path 8757"d="M102.3,82.877a3.516,3.516,0,0,1-.531-4.292l10.547-16.875a3.526,3.526,0,0,1,.38-.518,3.515,3.515,0,0,0-5.653.518L96.5,78.584a3.515,3.515,0,0,0,.531,4.292l7.031,7.031a3.5,3.5,0,0,0,2.486,1.03h5.273a3.5,3.5,0,0,1-2.486-1.03Z"transform="translate(-95.997 -60)" fill="#c9d7f1" /></g><g id="Group_4445" data-name="Group 4445" transform="translate(0)"><path id="Path_8758" data-name="Path 8758"d="M171.82,472H157.758a1.758,1.758,0,0,0,0,3.516H171.82a1.758,1.758,0,0,0,0-3.516Z"transform="translate(-142.289 -430.516)" fill="#2467ec" /><path id="Path_8759" data-name="Path 8759"d="M39.727,0a5.282,5.282,0,0,0-4.971,3.516H10.245a5.273,5.273,0,1,0,0,3.516H17.38l-9.934,15.9-.017.027a5.271,5.271,0,0,0,.8,6.439l7.031,7.031a5.239,5.239,0,0,0,3.729,1.545h7.031a5.239,5.239,0,0,0,3.729-1.545l7.031-7.031a5.272,5.272,0,0,0,.8-6.439l-.017-.027L27.62,7.031h7.136A5.273,5.273,0,1,0,39.727,0ZM5.273,7.031A1.758,1.758,0,1,1,7.031,5.273,1.76,1.76,0,0,1,5.273,7.031Zm18.736.856c.017.029-.47-.752,10.554,16.886a1.758,1.758,0,0,1-.273,2.133l-7.031,7.031a1.747,1.747,0,0,1-1.243.515H18.984a1.746,1.746,0,0,1-1.243-.515L10.71,26.907a1.758,1.758,0,0,1-.273-2.133C21.474,7.114,20.968,7.924,20.991,7.887a1.759,1.759,0,0,1,3.019,0Zm15.717-.856a1.758,1.758,0,1,1,1.758-1.758A1.76,1.76,0,0,1,39.727,7.031Z"transform="translate(0)" fill="#2467ec" /></g><path id="Path_8760" data-name="Path 8760" d="M204.789,162.547h-1.758v-8.789a1.758,1.758,0,1,0-3.516,0v8.789h-1.758a1.758,1.758,0,1,0,0,3.516h7.031a1.758,1.758,0,0,0,0-3.516Z"transform="translate(-178.773 -138.641)" fill="#ffb013" /></svg>'
        },
        {
          categoryTitle: "Health & Fitness",
          categoryDesc: "Enjoy the health life with fitness",
          categoryIcon: '<svg id="make" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45"><path id="Path_8773" data-name="Path 8773"d="M42.061,119.6a4.834,4.834,0,0,1-4.834-4.834V99.834A4.834,4.834,0,0,1,42.071,95l1.376.7a4.809,4.809,0,0,0-1.035,2.988v16.084a4.834,4.834,0,0,0,4.834,4.834Zm-16.655,1.988v.4a5.274,5.274,0,0,1,4.114-5.144l-.2-.129H25.273A5.273,5.273,0,0,0,20,121.982v-.4a4.79,4.79,0,0,0,4.79,4.79H30.2A4.79,4.79,0,0,1,25.405,121.587Z"transform="translate(-18.242 -86.65)" fill="#c9d7f1" /><path id="Path_8774" data-name="Path 8774"d="M7.91,83.426A5.713,5.713,0,1,0,2.2,77.713,5.719,5.719,0,0,0,7.91,83.426Zm0-7.91a2.2,2.2,0,1,1-2.2,2.2A2.2,2.2,0,0,1,7.91,75.516Zm35.332,6.416a1.758,1.758,0,0,0-1.758,1.758v16.875a3.08,3.08,0,0,1-3.076,3.076H6.592a3.076,3.076,0,0,1,0-6.152h5.977a1.757,1.757,0,0,0,.572-3.418,5.713,5.713,0,1,0-9.983.871,6.59,6.59,0,0,0,2.116,12.083v1.89a1.758,1.758,0,0,0,3.516,0v-1.758H36.738v1.758a1.758,1.758,0,0,0,3.516,0v-2.023A6.6,6.6,0,0,0,45,100.564V83.689A1.758,1.758,0,0,0,43.242,81.932ZM7.91,89.578a2.2,2.2,0,1,1-2.2,2.2A2.2,2.2,0,0,1,7.91,89.578Zm9.316,3.955V78.6a6.592,6.592,0,0,1,6.591-6.592h.015a1.758,1.758,0,0,1,0,3.516h-.011A3.076,3.076,0,0,0,20.742,78.6V93.533a3.08,3.08,0,0,0,3.076,3.076H36.211a1.758,1.758,0,0,1,0,3.516H23.818A6.6,6.6,0,0,1,17.227,93.533Z"transform="translate(0 -65.672)" fill="#2467ec" /><path id="Path_8775" data-name="Path 8775"d="M320.789,15.854a5.148,5.148,0,0,1-3.088-1.021c-3.659-2.74-5.631-6.029-5.7-9.513,0-.012,0-.024,0-.036a5.271,5.271,0,0,1,8.789-3.938,5.271,5.271,0,0,1,8.789,3.938c0,.012,0,.024,0,.036-.07,3.483-2.042,6.773-5.7,9.513A5.148,5.148,0,0,1,320.789,15.854ZM315.516,5.268c.07,2.974,2.372,5.312,4.293,6.75a1.645,1.645,0,0,0,1.961,0c1.921-1.438,4.223-3.776,4.293-6.75a1.758,1.758,0,0,0-3.516.005,1.758,1.758,0,0,1-3.516,0,1.758,1.758,0,0,0-3.516-.005Z"transform="translate(-284.578)" fill="#ffb013" /></svg>'
        },
        {
          categoryTitle: "Music",
          categoryDesc: "Improve your self with music",
          categoryIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="42.172" viewBox="0 0 45 42.172"><g id="electric-guitar" transform="translate(0 -18.851)"><path id="Path_8776" data-name="Path 8776"d="M30.011,203.348a15.8,15.8,0,0,1-4.5-11.3c0-5.045,3.023-7.333,6.337-8.894v-1.913C27.529,183.452,20,184.548,20,192.511a15.385,15.385,0,0,0,15.8,15.8,9.708,9.708,0,0,0,3.461-.584A15.272,15.272,0,0,1,30.011,203.348Z"transform="translate(-18.163 -149.122)" fill="#c9d7f1" /><g id="Group_4447" data-name="Group 4447" transform="translate(0 18.851)"><path id="Path_8777" data-name="Path 8777"d="M44.41,20.885l-1.136-1.051a3.658,3.658,0,0,0-5.109.116L28.5,30.005a1.059,1.059,0,0,1-1.15.251,1.034,1.034,0,0,1-.7-.915,7.077,7.077,0,0,1,.207-2.56,4.725,4.725,0,0,0-.6-4.154,4.909,4.909,0,0,0-3.755-2.1,5.3,5.3,0,0,0-4.264,2.068A18.642,18.642,0,0,0,16.036,26.5a11.708,11.708,0,0,1-1.7,2.981l-.025.025a13.884,13.884,0,0,1-4.136,2.139A22.873,22.873,0,0,0,3.593,35.2,10.327,10.327,0,0,0,0,43.389c0,2.327.492,8.207,5.038,12.6,4.389,4.546,10.269,5.038,12.6,5.038a10.327,10.327,0,0,0,8.185-3.593,22.871,22.871,0,0,0,3.558-6.586,14.063,14.063,0,0,1,2.162-4.159l0,0,0,0a11.735,11.735,0,0,1,2.979-1.694,18.639,18.639,0,0,0,3.908-2.206A5.3,5.3,0,0,0,40.5,38.518a4.909,4.909,0,0,0-2.1-3.755,4.726,4.726,0,0,0-4.154-.6,1.837,1.837,0,0,0,1.115,3.5,1.038,1.038,0,0,1,.949.118,1.245,1.245,0,0,1,.524.924,1.629,1.629,0,0,1-.71,1.218,16.156,16.156,0,0,1-3.143,1.729,13.5,13.5,0,0,0-4.07,2.469,15.954,15.954,0,0,0-2.937,5.349c-1.915,4.758-3.53,7.877-8.335,7.877a14.043,14.043,0,0,1-9.972-3.936l-.052-.052a14.043,14.043,0,0,1-3.936-9.972c0-4.806,3.119-6.42,7.877-8.335a15.951,15.951,0,0,0,5.35-2.938,13.5,13.5,0,0,0,2.468-4.07A16.163,16.163,0,0,1,21.1,24.9a1.633,1.633,0,0,1,1.218-.71,1.246,1.246,0,0,1,.924.523,1.038,1.038,0,0,1,.118.949,10.613,10.613,0,0,0-.369,3.953,4.754,4.754,0,0,0,8.117,2.972L40.78,22.531l1.136,1.051a1.837,1.837,0,1,0,2.494-2.7Z"transform="translate(0 -18.851)" fill="#2467ec" /><path id="Path_8778" data-name="Path 8778"d="M202.537,204.451a1.837,1.837,0,0,0,0,2.6l4.592,4.592a1.837,1.837,0,1,0,2.6-2.6l-4.592-4.592A1.837,1.837,0,0,0,202.537,204.451Z"transform="translate(-183.447 -188.559)" fill="#2467ec" /></g><path id="Path_8779" data-name="Path 8779"d="M101.573,269.179a1.832,1.832,0,0,1-1.3-.538l-4.592-4.592a1.837,1.837,0,0,1,2.6-2.6l4.592,4.592a1.837,1.837,0,0,1-1.3,3.136Zm-3.844,4.605a1.837,1.837,0,0,0,0-2.6l-4.592-4.592a1.837,1.837,0,1,0-2.6,2.6l4.592,4.592a1.837,1.837,0,0,0,2.6,0Z"transform="translate(-81.734 -221.473)" fill="#ffb013" /></g></svg>'
        }
      ]
    };
  }
};
function _sfc_ssrRender$C(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "top-catagory-area pt-110 pb-90" }, _attrs))}><div class="container"><div class="row"><div class="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-12 col-sm justify-content-center mb-30"><div class="section-title mb-20 text-center"><h2>Our Top <br> Event <span class="down-mark-line">Categories</span></h2></div></div></div><div class="row"><!--[-->`);
  serverRenderer.exports.ssrRenderList($data.CategoryList, (item) => {
    _push(`<div class="col-xl-4 col-lg-6 col-md-6">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "#" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div class="catagory-wrapper mb-30"${_scopeId}><div class="catagory-thumb"${_scopeId}>${item.categoryIcon}</div><div class="catagory-content"${_scopeId}><h3${_scopeId}>${serverRenderer.exports.ssrInterpolate(item.categoryTitle)}</h3><span${_scopeId}>${serverRenderer.exports.ssrInterpolate(item.categoryDesc)}</span></div></div>`);
        } else {
          return [
            vue_cjs_prod.createVNode("div", { class: "catagory-wrapper mb-30" }, [
              vue_cjs_prod.createVNode("div", {
                class: "catagory-thumb",
                innerHTML: item.categoryIcon
              }, null, 8, ["innerHTML"]),
              vue_cjs_prod.createVNode("div", { class: "catagory-content" }, [
                vue_cjs_prod.createVNode("h3", null, vue_cjs_prod.toDisplayString(item.categoryTitle), 1),
                vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.categoryDesc), 1)
              ])
            ])
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/CategoriesSection.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const CategoriesSectionVue = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["ssrRender", _sfc_ssrRender$C]]);
const _imports_0$4 = publicAssetsURL(`img/shape/portfolio-shap-1.png`);
const _imports_1$2 = publicAssetsURL(`img/shape/portfolio-shap-2.png`);
const _imports_2$2 = publicAssetsURL(`img/shape/portfolio-shap-3.png`);
const _imports_3$1 = publicAssetsURL(`img/course/course-01.jpg`);
const _sfc_main$G = {
  name: "app",
  data() {
    return {
      getData: "",
      loaded: false
    };
  },
  mounted() {
    this.getFeaturedEvent();
  },
  methods: {
    async getFeaturedEvent() {
      var dataQuery = {
        $and: [
          { approvalStatus: "Approved" },
          { Featured: "Yes" },
          { startDate: { $gt: new Date() } }
        ]
      };
      await axios.get("http://143.42.142.151:4000/events/getAllFiltered", {
        params: {
          dataQuery,
          page: 1,
          size: 6
        }
      }).then((res) => {
        console.log(res);
        this.getData = res.data.docs;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
      if (this.getData.length !== 0) {
        this.loaded = true;
      }
    },
    getDateFormat(dateValue) {
      var dateObj = new Date(dateValue);
      var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      return formattedDate;
    }
  }
};
function _sfc_ssrRender$B(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<section${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "course-area p-relative pt-110 pb-90" }, _attrs))}><div class="course-shape-1"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$4)} alt="shape"></div><div class="course-shape-2"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$2)} alt="shape"></div><div class="course-shape-3"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$2)} alt="shape"></div><div class="container"><div class="row"><div class="col-xl-5 col-lg-5 f-left"><div class="section-title mb-50"><h2>Our<br> Featured <span class="down-mark-line">Events</span></h2></div></div><div class="col-xl-7 col-lg-7"><div class="portfolio-button mt-60"><nav><div class="nav" id="nav-tab" role="tablist"><button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">View All </button><button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Indoor Sports </button><button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Outdoor Sports </button><button class="nav-link" id="nav-contact-tabB" data-bs-toggle="tab" data-bs-target="#nav-contactB" type="button" role="tab" aria-controls="nav-contactB" aria-selected="false">Other </button></div></nav></div></div></div><div class="course-main-items"><div class="tab-content" id="nav-tabContent">`);
  if ($data.loaded) {
    _push(`<div class="tab-pane fade show active"><div class="row"><!--[-->`);
    serverRenderer.exports.ssrRenderList($data.getData, (data) => {
      _push(`<div class="col-xl-4 col-lg-4 col-md-6"><div class="eduman-course-main-wrapper mb-30"><div class="eduman-course-thumb w-img">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_3$1)} alt="course-img"${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_3$1,
                alt: "course-img"
              })
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div><div class="course-cart"><div class="course-info-wrapper"><div class="cart-info-body"><span class="category-color category-color-1">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/event" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(data.Category)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(data.Category), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</span>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3${_scopeId}>${serverRenderer.exports.ssrInterpolate(data.Name)}</h3>`);
          } else {
            return [
              vue_cjs_prod.createVNode("h3", null, vue_cjs_prod.toDisplayString(data.Name), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`<div class="cart-lavel"><h5>Sport - <span>${serverRenderer.exports.ssrInterpolate(data.Sport)}</span></h5><p>${serverRenderer.exports.ssrInterpolate(data.Description)}</p></div><div class="info-cart-text"><ul><li><i class="fa-sharp fa-solid fa-calendar-days"></i><span class="fw-bold">Start Date :</span> ${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.startDate))}</li><li><i class="fa-sharp fa-solid fa-calendar-days"></i><span class="fw-bold">End Date :</span> ${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.endDate))}</li><li><i class="fa-solid fa-clock"></i><span class="fw-bold">Time :</span> ${serverRenderer.exports.ssrInterpolate(data.Time)}</li></ul></div><div class="course-action">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/event-details/${data.id}`,
        class: "view-details-btn"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View Details`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("View Details")
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { class: "c-share-btn" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="flaticon-previous"${_scopeId}></i>`);
          } else {
            return [
              vue_cjs_prod.createVNode("i", { class: "flaticon-previous" })
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div></div></div></div><div class="eduman-course-wraper"><div class="eduman-course-heading">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "category-color category-color-1",
        to: "/event"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(data.Sport)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(data.Sport), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div><div class="eduman-course-text"><h3>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(data.Name)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(data.Name), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</h3></div><div class="eduman-course-meta mt-10"><div class="eduman-course-price row"><h4 class="fw-bold col-md-6">Entry Fees : </h4><span class="price-now col-md-6">${serverRenderer.exports.ssrInterpolate(data.entryFee)}/-</span></div><div class="eduman-course-tutor">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "#" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-capitalize"${_scopeId}>${serverRenderer.exports.ssrInterpolate(data.createdByFName)}</span> <span class="text-capitalize"${_scopeId}>${serverRenderer.exports.ssrInterpolate(data.createdByLName)}</span>`);
          } else {
            return [
              vue_cjs_prod.createVNode("span", { class: "text-capitalize" }, vue_cjs_prod.toDisplayString(data.createdByFName), 1),
              vue_cjs_prod.createTextVNode(),
              vue_cjs_prod.createVNode("span", { class: "text-capitalize" }, vue_cjs_prod.toDisplayString(data.createdByLName), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div></div></div><div class="eduman-course-footer"><div class="course-deteals-btn">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="me-2"${_scopeId}>View Details</span><i class="far fa-arrow-right"${_scopeId}></i>`);
          } else {
            return [
              vue_cjs_prod.createVNode("span", { class: "me-2" }, "View Details"),
              vue_cjs_prod.createVNode("i", { class: "far fa-arrow-right" })
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div></div></div></div>`);
    });
    _push(`<!--]--></div></div>`);
  } else {
    _push(`<div class="flex container"><div class="row"><h4>No Featured events yet</h4></div></div>`);
  }
  _push(`</div></div></div></section>`);
}
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/CourseSection.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const CourseSection = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["ssrRender", _sfc_ssrRender$B]]);
const _sfc_main$F = {
  name: "feature",
  props: {
    space_minus: String
  },
  data() {
    return {
      featureBg: "/img/fact/fact.png",
      FeatureList: [
        {
          featureTitle: "Enjoy events with people of same taste",
          featureIcon: "flaticon-online-course"
        },
        {
          featureTitle: "Get goodies if you do well",
          featureIcon: "flaticon-certificate"
        },
        {
          featureTitle: "Search all events and choose what you like",
          featureIcon: "flaticon-laptop"
        }
      ]
    };
  }
};
function _sfc_ssrRender$A(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
    class: $props.space_minus ? $props.space_minus : "features-area pt-45 pb-15",
    style: { backgroundImage: `url(${$data.featureBg})` }
  }, _attrs))}><div class="container"><div class="row"><!--[-->`);
  serverRenderer.exports.ssrRenderList($data.FeatureList, (item) => {
    _push(`<div class="col-xl-4 col-lg-4 col-md-6"><div class="features-wrapper d-flex align-items-center mb-30"><div class="features-icon"><i class="${serverRenderer.exports.ssrRenderClass(item.featureIcon)}"></i></div><div class="features-content"><h3>${serverRenderer.exports.ssrInterpolate(item.featureTitle)}</h3></div></div></div>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/FeatureSection.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const FeatureSection = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["ssrRender", _sfc_ssrRender$A]]);
const _sfc_main$E = {
  name: "browseCourse",
  data() {
    return {
      browseCourse: [
        {
          browseImage: "/img/browser-course/browser-course-01.jpg",
          browseDesc: "Start from today",
          browseTitle: "Become an instructor and spread your knowledge",
          browseUrl: "/instructor",
          browseBtn: "View details",
          browseBtnUrl: "/become-instructor"
        },
        {
          browseImage: "/img/browser-course/browser-course-02.jpg",
          browseDesc: "Discover your gain",
          browseTitle: "Keep your skilled centers of excellence competitive",
          browseUrl: "/course-details",
          browseBtn: "Browse courses",
          browseBtnUrl: "/course"
        }
      ]
    };
  }
};
function _sfc_ssrRender$z(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "browser-course-area" }, _attrs))}><div class="container"><div class="row"><!--[-->`);
  serverRenderer.exports.ssrRenderList($data.browseCourse, (item) => {
    _push(`<div class="col-xl-6 col-lg-6 col-md-12 mb-30"><div class="browser-course-wrapper course-height"><div class="browser-course-bg"><img${serverRenderer.exports.ssrRenderAttr("src", item.browseImage)} alt="image not found"></div><div class="browser-course-content"><span>${serverRenderer.exports.ssrInterpolate(item.browseDesc)}</span><div class="browser-course-tittle">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      to: item.browseUrl
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${serverRenderer.exports.ssrInterpolate(item.browseTitle)}`);
        } else {
          return [
            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.browseTitle), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div><div class="browser-btn">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      class: "course-btn",
      to: item.browseBtnUrl
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${serverRenderer.exports.ssrInterpolate(item.browseBtn)}`);
        } else {
          return [
            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.browseBtn), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div></div></div></div>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/BrowseCourse.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const BrowseCourse = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["ssrRender", _sfc_ssrRender$z]]);
const __nuxt_component_0$4 = vue_cjs_prod.defineComponent({
  name: "ClientOnly",
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots }) {
    const mounted = vue_cjs_prod.ref(false);
    vue_cjs_prod.onMounted(() => {
      mounted.value = true;
    });
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return vue_cjs_prod.createElementBlock(fallbackTag, null, fallbackStr);
    };
  }
});
const _sfc_main$D = {
  name: "testimonial",
  props: {
    testimonial_spacing: String
  },
  data() {
    return {
      testimonialItem: [
        {
          id: "1",
          testImage: "/img/testimonial/Image.png",
          name: "David Johnson",
          designation: "Host",
          qoute: "/img/testimonial/quotes.png",
          great: "Great Event !",
          feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        },
        {
          id: "2",
          testImage: "/img/testimonial/testimonial-02.png",
          name: "Brandon Tylor",
          designation: "Host",
          qoute: "/img/testimonial/quotes.png",
          great: "Best Experience !",
          feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        },
        {
          id: "3",
          testImage: "/img/testimonial/testimonial.png",
          name: "Richard Joseph",
          designation: "Host",
          qoute: "/img/testimonial/quotes.png",
          great: "Great Event !",
          feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        }
      ]
    };
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Autoplay]
    };
  }
};
function _sfc_ssrRender$y(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_client_only = __nuxt_component_0$4;
  const _component_swiper = vue_cjs_prod.resolveComponent("swiper");
  const _component_swiper_slide = vue_cjs_prod.resolveComponent("swiper-slide");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
    class: $props.testimonial_spacing ? $props.testimonial_spacing : "testimonial-area pb-120"
  }, _attrs))}><div class="container"><div class="row"><div class="col-lg-6 offset-lg-3"><div class="section-title text-center mb-55"><h2>What People<br> Think and Say About <span class="down-mark-line">Us</span></h2></div></div></div><div class="swiper-container testimonial-active"><div class="swiper-wrapper">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_client_only, null, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_swiper, {
          modules: $setup.modules,
          "slides-per-view": 1,
          loop: true,
          "space-between": 30,
          autoplay: { delay: 3500, disableOnInteraction: false },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 40
            },
            991: {
              slidesPerView: 2,
              spaceBetween: 40
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 40
            },
            1400: {
              slidesPerView: 3
            }
          }
        }, {
          default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              serverRenderer.exports.ssrRenderList($data.testimonialItem, (item) => {
                _push3(serverRenderer.exports.ssrRenderComponent(_component_swiper_slide, {
                  key: item.id
                }, {
                  default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="testimonial-items position-relative"${_scopeId3}><div class="testimonial-header"${_scopeId3}><div class="testimonial-img"${_scopeId3}><img${serverRenderer.exports.ssrRenderAttr("src", item.testImage)} alt="image not found"${_scopeId3}></div><div class="testimonial-title"${_scopeId3}><h4${_scopeId3}>${serverRenderer.exports.ssrInterpolate(item.name)}</h4><span${_scopeId3}>${serverRenderer.exports.ssrInterpolate(item.designation)}</span></div></div><div class="testimoni-quotes"${_scopeId3}><img${serverRenderer.exports.ssrRenderAttr("src", item.qoute)} alt="image not found"${_scopeId3}></div><div class="testimonial-body"${_scopeId3}><h3${_scopeId3}>${serverRenderer.exports.ssrInterpolate(item.great)}</h3><p${_scopeId3}>${serverRenderer.exports.ssrInterpolate(item.feedback)}</p></div><div class="testimonial-icon"${_scopeId3}><i class="fas fa-star"${_scopeId3}></i><i class="fas fa-star"${_scopeId3}></i><i class="fas fa-star"${_scopeId3}></i><i class="fas fa-star"${_scopeId3}></i><i class="fas fa-star"${_scopeId3}></i></div></div>`);
                    } else {
                      return [
                        vue_cjs_prod.createVNode("div", { class: "testimonial-items position-relative" }, [
                          vue_cjs_prod.createVNode("div", { class: "testimonial-header" }, [
                            vue_cjs_prod.createVNode("div", { class: "testimonial-img" }, [
                              vue_cjs_prod.createVNode("img", {
                                src: item.testImage,
                                alt: "image not found"
                              }, null, 8, ["src"])
                            ]),
                            vue_cjs_prod.createVNode("div", { class: "testimonial-title" }, [
                              vue_cjs_prod.createVNode("h4", null, vue_cjs_prod.toDisplayString(item.name), 1),
                              vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.designation), 1)
                            ])
                          ]),
                          vue_cjs_prod.createVNode("div", { class: "testimoni-quotes" }, [
                            vue_cjs_prod.createVNode("img", {
                              src: item.qoute,
                              alt: "image not found"
                            }, null, 8, ["src"])
                          ]),
                          vue_cjs_prod.createVNode("div", { class: "testimonial-body" }, [
                            vue_cjs_prod.createVNode("h3", null, vue_cjs_prod.toDisplayString(item.great), 1),
                            vue_cjs_prod.createVNode("p", null, vue_cjs_prod.toDisplayString(item.feedback), 1)
                          ]),
                          vue_cjs_prod.createVNode("div", { class: "testimonial-icon" }, [
                            vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                            vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                            vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                            vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                            vue_cjs_prod.createVNode("i", { class: "fas fa-star" })
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($data.testimonialItem, (item) => {
                  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_swiper_slide, {
                    key: item.id
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode("div", { class: "testimonial-items position-relative" }, [
                        vue_cjs_prod.createVNode("div", { class: "testimonial-header" }, [
                          vue_cjs_prod.createVNode("div", { class: "testimonial-img" }, [
                            vue_cjs_prod.createVNode("img", {
                              src: item.testImage,
                              alt: "image not found"
                            }, null, 8, ["src"])
                          ]),
                          vue_cjs_prod.createVNode("div", { class: "testimonial-title" }, [
                            vue_cjs_prod.createVNode("h4", null, vue_cjs_prod.toDisplayString(item.name), 1),
                            vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.designation), 1)
                          ])
                        ]),
                        vue_cjs_prod.createVNode("div", { class: "testimoni-quotes" }, [
                          vue_cjs_prod.createVNode("img", {
                            src: item.qoute,
                            alt: "image not found"
                          }, null, 8, ["src"])
                        ]),
                        vue_cjs_prod.createVNode("div", { class: "testimonial-body" }, [
                          vue_cjs_prod.createVNode("h3", null, vue_cjs_prod.toDisplayString(item.great), 1),
                          vue_cjs_prod.createVNode("p", null, vue_cjs_prod.toDisplayString(item.feedback), 1)
                        ]),
                        vue_cjs_prod.createVNode("div", { class: "testimonial-icon" }, [
                          vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                          vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                          vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                          vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                          vue_cjs_prod.createVNode("i", { class: "fas fa-star" })
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_swiper, {
            modules: $setup.modules,
            "slides-per-view": 1,
            loop: true,
            "space-between": 30,
            autoplay: { delay: 3500, disableOnInteraction: false },
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 30
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 40
              },
              991: {
                slidesPerView: 2,
                spaceBetween: 40
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 40
              },
              1400: {
                slidesPerView: 3
              }
            }
          }, {
            default: vue_cjs_prod.withCtx(() => [
              (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($data.testimonialItem, (item) => {
                return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_swiper_slide, {
                  key: item.id
                }, {
                  default: vue_cjs_prod.withCtx(() => [
                    vue_cjs_prod.createVNode("div", { class: "testimonial-items position-relative" }, [
                      vue_cjs_prod.createVNode("div", { class: "testimonial-header" }, [
                        vue_cjs_prod.createVNode("div", { class: "testimonial-img" }, [
                          vue_cjs_prod.createVNode("img", {
                            src: item.testImage,
                            alt: "image not found"
                          }, null, 8, ["src"])
                        ]),
                        vue_cjs_prod.createVNode("div", { class: "testimonial-title" }, [
                          vue_cjs_prod.createVNode("h4", null, vue_cjs_prod.toDisplayString(item.name), 1),
                          vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.designation), 1)
                        ])
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "testimoni-quotes" }, [
                        vue_cjs_prod.createVNode("img", {
                          src: item.qoute,
                          alt: "image not found"
                        }, null, 8, ["src"])
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "testimonial-body" }, [
                        vue_cjs_prod.createVNode("h3", null, vue_cjs_prod.toDisplayString(item.great), 1),
                        vue_cjs_prod.createVNode("p", null, vue_cjs_prod.toDisplayString(item.feedback), 1)
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "testimonial-icon" }, [
                        vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                        vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                        vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                        vue_cjs_prod.createVNode("i", { class: "fas fa-star" }),
                        vue_cjs_prod.createVNode("i", { class: "fas fa-star" })
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ]),
            _: 1
          }, 8, ["modules"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/TestimonialSection.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const TestimonialSection = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["ssrRender", _sfc_ssrRender$y]]);
const _imports_0$3 = publicAssetsURL(`img/shape/education-shape-04.png`);
const _imports_1$1 = publicAssetsURL(`img/shape/education-shape-01.png`);
const _imports_2$1 = publicAssetsURL(`img/shape/education-shape-03.png`);
const _imports_3 = publicAssetsURL(`img/teacher/education.png`);
const _sfc_main$C = {};
function _sfc_ssrRender$x(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<section${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "education-area position-relative pt-85" }, _attrs))}><div class="container"><img class="education-shape-2"${serverRenderer.exports.ssrRenderAttr("src", _imports_0$3)} alt="shape"><img class="education-shape-3"${serverRenderer.exports.ssrRenderAttr("src", _imports_1$1)} alt="shape"><img class="education-shape-4"${serverRenderer.exports.ssrRenderAttr("src", _imports_2$1)} alt="shape"><div class="row"><div class="col-xl-4 col-lg-4 offset-xl-2 offset-lg-2"><div class="education-img mb-30"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_3)} alt="image not found"></div></div><div class="col-xl-4 col-lg-4"><div class="section-title mb-30"><h2>Add some enjoyments Your life through all kind of <span class="down-mark-line">Events</span></h2></div><div class="education-content mb-30"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    to: "/about",
    class: "edu-sec-btn"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Watch how to start`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Watch how to start")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></section>`);
}
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/EducationSection.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const EducationSection = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["ssrRender", _sfc_ssrRender$x]]);
const _sfc_main$B = {
  name: "brand",
  data() {
    return {
      brandImageList: [
        {
          id: "1",
          brandImage: "/img/brand/brand-01.png"
        },
        {
          id: "2",
          brandImage: "/img/brand/brand-02.png"
        },
        {
          id: "3",
          brandImage: "/img/brand/brand-03.png"
        },
        {
          id: "4",
          brandImage: "/img/brand/brand-04.png"
        },
        {
          id: "5",
          brandImage: "/img/brand/brand-05.png"
        },
        {
          id: "6",
          brandImage: "/img/brand/brand-06.png"
        }
      ]
    };
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Autoplay]
    };
  }
};
function _sfc_ssrRender$w(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_client_only = __nuxt_component_0$4;
  const _component_swiper = vue_cjs_prod.resolveComponent("swiper");
  const _component_swiper_slide = vue_cjs_prod.resolveComponent("swiper-slide");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "brand-area theme-bg pt-90 pb-120" }, _attrs))}><div class="container"><div class="row"><div class="col-xl-12"><div class="brand-wrapper text-center"><div class="brand-wrapper text-center"><div class="swiper-container brand-active"><div class="swiper-wrapper">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_client_only, null, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_swiper, {
          modules: $setup.modules,
          "slides-per-view": 1,
          loop: true,
          "space-between": 30,
          autoplay: { delay: 3500, disableOnInteraction: false },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 40
            },
            991: {
              slidesPerView: 4,
              spaceBetween: 40
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 40
            },
            1400: {
              slidesPerView: 6,
              spaceBetween: 40
            }
          }
        }, {
          default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              serverRenderer.exports.ssrRenderList($data.brandImageList, (item) => {
                _push3(serverRenderer.exports.ssrRenderComponent(_component_swiper_slide, {
                  key: item.brandImage
                }, {
                  default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="singel-brand"${_scopeId3}><img${serverRenderer.exports.ssrRenderAttr("src", item.brandImage)} alt="image not found"${_scopeId3}></div>`);
                    } else {
                      return [
                        vue_cjs_prod.createVNode("div", { class: "singel-brand" }, [
                          vue_cjs_prod.createVNode("img", {
                            src: item.brandImage,
                            alt: "image not found"
                          }, null, 8, ["src"])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($data.brandImageList, (item) => {
                  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_swiper_slide, {
                    key: item.brandImage
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode("div", { class: "singel-brand" }, [
                        vue_cjs_prod.createVNode("img", {
                          src: item.brandImage,
                          alt: "image not found"
                        }, null, 8, ["src"])
                      ])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_swiper, {
            modules: $setup.modules,
            "slides-per-view": 1,
            loop: true,
            "space-between": 30,
            autoplay: { delay: 3500, disableOnInteraction: false },
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 40
              },
              991: {
                slidesPerView: 4,
                spaceBetween: 40
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 40
              },
              1400: {
                slidesPerView: 6,
                spaceBetween: 40
              }
            }
          }, {
            default: vue_cjs_prod.withCtx(() => [
              (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($data.brandImageList, (item) => {
                return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_swiper_slide, {
                  key: item.brandImage
                }, {
                  default: vue_cjs_prod.withCtx(() => [
                    vue_cjs_prod.createVNode("div", { class: "singel-brand" }, [
                      vue_cjs_prod.createVNode("img", {
                        src: item.brandImage,
                        alt: "image not found"
                      }, null, 8, ["src"])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ]),
            _: 1
          }, 8, ["modules"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div></div></div></div>`);
}
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/BrandSection.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const BrandSection = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["ssrRender", _sfc_ssrRender$w]]);
const _sfc_main$A = {
  name: "app",
  data() {
    return {
      SignUpData: {
        FName: "",
        LName: "",
        Email: "",
        password: "",
        DOB: "",
        Gender: "",
        PrefferedSport: "",
        prefferedLocation: ""
      },
      SignInEmail: "",
      SignInPass: "",
      errorMessage: "",
      SignInError: false,
      SignUpError: false,
      loggedIn: false,
      SignInEmailError: false,
      SignUpEmailError: false,
      showSignIn: false,
      showSignUp: false,
      hideReminder: false,
      valueFour: 1,
      valueFive: 1,
      valueSix: 1,
      isSticky: false,
      showSidebar: false,
      menuOption: {
        menuShow: false,
        homeDropdown: false,
        coursesDropdown: false,
        shopDropdown: false,
        pagesDropDown: false,
        instructorDropDown: false,
        faqDropDown: false,
        eventDropDown: false,
        blogDropdown: false
      },
      isAdmin: false,
      searchQuery: ""
    };
  },
  methods: {
    handleSticky() {
      if (window.scrollY > 50) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
    handleSidebar() {
      this.showSidebar = true;
    },
    handleSidebarClose() {
      this.showSidebar = false;
    },
    handleSignIn() {
      return this.showSignIn = !this.showSignIn;
    },
    handleSignUp() {
      return this.showSignUp = !this.showSignUp;
    },
    handleReminder() {
      return this.hideReminder = !this.hideReminder;
    },
    handleIncreaseValue(value) {
      if (value === "valueFour") {
        this.valueFour++;
      }
      if (value === "valueFive") {
        this.valueFive++;
      }
      if (value === "valueSix") {
        this.valueSix++;
      }
    },
    handleDecreaseValue(value) {
      if (value === "valueFour" && this.valueFour > 0) {
        this.valueFour--;
      }
      if (value === "valueFive" && this.valueFive > 0) {
        this.valueFive--;
      }
      if (value === "valueSix" && this.valueSix > 0) {
        this.valueSix--;
      }
    },
    async userRegister() {
      if (this.validateEmail(this.SignUpData.Email)) {
        axios.post("http://143.42.142.151:4000/users/register", this.SignUpData).then((response) => {
          console.log(response);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("UserData", JSON.stringify(response.data));
          this.$router.go("/dashboard");
        }).catch((error) => {
          if (error.response) {
            this.SignUpError = true;
            this.errorMessage = error.response.data.message;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
            this.SignUpError = true;
            this.errorMessage = error.request;
          } else {
            console.log("Error", error.message);
            this.SignUpError = true;
            this.errorMessage = error.message;
          }
        });
      } else {
        this.SignUpEmailError = true;
      }
    },
    async userLogin() {
      if (this.validateEmail(this.SignInEmail)) {
        axios.post("http://143.42.142.151:4000/users/authenticate", {
          Email: this.SignInEmail,
          password: this.SignInPass
        }).then((res) => {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("UserData", JSON.stringify(res.data));
          this.$router.go("/dashboard");
        }).catch((error) => {
          if (error.response) {
            this.SignInError = true;
            this.errorMessage = error.response.data.message;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
            this.SignInError = true;
            this.errorMessage = error.request;
          } else {
            console.log("Error", error.message);
            this.SignInError = true;
            this.errorMessage = error.message;
          }
        });
      } else {
        this.SignInEmailError = true;
      }
    },
    validateEmail(data) {
      console.log(data);
      const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data);
      return result;
    },
    handleLogOut() {
      window.localStorage.clear();
      this.$router.go();
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleSticky);
  },
  beforeMount() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
      if (JSON.parse(localStorage.UserData).Status === "Admin") {
        this.isAdmin = true;
      }
    }
  }
};
function _sfc_ssrRender$v(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-51652350><header data-v-51652350><div class="header-top-area d-none d-lg-block" data-v-51652350><div class="container-fluid" data-v-51652350><div class="header-top-inner" data-v-51652350><div class="row align-items-center" data-v-51652350><div class="col-xl-8 col-lg-8" data-v-51652350><div class="header-top-icon" data-v-51652350><a href="tel:(555)674890556" data-v-51652350><i class="fas fa-phone" data-v-51652350></i>(555) 674 890 556</a><a href="mailto:info@example.com" data-v-51652350><i class="fal fa-envelope" data-v-51652350></i>info@example.com</a><i class="fal fa-map-marker-alt" data-v-51652350></i><span data-v-51652350>3rd Avenue, San Francisco</span></div></div></div></div></div></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.isSticky ? "header-area header-transparent sticky-header sticky" : "header-area header-transparent sticky-header"}`)}" data-v-51652350><div class="container-fluid" data-v-51652350><div class="header-main-wrapper" data-v-51652350><div class="row align-items-center" data-v-51652350><div class="col-xl-7 col-lg-7 col-md-5 col-sm-9 col-9" data-v-51652350><div class="header-left d-flex align-items-center" data-v-51652350><div class="header-logo" data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$d)} alt="logo" data-v-51652350${_scopeId}>`);
      } else {
        return [
          vue_cjs_prod.createVNode("img", {
            src: _imports_0$d,
            alt: "logo"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="main-menu menu-margin d-none d-xl-block" data-v-51652350><nav id="mobile-menu" data-v-51652350><ul data-v-51652350><li data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li>`);
  if ($data.loggedIn) {
    _push(`<li data-v-51652350>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/dashboard" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Dashboard`);
        } else {
          return [
            vue_cjs_prod.createTextVNode("Dashboard")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<li data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/about" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("About")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="menu-item-has-children" data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "javascript:void(0)" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Events`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Events")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<ul class="sub-menu" data-v-51652350><li data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/event" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Upcoming Event`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Upcoming Event")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/expired" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Expired Events`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Expired Events")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></li><li data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Contact")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></nav></div></div></div><div class="col-xl-5 col-lg-5 col-md-7 col-sm-3 col-3" data-v-51652350><div class="header-right d-flex align-items-center justify-content-end" data-v-51652350><div class="header-search w-50 d-none d-xl-block mr-30" data-v-51652350><div data-v-51652350><div class="search-icon p-relative" data-v-51652350><input class="mr-10 w-75"${serverRenderer.exports.ssrRenderAttr("value", $data.searchQuery)} required type="text" placeholder="Search courses..." data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    to: `/search/?find=${$data.searchQuery}`
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fas fa-search" data-v-51652350${_scopeId}></i>`);
      } else {
        return [
          vue_cjs_prod.createVNode("i", { class: "fas fa-search" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
  if ($data.loggedIn) {
    _push(`<div class="d-inline-flex justify-content-center align-items-center" data-v-51652350><div class="user-btn-inner p-relative d-none d-md-block" data-v-51652350><div class="user-btn-wrapper" data-v-51652350><div class="user-btn-content" data-v-51652350><a class="user-btn-sign-in" href="javascript:void(0)" data-v-51652350>Log Out</a></div></div></div>`);
    if ($data.isAdmin) {
      _push(`<div class="d-none d-md-block" data-v-51652350><a class="user-btn-sign-up edu-btn" href="/admin" data-v-51652350>Admin</a></div>`);
    } else {
      _push(`<div class="d-none d-md-block" data-v-51652350><a class="user-btn-sign-up edu-btn" href="/add-event" data-v-51652350>Host Event</a></div>`);
    }
    _push(`</div>`);
  } else {
    _push(`<div class="d-inline-flex justify-content-center align-items-center" data-v-51652350><div class="user-btn-inner p-relative d-none d-md-block" data-v-51652350><div class="user-btn-wrapper" data-v-51652350><div class="user-btn-content" data-v-51652350><a class="user-btn-sign-in" href="javascript:void(0)" data-v-51652350>Sign In</a></div></div></div><div class="d-none d-md-block" data-v-51652350><a class="user-btn-sign-up edu-btn" href="javascript:void(0)" data-v-51652350>Sign Up</a></div></div>`);
  }
  _push(`<div class="menu-bar d-xl-none ml-20" data-v-51652350><a class="side-toggle" href="javascript:void(0)" data-v-51652350><div class="bar-icon" data-v-51652350><span data-v-51652350></span><span data-v-51652350></span><span data-v-51652350></span></div></a></div></div></div></div></div></div></div></header><div class="fix" data-v-51652350><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSidebar ? "side-info info-open" : "side-info"}`)}" data-v-51652350><div class="side-info-content" data-v-51652350><div class="offset-widget offset-logo mb-40" data-v-51652350><div class="row align-items-center" data-v-51652350><div class="col-9" data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$d)} alt="Logo" data-v-51652350${_scopeId}>`);
      } else {
        return [
          vue_cjs_prod.createVNode("img", {
            src: _imports_0$d,
            alt: "Logo"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="col-3 text-end" data-v-51652350><button class="side-info-close" data-v-51652350><i class="fal fa-times" data-v-51652350></i></button></div></div></div><div class="mobile-menu d-xl-none fix mb-30" data-v-51652350><div class="sidebar-menu mm-menu" data-v-51652350><ul data-v-51652350><li data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li>`);
  if ($data.loggedIn) {
    _push(`<li data-v-51652350>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/Dashboard" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Dashboard`);
        } else {
          return [
            vue_cjs_prod.createTextVNode("Dashboard")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<li data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/about" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("About")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="${serverRenderer.exports.ssrRenderClass([[$data.menuOption.eventDropDown === true ? "active" : ""], "menu-item-has-children has-droupdown"])}" data-v-51652350><a data-v-51652350>Event</a><ul class="${serverRenderer.exports.ssrRenderClass([[$data.menuOption.eventDropDown === true ? "active" : ""], "sub-menu"])}" data-v-51652350><li data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/event" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Upcoming Event`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Upcoming Event")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/expired" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Expired Events`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Expired Events")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></li><li data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Contact")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div><div class="offset-widget offset_searchbar mb-30" data-v-51652350><div class="menu-search position-relative" data-v-51652350><div class="filter-search-input" data-v-51652350><input class="mr-10"${serverRenderer.exports.ssrRenderAttr("value", $data.searchQuery)} required type="text" placeholder="Search keyword" data-v-51652350>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    to: `/search/?find=${$data.searchQuery}`
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fal fa-search" data-v-51652350${_scopeId}></i>`);
      } else {
        return [
          vue_cjs_prod.createVNode("i", { class: "fal fa-search" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div><div class="offset-widget offset_menu-top mb-20" data-v-51652350><div class="header-menu-top-icon mb-20" data-v-51652350><a href="tel:(555)674890556" data-v-51652350><i class="fas fa-phone" data-v-51652350></i>(555) 674 890 556</a><a href="mailto:info@example.com" data-v-51652350><i class="fal fa-envelope" data-v-51652350></i>info@example.com</a><i class="fal fa-map-marker-alt" data-v-51652350></i><span data-v-51652350>3rd Avenue, San Francisco</span></div></div><div class="offset-widget button mb-20" data-v-51652350>`);
  if ($data.loggedIn) {
    _push(`<div data-v-51652350>`);
    if ($data.isAdmin) {
      _push(`<div class="user-btn-content mb-20 mt-20" data-v-51652350><a class="user-btn-sign-in" href="/admin" data-v-51652350>Admin</a></div>`);
    } else {
      _push(`<div class="user-btn-content mb-20 mt-20" data-v-51652350><a class="user-btn-sign-in" href="/add-event" data-v-51652350>Host Event</a></div>`);
    }
    _push(`<a href="javascript:void(0)" class="edu-four-btn" data-v-51652350>Log Out</a></div>`);
  } else {
    _push(`<div data-v-51652350><div class="user-btn-content mb-20 mt-20" data-v-51652350><a class="user-btn-sign-in" href="javascript:void(0)" data-v-51652350>Sign In</a></div><a href="javascript:void(0)" class="edu-four-btn" data-v-51652350>Sign Up</a></div>`);
  }
  _push(`</div></div></div></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSidebar ? "offcanvas-overlay overlay-open" : "offcanvas-overlay"}`)}" data-v-51652350></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSignIn ? "signin-area open position-fixed" : "signin-area"}`)}" data-v-51652350><div class="signin-area-wrapper position-relative overflow-scroll" data-v-51652350><div class="signup-box text-center" data-v-51652350><div class="signup-text" data-v-51652350><h3 data-v-51652350>Sign in</h3></div><div class="signup-thumb" data-v-51652350><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$8)} alt="image not found" data-v-51652350></div></div><form class="signup-form-wrapper" data-v-51652350><div class="signup-wrapper" data-v-51652350><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignInEmail)} type="text" placeholder="Email or Username" data-v-51652350></div><div class="signup-wrapper" data-v-51652350><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignInPass)} type="password" placeholder="Password" data-v-51652350></div>`);
  if ($data.SignInError) {
    _push(`<div class="my-20 text-center" data-v-51652350><p class="text-md text-danger" data-v-51652350>${serverRenderer.exports.ssrInterpolate($data.errorMessage)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.SignInEmailError) {
    _push(`<div class="my-20 text-center" data-v-51652350><p class="text-md text-danger" data-v-51652350>Please Enter Valid Email</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="sing-buttom mb-20" data-v-51652350><button type="submit" class="sing-btn w-100" data-v-51652350>Login</button></div><div class="registered wrapper" data-v-51652350><div class="not-register" data-v-51652350><span data-v-51652350>Not registered?</span><span data-v-51652350><a href="#" data-v-51652350>Sign up</a></span></div><div class="forget-password" data-v-51652350><a href="#" data-v-51652350>Forgot password?</a></div></div></form></div></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSignIn ? "offcanvas-overlay overlay-open" : "offcanvas-overlay"}`)}" data-v-51652350></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSignUp ? "signup-area open position-absolute" : "signup-area"}`)}" data-v-51652350><div class="sign-up-wrapper" data-v-51652350><div class="signup-box text-center" data-v-51652350><div class="signup-text" data-v-51652350><h3 data-v-51652350>Sign up</h3></div><div class="signup-message" data-v-51652350><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$8)} alt="image not found" data-v-51652350></div><div class="signup-thumb" data-v-51652350><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$8)} alt="image not found" data-v-51652350></div></div><form class="signup-form-wrapper" data-v-51652350><div class="signup-input-wrapper" data-v-51652350><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignUpData.FName)} type="text" placeholder="First Name" data-v-51652350><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignUpData.LName)} type="text" placeholder="Last Name" data-v-51652350></div><div class="signup-wrapper" data-v-51652350><label for="DOB" data-v-51652350>Date of Birth</label><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignUpData.DOB)} type="Date" name="DOB" data-v-51652350></div><div class="signup-wrapper" data-v-51652350><label data-v-51652350>Gender *</label><select class="form-select" required data-v-51652350><option value="" disabled selected data-v-51652350>Gender *</option><option value="Male" data-v-51652350>Male</option><option value="Female" data-v-51652350>Female</option></select></div><div class="signup-wrapper" data-v-51652350><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignUpData.Email)} type="text" placeholder="Email" data-v-51652350></div><div class="signup-wrapper" data-v-51652350><input required${serverRenderer.exports.ssrRenderAttr("value", $data.SignUpData.password)} type="password" placeholder="Password" data-v-51652350></div><div class="signup-wrapper" data-v-51652350><label data-v-51652350>Preffered Sport *</label><select class="form-select" required data-v-51652350><option value="" disabled selected data-v-51652350>Preffered Sports *</option><option value="Cricket" data-v-51652350>Cricket</option><option value="Football" data-v-51652350>Football</option><option value="Basketball" data-v-51652350>Basketball</option><option value="Hockey" data-v-51652350>Hockey</option><option value="Badminton" data-v-51652350>Badminton</option><option value="Other" data-v-51652350>Other</option></select></div><div class="signup-wrapper" data-v-51652350><label data-v-51652350>Preffered State *</label><select class="form-select" required data-v-51652350><option value="" disabled selected data-v-51652350>Preffered State *</option><option value="Andhra Pradesh" data-v-51652350>Andhra Pradesh</option><option value="Andaman and Nicobar Islands" data-v-51652350>Andaman and Nicobar Islands</option><option value="Arunachal Pradesh" data-v-51652350>Arunachal Pradesh</option><option value="Assam" data-v-51652350>Assam</option><option value="Bihar" data-v-51652350>Bihar</option><option value="Chandigarh" data-v-51652350>Chandigarh</option><option value="Chhattisgarh" data-v-51652350>Chhattisgarh</option><option value="Dadar and Nagar Haveli" data-v-51652350>Dadar and Nagar Haveli</option><option value="Daman and Diu" data-v-51652350>Daman and Diu</option><option value="Delhi" data-v-51652350>Delhi</option><option value="Lakshadweep" data-v-51652350>Lakshadweep</option><option value="Puducherry" data-v-51652350>Puducherry</option><option value="Goa" data-v-51652350>Goa</option><option value="Gujarat" data-v-51652350>Gujarat</option><option value="Haryana" data-v-51652350>Haryana</option><option value="Himachal Pradesh" data-v-51652350>Himachal Pradesh</option><option value="Jammu and Kashmir" data-v-51652350>Jammu and Kashmir</option><option value="Jharkhand" data-v-51652350>Jharkhand</option><option value="Karnataka" data-v-51652350>Karnataka</option><option value="Kerala" data-v-51652350>Kerala</option><option value="Madhya Pradesh" data-v-51652350>Madhya Pradesh</option><option value="Maharashtra" data-v-51652350>Maharashtra</option><option value="Manipur" data-v-51652350>Manipur</option><option value="Meghalaya" data-v-51652350>Meghalaya</option><option value="Mizoram" data-v-51652350>Mizoram</option><option value="Nagaland" data-v-51652350>Nagaland</option><option value="Odisha" data-v-51652350>Odisha</option><option value="Punjab" data-v-51652350>Punjab</option><option value="Rajasthan" data-v-51652350>Rajasthan</option><option value="Sikkim" data-v-51652350>Sikkim</option><option value="Tamil Nadu" data-v-51652350>Tamil Nadu</option><option value="Telangana" data-v-51652350>Telangana</option><option value="Tripura" data-v-51652350>Tripura</option><option value="Uttar Pradesh" data-v-51652350>Uttar Pradesh</option><option value="Uttarakhand" data-v-51652350>Uttarakhand</option><option value="West Bengal" data-v-51652350>West Bengal</option></select></div><div class="signup-action" data-v-51652350><div class="course-sidebar-list" data-v-51652350><input required class="signup-checkbo" type="checkbox" id="sing-up" data-v-51652350><label class="sign-check" for="sing-up" data-v-51652350><span data-v-51652350>Accept the terms and <a href="#" data-v-51652350>Privacy Policy</a></span></label></div></div>`);
  if ($data.SignUpError) {
    _push(`<div class="my-20 text-center" data-v-51652350><p class="text-md text-danger" data-v-51652350>${serverRenderer.exports.ssrInterpolate($data.errorMessage)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.SignUpEmailError) {
    _push(`<div class="my-20 text-center" data-v-51652350><p class="text-md text-danger" data-v-51652350>Please Enter Valid Email</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="sing-buttom mb-20" data-v-51652350><button type="submit" class="sing-btn w-100" data-v-51652350>Register now</button></div><div class="acount-login text-center" data-v-51652350><span data-v-51652350>Already have an account? <a href="#" data-v-51652350>Log in</a></span></div></form></div></div><div class="${serverRenderer.exports.ssrRenderClass(`${$data.showSignUp ? "offcanvas-overlay overlay-open" : "offcanvas-overlay"}`)}" data-v-51652350></div></div>`);
}
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Header.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const Header = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["ssrRender", _sfc_ssrRender$v], ["__scopeId", "data-v-51652350"]]);
const _sfc_main$z = {
  name: "UpcomingEventsDash",
  components: {},
  data() {
    return {
      getData: "",
      loaded: false,
      searchQuery: "",
      searchDate: "",
      searchLocation: ""
    };
  },
  mounted() {
    this.getApprovedEvent();
  },
  methods: {
    status(startDate, endDate) {
      const currentDate = new Date();
      var eventStartDate = new Date(startDate);
      var eventEndDate = new Date(endDate);
      console.log(eventStartDate);
      console.log(eventEndDate);
      console.log(currentDate);
      if (eventStartDate < currentDate) {
        return "Expired";
      } else if (eventStartDate <= currentDate && currentDate < eventEndDate) {
        return "In Progress";
      } else {
        return "Upcoming Soon";
      }
    },
    async getApprovedEvent() {
      var dataQuery = {
        $and: [
          { approvalStatus: "Approved" },
          { startDate: { $gt: new Date() } }
        ]
      };
      await axios.get("http://143.42.142.151:4000/events/getAllFiltered", {
        params: {
          dataQuery,
          page: 1,
          size: 5
        }
      }).then((res) => {
        console.log(res);
        this.getData = res.data.docs;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
      if (this.getData.length !== 0) {
        this.loaded = true;
      }
    },
    getDateFormat(dateValue) {
      var dateObj = new Date(dateValue);
      var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      return formattedDate;
    }
  }
};
function _sfc_ssrRender$u(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "event-ara pt-120 pb-90" }, _attrs))} data-v-b1ef12ce><div class="container" data-v-b1ef12ce><div class="row" data-v-b1ef12ce><div class="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-12 col-sm justify-content-center mb-30" data-v-b1ef12ce><div class="section-title mb-20 text-center" data-v-b1ef12ce><h2 data-v-b1ef12ce>Upcoming <span class="down-mark-line" data-v-b1ef12ce>Events</span></h2></div></div></div>`);
  if ($data.loaded) {
    _push(`<div class="row" data-v-b1ef12ce><div class="col-xl-8 col-lg-7" data-v-b1ef12ce><!--[-->`);
    serverRenderer.exports.ssrRenderList($data.getData.slice(0, 4), (data) => {
      _push(`<div class="single-item mb-30" data-v-b1ef12ce><div class="event_date f-left" data-v-b1ef12ce><div class="event_date_inner" data-v-b1ef12ce><h4 data-v-b1ef12ce>${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.startDate))}</h4><span data-v-b1ef12ce>${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.endDate))}</span></div></div><div class="event_info" data-v-b1ef12ce><h3 data-v-b1ef12ce>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(data.Name)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(data.Name), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</h3><div class="event-detalis d-flex align-items-center" data-v-b1ef12ce><div class="event-time mr-30 d-flex align-items-center" data-v-b1ef12ce><i class="flaticon-clock-1" data-v-b1ef12ce></i><span data-v-b1ef12ce>${serverRenderer.exports.ssrInterpolate(data.Time)}</span></div><div class="event-location d-flex align-items-centere" data-v-b1ef12ce><i class="flaticon-pin" data-v-b1ef12ce></i><span data-v-b1ef12ce>${serverRenderer.exports.ssrInterpolate(data.Location)}</span></div></div><div class="event-aduence d-flex align-items-center" data-v-b1ef12ce><div class="aduence-thumb" data-v-b1ef12ce><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$6)} alt="event-thumb" data-v-b1ef12ce><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$4)} alt="event-thumb" data-v-b1ef12ce><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$4)} alt="event-thumb" data-v-b1ef12ce><img${serverRenderer.exports.ssrRenderAttr("src", _imports_3$3)} alt="event-thumb" data-v-b1ef12ce><img${serverRenderer.exports.ssrRenderAttr("src", _imports_4$1)} alt="event-thumb" data-v-b1ef12ce></div></div></div><div class="get-ticket-btn" data-v-b1ef12ce>`);
      if ($options.status(data.startDate, data.endDate) == "Upcoming Soon") {
        _push(`<h4 class="text-success text-center pt-10 pb-10 mt-10" data-v-b1ef12ce>${serverRenderer.exports.ssrInterpolate($options.status(data.startDate, data.endDate))}</h4>`);
      } else if ($options.status(data.startDate, data.endDate) == "In Progress") {
        _push(`<h4 class="text-warning pt-10 mt-10" data-v-b1ef12ce>${serverRenderer.exports.ssrInterpolate($options.status(data.startDate, data.endDate))}</h4>`);
      } else {
        _push(`<h4 class="text-danger pt-10 mt-10" data-v-b1ef12ce>${serverRenderer.exports.ssrInterpolate($options.status(data.startDate, data.endDate))}</h4>`);
      }
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "get-btn mt-30",
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Show Details`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Show Details")
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div></div>`);
    });
    _push(`<!--]--></div><div class="col-xl-4 col-lg-5 col-md-8" data-v-b1ef12ce><div class="sidebar-widget-wrapper" data-v-b1ef12ce><div class="side-bar-widget mb-30" data-v-b1ef12ce><div class="event-sidebar" data-v-b1ef12ce><div class="find-event" data-v-b1ef12ce><div class="find-event-info" data-v-b1ef12ce><h4 data-v-b1ef12ce>Find Events</h4></div><div class="find-event-wrapper mb-25" data-v-b1ef12ce><div class="find-event-input" data-v-b1ef12ce><input${serverRenderer.exports.ssrRenderAttr("value", $data.searchDate)} type="date" data-v-b1ef12ce></div></div><div class="find-event-wrapper mb-25" data-v-b1ef12ce><div class="find-event-input" data-v-b1ef12ce><select class="find-event-select" data-v-b1ef12ce><option value="" selected data-v-b1ef12ce>All States</option><option value="Andhra Pradesh" data-v-b1ef12ce>Andhra Pradesh</option><option value="Andaman and Nicobar Islands" data-v-b1ef12ce>Andaman and Nicobar Islands</option><option value="Arunachal Pradesh" data-v-b1ef12ce>Arunachal Pradesh</option><option value="Assam" data-v-b1ef12ce>Assam</option><option value="Bihar" data-v-b1ef12ce>Bihar</option><option value="Chandigarh" data-v-b1ef12ce>Chandigarh</option><option value="Chhattisgarh" data-v-b1ef12ce>Chhattisgarh</option><option value="Dadar and Nagar Haveli" data-v-b1ef12ce>Dadar and Nagar Haveli</option><option value="Daman and Diu" data-v-b1ef12ce>Daman and Diu</option><option value="Delhi" data-v-b1ef12ce>Delhi</option><option value="Lakshadweep" data-v-b1ef12ce>Lakshadweep</option><option value="Puducherry" data-v-b1ef12ce>Puducherry</option><option value="Goa" data-v-b1ef12ce>Goa</option><option value="Gujarat" data-v-b1ef12ce>Gujarat</option><option value="Haryana" data-v-b1ef12ce>Haryana</option><option value="Himachal Pradesh" data-v-b1ef12ce>Himachal Pradesh</option><option value="Jammu and Kashmir" data-v-b1ef12ce>Jammu and Kashmir</option><option value="Jharkhand" data-v-b1ef12ce>Jharkhand</option><option value="Karnataka" data-v-b1ef12ce>Karnataka</option><option value="Kerala" data-v-b1ef12ce>Kerala</option><option value="Madhya Pradesh" data-v-b1ef12ce>Madhya Pradesh</option><option value="Maharashtra" data-v-b1ef12ce>Maharashtra</option><option value="Manipur" data-v-b1ef12ce>Manipur</option><option value="Meghalaya" data-v-b1ef12ce>Meghalaya</option><option value="Mizoram" data-v-b1ef12ce>Mizoram</option><option value="Nagaland" data-v-b1ef12ce>Nagaland</option><option value="Odisha" data-v-b1ef12ce>Odisha</option><option value="Punjab" data-v-b1ef12ce>Punjab</option><option value="Rajasthan" data-v-b1ef12ce>Rajasthan</option><option value="Sikkim" data-v-b1ef12ce>Sikkim</option><option value="Tamil Nadu" data-v-b1ef12ce>Tamil Nadu</option><option value="Telangana" data-v-b1ef12ce>Telangana</option><option value="Tripura" data-v-b1ef12ce>Tripura</option><option value="Uttar Pradesh" data-v-b1ef12ce>Uttar Pradesh</option><option value="Uttarakhand" data-v-b1ef12ce>Uttarakhand</option><option value="West Bengal" data-v-b1ef12ce>West Bengal</option></select><i class="flaticon-pin-1" data-v-b1ef12ce></i></div></div><div class="find-event-wrapper mb-25" data-v-b1ef12ce><div class="find-event-input" data-v-b1ef12ce><input${serverRenderer.exports.ssrRenderAttr("value", $data.searchQuery)} type="text" placeholder="Search keyword...." data-v-b1ef12ce><i class="flaticon-search" data-v-b1ef12ce></i></div></div></div><div class="zoom-btn" data-v-b1ef12ce>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      to: `/search/?find=${$data.searchQuery}&location=${$data.searchLocation}&date=${$data.searchDate}`,
      class: "event-btn"
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Find Event`);
        } else {
          return [
            vue_cjs_prod.createTextVNode("Find Event")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div></div></div></div></div></div>`);
  } else {
    _push(`<div class="row" data-v-b1ef12ce><h4 class="text-black" data-v-b1ef12ce>No Events Yet</h4></div>`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Event/UpcomingEventsDash.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const UpcomingEventsDash = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["ssrRender", _sfc_ssrRender$u], ["__scopeId", "data-v-b1ef12ce"]]);
const _sfc_main$y = {
  name: "app",
  scrollToTop: true,
  components: {
    HeroSectionVue,
    CategoriesSectionVue,
    CourseSection,
    StudentSection,
    FeatureSection,
    BrowseCourse,
    TestimonialSection,
    EducationSection,
    BrandSection,
    FooterOne,
    Header,
    UpcomingEventsDash
  },
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    this.loaded = true;
  }
};
function _sfc_ssrRender$t(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Header = vue_cjs_prod.resolveComponent("Header");
  const _component_HeroSectionVue = vue_cjs_prod.resolveComponent("HeroSectionVue");
  const _component_UpcomingEventsDash = vue_cjs_prod.resolveComponent("UpcomingEventsDash");
  const _component_CategoriesSectionVue = vue_cjs_prod.resolveComponent("CategoriesSectionVue");
  const _component_CourseSection = vue_cjs_prod.resolveComponent("CourseSection");
  const _component_FeatureSection = vue_cjs_prod.resolveComponent("FeatureSection");
  const _component_StudentSection = vue_cjs_prod.resolveComponent("StudentSection");
  const _component_TestimonialSection = vue_cjs_prod.resolveComponent("TestimonialSection");
  const _component_EducationSection = vue_cjs_prod.resolveComponent("EducationSection");
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_Header, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeroSectionVue, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_UpcomingEventsDash, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_CategoriesSectionVue, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_CourseSection, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_FeatureSection, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_StudentSection, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_TestimonialSection, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_EducationSection, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/HomeMain.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const HomeMainVue = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["ssrRender", _sfc_ssrRender$t]]);
const meta$7 = void 0;
const _sfc_main$x = {
  name: "app",
  mixins: [instructorProfilesMixin],
  components: {
    FooterOne,
    PageTitle,
    HeaderFour
  }
};
function _sfc_ssrRender$s(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
    pageTitle: "Instructor",
    pageSubTitle: "Instructor"
  }, null, _parent));
  _push(`<section class="member-area pt-125 pb-90"><div class="container"><div class="row"><!--[-->`);
  serverRenderer.exports.ssrRenderList(_ctx.instructorProfiless, (item) => {
    _push(`<div class="col-xl-3 col-lg-4 col-md-6"><div class="member-main-wrapper mb-30"><div class="member-body text-center"><div class="member-item"><div class="member-thumb">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      to: `/instructor-profile/${item.id}`
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", item.instructorImage)} alt="member-img"${_scopeId}>`);
        } else {
          return [
            vue_cjs_prod.createVNode("img", {
              src: item.instructorImage,
              alt: "member-img"
            }, null, 8, ["src"])
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div><div class="member-content"><h4>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      to: `/instructor-profile/${item.id}`
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${serverRenderer.exports.ssrInterpolate(item.instructorTitle)}`);
        } else {
          return [
            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.instructorTitle), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</h4><span>${serverRenderer.exports.ssrInterpolate(item.instructorDesignation)}</span></div><div class="member-social"><ul><li><a href="#"><i class="fab fa-facebook"></i></a></li><li><a href="#"><i class="fab fa-twitter"></i></a></li><li><a href="#"><i class="fab fa-vimeo-v"></i></a></li><li><a href="#"><i class="fab fa-linkedin"></i></a></li></ul></div></div></div><div class="member-meta"><div class="member-reating"><i class="fas fa-star"></i><span>${serverRenderer.exports.ssrInterpolate(item.instructorRating)}</span></div><div class="member-course"><i class="flaticon-computer"></i>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/course" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<span${_scopeId}>${serverRenderer.exports.ssrInterpolate(item.instructorCourse)}</span>`);
        } else {
          return [
            vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.instructorCourse), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div></div></div></div>`);
  });
  _push(`<!--]--></div></div></section>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Instructor/InstructorMain.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const __nuxt_component_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["ssrRender", _sfc_ssrRender$s]]);
const meta$6 = void 0;
const _sfc_main$w = {
  name: "PendingEvents",
  components: {
    FooterOne,
    PageTitle,
    HeaderFour,
    paginate: Pagination
  },
  data() {
    return {
      getData: "",
      loaded: false,
      Loading: true,
      eventDataReceived: false,
      pageCount: "",
      page: 1,
      size: 10,
      columns: [
        {
          title: "Event Name",
          field: "Name"
        },
        {
          field: "createdByFName",
          title: "Created By"
        },
        {
          field: "Sport",
          title: "Event Sport"
        },
        {
          field: "startDate",
          title: "Event Start Date"
        },
        {
          field: "endDate",
          title: "Event End Date"
        },
        {
          field: "approvalStatus",
          title: "Approval Status"
        }
      ],
      options: {
        search: true,
        showColumns: true
      }
    };
  },
  mounted() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
    }
    this.loaded = true;
    this.getEventData();
  },
  methods: {
    clickCallback: function() {
      this.getEventData();
    },
    ChangeNoRows() {
      this.perPage = this.NoOfRows;
    },
    async getEventData() {
      await axios.get("http://143.42.142.151:4000/events/getAllPending", {
        params: {
          page: this.page,
          size: this.size
        }
      }).then((res) => {
        console.log(res.data);
        this.getData = res.data.docs;
        this.pageCount = res.data.totalPages;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
      if (this.getData.length !== 0) {
        this.eventDataReceived = true;
      }
      this.Loading = false;
    },
    getDateFormat(dateValue) {
      var dateObj = new Date(dateValue);
      var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      return formattedDate;
    }
  },
  computed: {}
};
function _sfc_ssrRender$r(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_paginate = vue_cjs_prod.resolveComponent("paginate");
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
    pageTitle: "Events awaiting approval",
    pageSubTitle: "Pending Events"
  }, null, _parent));
  _push(`<div class="cart-area pt-100 pb-100"><div class="container"><div class="row"><div class="col-12"><div class="table-content table-responsive">`);
  if ($data.Loading) {
    _push(`<div> Loading </div>`);
  } else {
    _push(`<div><table class="table"><thead><tr><th class="product-thumbnail">#</th><th class="product-thumbnail">Event Name</th><th class="cart-product-name">Created By</th><th class="product-price">Sport</th><th class="product-quantity">Start Date</th><th class="product-subtotal">End Date</th><th class="product-subtotal">Approval Status</th><th class="product-remove">Details</th></tr></thead><tbody><!--[-->`);
    serverRenderer.exports.ssrRenderList($data.getData, (data) => {
      _push(`<tr><td>${serverRenderer.exports.ssrInterpolate(data.index + 1)}</td><td class="product-name">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(data.Name)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(data.Name), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</td><td class="product-name"><span>${serverRenderer.exports.ssrInterpolate(data.createdByFName)}</span></td><td class="product-subtotal"><span class="amount">${serverRenderer.exports.ssrInterpolate(data.Sport)}</span></td><td class="product-price"><span class="amount">${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.startDate))}</span></td><td class="product-price"><span class="amount">${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.endDate))}</span></td><td class="product-name"><span>${serverRenderer.exports.ssrInterpolate(data.approvalStatus)}</span></td><td class="product-quantity">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "edu-border-btn",
        to: `/event-details/${data.id}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Show Details`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("Show Details")
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</td></tr>`);
    });
    _push(`<!--]--></tbody></table><div class="mt-10">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_paginate, {
      modelValue: $data.page,
      "onUpdate:modelValue": ($event) => $data.page = $event,
      "page-count": $data.pageCount,
      "page-range": 3,
      "margin-pages": 2,
      "click-handler": $options.clickCallback,
      "prev-text": "Prev",
      "next-text": "Next",
      "container-class": "pagination justify-content-center",
      "page-class": "page-item"
    }, null, _parent));
    _push(`</div></div>`);
  }
  _push(`</div></div></div></div></div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Event/PendingEvents.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const PendingEvents = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["ssrRender", _sfc_ssrRender$r]]);
const meta$5 = void 0;
const _sfc_main$v = {
  name: "SearchEvents",
  components: {
    paginate: Pagination
  },
  data() {
    return {
      searchEventQuery: "",
      getData: "",
      loaded: false,
      noData: false,
      pageCount: "",
      page: 1,
      size: 10
    };
  },
  props: {
    searchQuery: {
      type: String,
      default: ""
    },
    searchLocation: {
      type: String,
      default: ""
    },
    searchDate: {
      type: String,
      default: ""
    }
  },
  mounted() {
    if (this.searchEventQuery === "") {
      this.searchEventQuery = this.searchQuery;
    }
    this.getSearchedEvents();
  },
  methods: {
    status(startDate, endDate) {
      const currentDate = new Date();
      var eventStartDate = new Date(startDate);
      var eventEndDate = new Date(endDate);
      if (eventEndDate < currentDate) {
        return "Expired";
      } else if (eventStartDate <= currentDate < eventEndDate) {
        return "In Progress";
      } else {
        return "Upcoming Soon";
      }
    },
    clickCallback: function() {
      this.getEventData();
    },
    async getSearchedEvents() {
      this.loaded = false;
      await axios.get("http://143.42.142.151:4000/events/searchEvents", {
        params: {
          searchQuery: this.searchEventQuery,
          searchLocation: this.searchLocation,
          searchDate: this.searchDate,
          page: this.page,
          size: this.size
        }
      }).then((res) => {
        console.log(res);
        this.getData = res.data.docs;
        this.pageCount = res.data.totalPages;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
      if (this.getData.length !== 0) {
        this.loaded = true;
      } else {
        this.loaded = true;
        this.noData = true;
      }
    },
    reSearch() {
      this.$router.replace({ path: "search", params: { find: this.searchEventQuery, location: this.searchLocation, date: this.searchDate } });
    },
    getDateFormat(dateValue) {
      var dateObj = new Date(dateValue);
      var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      return formattedDate;
    }
  }
};
function _sfc_ssrRender$q(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_paginate = vue_cjs_prod.resolveComponent("paginate");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "event-ara pt-120 pb-90" }, _attrs))} data-v-39ade474><div class="container" data-v-39ade474><div class="row" data-v-39ade474><div class="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-12 col-sm justify-content-center mb-30" data-v-39ade474><div class="section-title mb-20 text-center" data-v-39ade474><h2 data-v-39ade474>Find <span class="down-mark-line" data-v-39ade474>Events</span></h2></div></div></div><div class="row" data-v-39ade474><div class="col-xl-8 col-lg-7" data-v-39ade474>`);
  if ($data.loaded) {
    _push(`<div data-v-39ade474>`);
    if ($data.noData) {
      _push(`<div data-v-39ade474><h4 class="text-black" data-v-39ade474>No Events Found</h4></div>`);
    } else {
      _push(`<div data-v-39ade474><!--[-->`);
      serverRenderer.exports.ssrRenderList($data.getData, (data) => {
        _push(`<div class="single-item mb-30" data-v-39ade474><div class="event_date f-left" data-v-39ade474><div class="event_date_inner" data-v-39ade474><h4 data-v-39ade474>${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.startDate))}</h4><span data-v-39ade474>${serverRenderer.exports.ssrInterpolate($options.getDateFormat(data.endDate))}</span></div></div><div class="event_info" data-v-39ade474><h3 data-v-39ade474>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: `/event-details/${data.id}`
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer.exports.ssrInterpolate(data.Name)}`);
            } else {
              return [
                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(data.Name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</h3><div class="event-detalis d-flex align-items-center" data-v-39ade474><div class="event-time mr-30 d-flex align-items-center" data-v-39ade474><i class="flaticon-clock-1" data-v-39ade474></i><span data-v-39ade474>${serverRenderer.exports.ssrInterpolate(data.Time)}</span></div><div class="event-location d-flex align-items-centere" data-v-39ade474><i class="flaticon-pin" data-v-39ade474></i><span data-v-39ade474>${serverRenderer.exports.ssrInterpolate(data.Location)}</span></div></div><div class="event-aduence d-flex align-items-center" data-v-39ade474><div class="aduence-thumb" data-v-39ade474><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$6)} alt="event-thumb" data-v-39ade474><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$4)} alt="event-thumb" data-v-39ade474><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$4)} alt="event-thumb" data-v-39ade474><img${serverRenderer.exports.ssrRenderAttr("src", _imports_3$3)} alt="event-thumb" data-v-39ade474><img${serverRenderer.exports.ssrRenderAttr("src", _imports_4$1)} alt="event-thumb" data-v-39ade474></div></div></div><div class="get-ticket-btn" data-v-39ade474>`);
        if ($options.status(data.startDate, data.endDate) == "Upcoming Soon") {
          _push(`<h4 class="text-success text-center pt-10 pb-10 mt-10" data-v-39ade474>${serverRenderer.exports.ssrInterpolate($options.status(data.startDate, data.endDate))}</h4>`);
        } else if ($options.status(data.startDate, data.endDate) == "In Progress") {
          _push(`<h4 class="text-warning pt-10 mt-10" data-v-39ade474>${serverRenderer.exports.ssrInterpolate($options.status(data.startDate, data.endDate))}</h4>`);
        } else {
          _push(`<h4 class="text-danger pt-10 mt-10" data-v-39ade474>${serverRenderer.exports.ssrInterpolate($options.status(data.startDate, data.endDate))}</h4>`);
        }
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          class: "get-btn mt-30",
          to: `/event-details/${data.id}`
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Show Details`);
            } else {
              return [
                vue_cjs_prod.createTextVNode("Show Details")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--><div class="mt-10" data-v-39ade474>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_paginate, {
        modelValue: $data.page,
        "onUpdate:modelValue": ($event) => $data.page = $event,
        "page-count": $data.pageCount,
        "page-range": 3,
        "margin-pages": 2,
        "click-handler": $options.clickCallback,
        "prev-text": "Prev",
        "next-text": "Next",
        "container-class": "pagination justify-content-center",
        "page-class": "page-item"
      }, null, _parent));
      _push(`</div></div>`);
    }
    _push(`</div>`);
  } else {
    _push(`<div class="row" data-v-39ade474><div class="d-flex justify-content-center align-items-center" data-v-39ade474><div class="spinner-grow text-warning" role="status" data-v-39ade474><span class="sr-only" data-v-39ade474>Loading...</span></div></div></div>`);
  }
  _push(`</div><div class="col-xl-4 col-lg-5 col-md-8" data-v-39ade474><div class="sidebar-widget-wrapper" data-v-39ade474><div class="side-bar-widget mb-30" data-v-39ade474><div class="event-sidebar" data-v-39ade474><div class="find-event" data-v-39ade474><div class="find-event-info" data-v-39ade474><h4 data-v-39ade474>Find Events</h4></div><div class="find-event-wrapper mb-25" data-v-39ade474><div class="find-event-input" data-v-39ade474><input${serverRenderer.exports.ssrRenderAttr("value", $props.searchDate)} type="date" data-v-39ade474></div></div><div class="find-event-wrapper mb-25" data-v-39ade474><div class="find-event-input" data-v-39ade474><select class="find-event-select" data-v-39ade474><option value="" selected data-v-39ade474>All States</option><option value="Andhra Pradesh" data-v-39ade474>Andhra Pradesh</option><option value="Andaman and Nicobar Islands" data-v-39ade474>Andaman and Nicobar Islands</option><option value="Arunachal Pradesh" data-v-39ade474>Arunachal Pradesh</option><option value="Assam" data-v-39ade474>Assam</option><option value="Bihar" data-v-39ade474>Bihar</option><option value="Chandigarh" data-v-39ade474>Chandigarh</option><option value="Chhattisgarh" data-v-39ade474>Chhattisgarh</option><option value="Dadar and Nagar Haveli" data-v-39ade474>Dadar and Nagar Haveli</option><option value="Daman and Diu" data-v-39ade474>Daman and Diu</option><option value="Delhi" data-v-39ade474>Delhi</option><option value="Lakshadweep" data-v-39ade474>Lakshadweep</option><option value="Puducherry" data-v-39ade474>Puducherry</option><option value="Goa" data-v-39ade474>Goa</option><option value="Gujarat" data-v-39ade474>Gujarat</option><option value="Haryana" data-v-39ade474>Haryana</option><option value="Himachal Pradesh" data-v-39ade474>Himachal Pradesh</option><option value="Jammu and Kashmir" data-v-39ade474>Jammu and Kashmir</option><option value="Jharkhand" data-v-39ade474>Jharkhand</option><option value="Karnataka" data-v-39ade474>Karnataka</option><option value="Kerala" data-v-39ade474>Kerala</option><option value="Madhya Pradesh" data-v-39ade474>Madhya Pradesh</option><option value="Maharashtra" data-v-39ade474>Maharashtra</option><option value="Manipur" data-v-39ade474>Manipur</option><option value="Meghalaya" data-v-39ade474>Meghalaya</option><option value="Mizoram" data-v-39ade474>Mizoram</option><option value="Nagaland" data-v-39ade474>Nagaland</option><option value="Odisha" data-v-39ade474>Odisha</option><option value="Punjab" data-v-39ade474>Punjab</option><option value="Rajasthan" data-v-39ade474>Rajasthan</option><option value="Sikkim" data-v-39ade474>Sikkim</option><option value="Tamil Nadu" data-v-39ade474>Tamil Nadu</option><option value="Telangana" data-v-39ade474>Telangana</option><option value="Tripura" data-v-39ade474>Tripura</option><option value="Uttar Pradesh" data-v-39ade474>Uttar Pradesh</option><option value="Uttarakhand" data-v-39ade474>Uttarakhand</option><option value="West Bengal" data-v-39ade474>West Bengal</option></select><i class="flaticon-pin-1" data-v-39ade474></i></div></div><div class="find-event-wrapper mb-25" data-v-39ade474><div class="find-event-input" data-v-39ade474><input${serverRenderer.exports.ssrRenderAttr("value", $data.searchEventQuery)} type="text" placeholder="Search keyword...." data-v-39ade474><i class="flaticon-search" data-v-39ade474></i></div></div></div><div class="zoom-btn" data-v-39ade474>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { class: "event-btn" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Find Event`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Find Event")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div></div></div></div>`);
}
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FindEvent/SearchEvent.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const SearchEvent = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["ssrRender", _sfc_ssrRender$q], ["__scopeId", "data-v-39ade474"]]);
const _sfc_main$u = {
  name: "SearchEventMain",
  components: {
    FooterOne,
    PageTitle,
    HeaderFour,
    SearchEvent
  },
  props: {
    findQuery: {
      type: String,
      default: ""
    },
    filterLocation: {
      type: String,
      default: ""
    },
    filterdate: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loggedIn: false,
      loaded: false
    };
  },
  mounted() {
    if (localStorage.loggedIn) {
      this.loggedIn = localStorage.loggedIn;
    }
    this.loaded = true;
  }
};
function _sfc_ssrRender$p(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_PageTitle = vue_cjs_prod.resolveComponent("PageTitle");
  const _component_SearchEvent = vue_cjs_prod.resolveComponent("SearchEvent");
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_PageTitle, {
      pageTitle: "Find Event",
      pageSubTitle: "Find Event"
    }, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_SearchEvent, {
      searchQuery: $props.findQuery,
      searchDate: _ctx.filterDate,
      searchLocation: $props.filterLocation
    }, null, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FindEvent/SearchEventMain.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const SearchEventMain = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["ssrRender", _sfc_ssrRender$p]]);
const meta$4 = void 0;
const productItemsMixin = {
  data() {
    return {
      productItemss: [
        {
          id: 1,
          productImage: "/img/products/product-thumb-01.png",
          productTitle: "Turn Yourself",
          productPrice: "$24.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fal fa-star"
        },
        {
          id: 2,
          productImage: "/img/products/product-thumb-02.png",
          productTitle: "Art of Not Giving",
          productPrice: "$12.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fal fa-star",
          productRating5: "fal fa-star"
        },
        {
          id: 3,
          productImage: "/img/products/product-thumb-03.png",
          productTitle: "Attract Women",
          productPrice: "$24.00",
          productOldPrice: "$45.50",
          productOldPriceClass: "shop-old-price",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fal fa-star",
          productRating4: "fal fa-star",
          productRating5: "fal fa-star"
        },
        {
          id: 4,
          productImage: "/img/products/product-thumb-04.png",
          productTitle: "Think and Grow Rich",
          productPrice: "$16.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fal fa-star"
        },
        {
          id: 5,
          productImage: "/img/products/product-thumb-05.png",
          productTitle: "Best Inspirational",
          productPrice: "$22.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        },
        {
          id: 6,
          productImage: "/img/products/product-thumb-06.png",
          productTitle: "The Power of Evil",
          productPrice: "$17.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        },
        {
          id: 7,
          productImage: "/img/products/product-thumb-07.png",
          productTitle: "Practical Strees",
          productPrice: "$23.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        },
        {
          id: 8,
          productImage: "/img/products/product-thumb-08.png",
          productTitle: "Memoirs of a Geisha",
          productPrice: "$28.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        },
        {
          id: 9,
          productImage: "/img/products/product-thumb-09.png",
          productTitle: "Very First Sight",
          productPrice: "$25.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        },
        {
          id: 10,
          productImage: "/img/products/product-thumb-10.png",
          productTitle: "The Almanack",
          productPrice: "$19.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        },
        {
          id: 11,
          productImage: "/img/products/product-thumb-11.png",
          productTitle: "Wealth & Happiness",
          productPrice: "$24.00",
          productOldPrice: "$75.00",
          productOldPriceClass: "shop-old-price",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fal fa-star"
        },
        {
          id: 12,
          productImage: "/img/products/product-thumb-12.png",
          productTitle: "Rabbit drawing book",
          productPrice: "$23.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        },
        {
          id: 13,
          productImage: "/img/products/product-thumb-13.png",
          productTitle: "Time Management",
          productPrice: "$32.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        },
        {
          id: 14,
          productImage: "/img/products/product-thumb-14.png",
          productTitle: "Startup Dream",
          productPrice: "$29.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        },
        {
          id: 15,
          productImage: "/img/products/product-thumb-15.png",
          productTitle: "Positive Attitude",
          productPrice: "$75.00",
          productOldPrice: "$92.00",
          productOldPriceClass: "shop-old-price",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        },
        {
          id: 16,
          productImage: "/img/products/product-thumb-01.png",
          productTitle: "Options Handboo",
          productPrice: "$11.00",
          productOldPrice: "",
          productOldPriceClass: "shop-old-price d-none",
          productRating1: "fas fa-star",
          productRating2: "fas fa-star",
          productRating3: "fas fa-star",
          productRating4: "fas fa-star",
          productRating5: "fas fa-star"
        }
      ]
    };
  }
};
const _sfc_main$t = {
  name: "relatedProduct",
  mixins: [productItemsMixin],
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Autoplay]
    };
  }
};
function _sfc_ssrRender$o(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_client_only = __nuxt_component_0$4;
  const _component_swiper = vue_cjs_prod.resolveComponent("swiper");
  const _component_swiper_slide = vue_cjs_prod.resolveComponent("swiper-slide");
  const _component_NuxtLink = __nuxt_component_0$h;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "related_product pb-65" }, _attrs))}><div class="container custome-container"><div class="section-title mb-55"><h2>Related Product</h2></div><div class="swiper-container r-product-active"><div class="swiper-wrapper">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_client_only, null, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_swiper, {
          modules: $setup.modules,
          "slides-per-view": 1,
          loop: true,
          "space-between": 10,
          autoplay: { delay: 3500, disableOnInteraction: false },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 40
            },
            991: {
              slidesPerView: 3,
              spaceBetween: 40
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 40
            },
            1400: {
              slidesPerView: 5,
              spaceBetween: 40
            }
          }
        }, {
          default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              serverRenderer.exports.ssrRenderList(_ctx.productItemss.slice(0, 7), (item) => {
                _push3(serverRenderer.exports.ssrRenderComponent(_component_swiper_slide, {
                  key: item.id
                }, {
                  default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="product-items text-center"${_scopeId3}><div class="product-img"${_scopeId3}>`);
                      _push4(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                        to: `/shop-details/${item.id}`
                      }, {
                        default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<img${serverRenderer.exports.ssrRenderAttr("src", item.productImage)} alt="product-img"${_scopeId4}>`);
                          } else {
                            return [
                              vue_cjs_prod.createVNode("img", {
                                src: item.productImage,
                                alt: "product-img"
                              }, null, 8, ["src"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`<div class="shop-quick-view"${_scopeId3}><ul${_scopeId3}><li${_scopeId3}>`);
                      _push4(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/cart" }, {
                        default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<i class="fal fa-cart-arrow-down"${_scopeId4}></i>`);
                          } else {
                            return [
                              vue_cjs_prod.createVNode("i", { class: "fal fa-cart-arrow-down" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</li><li${_scopeId3}>`);
                      _push4(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/wishlist" }, {
                        default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<i class="fal fa-heart"${_scopeId4}></i>`);
                          } else {
                            return [
                              vue_cjs_prod.createVNode("i", { class: "fal fa-heart" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</li><li${_scopeId3}>`);
                      _push4(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/cart" }, {
                        default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<i class="fal fa-eye"${_scopeId4}></i>`);
                          } else {
                            return [
                              vue_cjs_prod.createVNode("i", { class: "fal fa-eye" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</li></ul></div></div><div class="product-content"${_scopeId3}><h4${_scopeId3}>`);
                      _push4(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                        to: `/shop-details/${item.id}`
                      }, {
                        default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`${serverRenderer.exports.ssrInterpolate(item.productTitle)}`);
                          } else {
                            return [
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.productTitle), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</h4><span${_scopeId3}>${serverRenderer.exports.ssrInterpolate(item.productPrice)}</span><del class="${serverRenderer.exports.ssrRenderClass(item.productOldPriceClass)}"${_scopeId3}>${serverRenderer.exports.ssrInterpolate(item.productOldPrice)}</del><div class="course-icon"${_scopeId3}><i class="${serverRenderer.exports.ssrRenderClass(item.productRating1)}"${_scopeId3}></i><i class="${serverRenderer.exports.ssrRenderClass(item.productRating2)}"${_scopeId3}></i><i class="${serverRenderer.exports.ssrRenderClass(item.productRating3)}"${_scopeId3}></i><i class="${serverRenderer.exports.ssrRenderClass(item.productRating4)}"${_scopeId3}></i><i class="${serverRenderer.exports.ssrRenderClass(item.productRating5)}"${_scopeId3}></i></div></div></div>`);
                    } else {
                      return [
                        vue_cjs_prod.createVNode("div", { class: "product-items text-center" }, [
                          vue_cjs_prod.createVNode("div", { class: "product-img" }, [
                            vue_cjs_prod.createVNode(_component_NuxtLink, {
                              to: `/shop-details/${item.id}`
                            }, {
                              default: vue_cjs_prod.withCtx(() => [
                                vue_cjs_prod.createVNode("img", {
                                  src: item.productImage,
                                  alt: "product-img"
                                }, null, 8, ["src"])
                              ]),
                              _: 2
                            }, 1032, ["to"]),
                            vue_cjs_prod.createVNode("div", { class: "shop-quick-view" }, [
                              vue_cjs_prod.createVNode("ul", null, [
                                vue_cjs_prod.createVNode("li", null, [
                                  vue_cjs_prod.createVNode(_component_NuxtLink, { to: "/cart" }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      vue_cjs_prod.createVNode("i", { class: "fal fa-cart-arrow-down" })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                vue_cjs_prod.createVNode("li", null, [
                                  vue_cjs_prod.createVNode(_component_NuxtLink, { to: "/wishlist" }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      vue_cjs_prod.createVNode("i", { class: "fal fa-heart" })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                vue_cjs_prod.createVNode("li", null, [
                                  vue_cjs_prod.createVNode(_component_NuxtLink, { to: "/cart" }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      vue_cjs_prod.createVNode("i", { class: "fal fa-eye" })
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ])
                          ]),
                          vue_cjs_prod.createVNode("div", { class: "product-content" }, [
                            vue_cjs_prod.createVNode("h4", null, [
                              vue_cjs_prod.createVNode(_component_NuxtLink, {
                                to: `/shop-details/${item.id}`
                              }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.productTitle), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"])
                            ]),
                            vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.productPrice), 1),
                            vue_cjs_prod.createVNode("del", {
                              class: item.productOldPriceClass
                            }, vue_cjs_prod.toDisplayString(item.productOldPrice), 3),
                            vue_cjs_prod.createVNode("div", { class: "course-icon" }, [
                              vue_cjs_prod.createVNode("i", {
                                class: item.productRating1
                              }, null, 2),
                              vue_cjs_prod.createVNode("i", {
                                class: item.productRating2
                              }, null, 2),
                              vue_cjs_prod.createVNode("i", {
                                class: item.productRating3
                              }, null, 2),
                              vue_cjs_prod.createVNode("i", {
                                class: item.productRating4
                              }, null, 2),
                              vue_cjs_prod.createVNode("i", {
                                class: item.productRating5
                              }, null, 2)
                            ])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(_ctx.productItemss.slice(0, 7), (item) => {
                  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_swiper_slide, {
                    key: item.id
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode("div", { class: "product-items text-center" }, [
                        vue_cjs_prod.createVNode("div", { class: "product-img" }, [
                          vue_cjs_prod.createVNode(_component_NuxtLink, {
                            to: `/shop-details/${item.id}`
                          }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode("img", {
                                src: item.productImage,
                                alt: "product-img"
                              }, null, 8, ["src"])
                            ]),
                            _: 2
                          }, 1032, ["to"]),
                          vue_cjs_prod.createVNode("div", { class: "shop-quick-view" }, [
                            vue_cjs_prod.createVNode("ul", null, [
                              vue_cjs_prod.createVNode("li", null, [
                                vue_cjs_prod.createVNode(_component_NuxtLink, { to: "/cart" }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode("i", { class: "fal fa-cart-arrow-down" })
                                  ]),
                                  _: 1
                                })
                              ]),
                              vue_cjs_prod.createVNode("li", null, [
                                vue_cjs_prod.createVNode(_component_NuxtLink, { to: "/wishlist" }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode("i", { class: "fal fa-heart" })
                                  ]),
                                  _: 1
                                })
                              ]),
                              vue_cjs_prod.createVNode("li", null, [
                                vue_cjs_prod.createVNode(_component_NuxtLink, { to: "/cart" }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode("i", { class: "fal fa-eye" })
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
                          ])
                        ]),
                        vue_cjs_prod.createVNode("div", { class: "product-content" }, [
                          vue_cjs_prod.createVNode("h4", null, [
                            vue_cjs_prod.createVNode(_component_NuxtLink, {
                              to: `/shop-details/${item.id}`
                            }, {
                              default: vue_cjs_prod.withCtx(() => [
                                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.productTitle), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]),
                          vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.productPrice), 1),
                          vue_cjs_prod.createVNode("del", {
                            class: item.productOldPriceClass
                          }, vue_cjs_prod.toDisplayString(item.productOldPrice), 3),
                          vue_cjs_prod.createVNode("div", { class: "course-icon" }, [
                            vue_cjs_prod.createVNode("i", {
                              class: item.productRating1
                            }, null, 2),
                            vue_cjs_prod.createVNode("i", {
                              class: item.productRating2
                            }, null, 2),
                            vue_cjs_prod.createVNode("i", {
                              class: item.productRating3
                            }, null, 2),
                            vue_cjs_prod.createVNode("i", {
                              class: item.productRating4
                            }, null, 2),
                            vue_cjs_prod.createVNode("i", {
                              class: item.productRating5
                            }, null, 2)
                          ])
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_swiper, {
            modules: $setup.modules,
            "slides-per-view": 1,
            loop: true,
            "space-between": 10,
            autoplay: { delay: 3500, disableOnInteraction: false },
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 40
              },
              991: {
                slidesPerView: 3,
                spaceBetween: 40
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 40
              },
              1400: {
                slidesPerView: 5,
                spaceBetween: 40
              }
            }
          }, {
            default: vue_cjs_prod.withCtx(() => [
              (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(_ctx.productItemss.slice(0, 7), (item) => {
                return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_swiper_slide, {
                  key: item.id
                }, {
                  default: vue_cjs_prod.withCtx(() => [
                    vue_cjs_prod.createVNode("div", { class: "product-items text-center" }, [
                      vue_cjs_prod.createVNode("div", { class: "product-img" }, [
                        vue_cjs_prod.createVNode(_component_NuxtLink, {
                          to: `/shop-details/${item.id}`
                        }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createVNode("img", {
                              src: item.productImage,
                              alt: "product-img"
                            }, null, 8, ["src"])
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        vue_cjs_prod.createVNode("div", { class: "shop-quick-view" }, [
                          vue_cjs_prod.createVNode("ul", null, [
                            vue_cjs_prod.createVNode("li", null, [
                              vue_cjs_prod.createVNode(_component_NuxtLink, { to: "/cart" }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createVNode("i", { class: "fal fa-cart-arrow-down" })
                                ]),
                                _: 1
                              })
                            ]),
                            vue_cjs_prod.createVNode("li", null, [
                              vue_cjs_prod.createVNode(_component_NuxtLink, { to: "/wishlist" }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createVNode("i", { class: "fal fa-heart" })
                                ]),
                                _: 1
                              })
                            ]),
                            vue_cjs_prod.createVNode("li", null, [
                              vue_cjs_prod.createVNode(_component_NuxtLink, { to: "/cart" }, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createVNode("i", { class: "fal fa-eye" })
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ])
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "product-content" }, [
                        vue_cjs_prod.createVNode("h4", null, [
                          vue_cjs_prod.createVNode(_component_NuxtLink, {
                            to: `/shop-details/${item.id}`
                          }, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.productTitle), 1)
                            ]),
                            _: 2
                          }, 1032, ["to"])
                        ]),
                        vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.productPrice), 1),
                        vue_cjs_prod.createVNode("del", {
                          class: item.productOldPriceClass
                        }, vue_cjs_prod.toDisplayString(item.productOldPrice), 3),
                        vue_cjs_prod.createVNode("div", { class: "course-icon" }, [
                          vue_cjs_prod.createVNode("i", {
                            class: item.productRating1
                          }, null, 2),
                          vue_cjs_prod.createVNode("i", {
                            class: item.productRating2
                          }, null, 2),
                          vue_cjs_prod.createVNode("i", {
                            class: item.productRating3
                          }, null, 2),
                          vue_cjs_prod.createVNode("i", {
                            class: item.productRating4
                          }, null, 2),
                          vue_cjs_prod.createVNode("i", {
                            class: item.productRating5
                          }, null, 2)
                        ])
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ]),
            _: 1
          }, 8, ["modules"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ShopDetails/RelatedSlider.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const RelatedSlider = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["ssrRender", _sfc_ssrRender$o]]);
const _imports_0$2 = publicAssetsURL(`img/course/course-reviews-1.png`);
const _imports_1 = publicAssetsURL(`img/course/course-reviews-2.png`);
const _imports_2 = publicAssetsURL(`img/course/course-reviews-3.png`);
const meta$3 = void 0;
const _imports_0$1 = publicAssetsURL(`img/products/product-thumb-10.png`);
const _sfc_main$s = {
  name: "app",
  mixins: [productItemsMixin],
  components: {
    FooterOne,
    HeaderFour,
    RelatedSlider
  },
  data() {
    return {
      value: 1
    };
  },
  methods: {
    handleIncreaseValue(value) {
      if (value === "valueOne") {
        this.value++;
      }
    },
    handleDecreaseValue(value) {
      if (value === "valueOne" && this.value > 0) {
        this.value--;
      }
    }
  }
};
function _sfc_ssrRender$n(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_RelatedSlider = vue_cjs_prod.resolveComponent("RelatedSlider");
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
  _push(`<div class="hero-arera course-item-height" style="${serverRenderer.exports.ssrRenderStyle({ backgroundImage: `url(/img/slider/course-slider.jpg)` })}"><div class="container"><div class="row"><div class="col-xl-12"><div class="hero-course-1-text"><h2>Shop details</h2></div><div class="course-title-breadcrumb"><nav><ol class="breadcrumb"><li class="breadcrumb-item">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="breadcrumb-item"><span>Shop details</span></li></ol></nav></div></div></div></div></div><div class="shop-details_area pt-120 pb-15"><div class="container custome-container"><div class="row"><div class="col-lg-4 col-md-12"><div class="product-details-img mb-30"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$1)} alt="product img"></div></div><div class="col-lg-6 col-md-12"><div class="product-side-info mb-30"><h4 class="product-name mb-10">The Almanack</h4><span class="product-price">$24.00</span><p>Matent maecenas nec massa viverra aci ute litora aliquam habitant proin commodo bibendum rutru habitant est magnis quisque aliquet congue vesti bulum suscipi erose tellus odio elite purus feugiat prim libero senes nisie gravia</p><div class="product-quantity-cart mb-25"><div class="product-quantity-form"><form action="#"><button class="cart-minus" type="button"><i class="far fa-minus"></i></button><input class="cart-input" type="text"${serverRenderer.exports.ssrRenderAttr("value", $data.value)}><button class="cart-plus" type="button"><i class="far fa-plus"></i></button></form></div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    to: "/cart",
    class: "edu-btn"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Add to Cart`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Add to Cart")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    to: "/wishlist",
    class: "edu-border-btn"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Add to Wishlist`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Add to Wishlist")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="product__details__tag tagcloud mt-25 mb-10"><span>Tags : </span>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/shop" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`App`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("App")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/shop" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Tips`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Tips")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/shop" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Design`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Design")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/shop" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Science`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Science")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div></div><div class="product_info-faq-area pb-95"><div class="container"><nav class="product-details-nav"><div class="nav nav-tabs" id="nav-tab" role="tablist"><a class="nav-item nav-link show active" id="nav-general-tab" data-bs-toggle="tab" href="#nav-general" role="tab" aria-selected="true">Description</a><a class="nav-item nav-link" id="nav-seller-tab" data-bs-toggle="tab" href="#nav-seller" role="tab" aria-selected="false">Reviews</a></div></nav><div class="tab-content product-details-content" id="nav-tabContent"><div class="tab-pane fade active show" id="nav-general" role="tabpanel"><div class="tabs-wrapper mt-35"><div class="product__details-des"><p>Very clean and organized with easy to follow tutorials, Exercises, and solutions. This course does start from the beginning with very little knowledge and gives a great overview of common tools used for data science and progresses into more complex concepts and ideas. This course is amazing..! I started this course as a beginner and learnt a lot. Instructors are great. Query handling can be improved.Overall very happy with the course.</p></div></div></div><div class="tab-pane fade" id="nav-seller" role="tabpanel"><div class="tabs-wrapper mt-35"><div class="course-review-item mb-30"><div class="course-reviews-img"><a href="#"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$2)} alt="image not found"></a></div><div class="course-review-list"><h5><a href="#">Sotapdi Kunda</a></h5><div class="course-start-icon"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><span>55 min ago</span></div><p>Very clean and organized with easy to follow tutorials, Exercises, and solutions. This course does start from the beginning with very little knowledge and gives a great overview of common tools used for data science and progresses into more complex concepts and ideas.</p></div></div><div class="course-review-item mb-30"><div class="course-reviews-img"><a href="#"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1)} alt="image not found"></a></div><div class="course-review-list"><h5><a href="#">Samantha</a></h5><div class="course-start-icon"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><span>45 min ago</span></div><p>The course is good at explaining very basic intuition of the concepts. It will get you scratching the surface so to say. where this course is unique is the implementation methods are so well defined Thank you to the team !.</p></div></div><div class="course-review-item mb-30"><div class="course-reviews-img"><a href="#"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2)} alt="image not found"></a></div><div class="course-review-list"><h5><a href="#">Michell Mariya</a></h5><div class="course-start-icon"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><span>30 min ago</span></div><p>This course is amazing..! I started this course as a beginner and learnt a lot. Instructors are great. Query handling can be improved.Overall very happy with the course.</p></div></div><div class="product__details-comment"><div class="comment-title mb-20"><h3>Add a review</h3><p>Your email address will not be published. Required fields are marked *</p></div><div class="comment-rating mb-20"><span>Overall ratings</span><ul><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fal fa-star"></i></a></li></ul></div><div class="comment-input-box mb-15"><form action="#"><div class="row"><div class="col-xxl-12"><textarea placeholder="Your review" class="comment-input comment-textarea mb-20"></textarea></div><div class="col-xxl-6"><div class="comment-input mb-20"><input type="text" placeholder="Your Name"></div></div><div class="col-xxl-6"><div class="comment-input mb-20"><input type="email" placeholder="Your Email"></div></div><div class="col-xxl-12"><div class="comment-submit"><button type="submit" class="edu-btn">Submit</button></div></div></div></form></div></div></div></div></div></div></div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_RelatedSlider, null, null, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ShopDetails/ShopDetailsMain.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["ssrRender", _sfc_ssrRender$n]]);
const meta$2 = void 0;
const zoomClassMixin = {
  data() {
    return {
      zoomClasss: [
        {
          id: 1,
          zoomImage: "/img/zoom/zoom-live-01.jpg",
          zoomTitle: "Startup Business Management Live Class",
          zoomDate: "Date : 10 Jan 2022",
          zoomLength: "Length : 2h 00m",
          zoomSchedule: "Schedule : 10 AM - 12 PM",
          zoomMeeting: "587dre42op02486d302"
        },
        {
          id: 2,
          zoomImage: "/img/zoom/zoom-live-02.jpg",
          zoomTitle: "WordPress Theme Development Live Class",
          zoomDate: "Date : 11 Jan 2022",
          zoomLength: "Length : 3h 45m",
          zoomSchedule: "Schedule : 9 AM - 12:45 PM",
          zoomMeeting: "587dre42op02486uhg02"
        },
        {
          id: 3,
          zoomImage: "/img/zoom/zoom-live-03.jpg",
          zoomTitle: "Write Better Emails: Tactics for Smarter Team Live Classs",
          zoomDate: "Date : 12 Jan 2022",
          zoomLength: "Length : 2h 45m",
          zoomSchedule: "Schedule : 11 AM - 12:45 PM",
          zoomMeeting: "587dre654op02486d302"
        },
        {
          id: 4,
          zoomImage: "/img/zoom/zoom-live-04.jpg",
          zoomTitle: "Self Entrepreneurship Essentials Live Class",
          zoomDate: "Date : 20 Jan 2022",
          zoomLength: "Length : 1h 45m",
          zoomSchedule: "Schedule : 09 AM - 10:45 PM",
          zoomMeeting: "587dre42op01596d302"
        },
        {
          id: 5,
          zoomImage: "/img/zoom/zoom-live-05.jpg",
          zoomTitle: "Python and Django Full Stack Bootcamp Live Class",
          zoomDate: "Date : 25 Jan 2022",
          zoomLength: "Length : 3h 45m",
          zoomSchedule: "Schedule : 09 AM - 12:45 PM",
          zoomMeeting: "587dre42oe02324d302"
        }
      ]
    };
  }
};
const meta$1 = void 0;
const _imports_0 = publicAssetsURL(`img/zoom/zoom-main-thumb.jpg`);
const _sfc_main$r = {
  name: "app",
  mixins: [zoomClassMixin],
  components: {
    FooterOne,
    HeaderFour
  }
};
function _sfc_ssrRender$m(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
  _push(`<div class="hero-arera course-item-height" style="${serverRenderer.exports.ssrRenderStyle({ backgroundImage: `url(/img/slider/course-slider.jpg)` })}"><div class="container"><div class="row"><div class="col-xl-12"><div class="hero-course-1-text"><h2>Startup Business Management Live Class</h2></div><div class="course-title-breadcrumb"><nav><ol class="breadcrumb"><li class="breadcrumb-item">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="breadcrumb-item"><span>Startup Business Management Live Classn</span></li></ol></nav></div></div></div></div></div><div class="zoom-class-detalis-area pt-120 pb-85"><div class="container"><div class="row"><div class="col-xl-8 col-lg-7"><div class="zoom-main-thumb w-img mb-30"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0)} alt="zoom-tumb"></div><div class="zoom-main-content"><div class="content-main-heading"><a class="category-color category-color-3" href="#">Business</a><h2 class="d-none">Startup Business Management Live Class</h2></div><div class="contents-widget"><h4>Introduction</h4><p>There are so many websites out there that have not considered the overall usability of their visually impaired users. When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind.</p></div><div class="contents-widget"><h4>Objective:</h4><div class="objective-list"><ul><li>Exercise</li><li>Case Study</li><li>Role Play/ Simulation</li><li>Lecture Discussion and </li><li>Sharing/ Participatory</li></ul></div></div><div class="contents-widget mb-30"><h4>Contents of Class:</h4><ul><li>HR Audit: Concept</li><li>Objectives &amp; Purpose of Audit</li><li>Principles of Effective HR Auditing</li><li>Principles of Effective HR Auditing</li><li>Knowledge, Skills &amp; Attitude of an HR Auditor</li><li>Tasks of an HR Auditor</li><li>Types of HR Audit</li><li>HR Audit Tools</li><li>Steps/ Stages of HR Audit</li><li>Techniques of Auditing</li><li>Method of HR Audit</li><li>Documents for HR Audit</li><li>HR Audit Check List</li><li>Specific Task during HR Audit</li><li>HR Audit Report Preparation</li></ul></div></div></div><div class="col-xl-4 col-lg-5"><div class="sidebar-widget-wrapper"><div class="sidebar-widget mb-30"><div class="sidebar-widget-details"><div class="zoom-widget-tittle"><h4>Details</h4></div><div class="zoom-widget-list"><ul><li><div class="widget-detalis"><i class="flaticon-avatar"></i><span>Hosted by</span></div><div class="widget-list"><span>Junior Lucy</span></div></li><li><div class="widget-detalis"><i class="flaticon-calendar"></i><span>Date</span></div><div class="widget-list"><span>10 Jan 2022</span></div></li><li><div class="widget-detalis"><i class="flaticon-clock"></i><span>Schedule</span></div><div class="widget-list"><span>10 AM - 12 PM</span></div></li><li><div class="widget-detalis"><i class="flaticon-video-marketing"></i><span>Length</span></div><div class="widget-list"><span>2h 10m</span></div></li><li><div class="widget-detalis"><i class="flaticon-menu-2"></i><span>Category</span></div><div class="widget-list"><span>Data Science</span></div></li><li><div class="widget-detalis"><i class="flaticon-earth-grid-select-language-button"></i><span>Laguage</span></div><div class="widget-list"><span>English</span></div></li><li><div class="widget-detalis"><i class="flaticon-bookmark-white"></i><span>Hosted by</span></div><div class="widget-list"><span>Via Zoom</span></div></li></ul></div><div class="zoom-btn">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    class: "event-btn",
    to: "/zoom-class-details"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="flaticon-video-camera"${_scopeId}></i>Join this class`);
      } else {
        return [
          vue_cjs_prod.createVNode("i", { class: "flaticon-video-camera" }),
          vue_cjs_prod.createTextVNode("Join this class")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div></div></div></div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ZoomClassDetails/zoomClassDetailsMain.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["ssrRender", _sfc_ssrRender$m]]);
const meta = void 0;
const routes = [
  {
    name: "404-page",
    path: "/404-page",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/404-page.vue",
    children: [],
    meta: meta$k,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return _404Page$1;
    })
  },
  {
    name: "Dashboard-id",
    path: "/Dashboard/:id",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/Dashboard/[id].vue",
    children: [],
    meta: meta$j,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return _id_$b;
    })
  },
  {
    name: "Dashboard",
    path: "/Dashboard",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/Dashboard/index.vue",
    children: [],
    meta: meta$i,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return index$9;
    })
  },
  {
    name: "about",
    path: "/about",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/about.vue",
    children: [],
    meta: meta$h,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return about$1;
    })
  },
  {
    name: "add-event",
    path: "/add-event",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/add-event.vue",
    children: [],
    meta: meta$g,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return addEvent$1;
    })
  },
  {
    name: "admin",
    path: "/admin",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/admin.vue",
    children: [],
    meta: meta$f,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return admin$1;
    })
  },
  {
    name: "blog-details-id",
    path: "/blog-details/:id",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/blog-details/[id].vue",
    children: [],
    meta: meta$e,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return _id_$9;
    })
  },
  {
    name: "blog-details",
    path: "/blog-details",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/blog-details/index.vue",
    children: [],
    meta: meta$d,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return index$7;
    })
  },
  {
    name: "contact",
    path: "/contact",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/contact.vue",
    children: [],
    meta: meta$c,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return contact$1;
    })
  },
  {
    name: "edit-event-id",
    path: "/edit-event/:id",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/edit-event/[id].vue",
    children: [],
    meta: meta$b,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return _id_$7;
    })
  },
  {
    name: "event-details-id",
    path: "/event-details/:id",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/event-details/[id].vue",
    children: [],
    meta: meta$a,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return _id_$5;
    })
  },
  {
    name: "event",
    path: "/event",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/event.vue",
    children: [],
    meta: meta$9,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return event$1;
    })
  },
  {
    name: "expired",
    path: "/expired",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/expired.vue",
    children: [],
    meta: meta$8,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return expired$1;
    })
  },
  {
    name: "index",
    path: "/",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/index.vue",
    children: [],
    meta: meta$7,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return index$5;
    })
  },
  {
    name: "instructor",
    path: "/instructor",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/instructor.vue",
    children: [],
    meta: meta$6,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return instructor$1;
    })
  },
  {
    name: "pending",
    path: "/pending",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/pending.vue",
    children: [],
    meta: meta$5,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return pending$1;
    })
  },
  {
    name: "search",
    path: "/search",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/search.vue",
    children: [],
    meta: meta$4,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return search$1;
    })
  },
  {
    name: "shop-details-id",
    path: "/shop-details/:id",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/shop-details/[id].vue",
    children: [],
    meta: meta$3,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return _id_$3;
    })
  },
  {
    name: "shop-details",
    path: "/shop-details",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/shop-details/index.vue",
    children: [],
    meta: meta$2,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return index$3;
    })
  },
  {
    name: "zoom-class-details-id",
    path: "/zoom-class-details/:id",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/zoom-class-details/[id].vue",
    children: [],
    meta: meta$1,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return _id_$1;
    })
  },
  {
    name: "zoom-class-details",
    path: "/zoom-class-details",
    file: "/home/sunny/projects/nuxt-eduman-package/frontend/pages/zoom-class-details/index.vue",
    children: [],
    meta,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return index$1;
    })
  }
];
const configRouterOptions = {};
const routerOptions = __spreadValues({}, configRouterOptions);
const RouteGlobal = defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== from.path && false) {
    window.scrollTo(0, 0);
  }
});
const globalMiddleware = [
  RouteGlobal
];
const namedMiddleware = {};
const _df50cec4 = defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  const baseURL2 = useRuntimeConfig().app.baseURL;
  const routerHistory = vueRouter_cjs_prod.createMemoryHistory(baseURL2);
  const initialURL = nuxtApp.ssrContext.url;
  const router = vueRouter_cjs_prod.createRouter(__spreadProps(__spreadValues({}, routerOptions), {
    history: routerHistory,
    routes
  }));
  nuxtApp.vueApp.use(router);
  const previousRoute = vue_cjs_prod.shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const route = {};
  for (const key in router.currentRoute.value) {
    route[key] = vue_cjs_prod.computed(() => router.currentRoute.value[key]);
  }
  const _activeRoute = vue_cjs_prod.shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _activeRoute.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a, _b, _c, _d;
    if (((_b = (_a = to.matched[0]) == null ? void 0 : _a.components) == null ? void 0 : _b.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
      syncCurrentRoute();
    }
  });
  const activeRoute = {};
  for (const key in _activeRoute.value) {
    activeRoute[key] = vue_cjs_prod.computed(() => _activeRoute.value[key]);
  }
  nuxtApp._route = vue_cjs_prod.reactive(route);
  nuxtApp._activeRoute = vue_cjs_prod.reactive(activeRoute);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  router.afterEach(async (to) => {
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, throwError, [createError({
        statusCode: 404,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.res.statusCode = 404;
    }
  });
  try {
    if (true) {
      await router.push(initialURL);
    }
    await router.isReady();
  } catch (error2) {
    callWithNuxt(nuxtApp, throwError, [error2]);
  }
  router.beforeEach(async (to, from) => {
    var _a;
    to.meta = vue_cjs_prod.reactive(to.meta);
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a = namedMiddleware[entry2]) == null ? void 0 : _a.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, throwError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace(__spreadProps(__spreadValues({}, router.resolve(initialURL)), {
        force: true
      }));
    } catch (error2) {
      callWithNuxt(nuxtApp, throwError, [error2]);
    }
  });
  return { provide: { router } };
});
const _plugins = [
  preload,
  componentsPlugin_1c46d626,
  vueuseHead_429d0d1c,
  _699c5566,
  _df50cec4
];
const _sfc_main$q = {
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: String,
      default: "404"
    },
    statusMessage: {
      type: String,
      default: "Not Found"
    },
    description: {
      type: String,
      default: "Sorry, the page you are looking for could not be found."
    },
    backHome: {
      type: String,
      default: "Go back home"
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p{margin:0}h1{font-size:inherit;font-weight:inherit}`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$h;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, _attrs))} data-v-011aae6d><div class="fixed left-0 right-0 spotlight z-10" data-v-011aae6d></div><div class="max-w-520px text-center z-20" data-v-011aae6d><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-011aae6d>${serverRenderer.exports.ssrInterpolate(__props.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-011aae6d>${serverRenderer.exports.ssrInterpolate(__props.description)}</p><div class="w-full flex items-center justify-center" data-v-011aae6d>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(__props.backHome)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.backHome), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-templates/dist/templates/error-404.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const Error404 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-011aae6d"]]);
const _sfc_main$p = {
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: String,
      default: "500"
    },
    statusMessage: {
      type: String,
      default: "Server error"
    },
    description: {
      type: String,
      default: "This page is temporarily unavailable."
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p{margin:0}h1{font-size:inherit;font-weight:inherit}`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, _attrs))} data-v-6aee6495><div class="fixed -bottom-1/2 left-0 right-0 h-1/2 spotlight" data-v-6aee6495></div><div class="max-w-520px text-center" data-v-6aee6495><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-6aee6495>${serverRenderer.exports.ssrInterpolate(__props.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-6aee6495>${serverRenderer.exports.ssrInterpolate(__props.description)}</p></div></div>`);
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-templates/dist/templates/error-500.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const Error500 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-6aee6495"]]);
const _sfc_main$n = {
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    var _a;
    const props = __props;
    const error = props.error;
    (error.stack || "").split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
    const statusCode = String(error.statusCode || 500);
    const is404 = statusCode === "404";
    const statusMessage = (_a = error.statusMessage) != null ? _a : is404 ? "Page Not Found" : "Internal Server Error";
    const description = error.message || error.toString();
    const stack = void 0;
    const ErrorTemplate = is404 ? Error404 : Error500;
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ErrorTemplate), vue_cjs_prod.mergeProps({ statusCode: vue_cjs_prod.unref(statusCode), statusMessage: vue_cjs_prod.unref(statusMessage), description: vue_cjs_prod.unref(description), stack: vue_cjs_prod.unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = {
  __ssrInlineRender: true,
  setup(__props) {
    const nuxtApp = useNuxtApp();
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    vue_cjs_prod.onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, throwError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = vue_cjs_prod.resolveComponent("App");
      serverRenderer.exports.ssrRenderSuspense(_push, {
        default: () => {
          if (vue_cjs_prod.unref(error)) {
            _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(_sfc_main$n), { error: vue_cjs_prod.unref(error) }, null, _parent));
          } else {
            _push(serverRenderer.exports.ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const layouts = {};
const defaultLayoutTransition = { name: "layout", mode: "out-in" };
const __nuxt_component_0 = vue_cjs_prod.defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const route = useRoute();
    return () => {
      var _a, _b, _c;
      const layout = (_b = (_a = vue_cjs_prod.isRef(props.name) ? props.name.value : props.name) != null ? _a : route.meta.layout) != null ? _b : "default";
      const hasLayout = layout && layout in layouts;
      return _wrapIf(vue_cjs_prod.Transition, hasLayout && ((_c = route.meta.layoutTransition) != null ? _c : defaultLayoutTransition), _wrapIf(layouts[layout], hasLayout, context.slots)).default();
    };
  }
});
const _sfc_main$l = {
  head() {
    return {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js"
        }
      ]
    };
  }
};
function _sfc_ssrRender$l(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = vue_cjs_prod.resolveComponent("NuxtPage");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLayout, null, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$l]]);
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext = {}) {
    const vueApp = vue_cjs_prod.createApp(_sfc_main$m);
    vueApp.component("App", AppComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      ssrContext.error = ssrContext.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);
const _sfc_main$k = {
  name: "contact",
  components: {
    ErrorPageMain: __nuxt_component_0$g
  }
};
function _sfc_ssrRender$k(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ErrorPageMain = __nuxt_component_0$g;
  _push(serverRenderer.exports.ssrRenderComponent(_component_ErrorPageMain, _attrs, null, _parent));
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/404-page.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _404Page = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["ssrRender", _sfc_ssrRender$k]]);
const _404Page$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _404Page
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = {
  name: "App",
  mixins: [
    instructorProfilesMixin,
    courseItemsMixin
  ],
  data() {
    return {
      id: this.$route.params.id,
      instructorProfiles: {}
    };
  },
  methods: {
    getinstructorProfiles(instructorProfilesId) {
      this.instructorProfiles = this.instructorProfiless.find((item) => item.id == instructorProfilesId);
    }
  },
  created() {
    this.getinstructorProfiles(this.id);
  },
  components: { FooterOne, Pagination, HeaderFour }
};
function _sfc_ssrRender$j(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_Pagination = vue_cjs_prod.resolveComponent("Pagination");
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
  _push(`<div class="hero-arera course-item-height" style="${serverRenderer.exports.ssrRenderStyle({ backgroundImage: `url(/img/slider/course-slider.jpg)` })}"><div class="container"><div class="row"><div class="col-xl-12"><div class="hero-course-1-text"><h2>Instructor</h2></div><div class="course-title-breadcrumb"><nav><ol class="breadcrumb"><li class="breadcrumb-item">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="breadcrumb-item"><span>Instructor</span></li><li class="breadcrumb-item active" aria-current="page">${serverRenderer.exports.ssrInterpolate($data.instructorProfiles.instructorTitle)}</li></ol></nav></div></div></div></div></div><div class="course-detalies-area pt-120 pb-100"><div class="container"><div class="row"><div class="col-xl-3 col-lg-3"><div class="course-instructors-img mb-30"><img${serverRenderer.exports.ssrRenderAttr("src", $data.instructorProfiles.instructorImage)} alt="instructors-img"></div></div><div class="col-xl-8 col-lg-9"><div class="course-detelies-wrapper"><div class="course-detiles-tittle mb-30"><h3>${serverRenderer.exports.ssrInterpolate($data.instructorProfiles.instructorTitle)}</h3><span>${serverRenderer.exports.ssrInterpolate($data.instructorProfiles.instructorDesignation)}</span></div><div class="course-detiles-meta"><div class="total-course"><span>Total Courses</span><label>${serverRenderer.exports.ssrInterpolate($data.instructorProfiles.instructorCourse)}</label></div><div class="student course"><span>Students</span><label>5,230</label></div><div class="review-course"><span>Review</span><div class="review-course-inner d-flex"><ul><li><a href="#"><i class="fas fa-star"></i></a></li></ul><p>${serverRenderer.exports.ssrInterpolate($data.instructorProfiles.instructorRating)}</p></div></div><div class="course-details-action"><div class="course-follow"><a href="javascript:void(0)" class="edu-follow-btn">Follow</a></div><div class="course-share"><a href="#" class="share-btn"><i class="far fa-share-alt"></i></a></div></div></div><div class="course-bio-text pt-45 pb-20"><h3>Biography</h3><p>David Allberto is a Software Developer and Instructor having enjoyed his courses to date. He is the creator of Codexpand, a place of learning and growth to help people move into and be successful within the Helping Industry. One of Graham&#39;s key driving forces is to remove the barriers to the Helping Industry by producing high quality, accredited courses at affordable prices.</p></div><div class="my-course-info"><h3>My Courses</h3></div><div class="row pb-30"><!--[-->`);
  serverRenderer.exports.ssrRenderList(_ctx.academicCourseItemss.slice(0, 4), (item) => {
    _push(`<div class="col-xl-6 col-lg-6 col-md-6"><div class="academic-box mb-30"><div class="academic-thumb"><img${serverRenderer.exports.ssrRenderAttr("src", item.courseImage)} alt="course-img"></div><div class="academic-content"><div class="academic-content-header">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/course-details" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<h3${_scopeId}>${serverRenderer.exports.ssrInterpolate(item.title)}</h3>`);
        } else {
          return [
            vue_cjs_prod.createVNode("h3", null, vue_cjs_prod.toDisplayString(item.title), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div><div class="academic-body"><div class="academic-tutor d-flex align-items-center">`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/instructor-profile" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", item.instructorImage)} alt="tutor-img"${_scopeId}>`);
        } else {
          return [
            vue_cjs_prod.createVNode("img", {
              src: item.instructorImage,
              alt: "tutor-img"
            }, null, 8, ["src"])
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/instructor-profile" }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<span${_scopeId}>${serverRenderer.exports.ssrInterpolate(item.instructor)}</span>`);
        } else {
          return [
            vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.instructor), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div><p>${serverRenderer.exports.ssrInterpolate(item.description)}</p></div><div class="academic-footer"><div class="coursee-clock"><i class="flaticon-clock"></i><span>${serverRenderer.exports.ssrInterpolate(item.year)}</span></div><div class="course-creadit"><i class="flaticon-menu-1"></i><span>${serverRenderer.exports.ssrInterpolate(item.credit)}</span></div>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
      class: "edo-course-sec-btn",
      to: "/course-details"
    }, {
      default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${serverRenderer.exports.ssrInterpolate(item.btn)}`);
        } else {
          return [
            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.btn), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div></div></div></div>`);
  });
  _push(`<!--]--></div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_Pagination, null, null, _parent));
  _push(`</div></div></div></div></div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Dashboard/[id].vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _id_$a = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["ssrRender", _sfc_ssrRender$j]]);
const _id_$b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _id_$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = {
  name: "UserProfile",
  components: {
    UserProfileMain: __nuxt_component_0$f
  },
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    return;
  }
};
function _sfc_ssrRender$i(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UserProfileMain = __nuxt_component_0$f;
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_UserProfileMain, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Dashboard/index.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const index$8 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$i]]);
const index$9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": index$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = {
  name: "about",
  components: {
    AboutMain: __nuxt_component_0$d
  }
};
function _sfc_ssrRender$h(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AboutMain = __nuxt_component_0$d;
  _push(serverRenderer.exports.ssrRenderComponent(_component_AboutMain, _attrs, null, _parent));
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$h]]);
const about$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": about
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = {
  name: "addEvent",
  components: {
    AddEventMain: __nuxt_component_0$c
  },
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    return;
  }
};
function _sfc_ssrRender$g(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AddEventMain = __nuxt_component_0$c;
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_AddEventMain, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/add-event.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const addEvent = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$g]]);
const addEvent$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": addEvent
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = {
  name: "admin",
  components: {
    AdminMain: __nuxt_component_0$a
  },
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    return;
  }
};
function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AdminMain = __nuxt_component_0$a;
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_AdminMain, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$f]]);
const admin$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": admin
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = {
  name: "App",
  mixins: [blogItemsMixin],
  data() {
    return {
      id: this.$route.params.id,
      blogItems: {}
    };
  },
  methods: {
    getblogItems(blogItemsId) {
      this.blogItems = this.blogItemss.find((item) => item.id == blogItemsId);
    }
  },
  created() {
    this.getblogItems(this.id);
  },
  components: { FooterOne, HeaderFour }
};
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_BlogSidebar = __nuxt_component_1;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
  _push(`<div class="hero-arera course-item-height" style="${serverRenderer.exports.ssrRenderStyle({ backgroundImage: `url(/img/slider/course-slider.jpg)` })}"><div class="container"><div class="row"><div class="col-xl-12"><div class="hero-course-1-text"><h2>${serverRenderer.exports.ssrInterpolate($data.blogItems.blogTitle)}</h2></div><div class="course-title-breadcrumb"><nav><ol class="breadcrumb"><li class="breadcrumb-item">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="breadcrumb-item"><span>${serverRenderer.exports.ssrInterpolate($data.blogItems.blogTitle)}</span></li></ol></nav></div></div></div></div></div><div class="blog-area pt-120 pb-90"><div class="container"><div class="row"><div class="col-xl-8 col-lg-12"><div class="blog-main-wrapper mb-0"><div class="row"><div class="col-xl-12 col-lg-12 col-md-12"><div class="blog-wrapper position-relative blog-details-wrapper mb-30"><div class="blog-thumb"><img${serverRenderer.exports.ssrRenderAttr("src", $data.blogItems.blogImage)} alt="blog-img"></div><div class="blog-tag"><i class="fal fa-folder-open"></i>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${serverRenderer.exports.ssrInterpolate($data.blogItems.blogTag)}`);
      } else {
        return [
          vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($data.blogItems.blogTag), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="blog-content-wrapper"><div class="blog-meta"><div class="blog-date"><i class="flaticon-calendar"></i><span>${serverRenderer.exports.ssrInterpolate($data.blogItems.blogDate)}</span></div><div class="blog-user"><i class="flaticon-avatar"></i><span>${serverRenderer.exports.ssrInterpolate($data.blogItems.blogUser)}</span></div></div><div class="blog-content"><p>${serverRenderer.exports.ssrInterpolate($data.blogItems.blogDesc)}</p><p> The participants will get general ideas of the land management system of business. Everyone must work, but for many of us that job isn\u2019t just a paycheck, it\u2019s an opportunity to express ourselves and make something better. Entrepreneurs and go-getters often feel as if they carry the weight of an entire organization on their backs, and therefore could always use a little extra motivation.</p><blockquote><p>Tosser argy-bargy mush loo at public school Elizabeth up the duff buggered chinwag on your bike mate don\u2019t get shirty with me super, Jeffrey bobby Richard cheesed off spend a penny a load of old tosh blag horse.</p><p class="mb-0"><cite>Eduman</cite></p></blockquote><p>Cheeky bugger cracking goal starkers lemon squeezy lost the plot pardon me no biggie the BBC burke gosh boot so I said wellies, zonked a load of old tosh bodge barmy skive off he legged it morish spend a penny my good sir wind up hunky-dory. Naff grub elizabeth cheesed off don\u2019t get shirty with me arse over tit mush a blinding shot young delinquent bloke boot blatant.</p><p><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$9)} alt="img"></p><h4 class="mb-20">Typography is the powerful element you will ever need</h4><p>The participants will get general ideas of the land management system of business. Everyone must work, but for many of us that job isn\u2019t just a paycheck, it\u2019s an opportunity to express ourselves and make something better. Entrepreneurs and go-getters often feel as if they carry the weight of an entire organization on their backs, and therefore could always use a little extra motivation.</p><p>When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind. There are so many websites out there that have not considered the overall usability of their visually impaired users.</p><div class="blog__details__tag tagcloud"><span>Post Tags : </span><a href="#">Class</a><a href="#">Course</a><a href="#">Design</a><a href="#">Science</a></div></div></div><div class="latest-comments mb-50 mt-50"><h3>3 Comments</h3><ul><li><div class="comments-box"><div class="comments-info d-flex"><div class="comments-avatar mr-20"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$5)} alt=""></div><div class="avatar-name"><h5>Eleanor Fant</h5><span class="post-meta"> July 14, 2022</span></div></div><div class="comments-text ml-65"><p>So I said lurgy dropped a clanger Jeffrey bugger cuppa gosh David blatant have it, standard A bit of how&#39;s your father my lady absolutely.</p><div class="comments-replay"><a href="#">Reply</a></div></div></div></li><li class="children"><div class="comments-box"><div class="comments-info d-flex"><div class="comments-avatar mr-20"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$5)} alt=""></div><div class="avatar-name"><h5>Dominic</h5><span class="post-meta">April 16, 2022 </span></div></div><div class="comments-text ml-65"><p>David blatant have it, standard A bit of how&#39;s your father my lady absolutely.</p><div class="comments-replay"><a href="#">Reply</a></div></div></div><ul><li class="children-2"><div class="comments-box"><div class="comments-info d-flex"><div class="comments-avatar mr-20"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_3$4)} alt=""></div><div class="avatar-name"><h5>Von Rails</h5><span class="post-meta">April 18, 2022 </span></div></div><div class="comments-text ml-65"><p>He nicked it get stuffed mate spend a penny plastered.!</p><div class="comments-replay"><a href="#">Reply</a></div></div></div></li></ul></li></ul><ul><li><div class="comments-box"><div class="comments-info d-flex"><div class="comments-avatar mr-20"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$5)} alt=""></div><div class="avatar-name"><h5>Eleanor Fant</h5><span class="post-meta"> July 14, 2022</span></div></div><div class="comments-text ml-65"><p>So I said lurgy dropped a clanger Jeffrey bugger cuppa gosh David blatant have it, standard A bit of how&#39;s your father my lady absolutely.</p><div class="comments-replay"><a href="#">Reply</a></div></div></div></li><li class="children"><div class="comments-box"><div class="comments-info d-flex"><div class="comments-avatar mr-20"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$5)} alt=""></div><div class="avatar-name"><h5>Dominic</h5><span class="post-meta">April 16, 2022 </span></div></div><div class="comments-text ml-65"><p>David blatant have it, standard A bit of how&#39;s your father my lady absolutely.</p><div class="comments-replay"><a href="#">Reply</a></div></div></div></li></ul></div><div class="blog__comment"><h3>Leave a Comment</h3><form action="#"><div class="row"><div class="col-xxl-6 col-xl-6 col-lg-6"><div class="blog__comment-input"><input type="text" placeholder="Your Name"></div></div><div class="col-xxl-6 col-xl-6 col-lg-6"><div class="blog__comment-input"><input type="email" placeholder="Your Email"></div></div><div class="col-xxl-12"><div class="blog__comment-input"><input type="text" placeholder="Website"></div></div><div class="col-xxl-12"><div class="blog__comment-input"><textarea placeholder="Enter your comment ..."></textarea></div></div><div class="col-xxl-12"><div class="blog__comment-agree d-flex align-items-center mb-20"><input class="e-check-input" type="checkbox" id="e-agree"><label class="e-check-label" for="e-agree">Save my name, email, and website in this browser for the next time I comment.</label></div></div><div class="col-xxl-12"><div class="blog__comment-btn"><button type="submit" class="edu-btn">Post Comment</button></div></div></div></form></div></div></div></div></div></div><div class="col-xl-4 col-lg-8 col-md-8">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_BlogSidebar, null, null, _parent));
  _push(`</div></div></div></div></div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog-details/[id].vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _id_$8 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$e]]);
const _id_$9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _id_$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = {
  name: "blogDetails",
  components: {
    BlogDetailsMain: __nuxt_component_0$9
  }
};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_BlogDetailsMain = __nuxt_component_0$9;
  _push(serverRenderer.exports.ssrRenderComponent(_component_BlogDetailsMain, _attrs, null, _parent));
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog-details/index.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const index$6 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$d]]);
const index$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": index$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = {
  name: "contact",
  components: {
    ContactMain: __nuxt_component_0$7
  }
};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ContactMain = __nuxt_component_0$7;
  _push(serverRenderer.exports.ssrRenderComponent(_component_ContactMain, _attrs, null, _parent));
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$c]]);
const contact$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": contact
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = {
  name: "app",
  components: {
    EditEvent
  },
  data() {
    return {
      id: this.$route.params.id
    };
  }
};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_EditEvent = vue_cjs_prod.resolveComponent("EditEvent");
  _push(serverRenderer.exports.ssrRenderComponent(_component_EditEvent, vue_cjs_prod.mergeProps({ eventId: $data.id }, _attrs), null, _parent));
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/edit-event/[id].vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _id_$6 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$b]]);
const _id_$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _id_$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  name: "app",
  components: {
    EventDetailsMain: __nuxt_component_0$6
  },
  data() {
    return {
      id: this.$route.params.id
    };
  }
};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_EventDetailsMain = __nuxt_component_0$6;
  _push(serverRenderer.exports.ssrRenderComponent(_component_EventDetailsMain, vue_cjs_prod.mergeProps({ eventId: $data.id }, _attrs), null, _parent));
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/event-details/[id].vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _id_$4 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$a]]);
const _id_$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _id_$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {
  name: "event",
  components: {
    EventMain: __nuxt_component_0$5
  }
};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_EventMain = __nuxt_component_0$5;
  _push(serverRenderer.exports.ssrRenderComponent(_component_EventMain, _attrs, null, _parent));
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/event.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const event = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$9]]);
const event$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": event
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {
  name: "event",
  components: {
    ExpiredEventMain
  }
};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ExpiredEventMain = vue_cjs_prod.resolveComponent("ExpiredEventMain");
  _push(serverRenderer.exports.ssrRenderComponent(_component_ExpiredEventMain, _attrs, null, _parent));
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/expired.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const expired = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8]]);
const expired$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": expired
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  name: "home",
  components: {
    HomeMainVue
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HomeMainVue = vue_cjs_prod.resolveComponent("HomeMainVue");
  _push(serverRenderer.exports.ssrRenderComponent(_component_HomeMainVue, _attrs, null, _parent));
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const index$4 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7]]);
const index$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": index$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  name: "instructor",
  components: {
    InstructorMain: __nuxt_component_0$3
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_InstructorMain = __nuxt_component_0$3;
  _push(serverRenderer.exports.ssrRenderComponent(_component_InstructorMain, _attrs, null, _parent));
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/instructor.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const instructor = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6]]);
const instructor$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": instructor
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {
  name: "pending",
  components: {
    PendingEvents
  },
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    return;
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_PendingEvents = vue_cjs_prod.resolveComponent("PendingEvents");
  if ($data.loaded) {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
    _push(serverRenderer.exports.ssrRenderComponent(_component_PendingEvents, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "d-flex min-vh-100 min-vw-100 justify-content-center" }, _attrs))}><div class="d-flex justify-content-center align-items-center"><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div></div></div>`);
  }
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pending.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const pending = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5]]);
const pending$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": pending
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  name: "app",
  components: {
    SearchEventMain
  },
  data() {
    return {
      query: this.$route.query.find,
      location: this.$route.query.location,
      date: this.$route.query.date
    };
  },
  mounted() {
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SearchEventMain = vue_cjs_prod.resolveComponent("SearchEventMain");
  _push(serverRenderer.exports.ssrRenderComponent(_component_SearchEventMain, vue_cjs_prod.mergeProps({
    findQuery: $data.query,
    filterLocation: $data.location,
    filterDate: $data.date
  }, _attrs), null, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const search = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const search$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": search
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  name: "app",
  mixins: [productItemsMixin],
  components: {
    FooterOne,
    RelatedSlider,
    HeaderFour
  },
  data() {
    return {
      value: 1,
      id: this.$route.params.id,
      productItems: {}
    };
  },
  methods: {
    handleIncreaseValue(value) {
      if (value === "valueOne") {
        this.value++;
      }
    },
    handleDecreaseValue(value) {
      if (value === "valueOne" && this.value > 0) {
        this.value--;
      }
    },
    getproductItems(productItemsId) {
      this.productItems = this.productItemss.find((item) => item.id == productItemsId);
    }
  },
  created() {
    this.getproductItems(this.id);
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_RelatedSlider = vue_cjs_prod.resolveComponent("RelatedSlider");
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
  _push(`<div class="hero-arera course-item-height" style="${serverRenderer.exports.ssrRenderStyle({ backgroundImage: `url(/img/slider/course-slider.jpg)` })}"><div class="container"><div class="row"><div class="col-xl-12"><div class="hero-course-1-text"><h2>${serverRenderer.exports.ssrInterpolate($data.productItems.productTitle)}</h2></div><div class="course-title-breadcrumb"><nav><ol class="breadcrumb"><li class="breadcrumb-item">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="breadcrumb-item"><span>${serverRenderer.exports.ssrInterpolate($data.productItems.productTitle)}</span></li></ol></nav></div></div></div></div></div><div class="shop-details_area pt-120 pb-15"><div class="container custome-container"><div class="row"><div class="col-lg-4 col-md-12"><div class="product-details-img mb-30"><img${serverRenderer.exports.ssrRenderAttr("src", $data.productItems.productImage)} alt="product img"></div></div><div class="col-lg-6 col-md-12"><div class="product-side-info mb-30"><h4 class="product-name mb-10">${serverRenderer.exports.ssrInterpolate($data.productItems.productTitle)}</h4><span class="product-price">${serverRenderer.exports.ssrInterpolate($data.productItems.productPrice)}</span><p>Matent maecenas nec massa viverra aci ute litora aliquam habitant proin commodo bibendum rutru habitant est magnis quisque aliquet congue vesti bulum suscipi erose tellus odio elite purus feugiat prim libero senes nisie gravia</p><div class="product-quantity-cart mb-25"><div class="product-quantity-form"><form action="#"><button class="cart-minus" type="button"><i class="far fa-minus"></i></button><input class="cart-input" type="text"${serverRenderer.exports.ssrRenderAttr("value", $data.value)}><button class="cart-plus" type="button"><i class="far fa-plus"></i></button></form></div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    to: "/cart",
    class: "edu-btn"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Add to Cart`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Add to Cart")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    to: "/wishlist",
    class: "edu-border-btn"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Add to Wishlist`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Add to Wishlist")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="product__details__tag tagcloud mt-25 mb-10"><span>Tags : </span>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/shop" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`App`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("App")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/shop" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Tips`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Tips")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/shop" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Design`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Design")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/shop" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Science`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Science")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div></div><div class="product_info-faq-area pb-95"><div class="container"><nav class="product-details-nav"><div class="nav nav-tabs" id="nav-tab" role="tablist"><a class="nav-item nav-link show active" id="nav-general-tab" data-bs-toggle="tab" href="#nav-general" role="tab" aria-selected="true">Description</a><a class="nav-item nav-link" id="nav-seller-tab" data-bs-toggle="tab" href="#nav-seller" role="tab" aria-selected="false">Reviews</a></div></nav><div class="tab-content product-details-content" id="nav-tabContent"><div class="tab-pane fade active show" id="nav-general" role="tabpanel"><div class="tabs-wrapper mt-35"><div class="product__details-des"><p>Very clean and organized with easy to follow tutorials, Exercises, and solutions. This course does start from the beginning with very little knowledge and gives a great overview of common tools used for data science and progresses into more complex concepts and ideas. This course is amazing..! I started this course as a beginner and learnt a lot. Instructors are great. Query handling can be improved.Overall very happy with the course.</p></div></div></div><div class="tab-pane fade" id="nav-seller" role="tabpanel"><div class="tabs-wrapper mt-35"><div class="course-review-item mb-30"><div class="course-reviews-img"><a href="#"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$2)} alt="image not found"></a></div><div class="course-review-list"><h5><a href="#">Sotapdi Kunda</a></h5><div class="course-start-icon"><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating1)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating2)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating3)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating4)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating5)}"></i><span>55 min ago</span></div><p>Very clean and organized with easy to follow tutorials, Exercises, and solutions.This course does start from the beginning with very little knowledge and gives a great overview of common tools used for data science and progresses into more complex concepts and ideas.</p></div></div><div class="course-review-item mb-30"><div class="course-reviews-img"><a href="#"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1)} alt="image not found"></a></div><div class="course-review-list"><h5><a href="#">Samantha</a></h5><div class="course-start-icon"><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating1)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating2)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating3)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating4)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating5)}"></i><span>45 min ago</span></div><p>The course is good at explaining very basic intuition of the concepts. It will get you scratching the surface so to say. where this course is unique is the implementation methods are so well defined Thank you to the team !.</p></div></div><div class="course-review-item mb-30"><div class="course-reviews-img"><a href="#"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2)} alt="image not found"></a></div><div class="course-review-list"><h5><a href="#">Michell Mariya</a></h5><div class="course-start-icon"><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating1)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating2)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating3)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating4)}"></i><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating5)}"></i><span>30 min ago</span></div><p>This course is amazing..! I started this course as a beginner and learnt a lot. Instructors are great. Query handling can be improved.Overall very happy with the course.</p></div></div><div class="product__details-comment"><div class="comment-title mb-20"><h3>Add a review</h3><p>Your email address will not be published. Required fields are marked *</p></div><div class="comment-rating mb-20"><span>Overall ratings</span><ul><li><a href="#"><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating1)}"></i></a></li><li><a href="#"><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating2)}"></i></a></li><li><a href="#"><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating3)}"></i></a></li><li><a href="#"><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating4)}"></i></a></li><li><a href="#"><i class="${serverRenderer.exports.ssrRenderClass($data.productItems.productRating5)}"></i></a></li></ul></div><div class="comment-input-box mb-15"><form action="#"><div class="row"><div class="col-xxl-12"><textarea placeholder="Your review" class="comment-input comment-textarea mb-20"></textarea></div><div class="col-xxl-6"><div class="comment-input mb-20"><input type="text" placeholder="Your Name"></div></div><div class="col-xxl-6"><div class="comment-input mb-20"><input type="email" placeholder="Your Email"></div></div><div class="col-xxl-12"><div class="comment-submit"><button type="submit" class="edu-btn">Submit</button></div></div></div></form></div></div></div></div></div></div></div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_RelatedSlider, null, null, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop-details/[id].vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _id_$2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _id_$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _id_$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  name: "shopDetails",
  components: {
    ShopDetailsMain: __nuxt_component_0$2
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ShopDetailsMain = __nuxt_component_0$2;
  _push(serverRenderer.exports.ssrRenderComponent(_component_ShopDetailsMain, _attrs, null, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop-details/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const index$2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const index$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": index$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  name: "App",
  mixins: [zoomClassMixin],
  data() {
    return {
      id: this.$route.params.id,
      zoomClass: {}
    };
  },
  methods: {
    getzoomClass(zoomClassId) {
      this.zoomClass = this.zoomClasss.find((item) => item.id == zoomClassId);
    }
  },
  created() {
    this.getzoomClass(this.id);
  },
  components: { FooterOne, HeaderFour }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderFour = vue_cjs_prod.resolveComponent("HeaderFour");
  const _component_NuxtLink = __nuxt_component_0$h;
  const _component_FooterOne = vue_cjs_prod.resolveComponent("FooterOne");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_HeaderFour, null, null, _parent));
  _push(`<div class="hero-arera course-item-height" style="${serverRenderer.exports.ssrRenderStyle({ backgroundImage: `url(/img/slider/course-slider.jpg)` })}"><div class="container"><div class="row"><div class="col-xl-12"><div class="hero-course-1-text"><h2>${serverRenderer.exports.ssrInterpolate($data.zoomClass.zoomTitle)}</h2></div><div class="course-title-breadcrumb"><nav><ol class="breadcrumb"><li class="breadcrumb-item">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          vue_cjs_prod.createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="breadcrumb-item"><span>${serverRenderer.exports.ssrInterpolate($data.zoomClass.zoomTitle)}</span></li></ol></nav></div></div></div></div></div><div class="zoom-class-detalis-area pt-120 pb-85"><div class="container"><div class="row"><div class="col-xl-8 col-lg-7"><div class="zoom-main-thumb w-img mb-30"><img${serverRenderer.exports.ssrRenderAttr("src", $data.zoomClass.zoomImage)} alt="zoom-tumb"></div><div class="zoom-main-content"><div class="content-main-heading"><a class="category-color category-color-3" href="#">Business</a><h2 class="d-none">${serverRenderer.exports.ssrInterpolate($data.zoomClass.zoomTitle)}</h2></div><div class="contents-widget"><h4>Introduction</h4><p>There are so many websites out there that have not considered the overall usability of their visually impaired users. When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind.</p></div><div class="contents-widget"><h4>Objective:</h4><div class="objective-list"><ul><li>Exercise</li><li>Case Study</li><li>Role Play/ Simulation</li><li>Lecture Discussion and </li><li>Sharing/ Participatory</li></ul></div></div><div class="contents-widget mb-30"><h4>Contents of Class:</h4><ul><li>HR Audit: Concept</li><li>Objectives &amp; Purpose of Audit</li><li>Principles of Effective HR Auditing</li><li>Principles of Effective HR Auditing</li><li>Knowledge, Skills &amp; Attitude of an HR Auditor</li><li>Tasks of an HR Auditor</li><li>Types of HR Audit</li><li>HR Audit Tools</li><li>Steps/ Stages of HR Audit</li><li>Techniques of Auditing</li><li>Method of HR Audit</li><li>Documents for HR Audit</li><li>HR Audit Check List</li><li>Specific Task during HR Audit</li><li>HR Audit Report Preparation</li></ul></div></div></div><div class="col-xl-4 col-lg-5"><div class="sidebar-widget-wrapper"><div class="sidebar-widget mb-30"><div class="sidebar-widget-details"><div class="zoom-widget-tittle"><h4>Details</h4></div><div class="zoom-widget-list"><ul><li><div class="widget-detalis"><i class="flaticon-avatar"></i><span>Hosted by</span></div><div class="widget-list"><span>Junior Lucy</span></div></li><li><div class="widget-detalis"><i class="flaticon-calendar"></i><span>Date</span></div><div class="widget-list"><span>10 Jan 2022</span></div></li><li><div class="widget-detalis"><i class="flaticon-clock"></i><span>Schedule</span></div><div class="widget-list"><span>10 AM - 12 PM</span></div></li><li><div class="widget-detalis"><i class="flaticon-video-marketing"></i><span>Length</span></div><div class="widget-list"><span>2h 10m</span></div></li><li><div class="widget-detalis"><i class="flaticon-menu-2"></i><span>Category</span></div><div class="widget-list"><span>Data Science</span></div></li><li><div class="widget-detalis"><i class="flaticon-earth-grid-select-language-button"></i><span>Laguage</span></div><div class="widget-list"><span>English</span></div></li><li><div class="widget-detalis"><i class="flaticon-bookmark-white"></i><span>Hosted by</span></div><div class="widget-list"><span>Via Zoom</span></div></li></ul></div><div class="zoom-btn">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
    class: "event-btn",
    to: "/zoom-class-details"
  }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="flaticon-video-camera"${_scopeId}></i>Join this class`);
      } else {
        return [
          vue_cjs_prod.createVNode("i", { class: "flaticon-video-camera" }),
          vue_cjs_prod.createTextVNode("Join this class")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div></div></div></div>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_FooterOne, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/zoom-class-details/[id].vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _id_$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _id_
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  name: "zoomClassDetails",
  components: {
    zoomClassDetailsMain: __nuxt_component_0$1
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_zoomClassDetailsMain = __nuxt_component_0$1;
  _push(serverRenderer.exports.ssrRenderComponent(_component_zoomClassDetailsMain, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/zoom-class-details/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": index
}, Symbol.toStringTag, { value: "Module" }));

export { entry$1 as default };
//# sourceMappingURL=server.mjs.map
