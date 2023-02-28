import * as React from 'react';
import React__default, { createContext, useState, useEffect, useContext, useMemo, useReducer, useRef, Children } from 'react';

/* @ts-ignore */

var ErrorOccurrenceContext = createContext();

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop$3() {// No operation performed.
}

var noop_1 = noop$3;

var IgnitionConfigContext = createContext({
  /* @ts-ignore */
  ignitionConfig: {},
  setIgnitionConfig: noop_1
});

var a = () => {
  let [s, i] = React.useState(() => {
    if (typeof window.matchMedia != "function") return "no-preference";
    let r = window.matchMedia("(prefers-color-scheme: dark)"),
        e = window.matchMedia("(prefers-color-scheme: light)");
    return r.matches ? "dark" : e.matches ? "light" : "no-preference";
  });
  return React.useEffect(() => {
    if (typeof window.matchMedia != "function") return;
    let r = window.matchMedia("(prefers-color-scheme: dark)"),
        e = window.matchMedia("(prefers-color-scheme: light)");

    if (typeof e.addEventListener == "function") {
      let t = ({
        matches: o
      }) => {
        o && i("dark");
      },
          c = ({
        matches: o
      }) => {
        o && i("light");
      };

      return r.addEventListener("change", t), e.addEventListener("change", c), () => {
        r.removeEventListener("change", t), e.removeEventListener("change", c);
      };
    }

    if (typeof e.addListener == "function") {
      let t = () => i(r.matches ? "dark" : e.matches ? "light" : "no-preference");

      return r.addListener(t), e.addListener(t), () => {
        r.removeListener(t), e.removeListener(t);
      };
    }
  }, []), s;
},
    d$2 = a;

function IgnitionConfigContextProvider({
  children,
  ignitionConfig: initialIgnitionConfig
}) {
  const [ignitionConfig, setIgnitionConfig] = useState(initialIgnitionConfig);
  const scheme = d$2();
  const theme = ignitionConfig.theme === 'auto' ? scheme !== 'no-preference' ? scheme : 'light' : ignitionConfig.theme;
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'auto');
    document.documentElement.classList.add(theme);
  }, [theme]);
  return React__default.createElement(IgnitionConfigContext.Provider, {
    value: {
      ignitionConfig,
      setIgnitionConfig,
      theme
    }
  }, children);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = _freeGlobal || freeSelf || Function('return this')();
var _root = root;

/** Built-in value references. */

var Symbol$1 = _root.Symbol;
var _Symbol = Symbol$1;

/** Used for built-in method references. */

var objectProto$e = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$b = objectProto$e.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$1 = objectProto$e.toString;
/** Built-in value references. */

var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty$b.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }

  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$d = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto$d.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */

var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? _getRawTag(value) : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */

var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = _baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */

var coreJsData = _root['__core-js_shared__'];
var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString$1 = funcProto$1.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto$c = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty$a = objectProto$c.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty$a).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }

  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */

function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

var defineProperty = function () {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

var _defineProperty$3 = defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty$3) {
    _defineProperty$3(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];

      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }

    return object;
  };
}

var _createBaseFor = createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */

var baseFor = _createBaseFor();
var _baseFor = baseFor;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */

var argsTag$2 = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag$2;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */

var objectProto$b = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return isObjectLike_1(value) && hasOwnProperty$9.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
};
var isArguments_1 = isArguments;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
var isArray_1 = isArray;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1$1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Built-in value references. */

  var Buffer = moduleExports ? _root.Buffer : undefined;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */

  var isBuffer = nativeIsBuffer || stubFalse_1;
  module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */

var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag = '[object Function]',
    mapTag$3 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$3 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag$1 = '[object WeakMap]';
var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$3] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$3] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Detect free variable `process` from Node.js. */

  var freeProcess = moduleExports && _freeGlobal.process;
  /** Used to access faster Node.js helpers. */

  var nodeUtil = function () {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      } // Legacy `process.binding('util')` for Node.js < 10.


      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();

  module.exports = nodeUtil;
});

/* Node.js helper references. */

var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */

var objectProto$a = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1$1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$8.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    _isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$9;
  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeKeys = _overArg(Object.keys, Object);
var _nativeKeys = nativeKeys;

/** Used for built-in method references. */

var objectProto$8 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */

function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */

function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */

function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}

var _baseForOwn = baseForOwn;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */

var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */

function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */

function stackClear() {
  this.__data__ = new _ListCache();
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/* Built-in method references that are verified to be native. */

var Map$1 = _getNative(_root, 'Map');
var _Map = Map$1;

/* Built-in method references that are verified to be native. */

var nativeCreate = _getNative(Object, 'create');
var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */

function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto$7 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }

  return hasOwnProperty$6.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */

var objectProto$6 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== undefined : hasOwnProperty$5.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */

function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash(),
    'map': new (_Map || _ListCache)(),
    'string': new _Hash()
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */

function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */

function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */

var LARGE_ARRAY_SIZE$1 = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof _ListCache) {
    var pairs = data.__data__;

    if (!_Map || pairs.length < LARGE_ARRAY_SIZE$1 - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new _MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */

function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);

  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */

function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;
  this.__data__ = new _MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Check that cyclic values are equal.


  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);

  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new _SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!_arraySome(other, function (othValue, othIndex) {
        if (!_cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */

var Uint8Array$1 = _root.Uint8Array;
var _Uint8Array = Uint8Array$1;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;
/** `Object#toString` result references. */

var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag$2 = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag = '[object String]',
    symbolTag$1 = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]';
/** Used to convert symbols to primitives and strings. */

var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$1:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag$2:
      var convert = _mapToArray;

    case setTag$2:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG$2; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag$1:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}

var _equalByTag = equalByTag;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

var _arrayPush = arrayPush;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */

var objectProto$5 = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols$1 ? stubArray_1 : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return _arrayFilter(nativeGetSymbols$1(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */

function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$3 = 1;
/** Used for built-in method references. */

var objectProto$4 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty$4.call(other, key))) {
      return false;
    }
  } // Check that cyclic values are equal.


  var objStacked = stack.get(object);
  var othStacked = stack.get(other);

  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/* Built-in method references that are verified to be native. */

var DataView = _getNative(_root, 'DataView');
var _DataView = DataView;

/* Built-in method references that are verified to be native. */

var Promise$1 = _getNative(_root, 'Promise');
var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */

var Set$1 = _getNative(_root, 'Set');
var _Set = Set$1;

/* Built-in method references that are verified to be native. */

var WeakMap$1 = _getNative(_root, 'WeakMap');
var _WeakMap = WeakMap$1;

/** `Object#toString` result references. */

var mapTag$1 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$1 = '[object Set]',
    weakMapTag = '[object WeakMap]';
var dataViewTag = '[object DataView]';
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = _baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag || _Map && getTag(new _Map()) != mapTag$1 || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag$1 || _WeakMap && getTag(new _WeakMap()) != weakMapTag) {
  getTag = function (value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag$1;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag$1;

        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}

var _getTag = getTag;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$2 = 1;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';
/** Used for built-in method references. */

var objectProto$3 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag : _getTag(object),
      othTag = othIsArr ? arrayTag : _getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1$1(object)) {
    if (!isBuffer_1$1(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack());
    return objIsArr || isTypedArray_1(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty$3.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$3.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new _Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new _Stack());
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */

function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike_1(value) && !isObjectLike_1(other)) {
    return value !== value && other !== other;
  }

  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */

function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }

  object = Object(object);

  while (index--) {
    var data = matchData[index];

    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }

  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack();

      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }

      if (!(result === undefined ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) {
        return false;
      }
    }
  }

  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */

function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */

function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];
    result[length] = [key, value, _isStrictComparable(value)];
  }

  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }

    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */

function baseMatches(source) {
  var matchData = _getMatchData(source);

  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }

  return function (object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */

function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }

  var type = typeof value;

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol_1(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

var _isKey = isKey;

/** Error message constants. */

var FUNC_ERROR_TEXT$1 = 'Expected a function';
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */

function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }

  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  memoized.cache = new (memoize.Cache || _MapCache)();
  return memoized;
} // Expose `MapCache`.


memoize.Cache = _MapCache;
var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */

var MAX_MEMOIZE_SIZE = 500;
/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */

function memoizeCapped(func) {
  var result = memoize_1(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }

    return key;
  });
  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */

var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */

var reEscapeChar = /\\(\\)?/g;
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */

var stringToPath = _memoizeCapped(function (string) {
  var result = [];

  if (string.charCodeAt(0) === 46
  /* . */
  ) {
    result.push('');
  }

  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */

var INFINITY$3 = 1 / 0;
/** Used to convert symbols to primitives and strings. */

var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }

  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$3 ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */

function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */

function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }

  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */

var INFINITY$2 = 1 / 0;
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$2 ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */

function baseGet(object, path) {
  path = _castPath(path, object);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */

function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */

function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);
  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);

    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }

    object = object[key];
  }

  if (result || ++index != length) {
    return result;
  }

  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) && (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */

function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }

  return function (object) {
    var objValue = get_1(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn_1(object, path) : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */

function basePropertyDeep(path) {
  return function (object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */

function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */

function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }

  if (value == null) {
    return identity_1;
  }

  if (typeof value == 'object') {
    return isArray_1(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
  }

  return property_1(value);
}

var _baseIteratee = baseIteratee;

/**
 * Creates an object with the same keys as `object` and values generated
 * by running each own enumerable string keyed property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @see _.mapKeys
 * @example
 *
 * var users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * _.mapValues(users, function(o) { return o.age; });
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 *
 * // The `_.property` iteratee shorthand.
 * _.mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */

function mapValues(object, iteratee) {
  var result = {};
  iteratee = _baseIteratee(iteratee);
  _baseForOwn(object, function (value, key, object) {
    _baseAssignValue(result, key, iteratee(value, key, object));
  });
  return result;
}

var mapValues_1 = mapValues;

function useEditorUrl({
  file,
  lineNumber = 1
}) {
  const {
    ignitionConfig: config
  } = useContext(IgnitionConfigContext);
  const editor = config.editor;
  const editors = mapValues_1(config.editorOptions, e => e.url);
  file = (config.remoteSitesPath || '').length > 0 && (config.localSitesPath || '').length > 0 ? file.replace(config.remoteSitesPath, config.localSitesPath) : file;

  if (!Object.keys(editors).includes(editor)) {
    console.warn(`Editor '${editor}' is not supported. Support editors are: ${Object.keys(editors).join(', ')}`);
    return null;
  }

  return editors[editor].replace('%path', encodeURIComponent(file)).replace('%line', encodeURIComponent(lineNumber));
}

/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */
function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) {
      _defineProperty$2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
}

function _toConsumableArray$2(arr) {
  return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread$2();
}

function _arrayWithoutHoles$2(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray$2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}

function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var noop$1 = function noop() {};

var _WINDOW = {};
var _DOCUMENT = {};
var _MUTATION_OBSERVER = null;
var _PERFORMANCE = {
  mark: noop$1,
  measure: noop$1
};

try {
  if (typeof window !== 'undefined') _WINDOW = window;
  if (typeof document !== 'undefined') _DOCUMENT = document;
  if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
  if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}

var _ref = _WINDOW.navigator || {},
    _ref$userAgent = _ref.userAgent,
    userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;

var WINDOW = _WINDOW;
var DOCUMENT = _DOCUMENT;
var MUTATION_OBSERVER = _MUTATION_OBSERVER;
var PERFORMANCE = _PERFORMANCE;
var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');
var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
var UNITS_IN_GRID = 16;
var DEFAULT_FAMILY_PREFIX = 'fa';
var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
var DATA_FA_I2SVG = 'data-fa-i2svg';
var DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
var DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';
var DATA_PREFIX = 'data-prefix';
var DATA_ICON = 'data-icon';
var HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
var MUTATION_APPROACH_ASYNC = 'async';
var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];

var PRODUCTION$1 = function () {
  try {
    return "production" === 'production';
  } catch (e) {
    return false;
  }
}();

var PREFIX_TO_STYLE = {
  'fas': 'solid',
  'fa-solid': 'solid',
  'far': 'regular',
  'fa-regular': 'regular',
  'fal': 'light',
  'fa-light': 'light',
  'fat': 'thin',
  'fa-thin': 'thin',
  'fad': 'duotone',
  'fa-duotone': 'duotone',
  'fab': 'brands',
  'fa-brands': 'brands',
  'fak': 'kit',
  'fa-kit': 'kit',
  'fa': 'solid'
};
var STYLE_TO_PREFIX = {
  'solid': 'fas',
  'regular': 'far',
  'light': 'fal',
  'thin': 'fat',
  'duotone': 'fad',
  'brands': 'fab',
  'kit': 'fak'
};
var PREFIX_TO_LONG_STYLE = {
  'fab': 'fa-brands',
  'fad': 'fa-duotone',
  'fak': 'fa-kit',
  'fal': 'fa-light',
  'far': 'fa-regular',
  'fas': 'fa-solid',
  'fat': 'fa-thin'
};
var LONG_STYLE_TO_PREFIX = {
  'fa-brands': 'fab',
  'fa-duotone': 'fad',
  'fa-kit': 'fak',
  'fa-light': 'fal',
  'fa-regular': 'far',
  'fa-solid': 'fas',
  'fa-thin': 'fat'
};
var ICON_SELECTION_SYNTAX_PATTERN = /fa[srltdbk\-\ ]/; // eslint-disable-line no-useless-escape

var LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
var FONT_FAMILY_PATTERN = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Kit)?.*/i; // TODO: do we need to handle font-weight for kit SVG pseudo-elements?

var FONT_WEIGHT_TO_PREFIX = {
  '900': 'fas',
  '400': 'far',
  'normal': 'far',
  '300': 'fal',
  '100': 'fat'
};
var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
var ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];
var DUOTONE_CLASSES = {
  GROUP: 'duotone-group',
  SWAP_OPACITY: 'swap-opacity',
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};
var RESERVED_CLASSES = [].concat(_toConsumableArray$2(Object.keys(STYLE_TO_PREFIX)), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
  return "".concat(n, "x");
})).concat(oneToTwenty.map(function (n) {
  return "w-".concat(n);
}));
var initial = WINDOW.FontAwesomeConfig || {};

function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector('script[' + attr + ']');

  if (element) {
    return element.getAttribute(attr);
  }
}

function coerce(val) {
  // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
  // We'll assume that this is an indication that it should be toggled to true
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'true') return true;
  return val;
}

if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
  var attrs = [['data-family-prefix', 'familyPrefix'], ['data-style-default', 'styleDefault'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
  attrs.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        attr = _ref2[0],
        key = _ref2[1];

    var val = coerce(getAttrConfig(attr));

    if (val !== undefined && val !== null) {
      initial[key] = val;
    }
  });
}

var _default$1 = {
  familyPrefix: DEFAULT_FAMILY_PREFIX,
  styleDefault: 'solid',
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  mutateApproach: 'async',
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
};

var _config = _objectSpread2$1(_objectSpread2$1({}, _default$1), initial);

if (!_config.autoReplaceSvg) _config.observeMutations = false;
var config = {};
Object.keys(_config).forEach(function (key) {
  Object.defineProperty(config, key, {
    enumerable: true,
    set: function set(val) {
      _config[key] = val;

      _onChangeCb.forEach(function (cb) {
        return cb(config);
      });
    },
    get: function get() {
      return _config[key];
    }
  });
});
WINDOW.FontAwesomeConfig = config;
var _onChangeCb = [];

function onChange(cb) {
  _onChangeCb.push(cb);

  return function () {
    _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
  };
}

var d$1 = UNITS_IN_GRID;
var meaninglessTransform = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: false,
  flipY: false
};

function insertCss(css) {
  if (!css || !IS_DOM) {
    return;
  }

  var style = DOCUMENT.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  var headChildren = DOCUMENT.head.childNodes;
  var beforeChild = null;

  for (var i = headChildren.length - 1; i > -1; i--) {
    var child = headChildren[i];
    var tagName = (child.tagName || '').toUpperCase();

    if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }

  DOCUMENT.head.insertBefore(style, beforeChild);
  return css;
}

var idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function nextUniqueId() {
  var size = 12;
  var id = '';

  while (size-- > 0) {
    id += idPool[Math.random() * 62 | 0];
  }

  return id;
}

function toArray(obj) {
  var array = [];

  for (var i = (obj || []).length >>> 0; i--;) {
    array[i] = obj[i];
  }

  return array;
}

function classArray(node) {
  if (node.classList) {
    return toArray(node.classList);
  } else {
    return (node.getAttribute('class') || '').split(' ').filter(function (i) {
      return i;
    });
  }
}

function htmlEscape(str) {
  return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function joinAttributes(attributes) {
  return Object.keys(attributes || {}).reduce(function (acc, attributeName) {
    return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
  }, '').trim();
}

function joinStyles(styles) {
  return Object.keys(styles || {}).reduce(function (acc, styleName) {
    return acc + "".concat(styleName, ": ").concat(styles[styleName].trim(), ";");
  }, '');
}

function transformIsMeaningful(transform) {
  return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}

function transformForSvg(_ref) {
  var transform = _ref.transform,
      containerWidth = _ref.containerWidth,
      iconWidth = _ref.iconWidth;
  var outer = {
    transform: "translate(".concat(containerWidth / 2, " 256)")
  };
  var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
  var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
  var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
  var inner = {
    transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
  };
  var path = {
    transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
  };
  return {
    outer: outer,
    inner: inner,
    path: path
  };
}

function transformForCss(_ref2) {
  var transform = _ref2.transform,
      _ref2$width = _ref2.width,
      width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height,
      _ref2$startCentered = _ref2.startCentered,
      startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;
  var val = '';

  if (startCentered && IS_IE) {
    val += "translate(".concat(transform.x / d$1 - width / 2, "em, ").concat(transform.y / d$1 - height / 2, "em) ");
  } else if (startCentered) {
    val += "translate(calc(-50% + ".concat(transform.x / d$1, "em), calc(-50% + ").concat(transform.y / d$1, "em)) ");
  } else {
    val += "translate(".concat(transform.x / d$1, "em, ").concat(transform.y / d$1, "em) ");
  }

  val += "scale(".concat(transform.size / d$1 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d$1 * (transform.flipY ? -1 : 1), ") ");
  val += "rotate(".concat(transform.rotate, "deg) ");
  return val;
}

var baseStyles = ":root, :host {\n  --fa-font-solid: normal 900 1em/1 \"Font Awesome 6 Solid\";\n  --fa-font-regular: normal 400 1em/1 \"Font Awesome 6 Regular\";\n  --fa-font-light: normal 300 1em/1 \"Font Awesome 6 Light\";\n  --fa-font-thin: normal 100 1em/1 \"Font Awesome 6 Thin\";\n  --fa-font-duotone: normal 900 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-brands: normal 400 1em/1 \"Font Awesome 6 Brands\";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}";

function css$2() {
  var dfp = DEFAULT_FAMILY_PREFIX;
  var drc = DEFAULT_REPLACEMENT_CLASS;
  var fp = config.familyPrefix;
  var rc = config.replacementClass;
  var s = baseStyles;

  if (fp !== dfp || rc !== drc) {
    var dPatt = new RegExp("\\.".concat(dfp, "\\-"), 'g');
    var customPropPatt = new RegExp("\\--".concat(dfp, "\\-"), 'g');
    var rPatt = new RegExp("\\.".concat(drc), 'g');
    s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
  }

  return s;
}

var _cssInserted = false;

function ensureCss() {
  if (config.autoAddCss && !_cssInserted) {
    insertCss(css$2());
    _cssInserted = true;
  }
}

var InjectCSS = {
  mixout: function mixout() {
    return {
      dom: {
        css: css$2,
        insertCss: ensureCss
      }
    };
  },
  hooks: function hooks() {
    return {
      beforeDOMElementCreation: function beforeDOMElementCreation() {
        ensureCss();
      },
      beforeI2svg: function beforeI2svg() {
        ensureCss();
      }
    };
  }
};
var w$1 = WINDOW || {};
if (!w$1[NAMESPACE_IDENTIFIER]) w$1[NAMESPACE_IDENTIFIER] = {};
if (!w$1[NAMESPACE_IDENTIFIER].styles) w$1[NAMESPACE_IDENTIFIER].styles = {};
if (!w$1[NAMESPACE_IDENTIFIER].hooks) w$1[NAMESPACE_IDENTIFIER].hooks = {};
if (!w$1[NAMESPACE_IDENTIFIER].shims) w$1[NAMESPACE_IDENTIFIER].shims = [];
var namespace = w$1[NAMESPACE_IDENTIFIER];
var functions = [];

var listener = function listener() {
  DOCUMENT.removeEventListener('DOMContentLoaded', listener);
  loaded = 1;
  functions.map(function (fn) {
    return fn();
  });
};

var loaded = false;

if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
  if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
}

function domready(fn) {
  if (!IS_DOM) return;
  loaded ? setTimeout(fn, 0) : functions.push(fn);
}

function toHtml(abstractNodes) {
  var tag = abstractNodes.tag,
      _abstractNodes$attrib = abstractNodes.attributes,
      attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,
      _abstractNodes$childr = abstractNodes.children,
      children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;

  if (typeof abstractNodes === 'string') {
    return htmlEscape(abstractNodes);
  } else {
    return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
  }
}

function iconFromMapping(mapping, prefix, iconName) {
  if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
    return {
      prefix: prefix,
      iconName: iconName,
      icon: mapping[prefix][iconName]
    };
  }
}
/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */


var bindInternal4 = function bindInternal4(func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};
/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */


var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i,
      key,
      result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  } else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};
/**
 * ucs2decode() and codePointAt() are both works of Mathias Bynens and licensed under MIT
 *
 * Copyright Mathias Bynens <https://mathiasbynens.be/>

 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


function ucs2decode(string) {
  var output = [];
  var counter = 0;
  var length = string.length;

  while (counter < length) {
    var value = string.charCodeAt(counter++);

    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      var extra = string.charCodeAt(counter++);

      if ((extra & 0xFC00) == 0xDC00) {
        // eslint-disable-line eqeqeq
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }

  return output;
}

function toHex(unicode) {
  var decoded = ucs2decode(unicode);
  return decoded.length === 1 ? decoded[0].toString(16) : null;
}

function codePointAt(string, index) {
  var size = string.length;
  var first = string.charCodeAt(index);
  var second;

  if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
    second = string.charCodeAt(index + 1);

    if (second >= 0xDC00 && second <= 0xDFFF) {
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }

  return first;
}

function normalizeIcons(icons) {
  return Object.keys(icons).reduce(function (acc, iconName) {
    var icon = icons[iconName];
    var expanded = !!icon.icon;

    if (expanded) {
      acc[icon.iconName] = icon.icon;
    } else {
      acc[iconName] = icon;
    }

    return acc;
  }, {});
}

function defineIcons(prefix, icons) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _params$skipHooks = params.skipHooks,
      skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
  var normalized = normalizeIcons(icons);

  if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
    namespace.hooks.addPack(prefix, normalizeIcons(icons));
  } else {
    namespace.styles[prefix] = _objectSpread2$1(_objectSpread2$1({}, namespace.styles[prefix] || {}), normalized);
  }
  /**
   * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
   * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
   * for `fas` so we'll ease the upgrade process for our users by automatically defining
   * this as well.
   */


  if (prefix === 'fas') {
    defineIcons('fa', icons);
  }
}
var styles = namespace.styles,
    shims = namespace.shims;
var LONG_STYLE = Object.values(PREFIX_TO_LONG_STYLE);
var _defaultUsablePrefix = null;
var _byUnicode = {};
var _byLigature = {};
var _byOldName = {};
var _byOldUnicode = {};
var _byAlias = {};
var PREFIXES = Object.keys(PREFIX_TO_STYLE);

function isReserved(name) {
  return ~RESERVED_CLASSES.indexOf(name);
}

function getIconName(familyPrefix, cls) {
  var parts = cls.split('-');
  var prefix = parts[0];
  var iconName = parts.slice(1).join('-');

  if (prefix === familyPrefix && iconName !== '' && !isReserved(iconName)) {
    return iconName;
  } else {
    return null;
  }
}

var build = function build() {
  var lookup = function lookup(reducer) {
    return reduce(styles, function (o, style, prefix) {
      o[prefix] = reduce(style, reducer, {});
      return o;
    }, {});
  };

  _byUnicode = lookup(function (acc, icon, iconName) {
    if (icon[3]) {
      acc[icon[3]] = iconName;
    }

    if (icon[2]) {
      var aliases = icon[2].filter(function (a) {
        return typeof a === 'number';
      });
      aliases.forEach(function (alias) {
        acc[alias.toString(16)] = iconName;
      });
    }

    return acc;
  });
  _byLigature = lookup(function (acc, icon, iconName) {
    acc[iconName] = iconName;

    if (icon[2]) {
      var aliases = icon[2].filter(function (a) {
        return typeof a === 'string';
      });
      aliases.forEach(function (alias) {
        acc[alias] = iconName;
      });
    }

    return acc;
  });
  _byAlias = lookup(function (acc, icon, iconName) {
    var aliases = icon[2];
    acc[iconName] = iconName;
    aliases.forEach(function (alias) {
      acc[alias] = iconName;
    });
    return acc;
  }); // If we have a Kit, we can't determine if regular is available since we
  // could be auto-fetching it. We'll have to assume that it is available.

  var hasRegular = 'far' in styles || config.autoFetchSvg;
  var shimLookups = reduce(shims, function (acc, shim) {
    var maybeNameMaybeUnicode = shim[0];
    var prefix = shim[1];
    var iconName = shim[2];

    if (prefix === 'far' && !hasRegular) {
      prefix = 'fas';
    }

    if (typeof maybeNameMaybeUnicode === 'string') {
      acc.names[maybeNameMaybeUnicode] = {
        prefix: prefix,
        iconName: iconName
      };
    }

    if (typeof maybeNameMaybeUnicode === 'number') {
      acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
        prefix: prefix,
        iconName: iconName
      };
    }

    return acc;
  }, {
    names: {},
    unicodes: {}
  });
  _byOldName = shimLookups.names;
  _byOldUnicode = shimLookups.unicodes;
  _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault);
};

onChange(function (c) {
  _defaultUsablePrefix = getCanonicalPrefix(c.styleDefault);
});
build();

function byUnicode(prefix, unicode) {
  return (_byUnicode[prefix] || {})[unicode];
}

function byLigature(prefix, ligature) {
  return (_byLigature[prefix] || {})[ligature];
}

function byAlias(prefix, alias) {
  return (_byAlias[prefix] || {})[alias];
}

function byOldName(name) {
  return _byOldName[name] || {
    prefix: null,
    iconName: null
  };
}

function byOldUnicode(unicode) {
  var oldUnicode = _byOldUnicode[unicode];
  var newUnicode = byUnicode('fas', unicode);
  return oldUnicode || (newUnicode ? {
    prefix: 'fas',
    iconName: newUnicode
  } : null) || {
    prefix: null,
    iconName: null
  };
}

function getDefaultUsablePrefix() {
  return _defaultUsablePrefix;
}

var emptyCanonicalIcon = function emptyCanonicalIcon() {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};

function getCanonicalPrefix(styleOrPrefix) {
  var style = PREFIX_TO_STYLE[styleOrPrefix];
  var prefix = STYLE_TO_PREFIX[styleOrPrefix] || STYLE_TO_PREFIX[style];
  var defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
  return prefix || defined || null;
}

function getCanonicalIcon(values) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$skipLookups = params.skipLookups,
      skipLookups = _params$skipLookups === void 0 ? false : _params$skipLookups;
  var givenPrefix = null;
  var canonical = values.reduce(function (acc, cls) {
    var iconName = getIconName(config.familyPrefix, cls);

    if (styles[cls]) {
      cls = LONG_STYLE.includes(cls) ? LONG_STYLE_TO_PREFIX[cls] : cls;
      givenPrefix = cls;
      acc.prefix = cls;
    } else if (PREFIXES.indexOf(cls) > -1) {
      givenPrefix = cls;
      acc.prefix = getCanonicalPrefix(cls);
    } else if (iconName) {
      acc.iconName = iconName;
    } else if (cls !== config.replacementClass) {
      acc.rest.push(cls);
    }

    if (!skipLookups && acc.prefix && acc.iconName) {
      var shim = givenPrefix === 'fa' ? byOldName(acc.iconName) : {};
      var aliasIconName = byAlias(acc.prefix, acc.iconName);

      if (shim.prefix) {
        givenPrefix = null;
      }

      acc.iconName = shim.iconName || aliasIconName || acc.iconName;
      acc.prefix = shim.prefix || acc.prefix;

      if (acc.prefix === 'far' && !styles['far'] && styles['fas'] && !config.autoFetchSvg) {
        // Allow a fallback from the regular style to solid if regular is not available
        // but only if we aren't auto-fetching SVGs
        acc.prefix = 'fas';
      }
    }

    return acc;
  }, emptyCanonicalIcon());

  if (canonical.prefix === 'fa' || givenPrefix === 'fa') {
    // The fa prefix is not canonical. So if it has made it through until this point
    // we will shift it to the correct prefix.
    canonical.prefix = getDefaultUsablePrefix() || 'fas';
  }

  return canonical;
}

var Library = /*#__PURE__*/function () {
  function Library() {
    _classCallCheck(this, Library);

    this.definitions = {};
  }

  _createClass(Library, [{
    key: "add",
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
        definitions[_key] = arguments[_key];
      }

      var additions = definitions.reduce(this._pullDefinitions, {});
      Object.keys(additions).forEach(function (key) {
        _this.definitions[key] = _objectSpread2$1(_objectSpread2$1({}, _this.definitions[key] || {}), additions[key]);
        defineIcons(key, additions[key]);
        var longPrefix = PREFIX_TO_LONG_STYLE[key];
        if (longPrefix) defineIcons(longPrefix, additions[key]);
        build();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function _pullDefinitions(additions, definition) {
      var normalized = definition.prefix && definition.iconName && definition.icon ? {
        0: definition
      } : definition;
      Object.keys(normalized).map(function (key) {
        var _normalized$key = normalized[key],
            prefix = _normalized$key.prefix,
            iconName = _normalized$key.iconName,
            icon = _normalized$key.icon;
        var aliases = icon[2];
        if (!additions[prefix]) additions[prefix] = {};

        if (aliases.length > 0) {
          aliases.forEach(function (alias) {
            if (typeof alias === 'string') {
              additions[prefix][alias] = icon;
            }
          });
        }

        additions[prefix][iconName] = icon;
      });
      return additions;
    }
  }]);

  return Library;
}();

var _plugins = [];
var _hooks = {};
var providers = {};
var defaultProviderKeys = Object.keys(providers);

function registerPlugins(nextPlugins, _ref) {
  var obj = _ref.mixoutsTo;
  _plugins = nextPlugins;
  _hooks = {};
  Object.keys(providers).forEach(function (k) {
    if (defaultProviderKeys.indexOf(k) === -1) {
      delete providers[k];
    }
  });

  _plugins.forEach(function (plugin) {
    var mixout = plugin.mixout ? plugin.mixout() : {};
    Object.keys(mixout).forEach(function (tk) {
      if (typeof mixout[tk] === 'function') {
        obj[tk] = mixout[tk];
      }

      if (_typeof$1(mixout[tk]) === 'object') {
        Object.keys(mixout[tk]).forEach(function (sk) {
          if (!obj[tk]) {
            obj[tk] = {};
          }

          obj[tk][sk] = mixout[tk][sk];
        });
      }
    });

    if (plugin.hooks) {
      var hooks = plugin.hooks();
      Object.keys(hooks).forEach(function (hook) {
        if (!_hooks[hook]) {
          _hooks[hook] = [];
        }

        _hooks[hook].push(hooks[hook]);
      });
    }

    if (plugin.provides) {
      plugin.provides(providers);
    }
  });

  return obj;
}

function chainHooks(hook, accumulator) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var hookFns = _hooks[hook] || [];
  hookFns.forEach(function (hookFn) {
    accumulator = hookFn.apply(null, [accumulator].concat(args)); // eslint-disable-line no-useless-call
  });
  return accumulator;
}

function callHooks(hook) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var hookFns = _hooks[hook] || [];
  hookFns.forEach(function (hookFn) {
    hookFn.apply(null, args);
  });
  return undefined;
}

function callProvided() {
  var hook = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);
  return providers[hook] ? providers[hook].apply(null, args) : undefined;
}

function findIconDefinition(iconLookup) {
  if (iconLookup.prefix === 'fa') {
    iconLookup.prefix = 'fas';
  }

  var iconName = iconLookup.iconName;
  var prefix = iconLookup.prefix || getDefaultUsablePrefix();
  if (!iconName) return;
  iconName = byAlias(prefix, iconName) || iconName;
  return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}

var library = new Library();

var noAuto = function noAuto() {
  config.autoReplaceSvg = false;
  config.observeMutations = false;
  callHooks('noAuto');
};

var dom = {
  i2svg: function i2svg() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (IS_DOM) {
      callHooks('beforeI2svg', params);
      callProvided('pseudoElements2svg', params);
      return callProvided('i2svg', params);
    } else {
      return Promise.reject('Operation requires a DOM of some kind.');
    }
  },
  watch: function watch() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var autoReplaceSvgRoot = params.autoReplaceSvgRoot;

    if (config.autoReplaceSvg === false) {
      config.autoReplaceSvg = true;
    }

    config.observeMutations = true;
    domready(function () {
      autoReplace({
        autoReplaceSvgRoot: autoReplaceSvgRoot
      });
      callHooks('watch', params);
    });
  }
};
var parse = {
  icon: function icon(_icon) {
    if (_icon === null) {
      return null;
    }

    if (_typeof$1(_icon) === 'object' && _icon.prefix && _icon.iconName) {
      return {
        prefix: _icon.prefix,
        iconName: byAlias(_icon.prefix, _icon.iconName) || _icon.iconName
      };
    }

    if (Array.isArray(_icon) && _icon.length === 2) {
      var iconName = _icon[1].indexOf('fa-') === 0 ? _icon[1].slice(3) : _icon[1];
      var prefix = getCanonicalPrefix(_icon[0]);
      return {
        prefix: prefix,
        iconName: byAlias(prefix, iconName) || iconName
      };
    }

    if (typeof _icon === 'string' && (_icon.indexOf("".concat(config.familyPrefix, "-")) > -1 || _icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
      var canonicalIcon = getCanonicalIcon(_icon.split(' '), {
        skipLookups: true
      });
      return {
        prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
        iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
      };
    }

    if (typeof _icon === 'string') {
      var _prefix = getDefaultUsablePrefix();

      return {
        prefix: _prefix,
        iconName: byAlias(_prefix, _icon) || _icon
      };
    }
  }
};
var api = {
  noAuto: noAuto,
  config: config,
  dom: dom,
  parse: parse,
  library: library,
  findIconDefinition: findIconDefinition,
  toHtml: toHtml
};

var autoReplace = function autoReplace() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _params$autoReplaceSv = params.autoReplaceSvgRoot,
      autoReplaceSvgRoot = _params$autoReplaceSv === void 0 ? DOCUMENT : _params$autoReplaceSv;
  if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
    node: autoReplaceSvgRoot
  });
};

function domVariants(val, abstractCreator) {
  Object.defineProperty(val, 'abstract', {
    get: abstractCreator
  });
  Object.defineProperty(val, 'html', {
    get: function get() {
      return val.abstract.map(function (a) {
        return toHtml(a);
      });
    }
  });
  Object.defineProperty(val, 'node', {
    get: function get() {
      if (!IS_DOM) return;
      var container = DOCUMENT.createElement('div');
      container.innerHTML = val.html;
      return container.children;
    }
  });
  return val;
}

function asIcon(_ref) {
  var children = _ref.children,
      main = _ref.main,
      mask = _ref.mask,
      attributes = _ref.attributes,
      styles = _ref.styles,
      transform = _ref.transform;

  if (transformIsMeaningful(transform) && main.found && !mask.found) {
    var width = main.width,
        height = main.height;
    var offset = {
      x: width / height / 2,
      y: 0.5
    };
    attributes['style'] = joinStyles(_objectSpread2$1(_objectSpread2$1({}, styles), {}, {
      'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
    }));
  }

  return [{
    tag: 'svg',
    attributes: attributes,
    children: children
  }];
}

function asSymbol(_ref) {
  var prefix = _ref.prefix,
      iconName = _ref.iconName,
      children = _ref.children,
      attributes = _ref.attributes,
      symbol = _ref.symbol;
  var id = symbol === true ? "".concat(prefix, "-").concat(config.familyPrefix, "-").concat(iconName) : symbol;
  return [{
    tag: 'svg',
    attributes: {
      style: 'display: none;'
    },
    children: [{
      tag: 'symbol',
      attributes: _objectSpread2$1(_objectSpread2$1({}, attributes), {}, {
        id: id
      }),
      children: children
    }]
  }];
}

function makeInlineSvgAbstract(params) {
  var _params$icons = params.icons,
      main = _params$icons.main,
      mask = _params$icons.mask,
      prefix = params.prefix,
      iconName = params.iconName,
      transform = params.transform,
      symbol = params.symbol,
      title = params.title,
      maskId = params.maskId,
      titleId = params.titleId,
      extra = params.extra,
      _params$watchable = params.watchable,
      watchable = _params$watchable === void 0 ? false : _params$watchable;

  var _ref = mask.found ? mask : main,
      width = _ref.width,
      height = _ref.height;

  var isUploadedIcon = prefix === 'fak';
  var attrClass = [config.replacementClass, iconName ? "".concat(config.familyPrefix, "-").concat(iconName) : ''].filter(function (c) {
    return extra.classes.indexOf(c) === -1;
  }).filter(function (c) {
    return c !== '' || !!c;
  }).concat(extra.classes).join(' ');
  var content = {
    children: [],
    attributes: _objectSpread2$1(_objectSpread2$1({}, extra.attributes), {}, {
      'data-prefix': prefix,
      'data-icon': iconName,
      'class': attrClass,
      'role': extra.attributes.role || 'img',
      'xmlns': 'http://www.w3.org/2000/svg',
      'viewBox': "0 0 ".concat(width, " ").concat(height)
    })
  };
  var uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf('fa-fw') ? {
    width: "".concat(width / height * 16 * 0.0625, "em")
  } : {};

  if (watchable) {
    content.attributes[DATA_FA_I2SVG] = '';
  }

  if (title) {
    content.children.push({
      tag: 'title',
      attributes: {
        id: content.attributes['aria-labelledby'] || "title-".concat(titleId || nextUniqueId())
      },
      children: [title]
    });
    delete content.attributes.title;
  }

  var args = _objectSpread2$1(_objectSpread2$1({}, content), {}, {
    prefix: prefix,
    iconName: iconName,
    main: main,
    mask: mask,
    maskId: maskId,
    transform: transform,
    symbol: symbol,
    styles: _objectSpread2$1(_objectSpread2$1({}, uploadedIconWidthStyle), extra.styles)
  });

  var _ref2 = mask.found && main.found ? callProvided('generateAbstractMask', args) || {
    children: [],
    attributes: {}
  } : callProvided('generateAbstractIcon', args) || {
    children: [],
    attributes: {}
  },
      children = _ref2.children,
      attributes = _ref2.attributes;

  args.children = children;
  args.attributes = attributes;

  if (symbol) {
    return asSymbol(args);
  } else {
    return asIcon(args);
  }
}

function makeLayersTextAbstract(params) {
  var content = params.content,
      width = params.width,
      height = params.height,
      transform = params.transform,
      title = params.title,
      extra = params.extra,
      _params$watchable2 = params.watchable,
      watchable = _params$watchable2 === void 0 ? false : _params$watchable2;

  var attributes = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, extra.attributes), title ? {
    'title': title
  } : {}), {}, {
    'class': extra.classes.join(' ')
  });

  if (watchable) {
    attributes[DATA_FA_I2SVG] = '';
  }

  var styles = _objectSpread2$1({}, extra.styles);

  if (transformIsMeaningful(transform)) {
    styles['transform'] = transformForCss({
      transform: transform,
      startCentered: true,
      width: width,
      height: height
    });
    styles['-webkit-transform'] = styles['transform'];
  }

  var styleString = joinStyles(styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  var val = [];
  val.push({
    tag: 'span',
    attributes: attributes,
    children: [content]
  });

  if (title) {
    val.push({
      tag: 'span',
      attributes: {
        class: 'sr-only'
      },
      children: [title]
    });
  }

  return val;
}

function makeLayersCounterAbstract(params) {
  var content = params.content,
      title = params.title,
      extra = params.extra;

  var attributes = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, extra.attributes), title ? {
    'title': title
  } : {}), {}, {
    'class': extra.classes.join(' ')
  });

  var styleString = joinStyles(extra.styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  var val = [];
  val.push({
    tag: 'span',
    attributes: attributes,
    children: [content]
  });

  if (title) {
    val.push({
      tag: 'span',
      attributes: {
        class: 'sr-only'
      },
      children: [title]
    });
  }

  return val;
}

var styles$1 = namespace.styles;

function asFoundIcon(icon) {
  var width = icon[0];
  var height = icon[1];

  var _icon$slice = icon.slice(4),
      _icon$slice2 = _slicedToArray(_icon$slice, 1),
      vectorData = _icon$slice2[0];

  var element = null;

  if (Array.isArray(vectorData)) {
    element = {
      tag: 'g',
      attributes: {
        class: "".concat(config.familyPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
      },
      children: [{
        tag: 'path',
        attributes: {
          class: "".concat(config.familyPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
          fill: 'currentColor',
          d: vectorData[0]
        }
      }, {
        tag: 'path',
        attributes: {
          class: "".concat(config.familyPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
          fill: 'currentColor',
          d: vectorData[1]
        }
      }]
    };
  } else {
    element = {
      tag: 'path',
      attributes: {
        fill: 'currentColor',
        d: vectorData
      }
    };
  }

  return {
    found: true,
    width: width,
    height: height,
    icon: element
  };
}

var missingIconResolutionMixin = {
  found: false,
  width: 512,
  height: 512
};

function maybeNotifyMissing(iconName, prefix) {
  if (!PRODUCTION$1 && !config.showMissingIcons && iconName) {
    console.error("Icon with name \"".concat(iconName, "\" and prefix \"").concat(prefix, "\" is missing."));
  }
}

function findIcon(iconName, prefix) {
  var givenPrefix = prefix;

  if (prefix === 'fa' && config.styleDefault !== null) {
    prefix = getDefaultUsablePrefix();
  }

  return new Promise(function (resolve, reject) {
    ({
      found: false,
      width: 512,
      height: 512,
      icon: callProvided('missingIconAbstract') || {}
    });

    if (givenPrefix === 'fa') {
      var shim = byOldName(iconName) || {};
      iconName = shim.iconName || iconName;
      prefix = shim.prefix || prefix;
    }

    if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
      var icon = styles$1[prefix][iconName];
      return resolve(asFoundIcon(icon));
    }

    maybeNotifyMissing(iconName, prefix);
    resolve(_objectSpread2$1(_objectSpread2$1({}, missingIconResolutionMixin), {}, {
      icon: config.showMissingIcons && iconName ? callProvided('missingIconAbstract') || {} : {}
    }));
  });
}

var noop$1$1 = function noop() {};

var p$1 = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
  mark: noop$1$1,
  measure: noop$1$1
};
var preamble = "FA \"6.1.1\"";

var begin = function begin(name) {
  p$1.mark("".concat(preamble, " ").concat(name, " begins"));
  return function () {
    return end(name);
  };
};

var end = function end(name) {
  p$1.mark("".concat(preamble, " ").concat(name, " ends"));
  p$1.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
};

var perf = {
  begin: begin,
  end: end
};

var noop$2 = function noop() {};

function isWatched(node) {
  var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
  return typeof i2svg === 'string';
}

function hasPrefixAndIcon(node) {
  var prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
  var icon = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
  return prefix && icon;
}

function hasBeenReplaced(node) {
  return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
}

function getMutator() {
  if (config.autoReplaceSvg === true) {
    return mutators.replace;
  }

  var mutator = mutators[config.autoReplaceSvg];
  return mutator || mutators.replace;
}

function createElementNS(tag) {
  return DOCUMENT.createElementNS('http://www.w3.org/2000/svg', tag);
}

function createElement$1(tag) {
  return DOCUMENT.createElement(tag);
}

function convertSVG(abstractObj) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$ceFn = params.ceFn,
      ceFn = _params$ceFn === void 0 ? abstractObj.tag === 'svg' ? createElementNS : createElement$1 : _params$ceFn;

  if (typeof abstractObj === 'string') {
    return DOCUMENT.createTextNode(abstractObj);
  }

  var tag = ceFn(abstractObj.tag);
  Object.keys(abstractObj.attributes || []).forEach(function (key) {
    tag.setAttribute(key, abstractObj.attributes[key]);
  });
  var children = abstractObj.children || [];
  children.forEach(function (child) {
    tag.appendChild(convertSVG(child, {
      ceFn: ceFn
    }));
  });
  return tag;
}

function nodeAsComment(node) {
  var comment = " ".concat(node.outerHTML, " ");
  /* BEGIN.ATTRIBUTION */

  comment = "".concat(comment, "Font Awesome fontawesome.com ");
  /* END.ATTRIBUTION */

  return comment;
}

var mutators = {
  replace: function replace(mutation) {
    var node = mutation[0];

    if (node.parentNode) {
      mutation[1].forEach(function (abstract) {
        node.parentNode.insertBefore(convertSVG(abstract), node);
      });

      if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
        var comment = DOCUMENT.createComment(nodeAsComment(node));
        node.parentNode.replaceChild(comment, node);
      } else {
        node.remove();
      }
    }
  },
  nest: function nest(mutation) {
    var node = mutation[0];
    var abstract = mutation[1]; // If we already have a replaced node we do not want to continue nesting within it.
    // Short-circuit to the standard replacement

    if (~classArray(node).indexOf(config.replacementClass)) {
      return mutators.replace(mutation);
    }

    var forSvg = new RegExp("".concat(config.familyPrefix, "-.*"));
    delete abstract[0].attributes.id;

    if (abstract[0].attributes.class) {
      var splitClasses = abstract[0].attributes.class.split(' ').reduce(function (acc, cls) {
        if (cls === config.replacementClass || cls.match(forSvg)) {
          acc.toSvg.push(cls);
        } else {
          acc.toNode.push(cls);
        }

        return acc;
      }, {
        toNode: [],
        toSvg: []
      });
      abstract[0].attributes.class = splitClasses.toSvg.join(' ');

      if (splitClasses.toNode.length === 0) {
        node.removeAttribute('class');
      } else {
        node.setAttribute('class', splitClasses.toNode.join(' '));
      }
    }

    var newInnerHTML = abstract.map(function (a) {
      return toHtml(a);
    }).join('\n');
    node.setAttribute(DATA_FA_I2SVG, '');
    node.innerHTML = newInnerHTML;
  }
};

function performOperationSync(op) {
  op();
}

function perform(mutations, callback) {
  var callbackFunction = typeof callback === 'function' ? callback : noop$2;

  if (mutations.length === 0) {
    callbackFunction();
  } else {
    var frame = performOperationSync;

    if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
      frame = WINDOW.requestAnimationFrame || performOperationSync;
    }

    frame(function () {
      var mutator = getMutator();
      var mark = perf.begin('mutate');
      mutations.map(mutator);
      mark();
      callbackFunction();
    });
  }
}

var disabled = false;

function disableObservation() {
  disabled = true;
}

function enableObservation() {
  disabled = false;
}

var mo = null;

function observe$1(options) {
  if (!MUTATION_OBSERVER) {
    return;
  }

  if (!config.observeMutations) {
    return;
  }

  var _options$treeCallback = options.treeCallback,
      treeCallback = _options$treeCallback === void 0 ? noop$2 : _options$treeCallback,
      _options$nodeCallback = options.nodeCallback,
      nodeCallback = _options$nodeCallback === void 0 ? noop$2 : _options$nodeCallback,
      _options$pseudoElemen = options.pseudoElementsCallback,
      pseudoElementsCallback = _options$pseudoElemen === void 0 ? noop$2 : _options$pseudoElemen,
      _options$observeMutat = options.observeMutationsRoot,
      observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;
  mo = new MUTATION_OBSERVER(function (objects) {
    if (disabled) return;
    var defaultPrefix = getDefaultUsablePrefix();
    toArray(objects).forEach(function (mutationRecord) {
      if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
        if (config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target);
        }

        treeCallback(mutationRecord.target);
      }

      if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
        pseudoElementsCallback(mutationRecord.target.parentNode);
      }

      if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
        if (mutationRecord.attributeName === 'class' && hasPrefixAndIcon(mutationRecord.target)) {
          var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),
              prefix = _getCanonicalIcon.prefix,
              iconName = _getCanonicalIcon.iconName;

          mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
          if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
        } else if (hasBeenReplaced(mutationRecord.target)) {
          nodeCallback(mutationRecord.target);
        }
      }
    });
  });
  if (!IS_DOM) return;
  mo.observe(observeMutationsRoot, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
  });
}

function disconnect() {
  if (!mo) return;
  mo.disconnect();
}

function styleParser(node) {
  var style = node.getAttribute('style');
  var val = [];

  if (style) {
    val = style.split(';').reduce(function (acc, style) {
      var styles = style.split(':');
      var prop = styles[0];
      var value = styles.slice(1);

      if (prop && value.length > 0) {
        acc[prop] = value.join(':').trim();
      }

      return acc;
    }, {});
  }

  return val;
}

function classParser(node) {
  var existingPrefix = node.getAttribute('data-prefix');
  var existingIconName = node.getAttribute('data-icon');
  var innerText = node.innerText !== undefined ? node.innerText.trim() : '';
  var val = getCanonicalIcon(classArray(node));

  if (!val.prefix) {
    val.prefix = getDefaultUsablePrefix();
  }

  if (existingPrefix && existingIconName) {
    val.prefix = existingPrefix;
    val.iconName = existingIconName;
  }

  if (val.iconName && val.prefix) {
    return val;
  }

  if (val.prefix && innerText.length > 0) {
    val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
  }

  return val;
}

function attributesParser(node) {
  var extraAttributes = toArray(node.attributes).reduce(function (acc, attr) {
    if (acc.name !== 'class' && acc.name !== 'style') {
      acc[attr.name] = attr.value;
    }

    return acc;
  }, {});
  var title = node.getAttribute('title');
  var titleId = node.getAttribute('data-fa-title-id');

  if (config.autoA11y) {
    if (title) {
      extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
    } else {
      extraAttributes['aria-hidden'] = 'true';
      extraAttributes['focusable'] = 'false';
    }
  }

  return extraAttributes;
}

function blankMeta() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: meaninglessTransform,
    symbol: false,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}

function parseMeta(node) {
  var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    styleParser: true
  };

  var _classParser = classParser(node),
      iconName = _classParser.iconName,
      prefix = _classParser.prefix,
      extraClasses = _classParser.rest;

  var extraAttributes = attributesParser(node);
  var pluginMeta = chainHooks('parseNodeAttributes', {}, node);
  var extraStyles = parser.styleParser ? styleParser(node) : [];
  return _objectSpread2$1({
    iconName: iconName,
    title: node.getAttribute('title'),
    titleId: node.getAttribute('data-fa-title-id'),
    prefix: prefix,
    transform: meaninglessTransform,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: false,
    extra: {
      classes: extraClasses,
      styles: extraStyles,
      attributes: extraAttributes
    }
  }, pluginMeta);
}

var styles$2 = namespace.styles;

function generateMutation(node) {
  var nodeMeta = config.autoReplaceSvg === 'nest' ? parseMeta(node, {
    styleParser: false
  }) : parseMeta(node);

  if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
    return callProvided('generateLayersText', node, nodeMeta);
  } else {
    return callProvided('generateSvgReplacementMutation', node, nodeMeta);
  }
}

function onTree(root) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!IS_DOM) return Promise.resolve();
  var htmlClassList = DOCUMENT.documentElement.classList;

  var hclAdd = function hclAdd(suffix) {
    return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  };

  var hclRemove = function hclRemove(suffix) {
    return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  };

  var prefixes = config.autoFetchSvg ? Object.keys(PREFIX_TO_STYLE) : Object.keys(styles$2);
  var prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(function (p) {
    return ".".concat(p, ":not([").concat(DATA_FA_I2SVG, "])");
  })).join(', ');

  if (prefixesDomQuery.length === 0) {
    return Promise.resolve();
  }

  var candidates = [];

  try {
    candidates = toArray(root.querySelectorAll(prefixesDomQuery));
  } catch (e) {// noop
  }

  if (candidates.length > 0) {
    hclAdd('pending');
    hclRemove('complete');
  } else {
    return Promise.resolve();
  }

  var mark = perf.begin('onTree');
  var mutations = candidates.reduce(function (acc, node) {
    try {
      var mutation = generateMutation(node);

      if (mutation) {
        acc.push(mutation);
      }
    } catch (e) {
      if (!PRODUCTION$1) {
        if (e.name === 'MissingIcon') {
          console.error(e);
        }
      }
    }

    return acc;
  }, []);
  return new Promise(function (resolve, reject) {
    Promise.all(mutations).then(function (resolvedMutations) {
      perform(resolvedMutations, function () {
        hclAdd('active');
        hclAdd('complete');
        hclRemove('pending');
        if (typeof callback === 'function') callback();
        mark();
        resolve();
      });
    }).catch(function (e) {
      mark();
      reject(e);
    });
  });
}

function onNode(node) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  generateMutation(node).then(function (mutation) {
    if (mutation) {
      perform([mutation], callback);
    }
  });
}

function resolveIcons(next) {
  return function (maybeIconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
    var mask = params.mask;

    if (mask) {
      mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }

    return next(iconDefinition, _objectSpread2$1(_objectSpread2$1({}, params), {}, {
      mask: mask
    }));
  };
}

var render = function render(iconDefinition) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$transform = params.transform,
      transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
      _params$symbol = params.symbol,
      symbol = _params$symbol === void 0 ? false : _params$symbol,
      _params$mask = params.mask,
      mask = _params$mask === void 0 ? null : _params$mask,
      _params$maskId = params.maskId,
      maskId = _params$maskId === void 0 ? null : _params$maskId,
      _params$title = params.title,
      title = _params$title === void 0 ? null : _params$title,
      _params$titleId = params.titleId,
      titleId = _params$titleId === void 0 ? null : _params$titleId,
      _params$classes = params.classes,
      classes = _params$classes === void 0 ? [] : _params$classes,
      _params$attributes = params.attributes,
      attributes = _params$attributes === void 0 ? {} : _params$attributes,
      _params$styles = params.styles,
      styles = _params$styles === void 0 ? {} : _params$styles;
  if (!iconDefinition) return;
  var prefix = iconDefinition.prefix,
      iconName = iconDefinition.iconName,
      icon = iconDefinition.icon;
  return domVariants(_objectSpread2$1({
    type: 'icon'
  }, iconDefinition), function () {
    callHooks('beforeDOMElementCreation', {
      iconDefinition: iconDefinition,
      params: params
    });

    if (config.autoA11y) {
      if (title) {
        attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        attributes['aria-hidden'] = 'true';
        attributes['focusable'] = 'false';
      }
    }

    return makeInlineSvgAbstract({
      icons: {
        main: asFoundIcon(icon),
        mask: mask ? asFoundIcon(mask.icon) : {
          found: false,
          width: null,
          height: null,
          icon: {}
        }
      },
      prefix: prefix,
      iconName: iconName,
      transform: _objectSpread2$1(_objectSpread2$1({}, meaninglessTransform), transform),
      symbol: symbol,
      title: title,
      maskId: maskId,
      titleId: titleId,
      extra: {
        attributes: attributes,
        styles: styles,
        classes: classes
      }
    });
  });
};

var ReplaceElements = {
  mixout: function mixout() {
    return {
      icon: resolveIcons(render)
    };
  },
  hooks: function hooks() {
    return {
      mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
        accumulator.treeCallback = onTree;
        accumulator.nodeCallback = onNode;
        return accumulator;
      }
    };
  },
  provides: function provides(providers$$1) {
    providers$$1.i2svg = function (params) {
      var _params$node = params.node,
          node = _params$node === void 0 ? DOCUMENT : _params$node,
          _params$callback = params.callback,
          callback = _params$callback === void 0 ? function () {} : _params$callback;
      return onTree(node, callback);
    };

    providers$$1.generateSvgReplacementMutation = function (node, nodeMeta) {
      var iconName = nodeMeta.iconName,
          title = nodeMeta.title,
          titleId = nodeMeta.titleId,
          prefix = nodeMeta.prefix,
          transform = nodeMeta.transform,
          symbol = nodeMeta.symbol,
          mask = nodeMeta.mask,
          maskId = nodeMeta.maskId,
          extra = nodeMeta.extra;
      return new Promise(function (resolve, reject) {
        Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
          found: false,
          width: 512,
          height: 512,
          icon: {}
        })]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              main = _ref2[0],
              mask = _ref2[1];

          resolve([node, makeInlineSvgAbstract({
            icons: {
              main: main,
              mask: mask
            },
            prefix: prefix,
            iconName: iconName,
            transform: transform,
            symbol: symbol,
            maskId: maskId,
            title: title,
            titleId: titleId,
            extra: extra,
            watchable: true
          })]);
        }).catch(reject);
      });
    };

    providers$$1.generateAbstractIcon = function (_ref3) {
      var children = _ref3.children,
          attributes = _ref3.attributes,
          main = _ref3.main,
          transform = _ref3.transform,
          styles = _ref3.styles;
      var styleString = joinStyles(styles);

      if (styleString.length > 0) {
        attributes['style'] = styleString;
      }

      var nextChild;

      if (transformIsMeaningful(transform)) {
        nextChild = callProvided('generateAbstractTransformGrouping', {
          main: main,
          transform: transform,
          containerWidth: main.width,
          iconWidth: main.width
        });
      }

      children.push(nextChild || main.icon);
      return {
        children: children,
        attributes: attributes
      };
    };
  }
};
var Layers = {
  mixout: function mixout() {
    return {
      layer: function layer(assembler) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _params$classes = params.classes,
            classes = _params$classes === void 0 ? [] : _params$classes;
        return domVariants({
          type: 'layer'
        }, function () {
          callHooks('beforeDOMElementCreation', {
            assembler: assembler,
            params: params
          });
          var children = [];
          assembler(function (args) {
            Array.isArray(args) ? args.map(function (a) {
              children = children.concat(a.abstract);
            }) : children = children.concat(args.abstract);
          });
          return [{
            tag: 'span',
            attributes: {
              class: ["".concat(config.familyPrefix, "-layers")].concat(_toConsumableArray$2(classes)).join(' ')
            },
            children: children
          }];
        });
      }
    };
  }
};
var LayersCounter = {
  mixout: function mixout() {
    return {
      counter: function counter(content) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _params$title = params.title,
            title = _params$title === void 0 ? null : _params$title,
            _params$classes = params.classes,
            classes = _params$classes === void 0 ? [] : _params$classes,
            _params$attributes = params.attributes,
            attributes = _params$attributes === void 0 ? {} : _params$attributes,
            _params$styles = params.styles,
            styles = _params$styles === void 0 ? {} : _params$styles;
        return domVariants({
          type: 'counter',
          content: content
        }, function () {
          callHooks('beforeDOMElementCreation', {
            content: content,
            params: params
          });
          return makeLayersCounterAbstract({
            content: content.toString(),
            title: title,
            extra: {
              attributes: attributes,
              styles: styles,
              classes: ["".concat(config.familyPrefix, "-layers-counter")].concat(_toConsumableArray$2(classes))
            }
          });
        });
      }
    };
  }
};
var LayersText = {
  mixout: function mixout() {
    return {
      text: function text(content) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _params$transform = params.transform,
            transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
            _params$title = params.title,
            title = _params$title === void 0 ? null : _params$title,
            _params$classes = params.classes,
            classes = _params$classes === void 0 ? [] : _params$classes,
            _params$attributes = params.attributes,
            attributes = _params$attributes === void 0 ? {} : _params$attributes,
            _params$styles = params.styles,
            styles = _params$styles === void 0 ? {} : _params$styles;
        return domVariants({
          type: 'text',
          content: content
        }, function () {
          callHooks('beforeDOMElementCreation', {
            content: content,
            params: params
          });
          return makeLayersTextAbstract({
            content: content,
            transform: _objectSpread2$1(_objectSpread2$1({}, meaninglessTransform), transform),
            title: title,
            extra: {
              attributes: attributes,
              styles: styles,
              classes: ["".concat(config.familyPrefix, "-layers-text")].concat(_toConsumableArray$2(classes))
            }
          });
        });
      }
    };
  },
  provides: function provides(providers$$1) {
    providers$$1.generateLayersText = function (node, nodeMeta) {
      var title = nodeMeta.title,
          transform = nodeMeta.transform,
          extra = nodeMeta.extra;
      var width = null;
      var height = null;

      if (IS_IE) {
        var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
        var boundingClientRect = node.getBoundingClientRect();
        width = boundingClientRect.width / computedFontSize;
        height = boundingClientRect.height / computedFontSize;
      }

      if (config.autoA11y && !title) {
        extra.attributes['aria-hidden'] = 'true';
      }

      return Promise.resolve([node, makeLayersTextAbstract({
        content: node.innerHTML,
        width: width,
        height: height,
        transform: transform,
        title: title,
        extra: extra,
        watchable: true
      })]);
    };
  }
};
var CLEAN_CONTENT_PATTERN = new RegExp("\"", 'ug');
var SECONDARY_UNICODE_RANGE = [1105920, 1112319];

function hexValueFromContent(content) {
  var cleaned = content.replace(CLEAN_CONTENT_PATTERN, '');
  var codePoint = codePointAt(cleaned, 0);
  var isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
  var isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
  return {
    value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
    isSecondary: isPrependTen || isDoubled
  };
}

function replaceForPosition(node, position) {
  var pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));
  return new Promise(function (resolve, reject) {
    if (node.getAttribute(pendingAttribute) !== null) {
      // This node is already being processed
      return resolve();
    }

    var children = toArray(node.children);
    var alreadyProcessedPseudoElement = children.filter(function (c) {
      return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;
    })[0];
    var styles = WINDOW.getComputedStyle(node, position);
    var fontFamily = styles.getPropertyValue('font-family').match(FONT_FAMILY_PATTERN);
    var fontWeight = styles.getPropertyValue('font-weight');
    var content = styles.getPropertyValue('content');

    if (alreadyProcessedPseudoElement && !fontFamily) {
      // If we've already processed it but the current computed style does not result in a font-family,
      // that probably means that a class name that was previously present to make the icon has been
      // removed. So we now should delete the icon.
      node.removeChild(alreadyProcessedPseudoElement);
      return resolve();
    } else if (fontFamily && content !== 'none' && content !== '') {
      var _content = styles.getPropertyValue('content');

      var prefix = ~['Solid', 'Regular', 'Light', 'Thin', 'Duotone', 'Brands', 'Kit'].indexOf(fontFamily[2]) ? STYLE_TO_PREFIX[fontFamily[2].toLowerCase()] : FONT_WEIGHT_TO_PREFIX[fontWeight];

      var _hexValueFromContent = hexValueFromContent(_content),
          hexValue = _hexValueFromContent.value,
          isSecondary = _hexValueFromContent.isSecondary;

      var isV4 = fontFamily[0].startsWith('FontAwesome');
      var iconName = byUnicode(prefix, hexValue);
      var iconIdentifier = iconName;

      if (isV4) {
        var iconName4 = byOldUnicode(hexValue);

        if (iconName4.iconName && iconName4.prefix) {
          iconName = iconName4.iconName;
          prefix = iconName4.prefix;
        }
      } // Only convert the pseudo element in this ::before/::after position into an icon if we haven't
      // already done so with the same prefix and iconName


      if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
        node.setAttribute(pendingAttribute, iconIdentifier);

        if (alreadyProcessedPseudoElement) {
          // Delete the old one, since we're replacing it with a new one
          node.removeChild(alreadyProcessedPseudoElement);
        }

        var meta = blankMeta();
        var extra = meta.extra;
        extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
        findIcon(iconName, prefix).then(function (main) {
          var abstract = makeInlineSvgAbstract(_objectSpread2$1(_objectSpread2$1({}, meta), {}, {
            icons: {
              main: main,
              mask: emptyCanonicalIcon()
            },
            prefix: prefix,
            iconName: iconIdentifier,
            extra: extra,
            watchable: true
          }));
          var element = DOCUMENT.createElement('svg');

          if (position === '::before') {
            node.insertBefore(element, node.firstChild);
          } else {
            node.appendChild(element);
          }

          element.outerHTML = abstract.map(function (a) {
            return toHtml(a);
          }).join('\n');
          node.removeAttribute(pendingAttribute);
          resolve();
        }).catch(reject);
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
}

function replace(node) {
  return Promise.all([replaceForPosition(node, '::before'), replaceForPosition(node, '::after')]);
}

function processable(node) {
  return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');
}

function searchPseudoElements(root) {
  if (!IS_DOM) return;
  return new Promise(function (resolve, reject) {
    var operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);
    var end = perf.begin('searchPseudoElements');
    disableObservation();
    Promise.all(operations).then(function () {
      end();
      enableObservation();
      resolve();
    }).catch(function () {
      end();
      enableObservation();
      reject();
    });
  });
}

var PseudoElements = {
  hooks: function hooks() {
    return {
      mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
        accumulator.pseudoElementsCallback = searchPseudoElements;
        return accumulator;
      }
    };
  },
  provides: function provides(providers$$1) {
    providers$$1.pseudoElements2svg = function (params) {
      var _params$node = params.node,
          node = _params$node === void 0 ? DOCUMENT : _params$node;

      if (config.searchPseudoElements) {
        searchPseudoElements(node);
      }
    };
  }
};
var _unwatched = false;
var MutationObserver$1 = {
  mixout: function mixout() {
    return {
      dom: {
        unwatch: function unwatch() {
          disableObservation();
          _unwatched = true;
        }
      }
    };
  },
  hooks: function hooks() {
    return {
      bootstrap: function bootstrap() {
        observe$1(chainHooks('mutationObserverCallbacks', {}));
      },
      noAuto: function noAuto() {
        disconnect();
      },
      watch: function watch(params) {
        var observeMutationsRoot = params.observeMutationsRoot;

        if (_unwatched) {
          enableObservation();
        } else {
          observe$1(chainHooks('mutationObserverCallbacks', {
            observeMutationsRoot: observeMutationsRoot
          }));
        }
      }
    };
  }
};

var parseTransformString = function parseTransformString(transformString) {
  var transform = {
    size: 16,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    rotate: 0
  };
  return transformString.toLowerCase().split(' ').reduce(function (acc, n) {
    var parts = n.toLowerCase().split('-');
    var first = parts[0];
    var rest = parts.slice(1).join('-');

    if (first && rest === 'h') {
      acc.flipX = true;
      return acc;
    }

    if (first && rest === 'v') {
      acc.flipY = true;
      return acc;
    }

    rest = parseFloat(rest);

    if (isNaN(rest)) {
      return acc;
    }

    switch (first) {
      case 'grow':
        acc.size = acc.size + rest;
        break;

      case 'shrink':
        acc.size = acc.size - rest;
        break;

      case 'left':
        acc.x = acc.x - rest;
        break;

      case 'right':
        acc.x = acc.x + rest;
        break;

      case 'up':
        acc.y = acc.y - rest;
        break;

      case 'down':
        acc.y = acc.y + rest;
        break;

      case 'rotate':
        acc.rotate = acc.rotate + rest;
        break;
    }

    return acc;
  }, transform);
};

var PowerTransforms = {
  mixout: function mixout() {
    return {
      parse: {
        transform: function transform(transformString) {
          return parseTransformString(transformString);
        }
      }
    };
  },
  hooks: function hooks() {
    return {
      parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
        var transformString = node.getAttribute('data-fa-transform');

        if (transformString) {
          accumulator.transform = parseTransformString(transformString);
        }

        return accumulator;
      }
    };
  },
  provides: function provides(providers) {
    providers.generateAbstractTransformGrouping = function (_ref) {
      var main = _ref.main,
          transform = _ref.transform,
          containerWidth = _ref.containerWidth,
          iconWidth = _ref.iconWidth;
      var outer = {
        transform: "translate(".concat(containerWidth / 2, " 256)")
      };
      var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
      var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
      var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
      var inner = {
        transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
      };
      var path = {
        transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
      };
      var operations = {
        outer: outer,
        inner: inner,
        path: path
      };
      return {
        tag: 'g',
        attributes: _objectSpread2$1({}, operations.outer),
        children: [{
          tag: 'g',
          attributes: _objectSpread2$1({}, operations.inner),
          children: [{
            tag: main.icon.tag,
            children: main.icon.children,
            attributes: _objectSpread2$1(_objectSpread2$1({}, main.icon.attributes), operations.path)
          }]
        }]
      };
    };
  }
};
var ALL_SPACE = {
  x: 0,
  y: 0,
  width: '100%',
  height: '100%'
};

function fillBlack(abstract) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (abstract.attributes && (abstract.attributes.fill || force)) {
    abstract.attributes.fill = 'black';
  }

  return abstract;
}

function deGroup(abstract) {
  if (abstract.tag === 'g') {
    return abstract.children;
  } else {
    return [abstract];
  }
}

var Masks = {
  hooks: function hooks() {
    return {
      parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
        var maskData = node.getAttribute('data-fa-mask');
        var mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(' ').map(function (i) {
          return i.trim();
        }));

        if (!mask.prefix) {
          mask.prefix = getDefaultUsablePrefix();
        }

        accumulator.mask = mask;
        accumulator.maskId = node.getAttribute('data-fa-mask-id');
        return accumulator;
      }
    };
  },
  provides: function provides(providers) {
    providers.generateAbstractMask = function (_ref) {
      var children = _ref.children,
          attributes = _ref.attributes,
          main = _ref.main,
          mask = _ref.mask,
          explicitMaskId = _ref.maskId,
          transform = _ref.transform;
      var mainWidth = main.width,
          mainPath = main.icon;
      var maskWidth = mask.width,
          maskPath = mask.icon;
      var trans = transformForSvg({
        transform: transform,
        containerWidth: maskWidth,
        iconWidth: mainWidth
      });
      var maskRect = {
        tag: 'rect',
        attributes: _objectSpread2$1(_objectSpread2$1({}, ALL_SPACE), {}, {
          fill: 'white'
        })
      };
      var maskInnerGroupChildrenMixin = mainPath.children ? {
        children: mainPath.children.map(fillBlack)
      } : {};
      var maskInnerGroup = {
        tag: 'g',
        attributes: _objectSpread2$1({}, trans.inner),
        children: [fillBlack(_objectSpread2$1({
          tag: mainPath.tag,
          attributes: _objectSpread2$1(_objectSpread2$1({}, mainPath.attributes), trans.path)
        }, maskInnerGroupChildrenMixin))]
      };
      var maskOuterGroup = {
        tag: 'g',
        attributes: _objectSpread2$1({}, trans.outer),
        children: [maskInnerGroup]
      };
      var maskId = "mask-".concat(explicitMaskId || nextUniqueId());
      var clipId = "clip-".concat(explicitMaskId || nextUniqueId());
      var maskTag = {
        tag: 'mask',
        attributes: _objectSpread2$1(_objectSpread2$1({}, ALL_SPACE), {}, {
          id: maskId,
          maskUnits: 'userSpaceOnUse',
          maskContentUnits: 'userSpaceOnUse'
        }),
        children: [maskRect, maskOuterGroup]
      };
      var defs = {
        tag: 'defs',
        children: [{
          tag: 'clipPath',
          attributes: {
            id: clipId
          },
          children: deGroup(maskPath)
        }, maskTag]
      };
      children.push(defs, {
        tag: 'rect',
        attributes: _objectSpread2$1({
          fill: 'currentColor',
          'clip-path': "url(#".concat(clipId, ")"),
          mask: "url(#".concat(maskId, ")")
        }, ALL_SPACE)
      });
      return {
        children: children,
        attributes: attributes
      };
    };
  }
};
var MissingIconIndicator = {
  provides: function provides(providers) {
    var reduceMotion = false;

    if (WINDOW.matchMedia) {
      reduceMotion = WINDOW.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    providers.missingIconAbstract = function () {
      var gChildren = [];
      var FILL = {
        fill: 'currentColor'
      };
      var ANIMATION_BASE = {
        attributeType: 'XML',
        repeatCount: 'indefinite',
        dur: '2s'
      }; // Ring

      gChildren.push({
        tag: 'path',
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
        })
      });

      var OPACITY_ANIMATE = _objectSpread2$1(_objectSpread2$1({}, ANIMATION_BASE), {}, {
        attributeName: 'opacity'
      });

      var dot = {
        tag: 'circle',
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          cx: '256',
          cy: '364',
          r: '28'
        }),
        children: []
      };

      if (!reduceMotion) {
        dot.children.push({
          tag: 'animate',
          attributes: _objectSpread2$1(_objectSpread2$1({}, ANIMATION_BASE), {}, {
            attributeName: 'r',
            values: '28;14;28;28;14;28;'
          })
        }, {
          tag: 'animate',
          attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
            values: '1;0;1;1;0;1;'
          })
        });
      }

      gChildren.push(dot);
      gChildren.push({
        tag: 'path',
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          opacity: '1',
          d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
        }),
        children: reduceMotion ? [] : [{
          tag: 'animate',
          attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
            values: '1;0;0;0;0;1;'
          })
        }]
      });

      if (!reduceMotion) {
        // Exclamation
        gChildren.push({
          tag: 'path',
          attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
            opacity: '0',
            d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
          }),
          children: [{
            tag: 'animate',
            attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
              values: '0;0;1;1;0;0;'
            })
          }]
        });
      }

      return {
        tag: 'g',
        attributes: {
          'class': 'missing'
        },
        children: gChildren
      };
    };
  }
};
var SvgSymbols = {
  hooks: function hooks() {
    return {
      parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
        var symbolData = node.getAttribute('data-fa-symbol');
        var symbol = symbolData === null ? false : symbolData === '' ? true : symbolData;
        accumulator['symbol'] = symbol;
        return accumulator;
      }
    };
  }
};
var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];
registerPlugins(plugins, {
  mixoutsTo: api
});
var parse$1 = api.parse;
var icon = api.icon;

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.block") : 60121,
    w = b ? Symbol.for("react.fundamental") : 60117,
    x = b ? Symbol.for("react.responder") : 60118,
    y = b ? Symbol.for("react.scope") : 60119;

function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;

              default:
                return u;
            }

        }

      case d:
        return u;
    }
  }
}

function A(a) {
  return z(a) === m;
}

var AsyncMode = l;
var ConcurrentMode = m;
var ContextConsumer = k;
var ContextProvider = h;
var Element = c;
var ForwardRef = n;
var Fragment = e;
var Lazy = t;
var Memo = r;
var Portal = d;
var Profiler = g;
var StrictMode = f;
var Suspense = p;

var isAsyncMode = function isAsyncMode(a) {
  return A(a) || z(a) === l;
};

var isConcurrentMode = A;

var isContextConsumer = function isContextConsumer(a) {
  return z(a) === k;
};

var isContextProvider = function isContextProvider(a) {
  return z(a) === h;
};

var isElement = function isElement(a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};

var isForwardRef = function isForwardRef(a) {
  return z(a) === n;
};

var isFragment = function isFragment(a) {
  return z(a) === e;
};

var isLazy = function isLazy(a) {
  return z(a) === t;
};

var isMemo = function isMemo(a) {
  return z(a) === r;
};

var isPortal = function isPortal(a) {
  return z(a) === d;
};

var isProfiler = function isProfiler(a) {
  return z(a) === g;
};

var isStrictMode = function isStrictMode(a) {
  return z(a) === f;
};

var isSuspense = function isSuspense(a) {
  return z(a) === p;
};

var isValidElementType = function isValidElementType(a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};

var typeOf = z;
var reactIs_production_min = {
  AsyncMode: AsyncMode,
  ConcurrentMode: ConcurrentMode,
  ContextConsumer: ContextConsumer,
  ContextProvider: ContextProvider,
  Element: Element,
  ForwardRef: ForwardRef,
  Fragment: Fragment,
  Lazy: Lazy,
  Memo: Memo,
  Portal: Portal,
  Profiler: Profiler,
  StrictMode: StrictMode,
  Suspense: Suspense,
  isAsyncMode: isAsyncMode,
  isConcurrentMode: isConcurrentMode,
  isContextConsumer: isContextConsumer,
  isContextProvider: isContextProvider,
  isElement: isElement,
  isForwardRef: isForwardRef,
  isFragment: isFragment,
  isLazy: isLazy,
  isMemo: isMemo,
  isPortal: isPortal,
  isProfiler: isProfiler,
  isStrictMode: isStrictMode,
  isSuspense: isSuspense,
  isValidElementType: isValidElementType,
  typeOf: typeOf
};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
createCommonjsModule(function (module, exports) {
});

createCommonjsModule(function (module) {

  {
    module.exports = reactIs_production_min;
  }
});

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

var ReactPropTypesSecret = ReactPropTypesSecret_1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function factoryWithThrowingShims() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

var require$$2 = factoryWithThrowingShims;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var propTypes = createCommonjsModule(function (module) {
  {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = require$$2();
  }
});
var PropTypes = propTypes;

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose$2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose$2(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
}

function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
} // Get CSS class list from a props object


function classList(props) {
  var _classes;

  var beat = props.beat,
      fade = props.fade,
      beatFade = props.beatFade,
      bounce = props.bounce,
      shake = props.shake,
      flash = props.flash,
      spin = props.spin,
      spinPulse = props.spinPulse,
      spinReverse = props.spinReverse,
      pulse = props.pulse,
      fixedWidth = props.fixedWidth,
      inverse = props.inverse,
      border = props.border,
      listItem = props.listItem,
      flip = props.flip,
      size = props.size,
      rotation = props.rotation,
      pull = props.pull; // map of CSS class names to properties

  var classes = (_classes = {
    'fa-beat': beat,
    'fa-fade': fade,
    'fa-beat-fade': beatFade,
    'fa-bounce': bounce,
    'fa-shake': shake,
    'fa-flash': flash,
    'fa-spin': spin,
    'fa-spin-reverse': spinReverse,
    'fa-spin-pulse': spinPulse,
    'fa-pulse': pulse,
    'fa-fw': fixedWidth,
    'fa-inverse': inverse,
    'fa-border': border,
    'fa-li': listItem,
    'fa-flip-horizontal': flip === 'horizontal' || flip === 'both',
    'fa-flip-vertical': flip === 'vertical' || flip === 'both'
  }, _defineProperty$1(_classes, "fa-".concat(size), typeof size !== 'undefined' && size !== null), _defineProperty$1(_classes, "fa-rotate-".concat(rotation), typeof rotation !== 'undefined' && rotation !== null && rotation !== 0), _defineProperty$1(_classes, "fa-pull-".concat(pull), typeof pull !== 'undefined' && pull !== null), _defineProperty$1(_classes, 'fa-swap-opacity', props.swapOpacity), _classes); // map over all the keys in the classes object
  // return an array of the keys where the value for the key is not null

  return Object.keys(classes).map(function (key) {
    return classes[key] ? key : null;
  }).filter(function (key) {
    return key;
  });
} // Camelize taken from humps
// humps is copyright © 2012+ Dom Christie
// Released under the MIT license.
// Performant way to determine if object coerces to a number


function _isNumerical(obj) {
  obj = obj - 0; // eslint-disable-next-line no-self-compare

  return obj === obj;
}

function camelize(string) {
  if (_isNumerical(string)) {
    return string;
  } // eslint-disable-next-line no-useless-escape


  string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : '';
  }); // Ensure 1st char is always lowercase

  return string.substr(0, 1).toLowerCase() + string.substr(1);
}

var _excluded$1$1 = ["style"];

function capitalize(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

function styleToObject(style) {
  return style.split(';').map(function (s) {
    return s.trim();
  }).filter(function (s) {
    return s;
  }).reduce(function (acc, pair) {
    var i = pair.indexOf(':');
    var prop = camelize(pair.slice(0, i));
    var value = pair.slice(i + 1).trim();
    prop.startsWith('webkit') ? acc[capitalize(prop)] = value : acc[prop] = value;
    return acc;
  }, {});
}

function convert(createElement, element) {
  var extraProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (typeof element === 'string') {
    return element;
  }

  var children = (element.children || []).map(function (child) {
    return convert(createElement, child);
  });
  /* eslint-disable dot-notation */

  var mixins = Object.keys(element.attributes || {}).reduce(function (acc, key) {
    var val = element.attributes[key];

    switch (key) {
      case 'class':
        acc.attrs['className'] = val;
        delete element.attributes['class'];
        break;

      case 'style':
        acc.attrs['style'] = styleToObject(val);
        break;

      default:
        if (key.indexOf('aria-') === 0 || key.indexOf('data-') === 0) {
          acc.attrs[key.toLowerCase()] = val;
        } else {
          acc.attrs[camelize(key)] = val;
        }

    }

    return acc;
  }, {
    attrs: {}
  });

  var _extraProps$style = extraProps.style,
      existingStyle = _extraProps$style === void 0 ? {} : _extraProps$style,
      remaining = _objectWithoutProperties$1(extraProps, _excluded$1$1);

  mixins.attrs['style'] = _objectSpread2(_objectSpread2({}, mixins.attrs['style']), existingStyle);
  /* eslint-enable */

  return createElement.apply(void 0, [element.tag, _objectSpread2(_objectSpread2({}, mixins.attrs), remaining)].concat(_toConsumableArray$1(children)));
}

var PRODUCTION = false;

try {
  PRODUCTION = "production" === 'production';
} catch (e) {}

function log() {
  if (!PRODUCTION && console && typeof console.error === 'function') {
    var _console;

    (_console = console).error.apply(_console, arguments);
  }
}

function normalizeIconArgs(icon) {
  // this has everything that it needs to be rendered which means it was probably imported
  // directly from an icon svg package
  if (icon && _typeof(icon) === 'object' && icon.prefix && icon.iconName && icon.icon) {
    return icon;
  }

  if (parse$1.icon) {
    return parse$1.icon(icon);
  } // if the icon is null, there's nothing to do


  if (icon === null) {
    return null;
  } // if the icon is an object and has a prefix and an icon name, return it


  if (icon && _typeof(icon) === 'object' && icon.prefix && icon.iconName) {
    return icon;
  } // if it's an array with length of two


  if (Array.isArray(icon) && icon.length === 2) {
    // use the first item as prefix, second as icon name
    return {
      prefix: icon[0],
      iconName: icon[1]
    };
  } // if it's a string, use it as the icon name


  if (typeof icon === 'string') {
    return {
      prefix: 'fas',
      iconName: icon
    };
  }
} // creates an object with a key of key
// and a value of value
// if certain conditions are met


function objectWithKey(key, value) {
  // if the value is a non-empty array
  // or it's not an array but it is truthy
  // then create the object with the key and the value
  // if not, return an empty array
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? _defineProperty$1({}, key, value) : {};
}

var _excluded$7 = ["forwardedRef"];

function FontAwesomeIcon(_ref) {
  var forwardedRef = _ref.forwardedRef,
      props = _objectWithoutProperties$1(_ref, _excluded$7);

  var iconArgs = props.icon,
      maskArgs = props.mask,
      symbol = props.symbol,
      className = props.className,
      title = props.title,
      titleId = props.titleId,
      maskId = props.maskId;
  var iconLookup = normalizeIconArgs(iconArgs);
  var classes = objectWithKey('classes', [].concat(_toConsumableArray$1(classList(props)), _toConsumableArray$1(className.split(' '))));
  var transform = objectWithKey('transform', typeof props.transform === 'string' ? parse$1.transform(props.transform) : props.transform);
  var mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
  var renderedIcon = icon(iconLookup, _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, classes), transform), mask), {}, {
    symbol: symbol,
    title: title,
    titleId: titleId,
    maskId: maskId
  }));

  if (!renderedIcon) {
    log('Could not find icon', iconLookup);
    return null;
  }

  var abstract = renderedIcon.abstract;
  var extraProps = {
    ref: forwardedRef
  };
  Object.keys(props).forEach(function (key) {
    // eslint-disable-next-line no-prototype-builtins
    if (!FontAwesomeIcon.defaultProps.hasOwnProperty(key)) {
      extraProps[key] = props[key];
    }
  });
  return convertCurry(abstract[0], extraProps);
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon';
FontAwesomeIcon.propTypes = {
  beat: PropTypes.bool,
  border: PropTypes.bool,
  bounce: PropTypes.bool,
  className: PropTypes.string,
  fade: PropTypes.bool,
  flash: PropTypes.bool,
  mask: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  maskId: PropTypes.string,
  fixedWidth: PropTypes.bool,
  inverse: PropTypes.bool,
  flip: PropTypes.oneOf(['horizontal', 'vertical', 'both']),
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  listItem: PropTypes.bool,
  pull: PropTypes.oneOf(['right', 'left']),
  pulse: PropTypes.bool,
  rotation: PropTypes.oneOf([0, 90, 180, 270]),
  shake: PropTypes.bool,
  size: PropTypes.oneOf(['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']),
  spin: PropTypes.bool,
  spinPulse: PropTypes.bool,
  spinReverse: PropTypes.bool,
  symbol: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  title: PropTypes.string,
  titleId: PropTypes.string,
  transform: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  swapOpacity: PropTypes.bool
};
FontAwesomeIcon.defaultProps = {
  border: false,
  className: '',
  mask: null,
  maskId: null,
  fixedWidth: false,
  inverse: false,
  flip: null,
  icon: null,
  listItem: false,
  pull: null,
  pulse: false,
  rotation: null,
  size: null,
  spin: false,
  beat: false,
  fade: false,
  beatFade: false,
  bounce: false,
  shake: false,
  symbol: false,
  title: '',
  titleId: null,
  transform: null,
  swapOpacity: false
};
var convertCurry = convert.bind(null, React__default.createElement);

var faAngleDown={prefix:'fas',iconName:'angle-down',icon:[384,512,[8964],"f107","M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"]};var faAngleUp={prefix:'fas',iconName:'angle-up',icon:[384,512,[8963],"f106","M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"]};var faCheck={prefix:'fas',iconName:'check',icon:[448,512,[10004,10003],"f00c","M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"]};var faCircleQuestion={prefix:'fas',iconName:'circle-question',icon:[512,512,[62108,"question-circle"],"f059","M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"]};var faQuestionCircle=faCircleQuestion;var faCode={prefix:'fas',iconName:'code',icon:[640,512,[],"f121","M414.8 40.79L286.8 488.8C281.9 505.8 264.2 515.6 247.2 510.8C230.2 505.9 220.4 488.2 225.2 471.2L353.2 23.21C358.1 6.216 375.8-3.624 392.8 1.232C409.8 6.087 419.6 23.8 414.8 40.79H414.8zM518.6 121.4L630.6 233.4C643.1 245.9 643.1 266.1 630.6 278.6L518.6 390.6C506.1 403.1 485.9 403.1 473.4 390.6C460.9 378.1 460.9 357.9 473.4 345.4L562.7 256L473.4 166.6C460.9 154.1 460.9 133.9 473.4 121.4C485.9 108.9 506.1 108.9 518.6 121.4V121.4zM166.6 166.6L77.25 256L166.6 345.4C179.1 357.9 179.1 378.1 166.6 390.6C154.1 403.1 133.9 403.1 121.4 390.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4L121.4 121.4C133.9 108.9 154.1 108.9 166.6 121.4C179.1 133.9 179.1 154.1 166.6 166.6V166.6z"]};var faCodeBranch={prefix:'fas',iconName:'code-branch',icon:[448,512,[],"f126","M160 80C160 112.8 140.3 140.1 112 153.3V241.1C130.8 230.2 152.7 224 176 224H272C307.3 224 336 195.3 336 160V153.3C307.7 140.1 288 112.8 288 80C288 35.82 323.8 0 368 0C412.2 0 448 35.82 448 80C448 112.8 428.3 140.1 400 153.3V160C400 230.7 342.7 288 272 288H176C140.7 288 112 316.7 112 352V358.7C140.3 371 160 399.2 160 432C160 476.2 124.2 512 80 512C35.82 512 0 476.2 0 432C0 399.2 19.75 371 48 358.7V153.3C19.75 140.1 0 112.8 0 80C0 35.82 35.82 0 80 0C124.2 0 160 35.82 160 80V80zM80 104C93.25 104 104 93.25 104 80C104 66.75 93.25 56 80 56C66.75 56 56 66.75 56 80C56 93.25 66.75 104 80 104zM368 56C354.7 56 344 66.75 344 80C344 93.25 354.7 104 368 104C381.3 104 392 93.25 392 80C392 66.75 381.3 56 368 56zM80 456C93.25 456 104 445.3 104 432C104 418.7 93.25 408 80 408C66.75 408 56 418.7 56 432C56 445.3 66.75 456 80 456z"]};var faCookieBite={prefix:'fas',iconName:'cookie-bite',icon:[512,512,[],"f564","M494.6 255.9c-65.63-.8203-118.6-54.14-118.6-119.9c-65.74 0-119.1-52.97-119.8-118.6c-25.66-3.867-51.8 .2346-74.77 12.07L116.7 62.41C93.35 74.36 74.36 93.35 62.41 116.7L29.6 181.2c-11.95 23.44-16.17 49.92-12.07 75.94l11.37 71.48c4.102 25.9 16.29 49.8 34.81 68.32l51.36 51.39C133.6 466.9 157.3 479 183.2 483.1l71.84 11.37c25.9 4.101 52.27-.1172 75.59-11.95l64.81-33.05c23.32-11.84 42.31-30.82 54.14-54.14l32.93-64.57C494.3 307.7 498.5 281.4 494.6 255.9zM176 367.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S193.6 367.1 176 367.1zM208 208c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S225.6 208 208 208zM368 335.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S385.6 335.1 368 335.1z"]};var faCopy={prefix:'fas',iconName:'copy',icon:[512,512,[],"f0c5","M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"]};var faDatabase={prefix:'fas',iconName:'database',icon:[448,512,[],"f1c0","M448 80V128C448 172.2 347.7 208 224 208C100.3 208 0 172.2 0 128V80C0 35.82 100.3 0 224 0C347.7 0 448 35.82 448 80zM393.2 214.7C413.1 207.3 433.1 197.8 448 186.1V288C448 332.2 347.7 368 224 368C100.3 368 0 332.2 0 288V186.1C14.93 197.8 34.02 207.3 54.85 214.7C99.66 230.7 159.5 240 224 240C288.5 240 348.3 230.7 393.2 214.7V214.7zM54.85 374.7C99.66 390.7 159.5 400 224 400C288.5 400 348.3 390.7 393.2 374.7C413.1 367.3 433.1 357.8 448 346.1V432C448 476.2 347.7 512 224 512C100.3 512 0 476.2 0 432V346.1C14.93 357.8 34.02 367.3 54.85 374.7z"]};var faFile={prefix:'fas',iconName:'file',icon:[384,512,[128459,61462,128196],"f15b","M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256z"]};var faHourglass={prefix:'fas',iconName:'hourglass',icon:[384,512,[62032,9203,"hourglass-2","hourglass-half"],"f254","M352 0C369.7 0 384 14.33 384 32C384 49.67 369.7 64 352 64V74.98C352 117.4 335.1 158.1 305.1 188.1L237.3 256L305.1 323.9C335.1 353.9 352 394.6 352 437V448C369.7 448 384 462.3 384 480C384 497.7 369.7 512 352 512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448V437C32 394.6 48.86 353.9 78.86 323.9L146.7 256L78.86 188.1C48.86 158.1 32 117.4 32 74.98V64C14.33 64 0 49.67 0 32C0 14.33 14.33 0 32 0H352zM111.1 128H272C282.4 112.4 288 93.98 288 74.98V64H96V74.98C96 93.98 101.6 112.4 111.1 128zM111.1 384H272C268.5 378.7 264.5 373.7 259.9 369.1L192 301.3L124.1 369.1C119.5 373.7 115.5 378.7 111.1 384V384z"]};var faHourglassHalf=faHourglass;var faLightbulb={prefix:'fas',iconName:'lightbulb',icon:[384,512,[128161],"f0eb","M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"]};var faListUl={prefix:'fas',iconName:'list-ul',icon:[512,512,["list-dots"],"f0ca","M16 96C16 69.49 37.49 48 64 48C90.51 48 112 69.49 112 96C112 122.5 90.51 144 64 144C37.49 144 16 122.5 16 96zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H192C174.3 128 160 113.7 160 96C160 78.33 174.3 64 192 64H480zM480 224C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H192C174.3 288 160 273.7 160 256C160 238.3 174.3 224 192 224H480zM480 384C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H192C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384H480zM16 416C16 389.5 37.49 368 64 368C90.51 368 112 389.5 112 416C112 442.5 90.51 464 64 464C37.49 464 16 442.5 16 416zM112 256C112 282.5 90.51 304 64 304C37.49 304 16 282.5 16 256C16 229.5 37.49 208 64 208C90.51 208 112 229.5 112 256z"]};var faPaintRoller={prefix:'fas',iconName:'paint-roller',icon:[512,512,[],"f5aa","M0 64C0 28.65 28.65 0 64 0H352C387.3 0 416 28.65 416 64V128C416 163.3 387.3 192 352 192H64C28.65 192 0 163.3 0 128V64zM160 352C160 334.3 174.3 320 192 320V304C192 259.8 227.8 224 272 224H416C433.7 224 448 209.7 448 192V69.46C485.3 82.64 512 118.2 512 160V192C512 245 469 288 416 288H272C263.2 288 256 295.2 256 304V320C273.7 320 288 334.3 288 352V480C288 497.7 273.7 512 256 512H192C174.3 512 160 497.7 160 480V352z"]};var faPencil={prefix:'fas',iconName:'pencil',icon:[512,512,[61504,9999,"pencil-alt"],"f303","M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"]};var faPencilAlt=faPencil;var faRightLeft={prefix:'fas',iconName:'right-left',icon:[512,512,["exchange-alt"],"f362","M32 160h319.9l.0791 72c0 9.547 5.652 18.19 14.41 22c8.754 3.812 18.93 2.078 25.93-4.406l112-104c10.24-9.5 10.24-25.69 0-35.19l-112-104c-6.992-6.484-17.17-8.217-25.93-4.408c-8.758 3.816-14.41 12.46-14.41 22L351.9 96H32C14.31 96 0 110.3 0 127.1S14.31 160 32 160zM480 352H160.1L160 279.1c0-9.547-5.652-18.19-14.41-22C136.9 254.2 126.7 255.9 119.7 262.4l-112 104c-10.24 9.5-10.24 25.69 0 35.19l112 104c6.992 6.484 17.17 8.219 25.93 4.406C154.4 506.2 160 497.5 160 488L160.1 416H480c17.69 0 32-14.31 32-32S497.7 352 480 352z"]};var faExchangeAlt=faRightLeft;var faRotateRight={prefix:'fas',iconName:'rotate-right',icon:[512,512,["redo-alt","rotate-forward"],"f2f9","M468.9 32.11c13.87 0 27.18 10.77 27.18 27.04v145.9c0 10.59-8.584 19.17-19.17 19.17h-145.7c-16.28 0-27.06-13.32-27.06-27.2c0-6.634 2.461-13.4 7.96-18.9l45.12-45.14c-28.22-23.14-63.85-36.64-101.3-36.64c-88.09 0-159.8 71.69-159.8 159.8S167.8 415.9 255.9 415.9c73.14 0 89.44-38.31 115.1-38.31c18.48 0 31.97 15.04 31.97 31.96c0 35.04-81.59 70.41-147 70.41c-123.4 0-223.9-100.5-223.9-223.9S132.6 32.44 256 32.44c54.6 0 106.2 20.39 146.4 55.26l47.6-47.63C455.5 34.57 462.3 32.11 468.9 32.11z"]};var faRedoAlt=faRotateRight;var faSatelliteDish={prefix:'fas',iconName:'satellite-dish',icon:[512,512,[128225],"f7c0","M216 104C202.8 104 192 114.8 192 128s10.75 24 24 24c79.41 0 144 64.59 144 144C360 309.3 370.8 320 384 320s24-10.75 24-24C408 190.1 321.9 104 216 104zM224 0C206.3 0 192 14.31 192 32s14.33 32 32 32c123.5 0 224 100.5 224 224c0 17.69 14.33 32 32 32s32-14.31 32-32C512 129.2 382.8 0 224 0zM188.9 346l27.37-27.37c2.625 .625 5.059 1.506 7.809 1.506c17.75 0 31.99-14.26 31.99-32c0-17.62-14.24-32.01-31.99-32.01c-17.62 0-31.99 14.38-31.99 32.01c0 2.875 .8099 5.25 1.56 7.875L166.2 323.4L49.37 206.5c-7.25-7.25-20.12-6-24.1 3c-41.75 77.88-29.88 176.7 35.75 242.4c65.62 65.62 164.6 77.5 242.4 35.75c9.125-5 10.38-17.75 3-25L188.9 346z"]};var faShuffle={prefix:'fas',iconName:'shuffle',icon:[512,512,[128256,"random"],"f074","M424.1 287c-15.13-15.12-40.1-4.426-40.1 16.97V352H336L153.6 108.8C147.6 100.8 138.1 96 128 96H32C14.31 96 0 110.3 0 128s14.31 32 32 32h80l182.4 243.2C300.4 411.3 309.9 416 320 416h63.97v47.94c0 21.39 25.86 32.12 40.99 17l79.1-79.98c9.387-9.387 9.387-24.59 0-33.97L424.1 287zM336 160h47.97v48.03c0 21.39 25.87 32.09 40.1 16.97l79.1-79.98c9.387-9.391 9.385-24.59-.0013-33.97l-79.1-79.98c-15.13-15.12-40.99-4.391-40.99 17V96H320c-10.06 0-19.56 4.75-25.59 12.81L254 162.7L293.1 216L336 160zM112 352H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h96c10.06 0 19.56-4.75 25.59-12.81l40.4-53.87L154 296L112 352z"]};var faRandom=faShuffle;var faSliders={prefix:'fas',iconName:'sliders',icon:[512,512,["sliders-h"],"f1de","M0 416C0 398.3 14.33 384 32 384H86.66C99 355.7 127.2 336 160 336C192.8 336 220.1 355.7 233.3 384H480C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H233.3C220.1 476.3 192.8 496 160 496C127.2 496 99 476.3 86.66 448H32C14.33 448 0 433.7 0 416V416zM192 416C192 398.3 177.7 384 160 384C142.3 384 128 398.3 128 416C128 433.7 142.3 448 160 448C177.7 448 192 433.7 192 416zM352 176C384.8 176 412.1 195.7 425.3 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H425.3C412.1 316.3 384.8 336 352 336C319.2 336 291 316.3 278.7 288H32C14.33 288 0 273.7 0 256C0 238.3 14.33 224 32 224H278.7C291 195.7 319.2 176 352 176zM384 256C384 238.3 369.7 224 352 224C334.3 224 320 238.3 320 256C320 273.7 334.3 288 352 288C369.7 288 384 273.7 384 256zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H265.3C252.1 156.3 224.8 176 192 176C159.2 176 131 156.3 118.7 128H32C14.33 128 0 113.7 0 96C0 78.33 14.33 64 32 64H118.7C131 35.75 159.2 16 192 16C224.8 16 252.1 35.75 265.3 64H480zM160 96C160 113.7 174.3 128 192 128C209.7 128 224 113.7 224 96C224 78.33 209.7 64 192 64C174.3 64 160 78.33 160 96z"]};var faSlidersH=faSliders;var faStopwatch={prefix:'fas',iconName:'stopwatch',icon:[448,512,[9201],"f2f2","M272 0C289.7 0 304 14.33 304 32C304 49.67 289.7 64 272 64H256V98.45C293.5 104.2 327.7 120 355.7 143L377.4 121.4C389.9 108.9 410.1 108.9 422.6 121.4C435.1 133.9 435.1 154.1 422.6 166.6L398.5 190.8C419.7 223.3 432 262.2 432 304C432 418.9 338.9 512 224 512C109.1 512 16 418.9 16 304C16 200 92.32 113.8 192 98.45V64H176C158.3 64 144 49.67 144 32C144 14.33 158.3 0 176 0L272 0zM248 192C248 178.7 237.3 168 224 168C210.7 168 200 178.7 200 192V320C200 333.3 210.7 344 224 344C237.3 344 248 333.3 248 320V192z"]};var faTableCells={prefix:'fas',iconName:'table-cells',icon:[512,512,["th"],"f00a","M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM152 96H64V160H152V96zM208 160H296V96H208V160zM448 96H360V160H448V96zM64 288H152V224H64V288zM296 224H208V288H296V224zM360 288H448V224H360V288zM152 352H64V416H152V352zM208 416H296V352H208V416zM448 352H360V416H448V352z"]};var faTh=faTableCells;var faTriangleExclamation={prefix:'fas',iconName:'triangle-exclamation',icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"]};var faExclamationTriangle=faTriangleExclamation;var faUpRightFromSquare={prefix:'fas',iconName:'up-right-from-square',icon:[512,512,["external-link-alt"],"f35d","M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z"]};var faExternalLinkAlt=faUpRightFromSquare;var faUser={prefix:'fas',iconName:'user',icon:[448,512,[62144,128100],"f007","M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"]};var faWrench={prefix:'fas',iconName:'wrench',icon:[512,512,[128295],"f0ad","M507.6 122.8c-2.904-12.09-18.25-16.13-27.04-7.338l-76.55 76.56l-83.1-.0002l0-83.1l76.55-76.56c8.791-8.789 4.75-24.14-7.336-27.04c-23.69-5.693-49.34-6.111-75.92 .2484c-61.45 14.7-109.4 66.9-119.2 129.3C189.8 160.8 192.3 186.7 200.1 210.1l-178.1 178.1c-28.12 28.12-28.12 73.69 0 101.8C35.16 504.1 53.56 512 71.1 512s36.84-7.031 50.91-21.09l178.1-178.1c23.46 7.736 49.31 10.24 76.17 6.004c62.41-9.84 114.6-57.8 129.3-119.2C513.7 172.1 513.3 146.5 507.6 122.8zM80 456c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24s24 10.74 24 24C104 445.3 93.25 456 80 456z"]};var faXmark={prefix:'fas',iconName:'xmark',icon:[320,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"]};var faTimes=faXmark;

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}
//
// Super simple, non-algorithmic solution since the
// number of class names will not be greater than 4

function powerSetPermutations(arr) {
  var arrLength = arr.length;
  if (arrLength === 0 || arrLength === 1) return arr;

  if (arrLength === 2) {
    // prettier-ignore
    return [arr[0], arr[1], "".concat(arr[0], ".").concat(arr[1]), "".concat(arr[1], ".").concat(arr[0])];
  }

  if (arrLength === 3) {
    return [arr[0], arr[1], arr[2], "".concat(arr[0], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[0]), "".concat(arr[1], ".").concat(arr[2]), "".concat(arr[2], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]), "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]), "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0])];
  }

  if (arrLength >= 4) {
    // Currently does not support more than 4 extra
    // class names (after `.token` has been removed)
    return [arr[0], arr[1], arr[2], arr[3], "".concat(arr[0], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[3]), "".concat(arr[1], ".").concat(arr[0]), "".concat(arr[1], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[3]), "".concat(arr[2], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[1]), "".concat(arr[2], ".").concat(arr[3]), "".concat(arr[3], ".").concat(arr[0]), "".concat(arr[3], ".").concat(arr[1]), "".concat(arr[3], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[3]), "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[3]), "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[3]), "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]), "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[3]), "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[0]), "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[2]), "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]), "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[3]), "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[3]), "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[1]), "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[1]), "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[2]), "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[0]), "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[2]), "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[0]), "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2], ".").concat(arr[3]), "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[3], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1], ".").concat(arr[3]), "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[3], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[1], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[2], ".").concat(arr[1]), "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2], ".").concat(arr[3]), "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[3], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0], ".").concat(arr[3]), "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[3], ".").concat(arr[0]), "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[0], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[2], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1], ".").concat(arr[3]), "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[3], ".").concat(arr[1]), "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0], ".").concat(arr[3]), "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[3], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[0], ".").concat(arr[1]), "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[1], ".").concat(arr[0]), "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]), "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]), "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]), "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]), "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]), "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[1], ".").concat(arr[0])];
  }
}

var classNameCombinations = {};

function getClassNameCombinations(classNames) {
  if (classNames.length === 0 || classNames.length === 1) return classNames;
  var key = classNames.join('.');

  if (!classNameCombinations[key]) {
    classNameCombinations[key] = powerSetPermutations(classNames);
  }

  return classNameCombinations[key];
}

function createStyleObject(classNames) {
  var elementStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var stylesheet = arguments.length > 2 ? arguments[2] : undefined;
  var nonTokenClassNames = classNames.filter(function (className) {
    return className !== 'token';
  });
  var classNamesCombinations = getClassNameCombinations(nonTokenClassNames);
  return classNamesCombinations.reduce(function (styleObject, className) {
    return _objectSpread$1(_objectSpread$1({}, styleObject), stylesheet[className]);
  }, elementStyle);
}
function createClassNameString(classNames) {
  return classNames.join(' ');
}
function createChildren(stylesheet, useInlineStyles) {
  var childrenCount = 0;
  return function (children) {
    childrenCount += 1;
    return children.map(function (child, i) {
      return createElement({
        node: child,
        stylesheet: stylesheet,
        useInlineStyles: useInlineStyles,
        key: "code-segment-".concat(childrenCount, "-").concat(i)
      });
    });
  };
}
function createElement(_ref) {
  var node = _ref.node,
      stylesheet = _ref.stylesheet,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      useInlineStyles = _ref.useInlineStyles,
      key = _ref.key;
  var properties = node.properties,
      type = node.type,
      TagName = node.tagName,
      value = node.value;

  if (type === 'text') {
    return value;
  } else if (TagName) {
    var childrenCreator = createChildren(stylesheet, useInlineStyles);
    var props;

    if (!useInlineStyles) {
      props = _objectSpread$1(_objectSpread$1({}, properties), {}, {
        className: createClassNameString(properties.className)
      });
    } else {
      var allStylesheetSelectors = Object.keys(stylesheet).reduce(function (classes, selector) {
        selector.split('.').forEach(function (className) {
          if (!classes.includes(className)) classes.push(className);
        });
        return classes;
      }, []); // For compatibility with older versions of react-syntax-highlighter

      var startingClassName = properties.className && properties.className.includes('token') ? ['token'] : [];
      var className = properties.className && startingClassName.concat(properties.className.filter(function (className) {
        return !allStylesheetSelectors.includes(className);
      }));
      props = _objectSpread$1(_objectSpread$1({}, properties), {}, {
        className: createClassNameString(className) || undefined,
        style: createStyleObject(properties.className, Object.assign({}, properties.style, style), stylesheet)
      });
    }

    var children = childrenCreator(node.children);
    return /*#__PURE__*/React__default.createElement(TagName, _extends$1({
      key: key
    }, props), children);
  }
}

var checkForListedLanguage = (function (astGenerator, language) {
  var langs = astGenerator.listLanguages();
  return langs.indexOf(language) !== -1;
});

var _excluded$6 = ["language", "children", "style", "customStyle", "codeTagProps", "useInlineStyles", "showLineNumbers", "showInlineLineNumbers", "startingLineNumber", "lineNumberContainerStyle", "lineNumberStyle", "wrapLines", "wrapLongLines", "lineProps", "renderer", "PreTag", "CodeTag", "code", "astGenerator"];

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}
var newLineRegex = /\n/g;

function getNewLines(str) {
  return str.match(newLineRegex);
}

function getAllLineNumbers(_ref) {
  var lines = _ref.lines,
      startingLineNumber = _ref.startingLineNumber,
      style = _ref.style;
  return lines.map(function (_, i) {
    var number = i + startingLineNumber;
    return /*#__PURE__*/React__default.createElement("span", {
      key: "line-".concat(i),
      className: "react-syntax-highlighter-line-number",
      style: typeof style === 'function' ? style(number) : style
    }, "".concat(number, "\n"));
  });
}

function AllLineNumbers(_ref2) {
  var codeString = _ref2.codeString,
      codeStyle = _ref2.codeStyle,
      _ref2$containerStyle = _ref2.containerStyle,
      containerStyle = _ref2$containerStyle === void 0 ? {
    "float": 'left',
    paddingRight: '10px'
  } : _ref2$containerStyle,
      _ref2$numberStyle = _ref2.numberStyle,
      numberStyle = _ref2$numberStyle === void 0 ? {} : _ref2$numberStyle,
      startingLineNumber = _ref2.startingLineNumber;
  return /*#__PURE__*/React__default.createElement("code", {
    style: Object.assign({}, codeStyle, containerStyle)
  }, getAllLineNumbers({
    lines: codeString.replace(/\n$/, '').split('\n'),
    style: numberStyle,
    startingLineNumber: startingLineNumber
  }));
}

function getEmWidthOfNumber(num) {
  return "".concat(num.toString().length, ".25em");
}

function getInlineLineNumber(lineNumber, inlineLineNumberStyle) {
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      key: "line-number--".concat(lineNumber),
      className: ['comment', 'linenumber', 'react-syntax-highlighter-line-number'],
      style: inlineLineNumberStyle
    },
    children: [{
      type: 'text',
      value: lineNumber
    }]
  };
}

function assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber) {
  // minimally necessary styling for line numbers
  var defaultLineNumberStyle = {
    display: 'inline-block',
    minWidth: getEmWidthOfNumber(largestLineNumber),
    paddingRight: '1em',
    textAlign: 'right',
    userSelect: 'none'
  }; // prep custom styling

  var customLineNumberStyle = typeof lineNumberStyle === 'function' ? lineNumberStyle(lineNumber) : lineNumberStyle; // combine

  var assembledStyle = _objectSpread(_objectSpread({}, defaultLineNumberStyle), customLineNumberStyle);

  return assembledStyle;
}

function createLineElement(_ref3) {
  var children = _ref3.children,
      lineNumber = _ref3.lineNumber,
      lineNumberStyle = _ref3.lineNumberStyle,
      largestLineNumber = _ref3.largestLineNumber,
      showInlineLineNumbers = _ref3.showInlineLineNumbers,
      _ref3$lineProps = _ref3.lineProps,
      lineProps = _ref3$lineProps === void 0 ? {} : _ref3$lineProps,
      _ref3$className = _ref3.className,
      className = _ref3$className === void 0 ? [] : _ref3$className,
      showLineNumbers = _ref3.showLineNumbers,
      wrapLongLines = _ref3.wrapLongLines;
  var properties = typeof lineProps === 'function' ? lineProps(lineNumber) : lineProps;
  properties['className'] = className;

  if (lineNumber && showInlineLineNumbers) {
    var inlineLineNumberStyle = assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber);
    children.unshift(getInlineLineNumber(lineNumber, inlineLineNumberStyle));
  }

  if (wrapLongLines & showLineNumbers) {
    properties.style = _objectSpread(_objectSpread({}, properties.style), {}, {
      display: 'flex'
    });
  }

  return {
    type: 'element',
    tagName: 'span',
    properties: properties,
    children: children
  };
}

function flattenCodeTree(tree) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var newTree = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  for (var i = 0; i < tree.length; i++) {
    var node = tree[i];

    if (node.type === 'text') {
      newTree.push(createLineElement({
        children: [node],
        className: _toConsumableArray(new Set(className))
      }));
    } else if (node.children) {
      var classNames = className.concat(node.properties.className);
      flattenCodeTree(node.children, classNames).forEach(function (i) {
        return newTree.push(i);
      });
    }
  }

  return newTree;
}

function processLines(codeTree, wrapLines, lineProps, showLineNumbers, showInlineLineNumbers, startingLineNumber, largestLineNumber, lineNumberStyle, wrapLongLines) {
  var _ref4;

  var tree = flattenCodeTree(codeTree.value);
  var newTree = [];
  var lastLineBreakIndex = -1;
  var index = 0;

  function createWrappedLine(children, lineNumber) {
    var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return createLineElement({
      children: children,
      lineNumber: lineNumber,
      lineNumberStyle: lineNumberStyle,
      largestLineNumber: largestLineNumber,
      showInlineLineNumbers: showInlineLineNumbers,
      lineProps: lineProps,
      className: className,
      showLineNumbers: showLineNumbers,
      wrapLongLines: wrapLongLines
    });
  }

  function createUnwrappedLine(children, lineNumber) {
    if (showLineNumbers && lineNumber && showInlineLineNumbers) {
      var inlineLineNumberStyle = assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber);
      children.unshift(getInlineLineNumber(lineNumber, inlineLineNumberStyle));
    }

    return children;
  }

  function createLine(children, lineNumber) {
    var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return wrapLines || className.length > 0 ? createWrappedLine(children, lineNumber, className) : createUnwrappedLine(children, lineNumber);
  }

  var _loop = function _loop() {
    var node = tree[index];
    var value = node.children[0].value;
    var newLines = getNewLines(value);

    if (newLines) {
      var splitValue = value.split('\n');
      splitValue.forEach(function (text, i) {
        var lineNumber = showLineNumbers && newTree.length + startingLineNumber;
        var newChild = {
          type: 'text',
          value: "".concat(text, "\n")
        }; // if it's the first line

        if (i === 0) {
          var _children = tree.slice(lastLineBreakIndex + 1, index).concat(createLineElement({
            children: [newChild],
            className: node.properties.className
          }));

          var _line = createLine(_children, lineNumber);

          newTree.push(_line); // if it's the last line
        } else if (i === splitValue.length - 1) {
          var stringChild = tree[index + 1] && tree[index + 1].children && tree[index + 1].children[0];
          var lastLineInPreviousSpan = {
            type: 'text',
            value: "".concat(text)
          };

          if (stringChild) {
            var newElem = createLineElement({
              children: [lastLineInPreviousSpan],
              className: node.properties.className
            });
            tree.splice(index + 1, 0, newElem);
          } else {
            var _children2 = [lastLineInPreviousSpan];

            var _line2 = createLine(_children2, lineNumber, node.properties.className);

            newTree.push(_line2);
          } // if it's neither the first nor the last line

        } else {
          var _children3 = [newChild];

          var _line3 = createLine(_children3, lineNumber, node.properties.className);

          newTree.push(_line3);
        }
      });
      lastLineBreakIndex = index;
    }

    index++;
  };

  while (index < tree.length) {
    _loop();
  }

  if (lastLineBreakIndex !== tree.length - 1) {
    var children = tree.slice(lastLineBreakIndex + 1, tree.length);

    if (children && children.length) {
      var lineNumber = showLineNumbers && newTree.length + startingLineNumber;
      var line = createLine(children, lineNumber);
      newTree.push(line);
    }
  }

  return wrapLines ? newTree : (_ref4 = []).concat.apply(_ref4, newTree);
}

function defaultRenderer(_ref5) {
  var rows = _ref5.rows,
      stylesheet = _ref5.stylesheet,
      useInlineStyles = _ref5.useInlineStyles;
  return rows.map(function (node, i) {
    return createElement({
      node: node,
      stylesheet: stylesheet,
      useInlineStyles: useInlineStyles,
      key: "code-segement".concat(i)
    });
  });
} // only highlight.js has the highlightAuto method


function isHighlightJs(astGenerator) {
  return astGenerator && typeof astGenerator.highlightAuto !== 'undefined';
}

function getCodeTree(_ref6) {
  var astGenerator = _ref6.astGenerator,
      language = _ref6.language,
      code = _ref6.code,
      defaultCodeValue = _ref6.defaultCodeValue; // figure out whether we're using lowlight/highlight or refractor/prism
  // then attempt highlighting accordingly
  // lowlight/highlight?

  if (isHighlightJs(astGenerator)) {
    var hasLanguage = checkForListedLanguage(astGenerator, language);

    if (language === 'text') {
      return {
        value: defaultCodeValue,
        language: 'text'
      };
    } else if (hasLanguage) {
      return astGenerator.highlight(language, code);
    } else {
      return astGenerator.highlightAuto(code);
    }
  } // must be refractor/prism, then


  try {
    return language && language !== 'text' ? {
      value: astGenerator.highlight(code, language)
    } : {
      value: defaultCodeValue
    };
  } catch (e) {
    return {
      value: defaultCodeValue
    };
  }
}

function highlight$2 (defaultAstGenerator, defaultStyle) {
  return function SyntaxHighlighter(_ref7) {
    var language = _ref7.language,
        children = _ref7.children,
        _ref7$style = _ref7.style,
        style = _ref7$style === void 0 ? defaultStyle : _ref7$style,
        _ref7$customStyle = _ref7.customStyle,
        customStyle = _ref7$customStyle === void 0 ? {} : _ref7$customStyle,
        _ref7$codeTagProps = _ref7.codeTagProps,
        codeTagProps = _ref7$codeTagProps === void 0 ? {
      className: language ? "language-".concat(language) : undefined,
      style: _objectSpread(_objectSpread({}, style['code[class*="language-"]']), style["code[class*=\"language-".concat(language, "\"]")])
    } : _ref7$codeTagProps,
        _ref7$useInlineStyles = _ref7.useInlineStyles,
        useInlineStyles = _ref7$useInlineStyles === void 0 ? true : _ref7$useInlineStyles,
        _ref7$showLineNumbers = _ref7.showLineNumbers,
        showLineNumbers = _ref7$showLineNumbers === void 0 ? false : _ref7$showLineNumbers,
        _ref7$showInlineLineN = _ref7.showInlineLineNumbers,
        showInlineLineNumbers = _ref7$showInlineLineN === void 0 ? true : _ref7$showInlineLineN,
        _ref7$startingLineNum = _ref7.startingLineNumber,
        startingLineNumber = _ref7$startingLineNum === void 0 ? 1 : _ref7$startingLineNum,
        lineNumberContainerStyle = _ref7.lineNumberContainerStyle,
        _ref7$lineNumberStyle = _ref7.lineNumberStyle,
        lineNumberStyle = _ref7$lineNumberStyle === void 0 ? {} : _ref7$lineNumberStyle,
        wrapLines = _ref7.wrapLines,
        _ref7$wrapLongLines = _ref7.wrapLongLines,
        wrapLongLines = _ref7$wrapLongLines === void 0 ? false : _ref7$wrapLongLines,
        _ref7$lineProps = _ref7.lineProps,
        lineProps = _ref7$lineProps === void 0 ? {} : _ref7$lineProps,
        renderer = _ref7.renderer,
        _ref7$PreTag = _ref7.PreTag,
        PreTag = _ref7$PreTag === void 0 ? 'pre' : _ref7$PreTag,
        _ref7$CodeTag = _ref7.CodeTag,
        CodeTag = _ref7$CodeTag === void 0 ? 'code' : _ref7$CodeTag,
        _ref7$code = _ref7.code,
        code = _ref7$code === void 0 ? (Array.isArray(children) ? children[0] : children) || '' : _ref7$code,
        astGenerator = _ref7.astGenerator,
        rest = _objectWithoutProperties(_ref7, _excluded$6);

    astGenerator = astGenerator || defaultAstGenerator;
    var allLineNumbers = showLineNumbers ? /*#__PURE__*/React__default.createElement(AllLineNumbers, {
      containerStyle: lineNumberContainerStyle,
      codeStyle: codeTagProps.style || {},
      numberStyle: lineNumberStyle,
      startingLineNumber: startingLineNumber,
      codeString: code
    }) : null;
    var defaultPreStyle = style.hljs || style['pre[class*="language-"]'] || {
      backgroundColor: '#fff'
    };
    var generatorClassName = isHighlightJs(astGenerator) ? 'hljs' : 'prismjs';
    var preProps = useInlineStyles ? Object.assign({}, rest, {
      style: Object.assign({}, defaultPreStyle, customStyle)
    }) : Object.assign({}, rest, {
      className: rest.className ? "".concat(generatorClassName, " ").concat(rest.className) : generatorClassName,
      style: Object.assign({}, customStyle)
    });

    if (wrapLongLines) {
      codeTagProps.style = _objectSpread(_objectSpread({}, codeTagProps.style), {}, {
        whiteSpace: 'pre-wrap'
      });
    } else {
      codeTagProps.style = _objectSpread(_objectSpread({}, codeTagProps.style), {}, {
        whiteSpace: 'pre'
      });
    }

    if (!astGenerator) {
      return /*#__PURE__*/React__default.createElement(PreTag, preProps, allLineNumbers, /*#__PURE__*/React__default.createElement(CodeTag, codeTagProps, code));
    }
    /*
     * Some custom renderers rely on individual row elements so we need to turn wrapLines on
     * if renderer is provided and wrapLines is undefined.
     */


    if (wrapLines === undefined && renderer || wrapLongLines) wrapLines = true;
    renderer = renderer || defaultRenderer;
    var defaultCodeValue = [{
      type: 'text',
      value: code
    }];
    var codeTree = getCodeTree({
      astGenerator: astGenerator,
      language: language,
      code: code,
      defaultCodeValue: defaultCodeValue
    });

    if (codeTree.language === null) {
      codeTree.value = defaultCodeValue;
    } // determine largest line number so that we can force minWidth on all linenumber elements


    var largestLineNumber = codeTree.value.length + startingLineNumber;
    var rows = processLines(codeTree, wrapLines, lineProps, showLineNumbers, showInlineLineNumbers, startingLineNumber, largestLineNumber, lineNumberStyle, wrapLongLines);
    return /*#__PURE__*/React__default.createElement(PreTag, preProps, /*#__PURE__*/React__default.createElement(CodeTag, codeTagProps, !showInlineLineNumbers && allLineNumbers, renderer({
      rows: rows,
      stylesheet: style,
      useInlineStyles: useInlineStyles
    })));
  };
}

function deepFreeze(obj) {
  if (obj instanceof Map) {
    obj.clear = obj.delete = obj.set = function () {
      throw new Error('map is read-only');
    };
  } else if (obj instanceof Set) {
    obj.add = obj.clear = obj.delete = function () {
      throw new Error('set is read-only');
    };
  } // Freeze self


  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(function (name) {
    var prop = obj[name]; // Freeze prop if it is an object

    if (typeof prop == 'object' && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });
  return obj;
}

var deepFreezeEs6 = deepFreeze;
var _default = deepFreeze;
deepFreezeEs6.default = _default;
/** @implements CallbackResponse */

class Response {
  /**
   * @param {CompiledMode} mode
   */
  constructor(mode) {
    // eslint-disable-next-line no-undefined
    if (mode.data === undefined) mode.data = {};
    this.data = mode.data;
    this.isMatchIgnored = false;
  }

  ignoreMatch() {
    this.isMatchIgnored = true;
  }

}
/**
 * @param {string} value
 * @returns {string}
 */


function escapeHTML(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}
/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */


function inherit(original, ...objects) {
  /** @type Record<string,any> */
  const result = Object.create(null);

  for (const key in original) {
    result[key] = original[key];
  }

  objects.forEach(function (obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return (
    /** @type {T} */
    result
  );
}
/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */

/** @typedef {{kind?: string, sublanguage?: boolean}} Node */

/** @typedef {{walk: (r: Renderer) => void}} Tree */

/** */


const SPAN_CLOSE = '</span>';
/**
 * Determines if a node needs to be wrapped in <span>
 *
 * @param {Node} node */

const emitsWrappingTags = node => {
  return !!node.kind;
};
/** @type {Renderer} */


class HTMLRenderer {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }
  /**
   * Adds texts to the output stream
   *
   * @param {string} text */


  addText(text) {
    this.buffer += escapeHTML(text);
  }
  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */


  openNode(node) {
    if (!emitsWrappingTags(node)) return;
    let className = node.kind;

    if (!node.sublanguage) {
      className = `${this.classPrefix}${className}`;
    }

    this.span(className);
  }
  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */


  closeNode(node) {
    if (!emitsWrappingTags(node)) return;
    this.buffer += SPAN_CLOSE;
  }
  /**
   * returns the accumulated buffer
  */


  value() {
    return this.buffer;
  } // helpers

  /**
   * Builds a span element
   *
   * @param {string} className */


  span(className) {
    this.buffer += `<span class="${className}">`;
  }

}
/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} | string} Node */

/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} } DataNode */

/**  */


class TokenTree {
  constructor() {
    /** @type DataNode */
    this.rootNode = {
      children: []
    };
    this.stack = [this.rootNode];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  get root() {
    return this.rootNode;
  }
  /** @param {Node} node */


  add(node) {
    this.top.children.push(node);
  }
  /** @param {string} kind */


  openNode(kind) {
    /** @type Node */
    const node = {
      kind,
      children: []
    };
    this.add(node);
    this.stack.push(node);
  }

  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    } // eslint-disable-next-line no-undefined


    return undefined;
  }

  closeAllNodes() {
    while (this.closeNode());
  }

  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */


  walk(builder) {
    // this does not
    return this.constructor._walk(builder, this.rootNode); // this works
    // return TokenTree._walk(builder, this.rootNode);
  }
  /**
   * @param {Renderer} builder
   * @param {Node} node
   */


  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach(child => this._walk(builder, child));
      builder.closeNode(node);
    }

    return builder;
  }
  /**
   * @param {Node} node
   */


  static _collapse(node) {
    if (typeof node === "string") return;
    if (!node.children) return;

    if (node.children.every(el => typeof el === "string")) {
      // node.text = node.children.join("");
      // delete node.children;
      node.children = [node.children.join("")];
    } else {
      node.children.forEach(child => {
        TokenTree._collapse(child);
      });
    }
  }

}
/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addKeyword(text, kind)
  - addText(text)
  - addSublanguage(emitter, subLanguageName)
  - finalize()
  - openNode(kind)
  - closeNode()
  - closeAllNodes()
  - toHTML()

*/

/**
 * @implements {Emitter}
 */


class TokenTreeEmitter extends TokenTree {
  /**
   * @param {*} options
   */
  constructor(options) {
    super();
    this.options = options;
  }
  /**
   * @param {string} text
   * @param {string} kind
   */


  addKeyword(text, kind) {
    if (text === "") {
      return;
    }

    this.openNode(kind);
    this.addText(text);
    this.closeNode();
  }
  /**
   * @param {string} text
   */


  addText(text) {
    if (text === "") {
      return;
    }

    this.add(text);
  }
  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */


  addSublanguage(emitter, name) {
    /** @type DataNode */
    const node = emitter.root;
    node.kind = name;
    node.sublanguage = true;
    this.add(node);
  }

  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }

  finalize() {
    return true;
  }

}
/**
 * @param {string} value
 * @returns {RegExp}
 * */


function escape$1(value) {
  return new RegExp(value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function source$5(re) {
  if (!re) return null;
  if (typeof re === "string") return re;
  return re.source;
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */


function concat$5(...args) {
  const joined = args.map(x => source$5(x)).join("");
  return joined;
}
/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] } args
 * @returns {string}
 */


function either$3(...args) {
  const joined = '(' + args.map(x => source$5(x)).join("|") + ")";
  return joined;
}
/**
 * @param {RegExp} re
 * @returns {number}
 */


function countMatchGroups(re) {
  return new RegExp(re.toString() + '|').exec('').length - 1;
}
/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */


function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
} // BACKREF_RE matches an open parenthesis or backreference. To avoid
// an incorrect parse, it additionally matches the following:
// - [...] elements, where the meaning of parentheses and escapes change
// - other escape sequences, so we do not misparse escape sequences as
//   interesting elements
// - non-matching or lookahead parentheses, which do not capture. These
//   follow the '(' with a '?'.


const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./; // join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)

/**
 * @param {(string | RegExp)[]} regexps
 * @param {string} separator
 * @returns {string}
 */

function join(regexps, separator = "|") {
  let numCaptures = 0;
  return regexps.map(regex => {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source$5(regex);
    let out = '';

    while (re.length > 0) {
      const match = BACKREF_RE.exec(re);

      if (!match) {
        out += re;
        break;
      }

      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);

      if (match[0][0] === '\\' && match[1]) {
        // Adjust the backreference.
        out += '\\' + String(Number(match[1]) + offset);
      } else {
        out += match[0];

        if (match[0] === '(') {
          numCaptures++;
        }
      }
    }

    return out;
  }).map(re => `(${re})`).join(separator);
} // Common regexps


const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE$1 = '[a-zA-Z]\\w*';
const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float

const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...

const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';
/**
* @param { Partial<Mode> & {binary?: string | RegExp} } opts
*/

const SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;

  if (opts.binary) {
    opts.begin = concat$5(beginShebang, /.*\b/, opts.binary, /\b.*/);
  }

  return inherit({
    className: 'meta',
    begin: beginShebang,
    end: /$/,
    relevance: 0,

    /** @type {ModeCallback} */
    "on:begin": (m, resp) => {
      if (m.index !== 0) resp.ignoreMatch();
    }
  }, opts);
}; // Common modes


const BACKSLASH_ESCAPE = {
  begin: '\\\\[\\s\\S]',
  relevance: 0
};
const APOS_STRING_MODE = {
  className: 'string',
  begin: '\'',
  end: '\'',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const QUOTE_STRING_MODE = {
  className: 'string',
  begin: '"',
  end: '"',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
/**
 * Creates a comment mode
 *
 * @param {string | RegExp} begin
 * @param {string | RegExp} end
 * @param {Mode | {}} [modeOptions]
 * @returns {Partial<Mode>}
 */

const COMMENT = function COMMENT(begin, end, modeOptions = {}) {
  const mode = inherit({
    className: 'comment',
    begin,
    end,
    contains: []
  }, modeOptions);
  mode.contains.push(PHRASAL_WORDS_MODE);
  mode.contains.push({
    className: 'doctag',
    begin: '(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):',
    relevance: 0
  });
  return mode;
};

const C_LINE_COMMENT_MODE = COMMENT('//', '$');
const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
const HASH_COMMENT_MODE = COMMENT('#', '$');
const NUMBER_MODE = {
  className: 'number',
  begin: NUMBER_RE,
  relevance: 0
};
const C_NUMBER_MODE = {
  className: 'number',
  begin: C_NUMBER_RE,
  relevance: 0
};
const BINARY_NUMBER_MODE = {
  className: 'number',
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
const CSS_NUMBER_MODE = {
  className: 'number',
  begin: NUMBER_RE + '(' + '%|em|ex|ch|rem' + '|vw|vh|vmin|vmax' + '|cm|mm|in|pt|pc|px' + '|deg|grad|rad|turn' + '|s|ms' + '|Hz|kHz' + '|dpi|dpcm|dppx' + ')?',
  relevance: 0
};
const REGEXP_MODE = {
  // this outer rule makes sure we actually have a WHOLE regex and not simply
  // an expression such as:
  //
  //     3 / something
  //
  // (which will then blow up when regex's `illegal` sees the newline)
  begin: /(?=\/[^/\n]*\/)/,
  contains: [{
    className: 'regexp',
    begin: /\//,
    end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [BACKSLASH_ESCAPE, {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [BACKSLASH_ESCAPE]
    }]
  }]
};
const TITLE_MODE = {
  className: 'title',
  begin: IDENT_RE$1,
  relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
  className: 'title',
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
const METHOD_GUARD = {
  // excludes method names from keyword processing
  begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
  relevance: 0
};
/**
 * Adds end same as begin mechanics to a mode
 *
 * Your mode must include at least a single () match group as that first match
 * group is what is used for comparison
 * @param {Partial<Mode>} mode
 */

const END_SAME_AS_BEGIN = function END_SAME_AS_BEGIN(mode) {
  return Object.assign(mode, {
    /** @type {ModeCallback} */
    'on:begin': (m, resp) => {
      resp.data._beginMatch = m[1];
    },

    /** @type {ModeCallback} */
    'on:end': (m, resp) => {
      if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
    }
  });
};

var MODES$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MATCH_NOTHING_RE: MATCH_NOTHING_RE,
  IDENT_RE: IDENT_RE$1,
  UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
  NUMBER_RE: NUMBER_RE,
  C_NUMBER_RE: C_NUMBER_RE,
  BINARY_NUMBER_RE: BINARY_NUMBER_RE,
  RE_STARTERS_RE: RE_STARTERS_RE,
  SHEBANG: SHEBANG,
  BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
  APOS_STRING_MODE: APOS_STRING_MODE,
  QUOTE_STRING_MODE: QUOTE_STRING_MODE,
  PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
  COMMENT: COMMENT,
  C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
  C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
  HASH_COMMENT_MODE: HASH_COMMENT_MODE,
  NUMBER_MODE: NUMBER_MODE,
  C_NUMBER_MODE: C_NUMBER_MODE,
  BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
  CSS_NUMBER_MODE: CSS_NUMBER_MODE,
  REGEXP_MODE: REGEXP_MODE,
  TITLE_MODE: TITLE_MODE,
  UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE,
  METHOD_GUARD: METHOD_GUARD,
  END_SAME_AS_BEGIN: END_SAME_AS_BEGIN
}); // Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833
// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.
// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.
// ------
// TODO: We need negative look-behind support to do this properly

/**
 * Skip a match if it has a preceding dot
 *
 * This is used for `beginKeywords` to prevent matching expressions such as
 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
 * @param {RegExpMatchArray} match
 * @param {CallbackResponse} response
 */

function skipIfhasPrecedingDot(match, response) {
  const before = match.input[match.index - 1];

  if (before === ".") {
    response.ignoreMatch();
  }
}
/**
 * `beginKeywords` syntactic sugar
 * @type {CompilerExt}
 */


function beginKeywords(mode, parent) {
  if (!parent) return;
  if (!mode.beginKeywords) return; // for languages with keywords that include non-word characters checking for
  // a word boundary is not sufficient, so instead we check for a word boundary
  // or whitespace - this does no harm in any case since our keyword engine
  // doesn't allow spaces in keywords anyways and we still check for the boundary
  // first

  mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
  mode.__beforeBegin = skipIfhasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords; // prevents double relevance, the keywords themselves provide
  // relevance, the mode doesn't need to double it
  // eslint-disable-next-line no-undefined

  if (mode.relevance === undefined) mode.relevance = 0;
}
/**
 * Allow `illegal` to contain an array of illegal values
 * @type {CompilerExt}
 */


function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal)) return;
  mode.illegal = either$3(...mode.illegal);
}
/**
 * `match` to match a single expression for readability
 * @type {CompilerExt}
 */


function compileMatch(mode, _parent) {
  if (!mode.match) return;
  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");
  mode.begin = mode.match;
  delete mode.match;
}
/**
 * provides the default 1 relevance to all modes
 * @type {CompilerExt}
 */


function compileRelevance(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 1;
} // keywords that should have no default relevance value


const COMMON_KEYWORDS = ['of', 'and', 'for', 'in', 'not', 'or', 'if', 'then', 'parent', // common variable name
'list', // common variable name
'value' // common variable name
];
const DEFAULT_KEYWORD_CLASSNAME = "keyword";
/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
 * @param {boolean} caseInsensitive
 */

function compileKeywords(rawKeywords, caseInsensitive, className = DEFAULT_KEYWORD_CLASSNAME) {
  /** @type KeywordDict */
  const compiledKeywords = {}; // input can be a string of keywords, an array of keywords, or a object with
  // named keys representing className (which can then point to a string or array)

  if (typeof rawKeywords === 'string') {
    compileList(className, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(className, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function (className) {
      // collapse all our objects back into the parent object
      Object.assign(compiledKeywords, compileKeywords(rawKeywords[className], caseInsensitive, className));
    });
  }

  return compiledKeywords; // ---

  /**
   * Compiles an individual list of keywords
   *
   * Ex: "for if when while|5"
   *
   * @param {string} className
   * @param {Array<string>} keywordList
   */

  function compileList(className, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map(x => x.toLowerCase());
    }

    keywordList.forEach(function (keyword) {
      const pair = keyword.split('|');
      compiledKeywords[pair[0]] = [className, scoreForKeyword(pair[0], pair[1])];
    });
  }
}
/**
 * Returns the proper score for a given keyword
 *
 * Also takes into account comment keywords, which will be scored 0 UNLESS
 * another score has been manually assigned.
 * @param {string} keyword
 * @param {string} [providedScore]
 */


function scoreForKeyword(keyword, providedScore) {
  // manual scores always win over common keywords
  // so you can force a score of 1 if you really insist
  if (providedScore) {
    return Number(providedScore);
  }

  return commonKeyword(keyword) ? 0 : 1;
}
/**
 * Determines if a given keyword is common or not
 *
 * @param {string} keyword */


function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
} // compilation

/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @param {{plugins: HLJSPlugin[]}} opts
 * @returns {CompiledLanguage}
 */


function compileLanguage(language, {
  plugins
}) {
  /**
   * Builds a regex with the case sensativility of the current language
   *
   * @param {RegExp | string} value
   * @param {boolean} [global]
   */
  function langRe(value, global) {
    return new RegExp(source$5(value), 'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : ''));
  }
  /**
    Stores multiple regular expressions and allows you to quickly search for
    them all in a string simultaneously - returning the first match.  It does
    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
    and joined by `|` - using match groups to track position.  When a match is
    found checking which position in the array has content allows us to figure
    out which of the original regexes / match groups triggered the match.
     The match object itself (the result of `Regex.exec`) is returned but also
    enhanced by merging in any meta-data that was registered with the regex.
    This is how we keep track of which mode matched, and what type of rule
    (`illegal`, `begin`, end, etc).
  */


  class MultiRegex {
    constructor() {
      this.matchIndexes = {}; // @ts-ignore

      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    } // @ts-ignore


    addRule(re, opts) {
      opts.position = this.position++; // @ts-ignore

      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }

    compile() {
      if (this.regexes.length === 0) {
        // avoids the need to check length every time exec is called
        // @ts-ignore
        this.exec = () => null;
      }

      const terminators = this.regexes.map(el => el[1]);
      this.matcherRe = langRe(join(terminators), true);
      this.lastIndex = 0;
    }
    /** @param {string} s */


    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s);

      if (!match) {
        return null;
      } // eslint-disable-next-line no-undefined


      const i = match.findIndex((el, i) => i > 0 && el !== undefined); // @ts-ignore

      const matchData = this.matchIndexes[i]; // trim off any earlier non-relevant match groups (ie, the other regex
      // match groups that make up the multi-matcher)

      match.splice(0, i);
      return Object.assign(match, matchData);
    }

  }
  /*
    Created to solve the key deficiently with MultiRegex - there is no way to
    test for multiple matches at a single location.  Why would we need to do
    that?  In the future a more dynamic engine will allow certain matches to be
    ignored.  An example: if we matched say the 3rd regex in a large group but
    decided to ignore it - we'd need to started testing again at the 4th
    regex... but MultiRegex itself gives us no real way to do that.
     So what this class creates MultiRegexs on the fly for whatever search
    position they are needed.
     NOTE: These additional MultiRegex objects are created dynamically.  For most
    grammars most of the time we will never actually need anything more than the
    first MultiRegex - so this shouldn't have too much overhead.
     Say this is our search group, and we match regex3, but wish to ignore it.
       regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0
     What we need is a new MultiRegex that only includes the remaining
    possibilities:
       regex4 | regex5                               ' ie, startAt = 3
     This class wraps all that complexity up in a simple API... `startAt` decides
    where in the array of expressions to start doing the matching. It
    auto-increments, so if a match is found at position 2, then startAt will be
    set to 3.  If the end is reached startAt will return to 0.
     MOST of the time the parser will be setting startAt manually to 0.
  */


  class ResumableMultiRegex {
    constructor() {
      // @ts-ignore
      this.rules = []; // @ts-ignore

      this.multiRegexes = [];
      this.count = 0;
      this.lastIndex = 0;
      this.regexIndex = 0;
    } // @ts-ignore


    getMatcher(index) {
      if (this.multiRegexes[index]) return this.multiRegexes[index];
      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }

    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }

    considerAll() {
      this.regexIndex = 0;
    } // @ts-ignore


    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin") this.count++;
    }
    /** @param {string} s */


    exec(s) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s); // The following is because we have no easy way to say "resume scanning at the
      // existing position but also skip the current rule ONLY". What happens is
      // all prior rules are also skipped which can result in matching the wrong
      // thing. Example of matching "booger":
      // our matcher is [string, "booger", number]
      //
      // ....booger....
      // if "booger" is ignored then we'd really need a regex to scan from the
      // SAME position for only: [string, number] but ignoring "booger" (if it
      // was the first match), a simple resume would scan ahead who knows how
      // far looking only for "number", ignoring potential string matches (or
      // future "booger" matches that might be valid.)
      // So what we do: We execute two matchers, one resuming at the same
      // position, but the second full matcher starting at the position after:
      //     /--- resume first regex match here (for [number])
      //     |/---- full match here for [string, "booger", number]
      //     vv
      // ....booger....
      // Which ever results in a match first is then used. So this 3-4 step
      // process essentially allows us to say "match at this position, excluding
      // a prior rule that was ignored".
      //
      // 1. Match "booger" first, ignore. Also proves that [string] does non match.
      // 2. Resume matching for [number]
      // 3. Match at index + 1 for [string, "booger", number]
      // 4. If #2 and #3 result in matches, which came first?

      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex) ;else {
          // use the second matcher result
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s);
        }
      }

      if (result) {
        this.regexIndex += result.position + 1;

        if (this.regexIndex === this.count) {
          // wrap-around to considering all matches again
          this.considerAll();
        }
      }

      return result;
    }

  }
  /**
   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
   * the content and find matches.
   *
   * @param {CompiledMode} mode
   * @returns {ResumableMultiRegex}
   */


  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();
    mode.contains.forEach(term => mm.addRule(term.begin, {
      rule: term,
      type: "begin"
    }));

    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, {
        type: "end"
      });
    }

    if (mode.illegal) {
      mm.addRule(mode.illegal, {
        type: "illegal"
      });
    }

    return mm;
  }
  /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */

  /**
   * Compiles an individual mode
   *
   * This can raise an error if the mode contains certain detectable known logic
   * issues.
   * @param {Mode} mode
   * @param {CompiledMode | null} [parent]
   * @returns {CompiledMode | never}
   */


  function compileMode(mode, parent) {
    const cmode =
    /** @type CompiledMode */
    mode;
    if (mode.isCompiled) return cmode;
    [// do this early so compiler extensions generally don't have to worry about
    // the distinction between match/begin
    compileMatch].forEach(ext => ext(mode, parent));
    language.compilerExtensions.forEach(ext => ext(mode, parent)); // __beforeBegin is considered private API, internal use only

    mode.__beforeBegin = null;
    [beginKeywords, // do this later so compiler extensions that come earlier have access to the
    // raw array if they wanted to perhaps manipulate it, etc.
    compileIllegal, // default to 1 relevance if not specified
    compileRelevance].forEach(ext => ext(mode, parent));
    mode.isCompiled = true;
    let keywordPattern = null;

    if (typeof mode.keywords === "object") {
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }

    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    } // both are not allowed


    if (mode.lexemes && keywordPattern) {
      throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");
    } // `mode.lexemes` was the old standard before we added and now recommend
    // using `keywords.$pattern` to pass the keyword pattern


    keywordPattern = keywordPattern || mode.lexemes || /\w+/;
    cmode.keywordPatternRe = langRe(keywordPattern, true);

    if (parent) {
      if (!mode.begin) mode.begin = /\B|\b/;
      cmode.beginRe = langRe(mode.begin);
      if (mode.endSameAsBegin) mode.end = mode.begin;
      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
      if (mode.end) cmode.endRe = langRe(mode.end);
      cmode.terminatorEnd = source$5(mode.end) || '';

      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
      }
    }

    if (mode.illegal) cmode.illegalRe = langRe(
    /** @type {RegExp | string} */
    mode.illegal);
    if (!mode.contains) mode.contains = [];
    mode.contains = [].concat(...mode.contains.map(function (c) {
      return expandOrCloneMode(c === 'self' ? mode : c);
    }));
    mode.contains.forEach(function (c) {
      compileMode(
      /** @type Mode */
      c, cmode);
    });

    if (mode.starts) {
      compileMode(mode.starts, parent);
    }

    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }

  if (!language.compilerExtensions) language.compilerExtensions = []; // self is not valid at the top-level

  if (language.contains && language.contains.includes('self')) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  } // we need a null object, which inherit will guarantee


  language.classNameAliases = inherit(language.classNameAliases || {});
  return compileMode(
  /** @type Mode */
  language);
}
/**
 * Determines if a mode has a dependency on it's parent or not
 *
 * If a mode does have a parent dependency then often we need to clone it if
 * it's used in multiple places so that each copy points to the correct parent,
 * where-as modes without a parent can often safely be re-used at the bottom of
 * a mode chain.
 *
 * @param {Mode | null} mode
 * @returns {boolean} - is there a dependency on the parent?
 * */


function dependencyOnParent(mode) {
  if (!mode) return false;
  return mode.endsWithParent || dependencyOnParent(mode.starts);
}
/**
 * Expands a mode or clones it if necessary
 *
 * This is necessary for modes with parental dependenceis (see notes on
 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
 * exploded into their own individual modes at compile time.
 *
 * @param {Mode} mode
 * @returns {Mode | Mode[]}
 * */


function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function (variant) {
      return inherit(mode, {
        variants: null
      }, variant);
    });
  } // EXPAND
  // if we have variants then essentially "replace" the mode with the variants
  // this happens in compileMode, where this function is called from


  if (mode.cachedVariants) {
    return mode.cachedVariants;
  } // CLONE
  // if we have dependencies on parents then we need a unique
  // instance of ourselves, so we can be reused with many
  // different parents without issue


  if (dependencyOnParent(mode)) {
    return inherit(mode, {
      starts: mode.starts ? inherit(mode.starts) : null
    });
  }

  if (Object.isFrozen(mode)) {
    return inherit(mode);
  } // no special dependency issues, just return ourselves


  return mode;
}

var version = "10.7.3"; // @ts-nocheck

function hasValueOrEmptyAttribute(value) {
  return Boolean(value || value === "");
}

function BuildVuePlugin(hljs) {
  const Component = {
    props: ["language", "code", "autodetect"],
    data: function () {
      return {
        detectedLanguage: "",
        unknownLanguage: false
      };
    },
    computed: {
      className() {
        if (this.unknownLanguage) return "";
        return "hljs " + this.detectedLanguage;
      },

      highlighted() {
        // no idea what language to use, return raw code
        if (!this.autoDetect && !hljs.getLanguage(this.language)) {
          console.warn(`The language "${this.language}" you specified could not be found.`);
          this.unknownLanguage = true;
          return escapeHTML(this.code);
        }

        let result = {};

        if (this.autoDetect) {
          result = hljs.highlightAuto(this.code);
          this.detectedLanguage = result.language;
        } else {
          result = hljs.highlight(this.language, this.code, this.ignoreIllegals);
          this.detectedLanguage = this.language;
        }

        return result.value;
      },

      autoDetect() {
        return !this.language || hasValueOrEmptyAttribute(this.autodetect);
      },

      ignoreIllegals() {
        return true;
      }

    },

    // this avoids needing to use a whole Vue compilation pipeline just
    // to build Highlight.js
    render(createElement) {
      return createElement("pre", {}, [createElement("code", {
        class: this.className,
        domProps: {
          innerHTML: this.highlighted
        }
      })]);
    } // template: `<pre><code :class="className" v-html="highlighted"></code></pre>`


  };
  const VuePlugin = {
    install(Vue) {
      Vue.component('highlightjs', Component);
    }

  };
  return {
    Component,
    VuePlugin
  };
}
/* plugin itself */

/** @type {HLJSPlugin} */


const mergeHTMLPlugin = {
  "after:highlightElement": ({
    el,
    result,
    text
  }) => {
    const originalStream = nodeStream(el);
    if (!originalStream.length) return;
    const resultNode = document.createElement('div');
    resultNode.innerHTML = result.value;
    result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
  }
};
/* Stream merging support functions */

/**
 * @typedef Event
 * @property {'start'|'stop'} event
 * @property {number} offset
 * @property {Node} node
 */

/**
 * @param {Node} node
 */

function tag(node) {
  return node.nodeName.toLowerCase();
}
/**
 * @param {Node} node
 */


function nodeStream(node) {
  /** @type Event[] */
  const result = [];

  (function _nodeStream(node, offset) {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === 3) {
        offset += child.nodeValue.length;
      } else if (child.nodeType === 1) {
        result.push({
          event: 'start',
          offset: offset,
          node: child
        });
        offset = _nodeStream(child, offset); // Prevent void elements from having an end tag that would actually
        // double them in the output. There are more void elements in HTML
        // but we list only those realistically expected in code display.

        if (!tag(child).match(/br|hr|img|input/)) {
          result.push({
            event: 'stop',
            offset: offset,
            node: child
          });
        }
      }
    }

    return offset;
  })(node, 0);

  return result;
}
/**
 * @param {any} original - the original stream
 * @param {any} highlighted - stream of the highlighted source
 * @param {string} value - the original source itself
 */


function mergeStreams(original, highlighted, value) {
  let processed = 0;
  let result = '';
  const nodeStack = [];

  function selectStream() {
    if (!original.length || !highlighted.length) {
      return original.length ? original : highlighted;
    }

    if (original[0].offset !== highlighted[0].offset) {
      return original[0].offset < highlighted[0].offset ? original : highlighted;
    }
    /*
    To avoid starting the stream just before it should stop the order is
    ensured that original always starts first and closes last:
     if (event1 == 'start' && event2 == 'start')
      return original;
    if (event1 == 'start' && event2 == 'stop')
      return highlighted;
    if (event1 == 'stop' && event2 == 'start')
      return original;
    if (event1 == 'stop' && event2 == 'stop')
      return highlighted;
     ... which is collapsed to:
    */


    return highlighted[0].event === 'start' ? original : highlighted;
  }
  /**
   * @param {Node} node
   */


  function open(node) {
    /** @param {Attr} attr */
    function attributeString(attr) {
      return ' ' + attr.nodeName + '="' + escapeHTML(attr.value) + '"';
    } // @ts-ignore


    result += '<' + tag(node) + [].map.call(node.attributes, attributeString).join('') + '>';
  }
  /**
   * @param {Node} node
   */


  function close(node) {
    result += '</' + tag(node) + '>';
  }
  /**
   * @param {Event} event
   */


  function render(event) {
    (event.event === 'start' ? open : close)(event.node);
  }

  while (original.length || highlighted.length) {
    let stream = selectStream();
    result += escapeHTML(value.substring(processed, stream[0].offset));
    processed = stream[0].offset;

    if (stream === original) {
      /*
      On any opening or closing tag of the original markup we first close
      the entire highlighted node stack, then render the original tag along
      with all the following original tags at the same offset and then
      reopen all the tags on the highlighted stack.
      */
      nodeStack.reverse().forEach(close);

      do {
        render(stream.splice(0, 1)[0]);
        stream = selectStream();
      } while (stream === original && stream.length && stream[0].offset === processed);

      nodeStack.reverse().forEach(open);
    } else {
      if (stream[0].event === 'start') {
        nodeStack.push(stream[0].node);
      } else {
        nodeStack.pop();
      }

      render(stream.splice(0, 1)[0]);
    }
  }

  return result + escapeHTML(value.substr(processed));
}
/*

For the reasoning behind this please see:
https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

*/

/**
 * @type {Record<string, boolean>}
 */


const seenDeprecations = {};
/**
 * @param {string} message
 */

const error = message => {
  console.error(message);
};
/**
 * @param {string} message
 * @param {any} args
 */


const warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};
/**
 * @param {string} version
 * @param {string} message
 */


const deprecated = (version, message) => {
  if (seenDeprecations[`${version}/${message}`]) return;
  console.log(`Deprecated as of ${version}. ${message}`);
  seenDeprecations[`${version}/${message}`] = true;
};
/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/


const escape$1$1 = escapeHTML;
const inherit$1 = inherit;
const NO_MATCH = Symbol("nomatch");
/**
 * @param {any} hljs - object that is extended (legacy)
 * @returns {HLJSApi}
 */

const HLJS = function HLJS(hljs) {
  // Global internal variables used within the highlight.js library.

  /** @type {Record<string, Language>} */
  const languages = Object.create(null);
  /** @type {Record<string, string>} */

  const aliases = Object.create(null);
  /** @type {HLJSPlugin[]} */

  const plugins = []; // safe/production mode - swallows more errors, tries to keep running
  // even if a single syntax or parse hits a fatal error

  let SAFE_MODE = true;
  const fixMarkupRe = /(^(<[^>]+>|\t|)+|\n)/gm;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  /** @type {Language} */

  const PLAINTEXT_LANGUAGE = {
    disableAutodetect: true,
    name: 'Plain text',
    contains: []
  }; // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.

  /** @type HLJSOptions */

  let options = {
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };
  /* Utility functions */

  /**
   * Tests a language name to see if highlighting should be skipped
   * @param {string} languageName
   */

  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }
  /**
   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
   */


  function blockLanguage(block) {
    let classes = block.className + ' ';
    classes += block.parentNode ? block.parentNode.className : ''; // language-* takes precedence over non-prefixed class names.

    const match = options.languageDetectRe.exec(classes);

    if (match) {
      const language = getLanguage(match[1]);

      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }

      return language ? match[1] : 'no-highlight';
    }

    return classes.split(/\s+/).find(_class => shouldNotHighlight(_class) || getLanguage(_class));
  }
  /**
   * Core highlighting function.
   *
   * OLD API
   * highlight(lang, code, ignoreIllegals, continuation)
   *
   * NEW API
   * highlight(code, {lang, ignoreIllegals})
   *
   * @param {string} codeOrlanguageName - the language to use for highlighting
   * @param {string | HighlightOptions} optionsOrCode - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode} [continuation] - current continuation mode, if any
   *
   * @returns {HighlightResult} Result - an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {CompiledMode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */


  function highlight(codeOrlanguageName, optionsOrCode, ignoreIllegals, continuation) {
    let code = "";
    let languageName = "";

    if (typeof optionsOrCode === "object") {
      code = codeOrlanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language; // continuation not supported at all via the new API
      // eslint-disable-next-line no-undefined

      continuation = undefined;
    } else {
      // old API
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrlanguageName;
      code = optionsOrCode;
    }
    /** @type {BeforeHighlightContext} */


    const context = {
      code,
      language: languageName
    }; // the plugin can change the desired language or the code to be highlighted
    // just be changing the object it was passed

    fire("before:highlight", context); // a before plugin can usurp the result completely by providing it's own
    // in which case we don't even need to call highlight

    const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals, continuation);
    result.code = context.code; // the plugin can change anything in result to suite it

    fire("after:highlight", result);
    return result;
  }
  /**
   * private highlight that's used internally and does not fire callbacks
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} codeToHighlight - the code to highlight
   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode?} [continuation] - current continuation mode, if any
   * @returns {HighlightResult} - result of the highlight operation
  */


  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    /**
     * Return keyword data if a match is a keyword
     * @param {CompiledMode} mode - current mode
     * @param {RegExpMatchArray} match - regexp match data
     * @returns {KeywordData | false}
     */
    function keywordData(mode, match) {
      const matchText = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return Object.prototype.hasOwnProperty.call(mode.keywords, matchText) && mode.keywords[matchText];
    }

    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }

      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";

      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const data = keywordData(top, match);

        if (data) {
          const [kind, keywordRelevance] = data;
          emitter.addText(buf);
          buf = "";
          relevance += keywordRelevance;

          if (kind.startsWith("_")) {
            // _ implied for relevance only, do not highlight
            // by applying a class name
            buf += match[0];
          } else {
            const cssClass = language.classNameAliases[kind] || kind;
            emitter.addKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }

        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }

      buf += modeBuffer.substr(lastIndex);
      emitter.addText(buf);
    }

    function processSubLanguage() {
      if (modeBuffer === "") return;
      /** @type HighlightResult */

      let result = null;

      if (typeof top.subLanguage === 'string') {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }

        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] =
        /** @type {CompiledMode} */
        result.top;
      } else {
        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      } // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Use case in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.


      if (top.relevance > 0) {
        relevance += result.relevance;
      }

      emitter.addSublanguage(result.emitter, result.language);
    }

    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }

      modeBuffer = '';
    }
    /**
     * @param {Mode} mode - new mode to start
     */


    function startNewMode(mode) {
      if (mode.className) {
        emitter.openNode(language.classNameAliases[mode.className] || mode.className);
      }

      top = Object.create(mode, {
        parent: {
          value: top
        }
      });
      return top;
    }
    /**
     * @param {CompiledMode } mode - the mode to potentially end
     * @param {RegExpMatchArray} match - the latest match
     * @param {string} matchPlusRemainder - match plus remainder of content
     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
     */


    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);

      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored) matched = false;
        }

        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }

          return mode;
        }
      } // even if on:end fires an `ignore` it's still possible
      // that we might trigger the end node because of a parent mode


      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }
    /**
     * Handle matching but then ignoring a sequence of text
     *
     * @param {string} lexeme - string containing full match text
     */


    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        // no more regexs to potentially match here, so we move the cursor forward one
        // space
        modeBuffer += lexeme[0];
        return 1;
      } else {
        // no need to move the cursor, we still have additional regexes to try and
        // match at this very spot
        resumeScanAtSamePosition = true;
        return 0;
      }
    }
    /**
     * Handle the start of a new potential mode match
     *
     * @param {EnhancedMatch} match - the current match
     * @returns {number} how far to advance the parse cursor
     */


    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;
      const resp = new Response(newMode); // first internal before callbacks, then the public ones

      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];

      for (const cb of beforeCallbacks) {
        if (!cb) continue;
        cb(match, resp);
        if (resp.isMatchIgnored) return doIgnore(lexeme);
      }

      if (newMode && newMode.endSameAsBegin) {
        newMode.endRe = escape$1(lexeme);
      }

      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }

        processBuffer();

        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }

      startNewMode(newMode); // if (mode["after:begin"]) {
      //   let resp = new Response(mode);
      //   mode["after:begin"](match, resp);
      // }

      return newMode.returnBegin ? 0 : lexeme.length;
    }
    /**
     * Handle the potential end of mode
     *
     * @param {RegExpMatchArray} match - the current match
     */


    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substr(match.index);
      const endMode = endOfMode(top, match, matchPlusRemainder);

      if (!endMode) {
        return NO_MATCH;
      }

      const origin = top;

      if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }

        processBuffer();

        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }

      do {
        if (top.className) {
          emitter.closeNode();
        }

        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }

        top = top.parent;
      } while (top !== endMode.parent);

      if (endMode.starts) {
        if (endMode.endSameAsBegin) {
          endMode.starts.endRe = endMode.endRe;
        }

        startNewMode(endMode.starts);
      }

      return origin.returnEnd ? 0 : lexeme.length;
    }

    function processContinuations() {
      const list = [];

      for (let current = top; current !== language; current = current.parent) {
        if (current.className) {
          list.unshift(current.className);
        }
      }

      list.forEach(item => emitter.openNode(item));
    }
    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */


    let lastMatch = {};
    /**
     *  Process an individual match
     *
     * @param {string} textBeforeMatch - text preceeding the match (since the last match)
     * @param {EnhancedMatch} [match] - the match itself
     */

    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0]; // add non-matched text to the current mode buffer

      modeBuffer += textBeforeMatch;

      if (lexeme == null) {
        processBuffer();
        return 0;
      } // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140


      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);

        if (!SAFE_MODE) {
          /** @type {AnnotatedError} */
          const err = new Error('0 width match regex');
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }

        return 1;
      }

      lastMatch = match;

      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        // illegal match, we do not continue processing

        /** @type {AnnotatedError} */
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);

        if (processed !== NO_MATCH) {
          return processed;
        }
      } // edge case for when illegal matches $ (end of line) which is technically
      // a 0 width match but not a begin/end match so it's not caught by the
      // first handler (when ignoreIllegals is true)


      if (match.type === "illegal" && lexeme === "") {
        // advance so we aren't stuck in an infinite loop
        return 1;
      } // infinite loops are BAD, this is a last ditch catch all. if we have a
      // decent number of iterations yet our index (cursor position in our
      // parsing) still 3x behind our index then something is very wrong
      // so we bail


      if (iterations > 100000 && iterations > match.index * 3) {
        const err = new Error('potential infinite loop, way more iterations than matches');
        throw err;
      }
      /*
      Why might be find ourselves here?  Only one occasion now.  An end match that was
      triggered but could not be completed.  When might this happen?  When an `endSameasBegin`
      rule sets the end rule to a specific match.  Since the overall mode termination rule that's
      being used to scan the text isn't recompiled that means that any match that LOOKS like
      the end (but is not, because it is not an exact match to the beginning) will
      end up here.  A definite end match, but when `doEndMatch` tries to "reapply"
      the end rule and fails to match, we wind up here, and just silently ignore the end.
       This causes no real harm other than stopping a few times too many.
      */


      modeBuffer += lexeme;
      return lexeme.length;
    }

    const language = getLanguage(languageName);

    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }

    const md = compileLanguage(language, {
      plugins
    });
    let result = '';
    /** @type {CompiledMode} */

    let top = continuation || md;
    /** @type Record<string,CompiledMode> */

    const continuations = {}; // keep continuations for sub-languages

    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = '';
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;

    try {
      top.matcher.considerAll();

      for (;;) {
        iterations++;

        if (resumeScanAtSamePosition) {
          // only regexes not matched previously will now be
          // considered for a potential match
          resumeScanAtSamePosition = false;
        } else {
          top.matcher.considerAll();
        }

        top.matcher.lastIndex = index;
        const match = top.matcher.exec(codeToHighlight); // console.log("match", match[0], match.rule && match.rule.begin)

        if (!match) break;
        const beforeMatch = codeToHighlight.substring(index, match.index);
        const processedCount = processLexeme(beforeMatch, match);
        index = match.index + processedCount;
      }

      processLexeme(codeToHighlight.substr(index));
      emitter.closeAllNodes();
      emitter.finalize();
      result = emitter.toHTML();
      return {
        // avoid possible breakage with v10 clients expecting
        // this to always be an integer
        relevance: Math.floor(relevance),
        value: result,
        language: languageName,
        illegal: false,
        emitter: emitter,
        top: top
      };
    } catch (err) {
      if (err.message && err.message.includes('Illegal')) {
        return {
          illegal: true,
          illegalBy: {
            msg: err.message,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode
          },
          sofar: result,
          relevance: 0,
          value: escape$1$1(codeToHighlight),
          emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          illegal: false,
          relevance: 0,
          value: escape$1$1(codeToHighlight),
          emitter: emitter,
          language: languageName,
          top: top,
          errorRaised: err
        };
      } else {
        throw err;
      }
    }
  }
  /**
   * returns a valid highlight result, without actually doing any actual work,
   * auto highlight starts with this and it's possible for small snippets that
   * auto-detection may not find a better match
   * @param {string} code
   * @returns {HighlightResult}
   */


  function justTextHighlightResult(code) {
    const result = {
      relevance: 0,
      emitter: new options.__emitter(options),
      value: escape$1$1(code),
      illegal: false,
      top: PLAINTEXT_LANGUAGE
    };
    result.emitter.addText(code);
    return result;
  }
  /**
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:
   - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)
     @param {string} code
    @param {Array<string>} [languageSubset]
    @returns {AutoHighlightResult}
  */


  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);
    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name => _highlight(name, code, false));
    results.unshift(plaintext); // plaintext is always an option

    const sorted = results.sort((a, b) => {
      // sort base on relevance
      if (a.relevance !== b.relevance) return b.relevance - a.relevance; // always award the tie to the base language
      // ie if C++ and Arduino are tied, it's more likely to be C++

      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      } // otherwise say they are equal, which has the effect of sorting on
      // relevance while preserving the original ordering - which is how ties
      // have historically been settled, ie the language that comes first always
      // wins in the case of a tie


      return 0;
    });
    const [best, secondBest] = sorted;
    /** @type {AutoHighlightResult} */

    const result = best;
    result.second_best = secondBest;
    return result;
  }
  /**
  Post-processing of the highlighted markup:
   - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers
     @param {string} html
    @returns {string}
  */


  function fixMarkup(html) {
    if (!(options.tabReplace || options.useBR)) {
      return html;
    }

    return html.replace(fixMarkupRe, match => {
      if (match === '\n') {
        return options.useBR ? '<br>' : match;
      } else if (options.tabReplace) {
        return match.replace(/\t/g, options.tabReplace);
      }

      return match;
    });
  }
  /**
   * Builds new class name for block given the language name
   *
   * @param {HTMLElement} element
   * @param {string} [currentLang]
   * @param {string} [resultLang]
   */


  function updateClassName(element, currentLang, resultLang) {
    const language = currentLang ? aliases[currentLang] : resultLang;
    element.classList.add("hljs");
    if (language) element.classList.add(language);
  }
  /** @type {HLJSPlugin} */


  const brPlugin = {
    "before:highlightElement": ({
      el
    }) => {
      if (options.useBR) {
        el.innerHTML = el.innerHTML.replace(/\n/g, '').replace(/<br[ /]*>/g, '\n');
      }
    },
    "after:highlightElement": ({
      result
    }) => {
      if (options.useBR) {
        result.value = result.value.replace(/\n/g, "<br>");
      }
    }
  };
  const TAB_REPLACE_RE = /^(<[^>]+>|\t)+/gm;
  /** @type {HLJSPlugin} */

  const tabReplacePlugin = {
    "after:highlightElement": ({
      result
    }) => {
      if (options.tabReplace) {
        result.value = result.value.replace(TAB_REPLACE_RE, m => m.replace(/\t/g, options.tabReplace));
      }
    }
  };
  /**
   * Applies highlighting to a DOM node containing code. Accepts a DOM node and
   * two optional parameters for fixMarkup.
   *
   * @param {HighlightedHTMLElement} element - the HTML element to highlight
  */

  function highlightElement(element) {
    /** @type HTMLElement */
    let node = null;
    const language = blockLanguage(element);
    if (shouldNotHighlight(language)) return; // support for v10 API

    fire("before:highlightElement", {
      el: element,
      language: language
    });
    node = element;
    const text = node.textContent;
    const result = language ? highlight(text, {
      language,
      ignoreIllegals: true
    }) : highlightAuto(text); // support for v10 API

    fire("after:highlightElement", {
      el: element,
      result,
      text
    });
    element.innerHTML = result.value;
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relavance: result.relevance
    };

    if (result.second_best) {
      element.second_best = {
        language: result.second_best.language,
        // TODO: remove with version 11.0
        re: result.second_best.relevance,
        relavance: result.second_best.relevance
      };
    }
  }
  /**
   * Updates highlight.js global options with the passed options
   *
   * @param {Partial<HLJSOptions>} userOptions
   */


  function configure(userOptions) {
    if (userOptions.useBR) {
      deprecated("10.3.0", "'useBR' will be removed entirely in v11.0");
      deprecated("10.3.0", "Please see https://github.com/highlightjs/highlight.js/issues/2559");
    }

    options = inherit$1(options, userOptions);
  }
  /**
   * Highlights to all <pre><code> blocks on a page
   *
   * @type {Function & {called?: boolean}}
   */
  // TODO: remove v12, deprecated


  const initHighlighting = () => {
    if (initHighlighting.called) return;
    initHighlighting.called = true;
    deprecated("10.6.0", "initHighlighting() is deprecated.  Use highlightAll() instead.");
    const blocks = document.querySelectorAll('pre code');
    blocks.forEach(highlightElement);
  }; // Higlights all when DOMContentLoaded fires
  // TODO: remove v12, deprecated


  function initHighlightingOnLoad() {
    deprecated("10.6.0", "initHighlightingOnLoad() is deprecated.  Use highlightAll() instead.");
    wantsHighlight = true;
  }

  let wantsHighlight = false;
  /**
   * auto-highlights all pre>code elements on the page
   */

  function highlightAll() {
    // if we are called too early in the loading process
    if (document.readyState === "loading") {
      wantsHighlight = true;
      return;
    }

    const blocks = document.querySelectorAll('pre code');
    blocks.forEach(highlightElement);
  }

  function boot() {
    // if a highlight was requested before DOM was loaded, do now
    if (wantsHighlight) highlightAll();
  } // make sure we are in the browser environment


  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', boot, false);
  }
  /**
   * Register a language grammar module
   *
   * @param {string} languageName
   * @param {LanguageFn} languageDefinition
   */


  function registerLanguage(languageName, languageDefinition) {
    let lang = null;

    try {
      lang = languageDefinition(hljs);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName)); // hard or soft error

      if (!SAFE_MODE) {
        throw error$1;
      } else {
        error(error$1);
      } // languages that have serious errors are replaced with essentially a
      // "plaintext" stand-in so that the code blocks will still get normal
      // css classes applied to them - and one bad language won't break the
      // entire highlighter


      lang = PLAINTEXT_LANGUAGE;
    } // give it a temporary name if it doesn't have one in the meta-data


    if (!lang.name) lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);

    if (lang.aliases) {
      registerAliases(lang.aliases, {
        languageName
      });
    }
  }
  /**
   * Remove a language grammar module
   *
   * @param {string} languageName
   */


  function unregisterLanguage(languageName) {
    delete languages[languageName];

    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }
  /**
   * @returns {string[]} List of language internal names
   */


  function listLanguages() {
    return Object.keys(languages);
  }
  /**
    intended usage: When one language truly requires another
     Unlike `getLanguage`, this will throw when the requested language
    is not available.
     @param {string} name - name of the language to fetch/require
    @returns {Language | never}
  */


  function requireLanguage(name) {
    deprecated("10.4.0", "requireLanguage will be removed entirely in v11.");
    deprecated("10.4.0", "Please see https://github.com/highlightjs/highlight.js/pull/2844");
    const lang = getLanguage(name);

    if (lang) {
      return lang;
    }

    const err = new Error('The \'{}\' language is required, but not loaded.'.replace('{}', name));
    throw err;
  }
  /**
   * @param {string} name - name of the language to retrieve
   * @returns {Language | undefined}
   */


  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }
  /**
   *
   * @param {string|string[]} aliasList - single alias or list of aliases
   * @param {{languageName: string}} opts
   */


  function registerAliases(aliasList, {
    languageName
  }) {
    if (typeof aliasList === 'string') {
      aliasList = [aliasList];
    }

    aliasList.forEach(alias => {
      aliases[alias.toLowerCase()] = languageName;
    });
  }
  /**
   * Determines if a given language has auto-detection enabled
   * @param {string} name - name of the language
   */


  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }
  /**
   * Upgrades the old highlightBlock plugins to the new
   * highlightElement API
   * @param {HLJSPlugin} plugin
   */


  function upgradePluginAPI(plugin) {
    // TODO: remove with v12
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = data => {
        plugin["before:highlightBlock"](Object.assign({
          block: data.el
        }, data));
      };
    }

    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = data => {
        plugin["after:highlightBlock"](Object.assign({
          block: data.el
        }, data));
      };
    }
  }
  /**
   * @param {HLJSPlugin} plugin
   */


  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }
  /**
   *
   * @param {PluginEvent} event
   * @param {any} args
   */


  function fire(event, args) {
    const cb = event;
    plugins.forEach(function (plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }
  /**
  Note: fixMarkup is deprecated and will be removed entirely in v11
   @param {string} arg
  @returns {string}
  */


  function deprecateFixMarkup(arg) {
    deprecated("10.2.0", "fixMarkup will be removed entirely in v11.0");
    deprecated("10.2.0", "Please see https://github.com/highlightjs/highlight.js/issues/2534");
    return fixMarkup(arg);
  }
  /**
   *
   * @param {HighlightedHTMLElement} el
   */


  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");
    return highlightElement(el);
  }
  /* Interface definition */


  Object.assign(hljs, {
    highlight,
    highlightAuto,
    highlightAll,
    fixMarkup: deprecateFixMarkup,
    highlightElement,
    // TODO: Remove with v12 API
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    unregisterLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    requireLanguage,
    autoDetection,
    inherit: inherit$1,
    addPlugin,
    // plugins for frameworks
    vuePlugin: BuildVuePlugin(hljs).VuePlugin
  });

  hljs.debugMode = function () {
    SAFE_MODE = false;
  };

  hljs.safeMode = function () {
    SAFE_MODE = true;
  };

  hljs.versionString = version;

  for (const key in MODES$1) {
    // @ts-ignore
    if (typeof MODES$1[key] === "object") {
      // @ts-ignore
      deepFreezeEs6(MODES$1[key]);
    }
  } // merge all the modes/regexs into our main object


  Object.assign(hljs, MODES$1); // built-in plugins, likely to be moved out of core in the future

  hljs.addPlugin(brPlugin); // slated to be removed in v11

  hljs.addPlugin(mergeHTMLPlugin);
  hljs.addPlugin(tabReplacePlugin);
  return hljs;
}; // export an "instance" of the highlighter


var highlight$1 = HLJS({});
var core$1 = highlight$1;

var format = createCommonjsModule(function (module) {

  (function () {
    //// Export the API
    var namespace; // CommonJS / Node module

    {
      namespace = module.exports = format;
    }

    namespace.format = format;
    namespace.vsprintf = vsprintf;

    if (typeof console !== 'undefined' && typeof console.log === 'function') {
      namespace.printf = printf;
    }

    function
      /* ... */
    printf() {
      console.log(format.apply(null, arguments));
    }

    function vsprintf(fmt, replacements) {
      return format.apply(null, [fmt].concat(replacements));
    }

    function format(fmt) {
      var argIndex = 1 // skip initial format argument
      ,
          args = [].slice.call(arguments),
          i = 0,
          n = fmt.length,
          result = '',
          c,
          escaped = false,
          arg,
          tmp,
          leadingZero = false,
          precision,
          nextArg = function nextArg() {
        return args[argIndex++];
      },
          slurpNumber = function slurpNumber() {
        var digits = '';

        while (/\d/.test(fmt[i])) {
          digits += fmt[i++];
          c = fmt[i];
        }

        return digits.length > 0 ? parseInt(digits) : null;
      };

      for (; i < n; ++i) {
        c = fmt[i];

        if (escaped) {
          escaped = false;

          if (c == '.') {
            leadingZero = false;
            c = fmt[++i];
          } else if (c == '0' && fmt[i + 1] == '.') {
            leadingZero = true;
            i += 2;
            c = fmt[i];
          } else {
            leadingZero = true;
          }

          precision = slurpNumber();

          switch (c) {
            case 'b':
              // number in binary
              result += parseInt(nextArg(), 10).toString(2);
              break;

            case 'c':
              // character
              arg = nextArg();
              if (typeof arg === 'string' || arg instanceof String) result += arg;else result += String.fromCharCode(parseInt(arg, 10));
              break;

            case 'd':
              // number in decimal
              result += parseInt(nextArg(), 10);
              break;

            case 'f':
              // floating point number
              tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
              result += leadingZero ? tmp : tmp.replace(/^0/, '');
              break;

            case 'j':
              // JSON
              result += JSON.stringify(nextArg());
              break;

            case 'o':
              // number in octal
              result += '0' + parseInt(nextArg(), 10).toString(8);
              break;

            case 's':
              // string
              result += nextArg();
              break;

            case 'x':
              // lowercase hexadecimal
              result += '0x' + parseInt(nextArg(), 10).toString(16);
              break;

            case 'X':
              // uppercase hexadecimal
              result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
              break;

            default:
              result += c;
              break;
          }
        } else if (c === '%') {
          escaped = true;
        } else {
          result += c;
        }
      }

      return result;
    }
  })();
});

var fault = create(Error);
var fault_1 = fault;
fault.eval = create(EvalError);
fault.range = create(RangeError);
fault.reference = create(ReferenceError);
fault.syntax = create(SyntaxError);
fault.type = create(TypeError);
fault.uri = create(URIError);
fault.create = create; // Create a new `EConstructor`, with the formatted `format` as a first argument.

function create(EConstructor) {
  FormattedError.displayName = EConstructor.displayName || EConstructor.name;
  return FormattedError;

  function FormattedError(format$1) {
    if (format$1) {
      format$1 = format.apply(null, arguments);
    }

    return new EConstructor(format$1);
  }
}

var highlight_1 = highlight;
var highlightAuto_1 = highlightAuto;
var registerLanguage_1 = registerLanguage;
var listLanguages_1 = listLanguages;
var registerAlias_1 = registerAlias;
Emitter.prototype.addText = text;
Emitter.prototype.addKeyword = addKeyword;
Emitter.prototype.addSublanguage = addSublanguage;
Emitter.prototype.openNode = open;
Emitter.prototype.closeNode = close;
Emitter.prototype.closeAllNodes = noop;
Emitter.prototype.finalize = noop;
Emitter.prototype.toHTML = toHtmlNoop;
var defaultPrefix = 'hljs-'; // Highlighting `value` in the language `name`.

function highlight(name, value, options) {
  var before = core$1.configure({});
  var settings = options || {};
  var prefix = settings.prefix;
  var result;

  if (typeof name !== 'string') {
    throw fault_1('Expected `string` for name, got `%s`', name);
  }

  if (!core$1.getLanguage(name)) {
    throw fault_1('Unknown language: `%s` is not registered', name);
  }

  if (typeof value !== 'string') {
    throw fault_1('Expected `string` for value, got `%s`', value);
  }

  if (prefix === null || prefix === undefined) {
    prefix = defaultPrefix;
  }

  core$1.configure({
    __emitter: Emitter,
    classPrefix: prefix
  });
  result = core$1.highlight(value, {
    language: name,
    ignoreIllegals: true
  });
  core$1.configure(before || {});
  /* istanbul ignore if - Highlight.js seems to use this (currently) for broken
   * grammars, so let’s keep it in there just to be sure. */

  if (result.errorRaised) {
    throw result.errorRaised;
  }

  return {
    relevance: result.relevance,
    language: result.language,
    value: result.emitter.rootNode.children
  };
}

function highlightAuto(value, options) {
  var settings = options || {};
  var subset = settings.subset || core$1.listLanguages();
  var length = subset.length;
  var index = -1;
  var result;
  var secondBest;
  var current;
  var name;

  if (typeof value !== 'string') {
    throw fault_1('Expected `string` for value, got `%s`', value);
  }

  secondBest = {
    relevance: 0,
    language: null,
    value: []
  };
  result = {
    relevance: 0,
    language: null,
    value: []
  };

  while (++index < length) {
    name = subset[index];

    if (!core$1.getLanguage(name)) {
      continue;
    }

    current = highlight(name, value, options);
    current.language = name;

    if (current.relevance > secondBest.relevance) {
      secondBest = current;
    }

    if (current.relevance > result.relevance) {
      secondBest = result;
      result = current;
    }
  }

  if (secondBest.language) {
    result.secondBest = secondBest;
  }

  return result;
} // Register a language.


function registerLanguage(name, syntax) {
  core$1.registerLanguage(name, syntax);
} // Get a list of all registered languages.


function listLanguages() {
  return core$1.listLanguages();
} // Register more aliases for an already registered language.


function registerAlias(name, alias) {
  var map = name;
  var key;

  if (alias) {
    map = {};
    map[name] = alias;
  }

  for (key in map) {
    core$1.registerAliases(map[key], {
      languageName: key
    });
  }
}

function Emitter(options) {
  this.options = options;
  this.rootNode = {
    children: []
  };
  this.stack = [this.rootNode];
}

function addKeyword(value, name) {
  this.openNode(name);
  this.addText(value);
  this.closeNode();
}

function addSublanguage(other, name) {
  var stack = this.stack;
  var current = stack[stack.length - 1];
  var results = other.rootNode.children;
  var node = name ? {
    type: 'element',
    tagName: 'span',
    properties: {
      className: [name]
    },
    children: results
  } : results;
  current.children = current.children.concat(node);
}

function text(value) {
  var stack = this.stack;
  var current;
  var tail;
  if (value === '') return;
  current = stack[stack.length - 1];
  tail = current.children[current.children.length - 1];

  if (tail && tail.type === 'text') {
    tail.value += value;
  } else {
    current.children.push({
      type: 'text',
      value: value
    });
  }
}

function open(name) {
  var stack = this.stack;
  var className = this.options.classPrefix + name;
  var current = stack[stack.length - 1];
  var child = {
    type: 'element',
    tagName: 'span',
    properties: {
      className: [className]
    },
    children: []
  };
  current.children.push(child);
  stack.push(child);
}

function close() {
  this.stack.pop();
}

function toHtmlNoop() {
  return '';
}

function noop() {}

var core = {
  highlight: highlight_1,
  highlightAuto: highlightAuto_1,
  registerLanguage: registerLanguage_1,
  listLanguages: listLanguages_1,
  registerAlias: registerAlias_1
};

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source$4(re) {
  if (!re) return null;
  if (typeof re === "string") return re;
  return re.source;
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function lookahead$2(re) {
  return concat$4('(?=', re, ')');
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function optional$1(re) {
  return concat$4('(', re, ')?');
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */


function concat$4(...args) {
  const joined = args.map(x => source$4(x)).join("");
  return joined;
}
/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] } args
 * @returns {string}
 */


function either$2(...args) {
  const joined = '(' + args.map(x => source$4(x)).join("|") + ")";
  return joined;
}
/*
Language: HTML, XML
Website: https://www.w3.org/XML/
Category: common
Audit: 2020
*/

/** @type LanguageFn */


function xml(hljs) {
  // Element names can contain letters, digits, hyphens, underscores, and periods
  const TAG_NAME_RE = concat$4(/[A-Z_]/, optional$1(/[A-Z0-9_.-]*:/), /[A-Z0-9_.-]*/);
  const XML_IDENT_RE = /[A-Za-z0-9._:-]+/;
  const XML_ENTITIES = {
    className: 'symbol',
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  };
  const XML_META_KEYWORDS = {
    begin: /\s/,
    contains: [{
      className: 'meta-keyword',
      begin: /#?[a-z_][a-z1-9_-]+/,
      illegal: /\n/
    }]
  };
  const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
    begin: /\(/,
    end: /\)/
  });
  const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, {
    className: 'meta-string'
  });
  const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    className: 'meta-string'
  });
  const TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [{
      className: 'attr',
      begin: XML_IDENT_RE,
      relevance: 0
    }, {
      begin: /=\s*/,
      relevance: 0,
      contains: [{
        className: 'string',
        endsParent: true,
        variants: [{
          begin: /"/,
          end: /"/,
          contains: [XML_ENTITIES]
        }, {
          begin: /'/,
          end: /'/,
          contains: [XML_ENTITIES]
        }, {
          begin: /[^\s"'=<>`]+/
        }]
      }]
    }]
  };
  return {
    name: 'HTML, XML',
    aliases: ['html', 'xhtml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist', 'wsf', 'svg'],
    case_insensitive: true,
    contains: [{
      className: 'meta',
      begin: /<![a-z]/,
      end: />/,
      relevance: 10,
      contains: [XML_META_KEYWORDS, QUOTE_META_STRING_MODE, APOS_META_STRING_MODE, XML_META_PAR_KEYWORDS, {
        begin: /\[/,
        end: /\]/,
        contains: [{
          className: 'meta',
          begin: /<![a-z]/,
          end: />/,
          contains: [XML_META_KEYWORDS, XML_META_PAR_KEYWORDS, QUOTE_META_STRING_MODE, APOS_META_STRING_MODE]
        }]
      }]
    }, hljs.COMMENT(/<!--/, /-->/, {
      relevance: 10
    }), {
      begin: /<!\[CDATA\[/,
      end: /\]\]>/,
      relevance: 10
    }, XML_ENTITIES, {
      className: 'meta',
      begin: /<\?xml/,
      end: /\?>/,
      relevance: 10
    }, {
      className: 'tag',

      /*
      The lookahead pattern (?=...) ensures that 'begin' only matches
      '<style' as a single word, followed by a whitespace or an
      ending braket. The '$' is needed for the lexeme to be recognized
      by hljs.subMode() that tests lexemes outside the stream.
      */
      begin: /<style(?=\s|>)/,
      end: />/,
      keywords: {
        name: 'style'
      },
      contains: [TAG_INTERNALS],
      starts: {
        end: /<\/style>/,
        returnEnd: true,
        subLanguage: ['css', 'xml']
      }
    }, {
      className: 'tag',
      // See the comment in the <style tag about the lookahead pattern
      begin: /<script(?=\s|>)/,
      end: />/,
      keywords: {
        name: 'script'
      },
      contains: [TAG_INTERNALS],
      starts: {
        end: /<\/script>/,
        returnEnd: true,
        subLanguage: ['javascript', 'handlebars', 'xml']
      }
    }, // we need this for now for jSX
    {
      className: 'tag',
      begin: /<>|<\/>/
    }, // open tag
    {
      className: 'tag',
      begin: concat$4(/</, lookahead$2(concat$4(TAG_NAME_RE, // <tag/>
      // <tag>
      // <tag ...
      either$2(/\/>/, />/, /\s/)))),
      end: /\/?>/,
      contains: [{
        className: 'name',
        begin: TAG_NAME_RE,
        relevance: 0,
        starts: TAG_INTERNALS
      }]
    }, // close tag
    {
      className: 'tag',
      begin: concat$4(/<\//, lookahead$2(concat$4(TAG_NAME_RE, />/))),
      contains: [{
        className: 'name',
        begin: TAG_NAME_RE,
        relevance: 0
      }, {
        begin: />/,
        relevance: 0,
        endsParent: true
      }]
    }]
  };
}

var xml_1 = xml;
var xml$1 = xml_1;

const MODES = hljs => {
  return {
    IMPORTANT: {
      className: 'meta',
      begin: '!important'
    },
    HEXCOLOR: {
      className: 'number',
      begin: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})'
    },
    ATTRIBUTE_SELECTOR_MODE: {
      className: 'selector-attr',
      begin: /\[/,
      end: /\]/,
      illegal: '$',
      contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
    }
  };
};

const TAGS = ['a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'mark', 'menu', 'nav', 'object', 'ol', 'p', 'q', 'quote', 'samp', 'section', 'span', 'strong', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'ul', 'var', 'video'];
const MEDIA_FEATURES = ['any-hover', 'any-pointer', 'aspect-ratio', 'color', 'color-gamut', 'color-index', 'device-aspect-ratio', 'device-height', 'device-width', 'display-mode', 'forced-colors', 'grid', 'height', 'hover', 'inverted-colors', 'monochrome', 'orientation', 'overflow-block', 'overflow-inline', 'pointer', 'prefers-color-scheme', 'prefers-contrast', 'prefers-reduced-motion', 'prefers-reduced-transparency', 'resolution', 'scan', 'scripting', 'update', 'width', // TODO: find a better solution?
'min-width', 'max-width', 'min-height', 'max-height']; // https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes

const PSEUDO_CLASSES = ['active', 'any-link', 'blank', 'checked', 'current', 'default', 'defined', 'dir', // dir()
'disabled', 'drop', 'empty', 'enabled', 'first', 'first-child', 'first-of-type', 'fullscreen', 'future', 'focus', 'focus-visible', 'focus-within', 'has', // has()
'host', // host or host()
'host-context', // host-context()
'hover', 'indeterminate', 'in-range', 'invalid', 'is', // is()
'lang', // lang()
'last-child', 'last-of-type', 'left', 'link', 'local-link', 'not', // not()
'nth-child', // nth-child()
'nth-col', // nth-col()
'nth-last-child', // nth-last-child()
'nth-last-col', // nth-last-col()
'nth-last-of-type', //nth-last-of-type()
'nth-of-type', //nth-of-type()
'only-child', 'only-of-type', 'optional', 'out-of-range', 'past', 'placeholder-shown', 'read-only', 'read-write', 'required', 'right', 'root', 'scope', 'target', 'target-within', 'user-invalid', 'valid', 'visited', 'where' // where()
]; // https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements

const PSEUDO_ELEMENTS = ['after', 'backdrop', 'before', 'cue', 'cue-region', 'first-letter', 'first-line', 'grammar-error', 'marker', 'part', 'placeholder', 'selection', 'slotted', 'spelling-error'];
const ATTRIBUTES = ['align-content', 'align-items', 'align-self', 'animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'auto', 'backface-visibility', 'background', 'background-attachment', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-size', 'border', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-color', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-image-width', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-radius', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-decoration-break', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'caption-side', 'clear', 'clip', 'clip-path', 'color', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'content', 'counter-increment', 'counter-reset', 'cursor', 'direction', 'display', 'empty-cells', 'filter', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'font', 'font-display', 'font-family', 'font-feature-settings', 'font-kerning', 'font-language-override', 'font-size', 'font-size-adjust', 'font-smoothing', 'font-stretch', 'font-style', 'font-variant', 'font-variant-ligatures', 'font-variation-settings', 'font-weight', 'height', 'hyphens', 'icon', 'image-orientation', 'image-rendering', 'image-resolution', 'ime-mode', 'inherit', 'initial', 'justify-content', 'left', 'letter-spacing', 'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'marks', 'mask', 'max-height', 'max-width', 'min-height', 'min-width', 'nav-down', 'nav-index', 'nav-left', 'nav-right', 'nav-up', 'none', 'normal', 'object-fit', 'object-position', 'opacity', 'order', 'orphans', 'outline', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'overflow', 'overflow-wrap', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page-break-after', 'page-break-before', 'page-break-inside', 'perspective', 'perspective-origin', 'pointer-events', 'position', 'quotes', 'resize', 'right', 'src', // @font-face
'tab-size', 'table-layout', 'text-align', 'text-align-last', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-style', 'text-indent', 'text-overflow', 'text-rendering', 'text-shadow', 'text-transform', 'text-underline-position', 'top', 'transform', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'unicode-bidi', 'vertical-align', 'visibility', 'white-space', 'widows', 'width', 'word-break', 'word-spacing', 'word-wrap', 'z-index' // reverse makes sure longer attributes `font-weight` are matched fully
// instead of getting false positives on say `font`
].reverse();
/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */

function source$3(re) {
  if (!re) return null;
  if (typeof re === "string") return re;
  return re.source;
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function lookahead$1(re) {
  return concat$3('(?=', re, ')');
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */


function concat$3(...args) {
  const joined = args.map(x => source$3(x)).join("");
  return joined;
}
/*
Language: CSS
Category: common, css
Website: https://developer.mozilla.org/en-US/docs/Web/CSS
*/

/** @type LanguageFn */


function css(hljs) {
  const modes = MODES(hljs);
  const FUNCTION_DISPATCH = {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  };
  const VENDOR_PREFIX = {
    begin: /-(webkit|moz|ms|o)-(?=[a-z])/
  };
  const AT_MODIFIERS = "and or not only";
  const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/; // @-webkit-keyframes

  const IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  const STRINGS = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE];
  return {
    name: 'CSS',
    case_insensitive: true,
    illegal: /[=|'\$]/,
    keywords: {
      keyframePosition: "from to"
    },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [hljs.C_BLOCK_COMMENT_MODE, VENDOR_PREFIX, // to recognize keyframe 40% etc which are outside the scope of our
    // attribute value mode
    hljs.CSS_NUMBER_MODE, {
      className: 'selector-id',
      begin: /#[A-Za-z0-9_-]+/,
      relevance: 0
    }, {
      className: 'selector-class',
      begin: '\\.' + IDENT_RE,
      relevance: 0
    }, modes.ATTRIBUTE_SELECTOR_MODE, {
      className: 'selector-pseudo',
      variants: [{
        begin: ':(' + PSEUDO_CLASSES.join('|') + ')'
      }, {
        begin: '::(' + PSEUDO_ELEMENTS.join('|') + ')'
      }]
    }, // we may actually need this (12/2020)
    // { // pseudo-selector params
    //   begin: /\(/,
    //   end: /\)/,
    //   contains: [ hljs.CSS_NUMBER_MODE ]
    // },
    {
      className: 'attribute',
      begin: '\\b(' + ATTRIBUTES.join('|') + ')\\b'
    }, // attribute values
    {
      begin: ':',
      end: '[;}]',
      contains: [modes.HEXCOLOR, modes.IMPORTANT, hljs.CSS_NUMBER_MODE, ...STRINGS, // needed to highlight these as strings and to avoid issues with
      // illegal characters that might be inside urls that would tigger the
      // languages illegal stack
      {
        begin: /(url|data-uri)\(/,
        end: /\)/,
        relevance: 0,
        // from keywords
        keywords: {
          built_in: "url data-uri"
        },
        contains: [{
          className: "string",
          // any character other than `)` as in `url()` will be the start
          // of a string, which ends with `)` (from the parent mode)
          begin: /[^)]/,
          endsWithParent: true,
          excludeEnd: true
        }]
      }, FUNCTION_DISPATCH]
    }, {
      begin: lookahead$1(/@/),
      end: '[{;]',
      relevance: 0,
      illegal: /:/,
      // break on Less variables @var: ...
      contains: [{
        className: 'keyword',
        begin: AT_PROPERTY_RE
      }, {
        begin: /\s/,
        endsWithParent: true,
        excludeEnd: true,
        relevance: 0,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: AT_MODIFIERS,
          attribute: MEDIA_FEATURES.join(" ")
        },
        contains: [{
          begin: /[a-z-]+(?=:)/,
          className: "attribute"
        }, ...STRINGS, hljs.CSS_NUMBER_MODE]
      }]
    }, {
      className: 'selector-tag',
      begin: '\\b(' + TAGS.join('|') + ')\\b'
    }]
  };
}

var css_1 = css;
var css$1 = css_1;

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source$2(re) {
  if (!re) return null;
  if (typeof re === "string") return re;
  return re.source;
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function anyNumberOfTimes(re) {
  return concat$2('(', re, ')*');
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function optional(re) {
  return concat$2('(', re, ')?');
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */


function concat$2(...args) {
  const joined = args.map(x => source$2(x)).join("");
  return joined;
}
/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] } args
 * @returns {string}
 */


function either$1(...args) {
  const joined = '(' + args.map(x => source$2(x)).join("|") + ")";
  return joined;
}
/*
Language: Handlebars
Requires: xml.js
Author: Robin Ward <robin.ward@gmail.com>
Description: Matcher for Handlebars as well as EmberJS additions.
Website: https://handlebarsjs.com
Category: template
*/


function handlebars(hljs) {
  const BUILT_INS = {
    'builtin-name': ['action', 'bindattr', 'collection', 'component', 'concat', 'debugger', 'each', 'each-in', 'get', 'hash', 'if', 'in', 'input', 'link-to', 'loc', 'log', 'lookup', 'mut', 'outlet', 'partial', 'query-params', 'render', 'template', 'textarea', 'unbound', 'unless', 'view', 'with', 'yield']
  };
  const LITERALS = {
    literal: ['true', 'false', 'undefined', 'null']
  }; // as defined in https://handlebarsjs.com/guide/expressions.html#literal-segments
  // this regex matches literal segments like ' abc ' or [ abc ] as well as helpers and paths
  // like a/b, ./abc/cde, and abc.bcd

  const DOUBLE_QUOTED_ID_REGEX = /""|"[^"]+"/;
  const SINGLE_QUOTED_ID_REGEX = /''|'[^']+'/;
  const BRACKET_QUOTED_ID_REGEX = /\[\]|\[[^\]]+\]/;
  const PLAIN_ID_REGEX = /[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/;
  const PATH_DELIMITER_REGEX = /(\.|\/)/;
  const ANY_ID = either$1(DOUBLE_QUOTED_ID_REGEX, SINGLE_QUOTED_ID_REGEX, BRACKET_QUOTED_ID_REGEX, PLAIN_ID_REGEX);
  const IDENTIFIER_REGEX = concat$2(optional(/\.|\.\/|\//), // relative or absolute path
  ANY_ID, anyNumberOfTimes(concat$2(PATH_DELIMITER_REGEX, ANY_ID))); // identifier followed by a equal-sign (without the equal sign)

  const HASH_PARAM_REGEX = concat$2('(', BRACKET_QUOTED_ID_REGEX, '|', PLAIN_ID_REGEX, ')(?==)');
  const HELPER_NAME_OR_PATH_EXPRESSION = {
    begin: IDENTIFIER_REGEX,
    lexemes: /[\w.\/]+/
  };
  const HELPER_PARAMETER = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: LITERALS
  });
  const SUB_EXPRESSION = {
    begin: /\(/,
    end: /\)/ // the "contains" is added below when all necessary sub-modes are defined

  };
  const HASH = {
    // fka "attribute-assignment", parameters of the form 'key=value'
    className: 'attr',
    begin: HASH_PARAM_REGEX,
    relevance: 0,
    starts: {
      begin: /=/,
      end: /=/,
      starts: {
        contains: [hljs.NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, HELPER_PARAMETER, SUB_EXPRESSION]
      }
    }
  };
  const BLOCK_PARAMS = {
    // parameters of the form '{{#with x as | y |}}...{{/with}}'
    begin: /as\s+\|/,
    keywords: {
      keyword: 'as'
    },
    end: /\|/,
    contains: [{
      // define sub-mode in order to prevent highlighting of block-parameter named "as"
      begin: /\w+/
    }]
  };
  const HELPER_PARAMETERS = {
    contains: [hljs.NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, BLOCK_PARAMS, HASH, HELPER_PARAMETER, SUB_EXPRESSION],
    returnEnd: true // the property "end" is defined through inheritance when the mode is used. If depends
    // on the surrounding mode, but "endsWithParent" does not work here (i.e. it includes the
    // end-token of the surrounding mode)

  };
  const SUB_EXPRESSION_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    className: 'name',
    keywords: BUILT_INS,
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /\)/
    })
  });
  SUB_EXPRESSION.contains = [SUB_EXPRESSION_CONTENTS];
  const OPENING_BLOCK_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: BUILT_INS,
    className: 'name',
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /\}\}/
    })
  });
  const CLOSING_BLOCK_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: BUILT_INS,
    className: 'name'
  });
  const BASIC_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    className: 'name',
    keywords: BUILT_INS,
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /\}\}/
    })
  });
  const ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH = {
    begin: /\\\{\{/,
    skip: true
  };
  const PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH = {
    begin: /\\\\(?=\{\{)/,
    skip: true
  };
  return {
    name: 'Handlebars',
    aliases: ['hbs', 'html.hbs', 'html.handlebars', 'htmlbars'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH, PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH, hljs.COMMENT(/\{\{!--/, /--\}\}/), hljs.COMMENT(/\{\{!/, /\}\}/), {
      // open raw block "{{{{raw}}}} content not evaluated {{{{/raw}}}}"
      className: 'template-tag',
      begin: /\{\{\{\{(?!\/)/,
      end: /\}\}\}\}/,
      contains: [OPENING_BLOCK_MUSTACHE_CONTENTS],
      starts: {
        end: /\{\{\{\{\//,
        returnEnd: true,
        subLanguage: 'xml'
      }
    }, {
      // close raw block
      className: 'template-tag',
      begin: /\{\{\{\{\//,
      end: /\}\}\}\}/,
      contains: [CLOSING_BLOCK_MUSTACHE_CONTENTS]
    }, {
      // open block statement
      className: 'template-tag',
      begin: /\{\{#/,
      end: /\}\}/,
      contains: [OPENING_BLOCK_MUSTACHE_CONTENTS]
    }, {
      className: 'template-tag',
      begin: /\{\{(?=else\}\})/,
      end: /\}\}/,
      keywords: 'else'
    }, {
      className: 'template-tag',
      begin: /\{\{(?=else if)/,
      end: /\}\}/,
      keywords: 'else if'
    }, {
      // closing block statement
      className: 'template-tag',
      begin: /\{\{\//,
      end: /\}\}/,
      contains: [CLOSING_BLOCK_MUSTACHE_CONTENTS]
    }, {
      // template variable or helper-call that is NOT html-escaped
      className: 'template-variable',
      begin: /\{\{\{/,
      end: /\}\}\}/,
      contains: [BASIC_MUSTACHE_CONTENTS]
    }, {
      // template variable or helper-call that is html-escaped
      className: 'template-variable',
      begin: /\{\{/,
      end: /\}\}/,
      contains: [BASIC_MUSTACHE_CONTENTS]
    }]
  };
}

var handlebars_1 = handlebars;
var handlebars$1 = handlebars_1;

const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
const KEYWORDS = ["as", // for exports
"in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", // JS handles these with a special rule
// "get",
// "set",
"debugger", "async", "await", "static", "import", "from", "export", "extends"];
const LITERALS = ["true", "false", "null", "undefined", "NaN", "Infinity"];
const TYPES = ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"];
const ERROR_TYPES = ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"];
const BUILT_IN_GLOBALS = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"];
const BUILT_IN_VARIABLES = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global" // Node.js
];
const BUILT_INS = [].concat(BUILT_IN_GLOBALS, BUILT_IN_VARIABLES, TYPES, ERROR_TYPES);
/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */

function source$1(re) {
  if (!re) return null;
  if (typeof re === "string") return re;
  return re.source;
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function lookahead(re) {
  return concat$1('(?=', re, ')');
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */


function concat$1(...args) {
  const joined = args.map(x => source$1(x)).join("");
  return joined;
}
/*
Language: JavaScript
Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
Category: common, scripting
Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
*/

/** @type LanguageFn */


function javascript(hljs) {
  /**
   * Takes a string like "<Booger" and checks to see
   * if we can find a matching "</Booger" later in the
   * content.
   * @param {RegExpMatchArray} match
   * @param {{after:number}} param1
   */
  const hasClosingTag = (match, {
    after
  }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };

  const IDENT_RE$1 = IDENT_RE;
  const FRAGMENT = {
    begin: '<>',
    end: '</>'
  };
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,

    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex]; // nested type?
      // HTML should not include another raw `<` inside a tag
      // But a type might: `<Array<Array<number>>`, etc.

      if (nextChar === "<") {
        response.ignoreMatch();
        return;
      } // <something>
      // This is now either a tag or a type.


      if (nextChar === ">") {
        // if we cannot find a matching closing tag, then we
        // will ignore it
        if (!hasClosingTag(match, {
          after: afterMatchIndex
        })) {
          response.ignoreMatch();
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS
  }; // https://tc39.es/ecma262/#sec-literals-numeric-literals

  const decimalDigits = '[0-9](_?[0-9])*';
  const frac = `\\.(${decimalDigits})`; // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals

  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: 'number',
    variants: [// DecimalLiteral
    {
      begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` + `[eE][+-]?(${decimalDigits})\\b`
    }, {
      begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b`
    }, // DecimalBigIntegerLiteral
    {
      begin: `\\b(0|[1-9](_?[0-9])*)n\\b`
    }, // NonDecimalIntegerLiteral
    {
      begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
    }, {
      begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
    }, {
      begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
    }, // LegacyOctalIntegerLiteral (does not include underscore separators)
    // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
    {
      begin: "\\b0[0-7]+n?\\b"
    }],
    relevance: 0
  };
  const SUBST = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS$1,
    contains: [] // defined later

  };
  const HTML_TEMPLATE = {
    begin: 'html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, SUBST],
      subLanguage: 'xml'
    }
  };
  const CSS_TEMPLATE = {
    begin: 'css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, SUBST],
      subLanguage: 'css'
    }
  };
  const TEMPLATE_STRING = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST]
  };
  const JSDOC_COMMENT = hljs.COMMENT(/\/\*\*(?!\/)/, '\\*/', {
    relevance: 0,
    contains: [{
      className: 'doctag',
      begin: '@[A-Za-z]+',
      contains: [{
        className: 'type',
        begin: '\\{',
        end: '\\}',
        relevance: 0
      }, {
        className: 'variable',
        begin: IDENT_RE$1 + '(?=\\s*(-)|$)',
        endsParent: true,
        relevance: 0
      }, // eat spaces (not newlines) so we can find
      // types or variables
      {
        begin: /(?=[^\n])\s/,
        relevance: 0
      }]
    }]
  });
  const COMMENT = {
    className: "comment",
    variants: [JSDOC_COMMENT, hljs.C_BLOCK_COMMENT_MODE, hljs.C_LINE_COMMENT_MODE]
  };
  const SUBST_INTERNALS = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, HTML_TEMPLATE, CSS_TEMPLATE, TEMPLATE_STRING, NUMBER, hljs.REGEXP_MODE];
  SUBST.contains = SUBST_INTERNALS.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS$1,
    contains: ["self"].concat(SUBST_INTERNALS)
  });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([// eat recursive parens in sub expressions
  {
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORDS$1,
    contains: ["self"].concat(SUBST_AND_COMMENTS)
  }]);
  const PARAMS = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };
  return {
    name: 'Javascript',
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: KEYWORDS$1,
    // this will be extended by TypeScript
    exports: {
      PARAMS_CONTAINS
    },
    illegal: /#(?![$_A-z])/,
    contains: [hljs.SHEBANG({
      label: "shebang",
      binary: "node",
      relevance: 5
    }), {
      label: "use_strict",
      className: 'meta',
      relevance: 10,
      begin: /^\s*['"]use (strict|asm)['"]/
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, HTML_TEMPLATE, CSS_TEMPLATE, TEMPLATE_STRING, COMMENT, NUMBER, {
      // object attr container
      begin: concat$1(/[{,\n]\s*/, // we need to look ahead to make sure that we actually have an
      // attribute coming up so we don't steal a comma from a potential
      // "value" container
      //
      // NOTE: this might not work how you think.  We don't actually always
      // enter this mode and stay.  Instead it might merely match `,
      // <comments up next>` and then immediately end after the , because it
      // fails to find any actual attrs. But this still does the job because
      // it prevents the value contain rule from grabbing this instead and
      // prevening this rule from firing when we actually DO have keys.
      lookahead(concat$1( // we also need to allow for multiple possible comments inbetween
      // the first key:value pairing
      /(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, IDENT_RE$1 + '\\s*:'))),
      relevance: 0,
      contains: [{
        className: 'attr',
        begin: IDENT_RE$1 + lookahead('\\s*:'),
        relevance: 0
      }]
    }, {
      // "value" container
      begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
      keywords: 'return throw case',
      contains: [COMMENT, hljs.REGEXP_MODE, {
        className: 'function',
        // we have to count the parens to make sure we actually have the
        // correct bounding ( ) before the =>.  There could be any number of
        // sub-expressions inside also surrounded by parens.
        begin: '(\\(' + '[^()]*(\\(' + '[^()]*(\\(' + '[^()]*' + '\\)[^()]*)*' + '\\)[^()]*)*' + '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>',
        returnBegin: true,
        end: '\\s*=>',
        contains: [{
          className: 'params',
          variants: [{
            begin: hljs.UNDERSCORE_IDENT_RE,
            relevance: 0
          }, {
            className: null,
            begin: /\(\s*\)/,
            skip: true
          }, {
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS$1,
            contains: PARAMS_CONTAINS
          }]
        }]
      }, {
        // could be a comma delimited list of params to a function call
        begin: /,/,
        relevance: 0
      }, {
        className: '',
        begin: /\s/,
        end: /\s*/,
        skip: true
      }, {
        // JSX
        variants: [{
          begin: FRAGMENT.begin,
          end: FRAGMENT.end
        }, {
          begin: XML_TAG.begin,
          // we carefully check the opening tag to see if it truly
          // is a tag and not a false positive
          'on:begin': XML_TAG.isTrulyOpeningTag,
          end: XML_TAG.end
        }],
        subLanguage: 'xml',
        contains: [{
          begin: XML_TAG.begin,
          end: XML_TAG.end,
          skip: true,
          contains: ['self']
        }]
      }],
      relevance: 0
    }, {
      className: 'function',
      beginKeywords: 'function',
      end: /[{;]/,
      excludeEnd: true,
      keywords: KEYWORDS$1,
      contains: ['self', hljs.inherit(hljs.TITLE_MODE, {
        begin: IDENT_RE$1
      }), PARAMS],
      illegal: /%/
    }, {
      // prevent this from getting swallowed up by function
      // since they appear "function like"
      beginKeywords: "while if switch catch for"
    }, {
      className: 'function',
      // we have to count the parens to make sure we actually have the correct
      // bounding ( ).  There could be any number of sub-expressions inside
      // also surrounded by parens.
      begin: hljs.UNDERSCORE_IDENT_RE + '\\(' + // first parens
      '[^()]*(\\(' + '[^()]*(\\(' + '[^()]*' + '\\)[^()]*)*' + '\\)[^()]*)*' + '\\)\\s*\\{',
      // end parens
      returnBegin: true,
      contains: [PARAMS, hljs.inherit(hljs.TITLE_MODE, {
        begin: IDENT_RE$1
      })]
    }, // hack: prevents detection of keywords in some circumstances
    // .keyword()
    // $keyword = x
    {
      variants: [{
        begin: '\\.' + IDENT_RE$1
      }, {
        begin: '\\$' + IDENT_RE$1
      }],
      relevance: 0
    }, {
      // ES6 class
      className: 'class',
      beginKeywords: 'class',
      end: /[{;=]/,
      excludeEnd: true,
      illegal: /[:"[\]]/,
      contains: [{
        beginKeywords: 'extends'
      }, hljs.UNDERSCORE_TITLE_MODE]
    }, {
      begin: /\b(?=constructor)/,
      end: /[{;]/,
      excludeEnd: true,
      contains: [hljs.inherit(hljs.TITLE_MODE, {
        begin: IDENT_RE$1
      }), 'self', PARAMS]
    }, {
      begin: '(get|set)\\s+(?=' + IDENT_RE$1 + '\\()',
      end: /\{/,
      keywords: "get set",
      contains: [hljs.inherit(hljs.TITLE_MODE, {
        begin: IDENT_RE$1
      }), {
        begin: /\(\)/
      }, // eat to avoid empty params
      PARAMS]
    }, {
      begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`

    }]
  };
}

var javascript_1 = javascript;
var javascript$1 = javascript_1;

/*
Language: JSON
Description: JSON (JavaScript Object Notation) is a lightweight data-interchange format.
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Website: http://www.json.org
Category: common, protocols
*/
function json(hljs) {
  const LITERALS = {
    literal: 'true false null'
  };
  const ALLOWED_COMMENTS = [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE];
  const TYPES = [hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE];
  const VALUE_CONTAINER = {
    end: ',',
    endsWithParent: true,
    excludeEnd: true,
    contains: TYPES,
    keywords: LITERALS
  };
  const OBJECT = {
    begin: /\{/,
    end: /\}/,
    contains: [{
      className: 'attr',
      begin: /"/,
      end: /"/,
      contains: [hljs.BACKSLASH_ESCAPE],
      illegal: '\\n'
    }, hljs.inherit(VALUE_CONTAINER, {
      begin: /:/
    })].concat(ALLOWED_COMMENTS),
    illegal: '\\S'
  };
  const ARRAY = {
    begin: '\\[',
    end: '\\]',
    contains: [hljs.inherit(VALUE_CONTAINER)],
    // inherit is a workaround for a bug that makes shared modes with endsWithParent compile only the ending of one of the parents
    illegal: '\\S'
  };
  TYPES.push(OBJECT, ARRAY);
  ALLOWED_COMMENTS.forEach(function (rule) {
    TYPES.push(rule);
  });
  return {
    name: 'JSON',
    contains: TYPES,
    keywords: LITERALS,
    illegal: '\\S'
  };
}

var json_1 = json;
var json$1 = json_1;

/*
Language: PHP
Author: Victor Karamzin <Victor.Karamzin@enterra-inc.com>
Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Ivan Sagalaev <maniac@softwaremaniacs.org>
Website: https://www.php.net
Category: common
*/

/**
 * @param {HLJSApi} hljs
 * @returns {LanguageDetail}
 * */
function php(hljs) {
  const VARIABLE = {
    className: 'variable',
    begin: '\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*' + // negative look-ahead tries to avoid matching patterns that are not
    // Perl at all like $ident$, @ident@, etc.
    `(?![A-Za-z0-9])(?![$])`
  };
  const PREPROCESSOR = {
    className: 'meta',
    variants: [{
      begin: /<\?php/,
      relevance: 10
    }, // boost for obvious PHP
    {
      begin: /<\?[=]?/
    }, {
      begin: /\?>/
    } // end php tag
    ]
  };
  const SUBST = {
    className: 'subst',
    variants: [{
      begin: /\$\w+/
    }, {
      begin: /\{\$/,
      end: /\}/
    }]
  };
  const SINGLE_QUOTED = hljs.inherit(hljs.APOS_STRING_MODE, {
    illegal: null
  });
  const DOUBLE_QUOTED = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST)
  });
  const HEREDOC = hljs.END_SAME_AS_BEGIN({
    begin: /<<<[ \t]*(\w+)\n/,
    end: /[ \t]*(\w+)\b/,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST)
  });
  const STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, PREPROCESSOR],
    variants: [hljs.inherit(SINGLE_QUOTED, {
      begin: "b'",
      end: "'"
    }), hljs.inherit(DOUBLE_QUOTED, {
      begin: 'b"',
      end: '"'
    }), DOUBLE_QUOTED, SINGLE_QUOTED, HEREDOC]
  };
  const NUMBER = {
    className: 'number',
    variants: [{
      begin: `\\b0b[01]+(?:_[01]+)*\\b`
    }, // Binary w/ underscore support
    {
      begin: `\\b0o[0-7]+(?:_[0-7]+)*\\b`
    }, // Octals w/ underscore support
    {
      begin: `\\b0x[\\da-f]+(?:_[\\da-f]+)*\\b`
    }, // Hex w/ underscore support
    // Decimals w/ underscore support, with optional fragments and scientific exponent (e) suffix.
    {
      begin: `(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:e[+-]?\\d+)?`
    }],
    relevance: 0
  };
  const KEYWORDS = {
    keyword: // Magic constants:
    // <https://www.php.net/manual/en/language.constants.predefined.php>
    '__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ ' + // Function that look like language construct or language construct that look like function:
    // List of keywords that may not require parenthesis
    'die echo exit include include_once print require require_once ' + // These are not language construct (function) but operate on the currently-executing function and can access the current symbol table
    // 'compact extract func_get_arg func_get_args func_num_args get_called_class get_parent_class ' +
    // Other keywords:
    // <https://www.php.net/manual/en/reserved.php>
    // <https://www.php.net/manual/en/language.types.type-juggling.php>
    'array abstract and as binary bool boolean break callable case catch class clone const continue declare ' + 'default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile enum eval extends ' + 'final finally float for foreach from global goto if implements instanceof insteadof int integer interface ' + 'isset iterable list match|0 mixed new object or private protected public real return string switch throw trait ' + 'try unset use var void while xor yield',
    literal: 'false null true',
    built_in: // Standard PHP library:
    // <https://www.php.net/manual/en/book.spl.php>
    'Error|0 ' + // error is too common a name esp since PHP is case in-sensitive
    'AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException UnhandledMatchError ' + // Reserved interfaces:
    // <https://www.php.net/manual/en/reserved.interfaces.php>
    'ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Stringable Throwable Traversable WeakReference WeakMap ' + // Reserved classes:
    // <https://www.php.net/manual/en/reserved.classes.php>
    'Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass'
  };
  return {
    aliases: ['php3', 'php4', 'php5', 'php6', 'php7', 'php8'],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [hljs.HASH_COMMENT_MODE, hljs.COMMENT('//', '$', {
      contains: [PREPROCESSOR]
    }), hljs.COMMENT('/\\*', '\\*/', {
      contains: [{
        className: 'doctag',
        begin: '@[A-Za-z]+'
      }]
    }), hljs.COMMENT('__halt_compiler.+?;', false, {
      endsWithParent: true,
      keywords: '__halt_compiler'
    }), PREPROCESSOR, {
      className: 'keyword',
      begin: /\$this\b/
    }, VARIABLE, {
      // swallow composed identifiers to avoid parsing them as keywords
      begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
    }, {
      className: 'function',
      relevance: 0,
      beginKeywords: 'fn function',
      end: /[;{]/,
      excludeEnd: true,
      illegal: '[$%\\[]',
      contains: [{
        beginKeywords: 'use'
      }, hljs.UNDERSCORE_TITLE_MODE, {
        begin: '=>',
        // No markup, just a relevance booster
        endsParent: true
      }, {
        className: 'params',
        begin: '\\(',
        end: '\\)',
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: ['self', VARIABLE, hljs.C_BLOCK_COMMENT_MODE, STRING, NUMBER]
      }]
    }, {
      className: 'class',
      variants: [{
        beginKeywords: "enum",
        illegal: /[($"]/
      }, {
        beginKeywords: "class interface trait",
        illegal: /[:($"]/
      }],
      relevance: 0,
      end: /\{/,
      excludeEnd: true,
      contains: [{
        beginKeywords: 'extends implements'
      }, hljs.UNDERSCORE_TITLE_MODE]
    }, {
      beginKeywords: 'namespace',
      relevance: 0,
      end: ';',
      illegal: /[.']/,
      contains: [hljs.UNDERSCORE_TITLE_MODE]
    }, {
      beginKeywords: 'use',
      relevance: 0,
      end: ';',
      contains: [hljs.UNDERSCORE_TITLE_MODE]
    }, STRING, NUMBER]
  };
}

var php_1 = php;
var php$1 = php_1;

/*
Language: PHP Template
Requires: xml.js, php.js
Author: Josh Goebel <hello@joshgoebel.com>
Website: https://www.php.net
Category: common
*/
function phpTemplate(hljs) {
  return {
    name: "PHP template",
    subLanguage: 'xml',
    contains: [{
      begin: /<\?(php|=)?/,
      end: /\?>/,
      subLanguage: 'php',
      contains: [// We don't want the php closing tag ?> to close the PHP block when
      // inside any of the following blocks:
      {
        begin: '/\\*',
        end: '\\*/',
        skip: true
      }, {
        begin: 'b"',
        end: '"',
        skip: true
      }, {
        begin: 'b\'',
        end: '\'',
        skip: true
      }, hljs.inherit(hljs.APOS_STRING_MODE, {
        illegal: null,
        className: null,
        contains: null,
        skip: true
      }), hljs.inherit(hljs.QUOTE_STRING_MODE, {
        illegal: null,
        className: null,
        contains: null,
        skip: true
      })]
    }]
  };
}

var phpTemplate_1 = phpTemplate;
var phpTemplate$1 = phpTemplate_1;

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;
  return re.source;
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */


function concat(...args) {
  const joined = args.map(x => source(x)).join("");
  return joined;
}
/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] } args
 * @returns {string}
 */


function either(...args) {
  const joined = '(' + args.map(x => source(x)).join("|") + ")";
  return joined;
}
/*
 Language: SQL
 Website: https://en.wikipedia.org/wiki/SQL
 Category: common, database
 */


function sql(hljs) {
  const COMMENT_MODE = hljs.COMMENT('--', '$');
  const STRING = {
    className: 'string',
    variants: [{
      begin: /'/,
      end: /'/,
      contains: [{
        begin: /''/
      }]
    }]
  };
  const QUOTED_IDENTIFIER = {
    begin: /"/,
    end: /"/,
    contains: [{
      begin: /""/
    }]
  };
  const LITERALS = ["true", "false", // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
  // "null",
  "unknown"];
  const MULTI_WORD_TYPES = ["double precision", "large object", "with timezone", "without timezone"];
  const TYPES = ['bigint', 'binary', 'blob', 'boolean', 'char', 'character', 'clob', 'date', 'dec', 'decfloat', 'decimal', 'float', 'int', 'integer', 'interval', 'nchar', 'nclob', 'national', 'numeric', 'real', 'row', 'smallint', 'time', 'timestamp', 'varchar', 'varying', // modifier (character varying)
  'varbinary'];
  const NON_RESERVED_WORDS = ["add", "asc", "collation", "desc", "final", "first", "last", "view"]; // https://jakewheat.github.io/sql-overview/sql-2016-foundation-grammar.html#reserved-word

  const RESERVED_WORDS = ["abs", "acos", "all", "allocate", "alter", "and", "any", "are", "array", "array_agg", "array_max_cardinality", "as", "asensitive", "asin", "asymmetric", "at", "atan", "atomic", "authorization", "avg", "begin", "begin_frame", "begin_partition", "between", "bigint", "binary", "blob", "boolean", "both", "by", "call", "called", "cardinality", "cascaded", "case", "cast", "ceil", "ceiling", "char", "char_length", "character", "character_length", "check", "classifier", "clob", "close", "coalesce", "collate", "collect", "column", "commit", "condition", "connect", "constraint", "contains", "convert", "copy", "corr", "corresponding", "cos", "cosh", "count", "covar_pop", "covar_samp", "create", "cross", "cube", "cume_dist", "current", "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_row", "current_schema", "current_time", "current_timestamp", "current_path", "current_role", "current_transform_group_for_type", "current_user", "cursor", "cycle", "date", "day", "deallocate", "dec", "decimal", "decfloat", "declare", "default", "define", "delete", "dense_rank", "deref", "describe", "deterministic", "disconnect", "distinct", "double", "drop", "dynamic", "each", "element", "else", "empty", "end", "end_frame", "end_partition", "end-exec", "equals", "escape", "every", "except", "exec", "execute", "exists", "exp", "external", "extract", "false", "fetch", "filter", "first_value", "float", "floor", "for", "foreign", "frame_row", "free", "from", "full", "function", "fusion", "get", "global", "grant", "group", "grouping", "groups", "having", "hold", "hour", "identity", "in", "indicator", "initial", "inner", "inout", "insensitive", "insert", "int", "integer", "intersect", "intersection", "interval", "into", "is", "join", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "language", "large", "last_value", "lateral", "lead", "leading", "left", "like", "like_regex", "listagg", "ln", "local", "localtime", "localtimestamp", "log", "log10", "lower", "match", "match_number", "match_recognize", "matches", "max", "member", "merge", "method", "min", "minute", "mod", "modifies", "module", "month", "multiset", "national", "natural", "nchar", "nclob", "new", "no", "none", "normalize", "not", "nth_value", "ntile", "null", "nullif", "numeric", "octet_length", "occurrences_regex", "of", "offset", "old", "omit", "on", "one", "only", "open", "or", "order", "out", "outer", "over", "overlaps", "overlay", "parameter", "partition", "pattern", "per", "percent", "percent_rank", "percentile_cont", "percentile_disc", "period", "portion", "position", "position_regex", "power", "precedes", "precision", "prepare", "primary", "procedure", "ptf", "range", "rank", "reads", "real", "recursive", "ref", "references", "referencing", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "release", "result", "return", "returns", "revoke", "right", "rollback", "rollup", "row", "row_number", "rows", "running", "savepoint", "scope", "scroll", "search", "second", "seek", "select", "sensitive", "session_user", "set", "show", "similar", "sin", "sinh", "skip", "smallint", "some", "specific", "specifictype", "sql", "sqlexception", "sqlstate", "sqlwarning", "sqrt", "start", "static", "stddev_pop", "stddev_samp", "submultiset", "subset", "substring", "substring_regex", "succeeds", "sum", "symmetric", "system", "system_time", "system_user", "table", "tablesample", "tan", "tanh", "then", "time", "timestamp", "timezone_hour", "timezone_minute", "to", "trailing", "translate", "translate_regex", "translation", "treat", "trigger", "trim", "trim_array", "true", "truncate", "uescape", "union", "unique", "unknown", "unnest", "update   ", "upper", "user", "using", "value", "values", "value_of", "var_pop", "var_samp", "varbinary", "varchar", "varying", "versioning", "when", "whenever", "where", "width_bucket", "window", "with", "within", "without", "year"]; // these are reserved words we have identified to be functions
  // and should only be highlighted in a dispatch-like context
  // ie, array_agg(...), etc.

  const RESERVED_FUNCTIONS = ["abs", "acos", "array_agg", "asin", "atan", "avg", "cast", "ceil", "ceiling", "coalesce", "corr", "cos", "cosh", "count", "covar_pop", "covar_samp", "cume_dist", "dense_rank", "deref", "element", "exp", "extract", "first_value", "floor", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "last_value", "lead", "listagg", "ln", "log", "log10", "lower", "max", "min", "mod", "nth_value", "ntile", "nullif", "percent_rank", "percentile_cont", "percentile_disc", "position", "position_regex", "power", "rank", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "row_number", "sin", "sinh", "sqrt", "stddev_pop", "stddev_samp", "substring", "substring_regex", "sum", "tan", "tanh", "translate", "translate_regex", "treat", "trim", "trim_array", "unnest", "upper", "value_of", "var_pop", "var_samp", "width_bucket"]; // these functions can

  const POSSIBLE_WITHOUT_PARENS = ["current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_schema", "current_transform_group_for_type", "current_user", "session_user", "system_time", "system_user", "current_time", "localtime", "current_timestamp", "localtimestamp"]; // those exist to boost relevance making these very
  // "SQL like" keyword combos worth +1 extra relevance

  const COMBOS = ["create table", "insert into", "primary key", "foreign key", "not null", "alter table", "add constraint", "grouping sets", "on overflow", "character set", "respect nulls", "ignore nulls", "nulls first", "nulls last", "depth first", "breadth first"];
  const FUNCTIONS = RESERVED_FUNCTIONS;
  const KEYWORDS = [...RESERVED_WORDS, ...NON_RESERVED_WORDS].filter(keyword => {
    return !RESERVED_FUNCTIONS.includes(keyword);
  });
  const VARIABLE = {
    className: "variable",
    begin: /@[a-z0-9]+/
  };
  const OPERATOR = {
    className: "operator",
    begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  };
  const FUNCTION_CALL = {
    begin: concat(/\b/, either(...FUNCTIONS), /\s*\(/),
    keywords: {
      built_in: FUNCTIONS
    }
  }; // keywords with less than 3 letters are reduced in relevancy

  function reduceRelevancy(list, {
    exceptions,
    when
  } = {}) {
    const qualifyFn = when;
    exceptions = exceptions || [];
    return list.map(item => {
      if (item.match(/\|\d+$/) || exceptions.includes(item)) {
        return item;
      } else if (qualifyFn(item)) {
        return `${item}|0`;
      } else {
        return item;
      }
    });
  }

  return {
    name: 'SQL',
    case_insensitive: true,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: reduceRelevancy(KEYWORDS, {
        when: x => x.length < 3
      }),
      literal: LITERALS,
      type: TYPES,
      built_in: POSSIBLE_WITHOUT_PARENS
    },
    contains: [{
      begin: either(...COMBOS),
      keywords: {
        $pattern: /[\w\.]+/,
        keyword: KEYWORDS.concat(COMBOS),
        literal: LITERALS,
        type: TYPES
      }
    }, {
      className: "type",
      begin: either(...MULTI_WORD_TYPES)
    }, FUNCTION_CALL, VARIABLE, STRING, QUOTED_IDENTIFIER, hljs.C_NUMBER_MODE, hljs.C_BLOCK_COMMENT_MODE, COMMENT_MODE, OPERATOR]
  };
}

var sql_1 = sql;
var sql$1 = sql_1;

var SyntaxHighlighter = highlight$2(core, {});
SyntaxHighlighter.registerLanguage = core.registerLanguage;
var SyntaxHighlighter$1 = SyntaxHighlighter;

function _wrapRegExp() {
  _wrapRegExp = function (re, groups) {
    return new BabelRegExp(re, void 0, groups);
  };

  var _super = RegExp.prototype,
      _groups = new WeakMap();

  function BabelRegExp(re, flags, groups) {
    var _this = new RegExp(re, flags);

    return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype);
  }

  function buildGroups(result, re) {
    var g = _groups.get(re);

    return Object.keys(g).reduce(function (groups, name) {
      return groups[name] = result[g[name]], groups;
    }, Object.create(null));
  }

  return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);

    return result && (result.groups = buildGroups(result, this)), result;
  }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if ("string" == typeof substitution) {
      var groups = _groups.get(this);

      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
        return "$" + groups[name];
      }));
    }

    if ("function" == typeof substitution) {
      var _this = this;

      return _super[Symbol.replace].call(this, str, function () {
        var args = arguments;
        return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
      });
    }

    return _super[Symbol.replace].call(this, str, substitution);
  }, _wrapRegExp.apply(this, arguments);
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const _excluded$5 = ["children", "className"];
function RoundedButton(_ref) {
  let {
    children,
    className = ''
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$5);

  return React__default.createElement("button", _extends({
    type: props.type || 'button',
    className: `w-6 h-6 rounded-full flex items-center justify-center
            text-xs ~bg-white text-indigo-500 hover:~text-indigo-600 
            transform transition-animation shadow-md hover:shadow-lg
            active:shadow-sm active:translate-y-px"
                ${className}
            `
  }, props), children);
}

function FrameCodeSnippetLine({
  highlight,
  row,
  frame,
  lineNumber
}) {
  const editorUrl = useEditorUrl({
    file: frame.file,
    lineNumber
  });
  return React__default.createElement("span", {
    className: `
                flex group leading-loose hover:~bg-red-500/10
                ${highlight ? ' ~bg-red-500/20' : ''}
            `
  }, editorUrl && React__default.createElement("span", {
    className: "z-30 opacity-0 group-hover:opacity-100 sticky left-10 w-0 h-full"
  }, React__default.createElement("a", {
    href: editorUrl,
    className: "-ml-3 block"
  }, React__default.createElement(RoundedButton, null, React__default.createElement(FontAwesomeIcon, {
    className: "text-xs",
    icon: faPencilAlt
  })))), React__default.createElement("span", {
    className: "pl-6"
  }, createElement({
    node: row,
    useInlineStyles: false,
    key: `code-segement-${lineNumber}`
  })));
}

// Based on https://github.com/highlightjs/highlight.js/blob/main/src/languages/php-template.js
function blade(hljs) {
  return {
    name: 'Blade',
    case_insensitive: true,
    subLanguage: 'php-template',
    contains: [hljs.COMMENT(/\{\{--/, /--\}\}/), // {{ $likeThis }}
    {
      className: 'template-variable',
      begin: /\{\{/,
      starts: {
        end: /\}\}/,
        returnEnd: true,
        subLanguage: 'php'
      }
    }, {
      className: 'template-variable',
      begin: /\}\}/
    }, // {{{ $likeThis }}}
    {
      className: 'template-variable',
      begin: /\{\{\{/,
      starts: {
        end: /\}\}\}/,
        returnEnd: true,
        subLanguage: 'php'
      }
    }, {
      className: 'template-variable',
      begin: /\}\}\}/
    }, // {!! $hello !!}
    {
      className: 'template-variable',
      begin: /\{!!/,
      starts: {
        end: /!!\}/,
        returnEnd: true,
        subLanguage: 'php'
      }
    }, {
      className: 'template-variable',
      begin: /!!\}/
    }, // @php($a = 2)
    {
      className: 'template-tag',
      begin: /@php\(/,
      starts: {
        end: /\)/,
        returnEnd: true,
        subLanguage: 'php'
      },
      relevance: 15
    }, // @php $a = 1 @endphp
    {
      className: 'template-tag',
      begin: /@php/,
      starts: {
        end: /@endphp/,
        returnEnd: true,
        subLanguage: 'php'
      },
      relevance: 10
    }, // :blade-value="$phpVar"
    {
      className: 'attr',
      begin: /:[\w-]+="/,
      starts: {
        end: /"(?=\s|\n|\/)/,
        returnEnd: true,
        subLanguage: 'php'
      }
    }, // @something
    {
      begin: /@\w+/,
      end: /\W/,
      excludeEnd: true,
      className: 'template-tag'
    }]
  };
}

// export of the SyntaxHighlighter. Including all sub-languages used in e.g. Blade:

SyntaxHighlighter$1.registerLanguage('php', php$1);
SyntaxHighlighter$1.registerLanguage('php-template', phpTemplate$1);
SyntaxHighlighter$1.registerLanguage('blade', blade);
SyntaxHighlighter$1.registerLanguage('xml', xml$1);
SyntaxHighlighter$1.registerLanguage('css', css$1);
SyntaxHighlighter$1.registerLanguage('javascript', javascript$1);
SyntaxHighlighter$1.registerLanguage('handlebars', handlebars$1);

function getLanguage(filename) {
  if (filename.endsWith('.blade.php')) {
    return 'blade';
  }

  if (filename.match(/^resources\/views\//)) {
    return 'php-template';
  }

  return 'php';
}

function FrameCodeSnippet({
  frame
}) {
  const code = Object.values(frame.code_snippet).join('\n');
  const lineNumbers = Object.keys(frame.code_snippet).map(n => Number(n));
  const highlightedIndex = lineNumbers.indexOf(frame.line_number);
  const codeRenderer = useMemo(() => ({
    rows
  }) => {
    return rows.map((row, index) => React__default.createElement(FrameCodeSnippetLine, {
      key: lineNumbers[index],
      frame: frame,
      highlight: index === highlightedIndex,
      row: row,
      lineNumber: lineNumbers[index]
    }));
  }, [frame]);
  return React__default.createElement("main", {
    className: "flex items-stretch flex-grow overflow-x-auto overflow-y-hidden scrollbar-hidden-x mask-fade-r text-sm"
  }, React__default.createElement("nav", {
    className: "sticky left-0 flex flex-none z-20 ~bg-white"
  }, React__default.createElement("div", {
    className: "select-none text-right"
  }, lineNumbers.map(number => React__default.createElement("p", {
    key: number,
    className: `
                                px-2 font-mono leading-loose select-none
                                ${Number(number) === frame.line_number ? ' text-opacity-75 ~text-red-700 ~bg-red-500/30' : ''}
                            `
  }, React__default.createElement("span", {
    className: "~text-gray-500"
  }, number))))), React__default.createElement("div", {
    className: "flex-grow pr-10"
  }, React__default.createElement(SyntaxHighlighter$1, {
    language: getLanguage(frame.relative_file),
    renderer: codeRenderer,
    customStyle: {
      background: 'transparent'
    }
  }, code)));
}

function useKeyboardShortcut(key, callback) {
  useEffect(() => {
    function handleKeyPressed(e) {
      if (document.activeElement) {
        if (document.activeElement.tagName === 'INPUT') {
          return;
        }
      }

      if (e.key === key) {
        callback(e);
      }
    }

    window.addEventListener('keyup', handleKeyPressed);
    return () => {
      window.removeEventListener('keyup', handleKeyPressed);
    };
  }, [key, callback]);
}

function addFrameNumbers(frames) {
  return frames.map((frame, i) => _extends({}, frame, {
    frame_number: frames.length - i
  }));
}
function getFrameType(frame) {
  if (frame.relative_file.startsWith('vendor/')) {
    return 'vendor';
  }

  if (frame.relative_file === 'unknown') {
    return 'unknown';
  }

  return 'application';
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }

  return -1;
}

var _baseFindIndex = baseFindIndex;

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

var _baseIsNaN = baseIsNaN;

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }

  return -1;
}

var _strictIndexOf = strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function baseIndexOf(array, value, fromIndex) {
  return value === value ? _strictIndexOf(array, value, fromIndex) : _baseFindIndex(array, _baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf;

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */

function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && _baseIndexOf(array, value, 0) > -1;
}

var _arrayIncludes = arrayIncludes;

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }

  return false;
}

var _arrayIncludesWith = arrayIncludesWith;

/** Used as references for various `Number` constants. */

var INFINITY$1 = 1 / 0;
/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */

var createSet = !(_Set && 1 / _setToArray(new _Set([, -0]))[1] == INFINITY$1) ? noop_1 : function (values) {
  return new _Set(values);
};
var _createSet = createSet;

/** Used as the size to enable large array optimizations. */

var LARGE_ARRAY_SIZE = 200;
/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */

function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = _arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = _arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : _createSet(array);

    if (set) {
      return _setToArray(set);
    }

    isCommon = false;
    includes = _cacheHas;
    seen = new _SetCache();
  } else {
    seen = iteratee ? [] : result;
  }

  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;
    value = comparator || value !== 0 ? value : 0;

    if (isCommon && computed === computed) {
      var seenIndex = seen.length;

      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }

      if (iteratee) {
        seen.push(computed);
      }

      result.push(value);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }

      result.push(value);
    }
  }

  return result;
}

var _baseUniq = baseUniq;

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */

function uniq(array) {
  return array && array.length ? _baseUniq(array) : [];
}

var uniq_1 = uniq;

function stackReducer(state, action) {
  switch (action.type) {
    case 'EXPAND_FRAMES':
      {
        const expanded = uniq_1([...state.expanded, ...action.frames]);
        return _extends({}, state, {
          expanded
        });
      }

    case 'EXPAND_ALL_VENDOR_FRAMES':
      {
        const knownFrameNumbers = addFrameNumbers(state.frames).filter(frame => frame.relative_file !== 'unknown').map(frame => frame.frame_number);
        return _extends({}, state, {
          expanded: knownFrameNumbers
        });
      }

    case 'COLLAPSE_ALL_VENDOR_FRAMES':
      {
        const applicationFrameNumbers = addFrameNumbers(state.frames).filter(frame => !frame.relative_file.startsWith('vendor/') && frame.relative_file !== 'unknown').map(frame => frame.frame_number);
        const expanded = uniq_1([...applicationFrameNumbers]);
        return _extends({}, state, {
          expanded
        });
      }

    case 'SELECT_FRAME':
      {
        const selectableFrameNumbers = addFrameNumbers(state.frames).filter(frame => frame.relative_file !== 'unknown').map(frame => frame.frame_number);
        const selected = selectableFrameNumbers.includes(action.frame) ? action.frame : state.selected;
        const expanded = uniq_1([...state.expanded, selected]);
        return _extends({}, state, {
          expanded,
          selected
        });
      }

    case 'SELECT_NEXT_FRAME':
      {
        const selectableFrameNumbers = addFrameNumbers(state.frames).filter(frame => frame.relative_file !== 'unknown').map(frame => frame.frame_number);
        const selectedIndex = selectableFrameNumbers.indexOf(state.selected);
        const selected = selectedIndex === selectableFrameNumbers.length - 1 ? selectableFrameNumbers[0] : selectableFrameNumbers[selectedIndex + 1];
        const expanded = uniq_1([...state.expanded, selected]);
        return _extends({}, state, {
          expanded,
          selected
        });
      }

    case 'SELECT_PREVIOUS_FRAME':
      {
        const selectableFrameNumbers = addFrameNumbers(state.frames).filter(frame => frame.relative_file !== 'unknown').map(frame => frame.frame_number);
        const selectedIndex = selectableFrameNumbers.indexOf(state.selected);
        const selected = selectedIndex === 0 ? selectableFrameNumbers[selectableFrameNumbers.length - 1] : selectableFrameNumbers[selectedIndex - 1];
        const expanded = uniq_1([...state.expanded, selected]);
        return _extends({}, state, {
          expanded,
          selected
        });
      }

    default:
      {
        return state;
      }
  }
}

function allVendorFramesAreExpanded(state) {
  return addFrameNumbers(state.frames).filter(frame => getFrameType(frame) === 'vendor').every(frame => state.expanded.includes(frame.frame_number));
}

const dummyFrameGroup = {
  type: 'application',
  relative_file: '',
  expanded: true,
  frames: []
};
function getFrameGroups({
  frames,
  selected,
  expanded
}) {
  return frames.reduce((frameGroups, current, i) => {
    const context = {
      current,
      previous: frameGroups[frameGroups.length - 1] || dummyFrameGroup,
      isFirstFrame: i === 0,
      frameNumber: frames.length - i,
      expanded,
      selected
    };

    if (context.expanded.includes(context.frameNumber)) {
      return frameGroups.concat(parseExpandedFrame(context));
    }

    return frameGroups.concat(parseCollapsedFrame(context));
  }, []);
}

function parseExpandedFrame(context) {
  if (context.current.relative_file !== context.previous.relative_file) {
    return [{
      type: getFrameType(context.current),
      relative_file: context.current.relative_file,
      expanded: true,
      frames: [_extends({}, context.current, {
        frame_number: context.frameNumber,
        selected: context.selected === context.frameNumber
      })]
    }];
  }

  context.previous.frames.push(_extends({}, context.current, {
    frame_number: context.frameNumber,
    selected: context.selected === context.frameNumber
  }));
  return [];
}

function parseCollapsedFrame(context) {
  const type = getFrameType(context.current);

  if (!context.previous.expanded && type === context.previous.type) {
    // Mutate the previous result. It's not pretty, makes the general flow of the program less
    // complex because we kan keep the result list append-only.
    context.previous.frames.push(_extends({}, context.current, {
      selected: false,
      frame_number: context.frameNumber
    }));
    return [];
  }

  return [{
    type,
    relative_file: context.current.relative_file,
    expanded: false,
    frames: [_extends({}, context.current, {
      frame_number: context.frameNumber,
      selected: context.selected === context.frameNumber
    })]
  }];
}

function getSelectedFrame(state) {
  const frames = addFrameNumbers(state.frames);
  const selectedFrame = frames.find(frame => frame.frame_number === state.selected); // Fallback to first frame, just in case

  return selectedFrame || frames[0] || null;
}

function RelaxedFullyQualifiedClassName({
  path,
  lineNumber = null
}) {
  const parts = path.split('\\');
  const tightSpace = String.fromCharCode(8201);
  return React__default.createElement("span", {
    className: "inline-flex flex-wrap items-baseline"
  }, parts.map((part, index) => React__default.createElement(React__default.Fragment, {
    key: index
  }, React__default.createElement("span", {
    key: index
  }, part), index !== parts.length - 1 && React__default.createElement("span", null, tightSpace, "\\", tightSpace))), lineNumber && React__default.createElement(React__default.Fragment, null, tightSpace, React__default.createElement("span", {
    className: "whitespace-nowrap"
  }, ":", tightSpace, React__default.createElement("span", {
    className: "font-mono text-xs"
  }, lineNumber))));
}

function RelaxedFilePath({
  path: fullPath,
  lineNumber = null
}) {
  var _parts$pop;

  const {
    application_path
  } = useContext(ErrorOccurrenceContext);
  const path = fullPath.replace(application_path + '/', '').replace(/\/Users\/.*?\//, '~/');
  const parts = path.split('/');
  const fileParts = ((_parts$pop = parts.pop()) == null ? void 0 : _parts$pop.split('.')) || [];
  const extension = fileParts.pop();
  const fileName = fileParts.join('.');
  const tightSpace = String.fromCharCode(8201);
  return React__default.createElement("span", {
    className: "inline-flex flex-wrap items-baseline"
  }, parts.map((part, index) => React__default.createElement(React__default.Fragment, {
    key: index
  }, React__default.createElement("span", {
    key: index
  }, part), React__default.createElement("span", null, tightSpace, "/", tightSpace))), React__default.createElement("span", {
    className: "font-semibold"
  }, fileName), React__default.createElement("span", null, ".", extension), lineNumber && React__default.createElement(React__default.Fragment, null, tightSpace, React__default.createElement("span", {
    className: "whitespace-nowrap"
  }, ":", tightSpace, React__default.createElement("span", {
    className: "font-mono text-xs"
  }, lineNumber))));
}

function FrameGroup({
  frameGroup,
  onExpand,
  onSelect
}) {
  if (frameGroup.type === 'vendor' && !frameGroup.expanded) {
    return React__default.createElement("li", {
      className: "group cursor-pointer px-6 sm:px-10 py-4 flex gap-2 lg:justify-start border-b ~border-gray-200 hover:~bg-gray-500/5 items-center",
      onClick: onExpand
    }, frameGroup.frames.length > 1 ? `${frameGroup.frames.length} vendor frames` : '1 vendor frame', React__default.createElement(FontAwesomeIcon, {
      icon: faAngleDown,
      className: "~text-gray-500 group-hover:text-indigo-500"
    }));
  }

  return React__default.createElement(React__default.Fragment, null, frameGroup.frames.map((frame, index) => React__default.createElement(React__default.Fragment, {
    key: index
  }, React__default.createElement("li", {
    key: frame.frame_number,
    className: `px-6 sm:px-10 py-4
                            ${frame.selected ? 'bg-red-500 text-white' : 'cursor-pointer border-b ~border-gray-200 hover:~bg-red-500/10'}
                        `,
    onClick: () => onSelect(frame.frame_number)
  }, React__default.createElement("div", {
    className: "flex items-baseline"
  }, frame.class ? React__default.createElement(RelaxedFullyQualifiedClassName, {
    path: frame.class,
    lineNumber: frame.line_number
  }) : React__default.createElement(RelaxedFilePath, {
    path: frame.file,
    lineNumber: frame.line_number
  })), React__default.createElement("div", {
    className: "font-semibold"
  }, frame.method)), frame.selected && React__default.createElement("li", {
    className: "z-10 mt-[-4px] sticky top-0 bg-red-500 h-[4px]"
  }))));
}

function EditorLink({
  path,
  lineNumber,
  className
}) {
  const editorUrl = useEditorUrl({
    file: path,
    lineNumber
  });
  return React__default.createElement("a", {
    href: editorUrl || '#',
    className: `hover:underline ${className}`
  }, React__default.createElement(RelaxedFilePath, {
    path: path,
    lineNumber: lineNumber
  }));
}

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;
/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */

function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}

  return index;
}

var _trimmedEndIndex = trimmedEndIndex;

/** Used to match leading whitespace. */

var reTrimStart = /^\s+/;
/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */

function baseTrim(string) {
  return string ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
}

var _baseTrim = baseTrim;

/** Used as references for various `Number` constants. */

var NAN = 0 / 0;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol_1(value)) {
    return NAN;
  }

  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = _baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var toNumber_1 = toNumber;

/** Used as references for various `Number` constants. */

var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */

function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }

  value = toNumber_1(value);

  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }

  return value === value ? value : 0;
}

var toFinite_1 = toFinite;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */

function toInteger(value) {
  var result = toFinite_1(value),
      remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}

var toInteger_1 = toInteger;

/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max;
/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */

function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return -1;
  }

  var index = fromIndex == null ? 0 : toInteger_1(fromIndex);

  if (index < 0) {
    index = nativeMax(length + index, 0);
  }

  return _baseFindIndex(array, _baseIteratee(predicate), index);
}

var findIndex_1 = findIndex;

const _excluded$4 = ["children", "className"];
function SmallButton(_ref) {
  let {
    children,
    className = ''
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$4);

  return React__default.createElement("button", _extends({
    type: props.type || 'button',
    className: `group inline-flex gap-2 items-center h-6 px-2 rounded-sm ~bg-white shadow text-xs font-medium whitespace-nowrap
            transform
            transition-animation
            hover:shadow-md
            active:shadow-inner
            active:translate-y-px
                ${className}
            `
  }, props), children);
}

function StackTrace({
  openFrameIndex
}) {
  const {
    frames
  } = useContext(ErrorOccurrenceContext);
  const initialState = useMemo(() => {
    let selectedFrame = 1;
    const firstAppFrameIndex = findIndex_1(frames, frame => getFrameType(frame) === 'application');

    if (firstAppFrameIndex !== -1) {
      selectedFrame = frames.length - firstAppFrameIndex;
    }

    if (openFrameIndex) {
      selectedFrame = frames.length - openFrameIndex;
    }

    return stackReducer({
      frames,
      expanded: [],
      selected: selectedFrame
    }, {
      type: 'COLLAPSE_ALL_VENDOR_FRAMES'
    });
  }, [frames]);
  const [state, dispatch] = useReducer(stackReducer, initialState);
  const vendorFramesExpanded = useMemo(() => allVendorFramesAreExpanded(state), [state]);
  const frameGroups = useMemo(() => getFrameGroups(state), [state]);
  const selectedFrame = useMemo(() => getSelectedFrame(state), [state]);
  useKeyboardShortcut('j', () => {
    dispatch({
      type: 'SELECT_NEXT_FRAME'
    });
  });
  useKeyboardShortcut('k', () => {
    dispatch({
      type: 'SELECT_PREVIOUS_FRAME'
    });
  });
  return React__default.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-[33.33%,66.66%] lg:grid-rows-[57rem] items-stretch bg-white dark:shadow-none dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 overflow-hidden"
  }, React__default.createElement("aside", {
    className: "z-30 flex flex-col border-r ~border-gray-200"
  }, React__default.createElement("div", {
    className: "max-h-[33vh] lg:max-h-[none] lg:absolute inset-0 flex flex-col overflow-hidden ~bg-white"
  }, React__default.createElement("header", {
    className: "flex-none px-6 sm:px-10 h-16 flex items-center justify-start ~bg-white border-b ~border-gray-200"
  }, React__default.createElement(SmallButton, {
    onClick: () => dispatch({
      type: vendorFramesExpanded ? 'COLLAPSE_ALL_VENDOR_FRAMES' : 'EXPAND_ALL_VENDOR_FRAMES'
    })
  }, React__default.createElement("div", {
    className: `flex ${vendorFramesExpanded ? 'flex-col-reverse' : 'flex-col'}`
  }, React__default.createElement(FontAwesomeIcon, {
    icon: faAngleUp,
    className: "-my-px text-[8px] ~text-gray-500 group-hover:text-indigo-500"
  }), React__default.createElement(FontAwesomeIcon, {
    icon: faAngleDown,
    className: "-my-px text-[8px] ~text-gray-500 group-hover:text-indigo-500"
  })), vendorFramesExpanded ? 'Collapse vendor frames' : ' Expand vendor frames')), React__default.createElement("div", {
    id: "frames",
    className: "flex-grow overflow-auto scrollbar-hidden-y mask-fade-frames"
  }, React__default.createElement("ol", {
    className: "text-sm pb-16"
  }, frameGroups.map((frameGroup, i) => React__default.createElement(FrameGroup, {
    key: i,
    frameGroup: frameGroup,
    onExpand: () => dispatch({
      type: 'EXPAND_FRAMES',
      frames: frameGroup.frames.map(frame => frame.frame_number)
    }),
    onSelect: frameNumber => {
      dispatch({
        type: 'SELECT_FRAME',
        frame: frameNumber
      });
    }
  })))))), React__default.createElement("section", {
    className: "flex flex-col border-t lg:border-t-0 ~border-gray-200"
  }, selectedFrame && React__default.createElement(React__default.Fragment, null, React__default.createElement("header", {
    className: "~text-gray-500 flex-none z-30 h-16 px-6 sm:px-10 flex items-center justify-end"
  }, React__default.createElement(EditorLink, {
    path: selectedFrame.file,
    lineNumber: selectedFrame.line_number,
    className: "flex items-center text-sm"
  })), React__default.createElement(FrameCodeSnippet, {
    frame: selectedFrame
  }))));
}

function ExceptionMessage({
  message,
  className = ''
}) {
  const [fullException, setFullException] = useState(false);

  function handleClick() {
    var _window$getSelection;

    // Ignore click even when selecting expanded text.
    if (fullException && (_window$getSelection = window.getSelection()) != null && _window$getSelection.toString().length || 0 > 0) {
      return;
    }

    setFullException(!fullException);
  }

  return React__default.createElement("div", {
    className: `
                my-4 font-semibold leading-snug text-xl
                ${className}
            `,
    onClick: handleClick
  }, React__default.createElement("div", {
    className: fullException ? 'line-clamp-none' : 'line-clamp-2'
  }, message));
}

var tokenTypes = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  /**
   * Constants for token types
   */

  var _default = {
    WORD: 'word',
    STRING: 'string',
    RESERVED: 'reserved',
    RESERVED_TOP_LEVEL: 'reserved-top-level',
    RESERVED_TOP_LEVEL_NO_INDENT: 'reserved-top-level-no-indent',
    RESERVED_NEWLINE: 'reserved-newline',
    OPERATOR: 'operator',
    OPEN_PAREN: 'open-paren',
    CLOSE_PAREN: 'close-paren',
    LINE_COMMENT: 'line-comment',
    BLOCK_COMMENT: 'block-comment',
    NUMBER: 'number',
    PLACEHOLDER: 'placeholder'
  };
  exports["default"] = _default;
  module.exports = exports.default;
});

var utils = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sortByLengthDesc = exports.escapeRegExp = exports.isEmpty = exports.last = exports.trimSpacesEnd = void 0; // Only removes spaces, not newlines

  var trimSpacesEnd = function trimSpacesEnd(str) {
    return str.replace(/[\t ]+$/, '');
  }; // Last element from array


  exports.trimSpacesEnd = trimSpacesEnd;

  var last = function last(arr) {
    return arr[arr.length - 1];
  }; // True array is empty, or it's not an array at all


  exports.last = last;

  var isEmpty = function isEmpty(arr) {
    return !Array.isArray(arr) || arr.length === 0;
  }; // Escapes regex special chars


  exports.isEmpty = isEmpty;

  var escapeRegExp = function escapeRegExp(string) {
    return string.replace(/[\$\(-\+\.\?\[-\^\{-\}]/g, '\\$&');
  }; // Sorts strings by length, so that longer ones are first
  // Also sorts alphabetically after sorting by length.


  exports.escapeRegExp = escapeRegExp;

  var sortByLengthDesc = function sortByLengthDesc(strings) {
    return strings.sort(function (a, b) {
      return b.length - a.length || a.localeCompare(b);
    });
  };

  exports.sortByLengthDesc = sortByLengthDesc;
});

var Indentation_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var INDENT_TYPE_TOP_LEVEL = 'top-level';
  var INDENT_TYPE_BLOCK_LEVEL = 'block-level';
  /**
   * Manages indentation levels.
   *
   * There are two types of indentation levels:
   *
   * - BLOCK_LEVEL : increased by open-parenthesis
   * - TOP_LEVEL : increased by RESERVED_TOP_LEVEL words
   */

  var Indentation = /*#__PURE__*/function () {
    /**
     * @param {String} indent Indent value, default is "  " (2 spaces)
     */
    function Indentation(indent) {
      _classCallCheck(this, Indentation);

      this.indent = indent || '  ';
      this.indentTypes = [];
    }
    /**
     * Returns current indentation string.
     * @return {String}
     */


    _createClass(Indentation, [{
      key: "getIndent",
      value: function getIndent() {
        return this.indent.repeat(this.indentTypes.length);
      }
      /**
       * Increases indentation by one top-level indent.
       */

    }, {
      key: "increaseTopLevel",
      value: function increaseTopLevel() {
        this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
      }
      /**
       * Increases indentation by one block-level indent.
       */

    }, {
      key: "increaseBlockLevel",
      value: function increaseBlockLevel() {
        this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
      }
      /**
       * Decreases indentation by one top-level indent.
       * Does nothing when the previous indent is not top-level.
       */

    }, {
      key: "decreaseTopLevel",
      value: function decreaseTopLevel() {
        if (this.indentTypes.length > 0 && (0, utils.last)(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
          this.indentTypes.pop();
        }
      }
      /**
       * Decreases indentation by one block-level indent.
       * If there are top-level indents within the block-level indent,
       * throws away these as well.
       */

    }, {
      key: "decreaseBlockLevel",
      value: function decreaseBlockLevel() {
        while (this.indentTypes.length > 0) {
          var type = this.indentTypes.pop();

          if (type !== INDENT_TYPE_TOP_LEVEL) {
            break;
          }
        }
      }
    }, {
      key: "resetIndentation",
      value: function resetIndentation() {
        this.indentTypes = [];
      }
    }]);

    return Indentation;
  }();

  exports["default"] = Indentation;
  module.exports = exports.default;
});

var InlineBlock_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _tokenTypes = _interopRequireDefault(tokenTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var INLINE_MAX_LENGTH = 50;
  /**
   * Bookkeeper for inline blocks.
   *
   * Inline blocks are parenthized expressions that are shorter than INLINE_MAX_LENGTH.
   * These blocks are formatted on a single line, unlike longer parenthized
   * expressions where open-parenthesis causes newline and increase of indentation.
   */

  var InlineBlock = /*#__PURE__*/function () {
    function InlineBlock() {
      _classCallCheck(this, InlineBlock);

      this.level = 0;
    }
    /**
     * Begins inline block when lookahead through upcoming tokens determines
     * that the block would be smaller than INLINE_MAX_LENGTH.
     * @param  {Object[]} tokens Array of all tokens
     * @param  {Number} index Current token position
     */


    _createClass(InlineBlock, [{
      key: "beginIfPossible",
      value: function beginIfPossible(tokens, index) {
        if (this.level === 0 && this.isInlineBlock(tokens, index)) {
          this.level = 1;
        } else if (this.level > 0) {
          this.level++;
        } else {
          this.level = 0;
        }
      }
      /**
       * Finishes current inline block.
       * There might be several nested ones.
       */

    }, {
      key: "end",
      value: function end() {
        this.level--;
      }
      /**
       * True when inside an inline block
       * @return {Boolean}
       */

    }, {
      key: "isActive",
      value: function isActive() {
        return this.level > 0;
      } // Check if this should be an inline parentheses block
      // Examples are "NOW()", "COUNT(*)", "int(10)", key(`somecolumn`), DECIMAL(7,2)

    }, {
      key: "isInlineBlock",
      value: function isInlineBlock(tokens, index) {
        var length = 0;
        var level = 0;

        for (var i = index; i < tokens.length; i++) {
          var token = tokens[i];
          length += token.value.length; // Overran max length

          if (length > INLINE_MAX_LENGTH) {
            return false;
          }

          if (token.type === _tokenTypes["default"].OPEN_PAREN) {
            level++;
          } else if (token.type === _tokenTypes["default"].CLOSE_PAREN) {
            level--;

            if (level === 0) {
              return true;
            }
          }

          if (this.isForbiddenToken(token)) {
            return false;
          }
        }

        return false;
      } // Reserved words that cause newlines, comments and semicolons
      // are not allowed inside inline parentheses block

    }, {
      key: "isForbiddenToken",
      value: function isForbiddenToken(_ref) {
        var type = _ref.type,
            value = _ref.value;
        return type === _tokenTypes["default"].RESERVED_TOP_LEVEL || type === _tokenTypes["default"].RESERVED_NEWLINE || type === _tokenTypes["default"].COMMENT || type === _tokenTypes["default"].BLOCK_COMMENT || value === ';';
      }
    }]);

    return InlineBlock;
  }();

  exports["default"] = InlineBlock;
  module.exports = exports.default;
});

var Params_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  /**
   * Handles placeholder replacement with given params.
   */


  var Params = /*#__PURE__*/function () {
    /**
     * @param {Object} params
     */
    function Params(params) {
      _classCallCheck(this, Params);

      this.params = params;
      this.index = 0;
    }
    /**
     * Returns param value that matches given placeholder with param key.
     * @param {Object} token
     *   @param {String} token.key Placeholder key
     *   @param {String} token.value Placeholder value
     * @return {String} param or token.value when params are missing
     */


    _createClass(Params, [{
      key: "get",
      value: function get(_ref) {
        var key = _ref.key,
            value = _ref.value;

        if (!this.params) {
          return value;
        }

        if (key) {
          return this.params[key];
        }

        return this.params[this.index++];
      }
    }]);

    return Params;
  }();

  exports["default"] = Params;
  module.exports = exports.default;
});

var token$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isEnd = exports.isWindow = exports.isBy = exports.isSet = exports.isLimit = exports.isBetween = exports.isAnd = void 0;

  var _tokenTypes = _interopRequireDefault(tokenTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  var isToken = function isToken(type, regex) {
    return function (token) {
      return (token === null || token === void 0 ? void 0 : token.type) === type && regex.test(token === null || token === void 0 ? void 0 : token.value);
    };
  };

  var isAnd = isToken(_tokenTypes["default"].RESERVED_NEWLINE, /^AND$/i);
  exports.isAnd = isAnd;
  var isBetween = isToken(_tokenTypes["default"].RESERVED, /^BETWEEN$/i);
  exports.isBetween = isBetween;
  var isLimit = isToken(_tokenTypes["default"].RESERVED_TOP_LEVEL, /^LIMIT$/i);
  exports.isLimit = isLimit;
  var isSet = isToken(_tokenTypes["default"].RESERVED_TOP_LEVEL, /^[S\u017F]ET$/i);
  exports.isSet = isSet;
  var isBy = isToken(_tokenTypes["default"].RESERVED, /^BY$/i);
  exports.isBy = isBy;
  var isWindow = isToken(_tokenTypes["default"].RESERVED_TOP_LEVEL, /^WINDOW$/i);
  exports.isWindow = isWindow;
  var isEnd = isToken(_tokenTypes["default"].CLOSE_PAREN, /^END$/i);
  exports.isEnd = isEnd;
});

var Formatter_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _tokenTypes = _interopRequireDefault(tokenTypes);

  var _Indentation = _interopRequireDefault(Indentation_1);

  var _InlineBlock = _interopRequireDefault(InlineBlock_1);

  var _Params = _interopRequireDefault(Params_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Formatter = /*#__PURE__*/function () {
    /**
     * @param {Object} cfg
     *  @param {String} cfg.language
     *  @param {String} cfg.indent
     *  @param {Boolean} cfg.uppercase
     *  @param {Integer} cfg.linesBetweenQueries
     *  @param {Object} cfg.params
     */
    function Formatter(cfg) {
      _classCallCheck(this, Formatter);

      this.cfg = cfg;
      this.indentation = new _Indentation["default"](this.cfg.indent);
      this.inlineBlock = new _InlineBlock["default"]();
      this.params = new _Params["default"](this.cfg.params);
      this.previousReservedToken = {};
      this.tokens = [];
      this.index = 0;
    }
    /**
     * SQL Tokenizer for this formatter, provided by subclasses.
     */


    _createClass(Formatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        throw new Error('tokenizer() not implemented by subclass');
      }
      /**
       * Reprocess and modify a token based on parsed context.
       *
       * @param {Object} token The token to modify
       *  @param {String} token.type
       *  @param {String} token.value
       * @return {Object} new token or the original
       *  @return {String} token.type
       *  @return {String} token.value
       */

    }, {
      key: "tokenOverride",
      value: function tokenOverride(token) {
        // subclasses can override this to modify tokens during formatting
        return token;
      }
      /**
       * Formats whitespace in a SQL string to make it easier to read.
       *
       * @param {String} query The SQL query string
       * @return {String} formatted query
       */

    }, {
      key: "format",
      value: function format(query) {
        this.tokens = this.tokenizer().tokenize(query);
        var formattedQuery = this.getFormattedQueryFromTokens();
        return formattedQuery.trim();
      }
    }, {
      key: "getFormattedQueryFromTokens",
      value: function getFormattedQueryFromTokens() {
        var _this = this;

        var formattedQuery = '';
        this.tokens.forEach(function (token, index) {
          _this.index = index;
          token = _this.tokenOverride(token);

          if (token.type === _tokenTypes["default"].LINE_COMMENT) {
            formattedQuery = _this.formatLineComment(token, formattedQuery);
          } else if (token.type === _tokenTypes["default"].BLOCK_COMMENT) {
            formattedQuery = _this.formatBlockComment(token, formattedQuery);
          } else if (token.type === _tokenTypes["default"].RESERVED_TOP_LEVEL) {
            formattedQuery = _this.formatTopLevelReservedWord(token, formattedQuery);
            _this.previousReservedToken = token;
          } else if (token.type === _tokenTypes["default"].RESERVED_TOP_LEVEL_NO_INDENT) {
            formattedQuery = _this.formatTopLevelReservedWordNoIndent(token, formattedQuery);
            _this.previousReservedToken = token;
          } else if (token.type === _tokenTypes["default"].RESERVED_NEWLINE) {
            formattedQuery = _this.formatNewlineReservedWord(token, formattedQuery);
            _this.previousReservedToken = token;
          } else if (token.type === _tokenTypes["default"].RESERVED) {
            formattedQuery = _this.formatWithSpaces(token, formattedQuery);
            _this.previousReservedToken = token;
          } else if (token.type === _tokenTypes["default"].OPEN_PAREN) {
            formattedQuery = _this.formatOpeningParentheses(token, formattedQuery);
          } else if (token.type === _tokenTypes["default"].CLOSE_PAREN) {
            formattedQuery = _this.formatClosingParentheses(token, formattedQuery);
          } else if (token.type === _tokenTypes["default"].PLACEHOLDER) {
            formattedQuery = _this.formatPlaceholder(token, formattedQuery);
          } else if (token.value === ',') {
            formattedQuery = _this.formatComma(token, formattedQuery);
          } else if (token.value === ':') {
            formattedQuery = _this.formatWithSpaceAfter(token, formattedQuery);
          } else if (token.value === '.') {
            formattedQuery = _this.formatWithoutSpaces(token, formattedQuery);
          } else if (token.value === ';') {
            formattedQuery = _this.formatQuerySeparator(token, formattedQuery);
          } else {
            formattedQuery = _this.formatWithSpaces(token, formattedQuery);
          }
        });
        return formattedQuery;
      }
    }, {
      key: "formatLineComment",
      value: function formatLineComment(token, query) {
        return this.addNewline(query + this.show(token));
      }
    }, {
      key: "formatBlockComment",
      value: function formatBlockComment(token, query) {
        return this.addNewline(this.addNewline(query) + this.indentComment(token.value));
      }
    }, {
      key: "indentComment",
      value: function indentComment(comment) {
        return comment.replace(/\n[\t ]*/g, '\n' + this.indentation.getIndent() + ' ');
      }
    }, {
      key: "formatTopLevelReservedWordNoIndent",
      value: function formatTopLevelReservedWordNoIndent(token, query) {
        this.indentation.decreaseTopLevel();
        query = this.addNewline(query) + this.equalizeWhitespace(this.show(token));
        return this.addNewline(query);
      }
    }, {
      key: "formatTopLevelReservedWord",
      value: function formatTopLevelReservedWord(token, query) {
        this.indentation.decreaseTopLevel();
        query = this.addNewline(query);
        this.indentation.increaseTopLevel();
        query += this.equalizeWhitespace(this.show(token));
        return this.addNewline(query);
      }
    }, {
      key: "formatNewlineReservedWord",
      value: function formatNewlineReservedWord(token, query) {
        if ((0, token$1.isAnd)(token) && (0, token$1.isBetween)(this.tokenLookBehind(2))) {
          return this.formatWithSpaces(token, query);
        }

        return this.addNewline(query) + this.equalizeWhitespace(this.show(token)) + ' ';
      } // Replace any sequence of whitespace characters with single space

    }, {
      key: "equalizeWhitespace",
      value: function equalizeWhitespace(string) {
        return string.replace(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g, ' ');
      } // Opening parentheses increase the block indent level and start a new line

    }, {
      key: "formatOpeningParentheses",
      value: function formatOpeningParentheses(token, query) {
        var _preserveWhitespaceFo, _this$tokenLookBehind; // Take out the preceding space unless there was whitespace there in the original query
        // or another opening parens or line comment


        var preserveWhitespaceFor = (_preserveWhitespaceFo = {}, _defineProperty(_preserveWhitespaceFo, _tokenTypes["default"].OPEN_PAREN, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes["default"].LINE_COMMENT, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes["default"].OPERATOR, true), _preserveWhitespaceFo);

        if (token.whitespaceBefore.length === 0 && !preserveWhitespaceFor[(_this$tokenLookBehind = this.tokenLookBehind()) === null || _this$tokenLookBehind === void 0 ? void 0 : _this$tokenLookBehind.type]) {
          query = (0, utils.trimSpacesEnd)(query);
        }

        query += this.show(token);
        this.inlineBlock.beginIfPossible(this.tokens, this.index);

        if (!this.inlineBlock.isActive()) {
          this.indentation.increaseBlockLevel();
          query = this.addNewline(query);
        }

        return query;
      } // Closing parentheses decrease the block indent level

    }, {
      key: "formatClosingParentheses",
      value: function formatClosingParentheses(token, query) {
        if (this.inlineBlock.isActive()) {
          this.inlineBlock.end();
          return this.formatWithSpaceAfter(token, query);
        } else {
          this.indentation.decreaseBlockLevel();
          return this.formatWithSpaces(token, this.addNewline(query));
        }
      }
    }, {
      key: "formatPlaceholder",
      value: function formatPlaceholder(token, query) {
        return query + this.params.get(token) + ' ';
      } // Commas start a new line (unless within inline parentheses or SQL "LIMIT" clause)

    }, {
      key: "formatComma",
      value: function formatComma(token, query) {
        query = (0, utils.trimSpacesEnd)(query) + this.show(token) + ' ';

        if (this.inlineBlock.isActive()) {
          return query;
        } else if ((0, token$1.isLimit)(this.previousReservedToken)) {
          return query;
        } else {
          return this.addNewline(query);
        }
      }
    }, {
      key: "formatWithSpaceAfter",
      value: function formatWithSpaceAfter(token, query) {
        return (0, utils.trimSpacesEnd)(query) + this.show(token) + ' ';
      }
    }, {
      key: "formatWithoutSpaces",
      value: function formatWithoutSpaces(token, query) {
        return (0, utils.trimSpacesEnd)(query) + this.show(token);
      }
    }, {
      key: "formatWithSpaces",
      value: function formatWithSpaces(token, query) {
        return query + this.show(token) + ' ';
      }
    }, {
      key: "formatQuerySeparator",
      value: function formatQuerySeparator(token, query) {
        this.indentation.resetIndentation();
        return (0, utils.trimSpacesEnd)(query) + this.show(token) + '\n'.repeat(this.cfg.linesBetweenQueries || 1);
      } // Converts token to string (uppercasing it if needed)

    }, {
      key: "show",
      value: function show(_ref) {
        var type = _ref.type,
            value = _ref.value;

        if (this.cfg.uppercase && (type === _tokenTypes["default"].RESERVED || type === _tokenTypes["default"].RESERVED_TOP_LEVEL || type === _tokenTypes["default"].RESERVED_TOP_LEVEL_NO_INDENT || type === _tokenTypes["default"].RESERVED_NEWLINE || type === _tokenTypes["default"].OPEN_PAREN || type === _tokenTypes["default"].CLOSE_PAREN)) {
          return value.toUpperCase();
        } else {
          return value;
        }
      }
    }, {
      key: "addNewline",
      value: function addNewline(query) {
        query = (0, utils.trimSpacesEnd)(query);

        if (!query.endsWith('\n')) {
          query += '\n';
        }

        return query + this.indentation.getIndent();
      }
    }, {
      key: "tokenLookBehind",
      value: function tokenLookBehind() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        return this.tokens[this.index - n];
      }
    }, {
      key: "tokenLookAhead",
      value: function tokenLookAhead() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        return this.tokens[this.index + n];
      }
    }]);

    return Formatter;
  }();

  exports["default"] = Formatter;
  module.exports = exports.default;
});

var createOperatorRegex_1 = createOperatorRegex;
var createLineCommentRegex_1 = createLineCommentRegex;
var createReservedWordRegex_1 = createReservedWordRegex;
var createWordRegex_1 = createWordRegex;
var createStringRegex_1 = createStringRegex;
var createStringPattern_1 = createStringPattern;
var createParenRegex_1 = createParenRegex;
var createPlaceholderRegex_1 = createPlaceholderRegex;

function createOperatorRegex(multiLetterOperators) {
  return new RegExp("^(".concat((0, utils.sortByLengthDesc)(multiLetterOperators).map(utils.escapeRegExp).join('|'), "|.)"), 'u');
}

function createLineCommentRegex(lineCommentTypes) {
  return new RegExp("^((?:".concat(lineCommentTypes.map(function (c) {
    return (0, utils.escapeRegExp)(c);
  }).join('|'), ").*?)(?:\r\n|\r|\n|$)"), 'u');
}

function createReservedWordRegex(reservedWords) {
  if (reservedWords.length === 0) {
    return new RegExp("^\b$", 'u');
  }

  var reservedWordsPattern = (0, utils.sortByLengthDesc)(reservedWords).join('|').replace(/ /g, '\\s+');
  return new RegExp("^(".concat(reservedWordsPattern, ")\\b"), 'iu');
}

function createWordRegex() {
  var specialChars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return new RegExp("^([\\p{Alphabetic}\\p{Mark}\\p{Decimal_Number}\\p{Connector_Punctuation}\\p{Join_Control}".concat(specialChars.join(''), "]+)"), 'u');
}

function createStringRegex(stringTypes) {
  return new RegExp('^(' + createStringPattern(stringTypes) + ')', 'u');
} // This enables the following string patterns:
// 1. backtick quoted string using `` to escape
// 2. square bracket quoted string (SQL Server) using ]] to escape
// 3. double quoted string using "" or \" to escape
// 4. single quoted string using '' or \' to escape
// 5. national character quoted string using N'' or N\' to escape
// 6. Unicode single-quoted string using \' to escape
// 7. Unicode double-quoted string using \" to escape
// 8. PostgreSQL dollar-quoted strings


function createStringPattern(stringTypes) {
  var patterns = {
    '``': '((`[^`]*($|`))+)',
    '{}': '((\\{[^\\}]*($|\\}))+)',
    '[]': '((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)',
    '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
    "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
    "N''": "((N'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
    "U&''": "((U&'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
    'U&""': '((U&"[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
    $$: '((?<tag>\\$\\w*\\$)[\\s\\S]*?(?:\\k<tag>|$))'
  };
  return stringTypes.map(function (t) {
    return patterns[t];
  }).join('|');
}

function createParenRegex(parens) {
  return new RegExp('^(' + parens.map(escapeParen).join('|') + ')', 'iu');
}

function escapeParen(paren) {
  if (paren.length === 1) {
    // A single punctuation character
    return (0, utils.escapeRegExp)(paren);
  } else {
    // longer word
    return '\\b' + paren + '\\b';
  }
}

function createPlaceholderRegex(types, pattern) {
  if ((0, utils.isEmpty)(types)) {
    return false;
  }

  var typesRegex = types.map(utils.escapeRegExp).join('|');
  return new RegExp("^((?:".concat(typesRegex, ")(?:").concat(pattern, "))"), 'u');
}

var regexFactory = /*#__PURE__*/Object.defineProperty({
  createOperatorRegex: createOperatorRegex_1,
  createLineCommentRegex: createLineCommentRegex_1,
  createReservedWordRegex: createReservedWordRegex_1,
  createWordRegex: createWordRegex_1,
  createStringRegex: createStringRegex_1,
  createStringPattern: createStringPattern_1,
  createParenRegex: createParenRegex_1,
  createPlaceholderRegex: createPlaceholderRegex_1
}, '__esModule', {
  value: true
});

var Tokenizer_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _tokenTypes = _interopRequireDefault(tokenTypes);

  var regexFactory$1 = _interopRequireWildcard(regexFactory);

  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();

    _getRequireWildcardCache = function _getRequireWildcardCache() {
      return cache;
    };

    return cache;
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return {
        "default": obj
      };
    }

    var cache = _getRequireWildcardCache();

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj["default"] = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Tokenizer = /*#__PURE__*/function () {
    /**
     * @param {Object} cfg
     *  @param {String[]} cfg.reservedWords Reserved words in SQL
     *  @param {String[]} cfg.reservedTopLevelWords Words that are set to new line separately
     *  @param {String[]} cfg.reservedNewlineWords Words that are set to newline
     *  @param {String[]} cfg.reservedTopLevelWordsNoIndent Words that are top level but have no indentation
     *  @param {String[]} cfg.stringTypes String types to enable: "", '', ``, [], N''
     *  @param {String[]} cfg.openParens Opening parentheses to enable, like (, [
     *  @param {String[]} cfg.closeParens Closing parentheses to enable, like ), ]
     *  @param {String[]} cfg.indexedPlaceholderTypes Prefixes for indexed placeholders, like ?
     *  @param {String[]} cfg.namedPlaceholderTypes Prefixes for named placeholders, like @ and :
     *  @param {String[]} cfg.lineCommentTypes Line comments to enable, like # and --
     *  @param {String[]} cfg.specialWordChars Special chars that can be found inside of words, like @ and #
     *  @param {String[]} [cfg.operator] Additional operators to recognize
     */
    function Tokenizer(cfg) {
      _classCallCheck(this, Tokenizer);

      this.WHITESPACE_REGEX = /^([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)/;
      this.NUMBER_REGEX = /^((\x2D[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?[0-9]+(\.[0-9]+)?([Ee]\x2D?[0-9]+(\.[0-9]+)?)?|0x[0-9A-Fa-f]+|0b[01]+)\b/;
      this.OPERATOR_REGEX = regexFactory$1.createOperatorRegex(['<>', '<=', '>='].concat(_toConsumableArray(cfg.operators || [])));
      this.BLOCK_COMMENT_REGEX = /^(\/\*(?:(?![])[\s\S])*?(?:\*\/|$))/;
      this.LINE_COMMENT_REGEX = regexFactory$1.createLineCommentRegex(cfg.lineCommentTypes);
      this.RESERVED_TOP_LEVEL_REGEX = regexFactory$1.createReservedWordRegex(cfg.reservedTopLevelWords);
      this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX = regexFactory$1.createReservedWordRegex(cfg.reservedTopLevelWordsNoIndent);
      this.RESERVED_NEWLINE_REGEX = regexFactory$1.createReservedWordRegex(cfg.reservedNewlineWords);
      this.RESERVED_PLAIN_REGEX = regexFactory$1.createReservedWordRegex(cfg.reservedWords);
      this.WORD_REGEX = regexFactory$1.createWordRegex(cfg.specialWordChars);
      this.STRING_REGEX = regexFactory$1.createStringRegex(cfg.stringTypes);
      this.OPEN_PAREN_REGEX = regexFactory$1.createParenRegex(cfg.openParens);
      this.CLOSE_PAREN_REGEX = regexFactory$1.createParenRegex(cfg.closeParens);
      this.INDEXED_PLACEHOLDER_REGEX = regexFactory$1.createPlaceholderRegex(cfg.indexedPlaceholderTypes, '[0-9]*');
      this.IDENT_NAMED_PLACEHOLDER_REGEX = regexFactory$1.createPlaceholderRegex(cfg.namedPlaceholderTypes, '[a-zA-Z0-9._$]+');
      this.STRING_NAMED_PLACEHOLDER_REGEX = regexFactory$1.createPlaceholderRegex(cfg.namedPlaceholderTypes, regexFactory$1.createStringPattern(cfg.stringTypes));
    }
    /**
     * Takes a SQL string and breaks it into tokens.
     * Each token is an object with type and value.
     *
     * @param {String} input The SQL string
     * @return {Object[]} tokens An array of tokens.
     *  @return {String} token.type
     *  @return {String} token.value
     *  @return {String} token.whitespaceBefore Preceding whitespace
     */


    _createClass(Tokenizer, [{
      key: "tokenize",
      value: function tokenize(input) {
        var tokens = [];
        var token; // Keep processing the string until it is empty

        while (input.length) {
          // grab any preceding whitespace
          var whitespaceBefore = this.getWhitespace(input);
          input = input.substring(whitespaceBefore.length);

          if (input.length) {
            // Get the next token and the token type
            token = this.getNextToken(input, token); // Advance the string

            input = input.substring(token.value.length);
            tokens.push(_objectSpread(_objectSpread({}, token), {}, {
              whitespaceBefore: whitespaceBefore
            }));
          }
        }

        return tokens;
      }
    }, {
      key: "getWhitespace",
      value: function getWhitespace(input) {
        var matches = input.match(this.WHITESPACE_REGEX);
        return matches ? matches[1] : '';
      }
    }, {
      key: "getNextToken",
      value: function getNextToken(input, previousToken) {
        return this.getCommentToken(input) || this.getStringToken(input) || this.getOpenParenToken(input) || this.getCloseParenToken(input) || this.getPlaceholderToken(input) || this.getNumberToken(input) || this.getReservedWordToken(input, previousToken) || this.getWordToken(input) || this.getOperatorToken(input);
      }
    }, {
      key: "getCommentToken",
      value: function getCommentToken(input) {
        return this.getLineCommentToken(input) || this.getBlockCommentToken(input);
      }
    }, {
      key: "getLineCommentToken",
      value: function getLineCommentToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].LINE_COMMENT,
          regex: this.LINE_COMMENT_REGEX
        });
      }
    }, {
      key: "getBlockCommentToken",
      value: function getBlockCommentToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].BLOCK_COMMENT,
          regex: this.BLOCK_COMMENT_REGEX
        });
      }
    }, {
      key: "getStringToken",
      value: function getStringToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].STRING,
          regex: this.STRING_REGEX
        });
      }
    }, {
      key: "getOpenParenToken",
      value: function getOpenParenToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].OPEN_PAREN,
          regex: this.OPEN_PAREN_REGEX
        });
      }
    }, {
      key: "getCloseParenToken",
      value: function getCloseParenToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].CLOSE_PAREN,
          regex: this.CLOSE_PAREN_REGEX
        });
      }
    }, {
      key: "getPlaceholderToken",
      value: function getPlaceholderToken(input) {
        return this.getIdentNamedPlaceholderToken(input) || this.getStringNamedPlaceholderToken(input) || this.getIndexedPlaceholderToken(input);
      }
    }, {
      key: "getIdentNamedPlaceholderToken",
      value: function getIdentNamedPlaceholderToken(input) {
        return this.getPlaceholderTokenWithKey({
          input: input,
          regex: this.IDENT_NAMED_PLACEHOLDER_REGEX,
          parseKey: function parseKey(v) {
            return v.slice(1);
          }
        });
      }
    }, {
      key: "getStringNamedPlaceholderToken",
      value: function getStringNamedPlaceholderToken(input) {
        var _this = this;

        return this.getPlaceholderTokenWithKey({
          input: input,
          regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
          parseKey: function parseKey(v) {
            return _this.getEscapedPlaceholderKey({
              key: v.slice(2, -1),
              quoteChar: v.slice(-1)
            });
          }
        });
      }
    }, {
      key: "getIndexedPlaceholderToken",
      value: function getIndexedPlaceholderToken(input) {
        return this.getPlaceholderTokenWithKey({
          input: input,
          regex: this.INDEXED_PLACEHOLDER_REGEX,
          parseKey: function parseKey(v) {
            return v.slice(1);
          }
        });
      }
    }, {
      key: "getPlaceholderTokenWithKey",
      value: function getPlaceholderTokenWithKey(_ref) {
        var input = _ref.input,
            regex = _ref.regex,
            parseKey = _ref.parseKey;
        var token = this.getTokenOnFirstMatch({
          input: input,
          regex: regex,
          type: _tokenTypes["default"].PLACEHOLDER
        });

        if (token) {
          token.key = parseKey(token.value);
        }

        return token;
      }
    }, {
      key: "getEscapedPlaceholderKey",
      value: function getEscapedPlaceholderKey(_ref2) {
        var key = _ref2.key,
            quoteChar = _ref2.quoteChar;
        return key.replace(new RegExp((0, utils.escapeRegExp)('\\' + quoteChar), 'gu'), quoteChar);
      } // Decimal, binary, or hex numbers

    }, {
      key: "getNumberToken",
      value: function getNumberToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].NUMBER,
          regex: this.NUMBER_REGEX
        });
      } // Punctuation and symbols

    }, {
      key: "getOperatorToken",
      value: function getOperatorToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].OPERATOR,
          regex: this.OPERATOR_REGEX
        });
      }
    }, {
      key: "getReservedWordToken",
      value: function getReservedWordToken(input, previousToken) {
        // A reserved word cannot be preceded by a "."
        // this makes it so in "mytable.from", "from" is not considered a reserved word
        if (previousToken && previousToken.value && previousToken.value === '.') {
          return undefined;
        }

        return this.getTopLevelReservedToken(input) || this.getNewlineReservedToken(input) || this.getTopLevelReservedTokenNoIndent(input) || this.getPlainReservedToken(input);
      }
    }, {
      key: "getTopLevelReservedToken",
      value: function getTopLevelReservedToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].RESERVED_TOP_LEVEL,
          regex: this.RESERVED_TOP_LEVEL_REGEX
        });
      }
    }, {
      key: "getNewlineReservedToken",
      value: function getNewlineReservedToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].RESERVED_NEWLINE,
          regex: this.RESERVED_NEWLINE_REGEX
        });
      }
    }, {
      key: "getTopLevelReservedTokenNoIndent",
      value: function getTopLevelReservedTokenNoIndent(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].RESERVED_TOP_LEVEL_NO_INDENT,
          regex: this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX
        });
      }
    }, {
      key: "getPlainReservedToken",
      value: function getPlainReservedToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].RESERVED,
          regex: this.RESERVED_PLAIN_REGEX
        });
      }
    }, {
      key: "getWordToken",
      value: function getWordToken(input) {
        return this.getTokenOnFirstMatch({
          input: input,
          type: _tokenTypes["default"].WORD,
          regex: this.WORD_REGEX
        });
      }
    }, {
      key: "getTokenOnFirstMatch",
      value: function getTokenOnFirstMatch(_ref3) {
        var input = _ref3.input,
            type = _ref3.type,
            regex = _ref3.regex;
        var matches = input.match(regex);
        return matches ? {
          type: type,
          value: matches[1]
        } : undefined;
      }
    }]);

    return Tokenizer;
  }();

  exports["default"] = Tokenizer;
  module.exports = exports.default;
});

var Db2Formatter_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _Formatter2 = _interopRequireDefault(Formatter_1);

  var _Tokenizer = _interopRequireDefault(Tokenizer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var reservedWords = ['ABS', 'ACTIVATE', 'ALIAS', 'ALL', 'ALLOCATE', 'ALLOW', 'ALTER', 'ANY', 'ARE', 'ARRAY', 'AS', 'ASC', 'ASENSITIVE', 'ASSOCIATE', 'ASUTIME', 'ASYMMETRIC', 'AT', 'ATOMIC', 'ATTRIBUTES', 'AUDIT', 'AUTHORIZATION', 'AUX', 'AUXILIARY', 'AVG', 'BEFORE', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOOLEAN', 'BOTH', 'BUFFERPOOL', 'BY', 'CACHE', 'CALL', 'CALLED', 'CAPTURE', 'CARDINALITY', 'CASCADED', 'CASE', 'CAST', 'CCSID', 'CEIL', 'CEILING', 'CHAR', 'CHARACTER', 'CHARACTER_LENGTH', 'CHAR_LENGTH', 'CHECK', 'CLOB', 'CLONE', 'CLOSE', 'CLUSTER', 'COALESCE', 'COLLATE', 'COLLECT', 'COLLECTION', 'COLLID', 'COLUMN', 'COMMENT', 'COMMIT', 'CONCAT', 'CONDITION', 'CONNECT', 'CONNECTION', 'CONSTRAINT', 'CONTAINS', 'CONTINUE', 'CONVERT', 'CORR', 'CORRESPONDING', 'COUNT', 'COUNT_BIG', 'COVAR_POP', 'COVAR_SAMP', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT', 'CURRENT_DATE', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_LC_CTYPE', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_SERVER', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TIMEZONE', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATA', 'DATABASE', 'DATAPARTITIONNAME', 'DATAPARTITIONNUM', 'DATE', 'DAY', 'DAYS', 'DB2GENERAL', 'DB2GENRL', 'DB2SQL', 'DBINFO', 'DBPARTITIONNAME', 'DBPARTITIONNUM', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFINITION', 'DELETE', 'DENSERANK', 'DENSE_RANK', 'DEREF', 'DESCRIBE', 'DESCRIPTOR', 'DETERMINISTIC', 'DIAGNOSTICS', 'DISABLE', 'DISALLOW', 'DISCONNECT', 'DISTINCT', 'DO', 'DOCUMENT', 'DOUBLE', 'DROP', 'DSSIZE', 'DYNAMIC', 'EACH', 'EDITPROC', 'ELEMENT', 'ELSE', 'ELSEIF', 'ENABLE', 'ENCODING', 'ENCRYPTION', 'END', 'END-EXEC', 'ENDING', 'ERASE', 'ESCAPE', 'EVERY', 'EXCEPTION', 'EXCLUDING', 'EXCLUSIVE', 'EXEC', 'EXECUTE', 'EXISTS', 'EXIT', 'EXP', 'EXPLAIN', 'EXTENDED', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FENCED', 'FETCH', 'FIELDPROC', 'FILE', 'FILTER', 'FINAL', 'FIRST', 'FLOAT', 'FLOOR', 'FOR', 'FOREIGN', 'FREE', 'FULL', 'FUNCTION', 'FUSION', 'GENERAL', 'GENERATED', 'GET', 'GLOBAL', 'GOTO', 'GRANT', 'GRAPHIC', 'GROUP', 'GROUPING', 'HANDLER', 'HASH', 'HASHED_VALUE', 'HINT', 'HOLD', 'HOUR', 'HOURS', 'IDENTITY', 'IF', 'IMMEDIATE', 'IN', 'INCLUDING', 'INCLUSIVE', 'INCREMENT', 'INDEX', 'INDICATOR', 'INDICATORS', 'INF', 'INFINITY', 'INHERIT', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INTEGER', 'INTEGRITY', 'INTERSECTION', 'INTERVAL', 'INTO', 'IS', 'ISOBID', 'ISOLATION', 'ITERATE', 'JAR', 'JAVA', 'KEEP', 'KEY', 'LABEL', 'LANGUAGE', 'LARGE', 'LATERAL', 'LC_CTYPE', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LINKTYPE', 'LN', 'LOCAL', 'LOCALDATE', 'LOCALE', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATOR', 'LOCATORS', 'LOCK', 'LOCKMAX', 'LOCKSIZE', 'LONG', 'LOOP', 'LOWER', 'MAINTAINED', 'MATCH', 'MATERIALIZED', 'MAX', 'MAXVALUE', 'MEMBER', 'MERGE', 'METHOD', 'MICROSECOND', 'MICROSECONDS', 'MIN', 'MINUTE', 'MINUTES', 'MINVALUE', 'MOD', 'MODE', 'MODIFIES', 'MODULE', 'MONTH', 'MONTHS', 'MULTISET', 'NAN', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NEW', 'NEW_TABLE', 'NEXTVAL', 'NO', 'NOCACHE', 'NOCYCLE', 'NODENAME', 'NODENUMBER', 'NOMAXVALUE', 'NOMINVALUE', 'NONE', 'NOORDER', 'NORMALIZE', 'NORMALIZED', 'NOT', 'NULL', 'NULLIF', 'NULLS', 'NUMERIC', 'NUMPARTS', 'OBID', 'OCTET_LENGTH', 'OF', 'OFFSET', 'OLD', 'OLD_TABLE', 'ON', 'ONLY', 'OPEN', 'OPTIMIZATION', 'OPTIMIZE', 'OPTION', 'ORDER', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERRIDING', 'PACKAGE', 'PADDED', 'PAGESIZE', 'PARAMETER', 'PART', 'PARTITION', 'PARTITIONED', 'PARTITIONING', 'PARTITIONS', 'PASSWORD', 'PATH', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK', 'PIECESIZE', 'PLAN', 'POSITION', 'POWER', 'PRECISION', 'PREPARE', 'PREVVAL', 'PRIMARY', 'PRIQTY', 'PRIVILEGES', 'PROCEDURE', 'PROGRAM', 'PSID', 'PUBLIC', 'QUERY', 'QUERYNO', 'RANGE', 'RANK', 'READ', 'READS', 'REAL', 'RECOVERY', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REFRESH', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'RELEASE', 'RENAME', 'REPEAT', 'RESET', 'RESIGNAL', 'RESTART', 'RESTRICT', 'RESULT', 'RESULT_SET_LOCATOR', 'RETURN', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUND_CEILING', 'ROUND_DOWN', 'ROUND_FLOOR', 'ROUND_HALF_DOWN', 'ROUND_HALF_EVEN', 'ROUND_HALF_UP', 'ROUND_UP', 'ROUTINE', 'ROW', 'ROWNUMBER', 'ROWS', 'ROWSET', 'ROW_NUMBER', 'RRN', 'RUN', 'SAVEPOINT', 'SCHEMA', 'SCOPE', 'SCRATCHPAD', 'SCROLL', 'SEARCH', 'SECOND', 'SECONDS', 'SECQTY', 'SECURITY', 'SENSITIVE', 'SEQUENCE', 'SESSION', 'SESSION_USER', 'SIGNAL', 'SIMILAR', 'SIMPLE', 'SMALLINT', 'SNAN', 'SOME', 'SOURCE', 'SPECIFIC', 'SPECIFICTYPE', 'SQL', 'SQLEXCEPTION', 'SQLID', 'SQLSTATE', 'SQLWARNING', 'SQRT', 'STACKED', 'STANDARD', 'START', 'STARTING', 'STATEMENT', 'STATIC', 'STATMENT', 'STAY', 'STDDEV_POP', 'STDDEV_SAMP', 'STOGROUP', 'STORES', 'STYLE', 'SUBMULTISET', 'SUBSTRING', 'SUM', 'SUMMARY', 'SYMMETRIC', 'SYNONYM', 'SYSFUN', 'SYSIBM', 'SYSPROC', 'SYSTEM', 'SYSTEM_USER', 'TABLE', 'TABLESAMPLE', 'TABLESPACE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSLATE', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'TRUNCATE', 'TYPE', 'UESCAPE', 'UNDO', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UNTIL', 'UPPER', 'USAGE', 'USER', 'USING', 'VALIDPROC', 'VALUE', 'VARCHAR', 'VARIABLE', 'VARIANT', 'VARYING', 'VAR_POP', 'VAR_SAMP', 'VCAT', 'VERSION', 'VIEW', 'VOLATILE', 'VOLUMES', 'WHEN', 'WHENEVER', 'WHILE', 'WIDTH_BUCKET', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WLM', 'WRITE', 'XMLELEMENT', 'XMLEXISTS', 'XMLNAMESPACES', 'YEAR', 'YEARS'];
  var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FETCH FIRST', 'FROM', 'GROUP BY', 'GO', 'HAVING', 'INSERT INTO', 'INTERSECT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
  var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
  var reservedNewlineWords = ['AND', 'OR', // joins
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN']; // For reference: https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_72/db2/rbafzintro.htm

  var Db2Formatter = /*#__PURE__*/function (_Formatter) {
    _inherits(Db2Formatter, _Formatter);

    var _super = _createSuper(Db2Formatter);

    function Db2Formatter() {
      _classCallCheck(this, Db2Formatter);

      return _super.apply(this, arguments);
    }

    _createClass(Db2Formatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        return new _Tokenizer["default"]({
          reservedWords: reservedWords,
          reservedTopLevelWords: reservedTopLevelWords,
          reservedNewlineWords: reservedNewlineWords,
          reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
          stringTypes: ["\"\"", "''", '``', '[]'],
          openParens: ['('],
          closeParens: [')'],
          indexedPlaceholderTypes: ['?'],
          namedPlaceholderTypes: [':'],
          lineCommentTypes: ['--'],
          specialWordChars: ['#', '@'],
          operators: ['**', '!=', '!>', '!>', '||']
        });
      }
    }]);

    return Db2Formatter;
  }(_Formatter2["default"]);

  exports["default"] = Db2Formatter;
  module.exports = exports.default;
});

var MariaDbFormatter_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _Formatter2 = _interopRequireDefault(Formatter_1);

  var _Tokenizer = _interopRequireDefault(Tokenizer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var reservedWords = ['ACCESSIBLE', 'ADD', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'AS', 'ASC', 'ASENSITIVE', 'BEFORE', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOTH', 'BY', 'CALL', 'CASCADE', 'CASE', 'CHANGE', 'CHAR', 'CHARACTER', 'CHECK', 'COLLATE', 'COLUMN', 'CONDITION', 'CONSTRAINT', 'CONTINUE', 'CONVERT', 'CREATE', 'CROSS', 'CURRENT_DATE', 'CURRENT_ROLE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'DATABASE', 'DATABASES', 'DAY_HOUR', 'DAY_MICROSECOND', 'DAY_MINUTE', 'DAY_SECOND', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELAYED', 'DELETE', 'DESC', 'DESCRIBE', 'DETERMINISTIC', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DO_DOMAIN_IDS', 'DOUBLE', 'DROP', 'DUAL', 'EACH', 'ELSE', 'ELSEIF', 'ENCLOSED', 'ESCAPED', 'EXCEPT', 'EXISTS', 'EXIT', 'EXPLAIN', 'FALSE', 'FETCH', 'FLOAT', 'FLOAT4', 'FLOAT8', 'FOR', 'FORCE', 'FOREIGN', 'FROM', 'FULLTEXT', 'GENERAL', 'GRANT', 'GROUP', 'HAVING', 'HIGH_PRIORITY', 'HOUR_MICROSECOND', 'HOUR_MINUTE', 'HOUR_SECOND', 'IF', 'IGNORE', 'IGNORE_DOMAIN_IDS', 'IGNORE_SERVER_IDS', 'IN', 'INDEX', 'INFILE', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INT1', 'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER', 'INTERSECT', 'INTERVAL', 'INTO', 'IS', 'ITERATE', 'JOIN', 'KEY', 'KEYS', 'KILL', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LIMIT', 'LINEAR', 'LINES', 'LOAD', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCK', 'LONG', 'LONGBLOB', 'LONGTEXT', 'LOOP', 'LOW_PRIORITY', 'MASTER_HEARTBEAT_PERIOD', 'MASTER_SSL_VERIFY_SERVER_CERT', 'MATCH', 'MAXVALUE', 'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT', 'MIDDLEINT', 'MINUTE_MICROSECOND', 'MINUTE_SECOND', 'MOD', 'MODIFIES', 'NATURAL', 'NOT', 'NO_WRITE_TO_BINLOG', 'NULL', 'NUMERIC', 'ON', 'OPTIMIZE', 'OPTION', 'OPTIONALLY', 'OR', 'ORDER', 'OUT', 'OUTER', 'OUTFILE', 'OVER', 'PAGE_CHECKSUM', 'PARSE_VCOL_EXPR', 'PARTITION', 'POSITION', 'PRECISION', 'PRIMARY', 'PROCEDURE', 'PURGE', 'RANGE', 'READ', 'READS', 'READ_WRITE', 'REAL', 'RECURSIVE', 'REF_SYSTEM_ID', 'REFERENCES', 'REGEXP', 'RELEASE', 'RENAME', 'REPEAT', 'REPLACE', 'REQUIRE', 'RESIGNAL', 'RESTRICT', 'RETURN', 'RETURNING', 'REVOKE', 'RIGHT', 'RLIKE', 'ROWS', 'SCHEMA', 'SCHEMAS', 'SECOND_MICROSECOND', 'SELECT', 'SENSITIVE', 'SEPARATOR', 'SET', 'SHOW', 'SIGNAL', 'SLOW', 'SMALLINT', 'SPATIAL', 'SPECIFIC', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQL_BIG_RESULT', 'SQL_CALC_FOUND_ROWS', 'SQL_SMALL_RESULT', 'SSL', 'STARTING', 'STATS_AUTO_RECALC', 'STATS_PERSISTENT', 'STATS_SAMPLE_PAGES', 'STRAIGHT_JOIN', 'TABLE', 'TERMINATED', 'THEN', 'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRAILING', 'TRIGGER', 'TRUE', 'UNDO', 'UNION', 'UNIQUE', 'UNLOCK', 'UNSIGNED', 'UPDATE', 'USAGE', 'USE', 'USING', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', 'VALUES', 'VARBINARY', 'VARCHAR', 'VARCHARACTER', 'VARYING', 'WHEN', 'WHERE', 'WHILE', 'WINDOW', 'WITH', 'WRITE', 'XOR', 'YEAR_MONTH', 'ZEROFILL'];
  var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
  var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'UNION', 'UNION ALL'];
  var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', // non-standard joins
  'STRAIGHT_JOIN', 'NATURAL LEFT JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL RIGHT JOIN', 'NATURAL RIGHT OUTER JOIN']; // For reference: https://mariadb.com/kb/en/sql-statements-structure/

  var MariaDbFormatter = /*#__PURE__*/function (_Formatter) {
    _inherits(MariaDbFormatter, _Formatter);

    var _super = _createSuper(MariaDbFormatter);

    function MariaDbFormatter() {
      _classCallCheck(this, MariaDbFormatter);

      return _super.apply(this, arguments);
    }

    _createClass(MariaDbFormatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        return new _Tokenizer["default"]({
          reservedWords: reservedWords,
          reservedTopLevelWords: reservedTopLevelWords,
          reservedNewlineWords: reservedNewlineWords,
          reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
          stringTypes: ['``', "''", '""'],
          openParens: ['(', 'CASE'],
          closeParens: [')', 'END'],
          indexedPlaceholderTypes: ['?'],
          namedPlaceholderTypes: [],
          lineCommentTypes: ['--', '#'],
          specialWordChars: ['@'],
          operators: [':=', '<<', '>>', '!=', '<>', '<=>', '&&', '||']
        });
      }
    }]);

    return MariaDbFormatter;
  }(_Formatter2["default"]);

  exports["default"] = MariaDbFormatter;
  module.exports = exports.default;
});

var MySqlFormatter_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _Formatter2 = _interopRequireDefault(Formatter_1);

  var _Tokenizer = _interopRequireDefault(Tokenizer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var reservedWords = ['ACCESSIBLE', 'ADD', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'AS', 'ASC', 'ASENSITIVE', 'BEFORE', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOTH', 'BY', 'CALL', 'CASCADE', 'CASE', 'CHANGE', 'CHAR', 'CHARACTER', 'CHECK', 'COLLATE', 'COLUMN', 'CONDITION', 'CONSTRAINT', 'CONTINUE', 'CONVERT', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'DATABASE', 'DATABASES', 'DAY_HOUR', 'DAY_MICROSECOND', 'DAY_MINUTE', 'DAY_SECOND', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELAYED', 'DELETE', 'DENSE_RANK', 'DESC', 'DESCRIBE', 'DETERMINISTIC', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DOUBLE', 'DROP', 'DUAL', 'EACH', 'ELSE', 'ELSEIF', 'EMPTY', 'ENCLOSED', 'ESCAPED', 'EXCEPT', 'EXISTS', 'EXIT', 'EXPLAIN', 'FALSE', 'FETCH', 'FIRST_VALUE', 'FLOAT', 'FLOAT4', 'FLOAT8', 'FOR', 'FORCE', 'FOREIGN', 'FROM', 'FULLTEXT', 'FUNCTION', 'GENERATED', 'GET', 'GRANT', 'GROUP', 'GROUPING', 'GROUPS', 'HAVING', 'HIGH_PRIORITY', 'HOUR_MICROSECOND', 'HOUR_MINUTE', 'HOUR_SECOND', 'IF', 'IGNORE', 'IN', 'INDEX', 'INFILE', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INT1', 'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER', 'INTERVAL', 'INTO', 'IO_AFTER_GTIDS', 'IO_BEFORE_GTIDS', 'IS', 'ITERATE', 'JOIN', 'JSON_TABLE', 'KEY', 'KEYS', 'KILL', 'LAG', 'LAST_VALUE', 'LATERAL', 'LEAD', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LIMIT', 'LINEAR', 'LINES', 'LOAD', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCK', 'LONG', 'LONGBLOB', 'LONGTEXT', 'LOOP', 'LOW_PRIORITY', 'MASTER_BIND', 'MASTER_SSL_VERIFY_SERVER_CERT', 'MATCH', 'MAXVALUE', 'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT', 'MIDDLEINT', 'MINUTE_MICROSECOND', 'MINUTE_SECOND', 'MOD', 'MODIFIES', 'NATURAL', 'NOT', 'NO_WRITE_TO_BINLOG', 'NTH_VALUE', 'NTILE', 'NULL', 'NUMERIC', 'OF', 'ON', 'OPTIMIZE', 'OPTIMIZER_COSTS', 'OPTION', 'OPTIONALLY', 'OR', 'ORDER', 'OUT', 'OUTER', 'OUTFILE', 'OVER', 'PARTITION', 'PERCENT_RANK', 'PRECISION', 'PRIMARY', 'PROCEDURE', 'PURGE', 'RANGE', 'RANK', 'READ', 'READS', 'READ_WRITE', 'REAL', 'RECURSIVE', 'REFERENCES', 'REGEXP', 'RELEASE', 'RENAME', 'REPEAT', 'REPLACE', 'REQUIRE', 'RESIGNAL', 'RESTRICT', 'RETURN', 'REVOKE', 'RIGHT', 'RLIKE', 'ROW', 'ROWS', 'ROW_NUMBER', 'SCHEMA', 'SCHEMAS', 'SECOND_MICROSECOND', 'SELECT', 'SENSITIVE', 'SEPARATOR', 'SET', 'SHOW', 'SIGNAL', 'SMALLINT', 'SPATIAL', 'SPECIFIC', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQL_BIG_RESULT', 'SQL_CALC_FOUND_ROWS', 'SQL_SMALL_RESULT', 'SSL', 'STARTING', 'STORED', 'STRAIGHT_JOIN', 'SYSTEM', 'TABLE', 'TERMINATED', 'THEN', 'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRAILING', 'TRIGGER', 'TRUE', 'UNDO', 'UNION', 'UNIQUE', 'UNLOCK', 'UNSIGNED', 'UPDATE', 'USAGE', 'USE', 'USING', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', 'VALUES', 'VARBINARY', 'VARCHAR', 'VARCHARACTER', 'VARYING', 'VIRTUAL', 'WHEN', 'WHERE', 'WHILE', 'WINDOW', 'WITH', 'WRITE', 'XOR', 'YEAR_MONTH', 'ZEROFILL'];
  var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
  var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'UNION', 'UNION ALL'];
  var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', // non-standard joins
  'STRAIGHT_JOIN', 'NATURAL LEFT JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL RIGHT JOIN', 'NATURAL RIGHT OUTER JOIN'];

  var MySqlFormatter = /*#__PURE__*/function (_Formatter) {
    _inherits(MySqlFormatter, _Formatter);

    var _super = _createSuper(MySqlFormatter);

    function MySqlFormatter() {
      _classCallCheck(this, MySqlFormatter);

      return _super.apply(this, arguments);
    }

    _createClass(MySqlFormatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        return new _Tokenizer["default"]({
          reservedWords: reservedWords,
          reservedTopLevelWords: reservedTopLevelWords,
          reservedNewlineWords: reservedNewlineWords,
          reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
          stringTypes: ['``', "''", '""'],
          openParens: ['(', 'CASE'],
          closeParens: [')', 'END'],
          indexedPlaceholderTypes: ['?'],
          namedPlaceholderTypes: [],
          lineCommentTypes: ['--', '#'],
          specialWordChars: ['@'],
          operators: [':=', '<<', '>>', '!=', '<>', '<=>', '&&', '||', '->', '->>']
        });
      }
    }]);

    return MySqlFormatter;
  }(_Formatter2["default"]);

  exports["default"] = MySqlFormatter;
  module.exports = exports.default;
});

var N1qlFormatter_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _Formatter2 = _interopRequireDefault(Formatter_1);

  var _Tokenizer = _interopRequireDefault(Tokenizer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var reservedWords = ['ALL', 'ALTER', 'ANALYZE', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'BEGIN', 'BETWEEN', 'BINARY', 'BOOLEAN', 'BREAK', 'BUCKET', 'BUILD', 'BY', 'CALL', 'CASE', 'CAST', 'CLUSTER', 'COLLATE', 'COLLECTION', 'COMMIT', 'CONNECT', 'CONTINUE', 'CORRELATE', 'COVER', 'CREATE', 'DATABASE', 'DATASET', 'DATASTORE', 'DECLARE', 'DECREMENT', 'DELETE', 'DERIVED', 'DESC', 'DESCRIBE', 'DISTINCT', 'DO', 'DROP', 'EACH', 'ELEMENT', 'ELSE', 'END', 'EVERY', 'EXCEPT', 'EXCLUDE', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'FALSE', 'FETCH', 'FIRST', 'FLATTEN', 'FOR', 'FORCE', 'FROM', 'FUNCTION', 'GRANT', 'GROUP', 'GSI', 'HAVING', 'IF', 'IGNORE', 'ILIKE', 'IN', 'INCLUDE', 'INCREMENT', 'INDEX', 'INFER', 'INLINE', 'INNER', 'INSERT', 'INTERSECT', 'INTO', 'IS', 'JOIN', 'KEY', 'KEYS', 'KEYSPACE', 'KNOWN', 'LAST', 'LEFT', 'LET', 'LETTING', 'LIKE', 'LIMIT', 'LSM', 'MAP', 'MAPPING', 'MATCHED', 'MATERIALIZED', 'MERGE', 'MISSING', 'NAMESPACE', 'NEST', 'NOT', 'NULL', 'NUMBER', 'OBJECT', 'OFFSET', 'ON', 'OPTION', 'OR', 'ORDER', 'OUTER', 'OVER', 'PARSE', 'PARTITION', 'PASSWORD', 'PATH', 'POOL', 'PREPARE', 'PRIMARY', 'PRIVATE', 'PRIVILEGE', 'PROCEDURE', 'PUBLIC', 'RAW', 'REALM', 'REDUCE', 'RENAME', 'RETURN', 'RETURNING', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'SATISFIES', 'SCHEMA', 'SELECT', 'SELF', 'SEMI', 'SET', 'SHOW', 'SOME', 'START', 'STATISTICS', 'STRING', 'SYSTEM', 'THEN', 'TO', 'TRANSACTION', 'TRIGGER', 'TRUE', 'TRUNCATE', 'UNDER', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UNSET', 'UPDATE', 'UPSERT', 'USE', 'USER', 'USING', 'VALIDATE', 'VALUE', 'VALUED', 'VALUES', 'VIA', 'VIEW', 'WHEN', 'WHERE', 'WHILE', 'WITH', 'WITHIN', 'WORK', 'XOR'];
  var reservedTopLevelWords = ['DELETE FROM', 'EXCEPT ALL', 'EXCEPT', 'EXPLAIN DELETE FROM', 'EXPLAIN UPDATE', 'EXPLAIN UPSERT', 'FROM', 'GROUP BY', 'HAVING', 'INFER', 'INSERT INTO', 'LET', 'LIMIT', 'MERGE', 'NEST', 'ORDER BY', 'PREPARE', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UNNEST', 'UPDATE', 'UPSERT', 'USE KEYS', 'VALUES', 'WHERE'];
  var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
  var reservedNewlineWords = ['AND', 'OR', 'XOR', // joins
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN']; // For reference: http://docs.couchbase.com.s3-website-us-west-1.amazonaws.com/server/6.0/n1ql/n1ql-language-reference/index.html

  var N1qlFormatter = /*#__PURE__*/function (_Formatter) {
    _inherits(N1qlFormatter, _Formatter);

    var _super = _createSuper(N1qlFormatter);

    function N1qlFormatter() {
      _classCallCheck(this, N1qlFormatter);

      return _super.apply(this, arguments);
    }

    _createClass(N1qlFormatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        return new _Tokenizer["default"]({
          reservedWords: reservedWords,
          reservedTopLevelWords: reservedTopLevelWords,
          reservedNewlineWords: reservedNewlineWords,
          reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
          stringTypes: ["\"\"", "''", '``'],
          openParens: ['(', '[', '{'],
          closeParens: [')', ']', '}'],
          namedPlaceholderTypes: ['$'],
          lineCommentTypes: ['#', '--'],
          operators: ['==', '!=']
        });
      }
    }]);

    return N1qlFormatter;
  }(_Formatter2["default"]);

  exports["default"] = N1qlFormatter;
  module.exports = exports.default;
});

var PlSqlFormatter_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _Formatter2 = _interopRequireDefault(Formatter_1);

  var _Tokenizer = _interopRequireDefault(Tokenizer_1);

  var _tokenTypes = _interopRequireDefault(tokenTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var reservedWords = ['A', 'ACCESSIBLE', 'AGENT', 'AGGREGATE', 'ALL', 'ALTER', 'ANY', 'ARRAY', 'AS', 'ASC', 'AT', 'ATTRIBUTE', 'AUTHID', 'AVG', 'BETWEEN', 'BFILE_BASE', 'BINARY_INTEGER', 'BINARY', 'BLOB_BASE', 'BLOCK', 'BODY', 'BOOLEAN', 'BOTH', 'BOUND', 'BREADTH', 'BULK', 'BY', 'BYTE', 'C', 'CALL', 'CALLING', 'CASCADE', 'CASE', 'CHAR_BASE', 'CHAR', 'CHARACTER', 'CHARSET', 'CHARSETFORM', 'CHARSETID', 'CHECK', 'CLOB_BASE', 'CLONE', 'CLOSE', 'CLUSTER', 'CLUSTERS', 'COALESCE', 'COLAUTH', 'COLLECT', 'COLUMNS', 'COMMENT', 'COMMIT', 'COMMITTED', 'COMPILED', 'COMPRESS', 'CONNECT', 'CONSTANT', 'CONSTRUCTOR', 'CONTEXT', 'CONTINUE', 'CONVERT', 'COUNT', 'CRASH', 'CREATE', 'CREDENTIAL', 'CURRENT', 'CURRVAL', 'CURSOR', 'CUSTOMDATUM', 'DANGLING', 'DATA', 'DATE_BASE', 'DATE', 'DAY', 'DECIMAL', 'DEFAULT', 'DEFINE', 'DELETE', 'DEPTH', 'DESC', 'DETERMINISTIC', 'DIRECTORY', 'DISTINCT', 'DO', 'DOUBLE', 'DROP', 'DURATION', 'ELEMENT', 'ELSIF', 'EMPTY', 'END', 'ESCAPE', 'EXCEPTIONS', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', 'EXIT', 'EXTENDS', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FETCH', 'FINAL', 'FIRST', 'FIXED', 'FLOAT', 'FOR', 'FORALL', 'FORCE', 'FROM', 'FUNCTION', 'GENERAL', 'GOTO', 'GRANT', 'GROUP', 'HASH', 'HEAP', 'HIDDEN', 'HOUR', 'IDENTIFIED', 'IF', 'IMMEDIATE', 'IN', 'INCLUDING', 'INDEX', 'INDEXES', 'INDICATOR', 'INDICES', 'INFINITE', 'INSTANTIABLE', 'INT', 'INTEGER', 'INTERFACE', 'INTERVAL', 'INTO', 'INVALIDATE', 'IS', 'ISOLATION', 'JAVA', 'LANGUAGE', 'LARGE', 'LEADING', 'LENGTH', 'LEVEL', 'LIBRARY', 'LIKE', 'LIKE2', 'LIKE4', 'LIKEC', 'LIMITED', 'LOCAL', 'LOCK', 'LONG', 'MAP', 'MAX', 'MAXLEN', 'MEMBER', 'MERGE', 'MIN', 'MINUTE', 'MLSLABEL', 'MOD', 'MODE', 'MONTH', 'MULTISET', 'NAME', 'NAN', 'NATIONAL', 'NATIVE', 'NATURAL', 'NATURALN', 'NCHAR', 'NEW', 'NEXTVAL', 'NOCOMPRESS', 'NOCOPY', 'NOT', 'NOWAIT', 'NULL', 'NULLIF', 'NUMBER_BASE', 'NUMBER', 'OBJECT', 'OCICOLL', 'OCIDATE', 'OCIDATETIME', 'OCIDURATION', 'OCIINTERVAL', 'OCILOBLOCATOR', 'OCINUMBER', 'OCIRAW', 'OCIREF', 'OCIREFCURSOR', 'OCIROWID', 'OCISTRING', 'OCITYPE', 'OF', 'OLD', 'ON', 'ONLY', 'OPAQUE', 'OPEN', 'OPERATOR', 'OPTION', 'ORACLE', 'ORADATA', 'ORDER', 'ORGANIZATION', 'ORLANY', 'ORLVARY', 'OTHERS', 'OUT', 'OVERLAPS', 'OVERRIDING', 'PACKAGE', 'PARALLEL_ENABLE', 'PARAMETER', 'PARAMETERS', 'PARENT', 'PARTITION', 'PASCAL', 'PCTFREE', 'PIPE', 'PIPELINED', 'PLS_INTEGER', 'PLUGGABLE', 'POSITIVE', 'POSITIVEN', 'PRAGMA', 'PRECISION', 'PRIOR', 'PRIVATE', 'PROCEDURE', 'PUBLIC', 'RAISE', 'RANGE', 'RAW', 'READ', 'REAL', 'RECORD', 'REF', 'REFERENCE', 'RELEASE', 'RELIES_ON', 'REM', 'REMAINDER', 'RENAME', 'RESOURCE', 'RESULT_CACHE', 'RESULT', 'RETURN', 'RETURNING', 'REVERSE', 'REVOKE', 'ROLLBACK', 'ROW', 'ROWID', 'ROWNUM', 'ROWTYPE', 'SAMPLE', 'SAVE', 'SAVEPOINT', 'SB1', 'SB2', 'SB4', 'SEARCH', 'SECOND', 'SEGMENT', 'SELF', 'SEPARATE', 'SEQUENCE', 'SERIALIZABLE', 'SHARE', 'SHORT', 'SIZE_T', 'SIZE', 'SMALLINT', 'SOME', 'SPACE', 'SPARSE', 'SQL', 'SQLCODE', 'SQLDATA', 'SQLERRM', 'SQLNAME', 'SQLSTATE', 'STANDARD', 'START', 'STATIC', 'STDDEV', 'STORED', 'STRING', 'STRUCT', 'STYLE', 'SUBMULTISET', 'SUBPARTITION', 'SUBSTITUTABLE', 'SUBTYPE', 'SUCCESSFUL', 'SUM', 'SYNONYM', 'SYSDATE', 'TABAUTH', 'TABLE', 'TDO', 'THE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_ABBR', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TIMEZONE_REGION', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSACTIONAL', 'TRIGGER', 'TRUE', 'TRUSTED', 'TYPE', 'UB1', 'UB2', 'UB4', 'UID', 'UNDER', 'UNIQUE', 'UNPLUG', 'UNSIGNED', 'UNTRUSTED', 'USE', 'USER', 'USING', 'VALIDATE', 'VALIST', 'VALUE', 'VARCHAR', 'VARCHAR2', 'VARIABLE', 'VARIANCE', 'VARRAY', 'VARYING', 'VIEW', 'VIEWS', 'VOID', 'WHENEVER', 'WHILE', 'WITH', 'WORK', 'WRAPPED', 'WRITE', 'YEAR', 'ZONE'];
  var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'BEGIN', 'CONNECT BY', 'DECLARE', 'DELETE FROM', 'DELETE', 'END', 'EXCEPT', 'EXCEPTION', 'FETCH FIRST', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'LOOP', 'MODIFY', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'START WITH', 'UPDATE', 'VALUES', 'WHERE'];
  var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
  var reservedNewlineWords = ['AND', 'CROSS APPLY', 'ELSE', 'END', 'OR', 'OUTER APPLY', 'WHEN', 'XOR', // joins
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

  var PlSqlFormatter = /*#__PURE__*/function (_Formatter) {
    _inherits(PlSqlFormatter, _Formatter);

    var _super = _createSuper(PlSqlFormatter);

    function PlSqlFormatter() {
      _classCallCheck(this, PlSqlFormatter);

      return _super.apply(this, arguments);
    }

    _createClass(PlSqlFormatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        return new _Tokenizer["default"]({
          reservedWords: reservedWords,
          reservedTopLevelWords: reservedTopLevelWords,
          reservedNewlineWords: reservedNewlineWords,
          reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
          stringTypes: ["\"\"", "N''", "''", '``'],
          openParens: ['(', 'CASE'],
          closeParens: [')', 'END'],
          indexedPlaceholderTypes: ['?'],
          namedPlaceholderTypes: [':'],
          lineCommentTypes: ['--'],
          specialWordChars: ['_', '$', '#', '.', '@'],
          operators: ['||', '**', '!=', ':=']
        });
      }
    }, {
      key: "tokenOverride",
      value: function tokenOverride(token) {
        if ((0, token$1.isSet)(token) && (0, token$1.isBy)(this.previousReservedToken)) {
          return {
            type: _tokenTypes["default"].RESERVED,
            value: token.value
          };
        }

        return token;
      }
    }]);

    return PlSqlFormatter;
  }(_Formatter2["default"]);

  exports["default"] = PlSqlFormatter;
  module.exports = exports.default;
});

var PostgreSqlFormatter_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _Formatter2 = _interopRequireDefault(Formatter_1);

  var _Tokenizer = _interopRequireDefault(Tokenizer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var reservedWords = ['ABORT', 'ABSOLUTE', 'ACCESS', 'ACTION', 'ADD', 'ADMIN', 'AFTER', 'AGGREGATE', 'ALL', 'ALSO', 'ALTER', 'ALWAYS', 'ANALYSE', 'ANALYZE', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'ASSERTION', 'ASSIGNMENT', 'ASYMMETRIC', 'AT', 'ATTACH', 'ATTRIBUTE', 'AUTHORIZATION', 'BACKWARD', 'BEFORE', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BIT', 'BOOLEAN', 'BOTH', 'BY', 'CACHE', 'CALL', 'CALLED', 'CASCADE', 'CASCADED', 'CASE', 'CAST', 'CATALOG', 'CHAIN', 'CHAR', 'CHARACTER', 'CHARACTERISTICS', 'CHECK', 'CHECKPOINT', 'CLASS', 'CLOSE', 'CLUSTER', 'COALESCE', 'COLLATE', 'COLLATION', 'COLUMN', 'COLUMNS', 'COMMENT', 'COMMENTS', 'COMMIT', 'COMMITTED', 'CONCURRENTLY', 'CONFIGURATION', 'CONFLICT', 'CONNECTION', 'CONSTRAINT', 'CONSTRAINTS', 'CONTENT', 'CONTINUE', 'CONVERSION', 'COPY', 'COST', 'CREATE', 'CROSS', 'CSV', 'CUBE', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATA', 'DATABASE', 'DAY', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFERRABLE', 'DEFERRED', 'DEFINER', 'DELETE', 'DELIMITER', 'DELIMITERS', 'DEPENDS', 'DESC', 'DETACH', 'DICTIONARY', 'DISABLE', 'DISCARD', 'DISTINCT', 'DO', 'DOCUMENT', 'DOMAIN', 'DOUBLE', 'DROP', 'EACH', 'ELSE', 'ENABLE', 'ENCODING', 'ENCRYPTED', 'END', 'ENUM', 'ESCAPE', 'EVENT', 'EXCEPT', 'EXCLUDE', 'EXCLUDING', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'EXPRESSION', 'EXTENSION', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FAMILY', 'FETCH', 'FILTER', 'FIRST', 'FLOAT', 'FOLLOWING', 'FOR', 'FORCE', 'FOREIGN', 'FORWARD', 'FREEZE', 'FROM', 'FULL', 'FUNCTION', 'FUNCTIONS', 'GENERATED', 'GLOBAL', 'GRANT', 'GRANTED', 'GREATEST', 'GROUP', 'GROUPING', 'GROUPS', 'HANDLER', 'HAVING', 'HEADER', 'HOLD', 'HOUR', 'IDENTITY', 'IF', 'ILIKE', 'IMMEDIATE', 'IMMUTABLE', 'IMPLICIT', 'IMPORT', 'IN', 'INCLUDE', 'INCLUDING', 'INCREMENT', 'INDEX', 'INDEXES', 'INHERIT', 'INHERITS', 'INITIALLY', 'INLINE', 'INNER', 'INOUT', 'INPUT', 'INSENSITIVE', 'INSERT', 'INSTEAD', 'INT', 'INTEGER', 'INTERSECT', 'INTERVAL', 'INTO', 'INVOKER', 'IS', 'ISNULL', 'ISOLATION', 'JOIN', 'KEY', 'LABEL', 'LANGUAGE', 'LARGE', 'LAST', 'LATERAL', 'LEADING', 'LEAKPROOF', 'LEAST', 'LEFT', 'LEVEL', 'LIKE', 'LIMIT', 'LISTEN', 'LOAD', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATION', 'LOCK', 'LOCKED', 'LOGGED', 'MAPPING', 'MATCH', 'MATERIALIZED', 'MAXVALUE', 'METHOD', 'MINUTE', 'MINVALUE', 'MODE', 'MONTH', 'MOVE', 'NAME', 'NAMES', 'NATIONAL', 'NATURAL', 'NCHAR', 'NEW', 'NEXT', 'NFC', 'NFD', 'NFKC', 'NFKD', 'NO', 'NONE', 'NORMALIZE', 'NORMALIZED', 'NOT', 'NOTHING', 'NOTIFY', 'NOTNULL', 'NOWAIT', 'NULL', 'NULLIF', 'NULLS', 'NUMERIC', 'OBJECT', 'OF', 'OFF', 'OFFSET', 'OIDS', 'OLD', 'ON', 'ONLY', 'OPERATOR', 'OPTION', 'OPTIONS', 'OR', 'ORDER', 'ORDINALITY', 'OTHERS', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERRIDING', 'OWNED', 'OWNER', 'PARALLEL', 'PARSER', 'PARTIAL', 'PARTITION', 'PASSING', 'PASSWORD', 'PLACING', 'PLANS', 'POLICY', 'POSITION', 'PRECEDING', 'PRECISION', 'PREPARE', 'PREPARED', 'PRESERVE', 'PRIMARY', 'PRIOR', 'PRIVILEGES', 'PROCEDURAL', 'PROCEDURE', 'PROCEDURES', 'PROGRAM', 'PUBLICATION', 'QUOTE', 'RANGE', 'READ', 'REAL', 'REASSIGN', 'RECHECK', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REFRESH', 'REINDEX', 'RELATIVE', 'RELEASE', 'RENAME', 'REPEATABLE', 'REPLACE', 'REPLICA', 'RESET', 'RESTART', 'RESTRICT', 'RETURNING', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUTINE', 'ROUTINES', 'ROW', 'ROWS', 'RULE', 'SAVEPOINT', 'SCHEMA', 'SCHEMAS', 'SCROLL', 'SEARCH', 'SECOND', 'SECURITY', 'SELECT', 'SEQUENCE', 'SEQUENCES', 'SERIALIZABLE', 'SERVER', 'SESSION', 'SESSION_USER', 'SET', 'SETOF', 'SETS', 'SHARE', 'SHOW', 'SIMILAR', 'SIMPLE', 'SKIP', 'SMALLINT', 'SNAPSHOT', 'SOME', 'SQL', 'STABLE', 'STANDALONE', 'START', 'STATEMENT', 'STATISTICS', 'STDIN', 'STDOUT', 'STORAGE', 'STORED', 'STRICT', 'STRIP', 'SUBSCRIPTION', 'SUBSTRING', 'SUPPORT', 'SYMMETRIC', 'SYSID', 'SYSTEM', 'TABLE', 'TABLES', 'TABLESAMPLE', 'TABLESPACE', 'TEMP', 'TEMPLATE', 'TEMPORARY', 'TEXT', 'THEN', 'TIES', 'TIME', 'TIMESTAMP', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSFORM', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'TRUNCATE', 'TRUSTED', 'TYPE', 'TYPES', 'UESCAPE', 'UNBOUNDED', 'UNCOMMITTED', 'UNENCRYPTED', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNLISTEN', 'UNLOGGED', 'UNTIL', 'UPDATE', 'USER', 'USING', 'VACUUM', 'VALID', 'VALIDATE', 'VALIDATOR', 'VALUE', 'VALUES', 'VARCHAR', 'VARIADIC', 'VARYING', 'VERBOSE', 'VERSION', 'VIEW', 'VIEWS', 'VOLATILE', 'WHEN', 'WHERE', 'WHITESPACE', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WORK', 'WRAPPER', 'WRITE', 'XML', 'XMLATTRIBUTES', 'XMLCONCAT', 'XMLELEMENT', 'XMLEXISTS', 'XMLFOREST', 'XMLNAMESPACES', 'XMLPARSE', 'XMLPI', 'XMLROOT', 'XMLSERIALIZE', 'XMLTABLE', 'YEAR', 'YES', 'ZONE'];
  var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'EXCEPT', 'FETCH FIRST', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
  var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'UNION', 'UNION ALL'];
  var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

  var PostgreSqlFormatter = /*#__PURE__*/function (_Formatter) {
    _inherits(PostgreSqlFormatter, _Formatter);

    var _super = _createSuper(PostgreSqlFormatter);

    function PostgreSqlFormatter() {
      _classCallCheck(this, PostgreSqlFormatter);

      return _super.apply(this, arguments);
    }

    _createClass(PostgreSqlFormatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        return new _Tokenizer["default"]({
          reservedWords: reservedWords,
          reservedTopLevelWords: reservedTopLevelWords,
          reservedNewlineWords: reservedNewlineWords,
          reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
          stringTypes: ["\"\"", "''", "U&''", 'U&""', '$$'],
          openParens: ['(', 'CASE'],
          closeParens: [')', 'END'],
          indexedPlaceholderTypes: ['$'],
          namedPlaceholderTypes: [':'],
          lineCommentTypes: ['--'],
          operators: ['!=', '<<', '>>', '||/', '|/', '::', '->>', '->', '~~*', '~~', '!~~*', '!~~', '~*', '!~*', '!~', '!!']
        });
      }
    }]);

    return PostgreSqlFormatter;
  }(_Formatter2["default"]);

  exports["default"] = PostgreSqlFormatter;
  module.exports = exports.default;
});

var RedshiftFormatter_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _Formatter2 = _interopRequireDefault(Formatter_1);

  var _Tokenizer = _interopRequireDefault(Tokenizer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var reservedWords = ['AES128', 'AES256', 'ALLOWOVERWRITE', 'ANALYSE', 'ARRAY', 'AS', 'ASC', 'AUTHORIZATION', 'BACKUP', 'BINARY', 'BLANKSASNULL', 'BOTH', 'BYTEDICT', 'BZIP2', 'CAST', 'CHECK', 'COLLATE', 'COLUMN', 'CONSTRAINT', 'CREATE', 'CREDENTIALS', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURRENT_USER_ID', 'DEFAULT', 'DEFERRABLE', 'DEFLATE', 'DEFRAG', 'DELTA', 'DELTA32K', 'DESC', 'DISABLE', 'DISTINCT', 'DO', 'ELSE', 'EMPTYASNULL', 'ENABLE', 'ENCODE', 'ENCRYPT', 'ENCRYPTION', 'END', 'EXPLICIT', 'FALSE', 'FOR', 'FOREIGN', 'FREEZE', 'FULL', 'GLOBALDICT256', 'GLOBALDICT64K', 'GRANT', 'GZIP', 'IDENTITY', 'IGNORE', 'ILIKE', 'INITIALLY', 'INTO', 'LEADING', 'LOCALTIME', 'LOCALTIMESTAMP', 'LUN', 'LUNS', 'LZO', 'LZOP', 'MINUS', 'MOSTLY13', 'MOSTLY32', 'MOSTLY8', 'NATURAL', 'NEW', 'NULLS', 'OFF', 'OFFLINE', 'OFFSET', 'OLD', 'ON', 'ONLY', 'OPEN', 'ORDER', 'OVERLAPS', 'PARALLEL', 'PARTITION', 'PERCENT', 'PERMISSIONS', 'PLACING', 'PRIMARY', 'RAW', 'READRATIO', 'RECOVER', 'REFERENCES', 'REJECTLOG', 'RESORT', 'RESTORE', 'SESSION_USER', 'SIMILAR', 'SYSDATE', 'SYSTEM', 'TABLE', 'TAG', 'TDES', 'TEXT255', 'TEXT32K', 'THEN', 'TIMESTAMP', 'TO', 'TOP', 'TRAILING', 'TRUE', 'TRUNCATECOLUMNS', 'UNIQUE', 'USER', 'USING', 'VERBOSE', 'WALLET', 'WHEN', 'WITH', 'WITHOUT', 'PREDICATE', 'COLUMNS', 'COMPROWS', 'COMPRESSION', 'COPY', 'FORMAT', 'DELIMITER', 'FIXEDWIDTH', 'AVRO', 'JSON', 'ENCRYPTED', 'BZIP2', 'GZIP', 'LZOP', 'PARQUET', 'ORC', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'BLANKSASNULL', 'DATEFORMAT', 'EMPTYASNULL', 'ENCODING', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'NULL AS', 'REMOVEQUOTES', 'ROUNDEC', 'TIMEFORMAT', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'COMPROWS', 'COMPUPDATE', 'MAXERROR', 'NOLOAD', 'STATUPDATE', 'MANIFEST', 'REGION', 'IAM_ROLE', 'MASTER_SYMMETRIC_KEY', 'SSH', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'AVRO', 'BLANKSASNULL', 'BZIP2', 'COMPROWS', 'COMPUPDATE', 'CREDENTIALS', 'DATEFORMAT', 'DELIMITER', 'EMPTYASNULL', 'ENCODING', 'ENCRYPTED', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'FIXEDWIDTH', 'FORMAT', 'IAM_ROLE', 'GZIP', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'JSON', 'LZOP', 'MANIFEST', 'MASTER_SYMMETRIC_KEY', 'MAXERROR', 'NOLOAD', 'NULL AS', 'READRATIO', 'REGION', 'REMOVEQUOTES', 'ROUNDEC', 'SSH', 'STATUPDATE', 'TIMEFORMAT', 'SESSION_TOKEN', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'EXTERNAL', 'DATA CATALOG', 'HIVE METASTORE', 'CATALOG_ROLE', 'VACUUM', 'COPY', 'UNLOAD', 'EVEN', 'ALL'];
  var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'INTERSECT', 'TOP', 'LIMIT', 'MODIFY', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UNION ALL', 'UNION', 'UPDATE', 'VALUES', 'WHERE', 'VACUUM', 'COPY', 'UNLOAD', 'ANALYZE', 'ANALYSE', 'DISTKEY', 'SORTKEY', 'COMPOUND', 'INTERLEAVED', 'FORMAT', 'DELIMITER', 'FIXEDWIDTH', 'AVRO', 'JSON', 'ENCRYPTED', 'BZIP2', 'GZIP', 'LZOP', 'PARQUET', 'ORC', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'BLANKSASNULL', 'DATEFORMAT', 'EMPTYASNULL', 'ENCODING', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'NULL AS', 'REMOVEQUOTES', 'ROUNDEC', 'TIMEFORMAT', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'COMPROWS', 'COMPUPDATE', 'MAXERROR', 'NOLOAD', 'STATUPDATE', 'MANIFEST', 'REGION', 'IAM_ROLE', 'MASTER_SYMMETRIC_KEY', 'SSH', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'AVRO', 'BLANKSASNULL', 'BZIP2', 'COMPROWS', 'COMPUPDATE', 'CREDENTIALS', 'DATEFORMAT', 'DELIMITER', 'EMPTYASNULL', 'ENCODING', 'ENCRYPTED', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'FIXEDWIDTH', 'FORMAT', 'IAM_ROLE', 'GZIP', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'JSON', 'LZOP', 'MANIFEST', 'MASTER_SYMMETRIC_KEY', 'MAXERROR', 'NOLOAD', 'NULL AS', 'READRATIO', 'REGION', 'REMOVEQUOTES', 'ROUNDEC', 'SSH', 'STATUPDATE', 'TIMEFORMAT', 'SESSION_TOKEN', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'EXTERNAL', 'DATA CATALOG', 'HIVE METASTORE', 'CATALOG_ROLE'];
  var reservedTopLevelWordsNoIndent = [];
  var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'OUTER APPLY', 'WHEN', 'VACUUM', 'COPY', 'UNLOAD', 'ANALYZE', 'ANALYSE', 'DISTKEY', 'SORTKEY', 'COMPOUND', 'INTERLEAVED', // joins
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

  var RedshiftFormatter = /*#__PURE__*/function (_Formatter) {
    _inherits(RedshiftFormatter, _Formatter);

    var _super = _createSuper(RedshiftFormatter);

    function RedshiftFormatter() {
      _classCallCheck(this, RedshiftFormatter);

      return _super.apply(this, arguments);
    }

    _createClass(RedshiftFormatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        return new _Tokenizer["default"]({
          reservedWords: reservedWords,
          reservedTopLevelWords: reservedTopLevelWords,
          reservedNewlineWords: reservedNewlineWords,
          reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
          stringTypes: ["\"\"", "''", '``'],
          openParens: ['('],
          closeParens: [')'],
          indexedPlaceholderTypes: ['?'],
          namedPlaceholderTypes: ['@', '#', '$'],
          lineCommentTypes: ['--'],
          operators: ['|/', '||/', '<<', '>>', '!=', '||']
        });
      }
    }]);

    return RedshiftFormatter;
  }(_Formatter2["default"]);

  exports["default"] = RedshiftFormatter;
  module.exports = exports.default;
});

var SparkSqlFormatter_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _Formatter2 = _interopRequireDefault(Formatter_1);

  var _Tokenizer = _interopRequireDefault(Tokenizer_1);

  var _tokenTypes = _interopRequireDefault(tokenTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var reservedWords = ['ALL', 'ALTER', 'ANALYSE', 'ANALYZE', 'ARRAY_ZIP', 'ARRAY', 'AS', 'ASC', 'AVG', 'BETWEEN', 'CASCADE', 'CASE', 'CAST', 'COALESCE', 'COLLECT_LIST', 'COLLECT_SET', 'COLUMN', 'COLUMNS', 'COMMENT', 'CONSTRAINT', 'CONTAINS', 'CONVERT', 'COUNT', 'CUME_DIST', 'CURRENT ROW', 'CURRENT_DATE', 'CURRENT_TIMESTAMP', 'DATABASE', 'DATABASES', 'DATE_ADD', 'DATE_SUB', 'DATE_TRUNC', 'DAY_HOUR', 'DAY_MINUTE', 'DAY_SECOND', 'DAY', 'DAYS', 'DECODE', 'DEFAULT', 'DELETE', 'DENSE_RANK', 'DESC', 'DESCRIBE', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DROP', 'ELSE', 'ENCODE', 'END', 'EXISTS', 'EXPLAIN', 'EXPLODE_OUTER', 'EXPLODE', 'FILTER', 'FIRST_VALUE', 'FIRST', 'FIXED', 'FLATTEN', 'FOLLOWING', 'FROM_UNIXTIME', 'FULL', 'GREATEST', 'GROUP_CONCAT', 'HOUR_MINUTE', 'HOUR_SECOND', 'HOUR', 'HOURS', 'IF', 'IFNULL', 'IN', 'INSERT', 'INTERVAL', 'INTO', 'IS', 'LAG', 'LAST_VALUE', 'LAST', 'LEAD', 'LEADING', 'LEAST', 'LEVEL', 'LIKE', 'MAX', 'MERGE', 'MIN', 'MINUTE_SECOND', 'MINUTE', 'MONTH', 'NATURAL', 'NOT', 'NOW()', 'NTILE', 'NULL', 'NULLIF', 'OFFSET', 'ON DELETE', 'ON UPDATE', 'ON', 'ONLY', 'OPTIMIZE', 'OVER', 'PERCENT_RANK', 'PRECEDING', 'RANGE', 'RANK', 'REGEXP', 'RENAME', 'RLIKE', 'ROW', 'ROWS', 'SECOND', 'SEPARATOR', 'SEQUENCE', 'SIZE', 'STRING', 'STRUCT', 'SUM', 'TABLE', 'TABLES', 'TEMPORARY', 'THEN', 'TO_DATE', 'TO_JSON', 'TO', 'TRAILING', 'TRANSFORM', 'TRUE', 'TRUNCATE', 'TYPE', 'TYPES', 'UNBOUNDED', 'UNIQUE', 'UNIX_TIMESTAMP', 'UNLOCK', 'UNSIGNED', 'USING', 'VARIABLES', 'VIEW', 'WHEN', 'WITH', 'YEAR_MONTH'];
  var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER DATABASE', 'ALTER SCHEMA', 'ALTER TABLE', 'CLUSTER BY', 'CLUSTERED BY', 'DELETE FROM', 'DISTRIBUTE BY', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'OPTIONS', 'ORDER BY', 'PARTITION BY', 'PARTITIONED BY', 'RANGE', 'ROWS', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'TBLPROPERTIES', 'UPDATE', 'USING', 'VALUES', 'WHERE', 'WINDOW'];
  var reservedTopLevelWordsNoIndent = ['EXCEPT ALL', 'EXCEPT', 'INTERSECT ALL', 'INTERSECT', 'UNION ALL', 'UNION'];
  var reservedNewlineWords = ['AND', 'CREATE OR', 'CREATE', 'ELSE', 'LATERAL VIEW', 'OR', 'OUTER APPLY', 'WHEN', 'XOR', // joins
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', // non-standard-joins
  'ANTI JOIN', 'SEMI JOIN', 'LEFT ANTI JOIN', 'LEFT SEMI JOIN', 'RIGHT OUTER JOIN', 'RIGHT SEMI JOIN', 'NATURAL ANTI JOIN', 'NATURAL FULL OUTER JOIN', 'NATURAL INNER JOIN', 'NATURAL LEFT ANTI JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL LEFT SEMI JOIN', 'NATURAL OUTER JOIN', 'NATURAL RIGHT OUTER JOIN', 'NATURAL RIGHT SEMI JOIN', 'NATURAL SEMI JOIN'];

  var SparkSqlFormatter = /*#__PURE__*/function (_Formatter) {
    _inherits(SparkSqlFormatter, _Formatter);

    var _super = _createSuper(SparkSqlFormatter);

    function SparkSqlFormatter() {
      _classCallCheck(this, SparkSqlFormatter);

      return _super.apply(this, arguments);
    }

    _createClass(SparkSqlFormatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        return new _Tokenizer["default"]({
          reservedWords: reservedWords,
          reservedTopLevelWords: reservedTopLevelWords,
          reservedNewlineWords: reservedNewlineWords,
          reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
          stringTypes: ["\"\"", "''", '``', '{}'],
          openParens: ['(', 'CASE'],
          closeParens: [')', 'END'],
          indexedPlaceholderTypes: ['?'],
          namedPlaceholderTypes: ['$'],
          lineCommentTypes: ['--'],
          operators: ['!=', '<=>', '&&', '||', '==']
        });
      }
    }, {
      key: "tokenOverride",
      value: function tokenOverride(token) {
        // Fix cases where names are ambiguously keywords or functions
        if ((0, token$1.isWindow)(token)) {
          var aheadToken = this.tokenLookAhead();

          if (aheadToken && aheadToken.type === _tokenTypes["default"].OPEN_PAREN) {
            // This is a function call, treat it as a reserved word
            return {
              type: _tokenTypes["default"].RESERVED,
              value: token.value
            };
          }
        } // Fix cases where names are ambiguously keywords or properties


        if ((0, token$1.isEnd)(token)) {
          var backToken = this.tokenLookBehind();

          if (backToken && backToken.type === _tokenTypes["default"].OPERATOR && backToken.value === '.') {
            // This is window().end (or similar) not CASE ... END
            return {
              type: _tokenTypes["default"].WORD,
              value: token.value
            };
          }
        }

        return token;
      }
    }]);

    return SparkSqlFormatter;
  }(_Formatter2["default"]);

  exports["default"] = SparkSqlFormatter;
  module.exports = exports.default;
});

var StandardSqlFormatter_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _Formatter2 = _interopRequireDefault(Formatter_1);

  var _Tokenizer = _interopRequireDefault(Tokenizer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  } // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#reserved-word


  var reservedWords = ['ABS', 'ALL', 'ALLOCATE', 'ALTER', 'AND', 'ANY', 'ARE', 'ARRAY', 'AS', 'ASENSITIVE', 'ASYMMETRIC', 'AT', 'ATOMIC', 'AUTHORIZATION', 'AVG', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOOLEAN', 'BOTH', 'BY', 'CALL', 'CALLED', 'CARDINALITY', 'CASCADED', 'CASE', 'CAST', 'CEIL', 'CEILING', 'CHAR', 'CHAR_LENGTH', 'CHARACTER', 'CHARACTER_LENGTH', 'CHECK', 'CLOB', 'CLOSE', 'COALESCE', 'COLLATE', 'COLLECT', 'COLUMN', 'COMMIT', 'CONDITION', 'CONNECT', 'CONSTRAINT', 'CONVERT', 'CORR', 'CORRESPONDING', 'COUNT', 'COVAR_POP', 'COVAR_SAMP', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATE', 'DAY', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELETE', 'DENSE_RANK', 'DEREF', 'DESCRIBE', 'DETERMINISTIC', 'DISCONNECT', 'DISTINCT', 'DOUBLE', 'DROP', 'DYNAMIC', 'EACH', 'ELEMENT', 'ELSE', 'END', 'END-EXEC', 'ESCAPE', 'EVERY', 'EXCEPT', 'EXEC', 'EXECUTE', 'EXISTS', 'EXP', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FETCH', 'FILTER', 'FLOAT', 'FLOOR', 'FOR', 'FOREIGN', 'FREE', 'FROM', 'FULL', 'FUNCTION', 'FUSION', 'GET', 'GLOBAL', 'GRANT', 'GROUP', 'GROUPING', 'HAVING', 'HOLD', 'HOUR', 'IDENTITY', 'IN', 'INDICATOR', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INTEGER', 'INTERSECT', 'INTERSECTION', 'INTERVAL', 'INTO', 'IS', 'JOIN', 'LANGUAGE', 'LARGE', 'LATERAL', 'LEADING', 'LEFT', 'LIKE', 'LIKE_REGEX', 'LN', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOWER', 'MATCH', 'MAX', 'MEMBER', 'MERGE', 'METHOD', 'MIN', 'MINUTE', 'MOD', 'MODIFIES', 'MODULE', 'MONTH', 'MULTISET', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NEW', 'NO', 'NONE', 'NORMALIZE', 'NOT', 'NULL', 'NULLIF', 'NUMERIC', 'OCTET_LENGTH', 'OCCURRENCES_REGEX', 'OF', 'OLD', 'ON', 'ONLY', 'OPEN', 'OR', 'ORDER', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'PARAMETER', 'PARTITION', 'PERCENT_RANK', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'POSITION', 'POSITION_REGEX', 'POWER', 'PRECISION', 'PREPARE', 'PRIMARY', 'PROCEDURE', 'RANGE', 'RANK', 'READS', 'REAL', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'RELEASE', 'RESULT', 'RETURN', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLLBACK', 'ROLLUP', 'ROW', 'ROW_NUMBER', 'ROWS', 'SAVEPOINT', 'SCOPE', 'SCROLL', 'SEARCH', 'SECOND', 'SELECT', 'SENSITIVE', 'SESSION_USER', 'SET', 'SIMILAR', 'SMALLINT', 'SOME', 'SPECIFIC', 'SPECIFICTYPE', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQRT', 'START', 'STATIC', 'STDDEV_POP', 'STDDEV_SAMP', 'SUBMULTISET', 'SUBSTRING', 'SUBSTRING_REGEX', 'SUM', 'SYMMETRIC', 'SYSTEM', 'SYSTEM_USER', 'TABLE', 'TABLESAMPLE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TRAILING', 'TRANSLATE', 'TRANSLATE_REGEX', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'UESCAPE', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UPDATE', 'UPPER', 'USER', 'USING', 'VALUE', 'VALUES', 'VAR_POP', 'VAR_SAMP', 'VARBINARY', 'VARCHAR', 'VARYING', 'WHEN', 'WHENEVER', 'WHERE', 'WIDTH_BUCKET', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'YEAR'];
  var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'FETCH FIRST', 'FETCH NEXT', 'FETCH PRIOR', 'FETCH LAST', 'FETCH ABSOLUTE', 'FETCH RELATIVE', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'LIMIT', 'ORDER BY', 'SELECT', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
  var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'INTERSECT DISTINCT', 'UNION', 'UNION ALL', 'UNION DISTINCT', 'EXCEPT', 'EXCEPT ALL', 'EXCEPT DISTINCT'];
  var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

  var StandardSqlFormatter = /*#__PURE__*/function (_Formatter) {
    _inherits(StandardSqlFormatter, _Formatter);

    var _super = _createSuper(StandardSqlFormatter);

    function StandardSqlFormatter() {
      _classCallCheck(this, StandardSqlFormatter);

      return _super.apply(this, arguments);
    }

    _createClass(StandardSqlFormatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        return new _Tokenizer["default"]({
          reservedWords: reservedWords,
          reservedTopLevelWords: reservedTopLevelWords,
          reservedNewlineWords: reservedNewlineWords,
          reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
          stringTypes: ["\"\"", "''"],
          openParens: ['(', 'CASE'],
          closeParens: [')', 'END'],
          indexedPlaceholderTypes: ['?'],
          namedPlaceholderTypes: [],
          lineCommentTypes: ['--']
        });
      }
    }]);

    return StandardSqlFormatter;
  }(_Formatter2["default"]);

  exports["default"] = StandardSqlFormatter;
  module.exports = exports.default;
});

var TSqlFormatter_1 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _Formatter2 = _interopRequireDefault(Formatter_1);

  var _Tokenizer = _interopRequireDefault(Tokenizer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var reservedWords = ['ADD', 'EXTERNAL', 'PROCEDURE', 'ALL', 'FETCH', 'PUBLIC', 'ALTER', 'FILE', 'RAISERROR', 'AND', 'FILLFACTOR', 'READ', 'ANY', 'FOR', 'READTEXT', 'AS', 'FOREIGN', 'RECONFIGURE', 'ASC', 'FREETEXT', 'REFERENCES', 'AUTHORIZATION', 'FREETEXTTABLE', 'REPLICATION', 'BACKUP', 'FROM', 'RESTORE', 'BEGIN', 'FULL', 'RESTRICT', 'BETWEEN', 'FUNCTION', 'RETURN', 'BREAK', 'GOTO', 'REVERT', 'BROWSE', 'GRANT', 'REVOKE', 'BULK', 'GROUP', 'RIGHT', 'BY', 'HAVING', 'ROLLBACK', 'CASCADE', 'HOLDLOCK', 'ROWCOUNT', 'CASE', 'IDENTITY', 'ROWGUIDCOL', 'CHECK', 'IDENTITY_INSERT', 'RULE', 'CHECKPOINT', 'IDENTITYCOL', 'SAVE', 'CLOSE', 'IF', 'SCHEMA', 'CLUSTERED', 'IN', 'SECURITYAUDIT', 'COALESCE', 'INDEX', 'SELECT', 'COLLATE', 'INNER', 'SEMANTICKEYPHRASETABLE', 'COLUMN', 'INSERT', 'SEMANTICSIMILARITYDETAILSTABLE', 'COMMIT', 'INTERSECT', 'SEMANTICSIMILARITYTABLE', 'COMPUTE', 'INTO', 'SESSION_USER', 'CONSTRAINT', 'IS', 'SET', 'CONTAINS', 'JOIN', 'SETUSER', 'CONTAINSTABLE', 'KEY', 'SHUTDOWN', 'CONTINUE', 'KILL', 'SOME', 'CONVERT', 'LEFT', 'STATISTICS', 'CREATE', 'LIKE', 'SYSTEM_USER', 'CROSS', 'LINENO', 'TABLE', 'CURRENT', 'LOAD', 'TABLESAMPLE', 'CURRENT_DATE', 'MERGE', 'TEXTSIZE', 'CURRENT_TIME', 'NATIONAL', 'THEN', 'CURRENT_TIMESTAMP', 'NOCHECK', 'TO', 'CURRENT_USER', 'NONCLUSTERED', 'TOP', 'CURSOR', 'NOT', 'TRAN', 'DATABASE', 'NULL', 'TRANSACTION', 'DBCC', 'NULLIF', 'TRIGGER', 'DEALLOCATE', 'OF', 'TRUNCATE', 'DECLARE', 'OFF', 'TRY_CONVERT', 'DEFAULT', 'OFFSETS', 'TSEQUAL', 'DELETE', 'ON', 'UNION', 'DENY', 'OPEN', 'UNIQUE', 'DESC', 'OPENDATASOURCE', 'UNPIVOT', 'DISK', 'OPENQUERY', 'UPDATE', 'DISTINCT', 'OPENROWSET', 'UPDATETEXT', 'DISTRIBUTED', 'OPENXML', 'USE', 'DOUBLE', 'OPTION', 'USER', 'DROP', 'OR', 'VALUES', 'DUMP', 'ORDER', 'VARYING', 'ELSE', 'OUTER', 'VIEW', 'END', 'OVER', 'WAITFOR', 'ERRLVL', 'PERCENT', 'WHEN', 'ESCAPE', 'PIVOT', 'WHERE', 'EXCEPT', 'PLAN', 'WHILE', 'EXEC', 'PRECISION', 'WITH', 'EXECUTE', 'PRIMARY', 'WITHIN GROUP', 'EXISTS', 'PRINT', 'WRITETEXT', 'EXIT', 'PROC'];
  var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
  var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
  var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'];

  var TSqlFormatter = /*#__PURE__*/function (_Formatter) {
    _inherits(TSqlFormatter, _Formatter);

    var _super = _createSuper(TSqlFormatter);

    function TSqlFormatter() {
      _classCallCheck(this, TSqlFormatter);

      return _super.apply(this, arguments);
    }

    _createClass(TSqlFormatter, [{
      key: "tokenizer",
      value: function tokenizer() {
        return new _Tokenizer["default"]({
          reservedWords: reservedWords,
          reservedTopLevelWords: reservedTopLevelWords,
          reservedNewlineWords: reservedNewlineWords,
          reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
          stringTypes: ["\"\"", "N''", "''", '[]'],
          openParens: ['(', 'CASE'],
          closeParens: [')', 'END'],
          indexedPlaceholderTypes: [],
          namedPlaceholderTypes: ['@'],
          lineCommentTypes: ['--'],
          specialWordChars: ['#', '@'],
          operators: ['>=', '<=', '<>', '!=', '!<', '!>', '+=', '-=', '*=', '/=', '%=', '|=', '&=', '^=', '::'] // TODO: Support for money constants

        });
      }
    }]);

    return TSqlFormatter;
  }(_Formatter2["default"]);

  exports["default"] = TSqlFormatter;
  module.exports = exports.default;
});

var sqlFormatter = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.supportedDialects = exports.format = void 0;

  var _Db2Formatter = _interopRequireDefault(Db2Formatter_1);

  var _MariaDbFormatter = _interopRequireDefault(MariaDbFormatter_1);

  var _MySqlFormatter = _interopRequireDefault(MySqlFormatter_1);

  var _N1qlFormatter = _interopRequireDefault(N1qlFormatter_1);

  var _PlSqlFormatter = _interopRequireDefault(PlSqlFormatter_1);

  var _PostgreSqlFormatter = _interopRequireDefault(PostgreSqlFormatter_1);

  var _RedshiftFormatter = _interopRequireDefault(RedshiftFormatter_1);

  var _SparkSqlFormatter = _interopRequireDefault(SparkSqlFormatter_1);

  var _StandardSqlFormatter = _interopRequireDefault(StandardSqlFormatter_1);

  var _TSqlFormatter = _interopRequireDefault(TSqlFormatter_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var formatters = {
    db2: _Db2Formatter["default"],
    mariadb: _MariaDbFormatter["default"],
    mysql: _MySqlFormatter["default"],
    n1ql: _N1qlFormatter["default"],
    plsql: _PlSqlFormatter["default"],
    postgresql: _PostgreSqlFormatter["default"],
    redshift: _RedshiftFormatter["default"],
    spark: _SparkSqlFormatter["default"],
    sql: _StandardSqlFormatter["default"],
    tsql: _TSqlFormatter["default"]
  };
  /**
   * Format whitespace in a query to make it easier to read.
   *
   * @param {String} query
   * @param {Object} cfg
   *  @param {String} cfg.language Query language, default is Standard SQL
   *  @param {String} cfg.indent Characters used for indentation, default is "  " (2 spaces)
   *  @param {Boolean} cfg.uppercase Converts keywords to uppercase
   *  @param {Integer} cfg.linesBetweenQueries How many line breaks between queries
   *  @param {Object} cfg.params Collection of params for placeholder replacement
   * @return {String}
   */

  var format = function format(query) {
    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof query !== 'string') {
      throw new Error('Invalid query argument. Extected string, instead got ' + _typeof(query));
    }

    var Formatter = _StandardSqlFormatter["default"];

    if (cfg.language !== undefined) {
      Formatter = formatters[cfg.language];
    }

    if (Formatter === undefined) {
      throw Error("Unsupported SQL dialect: ".concat(cfg.language));
    }

    return new Formatter(cfg).format(query);
  };

  exports.format = format;
  var supportedDialects = Object.keys(formatters);
  exports.supportedDialects = supportedDialects;
});
var sqlFormatter$1 = /*@__PURE__*/getDefaultExportFromCjs(sqlFormatter);

function copyToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
} // TODO: Move to context dir? 👇

function curlCommand(request, requestData, headers) {
  if (!request.url || !request.method) {
    return null;
  }

  const curlLines = [`curl "${request.url}"`];
  curlLines.push(`   -X ${request.method}`);
  Object.entries(headers || {}).map(function ([key, value]) {
    curlLines.push(`   -H '${key}: ${value}'`);
  });
  const curlBodyString = curlBody(requestData, headers);

  if (curlBodyString) {
    curlLines.push(curlBodyString);
  }

  return curlLines.join(' \\\n').trimEnd().replace(/\s\\$/g, ';');
}

function curlBody(requestData, headers) {
  var _headers$contentType, _headers$contentType$;

  if (!requestData.body) {
    return null;
  }

  if ((_headers$contentType = headers['content-type']) != null && (_headers$contentType$ = _headers$contentType[0]) != null && _headers$contentType$.includes('application/json')) {
    return `   -d ${JSON.stringify(requestData.body)}`;
  }

  const formValues = Object.entries(requestData.body || {}).map(function ([key, value]) {
    return `-F '${key}=${value}'`;
  });
  return `   ${formValues.join(' ')}`;
}

function unixToDate(timestamp) {
  return new Date(timestamp * 1000);
}
function jsonStringify(value) {
  return JSON.stringify(value, null, 4);
}
function hasDebugInfo(errorOccurrence) {
  if (errorOccurrence.glows.length) {
    return true;
  }

  if (Object.values(errorOccurrence.context_items.dumps || []).length) {
    return true;
  }

  if (Object.values(errorOccurrence.context_items.logs || []).length) {
    return true;
  }

  if (Object.values(errorOccurrence.context_items.queries || []).length) {
    return true;
  }

  return false;
}

function CopyButton({
  value,
  className = '',
  alwaysVisible = false,
  direction = 'right'
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    let timeout;

    if (copied) {
      timeout = window.setTimeout(() => setCopied(false), 3000);
    }

    return () => window.clearTimeout(timeout);
  }, [copied]);

  function copy(event) {
    event.preventDefault();
    copyToClipboard(value);
    setCopied(true);
  }

  return React__default.createElement("div", {
    className: className
  }, React__default.createElement(RoundedButton, {
    onClick: copy,
    title: "Copy to clipboard",
    className: `
                    ${alwaysVisible ? '' : 'opacity-0 transform scale-80 transition-animation delay-100'}
                    ${copied ? 'opacity-0' : 'group-hover:opacity-100 group-hover:scale-100'}
                `
  }, React__default.createElement(FontAwesomeIcon, {
    icon: faCopy
  })), copied && React__default.createElement("p", {
    className: `absolute top-0 ${direction == 'right' ? 'right-0' : 'left-0'} hidden z-10 sm:inline-flex gap-2 items-center h-6 px-2 rounded-sm ~bg-white shadow text-xs font-medium whitespace-nowrap text-emerald-500`,
    onClick: () => setCopied(false)
  }, "Copied!"));
}

/*
 Language: cURL
 Category: scripting
 Author: John Foster <jfoster@esri.com>
 Description: Syntax highlighting for cURL commands.
*/
var curl = function curl(hljs) {
  const QUOTE_STRING = {
    className: 'string',
    begin: /"/,
    end: /"/,
    contains: [hljs.BACKSLASH_ESCAPE, {
      className: 'variable',
      begin: /\$\(/,
      end: /\)/,
      contains: [hljs.BACKSLASH_ESCAPE]
    }],
    relevance: 0
  };
  const OPTION_REQUEST = {
    className: 'literal',
    begin: /(--request|-X)\s/,
    contains: [{
      className: 'symbol',
      begin: /(get|post|delete|options|head|put|patch|trace|connect)/,
      end: /\s/,
      returnEnd: true
    }],
    returnEnd: true,
    relevance: 10
  };
  const OPTION = {
    className: 'literal',
    begin: /--/,
    end: /[\s"]/,
    returnEnd: true,
    relevance: 0
  };
  const OPTION_SINGLE = {
    className: 'literal',
    begin: /-\w/,
    end: /[\s"]/,
    returnEnd: true,
    relevance: 0
  };
  const ESCAPED_QUOTE = {
    className: 'string',
    begin: /\\"/,
    relevance: 0
  };
  const APOS_STRING = {
    className: 'string',
    begin: /'/,
    end: /'/,
    relevance: 0
  };
  const NUMBER = {
    className: 'number',
    variants: [{
      begin: hljs.C_NUMBER_RE
    }],
    relevance: 0
  }; // to consume paths to prevent keyword matches inside them

  const PATH_MODE = {
    match: /(\/[a-z._-]+)+/
  };
  return {
    name: "curl",
    aliases: ["curl"],
    keywords: "curl",
    case_insensitive: true,
    contains: [OPTION_REQUEST, OPTION, OPTION_SINGLE, QUOTE_STRING, ESCAPED_QUOTE, APOS_STRING, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, NUMBER, PATH_MODE]
  };
};

SyntaxHighlighter$1.registerLanguage('sql', sql$1);
SyntaxHighlighter$1.registerLanguage('curl', curl);
SyntaxHighlighter$1.registerLanguage('json', json$1);
function HighlightedCode({
  children,
  language
}) {
  return React__default.createElement(SyntaxHighlighter$1, {
    language: language,
    customStyle: {
      background: 'transparent'
    }
  }, children);
}

function CodeSnippet({
  value,
  limitHeight = true,
  language = null,
  transparent = false,
  overflowX = true
}) {
  const [isCollapsed, setIsCollapsed] = useState(limitHeight);
  const [isOverflowing, setIsOverflowing] = useState(language === 'sql');
  const ref = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    if (ref.current) {
      setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight);
    }
  }, [ref.current, isCollapsed, value, limitHeight]);

  function handleClick(event) {
    var _window$getSelection;

    // Triple click means select all
    if (event.detail === 3) {
      selectAll();
      return;
    }

    if (!isOverflowing) {
      return;
    } // Ignore click even when selecting expanded code.


    if (!isCollapsed && (_window$getSelection = window.getSelection()) != null && _window$getSelection.toString().length || 0 > 0) {
      return;
    }

    setIsCollapsed(!isCollapsed);
  }

  function selectAll() {
    const range = document.createRange();
    range.selectNodeContents(containerRef.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return React__default.createElement("div", {
    ref: containerRef,
    className: `
                ${isOverflowing ? 'cursor-pointer' : ''}
                ${transparent ? '' : '~bg-gray-500/5'}
                group py-2`,
    onClick: handleClick
  }, React__default.createElement("div", {
    className: `${overflowX ? 'mask-fade-x' : ''}`
  }, language === 'sql' && React__default.createElement(React__default.Fragment, null, isCollapsed ? React__default.createElement("pre", {
    className: `pl-4 ${overflowX ? 'overflow-x-scroll scrollbar-hidden-x pr-12' : 'truncate pr-8'}`
  }, React__default.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, React__default.createElement(HighlightedCode, {
    language: "sql"
  }, value))) : React__default.createElement("pre", {
    className: `pl-4 ${overflowX ? 'overflow-x-scroll scrollbar-hidden-x pr-12' : 'pr-8'}`
  }, React__default.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, React__default.createElement(HighlightedCode, {
    language: "sql"
  }, sqlFormatter$1.format(value, {
    language: 'mysql'
  }))))), language !== 'sql' && React__default.createElement("pre", {
    ref: ref,
    className: `
                            pl-4
                            ${isOverflowing ? 'mask-fade-y -mb-2' : ''}
                            ${isCollapsed ? 'overflow-y-hidden max-h-32' : ''}
                            ${overflowX ? 'overflow-x-scroll scrollbar-hidden-x pr-12' : 'pr-8'}
                        `
  }, React__default.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, language ? React__default.createElement(HighlightedCode, {
    language: language
  }, value) : value))), React__default.createElement(CopyButton, {
    className: "absolute top-2 right-3",
    value: value
  }), isOverflowing && React__default.createElement(RoundedButton, {
    onClick: () => setIsCollapsed(!isCollapsed),
    className: "\n                        absolute -bottom-3 left-1/2 -translate-x-1/2\n                        opacity-0 group-hover:opacity-100 scale-80 group-hover:scale-100 delay-100\n                    "
  }, React__default.createElement(FontAwesomeIcon, {
    icon: faAngleDown,
    className: `transition-transform duration-300 transform ${isCollapsed ? '' : 'rotate-180'}`
  })));
}

function FormattedExceptionMessage({
  message,
  exceptionClass,
  className = ''
}) {
  const [cleanedUpMessage, setCleanedUpMessage] = useState(message);
  const [sqlQuery, setSqlQuery] = useState(null);
  useEffect(() => {
    if (exceptionClass === 'Illuminate\\Database\\QueryException' || message.match(/SQLSTATE\[.*\].*\(SQL: .*\)/)) {
      const sqlQueryPattern = /*#__PURE__*/_wrapRegExp(/\(SQL: (.*?)\)($| \(View: .*\)$)/, {
        query: 1
      });

      const [, query] = message.match(sqlQueryPattern) || [];
      setSqlQuery(query);
      setCleanedUpMessage(message.replace(sqlQueryPattern, '$2'));
    }
  }, [message, exceptionClass]);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(ExceptionMessage, {
    message: cleanedUpMessage,
    className: className
  }), sqlQuery && React__default.createElement(CodeSnippet, {
    value: sqlQuery,
    language: "sql"
  }));
}

const _excluded$3 = ["children", "className", "disabled"];
function Button(_ref) {
  let {
    children,
    className = '',
    disabled = false
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$3);

  return React__default.createElement("button", _extends({
    disabled: disabled,
    className: `px-4 h-8 whitespace-nowrap border-b
            text-xs uppercase tracking-wider font-bold rounded-sm
            shadow-md
            transform
            transition-animation
            hover:shadow-lg
            active:shadow-inner
            active:translate-y-px
            ${disabled ? 'opacity-50' : 'opacity-100'}
            ${className}
            `
  }, props), children);
}

function SolutionDescription({
  solution
}) {
  return React__default.createElement("div", {
    className: "grid grid-cols-1 gap-2"
  }, solution.description && React__default.createElement("p", null, solution.description), solution.action_description && React__default.createElement("p", null, solution.action_description), React__default.createElement("ul", {
    className: "grid grid-cols-1 gap-1 text-sm"
  }, Object.entries(solution.links).map(([title, link], index) => React__default.createElement("li", {
    key: index
  }, React__default.createElement("a", {
    href: link,
    target: "_blank",
    className: "underline text-emerald-700 hover:text-emerald-800"
  }, title)))));
}

function SolutionRunner({
  solution
}) {
  const [isRunningSolution, setIsRunningSolution] = useState(false);
  const [wasExecutionSuccessful, setWasExecutionSuccessful] = useState(null);

  async function executeSolution() {
    if (isRunningSolution) {
      return;
    }

    try {
      setIsRunningSolution(true);

      if (!solution.execute_endpoint) {
        return;
      }

      const response = await fetch(solution.execute_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          solution: solution.class,
          parameters: solution.run_parameters
        })
      });
      setWasExecutionSuccessful(response.status >= 200 && response.status < 300);
    } catch (error) {
      console.error(error);
      setWasExecutionSuccessful(false);
    } finally {
      setIsRunningSolution(false);
    }
  }

  function refresh(event) {
    event.preventDefault();
    location.reload();
  }

  return React__default.createElement(React__default.Fragment, null, wasExecutionSuccessful === null && React__default.createElement(React__default.Fragment, null, React__default.createElement(Button, {
    onClick: executeSolution,
    disabled: isRunningSolution,
    className: "mb-4 inline-flex items-center gap-2 bg-emerald-600 border-emerald-500/25 text-white"
  }, isRunningSolution ? React__default.createElement("span", null, "Running...") : React__default.createElement(React__default.Fragment, null, React__default.createElement(FontAwesomeIcon, {
    className: "opacity-50",
    icon: faWrench
  }), solution.run_button_text || 'Run')), React__default.createElement(SolutionDescription, {
    solution: solution
  })), wasExecutionSuccessful === true && React__default.createElement("p", {
    className: ""
  }, "The solution was executed ", React__default.createElement("strong", null, "successfully"), ".", React__default.createElement("br", null), React__default.createElement("a", {
    href: "#",
    className: "mt-2 inline-flex items-center gap-2 underline text-emerald-700 hover:text-emerald-800",
    onClick: refresh
  }, React__default.createElement(FontAwesomeIcon, {
    icon: faRedoAlt,
    className: "text-sm opacity-50"
  }), "Refresh now")), wasExecutionSuccessful === false && React__default.createElement(React__default.Fragment, null, React__default.createElement("p", {
    className: "bg-red-200 px-4 py-2"
  }, "Something ", React__default.createElement("strong", null, "went wrong"), ". Please try refreshing the page and try again.", React__default.createElement("br", null), React__default.createElement("a", {
    href: "#",
    className: "mt-2 inline-flex items-center gap-2 underline text-red-700 hover:text-red-800",
    onClick: refresh
  }, React__default.createElement(FontAwesomeIcon, {
    icon: faRedoAlt,
    className: "text-sm opacity-50"
  }), "Refresh now"))));
}

function Solution({
  solution,
  isOpen: initialIsOpen = false,
  isCollapsible = true,
  canExecute = false
}) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  return React__default.createElement("section", null, React__default.createElement("header", {
    className: "group mb-4"
  }, isCollapsible ? React__default.createElement("button", {
    className: "flex items-center justify-start",
    onClick: () => {
      setIsOpen(!isOpen);
    }
  }, React__default.createElement("span", {
    className: "w-6 -ml-6"
  }, React__default.createElement(FontAwesomeIcon, {
    icon: faAngleDown,
    className: `group-hover:opacity-50 opacity-0 text-sm transform transition ${isOpen ? '' : '-rotate-90'}`
  })), React__default.createElement("h2", {
    className: "min-w-0 truncate font-semibold leading-snug"
  }, solution.title)) : React__default.createElement("h2", {
    className: "truncate font-semibold leading-snug"
  }, solution.title)), React__default.createElement("div", {
    className: `${isOpen ? '' : 'hidden'}`
  }, solution.is_runnable && canExecute ? React__default.createElement(SolutionRunner, {
    solution: solution
  }) : React__default.createElement(SolutionDescription, {
    solution: solution
  })));
}

function Solutions() {
  const {
    solutions
  } = useContext(ErrorOccurrenceContext);
  const [canExecuteSolutions, setCanExecuteSolutions] = useState(false);
  const [showSolutions, setShowSolutions] = useState(true);
  useEffect(() => {
    try {
      (async () => {
        var _solutions$;

        if (!((_solutions$ = solutions[0]) != null && _solutions$.execute_endpoint)) {
          return;
        }

        const healthCheck = await (await fetch(solutions[0].execute_endpoint.replace('execute-solution', 'health-check'))).json();
        setCanExecuteSolutions(healthCheck.can_execute_commands); // TODO: rename to can_execute_solutions (in laravel-ignition as well)
      })();
    } catch (error) {
      console.error(error);
      setCanExecuteSolutions(false);
    }
  }, []);
  return React__default.createElement(React__default.Fragment, null, showSolutions ? React__default.createElement("aside", {
    id: "solution",
    className: "flex flex-col lg:w-2/5 flex-none"
  }, React__default.createElement("div", {
    className: "flex-grow px-6 sm:px-10 py-8 bg-emerald-300 text-gray-800"
  }, React__default.createElement("button", {
    onClick: () => setShowSolutions(false),
    className: "absolute top-3 right-4 leading-none text-emerald-500 hover:text-emerald-700 text-sm"
  }, React__default.createElement(FontAwesomeIcon, {
    icon: faTimes
  })), solutions.map((solution, index) => React__default.createElement("div", {
    key: index
  }, React__default.createElement(Solution, {
    solution: solution,
    canExecute: canExecuteSolutions,
    isOpen: index === 0,
    isCollapsible: solutions.length > 1
  }), index !== solutions.length - 1 && React__default.createElement("hr", {
    className: "my-4 border-t border-gray-800/20"
  }))))) : React__default.createElement("button", {
    onClick: () => setShowSolutions(true),
    className: "\n        absolute -top-3 -right-3 z-20\n        w-6 h-6 rounded-full flex items-center justify-center\n        text-xs bg-emerald-500 text-white hover:shadow-lg\n        shadow-md\n        active:shadow-sm active:translate-y-px"
  }, React__default.createElement(FontAwesomeIcon, {
    icon: faLightbulb
  })));
}

var faLaravel={prefix:'fab',iconName:'laravel',icon:[512,512,[],"f3bd","M504.4 115.8a5.72 5.72 0 0 0 -.28-.68 8.52 8.52 0 0 0 -.53-1.25 6 6 0 0 0 -.54-.71 9.36 9.36 0 0 0 -.72-.94c-.23-.22-.52-.4-.77-.6a8.84 8.84 0 0 0 -.9-.68L404.4 55.55a8 8 0 0 0 -8 0L300.1 111h0a8.07 8.07 0 0 0 -.88 .69 7.68 7.68 0 0 0 -.78 .6 8.23 8.23 0 0 0 -.72 .93c-.17 .24-.39 .45-.54 .71a9.7 9.7 0 0 0 -.52 1.25c-.08 .23-.21 .44-.28 .68a8.08 8.08 0 0 0 -.28 2.08V223.2l-80.22 46.19V63.44a7.8 7.8 0 0 0 -.28-2.09c-.06-.24-.2-.45-.28-.68a8.35 8.35 0 0 0 -.52-1.24c-.14-.26-.37-.47-.54-.72a9.36 9.36 0 0 0 -.72-.94 9.46 9.46 0 0 0 -.78-.6 9.8 9.8 0 0 0 -.88-.68h0L115.6 1.07a8 8 0 0 0 -8 0L11.34 56.49h0a6.52 6.52 0 0 0 -.88 .69 7.81 7.81 0 0 0 -.79 .6 8.15 8.15 0 0 0 -.71 .93c-.18 .25-.4 .46-.55 .72a7.88 7.88 0 0 0 -.51 1.24 6.46 6.46 0 0 0 -.29 .67 8.18 8.18 0 0 0 -.28 2.1v329.7a8 8 0 0 0 4 6.95l192.5 110.8a8.83 8.83 0 0 0 1.33 .54c.21 .08 .41 .2 .63 .26a7.92 7.92 0 0 0 4.1 0c.2-.05 .37-.16 .55-.22a8.6 8.6 0 0 0 1.4-.58L404.4 400.1a8 8 0 0 0 4-6.95V287.9l92.24-53.11a8 8 0 0 0 4-7V117.9A8.63 8.63 0 0 0 504.4 115.8zM111.6 17.28h0l80.19 46.15-80.2 46.18L31.41 63.44zm88.25 60V278.6l-46.53 26.79-33.69 19.4V123.5l46.53-26.79zm0 412.8L23.37 388.5V77.32L57.06 96.7l46.52 26.8V338.7a6.94 6.94 0 0 0 .12 .9 8 8 0 0 0 .16 1.18h0a5.92 5.92 0 0 0 .38 .9 6.38 6.38 0 0 0 .42 1v0a8.54 8.54 0 0 0 .6 .78 7.62 7.62 0 0 0 .66 .84l0 0c.23 .22 .52 .38 .77 .58a8.93 8.93 0 0 0 .86 .66l0 0 0 0 92.19 52.18zm8-106.2-80.06-45.32 84.09-48.41 92.26-53.11 80.13 46.13-58.8 33.56zm184.5 4.57L215.9 490.1V397.8L346.6 323.2l45.77-26.15zm0-119.1L358.7 250l-46.53-26.79V131.8l33.69 19.4L392.4 178zm8-105.3-80.2-46.17 80.2-46.16 80.18 46.15zm8 105.3V178L455 151.2l33.68-19.4v91.39h0z"]};

function ExceptionSelector() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);

  {
    return React__default.createElement("span", {
      className: "py-1 px-4 items-center flex gap-3 rounded-sm ~bg-gray-500/5"
    }, React__default.createElement(RelaxedFullyQualifiedClassName, {
      path: errorOccurrence.exception_class
    }));
  }
}

function ErrorBoundaryCard({
  githubLink
}) {
  return React__default.createElement("section", {
    className: "flex flex-col flex-grow px-6 sm:px-10 py-8 bg-red-600 text-red-100 shadow-lg gap-3"
  }, React__default.createElement("h2", {
    className: "text-xl font-semibold leading-snug"
  }, "Something went wrong in Ignition!"), React__default.createElement("p", {
    className: "text-base"
  }, "An error occurred in Ignition's UI. Please open an issue on", ' ', React__default.createElement("a", {
    href: githubLink,
    target: "_blank",
    className: "underline"
  }, "the Ignition GitHub repo"), ' ', "and make sure to include any errors or warnings in the developer console."));
}

class ErrorBoundary extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error: error
    };
  }

  render() {
    const {
      error
    } = this.state;

    if (error) {
      var _this$props$fallbackC, _this$props;

      let githubLink = 'https://github.com/spatie/ignition/issues';

      if (error instanceof Error) {
        const title = `${error.name}: ${error.message}`;
        const body = `
**Please include some context and the contents of the console in your browser's developer tools.**

## JavaScript Error
\`\`\`
${error.stack}
\`\`\`

## Reproduction Steps
Please tell us what you were doing when this error occurred, so we can more easily debug it and find a solution.

1. …

## User Agent
\`\`\`
${navigator.userAgent}
\`\`\`
`;
        githubLink = `https://github.com/spatie/ignition/issues/new?title=${title}&labels=bug&body=${encodeURIComponent(body)}`;
      }

      return ((_this$props$fallbackC = (_this$props = this.props).fallbackComponent) == null ? void 0 : _this$props$fallbackC.call(_this$props, githubLink)) || React__default.createElement(ErrorBoundaryCard, {
        githubLink: githubLink
      });
    }

    return this.props.children;
  }

}

function ErrorCard() {
  var _errorOccurrence$cont;

  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const hasSolutions = errorOccurrence.solutions.length > 0;
  const isLaravelError = !!((_errorOccurrence$cont = errorOccurrence.context_items.env) != null && _errorOccurrence$cont.laravel_version);
  return React__default.createElement(ErrorBoundary, null, React__default.createElement("section", {
    className: "lg:flex items-stretch bg-white dark:shadow-none dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20"
  }, React__default.createElement("main", {
    id: "exception",
    className: "z-10 flex-grow min-w-0"
  }, React__default.createElement("div", {
    className: "overflow-hidden"
  }, React__default.createElement("div", {
    className: "px-6 sm:px-10 py-8 overflow-x-auto"
  }, React__default.createElement("header", {
    className: "flex items-center justify-between gap-2"
  }, React__default.createElement(ExceptionSelector, null), React__default.createElement("div", {
    className: "grid grid-flow-col justify-end gap-4 text-sm ~text-gray-500"
  }, React__default.createElement("span", null, React__default.createElement("span", {
    className: "tracking-wider"
  }, "PHP"), "\u00A0", errorOccurrence.language_version), errorOccurrence.framework_version && React__default.createElement("span", {
    className: "inline-flex items-center gap-1"
  }, React__default.createElement(FontAwesomeIcon, {
    icon: isLaravelError ? faLaravel : faCodeBranch
  }), errorOccurrence.framework_version))), React__default.createElement(FormattedExceptionMessage, {
    exceptionClass: errorOccurrence.exception_class,
    message: errorOccurrence.exception_message
  })))), hasSolutions && React__default.createElement(Solutions, null)));
}

function ErrorBoundarySection({
  className = '',
  githubLink
}) {
  return React__default.createElement("div", {
    className: `${className} flex flex-col gap-2 bg-red-50 dark:bg-red-500/10 px-6 py-4`
  }, React__default.createElement("h2", {
    className: "font-semibold leading-snug"
  }, "Something went wrong in Ignition!"), React__default.createElement("p", {
    className: "text-base"
  }, "An error occurred in Ignition's UI. Please open an issue on", ' ', React__default.createElement("a", {
    href: githubLink,
    target: "_blank",
    className: "underline"
  }, "the Ignition GitHub repo"), ' ', "and make sure to include any errors or warnings in the developer console."));
}

function ContextGroup({
  title,
  children,
  anchor
}) {
  return React__default.createElement("section", {
    className: "py-10 ~bg-white px-6 sm:px-10 min-w-0"
  }, React__default.createElement("a", {
    id: `context-${anchor}`,
    className: "scroll-target"
  }), React__default.createElement("h2", {
    className: "font-bold text-xs ~text-gray-500 uppercase tracking-wider"
  }, title), React__default.createElement("div", {
    className: "mt-3 grid grid-cols-1 gap-10"
  }, React__default.createElement(ErrorBoundary, {
    fallbackComponent: githubLink => React__default.createElement(ErrorBoundarySection, {
      githubLink: githubLink
    })
  }, children)));
}

var observerMap = new Map();
var RootIds = new WeakMap();
var rootId = 0;
var unsupportedValue = undefined;
/**
 * Generate a unique ID for the root element
 * @param root
 */


function getRootId(root) {
  if (!root) return '0';
  if (RootIds.has(root)) return RootIds.get(root);
  rootId += 1;
  RootIds.set(root, rootId.toString());
  return RootIds.get(root);
}
/**
 * Convert the options to a string Id, based on the values.
 * Ensures we can reuse the same observer when observing elements with the same options.
 * @param options
 */


function optionsToId(options) {
  return Object.keys(options).sort().filter(function (key) {
    return options[key] !== undefined;
  }).map(function (key) {
    return key + "_" + (key === 'root' ? getRootId(options.root) : options[key]);
  }).toString();
}

function createObserver(options) {
  // Create a unique ID for this observer instance, based on the root, root margin and threshold.
  var id = optionsToId(options);
  var instance = observerMap.get(id);

  if (!instance) {
    // Create a map of elements this observer is going to observe. Each element has a list of callbacks that should be triggered, once it comes into view.
    var elements = new Map();
    var thresholds;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var _elements$get; // While it would be nice if you could just look at isIntersecting to determine if the component is inside the viewport, browsers can't agree on how to use it.
        // -Firefox ignores `threshold` when considering `isIntersecting`, so it will never be false again if `threshold` is > 0


        var inView = entry.isIntersecting && thresholds.some(function (threshold) {
          return entry.intersectionRatio >= threshold;
        }); // @ts-ignore support IntersectionObserver v2

        if (options.trackVisibility && typeof entry.isVisible === 'undefined') {
          // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.
          // @ts-ignore
          entry.isVisible = inView;
        }

        (_elements$get = elements.get(entry.target)) == null ? void 0 : _elements$get.forEach(function (callback) {
          callback(inView, entry);
        });
      });
    }, options); // Ensure we have a valid thresholds array. If not, use the threshold from the options

    thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);
    instance = {
      id: id,
      observer: observer,
      elements: elements
    };
    observerMap.set(id, instance);
  }

  return instance;
}
/**
 * @param element - DOM Element to observe
 * @param callback - Callback function to trigger when intersection status changes
 * @param options - Intersection Observer options
 * @param fallbackInView - Fallback inView value.
 * @return Function - Cleanup function that should be triggered to unregister the observer
 */


function observe(element, callback, options, fallbackInView) {
  if (options === void 0) {
    options = {};
  }

  if (fallbackInView === void 0) {
    fallbackInView = unsupportedValue;
  }

  if (typeof window.IntersectionObserver === 'undefined' && fallbackInView !== undefined) {
    var bounds = element.getBoundingClientRect();
    callback(fallbackInView, {
      isIntersecting: fallbackInView,
      target: element,
      intersectionRatio: typeof options.threshold === 'number' ? options.threshold : 0,
      time: 0,
      boundingClientRect: bounds,
      intersectionRect: bounds,
      rootBounds: bounds
    });
    return function () {// Nothing to cleanup
    };
  } // An observer with the same options can be reused, so lets use this fact


  var _createObserver = createObserver(options),
      id = _createObserver.id,
      observer = _createObserver.observer,
      elements = _createObserver.elements; // Register the callback listener for this element


  var callbacks = elements.get(element) || [];

  if (!elements.has(element)) {
    elements.set(element, callbacks);
  }

  callbacks.push(callback);
  observer.observe(element);
  return function unobserve() {
    // Remove the callback from the callback list
    callbacks.splice(callbacks.indexOf(callback), 1);

    if (callbacks.length === 0) {
      // No more callback exists for element, so destroy it
      elements["delete"](element);
      observer.unobserve(element);
    }

    if (elements.size === 0) {
      // No more elements are being observer by this instance, so destroy it
      observer.disconnect();
      observerMap["delete"](id);
    }
  };
}
/**
 * React Hooks make it easy to monitor the `inView` state of your components. Call
 * the `useInView` hook with the (optional) [options](#options) you need. It will
 * return an array containing a `ref`, the `inView` status and the current
 * [`entry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry).
 * Assign the `ref` to the DOM element you want to monitor, and the hook will
 * report the status.
 *
 * @example
 * ```jsx
 * import React from 'react';
 * import { useInView } from 'react-intersection-observer';
 *
 * const Component = () => {
 *   const { ref, inView, entry } = useInView({
 *       threshold: 0,
 *   });
 *
 *   return (
 *     <div ref={ref}>
 *       <h2>{`Header inside viewport ${inView}.`}</h2>
 *     </div>
 *   );
 * };
 * ```
 */

function useInView(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      threshold = _ref.threshold,
      delay = _ref.delay,
      trackVisibility = _ref.trackVisibility,
      rootMargin = _ref.rootMargin,
      root = _ref.root,
      triggerOnce = _ref.triggerOnce,
      skip = _ref.skip,
      initialInView = _ref.initialInView,
      fallbackInView = _ref.fallbackInView;

  var unobserve = React.useRef();

  var _React$useState = React.useState({
    inView: !!initialInView
  }),
      state = _React$useState[0],
      setState = _React$useState[1];

  var setRef = React.useCallback(function (node) {
    if (unobserve.current !== undefined) {
      unobserve.current();
      unobserve.current = undefined;
    } // Skip creating the observer


    if (skip) return;

    if (node) {
      unobserve.current = observe(node, function (inView, entry) {
        setState({
          inView: inView,
          entry: entry
        });

        if (entry.isIntersecting && triggerOnce && unobserve.current) {
          // If it should only trigger once, unobserve the element after it's inView
          unobserve.current();
          unobserve.current = undefined;
        }
      }, {
        root: root,
        rootMargin: rootMargin,
        threshold: threshold,
        // @ts-ignore
        trackVisibility: trackVisibility,
        // @ts-ignore
        delay: delay
      }, fallbackInView);
    }
  }, // We break the rule here, because we aren't including the actual `threshold` variable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [// If the threshold is an array, convert it to a string so it won't change between renders.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  Array.isArray(threshold) ? threshold.toString() : threshold, root, rootMargin, triggerOnce, skip, trackVisibility, fallbackInView, delay]);
  /* eslint-disable-next-line */

  useEffect(function () {
    if (!unobserve.current && state.entry && !triggerOnce && !skip) {
      // If we don't have a ref, then reset the state (unless the hook is set to only `triggerOnce` or `skip`)
      // This ensures we correctly reflect the current state - If you aren't observing anything, then nothing is inView
      setState({
        inView: !!initialInView
      });
    }
  });
  var result = [setRef, state.inView, state.entry]; // Support object destructuring, by adding the specific values.

  result.ref = result[0];
  result.inView = result[1];
  result.entry = result[2];
  return result;
}

var InViewContext = createContext({
  inView: [],
  setInView: noop_1
});

function useSectionInView(sectionName) {
  const {
    setInView
  } = useContext(InViewContext);
  const {
    ref: intersectionRef,
    inView: isInView
  } = useInView({
    rootMargin: '-45% 0px -45%'
  });
  useEffect(() => {
    if (isInView) {
      setInView(inView => [...inView, sectionName]);
    } else {
      setInView(inView => inView.filter(v => v !== sectionName));
    }
  }, [isInView]);
  return intersectionRef;
}

function ContextSection({
  icon,
  title,
  children,
  anchor
}) {
  const ref = useSectionInView(title);
  return React__default.createElement("div", {
    ref: ref
  }, React__default.createElement("a", {
    id: `context-${anchor}`,
    className: "scroll-target"
  }), React__default.createElement("h1", {
    className: "mb-2 flex items-center gap-2 font-semibold text-lg ~text-indigo-600"
  }, title, React__default.createElement("span", {
    className: "opacity-50 ~text-indigo-600 text-sm"
  }, icon)), React__default.createElement(ErrorBoundary, {
    fallbackComponent: githubLink => React__default.createElement(ErrorBoundarySection, {
      githubLink: githubLink
    })
  }, children));
}

function Tag({
  children,
  className = '',
  color = 'gray'
}) {
  const tagColors = {
    red: '~text-red-600 border-red-500/50',
    orange: '~text-orange-600 border-orange-500/50',
    green: '~text-emerald-600 border-emerald-500/50',
    blue: '~text-indigo-600 border-indigo-500/50',
    purple: '~text-violet-600 border-violet-600/50',
    gray: '~text-gray-500 border-gray-500/50'
  }[color];
  return React__default.createElement("div", {
    className: `${className} ${tagColors} px-1.5 py-0.5 rounded-sm bg-opacity-20 border text-xs font-medium uppercase tracking-wider`
  }, children);
}

function Request({
  request,
  requestData,
  headers
}) {
  const curl = useMemo(() => curlCommand(request, requestData, headers), [request, requestData, headers]);
  return React__default.createElement("div", null, React__default.createElement("div", {
    className: "text-lg font-semibold flex items-center gap-2"
  }, React__default.createElement("span", {
    className: "~text-indigo-600"
  }, request.url), React__default.createElement(Tag, {
    color: request.method.toUpperCase() == 'DELETE' ? 'red' : 'blue'
  }, request.method.toUpperCase())), curl && React__default.createElement("div", {
    className: "mt-2"
  }, React__default.createElement(CodeSnippet, {
    value: curl,
    language: "curl"
  })));
}

const _excluded$2 = ["children", "className"];
function DefinitionList(_ref) {
  let {
    children,
    className = ''
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  if (!children) {
    return null;
  }

  return React__default.createElement("dl", _extends({
    className: `grid grid-cols-1 gap-2 ${className}`
  }, props), children);
}
DefinitionList.Row = DefinitionListRow;

function DefinitionListRow({
  value = '',
  label = '',
  className = '',
  stacked = false
}) {
  let valueOutput = value;
  const [expandLabel, setExpandLabel] = useState(false);
  let timeout;

  function startExpandLabel() {
    timeout = setTimeout(() => setExpandLabel(true), 500);
  }

  function stopExpandLabel() {
    clearTimeout(timeout);
    setExpandLabel(false);
  }

  if (React__default.isValidElement(value)) {
    valueOutput = value;
  } else if (typeof value === 'boolean') {
    valueOutput = React__default.createElement("span", {
      className: `${value ? 'text-emerald-500 bg-emerald-500/5' : 'text-red-500 bg-red-800/5'} text-sm px-3 py-2 inline-flex gap-2 items-center justify-center`
    }, React__default.createElement(FontAwesomeIcon, {
      className: `${value} ? 'text-emerald-500' : 'text-red-500`,
      icon: value ? faCheck : faTimes
    }), React__default.createElement("span", {
      className: "font-mono"
    }, value ? 'true' : 'false'));
  } else if (typeof value === 'object') {
    valueOutput = React__default.createElement(CodeSnippet, {
      value: jsonStringify(value),
      language: "json"
    });
  } else if (typeof value === 'string') {
    valueOutput = React__default.createElement(CodeSnippet, {
      value: value
    });
  } else if (typeof value === 'number') {
    valueOutput = React__default.createElement(CodeSnippet, {
      value: String(value)
    });
  }

  return React__default.createElement("div", {
    className: `${stacked ? 'flex flex-col' : 'flex items-baseline gap-10'}  ${className}`
  }, React__default.createElement("dt", {
    className: `
                ${stacked ? 'self-start pt-2 pb-1.5 leading-tight' : expandLabel ? 'flex-grow truncate min-w-[8rem] max-w-max' : 'flex-none truncate w-32'}
            `,
    onMouseOver: () => {
      startExpandLabel();
    },
    onMouseOut: () => {
      stopExpandLabel();
    }
  }, label), React__default.createElement("dd", {
    className: "flex-grow min-w-0"
  }, valueOutput));
}

function ContextList({
  items
}) {
  return React__default.createElement(DefinitionList, null, Object.entries(items || {}).map(([key, value]) => React__default.createElement(DefinitionList.Row, {
    key: key,
    label: key,
    value: value
  })));
}

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

var isNil_1 = isNil;

/** `Object#toString` result references. */

var mapTag = '[object Map]',
    setTag = '[object Set]';
/** Used for built-in method references. */

var objectProto$2 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */

function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (isArrayLike_1(value) && (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer_1$1(value) || isTypedArray_1(value) || isArguments_1(value))) {
    return !value.length;
  }

  var tag = _getTag(value);

  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }

  if (_isPrototype(value)) {
    return !_baseKeys(value).length;
  }

  for (var key in value) {
    if (hasOwnProperty$2.call(value, key)) {
      return false;
    }
  }

  return true;
}

var isEmpty_1 = isEmpty;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';
/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 *
 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
 * // => [1, 3, 5]
 */

function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  return function () {
    var args = arguments;

    switch (args.length) {
      case 0:
        return !predicate.call(this);

      case 1:
        return !predicate.call(this, args[0]);

      case 2:
        return !predicate.call(this, args[0], args[1]);

      case 3:
        return !predicate.call(this, args[0], args[1], args[2]);
    }

    return !predicate.apply(this, args);
  };
}

var negate_1 = negate;

/** Used for built-in method references. */

var objectProto$1 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function assignValue(object, key, value) {
  var objValue = object[key];

  if (!(hasOwnProperty$1.call(object, key) && eq_1(objValue, value)) || value === undefined && !(key in object)) {
    _baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue;

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */

function baseSet(object, path, value, customizer) {
  if (!isObject_1(object)) {
    return object;
  }

  path = _castPath(path, object);
  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = _toKey(path[index]),
        newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;

      if (newValue === undefined) {
        newValue = isObject_1(objValue) ? objValue : _isIndex(path[index + 1]) ? [] : {};
      }
    }

    _assignValue(nested, key, newValue);
    nested = nested[key];
  }

  return object;
}

var _baseSet = baseSet;

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */

function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = _baseGet(object, path);

    if (predicate(value, path)) {
      _baseSet(result, _castPath(path, object), value);
    }
  }

  return result;
}

var _basePickBy = basePickBy;

/** Built-in value references. */

var getPrototype = _overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype;

/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbolsIn = !nativeGetSymbols ? stubArray_1 : function (object) {
  var result = [];

  while (object) {
    _arrayPush(result, _getSymbols(object));
    object = _getPrototype(object);
  }

  return result;
};
var _getSymbolsIn = getSymbolsIn;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];

  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }

  return result;
}

var _nativeKeysIn = nativeKeysIn;

/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }

  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }

  return result;
}

var _baseKeysIn = baseKeysIn;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */

function keysIn(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

var keysIn_1 = keysIn;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */

function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn;

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pickBy(object, _.isNumber);
 * // => { 'a': 1, 'c': 3 }
 */

function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }

  var props = _arrayMap(_getAllKeysIn(object), function (prop) {
    return [prop];
  });
  predicate = _baseIteratee(predicate);
  return _basePickBy(object, props, function (value, path) {
    return predicate(value, path[0]);
  });
}

var pickBy_1 = pickBy;

/**
 * The opposite of `_.pickBy`; this method creates an object composed of
 * the own and inherited enumerable string keyed properties of `object` that
 * `predicate` doesn't return truthy for. The predicate is invoked with two
 * arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omitBy(object, _.isNumber);
 * // => { 'b': '2' }
 */

function omitBy(object, predicate) {
  return pickBy_1(object, negate_1(_baseIteratee(predicate)));
}

var omitBy_1 = omitBy;

function Headers({
  headers
}) {
  let filteredHeaders = omitBy_1(headers, isNil_1);
  filteredHeaders = omitBy_1(filteredHeaders, isEmpty_1);
  return React__default.createElement(ContextList, {
    items: filteredHeaders
  });
}

function QueryString({
  requestData
}) {
  return React__default.createElement(ContextList, {
    items: requestData.queryString || {}
  });
}

function Body() {
  var _errorOccurrence$cont, _errorOccurrence$cont2;

  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const body = (_errorOccurrence$cont = errorOccurrence.context_items) == null ? void 0 : (_errorOccurrence$cont2 = _errorOccurrence$cont.request_data) == null ? void 0 : _errorOccurrence$cont2.body;

  if (!body) {
    return null;
  }

  return React__default.createElement(CodeSnippet, {
    value: jsonStringify(body)
  });
}

function Files() {
  var _errorOccurrence$cont, _errorOccurrence$cont2;

  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const files = (_errorOccurrence$cont = errorOccurrence.context_items) == null ? void 0 : (_errorOccurrence$cont2 = _errorOccurrence$cont.request_data) == null ? void 0 : _errorOccurrence$cont2.files;

  if (!files) {
    return null;
  }

  return React__default.createElement("div", {
    className: "col-span-2"
  }, React__default.createElement(CodeSnippet, {
    value: jsonStringify(files)
  }));
}

function Session({
  session
}) {
  return React__default.createElement(ContextList, {
    items: session
  });
}

function Cookies({
  cookies
}) {
  return React__default.createElement(ContextList, {
    items: cookies
  });
}

function LivewireData() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const livewire = errorOccurrence.context_items.livewire;

  if (!livewire) {
    return null;
  }

  return React__default.createElement(ContextList, {
    items: livewire.data
  });
}

function LivewireComponent() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const livewire = errorOccurrence.context_items.livewire;

  if (!livewire) {
    return null;
  }

  return React__default.createElement(ContextList, {
    items: {
      Component: livewire.component_class,
      Alias: livewire.component_alias,
      ID: livewire.component_id
    }
  });
}

function LivewireUpdates() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const livewire = errorOccurrence.context_items.livewire;

  if (!livewire) {
    return null;
  }

  return React__default.createElement(DefinitionList, null, livewire.updates.map(({
    payload,
    type
  }, index) => React__default.createElement(DefinitionList.Row, {
    key: index,
    label: type,
    value: payload
  })));
}

const _excluded$1 = ["children", "className"];
function UnorderedList(_ref) {
  let {
    children,
    className = ''
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  return React__default.createElement(React__default.Fragment, null, children && React__default.createElement("ul", _extends({
    className: `gap-y-2 flex flex-col ${className}`
  }, props), children));
}
UnorderedList.Item = UnorderedListItem;

function UnorderedListItem({
  value = ''
}) {
  let valueOutput = value;

  if (React__default.isValidElement(value)) {
    valueOutput = value;
  } else if (typeof value === 'object') {
    valueOutput = React__default.createElement(CodeSnippet, {
      value: jsonStringify(value),
      language: "json"
    });
  } else if (typeof value === 'string') {
    valueOutput = React__default.createElement(CodeSnippet, {
      value: value
    });
  }

  return React__default.createElement("li", null, valueOutput);
}

function Routing({
  route
}) {
  var _route$routeParameter;

  return React__default.createElement(DefinitionList, null, React__default.createElement(DefinitionList.Row, {
    value: route.controllerAction,
    label: "Controller"
  }), route.route && React__default.createElement(DefinitionList.Row, {
    value: route.route,
    label: "Route name"
  }), !!((_route$routeParameter = route.routeParameters) != null && _route$routeParameter.length) && React__default.createElement(DefinitionList.Row, {
    value: React__default.createElement(DefinitionList, null, Object.entries(route.routeParameters).map(([key, parameter]) => React__default.createElement(DefinitionList.Row, {
      stacked: true,
      key: key,
      label: key,
      value: parameter
    }))),
    label: "Route parameters"
  }), route.middleware && React__default.createElement(DefinitionList.Row, {
    value: React__default.createElement(UnorderedList, null, (route.middleware || []).map((middleware, i) => React__default.createElement(UnorderedList.Item, {
      key: i,
      value: middleware
    }))),
    label: "Middleware"
  }));
}

const _excluded = ["value"];
function SfDump(_ref) {
  let {
    value
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  useEffect(() => {
    const match = value.match(/sf-dump-\d+/);

    if (!match) {
      return;
    } // @ts-ignore


    window.Sfdump(match[0]);
  }, [value]);
  return React__default.createElement("div", _extends({
    className: "~bg-gray-500/5 px-4 py-2",
    dangerouslySetInnerHTML: {
      __html: value
    }
  }, props));
}

function View() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const view = errorOccurrence.context_items.view;

  if (!view) {
    return null;
  }

  return React__default.createElement(DefinitionList, null, React__default.createElement(DefinitionList.Row, {
    value: React__default.createElement(EditorLink, {
      path: view.view
    }),
    label: "View"
  }), view.data && React__default.createElement(DefinitionList.Row, {
    value: React__default.createElement(DefinitionList, null, Object.entries(view.data).map(([key, data]) => React__default.createElement(DefinitionList.Row, {
      stacked: true,
      key: key,
      label: key,
      value: React__default.createElement(SfDump, {
        value: data
      })
    }))),
    label: "Data"
  }));
}

var crypt = createCommonjsModule(function (module) {
  (function () {
    var base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        crypt = {
      // Bit-wise rotation left
      rotl: function (n, b) {
        return n << b | n >>> 32 - b;
      },
      // Bit-wise rotation right
      rotr: function (n, b) {
        return n << 32 - b | n >>> b;
      },
      // Swap big-endian to little-endian and vice versa
      endian: function (n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
        } // Else, assume array and swap all items


        for (var i = 0; i < n.length; i++) n[i] = crypt.endian(n[i]);

        return n;
      },
      // Generate an array of any length of random bytes
      randomBytes: function (n) {
        for (var bytes = []; n > 0; n--) bytes.push(Math.floor(Math.random() * 256));

        return bytes;
      },
      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function (bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) words[b >>> 5] |= bytes[i] << 24 - b % 32;

        return words;
      },
      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function (words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8) bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);

        return bytes;
      },
      // Convert a byte array to a hex string
      bytesToHex: function (bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }

        return hex.join('');
      },
      // Convert a hex string to a byte array
      hexToBytes: function (hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));

        return bytes;
      },
      // Convert a byte array to a base-64 string
      bytesToBase64: function (bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];

          for (var j = 0; j < 4; j++) if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push('=');
        }

        return base64.join('');
      },
      // Convert a base-64 string to a byte array
      base64ToBytes: function (base64) {
        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

        for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
          if (imod4 == 0) continue;
          bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
        }

        return bytes;
      }
    };
    module.exports = crypt;
  })();
});

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function (str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },
    // Convert a byte array to a string
    bytesToString: function (bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },
  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function (str) {
      for (var bytes = [], i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i) & 0xFF);

      return bytes;
    },
    // Convert a byte array to a string
    bytesToString: function (bytes) {
      for (var str = [], i = 0; i < bytes.length; i++) str.push(String.fromCharCode(bytes[i]));

      return str.join('');
    }
  }
};
var charenc_1 = charenc;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function isBuffer_1(obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
} // For Node v0.10 support. Remove this eventually.


function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

var md5 = createCommonjsModule(function (module) {
  (function () {
    var crypt$1 = crypt,
        utf8 = charenc_1.utf8,
        isBuffer = isBuffer_1,
        bin = charenc_1.bin,
        // The core
    md5 = function md5(message, options) {
      // Convert to byte array
      if (message.constructor == String) {
        if (options && options.encoding === 'binary') message = bin.stringToBytes(message);else message = utf8.stringToBytes(message);
      } else if (isBuffer(message)) message = Array.prototype.slice.call(message, 0);else if (!Array.isArray(message) && message.constructor !== Uint8Array) message = message.toString(); // else, assume byte array already

      var m = crypt$1.bytesToWords(message),
          l = message.length * 8,
          a = 1732584193,
          b = -271733879,
          c = -1732584194,
          d = 271733878; // Swap endian

      for (var i = 0; i < m.length; i++) {
        m[i] = (m[i] << 8 | m[i] >>> 24) & 0x00FF00FF | (m[i] << 24 | m[i] >>> 8) & 0xFF00FF00;
      } // Padding


      m[l >>> 5] |= 0x80 << l % 32;
      m[(l + 64 >>> 9 << 4) + 14] = l; // Method shortcuts

      var FF = md5._ff,
          GG = md5._gg,
          HH = md5._hh,
          II = md5._ii;

      for (var i = 0; i < m.length; i += 16) {
        var aa = a,
            bb = b,
            cc = c,
            dd = d;
        a = FF(a, b, c, d, m[i + 0], 7, -680876936);
        d = FF(d, a, b, c, m[i + 1], 12, -389564586);
        c = FF(c, d, a, b, m[i + 2], 17, 606105819);
        b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
        a = FF(a, b, c, d, m[i + 4], 7, -176418897);
        d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
        c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
        b = FF(b, c, d, a, m[i + 7], 22, -45705983);
        a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
        d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
        c = FF(c, d, a, b, m[i + 10], 17, -42063);
        b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
        a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
        d = FF(d, a, b, c, m[i + 13], 12, -40341101);
        c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
        b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
        a = GG(a, b, c, d, m[i + 1], 5, -165796510);
        d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
        c = GG(c, d, a, b, m[i + 11], 14, 643717713);
        b = GG(b, c, d, a, m[i + 0], 20, -373897302);
        a = GG(a, b, c, d, m[i + 5], 5, -701558691);
        d = GG(d, a, b, c, m[i + 10], 9, 38016083);
        c = GG(c, d, a, b, m[i + 15], 14, -660478335);
        b = GG(b, c, d, a, m[i + 4], 20, -405537848);
        a = GG(a, b, c, d, m[i + 9], 5, 568446438);
        d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
        c = GG(c, d, a, b, m[i + 3], 14, -187363961);
        b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
        a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
        d = GG(d, a, b, c, m[i + 2], 9, -51403784);
        c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
        b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
        a = HH(a, b, c, d, m[i + 5], 4, -378558);
        d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
        c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
        b = HH(b, c, d, a, m[i + 14], 23, -35309556);
        a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
        d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
        c = HH(c, d, a, b, m[i + 7], 16, -155497632);
        b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
        a = HH(a, b, c, d, m[i + 13], 4, 681279174);
        d = HH(d, a, b, c, m[i + 0], 11, -358537222);
        c = HH(c, d, a, b, m[i + 3], 16, -722521979);
        b = HH(b, c, d, a, m[i + 6], 23, 76029189);
        a = HH(a, b, c, d, m[i + 9], 4, -640364487);
        d = HH(d, a, b, c, m[i + 12], 11, -421815835);
        c = HH(c, d, a, b, m[i + 15], 16, 530742520);
        b = HH(b, c, d, a, m[i + 2], 23, -995338651);
        a = II(a, b, c, d, m[i + 0], 6, -198630844);
        d = II(d, a, b, c, m[i + 7], 10, 1126891415);
        c = II(c, d, a, b, m[i + 14], 15, -1416354905);
        b = II(b, c, d, a, m[i + 5], 21, -57434055);
        a = II(a, b, c, d, m[i + 12], 6, 1700485571);
        d = II(d, a, b, c, m[i + 3], 10, -1894986606);
        c = II(c, d, a, b, m[i + 10], 15, -1051523);
        b = II(b, c, d, a, m[i + 1], 21, -2054922799);
        a = II(a, b, c, d, m[i + 8], 6, 1873313359);
        d = II(d, a, b, c, m[i + 15], 10, -30611744);
        c = II(c, d, a, b, m[i + 6], 15, -1560198380);
        b = II(b, c, d, a, m[i + 13], 21, 1309151649);
        a = II(a, b, c, d, m[i + 4], 6, -145523070);
        d = II(d, a, b, c, m[i + 11], 10, -1120210379);
        c = II(c, d, a, b, m[i + 2], 15, 718787259);
        b = II(b, c, d, a, m[i + 9], 21, -343485551);
        a = a + aa >>> 0;
        b = b + bb >>> 0;
        c = c + cc >>> 0;
        d = d + dd >>> 0;
      }

      return crypt$1.endian([a, b, c, d]);
    }; // Auxiliary functions


    md5._ff = function (a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };

    md5._gg = function (a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };

    md5._hh = function (a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };

    md5._ii = function (a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    }; // Package private blocksize


    md5._blocksize = 16;
    md5._digestsize = 16;

    module.exports = function (message, options) {
      if (message === undefined || message === null) throw new Error('Illegal argument ' + message);
      var digestbytes = crypt$1.wordsToBytes(md5(message, options));
      return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt$1.bytesToHex(digestbytes);
    };
  })();
});

function User({
  user
}) {
  return React__default.createElement(React__default.Fragment, null, user.email && React__default.createElement("div", {
    className: "mb-2 flex items-center gap-3"
  }, React__default.createElement("div", null, React__default.createElement("img", {
    className: "inline-block h-9 w-9 rounded-full",
    alt: user.email,
    src: `https://gravatar.com/avatar/${md5(user.email)}/?s=240`
  })), React__default.createElement("div", {
    className: "leading-tight"
  }, user.name && React__default.createElement("p", {
    className: "font-semibold"
  }, user.name), React__default.createElement("p", {
    className: "text-sm"
  }, user.email))), React__default.createElement(CodeSnippet, {
    value: jsonStringify(user),
    language: "json"
  }));
}

function Alert({
  children,
  className = ''
}) {
  return React__default.createElement("div", {
    className: `${className}`
  }, React__default.createElement("div", {
    className: "flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 px-4 py-2"
  }, React__default.createElement("div", {
    className: "flex-shrink-0",
    "aria-hidden": "true"
  }, React__default.createElement(FontAwesomeIcon, {
    className: "text-yellow-500 ",
    icon: faExclamationTriangle
  })), React__default.createElement("p", {
    className: "text-sm"
  }, children)));
}

/**
 * protocols
 * Returns the protocols of an input url.
 *
 * @name protocols
 * @function
 * @param {String} input The input url.
 * @param {Boolean|Number} first If `true`, the first protocol will be returned. If number, it will represent the zero-based index of the protocols array.
 * @return {Array|String} The array of protocols or the specified protocol.
 */

var lib$2 = function protocols(input, first) {
  if (first === true) {
    first = 0;
  }

  var index = input.indexOf("://"),
      splits = input.substring(0, index).split("+").filter(Boolean);

  if (typeof first === "number") {
    return splits[first];
  }

  return splits;
};

/**
 * isSsh
 * Checks if an input value is a ssh url or not.
 *
 * @name isSsh
 * @function
 * @param {String|Array} input The input url or an array of protocols.
 * @return {Boolean} `true` if the input is a ssh url, `false` otherwise.
 */


function isSsh(input) {
  if (Array.isArray(input)) {
    return input.indexOf("ssh") !== -1 || input.indexOf("rsync") !== -1;
  }

  if (typeof input !== "string") {
    return false;
  }

  var prots = lib$2(input);
  input = input.substring(input.indexOf("://") + 3);

  if (isSsh(prots)) {
    return true;
  } // TODO This probably could be improved :)


  var urlPortPattern = new RegExp('\.([a-zA-Z\\d]+):(\\d+)\/');
  return !input.match(urlPortPattern) && input.indexOf("@") < input.indexOf(":");
}

var lib$1 = isSsh;

var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
  try {
    // Try to decode the entire string first
    return decodeURIComponent(components.join(''));
  } catch (err) {// Do nothing
  }

  if (components.length === 1) {
    return components;
  }

  split = split || 1; // Split the array in 2 parts

  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);

    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join('');
      tokens = input.match(singleMatcher);
    }

    return input;
  }
}

function customDecodeURIComponent(input) {
  // Keep track of all the replacements and prefill the map with the `BOM`
  var replaceMap = {
    '%FE%FF': '\uFFFD\uFFFD',
    '%FF%FE': '\uFFFD\uFFFD'
  };
  var match = multiMatcher.exec(input);

  while (match) {
    try {
      // Decode as big chunks as possible
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);

      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }

    match = multiMatcher.exec(input);
  } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else


  replaceMap['%C2'] = '\uFFFD';
  var entries = Object.keys(replaceMap);

  for (var i = 0; i < entries.length; i++) {
    // Replace all decoded components
    var key = entries[i];
    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
  }

  return input;
}

var decodeUriComponent = function decodeUriComponent(encodedURI) {
  if (typeof encodedURI !== 'string') {
    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
  }

  try {
    encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

    return decodeURIComponent(encodedURI);
  } catch (err) {
    // Fallback to a more advanced decoder
    return customDecodeURIComponent(encodedURI);
  }
};

var splitOnFirst = (string, separator) => {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }

  if (separator === '') {
    return [string];
  }

  const separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) {
    return [string];
  }

  return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
};

var filterObj = function filterObj(obj, predicate) {
  var ret = {};
  var keys = Object.keys(obj);
  var isArr = Array.isArray(predicate);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];

    if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
      ret[key] = val;
    }
  }

  return ret;
};

var queryString = createCommonjsModule(function (module, exports) {

  const isNullOrUndefined = value => value === null || value === undefined;

  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case 'index':
        return key => (result, value) => {
          const index = result.length;

          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          }

          if (value === null) {
            return [...result, [encode(key, options), '[', index, ']'].join('')];
          }

          return [...result, [encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')];
        };

      case 'bracket':
        return key => (result, value) => {
          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          }

          if (value === null) {
            return [...result, [encode(key, options), '[]'].join('')];
          }

          return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
        };

      case 'comma':
      case 'separator':
        return key => (result, value) => {
          if (value === null || value === undefined || value.length === 0) {
            return result;
          }

          if (result.length === 0) {
            return [[encode(key, options), '=', encode(value, options)].join('')];
          }

          return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
        };

      default:
        return key => (result, value) => {
          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          }

          if (value === null) {
            return [...result, encode(key, options)];
          }

          return [...result, [encode(key, options), '=', encode(value, options)].join('')];
        };
    }
  }

  function parserForArrayFormat(options) {
    let result;

    switch (options.arrayFormat) {
      case 'index':
        return (key, value, accumulator) => {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, '');

          if (!result) {
            accumulator[key] = value;
            return;
          }

          if (accumulator[key] === undefined) {
            accumulator[key] = {};
          }

          accumulator[key][result[1]] = value;
        };

      case 'bracket':
        return (key, value, accumulator) => {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, '');

          if (!result) {
            accumulator[key] = value;
            return;
          }

          if (accumulator[key] === undefined) {
            accumulator[key] = [value];
            return;
          }

          accumulator[key] = [].concat(accumulator[key], value);
        };

      case 'comma':
      case 'separator':
        return (key, value, accumulator) => {
          const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
          const isEncodedArray = typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode(value, options) : value;
          const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
          accumulator[key] = newValue;
        };

      default:
        return (key, value, accumulator) => {
          if (accumulator[key] === undefined) {
            accumulator[key] = value;
            return;
          }

          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }

  function validateArrayFormatSeparator(value) {
    if (typeof value !== 'string' || value.length !== 1) {
      throw new TypeError('arrayFormatSeparator must be single character string');
    }
  }

  function encode(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    }

    return value;
  }

  function decode(value, options) {
    if (options.decode) {
      return decodeUriComponent(value);
    }

    return value;
  }

  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }

    if (typeof input === 'object') {
      return keysSorter(Object.keys(input)).sort((a, b) => Number(a) - Number(b)).map(key => input[key]);
    }

    return input;
  }

  function removeHash(input) {
    const hashStart = input.indexOf('#');

    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }

    return input;
  }

  function getHash(url) {
    let hash = '';
    const hashStart = url.indexOf('#');

    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }

    return hash;
  }

  function extract(input) {
    input = removeHash(input);
    const queryStart = input.indexOf('?');

    if (queryStart === -1) {
      return '';
    }

    return input.slice(queryStart + 1);
  }

  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
      value = value.toLowerCase() === 'true';
    }

    return value;
  }

  function parse(query, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: 'none',
      arrayFormatSeparator: ',',
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const formatter = parserForArrayFormat(options); // Create an object with no prototype

    const ret = Object.create(null);

    if (typeof query !== 'string') {
      return ret;
    }

    query = query.trim().replace(/^[?#&]/, '');

    if (!query) {
      return ret;
    }

    for (const param of query.split('&')) {
      if (param === '') {
        continue;
      }

      let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '='); // Missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

      value = value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? value : decode(value, options);
      formatter(decode(key, options), value, ret);
    }

    for (const key of Object.keys(ret)) {
      const value = ret[key];

      if (typeof value === 'object' && value !== null) {
        for (const k of Object.keys(value)) {
          value[k] = parseValue(value[k], options);
        }
      } else {
        ret[key] = parseValue(value, options);
      }
    }

    if (options.sort === false) {
      return ret;
    }

    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
      const value = ret[key];

      if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
        // Sort object keys, not values
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }

      return result;
    }, Object.create(null));
  }

  exports.extract = extract;
  exports.parse = parse;

  exports.stringify = (object, options) => {
    if (!object) {
      return '';
    }

    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: 'none',
      arrayFormatSeparator: ','
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);

    const shouldFilter = key => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === '';

    const formatter = encoderForArrayFormat(options);
    const objectCopy = {};

    for (const key of Object.keys(object)) {
      if (!shouldFilter(key)) {
        objectCopy[key] = object[key];
      }
    }

    const keys = Object.keys(objectCopy);

    if (options.sort !== false) {
      keys.sort(options.sort);
    }

    return keys.map(key => {
      const value = object[key];

      if (value === undefined) {
        return '';
      }

      if (value === null) {
        return encode(key, options);
      }

      if (Array.isArray(value)) {
        return value.reduce(formatter(key), []).join('&');
      }

      return encode(key, options) + '=' + encode(value, options);
    }).filter(x => x.length > 0).join('&');
  };

  exports.parseUrl = (url, options) => {
    options = Object.assign({
      decode: true
    }, options);
    const [url_, hash] = splitOnFirst(url, '#');
    return Object.assign({
      url: url_.split('?')[0] || '',
      query: parse(extract(url), options)
    }, options && options.parseFragmentIdentifier && hash ? {
      fragmentIdentifier: decode(hash, options)
    } : {});
  };

  exports.stringifyUrl = (object, options) => {
    options = Object.assign({
      encode: true,
      strict: true
    }, options);
    const url = removeHash(object.url).split('?')[0] || '';
    const queryFromUrl = exports.extract(object.url);
    const parsedQueryFromUrl = exports.parse(queryFromUrl, {
      sort: false
    });
    const query = Object.assign(parsedQueryFromUrl, object.query);
    let queryString = exports.stringify(query, options);

    if (queryString) {
      queryString = `?${queryString}`;
    }

    let hash = getHash(object.url);

    if (object.fragmentIdentifier) {
      hash = `#${encode(object.fragmentIdentifier, options)}`;
    }

    return `${url}${queryString}${hash}`;
  };

  exports.pick = (input, filter, options) => {
    options = Object.assign({
      parseFragmentIdentifier: true
    }, options);
    const {
      url,
      query,
      fragmentIdentifier
    } = exports.parseUrl(input, options);
    return exports.stringifyUrl({
      url,
      query: filterObj(query, filter),
      fragmentIdentifier
    }, options);
  };

  exports.exclude = (input, filter, options) => {
    const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);
    return exports.pick(input, exclusionFilter, options);
  };
});

/**
 * parsePath
 * Parses the input url.
 *
 * @name parsePath
 * @function
 * @param {String} url The input url.
 * @return {Object} An object containing the following fields:
 *
 *  - `protocols` (Array): An array with the url protocols (usually it has one element).
 *  - `protocol` (String): The first protocol, `"ssh"` (if the url is a ssh url) or `"file"`.
 *  - `port` (null|Number): The domain port.
 *  - `resource` (String): The url domain (including subdomains).
 *  - `user` (String): The authentication user (usually for ssh urls).
 *  - `pathname` (String): The url pathname.
 *  - `hash` (String): The url hash.
 *  - `search` (String): The url querystring value.
 *  - `href` (String): The input url.
 *  - `query` (Object): The url querystring, parsed as object.
 */


function parsePath(url) {
  url = (url || "").trim();
  var output = {
    protocols: lib$2(url),
    protocol: null,
    port: null,
    resource: "",
    user: "",
    pathname: "",
    hash: "",
    search: "",
    href: url,
    query: Object.create(null)
  },
      protocolIndex = url.indexOf("://"),
      splits = null,
      parts = null;

  if (url.startsWith(".")) {
    if (url.startsWith("./")) {
      url = url.substring(2);
    }

    output.pathname = url;
    output.protocol = "file";
  }

  var firstChar = url.charAt(1);

  if (!output.protocol) {
    output.protocol = output.protocols[0];

    if (!output.protocol) {
      if (lib$1(url)) {
        output.protocol = "ssh";
      } else if (firstChar === "/" || firstChar === "~") {
        url = url.substring(2);
        output.protocol = "file";
      } else {
        output.protocol = "file";
      }
    }
  }

  if (protocolIndex !== -1) {
    url = url.substring(protocolIndex + 3);
  }

  parts = url.split(/\/|\\/);

  if (output.protocol !== "file") {
    output.resource = parts.shift();
  } else {
    output.resource = "";
  } // user@domain


  splits = output.resource.split("@");

  if (splits.length === 2) {
    output.user = splits[0];
    output.resource = splits[1];
  } // domain.com:port


  splits = output.resource.split(":");

  if (splits.length === 2) {
    output.resource = splits[0];

    if (splits[1]) {
      output.port = Number(splits[1]);

      if (isNaN(output.port)) {
        output.port = null;
        parts.unshift(splits[1]);
      }
    } else {
      output.port = null;
    }
  } // Remove empty elements


  parts = parts.filter(Boolean); // Stringify the pathname

  if (output.protocol === "file") {
    output.pathname = output.href;
  } else {
    output.pathname = output.pathname || (output.protocol !== "file" || output.href[0] === "/" ? "/" : "") + parts.join("/");
  } // #some-hash


  splits = output.pathname.split("#");

  if (splits.length === 2) {
    output.pathname = splits[0];
    output.hash = splits[1];
  } // ?foo=bar


  splits = output.pathname.split("?");

  if (splits.length === 2) {
    output.pathname = splits[0];
    output.search = splits[1];
  }

  output.query = queryString.parse(output.search);
  output.href = output.href.replace(/\/$/, "");
  output.pathname = output.pathname.replace(/\/$/, "");
  return output;
}

var lib = parsePath;

/**
 * https://github.com/IonicaBizau/git-url-parse is broken. Using a local copy.
 * @see https://github.com/IonicaBizau/git-url-parse/issues/130#issuecomment-890309747
 */
function gitUrlParse(url) {
  if (typeof url !== 'string') {
    throw new Error('The url must be a string.');
  }

  let urlInfo = gitUp(url),
      sourceParts = urlInfo.resource.split('.'),
      splits = null; // @ts-ignore

  urlInfo.toString = function (type) {
    return gitUrlParse.stringify(this, type);
  };

  urlInfo.source = sourceParts.length > 2 ? sourceParts.slice(1 - sourceParts.length).join('.') : urlInfo.source = urlInfo.resource; // Note: Some hosting services (e.g. Visual Studio Team Services) allow whitespace characters
  // in the repository and owner names so we decode the URL pieces to get the correct result

  urlInfo.git_suffix = /\.git$/.test(urlInfo.pathname);
  urlInfo.name = decodeURIComponent(urlInfo.pathname.replace(/^\//, '').replace(/\.git$/, ''));
  urlInfo.owner = decodeURIComponent(urlInfo.user);

  switch (urlInfo.source) {
    case 'git.cloudforge.com':
      urlInfo.owner = urlInfo.user;
      urlInfo.organization = sourceParts[0];
      urlInfo.source = 'cloudforge.com';
      break;

    case 'visualstudio.com':
      // Handle VSTS SSH URLs
      if (urlInfo.resource === 'vs-ssh.visualstudio.com') {
        splits = urlInfo.name.split('/');

        if (splits.length === 4) {
          urlInfo.organization = splits[1];
          urlInfo.owner = splits[2];
          urlInfo.name = splits[3];
          urlInfo.full_name = splits[2] + '/' + splits[3];
        }

        break;
      } else {
        splits = urlInfo.name.split('/');

        if (splits.length === 2) {
          urlInfo.owner = splits[1];
          urlInfo.name = splits[1];
          urlInfo.full_name = '_git/' + urlInfo.name;
        } else if (splits.length === 3) {
          urlInfo.name = splits[2];

          if (splits[0] === 'DefaultCollection') {
            urlInfo.owner = splits[2];
            urlInfo.organization = splits[0];
            urlInfo.full_name = urlInfo.organization + '/_git/' + urlInfo.name;
          } else {
            urlInfo.owner = splits[0];
            urlInfo.full_name = urlInfo.owner + '/_git/' + urlInfo.name;
          }
        } else if (splits.length === 4) {
          urlInfo.organization = splits[0];
          urlInfo.owner = splits[1];
          urlInfo.name = splits[3];
          urlInfo.full_name = urlInfo.organization + '/' + urlInfo.owner + '/_git/' + urlInfo.name;
        }

        break;
      }

    // Azure DevOps (formerly Visual Studio Team Services)

    case 'dev.azure.com':
    case 'azure.com':
      if (urlInfo.resource === 'ssh.dev.azure.com') {
        splits = urlInfo.name.split('/');

        if (splits.length === 4) {
          urlInfo.organization = splits[1];
          urlInfo.owner = splits[2];
          urlInfo.name = splits[3];
        }

        break;
      } else {
        splits = urlInfo.name.split('/');

        if (splits.length === 5) {
          urlInfo.organization = splits[0];
          urlInfo.owner = splits[1];
          urlInfo.name = splits[4];
          urlInfo.full_name = '_git/' + urlInfo.name;
        } else if (splits.length === 3) {
          urlInfo.name = splits[2];

          if (splits[0] === 'DefaultCollection') {
            urlInfo.owner = splits[2];
            urlInfo.organization = splits[0];
            urlInfo.full_name = urlInfo.organization + '/_git/' + urlInfo.name;
          } else {
            urlInfo.owner = splits[0];
            urlInfo.full_name = urlInfo.owner + '/_git/' + urlInfo.name;
          }
        } else if (splits.length === 4) {
          urlInfo.organization = splits[0];
          urlInfo.owner = splits[1];
          urlInfo.name = splits[3];
          urlInfo.full_name = urlInfo.organization + '/' + urlInfo.owner + '/_git/' + urlInfo.name;
        }

        if (urlInfo.query && urlInfo.query['path']) {
          urlInfo.filepath = urlInfo.query['path'].replace(/^\/+/g, ''); // Strip leading slash (/)
        }

        if (urlInfo.query && urlInfo.query['version']) {
          // version=GB<branch>
          urlInfo.ref = urlInfo.query['version'].replace(/^GB/, ''); // remove GB
        }

        break;
      }

    default:
      splits = urlInfo.name.split('/');
      let nameIndex = splits.length - 1;

      if (splits.length >= 2) {
        const dashIndex = splits.indexOf('-', 2);
        const blobIndex = splits.indexOf('blob', 2);
        const treeIndex = splits.indexOf('tree', 2);
        const commitIndex = splits.indexOf('commit', 2);
        const srcIndex = splits.indexOf('src', 2);
        const rawIndex = splits.indexOf('raw', 2);
        nameIndex = dashIndex > 0 ? dashIndex - 1 : blobIndex > 0 ? blobIndex - 1 : treeIndex > 0 ? treeIndex - 1 : commitIndex > 0 ? commitIndex - 1 : srcIndex > 0 ? srcIndex - 1 : rawIndex > 0 ? rawIndex - 1 : nameIndex;
        urlInfo.owner = splits.slice(0, nameIndex).join('/');
        urlInfo.name = splits[nameIndex];

        if (commitIndex) {
          urlInfo.commit = splits[nameIndex + 2];
        }
      }

      urlInfo.ref = '';
      urlInfo.filepathtype = '';
      urlInfo.filepath = '';
      const offsetNameIndex = splits.length > nameIndex && splits[nameIndex + 1] === '-' ? nameIndex + 1 : nameIndex;

      if (splits.length > offsetNameIndex + 2 && ['raw', 'src', 'blob', 'tree'].indexOf(splits[offsetNameIndex + 1]) >= 0) {
        urlInfo.filepathtype = splits[offsetNameIndex + 1];
        urlInfo.ref = splits[offsetNameIndex + 2];

        if (splits.length > offsetNameIndex + 3) {
          urlInfo.filepath = splits.slice(offsetNameIndex + 3).join('/');
        }
      }

      urlInfo.organization = urlInfo.owner;
      break;
  }

  if (!urlInfo.full_name) {
    urlInfo.full_name = urlInfo.owner;

    if (urlInfo.name) {
      urlInfo.full_name && (urlInfo.full_name += '/');
      urlInfo.full_name += urlInfo.name;
    }
  } // Bitbucket Server


  if (urlInfo.owner.startsWith('scm/')) {
    urlInfo.source = 'bitbucket-server';
    urlInfo.owner = urlInfo.owner.replace('scm/', '');
    urlInfo.organization = urlInfo.owner;
    urlInfo.full_name = `${urlInfo.owner}/${urlInfo.name}`;
  }

  const bitbucket = /(projects|users)\/(.*?)\/repos\/(.*?)((\/.*$)|$)/;
  const matches = bitbucket.exec(urlInfo.pathname);

  if (matches != null) {
    urlInfo.source = 'bitbucket-server';

    if (matches[1] === 'users') {
      urlInfo.owner = '~' + matches[2];
    } else {
      urlInfo.owner = matches[2];
    }

    urlInfo.organization = urlInfo.owner;
    urlInfo.name = matches[3];
    splits = matches[4].split('/');

    if (splits.length > 1) {
      if (['raw', 'browse'].indexOf(splits[1]) >= 0) {
        urlInfo.filepathtype = splits[1];

        if (splits.length > 2) {
          urlInfo.filepath = splits[2];
        }
      } else if (splits[1] === 'commits' && splits.length > 2) {
        urlInfo.commit = splits[2];
      }
    }

    urlInfo.full_name = `${urlInfo.owner}/${urlInfo.name}`;

    if (urlInfo.query.at) {
      urlInfo.ref = urlInfo.query.at;
    } else {
      urlInfo.ref = '';
    }
  }

  return urlInfo;
}
/**
 * stringify
 * Stringifies a `GitUrl` object.
 *
 * @name stringify
 * @function
 * @param {GitUrl} obj The parsed Git url object.
 * @param {String} type The type of the stringified url (default `obj.protocol`).
 * @return {String} The stringified url.
 */
// @ts-ignore

gitUrlParse.stringify = function (obj, type) {
  type = type || (obj.protocols && obj.protocols.length ? obj.protocols.join('+') : obj.protocol);
  const port = obj.port ? `:${obj.port}` : '';
  const user = obj.user || 'git';
  const maybeGitSuffix = obj.git_suffix ? '.git' : '';

  switch (type) {
    case 'ssh':
      if (port) return `ssh://${user}@${obj.resource}${port}/${obj.full_name}${maybeGitSuffix}`;else return `${user}@${obj.resource}:${obj.full_name}${maybeGitSuffix}`;

    case 'git+ssh':
    case 'ssh+git':
    case 'ftp':
    case 'ftps':
      return `${type}://${user}@${obj.resource}${port}/${obj.full_name}${maybeGitSuffix}`;

    case 'http':
    case 'https':
      const auth = obj.token ? buildToken(obj) : obj.user && (obj.protocols.includes('http') || obj.protocols.includes('https')) ? `${obj.user}@` : '';
      return `${type}://${auth}${obj.resource}${port}/${buildPath(obj)}${maybeGitSuffix}`;

    default:
      return obj.href;
  }
};
/*!
 * buildToken
 * Builds OAuth token prefix (helper function)
 *
 * @name buildToken
 * @function
 * @param {GitUrl} obj The parsed Git url object.
 * @return {String} token prefix
 */
// @ts-ignore


function buildToken(obj) {
  switch (obj.source) {
    case 'bitbucket.org':
      return `x-token-auth:${obj.token}@`;

    default:
      return `${obj.token}@`;
  }
} // @ts-ignore


function buildPath(obj) {
  switch (obj.source) {
    case 'bitbucket-server':
      return `scm/${obj.full_name}`;

    default:
      return `${obj.full_name}`;
  }
} // @ts-ignore


function parseUrl(url) {
  if (typeof url !== 'string' || !url.trim()) {
    throw new Error('Invalid url.');
  }

  return lib(url);
} // @ts-ignore


function gitUp(input) {
  let output = parseUrl(input);
  output.token = '';
  let splits = output.user.split(':');

  if (splits.length === 2) {
    if (splits[1] === 'x-oauth-basic') {
      output.token = splits[0];
    } else if (splits[0] === 'x-token-auth') {
      output.token = splits[1];
    }
  }

  if (lib$1(output.protocols) || lib$1(input)) {
    output.protocol = 'ssh';
  } else if (output.protocols.length) {
    output.protocol = output.protocols[0];
  } else {
    output.protocol = 'file';
  }

  output.href = output.href.replace(/\/$/, '');
  return output;
}

function getGitInfo(remote, hash) {
  if (!remote) {
    return {
      resource: null,
      repoUrl: null,
      commitUrl: null
    };
  }

  const repoInfo = gitUrlParse(remote);
  const repoUrl = gitUrlParse.stringify(_extends({}, repoInfo, {
    git_suffix: false
  }), 'https');
  return {
    repoUrl,
    resource: repoInfo.resource,
    commitUrl: `${repoUrl}/commit/${hash}`
  };
}

function Git({
  git
}) {
  const {
    commitUrl
  } = getGitInfo(git.remote, git.hash);
  return React__default.createElement(React__default.Fragment, null, git.hash && git.message && React__default.createElement("div", {
    className: "flex items-center gap-4"
  }, React__default.createElement("div", {
    className: "flex-grow font-semibold"
  }, git.message), React__default.createElement("div", {
    className: "~bg-gray-500/5 flex items-center"
  }, React__default.createElement(CodeSnippet, {
    transparent: true,
    overflowX: false,
    value: git.hash
  }), commitUrl && React__default.createElement("a", {
    href: commitUrl,
    target: "_blank",
    className: "mr-4"
  }, React__default.createElement(SmallButton, null, React__default.createElement(FontAwesomeIcon, {
    className: "group-hover:text-indigo-500",
    icon: faExternalLinkAlt
  }), "View commit ", git.hash.substr(0, 7))))), git.isDirty && React__default.createElement("div", null, React__default.createElement(Alert, {
    className: "mt-4"
  }, "Last commit is dirty. (Un)staged changes have been made since this commit.")), git.tag && React__default.createElement(DefinitionList, null, React__default.createElement(DefinitionList.Row, {
    label: "Latest tag",
    value: git.tag
  })));
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }

  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }

  return accumulator;
}

var _arrayReduce = arrayReduce;

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}

var _basePropertyOf = basePropertyOf;

/** Used to map Latin Unicode letters to basic Latin letters. */

var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',
  '\xc1': 'A',
  '\xc2': 'A',
  '\xc3': 'A',
  '\xc4': 'A',
  '\xc5': 'A',
  '\xe0': 'a',
  '\xe1': 'a',
  '\xe2': 'a',
  '\xe3': 'a',
  '\xe4': 'a',
  '\xe5': 'a',
  '\xc7': 'C',
  '\xe7': 'c',
  '\xd0': 'D',
  '\xf0': 'd',
  '\xc8': 'E',
  '\xc9': 'E',
  '\xca': 'E',
  '\xcb': 'E',
  '\xe8': 'e',
  '\xe9': 'e',
  '\xea': 'e',
  '\xeb': 'e',
  '\xcc': 'I',
  '\xcd': 'I',
  '\xce': 'I',
  '\xcf': 'I',
  '\xec': 'i',
  '\xed': 'i',
  '\xee': 'i',
  '\xef': 'i',
  '\xd1': 'N',
  '\xf1': 'n',
  '\xd2': 'O',
  '\xd3': 'O',
  '\xd4': 'O',
  '\xd5': 'O',
  '\xd6': 'O',
  '\xd8': 'O',
  '\xf2': 'o',
  '\xf3': 'o',
  '\xf4': 'o',
  '\xf5': 'o',
  '\xf6': 'o',
  '\xf8': 'o',
  '\xd9': 'U',
  '\xda': 'U',
  '\xdb': 'U',
  '\xdc': 'U',
  '\xf9': 'u',
  '\xfa': 'u',
  '\xfb': 'u',
  '\xfc': 'u',
  '\xdd': 'Y',
  '\xfd': 'y',
  '\xff': 'y',
  '\xc6': 'Ae',
  '\xe6': 'ae',
  '\xde': 'Th',
  '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',
  '\u0102': 'A',
  '\u0104': 'A',
  '\u0101': 'a',
  '\u0103': 'a',
  '\u0105': 'a',
  '\u0106': 'C',
  '\u0108': 'C',
  '\u010a': 'C',
  '\u010c': 'C',
  '\u0107': 'c',
  '\u0109': 'c',
  '\u010b': 'c',
  '\u010d': 'c',
  '\u010e': 'D',
  '\u0110': 'D',
  '\u010f': 'd',
  '\u0111': 'd',
  '\u0112': 'E',
  '\u0114': 'E',
  '\u0116': 'E',
  '\u0118': 'E',
  '\u011a': 'E',
  '\u0113': 'e',
  '\u0115': 'e',
  '\u0117': 'e',
  '\u0119': 'e',
  '\u011b': 'e',
  '\u011c': 'G',
  '\u011e': 'G',
  '\u0120': 'G',
  '\u0122': 'G',
  '\u011d': 'g',
  '\u011f': 'g',
  '\u0121': 'g',
  '\u0123': 'g',
  '\u0124': 'H',
  '\u0126': 'H',
  '\u0125': 'h',
  '\u0127': 'h',
  '\u0128': 'I',
  '\u012a': 'I',
  '\u012c': 'I',
  '\u012e': 'I',
  '\u0130': 'I',
  '\u0129': 'i',
  '\u012b': 'i',
  '\u012d': 'i',
  '\u012f': 'i',
  '\u0131': 'i',
  '\u0134': 'J',
  '\u0135': 'j',
  '\u0136': 'K',
  '\u0137': 'k',
  '\u0138': 'k',
  '\u0139': 'L',
  '\u013b': 'L',
  '\u013d': 'L',
  '\u013f': 'L',
  '\u0141': 'L',
  '\u013a': 'l',
  '\u013c': 'l',
  '\u013e': 'l',
  '\u0140': 'l',
  '\u0142': 'l',
  '\u0143': 'N',
  '\u0145': 'N',
  '\u0147': 'N',
  '\u014a': 'N',
  '\u0144': 'n',
  '\u0146': 'n',
  '\u0148': 'n',
  '\u014b': 'n',
  '\u014c': 'O',
  '\u014e': 'O',
  '\u0150': 'O',
  '\u014d': 'o',
  '\u014f': 'o',
  '\u0151': 'o',
  '\u0154': 'R',
  '\u0156': 'R',
  '\u0158': 'R',
  '\u0155': 'r',
  '\u0157': 'r',
  '\u0159': 'r',
  '\u015a': 'S',
  '\u015c': 'S',
  '\u015e': 'S',
  '\u0160': 'S',
  '\u015b': 's',
  '\u015d': 's',
  '\u015f': 's',
  '\u0161': 's',
  '\u0162': 'T',
  '\u0164': 'T',
  '\u0166': 'T',
  '\u0163': 't',
  '\u0165': 't',
  '\u0167': 't',
  '\u0168': 'U',
  '\u016a': 'U',
  '\u016c': 'U',
  '\u016e': 'U',
  '\u0170': 'U',
  '\u0172': 'U',
  '\u0169': 'u',
  '\u016b': 'u',
  '\u016d': 'u',
  '\u016f': 'u',
  '\u0171': 'u',
  '\u0173': 'u',
  '\u0174': 'W',
  '\u0175': 'w',
  '\u0176': 'Y',
  '\u0177': 'y',
  '\u0178': 'Y',
  '\u0179': 'Z',
  '\u017b': 'Z',
  '\u017d': 'Z',
  '\u017a': 'z',
  '\u017c': 'z',
  '\u017e': 'z',
  '\u0132': 'IJ',
  '\u0133': 'ij',
  '\u0152': 'Oe',
  '\u0153': 'oe',
  '\u0149': "'n",
  '\u017f': 's'
};
/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */

var deburrLetter = _basePropertyOf(deburredLetters);
var _deburrLetter = deburrLetter;

/** Used to match Latin Unicode letters (excluding mathematical operators). */

var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
/** Used to compose unicode character classes. */

var rsComboMarksRange$3 = '\\u0300-\\u036f',
    reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$3 = '\\u20d0-\\u20ff',
    rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3;
/** Used to compose unicode capture groups. */

var rsCombo$2 = '[' + rsComboRange$3 + ']';
/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */

var reComboMark = RegExp(rsCombo$2, 'g');
/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */

function deburr(string) {
  string = toString_1(string);
  return string && string.replace(reLatin, _deburrLetter).replace(reComboMark, '');
}

var deburr_1 = deburr;

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */

function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

var _asciiWords = asciiWords;

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */

function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

var _hasUnicodeWord = hasUnicodeWord;

/** Used to compose unicode character classes. */
var rsAstralRange$2 = '\\ud800-\\udfff',
    rsComboMarksRange$2 = '\\u0300-\\u036f',
    reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
    rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange$2 = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
/** Used to compose unicode capture groups. */

var rsApos$1 = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo$1 = '[' + rsComboRange$2 + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
    rsModifier$1 = '(?:' + rsCombo$1 + '|' + rsFitz$1 + ')',
    rsNonAstral$1 = '[^' + rsAstralRange$2 + ']',
    rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ$2 = '\\u200d';
/** Used to compose unicode regexes. */

var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos$1 + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos$1 + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod$1 = rsModifier$1 + '?',
    rsOptVar$1 = '[' + rsVarRange$2 + ']?',
    rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
    rsEmoji = '(?:' + [rsDingbat, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsSeq$1;
/** Used to match complex or compound words. */

var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');
/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */

function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

var _unicodeWords = unicodeWords;

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */

function words(string, pattern, guard) {
  string = toString_1(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return _hasUnicodeWord(string) ? _unicodeWords(string) : _asciiWords(string);
  }

  return string.match(pattern) || [];
}

var words_1 = words;

/** Used to compose unicode capture groups. */

var rsApos = "['\u2019]";
/** Used to match apostrophes. */

var reApos = RegExp(rsApos, 'g');
/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */

function createCompounder(callback) {
  return function (string) {
    return _arrayReduce(words_1(deburr_1(string).replace(reApos, '')), callback, '');
  };
}

var _createCompounder = createCompounder;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end > length ? length : end;

  if (end < 0) {
    end += length;
  }

  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}

var _baseSlice = baseSlice;

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */

function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return !start && end >= length ? array : _baseSlice(array, start, end);
}

var _castSlice = castSlice;

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff',
    rsComboMarksRange$1 = '\\u0300-\\u036f',
    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsVarRange$1 = '\\ufe0e\\ufe0f';
/** Used to compose unicode capture groups. */

var rsZWJ$1 = '\\u200d';
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + ']');
/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */

function hasUnicode(string) {
  return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode;

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

var _asciiToArray = asciiToArray;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';
/** Used to compose unicode capture groups. */

var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';
/** Used to compose unicode regexes. */

var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

var _unicodeToArray = unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function stringToArray(string) {
  return _hasUnicode(string) ? _unicodeToArray(string) : _asciiToArray(string);
}

var _stringToArray = stringToArray;

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */

function createCaseFirst(methodName) {
  return function (string) {
    string = toString_1(string);
    var strSymbols = _hasUnicode(string) ? _stringToArray(string) : undefined;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? _castSlice(strSymbols, 1).join('') : string.slice(1);
    return chr[methodName]() + trailing;
  };
}

var _createCaseFirst = createCaseFirst;

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */

var upperFirst = _createCaseFirst('toUpperCase');
var upperFirst_1 = upperFirst;

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @static
 * @memberOf _
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @example
 *
 * _.startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * _.startCase('fooBar');
 * // => 'Foo Bar'
 *
 * _.startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 */

var startCase = _createCompounder(function (result, word, index) {
  return result + (index ? ' ' : '') + upperFirst_1(word);
});
var startCase_1 = startCase;

function Versions({
  env
}) {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  return React__default.createElement(DefinitionList, null, errorOccurrence.application_version && React__default.createElement(DefinitionList.Row, {
    key: "app_version",
    value: errorOccurrence.application_version,
    label: "App Version"
  }), Object.entries(env).map(([key, value]) => React__default.createElement(DefinitionList.Row, {
    key: key,
    value: value,
    label: startCase_1(key)
  })));
}

function ContextNav({
  children
}) {
  return React__default.createElement("ul", {
    className: "grid grid-cols-1 gap-10"
  }, children);
}

function ContextNavGroup({
  title,
  children,
  anchor
}) {
  return React__default.createElement("li", null, React__default.createElement("a", {
    href: `#context-${anchor}`,
    className: "uppercase tracking-wider ~text-gray-500 text-xs font-bold"
  }, title), React__default.createElement("ul", {
    className: "mt-3 grid grid-cols-1 gap-3"
  }, children));
}

function ContextNavItem({
  icon,
  title,
  anchor,
  active = false
}) {
  return React__default.createElement("li", null, React__default.createElement("a", {
    href: `#context-${anchor}`,
    className: `
                flex items-center gap-3
                group text-base hover:text-indigo-500
                ${active ? '~text-indigo-600' : ''}
            `
  }, React__default.createElement("span", {
    className: "opacity-50"
  }, icon), React__default.createElement("span", null, title)));
}

function ContextSections({
  children
}) {
  const {
    inView
  } = useContext(InViewContext);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement("nav", {
    className: "hidden sm:block min-w-[8rem] flex-none mr-10 lg:mr-20"
  }, React__default.createElement("div", {
    className: "sticky top-[7.5rem]"
  }, React__default.createElement(ContextNav, null, Children.map(children, group => React__default.createElement(React__default.Fragment, null, group && React__default.createElement(ContextNavGroup, {
    title: group.props.title,
    anchor: group.props.anchor
  }, Children.map(group.props.children, section => React__default.createElement(React__default.Fragment, null, section && section.type === ContextSection && React__default.createElement(ContextNavItem, {
    icon: section.props.icon,
    active: inView[inView.length - 1] === section.props.title,
    title: section.props.title,
    anchor: section.props.anchor
  }))))))))), React__default.createElement("div", {
    className: "overflow-hidden grid grid-cols-1 gap-px bg-white dark:shadow-none dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 flex-grow"
  }, children));
}

function InViewContextProvider({
  children
}) {
  const [inView, setInView] = useState([]);
  return React__default.createElement(InViewContext.Provider, {
    value: {
      inView,
      setInView
    }
  }, children);
}

function LiveWireIcon({
  className = ''
}) {
  return React__default.createElement("svg", {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    enableBackground: "new 0 0 512 512",
    className: `${className}`
  }, React__default.createElement("path", {
    fill: "currentcolor",
    d: "M381.6,334.8c-24.7,0-27.7,33.6-45.2,44.6v52c0,17.6,14.2,31.8,31.8,31.8c17.6,0,31.8-14.2,31.8-31.8v-88.6\n        C395,338.1,389.2,334.8,381.6,334.8z"
  }), React__default.createElement("path", {
    fill: "currentcolor",
    d: "M263.2,334.8c-25.5,0-27.8,35.8-46.9,45.7v96.2c0,19.5,15.8,35.3,35.3,35.3s35.3-15.8,35.3-35.3V349.1\n        C280.9,341.1,273.9,334.8,263.2,334.8z"
  }), React__default.createElement("path", {
    fill: "currentcolor",
    d: "M144.8,334.8c-22.9,0-27.1,28.9-41.6,41.9l0,38c0,17.6,14.2,31.8,31.8,31.8c17.6,0,31.8-14.2,31.8-31.8v-67.9\n        C161.2,339.9,154.5,334.8,144.8,334.8z"
  }), React__default.createElement("path", {
    id: "Body-Copy-4",
    fill: "currentcolor",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M458.9,340.2c-8.3,12.6-14.7,28.2-31.7,28.2\n\t\tc-28.6,0-30.1-44-58.7-44c-28.6,0-27,44-55.6,44c-28.6,0-30.1-44-58.7-44s-27,44-55.6,44s-30.1-44-58.7-44s-27,44-55.6,44\n\t\tc-9,0-15.3-4.4-20.6-10.3c-20.4-35.6-32.2-77.2-32.2-121.8C31.6,105.8,132.4,0,256.7,0s225.1,105.8,225.1,236.2\n\t\tC481.8,273.5,473.6,308.8,458.9,340.2z"
  }), React__default.createElement("path", {
    id: "Oval",
    fillRule: "evenodd",
    clipRule: "evenodd",
    fill: "#FFFFFF",
    d: "M244.6,295.1c78.3,0,111.2-45.4,111.2-109.9\n\t\tS306.1,61.4,244.6,61.4s-111.2,59.4-111.2,123.9S166.4,295.1,244.6,295.1z"
  }), React__default.createElement("ellipse", {
    id: "Oval_1_",
    fill: "currentcolor",
    fillRule: "evenodd",
    clipRule: "evenodd",
    cx: "214.7",
    cy: "142.9",
    rx: "41.7",
    ry: "46"
  }), React__default.createElement("ellipse", {
    id: "Oval_2_",
    fillRule: "evenodd",
    clipRule: "evenodd",
    fill: "#FFFFFF",
    cx: "207.8",
    cy: "132.2",
    rx: "20.9",
    ry: "21.3"
  }));
}

function Context() {
  var _requestData$files, _context$session, _context$cookies;

  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const context = errorOccurrence.context_items;
  const requestData = context.request_data;
  return React__default.createElement(ErrorBoundary, null, React__default.createElement("div", {
    className: "flex items-stretch"
  }, React__default.createElement(InViewContextProvider, null, React__default.createElement(ContextSections, null, context.request_data && context.request && context.headers && React__default.createElement(ContextGroup, {
    title: "Request",
    anchor: "request"
  }, React__default.createElement(Request, {
    request: context.request,
    requestData: context.request_data,
    headers: context.headers
  }), React__default.createElement(ContextSection, {
    title: "Headers",
    anchor: "request-headers",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faExchangeAlt
    }),
    children: React__default.createElement(Headers, {
      headers: context.headers
    })
  }), !!Object.values(context.request_data.queryString || []).length && React__default.createElement(ContextSection, {
    title: "Query String",
    anchor: "request-query-string",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faQuestionCircle
    }),
    children: React__default.createElement(QueryString, {
      requestData: context.request_data
    })
  }), React__default.createElement(ContextSection, {
    title: "Body",
    anchor: "request-body",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faCode
    }),
    children: React__default.createElement(Body, null)
  }), !!(requestData != null && (_requestData$files = requestData.files) != null && _requestData$files.length) && React__default.createElement(ContextSection, {
    title: "Files",
    anchor: "request-files",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faFile
    }),
    children: React__default.createElement(Files, null)
  }), !!((_context$session = context.session) != null && _context$session.length) && React__default.createElement(ContextSection, {
    title: "Session",
    anchor: "request-session",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faHourglassHalf
    }),
    children: React__default.createElement(Session, {
      session: context.session
    })
  }), !!((_context$cookies = context.cookies) != null && _context$cookies.length) && React__default.createElement(ContextSection, {
    title: "Cookies",
    anchor: "request-cookies",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faCookieBite
    }),
    children: React__default.createElement(Cookies, {
      cookies: context.cookies
    })
  })), React__default.createElement(ContextGroup, {
    title: "App",
    anchor: "app"
  }, context.route && React__default.createElement(ContextSection, {
    title: "Routing",
    anchor: "app-routing",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faRandom
    }),
    children: React__default.createElement(Routing, {
      route: context.route
    })
  }), context.view && React__default.createElement(ContextSection, {
    title: "Views",
    anchor: "app-views",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faPaintRoller
    }),
    children: React__default.createElement(View, null)
  })), context.livewire && React__default.createElement(ContextGroup, {
    title: "Livewire",
    anchor: "livewire"
  }, React__default.createElement(ContextSection, {
    title: "Component",
    anchor: "livewire-component",
    icon: React__default.createElement(LiveWireIcon, {
      className: "svg-inline--fa fa-w-16 fa-fw"
    }),
    children: React__default.createElement(LivewireComponent, null)
  }), React__default.createElement(ContextSection, {
    title: "Updates",
    anchor: "livewire-updates",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faSatelliteDish
    }),
    children: React__default.createElement(LivewireUpdates, null)
  }), React__default.createElement(ContextSection, {
    title: "Data",
    anchor: "livewire-data",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faTh
    }),
    children: React__default.createElement(LivewireData, null)
  })), React__default.createElement(ContextGroup, {
    title: "Context",
    anchor: "context"
  }, context.user && React__default.createElement(ContextSection, {
    title: "User",
    anchor: "user-user",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faUser
    }),
    children: React__default.createElement(User, {
      user: context.user
    })
  }), context.git && React__default.createElement(ContextSection, {
    title: "Git",
    anchor: "context-git",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faCodeBranch
    }),
    children: React__default.createElement(Git, {
      git: context.git
    })
  }), React__default.createElement(ContextSection, {
    title: "Versions",
    anchor: "context-versions",
    icon: React__default.createElement(FontAwesomeIcon, {
      fixedWidth: true,
      icon: faSlidersH
    }),
    children: React__default.createElement(Versions, {
      env: context.env || {}
    })
  }))))));
}

function DebugTabs({
  children
}) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const validChildren = children.filter(child => child !== false);
  const tabs = Children.map(validChildren, child => {
    return {
      name: child.props.name,
      component: child.props.component,
      count: child.props.count,
      checked: child.props.checked,
      onChange: child.props.onChange
    };
  }).filter(tab => tab.count);
  const Tab = tabs[currentTabIndex].component;
  return React__default.createElement("div", {
    className: "bg-gray-300/50 dark:bg-black/10 shadow-inner rounded-lg"
  }, React__default.createElement("nav", {
    className: "z-10 flex justify-center items-center"
  }, React__default.createElement("ul", {
    className: "-my-5 flex justify-start items-center rounded-full shadow-lg bg-indigo-500 text-white space-x-px"
  }, tabs.map((tab, i) => React__default.createElement("li", {
    key: i,
    className: `
                                    ${i === currentTabIndex ? 'bg-indigo-600' : 'bg-indigo-500 text-indigo-100'}
                                    ${i === 0 ? 'rounded-l-full' : ''}
                                    ${i === tabs.length - 1 ? 'rounded-r-full' : ''}
                                    hover:text-white
                                `
  }, React__default.createElement("button", {
    onClick: () => setCurrentTabIndex(i),
    className: "group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium "
  }, React__default.createElement("span", {
    className: "mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/30 text-white rounded-full text-xs"
  }, tab.count), React__default.createElement("span", null, tab.name)))))), React__default.createElement(ErrorBoundary, {
    fallbackComponent: githubLink => React__default.createElement(ErrorBoundarySection, {
      githubLink: githubLink,
      className: "pt-10"
    })
  }, React__default.createElement("div", {
    className: "grid grid-cols-1 gap-10 py-10 px-6 sm:px-10"
  }, React__default.createElement(Tab, null))));
}

DebugTabs.Tab = _props => null;

function DebugItem({
  children,
  context = null,
  level = null,
  meta = null,
  time
}) {
  const [showRawContext, setShowRawContext] = useState(false); // TODO: Implement this

  const logLevelColors = {
    error: 'red',
    warn: 'orange',
    warning: 'orange',
    info: 'blue',
    debug: 'green',
    trace: 'gray',
    notice: 'purple',
    critical: 'red',
    alert: 'red',
    emergency: 'red'
  };
  return React__default.createElement("div", {
    className: "min-w-0 grid grid-cols-1 gap-2"
  }, React__default.createElement("div", {
    className: "flex items-center gap-1"
  }, React__default.createElement(Tag, {
    color: level ? logLevelColors[level] : 'gray',
    className: "font-mono"
  }, time.toLocaleTimeString()), level && React__default.createElement(Tag, {
    color: logLevelColors[level]
  }, level), meta && Object.entries(meta).map(([key, value]) => React__default.createElement(React__default.Fragment, {
    key: key
  }, key === 'runtime' && React__default.createElement(Tag, {
    className: "inline-flex items-center gap-2"
  }, React__default.createElement(FontAwesomeIcon, {
    title: "Runtime",
    className: "opacity-50",
    icon: faStopwatch
  }), ' ', value), key === 'connection' && React__default.createElement(Tag, {
    className: "inline-flex items-center gap-2"
  }, React__default.createElement(FontAwesomeIcon, {
    title: "Connection",
    className: "opacity-50",
    icon: faDatabase
  }), ' ', value), key !== 'runtime' && key !== 'connection' && React__default.createElement(Tag, null, key, ": ", value))), context && React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
    className: "ml-auto"
  }, React__default.createElement(SmallButton, {
    onClick: () => setShowRawContext(!showRawContext)
  }, React__default.createElement(FontAwesomeIcon, {
    icon: showRawContext ? faListUl : faCode,
    className: "text-[8px] ~text-gray-500 group-hover:text-indigo-500"
  }), showRawContext ? 'As list' : 'Raw')))), React__default.createElement("div", null, children), context && React__default.createElement(React__default.Fragment, null, showRawContext ? React__default.createElement(CodeSnippet, {
    value: jsonStringify(context),
    language: "json"
  }) : React__default.createElement("div", {
    className: "pl-4"
  }, React__default.createElement(ContextList, {
    items: context
  }))));
}

function Logs() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const logs = Object.values(errorOccurrence.context_items.logs);
  return React__default.createElement(React__default.Fragment, null, logs.map((log, index) => React__default.createElement(DebugItem, {
    key: index,
    context: log.context,
    level: log.level,
    time: unixToDate(log.microtime)
  }, React__default.createElement(CodeSnippet, {
    value: log.message
  }))));
}

function Dumps() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const dumps = Object.values(errorOccurrence.context_items.dumps);
  return React__default.createElement(React__default.Fragment, null, dumps.map((dump, index) => React__default.createElement(DebugItem, {
    key: index,
    time: unixToDate(dump.microtime)
  }, React__default.createElement("div", {
    className: "mb-2"
  }, React__default.createElement(EditorLink, {
    path: dump.file,
    lineNumber: dump.line_number,
    className: "text-sm"
  })), React__default.createElement(SfDump, {
    value: dump.html_dump
  }))));
}

function Queries() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const queries = Object.values(errorOccurrence.context_items.queries);
  return React__default.createElement(React__default.Fragment, null, queries.map((query, index) => React__default.createElement(DebugItem, {
    key: index,
    time: unixToDate(query.microtime),
    meta: {
      runtime: `${query.time}ms`,
      connection: query.connection_name
    }
  }, React__default.createElement(CodeSnippet, {
    value: query.sql,
    language: "sql"
  }))));
}

function Glows() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const glows = errorOccurrence.glows;
  return React__default.createElement(React__default.Fragment, null, glows.map((glow, index) => React__default.createElement(DebugItem, {
    key: index,
    level: glow.message_level,
    context: glow.meta_data,
    time: unixToDate(glow.microtime)
  }, React__default.createElement(CodeSnippet, {
    value: glow.name
  }))));
}

function Debug() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const dumps = errorOccurrence.context_items.dumps;
  const queries = errorOccurrence.context_items.queries;
  const logs = errorOccurrence.context_items.logs;
  const glows = errorOccurrence.glows;
  return React__default.createElement(ErrorBoundary, null, React__default.createElement(DebugTabs, null, React__default.createElement(DebugTabs.Tab, {
    component: Dumps,
    name: "Dumps",
    count: Object.keys(dumps || []).length
  }), React__default.createElement(DebugTabs.Tab, {
    component: Glows,
    name: "Glows",
    count: glows.length
  }), React__default.createElement(DebugTabs.Tab, {
    component: Queries,
    name: "Queries",
    count: Object.keys(queries || []).length
  }), React__default.createElement(DebugTabs.Tab, {
    component: Logs,
    name: "Logs",
    count: Object.keys(logs || []).length
  })));
}

function InlineCodeSnippet({
  children,
  className = ''
}) {
  return React__default.createElement("code", {
    className: `font-mono leading-relaxed font-normal ~bg-gray-500/5 px-1 py-1 ${className}`
  }, children);
}

function FlareIcon() {
  return React__default.createElement("svg", {
    viewBox: "0 0 682 1024",
    className: "w-4 h-5 ml-1.5"
  }, React__default.createElement("polygon", {
    points: "235.3,510.5 21.5,387 21.5,140.2 236.5,264.1 ",
    style: {
      fill: 'rgb(81, 219, 158)'
    }
  }), React__default.createElement("polygon", {
    points: "235.3,1004.8 21.5,881.4 21.5,634.5 234.8,757.9 ",
    style: {
      fill: 'rgb(121, 0, 245)'
    }
  }), React__default.createElement("polygon", {
    points: "448.9,386.9 21.5,140.2 235.3,16.7 663.2,263.4 ",
    style: {
      fill: 'rgb(148, 242, 200)'
    }
  }), React__default.createElement("polygon", {
    points: "234.8,757.9 21.5,634.5 235.3,511 449.1,634.5 ",
    style: {
      fill: 'rgb(164, 117, 244)'
    }
  }));
}

function IgnitionIcon() {
  return React__default.createElement("svg", {
    id: "ignition",
    className: "w-8 h-8 -ml-1",
    viewBox: "0 0 500 500"
  }, React__default.createElement("g", null, React__default.createElement("polygon", {
    style: {
      fill: 'transparent'
    },
    points: "466.5,375 466.5,125 250,0 33.5,125 33.5,375 250,500 \t"
  }), React__default.createElement("g", null, React__default.createElement("polygon", {
    style: {
      fill: '#ff4590'
    },
    points: "314.2,176 314.2,250 250,287 250,212.6 \t\t"
  }), React__default.createElement("polygon", {
    style: {
      fill: '#ffd000'
    },
    points: "185.9,398.1 185.9,324.1 250,287 249.9,360.9 \t\t"
  }), React__default.createElement("polygon", {
    style: {
      fill: '#de075d'
    },
    points: "250,139.1 250,287 185.9,250 185.8,101.9 \t\t"
  }), React__default.createElement("polygon", {
    style: {
      fill: '#e0b800'
    },
    points: "249.9,360.9 250,287 314.1,324 314.1,398.1 \t\t"
  }))));
}

export { Button, CodeSnippet, Context, CopyButton, Debug, ErrorBoundary, ErrorCard, ErrorOccurrenceContext, FlareIcon, IgnitionConfigContext, IgnitionConfigContextProvider, IgnitionIcon, InlineCodeSnippet, StackTrace, hasDebugInfo };
