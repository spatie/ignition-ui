import React, { createContext, useState, useEffect, useContext, useMemo, useReducer, useLayoutEffect, useRef, Children } from 'react';

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
function noop() {// No operation performed.
}

var noop_1 = noop;

var IgnitionConfigContext = createContext({
  /* @ts-ignore */
  ignitionConfig: {},
  setIgnitionConfig: noop_1
});

const PREFERENCES = {
  DARK: 'dark',
  LIGHT: 'light',
  NONE: 'no-preference'
};
const values = [PREFERENCES.DARK, PREFERENCES.LIGHT, PREFERENCES.NONE];

const makeQuery = pref => `(prefers-color-scheme: ${pref})`;

const matchPreference = pref => window.matchMedia(makeQuery(pref));

const getPreference = preferences => preferences.map(value => ({
  preference: value,
  matchMedia: matchPreference(value)
})).filter(pref => pref.matchMedia.matches)[0];

const attachListener = (pref, setScheme) => {
  let unbind;

  const listener = () => {
    const newPref = getPreference(values);
    setScheme(newPref.preference);
    pref.matchMedia.removeListener(listener); // recursion
    // NOTE: we need to attach a new listener to ensure it fires on next change

    unbind = attachListener(newPref, setScheme);
  };

  pref.matchMedia.addListener(listener);
  return () => {
    if (unbind) {
      unbind();
    } else {
      pref.matchMedia.removeListener(listener);
    }
  };
}; // NOTE: outside hook to avoid this value recomputing


const initialPreference = getPreference(values);

const useColorScheme = () => {
  if (!('matchMedia' in window)) {
    // can not detect
    return {
      scheme: PREFERENCES.NONE
    };
  }

  const [scheme, setScheme] = useState(initialPreference ? initialPreference.preference : PREFERENCES.NONE);
  useEffect(() => {
    if (!initialPreference) return;
    return attachListener(initialPreference, setScheme);
  }, []);
  return {
    scheme
  };
};

function IgnitionConfigContextProvider({
  children,
  ignitionConfig: initialIgnitionConfig
}) {
  const [ignitionConfig, setIgnitionConfig] = useState(initialIgnitionConfig);
  const {
    scheme
  } = useColorScheme();
  const theme = ignitionConfig.theme === 'auto' ? scheme !== 'none' ? scheme : 'light' : ignitionConfig.theme;
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);
  return /*#__PURE__*/React.createElement(IgnitionConfigContext.Provider, {
    value: {
      ignitionConfig,
      setIgnitionConfig,
      theme
    }
  }, children);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var main$1 = createCommonjsModule(function (module, exports) {
  !function (t, n) {
    module.exports = n() ;
  }(commonjsGlobal, function () {
    return t = {
      770: function (t, n, e) {

        var r = this && this.__importDefault || function (t) {
          return t && t.__esModule ? t : {
            default: t
          };
        };

        Object.defineProperty(n, "__esModule", {
          value: !0
        }), n.setDefaultDebugCall = n.createOnigScanner = n.createOnigString = n.loadWASM = n.OnigScanner = n.OnigString = void 0;
        const i = r(e(418));
        let o = null,
            a = !1;

        class f {
          constructor(t) {
            const n = t.length,
                  e = f._utf8ByteLength(t),
                  r = e !== n,
                  i = r ? new Uint32Array(n + 1) : null;

            r && (i[n] = e);
            const o = r ? new Uint32Array(e + 1) : null;
            r && (o[e] = n);
            const a = new Uint8Array(e);
            let s = 0;

            for (let _e = 0; _e < n; _e++) {
              const f = t.charCodeAt(_e);
              let u = f,
                  c = !1;

              if (f >= 55296 && f <= 56319 && _e + 1 < n) {
                const _n = t.charCodeAt(_e + 1);

                _n >= 56320 && _n <= 57343 && (u = 65536 + (f - 55296 << 10) | _n - 56320, c = !0);
              }

              r && (i[_e] = s, c && (i[_e + 1] = s), u <= 127 ? o[s + 0] = _e : u <= 2047 ? (o[s + 0] = _e, o[s + 1] = _e) : u <= 65535 ? (o[s + 0] = _e, o[s + 1] = _e, o[s + 2] = _e) : (o[s + 0] = _e, o[s + 1] = _e, o[s + 2] = _e, o[s + 3] = _e)), u <= 127 ? a[s++] = u : u <= 2047 ? (a[s++] = 192 | (1984 & u) >>> 6, a[s++] = 128 | (63 & u) >>> 0) : u <= 65535 ? (a[s++] = 224 | (61440 & u) >>> 12, a[s++] = 128 | (4032 & u) >>> 6, a[s++] = 128 | (63 & u) >>> 0) : (a[s++] = 240 | (1835008 & u) >>> 18, a[s++] = 128 | (258048 & u) >>> 12, a[s++] = 128 | (4032 & u) >>> 6, a[s++] = 128 | (63 & u) >>> 0), c && _e++;
            }

            this.utf16Length = n, this.utf8Length = e, this.utf16Value = t, this.utf8Value = a, this.utf16OffsetToUtf8 = i, this.utf8OffsetToUtf16 = o;
          }

          static _utf8ByteLength(t) {
            let n = 0;

            for (let e = 0, r = t.length; e < r; e++) {
              const i = t.charCodeAt(e);
              let o = i,
                  a = !1;

              if (i >= 55296 && i <= 56319 && e + 1 < r) {
                const _n2 = t.charCodeAt(e + 1);

                _n2 >= 56320 && _n2 <= 57343 && (o = 65536 + (i - 55296 << 10) | _n2 - 56320, a = !0);
              }

              n += o <= 127 ? 1 : o <= 2047 ? 2 : o <= 65535 ? 3 : 4, a && e++;
            }

            return n;
          }

          createString(t) {
            const n = t._omalloc(this.utf8Length);

            return t.HEAPU8.set(this.utf8Value, n), n;
          }

        }

        class s {
          constructor(t) {
            if (this.id = ++s.LAST_ID, !o) throw new Error("Must invoke loadWASM first.");
            this._onigBinding = o, this.content = t;
            const n = new f(t);
            this.utf16Length = n.utf16Length, this.utf8Length = n.utf8Length, this.utf16OffsetToUtf8 = n.utf16OffsetToUtf8, this.utf8OffsetToUtf16 = n.utf8OffsetToUtf16, this.utf8Length < 1e4 && !s._sharedPtrInUse ? (s._sharedPtr || (s._sharedPtr = o._omalloc(1e4)), s._sharedPtrInUse = !0, o.HEAPU8.set(n.utf8Value, s._sharedPtr), this.ptr = s._sharedPtr) : this.ptr = n.createString(o);
          }

          convertUtf8OffsetToUtf16(t) {
            return this.utf8OffsetToUtf16 ? t < 0 ? 0 : t > this.utf8Length ? this.utf16Length : this.utf8OffsetToUtf16[t] : t;
          }

          convertUtf16OffsetToUtf8(t) {
            return this.utf16OffsetToUtf8 ? t < 0 ? 0 : t > this.utf16Length ? this.utf8Length : this.utf16OffsetToUtf8[t] : t;
          }

          dispose() {
            this.ptr === s._sharedPtr ? s._sharedPtrInUse = !1 : this._onigBinding._ofree(this.ptr);
          }

        }

        n.OnigString = s, s.LAST_ID = 0, s._sharedPtr = 0, s._sharedPtrInUse = !1;

        class u {
          constructor(t) {
            if (!o) throw new Error("Must invoke loadWASM first.");
            const n = [],
                  e = [];

            for (let _r = 0, _i = t.length; _r < _i; _r++) {
              const _i2 = new f(t[_r]);

              n[_r] = _i2.createString(o), e[_r] = _i2.utf8Length;
            }

            const r = o._omalloc(4 * t.length);

            o.HEAPU32.set(n, r / 4);

            const i = o._omalloc(4 * t.length);

            o.HEAPU32.set(e, i / 4);

            const a = o._createOnigScanner(r, i, t.length);

            for (let _e2 = 0, _r2 = t.length; _e2 < _r2; _e2++) o._ofree(n[_e2]);

            o._ofree(i), o._ofree(r), 0 === a && function (t) {
              throw new Error(t.UTF8ToString(t._getLastOnigError()));
            }(o), this._onigBinding = o, this._ptr = a;
          }

          dispose() {
            this._onigBinding._freeOnigScanner(this._ptr);
          }

          findNextMatchSync(t, n, e) {
            let r = a,
                i = 0;

            if ("number" == typeof e ? (8 & e && (r = !0), i = e) : "boolean" == typeof e && (r = e), "string" == typeof t) {
              t = new s(t);

              const _e3 = this._findNextMatchSync(t, n, r, i);

              return t.dispose(), _e3;
            }

            return this._findNextMatchSync(t, n, r, i);
          }

          _findNextMatchSync(t, n, e, r) {
            const i = this._onigBinding;
            let o;
            if (o = e ? i._findNextOnigScannerMatchDbg(this._ptr, t.id, t.ptr, t.utf8Length, t.convertUtf16OffsetToUtf8(n), r) : i._findNextOnigScannerMatch(this._ptr, t.id, t.ptr, t.utf8Length, t.convertUtf16OffsetToUtf8(n), r), 0 === o) return null;
            const a = i.HEAPU32;
            let f = o / 4;
            const s = a[f++],
                  u = a[f++];
            let c = [];

            for (let _n3 = 0; _n3 < u; _n3++) {
              const _e4 = t.convertUtf8OffsetToUtf16(a[f++]),
                    _r3 = t.convertUtf8OffsetToUtf16(a[f++]);

              c[_n3] = {
                start: _e4,
                end: _r3,
                length: _r3 - _e4
              };
            }

            return {
              index: s,
              captureIndices: c
            };
          }

        }

        n.OnigScanner = u;
        let c = !1,
            l = null;
        n.loadWASM = function (t) {
          if (c) return l;
          let n, e, r, a;
          if (c = !0, function (t) {
            return "function" == typeof t.instantiator;
          }(t)) n = t.instantiator, e = t.print;else {
            let _r4;

            t instanceof ArrayBuffer || t instanceof Response ? _r4 = t : (_r4 = t.data, e = t.print), n = _r4 instanceof ArrayBuffer ? function (t) {
              return n => WebAssembly.instantiate(t, n);
            }(_r4) : _r4 instanceof Response && "function" == typeof WebAssembly.instantiateStreaming ? function (t) {
              return n => WebAssembly.instantiateStreaming(t, n);
            }(_r4) : function (t) {
              return async n => {
                const e = await t.arrayBuffer();
                return WebAssembly.instantiate(e, n);
              };
            }(_r4);
          }
          return l = new Promise((t, n) => {
            r = t, a = n;
          }), function (t, n, e, r) {
            i.default({
              print: n,
              instantiateWasm: (n, e) => {
                if ("undefined" == typeof performance) {
                  const t = () => Date.now();

                  n.env.emscripten_get_now = t, n.wasi_snapshot_preview1.emscripten_get_now = t;
                }

                return t(n).then(t => e(t.instance), r), {};
              }
            }).then(t => {
              o = t, e();
            });
          }(n, e, r, a), l;
        }, n.createOnigString = function (t) {
          return new s(t);
        }, n.createOnigScanner = function (t) {
          return new u(t);
        }, n.setDefaultDebugCall = function (t) {
          a = t;
        };
      },
      418: t => {
        var n = (function (t) {
          var n,
              e,
              r = void 0 !== (t = t || {}) ? t : {};
          r.ready = new Promise(function (t, r) {
            n = t, e = r;
          });
          var i,
              o = {};

          for (i in r) r.hasOwnProperty(i) && (o[i] = r[i]);

          var a,
              u = !1,
              l = "";

          function p(t) {
            return r.locateFile ? r.locateFile(t, l) : l + t;
          }

          (a = function (t) {
            var n;
            return "function" == typeof readbuffer ? new Uint8Array(readbuffer(t)) : (v("object" == typeof (n = read(t, "binary"))), n);
          }, "undefined" != typeof scriptArgs ? scriptArgs : void 0 !== arguments && (arguments), "undefined" != typeof onig_print && ("undefined" == typeof console && (console = {}), console.log = onig_print, console.warn = console.error = "undefined" != typeof printErr ? printErr : onig_print));
          var h = r.print || console.log.bind(console),
              g = r.printErr || console.warn.bind(console);

          for (i in o) o.hasOwnProperty(i) && (r[i] = o[i]);

          o = null;

          var d,
              _;

          r.wasmBinary && (d = r.wasmBinary), "object" != typeof WebAssembly && z("no native wasm support detected");
          var y = !1;

          function v(t, n) {
            t || z("Assertion failed: " + n);
          }

          var w,
              S,
              A,
              b = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

          function O(t, n, e) {
            for (var r = n + e, i = n; t[i] && !(i >= r);) ++i;

            if (i - n > 16 && t.subarray && b) return b.decode(t.subarray(n, i));

            for (var o = ""; n < i;) {
              var a = t[n++];

              if (128 & a) {
                var f = 63 & t[n++];

                if (192 != (224 & a)) {
                  var s = 63 & t[n++];
                  if ((a = 224 == (240 & a) ? (15 & a) << 12 | f << 6 | s : (7 & a) << 18 | f << 12 | s << 6 | 63 & t[n++]) < 65536) o += String.fromCharCode(a);else {
                    var u = a - 65536;
                    o += String.fromCharCode(55296 | u >> 10, 56320 | 1023 & u);
                  }
                } else o += String.fromCharCode((31 & a) << 6 | f);
              } else o += String.fromCharCode(a);
            }

            return o;
          }

          function U(t, n) {
            return t ? O(S, t, n) : "";
          }

          function x(t, n) {
            return t % n > 0 && (t += n - t % n), t;
          }

          function P(t) {
            w = t, r.HEAP8 = new Int8Array(t), r.HEAP16 = new Int16Array(t), r.HEAP32 = A = new Int32Array(t), r.HEAPU8 = S = new Uint8Array(t), r.HEAPU16 = new Uint16Array(t), r.HEAPU32 = new Uint32Array(t), r.HEAPF32 = new Float32Array(t), r.HEAPF64 = new Float64Array(t);
          }

          "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
          var T,
              R = [],
              E = [],
              M = [],
              L = [];

          function I() {
            if (r.preRun) for ("function" == typeof r.preRun && (r.preRun = [r.preRun]); r.preRun.length;) N(r.preRun.shift());
            $(R);
          }

          function D() {
            $(E);
          }

          function W() {
            $(M);
          }

          function C() {
            if (r.postRun) for ("function" == typeof r.postRun && (r.postRun = [r.postRun]); r.postRun.length;) B(r.postRun.shift());
            $(L);
          }

          function N(t) {
            R.unshift(t);
          }

          function B(t) {
            L.unshift(t);
          }

          E.push({
            func: function () {
              ut();
            }
          });
          var k = 0,
              j = null;

          function F(t) {
            k++, r.monitorRunDependencies && r.monitorRunDependencies(k);
          }

          function V(t) {
            if (k--, r.monitorRunDependencies && r.monitorRunDependencies(k), 0 == k && (j)) {
              var n = j;
              j = null, n();
            }
          }

          function z(t) {
            r.onAbort && r.onAbort(t), g(t += ""), y = !0, t = "abort(" + t + "). Build with -s ASSERTIONS=1 for more info.";
            var n = new WebAssembly.RuntimeError(t);
            throw e(n), n;
          }

          function q(t, n) {
            return String.prototype.startsWith ? t.startsWith(n) : 0 === t.indexOf(n);
          }

          r.preloadedImages = {}, r.preloadedAudios = {};
          var Y = "data:application/octet-stream;base64,";

          function G(t) {
            return q(t, Y);
          }

          var J,
              K = "onig.wasm";

          function Q(t) {
            try {
              if (t == K && d) return new Uint8Array(d);
              if (a) return a(t);
              throw "both async and sync fetching of the wasm failed";
            } catch (t) {
              z(t);
            }
          }

          function X() {
            return d || !u || "function" != typeof fetch ? Promise.resolve().then(function () {
              return Q(K);
            }) : fetch(K, {
              credentials: "same-origin"
            }).then(function (t) {
              if (!t.ok) throw "failed to load wasm binary file at '" + K + "'";
              return t.arrayBuffer();
            }).catch(function () {
              return Q(K);
            });
          }

          function Z() {
            var t = {
              env: st,
              wasi_snapshot_preview1: st
            };

            function n(t, n) {
              var e = t.exports;
              r.asm = e, P((_ = r.asm.memory).buffer), T = r.asm.__indirect_function_table, V();
            }

            function i(t) {
              n(t.instance);
            }

            function o(n) {
              return X().then(function (n) {
                return WebAssembly.instantiate(n, t);
              }).then(n, function (t) {
                g("failed to asynchronously prepare wasm: " + t), z(t);
              });
            }

            if (F(), r.instantiateWasm) try {
              return r.instantiateWasm(t, n);
            } catch (t) {
              return g("Module.instantiateWasm callback failed with error: " + t), !1;
            }
            return (d || "function" != typeof WebAssembly.instantiateStreaming || G(K) || "function" != typeof fetch ? o(i) : fetch(K, {
              credentials: "same-origin"
            }).then(function (n) {
              return WebAssembly.instantiateStreaming(n, t).then(i, function (t) {
                return g("wasm streaming compile failed: " + t), g("falling back to ArrayBuffer instantiation"), o(i);
              });
            })).catch(e), {};
          }

          function $(t) {
            for (; t.length > 0;) {
              var n = t.shift();

              if ("function" != typeof n) {
                var e = n.func;
                "number" == typeof e ? void 0 === n.arg ? T.get(e)() : T.get(e)(n.arg) : e(void 0 === n.arg ? null : n.arg);
              } else n(r);
            }
          }

          function tt(t, n, e) {
            S.copyWithin(t, n, n + e);
          }

          function nt() {
            return S.length;
          }

          function et(t) {
            try {
              return _.grow(t - w.byteLength + 65535 >>> 16), P(_.buffer), 1;
            } catch (t) {}
          }

          function rt(t) {
            var n = nt(),
                e = 2147483648;
            if (t > e) return !1;

            for (var r = 1; r <= 4; r *= 2) {
              var i = n * (1 + .2 / r);
              if (i = Math.min(i, t + 100663296), et(Math.min(e, x(Math.max(t, i), 65536)))) return !0;
            }

            return !1;
          }

          G(K) || (K = p(K)), J = "undefined" != typeof dateNow ? dateNow : function () {
            return performance.now();
          };
          var it = {
            mappings: {},
            buffers: [null, [], []],
            printChar: function (t, n) {
              var e = it.buffers[t];
              0 === n || 10 === n ? ((1 === t ? h : g)(O(e, 0)), e.length = 0) : e.push(n);
            },
            varargs: void 0,
            get: function () {
              return it.varargs += 4, A[it.varargs - 4 >> 2];
            },
            getStr: function (t) {
              return U(t);
            },
            get64: function (t, n) {
              return t;
            }
          };

          function ot(t, n, e, r) {
            for (var i = 0, o = 0; o < e; o++) {
              for (var a = A[n + 8 * o >> 2], f = A[n + (8 * o + 4) >> 2], s = 0; s < f; s++) it.printChar(t, S[a + s]);

              i += f;
            }

            return A[r >> 2] = i, 0;
          }

          function at(t) {
          }

          var ft,
              st = {
            emscripten_get_now: J,
            emscripten_memcpy_big: tt,
            emscripten_resize_heap: rt,
            fd_write: ot,
            setTempRet0: at
          },
              ut = (Z(), r.___wasm_call_ctors = function () {
            return (ut = r.___wasm_call_ctors = r.asm.__wasm_call_ctors).apply(null, arguments);
          });

          function ct(t) {
            function e() {
              ft || (ft = !0, r.calledRun = !0, y || (D(), W(), n(r), r.onRuntimeInitialized && r.onRuntimeInitialized(), C()));
            }

            k > 0 || (I(), k > 0 || (r.setStatus ? (r.setStatus("Running..."), setTimeout(function () {
              setTimeout(function () {
                r.setStatus("");
              }, 1), e();
            }, 1)) : e()));
          }

          if (r.___errno_location = function () {
            return (r.___errno_location = r.asm.__errno_location).apply(null, arguments);
          }, r._omalloc = function () {
            return (r._omalloc = r.asm.omalloc).apply(null, arguments);
          }, r._ofree = function () {
            return (r._ofree = r.asm.ofree).apply(null, arguments);
          }, r._getLastOnigError = function () {
            return (r._getLastOnigError = r.asm.getLastOnigError).apply(null, arguments);
          }, r._createOnigScanner = function () {
            return (r._createOnigScanner = r.asm.createOnigScanner).apply(null, arguments);
          }, r._freeOnigScanner = function () {
            return (r._freeOnigScanner = r.asm.freeOnigScanner).apply(null, arguments);
          }, r._findNextOnigScannerMatch = function () {
            return (r._findNextOnigScannerMatch = r.asm.findNextOnigScannerMatch).apply(null, arguments);
          }, r._findNextOnigScannerMatchDbg = function () {
            return (r._findNextOnigScannerMatchDbg = r.asm.findNextOnigScannerMatchDbg).apply(null, arguments);
          }, r.stackSave = function () {
            return (r.stackSave = r.asm.stackSave).apply(null, arguments);
          }, r.stackRestore = function () {
            return (r.stackRestore = r.asm.stackRestore).apply(null, arguments);
          }, r.stackAlloc = function () {
            return (r.stackAlloc = r.asm.stackAlloc).apply(null, arguments);
          }, r.dynCall_jiji = function () {
            return (r.dynCall_jiji = r.asm.dynCall_jiji).apply(null, arguments);
          }, r.UTF8ToString = U, j = function t() {
            ft || ct(), ft || (j = t);
          }, r.run = ct, r.preInit) for ("function" == typeof r.preInit && (r.preInit = [r.preInit]); r.preInit.length > 0;) r.preInit.pop()();
          return ct(), t.ready;
        });
        t.exports = n;
      }
    }, n = {}, function e(r) {
      var i = n[r];
      if (void 0 !== i) return i.exports;
      var o = n[r] = {
        exports: {}
      };
      return t[r].call(o.exports, o, o.exports, e), o.exports;
    }(770);
    var t, n;
  });
});

var main = createCommonjsModule(function (module, exports) {
  !function (e, t) {
    module.exports = t() ;
  }(commonjsGlobal, function () {
    return function (e) {
      var t = {};

      function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {
          i: r,
          l: !1,
          exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
      }

      return n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: r
        });
      }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(e, "__esModule", {
          value: !0
        });
      }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
          enumerable: !0,
          value: e
        }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
          return e[t];
        }.bind(null, i));
        return r;
      }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
          return e.default;
        } : function () {
          return e;
        };
        return n.d(t, "a", t), t;
      }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }, n.p = "", n(n.s = 3);
    }([function (e, t, n) {

      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(1),
          i = n(5),
          o = n(6),
          s = n(2),
          a = "undefined" == typeof performance ? function () {
        return Date.now();
      } : function () {
        return performance.now();
      };

      t.createGrammar = function (e, t, n, r, i, o) {
        return new v(e, t, n, r, i, o);
      };

      var c = function c(e) {
        this.scopeName = e;
      };

      t.FullScopeDependency = c;

      var u = function () {
        function e(e, t) {
          this.scopeName = e, this.include = t;
        }

        return e.prototype.toKey = function () {
          return this.scopeName + "#" + this.include;
        }, e;
      }();

      t.PartialScopeDependency = u;

      var l = function () {
        function e() {
          this.full = [], this.partial = [], this.visitedRule = new Set(), this._seenFull = new Set(), this._seenPartial = new Set();
        }

        return e.prototype.add = function (e) {
          e instanceof c ? this._seenFull.has(e.scopeName) || (this._seenFull.add(e.scopeName), this.full.push(e)) : this._seenPartial.has(e.toKey()) || (this._seenPartial.add(e.toKey()), this.partial.push(e));
        }, e;
      }();

      function h(e, t, n, i, o) {
        for (var s = 0, a = i; s < a.length; s++) {
          var l = a[s];

          if (!e.visitedRule.has(l)) {
            e.visitedRule.add(l);
            var d = l.repository ? r.mergeObjects({}, o, l.repository) : o;
            Array.isArray(l.patterns) && h(e, t, n, l.patterns, d);
            var g = l.include;
            if (g) if ("$base" === g || g === t.scopeName) f(e, t, t);else if ("$self" === g || g === n.scopeName) f(e, t, n);else if ("#" === g.charAt(0)) p(e, t, n, g.substring(1), d);else {
              var m = g.indexOf("#");

              if (m >= 0) {
                var _ = g.substring(0, m),
                    y = g.substring(m + 1);

                _ === t.scopeName ? p(e, t, t, y, d) : _ === n.scopeName ? p(e, t, n, y, d) : e.add(new u(_, g.substring(m + 1)));
              } else e.add(new c(g));
            }
          }
        }
      }

      function p(e, t, n, r, i) {
        (void 0 === i && (i = n.repository), i && i[r]) && h(e, t, n, [i[r]], i);
      }

      function f(e, t, n) {
        if (n.patterns && Array.isArray(n.patterns) && h(e, t, n, n.patterns, n.repository), n.injections) {
          var r = [];

          for (var i in n.injections) r.push(n.injections[i]);

          h(e, t, n, r, n.repository);
        }
      }

      function d(e, t) {
        if (!e) return !1;
        if (e === t) return !0;
        var n = t.length;
        return e.length > n && e.substr(0, n) === t && "." === e[n];
      }

      function g(e, t) {
        if (t.length < e.length) return !1;
        var n = 0;
        return e.every(function (e) {
          for (var r = n; r < t.length; r++) if (d(t[r], e)) return n = r + 1, !0;

          return !1;
        });
      }

      function m(e, t, n, r, s) {
        for (var a = o.createMatchers(t, g), c = i.RuleFactory.getCompiledRuleId(n, r, s.repository), u = 0, l = a; u < l.length; u++) {
          var h = l[u];
          e.push({
            matcher: h.matcher,
            ruleId: c,
            grammar: s,
            priority: h.priority
          });
        }
      }

      t.ScopeDependencyCollector = l, t.collectSpecificDependencies = p, t.collectDependencies = f;

      var _ = function _(e, t, n, r) {
        this.scopeName = e, this.languageId = t, this.tokenType = n, this.themeData = r;
      };

      t.ScopeMetadata = _;

      var y = function () {
        function e(t, n, r) {
          if (this._initialLanguage = t, this._themeProvider = n, this._cache = new Map(), this._defaultMetaData = new _("", this._initialLanguage, 0, [this._themeProvider.getDefaults()]), this._embeddedLanguages = Object.create(null), r) for (var i = Object.keys(r), o = 0, s = i.length; o < s; o++) {
            var a = i[o],
                c = r[a];
            "number" == typeof c && 0 !== c ? this._embeddedLanguages[a] = c : console.warn("Invalid embedded language found at scope " + a + ": <<" + c + ">>");
          }
          var u = Object.keys(this._embeddedLanguages).map(function (t) {
            return e._escapeRegExpCharacters(t);
          });
          0 === u.length ? this._embeddedLanguagesRegex = null : (u.sort(), u.reverse(), this._embeddedLanguagesRegex = new RegExp("^((" + u.join(")|(") + "))($|\\.)", ""));
        }

        return e.prototype.onDidChangeTheme = function () {
          this._cache = new Map(), this._defaultMetaData = new _("", this._initialLanguage, 0, [this._themeProvider.getDefaults()]);
        }, e.prototype.getDefaultMetadata = function () {
          return this._defaultMetaData;
        }, e._escapeRegExpCharacters = function (e) {
          return e.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
        }, e.prototype.getMetadataForScope = function (t) {
          if (null === t) return e._NULL_SCOPE_METADATA;

          var n = this._cache.get(t);

          return n || (n = this._doGetMetadataForScope(t), this._cache.set(t, n), n);
        }, e.prototype._doGetMetadataForScope = function (e) {
          var t = this._scopeToLanguage(e),
              n = this._toStandardTokenType(e),
              r = this._themeProvider.themeMatch(e);

          return new _(e, t, n, r);
        }, e.prototype._scopeToLanguage = function (e) {
          if (!e) return 0;
          if (!this._embeddedLanguagesRegex) return 0;
          var t = e.match(this._embeddedLanguagesRegex);
          if (!t) return 0;
          var n = this._embeddedLanguages[t[1]] || 0;
          return n || 0;
        }, e.prototype._toStandardTokenType = function (t) {
          var n = t.match(e.STANDARD_TOKEN_TYPE_REGEXP);
          if (!n) return 0;

          switch (n[1]) {
            case "comment":
              return 1;

            case "string":
              return 2;

            case "regex":
              return 4;

            case "meta.embedded":
              return 8;
          }

          throw new Error("Unexpected match for standard token type!");
        }, e._NULL_SCOPE_METADATA = new _("", 0, 0, null), e.STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/, e;
      }(),
          v = function () {
        function e(e, t, n, r, i, s) {
          if (this._scopeMetadataProvider = new y(t, i, n), this._onigLib = s, this._rootId = -1, this._lastRuleId = 0, this._ruleId2desc = [null], this._includedGrammars = {}, this._grammarRepository = i, this._grammar = C(e, null), this._injections = null, this._tokenTypeMatchers = [], r) for (var a = 0, c = Object.keys(r); a < c.length; a++) for (var u = c[a], l = 0, h = o.createMatchers(u, g); l < h.length; l++) {
            var p = h[l];

            this._tokenTypeMatchers.push({
              matcher: p.matcher,
              type: r[u]
            });
          }
        }

        return e.prototype.dispose = function () {
          for (var e = 0, t = this._ruleId2desc; e < t.length; e++) {
            var n = t[e];
            n && n.dispose();
          }
        }, e.prototype.createOnigScanner = function (e) {
          return this._onigLib.createOnigScanner(e);
        }, e.prototype.createOnigString = function (e) {
          return this._onigLib.createOnigString(e);
        }, e.prototype.onDidChangeTheme = function () {
          this._scopeMetadataProvider.onDidChangeTheme();
        }, e.prototype.getMetadataForScope = function (e) {
          return this._scopeMetadataProvider.getMetadataForScope(e);
        }, e.prototype.getInjections = function () {
          var e = this;

          if (null === this._injections) {
            this._injections = [];
            var t = this._grammar.injections;
            if (t) for (var n in t) m(this._injections, n, t[n], this, this._grammar);

            if (this._grammarRepository) {
              var r = this._grammarRepository.injections(this._grammar.scopeName);

              r && r.forEach(function (t) {
                var n = e.getExternalGrammar(t);

                if (n) {
                  var r = n.injectionSelector;
                  r && m(e._injections, r, n, e, n);
                }
              });
            }

            this._injections.sort(function (e, t) {
              return e.priority - t.priority;
            });
          }

          return this._injections;
        }, e.prototype.registerRule = function (e) {
          var t = ++this._lastRuleId,
              n = e(t);
          return this._ruleId2desc[t] = n, n;
        }, e.prototype.getRule = function (e) {
          return this._ruleId2desc[e];
        }, e.prototype.getExternalGrammar = function (e, t) {
          if (this._includedGrammars[e]) return this._includedGrammars[e];

          if (this._grammarRepository) {
            var n = this._grammarRepository.lookup(e);

            if (n) return this._includedGrammars[e] = C(n, t && t.$base), this._includedGrammars[e];
          }

          return null;
        }, e.prototype.tokenizeLine = function (e, t) {
          var n = this._tokenize(e, t, !1);

          return {
            tokens: n.lineTokens.getResult(n.ruleStack, n.lineLength),
            ruleStack: n.ruleStack
          };
        }, e.prototype.tokenizeLine2 = function (e, t) {
          var n = this._tokenize(e, t, !0);

          return {
            tokens: n.lineTokens.getBinaryResult(n.ruleStack, n.lineLength),
            ruleStack: n.ruleStack
          };
        }, e.prototype._tokenize = function (e, t, n) {
          var r;
          if (-1 === this._rootId && (this._rootId = i.RuleFactory.getCompiledRuleId(this._grammar.repository.$self, this, this._grammar.repository)), t && t !== I.NULL) r = !1, t.reset();else {
            r = !0;

            var o = this._scopeMetadataProvider.getDefaultMetadata(),
                s = o.themeData[0],
                a = P.set(0, o.languageId, o.tokenType, s.fontStyle, s.foreground, s.background),
                c = this.getRule(this._rootId).getName(null, null),
                u = this._scopeMetadataProvider.getMetadataForScope(c),
                l = x.mergeMetadata(a, null, u),
                h = new x(null, null === c ? "unknown" : c, l);

            t = new I(null, this._rootId, -1, -1, !1, null, h, h);
          }
          e += "\n";
          var p = this.createOnigString(e),
              f = p.content.length,
              d = new T(n, e, this._tokenTypeMatchers),
              g = S(this, p, r, 0, t, d, !0);
          return b(p), {
            lineLength: f,
            lineTokens: d,
            ruleStack: g
          };
        }, e;
      }();

      function b(e) {
        "function" == typeof e.dispose && e.dispose();
      }

      function C(e, t) {
        return (e = r.clone(e)).repository = e.repository || {}, e.repository.$self = {
          $vscodeTextmateLocation: e.$vscodeTextmateLocation,
          patterns: e.patterns,
          name: e.scopeName
        }, e.repository.$base = t || e.repository.$self, e;
      }

      function w(e, t, n, r, i, o, s) {
        if (0 !== o.length) {
          for (var a = t.content, c = Math.min(o.length, s.length), u = [], l = s[0].end, h = 0; h < c; h++) {
            var p = o[h];

            if (null !== p) {
              var f = s[h];

              if (0 !== f.length) {
                if (f.start > l) break;

                for (; u.length > 0 && u[u.length - 1].endPos <= f.start;) i.produceFromScopes(u[u.length - 1].scopes, u[u.length - 1].endPos), u.pop();

                if (u.length > 0 ? i.produceFromScopes(u[u.length - 1].scopes, f.start) : i.produce(r, f.start), p.retokenizeCapturedWithRuleId) {
                  var d = p.getName(a, s),
                      g = r.contentNameScopesList.push(e, d),
                      m = p.getContentName(a, s),
                      _ = g.push(e, m),
                      y = r.push(p.retokenizeCapturedWithRuleId, f.start, -1, !1, null, g, _),
                      v = e.createOnigString(a.substring(0, f.end));

                  S(e, v, n && 0 === f.start, f.start, y, i, !1), b(v);
                } else {
                  var C = p.getName(a, s);

                  if (null !== C) {
                    var w = (u.length > 0 ? u[u.length - 1].scopes : r.contentNameScopesList).push(e, C);
                    u.push(new A(w, f.end));
                  }
                }
              }
            }
          }

          for (; u.length > 0;) i.produceFromScopes(u[u.length - 1].scopes, u[u.length - 1].endPos), u.pop();
        }
      }

      function k(e) {
        for (var t = [], n = 0, r = e.rules.length; n < r; n++) t.push("   - " + e.rules[n] + ": " + e.debugRegExps[n]);

        return t.join("\n");
      }

      function R(e, t, n, r, i, o) {
        var c = function (e, t, n, r, i, o) {
          var c = i.getRule(e),
              u = c.compile(e, i.endRule, n, r === o),
              l = 0;
          s.DebugFlags.InDebugMode && (l = a());
          var h = u.scanner.findNextMatchSync(t, r);

          if (s.DebugFlags.InDebugMode) {
            var p = a() - l;
            p > 5 && console.warn("Rule " + c.debugName + " (" + c.id + ") matching took " + p + " against '" + t + "'"), h && console.log("matched rule id: " + u.rules[h.index] + " from " + h.captureIndices[0].start + " to " + h.captureIndices[0].end);
          }

          return h ? {
            captureIndices: h.captureIndices,
            matchedRuleId: u.rules[h.index]
          } : null;
        }(e, t, n, r, i, o),
            u = e.getInjections();

        if (0 === u.length) return c;

        var l = function (e, t, n, r, i, o, a) {
          for (var c, u = Number.MAX_VALUE, l = null, h = 0, p = o.contentNameScopesList.generateScopes(), f = 0, d = e.length; f < d; f++) {
            var g = e[f];

            if (g.matcher(p)) {
              var m = t.getRule(g.ruleId).compile(t, null, r, i === a),
                  _ = m.scanner.findNextMatchSync(n, i);

              if (s.DebugFlags.InDebugMode && (console.log("  scanning for injections"), console.log(k(m))), _) {
                var y = _.captureIndices[0].start;
                if (!(y >= u) && (u = y, l = _.captureIndices, c = m.rules[_.index], h = g.priority, u === i)) break;
              }
            }
          }

          return l ? {
            priorityMatch: -1 === h,
            captureIndices: l,
            matchedRuleId: c
          } : null;
        }(u, e, t, n, r, i, o);

        if (!l) return c;
        if (!c) return l;
        var h = c.captureIndices[0].start,
            p = l.captureIndices[0].start;
        return p < h || l.priorityMatch && p === h ? l : c;
      }

      function S(e, t, n, r, o, a, c) {
        var u = t.content.length,
            l = !1,
            h = -1;

        if (c) {
          var p = function (e, t, n, r, o, a) {
            for (var c = o.beginRuleCapturedEOL ? 0 : -1, u = [], l = o; l; l = l.pop()) {
              var h = l.getRule(e);
              h instanceof i.BeginWhileRule && u.push({
                rule: h,
                stack: l
              });
            }

            for (var p = u.pop(); p; p = u.pop()) {
              var f = p.rule.compileWhile(e, p.stack.endRule, n, c === r),
                  d = f.scanner.findNextMatchSync(t, r);

              if (s.DebugFlags.InDebugMode && (console.log("  scanning for while rule"), console.log(k(f))), !d) {
                s.DebugFlags.InDebugMode && console.log("  popping " + p.rule.debugName + " - " + p.rule.debugWhileRegExp), o = p.stack.pop();
                break;
              }

              if (-2 !== f.rules[d.index]) {
                o = p.stack.pop();
                break;
              }

              d.captureIndices && d.captureIndices.length && (a.produce(p.stack, d.captureIndices[0].start), w(e, t, n, p.stack, a, p.rule.whileCaptures, d.captureIndices), a.produce(p.stack, d.captureIndices[0].end), c = d.captureIndices[0].end, d.captureIndices[0].end > r && (r = d.captureIndices[0].end, n = !1));
            }

            return {
              stack: o,
              linePos: r,
              anchorPosition: c,
              isFirstLine: n
            };
          }(e, t, n, r, o, a);

          o = p.stack, r = p.linePos, n = p.isFirstLine, h = p.anchorPosition;
        }

        for (; !l;) f();

        function f() {
          s.DebugFlags.InDebugMode && (console.log(""), console.log("@@scanNext " + r + ": |" + t.content.substr(r).replace(/\n$/, "\\n") + "|"));
          var c = R(e, t, n, r, o, h);
          if (!c) return s.DebugFlags.InDebugMode && console.log("  no more matches."), a.produce(o, u), void (l = !0);
          var p = c.captureIndices,
              f = c.matchedRuleId,
              d = !!(p && p.length > 0) && p[0].end > r;

          if (-1 === f) {
            var g = o.getRule(e);
            s.DebugFlags.InDebugMode && console.log("  popping " + g.debugName + " - " + g.debugEndRegExp), a.produce(o, p[0].start), o = o.setContentNameScopesList(o.nameScopesList), w(e, t, n, o, a, g.endCaptures, p), a.produce(o, p[0].end);
            var m = o;
            if (o = o.pop(), h = m.getAnchorPos(), !d && m.getEnterPos() === r) return s.DebugFlags.InDebugMode && console.error("[1] - Grammar is in an endless loop - Grammar pushed & popped a rule without advancing"), o = m, a.produce(o, u), void (l = !0);
          } else {
            var _ = e.getRule(f);

            a.produce(o, p[0].start);

            var y = o,
                v = _.getName(t.content, p),
                b = o.contentNameScopesList.push(e, v);

            if (o = o.push(f, r, h, p[0].end === u, null, b, b), _ instanceof i.BeginEndRule) {
              var C = _;
              s.DebugFlags.InDebugMode && console.log("  pushing " + C.debugName + " - " + C.debugBeginRegExp), w(e, t, n, o, a, C.beginCaptures, p), a.produce(o, p[0].end), h = p[0].end;
              var k = C.getContentName(t.content, p),
                  S = b.push(e, k);
              if (o = o.setContentNameScopesList(S), C.endHasBackReferences && (o = o.setEndRule(C.getEndWithResolvedBackReferences(t.content, p))), !d && y.hasSameRuleAs(o)) return s.DebugFlags.InDebugMode && console.error("[2] - Grammar is in an endless loop - Grammar pushed the same rule without advancing"), o = o.pop(), a.produce(o, u), void (l = !0);
            } else if (_ instanceof i.BeginWhileRule) {
              C = _;
              s.DebugFlags.InDebugMode && console.log("  pushing " + C.debugName), w(e, t, n, o, a, C.beginCaptures, p), a.produce(o, p[0].end), h = p[0].end;
              k = C.getContentName(t.content, p), S = b.push(e, k);
              if (o = o.setContentNameScopesList(S), C.whileHasBackReferences && (o = o.setEndRule(C.getWhileWithResolvedBackReferences(t.content, p))), !d && y.hasSameRuleAs(o)) return s.DebugFlags.InDebugMode && console.error("[3] - Grammar is in an endless loop - Grammar pushed the same rule without advancing"), o = o.pop(), a.produce(o, u), void (l = !0);
            } else {
              var P = _;
              if (s.DebugFlags.InDebugMode && console.log("  matched " + P.debugName + " - " + P.debugMatchRegExp), w(e, t, n, o, a, P.captures, p), a.produce(o, p[0].end), o = o.pop(), !d) return s.DebugFlags.InDebugMode && console.error("[4] - Grammar is in an endless loop - Grammar is not advancing, nor is it pushing/popping"), o = o.safePop(), a.produce(o, u), void (l = !0);
            }
          }

          p[0].end > r && (r = p[0].end, n = !1);
        }

        return o;
      }

      t.Grammar = v;

      var P = function () {
        function e() {}

        return e.toBinaryStr = function (e) {
          for (var t = e.toString(2); t.length < 32;) t = "0" + t;

          return t;
        }, e.printMetadata = function (t) {
          var n = e.getLanguageId(t),
              r = e.getTokenType(t),
              i = e.getFontStyle(t),
              o = e.getForeground(t),
              s = e.getBackground(t);
          console.log({
            languageId: n,
            tokenType: r,
            fontStyle: i,
            foreground: o,
            background: s
          });
        }, e.getLanguageId = function (e) {
          return (255 & e) >>> 0;
        }, e.getTokenType = function (e) {
          return (1792 & e) >>> 8;
        }, e.getFontStyle = function (e) {
          return (14336 & e) >>> 11;
        }, e.getForeground = function (e) {
          return (8372224 & e) >>> 14;
        }, e.getBackground = function (e) {
          return (4286578688 & e) >>> 23;
        }, e.set = function (t, n, r, i, o, s) {
          var a = e.getLanguageId(t),
              c = e.getTokenType(t),
              u = e.getFontStyle(t),
              l = e.getForeground(t),
              h = e.getBackground(t);
          return 0 !== n && (a = n), 0 !== r && (c = 8 === r ? 0 : r), -1 !== i && (u = i), 0 !== o && (l = o), 0 !== s && (h = s), (a << 0 | c << 8 | u << 11 | l << 14 | h << 23) >>> 0;
        }, e;
      }();

      t.StackElementMetadata = P;

      var x = function () {
        function e(e, t, n) {
          this.parent = e, this.scope = t, this.metadata = n;
        }

        return e._equals = function (e, t) {
          for (;;) {
            if (e === t) return !0;
            if (!e && !t) return !0;
            if (!e || !t) return !1;
            if (e.scope !== t.scope || e.metadata !== t.metadata) return !1;
            e = e.parent, t = t.parent;
          }
        }, e.prototype.equals = function (t) {
          return e._equals(this, t);
        }, e._matchesScope = function (e, t, n) {
          return t === e || e.substring(0, n.length) === n;
        }, e._matches = function (e, t) {
          if (null === t) return !0;

          for (var n = t.length, r = 0, i = t[r], o = i + "."; e;) {
            if (this._matchesScope(e.scope, i, o)) {
              if (++r === n) return !0;
              o = (i = t[r]) + ".";
            }

            e = e.parent;
          }

          return !1;
        }, e.mergeMetadata = function (e, t, n) {
          if (null === n) return e;
          var r = -1,
              i = 0,
              o = 0;
          if (null !== n.themeData) for (var s = 0, a = n.themeData.length; s < a; s++) {
            var c = n.themeData[s];

            if (this._matches(t, c.parentScopes)) {
              r = c.fontStyle, i = c.foreground, o = c.background;
              break;
            }
          }
          return P.set(e, n.languageId, n.tokenType, r, i, o);
        }, e._push = function (t, n, r) {
          for (var i = 0, o = r.length; i < o; i++) {
            var s = r[i],
                a = n.getMetadataForScope(s),
                c = e.mergeMetadata(t.metadata, t, a);
            t = new e(t, s, c);
          }

          return t;
        }, e.prototype.push = function (t, n) {
          return null === n ? this : n.indexOf(" ") >= 0 ? e._push(this, t, n.split(/ /g)) : e._push(this, t, [n]);
        }, e._generateScopes = function (e) {
          for (var t = [], n = 0; e;) t[n++] = e.scope, e = e.parent;

          return t.reverse(), t;
        }, e.prototype.generateScopes = function () {
          return e._generateScopes(this);
        }, e;
      }();

      t.ScopeListElement = x;

      var I = function () {
        function e(e, t, n, r, i, o, s, a) {
          this.parent = e, this.depth = this.parent ? this.parent.depth + 1 : 1, this.ruleId = t, this._enterPos = n, this._anchorPos = r, this.beginRuleCapturedEOL = i, this.endRule = o, this.nameScopesList = s, this.contentNameScopesList = a;
        }

        return e._structuralEquals = function (e, t) {
          for (;;) {
            if (e === t) return !0;
            if (!e && !t) return !0;
            if (!e || !t) return !1;
            if (e.depth !== t.depth || e.ruleId !== t.ruleId || e.endRule !== t.endRule) return !1;
            e = e.parent, t = t.parent;
          }
        }, e._equals = function (e, t) {
          return e === t || !!this._structuralEquals(e, t) && e.contentNameScopesList.equals(t.contentNameScopesList);
        }, e.prototype.clone = function () {
          return this;
        }, e.prototype.equals = function (t) {
          return null !== t && e._equals(this, t);
        }, e._reset = function (e) {
          for (; e;) e._enterPos = -1, e._anchorPos = -1, e = e.parent;
        }, e.prototype.reset = function () {
          e._reset(this);
        }, e.prototype.pop = function () {
          return this.parent;
        }, e.prototype.safePop = function () {
          return this.parent ? this.parent : this;
        }, e.prototype.push = function (t, n, r, i, o, s, a) {
          return new e(this, t, n, r, i, o, s, a);
        }, e.prototype.getEnterPos = function () {
          return this._enterPos;
        }, e.prototype.getAnchorPos = function () {
          return this._anchorPos;
        }, e.prototype.getRule = function (e) {
          return e.getRule(this.ruleId);
        }, e.prototype._writeString = function (e, t) {
          return this.parent && (t = this.parent._writeString(e, t)), e[t++] = "(" + this.ruleId + ", TODO-" + this.nameScopesList + ", TODO-" + this.contentNameScopesList + ")", t;
        }, e.prototype.toString = function () {
          var e = [];
          return this._writeString(e, 0), "[" + e.join(",") + "]";
        }, e.prototype.setContentNameScopesList = function (e) {
          return this.contentNameScopesList === e ? this : this.parent.push(this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, this.endRule, this.nameScopesList, e);
        }, e.prototype.setEndRule = function (t) {
          return this.endRule === t ? this : new e(this.parent, this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, t, this.nameScopesList, this.contentNameScopesList);
        }, e.prototype.hasSameRuleAs = function (e) {
          return this.ruleId === e.ruleId;
        }, e.NULL = new e(null, 0, 0, 0, !1, null, null, null), e;
      }();

      t.StackElement = I;

      var A = function A(e, t) {
        this.scopes = e, this.endPos = t;
      };

      t.LocalStackElement = A;

      var T = function () {
        function e(e, t, n) {
          this._emitBinaryTokens = e, this._tokenTypeOverrides = n, s.DebugFlags.InDebugMode ? this._lineText = t : this._lineText = null, this._tokens = [], this._binaryTokens = [], this._lastTokenEndIndex = 0;
        }

        return e.prototype.produce = function (e, t) {
          this.produceFromScopes(e.contentNameScopesList, t);
        }, e.prototype.produceFromScopes = function (e, t) {
          if (!(this._lastTokenEndIndex >= t)) {
            if (this._emitBinaryTokens) {
              for (var n = e.metadata, r = 0, i = this._tokenTypeOverrides; r < i.length; r++) {
                var o = i[r];
                o.matcher(e.generateScopes()) && (n = P.set(n, 0, L(o.type), -1, 0, 0));
              }

              return this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === n || (this._binaryTokens.push(this._lastTokenEndIndex), this._binaryTokens.push(n)), void (this._lastTokenEndIndex = t);
            }

            var a = e.generateScopes();

            if (s.DebugFlags.InDebugMode) {
              console.log("  token: |" + this._lineText.substring(this._lastTokenEndIndex, t).replace(/\n$/, "\\n") + "|");

              for (var c = 0; c < a.length; c++) console.log("      * " + a[c]);
            }

            this._tokens.push({
              startIndex: this._lastTokenEndIndex,
              endIndex: t,
              scopes: a
            }), this._lastTokenEndIndex = t;
          }
        }, e.prototype.getResult = function (e, t) {
          return this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === t - 1 && this._tokens.pop(), 0 === this._tokens.length && (this._lastTokenEndIndex = -1, this.produce(e, t), this._tokens[this._tokens.length - 1].startIndex = 0), this._tokens;
        }, e.prototype.getBinaryResult = function (e, t) {
          this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === t - 1 && (this._binaryTokens.pop(), this._binaryTokens.pop()), 0 === this._binaryTokens.length && (this._lastTokenEndIndex = -1, this.produce(e, t), this._binaryTokens[this._binaryTokens.length - 2] = 0);

          for (var n = new Uint32Array(this._binaryTokens.length), r = 0, i = this._binaryTokens.length; r < i; r++) n[r] = this._binaryTokens[r];

          return n;
        }, e;
      }();

      function L(e) {
        switch (e) {
          case 4:
            return 4;

          case 2:
            return 2;

          case 1:
            return 1;

          case 0:
          default:
            return 8;
        }
      }
    }, function (e, t, n) {

      function r(e) {
        return Array.isArray(e) ? function (e) {
          for (var t = [], n = 0, i = e.length; n < i; n++) t[n] = r(e[n]);

          return t;
        }(e) : "object" == typeof e ? function (e) {
          var t = {};

          for (var n in e) t[n] = r(e[n]);

          return t;
        }(e) : e;
      }

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.clone = function (e) {
        return r(e);
      }, t.mergeObjects = function (e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];

        return t.forEach(function (t) {
          for (var n in t) e[n] = t[n];
        }), e;
      }, t.basename = function e(t) {
        var n = ~t.lastIndexOf("/") || ~t.lastIndexOf("\\");
        return 0 === n ? t : ~n == t.length - 1 ? e(t.substring(0, t.length - 1)) : t.substr(1 + ~n);
      };

      var i = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/,
          o = function () {
        function e() {}

        return e.hasCaptures = function (e) {
          return null !== e && i.test(e);
        }, e.replaceCaptures = function (e, t, n) {
          return e.replace(i, function (e, r, i, o) {
            var s = n[parseInt(r || i, 10)];
            if (!s) return e;

            for (var a = t.substring(s.start, s.end); "." === a[0];) a = a.substring(1);

            switch (o) {
              case "downcase":
                return a.toLowerCase();

              case "upcase":
                return a.toUpperCase();

              default:
                return a;
            }
          });
        }, e;
      }();

      t.RegexSource = o;
    }, function (e, t, n) {

      (function (e) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.DebugFlags = {
          InDebugMode: void 0 !== e && !!e.env.VSCODE_TEXTMATE_DEBUG
        };
      }).call(this, n(7));
    }, function (e, t, n) {

      var r = this && this.__awaiter || function (e, t, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(e) {
            try {
              c(r.next(e));
            } catch (e) {
              o(e);
            }
          }

          function a(e) {
            try {
              c(r.throw(e));
            } catch (e) {
              o(e);
            }
          }

          function c(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {
              e(t);
            })).then(s, a);
          }

          c((r = r.apply(e, t || [])).next());
        });
      },
          i = this && this.__generator || function (e, t) {
        var n,
            r,
            i,
            o,
            s = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this;
        }), o;

        function a(o) {
          return function (a) {
            return function (o) {
              if (n) throw new TypeError("Generator is already executing.");

              for (; s;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;

                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;

                  case 4:
                    return s.label++, {
                      value: o[1],
                      done: !1
                    };

                  case 5:
                    s.label++, r = o[1], o = [0];
                    continue;

                  case 7:
                    o = s.ops.pop(), s.trys.pop();
                    continue;

                  default:
                    if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      s = 0;
                      continue;
                    }

                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      s.label = o[1];
                      break;
                    }

                    if (6 === o[0] && s.label < i[1]) {
                      s.label = i[1], i = o;
                      break;
                    }

                    if (i && s.label < i[2]) {
                      s.label = i[2], s.ops.push(o);
                      break;
                    }

                    i[2] && s.ops.pop(), s.trys.pop();
                    continue;
                }

                o = t.call(e, s);
              } catch (e) {
                o = [6, e], r = 0;
              } finally {
                n = i = 0;
              }

              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([o, a]);
          };
        }
      };

      Object.defineProperty(t, "__esModule", {
        value: !0
      });

      var o = n(4),
          s = n(8),
          a = n(11),
          c = n(0),
          u = function () {
        function e(e) {
          this._options = e, this._syncRegistry = new o.SyncRegistry(a.Theme.createFromRawTheme(e.theme, e.colorMap), e.onigLib), this._ensureGrammarCache = new Map();
        }

        return e.prototype.dispose = function () {
          this._syncRegistry.dispose();
        }, e.prototype.setTheme = function (e, t) {
          this._syncRegistry.setTheme(a.Theme.createFromRawTheme(e, t));
        }, e.prototype.getColorMap = function () {
          return this._syncRegistry.getColorMap();
        }, e.prototype.loadGrammarWithEmbeddedLanguages = function (e, t, n) {
          return this.loadGrammarWithConfiguration(e, t, {
            embeddedLanguages: n
          });
        }, e.prototype.loadGrammarWithConfiguration = function (e, t, n) {
          return this._loadGrammar(e, t, n.embeddedLanguages, n.tokenTypes);
        }, e.prototype.loadGrammar = function (e) {
          return this._loadGrammar(e, 0, null, null);
        }, e.prototype._doLoadSingleGrammar = function (e) {
          return r(this, void 0, void 0, function () {
            var t, n;
            return i(this, function (r) {
              switch (r.label) {
                case 0:
                  return [4, this._options.loadGrammar(e)];

                case 1:
                  return (t = r.sent()) && (n = "function" == typeof this._options.getInjections ? this._options.getInjections(e) : void 0, this._syncRegistry.addGrammar(t, n)), [2];
              }
            });
          });
        }, e.prototype._loadSingleGrammar = function (e) {
          return r(this, void 0, void 0, function () {
            return i(this, function (t) {
              return this._ensureGrammarCache.has(e) || this._ensureGrammarCache.set(e, this._doLoadSingleGrammar(e)), [2, this._ensureGrammarCache.get(e)];
            });
          });
        }, e.prototype._collectDependenciesForDep = function (e, t, n) {
          var r = this._syncRegistry.lookup(n.scopeName);

          if (r) {
            n instanceof c.FullScopeDependency ? c.collectDependencies(t, this._syncRegistry.lookup(e), r) : c.collectSpecificDependencies(t, this._syncRegistry.lookup(e), r, n.include);

            var i = this._syncRegistry.injections(n.scopeName);

            if (i) for (var o = 0, s = i; o < s.length; o++) {
              var a = s[o];
              t.add(new c.FullScopeDependency(a));
            }
          } else if (n.scopeName === e) throw new Error("No grammar provided for <" + e + ">");
        }, e.prototype._loadGrammar = function (e, t, n, o) {
          return r(this, void 0, void 0, function () {
            var r,
                s,
                a,
                u,
                l,
                h,
                p,
                f,
                d,
                g,
                m,
                _,
                y = this;

            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  r = new Set(), s = new Set(), r.add(e), a = [new c.FullScopeDependency(e)], i.label = 1;

                case 1:
                  return a.length > 0 ? (u = a, a = [], [4, Promise.all(u.map(function (e) {
                    return y._loadSingleGrammar(e.scopeName);
                  }))]) : [3, 3];

                case 2:
                  for (i.sent(), l = new c.ScopeDependencyCollector(), h = 0, p = u; h < p.length; h++) _ = p[h], this._collectDependenciesForDep(e, l, _);

                  for (f = 0, d = l.full; f < d.length; f++) _ = d[f], r.has(_.scopeName) || (r.add(_.scopeName), a.push(_));

                  for (g = 0, m = l.partial; g < m.length; g++) _ = m[g], r.has(_.scopeName) || s.has(_.toKey()) || (s.add(_.toKey()), a.push(_));

                  return [3, 1];

                case 3:
                  return [2, this.grammarForScopeName(e, t, n, o)];
              }
            });
          });
        }, e.prototype.addGrammar = function (e, t, n, o) {
          return void 0 === t && (t = []), void 0 === n && (n = 0), void 0 === o && (o = null), r(this, void 0, void 0, function () {
            return i(this, function (r) {
              switch (r.label) {
                case 0:
                  return this._syncRegistry.addGrammar(e, t), [4, this.grammarForScopeName(e.scopeName, n, o)];

                case 1:
                  return [2, r.sent()];
              }
            });
          });
        }, e.prototype.grammarForScopeName = function (e, t, n, r) {
          return void 0 === t && (t = 0), void 0 === n && (n = null), void 0 === r && (r = null), this._syncRegistry.grammarForScopeName(e, t, n, r);
        }, e;
      }();

      t.Registry = u, t.INITIAL = c.StackElement.NULL, t.parseRawGrammar = s.parseRawGrammar;
    }, function (e, t, n) {

      var r = this && this.__awaiter || function (e, t, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(e) {
            try {
              c(r.next(e));
            } catch (e) {
              o(e);
            }
          }

          function a(e) {
            try {
              c(r.throw(e));
            } catch (e) {
              o(e);
            }
          }

          function c(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {
              e(t);
            })).then(s, a);
          }

          c((r = r.apply(e, t || [])).next());
        });
      },
          i = this && this.__generator || function (e, t) {
        var n,
            r,
            i,
            o,
            s = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this;
        }), o;

        function a(o) {
          return function (a) {
            return function (o) {
              if (n) throw new TypeError("Generator is already executing.");

              for (; s;) try {
                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;

                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;

                  case 4:
                    return s.label++, {
                      value: o[1],
                      done: !1
                    };

                  case 5:
                    s.label++, r = o[1], o = [0];
                    continue;

                  case 7:
                    o = s.ops.pop(), s.trys.pop();
                    continue;

                  default:
                    if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                      s = 0;
                      continue;
                    }

                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      s.label = o[1];
                      break;
                    }

                    if (6 === o[0] && s.label < i[1]) {
                      s.label = i[1], i = o;
                      break;
                    }

                    if (i && s.label < i[2]) {
                      s.label = i[2], s.ops.push(o);
                      break;
                    }

                    i[2] && s.ops.pop(), s.trys.pop();
                    continue;
                }

                o = t.call(e, s);
              } catch (e) {
                o = [6, e], r = 0;
              } finally {
                n = i = 0;
              }

              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([o, a]);
          };
        }
      };

      Object.defineProperty(t, "__esModule", {
        value: !0
      });

      var o = n(0),
          s = function () {
        function e(e, t) {
          this._theme = e, this._grammars = {}, this._rawGrammars = {}, this._injectionGrammars = {}, this._onigLibPromise = t;
        }

        return e.prototype.dispose = function () {
          for (var e in this._grammars) this._grammars.hasOwnProperty(e) && this._grammars[e].dispose();
        }, e.prototype.setTheme = function (e) {
          var t = this;
          this._theme = e, Object.keys(this._grammars).forEach(function (e) {
            t._grammars[e].onDidChangeTheme();
          });
        }, e.prototype.getColorMap = function () {
          return this._theme.getColorMap();
        }, e.prototype.addGrammar = function (e, t) {
          this._rawGrammars[e.scopeName] = e, t && (this._injectionGrammars[e.scopeName] = t);
        }, e.prototype.lookup = function (e) {
          return this._rawGrammars[e];
        }, e.prototype.injections = function (e) {
          return this._injectionGrammars[e];
        }, e.prototype.getDefaults = function () {
          return this._theme.getDefaults();
        }, e.prototype.themeMatch = function (e) {
          return this._theme.match(e);
        }, e.prototype.grammarForScopeName = function (e, t, n, s) {
          return r(this, void 0, void 0, function () {
            var r, a, c, u, l;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  return this._grammars[e] ? [3, 2] : (r = this._rawGrammars[e]) ? (a = this._grammars, c = e, u = o.createGrammar, l = [r, t, n, s, this], [4, this._onigLibPromise]) : [2, null];

                case 1:
                  a[c] = u.apply(void 0, l.concat([i.sent()])), i.label = 2;

                case 2:
                  return [2, this._grammars[e]];
              }
            });
          });
        }, e;
      }();

      t.SyncRegistry = s;
    }, function (e, t, n) {

      var r,
          i = this && this.__extends || (r = function (e, t) {
        return (r = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (e, t) {
          e.__proto__ = t;
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        })(e, t);
      }, function (e, t) {
        function n() {
          this.constructor = e;
        }

        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
      });
      Object.defineProperty(t, "__esModule", {
        value: !0
      });

      var o = n(1),
          s = /\\(\d+)/,
          a = /\\(\d+)/g,
          c = function () {
        function e(e, t, n) {
          this.debugRegExps = t, this.rules = n, this.scanner = e.createOnigScanner(t);
        }

        return e.prototype.dispose = function () {
          "function" == typeof this.scanner.dispose && this.scanner.dispose();
        }, e;
      }();

      t.CompiledRule = c;

      var u = function () {
        function e(e, t, n, r) {
          this.$location = e, this.id = t, this._name = n || null, this._nameIsCapturing = o.RegexSource.hasCaptures(this._name), this._contentName = r || null, this._contentNameIsCapturing = o.RegexSource.hasCaptures(this._contentName);
        }

        return Object.defineProperty(e.prototype, "debugName", {
          get: function () {
            var e = this.$location ? o.basename(this.$location.filename) + ":" + this.$location.line : "unknown";
            return this.constructor.name + "#" + this.id + " @ " + e;
          },
          enumerable: !0,
          configurable: !0
        }), e.prototype.getName = function (e, t) {
          return this._nameIsCapturing && null !== this._name && null !== e && null !== t ? o.RegexSource.replaceCaptures(this._name, e, t) : this._name;
        }, e.prototype.getContentName = function (e, t) {
          return this._contentNameIsCapturing && null !== this._contentName ? o.RegexSource.replaceCaptures(this._contentName, e, t) : this._contentName;
        }, e;
      }();

      t.Rule = u;

      var l = function (e) {
        function t(t, n, r, i, o) {
          var s = e.call(this, t, n, r, i) || this;
          return s.retokenizeCapturedWithRuleId = o, s;
        }

        return i(t, e), t.prototype.dispose = function () {}, t.prototype.collectPatternsRecursive = function (e, t, n) {
          throw new Error("Not supported!");
        }, t.prototype.compile = function (e, t, n, r) {
          throw new Error("Not supported!");
        }, t;
      }(u);

      t.CaptureRule = l;

      var h = function () {
        function e(e, t, n) {
          if (void 0 === n && (n = !0), n) {
            if (e) {
              for (var r = e.length, i = 0, o = [], a = !1, c = 0; c < r; c++) {
                if ("\\" === e.charAt(c) && c + 1 < r) {
                  var u = e.charAt(c + 1);
                  "z" === u ? (o.push(e.substring(i, c)), o.push("$(?!\\n)(?<!\\n)"), i = c + 2) : "A" !== u && "G" !== u || (a = !0), c++;
                }
              }

              this.hasAnchor = a, 0 === i ? this.source = e : (o.push(e.substring(i, r)), this.source = o.join(""));
            } else this.hasAnchor = !1, this.source = e;
          } else this.hasAnchor = !1, this.source = e;
          this.hasAnchor ? this._anchorCache = this._buildAnchorCache() : this._anchorCache = null, this.ruleId = t, this.hasBackReferences = s.test(this.source);
        }

        return e.prototype.clone = function () {
          return new e(this.source, this.ruleId, !0);
        }, e.prototype.setSource = function (e) {
          this.source !== e && (this.source = e, this.hasAnchor && (this._anchorCache = this._buildAnchorCache()));
        }, e.prototype.resolveBackReferences = function (e, t) {
          var n = t.map(function (t) {
            return e.substring(t.start, t.end);
          });
          return a.lastIndex = 0, this.source.replace(a, function (e, t) {
            return (n[parseInt(t, 10)] || "").replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
          });
        }, e.prototype._buildAnchorCache = function () {
          var e,
              t,
              n,
              r,
              i = [],
              o = [],
              s = [],
              a = [];

          for (e = 0, t = this.source.length; e < t; e++) n = this.source.charAt(e), i[e] = n, o[e] = n, s[e] = n, a[e] = n, "\\" === n && e + 1 < t && ("A" === (r = this.source.charAt(e + 1)) ? (i[e + 1] = "￿", o[e + 1] = "￿", s[e + 1] = "A", a[e + 1] = "A") : "G" === r ? (i[e + 1] = "￿", o[e + 1] = "G", s[e + 1] = "￿", a[e + 1] = "G") : (i[e + 1] = r, o[e + 1] = r, s[e + 1] = r, a[e + 1] = r), e++);

          return {
            A0_G0: i.join(""),
            A0_G1: o.join(""),
            A1_G0: s.join(""),
            A1_G1: a.join("")
          };
        }, e.prototype.resolveAnchors = function (e, t) {
          return this.hasAnchor && this._anchorCache ? e ? t ? this._anchorCache.A1_G1 : this._anchorCache.A1_G0 : t ? this._anchorCache.A0_G1 : this._anchorCache.A0_G0 : this.source;
        }, e;
      }();

      t.RegExpSource = h;

      var p = function () {
        function e() {
          this._items = [], this._hasAnchors = !1, this._cached = null, this._anchorCache = {
            A0_G0: null,
            A0_G1: null,
            A1_G0: null,
            A1_G1: null
          };
        }

        return e.prototype.dispose = function () {
          this._disposeCaches();
        }, e.prototype._disposeCaches = function () {
          this._cached && (this._cached.dispose(), this._cached = null), this._anchorCache.A0_G0 && (this._anchorCache.A0_G0.dispose(), this._anchorCache.A0_G0 = null), this._anchorCache.A0_G1 && (this._anchorCache.A0_G1.dispose(), this._anchorCache.A0_G1 = null), this._anchorCache.A1_G0 && (this._anchorCache.A1_G0.dispose(), this._anchorCache.A1_G0 = null), this._anchorCache.A1_G1 && (this._anchorCache.A1_G1.dispose(), this._anchorCache.A1_G1 = null);
        }, e.prototype.push = function (e) {
          this._items.push(e), this._hasAnchors = this._hasAnchors || e.hasAnchor;
        }, e.prototype.unshift = function (e) {
          this._items.unshift(e), this._hasAnchors = this._hasAnchors || e.hasAnchor;
        }, e.prototype.length = function () {
          return this._items.length;
        }, e.prototype.setSource = function (e, t) {
          this._items[e].source !== t && (this._disposeCaches(), this._items[e].setSource(t));
        }, e.prototype.compile = function (e, t, n) {
          if (this._hasAnchors) return t ? n ? (this._anchorCache.A1_G1 || (this._anchorCache.A1_G1 = this._resolveAnchors(e, t, n)), this._anchorCache.A1_G1) : (this._anchorCache.A1_G0 || (this._anchorCache.A1_G0 = this._resolveAnchors(e, t, n)), this._anchorCache.A1_G0) : n ? (this._anchorCache.A0_G1 || (this._anchorCache.A0_G1 = this._resolveAnchors(e, t, n)), this._anchorCache.A0_G1) : (this._anchorCache.A0_G0 || (this._anchorCache.A0_G0 = this._resolveAnchors(e, t, n)), this._anchorCache.A0_G0);

          if (!this._cached) {
            var r = this._items.map(function (e) {
              return e.source;
            });

            this._cached = new c(e, r, this._items.map(function (e) {
              return e.ruleId;
            }));
          }

          return this._cached;
        }, e.prototype._resolveAnchors = function (e, t, n) {
          var r = this._items.map(function (e) {
            return e.resolveAnchors(t, n);
          });

          return new c(e, r, this._items.map(function (e) {
            return e.ruleId;
          }));
        }, e;
      }();

      t.RegExpSourceList = p;

      var f = function (e) {
        function t(t, n, r, i, o) {
          var s = e.call(this, t, n, r, null) || this;
          return s._match = new h(i, s.id), s.captures = o, s._cachedCompiledPatterns = null, s;
        }

        return i(t, e), t.prototype.dispose = function () {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
        }, Object.defineProperty(t.prototype, "debugMatchRegExp", {
          get: function () {
            return "" + this._match.source;
          },
          enumerable: !0,
          configurable: !0
        }), t.prototype.collectPatternsRecursive = function (e, t, n) {
          t.push(this._match);
        }, t.prototype.compile = function (e, t, n, r) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p(), this.collectPatternsRecursive(e, this._cachedCompiledPatterns, !0)), this._cachedCompiledPatterns.compile(e, n, r);
        }, t;
      }(u);

      t.MatchRule = f;

      var d = function (e) {
        function t(t, n, r, i, o) {
          var s = e.call(this, t, n, r, i) || this;
          return s.patterns = o.patterns, s.hasMissingPatterns = o.hasMissingPatterns, s._cachedCompiledPatterns = null, s;
        }

        return i(t, e), t.prototype.dispose = function () {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
        }, t.prototype.collectPatternsRecursive = function (e, t, n) {
          var r, i;

          for (r = 0, i = this.patterns.length; r < i; r++) e.getRule(this.patterns[r]).collectPatternsRecursive(e, t, !1);
        }, t.prototype.compile = function (e, t, n, r) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p(), this.collectPatternsRecursive(e, this._cachedCompiledPatterns, !0)), this._cachedCompiledPatterns.compile(e, n, r);
        }, t;
      }(u);

      t.IncludeOnlyRule = d;

      var g = function (e) {
        function t(t, n, r, i, o, s, a, c, u, l) {
          var p = e.call(this, t, n, r, i) || this;
          return p._begin = new h(o, p.id), p.beginCaptures = s, p._end = new h(a || "￿", -1), p.endHasBackReferences = p._end.hasBackReferences, p.endCaptures = c, p.applyEndPatternLast = u || !1, p.patterns = l.patterns, p.hasMissingPatterns = l.hasMissingPatterns, p._cachedCompiledPatterns = null, p;
        }

        return i(t, e), t.prototype.dispose = function () {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
        }, Object.defineProperty(t.prototype, "debugBeginRegExp", {
          get: function () {
            return "" + this._begin.source;
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(t.prototype, "debugEndRegExp", {
          get: function () {
            return "" + this._end.source;
          },
          enumerable: !0,
          configurable: !0
        }), t.prototype.getEndWithResolvedBackReferences = function (e, t) {
          return this._end.resolveBackReferences(e, t);
        }, t.prototype.collectPatternsRecursive = function (e, t, n) {
          if (n) {
            var r,
                i = void 0;

            for (i = 0, r = this.patterns.length; i < r; i++) e.getRule(this.patterns[i]).collectPatternsRecursive(e, t, !1);
          } else t.push(this._begin);
        }, t.prototype.compile = function (e, t, n, r) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p(), this.collectPatternsRecursive(e, this._cachedCompiledPatterns, !0), this.applyEndPatternLast ? this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end) : this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end)), this._end.hasBackReferences && (this.applyEndPatternLast ? this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, t) : this._cachedCompiledPatterns.setSource(0, t)), this._cachedCompiledPatterns.compile(e, n, r);
        }, t;
      }(u);

      t.BeginEndRule = g;

      var m = function (e) {
        function t(t, n, r, i, o, s, a, c, u) {
          var l = e.call(this, t, n, r, i) || this;
          return l._begin = new h(o, l.id), l.beginCaptures = s, l.whileCaptures = c, l._while = new h(a, -2), l.whileHasBackReferences = l._while.hasBackReferences, l.patterns = u.patterns, l.hasMissingPatterns = u.hasMissingPatterns, l._cachedCompiledPatterns = null, l._cachedCompiledWhilePatterns = null, l;
        }

        return i(t, e), t.prototype.dispose = function () {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null), this._cachedCompiledWhilePatterns && (this._cachedCompiledWhilePatterns.dispose(), this._cachedCompiledWhilePatterns = null);
        }, Object.defineProperty(t.prototype, "debugBeginRegExp", {
          get: function () {
            return "" + this._begin.source;
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(t.prototype, "debugWhileRegExp", {
          get: function () {
            return "" + this._while.source;
          },
          enumerable: !0,
          configurable: !0
        }), t.prototype.getWhileWithResolvedBackReferences = function (e, t) {
          return this._while.resolveBackReferences(e, t);
        }, t.prototype.collectPatternsRecursive = function (e, t, n) {
          if (n) {
            var r,
                i = void 0;

            for (i = 0, r = this.patterns.length; i < r; i++) e.getRule(this.patterns[i]).collectPatternsRecursive(e, t, !1);
          } else t.push(this._begin);
        }, t.prototype.compile = function (e, t, n, r) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p(), this.collectPatternsRecursive(e, this._cachedCompiledPatterns, !0)), this._cachedCompiledPatterns.compile(e, n, r);
        }, t.prototype.compileWhile = function (e, t, n, r) {
          return this._cachedCompiledWhilePatterns || (this._cachedCompiledWhilePatterns = new p(), this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while)), this._while.hasBackReferences && this._cachedCompiledWhilePatterns.setSource(0, t || "￿"), this._cachedCompiledWhilePatterns.compile(e, n, r);
        }, t;
      }(u);

      t.BeginWhileRule = m;

      var _ = function () {
        function e() {}

        return e.createCaptureRule = function (e, t, n, r, i) {
          return e.registerRule(function (e) {
            return new l(t, e, n, r, i);
          });
        }, e.getCompiledRuleId = function (t, n, r) {
          return t.id || n.registerRule(function (i) {
            if (t.id = i, t.match) return new f(t.$vscodeTextmateLocation, t.id, t.name, t.match, e._compileCaptures(t.captures, n, r));

            if (void 0 === t.begin) {
              t.repository && (r = o.mergeObjects({}, r, t.repository));
              var s = t.patterns;
              return void 0 === s && t.include && (s = [{
                include: t.include
              }]), new d(t.$vscodeTextmateLocation, t.id, t.name, t.contentName, e._compilePatterns(s, n, r));
            }

            return t.while ? new m(t.$vscodeTextmateLocation, t.id, t.name, t.contentName, t.begin, e._compileCaptures(t.beginCaptures || t.captures, n, r), t.while, e._compileCaptures(t.whileCaptures || t.captures, n, r), e._compilePatterns(t.patterns, n, r)) : new g(t.$vscodeTextmateLocation, t.id, t.name, t.contentName, t.begin, e._compileCaptures(t.beginCaptures || t.captures, n, r), t.end, e._compileCaptures(t.endCaptures || t.captures, n, r), t.applyEndPatternLast, e._compilePatterns(t.patterns, n, r));
          }), t.id;
        }, e._compileCaptures = function (t, n, r) {
          var i = [];

          if (t) {
            var o = 0;

            for (var s in t) {
              if ("$vscodeTextmateLocation" !== s) (c = parseInt(s, 10)) > o && (o = c);
            }

            for (var a = 0; a <= o; a++) i[a] = null;

            for (var s in t) if ("$vscodeTextmateLocation" !== s) {
              var c = parseInt(s, 10),
                  u = 0;
              t[s].patterns && (u = e.getCompiledRuleId(t[s], n, r)), i[c] = e.createCaptureRule(n, t[s].$vscodeTextmateLocation, t[s].name, t[s].contentName, u);
            }
          }

          return i;
        }, e._compilePatterns = function (t, n, r) {
          var i = [];
          if (t) for (var o = 0, s = t.length; o < s; o++) {
            var a = t[o],
                c = -1;
            if (a.include) {
              if ("#" === a.include.charAt(0)) {
                var u = r[a.include.substr(1)];
                u && (c = e.getCompiledRuleId(u, n, r));
              } else if ("$base" === a.include || "$self" === a.include) c = e.getCompiledRuleId(r[a.include], n, r);else {
                var l = null,
                    h = null,
                    p = a.include.indexOf("#");
                p >= 0 ? (l = a.include.substring(0, p), h = a.include.substring(p + 1)) : l = a.include;
                var f = n.getExternalGrammar(l, r);
                if (f) if (h) {
                  var _ = f.repository[h];
                  _ && (c = e.getCompiledRuleId(_, n, f.repository));
                } else c = e.getCompiledRuleId(f.repository.$self, n, f.repository);
              }
            } else c = e.getCompiledRuleId(a, n, r);

            if (-1 !== c) {
              var y = n.getRule(c),
                  v = !1;
              if ((y instanceof d || y instanceof g || y instanceof m) && y.hasMissingPatterns && 0 === y.patterns.length && (v = !0), v) continue;
              i.push(c);
            }
          }
          return {
            patterns: i,
            hasMissingPatterns: (t ? t.length : 0) !== i.length
          };
        }, e;
      }();

      t.RuleFactory = _;
    }, function (e, t, n) {

      function r(e) {
        return !!e && !!e.match(/[\w\.:]+/);
      }

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createMatchers = function (e, t) {
        for (var n, i, o, s = [], a = (o = (i = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g).exec(n = e), {
          next: function () {
            if (!o) return null;
            var e = o[0];
            return o = i.exec(n), e;
          }
        }), c = a.next(); null !== c;) {
          var u = 0;

          if (2 === c.length && ":" === c.charAt(1)) {
            switch (c.charAt(0)) {
              case "R":
                u = 1;
                break;

              case "L":
                u = -1;
                break;

              default:
                console.log("Unknown priority " + c + " in scope selector");
            }

            c = a.next();
          }

          var l = p();
          if (s.push({
            matcher: l,
            priority: u
          }), "," !== c) break;
          c = a.next();
        }

        return s;

        function h() {
          if ("-" === c) {
            c = a.next();
            var e = h();
            return function (t) {
              return !!e && !e(t);
            };
          }

          if ("(" === c) {
            c = a.next();

            var n = function () {
              var e = [],
                  t = p();

              for (; t && (e.push(t), "|" === c || "," === c);) {
                do {
                  c = a.next();
                } while ("|" === c || "," === c);

                t = p();
              }

              return function (t) {
                return e.some(function (e) {
                  return e(t);
                });
              };
            }();

            return ")" === c && (c = a.next()), n;
          }

          if (r(c)) {
            var i = [];

            do {
              i.push(c), c = a.next();
            } while (r(c));

            return function (e) {
              return t(i, e);
            };
          }

          return null;
        }

        function p() {
          for (var e = [], t = h(); t;) e.push(t), t = h();

          return function (t) {
            return e.every(function (e) {
              return e(t);
            });
          };
        }
      };
    }, function (e, t) {
      var n,
          r,
          i = e.exports = {};

      function o() {
        throw new Error("setTimeout has not been defined");
      }

      function s() {
        throw new Error("clearTimeout has not been defined");
      }

      function a(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);

        try {
          return n(e, 0);
        } catch (t) {
          try {
            return n.call(null, e, 0);
          } catch (t) {
            return n.call(this, e, 0);
          }
        }
      }

      !function () {
        try {
          n = "function" == typeof setTimeout ? setTimeout : o;
        } catch (e) {
          n = o;
        }

        try {
          r = "function" == typeof clearTimeout ? clearTimeout : s;
        } catch (e) {
          r = s;
        }
      }();
      var c,
          u = [],
          l = !1,
          h = -1;

      function p() {
        l && c && (l = !1, c.length ? u = c.concat(u) : h = -1, u.length && f());
      }

      function f() {
        if (!l) {
          var e = a(p);
          l = !0;

          for (var t = u.length; t;) {
            for (c = u, u = []; ++h < t;) c && c[h].run();

            h = -1, t = u.length;
          }

          c = null, l = !1, function (e) {
            if (r === clearTimeout) return clearTimeout(e);
            if ((r === s || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);

            try {
              r(e);
            } catch (t) {
              try {
                return r.call(null, e);
              } catch (t) {
                return r.call(this, e);
              }
            }
          }(e);
        }
      }

      function d(e, t) {
        this.fun = e, this.array = t;
      }

      function g() {}

      i.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        u.push(new d(e, t)), 1 !== u.length || l || a(f);
      }, d.prototype.run = function () {
        this.fun.apply(null, this.array);
      }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = g, i.addListener = g, i.once = g, i.off = g, i.removeListener = g, i.removeAllListeners = g, i.emit = g, i.prependListener = g, i.prependOnceListener = g, i.listeners = function (e) {
        return [];
      }, i.binding = function (e) {
        throw new Error("process.binding is not supported");
      }, i.cwd = function () {
        return "/";
      }, i.chdir = function (e) {
        throw new Error("process.chdir is not supported");
      }, i.umask = function () {
        return 0;
      };
    }, function (e, t, n) {

      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(9),
          i = n(2),
          o = n(10);

      t.parseRawGrammar = function (e, t) {
        return void 0 === t && (t = null), null !== t && /\.json$/.test(t) ? function (e, t) {
          if (i.DebugFlags.InDebugMode) return o.parse(e, t, !0);
          return JSON.parse(e);
        }(e, t) : function (e, t) {
          if (i.DebugFlags.InDebugMode) return r.parseWithLocation(e, t, "$vscodeTextmateLocation");
          return r.parse(e);
        }(e, t);
      };
    }, function (e, t, n) {

      function r(e, t, n) {
        var r = e.length,
            i = 0,
            o = 1,
            s = 0;

        function a(t) {
          if (null === n) i += t;else for (; t > 0;) {
            10 === e.charCodeAt(i) ? (i++, o++, s = 0) : (i++, s++), t--;
          }
        }

        function c(e) {
          null === n ? i = e : a(e - i);
        }

        function u() {
          for (; i < r;) {
            var t = e.charCodeAt(i);
            if (32 !== t && 9 !== t && 13 !== t && 10 !== t) break;
            a(1);
          }
        }

        function l(t) {
          return e.substr(i, t.length) === t && (a(t.length), !0);
        }

        function h(t) {
          var n = e.indexOf(t, i);
          c(-1 !== n ? n + t.length : r);
        }

        function p(t) {
          var n = e.indexOf(t, i);

          if (-1 !== n) {
            var o = e.substring(i, n);
            return c(n + t.length), o;
          }

          o = e.substr(i);
          return c(r), o;
        }

        r > 0 && 65279 === e.charCodeAt(0) && (i = 1);
        var f = 0,
            d = null,
            g = [],
            m = [],
            _ = null;

        function y(e, t) {
          g.push(f), m.push(d), f = e, d = t;
        }

        function v() {
          if (0 === g.length) return b("illegal state stack");
          f = g.pop(), d = m.pop();
        }

        function b(t) {
          throw new Error("Near offset " + i + ": " + t + " ~~~" + e.substr(i, 50) + "~~~");
        }

        var C,
            w,
            k,
            R = function R() {
          if (null === _) return b("missing <key>");
          var e = {};
          null !== n && (e[n] = {
            filename: t,
            line: o,
            char: s
          }), d[_] = e, _ = null, y(1, e);
        },
            S = function S() {
          if (null === _) return b("missing <key>");
          var e = [];
          d[_] = e, _ = null, y(2, e);
        },
            P = function P() {
          var e = {};
          null !== n && (e[n] = {
            filename: t,
            line: o,
            char: s
          }), d.push(e), y(1, e);
        },
            x = function x() {
          var e = [];
          d.push(e), y(2, e);
        };

        function I() {
          if (1 !== f) return b("unexpected </dict>");
          v();
        }

        function A() {
          return 1 === f || 2 !== f ? b("unexpected </array>") : void v();
        }

        function T(e) {
          if (1 === f) {
            if (null === _) return b("missing <key>");
            d[_] = e, _ = null;
          } else 2 === f ? d.push(e) : d = e;
        }

        function L(e) {
          if (isNaN(e)) return b("cannot parse float");

          if (1 === f) {
            if (null === _) return b("missing <key>");
            d[_] = e, _ = null;
          } else 2 === f ? d.push(e) : d = e;
        }

        function M(e) {
          if (isNaN(e)) return b("cannot parse integer");

          if (1 === f) {
            if (null === _) return b("missing <key>");
            d[_] = e, _ = null;
          } else 2 === f ? d.push(e) : d = e;
        }

        function G(e) {
          if (1 === f) {
            if (null === _) return b("missing <key>");
            d[_] = e, _ = null;
          } else 2 === f ? d.push(e) : d = e;
        }

        function D(e) {
          if (1 === f) {
            if (null === _) return b("missing <key>");
            d[_] = e, _ = null;
          } else 2 === f ? d.push(e) : d = e;
        }

        function N(e) {
          if (1 === f) {
            if (null === _) return b("missing <key>");
            d[_] = e, _ = null;
          } else 2 === f ? d.push(e) : d = e;
        }

        function E(e) {
          if (e.isClosed) return "";
          var t = p("</");
          return h(">"), t.replace(/&#([0-9]+);/g, function (e, t) {
            return String.fromCodePoint(parseInt(t, 10));
          }).replace(/&#x([0-9a-f]+);/g, function (e, t) {
            return String.fromCodePoint(parseInt(t, 16));
          }).replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, function (e) {
            switch (e) {
              case "&amp;":
                return "&";

              case "&lt;":
                return "<";

              case "&gt;":
                return ">";

              case "&quot;":
                return '"';

              case "&apos;":
                return "'";
            }

            return e;
          });
        }

        for (; i < r && (u(), !(i >= r));) {
          var O = e.charCodeAt(i);
          if (a(1), 60 !== O) return b("expected <");
          if (i >= r) return b("unexpected end of input");
          var j = e.charCodeAt(i);
          if (63 !== j) {
            if (33 !== j) {
              if (47 === j) {
                if (a(1), u(), l("plist")) {
                  h(">");
                  continue;
                }

                if (l("dict")) {
                  h(">"), I();
                  continue;
                }

                if (l("array")) {
                  h(">"), A();
                  continue;
                }

                return b("unexpected closed tag");
              }

              var F = (w = void 0, k = void 0, w = p(">"), k = !1, 47 === w.charCodeAt(w.length - 1) && (k = !0, w = w.substring(0, w.length - 1)), {
                name: w.trim(),
                isClosed: k
              });

              switch (F.name) {
                case "dict":
                  1 === f ? R() : 2 === f ? P() : (d = {}, null !== n && (d[n] = {
                    filename: t,
                    line: o,
                    char: s
                  }), y(1, d)), F.isClosed && I();
                  continue;

                case "array":
                  1 === f ? S() : 2 === f ? x() : y(2, d = []), F.isClosed && A();
                  continue;

                case "key":
                  C = E(F), 1 !== f ? b("unexpected <key>") : null !== _ ? b("too many <key>") : _ = C;
                  continue;

                case "string":
                  T(E(F));
                  continue;

                case "real":
                  L(parseFloat(E(F)));
                  continue;

                case "integer":
                  M(parseInt(E(F), 10));
                  continue;

                case "date":
                  G(new Date(E(F)));
                  continue;

                case "data":
                  D(E(F));
                  continue;

                case "true":
                  E(F), N(!0);
                  continue;

                case "false":
                  E(F), N(!1);
                  continue;
              }

              if (!/^plist/.test(F.name)) return b("unexpected opened tag " + F.name);
            } else {
              if (a(1), l("--")) {
                h("--\x3e");
                continue;
              }

              h(">");
            }
          } else a(1), h("?>");
        }

        return d;
      }

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.parseWithLocation = function (e, t, n) {
        return r(e, t, n);
      }, t.parse = function (e) {
        return r(e, null, null);
      };
    }, function (e, t, n) {

      function r(e, t) {
        throw new Error("Near offset " + e.pos + ": " + t + " ~~~" + e.source.substr(e.pos, 50) + "~~~");
      }

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.parse = function (e, t, n) {
        var a = new i(e),
            c = new o(),
            u = 0,
            l = null,
            h = [],
            p = [];

        function f() {
          h.push(u), p.push(l);
        }

        function d() {
          u = h.pop(), l = p.pop();
        }

        function g(e) {
          r(a, e);
        }

        for (; s(a, c);) {
          if (0 === u) {
            if (null !== l && g("too many constructs in root"), 3 === c.type) {
              l = {}, n && (l.$vscodeTextmateLocation = c.toLocation(t)), f(), u = 1;
              continue;
            }

            if (2 === c.type) {
              l = [], f(), u = 4;
              continue;
            }

            g("unexpected token in root");
          }

          if (2 === u) {
            if (5 === c.type) {
              d();
              continue;
            }

            if (7 === c.type) {
              u = 3;
              continue;
            }

            g("expected , or }");
          }

          if (1 === u || 3 === u) {
            if (1 === u && 5 === c.type) {
              d();
              continue;
            }

            if (1 === c.type) {
              var m = c.value;

              if (s(a, c) && 6 === c.type || g("expected colon"), s(a, c) || g("expected value"), u = 2, 1 === c.type) {
                l[m] = c.value;
                continue;
              }

              if (8 === c.type) {
                l[m] = null;
                continue;
              }

              if (9 === c.type) {
                l[m] = !0;
                continue;
              }

              if (10 === c.type) {
                l[m] = !1;
                continue;
              }

              if (11 === c.type) {
                l[m] = parseFloat(c.value);
                continue;
              }

              if (2 === c.type) {
                var _ = [];
                l[m] = _, f(), u = 4, l = _;
                continue;
              }

              if (3 === c.type) {
                var y = {};
                n && (y.$vscodeTextmateLocation = c.toLocation(t)), l[m] = y, f(), u = 1, l = y;
                continue;
              }
            }

            g("unexpected token in dict");
          }

          if (5 === u) {
            if (4 === c.type) {
              d();
              continue;
            }

            if (7 === c.type) {
              u = 6;
              continue;
            }

            g("expected , or ]");
          }

          if (4 === u || 6 === u) {
            if (4 === u && 4 === c.type) {
              d();
              continue;
            }

            if (u = 5, 1 === c.type) {
              l.push(c.value);
              continue;
            }

            if (8 === c.type) {
              l.push(null);
              continue;
            }

            if (9 === c.type) {
              l.push(!0);
              continue;
            }

            if (10 === c.type) {
              l.push(!1);
              continue;
            }

            if (11 === c.type) {
              l.push(parseFloat(c.value));
              continue;
            }

            if (2 === c.type) {
              _ = [];
              l.push(_), f(), u = 4, l = _;
              continue;
            }

            if (3 === c.type) {
              y = {};
              n && (y.$vscodeTextmateLocation = c.toLocation(t)), l.push(y), f(), u = 1, l = y;
              continue;
            }

            g("unexpected token in array");
          }

          g("unknown state");
        }

        return 0 !== p.length && g("unclosed constructs"), l;
      };

      var i = function i(e) {
        this.source = e, this.pos = 0, this.len = e.length, this.line = 1, this.char = 0;
      },
          o = function () {
        function e() {
          this.value = null, this.type = 0, this.offset = -1, this.len = -1, this.line = -1, this.char = -1;
        }

        return e.prototype.toLocation = function (e) {
          return {
            filename: e,
            line: this.line,
            char: this.char
          };
        }, e;
      }();

      function s(e, t) {
        t.value = null, t.type = 0, t.offset = -1, t.len = -1, t.line = -1, t.char = -1;

        for (var n, i = e.source, o = e.pos, s = e.len, a = e.line, c = e.char;;) {
          if (o >= s) return !1;

          if (32 !== (n = i.charCodeAt(o)) && 9 !== n && 13 !== n) {
            if (10 !== n) break;
            o++, a++, c = 0;
          } else o++, c++;
        }

        if (t.offset = o, t.line = a, t.char = c, 34 === n) {
          for (t.type = 1, o++, c++;;) {
            if (o >= s) return !1;

            if (n = i.charCodeAt(o), o++, c++, 92 !== n) {
              if (34 === n) break;
            } else o++, c++;
          }

          t.value = i.substring(t.offset + 1, o - 1).replace(/\\u([0-9A-Fa-f]{4})/g, function (e, t) {
            return String.fromCodePoint(parseInt(t, 16));
          }).replace(/\\(.)/g, function (t, n) {
            switch (n) {
              case '"':
                return '"';

              case "\\":
                return "\\";

              case "/":
                return "/";

              case "b":
                return "\b";

              case "f":
                return "\f";

              case "n":
                return "\n";

              case "r":
                return "\r";

              case "t":
                return "\t";

              default:
                r(e, "invalid escape sequence");
            }

            throw new Error("unreachable");
          });
        } else if (91 === n) t.type = 2, o++, c++;else if (123 === n) t.type = 3, o++, c++;else if (93 === n) t.type = 4, o++, c++;else if (125 === n) t.type = 5, o++, c++;else if (58 === n) t.type = 6, o++, c++;else if (44 === n) t.type = 7, o++, c++;else if (110 === n) {
          if (t.type = 8, o++, c++, 117 !== (n = i.charCodeAt(o))) return !1;
          if (o++, c++, 108 !== (n = i.charCodeAt(o))) return !1;
          if (o++, c++, 108 !== (n = i.charCodeAt(o))) return !1;
          o++, c++;
        } else if (116 === n) {
          if (t.type = 9, o++, c++, 114 !== (n = i.charCodeAt(o))) return !1;
          if (o++, c++, 117 !== (n = i.charCodeAt(o))) return !1;
          if (o++, c++, 101 !== (n = i.charCodeAt(o))) return !1;
          o++, c++;
        } else if (102 === n) {
          if (t.type = 10, o++, c++, 97 !== (n = i.charCodeAt(o))) return !1;
          if (o++, c++, 108 !== (n = i.charCodeAt(o))) return !1;
          if (o++, c++, 115 !== (n = i.charCodeAt(o))) return !1;
          if (o++, c++, 101 !== (n = i.charCodeAt(o))) return !1;
          o++, c++;
        } else for (t.type = 11;;) {
          if (o >= s) return !1;
          if (!(46 === (n = i.charCodeAt(o)) || n >= 48 && n <= 57 || 101 === n || 69 === n || 45 === n || 43 === n)) break;
          o++, c++;
        }

        return t.len = o - t.offset, null === t.value && (t.value = i.substr(t.offset, t.len)), e.pos = o, e.line = a, e.char = c, !0;
      }
    }, function (e, t, n) {

      Object.defineProperty(t, "__esModule", {
        value: !0
      });

      var r = function r(e, t, n, r, i, o) {
        this.scope = e, this.parentScopes = t, this.index = n, this.fontStyle = r, this.foreground = i, this.background = o;
      };

      function i(e) {
        return !!/^#[0-9a-f]{6}$/i.test(e) || !!/^#[0-9a-f]{8}$/i.test(e) || !!/^#[0-9a-f]{3}$/i.test(e) || !!/^#[0-9a-f]{4}$/i.test(e);
      }

      function o(e) {
        if (!e) return [];
        if (!e.settings || !Array.isArray(e.settings)) return [];

        for (var t = e.settings, n = [], o = 0, s = 0, a = t.length; s < a; s++) {
          var c = t[s];

          if (c.settings) {
            var u = void 0;
            if ("string" == typeof c.scope) u = c.scope.replace(/^[,]+/, "").replace(/[,]+$/, "").split(",");else u = Array.isArray(c.scope) ? c.scope : [""];
            var l = -1;

            if ("string" == typeof c.settings.fontStyle) {
              l = 0;

              for (var h = 0, p = (g = c.settings.fontStyle.split(" ")).length; h < p; h++) {
                switch (g[h]) {
                  case "italic":
                    l |= 1;
                    break;

                  case "bold":
                    l |= 2;
                    break;

                  case "underline":
                    l |= 4;
                }
              }
            }

            var f = null;
            "string" == typeof c.settings.foreground && i(c.settings.foreground) && (f = c.settings.foreground);
            var d = null;
            "string" == typeof c.settings.background && i(c.settings.background) && (d = c.settings.background);

            for (h = 0, p = u.length; h < p; h++) {
              var g,
                  m = (g = u[h].trim().split(" "))[g.length - 1],
                  _ = null;
              g.length > 1 && (_ = g.slice(0, g.length - 1)).reverse(), n[o++] = new r(m, _, s, l, f, d);
            }
          }
        }

        return n;
      }

      function s(e, t) {
        e.sort(function (e, t) {
          var n = u(e.scope, t.scope);
          return 0 !== n || 0 !== (n = l(e.parentScopes, t.parentScopes)) ? n : e.index - t.index;
        });

        for (var n = 0, r = "#000000", i = "#ffffff"; e.length >= 1 && "" === e[0].scope;) {
          var o = e.shift();
          -1 !== o.fontStyle && (n = o.fontStyle), null !== o.foreground && (r = o.foreground), null !== o.background && (i = o.background);
        }

        for (var s = new a(t), f = new h(0, null, n, s.getId(r), s.getId(i)), d = new p(new h(0, null, -1, 0, 0), []), g = 0, m = e.length; g < m; g++) {
          var _ = e[g];
          d.insert(0, _.scope, _.parentScopes, _.fontStyle, s.getId(_.foreground), s.getId(_.background));
        }

        return new c(s, f, d);
      }

      t.ParsedThemeRule = r, t.parseTheme = o;

      var a = function () {
        function e(e) {
          if (this._lastColorId = 0, this._id2color = [], this._color2id = Object.create(null), Array.isArray(e)) {
            this._isFrozen = !0;

            for (var t = 0, n = e.length; t < n; t++) this._color2id[e[t]] = t, this._id2color[t] = e[t];
          } else this._isFrozen = !1;
        }

        return e.prototype.getId = function (e) {
          if (null === e) return 0;
          e = e.toUpperCase();
          var t = this._color2id[e];
          if (t) return t;
          if (this._isFrozen) throw new Error("Missing color in color map - " + e);
          return t = ++this._lastColorId, this._color2id[e] = t, this._id2color[t] = e, t;
        }, e.prototype.getColorMap = function () {
          return this._id2color.slice(0);
        }, e;
      }();

      t.ColorMap = a;

      var c = function () {
        function e(e, t, n) {
          this._colorMap = e, this._root = n, this._defaults = t, this._cache = {};
        }

        return e.createFromRawTheme = function (e, t) {
          return this.createFromParsedTheme(o(e), t);
        }, e.createFromParsedTheme = function (e, t) {
          return s(e, t);
        }, e.prototype.getColorMap = function () {
          return this._colorMap.getColorMap();
        }, e.prototype.getDefaults = function () {
          return this._defaults;
        }, e.prototype.match = function (e) {
          return this._cache.hasOwnProperty(e) || (this._cache[e] = this._root.match(e)), this._cache[e];
        }, e;
      }();

      function u(e, t) {
        return e < t ? -1 : e > t ? 1 : 0;
      }

      function l(e, t) {
        if (null === e && null === t) return 0;
        if (!e) return -1;
        if (!t) return 1;
        var n = e.length,
            r = t.length;

        if (n === r) {
          for (var i = 0; i < n; i++) {
            var o = u(e[i], t[i]);
            if (0 !== o) return o;
          }

          return 0;
        }

        return n - r;
      }

      t.Theme = c, t.strcmp = u, t.strArrCmp = l;

      var h = function () {
        function e(e, t, n, r, i) {
          this.scopeDepth = e, this.parentScopes = t, this.fontStyle = n, this.foreground = r, this.background = i;
        }

        return e.prototype.clone = function () {
          return new e(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
        }, e.cloneArr = function (e) {
          for (var t = [], n = 0, r = e.length; n < r; n++) t[n] = e[n].clone();

          return t;
        }, e.prototype.acceptOverwrite = function (e, t, n, r) {
          this.scopeDepth > e ? console.log("how did this happen?") : this.scopeDepth = e, -1 !== t && (this.fontStyle = t), 0 !== n && (this.foreground = n), 0 !== r && (this.background = r);
        }, e;
      }();

      t.ThemeTrieElementRule = h;

      var p = function () {
        function e(e, t, n) {
          void 0 === t && (t = []), void 0 === n && (n = {}), this._mainRule = e, this._rulesWithParentScopes = t, this._children = n;
        }

        return e._sortBySpecificity = function (e) {
          return 1 === e.length || e.sort(this._cmpBySpecificity), e;
        }, e._cmpBySpecificity = function (e, t) {
          if (e.scopeDepth === t.scopeDepth) {
            var n = e.parentScopes,
                r = t.parentScopes,
                i = null === n ? 0 : n.length,
                o = null === r ? 0 : r.length;
            if (i === o) for (var s = 0; s < i; s++) {
              var a = n[s].length,
                  c = r[s].length;
              if (a !== c) return c - a;
            }
            return o - i;
          }

          return t.scopeDepth - e.scopeDepth;
        }, e.prototype.match = function (t) {
          if ("" === t) return e._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
          var n,
              r,
              i = t.indexOf(".");
          return -1 === i ? (n = t, r = "") : (n = t.substring(0, i), r = t.substring(i + 1)), this._children.hasOwnProperty(n) ? this._children[n].match(r) : e._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
        }, e.prototype.insert = function (t, n, r, i, o, s) {
          if ("" !== n) {
            var a,
                c,
                u,
                l = n.indexOf(".");
            -1 === l ? (a = n, c = "") : (a = n.substring(0, l), c = n.substring(l + 1)), this._children.hasOwnProperty(a) ? u = this._children[a] : (u = new e(this._mainRule.clone(), h.cloneArr(this._rulesWithParentScopes)), this._children[a] = u), u.insert(t + 1, c, r, i, o, s);
          } else this._doInsertHere(t, r, i, o, s);
        }, e.prototype._doInsertHere = function (e, t, n, r, i) {
          if (null !== t) {
            for (var o = 0, s = this._rulesWithParentScopes.length; o < s; o++) {
              var a = this._rulesWithParentScopes[o];
              if (0 === l(a.parentScopes, t)) return void a.acceptOverwrite(e, n, r, i);
            }

            -1 === n && (n = this._mainRule.fontStyle), 0 === r && (r = this._mainRule.foreground), 0 === i && (i = this._mainRule.background), this._rulesWithParentScopes.push(new h(e, t, n, r, i));
          } else this._mainRule.acceptOverwrite(e, n, r, i);
        }, e;
      }();

      t.ThemeTrieElement = p;
    }]);
  });
});

const languages = [{
  id: 'abap',
  scopeName: 'source.abap',
  path: 'abap.tmLanguage.json',
  samplePath: 'abap.sample'
}, {
  id: 'actionscript-3',
  scopeName: 'source.actionscript.3',
  path: 'actionscript-3.tmLanguage.json',
  samplePath: 'actionscript-3.sample'
}, {
  id: 'ada',
  scopeName: 'source.ada',
  path: 'ada.tmLanguage.json',
  samplePath: 'ada.sample'
}, {
  id: 'apache',
  scopeName: 'source.apacheconf',
  path: 'apache.tmLanguage.json'
}, {
  id: 'apex',
  scopeName: 'source.apex',
  path: 'apex.tmLanguage.json',
  samplePath: 'apex.sample'
}, {
  id: 'apl',
  scopeName: 'source.apl',
  path: 'apl.tmLanguage.json',
  embeddedLangs: ['html', 'xml', 'css', 'javascript', 'json']
}, {
  id: 'applescript',
  scopeName: 'source.applescript',
  path: 'applescript.tmLanguage.json',
  samplePath: 'applescript.sample'
}, {
  id: 'asm',
  scopeName: 'source.asm.x86_64',
  path: 'asm.tmLanguage.json',
  samplePath: 'asm.sample'
}, {
  id: 'astro',
  scopeName: 'text.html.astro',
  path: 'astro.tmLanguage.json',
  samplePath: 'astro.sample',
  embeddedLangs: ['css', 'sass', 'scss', 'tsx']
}, {
  id: 'awk',
  scopeName: 'source.awk',
  path: 'awk.tmLanguage.json',
  samplePath: 'awk.sample'
}, {
  id: 'ballerina',
  scopeName: 'source.ballerina',
  path: 'ballerina.tmLanguage.json',
  samplePath: 'ballerina.sample'
}, {
  id: 'bat',
  scopeName: 'source.batchfile',
  path: 'bat.tmLanguage.json',
  samplePath: 'bat.sample',
  aliases: ['batch']
}, {
  id: 'c',
  scopeName: 'source.c',
  path: 'c.tmLanguage.json',
  samplePath: 'c.sample'
}, {
  id: 'clojure',
  scopeName: 'source.clojure',
  path: 'clojure.tmLanguage.json',
  samplePath: 'clojure.sample',
  aliases: ['clj']
}, {
  id: 'cobol',
  scopeName: 'source.cobol',
  path: 'cobol.tmLanguage.json',
  samplePath: 'cobol.sample',
  embeddedLangs: ['sql', 'html', 'java']
}, {
  id: 'coffee',
  scopeName: 'source.coffee',
  path: 'coffee.tmLanguage.json',
  samplePath: 'coffee.sample',
  embeddedLangs: ['javascript']
}, {
  id: 'cpp',
  scopeName: 'source.cpp',
  path: 'cpp.tmLanguage.json',
  samplePath: 'cpp.sample',
  embeddedLangs: ['sql']
}, {
  id: 'crystal',
  scopeName: 'source.crystal',
  path: 'crystal.tmLanguage.json',
  samplePath: 'crystal.sample',
  embeddedLangs: ['html', 'sql', 'css', 'c', 'javascript', 'shellscript']
}, {
  id: 'csharp',
  scopeName: 'source.cs',
  path: 'csharp.tmLanguage.json',
  samplePath: 'csharp.sample',
  aliases: ['c#']
}, {
  id: 'css',
  scopeName: 'source.css',
  path: 'css.tmLanguage.json',
  samplePath: 'css.sample'
}, {
  id: 'd',
  scopeName: 'source.d',
  path: 'd.tmLanguage.json',
  samplePath: 'd.sample'
}, {
  id: 'dart',
  scopeName: 'source.dart',
  path: 'dart.tmLanguage.json',
  samplePath: 'dart.sample'
}, {
  id: 'diff',
  scopeName: 'source.diff',
  path: 'diff.tmLanguage.json',
  samplePath: 'diff.sample'
}, {
  id: 'docker',
  scopeName: 'source.dockerfile',
  path: 'docker.tmLanguage.json',
  samplePath: 'docker.sample'
}, {
  id: 'dream-maker',
  scopeName: 'source.dm',
  path: 'dream-maker.tmLanguage.json'
}, {
  id: 'elixir',
  scopeName: 'source.elixir',
  path: 'elixir.tmLanguage.json',
  samplePath: 'elixir.sample',
  embeddedLangs: ['html']
}, {
  id: 'elm',
  scopeName: 'source.elm',
  path: 'elm.tmLanguage.json',
  samplePath: 'elm.sample'
}, {
  id: 'erb',
  scopeName: 'text.html.erb',
  path: 'erb.tmLanguage.json',
  samplePath: 'erb.sample',
  embeddedLangs: ['html', 'ruby']
}, {
  id: 'erlang',
  scopeName: 'source.erlang',
  path: 'erlang.tmLanguage.json',
  samplePath: 'erlang.sample'
}, {
  id: 'fish',
  scopeName: 'source.fish',
  path: 'fish.tmLanguage.json',
  samplePath: 'fish.sample'
}, {
  id: 'fsharp',
  scopeName: 'source.fsharp',
  path: 'fsharp.tmLanguage.json',
  samplePath: 'fsharp.sample',
  aliases: ['f#'],
  embeddedLangs: ['markdown']
}, {
  id: 'gherkin',
  scopeName: 'text.gherkin.feature',
  path: 'gherkin.tmLanguage.json'
}, {
  id: 'git-commit',
  scopeName: 'text.git-commit',
  path: 'git-commit.tmLanguage.json',
  embeddedLangs: ['diff']
}, {
  id: 'git-rebase',
  scopeName: 'text.git-rebase',
  path: 'git-rebase.tmLanguage.json',
  embeddedLangs: ['shellscript']
}, {
  id: 'gnuplot',
  scopeName: 'source.gnuplot',
  path: 'gnuplot.tmLanguage.json'
}, {
  id: 'go',
  scopeName: 'source.go',
  path: 'go.tmLanguage.json',
  samplePath: 'go.sample'
}, {
  id: 'graphql',
  scopeName: 'source.graphql',
  path: 'graphql.tmLanguage.json',
  embeddedLangs: ['javascript', 'typescript', 'jsx', 'tsx']
}, {
  id: 'groovy',
  scopeName: 'source.groovy',
  path: 'groovy.tmLanguage.json'
}, {
  id: 'hack',
  scopeName: 'source.hack',
  path: 'hack.tmLanguage.json',
  embeddedLangs: ['html', 'sql']
}, {
  id: 'haml',
  scopeName: 'text.haml',
  path: 'haml.tmLanguage.json',
  embeddedLangs: ['ruby', 'javascript', 'sass', 'coffee', 'markdown', 'css']
}, {
  id: 'handlebars',
  scopeName: 'text.html.handlebars',
  path: 'handlebars.tmLanguage.json',
  aliases: ['hbs'],
  embeddedLangs: ['html', 'css', 'javascript', 'yaml']
}, {
  id: 'haskell',
  scopeName: 'source.haskell',
  path: 'haskell.tmLanguage.json'
}, {
  id: 'hcl',
  scopeName: 'source.hcl',
  path: 'hcl.tmLanguage.json'
}, {
  id: 'hlsl',
  scopeName: 'source.hlsl',
  path: 'hlsl.tmLanguage.json'
}, {
  id: 'html',
  scopeName: 'text.html.basic',
  path: 'html.tmLanguage.json',
  samplePath: 'html.sample',
  embeddedLangs: ['javascript', 'css']
}, {
  id: 'ini',
  scopeName: 'source.ini',
  path: 'ini.tmLanguage.json'
}, {
  id: 'java',
  scopeName: 'source.java',
  path: 'java.tmLanguage.json',
  samplePath: 'java.sample'
}, {
  id: 'javascript',
  scopeName: 'source.js',
  path: 'javascript.tmLanguage.json',
  samplePath: 'javascript.sample',
  aliases: ['js']
}, {
  id: 'jinja-html',
  scopeName: 'text.html.jinja',
  path: 'jinja-html.tmLanguage.json',
  embeddedLangs: ['html']
}, {
  id: 'json',
  scopeName: 'source.json',
  path: 'json.tmLanguage.json'
}, {
  id: 'jsonc',
  scopeName: 'source.json.comments',
  path: 'jsonc.tmLanguage.json'
}, {
  id: 'jsonnet',
  scopeName: 'source.jsonnet',
  path: 'jsonnet.tmLanguage.json'
}, {
  id: 'jssm',
  scopeName: 'source.jssm',
  path: 'jssm.tmLanguage.json',
  samplePath: 'jssm.sample',
  aliases: ['fsl']
}, {
  id: 'jsx',
  scopeName: 'source.js.jsx',
  path: 'jsx.tmLanguage.json'
}, {
  id: 'julia',
  scopeName: 'source.julia',
  path: 'julia.tmLanguage.json',
  embeddedLangs: ['cpp', 'python', 'javascript', 'r', 'sql']
}, {
  id: 'jupyter',
  scopeName: 'source.jupyter',
  path: 'jupyter.tmLanguage.json',
  embeddedLangs: ['json']
}, {
  id: 'kotlin',
  scopeName: 'source.kotlin',
  path: 'kotlin.tmLanguage.json'
}, {
  id: 'latex',
  scopeName: 'text.tex.latex',
  path: 'latex.tmLanguage.json',
  embeddedLangs: ['tex', 'css', 'html', 'java', 'javascript', 'typescript', 'lua', 'python', 'julia', 'ruby', 'xml', 'yaml', 'cpp', 'haskell', 'scala', 'gnuplot']
}, {
  id: 'less',
  scopeName: 'source.css.less',
  path: 'less.tmLanguage.json',
  embeddedLangs: ['css']
}, {
  id: 'lisp',
  scopeName: 'source.lisp',
  path: 'lisp.tmLanguage.json'
}, {
  id: 'logo',
  scopeName: 'source.logo',
  path: 'logo.tmLanguage.json'
}, {
  id: 'lua',
  scopeName: 'source.lua',
  path: 'lua.tmLanguage.json',
  embeddedLangs: ['c']
}, {
  id: 'make',
  scopeName: 'source.makefile',
  path: 'make.tmLanguage.json',
  aliases: ['makefile']
}, {
  id: 'markdown',
  scopeName: 'text.html.markdown',
  path: 'markdown.tmLanguage.json',
  aliases: ['md'],
  embeddedLangs: ['css', 'html', 'ini', 'java', 'lua', 'make', 'perl', 'r', 'ruby', 'php', 'sql', 'vb', 'xml', 'xsl', 'yaml', 'bat', 'clojure', 'coffee', 'c', 'cpp', 'diff', 'docker', 'git-commit', 'git-rebase', 'go', 'groovy', 'pug', 'javascript', 'json', 'jsonc', 'less', 'objective-c', 'swift', 'scss', 'raku', 'powershell', 'python', 'rust', 'scala', 'shellscript', 'typescript', 'tsx', 'csharp', 'fsharp', 'dart', 'handlebars', 'erlang', 'elixir']
}, {
  id: 'matlab',
  scopeName: 'source.matlab',
  path: 'matlab.tmLanguage.json'
}, {
  id: 'mdx',
  scopeName: 'text.html.markdown.jsx',
  path: 'mdx.tmLanguage.json',
  embeddedLangs: ['jsx', 'markdown']
}, {
  id: 'nginx',
  scopeName: 'source.nginx',
  path: 'nginx.tmLanguage.json'
}, {
  id: 'nim',
  scopeName: 'source.nim',
  path: 'nim.tmLanguage.json',
  embeddedLangs: ['c', 'html', 'xml', 'javascript', 'css', 'markdown']
}, {
  id: 'nix',
  scopeName: 'source.nix',
  path: 'nix.tmLanguage.json'
}, {
  id: 'objective-c',
  scopeName: 'source.objc',
  path: 'objective-c.tmLanguage.json',
  aliases: ['objc']
}, {
  id: 'objective-cpp',
  scopeName: 'source.objcpp',
  path: 'objective-cpp.tmLanguage.json'
}, {
  id: 'ocaml',
  scopeName: 'source.ocaml',
  path: 'ocaml.tmLanguage.json'
}, {
  id: 'pascal',
  scopeName: 'source.pascal',
  path: 'pascal.tmLanguage.json'
}, {
  id: 'perl',
  scopeName: 'source.perl',
  path: 'perl.tmLanguage.json',
  embeddedLangs: ['html', 'xml', 'css', 'javascript', 'sql']
}, {
  id: 'php',
  scopeName: 'source.php',
  path: 'php.tmLanguage.json',
  embeddedLangs: ['html', 'xml', 'sql', 'javascript', 'json', 'css']
}, {
  id: 'plsql',
  scopeName: 'source.plsql.oracle',
  path: 'plsql.tmLanguage.json'
}, {
  id: 'postcss',
  scopeName: 'source.css.postcss',
  path: 'postcss.tmLanguage.json'
}, {
  id: 'powershell',
  scopeName: 'source.powershell',
  path: 'powershell.tmLanguage.json',
  aliases: ['ps', 'ps1']
}, {
  id: 'prisma',
  scopeName: 'source.prisma',
  path: 'prisma.tmLanguage.json',
  samplePath: 'prisma.sample'
}, {
  id: 'prolog',
  scopeName: 'source.prolog',
  path: 'prolog.tmLanguage.json'
}, {
  id: 'pug',
  scopeName: 'text.pug',
  path: 'pug.tmLanguage.json',
  aliases: ['jade'],
  embeddedLangs: ['javascript', 'css', 'sass', 'stylus', 'coffee', 'html']
}, {
  id: 'puppet',
  scopeName: 'source.puppet',
  path: 'puppet.tmLanguage.json'
}, {
  id: 'purescript',
  scopeName: 'source.purescript',
  path: 'purescript.tmLanguage.json'
}, {
  id: 'python',
  scopeName: 'source.python',
  path: 'python.tmLanguage.json',
  samplePath: 'python.sample',
  aliases: ['py']
}, {
  id: 'r',
  scopeName: 'source.r',
  path: 'r.tmLanguage.json'
}, {
  id: 'raku',
  scopeName: 'source.perl.6',
  path: 'raku.tmLanguage.json',
  aliases: ['perl6']
}, {
  id: 'razor',
  scopeName: 'text.aspnetcorerazor',
  path: 'razor.tmLanguage.json',
  embeddedLangs: ['html', 'csharp']
}, {
  id: 'riscv',
  scopeName: 'source.riscv',
  path: 'riscv.tmLanguage.json'
}, {
  id: 'ruby',
  scopeName: 'source.ruby',
  path: 'ruby.tmLanguage.json',
  samplePath: 'ruby.sample',
  aliases: ['rb'],
  embeddedLangs: ['html', 'xml', 'sql', 'css', 'c', 'javascript', 'shellscript', 'lua']
}, {
  id: 'rust',
  scopeName: 'source.rust',
  path: 'rust.tmLanguage.json'
}, {
  id: 'sas',
  scopeName: 'source.sas',
  path: 'sas.tmLanguage.json',
  embeddedLangs: ['sql']
}, {
  id: 'sass',
  scopeName: 'source.sass',
  path: 'sass.tmLanguage.json'
}, {
  id: 'scala',
  scopeName: 'source.scala',
  path: 'scala.tmLanguage.json'
}, {
  id: 'scheme',
  scopeName: 'source.scheme',
  path: 'scheme.tmLanguage.json'
}, {
  id: 'scss',
  scopeName: 'source.css.scss',
  path: 'scss.tmLanguage.json',
  embeddedLangs: ['css']
}, {
  id: 'shaderlab',
  scopeName: 'source.shaderlab',
  path: 'shaderlab.tmLanguage.json',
  aliases: ['shader'],
  embeddedLangs: ['hlsl']
}, {
  id: 'shellscript',
  scopeName: 'source.shell',
  path: 'shellscript.tmLanguage.json',
  aliases: ['shell', 'bash', 'sh', 'zsh'],
  embeddedLangs: ['ruby', 'python', 'applescript', 'html', 'markdown']
}, {
  id: 'smalltalk',
  scopeName: 'source.smalltalk',
  path: 'smalltalk.tmLanguage.json'
}, {
  id: 'solidity',
  scopeName: 'source.solidity',
  path: 'solidity.tmLanguage.json'
}, {
  id: 'sparql',
  scopeName: 'source.sparql',
  path: 'sparql.tmLanguage.json',
  samplePath: 'sparql.sample',
  embeddedLangs: ['turtle']
}, {
  id: 'sql',
  scopeName: 'source.sql',
  path: 'sql.tmLanguage.json'
}, {
  id: 'ssh-config',
  scopeName: 'source.ssh-config',
  path: 'ssh-config.tmLanguage.json'
}, {
  id: 'stylus',
  scopeName: 'source.stylus',
  path: 'stylus.tmLanguage.json',
  aliases: ['styl']
}, {
  id: 'svelte',
  scopeName: 'source.svelte',
  path: 'svelte.tmLanguage.json',
  embeddedLangs: ['javascript', 'typescript', 'coffee', 'stylus', 'sass', 'css', 'scss', 'less', 'postcss', 'pug', 'markdown']
}, {
  id: 'swift',
  scopeName: 'source.swift',
  path: 'swift.tmLanguage.json'
}, {
  id: 'system-verilog',
  scopeName: 'source.systemverilog',
  path: 'system-verilog.tmLanguage.json'
}, {
  id: 'tasl',
  scopeName: 'source.tasl',
  path: 'tasl.tmLanguage.json',
  samplePath: 'tasl.sample'
}, {
  id: 'tcl',
  scopeName: 'source.tcl',
  path: 'tcl.tmLanguage.json'
}, {
  id: 'tex',
  scopeName: 'text.tex',
  path: 'tex.tmLanguage.json',
  embeddedLangs: ['r']
}, {
  id: 'toml',
  scopeName: 'source.toml',
  path: 'toml.tmLanguage.json'
}, {
  id: 'tsx',
  scopeName: 'source.tsx',
  path: 'tsx.tmLanguage.json',
  samplePath: 'tsx.sample'
}, {
  id: 'turtle',
  scopeName: 'source.turtle',
  path: 'turtle.tmLanguage.json',
  samplePath: 'turtle.sample'
}, {
  id: 'twig',
  scopeName: 'text.html.twig',
  path: 'twig.tmLanguage.json',
  embeddedLangs: ['css', 'javascript', 'php', 'python', 'ruby']
}, {
  id: 'typescript',
  scopeName: 'source.ts',
  path: 'typescript.tmLanguage.json',
  aliases: ['ts']
}, {
  id: 'vb',
  scopeName: 'source.asp.vb.net',
  path: 'vb.tmLanguage.json',
  aliases: ['cmd']
}, {
  id: 'verilog',
  scopeName: 'source.verilog',
  path: 'verilog.tmLanguage.json'
}, {
  id: 'vhdl',
  scopeName: 'source.vhdl',
  path: 'vhdl.tmLanguage.json'
}, {
  id: 'viml',
  scopeName: 'source.viml',
  path: 'viml.tmLanguage.json'
}, {
  id: 'vue-html',
  scopeName: 'text.html.vue-html',
  path: 'vue-html.tmLanguage.json',
  embeddedLangs: ['vue', 'javascript']
}, {
  id: 'vue',
  scopeName: 'source.vue',
  path: 'vue.tmLanguage.json',
  embeddedLangs: ['json', 'markdown', 'pug', 'haml', 'vue-html', 'sass', 'scss', 'less', 'stylus', 'postcss', 'css', 'typescript', 'coffee', 'javascript']
}, {
  id: 'wasm',
  scopeName: 'source.wat',
  path: 'wasm.tmLanguage.json'
}, {
  id: 'wenyan',
  scopeName: 'source.wenyan',
  path: 'wenyan.tmLanguage.json',
  aliases: ['文言']
}, {
  id: 'xml',
  scopeName: 'text.xml',
  path: 'xml.tmLanguage.json',
  embeddedLangs: ['java']
}, {
  id: 'xsl',
  scopeName: 'text.xml.xsl',
  path: 'xsl.tmLanguage.json',
  embeddedLangs: ['xml']
}, {
  id: 'yaml',
  scopeName: 'source.yaml',
  path: 'yaml.tmLanguage.json'
}];
var FontStyle;

(function (FontStyle) {
  FontStyle[FontStyle["NotSet"] = -1] = "NotSet";
  FontStyle[FontStyle["None"] = 0] = "None";
  FontStyle[FontStyle["Italic"] = 1] = "Italic";
  FontStyle[FontStyle["Bold"] = 2] = "Bold";
  FontStyle[FontStyle["Underline"] = 4] = "Underline";
})(FontStyle || (FontStyle = {}));

class StackElementMetadata {
  static toBinaryStr(metadata) {
    let r = metadata.toString(2);

    while (r.length < 32) {
      r = '0' + r;
    }

    return r;
  }

  static printMetadata(metadata) {
    let languageId = StackElementMetadata.getLanguageId(metadata);
    let tokenType = StackElementMetadata.getTokenType(metadata);
    let fontStyle = StackElementMetadata.getFontStyle(metadata);
    let foreground = StackElementMetadata.getForeground(metadata);
    let background = StackElementMetadata.getBackground(metadata);
    console.log({
      languageId: languageId,
      tokenType: tokenType,
      fontStyle: fontStyle,
      foreground: foreground,
      background: background
    });
  }

  static getLanguageId(metadata) {
    return (metadata & 255
    /* LANGUAGEID_MASK */
    ) >>> 0
    /* LANGUAGEID_OFFSET */
    ;
  }

  static getTokenType(metadata) {
    return (metadata & 1792
    /* TOKEN_TYPE_MASK */
    ) >>> 8
    /* TOKEN_TYPE_OFFSET */
    ;
  }

  static getFontStyle(metadata) {
    return (metadata & 14336
    /* FONT_STYLE_MASK */
    ) >>> 11
    /* FONT_STYLE_OFFSET */
    ;
  }

  static getForeground(metadata) {
    return (metadata & 8372224
    /* FOREGROUND_MASK */
    ) >>> 14
    /* FOREGROUND_OFFSET */
    ;
  }

  static getBackground(metadata) {
    return (metadata & 4286578688
    /* BACKGROUND_MASK */
    ) >>> 23
    /* BACKGROUND_OFFSET */
    ;
  }

  static set(metadata, languageId, tokenType, fontStyle, foreground, background) {
    let _languageId = StackElementMetadata.getLanguageId(metadata);

    let _tokenType = StackElementMetadata.getTokenType(metadata);

    let _fontStyle = StackElementMetadata.getFontStyle(metadata);

    let _foreground = StackElementMetadata.getForeground(metadata);

    let _background = StackElementMetadata.getBackground(metadata);

    if (languageId !== 0) {
      _languageId = languageId;
    }

    if (tokenType !== 0
    /* Other */
    ) {
      _tokenType = tokenType === 8
      /* MetaEmbedded */
      ? 0
      /* Other */
      : tokenType;
    }

    if (fontStyle !== FontStyle.NotSet) {
      _fontStyle = fontStyle;
    }

    if (foreground !== 0) {
      _foreground = foreground;
    }

    if (background !== 0) {
      _background = background;
    }

    return (_languageId << 0
    /* LANGUAGEID_OFFSET */
    | _tokenType << 8
    /* TOKEN_TYPE_OFFSET */
    | _fontStyle << 11
    /* FONT_STYLE_OFFSET */
    | _foreground << 14
    /* FOREGROUND_OFFSET */
    | _background << 23
    /* BACKGROUND_OFFSET */
    ) >>> 0;
  }

}

function trimEndSlash(str) {
  if (str.endsWith('/') || str.endsWith('\\')) return str.slice(0, -1);
  return str;
}

function trimStartDot(str) {
  if (str.startsWith('./')) return str.slice(2);
  return str;
}

function dirname(str) {
  const parts = str.split(/[\/\\]/g);
  return parts[parts.length - 2];
}

function join(...parts) {
  return parts.map(trimEndSlash).map(trimStartDot).join('/');
}
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Creates a JSON scanner on the given text.
 * If ignoreTrivia is set, whitespaces or comments are ignored.
 */


function createScanner(text, ignoreTrivia) {
  if (ignoreTrivia === void 0) {
    ignoreTrivia = false;
  }

  var len = text.length;
  var pos = 0,
      value = '',
      tokenOffset = 0,
      token = 16
  /* Unknown */
  ,
      lineNumber = 0,
      lineStartOffset = 0,
      tokenLineStartOffset = 0,
      prevTokenLineStartOffset = 0,
      scanError = 0
  /* None */
  ;

  function scanHexDigits(count, exact) {
    var digits = 0;
    var value = 0;

    while (digits < count || !exact) {
      var ch = text.charCodeAt(pos);

      if (ch >= 48
      /* _0 */
      && ch <= 57
      /* _9 */
      ) {
        value = value * 16 + ch - 48
        /* _0 */
        ;
      } else if (ch >= 65
      /* A */
      && ch <= 70
      /* F */
      ) {
        value = value * 16 + ch - 65
        /* A */
        + 10;
      } else if (ch >= 97
      /* a */
      && ch <= 102
      /* f */
      ) {
        value = value * 16 + ch - 97
        /* a */
        + 10;
      } else {
        break;
      }

      pos++;
      digits++;
    }

    if (digits < count) {
      value = -1;
    }

    return value;
  }

  function setPosition(newPosition) {
    pos = newPosition;
    value = '';
    tokenOffset = 0;
    token = 16
    /* Unknown */
    ;
    scanError = 0
    /* None */
    ;
  }

  function scanNumber() {
    var start = pos;

    if (text.charCodeAt(pos) === 48
    /* _0 */
    ) {
      pos++;
    } else {
      pos++;

      while (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
      }
    }

    if (pos < text.length && text.charCodeAt(pos) === 46
    /* dot */
    ) {
      pos++;

      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;

        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      } else {
        scanError = 3
        /* UnexpectedEndOfNumber */
        ;
        return text.substring(start, pos);
      }
    }

    var end = pos;

    if (pos < text.length && (text.charCodeAt(pos) === 69
    /* E */
    || text.charCodeAt(pos) === 101
    /* e */
    )) {
      pos++;

      if (pos < text.length && text.charCodeAt(pos) === 43
      /* plus */
      || text.charCodeAt(pos) === 45
      /* minus */
      ) {
        pos++;
      }

      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;

        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }

        end = pos;
      } else {
        scanError = 3
        /* UnexpectedEndOfNumber */
        ;
      }
    }

    return text.substring(start, end);
  }

  function scanString() {
    var result = '',
        start = pos;

    while (true) {
      if (pos >= len) {
        result += text.substring(start, pos);
        scanError = 2
        /* UnexpectedEndOfString */
        ;
        break;
      }

      var ch = text.charCodeAt(pos);

      if (ch === 34
      /* doubleQuote */
      ) {
        result += text.substring(start, pos);
        pos++;
        break;
      }

      if (ch === 92
      /* backslash */
      ) {
        result += text.substring(start, pos);
        pos++;

        if (pos >= len) {
          scanError = 2
          /* UnexpectedEndOfString */
          ;
          break;
        }

        var ch2 = text.charCodeAt(pos++);

        switch (ch2) {
          case 34
          /* doubleQuote */
          :
            result += '\"';
            break;

          case 92
          /* backslash */
          :
            result += '\\';
            break;

          case 47
          /* slash */
          :
            result += '/';
            break;

          case 98
          /* b */
          :
            result += '\b';
            break;

          case 102
          /* f */
          :
            result += '\f';
            break;

          case 110
          /* n */
          :
            result += '\n';
            break;

          case 114
          /* r */
          :
            result += '\r';
            break;

          case 116
          /* t */
          :
            result += '\t';
            break;

          case 117
          /* u */
          :
            var ch3 = scanHexDigits(4, true);

            if (ch3 >= 0) {
              result += String.fromCharCode(ch3);
            } else {
              scanError = 4
              /* InvalidUnicode */
              ;
            }

            break;

          default:
            scanError = 5
            /* InvalidEscapeCharacter */
            ;
        }

        start = pos;
        continue;
      }

      if (ch >= 0 && ch <= 0x1f) {
        if (isLineBreak(ch)) {
          result += text.substring(start, pos);
          scanError = 2
          /* UnexpectedEndOfString */
          ;
          break;
        } else {
          scanError = 6
          /* InvalidCharacter */
          ; // mark as error but continue with string
        }
      }

      pos++;
    }

    return result;
  }

  function scanNext() {
    value = '';
    scanError = 0
    /* None */
    ;
    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;

    if (pos >= len) {
      // at the end
      tokenOffset = len;
      return token = 17
      /* EOF */
      ;
    }

    var code = text.charCodeAt(pos); // trivia: whitespace

    if (isWhiteSpace(code)) {
      do {
        pos++;
        value += String.fromCharCode(code);
        code = text.charCodeAt(pos);
      } while (isWhiteSpace(code));

      return token = 15
      /* Trivia */
      ;
    } // trivia: newlines


    if (isLineBreak(code)) {
      pos++;
      value += String.fromCharCode(code);

      if (code === 13
      /* carriageReturn */
      && text.charCodeAt(pos) === 10
      /* lineFeed */
      ) {
        pos++;
        value += '\n';
      }

      lineNumber++;
      tokenLineStartOffset = pos;
      return token = 14
      /* LineBreakTrivia */
      ;
    }

    switch (code) {
      // tokens: []{}:,
      case 123
      /* openBrace */
      :
        pos++;
        return token = 1
        /* OpenBraceToken */
        ;

      case 125
      /* closeBrace */
      :
        pos++;
        return token = 2
        /* CloseBraceToken */
        ;

      case 91
      /* openBracket */
      :
        pos++;
        return token = 3
        /* OpenBracketToken */
        ;

      case 93
      /* closeBracket */
      :
        pos++;
        return token = 4
        /* CloseBracketToken */
        ;

      case 58
      /* colon */
      :
        pos++;
        return token = 6
        /* ColonToken */
        ;

      case 44
      /* comma */
      :
        pos++;
        return token = 5
        /* CommaToken */
        ;
      // strings

      case 34
      /* doubleQuote */
      :
        pos++;
        value = scanString();
        return token = 10
        /* StringLiteral */
        ;
      // comments

      case 47
      /* slash */
      :
        var start = pos - 1; // Single-line comment

        if (text.charCodeAt(pos + 1) === 47
        /* slash */
        ) {
          pos += 2;

          while (pos < len) {
            if (isLineBreak(text.charCodeAt(pos))) {
              break;
            }

            pos++;
          }

          value = text.substring(start, pos);
          return token = 12
          /* LineCommentTrivia */
          ;
        } // Multi-line comment


        if (text.charCodeAt(pos + 1) === 42
        /* asterisk */
        ) {
          pos += 2;
          var safeLength = len - 1; // For lookahead.

          var commentClosed = false;

          while (pos < safeLength) {
            var ch = text.charCodeAt(pos);

            if (ch === 42
            /* asterisk */
            && text.charCodeAt(pos + 1) === 47
            /* slash */
            ) {
              pos += 2;
              commentClosed = true;
              break;
            }

            pos++;

            if (isLineBreak(ch)) {
              if (ch === 13
              /* carriageReturn */
              && text.charCodeAt(pos) === 10
              /* lineFeed */
              ) {
                pos++;
              }

              lineNumber++;
              tokenLineStartOffset = pos;
            }
          }

          if (!commentClosed) {
            pos++;
            scanError = 1
            /* UnexpectedEndOfComment */
            ;
          }

          value = text.substring(start, pos);
          return token = 13
          /* BlockCommentTrivia */
          ;
        } // just a single slash


        value += String.fromCharCode(code);
        pos++;
        return token = 16
        /* Unknown */
        ;
      // numbers

      case 45
      /* minus */
      :
        value += String.fromCharCode(code);
        pos++;

        if (pos === len || !isDigit(text.charCodeAt(pos))) {
          return token = 16
          /* Unknown */
          ;
        }

      // found a minus, followed by a number so
      // we fall through to proceed with scanning
      // numbers

      case 48
      /* _0 */
      :
      case 49
      /* _1 */
      :
      case 50
      /* _2 */
      :
      case 51
      /* _3 */
      :
      case 52
      /* _4 */
      :
      case 53
      /* _5 */
      :
      case 54
      /* _6 */
      :
      case 55
      /* _7 */
      :
      case 56
      /* _8 */
      :
      case 57
      /* _9 */
      :
        value += scanNumber();
        return token = 11
        /* NumericLiteral */
        ;
      // literals and unknown symbols

      default:
        // is a literal? Read the full word.
        while (pos < len && isUnknownContentCharacter(code)) {
          pos++;
          code = text.charCodeAt(pos);
        }

        if (tokenOffset !== pos) {
          value = text.substring(tokenOffset, pos); // keywords: true, false, null

          switch (value) {
            case 'true':
              return token = 8
              /* TrueKeyword */
              ;

            case 'false':
              return token = 9
              /* FalseKeyword */
              ;

            case 'null':
              return token = 7
              /* NullKeyword */
              ;
          }

          return token = 16
          /* Unknown */
          ;
        } // some


        value += String.fromCharCode(code);
        pos++;
        return token = 16
        /* Unknown */
        ;
    }
  }

  function isUnknownContentCharacter(code) {
    if (isWhiteSpace(code) || isLineBreak(code)) {
      return false;
    }

    switch (code) {
      case 125
      /* closeBrace */
      :
      case 93
      /* closeBracket */
      :
      case 123
      /* openBrace */
      :
      case 91
      /* openBracket */
      :
      case 34
      /* doubleQuote */
      :
      case 58
      /* colon */
      :
      case 44
      /* comma */
      :
      case 47
      /* slash */
      :
        return false;
    }

    return true;
  }

  function scanNextNonTrivia() {
    var result;

    do {
      result = scanNext();
    } while (result >= 12
    /* LineCommentTrivia */
    && result <= 15
    /* Trivia */
    );

    return result;
  }

  return {
    setPosition: setPosition,
    getPosition: function () {
      return pos;
    },
    scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
    getToken: function () {
      return token;
    },
    getTokenValue: function () {
      return value;
    },
    getTokenOffset: function () {
      return tokenOffset;
    },
    getTokenLength: function () {
      return pos - tokenOffset;
    },
    getTokenStartLine: function () {
      return lineStartOffset;
    },
    getTokenStartCharacter: function () {
      return tokenOffset - prevTokenLineStartOffset;
    },
    getTokenError: function () {
      return scanError;
    }
  };
}

function isWhiteSpace(ch) {
  return ch === 32
  /* space */
  || ch === 9
  /* tab */
  || ch === 11
  /* verticalTab */
  || ch === 12
  /* formFeed */
  || ch === 160
  /* nonBreakingSpace */
  || ch === 5760
  /* ogham */
  || ch >= 8192
  /* enQuad */
  && ch <= 8203
  /* zeroWidthSpace */
  || ch === 8239
  /* narrowNoBreakSpace */
  || ch === 8287
  /* mathematicalSpace */
  || ch === 12288
  /* ideographicSpace */
  || ch === 65279
  /* byteOrderMark */
  ;
}

function isLineBreak(ch) {
  return ch === 10
  /* lineFeed */
  || ch === 13
  /* carriageReturn */
  || ch === 8232
  /* lineSeparator */
  || ch === 8233
  /* paragraphSeparator */
  ;
}

function isDigit(ch) {
  return ch >= 48
  /* _0 */
  && ch <= 57
  /* _9 */
  ;
}
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var ParseOptions;

(function (ParseOptions) {
  ParseOptions.DEFAULT = {
    allowTrailingComma: false
  };
})(ParseOptions || (ParseOptions = {}));
/**
 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore always check the errors list to find out if the input was valid.
 */


function parse$1(text, errors, options) {
  if (errors === void 0) {
    errors = [];
  }

  if (options === void 0) {
    options = ParseOptions.DEFAULT;
  }

  var currentProperty = null;
  var currentParent = [];
  var previousParents = [];

  function onValue(value) {
    if (Array.isArray(currentParent)) {
      currentParent.push(value);
    } else if (currentProperty !== null) {
      currentParent[currentProperty] = value;
    }
  }

  var visitor = {
    onObjectBegin: function () {
      var object = {};
      onValue(object);
      previousParents.push(currentParent);
      currentParent = object;
      currentProperty = null;
    },
    onObjectProperty: function (name) {
      currentProperty = name;
    },
    onObjectEnd: function () {
      currentParent = previousParents.pop();
    },
    onArrayBegin: function () {
      var array = [];
      onValue(array);
      previousParents.push(currentParent);
      currentParent = array;
      currentProperty = null;
    },
    onArrayEnd: function () {
      currentParent = previousParents.pop();
    },
    onLiteralValue: onValue,
    onError: function (error, offset, length) {
      errors.push({
        error: error,
        offset: offset,
        length: length
      });
    }
  };
  visit(text, visitor, options);
  return currentParent[0];
}
/**
 * Parses the given text and invokes the visitor functions for each object, array and literal reached.
 */


function visit(text, visitor, options) {
  if (options === void 0) {
    options = ParseOptions.DEFAULT;
  }

  var _scanner = createScanner(text, false);

  function toNoArgVisit(visitFunction) {
    return visitFunction ? function () {
      return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
    } : function () {
      return true;
    };
  }

  function toOneArgVisit(visitFunction) {
    return visitFunction ? function (arg) {
      return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
    } : function () {
      return true;
    };
  }

  var onObjectBegin = toNoArgVisit(visitor.onObjectBegin),
      onObjectProperty = toOneArgVisit(visitor.onObjectProperty),
      onObjectEnd = toNoArgVisit(visitor.onObjectEnd),
      onArrayBegin = toNoArgVisit(visitor.onArrayBegin),
      onArrayEnd = toNoArgVisit(visitor.onArrayEnd),
      onLiteralValue = toOneArgVisit(visitor.onLiteralValue),
      onSeparator = toOneArgVisit(visitor.onSeparator),
      onComment = toNoArgVisit(visitor.onComment),
      onError = toOneArgVisit(visitor.onError);
  var disallowComments = options && options.disallowComments;
  var allowTrailingComma = options && options.allowTrailingComma;

  function scanNext() {
    while (true) {
      var token = _scanner.scan();

      switch (_scanner.getTokenError()) {
        case 4
        /* InvalidUnicode */
        :
          handleError(14
          /* InvalidUnicode */
          );
          break;

        case 5
        /* InvalidEscapeCharacter */
        :
          handleError(15
          /* InvalidEscapeCharacter */
          );
          break;

        case 3
        /* UnexpectedEndOfNumber */
        :
          handleError(13
          /* UnexpectedEndOfNumber */
          );
          break;

        case 1
        /* UnexpectedEndOfComment */
        :
          if (!disallowComments) {
            handleError(11
            /* UnexpectedEndOfComment */
            );
          }

          break;

        case 2
        /* UnexpectedEndOfString */
        :
          handleError(12
          /* UnexpectedEndOfString */
          );
          break;

        case 6
        /* InvalidCharacter */
        :
          handleError(16
          /* InvalidCharacter */
          );
          break;
      }

      switch (token) {
        case 12
        /* LineCommentTrivia */
        :
        case 13
        /* BlockCommentTrivia */
        :
          if (disallowComments) {
            handleError(10
            /* InvalidCommentToken */
            );
          } else {
            onComment();
          }

          break;

        case 16
        /* Unknown */
        :
          handleError(1
          /* InvalidSymbol */
          );
          break;

        case 15
        /* Trivia */
        :
        case 14
        /* LineBreakTrivia */
        :
          break;

        default:
          return token;
      }
    }
  }

  function handleError(error, skipUntilAfter, skipUntil) {
    if (skipUntilAfter === void 0) {
      skipUntilAfter = [];
    }

    if (skipUntil === void 0) {
      skipUntil = [];
    }

    onError(error);

    if (skipUntilAfter.length + skipUntil.length > 0) {
      var token = _scanner.getToken();

      while (token !== 17
      /* EOF */
      ) {
        if (skipUntilAfter.indexOf(token) !== -1) {
          scanNext();
          break;
        } else if (skipUntil.indexOf(token) !== -1) {
          break;
        }

        token = scanNext();
      }
    }
  }

  function parseString(isValue) {
    var value = _scanner.getTokenValue();

    if (isValue) {
      onLiteralValue(value);
    } else {
      onObjectProperty(value);
    }

    scanNext();
    return true;
  }

  function parseLiteral() {
    switch (_scanner.getToken()) {
      case 11
      /* NumericLiteral */
      :
        var tokenValue = _scanner.getTokenValue();

        var value = Number(tokenValue);

        if (isNaN(value)) {
          handleError(2
          /* InvalidNumberFormat */
          );
          value = 0;
        }

        onLiteralValue(value);
        break;

      case 7
      /* NullKeyword */
      :
        onLiteralValue(null);
        break;

      case 8
      /* TrueKeyword */
      :
        onLiteralValue(true);
        break;

      case 9
      /* FalseKeyword */
      :
        onLiteralValue(false);
        break;

      default:
        return false;
    }

    scanNext();
    return true;
  }

  function parseProperty() {
    if (_scanner.getToken() !== 10
    /* StringLiteral */
    ) {
      handleError(3
      /* PropertyNameExpected */
      , [], [2
      /* CloseBraceToken */
      , 5
      /* CommaToken */
      ]);
      return false;
    }

    parseString(false);

    if (_scanner.getToken() === 6
    /* ColonToken */
    ) {
      onSeparator(':');
      scanNext(); // consume colon

      if (!parseValue()) {
        handleError(4
        /* ValueExpected */
        , [], [2
        /* CloseBraceToken */
        , 5
        /* CommaToken */
        ]);
      }
    } else {
      handleError(5
      /* ColonExpected */
      , [], [2
      /* CloseBraceToken */
      , 5
      /* CommaToken */
      ]);
    }

    return true;
  }

  function parseObject() {
    onObjectBegin();
    scanNext(); // consume open brace

    var needsComma = false;

    while (_scanner.getToken() !== 2
    /* CloseBraceToken */
    && _scanner.getToken() !== 17
    /* EOF */
    ) {
      if (_scanner.getToken() === 5
      /* CommaToken */
      ) {
        if (!needsComma) {
          handleError(4
          /* ValueExpected */
          , [], []);
        }

        onSeparator(',');
        scanNext(); // consume comma

        if (_scanner.getToken() === 2
        /* CloseBraceToken */
        && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6
        /* CommaExpected */
        , [], []);
      }

      if (!parseProperty()) {
        handleError(4
        /* ValueExpected */
        , [], [2
        /* CloseBraceToken */
        , 5
        /* CommaToken */
        ]);
      }

      needsComma = true;
    }

    onObjectEnd();

    if (_scanner.getToken() !== 2
    /* CloseBraceToken */
    ) {
      handleError(7
      /* CloseBraceExpected */
      , [2
      /* CloseBraceToken */
      ], []);
    } else {
      scanNext(); // consume close brace
    }

    return true;
  }

  function parseArray() {
    onArrayBegin();
    scanNext(); // consume open bracket

    var needsComma = false;

    while (_scanner.getToken() !== 4
    /* CloseBracketToken */
    && _scanner.getToken() !== 17
    /* EOF */
    ) {
      if (_scanner.getToken() === 5
      /* CommaToken */
      ) {
        if (!needsComma) {
          handleError(4
          /* ValueExpected */
          , [], []);
        }

        onSeparator(',');
        scanNext(); // consume comma

        if (_scanner.getToken() === 4
        /* CloseBracketToken */
        && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6
        /* CommaExpected */
        , [], []);
      }

      if (!parseValue()) {
        handleError(4
        /* ValueExpected */
        , [], [4
        /* CloseBracketToken */
        , 5
        /* CommaToken */
        ]);
      }

      needsComma = true;
    }

    onArrayEnd();

    if (_scanner.getToken() !== 4
    /* CloseBracketToken */
    ) {
      handleError(8
      /* CloseBracketExpected */
      , [4
      /* CloseBracketToken */
      ], []);
    } else {
      scanNext(); // consume close bracket
    }

    return true;
  }

  function parseValue() {
    switch (_scanner.getToken()) {
      case 3
      /* OpenBracketToken */
      :
        return parseArray();

      case 1
      /* OpenBraceToken */
      :
        return parseObject();

      case 10
      /* StringLiteral */
      :
        return parseString(true);

      default:
        return parseLiteral();
    }
  }

  scanNext();

  if (_scanner.getToken() === 17
  /* EOF */
  ) {
    if (options.allowEmptyContent) {
      return true;
    }

    handleError(4
    /* ValueExpected */
    , [], []);
    return false;
  }

  if (!parseValue()) {
    handleError(4
    /* ValueExpected */
    , [], []);
    return false;
  }

  if (_scanner.getToken() !== 17
  /* EOF */
  ) {
    handleError(9
    /* EndOfFileExpected */
    , [], []);
  }

  return true;
}
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore, always check the errors list to find out if the input was valid.
 */


var parse = parse$1;
const isWebWorker = typeof self !== 'undefined' && typeof self.WorkerGlobalScope !== 'undefined';
const isBrowser = isWebWorker || typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof fetch !== 'undefined'; // to be replaced by rollup

let CDN_ROOT = '';
/**
 * Set the route for loading the assets
 * URL should end with `/`
 *
 * For example:
 * ```ts
 * setCDN('https://unpkg.com/shiki/') // use unpkg
 * setCDN('/assets/shiki/') // serve by yourself
 * ```
 */

function setCDN(root) {
  CDN_ROOT = root;
}

let _onigurumaPromise = null;

async function getOniguruma() {
  if (!_onigurumaPromise) {
    let loader;

    if (isBrowser) {
      {
        loader = main$1.loadWASM({
          data: await fetch(_resolvePath('dist/onig.wasm')).then(r => r.arrayBuffer())
        });
      }
    } else {
      const path = require('path');

      const wasmPath = path.join(require.resolve('vscode-oniguruma'), '../onig.wasm');

      const fs = require('fs');

      const wasmBin = fs.readFileSync(wasmPath).buffer;
      loader = main$1.loadWASM(wasmBin);
    }

    _onigurumaPromise = loader.then(() => {
      return {
        createOnigScanner(patterns) {
          return main$1.createOnigScanner(patterns);
        },

        createOnigString(s) {
          return main$1.createOnigString(s);
        }

      };
    });
  }

  return _onigurumaPromise;
}

function _resolvePath(filepath) {
  if (isBrowser) {
    if (!CDN_ROOT) {
      console.warn('[Shiki] no CDN provider found, use `setCDN()` to specify the CDN for loading the resources before calling `getHighlighter()`');
    }

    return `${CDN_ROOT}${filepath}`;
  } else {
    const path = require('path');

    if (path.isAbsolute(filepath)) {
      return filepath;
    } else {
      return path.resolve(__dirname, '..', filepath);
    }
  }
}
/**
 * @param filepath assert path related to ./packages/shiki
 */


async function _fetchAssets(filepath) {
  const path = _resolvePath(filepath);

  if (isBrowser) {
    return await fetch(path).then(r => r.text());
  } else {
    const fs = require('fs');

    return await fs.promises.readFile(path, 'utf-8');
  }
}

async function _fetchJSONAssets(filepath) {
  const errors = [];
  const rawTheme = parse(await _fetchAssets(filepath), errors, {
    allowTrailingComma: true
  });

  if (errors.length) {
    throw errors[0];
  }

  return rawTheme;
}
/**
 * @param themePath related path to theme.json
 */


async function fetchTheme(themePath) {
  let theme = await _fetchJSONAssets(themePath);
  const shikiTheme = toShikiTheme(theme);

  if (shikiTheme.include) {
    const includedTheme = await fetchTheme(join(dirname(themePath), shikiTheme.include));

    if (includedTheme.settings) {
      shikiTheme.settings = includedTheme.settings.concat(shikiTheme.settings);
    }

    if (includedTheme.bg && !shikiTheme.bg) {
      shikiTheme.bg = includedTheme.bg;
    }

    if (includedTheme.colors) {
      shikiTheme.colors = Object.assign(Object.assign({}, includedTheme.colors), shikiTheme.colors);
    }

    delete shikiTheme.include;
  }

  return shikiTheme;
}

async function fetchGrammar(filepath) {
  return await _fetchJSONAssets(filepath);
}

function repairTheme(theme) {
  // Has the default no-scope setting with fallback colors
  if (!theme.settings) theme.settings = [];

  if (theme.settings[0] && theme.settings[0].settings && !theme.settings[0].scope) {
    return;
  } // Push a no-scope setting with fallback colors


  theme.settings.unshift({
    settings: {
      foreground: theme.fg,
      background: theme.bg
    }
  });
}

function toShikiTheme(rawTheme) {
  const type = rawTheme.type || 'dark';
  const shikiTheme = Object.assign(Object.assign({
    name: rawTheme.name,
    type
  }, rawTheme), getThemeDefaultColors(rawTheme));

  if (rawTheme.include) {
    shikiTheme.include = rawTheme.include;
  }

  if (rawTheme.tokenColors) {
    shikiTheme.settings = rawTheme.tokenColors;
    delete shikiTheme.tokenColors;
  }

  repairTheme(shikiTheme);
  return shikiTheme;
}
/**
 * https://github.com/microsoft/vscode/blob/f7f05dee53fb33fe023db2e06e30a89d3094488f/src/vs/platform/theme/common/colorRegistry.ts#L258-L268
 */


const VSCODE_FALLBACK_EDITOR_FG = {
  light: '#333333',
  dark: '#bbbbbb'
};
const VSCODE_FALLBACK_EDITOR_BG = {
  light: '#fffffe',
  dark: '#1e1e1e'
};

function getThemeDefaultColors(theme) {
  var _a, _b, _c, _d, _e, _f;

  let fg, bg;
  /**
   * First try:
   * Theme might contain a global `tokenColor` without `name` or `scope`
   * Used as default value for foreground/background
   */

  let settings = theme.settings ? theme.settings : theme.tokenColors;
  const globalSetting = settings ? settings.find(s => {
    return !s.name && !s.scope;
  }) : undefined;

  if ((_a = globalSetting === null || globalSetting === void 0 ? void 0 : globalSetting.settings) === null || _a === void 0 ? void 0 : _a.foreground) {
    fg = globalSetting.settings.foreground;
  }

  if ((_b = globalSetting === null || globalSetting === void 0 ? void 0 : globalSetting.settings) === null || _b === void 0 ? void 0 : _b.background) {
    bg = globalSetting.settings.background;
  }
  /**
   * Second try:
   * If there's no global `tokenColor` without `name` or `scope`
   * Use `editor.foreground` and `editor.background`
   */


  if (!fg && ((_d = (_c = theme) === null || _c === void 0 ? void 0 : _c.colors) === null || _d === void 0 ? void 0 : _d['editor.foreground'])) {
    fg = theme.colors['editor.foreground'];
  }

  if (!bg && ((_f = (_e = theme) === null || _e === void 0 ? void 0 : _e.colors) === null || _f === void 0 ? void 0 : _f['editor.background'])) {
    bg = theme.colors['editor.background'];
  }
  /**
   * Last try:
   * If there's no fg/bg color specified in theme, use default
   */


  if (!fg) {
    fg = theme.type === 'light' ? VSCODE_FALLBACK_EDITOR_FG.light : VSCODE_FALLBACK_EDITOR_FG.dark;
  }

  if (!bg) {
    bg = theme.type === 'light' ? VSCODE_FALLBACK_EDITOR_BG.light : VSCODE_FALLBACK_EDITOR_BG.dark;
  }

  return {
    fg,
    bg
  };
}
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/


class Resolver {
  constructor(onigLibPromise, onigLibName) {
    this.languagesPath = 'languages/';
    this.languageMap = {};
    this.scopeToLangMap = {};
    this._onigLibPromise = onigLibPromise;
    this._onigLibName = onigLibName;
  }

  get onigLib() {
    return this._onigLibPromise;
  }

  getOnigLibName() {
    return this._onigLibName;
  }

  getLangRegistration(langIdOrAlias) {
    return this.languageMap[langIdOrAlias];
  }

  async loadGrammar(scopeName) {
    const lang = this.scopeToLangMap[scopeName];

    if (!lang) {
      return null;
    }

    if (lang.grammar) {
      return lang.grammar;
    }

    const g = await fetchGrammar(languages.includes(lang) ? `${this.languagesPath}${lang.path}` : lang.path);
    lang.grammar = g;
    return g;
  }

  addLanguage(l) {
    this.languageMap[l.id] = l;

    if (l.aliases) {
      l.aliases.forEach(a => {
        this.languageMap[a] = l;
      });
    }

    this.scopeToLangMap[l.scopeName] = l;
  }

}
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/


function tokenizeWithTheme(theme, colorMap, fileContents, grammar, options) {
  let lines = fileContents.split(/\r\n|\r|\n/);
  let ruleStack = main.INITIAL;
  let actual = [];
  let final = [];

  for (let i = 0, len = lines.length; i < len; i++) {
    let line = lines[i];

    if (line === '') {
      actual = [];
      final.push([]);
      continue;
    }

    let resultWithScopes;
    let tokensWithScopes;
    let tokensWithScopesIndex;

    if (options.includeExplanation) {
      resultWithScopes = grammar.tokenizeLine(line, ruleStack);
      tokensWithScopes = resultWithScopes.tokens;
      tokensWithScopesIndex = 0;
    }

    let result = grammar.tokenizeLine2(line, ruleStack);
    let tokensLength = result.tokens.length / 2;

    for (let j = 0; j < tokensLength; j++) {
      let startIndex = result.tokens[2 * j];
      let nextStartIndex = j + 1 < tokensLength ? result.tokens[2 * j + 2] : line.length;

      if (startIndex === nextStartIndex) {
        continue;
      }

      let metadata = result.tokens[2 * j + 1];
      let foreground = StackElementMetadata.getForeground(metadata);
      let foregroundColor = colorMap[foreground];
      let fontStyle = StackElementMetadata.getFontStyle(metadata);
      let explanation = [];

      if (options.includeExplanation) {
        let offset = 0;

        while (startIndex + offset < nextStartIndex) {
          let tokenWithScopes = tokensWithScopes[tokensWithScopesIndex];
          let tokenWithScopesText = line.substring(tokenWithScopes.startIndex, tokenWithScopes.endIndex);
          offset += tokenWithScopesText.length;
          explanation.push({
            content: tokenWithScopesText,
            scopes: explainThemeScopes(theme, tokenWithScopes.scopes)
          });
          tokensWithScopesIndex++;
        }
      }

      actual.push({
        content: line.substring(startIndex, nextStartIndex),
        color: foregroundColor,
        fontStyle,
        explanation: explanation
      });
    }

    final.push(actual);
    actual = [];
    ruleStack = result.ruleStack;
  }

  return final;
}

function explainThemeScopes(theme, scopes) {
  let result = [];

  for (let i = 0, len = scopes.length; i < len; i++) {
    let parentScopes = scopes.slice(0, i);
    let scope = scopes[i];
    result[i] = {
      scopeName: scope,
      themeMatches: explainThemeScope(theme, scope, parentScopes)
    };
  }

  return result;
}

function matchesOne(selector, scope) {
  let selectorPrefix = selector + '.';

  if (selector === scope || scope.substring(0, selectorPrefix.length) === selectorPrefix) {
    return true;
  }

  return false;
}

function matches(selector, selectorParentScopes, scope, parentScopes) {
  if (!matchesOne(selector, scope)) {
    return false;
  }

  let selectorParentIndex = selectorParentScopes.length - 1;
  let parentIndex = parentScopes.length - 1;

  while (selectorParentIndex >= 0 && parentIndex >= 0) {
    if (matchesOne(selectorParentScopes[selectorParentIndex], parentScopes[parentIndex])) {
      selectorParentIndex--;
    }

    parentIndex--;
  }

  if (selectorParentIndex === -1) {
    return true;
  }

  return false;
}

function explainThemeScope(theme, scope, parentScopes) {
  let result = [],
      resultLen = 0;

  for (let i = 0, len = theme.settings.length; i < len; i++) {
    let setting = theme.settings[i];
    let selectors;

    if (typeof setting.scope === 'string') {
      selectors = setting.scope.split(/,/).map(scope => scope.trim());
    } else if (Array.isArray(setting.scope)) {
      selectors = setting.scope;
    } else {
      continue;
    }

    for (let j = 0, lenJ = selectors.length; j < lenJ; j++) {
      let rawSelector = selectors[j];
      let rawSelectorPieces = rawSelector.split(/ /);
      let selector = rawSelectorPieces[rawSelectorPieces.length - 1];
      let selectorParentScopes = rawSelectorPieces.slice(0, rawSelectorPieces.length - 1);

      if (matches(selector, selectorParentScopes, scope, parentScopes)) {
        // match!
        result[resultLen++] = setting; // break the loop

        j = lenJ;
      }
    }
  }

  return result;
}

function renderToHtml(lines, options = {}) {
  const bg = options.bg || '#fff';
  let html = '';
  html += `<pre class="shiki" style="background-color: ${bg}">`;

  if (options.langId) {
    html += `<div class="language-id">${options.langId}</div>`;
  }

  html += `<code>`;
  lines.forEach(l => {
    html += `<span class="line">`;
    l.forEach(token => {
      const cssDeclarations = [`color: ${token.color || options.fg}`];

      if (token.fontStyle & FontStyle.Italic) {
        cssDeclarations.push('font-style: italic');
      }

      if (token.fontStyle & FontStyle.Bold) {
        cssDeclarations.push('font-weight: bold');
      }

      if (token.fontStyle & FontStyle.Underline) {
        cssDeclarations.push('text-decoration: underline');
      }

      html += `<span style="${cssDeclarations.join('; ')}">${escapeHtml(token.content)}</span>`;
    });
    html += `</span>\n`;
  });
  html = html.replace(/\n*$/, ''); // Get rid of final new lines

  html += `</code></pre>`;
  return html;
}

const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

function escapeHtml(html) {
  return html.replace(/[&<>"']/g, chr => htmlEscapes[chr]);
}

class Registry extends main.Registry {
  constructor(_resolver) {
    super(_resolver);
    this._resolver = _resolver;
    this.themesPath = 'themes/';
    this._resolvedThemes = {};
    this._resolvedGrammars = {};
  }

  getTheme(theme) {
    if (typeof theme === 'string') {
      return this._resolvedThemes[theme];
    } else {
      return theme;
    }
  }

  async loadTheme(theme) {
    if (typeof theme === 'string') {
      if (!this._resolvedThemes[theme]) {
        this._resolvedThemes[theme] = await fetchTheme(`${this.themesPath}${theme}.json`);
      }

      return this._resolvedThemes[theme];
    } else {
      theme = toShikiTheme(theme);

      if (theme.name) {
        this._resolvedThemes[theme.name] = theme;
      }

      return theme;
    }
  }

  async loadThemes(themes) {
    return await Promise.all(themes.map(theme => this.loadTheme(theme)));
  }

  getLoadedThemes() {
    return Object.keys(this._resolvedThemes);
  }

  getGrammar(name) {
    return this._resolvedGrammars[name];
  }

  async loadLanguage(lang) {
    const g = await this.loadGrammar(lang.scopeName);
    this._resolvedGrammars[lang.id] = g;

    if (lang.aliases) {
      lang.aliases.forEach(la => {
        this._resolvedGrammars[la] = g;
      });
    }
  }

  async loadLanguages(langs) {
    for (const lang of langs) {
      this._resolver.addLanguage(lang);
    }

    for (const lang of langs) {
      await this.loadLanguage(lang);
    }
  }

  getLoadedLanguages() {
    return Object.keys(this._resolvedGrammars);
  }

}

function resolveLang(lang) {
  return typeof lang === 'string' ? languages.find(l => {
    var _a;

    return l.id === lang || ((_a = l.aliases) === null || _a === void 0 ? void 0 : _a.includes(lang));
  }) : lang;
}

function resolveOptions(options) {
  var _a;

  let _languages = languages;

  let _themes = options.themes || [];

  if ((_a = options.langs) === null || _a === void 0 ? void 0 : _a.length) {
    _languages = options.langs.map(resolveLang);
  }

  if (options.theme) {
    _themes.unshift(options.theme);
  }

  if (!_themes.length) {
    _themes = ['nord'];
  }

  return {
    _languages,
    _themes
  };
}

async function getHighlighter(options) {
  var _a, _b;

  const {
    _languages,
    _themes
  } = resolveOptions(options);

  const _resolver = new Resolver(getOniguruma(), 'vscode-oniguruma');

  const _registry = new Registry(_resolver);

  if ((_a = options.paths) === null || _a === void 0 ? void 0 : _a.themes) {
    _registry.themesPath = options.paths.themes;
  }

  if ((_b = options.paths) === null || _b === void 0 ? void 0 : _b.languages) {
    _resolver.languagesPath = options.paths.languages;
  }

  const themes = await _registry.loadThemes(_themes);
  const _defaultTheme = themes[0];

  let _currentTheme;

  await _registry.loadLanguages(_languages);
  /**
   * Shiki was designed for VS Code, so CSS variables are not currently supported.
   * See: https://github.com/shikijs/shiki/pull/212#issuecomment-906924986
   *
   * Instead, we work around this by using valid hex color codes as lookups in a
   * final "repair" step which translates those codes to the correct CSS variables.
   */

  const COLOR_REPLACEMENTS = {
    '#000001': 'var(--shiki-color-text)',
    '#000002': 'var(--shiki-color-background)',
    '#000004': 'var(--shiki-token-constant)',
    '#000005': 'var(--shiki-token-string)',
    '#000006': 'var(--shiki-token-comment)',
    '#000007': 'var(--shiki-token-keyword)',
    '#000008': 'var(--shiki-token-parameter)',
    '#000009': 'var(--shiki-token-function)',
    '#000010': 'var(--shiki-token-string-expression)',
    '#000011': 'var(--shiki-token-punctuation)',
    '#000012': 'var(--shiki-token-link)'
  };

  function fixCssVariablesTheme(theme, colorMap) {
    theme.bg = COLOR_REPLACEMENTS[theme.bg] || theme.bg;
    theme.fg = COLOR_REPLACEMENTS[theme.fg] || theme.fg;
    colorMap.forEach((val, i) => {
      colorMap[i] = COLOR_REPLACEMENTS[val] || val;
    });
  }

  function getTheme(theme) {
    const _theme = theme ? _registry.getTheme(theme) : _defaultTheme;

    if (!_theme) {
      throw Error(`No theme registration for ${theme}`);
    }

    if (!_currentTheme || _currentTheme.name !== _theme.name) {
      _registry.setTheme(_theme);

      _currentTheme = _theme;
    }

    const _colorMap = _registry.getColorMap();

    if (_theme.name === 'css-variables') {
      fixCssVariablesTheme(_theme, _colorMap);
    }

    return {
      _theme,
      _colorMap
    };
  }

  function getGrammar(lang) {
    const _grammar = _registry.getGrammar(lang);

    if (!_grammar) {
      throw Error(`No language registration for ${lang}`);
    }

    return {
      _grammar
    };
  }

  function codeToThemedTokens(code, lang = 'text', theme, options = {
    includeExplanation: true
  }) {
    if (isPlaintext(lang)) {
      return [[{
        content: code
      }]];
    }

    const {
      _grammar
    } = getGrammar(lang);
    const {
      _theme,
      _colorMap
    } = getTheme(theme);
    return tokenizeWithTheme(_theme, _colorMap, code, _grammar, options);
  }

  function codeToHtml(code, lang = 'text', theme) {
    const tokens = codeToThemedTokens(code, lang, theme, {
      includeExplanation: false
    });
    const {
      _theme
    } = getTheme(theme);
    return renderToHtml(tokens, {
      fg: _theme.fg,
      bg: _theme.bg
    });
  }

  async function loadTheme(theme) {
    await _registry.loadTheme(theme);
  }

  async function loadLanguage(lang) {
    const _lang = resolveLang(lang);

    _resolver.addLanguage(_lang);

    await _registry.loadLanguage(_lang);
  }

  function getLoadedThemes() {
    return _registry.getLoadedThemes();
  }

  function getLoadedLanguages() {
    return _registry.getLoadedLanguages();
  }

  function getBackgroundColor(theme) {
    const {
      _theme
    } = getTheme(theme);
    return _theme.bg;
  }

  function getForegroundColor(theme) {
    const {
      _theme
    } = getTheme(theme);
    return _theme.fg;
  }

  return {
    codeToThemedTokens,
    codeToHtml,
    getTheme: theme => {
      return getTheme(theme)._theme;
    },
    loadTheme,
    loadLanguage,
    getBackgroundColor,
    getForegroundColor,
    getLoadedThemes,
    getLoadedLanguages
  };
}

function isPlaintext(lang) {
  return !lang || ['plaintext', 'txt', 'text'].includes(lang);
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

var objectProto$b = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$1 = objectProto$b.toString;
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
  var isOwn = hasOwnProperty$8.call(value, symToStringTag$1),
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
var objectProto$a = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto$a.toString;
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
    objectProto$9 = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty$7).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
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

var _defineProperty = defineProperty;

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
  if (key == '__proto__' && _defineProperty) {
    _defineProperty(object, key, {
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

var objectProto$8 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;
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
  return isObjectLike_1(value) && hasOwnProperty$6.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
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

var isBuffer_1 = createCommonjsModule(function (module, exports) {
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
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
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
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
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

var objectProto$7 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
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
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
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
var objectProto$6 = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$6;
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

var objectProto$5 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
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
    if (hasOwnProperty$4.call(object, key) && key != 'constructor') {
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

var objectProto$4 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
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

  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */

var objectProto$3 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
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
  return _nativeCreate ? data[key] !== undefined : hasOwnProperty$2.call(data, key);
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
    mapTag$1 = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag$1 = '[object Set]',
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

    case mapTag$1:
      var convert = _mapToArray;

    case setTag$1:
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

var objectProto$2 = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols ? stubArray_1 : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function (symbol) {
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

var objectProto$1 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
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

    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
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

var WeakMap = _getNative(_root, 'WeakMap');
var _WeakMap = WeakMap;

/** `Object#toString` result references. */

var mapTag = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
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

if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag || _Map && getTag(new _Map()) != mapTag || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag || _WeakMap && getTag(new _WeakMap()) != weakMapTag) {
  getTag = function (value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag;

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

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
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

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
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
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

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

var FUNC_ERROR_TEXT = 'Expected a function';
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
    throw new TypeError(FUNC_ERROR_TEXT);
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

var INFINITY$2 = 1 / 0;
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
  return result == '0' && 1 / value == -INFINITY$2 ? '-0' : result;
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

var INFINITY$1 = 1 / 0;
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
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
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
    ignitionConfig
  } = useContext(IgnitionConfigContext);
  const editor = ignitionConfig.editor;
  const editors = mapValues_1(ignitionConfig.editorOptions, e => e.url); // TODO: fix this with config context provider
  // file =
  //     (config.remoteSitesPath || '').length > 0 && (config.localSitesPath || '').length > 0
  //         ? file.replace(config.remoteSitesPath, config.localSitesPath)
  //         : file;

  if (!Object.keys(editors).includes(editor)) {
    console.error(`'${editor}' is not supported. Support editors are: ${Object.keys(editors).join(', ')}`);
    return null;
  }

  return editors[editor].replace('%path', encodeURIComponent(file)).replace('%line', encodeURIComponent(lineNumber));
}

function FrameCodeSnippetLine({
  highlight,
  tokens,
  frame,
  lineNumber
}) {
  const editorUrl = useEditorUrl({
    file: frame.file,
    lineNumber
  });
  return /*#__PURE__*/React.createElement("span", {
    className: `
                block group pl-3 leading-loose hover:~bg-red-500/10
                ${highlight ? ' ~bg-red-500/20' : ''}
            `
  }, !tokens.length && /*#__PURE__*/React.createElement(React.Fragment, null, "\xA0"), !!tokens.length && tokens.map((token, index) => /*#__PURE__*/React.createElement("span", {
    key: index,
    style: {
      color: token.color
    }
  }, token.content || /*#__PURE__*/React.createElement(React.Fragment, null, "\xA0"))), editorUrl && /*#__PURE__*/React.createElement("a", {
    href: editorUrl,
    className: "sticky left-8 -mt-6 -ml-5 z-30 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-red-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs "
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-pencil-alt"
  })));
}

function FrameCodeSnippet({
  frame
}) {
  const {
    theme
  } = useContext(IgnitionConfigContext);
  const [tokenizedCode, setTokenizedCode] = useState([]);
  const lineNumbers = Object.keys(frame.code_snippet).map(n => Number(n));
  const highlightedIndex = lineNumbers.indexOf(frame.line_number); // TODO: bundle themes and language definitions. Don't rely on CDN.

  setCDN('https://unpkg.com/shiki/');
  useEffect(() => {
    // Set un-highlighted code tokens first.
    setTokenizedCode(Object.values(frame.code_snippet).map((line, index) => ({
      lineNumber: lineNumbers[index],
      tokens: [{
        content: line
      }]
    })));
    getHighlighter({
      theme: theme === 'light' ? 'github-light' : 'github-dark',
      langs: ['php'] // TODO: blade?

    }).then(highlighter => {
      const code = Object.values(frame.code_snippet).join('\n');
      const lines = highlighter.codeToThemedTokens(code, 'php'); // TODO: Somehow remember these highlighted tokens per frame?

      setTokenizedCode(lines.map((line, index) => ({
        lineNumber: lineNumbers[index],
        tokens: line
      })));
    });
  }, [frame, theme]);
  return /*#__PURE__*/React.createElement("main", {
    className: "flex items-stretch flex-grow overflow-x-auto overflow-y-hidden scrollbar-hidden-x mask-fade-x text-sm"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "sticky left-0 flex flex-none z-20 ~bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "select-none"
  }, lineNumbers.map(number => /*#__PURE__*/React.createElement("p", {
    key: number,
    className: `
                                        px-2 font-mono leading-loose select-none cursor-pointer
                                        ${Number(number) === frame.line_number ? ' text-opacity-75 ~text-red-700 ~bg-red-500/30' : ''}
                                    `
  }, /*#__PURE__*/React.createElement("span", {
    className: "~text-gray-500"
  }, number))))), /*#__PURE__*/React.createElement("div", {
    className: "flex-grow pr-10"
  }, /*#__PURE__*/React.createElement("pre", null, /*#__PURE__*/React.createElement("code", null, tokenizedCode.map(({
    tokens,
    lineNumber
  }, index) => /*#__PURE__*/React.createElement(FrameCodeSnippetLine, {
    key: index,
    frame: frame,
    highlight: index === highlightedIndex,
    tokens: tokens,
    lineNumber: lineNumber
  }))))));
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

var INFINITY = 1 / 0;
/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */

var createSet = !(_Set && 1 / _setToArray(new _Set([, -0]))[1] == INFINITY) ? noop_1 : function (values) {
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
        const expanded = uniq_1([...applicationFrameNumbers, state.frames.length]);
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
  return addFrameNumbers(state.frames).find(frame => frame.frame_number === state.selected);
}

function RelaxedFullyQualifiedClassName({
  path
}) {
  const parts = path.split('\\');
  return /*#__PURE__*/React.createElement(React.Fragment, null, parts.map((part, index) => /*#__PURE__*/React.createElement("span", {
    key: index
  }, part, index !== parts.length - 1 && /*#__PURE__*/React.createElement("span", {
    className: "mx-0.5"
  }, "\\"), /*#__PURE__*/React.createElement("wbr", null))));
}

function FrameGroup({
  frameGroup,
  onExpand,
  onSelect
}) {
  if (frameGroup.type === 'vendor' && !frameGroup.expanded) {
    return /*#__PURE__*/React.createElement("li", {
      className: "group px-6 sm:px-10 py-4 flex lg:justify-start border-b ~border-gray-200 hover:~bg-red-500/10 flex items-center",
      onClick: onExpand
    }, frameGroup.frames.length > 1 ? `${frameGroup.frames.length} vendor frames` : '1 vendor frame', /*#__PURE__*/React.createElement("i", {
      className: "ml-2 fas fa-angle-down ~text-gray-500 group-hover:text-red-500"
    }));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, frameGroup.frames.map(frame => /*#__PURE__*/React.createElement("li", {
    key: frame.frame_number,
    className: `px-6 sm:px-10 py-4 ${frame.selected ? 'bg-red-500 text-white' : 'border-b ~border-gray-200 hover:~bg-red-500/10'}`,
    onClick: () => onSelect(frame.frame_number)
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement(RelaxedFullyQualifiedClassName, {
    path: frame.class || ''
  })), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":", frame.line_number)), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, frame.method))));
}

function RelaxedFilePath({
  path,
  lineNumber = null
}) {
  var _parts$pop;

  const parts = path.split('/');
  const fileParts = ((_parts$pop = parts.pop()) == null ? void 0 : _parts$pop.split('.')) || [];
  const extension = fileParts.pop();
  const fileName = fileParts.join('.');
  return /*#__PURE__*/React.createElement("span", {
    className: "group"
  }, parts.map((part, index) => /*#__PURE__*/React.createElement("span", {
    key: index,
    className: "group-hover:underline"
  }, part, /*#__PURE__*/React.createElement("span", {
    className: "mx-0.5 group-hover:no-underline"
  }, "/"), /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "group-hover:underline font-semibold"
  }, fileName), /*#__PURE__*/React.createElement("span", {
    className: "group-hover:underline"
  }, ".", extension), lineNumber && /*#__PURE__*/React.createElement("span", {
    className: "group-hover:underline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mx-0.5 group-hover:no-underline"
  }, ":"), lineNumber));
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
  return /*#__PURE__*/React.createElement("a", {
    href: editorUrl || '#',
    className: className
  }, /*#__PURE__*/React.createElement(RelaxedFilePath, {
    path: path,
    lineNumber: lineNumber
  }));
}

function StackTrace({
  openFrameIndex
}) {
  const {
    frames
  } = useContext(ErrorOccurrenceContext);
  const initialState = useMemo(() => {
    let selectedFrame = frames.length;

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
  const [selectedRange, setSelectedRange] = useState(null);
  useLayoutEffect(() => {
    const framePattern = /F([0-9]+)?/gm;
    const linePattern = /L([0-9]+)(-([0-9]+))?/gm;
    const frameMatches = framePattern.exec(window.location.hash);
    const lineMatches = linePattern.exec(window.location.hash);

    if (frameMatches) {
      const frameNumber = parseInt(frameMatches[1]);
      dispatch({
        type: 'SELECT_FRAME',
        frame: frameNumber
      });
    }

    if (lineMatches) {
      const minLineNumber = parseInt(lineMatches[1]);
      const maxLineNumber = lineMatches[3] ? parseInt(lineMatches[3]) : minLineNumber;
      setSelectedRange([minLineNumber, maxLineNumber]);
    }
  }, []);
  useEffect(() => {
    const lineNumber = selectedRange ? selectedRange[0] === selectedRange[1] ? selectedRange[0] : `${selectedRange[0]}-${selectedRange[1]}` : null;
    window.history.replaceState(window.history.state, '', `#F${state.selected}${lineNumber ? 'L' + lineNumber : ''}`);
  }, [state.selected, selectedRange]);
  return /*#__PURE__*/React.createElement("section", {
    className: "mt-20 grid 2xl:row-span-3 2xl:row-start-1 2xl:col-start-2"
  }, /*#__PURE__*/React.createElement("a", {
    id: "stack",
    className: "z-50 absolute top-[-7.5rem]"
  }), /*#__PURE__*/React.createElement("div", {
    className: " grid grid-cols-1 lg:grid-cols-6 items-stretch min-h-50vh lg:max-h-[calc(100vh-10rem)] 2xl:max-h-[calc(100vh-7.5rem)] shadow-lg ~bg-white "
  }, /*#__PURE__*/React.createElement("aside", {
    className: "z-30 lg:col-span-2 flex flex-col border-r ~border-gray-200 lg:max-h-[calc(100vh-10rem)] 2xl:max-h-[calc(100vh-7.5rem)]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-h-[33vh] lg:max-h-[none] lg:absolute inset-0 flex flex-col overflow-hidden ~bg-white"
  }, /*#__PURE__*/React.createElement("header", {
    className: "flex-none px-6 sm:px-10 h-16 flex items-center justify-start ~bg-white border-b ~border-gray-200"
  }, vendorFramesExpanded ? /*#__PURE__*/React.createElement("button", {
    className: "h-6 px-2 rounded-sm ~bg-gray-500/5 hover:text-red-500 text-xs font-medium whitespace-nowrap",
    onClick: () => dispatch({
      type: 'COLLAPSE_ALL_VENDOR_FRAMES'
    })
  }, "Collapse vendor frames") : /*#__PURE__*/React.createElement("button", {
    className: "h-6 px-2 rounded-sm ~bg-gray-500/5 hover:text-red-500 text-xs font-medium whitespace-nowrap",
    onClick: () => dispatch({
      type: 'EXPAND_ALL_VENDOR_FRAMES'
    })
  }, "Expand vendor frames")), /*#__PURE__*/React.createElement("div", {
    id: "frames",
    className: "flex-grow overflow-auto scrollbar-hidden-y mask-fade-frames"
  }, /*#__PURE__*/React.createElement("ol", {
    className: "text-sm"
  }, frameGroups.map((frameGroup, i) => /*#__PURE__*/React.createElement(FrameGroup, {
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
      setSelectedRange(null);
    }
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "lg:max-h-[calc(100vh-10rem)] 2xl:max-h-[calc(100vh-7.5rem)] flex flex-col lg:col-span-4 border-t lg:border-t-0 ~border-gray-200"
  }, /*#__PURE__*/React.createElement("header", {
    className: "~text-gray-500 flex-none z-30 h-16 px-6 sm:px-10 flex items-center justify-end"
  }, /*#__PURE__*/React.createElement(EditorLink, {
    path: selectedFrame == null ? void 0 : selectedFrame.relative_file,
    lineNumber: selectedFrame == null ? void 0 : selectedFrame.line_number,
    className: "flex items-center text-sm"
  })), /*#__PURE__*/React.createElement(FrameCodeSnippet, {
    frame: selectedFrame
  }))));
}

/**
 * A specialized version of `baseAggregator` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function arrayAggregator(array, setter, iteratee, accumulator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee(value), array);
  }

  return accumulator;
}

var _arrayAggregator = arrayAggregator;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

function createBaseEach(eachFunc, fromRight) {
  return function (collection, iteratee) {
    if (collection == null) {
      return collection;
    }

    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }

    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }

    return collection;
  };
}

var _createBaseEach = createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */

var baseEach = _createBaseEach(_baseForOwn);
var _baseEach = baseEach;

/**
 * Aggregates elements of `collection` on `accumulator` with keys transformed
 * by `iteratee` and values set by `setter`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */

function baseAggregator(collection, setter, iteratee, accumulator) {
  _baseEach(collection, function (value, key, collection) {
    setter(accumulator, value, iteratee(value), collection);
  });
  return accumulator;
}

var _baseAggregator = baseAggregator;

/**
 * Creates a function like `_.groupBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} [initializer] The accumulator object initializer.
 * @returns {Function} Returns the new aggregator function.
 */

function createAggregator(setter, initializer) {
  return function (collection, iteratee) {
    var func = isArray_1(collection) ? _arrayAggregator : _baseAggregator,
        accumulator = initializer ? initializer() : {};
    return func(collection, setter, _baseIteratee(iteratee), accumulator);
  };
}

var _createAggregator = createAggregator;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the last element responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * var array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 *
 * _.keyBy(array, function(o) {
 *   return String.fromCharCode(o.code);
 * });
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 *
 * _.keyBy(array, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 */

var keyBy = _createAggregator(function (result, value, key) {
  _baseAssignValue(result, key, value);
});
var keyBy_1 = keyBy;

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

function getContextValues(errorOccurrence, group) {
  return mapValues_1(keyBy_1(errorOccurrence.context_items[group] || [], 'name'), 'value');
}

function CodeSnippet({
  value,
  limitHeight = true
}) {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(limitHeight);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight);
    }
  }, [ref.current, isCollapsed, value, limitHeight]);
  useEffect(() => {
    let timeout;

    if (copied) {
      timeout = window.setTimeout(() => setCopied(false), 3000);
    }

    return () => window.clearTimeout(timeout);
  }, [copied]);

  function copy() {
    copyToClipboard(value);
    setCopied(true);
  } // TODO: Handle empty values? E.g. content-length header


  return /*#__PURE__*/React.createElement("div", {
    className: "group ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("pre", {
    ref: ref,
    className: `px-4 py-2 mask-fade-x overflow-x-scroll scrollbar-hidden-x
                    ${isCollapsed ? 'overflow-y-hidden max-h-32' : ''}
                    ${isOverflowing ? 'mask-fade-y' : ''}
                `
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, value)), /*#__PURE__*/React.createElement("button", {
    onClick: copy,
    title: "Copy to clipboard",
    className: `absolute top-2 right-2 hover:text-indigo-500 opacity-0 transition-opacity duration-150 ${copied ? '' : 'group-hover:opacity-100'}`
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  })), copied && /*#__PURE__*/React.createElement("p", {
    className: "hidden z-10 shadow-md sm:block absolute top-2 right-2 px-2 py-1 -mt-1 ml-1 bg-white text-sm text-emerald-500 whitespace-nowrap",
    onClick: () => setCopied(false)
  }, "Copied!"), isOverflowing && /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsCollapsed(false),
    className: "absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-indigo-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs "
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-angle-down"
  })));
}

function ErrorMessage() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const sqlQuery = `SELECT
    projects.team_id
FROM
    \`flare\`.\`projects\`
    JOIN subscriptions ON subscriptions.team_id = projects.team_id
WHERE (\`last_error_received_at\` > '2021-09-29 00:00:00')
    AND(\`last_error_received_at\` < '2021-10-01')
    AND subscriptions.stripe_status IS NOT NULL
GROUP BY
    projects.team_id;`;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "my-4 font-semibold leading-snug text-xl"
  }, errorOccurrence.exception_message), /*#__PURE__*/React.createElement(CodeSnippet, {
    value: sqlQuery
  }));
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

  return /*#__PURE__*/React.createElement(React.Fragment, null, wasExecutionSuccessful === null && /*#__PURE__*/React.createElement("button", {
    className: "ml-4 px-4 h-8 bg-white/20 text-white whitespace-nowrap border-b border-gray-500/25 text-xs uppercase tracking-wider font-bold rounded-sm shadow-md hover:shadow-lg active:shadow-none",
    onClick: executeSolution,
    disabled: isRunningSolution
  }, isRunningSolution ? /*#__PURE__*/React.createElement("span", null, "Running...") : /*#__PURE__*/React.createElement("span", null, solution.run_button_text || 'Run')), wasExecutionSuccessful === true && /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
    className: "font-semibold"
  }, "The solution was executed successfully."), /*#__PURE__*/React.createElement("a", {
    className: "ml-2",
    href: "#",
    onClick: refresh
  }, "Refresh now.")), wasExecutionSuccessful === false && /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
    className: "font-semibold"
  }, "Something went wrong when executing the solution. Please try refreshing the page and try again."), /*#__PURE__*/React.createElement("a", {
    className: "ml-2",
    href: "#",
    onClick: refresh
  }, "Refresh now.")));
}

function Solution({
  solution,
  isOpen: initialIsOpen = false,
  canExecute = false
}) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("button", {
    className: "group mb-4 flex items-center justify-start",
    onClick: () => setIsOpen(!isOpen)
  }, /*#__PURE__*/React.createElement("i", {
    className: `-ml-6 w-6 fas group-hover:opacity-40 opacity-0 text-sm ${isOpen ? 'fa-angle-down' : 'fa-angle-right'}`
  }), /*#__PURE__*/React.createElement("h2", {
    className: "min-w-0 truncate font-semibold leading-snug"
  }, solution.title)), /*#__PURE__*/React.createElement("div", {
    className: `${isOpen ? '' : 'hidden'}`
  }, solution.description && /*#__PURE__*/React.createElement("p", null, solution.description), /*#__PURE__*/React.createElement("div", {
    className: "my-4 max-w-max flex items-stretch pl-4 pr-2 py-2 bg-gray-800/60 rounded-sm"
  }, /*#__PURE__*/React.createElement("code", {
    className: "flex items-center flex-grow text-gray-100 font-mono text-sm"
  }, solution.action_description), solution.is_runnable && canExecute && /*#__PURE__*/React.createElement(SolutionRunner, {
    solution: solution
  })), /*#__PURE__*/React.createElement("ul", {
    className: "grid grid-cols-1 gap-y-1 text-sm"
  }, Object.entries(solution.links).map(([title, link], index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, /*#__PURE__*/React.createElement("a", {
    href: link,
    target: "_blank",
    className: "underline text-emerald-700 dark:text-emerald-800"
  }, title))))));
}

function Solutions() {
  const {
    solutions
  } = useContext(ErrorOccurrenceContext);
  const [canExecuteSolutions, setCanExecuteSolutions] = useState(false);
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
      setCanExecuteSolutions(false);
    }
  }, []);
  return /*#__PURE__*/React.createElement("aside", {
    id: "solution",
    className: "flex flex-col w-full lg:col-span-2 2xl:col-span-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-grow px-6 sm:px-10 py-8 text-gray-800  bg-emerald-300"
  }, /*#__PURE__*/React.createElement("button", {
    className: "absolute top-4 right-4 leading-none opacity-50 hover:opacity-75 text-sm"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-times"
  })), solutions.map((solution, index) => /*#__PURE__*/React.createElement("div", {
    key: index
  }, /*#__PURE__*/React.createElement(Solution, {
    solution: solution,
    canExecute: canExecuteSolutions,
    isOpen: index === 0
  }), index !== solutions.length - 1 && /*#__PURE__*/React.createElement("hr", {
    className: "my-4 border-t border-gray-800/20"
  })))));
}

function ErrorCard() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const hasSolutions = errorOccurrence.solutions.length > 0;
  return /*#__PURE__*/React.createElement("section", {
    className: "mt-20 grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-1 items-stretch ~bg-white shadow-lg"
  }, /*#__PURE__*/React.createElement("main", {
    id: "exception",
    className: `z-10 ${hasSolutions ? 'lg:col-span-3 2xl:col-span-1' : 'col-span-full'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-6 sm:px-10 py-8 overflow-x-auto"
  }, /*#__PURE__*/React.createElement("header", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "group h-10 px-4 items-center flex rounded-sm ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "flex flex-wrap leading-tight"
  }, /*#__PURE__*/React.createElement(RelaxedFullyQualifiedClassName, {
    path: errorOccurrence.exception_class
  })), /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement("i", {
    className: "ml-3 fas fa-angle-down group-hover:text-red-500 text-sm"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-flow-col justify-end gap-4 text-sm ~text-gray-500"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "tracking-wider"
  }, "PHP"), errorOccurrence.language_version), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-laravel"
  }), errorOccurrence.framework_version))), /*#__PURE__*/React.createElement(ErrorMessage, null)))), hasSolutions && /*#__PURE__*/React.createElement(Solutions, null));
}

function ContextNav({
  children
}) {
  return /*#__PURE__*/React.createElement("ul", {
    className: "grid grid-cols-1 gap-10"
  }, children);
}

function ContextNavGroup({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h4", {
    className: "uppercase tracking-wider ~text-gray-500 text-xs font-bold"
  }, title), /*#__PURE__*/React.createElement("ul", {
    className: "mt-3 grid grid-cols-1 gap-2"
  }, children));
}

function ContextNavItem({
  icon,
  children
}) {
  return /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base hover:text-indigo-500"
  }, /*#__PURE__*/React.createElement("i", {
    className: `mr-0.5 fa-fw text-xs text-gray-400 group-hover:text-indigo-500 ${icon}`
  }), children);
}

function ContextGroup({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "shadow-lg ~bg-white px-6 sm:px-10 pt-8 pb-20 min-w-0 overflow-hidden"
  }, /*#__PURE__*/React.createElement("dl", {
    className: "grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-6 col-span-2 font-bold leading-snug text-xl ~text-indigo-600 uppercase tracking-wider"
  }, title), children));
}

function ContextSection({
  icon,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "contents"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "py-2 col-span-2 font-semibold text-lg ~text-indigo-600"
  }, title, /*#__PURE__*/React.createElement("i", {
    className: `ml-2 fa-fw text-sm opacity-50 ${icon}`
  })), children);
}

function Request() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const request = getContextValues(errorOccurrence, 'request');
  const requestData = getContextValues(errorOccurrence, 'request_data');
  const headers = getContextValues(errorOccurrence, 'headers');
  const curl = useMemo(() => curlCommand(request, requestData, headers), [request, requestData, headers]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "py-2 col-span-2 text-lg font-semibold flex items-center"
  }, /*#__PURE__*/React.createElement("span", null, request.url), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 px-1.5 rounded-sm  border border-indigo-500/20 ~text-indigo-600 text-xs uppercase tracking-wider"
  }, request.method.toUpperCase())), curl && /*#__PURE__*/React.createElement("div", {
    className: "col-span-2"
  }, /*#__PURE__*/React.createElement(CodeSnippet, {
    value: curl
  })));
}

function ContextList({
  items
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, Object.entries(items || {}).map(([key, value], index) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: index
  }, /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, key), /*#__PURE__*/React.createElement("dd", null, typeof value === 'string' ? /*#__PURE__*/React.createElement(CodeSnippet, {
    value: value
  }) : /*#__PURE__*/React.createElement(CodeSnippet, {
    value: JSON.stringify(value)
  })))));
}

function Headers() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  return /*#__PURE__*/React.createElement(ContextList, {
    items: getContextValues(errorOccurrence, 'headers')
  });
}

function QueryString() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  return /*#__PURE__*/React.createElement(ContextList, {
    items: getContextValues(errorOccurrence, 'request').queryString
  });
}

function Body() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const body = getContextValues(errorOccurrence, 'request_data').body;
  return /*#__PURE__*/React.createElement("div", {
    className: "col-span-2"
  }, /*#__PURE__*/React.createElement(CodeSnippet, {
    value: JSON.stringify(body)
  }));
}

function Files() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const files = getContextValues(errorOccurrence, 'request_data').files;
  return /*#__PURE__*/React.createElement("div", {
    className: "col-span-2"
  }, /*#__PURE__*/React.createElement(CodeSnippet, {
    value: JSON.stringify(files)
  }));
}

function Session() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  return /*#__PURE__*/React.createElement(ContextList, {
    items: getContextValues(errorOccurrence, 'session')
  });
}

function Cookies() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  return /*#__PURE__*/React.createElement(ContextList, {
    items: getContextValues(errorOccurrence, 'cookies')
  });
}

function Context() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mt-20 2xl:row-span-4"
  }, /*#__PURE__*/React.createElement("a", {
    id: "context",
    className: "z-50 absolute top-[-7.5rem] "
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-stretch"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "hidden sm:block min-w-[8rem] flex-none mr-10 lg:mr-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sticky top-[7.5rem]"
  }, /*#__PURE__*/React.createElement(ContextNav, null, /*#__PURE__*/React.createElement(ContextNavGroup, {
    title: "Request"
  }, /*#__PURE__*/React.createElement(ContextNavItem, {
    icon: "fas fa-exchange-alt"
  }, "Headers"), /*#__PURE__*/React.createElement(ContextNavItem, {
    icon: "far fa-question-circle"
  }, "Query String"), /*#__PURE__*/React.createElement(ContextNavItem, {
    icon: "fas fa-code"
  }, "Body"), /*#__PURE__*/React.createElement(ContextNavItem, {
    icon: "far fa-file"
  }, "Files"), /*#__PURE__*/React.createElement(ContextNavItem, {
    icon: "fas fa-hourglass-half"
  }, "Session"), /*#__PURE__*/React.createElement(ContextNavItem, {
    icon: "fas fa-cookie-bite"
  }, "Cookies")), /*#__PURE__*/React.createElement(ContextNavGroup, {
    title: "App"
  }, /*#__PURE__*/React.createElement(ContextNavItem, {
    icon: "fas fa-random"
  }, "Routing"), /*#__PURE__*/React.createElement(ContextNavItem, {
    icon: "fas fa-paint-roller"
  }, "Views")), /*#__PURE__*/React.createElement(ContextNavGroup, {
    title: "User"
  }, /*#__PURE__*/React.createElement(ContextNavItem, {
    icon: "fas fa-user"
  }, "User"), /*#__PURE__*/React.createElement(ContextNavItem, {
    icon: "far fa-window-maximize"
  }, "Client"))))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden grid grid-cols-1 gap-px flex-grow"
  }, /*#__PURE__*/React.createElement(ContextGroup, {
    title: "Request"
  }, /*#__PURE__*/React.createElement(Request, null), /*#__PURE__*/React.createElement(ContextSection, {
    title: "Headers",
    icon: "fas fa-exchange-alt",
    children: /*#__PURE__*/React.createElement(Headers, null)
  }), /*#__PURE__*/React.createElement(ContextSection, {
    title: "Query String",
    icon: "far fa-question-circle",
    children: /*#__PURE__*/React.createElement(QueryString, null)
  }), /*#__PURE__*/React.createElement(ContextSection, {
    title: "Body",
    icon: "fas fa-code",
    children: /*#__PURE__*/React.createElement(Body, null)
  }), /*#__PURE__*/React.createElement(ContextSection, {
    title: "Files",
    icon: "far fa-file",
    children: /*#__PURE__*/React.createElement(Files, null)
  }), /*#__PURE__*/React.createElement(ContextSection, {
    title: "Session",
    icon: "fas fa-hourglass-half",
    children: /*#__PURE__*/React.createElement(Session, null)
  }), /*#__PURE__*/React.createElement(ContextSection, {
    title: "Cookies",
    icon: "fas fa-cookie-bite",
    children: /*#__PURE__*/React.createElement(Cookies, null)
  })), /*#__PURE__*/React.createElement(ContextGroup, {
    title: "App"
  }, /*#__PURE__*/React.createElement(ContextSection, {
    title: "Routing",
    icon: "fas fa-random",
    children: /*#__PURE__*/React.createElement("div", null, "Routing")
  }), /*#__PURE__*/React.createElement(ContextSection, {
    title: "Views",
    icon: "fas fa-paint-roller",
    children: /*#__PURE__*/React.createElement("div", null, "Views")
  })), /*#__PURE__*/React.createElement(ContextGroup, {
    title: "User"
  }, /*#__PURE__*/React.createElement(ContextSection, {
    title: "User",
    icon: "fas fa-user",
    children: /*#__PURE__*/React.createElement("div", null, "User")
  }), /*#__PURE__*/React.createElement(ContextSection, {
    title: "Client",
    icon: "far fa-window-maximize",
    children: /*#__PURE__*/React.createElement("div", null, "Client")
  })))));
} // @ts-ignore

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
  });
  const Tab = tabs[currentTabIndex].component;
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-300/70 dark:bg-black/20 shadow-inner"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "flex justify-center items-center"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "-mt-5 flex justify-start items-center rounded-full shadow-lg bg-indigo-400 text-white space-x-px"
  }, tabs.map((tab, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: `
                                    ${i === currentTabIndex ? 'bg-indigo-500' : '~bg-white text-gray-500'}
                                    ${i === 0 ? 'rounded-l-full' : ''}
                                    ${i === tabs.length - 1 ? 'rounded-r-full' : ''}
                                `
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentTabIndex(i),
    className: "group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium "
  }, /*#__PURE__*/React.createElement("span", {
    className: "mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/30 text-white rounded-full text-xs"
  }, tab.count), /*#__PURE__*/React.createElement("span", null, tab.name)))))), /*#__PURE__*/React.createElement("div", {
    className: "py-8 px-6 sm:px-10"
  }), /*#__PURE__*/React.createElement(Tab, null));
}

DebugTabs.Tab = _props => null;

function DebugItem({
  children,
  context = null,
  level = null
}) {
  const logLevelColors = {
    error: 'bg-red-500',
    warn: 'bg-orange-500',
    warning: 'bg-orange-500',
    info: 'bg-blue-500',
    debug: 'bg-green-500',
    trace: 'bg-gray-500',
    notice: 'bg-purple-500',
    critical: 'bg-red-500',
    alert: 'bg-red-500',
    emergency: 'bg-red-500'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "px-6 py-3 my-3 border-b-2 sm:px-10"
  }, level && /*#__PURE__*/React.createElement("span", {
    className: `
                        ${logLevelColors[level] || 'bg-color-gray-500'}
                        text-white rounded py-1 px-2 shadow-sm
                    `
  }, level), children, context && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2"
  }, /*#__PURE__*/React.createElement(ContextList, {
    items: context
  })));
}

function Logs() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const logs = Object.values(getContextValues(errorOccurrence, 'logs'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, logs.map((log, index) => /*#__PURE__*/React.createElement(DebugItem, {
    key: index,
    context: log.context,
    level: log.level
  }, /*#__PURE__*/React.createElement(CodeSnippet, {
    value: log.message
  }))));
}

function Dumps() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const dumps = Object.values(getContextValues(errorOccurrence, 'dumps'));
  console.log(dumps);
  return /*#__PURE__*/React.createElement(React.Fragment, null, dumps.map(dump => /*#__PURE__*/React.createElement(DebugItem, null, /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: dump.html_dump
    }
  }), /*#__PURE__*/React.createElement(EditorLink, {
    path: dump.file,
    lineNumber: dump.line_number
  }))));
}

function Queries() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const queries = Object.values(getContextValues(errorOccurrence, 'queries'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, queries.map((query, index) => /*#__PURE__*/React.createElement(DebugItem, {
    key: index
  }, /*#__PURE__*/React.createElement("span", {
    className: `bg-gray-500 text-white rounded py-1 px-2 shadow-sm`
  }, query.connection_name), /*#__PURE__*/React.createElement(CodeSnippet, {
    value: query.sql
  }), /*#__PURE__*/React.createElement("span", null, "Runtime: ", query.time, "sec"))));
}

function Glows() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const glows = errorOccurrence.glows;
  return /*#__PURE__*/React.createElement(React.Fragment, null, glows.map((glow, index) => /*#__PURE__*/React.createElement(DebugItem, {
    key: index,
    level: glow.message_level,
    context: glow.meta_data
  }, /*#__PURE__*/React.createElement(CodeSnippet, {
    value: glow.name
  }))));
}

function Debug() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const dumps = getContextValues(errorOccurrence, 'dumps');
  const glows = errorOccurrence.glows;
  const queries = getContextValues(errorOccurrence, 'queries');
  const logs = getContextValues(errorOccurrence, 'logs');
  return /*#__PURE__*/React.createElement("section", {
    className: "mt-20 2xl:col-start-2"
  }, /*#__PURE__*/React.createElement("a", {
    id: "debug",
    className: "z-50 absolute top-[-7.5rem]"
  }), /*#__PURE__*/React.createElement(DebugTabs, null, /*#__PURE__*/React.createElement(DebugTabs.Tab, {
    component: Dumps,
    name: "Dumps",
    count: Object.keys(dumps).length
  }), /*#__PURE__*/React.createElement(DebugTabs.Tab, {
    component: Glows,
    name: "Glows",
    count: glows.length
  }), /*#__PURE__*/React.createElement(DebugTabs.Tab, {
    component: Queries,
    name: "Queries",
    count: Object.keys(queries).length
  }), /*#__PURE__*/React.createElement(DebugTabs.Tab, {
    component: Logs,
    name: "Logs",
    count: Object.keys(logs).length
  })));
}

function CopyButton({
  value
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    let timeout;

    if (copied) {
      timeout = window.setTimeout(() => setCopied(false), 3000);
    }

    return () => window.clearTimeout(timeout);
  }, [copied]);

  function copy() {
    copyToClipboard(value);
    setCopied(true);
  }

  return /*#__PURE__*/React.createElement("button", {
    onClick: copy,
    title: "Copy to clipboard",
    className: `hover:text-indigo-500 opacity-0 transition-opacity duration-150 ${copied ? '' : 'group-hover:opacity-100'}`
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }));
}

function FlareIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 682 1024",
    className: "w-4 h-5 ml-1.5"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "235.3,510.5 21.5,387 21.5,140.2 236.5,264.1 ",
    style: {
      fill: 'rgb(81, 219, 158)'
    }
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "235.3,1004.8 21.5,881.4 21.5,634.5 234.8,757.9 ",
    style: {
      fill: 'rgb(121, 0, 245)'
    }
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "448.9,386.9 21.5,140.2 235.3,16.7 663.2,263.4 ",
    style: {
      fill: 'rgb(148, 242, 200)'
    }
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "234.8,757.9 21.5,634.5 235.3,511 449.1,634.5 ",
    style: {
      fill: 'rgb(164, 117, 244)'
    }
  }));
}

function IgnitionIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    id: "ignition",
    className: "w-8 h-8 -ml-1",
    viewBox: "0 0 500 500"
  }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polygon", {
    style: {
      fill: 'transparent'
    },
    points: "466.5,375 466.5,125 250,0 33.5,125 33.5,375 250,500 \t"
  }), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polygon", {
    style: {
      fill: '#ff4590'
    },
    points: "314.2,176 314.2,250 250,287 250,212.6 \t\t"
  }), /*#__PURE__*/React.createElement("polygon", {
    style: {
      fill: '#ffd000'
    },
    points: "185.9,398.1 185.9,324.1 250,287 249.9,360.9 \t\t"
  }), /*#__PURE__*/React.createElement("polygon", {
    style: {
      fill: '#de075d'
    },
    points: "250,139.1 250,287 185.9,250 185.8,101.9 \t\t"
  }), /*#__PURE__*/React.createElement("polygon", {
    style: {
      fill: '#e0b800'
    },
    points: "249.9,360.9 250,287 314.1,324 314.1,398.1 \t\t"
  }))));
}

export { Context, CopyButton, Debug, ErrorCard, ErrorOccurrenceContext, FlareIcon, IgnitionConfigContext, IgnitionConfigContextProvider, IgnitionIcon, StackTrace };
