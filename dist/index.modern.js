import React, { createContext, useContext, useState, useEffect } from 'react';

/* @ts-ignore */

var ErrorOccurrenceContext = createContext();

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var onigasm = createCommonjsModule(function (module, exports) {
  var Onigasm = function () {

    return function (Onigasm) {
      Onigasm = Onigasm || {};
      var Module = typeof Onigasm !== "undefined" ? Onigasm : {};
      var moduleOverrides = {};
      var key;

      for (key in Module) {
        if (Module.hasOwnProperty(key)) {
          moduleOverrides[key] = Module[key];
        }
      }
      var ENVIRONMENT_IS_WORKER = false;
      var scriptDirectory = "";

      function locateFile(path) {
        if (Module["locateFile"]) {
          return Module["locateFile"](path, scriptDirectory);
        }

        return scriptDirectory + path;
      }

      var readBinary;

      {

        readBinary = function readBinary(f) {
          var data;

          if (typeof readbuffer === "function") {
            return new Uint8Array(readbuffer(f));
          }

          data = read(f, "binary");
          assert(typeof data === "object");
          return data;
        };

        if (typeof scriptArgs != "undefined") {
          scriptArgs;
        }

        if (typeof print !== "undefined") {
          if (typeof console === "undefined") console = {};
          console.log = print;
          console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
        }
      }

      var out = Module["print"] || console.log.bind(console);
      var err = Module["printErr"] || console.warn.bind(console);

      for (key in moduleOverrides) {
        if (moduleOverrides.hasOwnProperty(key)) {
          Module[key] = moduleOverrides[key];
        }
      }

      moduleOverrides = null;

      var wasmBinary;
      if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

      if (typeof WebAssembly !== "object") {
        err("no native wasm support detected");
      }

      var wasmMemory;
      var wasmTable = new WebAssembly.Table({
        "initial": 244,
        "maximum": 244 + 0,
        "element": "anyfunc"
      });
      var ABORT = false;

      function assert(condition, text) {
        if (!condition) {
          abort("Assertion failed: " + text);
        }
      }

      function getCFunc(ident) {
        var func = Module["_" + ident];
        assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
        return func;
      }

      function ccall(ident, returnType, argTypes, args, opts) {
        var toC = {
          "string": function (str) {
            var ret = 0;

            if (str !== null && str !== undefined && str !== 0) {
              var len = (str.length << 2) + 1;
              ret = stackAlloc(len);
              stringToUTF8(str, ret, len);
            }

            return ret;
          },
          "array": function (arr) {
            var ret = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret);
            return ret;
          }
        };

        function convertReturnValue(ret) {
          if (returnType === "string") return UTF8ToString(ret);
          if (returnType === "boolean") return Boolean(ret);
          return ret;
        }

        var func = getCFunc(ident);
        var cArgs = [];
        var stack = 0;

        if (args) {
          for (var i = 0; i < args.length; i++) {
            var converter = toC[argTypes[i]];

            if (converter) {
              if (stack === 0) stack = stackSave();
              cArgs[i] = converter(args[i]);
            } else {
              cArgs[i] = args[i];
            }
          }
        }

        var ret = func.apply(null, cArgs);
        ret = convertReturnValue(ret);
        if (stack !== 0) stackRestore(stack);
        return ret;
      }
      var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

      function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;

        while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;

        if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
          return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
        } else {
          var str = "";

          while (idx < endPtr) {
            var u0 = u8Array[idx++];

            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue;
            }

            var u1 = u8Array[idx++] & 63;

            if ((u0 & 224) == 192) {
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue;
            }

            var u2 = u8Array[idx++] & 63;

            if ((u0 & 240) == 224) {
              u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            } else {
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
            }

            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
          }
        }

        return str;
      }

      function UTF8ToString(ptr, maxBytesToRead) {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
      }

      function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0)) return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;

        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);

          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
          }

          if (u <= 127) {
            if (outIdx >= endIdx) break;
            outU8Array[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            outU8Array[outIdx++] = 192 | u >> 6;
            outU8Array[outIdx++] = 128 | u & 63;
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            outU8Array[outIdx++] = 224 | u >> 12;
            outU8Array[outIdx++] = 128 | u >> 6 & 63;
            outU8Array[outIdx++] = 128 | u & 63;
          } else {
            if (outIdx + 3 >= endIdx) break;
            outU8Array[outIdx++] = 240 | u >> 18;
            outU8Array[outIdx++] = 128 | u >> 12 & 63;
            outU8Array[outIdx++] = 128 | u >> 6 & 63;
            outU8Array[outIdx++] = 128 | u & 63;
          }
        }

        outU8Array[outIdx] = 0;
        return outIdx - startIdx;
      }

      function stringToUTF8(str, outPtr, maxBytesToWrite) {
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      }

      typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;

      function writeArrayToMemory(array, buffer) {
        HEAP8.set(array, buffer);
      }

      var WASM_PAGE_SIZE = 65536;

      function alignUp(x, multiple) {
        if (x % multiple > 0) {
          x += multiple - x % multiple;
        }

        return x;
      }

      var buffer, HEAP8, HEAPU8, HEAP32;

      function updateGlobalBufferAndViews(buf) {
        buffer = buf;
        Module["HEAP8"] = HEAP8 = new Int8Array(buf);
        Module["HEAP16"] = new Int16Array(buf);
        Module["HEAP32"] = HEAP32 = new Int32Array(buf);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
        Module["HEAPU16"] = new Uint16Array(buf);
        Module["HEAPU32"] = new Uint32Array(buf);
        Module["HEAPF32"] = new Float32Array(buf);
        Module["HEAPF64"] = new Float64Array(buf);
      }

      var DYNAMIC_BASE = 5507664,
          DYNAMICTOP_PTR = 264624;
      var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 157286400;

      if (Module["wasmMemory"]) {
        wasmMemory = Module["wasmMemory"];
      } else {
        wasmMemory = new WebAssembly.Memory({
          "initial": INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE
        });
      }

      if (wasmMemory) {
        buffer = wasmMemory.buffer;
      }

      INITIAL_TOTAL_MEMORY = buffer.byteLength;
      updateGlobalBufferAndViews(buffer);
      HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

      function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
          var callback = callbacks.shift();

          if (typeof callback == "function") {
            callback();
            continue;
          }

          var func = callback.func;

          if (typeof func === "number") {
            if (callback.arg === undefined) {
              Module["dynCall_v"](func);
            } else {
              Module["dynCall_vi"](func, callback.arg);
            }
          } else {
            func(callback.arg === undefined ? null : callback.arg);
          }
        }
      }

      var __ATPRERUN__ = [];
      var __ATINIT__ = [];
      var __ATMAIN__ = [];
      var __ATPOSTRUN__ = [];

      function preRun() {
        if (Module["preRun"]) {
          if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];

          while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift());
          }
        }

        callRuntimeCallbacks(__ATPRERUN__);
      }

      function initRuntime() {
        callRuntimeCallbacks(__ATINIT__);
      }

      function preMain() {
        callRuntimeCallbacks(__ATMAIN__);
      }

      function postRun() {
        if (Module["postRun"]) {
          if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];

          while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift());
          }
        }

        callRuntimeCallbacks(__ATPOSTRUN__);
      }

      function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb);
      }

      function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb);
      }
      var runDependencies = 0;
      var dependenciesFulfilled = null;

      function addRunDependency(id) {
        runDependencies++;

        if (Module["monitorRunDependencies"]) {
          Module["monitorRunDependencies"](runDependencies);
        }
      }

      function removeRunDependency(id) {
        runDependencies--;

        if (Module["monitorRunDependencies"]) {
          Module["monitorRunDependencies"](runDependencies);
        }

        if (runDependencies == 0) {

          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
          }
        }
      }

      Module["preloadedImages"] = {};
      Module["preloadedAudios"] = {};

      function abort(what) {
        if (Module["onAbort"]) {
          Module["onAbort"](what);
        }

        what += "";
        out(what);
        err(what);
        ABORT = true;
        what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
        throw new WebAssembly.RuntimeError(what);
      }

      var dataURIPrefix = "data:application/octet-stream;base64,";

      function isDataURI(filename) {
        return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
      }

      var wasmBinaryFile = "onigasm.wasm";

      if (!isDataURI(wasmBinaryFile)) {
        wasmBinaryFile = locateFile(wasmBinaryFile);
      }

      function getBinary() {
        try {
          if (wasmBinary) {
            return new Uint8Array(wasmBinary);
          }

          if (readBinary) {
            return readBinary(wasmBinaryFile);
          } else {
            throw "both async and sync fetching of the wasm failed";
          }
        } catch (err) {
          abort(err);
        }
      }

      function getBinaryPromise() {
        if (!wasmBinary && (ENVIRONMENT_IS_WORKER) && typeof fetch === "function") {
          return fetch(wasmBinaryFile, {
            credentials: "same-origin"
          }).then(function (response) {
            if (!response["ok"]) {
              throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
            }

            return response["arrayBuffer"]();
          }).catch(function () {
            return getBinary();
          });
        }

        return new Promise(function (resolve, reject) {
          resolve(getBinary());
        });
      }

      function createWasm() {
        var info = {
          "env": asmLibraryArg,
          "wasi_unstable": asmLibraryArg
        };

        function receiveInstance(instance, module) {
          var exports = instance.exports;
          Module["asm"] = exports;
          removeRunDependency();
        }

        addRunDependency();

        function receiveInstantiatedSource(output) {
          receiveInstance(output["instance"]);
        }

        function instantiateArrayBuffer(receiver) {
          return getBinaryPromise().then(function (binary) {
            return WebAssembly.instantiate(binary, info);
          }).then(receiver, function (reason) {
            err("failed to asynchronously prepare wasm: " + reason);
            abort(reason);
          });
        }

        function instantiateAsync() {
          if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
            fetch(wasmBinaryFile, {
              credentials: "same-origin"
            }).then(function (response) {
              var result = WebAssembly.instantiateStreaming(response, info);
              return result.then(receiveInstantiatedSource, function (reason) {
                err("wasm streaming compile failed: " + reason);
                err("falling back to ArrayBuffer instantiation");
                instantiateArrayBuffer(receiveInstantiatedSource);
              });
            });
          } else {
            return instantiateArrayBuffer(receiveInstantiatedSource);
          }
        }

        if (Module["instantiateWasm"]) {
          try {
            var exports = Module["instantiateWasm"](info, receiveInstance);
            return exports;
          } catch (e) {
            err("Module.instantiateWasm callback failed with error: " + e);
            return false;
          }
        }

        instantiateAsync();
        return {};
      }

      __ATINIT__.push({
        func: function () {
          ___wasm_call_ctors();
        }
      });

      function _abort() {
        abort();
      }

      function _emscripten_get_heap_size() {
        return HEAP8.length;
      }

      function _emscripten_get_sbrk_ptr() {
        return 264624;
      }

      function _emscripten_memcpy_big(dest, src, num) {
        HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
      }

      function emscripten_realloc_buffer(size) {
        try {
          wasmMemory.grow(size - buffer.byteLength + 65535 >> 16);
          updateGlobalBufferAndViews(wasmMemory.buffer);
          return 1;
        } catch (e) {}
      }

      function _emscripten_resize_heap(requestedSize) {
        var oldSize = _emscripten_get_heap_size();

        var PAGE_MULTIPLE = 65536;
        var LIMIT = 2147483648 - PAGE_MULTIPLE;

        if (requestedSize > LIMIT) {
          return false;
        }

        var MIN_TOTAL_MEMORY = 16777216;
        var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);

        while (newSize < requestedSize) {
          if (newSize <= 536870912) {
            newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
          } else {
            newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
          }
        }

        var replacement = emscripten_realloc_buffer(newSize);

        if (!replacement) {
          return false;
        }

        return true;
      }
      var SYSCALLS = {
        buffers: [null, [], []],
        printChar: function (stream, curr) {
          var buffer = SYSCALLS.buffers[stream];

          if (curr === 0 || curr === 10) {
            (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
            buffer.length = 0;
          } else {
            buffer.push(curr);
          }
        },
        varargs: 0,
        get: function (varargs) {
          SYSCALLS.varargs += 4;
          var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
          return ret;
        },
        getStr: function () {
          var ret = UTF8ToString(SYSCALLS.get());
          return ret;
        },
        get64: function () {
          var low = SYSCALLS.get();
              SYSCALLS.get();
          return low;
        },
        getZero: function () {
          SYSCALLS.get();
        }
      };

      function _fd_close(fd) {
        try {
          return 0;
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
          return e.errno;
        }
      }

      function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
        try {
          return 0;
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
          return e.errno;
        }
      }

      function _fd_write(fd, iov, iovcnt, pnum) {
        try {
          var num = 0;

          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[iov + i * 8 >> 2];
            var len = HEAP32[iov + (i * 8 + 4) >> 2];

            for (var j = 0; j < len; j++) {
              SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
            }

            num += len;
          }

          HEAP32[pnum >> 2] = num;
          return 0;
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
          return e.errno;
        }
      }

      function _setTempRet0($i) {
      }
      var asmLibraryArg = {
        "abort": _abort,
        "emscripten_get_sbrk_ptr": _emscripten_get_sbrk_ptr,
        "emscripten_memcpy_big": _emscripten_memcpy_big,
        "emscripten_resize_heap": _emscripten_resize_heap,
        "fd_close": _fd_close,
        "fd_seek": _fd_seek,
        "fd_write": _fd_write,
        "memory": wasmMemory,
        "setTempRet0": _setTempRet0,
        "table": wasmTable
      };
      var asm = createWasm();
      Module["asm"] = asm;

      var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function () {
        return Module["asm"]["__wasm_call_ctors"].apply(null, arguments);
      };

      Module["_malloc"] = function () {
        return Module["asm"]["malloc"].apply(null, arguments);
      };

      Module["_free"] = function () {
        return Module["asm"]["free"].apply(null, arguments);
      };

      Module["_getLastError"] = function () {
        return Module["asm"]["getLastError"].apply(null, arguments);
      };

      Module["_compilePattern"] = function () {
        return Module["asm"]["compilePattern"].apply(null, arguments);
      };

      Module["_disposeCompiledPatterns"] = function () {
        return Module["asm"]["disposeCompiledPatterns"].apply(null, arguments);
      };

      Module["_findBestMatch"] = function () {
        return Module["asm"]["findBestMatch"].apply(null, arguments);
      };

      Module["___cxa_demangle"] = function () {
        return Module["asm"]["__cxa_demangle"].apply(null, arguments);
      };

      Module["_setThrew"] = function () {
        return Module["asm"]["setThrew"].apply(null, arguments);
      };

      var stackSave = Module["stackSave"] = function () {
        return Module["asm"]["stackSave"].apply(null, arguments);
      };

      var stackAlloc = Module["stackAlloc"] = function () {
        return Module["asm"]["stackAlloc"].apply(null, arguments);
      };

      var stackRestore = Module["stackRestore"] = function () {
        return Module["asm"]["stackRestore"].apply(null, arguments);
      };

      Module["__growWasmMemory"] = function () {
        return Module["asm"]["__growWasmMemory"].apply(null, arguments);
      };

      Module["dynCall_vi"] = function () {
        return Module["asm"]["dynCall_vi"].apply(null, arguments);
      };

      Module["dynCall_iiii"] = function () {
        return Module["asm"]["dynCall_iiii"].apply(null, arguments);
      };

      Module["dynCall_iiiii"] = function () {
        return Module["asm"]["dynCall_iiiii"].apply(null, arguments);
      };

      Module["dynCall_iii"] = function () {
        return Module["asm"]["dynCall_iii"].apply(null, arguments);
      };

      Module["dynCall_iidiiii"] = function () {
        return Module["asm"]["dynCall_iidiiii"].apply(null, arguments);
      };

      Module["dynCall_vii"] = function () {
        return Module["asm"]["dynCall_vii"].apply(null, arguments);
      };

      Module["dynCall_ii"] = function () {
        return Module["asm"]["dynCall_ii"].apply(null, arguments);
      };

      Module["dynCall_i"] = function () {
        return Module["asm"]["dynCall_i"].apply(null, arguments);
      };

      Module["dynCall_v"] = function () {
        return Module["asm"]["dynCall_v"].apply(null, arguments);
      };

      Module["dynCall_viiiiii"] = function () {
        return Module["asm"]["dynCall_viiiiii"].apply(null, arguments);
      };

      Module["dynCall_viiiii"] = function () {
        return Module["asm"]["dynCall_viiiii"].apply(null, arguments);
      };

      Module["dynCall_viiii"] = function () {
        return Module["asm"]["dynCall_viiii"].apply(null, arguments);
      };

      Module["dynCall_jiji"] = function () {
        return Module["asm"]["dynCall_jiji"].apply(null, arguments);
      };

      Module["asm"] = asm;
      Module["ccall"] = ccall;
      var calledRun;

      Module["then"] = function (func) {
        if (calledRun) {
          func(Module);
        } else {
          var old = Module["onRuntimeInitialized"];

          Module["onRuntimeInitialized"] = function () {
            if (old) old();
            func(Module);
          };
        }

        return Module;
      };

      dependenciesFulfilled = function runCaller() {
        if (!calledRun) run();
        if (!calledRun) dependenciesFulfilled = runCaller;
      };

      function run(args) {

        if (runDependencies > 0) {
          return;
        }

        preRun();
        if (runDependencies > 0) return;

        function doRun() {
          if (calledRun) return;
          calledRun = true;
          if (ABORT) return;
          initRuntime();
          preMain();
          if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
          postRun();
        }

        if (Module["setStatus"]) {
          Module["setStatus"]("Running...");
          setTimeout(function () {
            setTimeout(function () {
              Module["setStatus"]("");
            }, 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
      }

      Module["run"] = run;

      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];

        while (Module["preInit"].length > 0) {
          Module["preInit"].pop()();
        }
      }
      run();
      return Onigasm;
    };
  }();

  module.exports = Onigasm;
});

var onigasmH = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  async function initModule(bytes) {
    return new Promise((resolve, reject) => {
      const {
        log,
        warn,
        error
      } = console;
      onigasm({
        instantiateWasm(imports, successCallback) {
          WebAssembly.instantiate(bytes, imports).then(output => {
            successCallback(output.instance);
          }).catch(e => {
            throw e;
          });
          return {};
        }

      }).then(moduleH => {
        exports.onigasmH = moduleH;
        resolve();
      });

      if (typeof print !== 'undefined') {
        // can be removed when https://github.com/emscripten-core/emscripten/issues/9829 is fixed.
        // tslint:disable-next-line:no-console
        console.log = log; // tslint:disable-next-line:no-console

        console.error = error; // tslint:disable-next-line:no-console

        console.warn = warn;
      }
    });
  }

  let isInitialized = false;
  /**
   * Mount the .wasm file that will act as library's "backend"
   * @param data Path to .wasm file or it's ArrayBuffer
   */

  async function loadWASM(data) {
    if (isInitialized) {
      throw new Error(`Onigasm#init has been called and was succesful, subsequent calls are not allowed once initialized`);
    }

    if (typeof data === 'string') {
      const arrayBuffer = await (await fetch(data)).arrayBuffer();
      await initModule(arrayBuffer);
    } else if (data instanceof ArrayBuffer) {
      await initModule(data);
    } else {
      throw new TypeError(`Expected a string (URL of .wasm file) or ArrayBuffer (.wasm file itself) as first parameter`);
    }

    isInitialized = true;
  }

  exports.loadWASM = loadWASM;
});

var iterator = function iterator(Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value;
    }
  };
};

var yallist = Yallist;
Yallist.Node = Node;
Yallist.create = Yallist;

function Yallist(list) {
  var self = this;

  if (!(self instanceof Yallist)) {
    self = new Yallist();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self;
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list');
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }

  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;

  if (head) {
    head.prev = node;
  }

  this.head = node;

  if (!this.tail) {
    this.tail = node;
  }

  this.length++;
};

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;

  if (tail) {
    tail.next = node;
  }

  this.tail = node;

  if (!this.head) {
    this.head = node;
  }

  this.length++;
};

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }

  return this.length;
};

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }

  return this.length;
};

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined;
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;

  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }

  this.length--;
  return res;
};

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined;
  }

  var res = this.head.value;
  this.head = this.head.next;

  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }

  this.length--;
  return res;
};

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();

  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }

  return res;
};

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();

  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }

  return res;
};

Yallist.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc;
};

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc;
};

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }

  return arr;
};

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }

  return arr;
};

Yallist.prototype.slice = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }

  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }

  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist.prototype.splice = function (start, deleteCount
/*, ...nodes */
) {
  if (start > this.length) {
    start = this.length - 1;
  }

  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }

  var ret = [];

  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }

  if (walker === null) {
    walker = this.tail;
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }

  for (var i = 2; i < arguments.length; i++) {
    walker = insert(this, walker, arguments[i]);
  }

  return ret;
};

Yallist.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;

  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }

  this.head = tail;
  this.tail = head;
  return this;
};

function insert(self, node, value) {
  var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);

  if (inserted.next === null) {
    self.tail = inserted;
  }

  if (inserted.prev === null) {
    self.head = inserted;
  }

  self.length++;
  return inserted;
}

function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);

  if (!self.head) {
    self.head = self.tail;
  }

  self.length++;
}

function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);

  if (!self.tail) {
    self.tail = self.head;
  }

  self.length++;
}

function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

try {
  // add if support for Symbol.iterator is present
  iterator(Yallist);
} catch (er) {}

const MAX = Symbol('max');
const LENGTH = Symbol('length');
const LENGTH_CALCULATOR = Symbol('lengthCalculator');
const ALLOW_STALE = Symbol('allowStale');
const MAX_AGE = Symbol('maxAge');
const DISPOSE = Symbol('dispose');
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
const LRU_LIST = Symbol('lruList');
const CACHE = Symbol('cache');
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

const naiveLength = () => 1; // lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.


class LRUCache {
  constructor(options) {
    if (typeof options === 'number') options = {
      max: options
    };
    if (!options) options = {};
    if (options.max && (typeof options.max !== 'number' || options.max < 0)) throw new TypeError('max must be a non-negative number'); // Kind of weird to have a default max of Infinity, but oh well.

    this[MAX] = options.max || Infinity;
    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== 'number') throw new TypeError('maxAge must be a number');
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  } // resize the cache when the max changes.


  set max(mL) {
    if (typeof mL !== 'number' || mL < 0) throw new TypeError('max must be a non-negative number');
    this[MAX] = mL || Infinity;
    trim(this);
  }

  get max() {
    return this[MAX];
  }

  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }

  get allowStale() {
    return this[ALLOW_STALE];
  }

  set maxAge(mA) {
    if (typeof mA !== 'number') throw new TypeError('maxAge must be a non-negative number');
    this[MAX_AGE] = mA;
    trim(this);
  }

  get maxAge() {
    return this[MAX_AGE];
  } // resize the cache when the lengthCalculator changes.


  set lengthCalculator(lC) {
    if (typeof lC !== 'function') lC = naiveLength;

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }

    trim(this);
  }

  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }

  get length() {
    return this[LENGTH];
  }

  get itemCount() {
    return this[LRU_LIST].length;
  }

  rforEach(fn, thisp) {
    thisp = thisp || this;

    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }

  forEach(fn, thisp) {
    thisp = thisp || this;

    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }

  keys() {
    return this[LRU_LIST].toArray().map(k => k.key);
  }

  values() {
    return this[LRU_LIST].toArray().map(k => k.value);
  }

  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
    }

    this[CACHE] = new Map(); // hash of items by key

    this[LRU_LIST] = new yallist(); // list of items in order of use recency

    this[LENGTH] = 0; // length of items in the list
  }

  dump() {
    return this[LRU_LIST].map(hit => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter(h => h);
  }

  dumpLru() {
    return this[LRU_LIST];
  }

  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== 'number') throw new TypeError('maxAge must be a number');
    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }

      const node = this[CACHE].get(key);
      const item = node.value; // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking

      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
      }

      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }

    const hit = new Entry(key, value, len, now, maxAge); // oversized objects fall out of cache automatically.

    if (hit.length > this[MAX]) {
      if (this[DISPOSE]) this[DISPOSE](key, value);
      return false;
    }

    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }

  has(key) {
    if (!this[CACHE].has(key)) return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }

  get(key) {
    return get(this, key, true);
  }

  peek(key) {
    return get(this, key, false);
  }

  pop() {
    const node = this[LRU_LIST].tail;
    if (!node) return null;
    del(this, node);
    return node.value;
  }

  del(key) {
    del(this, this[CACHE].get(key));
  }

  load(arr) {
    // reset the cache
    this.reset();
    const now = Date.now(); // A previous serialized cache has the most recent items first

    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0) // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v);else {
        const maxAge = expiresAt - now; // dont add already expired items

        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }

  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }

}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key);

  if (node) {
    const hit = node.value;

    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE]) return undefined;
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }

    return hit.value;
  }
};

const isStale = (self, hit) => {
  if (!hit || !hit.maxAge && !self[MAX_AGE]) return false;
  const diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
};

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
};

const del = (self, node) => {
  if (node) {
    const hit = node.value;
    if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);
    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
};

class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }

}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value;

  if (isStale(self, hit)) {
    del(self, node);
    if (!self[ALLOW_STALE]) hit = undefined;
  }

  if (hit) fn.call(thisp, hit.value, hit.key, self);
};

var lruCache = LRUCache;

class OnigString$1 {
  constructor(content) {
    this.substring = (start, end) => {
      return this.source.substring(start, end);
    };

    this.toString = (start, end) => {
      return this.source;
    };

    if (typeof content !== 'string') {
      throw new TypeError('Argument must be a string');
    }

    this.source = content;
    this._utf8Bytes = null;
    this._utf8Indexes = null;
  }

  get utf8Bytes() {
    if (!this._utf8Bytes) {
      this.encode();
    }

    return this._utf8Bytes;
  }
  /**
   * Returns `null` if all utf8 offsets match utf-16 offset (content has no multi byte characters)
   */


  get utf8Indexes() {
    if (!this._utf8Bytes) {
      this.encode();
    }

    return this._utf8Indexes;
  }

  get content() {
    return this.source;
  }

  get length() {
    return this.source.length;
  }

  get hasMultiByteCharacters() {
    return this.utf8Indexes !== null;
  }

  convertUtf8OffsetToUtf16(utf8Offset) {
    if (utf8Offset < 0) {
      return 0;
    }

    const utf8Array = this._utf8Bytes;

    if (utf8Offset >= utf8Array.length - 1) {
      return this.source.length;
    }

    const utf8OffsetMap = this.utf8Indexes;

    if (utf8OffsetMap && utf8Offset >= this._mappingTableStartOffset) {
      return findFirstInSorted(utf8OffsetMap, utf8Offset - this._mappingTableStartOffset) + this._mappingTableStartOffset;
    }

    return utf8Offset;
  }

  convertUtf16OffsetToUtf8(utf16Offset) {
    if (utf16Offset < 0) {
      return 0;
    }

    const utf8Array = this._utf8Bytes;

    if (utf16Offset >= this.source.length) {
      return utf8Array.length - 1;
    }

    const utf8OffsetMap = this.utf8Indexes;

    if (utf8OffsetMap && utf16Offset >= this._mappingTableStartOffset) {
      return utf8OffsetMap[utf16Offset - this._mappingTableStartOffset] + this._mappingTableStartOffset;
    }

    return utf16Offset;
  }

  encode() {
    const str = this.source;
    const n = str.length;
    let utf16OffsetToUtf8;
    let utf8Offset = 0;
    let mappingTableStartOffset = 0;

    function createOffsetTable(startOffset) {
      const maxUtf8Len = (n - startOffset) * 3;

      if (maxUtf8Len <= 0xff) {
        utf16OffsetToUtf8 = new Uint8Array(n - startOffset);
      } else if (maxUtf8Len <= 0xffff) {
        utf16OffsetToUtf8 = new Uint16Array(n - startOffset);
      } else {
        utf16OffsetToUtf8 = new Uint32Array(n - startOffset);
      }

      mappingTableStartOffset = startOffset;
      utf16OffsetToUtf8[utf8Offset++] = 0;
    }

    const u8view = new Uint8Array(n * 3
    /* alloc max now, trim later*/
    + 1
    /** null termination character */
    );
    let ptrHead = 0;
    let i = 0; // for some reason, v8 is faster with str.length than using a variable (might be illusion)

    while (i < str.length) {
      let codepoint;
      const c = str.charCodeAt(i);

      if (utf16OffsetToUtf8) {
        utf16OffsetToUtf8[utf8Offset++] = ptrHead - mappingTableStartOffset;
      }

      if (c < 0xD800 || c > 0xDFFF) {
        codepoint = c;
      } else if (c >= 0xDC00) {
        codepoint = 0xFFFD;
      } else {
        if (i === n - 1) {
          codepoint = 0xFFFD;
        } else {
          const d = str.charCodeAt(i + 1);

          if (0xDC00 <= d && d <= 0xDFFF) {
            if (!utf16OffsetToUtf8) {
              createOffsetTable(i);
            }

            const a = c & 0x3FF;
            const b = d & 0x3FF;
            codepoint = 0x10000 + (a << 10) + b;
            i += 1;
            utf16OffsetToUtf8[utf8Offset++] = ptrHead - mappingTableStartOffset;
          } else {
            codepoint = 0xFFFD;
          }
        }
      }

      let bytesRequiredToEncode;
      let offset;

      if (codepoint <= 0x7F) {
        bytesRequiredToEncode = 1;
        offset = 0;
      } else if (codepoint <= 0x07FF) {
        bytesRequiredToEncode = 2;
        offset = 0xC0;
      } else if (codepoint <= 0xFFFF) {
        bytesRequiredToEncode = 3;
        offset = 0xE0;
      } else {
        bytesRequiredToEncode = 4;
        offset = 0xF0;
      }

      if (bytesRequiredToEncode === 1) {
        u8view[ptrHead++] = codepoint;
      } else {
        if (!utf16OffsetToUtf8) {
          createOffsetTable(ptrHead);
        }

        u8view[ptrHead++] = (codepoint >> 6 * --bytesRequiredToEncode) + offset;

        while (bytesRequiredToEncode > 0) {
          const temp = codepoint >> 6 * (bytesRequiredToEncode - 1);
          u8view[ptrHead++] = 0x80 | temp & 0x3F;
          bytesRequiredToEncode -= 1;
        }
      }

      i += 1;
    }

    const utf8 = u8view.slice(0, ptrHead + 1);
    utf8[ptrHead] = 0x00;
    this._utf8Bytes = utf8;

    if (utf16OffsetToUtf8) {
      // set if UTF-16 surrogate chars or multi-byte characters found
      this._utf8Indexes = utf16OffsetToUtf8;
      this._mappingTableStartOffset = mappingTableStartOffset;
    }
  }

}

function findFirstInSorted(array, i) {
  let low = 0;
  let high = array.length;

  if (high === 0) {
    return 0; // no children
  }

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (array[mid] >= i) {
      high = mid;
    } else {
      low = mid + 1;
    }
  } // low is on the index of the first value >= i or array.length. Decrement low until we find array[low] <= i


  while (low > 0 && (low >= array.length || array[low] > i)) {
    low--;
  } // check whether we are on the second index of a utf-16 surrogate char. If so, go to the first index.


  if (low > 0 && array[low] === array[low - 1]) {
    low--;
  }

  return low;
}

var _default$1 = OnigString$1;
var OnigString_1 = /*#__PURE__*/Object.defineProperty({
  default: _default$1
}, '__esModule', {
  value: true
});

/**
 * Allocates space on the heap and copies the string bytes on to it
 * @param str
 * @returns pointer to the first byte's address on heap
 */


function mallocAndWriteString(str) {
  const ptr = onigasmH.onigasmH._malloc(str.utf8Bytes.length);

  onigasmH.onigasmH.HEAPU8.set(str.utf8Bytes, ptr);
  return ptr;
}

function convertUTF8BytesFromPtrToString(ptr) {
  const chars = [];
  let i = 0;

  while (onigasmH.onigasmH.HEAPU8[ptr] !== 0x00) {
    chars[i++] = onigasmH.onigasmH.HEAPU8[ptr++];
  }

  return chars.join();
}

const cache = new lruCache({
  dispose: (scanner, info) => {
    const regexTPtrsPtr = onigasmH.onigasmH._malloc(info.regexTPtrs.length);

    onigasmH.onigasmH.HEAPU8.set(info.regexTPtrs, regexTPtrsPtr);

    const status = onigasmH.onigasmH._disposeCompiledPatterns(regexTPtrsPtr, scanner.patterns.length);

    if (status !== 0) {
      const errMessage = convertUTF8BytesFromPtrToString(onigasmH.onigasmH._getLastError());
      throw new Error(errMessage);
    }

    onigasmH.onigasmH._free(regexTPtrsPtr);
  },
  max: 1000
});

class OnigScanner$1 {
  /**
   * Create a new scanner with the given patterns
   * @param patterns  An array of string patterns
   */
  constructor(patterns) {
    if (onigasmH.onigasmH === null) {
      throw new Error(`Onigasm has not been initialized, call loadWASM from 'onigasm' exports before using any other API`);
    }

    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];

      if (typeof pattern !== 'string') {
        throw new TypeError(`First parameter to OnigScanner constructor must be array of (pattern) strings`);
      }
    }

    this.sources = patterns.slice();
  }

  get patterns() {
    return this.sources.slice();
  }
  /**
   * Find the next match from a given position
   * @param string The string to search
   * @param startPosition The optional position to start at, defaults to 0
   * @param callback The (error, match) function to call when done, match will null when there is no match
   */


  findNextMatch(string, startPosition, callback) {
    if (startPosition == null) {
      startPosition = 0;
    }

    if (typeof startPosition === 'function') {
      callback = startPosition;
      startPosition = 0;
    }

    try {
      const match = this.findNextMatchSync(string, startPosition);
      callback(null, match);
    } catch (error) {
      callback(error);
    }
  }
  /**
   * Find the next match from a given position
   * @param string The string to search
   * @param startPosition The optional position to start at, defaults to 0
   */


  findNextMatchSync(string, startPosition) {
    if (startPosition == null) {
      startPosition = 0;
    }

    startPosition = this.convertToNumber(startPosition);
    let onigNativeInfo = cache.get(this);
    let status = 0;

    if (!onigNativeInfo) {
      const regexTAddrRecieverPtr = onigasmH.onigasmH._malloc(4);

      const regexTPtrs = [];

      for (let i = 0; i < this.sources.length; i++) {
        const pattern = this.sources[i];
        const patternStrPtr = mallocAndWriteString(new OnigString_1.default(pattern));
        status = onigasmH.onigasmH._compilePattern(patternStrPtr, regexTAddrRecieverPtr);

        if (status !== 0) {
          const errMessage = convertUTF8BytesFromPtrToString(onigasmH.onigasmH._getLastError());
          throw new Error(errMessage);
        }

        const regexTAddress = onigasmH.onigasmH.HEAP32[regexTAddrRecieverPtr / 4];
        regexTPtrs.push(regexTAddress);

        onigasmH.onigasmH._free(patternStrPtr);
      }

      onigNativeInfo = {
        regexTPtrs: new Uint8Array(Uint32Array.from(regexTPtrs).buffer)
      };

      onigasmH.onigasmH._free(regexTAddrRecieverPtr);

      cache.set(this, onigNativeInfo);
    }

    const onigString = string instanceof OnigString_1.default ? string : new OnigString_1.default(this.convertToString(string));
    const strPtr = mallocAndWriteString(onigString);

    const resultInfoReceiverPtr = onigasmH.onigasmH._malloc(8);

    const regexTPtrsPtr = onigasmH.onigasmH._malloc(onigNativeInfo.regexTPtrs.length);

    onigasmH.onigasmH.HEAPU8.set(onigNativeInfo.regexTPtrs, regexTPtrsPtr);
    status = onigasmH.onigasmH._findBestMatch( // regex_t **patterns
    regexTPtrsPtr, // int patternCount
    this.sources.length, // UChar *utf8String
    strPtr, // int strLen
    onigString.utf8Bytes.length - 1, // int startOffset
    onigString.convertUtf16OffsetToUtf8(startPosition), // int *resultInfo
    resultInfoReceiverPtr);

    if (status !== 0) {
      const errMessage = convertUTF8BytesFromPtrToString(onigasmH.onigasmH._getLastError());
      throw new Error(errMessage);
    }

    const [// The index of pattern which matched the string at least offset from 0 (start)
    bestPatternIdx, // Begin address of capture info encoded as pairs
    // like [start, end, start, end, start, end, ...]
    //  - first start-end pair is entire match (index 0 and 1)
    //  - subsequent pairs are capture groups (2, 3 = first capture group, 4, 5 = second capture group and so on)
    encodedResultBeginAddress, // Length of the [start, end, ...] sequence so we know how much memory to read (will always be 0 or multiple of 2)
    encodedResultLength] = new Uint32Array(onigasmH.onigasmH.HEAPU32.buffer, resultInfoReceiverPtr, 3);

    onigasmH.onigasmH._free(strPtr);

    onigasmH.onigasmH._free(resultInfoReceiverPtr);

    onigasmH.onigasmH._free(regexTPtrsPtr);

    if (encodedResultLength > 0) {
      const encodedResult = new Uint32Array(onigasmH.onigasmH.HEAPU32.buffer, encodedResultBeginAddress, encodedResultLength);
      const captureIndices = [];
      let i = 0;
      let captureIdx = 0;

      while (i < encodedResultLength) {
        const index = captureIdx++;
        let start = encodedResult[i++];
        let end = encodedResult[i++];

        if (onigString.hasMultiByteCharacters) {
          start = onigString.convertUtf8OffsetToUtf16(start);
          end = onigString.convertUtf8OffsetToUtf16(end);
        }

        captureIndices.push({
          end,
          index,
          length: end - start,
          start
        });
      }

      onigasmH.onigasmH._free(encodedResultBeginAddress);

      return {
        captureIndices,
        index: bestPatternIdx,
        scanner: this
      };
    }

    return null;
  }

  convertToString(value) {
    if (value === undefined) {
      return 'undefined';
    }

    if (value === null) {
      return 'null';
    }

    if (value instanceof OnigString_1.default) {
      return value.content;
    }

    return value.toString();
  }

  convertToNumber(value) {
    value = parseInt(value, 10);

    if (!isFinite(value)) {
      value = 0;
    }

    value = Math.max(value, 0);
    return value;
  }

}

var OnigScanner_2 = OnigScanner$1;
var _default = OnigScanner$1;
var OnigScanner_1 = /*#__PURE__*/Object.defineProperty({
  OnigScanner: OnigScanner_2,
  default: _default
}, '__esModule', {
  value: true
});

var loadWASM = onigasmH.loadWASM;
var OnigScanner = OnigScanner_1.default;
var OnigString = OnigString_1.default;

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

let _onigasmPromise = null;

async function getOnigasm() {
  if (!_onigasmPromise) {
    let loader;

    if (isBrowser) {
      loader = loadWASM(_resolvePath('dist/onigasm.wasm'));
    } else {
      const path = require('path');

      const onigasmPath = path.join(require.resolve('onigasm'), '../onigasm.wasm');

      const fs = require('fs');

      const wasmBin = fs.readFileSync(onigasmPath).buffer;
      loader = loadWASM(wasmBin);
    }

    _onigasmPromise = loader.then(() => {
      return {
        createOnigScanner(patterns) {
          return new OnigScanner(patterns);
        },

        createOnigString(s) {
          return new OnigString(s);
        }

      };
    });
  }

  return _onigasmPromise;
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

  getGrammer(name) {
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

  const _resolver = new Resolver(getOnigasm(), 'onigasm');

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

  function getGrammer(lang) {
    const _grammer = _registry.getGrammer(lang);

    if (!_grammer) {
      throw Error(`No language registration for ${lang}`);
    }

    return {
      _grammer
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
      _grammer
    } = getGrammer(lang);
    const {
      _theme,
      _colorMap
    } = getTheme(theme);
    return tokenizeWithTheme(_theme, _colorMap, code, _grammer, options);
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

function Stacktrace() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  const [highlightedCode, setHighlightedCode] = useState();
  const frame = errorOccurrence.frames[0];
  const lineNumbers = Object.keys(frame.code_snippet); // TODO: bundle themes and language definitions. Don't rely on CDN.

  setCDN('https://unpkg.com/shiki/');
  useEffect(() => {
    getHighlighter({
      theme: 'github-light',
      langs: ['php'] // TODO: blade?

    }).then(highlighter => {
      const code = Object.values(errorOccurrence.frames[0].code_snippet).join('\n');
      const highlightedIndex = lineNumbers.indexOf(errorOccurrence.frames[0].line_number.toString());
      const lines = highlighter.codeToThemedTokens(code, 'php');
      const highlightedLines = lines.map((tokens, index) => /*#__PURE__*/React.createElement("span", {
        className: `
                block group pl-3 leading-loose hover:~bg-red-500/10
                ${index === highlightedIndex ? ' ~bg-red-500/20' : ''}
                `
      }, !tokens.length && /*#__PURE__*/React.createElement(React.Fragment, null, "\xA0"), !!tokens.length && tokens.map(token => {
        return /*#__PURE__*/React.createElement("span", {
          style: {
            color: token.color
          }
        }, token.content);
      }), /*#__PURE__*/React.createElement("a", {
        href: "#",
        className: "sticky left-8 -mt-6 -ml-5 z-30 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-red-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs "
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-pencil-alt"
      }))));
      setHighlightedCode(highlightedLines);
    });
  }, [errorOccurrence.frames[0]]);
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
  }, /*#__PURE__*/React.createElement("button", {
    className: "h-6 px-2 rounded-sm ~bg-gray-500/5 hover:text-red-500 text-xs font-medium whitespace-nowrap"
  }, "Expand vendor frames")), /*#__PURE__*/React.createElement("div", {
    id: "frames",
    className: "flex-grow overflow-auto scrollbar-hidden-y mask-fade-frames"
  }, /*#__PURE__*/React.createElement("ol", {
    className: "text-sm"
  }, /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "Illuminate", /*#__PURE__*/React.createElement("span", {
    className: "mx-0.5"
  }, "\\"), /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, "Database", /*#__PURE__*/React.createElement("span", {
    className: "mx-0.5"
  }, "\\"), /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, "Connection", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":346")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "runQueryCallback")), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 bg-red-500 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-[-4px] flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "Illuminate", /*#__PURE__*/React.createElement("span", {
    className: "mx-0.5"
  }, "\\"), /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, "Database", /*#__PURE__*/React.createElement("span", {
    className: "mx-0.5"
  }, "\\"), /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, "Connection", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":346")), /*#__PURE__*/React.createElement("div", {
    className: "ml-[-4px] font-semibold"
  }, "runQueryCallback")), /*#__PURE__*/React.createElement("li", {
    className: "z-10 mt-[-4px] sticky top-0 bg-red-500 h-[4px]"
  }), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "Illuminate", /*#__PURE__*/React.createElement("span", {
    className: "mx-0.5"
  }, "\\"), /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, "Database", /*#__PURE__*/React.createElement("span", {
    className: "mx-0.5"
  }, "\\"), /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, "Connection", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":346")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "runQueryCallback")), /*#__PURE__*/React.createElement("li", {
    className: " group px-6 sm:px-10 py-4 flex lg:justify-start border-b ~border-gray-200 hover:~bg-red-500/10 "
  }, /*#__PURE__*/React.createElement("button", {
    className: "flex items-center"
  }, "10 vendor frames", /*#__PURE__*/React.createElement("i", {
    className: "ml-2 fas fa-angle-down ~text-gray-500 group-hover:text-red-500"
  }))), /*#__PURE__*/React.createElement("li", {
    className: " px-6 sm:px-10 py-4 border-b ~border-gray-200 flex lg:justify-start "
  }, /*#__PURE__*/React.createElement("span", {
    className: "~text-gray-500"
  }, "1 unknown frame")), /*#__PURE__*/React.createElement("li", {
    className: " group px-6 sm:px-10 py-4 flex lg:justify-start border-b ~border-gray-200 hover:~bg-red-500/10 "
  }, /*#__PURE__*/React.createElement("button", {
    className: "flex items-center"
  }, "10 vendor frames", /*#__PURE__*/React.createElement("i", {
    className: "ml-2 fas fa-angle-down ~text-gray-500 group-hover:text-red-500"
  }))), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "index", /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, ".php", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":3")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "bootstrap")), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "index", /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, ".php", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":3")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "bootstrap")), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "index", /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, ".php", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":3")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "bootstrap")), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "index", /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, ".php", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":3")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "bootstrap")), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "index", /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, ".php", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":3")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "bootstrap")), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "index", /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, ".php", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":3")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "bootstrap")), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "index", /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, ".php", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":3")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "bootstrap")), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "index", /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, ".php", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":3")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "bootstrap")), /*#__PURE__*/React.createElement("li", {
    className: "px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex"
  }, /*#__PURE__*/React.createElement("span", null, "index", /*#__PURE__*/React.createElement("wbr", null)), /*#__PURE__*/React.createElement("span", null, ".php", /*#__PURE__*/React.createElement("wbr", null))), /*#__PURE__*/React.createElement("span", {
    className: "px-1 font-mono text-xs"
  }, ":3")), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "bootstrap")))))), /*#__PURE__*/React.createElement("section", {
    className: "lg:max-h-[calc(100vh-10rem)] 2xl:max-h-[calc(100vh-7.5rem)] flex flex-col lg:col-span-4 border-t lg:border-t-0 ~border-gray-200"
  }, /*#__PURE__*/React.createElement("header", {
    className: "~text-gray-500 flex-none z-30 h-16 px-6 sm:px-10 flex items-center justify-end"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "group flex items-center text-sm"
  }, /*#__PURE__*/React.createElement("span", null, "\u2026", /*#__PURE__*/React.createElement("span", {
    className: "px-0.5"
  }, "/")), /*#__PURE__*/React.createElement("span", {
    className: "group-hover:underline"
  }, "Illuminate", /*#__PURE__*/React.createElement("span", {
    className: "px-0.5"
  }, "/")), /*#__PURE__*/React.createElement("span", {
    className: "group-hover:underline"
  }, "Database", /*#__PURE__*/React.createElement("span", {
    className: "px-0.5"
  }, "/")), /*#__PURE__*/React.createElement("span", {
    className: "group-hover:underline font-semibold"
  }, "Connection"), /*#__PURE__*/React.createElement("span", null, ".php"))), /*#__PURE__*/React.createElement("main", {
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
  }, /*#__PURE__*/React.createElement("pre", null, /*#__PURE__*/React.createElement("code", null, highlightedCode)))))));
}

function ErrorMessage() {
  const errorOccurrence = useContext(ErrorOccurrenceContext);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "my-4 font-semibold leading-snug text-xl"
  }, errorOccurrence.exception_message), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 group ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-h-32 overflow-hidden mask-fade-y"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "SQL: select * from `users` where `uuid` =", '\n', "47a4af2e-5156-4277-86a0-b55e773f6d1e limit 1", '\n', "SQL: select * from `users` where `uuid` =", '\n', "47a4af2e-5156-4277-86a0-b55e773f6d1e limit 1")))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  })), /*#__PURE__*/React.createElement("button", {
    className: "absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-indigo-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs "
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-angle-down"
  }))));
}

function RelaxedPath({
  path,
  divider = '/'
}) {
  const parts = path.split(divider);
  return /*#__PURE__*/React.createElement(React.Fragment, null, parts.map((part, index) => /*#__PURE__*/React.createElement("span", {
    key: part
  }, part, index !== parts.length - 1 && /*#__PURE__*/React.createElement("span", {
    className: "mx-0.5"
  }, divider))));
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
  const [isOpen, setIsOpen] = React.useState(initialIsOpen);
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
    className: "underline text-green-700 dark:text-green-800"
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
    className: "flex-grow px-6 sm:px-10 py-8 text-gray-800  bg-green-300"
  }, /*#__PURE__*/React.createElement("button", {
    className: "absolute top-4 right-4 leading-none opacity-50 hover:opacity-75 text-sm"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-times"
  })), solutions.map((solution, index) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Solution, {
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
  }, /*#__PURE__*/React.createElement(RelaxedPath, {
    path: errorOccurrence.exception_class,
    divider: "\\"
  })), /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement("i", {
    className: "ml-3 fas fa-angle-down group-hover:text-red-500 text-sm"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-flow-col justify-end gap-4 text-sm ~text-gray-500"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "tracking-wider"
  }, "PHP"), " ", errorOccurrence.language_version), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-laravel"
  }), " ", errorOccurrence.framework_version))), /*#__PURE__*/React.createElement(ErrorMessage, null)))), /*#__PURE__*/React.createElement(Solutions, null));
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
  }, /*#__PURE__*/React.createElement("ul", {
    className: "grid grid-cols-1 gap-10"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h4", {
    className: "uppercase tracking-wider ~text-gray-500 text-xs font-bold"
  }, "Request"), /*#__PURE__*/React.createElement("ul", {
    className: "mt-3 grid grid-cols-1 gap-2"
  }, /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base bg-indigo-500 text-white"
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-0.5 fa-fw fas fa-exchange-alt text-xs text-white/50"
  }), "Headers"), /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base hover:text-indigo-500"
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-0.5 fa-fw far fa-question-circle text-xs text-gray-400 group-hover:text-indigo-500"
  }), "Query String"), /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base hover:text-indigo-500"
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-0.5 fa-fw fas fa-code text-xs text-gray-400 group-hover:text-indigo-500"
  }), "Body"), /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base hover:text-indigo-500"
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-0.5 fa-fw far fa-file text-xs text-gray-400 group-hover:text-indigo-500"
  }), "Files"), /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base hover:text-indigo-500"
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-0.5 fa-fw fas fa-hourglass-half text-xs text-gray-400 group-hover:text-indigo-500"
  }), "Session"), /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base hover:text-indigo-500"
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-0.5 fa-fw fas fa-cookie-bite text-xs text-gray-400 group-hover:text-indigo-500"
  }), "Cookies"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h4", {
    className: "uppercase tracking-wider ~text-gray-500 text-xs font-bold"
  }, "App"), /*#__PURE__*/React.createElement("ul", {
    className: "mt-3 grid grid-cols-1 gap-2"
  }, /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base hover:text-indigo-500"
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-0.5 fa-fw fas fa-random text-xs text-gray-400 group-hover:text-indigo-500"
  }), "Routing"), /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base hover:text-indigo-500"
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-0.5 fa-fw fas fa-paint-roller text-xs text-gray-400 group-hover:text-indigo-500"
  }), "Views"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h4", {
    className: "uppercase tracking-wider ~text-gray-500 text-xs font-bold"
  }, "User"), /*#__PURE__*/React.createElement("ul", {
    className: "mt-3 grid grid-cols-1 gap-2"
  }, /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base hover:text-indigo-500"
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-0.5 fa-fw fas fa-user text-xs text-gray-400 group-hover:text-indigo-500"
  }), "User"), /*#__PURE__*/React.createElement("li", {
    className: "px-2 py-1 group text-base hover:text-indigo-500"
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-0.5 fa-fw far fa-window-maximize text-xs text-gray-400 group-hover:text-indigo-500"
  }), "(Client)")))))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden grid grid-cols-1 gap-px"
  }, /*#__PURE__*/React.createElement("section", {
    className: "shadow-lg ~bg-white px-6 sm:px-10 pt-8 pb-20 min-w-0 overflow-hidden"
  }, /*#__PURE__*/React.createElement("dl", {
    className: "grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-6 col-span-2 font-bold leading-snug text-xl ~text-indigo-600 uppercase tracking-wider"
  }, "Request"), /*#__PURE__*/React.createElement("div", {
    className: "py-2 col-span-2 text-lg font-semibold flex items-center"
  }, /*#__PURE__*/React.createElement("span", null, "https://medialibrary.pro/demo-customized-collection"), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 px-1.5 rounded-sm  border border-indigo-500/20 ~text-indigo-600 text-xs uppercase tracking-wider"
  }, "GET")), /*#__PURE__*/React.createElement("div", {
    className: "col-span-2 group ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-h-32 overflow-hidden mask-fade-y"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "curl \"https://medialibrary.pro/demo-customized-collection\" \\", '\n', '    ', "-X POST \\", '\n', '    ', "-H 'cookie: XSRF-TOKEN=eyJpdiI6IjM1cTRDMzlBUmx2OUw4UXd1MUtoaGc9PSIsInZhbHVlIjoiSGhPejVGTnlTbEY0UFlJYThHUHBKOERoVmU4MDFpUVV4aWdsOW16SnFvUEVvMmZXdlpMci9Sc3hTeDJkSldnTW9xc2IwSWEvWnJLeVpsQWNzVTBROG1rQXkzaExQaU5XWWROeWZYcHJBZkFFM092SXZOd0c0NzZYdEFoUXNZUUYiLCJtYWMiOiIxNzU0ZjViMDljMmEzZTM1YjljYWY2NDk5ZjcwM2UyNzI0MWZkYThkNmZiMmZkNmVlZDZmZmMyNGQ2YWJlYzY2In0%3D; medialibrarypro_session=eyJpdiI6IjlkVUNHQlVQZHc4cUVxa05SN200dEE9PSIsInZhbHVlIjoibXZaMzdjVzk4OXcvQjZTL2V1dVRJbHZuU3p5VmFYbFBUTWVoSVRtYnZ6bDRVS1lmd2QwenVLTERreGh6d2FZZDdmTnl5MU1nR3d3cnNMLzBiL0FtRXVHQ2NYTkdabVB0bXNoc2F4dkZOcUpjRkFUWUZKTDV4ckwwZ04wZmQwTHoiLCJtYWMiOiI0MjA1NzEzOWFjMDhlMWE3MTgwZDdmMmRiYmEzOTQ3MGEwODQ3OWIxYjYyMjRmYTdmOTNmOGU3ZGI5ODY0M2I1In0%3D' \\", '\n', '    ', "-H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8,bn;q=0.7,fr;q=0.6' \\", '\n', '    ', "-H 'accept-encoding: gzip, deflate, br' \\", '\n', '    ', "-H 'referer: https://medialibrary.pro/demo-customized-collection' \\", '\n', '    ', "-H 'sec-fetch-dest: document' \\", '\n', '    ', "-H 'sec-fetch-user: ?1' \\", '\n', '    ', "-H 'sec-fetch-mode: navigate' \\", '\n', '    ', "-H 'sec-fetch-site: same-origin' \\", '\n', '    ', "-H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \\", '\n', '    ', "-H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36' \\", '\n', '    ', "-H 'content-type: application/x-www-form-urlencoded' \\", '\n', '    ', "-H 'origin: https://medialibrary.pro' \\", '\n', '    ', "-H 'upgrade-insecure-requests: 1' \\", '\n', '    ', "-H 'sec-ch-ua-platform: \"Windows\"' \\", '\n', '    ', "-H 'sec-ch-ua-mobile: ?0' \\", '\n', '    ', "-H 'sec-ch-ua: \"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"' \\", '\n', '    ', "-H 'cache-control: max-age=0' \\", '\n', '    ', "-H 'content-length: 1394' \\", '\n', '    ', "-H 'host: medialibrary.pro' \\", '\n', '    ', "-F '_token=7uzRjLOwiqLEgOvXpKKDXyl70FHlHtblkjY0vkDk' -F 'downloads=[object Object]'")))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  })), /*#__PURE__*/React.createElement("button", {
    className: "absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-indigo-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs "
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-angle-down"
  }))), /*#__PURE__*/React.createElement("hr", {
    className: "my-2 col-span-2 border-t ~border-gray-200"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "py-2 col-span-2 font-semibold text-lg ~text-indigo-600"
  }, "Headers", /*#__PURE__*/React.createElement("i", {
    className: "ml-2 fa-fw fas fa-exchange-alt text-sm opacity-50"
  })), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "accept-encoding"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "\"gzip, deflate, br\""))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "accept-language"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "\"en-US,en;q=0.9\""))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "\u2026"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "\"en-US,en;q=0.9\""))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))), /*#__PURE__*/React.createElement("hr", {
    className: "my-2 col-span-2 border-t ~border-gray-200"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "py-2 col-span-2 font-semibold text-lg ~text-indigo-600"
  }, "Query String", /*#__PURE__*/React.createElement("i", {
    className: "ml-2 fa-fw far fa-question-circle text-xs opacity-50"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "shadow-lg ~bg-white px-6 sm:px-10 pt-8 pb-20 min-w-0 overflow-hidden"
  }, /*#__PURE__*/React.createElement("dl", {
    className: "grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-6 col-span-2 font-bold leading-snug text-xl ~text-indigo-600 uppercase tracking-wider"
  }, "App"), /*#__PURE__*/React.createElement("div", {
    className: "py-2 col-span-2 text-lg font-semibold ~text-indigo-600"
  }, "Route", /*#__PURE__*/React.createElement("i", {
    className: "ml-2 fa-fw fas fa-random text-sm  opacity-50"
  })), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "Controller"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "App\\Http\\Front\\Controllers\\Demo\\CustomizedCollectionDemoController@store"))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "Route Name"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "generated::52qYIIGYk3DCS9Av"))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))), /*#__PURE__*/React.createElement("hr", {
    className: "my-2 col-span-2 border-t ~border-gray-200"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "py-2 col-span-2 font-semibold text-lg ~text-indigo-600"
  }, "Views", /*#__PURE__*/React.createElement("i", {
    className: "ml-2 fa-fw fas fa-paint-roller text-sm opacity-50"
  })), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "Name"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "\u2026"))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "Data"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "\u2026"))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "shadow-lg ~bg-white px-6 sm:px-10 pt-8 pb-20 min-w-0 overflow-hidden"
  }, /*#__PURE__*/React.createElement("dl", {
    className: "grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-6 col-span-2 font-bold leading-snug text-xl ~text-indigo-600 uppercase tracking-wider"
  }, "User"), /*#__PURE__*/React.createElement("div", {
    className: "py-2 col-span-2 text-lg font-semibold flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-none w-8 h-8 rounded-full overflow-hidden mr-2"
  }, /*#__PURE__*/React.createElement("img", {
    alt: "alex@spatie.be",
    src: "https://gravatar.com/avatar/c46a1f02a0fa51179c5bee5e42c587e1?s=240"
  })), "alex@spatie.be"), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "User Data"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "\u2026"))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))), /*#__PURE__*/React.createElement("hr", {
    className: "my-2 col-span-2 border-t ~border-gray-200"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "py-2 col-span-2 font-semibold text-lg"
  }, "\u2026"), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "This is a very long label"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "\u2026"))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "Data"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-500/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "\u2026"))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))))))));
}

function Debug() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mt-20 2xl:col-start-2"
  }, /*#__PURE__*/React.createElement("a", {
    id: "debug",
    className: "z-50 absolute top-[-7.5rem]"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-300/70 dark:bg-black/20 shadow-inner"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "flex justify-center items-center"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "-mt-5 flex justify-start items-center rounded-full shadow-lg bg-indigo-400 text-white space-x-px"
  }, /*#__PURE__*/React.createElement("li", {
    className: "~bg-white text-gray-500 rounded-l-full"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement("button", {
    className: "group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium "
  }, /*#__PURE__*/React.createElement("span", {
    className: "mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/30 text-white rounded-full text-xs"
  }, "0"), /*#__PURE__*/React.createElement("span", null, "Dumps")))), /*#__PURE__*/React.createElement("li", {
    className: "bg-indigo-500"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement("button", {
    className: "group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/50 text-white rounded-full text-xs"
  }, "3"), "Glows"))), /*#__PURE__*/React.createElement("li", {
    className: "bg-indigo-500"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement("button", {
    className: "group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/50 text-white rounded-full text-xs"
  }, "12"), "Queries"))), /*#__PURE__*/React.createElement("li", {
    className: "bg-indigo-500 rounded-r-full"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement("button", {
    className: "group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/50 text-white rounded-full text-xs"
  }, "3"), "Logs"))))), /*#__PURE__*/React.createElement("div", {
    className: "py-8 px-6 sm:px-10"
  }, /*#__PURE__*/React.createElement("dl", {
    className: "grid grid-cols-[8rem,minmax(0,1fr)] lg:gap-x-10 gap-y-2"
  }, /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "Debug Data"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-200/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "\u2026"))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "More Data"), /*#__PURE__*/React.createElement("dd", {
    className: "group overflow-hidden ~bg-gray-200/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "\u2026"))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  }))), /*#__PURE__*/React.createElement("dt", {
    className: "py-2 truncate"
  }, "Data"), /*#__PURE__*/React.createElement("dd", {
    className: "group ~bg-gray-200/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-h-64 overflow-hidden mask-fade-y"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 mask-fade-x"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono leading-relaxed text-sm font-normal"
  }, /*#__PURE__*/React.createElement("pre", null, "curl \"https://medialibrary.pro/demo-customized-collection\" \\", '\n', '    ', "-X POST \\", '\n', '    ', "-H 'cookie: XSRF-TOKEN=eyJpdiI6IjM1cTRDMzlBUmx2OUw4UXd1MUtoaGc9PSIsInZhbHVlIjoiSGhPejVGTnlTbEY0UFlJYThHUHBKOERoVmU4MDFpUVV4aWdsOW16SnFvUEVvMmZXdlpMci9Sc3hTeDJkSldnTW9xc2IwSWEvWnJLeVpsQWNzVTBROG1rQXkzaExQaU5XWWROeWZYcHJBZkFFM092SXZOd0c0NzZYdEFoUXNZUUYiLCJtYWMiOiIxNzU0ZjViMDljMmEzZTM1YjljYWY2NDk5ZjcwM2UyNzI0MWZkYThkNmZiMmZkNmVlZDZmZmMyNGQ2YWJlYzY2In0%3D; medialibrarypro_session=eyJpdiI6IjlkVUNHQlVQZHc4cUVxa05SN200dEE9PSIsInZhbHVlIjoibXZaMzdjVzk4OXcvQjZTL2V1dVRJbHZuU3p5VmFYbFBUTWVoSVRtYnZ6bDRVS1lmd2QwenVLTERreGh6d2FZZDdmTnl5MU1nR3d3cnNMLzBiL0FtRXVHQ2NYTkdabVB0bXNoc2F4dkZOcUpjRkFUWUZKTDV4ckwwZ04wZmQwTHoiLCJtYWMiOiI0MjA1NzEzOWFjMDhlMWE3MTgwZDdmMmRiYmEzOTQ3MGEwODQ3OWIxYjYyMjRmYTdmOTNmOGU3ZGI5ODY0M2I1In0%3D' \\", '\n', '    ', "-H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8,bn;q=0.7,fr;q=0.6' \\", '\n', '    ', "-H 'accept-encoding: gzip, deflate, br' \\", '\n', '    ', "-H 'referer: https://medialibrary.pro/demo-customized-collection' \\", '\n', '    ', "-H 'sec-fetch-dest: document' \\", '\n', '    ', "-H 'sec-fetch-user: ?1' \\", '\n', '    ', "-H 'sec-fetch-mode: navigate' \\", '\n', '    ', "-H 'sec-fetch-site: same-origin' \\", '\n', '    ', "-H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \\", '\n', '    ', "-H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36' \\", '\n', '    ', "-H 'content-type: application/x-www-form-urlencoded' \\", '\n', '    ', "-H 'origin: https://medialibrary.pro' \\", '\n', '    ', "-H 'upgrade-insecure-requests: 1' \\", '\n', '    ', "-H 'sec-ch-ua-platform: \"Windows\"' \\", '\n', '    ', "-H 'sec-ch-ua-mobile: ?0' \\", '\n', '    ', "-H 'sec-ch-ua: \"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"' \\", '\n', '    ', "-H 'cache-control: max-age=0' \\", '\n', '    ', "-H 'content-length: 1394' \\", '\n', '    ', "-H 'host: medialibrary.pro' \\", '\n', '    ', "-F '_token=7uzRjLOwiqLEgOvXpKKDXyl70FHlHtblkjY0vkDk' -F 'downloads=[object Object]'")))), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-copy"
  })), /*#__PURE__*/React.createElement("button", {
    className: "absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-indigo-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs "
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-angle-down"
  })))))));
}

export { Context, Debug, ErrorCard, ErrorOccurrenceContext, Stacktrace };
