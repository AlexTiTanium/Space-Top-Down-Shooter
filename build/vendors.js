/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		2:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(17);
	__webpack_require__(22);
	module.exports = __webpack_require__(23);


/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * lodash 4.3.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash core -o ./dist/lodash.core.js`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	;(function() {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /** Used as the semantic version number. */
	  var VERSION = '4.3.0';

	  /** Used to compose bitmasks for wrapper metadata. */
	  var BIND_FLAG = 1,
	      PARTIAL_FLAG = 32;

	  /** Used to compose bitmasks for comparison styles. */
	  var UNORDERED_COMPARE_FLAG = 1,
	      PARTIAL_COMPARE_FLAG = 2;

	  /** Used as the `TypeError` message for "Functions" methods. */
	  var FUNC_ERROR_TEXT = 'Expected a function';

	  /** Used as references for various `Number` constants. */
	  var MAX_SAFE_INTEGER = 9007199254740991;

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      genTag = '[object GeneratorFunction]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      regexpTag = '[object RegExp]',
	      stringTag = '[object String]';

	  /** Used to match HTML entities and HTML characters. */
	  var reUnescapedHtml = /[&<>"'`]/g,
	      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	  /** Used to detect unsigned integer values. */
	  var reIsUint = /^(?:0|[1-9]\d*)$/;

	  /** Used to map characters to HTML entities. */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '`': '&#96;'
	  };

	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  /** Detect free variable `exports`. */
	  var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;

	  /** Detect free variable `module`. */
	  var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;

	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

	  /** Detect free variable `self`. */
	  var freeSelf = checkGlobal(objectTypes[typeof self] && self);

	  /** Detect free variable `window`. */
	  var freeWindow = checkGlobal(objectTypes[typeof window] && window);

	  /** Detect the popular CommonJS extension `module.exports`. */
	  var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;

	  /** Detect `this` as the global object. */
	  var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

	  /**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it's the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */
	  var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Creates a new array concatenating `array` with `other`.
	   *
	   * @private
	   * @param {Array} array The first array to concatenate.
	   * @param {Array} other The second array to concatenate.
	   * @returns {Array} Returns the new concatenated array.
	   */
	  function arrayConcat(array, other) {
	    return arrayPush(copyArray(array), values);
	  }

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

	  /**
	   * The base implementation of methods like `_.max` and `_.min` which accepts a
	   * `comparator` to determine the extremum value.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The iteratee invoked per iteration.
	   * @param {Function} comparator The comparator used to compare values.
	   * @returns {*} Returns the extremum value.
	   */
	  function baseExtremum(array, iteratee, comparator) {
	    var index = -1,
	        length = array.length;

	    while (++index < length) {
	      var value = array[index],
	          current = iteratee(value);

	      if (current != null && (computed === undefined
	            ? current === current
	            : comparator(current, computed)
	          )) {
	        var computed = current,
	            result = value;
	      }
	    }
	    return result;
	  }

	  /**
	   * The base implementation of methods like `_.find` and `_.findKey`, without
	   * support for iteratee shorthands, which iterates over `collection` using
	   * `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to search.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @param {boolean} [retKey] Specify returning the key of the found element instead of the element itself.
	   * @returns {*} Returns the found element or its key, else `undefined`.
	   */
	  function baseFind(collection, predicate, eachFunc, retKey) {
	    var result;
	    eachFunc(collection, function(value, key, collection) {
	      if (predicate(value, key, collection)) {
	        result = retKey ? key : value;
	        return false;
	      }
	    });
	    return result;
	  }

	  /**
	   * The base implementation of `_.reduce` and `_.reduceRight`, without support
	   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} accumulator The initial value.
	   * @param {boolean} initAccum Specify using the first or last element of `collection` as the initial value.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @returns {*} Returns the accumulated value.
	   */
	  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	    eachFunc(collection, function(value, index, collection) {
	      accumulator = initAccum
	        ? (initAccum = false, value)
	        : iteratee(accumulator, value, index, collection);
	    });
	    return accumulator;
	  }

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

	  /**
	   * The base implementation of `_.values` and `_.valuesIn` which creates an
	   * array of `object` property values corresponding to the property names
	   * of `props`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {Array} props The property names to get values for.
	   * @returns {Object} Returns the array of property values.
	   */
	  function baseValues(object, props) {
	    return baseMap(props, function(key) {
	      return object[key];
	    });
	  }

	  /**
	   * Checks if `value` is a global object.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	   */
	  function checkGlobal(value) {
	    return (value && value.Object === Object) ? value : null;
	  }

	  /**
	   * Compares values to sort them in ascending order.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {number} Returns the sort order indicator for `value`.
	   */
	  function compareAscending(value, other) {
	    if (value !== other) {
	      var valIsNull = value === null,
	          valIsUndef = value === undefined,
	          valIsReflexive = value === value;

	      var othIsNull = other === null,
	          othIsUndef = other === undefined,
	          othIsReflexive = other === other;

	      if ((value > other && !othIsNull) || !valIsReflexive ||
	          (valIsNull && !othIsUndef && othIsReflexive) ||
	          (valIsUndef && othIsReflexive)) {
	        return 1;
	      }
	      if ((value < other && !valIsNull) || !othIsReflexive ||
	          (othIsNull && !valIsUndef && valIsReflexive) ||
	          (othIsUndef && valIsReflexive)) {
	        return -1;
	      }
	    }
	    return 0;
	  }

	  /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeHtmlChar(chr) {
	    return htmlEscapes[chr];
	  }

	  /**
	   * Checks if `value` is a host object in IE < 9.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	   */
	  function isHostObject(value) {
	    // Many host objects are `Object` objects that can coerce to strings
	    // despite having improperly defined `toString` methods.
	    var result = false;
	    if (value != null && typeof value.toString != 'function') {
	      try {
	        result = !!(value + '');
	      } catch (e) {}
	    }
	    return result;
	  }

	  /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
	  function isIndex(value, length) {
	    value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	    length = length == null ? MAX_SAFE_INTEGER : length;
	    return value > -1 && value % 1 == 0 && value < length;
	  }

	  /**
	   * Converts `iterator` to an array.
	   *
	   * @private
	   * @param {Object} iterator The iterator to convert.
	   * @returns {Array} Returns the converted array.
	   */
	  function iteratorToArray(iterator) {
	    var data,
	        result = [];

	    while (!(data = iterator.next()).done) {
	      result.push(data.value);
	    }
	    return result;
	  }

	  /*--------------------------------------------------------------------------*/

	  /** Used for built-in method references. */
	  var arrayProto = Array.prototype,
	      objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /** Used to generate unique IDs. */
	  var idCounter = 0;

	  /**
	   * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	   * of values.
	   */
	  var objectToString = objectProto.toString;

	  /** Used to restore the original `_` reference in `_.noConflict`. */
	  var oldDash = root._;

	  /** Built-in value references. */
	  var Reflect = root.Reflect,
	      Symbol = root.Symbol,
	      Uint8Array = root.Uint8Array,
	      enumerate = Reflect ? Reflect.enumerate : undefined,
	      propertyIsEnumerable = objectProto.propertyIsEnumerable;

	  /* Built-in method references for those with the same name as other `lodash` methods. */
	  var nativeIsFinite = root.isFinite,
	      nativeKeys = Object.keys,
	      nativeMax = Math.max;

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a `lodash` object which wraps `value` to enable implicit method
	   * chaining. Methods that operate on and return arrays, collections, and
	   * functions can be chained together. Methods that retrieve a single value or
	   * may return a primitive value will automatically end the chain sequence and
	   * return the unwrapped value. Otherwise, the value must be unwrapped with
	   * `_#value`.
	   *
	   * Explicit chaining, which must be unwrapped with `_#value` in all cases,
	   * may be enabled using `_.chain`.
	   *
	   * The execution of chained methods is lazy, that is, it's deferred until
	   * `_#value` is implicitly or explicitly called.
	   *
	   * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	   * fusion is an optimization to merge iteratee calls; this avoids the creation
	   * of intermediate arrays and can greatly reduce the number of iteratee executions.
	   * Sections of a chain sequence qualify for shortcut fusion if the section is
	   * applied to an array of at least two hundred elements and any iteratees
	   * accept only one argument. The heuristic for whether a section qualifies
	   * for shortcut fusion is subject to change.
	   *
	   * Chaining is supported in custom builds as long as the `_#value` method is
	   * directly or indirectly included in the build.
	   *
	   * In addition to lodash methods, wrappers have `Array` and `String` methods.
	   *
	   * The wrapper `Array` methods are:
	   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	   *
	   * The wrapper `String` methods are:
	   * `replace` and `split`
	   *
	   * The wrapper methods that support shortcut fusion are:
	   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	   *
	   * The chainable wrapper methods are:
	   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`,
	   * `at`, `before`, `bind`, `bindAll`, `bindKey`, `chain`, `chunk`, `commit`,
	   * `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`, `curry`,
	   * `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`, `difference`,
	   * `differenceBy`, `differenceWith`, `drop`, `dropRight`, `dropRightWhile`,
	   * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flip`, `flow`,
	   * `flowRight`, `fromPairs`, `functions`, `functionsIn`, `groupBy`, `initial`,
	   * `intersection`, `intersectionBy`, `intersectionWith`, `invert`, `invertBy`,
	   * `invokeMap`, `iteratee`, `keyBy`, `keys`, `keysIn`, `map`, `mapKeys`,
	   * `mapValues`, `matches`, `matchesProperty`, `memoize`, `merge`, `mergeWith`,
	   * `method`, `methodOf`, `mixin`, `negate`, `nthArg`, `omit`, `omitBy`, `once`,
	   * `orderBy`, `over`, `overArgs`, `overEvery`, `overSome`, `partial`,
	   * `partialRight`, `partition`, `pick`, `pickBy`, `plant`, `property`,
	   * `propertyOf`, `pull`, `pullAll`, `pullAllBy`, `pullAt`, `push`, `range`,
	   * `rangeRight`, `rearg`, `reject`, `remove`, `rest`, `reverse`, `sampleSize`,
	   * `set`, `setWith`, `shuffle`, `slice`, `sort`, `sortBy`, `splice`, `spread`,
	   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`, `throttle`,
	   * `thru`, `toArray`, `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`,
	   * `transform`, `unary`, `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`,
	   * `uniqWith`, `unset`, `unshift`, `unzip`, `unzipWith`, `values`, `valuesIn`,
	   * `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`, `zipObject`,
	   * `zipObjectDeep`, and `zipWith`
	   *
	   * The wrapper methods that are **not** chainable by default are:
	   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `deburr`, `endsWith`, `eq`,
	   * `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
	   * `findLast`, `findLastIndex`, `findLastKey`, `floor`, `forEach`, `forEachRight`,
	   * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	   * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	   * `isArguments`, `isArray`, `isArrayLike`, `isArrayLikeObject`, `isBoolean`,
	   * `isDate`, `isElement`, `isEmpty`, `isEqual`, `isEqualWith`, `isError`,
	   * `isFinite`, `isFunction`, `isInteger`, `isLength`, `isMatch`, `isMatchWith`,
	   * `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`, `isObject`, `isObjectLike`,
	   * `isPlainObject`, `isRegExp`, `isSafeInteger`, `isString`, `isUndefined`,
	   * `isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `lowerCase`,
	   * `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `min`, `minBy`,
	   * `noConflict`, `noop`, `now`, `pad`, `padEnd`, `padStart`, `parseInt`,
	   * `pop`, `random`, `reduce`, `reduceRight`, `repeat`, `result`, `round`,
	   * `runInContext`, `sample`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`,
	   * `sortedIndexBy`, `sortedLastIndex`, `sortedLastIndexBy`, `startCase`,
	   * `startsWith`, `subtract`, `sum`, `sumBy`, `template`, `times`, `toLower`,
	   * `toInteger`, `toLength`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`,
	   * `trim`, `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`,
	   * `upperCase`, `upperFirst`, `value`, and `words`
	   *
	   * @name _
	   * @constructor
	   * @category Seq
	   * @param {*} value The value to wrap in a `lodash` instance.
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * function square(n) {
	   *   return n * n;
	   * }
	   *
	   * var wrapped = _([1, 2, 3]);
	   *
	   * // Returns an unwrapped value.
	   * wrapped.reduce(_.add);
	   * // => 6
	   *
	   * // Returns a wrapped value.
	   * var squares = wrapped.map(square);
	   *
	   * _.isArray(squares);
	   * // => false
	   *
	   * _.isArray(squares.value());
	   * // => true
	   */
	  function lodash(value) {
	    if (isObjectLike(value) && !isArray(value)) {
	      if (value instanceof LodashWrapper) {
	        return value;
	      }
	      if (hasOwnProperty.call(value, '__wrapped__')) {
	        return wrapperClone(value);
	      }
	    }
	    return new LodashWrapper(value);
	  }

	  /**
	   * The base constructor for creating `lodash` wrapper objects.
	   *
	   * @private
	   * @param {*} value The value to wrap.
	   * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	   */
	  function LodashWrapper(value, chainAll) {
	    this.__wrapped__ = value;
	    this.__actions__ = [];
	    this.__chain__ = !!chainAll;
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Used by `_.defaults` to customize its `_.assignIn` use.
	   *
	   * @private
	   * @param {*} objValue The destination value.
	   * @param {*} srcValue The source value.
	   * @param {string} key The key of the property to assign.
	   * @param {Object} object The parent object of `objValue`.
	   * @returns {*} Returns the value to assign.
	   */
	  function assignInDefaults(objValue, srcValue, key, object) {
	    if (objValue === undefined ||
	        (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	      return srcValue;
	    }
	    return objValue;
	  }

	  /**
	   * Assigns `value` to `key` of `object` if the existing value is not equivalent
	   * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	   * for equality comparisons.
	   *
	   * @private
	   * @param {Object} object The object to modify.
	   * @param {string} key The key of the property to assign.
	   * @param {*} value The value to assign.
	   */
	  function assignValue(object, key, value) {
	    var objValue = object[key];
	    if ((!eq(objValue, value) ||
	          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) ||
	        (value === undefined && !(key in object))) {
	      object[key] = value;
	    }
	  }

	  /**
	   * The base implementation of `_.create` without support for assigning
	   * properties to the created object.
	   *
	   * @private
	   * @param {Object} prototype The object to inherit from.
	   * @returns {Object} Returns the new object.
	   */
	  var baseCreate = (function() {
	    function object() {}
	    return function(prototype) {
	      if (isObject(prototype)) {
	        object.prototype = prototype;
	        var result = new object;
	        object.prototype = undefined;
	      }
	      return result || {};
	    };
	  }());

	  /**
	   * The base implementation of `_.delay` and `_.defer` which accepts an array
	   * of `func` arguments.
	   *
	   * @private
	   * @param {Function} func The function to delay.
	   * @param {number} wait The number of milliseconds to delay invocation.
	   * @param {Object} args The arguments to provide to `func`.
	   * @returns {number} Returns the timer id.
	   */
	  function baseDelay(func, wait, args) {
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    return setTimeout(function() { func.apply(undefined, args); }, wait);
	  }

	  /**
	   * The base implementation of `_.forEach` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array|Object} Returns `collection`.
	   */
	  var baseEach = createBaseEach(baseForOwn);

	  /**
	   * The base implementation of `_.every` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`
	   */
	  function baseEvery(collection, predicate) {
	    var result = true;
	    baseEach(collection, function(value, index, collection) {
	      result = !!predicate(value, index, collection);
	      return result;
	    });
	    return result;
	  }

	  /**
	   * The base implementation of `_.filter` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {Array} Returns the new filtered array.
	   */
	  function baseFilter(collection, predicate) {
	    var result = [];
	    baseEach(collection, function(value, index, collection) {
	      if (predicate(value, index, collection)) {
	        result.push(value);
	      }
	    });
	    return result;
	  }

	  /**
	   * The base implementation of `_.flatten` with support for restricting flattening.
	   *
	   * @private
	   * @param {Array} array The array to flatten.
	   * @param {boolean} [isDeep] Specify a deep flatten.
	   * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	   * @param {Array} [result=[]] The initial result value.
	   * @returns {Array} Returns the new flattened array.
	   */
	  function baseFlatten(array, isDeep, isStrict, result) {
	    result || (result = []);

	    var index = -1,
	        length = array.length;

	    while (++index < length) {
	      var value = array[index];
	      if (isArrayLikeObject(value) &&
	          (isStrict || isArray(value) || isArguments(value))) {
	        if (isDeep) {
	          // Recursively flatten arrays (susceptible to call stack limits).
	          baseFlatten(value, isDeep, isStrict, result);
	        } else {
	          arrayPush(result, value);
	        }
	      } else if (!isStrict) {
	        result[result.length] = value;
	      }
	    }
	    return result;
	  }

	  /**
	   * The base implementation of `baseForIn` and `baseForOwn` which iterates
	   * over `object` properties returned by `keysFunc` invoking `iteratee` for
	   * each property. Iteratee functions may exit iteration early by explicitly
	   * returning `false`.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {Function} keysFunc The function to get the keys of `object`.
	   * @returns {Object} Returns `object`.
	   */
	  var baseFor = createBaseFor();

	  /**
	   * The base implementation of `_.forOwn` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Object} Returns `object`.
	   */
	  function baseForOwn(object, iteratee) {
	    return object && baseFor(object, iteratee, keys);
	  }

	  /**
	   * The base implementation of `_.functions` which creates an array of
	   * `object` function property names filtered from `props`.
	   *
	   * @private
	   * @param {Object} object The object to inspect.
	   * @param {Array} props The property names to filter.
	   * @returns {Array} Returns the new array of filtered property names.
	   */
	  function baseFunctions(object, props) {
	    return baseFilter(props, function(key) {
	      return isFunction(object[key]);
	    });
	  }

	  /**
	   * The base implementation of `_.isEqual` which supports partial comparisons
	   * and tracks traversed objects.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @param {Function} [customizer] The function to customize comparisons.
	   * @param {boolean} [bitmask] The bitmask of comparison flags.
	   *  The bitmask may be composed of the following flags:
	   *     1 - Unordered comparison
	   *     2 - Partial comparison
	   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	   */
	  function baseIsEqual(value, other, customizer, bitmask, stack) {
	    if (value === other) {
	      return true;
	    }
	    if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	      return value !== value && other !== other;
	    }
	    return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	  }

	  /**
	   * A specialized version of `baseIsEqual` for arrays and objects which performs
	   * deep comparisons and tracks traversed objects enabling objects with circular
	   * references to be compared.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Function} [customizer] The function to customize comparisons.
	   * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	    var objIsArr = isArray(object),
	        othIsArr = isArray(other),
	        objTag = arrayTag,
	        othTag = arrayTag;

	    if (!objIsArr) {
	      objTag = objectToString.call(object);
	      if (objTag == argsTag) {
	        objTag = objectTag;
	      }
	    }
	    if (!othIsArr) {
	      othTag = objectToString.call(other);
	      if (othTag == argsTag) {
	        othTag = objectTag;
	      }
	    }
	    var objIsObj = objTag == objectTag && !isHostObject(object),
	        othIsObj = othTag == objectTag && !isHostObject(other),
	        isSameTag = objTag == othTag;

	    if (isSameTag && !(objIsArr || objIsObj)) {
	      return equalByTag(object, other, objTag, equalFunc, customizer, bitmask);
	    }
	    var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	    if (!isPartial) {
	      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	      if (objIsWrapped || othIsWrapped) {
	        return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
	      }
	    }
	    if (!isSameTag) {
	      return false;
	    }
	    stack || (stack = []);
	    var stacked = find(stack, function(entry) {
	      return entry[0] === object;
	    });
	    if (stacked && stacked[1]) {
	      return stacked[1] == other;
	    }
	    stack.push([object, other]);
	    var result =  (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, bitmask, stack);
	    stack.pop();
	    return result;
	  }

	  /**
	   * The base implementation of `_.iteratee`.
	   *
	   * @private
	   * @param {*} [value=_.identity] The value to convert to an iteratee.
	   * @returns {Function} Returns the iteratee.
	   */
	  function baseIteratee(func) {
	    var type = typeof func;
	    if (type == 'function') {
	      return func;
	    }
	    return func == null
	      ? identity
	      : (type == 'object' ? baseMatches : baseProperty)(func);
	  }

	  /**
	   * The base implementation of `_.keys` which doesn't skip the constructor
	   * property of prototypes or treat sparse arrays as dense.
	   *
	   * @private
	   * @type Function
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   */
	  function baseKeys(object) {
	    return nativeKeys(Object(object));
	  }

	  /**
	   * The base implementation of `_.keysIn` which doesn't skip the constructor
	   * property of prototypes or treat sparse arrays as dense.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   */
	  function baseKeysIn(object) {
	    object = object == null ? object : Object(object);

	    var result = [];
	    for (var key in object) {
	      result.push(key);
	    }
	    return result;
	  }

	  // Fallback for IE < 9 with es6-shim.
	  if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	    baseKeysIn = function(object) {
	      return iteratorToArray(enumerate(object));
	    };
	  }

	  /**
	   * The base implementation of `_.map` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the new mapped array.
	   */
	  function baseMap(collection, iteratee) {
	    var index = -1,
	        result = isArrayLike(collection) ? Array(collection.length) : [];

	    baseEach(collection, function(value, key, collection) {
	      result[++index] = iteratee(value, key, collection);
	    });
	    return result;
	  }

	  /**
	   * The base implementation of `_.matches` which doesn't clone `source`.
	   *
	   * @private
	   * @param {Object} source The object of property values to match.
	   * @returns {Function} Returns the new function.
	   */
	  function baseMatches(source) {
	    var props = keys(source);
	    return function(object) {
	      var length = props.length;
	      if (object == null) {
	        return !length;
	      }
	      object = Object(object);
	      while (length--) {
	        var key = props[length];
	        if (!(key in object &&
	              baseIsEqual(source[key], object[key], undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG)
	            )) {
	          return false;
	        }
	      }
	      return true;
	    };
	  }

	  /**
	   * The base implementation of `_.pick` without support for individual
	   * property names.
	   *
	   * @private
	   * @param {Object} object The source object.
	   * @param {string[]} props The property names to pick.
	   * @returns {Object} Returns the new object.
	   */
	  function basePick(object, props) {
	    object = Object(object);
	    return reduce(props, function(result, key) {
	      if (key in object) {
	        result[key] = object[key];
	      }
	      return result;
	    }, {});
	  }

	  /**
	   * The base implementation of `_.property` without support for deep paths.
	   *
	   * @private
	   * @param {string} key The key of the property to get.
	   * @returns {Function} Returns the new function.
	   */
	  function baseProperty(key) {
	    return function(object) {
	      return object == null ? undefined : object[key];
	    };
	  }

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
	      start = -start > length ? 0 : (length + start);
	    }
	    end = end > length ? length : end;
	    if (end < 0) {
	      end += length;
	    }
	    length = start > end ? 0 : ((end - start) >>> 0);
	    start >>>= 0;

	    var result = Array(length);
	    while (++index < length) {
	      result[index] = array[index + start];
	    }
	    return result;
	  }

	  /**
	   * Copies the values of `source` to `array`.
	   *
	   * @private
	   * @param {Array} source The array to copy values from.
	   * @param {Array} [array=[]] The array to copy values to.
	   * @returns {Array} Returns `array`.
	   */
	  function copyArray(source) {
	    return baseSlice(source, 0, source.length);
	  }

	  /**
	   * The base implementation of `_.some` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	   */
	  function baseSome(collection, predicate) {
	    var result;

	    baseEach(collection, function(value, index, collection) {
	      result = predicate(value, index, collection);
	      return !result;
	    });
	    return !!result;
	  }

	  /**
	   * The base implementation of `wrapperValue` which returns the result of
	   * performing a sequence of actions on the unwrapped `value`, where each
	   * successive action is supplied the return value of the previous.
	   *
	   * @private
	   * @param {*} value The unwrapped value.
	   * @param {Array} actions Actions to perform to resolve the unwrapped value.
	   * @returns {*} Returns the resolved value.
	   */
	  function baseWrapperValue(value, actions) {
	    var result = value;
	    return reduce(actions, function(result, action) {
	      return action.func.apply(action.thisArg, arrayPush([result], action.args));
	    }, result);
	  }

	  /**
	   * Copies properties of `source` to `object`.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Array} props The property names to copy.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @returns {Object} Returns `object`.
	   */
	  var copyObject = copyObjectWith;

	  /**
	   * This function is like `copyObject` except that it accepts a function to
	   * customize copied values.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Array} props The property names to copy.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @param {Function} [customizer] The function to customize copied values.
	   * @returns {Object} Returns `object`.
	   */
	  function copyObjectWith(source, props, object, customizer) {
	    object || (object = {});

	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index],
	          newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];

	      assignValue(object, key, newValue);
	    }
	    return object;
	  }

	  /**
	   * Creates a function like `_.assign`.
	   *
	   * @private
	   * @param {Function} assigner The function to assign values.
	   * @returns {Function} Returns the new assigner function.
	   */
	  function createAssigner(assigner) {
	    return rest(function(object, sources) {
	      var index = -1,
	          length = sources.length,
	          customizer = length > 1 ? sources[length - 1] : undefined;

	      customizer = typeof customizer == 'function' ? (length--, customizer) : undefined;
	      object = Object(object);
	      while (++index < length) {
	        var source = sources[index];
	        if (source) {
	          assigner(object, source, index, customizer);
	        }
	      }
	      return object;
	    });
	  }

	  /**
	   * Creates a `baseEach` or `baseEachRight` function.
	   *
	   * @private
	   * @param {Function} eachFunc The function to iterate over a collection.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {Function} Returns the new base function.
	   */
	  function createBaseEach(eachFunc, fromRight) {
	    return function(collection, iteratee) {
	      if (collection == null) {
	        return collection;
	      }
	      if (!isArrayLike(collection)) {
	        return eachFunc(collection, iteratee);
	      }
	      var length = collection.length,
	          index = fromRight ? length : -1,
	          iterable = Object(collection);

	      while ((fromRight ? index-- : ++index < length)) {
	        if (iteratee(iterable[index], index, iterable) === false) {
	          break;
	        }
	      }
	      return collection;
	    };
	  }

	  /**
	   * Creates a base function for methods like `_.forIn`.
	   *
	   * @private
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {Function} Returns the new base function.
	   */
	  function createBaseFor(fromRight) {
	    return function(object, iteratee, keysFunc) {
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

	  /**
	   * Creates a function that produces an instance of `Ctor` regardless of
	   * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	   *
	   * @private
	   * @param {Function} Ctor The constructor to wrap.
	   * @returns {Function} Returns the new wrapped function.
	   */
	  function createCtorWrapper(Ctor) {
	    return function() {
	      // Use a `switch` statement to work with class constructors.
	      // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	      // for more details.
	      var args = arguments;
	      var thisBinding = baseCreate(Ctor.prototype),
	          result = Ctor.apply(thisBinding, args);

	      // Mimic the constructor's `return` behavior.
	      // See https://es5.github.io/#x13.2.2 for more details.
	      return isObject(result) ? result : thisBinding;
	    };
	  }

	  /**
	   * Creates a function that wraps `func` to invoke it with the optional `this`
	   * binding of `thisArg` and the `partials` prepended to those provided to
	   * the wrapper.
	   *
	   * @private
	   * @param {Function} func The function to wrap.
	   * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {Array} partials The arguments to prepend to those provided to the new function.
	   * @returns {Function} Returns the new wrapped function.
	   */
	  function createPartialWrapper(func, bitmask, thisArg, partials) {
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    var isBind = bitmask & BIND_FLAG,
	        Ctor = createCtorWrapper(func);

	    function wrapper() {
	      var argsIndex = -1,
	          argsLength = arguments.length,
	          leftIndex = -1,
	          leftLength = partials.length,
	          args = Array(leftLength + argsLength),
	          fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

	      while (++leftIndex < leftLength) {
	        args[leftIndex] = partials[leftIndex];
	      }
	      while (argsLength--) {
	        args[leftIndex++] = arguments[++argsIndex];
	      }
	      return fn.apply(isBind ? thisArg : this, args);
	    }
	    return wrapper;
	  }

	  /**
	   * A specialized version of `baseIsEqualDeep` for arrays with support for
	   * partial deep comparisons.
	   *
	   * @private
	   * @param {Array} array The array to compare.
	   * @param {Array} other The other array to compare.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Function} [customizer] The function to customize comparisons.
	   * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	   * @param {Object} [stack] Tracks traversed `array` and `other` objects.
	   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	   */
	  function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	    var index = -1,
	        isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	        isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	        arrLength = array.length,
	        othLength = other.length;

	    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	      return false;
	    }
	    var result = true;

	    // Ignore non-index properties.
	    while (++index < arrLength) {
	      var arrValue = array[index],
	          othValue = other[index];

	      var compared;
	      if (compared !== undefined) {
	        if (compared) {
	          continue;
	        }
	        result = false;
	        break;
	      }
	      // Recursively compare arrays (susceptible to call stack limits).
	      if (isUnordered) {
	        if (!baseSome(other, function(othValue) {
	              return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
	            })) {
	          result = false;
	          break;
	        }
	      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	        result = false;
	        break;
	      }
	    }
	    return result;
	  }

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
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Function} [customizer] The function to customize comparisons.
	   * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function equalByTag(object, other, tag, equalFunc, customizer, bitmask) {
	    switch (tag) {

	      case boolTag:
	      case dateTag:
	        // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	        return +object == +other;

	      case errorTag:
	        return object.name == other.name && object.message == other.message;

	      case numberTag:
	        // Treat `NaN` vs. `NaN` as equal.
	        return (object != +object) ? other != +other : object == +other;

	      case regexpTag:
	      case stringTag:
	        // Coerce regexes to strings and treat strings primitives and string
	        // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	        return object == (other + '');

	    }
	    return false;
	  }

	  /**
	   * A specialized version of `baseIsEqualDeep` for objects with support for
	   * partial deep comparisons.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Function} [customizer] The function to customize comparisons.
	   * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	    var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	        objProps = keys(object),
	        objLength = objProps.length,
	        othProps = keys(other),
	        othLength = othProps.length;

	    if (objLength != othLength && !isPartial) {
	      return false;
	    }
	    var index = objLength;
	    while (index--) {
	      var key = objProps[index];
	      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	        return false;
	      }
	    }
	    var result = true;

	    var skipCtor = isPartial;
	    while (++index < objLength) {
	      key = objProps[index];
	      var objValue = object[key],
	          othValue = other[key];

	      var compared;
	      // Recursively compare objects (susceptible to call stack limits).
	      if (!(compared === undefined
	            ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	            : compared
	          )) {
	        result = false;
	        break;
	      }
	      skipCtor || (skipCtor = key == 'constructor');
	    }
	    if (result && !skipCtor) {
	      var objCtor = object.constructor,
	          othCtor = other.constructor;

	      // Non `Object` object instances with different constructors are not equal.
	      if (objCtor != othCtor &&
	          ('constructor' in object && 'constructor' in other) &&
	          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	        result = false;
	      }
	    }
	    return result;
	  }

	  /**
	   * Gets the "length" property value of `object`.
	   *
	   * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	   * that affects Safari on at least iOS 8.1-8.3 ARM64.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {*} Returns the "length" value.
	   */
	  var getLength = baseProperty('length');

	  /**
	   * Creates an array of index keys for `object` values of arrays,
	   * `arguments` objects, and strings, otherwise `null` is returned.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array|null} Returns index keys, else `null`.
	   */
	  function indexKeys(object) {
	    var length = object ? object.length : undefined;
	    if (isLength(length) &&
	        (isArray(object) || isString(object) || isArguments(object))) {
	      return baseTimes(length, String);
	    }
	    return null;
	  }

	  /**
	   * Checks if `value` is likely a prototype object.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	   */
	  function isPrototype(value) {
	    var Ctor = value && value.constructor,
	        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	    return value === proto;
	  }

	  /**
	   * Converts `value` to a function if it's not one.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {Function} Returns the function.
	   */
	  function toFunction(value) {
	    return typeof value == 'function' ? value : identity;
	  }

	  /**
	   * Creates a clone of `wrapper`.
	   *
	   * @private
	   * @param {Object} wrapper The wrapper to clone.
	   * @returns {Object} Returns the cloned wrapper.
	   */
	  function wrapperClone(wrapper) {
	    var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
	    result.__actions__ = copyArray(wrapper.__actions__);
	    return result;
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates an array with all falsey values removed. The values `false`, `null`,
	   * `0`, `""`, `undefined`, and `NaN` are falsey.
	   *
	   * @static
	   * @memberOf _
	   * @category Array
	   * @param {Array} array The array to compact.
	   * @returns {Array} Returns the new array of filtered values.
	   * @example
	   *
	   * _.compact([0, 1, false, 2, '', 3]);
	   * // => [1, 2, 3]
	   */
	  function compact(array) {
	    return baseFilter(array, Boolean);
	  }

	  /**
	   * Creates a new array concatenating `array` with any additional arrays
	   * and/or values.
	   *
	   * @static
	   * @memberOf _
	   * @category Array
	   * @param {Array} array The array to concatenate.
	   * @param {...*} [values] The values to concatenate.
	   * @returns {Array} Returns the new concatenated array.
	   * @example
	   *
	   * var array = [1];
	   * var other = _.concat(array, 2, [3], [[4]]);
	   *
	   * console.log(other);
	   * // => [1, 2, 3, [4]]
	   *
	   * console.log(array);
	   * // => [1]
	   */
	  var concat = rest(function(array, values) {
	    if (!isArray(array)) {
	      array = array == null ? [] : [Object(array)];
	    }
	    values = baseFlatten(values);
	    return arrayConcat(array, values);
	  });

	  /**
	   * Flattens `array` a single level.
	   *
	   * @static
	   * @memberOf _
	   * @category Array
	   * @param {Array} array The array to flatten.
	   * @returns {Array} Returns the new flattened array.
	   * @example
	   *
	   * _.flatten([1, [2, 3, [4]]]);
	   * // => [1, 2, 3, [4]]
	   */
	  function flatten(array) {
	    var length = array ? array.length : 0;
	    return length ? baseFlatten(array) : [];
	  }

	  /**
	   * This method is like `_.flatten` except that it recursively flattens `array`.
	   *
	   * @static
	   * @memberOf _
	   * @category Array
	   * @param {Array} array The array to recursively flatten.
	   * @returns {Array} Returns the new flattened array.
	   * @example
	   *
	   * _.flattenDeep([1, [2, 3, [4]]]);
	   * // => [1, 2, 3, 4]
	   */
	  function flattenDeep(array) {
	    var length = array ? array.length : 0;
	    return length ? baseFlatten(array, true) : [];
	  }

	  /**
	   * Gets the first element of `array`.
	   *
	   * @static
	   * @memberOf _
	   * @alias first
	   * @category Array
	   * @param {Array} array The array to query.
	   * @returns {*} Returns the first element of `array`.
	   * @example
	   *
	   * _.head([1, 2, 3]);
	   * // => 1
	   *
	   * _.head([]);
	   * // => undefined
	   */
	  function head(array) {
	    return array ? array[0] : undefined;
	  }

	  /**
	   * Gets the index at which the first occurrence of `value` is found in `array`
	   * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	   * for equality comparisons. If `fromIndex` is negative, it's used as the offset
	   * from the end of `array`.
	   *
	   * @static
	   * @memberOf _
	   * @category Array
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} [fromIndex=0] The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   * @example
	   *
	   * _.indexOf([1, 2, 1, 2], 2);
	   * // => 1
	   *
	   * // Search from the `fromIndex`.
	   * _.indexOf([1, 2, 1, 2], 2, 2);
	   * // => 3
	   */
	  function indexOf(array, value, fromIndex) {
	    var length = array ? array.length : 0;
	    if (typeof fromIndex == 'number') {
	      fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
	    } else {
	      fromIndex = 0;
	    }
	    var index = (fromIndex || 0) - 1,
	        isReflexive = value === value;

	    while (++index < length) {
	      var other = array[index];
	      if ((isReflexive ? other === value : other !== other)) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * Gets the last element of `array`.
	   *
	   * @static
	   * @memberOf _
	   * @category Array
	   * @param {Array} array The array to query.
	   * @returns {*} Returns the last element of `array`.
	   * @example
	   *
	   * _.last([1, 2, 3]);
	   * // => 3
	   */
	  function last(array) {
	    var length = array ? array.length : 0;
	    return length ? array[length - 1] : undefined;
	  }

	  /**
	   * Creates a slice of `array` from `start` up to, but not including, `end`.
	   *
	   * **Note:** This method is used instead of [`Array#slice`](https://mdn.io/Array/slice)
	   * to ensure dense arrays are returned.
	   *
	   * @static
	   * @memberOf _
	   * @category Array
	   * @param {Array} array The array to slice.
	   * @param {number} [start=0] The start position.
	   * @param {number} [end=array.length] The end position.
	   * @returns {Array} Returns the slice of `array`.
	   */
	  function slice(array, start, end) {
	    var length = array ? array.length : 0;
	    start = start == null ? 0 : +start;
	    end = end === undefined ? length : +end;
	    return length ? baseSlice(array, start, end) : [];
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a `lodash` object that wraps `value` with explicit method chaining enabled.
	   * The result of such method chaining must be unwrapped with `_#value`.
	   *
	   * @static
	   * @memberOf _
	   * @category Seq
	   * @param {*} value The value to wrap.
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney',  'age': 36 },
	   *   { 'user': 'fred',    'age': 40 },
	   *   { 'user': 'pebbles', 'age': 1 }
	   * ];
	   *
	   * var youngest = _
	   *   .chain(users)
	   *   .sortBy('age')
	   *   .map(function(o) {
	   *     return o.user + ' is ' + o.age;
	   *   })
	   *   .head()
	   *   .value();
	   * // => 'pebbles is 1'
	   */
	  function chain(value) {
	    var result = lodash(value);
	    result.__chain__ = true;
	    return result;
	  }

	  /**
	   * This method invokes `interceptor` and returns `value`. The interceptor
	   * is invoked with one argument; (value). The purpose of this method is to
	   * "tap into" a method chain in order to modify intermediate results.
	   *
	   * @static
	   * @memberOf _
	   * @category Seq
	   * @param {*} value The value to provide to `interceptor`.
	   * @param {Function} interceptor The function to invoke.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * _([1, 2, 3])
	   *  .tap(function(array) {
	   *    // Mutate input array.
	   *    array.pop();
	   *  })
	   *  .reverse()
	   *  .value();
	   * // => [2, 1]
	   */
	  function tap(value, interceptor) {
	    interceptor(value);
	    return value;
	  }

	  /**
	   * This method is like `_.tap` except that it returns the result of `interceptor`.
	   * The purpose of this method is to "pass thru" values replacing intermediate
	   * results in a method chain.
	   *
	   * @static
	   * @memberOf _
	   * @category Seq
	   * @param {*} value The value to provide to `interceptor`.
	   * @param {Function} interceptor The function to invoke.
	   * @returns {*} Returns the result of `interceptor`.
	   * @example
	   *
	   * _('  abc  ')
	   *  .chain()
	   *  .trim()
	   *  .thru(function(value) {
	   *    return [value];
	   *  })
	   *  .value();
	   * // => ['abc']
	   */
	  function thru(value, interceptor) {
	    return interceptor(value);
	  }

	  /**
	   * Enables explicit method chaining on the wrapper object.
	   *
	   * @name chain
	   * @memberOf _
	   * @category Seq
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36 },
	   *   { 'user': 'fred',   'age': 40 }
	   * ];
	   *
	   * // A sequence without explicit chaining.
	   * _(users).head();
	   * // => { 'user': 'barney', 'age': 36 }
	   *
	   * // A sequence with explicit chaining.
	   * _(users)
	   *   .chain()
	   *   .head()
	   *   .pick('user')
	   *   .value();
	   * // => { 'user': 'barney' }
	   */
	  function wrapperChain() {
	    return chain(this);
	  }

	  /**
	   * Executes the chained sequence to extract the unwrapped value.
	   *
	   * @name value
	   * @memberOf _
	   * @alias toJSON, valueOf
	   * @category Seq
	   * @returns {*} Returns the resolved unwrapped value.
	   * @example
	   *
	   * _([1, 2, 3]).value();
	   * // => [1, 2, 3]
	   */
	  function wrapperValue() {
	    return baseWrapperValue(this.__wrapped__, this.__actions__);
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Checks if `predicate` returns truthy for **all** elements of `collection`.
	   * Iteration is stopped once `predicate` returns falsey. The predicate is
	   * invoked with three arguments: (value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	   * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	   * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`.
	   * @example
	   *
	   * _.every([true, 1, null, 'yes'], Boolean);
	   * // => false
	   *
	   * var users = [
	   *   { 'user': 'barney', 'active': false },
	   *   { 'user': 'fred',   'active': false }
	   * ];
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.every(users, { 'user': 'barney', 'active': false });
	   * // => false
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.every(users, ['active', false]);
	   * // => true
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.every(users, 'active');
	   * // => false
	   */
	  function every(collection, predicate, guard) {
	    predicate = guard ? undefined : predicate;
	    return baseEvery(collection, baseIteratee(predicate));
	  }

	  /**
	   * Iterates over elements of `collection`, returning an array of all elements
	   * `predicate` returns truthy for. The predicate is invoked with three arguments:
	   * (value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	   * @returns {Array} Returns the new filtered array.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36, 'active': true },
	   *   { 'user': 'fred',   'age': 40, 'active': false }
	   * ];
	   *
	   * _.filter(users, function(o) { return !o.active; });
	   * // => objects for ['fred']
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.filter(users, { 'age': 36, 'active': true });
	   * // => objects for ['barney']
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.filter(users, ['active', false]);
	   * // => objects for ['fred']
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.filter(users, 'active');
	   * // => objects for ['barney']
	   */
	  function filter(collection, predicate) {
	    return baseFilter(collection, baseIteratee(predicate));
	  }

	  /**
	   * Iterates over elements of `collection`, returning the first element
	   * `predicate` returns truthy for. The predicate is invoked with three arguments:
	   * (value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @category Collection
	   * @param {Array|Object} collection The collection to search.
	   * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	   * @returns {*} Returns the matched element, else `undefined`.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney',  'age': 36, 'active': true },
	   *   { 'user': 'fred',    'age': 40, 'active': false },
	   *   { 'user': 'pebbles', 'age': 1,  'active': true }
	   * ];
	   *
	   * _.find(users, function(o) { return o.age < 40; });
	   * // => object for 'barney'
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.find(users, { 'age': 1, 'active': true });
	   * // => object for 'pebbles'
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.find(users, ['active', false]);
	   * // => object for 'fred'
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.find(users, 'active');
	   * // => object for 'barney'
	   */
	  function find(collection, predicate) {
	    return baseFind(collection, baseIteratee(predicate), baseEach);
	  }

	  /**
	   * Iterates over elements of `collection` invoking `iteratee` for each element.
	   * The iteratee is invoked with three arguments: (value, index|key, collection).
	   * Iteratee functions may exit iteration early by explicitly returning `false`.
	   *
	   * **Note:** As with other "Collections" methods, objects with a "length" property
	   * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
	   * for object iteration.
	   *
	   * @static
	   * @memberOf _
	   * @alias each
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	   * @returns {Array|Object} Returns `collection`.
	   * @example
	   *
	   * _([1, 2]).forEach(function(value) {
	   *   console.log(value);
	   * });
	   * // => logs `1` then `2`
	   *
	   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	   *   console.log(key);
	   * });
	   * // => logs 'a' then 'b' (iteration order is not guaranteed)
	   */
	  function forEach(collection, iteratee) {
	    return baseEach(collection, toFunction(iteratee));
	  }

	  /**
	   * Creates an array of values by running each element in `collection` through
	   * `iteratee`. The iteratee is invoked with three arguments:
	   * (value, index|key, collection).
	   *
	   * Many lodash methods are guarded to work as iteratees for methods like
	   * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	   *
	   * The guarded methods are:
	   * `ary`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`,
	   * `invert`, `parseInt`, `random`, `range`, `rangeRight`, `slice`, `some`,
	   * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`,
	   * and `words`
	   *
	   * @static
	   * @memberOf _
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	   * @returns {Array} Returns the new mapped array.
	   * @example
	   *
	   * function square(n) {
	   *   return n * n;
	   * }
	   *
	   * _.map([4, 8], square);
	   * // => [16, 64]
	   *
	   * _.map({ 'a': 4, 'b': 8 }, square);
	   * // => [16, 64] (iteration order is not guaranteed)
	   *
	   * var users = [
	   *   { 'user': 'barney' },
	   *   { 'user': 'fred' }
	   * ];
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.map(users, 'user');
	   * // => ['barney', 'fred']
	   */
	  function map(collection, iteratee) {
	    return baseMap(collection, baseIteratee(iteratee));
	  }

	  /**
	   * Reduces `collection` to a value which is the accumulated result of running
	   * each element in `collection` through `iteratee`, where each successive
	   * invocation is supplied the return value of the previous. If `accumulator`
	   * is not given the first element of `collection` is used as the initial
	   * value. The iteratee is invoked with four arguments:
	   * (accumulator, value, index|key, collection).
	   *
	   * Many lodash methods are guarded to work as iteratees for methods like
	   * `_.reduce`, `_.reduceRight`, and `_.transform`.
	   *
	   * The guarded methods are:
	   * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	   * and `sortBy`
	   *
	   * @static
	   * @memberOf _
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @returns {*} Returns the accumulated value.
	   * @example
	   *
	   * _.reduce([1, 2], function(sum, n) {
	   *   return sum + n;
	   * }, 0);
	   * // => 3
	   *
	   * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	   *   (result[value] || (result[value] = [])).push(key);
	   *   return result;
	   * }, {});
	   * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	   */
	  function reduce(collection, iteratee, accumulator) {
	    return baseReduce(collection, baseIteratee(iteratee), accumulator, arguments.length < 3, baseEach);
	  }

	  /**
	   * Gets the size of `collection` by returning its length for array-like
	   * values or the number of own enumerable properties for objects.
	   *
	   * @static
	   * @memberOf _
	   * @category Collection
	   * @param {Array|Object} collection The collection to inspect.
	   * @returns {number} Returns the collection size.
	   * @example
	   *
	   * _.size([1, 2, 3]);
	   * // => 3
	   *
	   * _.size({ 'a': 1, 'b': 2 });
	   * // => 2
	   *
	   * _.size('pebbles');
	   * // => 7
	   */
	  function size(collection) {
	    if (collection == null) {
	      return 0;
	    }
	    collection = isArrayLike(collection) ? collection : keys(collection);
	    return collection.length;
	  }

	  /**
	   * Checks if `predicate` returns truthy for **any** element of `collection`.
	   * Iteration is stopped once `predicate` returns truthy. The predicate is
	   * invoked with three arguments: (value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	   * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	   * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	   * @example
	   *
	   * _.some([null, 0, 'yes', false], Boolean);
	   * // => true
	   *
	   * var users = [
	   *   { 'user': 'barney', 'active': true },
	   *   { 'user': 'fred',   'active': false }
	   * ];
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.some(users, { 'user': 'barney', 'active': false });
	   * // => false
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.some(users, ['active', false]);
	   * // => true
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.some(users, 'active');
	   * // => true
	   */
	  function some(collection, predicate, guard) {
	    predicate = guard ? undefined : predicate;
	    return baseSome(collection, baseIteratee(predicate));
	  }

	  /**
	   * Creates an array of elements, sorted in ascending order by the results of
	   * running each element in a collection through each iteratee. This method
	   * performs a stable sort, that is, it preserves the original sort order of
	   * equal elements. The iteratees are invoked with one argument: (value).
	   *
	   * @static
	   * @memberOf _
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {...(Function|Function[]|Object|Object[]|string|string[])} [iteratees=[_.identity]]
	   *  The iteratees to sort by, specified individually or in arrays.
	   * @returns {Array} Returns the new sorted array.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'fred',   'age': 48 },
	   *   { 'user': 'barney', 'age': 36 },
	   *   { 'user': 'fred',   'age': 42 },
	   *   { 'user': 'barney', 'age': 34 }
	   * ];
	   *
	   * _.sortBy(users, function(o) { return o.user; });
	   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	   *
	   * _.sortBy(users, ['user', 'age']);
	   * // => objects for [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
	   *
	   * _.sortBy(users, 'user', function(o) {
	   *   return Math.floor(o.age / 10);
	   * });
	   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	   */
	  function sortBy(collection, iteratee) {
	    var index = 0;
	    iteratee = baseIteratee(iteratee);

	    return baseMap(baseMap(collection, function(value, key, collection) {
	      return { 'value': value, 'index': index++, 'criteria': iteratee(value, key, collection) };
	    }).sort(function(object, other) {
	      return compareAscending(object.criteria, other.criteria) || (object.index - other.index);
	    }), baseProperty('value'));
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a function that invokes `func`, with the `this` binding and arguments
	   * of the created function, while it's called less than `n` times. Subsequent
	   * calls to the created function return the result of the last `func` invocation.
	   *
	   * @static
	   * @memberOf _
	   * @category Function
	   * @param {number} n The number of calls at which `func` is no longer invoked.
	   * @param {Function} func The function to restrict.
	   * @returns {Function} Returns the new restricted function.
	   * @example
	   *
	   * jQuery(element).on('click', _.before(5, addContactToList));
	   * // => allows adding up to 4 contacts to the list
	   */
	  function before(n, func) {
	    var result;
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    n = toInteger(n);
	    return function() {
	      if (--n > 0) {
	        result = func.apply(this, arguments);
	      }
	      if (n <= 1) {
	        func = undefined;
	      }
	      return result;
	    };
	  }

	  /**
	   * Creates a function that invokes `func` with the `this` binding of `thisArg`
	   * and prepends any additional `_.bind` arguments to those provided to the
	   * bound function.
	   *
	   * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	   * may be used as a placeholder for partially applied arguments.
	   *
	   * **Note:** Unlike native `Function#bind` this method doesn't set the "length"
	   * property of bound functions.
	   *
	   * @static
	   * @memberOf _
	   * @category Function
	   * @param {Function} func The function to bind.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {...*} [partials] The arguments to be partially applied.
	   * @returns {Function} Returns the new bound function.
	   * @example
	   *
	   * var greet = function(greeting, punctuation) {
	   *   return greeting + ' ' + this.user + punctuation;
	   * };
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * var bound = _.bind(greet, object, 'hi');
	   * bound('!');
	   * // => 'hi fred!'
	   *
	   * // Bound with placeholders.
	   * var bound = _.bind(greet, object, _, '!');
	   * bound('hi');
	   * // => 'hi fred!'
	   */
	  var bind = rest(function(func, thisArg, partials) {
	    return createPartialWrapper(func, BIND_FLAG | PARTIAL_FLAG, thisArg, partials);
	  });

	  /**
	   * Defers invoking the `func` until the current call stack has cleared. Any
	   * additional arguments are provided to `func` when it's invoked.
	   *
	   * @static
	   * @memberOf _
	   * @category Function
	   * @param {Function} func The function to defer.
	   * @param {...*} [args] The arguments to invoke `func` with.
	   * @returns {number} Returns the timer id.
	   * @example
	   *
	   * _.defer(function(text) {
	   *   console.log(text);
	   * }, 'deferred');
	   * // => logs 'deferred' after one or more milliseconds
	   */
	  var defer = rest(function(func, args) {
	    return baseDelay(func, 1, args);
	  });

	  /**
	   * Invokes `func` after `wait` milliseconds. Any additional arguments are
	   * provided to `func` when it's invoked.
	   *
	   * @static
	   * @memberOf _
	   * @category Function
	   * @param {Function} func The function to delay.
	   * @param {number} wait The number of milliseconds to delay invocation.
	   * @param {...*} [args] The arguments to invoke `func` with.
	   * @returns {number} Returns the timer id.
	   * @example
	   *
	   * _.delay(function(text) {
	   *   console.log(text);
	   * }, 1000, 'later');
	   * // => logs 'later' after one second
	   */
	  var delay = rest(function(func, wait, args) {
	    return baseDelay(func, toNumber(wait) || 0, args);
	  });

	  /**
	   * Creates a function that negates the result of the predicate `func`. The
	   * `func` predicate is invoked with the `this` binding and arguments of the
	   * created function.
	   *
	   * @static
	   * @memberOf _
	   * @category Function
	   * @param {Function} predicate The predicate to negate.
	   * @returns {Function} Returns the new function.
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
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  }

	  /**
	   * Creates a function that is restricted to invoking `func` once. Repeat calls
	   * to the function return the value of the first invocation. The `func` is
	   * invoked with the `this` binding and arguments of the created function.
	   *
	   * @static
	   * @memberOf _
	   * @category Function
	   * @param {Function} func The function to restrict.
	   * @returns {Function} Returns the new restricted function.
	   * @example
	   *
	   * var initialize = _.once(createApplication);
	   * initialize();
	   * initialize();
	   * // `initialize` invokes `createApplication` once
	   */
	  function once(func) {
	    return before(2, func);
	  }

	  /**
	   * Creates a function that invokes `func` with the `this` binding of the
	   * created function and arguments from `start` and beyond provided as an array.
	   *
	   * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	   *
	   * @static
	   * @memberOf _
	   * @category Function
	   * @param {Function} func The function to apply a rest parameter to.
	   * @param {number} [start=func.length-1] The start position of the rest parameter.
	   * @returns {Function} Returns the new function.
	   * @example
	   *
	   * var say = _.rest(function(what, names) {
	   *   return what + ' ' + _.initial(names).join(', ') +
	   *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	   * });
	   *
	   * say('hello', 'fred', 'barney', 'pebbles');
	   * // => 'hello fred, barney, & pebbles'
	   */
	  function rest(func, start) {
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	    return function() {
	      var args = arguments,
	          index = -1,
	          length = nativeMax(args.length - start, 0),
	          array = Array(length);

	      while (++index < length) {
	        array[index] = args[start + index];
	      }
	      var otherArgs = Array(start + 1);
	      index = -1;
	      while (++index < start) {
	        otherArgs[index] = args[index];
	      }
	      otherArgs[start] = array;
	      return func.apply(this, otherArgs);
	    };
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a shallow clone of `value`.
	   *
	   * **Note:** This method is loosely based on the
	   * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	   * and supports cloning arrays, array buffers, booleans, date objects, maps,
	   * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	   * arrays. The own enumerable properties of `arguments` objects are cloned
	   * as plain objects. An empty object is returned for uncloneable values such
	   * as error objects, functions, DOM nodes, and WeakMaps.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to clone.
	   * @returns {*} Returns the cloned value.
	   * @example
	   *
	   * var objects = [{ 'a': 1 }, { 'b': 2 }];
	   *
	   * var shallow = _.clone(objects);
	   * console.log(shallow[0] === objects[0]);
	   * // => true
	   */
	  function clone(value) {
	    if (!isObject(value)) {
	      return value;
	    }
	    return isArray(value) ? copyArray(value) : copyObject(value, keys(value));
	  }

	  /**
	   * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	   * comparison between two values to determine if they are equivalent.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   * var other = { 'user': 'fred' };
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
	    return value === other || (value !== value && other !== other);
	  }

	  /**
	   * Checks if `value` is greater than `other`.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
	   * @example
	   *
	   * _.gt(3, 1);
	   * // => true
	   *
	   * _.gt(3, 3);
	   * // => false
	   *
	   * _.gt(1, 3);
	   * // => false
	   */
	  function gt(value, other) {
	    return value > other;
	  }

	  /**
	   * Checks if `value` is likely an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArguments(function() { return arguments; }());
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  function isArguments(value) {
	    // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	      (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	  }

	  /**
	   * Checks if `value` is classified as an `Array` object.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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

	  /**
	   * Checks if `value` is array-like. A value is considered array-like if it's
	   * not a function and has a `value.length` that's an integer greater than or
	   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
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
	    return value != null &&
	      !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	  }

	  /**
	   * This method is like `_.isArrayLike` except that it also checks if `value`
	   * is an object.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	   * @example
	   *
	   * _.isArrayLikeObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isArrayLikeObject(document.body.children);
	   * // => true
	   *
	   * _.isArrayLikeObject('abc');
	   * // => false
	   *
	   * _.isArrayLikeObject(_.noop);
	   * // => false
	   */
	  function isArrayLikeObject(value) {
	    return isObjectLike(value) && isArrayLike(value);
	  }

	  /**
	   * Checks if `value` is classified as a boolean primitive or object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isBoolean(false);
	   * // => true
	   *
	   * _.isBoolean(null);
	   * // => false
	   */
	  function isBoolean(value) {
	    return value === true || value === false ||
	      (isObjectLike(value) && objectToString.call(value) == boolTag);
	  }

	  /**
	   * Checks if `value` is classified as a `Date` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isDate(new Date);
	   * // => true
	   *
	   * _.isDate('Mon April 23 2012');
	   * // => false
	   */
	  function isDate(value) {
	    return isObjectLike(value) && objectToString.call(value) == dateTag;
	  }

	  /**
	   * Checks if `value` is empty. A value is considered empty unless it's an
	   * `arguments` object, array, string, or jQuery-like collection with a length
	   * greater than `0` or an object with own enumerable properties.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {Array|Object|string} value The value to inspect.
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
	    if (isArrayLike(value) &&
	        (isArray(value) || isString(value) || isFunction(value.splice) || isArguments(value))) {
	      return !value.length;
	    }
	    for (var key in value) {
	      if (hasOwnProperty.call(value, key)) {
	        return false;
	      }
	    }
	    return true;
	  }

	  /**
	   * Performs a deep comparison between two values to determine if they are
	   * equivalent.
	   *
	   * **Note:** This method supports comparing arrays, array buffers, booleans,
	   * date objects, error objects, maps, numbers, `Object` objects, regexes,
	   * sets, strings, symbols, and typed arrays. `Object` objects are compared
	   * by their own, not inherited, enumerable properties. Functions and DOM
	   * nodes are **not** supported.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   * var other = { 'user': 'fred' };
	   *
	   * _.isEqual(object, other);
	   * // => true
	   *
	   * object === other;
	   * // => false
	   */
	  function isEqual(value, other) {
	    return baseIsEqual(value, other);
	  }

	  /**
	   * Checks if `value` is a finite primitive number.
	   *
	   * **Note:** This method is based on [`Number.isFinite`](https://mdn.io/Number/isFinite).
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	   * @example
	   *
	   * _.isFinite(3);
	   * // => true
	   *
	   * _.isFinite(Number.MAX_VALUE);
	   * // => true
	   *
	   * _.isFinite(3.14);
	   * // => true
	   *
	   * _.isFinite(Infinity);
	   * // => false
	   */
	  function isFinite(value) {
	    return typeof value == 'number' && nativeIsFinite(value);
	  }

	  /**
	   * Checks if `value` is classified as a `Function` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isFunction(_);
	   * // => true
	   *
	   * _.isFunction(/abc/);
	   * // => false
	   */
	  function isFunction(value) {
	    // The use of `Object#toString` avoids issues with the `typeof` operator
	    // in Safari 8 which returns 'object' for typed array constructors, and
	    // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	    var tag = isObject(value) ? objectToString.call(value) : '';
	    return tag == funcTag || tag == genTag;
	  }

	  /**
	   * Checks if `value` is a valid array-like length.
	   *
	   * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	   *
	   * @static
	   * @memberOf _
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

	  /**
	   * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * @static
	   * @memberOf _
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
	    return !!value && (type == 'object' || type == 'function');
	  }

	  /**
	   * Checks if `value` is object-like. A value is object-like if it's not `null`
	   * and has a `typeof` result of "object".
	   *
	   * @static
	   * @memberOf _
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
	    return !!value && typeof value == 'object';
	  }

	  /**
	   * Checks if `value` is `NaN`.
	   *
	   * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
	   * which returns `true` for `undefined` and other non-numeric values.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	   * @example
	   *
	   * _.isNaN(NaN);
	   * // => true
	   *
	   * _.isNaN(new Number(NaN));
	   * // => true
	   *
	   * isNaN(undefined);
	   * // => true
	   *
	   * _.isNaN(undefined);
	   * // => false
	   */
	  function isNaN(value) {
	    // An `NaN` primitive is the only value that is not equal to itself.
	    // Perform the `toStringTag` check first to avoid errors with some ActiveX objects in IE.
	    return isNumber(value) && value != +value;
	  }

	  /**
	   * Checks if `value` is `null`.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	   * @example
	   *
	   * _.isNull(null);
	   * // => true
	   *
	   * _.isNull(void 0);
	   * // => false
	   */
	  function isNull(value) {
	    return value === null;
	  }

	  /**
	   * Checks if `value` is classified as a `Number` primitive or object.
	   *
	   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	   * as numbers, use the `_.isFinite` method.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isNumber(3);
	   * // => true
	   *
	   * _.isNumber(Number.MIN_VALUE);
	   * // => true
	   *
	   * _.isNumber(Infinity);
	   * // => true
	   *
	   * _.isNumber('3');
	   * // => false
	   */
	  function isNumber(value) {
	    return typeof value == 'number' ||
	      (isObjectLike(value) && objectToString.call(value) == numberTag);
	  }

	  /**
	   * Checks if `value` is classified as a `RegExp` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isRegExp(/abc/);
	   * // => true
	   *
	   * _.isRegExp('/abc/');
	   * // => false
	   */
	  function isRegExp(value) {
	    return isObject(value) && objectToString.call(value) == regexpTag;
	  }

	  /**
	   * Checks if `value` is classified as a `String` primitive or object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isString('abc');
	   * // => true
	   *
	   * _.isString(1);
	   * // => false
	   */
	  function isString(value) {
	    return typeof value == 'string' ||
	      (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	  }

	  /**
	   * Checks if `value` is `undefined`.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	   * @example
	   *
	   * _.isUndefined(void 0);
	   * // => true
	   *
	   * _.isUndefined(null);
	   * // => false
	   */
	  function isUndefined(value) {
	    return value === undefined;
	  }

	  /**
	   * Checks if `value` is less than `other`.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
	   * @example
	   *
	   * _.lt(1, 3);
	   * // => true
	   *
	   * _.lt(3, 3);
	   * // => false
	   *
	   * _.lt(3, 1);
	   * // => false
	   */
	  function lt(value, other) {
	    return value < other;
	  }

	  /**
	   * Converts `value` to an array.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to convert.
	   * @returns {Array} Returns the converted array.
	   * @example
	   *
	   * _.toArray({ 'a': 1, 'b': 2 });
	   * // => [1, 2]
	   *
	   * _.toArray('abc');
	   * // => ['a', 'b', 'c']
	   *
	   * _.toArray(1);
	   * // => []
	   *
	   * _.toArray(null);
	   * // => []
	   */
	  function toArray(value) {
	    if (!isArrayLike(value)) {
	      return values(value);
	    }
	    return value.length ? copyArray(value) : [];
	  }

	  /**
	   * Converts `value` to an integer.
	   *
	   * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to convert.
	   * @returns {number} Returns the converted integer.
	   * @example
	   *
	   * _.toInteger(3);
	   * // => 3
	   *
	   * _.toInteger(Number.MIN_VALUE);
	   * // => 0
	   *
	   * _.toInteger(Infinity);
	   * // => 1.7976931348623157e+308
	   *
	   * _.toInteger('3');
	   * // => 3
	   */
	  var toInteger = Number;

	  /**
	   * Converts `value` to a number.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to process.
	   * @returns {number} Returns the number.
	   * @example
	   *
	   * _.toNumber(3);
	   * // => 3
	   *
	   * _.toNumber(Number.MIN_VALUE);
	   * // => 5e-324
	   *
	   * _.toNumber(Infinity);
	   * // => Infinity
	   *
	   * _.toNumber('3');
	   * // => 3
	   */
	  var toNumber = Number;

	  /**
	   * Converts `value` to a string if it's not one. An empty string is returned
	   * for `null` and `undefined` values. The sign of `-0` is preserved.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to process.
	   * @returns {string} Returns the string.
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
	    if (typeof value == 'string') {
	      return value;
	    }
	    return value == null ? '' : (value + '');
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Assigns own enumerable properties of source objects to the destination
	   * object. Source objects are applied from left to right. Subsequent sources
	   * overwrite property assignments of previous sources.
	   *
	   * **Note:** This method mutates `object` and is loosely based on
	   * [`Object.assign`](https://mdn.io/Object/assign).
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * function Foo() {
	   *   this.c = 3;
	   * }
	   *
	   * function Bar() {
	   *   this.e = 5;
	   * }
	   *
	   * Foo.prototype.d = 4;
	   * Bar.prototype.f = 6;
	   *
	   * _.assign({ 'a': 1 }, new Foo, new Bar);
	   * // => { 'a': 1, 'c': 3, 'e': 5 }
	   */
	  var assign = createAssigner(function(object, source) {
	    copyObject(source, keys(source), object);
	  });

	  /**
	   * This method is like `_.assign` except that it iterates over own and
	   * inherited source properties.
	   *
	   * **Note:** This method mutates `object`.
	   *
	   * @static
	   * @memberOf _
	   * @alias extend
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * function Foo() {
	   *   this.b = 2;
	   * }
	   *
	   * function Bar() {
	   *   this.d = 4;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   * Bar.prototype.e = 5;
	   *
	   * _.assignIn({ 'a': 1 }, new Foo, new Bar);
	   * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
	   */
	  var assignIn = createAssigner(function(object, source) {
	    copyObject(source, keysIn(source), object);
	  });

	  /**
	   * This method is like `_.assignIn` except that it accepts `customizer` which
	   * is invoked to produce the assigned values. If `customizer` returns `undefined`
	   * assignment is handled by the method instead. The `customizer` is invoked
	   * with five arguments: (objValue, srcValue, key, object, source).
	   *
	   * **Note:** This method mutates `object`.
	   *
	   * @static
	   * @memberOf _
	   * @alias extendWith
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} sources The source objects.
	   * @param {Function} [customizer] The function to customize assigned values.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * function customizer(objValue, srcValue) {
	   *   return _.isUndefined(objValue) ? srcValue : objValue;
	   * }
	   *
	   * var defaults = _.partialRight(_.assignInWith, customizer);
	   *
	   * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	   * // => { 'a': 1, 'b': 2 }
	   */
	  var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	    copyObjectWith(source, keysIn(source), object, customizer);
	  });

	  /**
	   * Creates an object that inherits from the `prototype` object. If a `properties`
	   * object is given its own enumerable properties are assigned to the created object.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} prototype The object to inherit from.
	   * @param {Object} [properties] The properties to assign to the object.
	   * @returns {Object} Returns the new object.
	   * @example
	   *
	   * function Shape() {
	   *   this.x = 0;
	   *   this.y = 0;
	   * }
	   *
	   * function Circle() {
	   *   Shape.call(this);
	   * }
	   *
	   * Circle.prototype = _.create(Shape.prototype, {
	   *   'constructor': Circle
	   * });
	   *
	   * var circle = new Circle;
	   * circle instanceof Circle;
	   * // => true
	   *
	   * circle instanceof Shape;
	   * // => true
	   */
	  function create(prototype, properties) {
	    var result = baseCreate(prototype);
	    return properties ? assign(result, properties) : result;
	  }

	  /**
	   * Assigns own and inherited enumerable properties of source objects to the
	   * destination object for all destination properties that resolve to `undefined`.
	   * Source objects are applied from left to right. Once a property is set,
	   * additional values of the same property are ignored.
	   *
	   * **Note:** This method mutates `object`.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	   * // => { 'user': 'barney', 'age': 36 }
	   */
	  var defaults = rest(function(args) {
	    args.push(undefined, assignInDefaults);
	    return assignInWith.apply(undefined, args);
	  });

	  /**
	   * Checks if `path` is a direct property of `object`.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @param {Array|string} path The path to check.
	   * @returns {boolean} Returns `true` if `path` exists, else `false`.
	   * @example
	   *
	   * var object = { 'a': { 'b': { 'c': 3 } } };
	   * var other = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	   *
	   * _.has(object, 'a');
	   * // => true
	   *
	   * _.has(object, 'a.b.c');
	   * // => true
	   *
	   * _.has(object, ['a', 'b', 'c']);
	   * // => true
	   *
	   * _.has(other, 'a');
	   * // => false
	   */
	  function has(object, path) {
	    return object != null && hasOwnProperty.call(object, path);
	  }

	  /**
	   * Creates an array of the own enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects. See the
	   * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	   * for more details.
	   *
	   * @static
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
	    var isProto = isPrototype(object);
	    if (!(isProto || isArrayLike(object))) {
	      return baseKeys(object);
	    }
	    var indexes = indexKeys(object),
	        skipIndexes = !!indexes,
	        result = indexes || [],
	        length = result.length;

	    for (var key in object) {
	      if (hasOwnProperty.call(object, key) &&
	          !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	          !(isProto && key == 'constructor')) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  /**
	   * Creates an array of the own and inherited enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
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
	   * _.keysIn(new Foo);
	   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	   */
	  function keysIn(object) {
	    var index = -1,
	        isProto = isPrototype(object),
	        props = baseKeysIn(object),
	        propsLength = props.length,
	        indexes = indexKeys(object),
	        skipIndexes = !!indexes,
	        result = indexes || [],
	        length = result.length;

	    while (++index < propsLength) {
	      var key = props[index];
	      if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	          !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  /**
	   * Creates an object composed of the picked `object` properties.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The source object.
	   * @param {...(string|string[])} [props] The property names to pick, specified
	   *  individually or in arrays.
	   * @returns {Object} Returns the new object.
	   * @example
	   *
	   * var object = { 'a': 1, 'b': '2', 'c': 3 };
	   *
	   * _.pick(object, ['a', 'c']);
	   * // => { 'a': 1, 'c': 3 }
	   */
	  var pick = rest(function(object, props) {
	    return object == null ? {} : basePick(object, baseFlatten(props));
	  });

	  /**
	   * This method is like `_.get` except that if the resolved value is a function
	   * it's invoked with the `this` binding of its parent object and its result
	   * is returned.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @param {Array|string} path The path of the property to resolve.
	   * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	   * @returns {*} Returns the resolved value.
	   * @example
	   *
	   * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	   *
	   * _.result(object, 'a[0].b.c1');
	   * // => 3
	   *
	   * _.result(object, 'a[0].b.c2');
	   * // => 4
	   *
	   * _.result(object, 'a[0].b.c3', 'default');
	   * // => 'default'
	   *
	   * _.result(object, 'a[0].b.c3', _.constant('default'));
	   * // => 'default'
	   */
	  function result(object, path, defaultValue) {
	    var value = object == null ? undefined : object[path];
	    if (value === undefined) {
	      value = defaultValue;
	    }
	    return isFunction(value) ? value.call(object) : value;
	  }

	  /**
	   * Creates an array of the own enumerable property values of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property values.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.values(new Foo);
	   * // => [1, 2] (iteration order is not guaranteed)
	   *
	   * _.values('hi');
	   * // => ['h', 'i']
	   */
	  function values(object) {
	    return object ? baseValues(object, keys(object)) : [];
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
	   * their corresponding HTML entities.
	   *
	   * **Note:** No other characters are escaped. To escape additional
	   * characters use a third-party library like [_he_](https://mths.be/he).
	   *
	   * Though the ">" character is escaped for symmetry, characters like
	   * ">" and "/" don't need escaping in HTML and have no special meaning
	   * unless they're part of a tag or unquoted attribute value.
	   * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	   * (under "semi-related fun fact") for more details.
	   *
	   * Backticks are escaped because in IE < 9, they can break out of
	   * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	   * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	   * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
	   * for more details.
	   *
	   * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
	   * to reduce XSS vectors.
	   *
	   * @static
	   * @memberOf _
	   * @category String
	   * @param {string} [string=''] The string to escape.
	   * @returns {string} Returns the escaped string.
	   * @example
	   *
	   * _.escape('fred, barney, & pebbles');
	   * // => 'fred, barney, &amp; pebbles'
	   */
	  function escape(string) {
	    string = toString(string);
	    return (string && reHasUnescapedHtml.test(string))
	      ? string.replace(reUnescapedHtml, escapeHtmlChar)
	      : string;
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * This method returns the first argument given to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Util
	   * @param {*} value Any value.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * _.identity(object) === object;
	   * // => true
	   */
	  function identity(value) {
	    return value;
	  }

	  /**
	   * Creates a function that invokes `func` with the arguments of the created
	   * function. If `func` is a property name the created callback returns the
	   * property value for a given element. If `func` is an object the created
	   * callback returns `true` for elements that contain the equivalent object properties, otherwise it returns `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Util
	   * @param {*} [func=_.identity] The value to convert to a callback.
	   * @returns {Function} Returns the callback.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36 },
	   *   { 'user': 'fred',   'age': 40 }
	   * ];
	   *
	   * // Create custom iteratee shorthands.
	   * _.iteratee = _.wrap(_.iteratee, function(callback, func) {
	   *   var p = /^(\S+)\s*([<>])\s*(\S+)$/.exec(func);
	   *   return !p ? callback(func) : function(object) {
	   *     return (p[2] == '>' ? object[p[1]] > p[3] : object[p[1]] < p[3]);
	   *   };
	   * });
	   *
	   * _.filter(users, 'age > 36');
	   * // => [{ 'user': 'fred', 'age': 40 }]
	   */
	  var iteratee = baseIteratee;

	  /**
	   * Creates a function that performs a deep partial comparison between a given
	   * object and `source`, returning `true` if the given object has equivalent
	   * property values, else `false`.
	   *
	   * **Note:** This method supports comparing the same values as `_.isEqual`.
	   *
	   * @static
	   * @memberOf _
	   * @category Util
	   * @param {Object} source The object of property values to match.
	   * @returns {Function} Returns the new function.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36, 'active': true },
	   *   { 'user': 'fred',   'age': 40, 'active': false }
	   * ];
	   *
	   * _.filter(users, _.matches({ 'age': 40, 'active': false }));
	   * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
	   */
	  function matches(source) {
	    return baseMatches(assign({}, source));
	  }

	  /**
	   * Adds all own enumerable function properties of a source object to the
	   * destination object. If `object` is a function then methods are added to
	   * its prototype as well.
	   *
	   * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
	   * avoid conflicts caused by modifying the original.
	   *
	   * @static
	   * @memberOf _
	   * @category Util
	   * @param {Function|Object} [object=lodash] The destination object.
	   * @param {Object} source The object of functions to add.
	   * @param {Object} [options] The options object.
	   * @param {boolean} [options.chain=true] Specify whether the functions added
	   *  are chainable.
	   * @returns {Function|Object} Returns `object`.
	   * @example
	   *
	   * function vowels(string) {
	   *   return _.filter(string, function(v) {
	   *     return /[aeiou]/i.test(v);
	   *   });
	   * }
	   *
	   * _.mixin({ 'vowels': vowels });
	   * _.vowels('fred');
	   * // => ['e']
	   *
	   * _('fred').vowels().value();
	   * // => ['e']
	   *
	   * _.mixin({ 'vowels': vowels }, { 'chain': false });
	   * _('fred').vowels();
	   * // => ['e']
	   */
	  function mixin(object, source, options) {
	    var props = keys(source),
	        methodNames = baseFunctions(source, props);

	    if (options == null &&
	        !(isObject(source) && (methodNames.length || !props.length))) {
	      options = source;
	      source = object;
	      object = this;
	      methodNames = baseFunctions(source, keys(source));
	    }
	    var chain = (isObject(options) && 'chain' in options) ? options.chain : true,
	        isFunc = isFunction(object);

	    baseEach(methodNames, function(methodName) {
	      var func = source[methodName];
	      object[methodName] = func;
	      if (isFunc) {
	        object.prototype[methodName] = function() {
	          var chainAll = this.__chain__;
	          if (chain || chainAll) {
	            var result = object(this.__wrapped__),
	                actions = result.__actions__ = copyArray(this.__actions__);

	            actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
	            result.__chain__ = chainAll;
	            return result;
	          }
	          return func.apply(object, arrayPush([this.value()], arguments));
	        };
	      }
	    });

	    return object;
	  }

	  /**
	   * Reverts the `_` variable to its previous value and returns a reference to
	   * the `lodash` function.
	   *
	   * @static
	   * @memberOf _
	   * @category Util
	   * @returns {Function} Returns the `lodash` function.
	   * @example
	   *
	   * var lodash = _.noConflict();
	   */
	  function noConflict() {
	    if (root._ === this) {
	      root._ = oldDash;
	    }
	    return this;
	  }

	  /**
	   * A no-operation function that returns `undefined` regardless of the
	   * arguments it receives.
	   *
	   * @static
	   * @memberOf _
	   * @category Util
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * _.noop(object) === undefined;
	   * // => true
	   */
	  function noop() {
	    // No operation performed.
	  }

	  /**
	   * Generates a unique ID. If `prefix` is given the ID is appended to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Util
	   * @param {string} [prefix] The value to prefix the ID with.
	   * @returns {string} Returns the unique ID.
	   * @example
	   *
	   * _.uniqueId('contact_');
	   * // => 'contact_104'
	   *
	   * _.uniqueId();
	   * // => '105'
	   */
	  function uniqueId(prefix) {
	    var id = ++idCounter;
	    return toString(prefix) + id;
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Computes the maximum value of `array`. If `array` is empty or falsey
	   * `undefined` is returned.
	   *
	   * @static
	   * @memberOf _
	   * @category Math
	   * @param {Array} array The array to iterate over.
	   * @returns {*} Returns the maximum value.
	   * @example
	   *
	   * _.max([4, 2, 8, 6]);
	   * // => 8
	   *
	   * _.max([]);
	   * // => undefined
	   */
	  function max(array) {
	    return (array && array.length)
	      ? baseExtremum(array, identity, gt)
	      : undefined;
	  }

	  /**
	   * Computes the minimum value of `array`. If `array` is empty or falsey
	   * `undefined` is returned.
	   *
	   * @static
	   * @memberOf _
	   * @category Math
	   * @param {Array} array The array to iterate over.
	   * @returns {*} Returns the minimum value.
	   * @example
	   *
	   * _.min([4, 2, 8, 6]);
	   * // => 2
	   *
	   * _.min([]);
	   * // => undefined
	   */
	  function min(array) {
	    return (array && array.length)
	      ? baseExtremum(array, identity, lt)
	      : undefined;
	  }

	  /*------------------------------------------------------------------------*/

	  LodashWrapper.prototype = baseCreate(lodash.prototype);
	  LodashWrapper.prototype.constructor = LodashWrapper;

	  // Add functions that return wrapped values when chaining.
	  lodash.assignIn = assignIn;
	  lodash.before = before;
	  lodash.bind = bind;
	  lodash.chain = chain;
	  lodash.compact = compact;
	  lodash.concat = concat;
	  lodash.create = create;
	  lodash.defaults = defaults;
	  lodash.defer = defer;
	  lodash.delay = delay;
	  lodash.filter = filter;
	  lodash.flatten = flatten;
	  lodash.flattenDeep = flattenDeep;
	  lodash.iteratee = iteratee;
	  lodash.keys = keys;
	  lodash.map = map;
	  lodash.matches = matches;
	  lodash.mixin = mixin;
	  lodash.negate = negate;
	  lodash.once = once;
	  lodash.pick = pick;
	  lodash.slice = slice;
	  lodash.sortBy = sortBy;
	  lodash.tap = tap;
	  lodash.thru = thru;
	  lodash.toArray = toArray;
	  lodash.values = values;

	  // Add aliases.
	  lodash.extend = assignIn;

	  // Add functions to `lodash.prototype`.
	  mixin(lodash, lodash);

	  /*------------------------------------------------------------------------*/

	  // Add functions that return unwrapped values when chaining.
	  lodash.clone = clone;
	  lodash.escape = escape;
	  lodash.every = every;
	  lodash.find = find;
	  lodash.forEach = forEach;
	  lodash.has = has;
	  lodash.head = head;
	  lodash.identity = identity;
	  lodash.indexOf = indexOf;
	  lodash.isArguments = isArguments;
	  lodash.isArray = isArray;
	  lodash.isBoolean = isBoolean;
	  lodash.isDate = isDate;
	  lodash.isEmpty = isEmpty;
	  lodash.isEqual = isEqual;
	  lodash.isFinite = isFinite;
	  lodash.isFunction = isFunction;
	  lodash.isNaN = isNaN;
	  lodash.isNull = isNull;
	  lodash.isNumber = isNumber;
	  lodash.isObject = isObject;
	  lodash.isRegExp = isRegExp;
	  lodash.isString = isString;
	  lodash.isUndefined = isUndefined;
	  lodash.last = last;
	  lodash.max = max;
	  lodash.min = min;
	  lodash.noConflict = noConflict;
	  lodash.noop = noop;
	  lodash.reduce = reduce;
	  lodash.result = result;
	  lodash.size = size;
	  lodash.some = some;
	  lodash.uniqueId = uniqueId;

	  // Add aliases.
	  lodash.each = forEach;
	  lodash.first = head;

	  mixin(lodash, (function() {
	    var source = {};
	    baseForOwn(lodash, function(func, methodName) {
	      if (!hasOwnProperty.call(lodash.prototype, methodName)) {
	        source[methodName] = func;
	      }
	    });
	    return source;
	  }()), { 'chain': false });

	  /*------------------------------------------------------------------------*/

	  /**
	   * The semantic version number.
	   *
	   * @static
	   * @memberOf _
	   * @type string
	   */
	  lodash.VERSION = VERSION;

	  // Add `Array` and `String` methods to `lodash.prototype`.
	  baseEach(['pop', 'join', 'replace', 'reverse', 'split', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
	    var func = (/^(?:replace|split)$/.test(methodName) ? String.prototype : arrayProto)[methodName],
	        chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
	        retUnwrapped = /^(?:pop|join|replace|shift)$/.test(methodName);

	    lodash.prototype[methodName] = function() {
	      var args = arguments;
	      if (retUnwrapped && !this.__chain__) {
	        return func.apply(this.value(), args);
	      }
	      return this[chainName](function(value) {
	        return func.apply(value, args);
	      });
	    };
	  });

	  // Add chaining functions to the `lodash` wrapper.
	  lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

	  /*--------------------------------------------------------------------------*/

	  // Expose lodash on the free variable `window` or `self` when available. This
	  // prevents errors in cases where lodash is loaded by a script tag in the presence
	  // of an AMD loader. See http://requirejs.org/docs/errors.html#mismatch for more details.
	  (freeWindow || freeSelf || {})._ = lodash;

	  // Some AMD build optimizers like r.js check for condition patterns like the following:
	  if (true) {
	    // Define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return lodash;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
	  else if (freeExports && freeModule) {
	    // Export for Node.js.
	    if (moduleExports) {
	      (freeModule.exports = lodash)._ = lodash;
	    }
	    // Export for CommonJS support.
	    freeExports._ = lodash;
	  }
	  else {
	    // Export to the global object.
	    root._ = lodash;
	  }
	}.call(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module), (function() { return this; }())))

/***/ },

/***/ 18:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 22:
/***/ function(module, exports) {

	/*! Zepto 1.1.6 (generated with Zepto Builder) - zepto event - zeptojs.com/license */
	//     Zepto.js
	//     (c) 2010-2016 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT license.

	var Zepto = module.exports = (function() {
	    var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
	        document = window.document,
	        elementDisplay = {}, classCache = {},
	        cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
	        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	        rootNodeRE = /^(?:body|html)$/i,
	        capitalRE = /([A-Z])/g,

	    // special attributes that should be get/set via method calls
	        methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

	        adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
	        table = document.createElement('table'),
	        tableRow = document.createElement('tr'),
	        containers = {
	            'tr': document.createElement('tbody'),
	            'tbody': table, 'thead': table, 'tfoot': table,
	            'td': tableRow, 'th': tableRow,
	            '*': document.createElement('div')
	        },
	        readyRE = /complete|loaded|interactive/,
	        simpleSelectorRE = /^[\w-]*$/,
	        class2type = {},
	        toString = class2type.toString,
	        zepto = {},
	        camelize, uniq,
	        tempParent = document.createElement('div'),
	        propMap = {
	            'tabindex': 'tabIndex',
	            'readonly': 'readOnly',
	            'for': 'htmlFor',
	            'class': 'className',
	            'maxlength': 'maxLength',
	            'cellspacing': 'cellSpacing',
	            'cellpadding': 'cellPadding',
	            'rowspan': 'rowSpan',
	            'colspan': 'colSpan',
	            'usemap': 'useMap',
	            'frameborder': 'frameBorder',
	            'contenteditable': 'contentEditable'
	        },
	        isArray = Array.isArray ||
	            function(object){ return object instanceof Array }

	    zepto.matches = function(element, selector) {
	        if (!selector || !element || element.nodeType !== 1) return false
	        var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
	            element.oMatchesSelector || element.matchesSelector
	        if (matchesSelector) return matchesSelector.call(element, selector)
	        // fall back to performing a selector:
	        var match, parent = element.parentNode, temp = !parent
	        if (temp) (parent = tempParent).appendChild(element)
	        match = ~zepto.qsa(parent, selector).indexOf(element)
	        temp && tempParent.removeChild(element)
	        return match
	    }

	    function type(obj) {
	        return obj == null ? String(obj) :
	        class2type[toString.call(obj)] || "object"
	    }

	    function isFunction(value) { return type(value) == "function" }
	    function isWindow(obj)     { return obj != null && obj == obj.window }
	    function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
	    function isObject(obj)     { return type(obj) == "object" }
	    function isPlainObject(obj) {
	        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	    }
	    function likeArray(obj) { return typeof obj.length == 'number' }

	    function compact(array) { return filter.call(array, function(item){ return item != null }) }
	    function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
	    camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
	    function dasherize(str) {
	        return str.replace(/::/g, '/')
	            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
	            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
	            .replace(/_/g, '-')
	            .toLowerCase()
	    }
	    uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

	    function classRE(name) {
	        return name in classCache ?
	            classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	    }

	    function maybeAddPx(name, value) {
	        return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
	    }

	    function defaultDisplay(nodeName) {
	        var element, display
	        if (!elementDisplay[nodeName]) {
	            element = document.createElement(nodeName)
	            document.body.appendChild(element)
	            display = getComputedStyle(element, '').getPropertyValue("display")
	            element.parentNode.removeChild(element)
	            display == "none" && (display = "block")
	            elementDisplay[nodeName] = display
	        }
	        return elementDisplay[nodeName]
	    }

	    function children(element) {
	        return 'children' in element ?
	            slice.call(element.children) :
	            $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
	    }

	    function Z(dom, selector) {
	        var i, len = dom ? dom.length : 0
	        for (i = 0; i < len; i++) this[i] = dom[i]
	        this.length = len
	        this.selector = selector || ''
	    }

	    // `$.zepto.fragment` takes a html string and an optional tag name
	    // to generate DOM nodes from the given html string.
	    // The generated DOM nodes are returned as an array.
	    // This function can be overridden in plugins for example to make
	    // it compatible with browsers that don't support the DOM fully.
	    zepto.fragment = function(html, name, properties) {
	        var dom, nodes, container

	        // A special case optimization for a single tag
	        if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

	        if (!dom) {
	            if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
	            if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
	            if (!(name in containers)) name = '*'

	            container = containers[name]
	            container.innerHTML = '' + html
	            dom = $.each(slice.call(container.childNodes), function(){
	                container.removeChild(this)
	            })
	        }

	        if (isPlainObject(properties)) {
	            nodes = $(dom)
	            $.each(properties, function(key, value) {
	                if (methodAttributes.indexOf(key) > -1) nodes[key](value)
	                else nodes.attr(key, value)
	            })
	        }

	        return dom
	    }

	    // `$.zepto.Z` swaps out the prototype of the given `dom` array
	    // of nodes with `$.fn` and thus supplying all the Zepto functions
	    // to the array. This method can be overridden in plugins.
	    zepto.Z = function(dom, selector) {
	        return new Z(dom, selector)
	    }

	    // `$.zepto.isZ` should return `true` if the given object is a Zepto
	    // collection. This method can be overridden in plugins.
	    zepto.isZ = function(object) {
	        return object instanceof zepto.Z
	    }

	    // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	    // takes a CSS selector and an optional context (and handles various
	    // special cases).
	    // This method can be overridden in plugins.
	    zepto.init = function(selector, context) {
	        var dom
	        // If nothing given, return an empty Zepto collection
	        if (!selector) return zepto.Z()
	        // Optimize for string selectors
	        else if (typeof selector == 'string') {
	            selector = selector.trim()
	            // If it's a html fragment, create nodes from it
	            // Note: In both Chrome 21 and Firefox 15, DOM error 12
	            // is thrown if the fragment doesn't begin with <
	            if (selector[0] == '<' && fragmentRE.test(selector))
	                dom = zepto.fragment(selector, RegExp.$1, context), selector = null
	            // If there's a context, create a collection on that context first, and select
	            // nodes from there
	            else if (context !== undefined) return $(context).find(selector)
	            // If it's a CSS selector, use it to select nodes.
	            else dom = zepto.qsa(document, selector)
	        }
	        // If a function is given, call it when the DOM is ready
	        else if (isFunction(selector)) return $(document).ready(selector)
	        // If a Zepto collection is given, just return it
	        else if (zepto.isZ(selector)) return selector
	        else {
	            // normalize array if an array of nodes is given
	            if (isArray(selector)) dom = compact(selector)
	            // Wrap DOM nodes.
	            else if (isObject(selector))
	                dom = [selector], selector = null
	            // If it's a html fragment, create nodes from it
	            else if (fragmentRE.test(selector))
	                dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
	            // If there's a context, create a collection on that context first, and select
	            // nodes from there
	            else if (context !== undefined) return $(context).find(selector)
	            // And last but no least, if it's a CSS selector, use it to select nodes.
	            else dom = zepto.qsa(document, selector)
	        }
	        // create a new Zepto collection from the nodes found
	        return zepto.Z(dom, selector)
	    }

	    // `$` will be the base `Zepto` object. When calling this
	    // function just call `$.zepto.init, which makes the implementation
	    // details of selecting nodes and creating Zepto collections
	    // patchable in plugins.
	    $ = function(selector, context){
	        return zepto.init(selector, context)
	    }

	    function extend(target, source, deep) {
	        for (key in source)
	            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	                if (isPlainObject(source[key]) && !isPlainObject(target[key]))
	                    target[key] = {}
	                if (isArray(source[key]) && !isArray(target[key]))
	                    target[key] = []
	                extend(target[key], source[key], deep)
	            }
	            else if (source[key] !== undefined) target[key] = source[key]
	    }

	    // Copy all but undefined properties from one or more
	    // objects to the `target` object.
	    $.extend = function(target){
	        var deep, args = slice.call(arguments, 1)
	        if (typeof target == 'boolean') {
	            deep = target
	            target = args.shift()
	        }
	        args.forEach(function(arg){ extend(target, arg, deep) })
	        return target
	    }

	    // `$.zepto.qsa` is Zepto's CSS selector implementation which
	    // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	    // This method can be overridden in plugins.
	    zepto.qsa = function(element, selector){
	        var found,
	            maybeID = selector[0] == '#',
	            maybeClass = !maybeID && selector[0] == '.',
	            nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
	            isSimple = simpleSelectorRE.test(nameOnly)
	        return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
	            ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
	            (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
	                slice.call(
	                    isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
	                        maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	                            element.getElementsByTagName(selector) : // Or a tag
	                        element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	                )
	    }

	    function filtered(nodes, selector) {
	        return selector == null ? $(nodes) : $(nodes).filter(selector)
	    }

	    $.contains = document.documentElement.contains ?
	        function(parent, node) {
	            return parent !== node && parent.contains(node)
	        } :
	        function(parent, node) {
	            while (node && (node = node.parentNode))
	                if (node === parent) return true
	            return false
	        }

	    function funcArg(context, arg, idx, payload) {
	        return isFunction(arg) ? arg.call(context, idx, payload) : arg
	    }

	    function setAttribute(node, name, value) {
	        value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	    }

	    // access className property while respecting SVGAnimatedString
	    function className(node, value){
	        var klass = node.className || '',
	            svg   = klass && klass.baseVal !== undefined

	        if (value === undefined) return svg ? klass.baseVal : klass
	        svg ? (klass.baseVal = value) : (node.className = value)
	    }

	    // "true"  => true
	    // "false" => false
	    // "null"  => null
	    // "42"    => 42
	    // "42.5"  => 42.5
	    // "08"    => "08"
	    // JSON    => parse if valid
	    // String  => self
	    function deserializeValue(value) {
	        try {
	            return value ?
	            value == "true" ||
	            ( value == "false" ? false :
	                value == "null" ? null :
	                    +value + "" == value ? +value :
	                        /^[\[\{]/.test(value) ? $.parseJSON(value) :
	                            value )
	                : value
	        } catch(e) {
	            return value
	        }
	    }

	    $.type = type
	    $.isFunction = isFunction
	    $.isWindow = isWindow
	    $.isArray = isArray
	    $.isPlainObject = isPlainObject

	    $.isEmptyObject = function(obj) {
	        var name
	        for (name in obj) return false
	        return true
	    }

	    $.inArray = function(elem, array, i){
	        return emptyArray.indexOf.call(array, elem, i)
	    }

	    $.camelCase = camelize
	    $.trim = function(str) {
	        return str == null ? "" : String.prototype.trim.call(str)
	    }

	    // plugin compatibility
	    $.uuid = 0
	    $.support = { }
	    $.expr = { }
	    $.noop = function() {}

	    $.map = function(elements, callback){
	        var value, values = [], i, key
	        if (likeArray(elements))
	            for (i = 0; i < elements.length; i++) {
	                value = callback(elements[i], i)
	                if (value != null) values.push(value)
	            }
	        else
	            for (key in elements) {
	                value = callback(elements[key], key)
	                if (value != null) values.push(value)
	            }
	        return flatten(values)
	    }

	    $.each = function(elements, callback){
	        var i, key
	        if (likeArray(elements)) {
	            for (i = 0; i < elements.length; i++)
	                if (callback.call(elements[i], i, elements[i]) === false) return elements
	        } else {
	            for (key in elements)
	                if (callback.call(elements[key], key, elements[key]) === false) return elements
	        }

	        return elements
	    }

	    $.grep = function(elements, callback){
	        return filter.call(elements, callback)
	    }

	    if (window.JSON) $.parseJSON = JSON.parse

	    // Populate the class2type map
	    $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	        class2type[ "[object " + name + "]" ] = name.toLowerCase()
	    })

	    // Define methods that will be available on all
	    // Zepto collections
	    $.fn = {
	        constructor: zepto.Z,
	        length: 0,

	        // Because a collection acts like an array
	        // copy over these useful array functions.
	        forEach: emptyArray.forEach,
	        reduce: emptyArray.reduce,
	        push: emptyArray.push,
	        sort: emptyArray.sort,
	        splice: emptyArray.splice,
	        indexOf: emptyArray.indexOf,
	        concat: function(){
	            var i, value, args = []
	            for (i = 0; i < arguments.length; i++) {
	                value = arguments[i]
	                args[i] = zepto.isZ(value) ? value.toArray() : value
	            }
	            return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
	        },

	        // `map` and `slice` in the jQuery API work differently
	        // from their array counterparts
	        map: function(fn){
	            return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
	        },
	        slice: function(){
	            return $(slice.apply(this, arguments))
	        },

	        ready: function(callback){
	            // need to check if document.body exists for IE as that browser reports
	            // document ready when it hasn't yet created the body element
	            if (readyRE.test(document.readyState) && document.body) callback($)
	            else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
	            return this
	        },
	        get: function(idx){
	            return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
	        },
	        toArray: function(){ return this.get() },
	        size: function(){
	            return this.length
	        },
	        remove: function(){
	            return this.each(function(){
	                if (this.parentNode != null)
	                    this.parentNode.removeChild(this)
	            })
	        },
	        each: function(callback){
	            emptyArray.every.call(this, function(el, idx){
	                return callback.call(el, idx, el) !== false
	            })
	            return this
	        },
	        filter: function(selector){
	            if (isFunction(selector)) return this.not(this.not(selector))
	            return $(filter.call(this, function(element){
	                return zepto.matches(element, selector)
	            }))
	        },
	        add: function(selector,context){
	            return $(uniq(this.concat($(selector,context))))
	        },
	        is: function(selector){
	            return this.length > 0 && zepto.matches(this[0], selector)
	        },
	        not: function(selector){
	            var nodes=[]
	            if (isFunction(selector) && selector.call !== undefined)
	                this.each(function(idx){
	                    if (!selector.call(this,idx)) nodes.push(this)
	                })
	            else {
	                var excludes = typeof selector == 'string' ? this.filter(selector) :
	                    (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
	                this.forEach(function(el){
	                    if (excludes.indexOf(el) < 0) nodes.push(el)
	                })
	            }
	            return $(nodes)
	        },
	        has: function(selector){
	            return this.filter(function(){
	                return isObject(selector) ?
	                    $.contains(this, selector) :
	                    $(this).find(selector).size()
	            })
	        },
	        eq: function(idx){
	            return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
	        },
	        first: function(){
	            var el = this[0]
	            return el && !isObject(el) ? el : $(el)
	        },
	        last: function(){
	            var el = this[this.length - 1]
	            return el && !isObject(el) ? el : $(el)
	        },
	        find: function(selector){
	            var result, $this = this
	            if (!selector) result = $()
	            else if (typeof selector == 'object')
	                result = $(selector).filter(function(){
	                    var node = this
	                    return emptyArray.some.call($this, function(parent){
	                        return $.contains(parent, node)
	                    })
	                })
	            else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
	            else result = this.map(function(){ return zepto.qsa(this, selector) })
	            return result
	        },
	        closest: function(selector, context){
	            var node = this[0], collection = false
	            if (typeof selector == 'object') collection = $(selector)
	            while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
	                node = node !== context && !isDocument(node) && node.parentNode
	            return $(node)
	        },
	        parents: function(selector){
	            var ancestors = [], nodes = this
	            while (nodes.length > 0)
	                nodes = $.map(nodes, function(node){
	                    if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	                        ancestors.push(node)
	                        return node
	                    }
	                })
	            return filtered(ancestors, selector)
	        },
	        parent: function(selector){
	            return filtered(uniq(this.pluck('parentNode')), selector)
	        },
	        children: function(selector){
	            return filtered(this.map(function(){ return children(this) }), selector)
	        },
	        contents: function() {
	            return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
	        },
	        siblings: function(selector){
	            return filtered(this.map(function(i, el){
	                return filter.call(children(el.parentNode), function(child){ return child!==el })
	            }), selector)
	        },
	        empty: function(){
	            return this.each(function(){ this.innerHTML = '' })
	        },
	        // `pluck` is borrowed from Prototype.js
	        pluck: function(property){
	            return $.map(this, function(el){ return el[property] })
	        },
	        show: function(){
	            return this.each(function(){
	                this.style.display == "none" && (this.style.display = '')
	                if (getComputedStyle(this, '').getPropertyValue("display") == "none")
	                    this.style.display = defaultDisplay(this.nodeName)
	            })
	        },
	        replaceWith: function(newContent){
	            return this.before(newContent).remove()
	        },
	        wrap: function(structure){
	            var func = isFunction(structure)
	            if (this[0] && !func)
	                var dom   = $(structure).get(0),
	                    clone = dom.parentNode || this.length > 1

	            return this.each(function(index){
	                $(this).wrapAll(
	                    func ? structure.call(this, index) :
	                        clone ? dom.cloneNode(true) : dom
	                )
	            })
	        },
	        wrapAll: function(structure){
	            if (this[0]) {
	                $(this[0]).before(structure = $(structure))
	                var children
	                // drill down to the inmost element
	                while ((children = structure.children()).length) structure = children.first()
	                $(structure).append(this)
	            }
	            return this
	        },
	        wrapInner: function(structure){
	            var func = isFunction(structure)
	            return this.each(function(index){
	                var self = $(this), contents = self.contents(),
	                    dom  = func ? structure.call(this, index) : structure
	                contents.length ? contents.wrapAll(dom) : self.append(dom)
	            })
	        },
	        unwrap: function(){
	            this.parent().each(function(){
	                $(this).replaceWith($(this).children())
	            })
	            return this
	        },
	        clone: function(){
	            return this.map(function(){ return this.cloneNode(true) })
	        },
	        hide: function(){
	            return this.css("display", "none")
	        },
	        toggle: function(setting){
	            return this.each(function(){
	                var el = $(this)
	                    ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
	            })
	        },
	        prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
	        next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
	        html: function(html){
	            return 0 in arguments ?
	                this.each(function(idx){
	                    var originHtml = this.innerHTML
	                    $(this).empty().append( funcArg(this, html, idx, originHtml) )
	                }) :
	                (0 in this ? this[0].innerHTML : null)
	        },
	        text: function(text){
	            return 0 in arguments ?
	                this.each(function(idx){
	                    var newText = funcArg(this, text, idx, this.textContent)
	                    this.textContent = newText == null ? '' : ''+newText
	                }) :
	                (0 in this ? this.pluck('textContent').join("") : null)
	        },
	        attr: function(name, value){
	            var result
	            return (typeof name == 'string' && !(1 in arguments)) ?
	                (!this.length || this[0].nodeType !== 1 ? undefined :
	                        (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
	                ) :
	                this.each(function(idx){
	                    if (this.nodeType !== 1) return
	                    if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
	                    else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
	                })
	        },
	        removeAttr: function(name){
	            return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
	                setAttribute(this, attribute)
	            }, this)})
	        },
	        prop: function(name, value){
	            name = propMap[name] || name
	            return (1 in arguments) ?
	                this.each(function(idx){
	                    this[name] = funcArg(this, value, idx, this[name])
	                }) :
	                (this[0] && this[0][name])
	        },
	        data: function(name, value){
	            var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

	            var data = (1 in arguments) ?
	                this.attr(attrName, value) :
	                this.attr(attrName)

	            return data !== null ? deserializeValue(data) : undefined
	        },
	        val: function(value){
	            return 0 in arguments ?
	                this.each(function(idx){
	                    this.value = funcArg(this, value, idx, this.value)
	                }) :
	                (this[0] && (this[0].multiple ?
	                        $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
	                        this[0].value)
	                )
	        },
	        offset: function(coordinates){
	            if (coordinates) return this.each(function(index){
	                var $this = $(this),
	                    coords = funcArg(this, coordinates, index, $this.offset()),
	                    parentOffset = $this.offsetParent().offset(),
	                    props = {
	                        top:  coords.top  - parentOffset.top,
	                        left: coords.left - parentOffset.left
	                    }

	                if ($this.css('position') == 'static') props['position'] = 'relative'
	                $this.css(props)
	            })
	            if (!this.length) return null
	            if (!$.contains(document.documentElement, this[0]))
	                return {top: 0, left: 0}
	            var obj = this[0].getBoundingClientRect()
	            return {
	                left: obj.left + window.pageXOffset,
	                top: obj.top + window.pageYOffset,
	                width: Math.round(obj.width),
	                height: Math.round(obj.height)
	            }
	        },
	        css: function(property, value){
	            if (arguments.length < 2) {
	                var computedStyle, element = this[0]
	                if(!element) return
	                computedStyle = getComputedStyle(element, '')
	                if (typeof property == 'string')
	                    return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
	                else if (isArray(property)) {
	                    var props = {}
	                    $.each(property, function(_, prop){
	                        props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
	                    })
	                    return props
	                }
	            }

	            var css = ''
	            if (type(property) == 'string') {
	                if (!value && value !== 0)
	                    this.each(function(){ this.style.removeProperty(dasherize(property)) })
	                else
	                    css = dasherize(property) + ":" + maybeAddPx(property, value)
	            } else {
	                for (key in property)
	                    if (!property[key] && property[key] !== 0)
	                        this.each(function(){ this.style.removeProperty(dasherize(key)) })
	                    else
	                        css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
	            }

	            return this.each(function(){ this.style.cssText += ';' + css })
	        },
	        index: function(element){
	            return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
	        },
	        hasClass: function(name){
	            if (!name) return false
	            return emptyArray.some.call(this, function(el){
	                return this.test(className(el))
	            }, classRE(name))
	        },
	        addClass: function(name){
	            if (!name) return this
	            return this.each(function(idx){
	                if (!('className' in this)) return
	                classList = []
	                var cls = className(this), newName = funcArg(this, name, idx, cls)
	                newName.split(/\s+/g).forEach(function(klass){
	                    if (!$(this).hasClass(klass)) classList.push(klass)
	                }, this)
	                classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
	            })
	        },
	        removeClass: function(name){
	            return this.each(function(idx){
	                if (!('className' in this)) return
	                if (name === undefined) return className(this, '')
	                classList = className(this)
	                funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
	                    classList = classList.replace(classRE(klass), " ")
	                })
	                className(this, classList.trim())
	            })
	        },
	        toggleClass: function(name, when){
	            if (!name) return this
	            return this.each(function(idx){
	                var $this = $(this), names = funcArg(this, name, idx, className(this))
	                names.split(/\s+/g).forEach(function(klass){
	                    (when === undefined ? !$this.hasClass(klass) : when) ?
	                        $this.addClass(klass) : $this.removeClass(klass)
	                })
	            })
	        },
	        scrollTop: function(value){
	            if (!this.length) return
	            var hasScrollTop = 'scrollTop' in this[0]
	            if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
	            return this.each(hasScrollTop ?
	                function(){ this.scrollTop = value } :
	                function(){ this.scrollTo(this.scrollX, value) })
	        },
	        scrollLeft: function(value){
	            if (!this.length) return
	            var hasScrollLeft = 'scrollLeft' in this[0]
	            if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
	            return this.each(hasScrollLeft ?
	                function(){ this.scrollLeft = value } :
	                function(){ this.scrollTo(value, this.scrollY) })
	        },
	        position: function() {
	            if (!this.length) return

	            var elem = this[0],
	            // Get *real* offsetParent
	                offsetParent = this.offsetParent(),
	            // Get correct offsets
	                offset       = this.offset(),
	                parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

	            // Subtract element margins
	            // note: when an element has margin: auto the offsetLeft and marginLeft
	            // are the same in Safari causing offset.left to incorrectly be 0
	            offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
	            offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

	            // Add offsetParent borders
	            parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
	            parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

	            // Subtract the two offsets
	            return {
	                top:  offset.top  - parentOffset.top,
	                left: offset.left - parentOffset.left
	            }
	        },
	        offsetParent: function() {
	            return this.map(function(){
	                var parent = this.offsetParent || document.body
	                while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
	                    parent = parent.offsetParent
	                return parent
	            })
	        }
	    }

	    // for now
	    $.fn.detach = $.fn.remove

	        // Generate the `width` and `height` functions
	    ;['width', 'height'].forEach(function(dimension){
	        var dimensionProperty =
	            dimension.replace(/./, function(m){ return m[0].toUpperCase() })

	        $.fn[dimension] = function(value){
	            var offset, el = this[0]
	            if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
	                isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
	                (offset = this.offset()) && offset[dimension]
	            else return this.each(function(idx){
	                el = $(this)
	                el.css(dimension, funcArg(this, value, idx, el[dimension]()))
	            })
	        }
	    })

	    function traverseNode(node, fun) {
	        fun(node)
	        for (var i = 0, len = node.childNodes.length; i < len; i++)
	            traverseNode(node.childNodes[i], fun)
	    }

	    // Generate the `after`, `prepend`, `before`, `append`,
	    // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	    adjacencyOperators.forEach(function(operator, operatorIndex) {
	        var inside = operatorIndex % 2 //=> prepend, append

	        $.fn[operator] = function(){
	            // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	            var argType, nodes = $.map(arguments, function(arg) {
	                    argType = type(arg)
	                    return argType == "object" || argType == "array" || arg == null ?
	                        arg : zepto.fragment(arg)
	                }),
	                parent, copyByClone = this.length > 1
	            if (nodes.length < 1) return this

	            return this.each(function(_, target){
	                parent = inside ? target : target.parentNode

	                // convert all methods to a "before" operation
	                target = operatorIndex == 0 ? target.nextSibling :
	                    operatorIndex == 1 ? target.firstChild :
	                        operatorIndex == 2 ? target :
	                            null

	                var parentInDocument = $.contains(document.documentElement, parent)

	                nodes.forEach(function(node){
	                    if (copyByClone) node = node.cloneNode(true)
	                    else if (!parent) return $(node).remove()

	                    parent.insertBefore(node, target)
	                    if (parentInDocument) traverseNode(node, function(el){
	                        if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
	                            (!el.type || el.type === 'text/javascript') && !el.src)
	                            window['eval'].call(window, el.innerHTML)
	                    })
	                })
	            })
	        }

	        // after    => insertAfter
	        // prepend  => prependTo
	        // before   => insertBefore
	        // append   => appendTo
	        $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
	            $(html)[operator](this)
	            return this
	        }
	    })

	    zepto.Z.prototype = Z.prototype = $.fn

	    // Export internal API functions in the `$.zepto` namespace
	    zepto.uniq = uniq
	    zepto.deserializeValue = deserializeValue
	    $.zepto = zepto

	    return $
	})()

	// If `$` is not yet defined, point it to `Zepto`
	window.Zepto = Zepto
	window.$ === undefined && (window.$ = Zepto)
	//     Zepto.js
	//     (c) 2010-2016 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT license.

	;(function($){
	    var _zid = 1, undefined,
	        slice = Array.prototype.slice,
	        isFunction = $.isFunction,
	        isString = function(obj){ return typeof obj == 'string' },
	        handlers = {},
	        specialEvents={},
	        focusinSupported = 'onfocusin' in window,
	        focus = { focus: 'focusin', blur: 'focusout' },
	        hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

	    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

	    function zid(element) {
	        return element._zid || (element._zid = _zid++)
	    }
	    function findHandlers(element, event, fn, selector) {
	        event = parse(event)
	        if (event.ns) var matcher = matcherFor(event.ns)
	        return (handlers[zid(element)] || []).filter(function(handler) {
	            return handler
	                && (!event.e  || handler.e == event.e)
	                && (!event.ns || matcher.test(handler.ns))
	                && (!fn       || zid(handler.fn) === zid(fn))
	                && (!selector || handler.sel == selector)
	        })
	    }
	    function parse(event) {
	        var parts = ('' + event).split('.')
	        return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
	    }
	    function matcherFor(ns) {
	        return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
	    }

	    function eventCapture(handler, captureSetting) {
	        return handler.del &&
	            (!focusinSupported && (handler.e in focus)) ||
	            !!captureSetting
	    }

	    function realEvent(type) {
	        return hover[type] || (focusinSupported && focus[type]) || type
	    }

	    function add(element, events, fn, data, selector, delegator, capture){
	        var id = zid(element), set = (handlers[id] || (handlers[id] = []))
	        events.split(/\s/).forEach(function(event){
	            if (event == 'ready') return $(document).ready(fn)
	            var handler   = parse(event)
	            handler.fn    = fn
	            handler.sel   = selector
	            // emulate mouseenter, mouseleave
	            if (handler.e in hover) fn = function(e){
	                var related = e.relatedTarget
	                if (!related || (related !== this && !$.contains(this, related)))
	                    return handler.fn.apply(this, arguments)
	            }
	            handler.del   = delegator
	            var callback  = delegator || fn
	            handler.proxy = function(e){
	                e = compatible(e)
	                if (e.isImmediatePropagationStopped()) return
	                e.data = data
	                var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
	                if (result === false) e.preventDefault(), e.stopPropagation()
	                return result
	            }
	            handler.i = set.length
	            set.push(handler)
	            if ('addEventListener' in element)
	                element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	        })
	    }
	    function remove(element, events, fn, selector, capture){
	        var id = zid(element)
	            ;(events || '').split(/\s/).forEach(function(event){
	            findHandlers(element, event, fn, selector).forEach(function(handler){
	                delete handlers[id][handler.i]
	                if ('removeEventListener' in element)
	                    element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	            })
	        })
	    }

	    $.event = { add: add, remove: remove }

	    $.proxy = function(fn, context) {
	        var args = (2 in arguments) && slice.call(arguments, 2)
	        if (isFunction(fn)) {
	            var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
	            proxyFn._zid = zid(fn)
	            return proxyFn
	        } else if (isString(context)) {
	            if (args) {
	                args.unshift(fn[context], fn)
	                return $.proxy.apply(null, args)
	            } else {
	                return $.proxy(fn[context], fn)
	            }
	        } else {
	            throw new TypeError("expected function")
	        }
	    }

	    $.fn.bind = function(event, data, callback){
	        return this.on(event, data, callback)
	    }
	    $.fn.unbind = function(event, callback){
	        return this.off(event, callback)
	    }
	    $.fn.one = function(event, selector, data, callback){
	        return this.on(event, selector, data, callback, 1)
	    }

	    var returnTrue = function(){return true},
	        returnFalse = function(){return false},
	        ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	        eventMethods = {
	            preventDefault: 'isDefaultPrevented',
	            stopImmediatePropagation: 'isImmediatePropagationStopped',
	            stopPropagation: 'isPropagationStopped'
	        }

	    function compatible(event, source) {
	        if (source || !event.isDefaultPrevented) {
	            source || (source = event)

	            $.each(eventMethods, function(name, predicate) {
	                var sourceMethod = source[name]
	                event[name] = function(){
	                    this[predicate] = returnTrue
	                    return sourceMethod && sourceMethod.apply(source, arguments)
	                }
	                event[predicate] = returnFalse
	            })

	            if (source.defaultPrevented !== undefined ? source.defaultPrevented :
	                    'returnValue' in source ? source.returnValue === false :
	                    source.getPreventDefault && source.getPreventDefault())
	                event.isDefaultPrevented = returnTrue
	        }
	        return event
	    }

	    function createProxy(event) {
	        var key, proxy = { originalEvent: event }
	        for (key in event)
	            if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

	        return compatible(proxy, event)
	    }

	    $.fn.delegate = function(selector, event, callback){
	        return this.on(event, selector, callback)
	    }
	    $.fn.undelegate = function(selector, event, callback){
	        return this.off(event, selector, callback)
	    }

	    $.fn.live = function(event, callback){
	        $(document.body).delegate(this.selector, event, callback)
	        return this
	    }
	    $.fn.die = function(event, callback){
	        $(document.body).undelegate(this.selector, event, callback)
	        return this
	    }

	    $.fn.on = function(event, selector, data, callback, one){
	        var autoRemove, delegator, $this = this
	        if (event && !isString(event)) {
	            $.each(event, function(type, fn){
	                $this.on(type, selector, data, fn, one)
	            })
	            return $this
	        }

	        if (!isString(selector) && !isFunction(callback) && callback !== false)
	            callback = data, data = selector, selector = undefined
	        if (callback === undefined || data === false)
	            callback = data, data = undefined

	        if (callback === false) callback = returnFalse

	        return $this.each(function(_, element){
	            if (one) autoRemove = function(e){
	                remove(element, e.type, callback)
	                return callback.apply(this, arguments)
	            }

	            if (selector) delegator = function(e){
	                var evt, match = $(e.target).closest(selector, element).get(0)
	                if (match && match !== element) {
	                    evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
	                    return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
	                }
	            }

	            add(element, event, callback, data, selector, delegator || autoRemove)
	        })
	    }
	    $.fn.off = function(event, selector, callback){
	        var $this = this
	        if (event && !isString(event)) {
	            $.each(event, function(type, fn){
	                $this.off(type, selector, fn)
	            })
	            return $this
	        }

	        if (!isString(selector) && !isFunction(callback) && callback !== false)
	            callback = selector, selector = undefined

	        if (callback === false) callback = returnFalse

	        return $this.each(function(){
	            remove(this, event, callback, selector)
	        })
	    }

	    $.fn.trigger = function(event, args){
	        event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
	        event._args = args
	        return this.each(function(){
	            // handle focus(), blur() by calling them directly
	            if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
	            // items in the collection might not be DOM elements
	            else if ('dispatchEvent' in this) this.dispatchEvent(event)
	            else $(this).triggerHandler(event, args)
	        })
	    }

	    // triggers event handlers on current element just as if an event occurred,
	    // doesn't trigger an actual event, doesn't bubble
	    $.fn.triggerHandler = function(event, args){
	        var e, result
	        this.each(function(i, element){
	            e = createProxy(isString(event) ? $.Event(event) : event)
	            e._args = args
	            e.target = element
	            $.each(findHandlers(element, event.type || event), function(i, handler){
	                result = handler.proxy(e)
	                if (e.isImmediatePropagationStopped()) return false
	            })
	        })
	        return result
	    }

	        // shortcut methods for `.bind(event, fn)` for each event type
	    ;('focusin focusout focus blur load resize scroll unload click dblclick '+
	    'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
	    'change select keydown keypress keyup error').split(' ').forEach(function(event) {
	        $.fn[event] = function(callback) {
	            return (0 in arguments) ?
	                this.bind(event, callback) :
	                this.trigger(event)
	        }
	    })

	    $.Event = function(type, props) {
	        if (!isString(type)) props = type, type = props.type
	        var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
	        if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
	        event.initEvent(type, bubbles, true)
	        return compatible(event)
	    }

	})(Zepto)


/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {//     Backbone.js 1.2.3

	//     (c) 2010-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Backbone may be freely distributed under the MIT license.
	//     For all details and documentation:
	//     http://backbonejs.org

	(function(factory) {

	  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
	  // We use `self` instead of `window` for `WebWorker` support.
	  var root = (typeof self == 'object' && self.self == self && self) ||
	            (typeof global == 'object' && global.global == global && global);

	  // Set up Backbone appropriately for the environment. Start with AMD.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(17), __webpack_require__(22), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function(_, $, exports) {
	      // Export global even in AMD case in case this script is loaded with
	      // others that may still expect a global Backbone.
	      root.Backbone = factory(root, exports, _, $);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
	  } else if (typeof exports !== 'undefined') {
	    var _ = require('underscore'), $;
	    try { $ = require('jquery'); } catch(e) {}
	    factory(root, exports, _, $);

	  // Finally, as a browser global.
	  } else {
	    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
	  }

	}(function(root, Backbone, _, $) {

	  // Initial Setup
	  // -------------

	  // Save the previous value of the `Backbone` variable, so that it can be
	  // restored later on, if `noConflict` is used.
	  var previousBackbone = root.Backbone;

	  // Create a local reference to a common array method we'll want to use later.
	  var slice = Array.prototype.slice;

	  // Current version of the library. Keep in sync with `package.json`.
	  Backbone.VERSION = '1.2.3';

	  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
	  // the `$` variable.
	  Backbone.$ = $;

	  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
	  // to its previous owner. Returns a reference to this Backbone object.
	  Backbone.noConflict = function() {
	    root.Backbone = previousBackbone;
	    return this;
	  };

	  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
	  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
	  // set a `X-Http-Method-Override` header.
	  Backbone.emulateHTTP = false;

	  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
	  // `application/json` requests ... this will encode the body as
	  // `application/x-www-form-urlencoded` instead and will send the model in a
	  // form param named `model`.
	  Backbone.emulateJSON = false;

	  // Proxy Backbone class methods to Underscore functions, wrapping the model's
	  // `attributes` object or collection's `models` array behind the scenes.
	  //
	  // collection.filter(function(model) { return model.get('age') > 10 });
	  // collection.each(this.addView);
	  //
	  // `Function#apply` can be slow so we use the method's arg count, if we know it.
	  var addMethod = function(length, method, attribute) {
	    switch (length) {
	      case 1: return function() {
	        return _[method](this[attribute]);
	      };
	      case 2: return function(value) {
	        return _[method](this[attribute], value);
	      };
	      case 3: return function(iteratee, context) {
	        return _[method](this[attribute], cb(iteratee, this), context);
	      };
	      case 4: return function(iteratee, defaultVal, context) {
	        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
	      };
	      default: return function() {
	        var args = slice.call(arguments);
	        args.unshift(this[attribute]);
	        return _[method].apply(_, args);
	      };
	    }
	  };
	  var addUnderscoreMethods = function(Class, methods, attribute) {
	    _.each(methods, function(length, method) {
	      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
	    });
	  };

	  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
	  var cb = function(iteratee, instance) {
	    if (_.isFunction(iteratee)) return iteratee;
	    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
	    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
	    return iteratee;
	  };
	  var modelMatcher = function(attrs) {
	    var matcher = _.matches(attrs);
	    return function(model) {
	      return matcher(model.attributes);
	    };
	  };

	  // Backbone.Events
	  // ---------------

	  // A module that can be mixed in to *any object* in order to provide it with
	  // a custom event channel. You may bind a callback to an event with `on` or
	  // remove with `off`; `trigger`-ing an event fires all callbacks in
	  // succession.
	  //
	  //     var object = {};
	  //     _.extend(object, Backbone.Events);
	  //     object.on('expand', function(){ alert('expanded'); });
	  //     object.trigger('expand');
	  //
	  var Events = Backbone.Events = {};

	  // Regular expression used to split event strings.
	  var eventSplitter = /\s+/;

	  // Iterates over the standard `event, callback` (as well as the fancy multiple
	  // space-separated events `"change blur", callback` and jQuery-style event
	  // maps `{event: callback}`).
	  var eventsApi = function(iteratee, events, name, callback, opts) {
	    var i = 0, names;
	    if (name && typeof name === 'object') {
	      // Handle event maps.
	      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
	      for (names = _.keys(name); i < names.length ; i++) {
	        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	      }
	    } else if (name && eventSplitter.test(name)) {
	      // Handle space separated event names by delegating them individually.
	      for (names = name.split(eventSplitter); i < names.length; i++) {
	        events = iteratee(events, names[i], callback, opts);
	      }
	    } else {
	      // Finally, standard events.
	      events = iteratee(events, name, callback, opts);
	    }
	    return events;
	  };

	  // Bind an event to a `callback` function. Passing `"all"` will bind
	  // the callback to all events fired.
	  Events.on = function(name, callback, context) {
	    return internalOn(this, name, callback, context);
	  };

	  // Guard the `listening` argument from the public API.
	  var internalOn = function(obj, name, callback, context, listening) {
	    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
	        context: context,
	        ctx: obj,
	        listening: listening
	    });

	    if (listening) {
	      var listeners = obj._listeners || (obj._listeners = {});
	      listeners[listening.id] = listening;
	    }

	    return obj;
	  };

	  // Inversion-of-control versions of `on`. Tell *this* object to listen to
	  // an event in another object... keeping track of what it's listening to
	  // for easier unbinding later.
	  Events.listenTo =  function(obj, name, callback) {
	    if (!obj) return this;
	    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var listening = listeningTo[id];

	    // This object is not listening to any other events on `obj` yet.
	    // Setup the necessary references to track the listening callbacks.
	    if (!listening) {
	      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
	      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
	    }

	    // Bind callbacks on obj, and keep track of them on listening.
	    internalOn(obj, name, callback, this, listening);
	    return this;
	  };

	  // The reducing API that adds a callback to the `events` object.
	  var onApi = function(events, name, callback, options) {
	    if (callback) {
	      var handlers = events[name] || (events[name] = []);
	      var context = options.context, ctx = options.ctx, listening = options.listening;
	      if (listening) listening.count++;

	      handlers.push({ callback: callback, context: context, ctx: context || ctx, listening: listening });
	    }
	    return events;
	  };

	  // Remove one or many callbacks. If `context` is null, removes all
	  // callbacks with that function. If `callback` is null, removes all
	  // callbacks for the event. If `name` is null, removes all bound
	  // callbacks for all events.
	  Events.off =  function(name, callback, context) {
	    if (!this._events) return this;
	    this._events = eventsApi(offApi, this._events, name, callback, {
	        context: context,
	        listeners: this._listeners
	    });
	    return this;
	  };

	  // Tell this object to stop listening to either specific events ... or
	  // to every object it's currently listening to.
	  Events.stopListening =  function(obj, name, callback) {
	    var listeningTo = this._listeningTo;
	    if (!listeningTo) return this;

	    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

	    for (var i = 0; i < ids.length; i++) {
	      var listening = listeningTo[ids[i]];

	      // If listening doesn't exist, this object is not currently
	      // listening to obj. Break out early.
	      if (!listening) break;

	      listening.obj.off(name, callback, this);
	    }
	    if (_.isEmpty(listeningTo)) this._listeningTo = void 0;

	    return this;
	  };

	  // The reducing API that removes a callback from the `events` object.
	  var offApi = function(events, name, callback, options) {
	    if (!events) return;

	    var i = 0, listening;
	    var context = options.context, listeners = options.listeners;

	    // Delete all events listeners and "drop" events.
	    if (!name && !callback && !context) {
	      var ids = _.keys(listeners);
	      for (; i < ids.length; i++) {
	        listening = listeners[ids[i]];
	        delete listeners[listening.id];
	        delete listening.listeningTo[listening.objId];
	      }
	      return;
	    }

	    var names = name ? [name] : _.keys(events);
	    for (; i < names.length; i++) {
	      name = names[i];
	      var handlers = events[name];

	      // Bail out if there are no events stored.
	      if (!handlers) break;

	      // Replace events if there are any remaining.  Otherwise, clean up.
	      var remaining = [];
	      for (var j = 0; j < handlers.length; j++) {
	        var handler = handlers[j];
	        if (
	          callback && callback !== handler.callback &&
	            callback !== handler.callback._callback ||
	              context && context !== handler.context
	        ) {
	          remaining.push(handler);
	        } else {
	          listening = handler.listening;
	          if (listening && --listening.count === 0) {
	            delete listeners[listening.id];
	            delete listening.listeningTo[listening.objId];
	          }
	        }
	      }

	      // Update tail event if the list has any events.  Otherwise, clean up.
	      if (remaining.length) {
	        events[name] = remaining;
	      } else {
	        delete events[name];
	      }
	    }
	    if (_.size(events)) return events;
	  };

	  // Bind an event to only be triggered a single time. After the first time
	  // the callback is invoked, its listener will be removed. If multiple events
	  // are passed in using the space-separated syntax, the handler will fire
	  // once for each event, not once for a combination of all events.
	  Events.once =  function(name, callback, context) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
	    return this.on(events, void 0, context);
	  };

	  // Inversion-of-control versions of `once`.
	  Events.listenToOnce =  function(obj, name, callback) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
	    return this.listenTo(obj, events);
	  };

	  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
	  // `offer` unbinds the `onceWrapper` after it has been called.
	  var onceMap = function(map, name, callback, offer) {
	    if (callback) {
	      var once = map[name] = _.once(function() {
	        offer(name, once);
	        callback.apply(this, arguments);
	      });
	      once._callback = callback;
	    }
	    return map;
	  };

	  // Trigger one or many events, firing all bound callbacks. Callbacks are
	  // passed the same arguments as `trigger` is, apart from the event name
	  // (unless you're listening on `"all"`, which will cause your callback to
	  // receive the true name of the event as the first argument).
	  Events.trigger =  function(name) {
	    if (!this._events) return this;

	    var length = Math.max(0, arguments.length - 1);
	    var args = Array(length);
	    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

	    eventsApi(triggerApi, this._events, name, void 0, args);
	    return this;
	  };

	  // Handles triggering the appropriate event callbacks.
	  var triggerApi = function(objEvents, name, cb, args) {
	    if (objEvents) {
	      var events = objEvents[name];
	      var allEvents = objEvents.all;
	      if (events && allEvents) allEvents = allEvents.slice();
	      if (events) triggerEvents(events, args);
	      if (allEvents) triggerEvents(allEvents, [name].concat(args));
	    }
	    return objEvents;
	  };

	  // A difficult-to-believe, but optimized internal dispatch function for
	  // triggering events. Tries to keep the usual cases speedy (most internal
	  // Backbone events have 3 arguments).
	  var triggerEvents = function(events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
	      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
	      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
	      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
	      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
	    }
	  };

	  // Aliases for backwards compatibility.
	  Events.bind   = Events.on;
	  Events.unbind = Events.off;

	  // Allow the `Backbone` object to serve as a global event bus, for folks who
	  // want global "pubsub" in a convenient place.
	  _.extend(Backbone, Events);

	  // Backbone.Model
	  // --------------

	  // Backbone **Models** are the basic data object in the framework --
	  // frequently representing a row in a table in a database on your server.
	  // A discrete chunk of data and a bunch of useful, related methods for
	  // performing computations and transformations on that data.

	  // Create a new model with the specified attributes. A client id (`cid`)
	  // is automatically generated and assigned for you.
	  var Model = Backbone.Model = function(attributes, options) {
	    var attrs = attributes || {};
	    options || (options = {});
	    this.cid = _.uniqueId(this.cidPrefix);
	    this.attributes = {};
	    if (options.collection) this.collection = options.collection;
	    if (options.parse) attrs = this.parse(attrs, options) || {};
	    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
	    this.set(attrs, options);
	    this.changed = {};
	    this.initialize.apply(this, arguments);
	  };

	  // Attach all inheritable methods to the Model prototype.
	  _.extend(Model.prototype, Events, {

	    // A hash of attributes whose current and previous value differ.
	    changed: null,

	    // The value returned during the last failed validation.
	    validationError: null,

	    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
	    // CouchDB users may want to set this to `"_id"`.
	    idAttribute: 'id',

	    // The prefix is used to create the client id which is used to identify models locally.
	    // You may want to override this if you're experiencing name clashes with model ids.
	    cidPrefix: 'c',

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // Return a copy of the model's `attributes` object.
	    toJSON: function(options) {
	      return _.clone(this.attributes);
	    },

	    // Proxy `Backbone.sync` by default -- but override this if you need
	    // custom syncing semantics for *this* particular model.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Get the value of an attribute.
	    get: function(attr) {
	      return this.attributes[attr];
	    },

	    // Get the HTML-escaped value of an attribute.
	    escape: function(attr) {
	      return _.escape(this.get(attr));
	    },

	    // Returns `true` if the attribute contains a value that is not null
	    // or undefined.
	    has: function(attr) {
	      return this.get(attr) != null;
	    },

	    // Special-cased proxy to underscore's `_.matches` method.
	    matches: function(attrs) {
	      return !!_.iteratee(attrs, this)(this.attributes);
	    },

	    // Set a hash of model attributes on the object, firing `"change"`. This is
	    // the core primitive operation of a model, updating the data and notifying
	    // anyone who needs to know about the change in state. The heart of the beast.
	    set: function(key, val, options) {
	      if (key == null) return this;

	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options || (options = {});

	      // Run validation.
	      if (!this._validate(attrs, options)) return false;

	      // Extract attributes and options.
	      var unset      = options.unset;
	      var silent     = options.silent;
	      var changes    = [];
	      var changing   = this._changing;
	      this._changing = true;

	      if (!changing) {
	        this._previousAttributes = _.clone(this.attributes);
	        this.changed = {};
	      }

	      var current = this.attributes;
	      var changed = this.changed;
	      var prev    = this._previousAttributes;

	      // For each `set` attribute, update or delete the current value.
	      for (var attr in attrs) {
	        val = attrs[attr];
	        if (!_.isEqual(current[attr], val)) changes.push(attr);
	        if (!_.isEqual(prev[attr], val)) {
	          changed[attr] = val;
	        } else {
	          delete changed[attr];
	        }
	        unset ? delete current[attr] : current[attr] = val;
	      }

	      // Update the `id`.
	      this.id = this.get(this.idAttribute);

	      // Trigger all relevant attribute changes.
	      if (!silent) {
	        if (changes.length) this._pending = options;
	        for (var i = 0; i < changes.length; i++) {
	          this.trigger('change:' + changes[i], this, current[changes[i]], options);
	        }
	      }

	      // You might be wondering why there's a `while` loop here. Changes can
	      // be recursively nested within `"change"` events.
	      if (changing) return this;
	      if (!silent) {
	        while (this._pending) {
	          options = this._pending;
	          this._pending = false;
	          this.trigger('change', this, options);
	        }
	      }
	      this._pending = false;
	      this._changing = false;
	      return this;
	    },

	    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
	    // if the attribute doesn't exist.
	    unset: function(attr, options) {
	      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
	    },

	    // Clear all attributes on the model, firing `"change"`.
	    clear: function(options) {
	      var attrs = {};
	      for (var key in this.attributes) attrs[key] = void 0;
	      return this.set(attrs, _.extend({}, options, {unset: true}));
	    },

	    // Determine if the model has changed since the last `"change"` event.
	    // If you specify an attribute name, determine if that attribute has changed.
	    hasChanged: function(attr) {
	      if (attr == null) return !_.isEmpty(this.changed);
	      return _.has(this.changed, attr);
	    },

	    // Return an object containing all the attributes that have changed, or
	    // false if there are no changed attributes. Useful for determining what
	    // parts of a view need to be updated and/or what attributes need to be
	    // persisted to the server. Unset attributes will be set to undefined.
	    // You can also pass an attributes object to diff against the model,
	    // determining if there *would be* a change.
	    changedAttributes: function(diff) {
	      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
	      var old = this._changing ? this._previousAttributes : this.attributes;
	      var changed = {};
	      for (var attr in diff) {
	        var val = diff[attr];
	        if (_.isEqual(old[attr], val)) continue;
	        changed[attr] = val;
	      }
	      return _.size(changed) ? changed : false;
	    },

	    // Get the previous value of an attribute, recorded at the time the last
	    // `"change"` event was fired.
	    previous: function(attr) {
	      if (attr == null || !this._previousAttributes) return null;
	      return this._previousAttributes[attr];
	    },

	    // Get all of the attributes of the model at the time of the previous
	    // `"change"` event.
	    previousAttributes: function() {
	      return _.clone(this._previousAttributes);
	    },

	    // Fetch the model from the server, merging the response with the model's
	    // local attributes. Any changed attributes will trigger a "change" event.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var model = this;
	      var success = options.success;
	      options.success = function(resp) {
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (!model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Set a hash of model attributes, and sync the model to the server.
	    // If the server returns an attributes hash that differs, the model's
	    // state will be `set` again.
	    save: function(key, val, options) {
	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (key == null || typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options = _.extend({validate: true, parse: true}, options);
	      var wait = options.wait;

	      // If we're not waiting and attributes exist, save acts as
	      // `set(attr).save(null, opts)` with validation. Otherwise, check if
	      // the model will be valid when the attributes, if any, are set.
	      if (attrs && !wait) {
	        if (!this.set(attrs, options)) return false;
	      } else {
	        if (!this._validate(attrs, options)) return false;
	      }

	      // After a successful server-side save, the client is (optionally)
	      // updated with the server-side state.
	      var model = this;
	      var success = options.success;
	      var attributes = this.attributes;
	      options.success = function(resp) {
	        // Ensure attributes are restored during synchronous saves.
	        model.attributes = attributes;
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
	        if (serverAttrs && !model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);

	      // Set temporary attributes if `{wait: true}` to properly find new ids.
	      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

	      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
	      if (method === 'patch' && !options.attrs) options.attrs = attrs;
	      var xhr = this.sync(method, this, options);

	      // Restore attributes.
	      this.attributes = attributes;

	      return xhr;
	    },

	    // Destroy this model on the server if it was already persisted.
	    // Optimistically removes the model from its collection, if it has one.
	    // If `wait: true` is passed, waits for the server to respond before removal.
	    destroy: function(options) {
	      options = options ? _.clone(options) : {};
	      var model = this;
	      var success = options.success;
	      var wait = options.wait;

	      var destroy = function() {
	        model.stopListening();
	        model.trigger('destroy', model, model.collection, options);
	      };

	      options.success = function(resp) {
	        if (wait) destroy();
	        if (success) success.call(options.context, model, resp, options);
	        if (!model.isNew()) model.trigger('sync', model, resp, options);
	      };

	      var xhr = false;
	      if (this.isNew()) {
	        _.defer(options.success);
	      } else {
	        wrapError(this, options);
	        xhr = this.sync('delete', this, options);
	      }
	      if (!wait) destroy();
	      return xhr;
	    },

	    // Default URL for the model's representation on the server -- if you're
	    // using Backbone's restful methods, override this to change the endpoint
	    // that will be called.
	    url: function() {
	      var base =
	        _.result(this, 'urlRoot') ||
	        _.result(this.collection, 'url') ||
	        urlError();
	      if (this.isNew()) return base;
	      var id = this.get(this.idAttribute);
	      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
	    },

	    // **parse** converts a response into the hash of attributes to be `set` on
	    // the model. The default implementation is just to pass the response along.
	    parse: function(resp, options) {
	      return resp;
	    },

	    // Create a new model with identical attributes to this one.
	    clone: function() {
	      return new this.constructor(this.attributes);
	    },

	    // A model is new if it has never been saved to the server, and lacks an id.
	    isNew: function() {
	      return !this.has(this.idAttribute);
	    },

	    // Check if the model is currently in a valid state.
	    isValid: function(options) {
	      return this._validate({}, _.defaults({validate: true}, options));
	    },

	    // Run validation against the next complete set of model attributes,
	    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
	    _validate: function(attrs, options) {
	      if (!options.validate || !this.validate) return true;
	      attrs = _.extend({}, this.attributes, attrs);
	      var error = this.validationError = this.validate(attrs, options) || null;
	      if (!error) return true;
	      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
	      return false;
	    }

	  });

	  // Underscore methods that we want to implement on the Model, mapped to the
	  // number of arguments they take.
	  var modelMethods = { keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
	      omit: 0, chain: 1, isEmpty: 1 };

	  // Mix in each Underscore method as a proxy to `Model#attributes`.
	  addUnderscoreMethods(Model, modelMethods, 'attributes');

	  // Backbone.Collection
	  // -------------------

	  // If models tend to represent a single row of data, a Backbone Collection is
	  // more analogous to a table full of data ... or a small slice or page of that
	  // table, or a collection of rows that belong together for a particular reason
	  // -- all of the messages in this particular folder, all of the documents
	  // belonging to this particular author, and so on. Collections maintain
	  // indexes of their models, both in order, and for lookup by `id`.

	  // Create a new **Collection**, perhaps to contain a specific type of `model`.
	  // If a `comparator` is specified, the Collection will maintain
	  // its models in sort order, as they're added and removed.
	  var Collection = Backbone.Collection = function(models, options) {
	    options || (options = {});
	    if (options.model) this.model = options.model;
	    if (options.comparator !== void 0) this.comparator = options.comparator;
	    this._reset();
	    this.initialize.apply(this, arguments);
	    if (models) this.reset(models, _.extend({silent: true}, options));
	  };

	  // Default options for `Collection#set`.
	  var setOptions = {add: true, remove: true, merge: true};
	  var addOptions = {add: true, remove: false};

	  // Splices `insert` into `array` at index `at`.
	  var splice = function(array, insert, at) {
	    at = Math.min(Math.max(at, 0), array.length);
	    var tail = Array(array.length - at);
	    var length = insert.length;
	    for (var i = 0; i < tail.length; i++) tail[i] = array[i + at];
	    for (i = 0; i < length; i++) array[i + at] = insert[i];
	    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
	  };

	  // Define the Collection's inheritable methods.
	  _.extend(Collection.prototype, Events, {

	    // The default model for a collection is just a **Backbone.Model**.
	    // This should be overridden in most cases.
	    model: Model,

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // The JSON representation of a Collection is an array of the
	    // models' attributes.
	    toJSON: function(options) {
	      return this.map(function(model) { return model.toJSON(options); });
	    },

	    // Proxy `Backbone.sync` by default.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Add a model, or list of models to the set. `models` may be Backbone
	    // Models or raw JavaScript objects to be converted to Models, or any
	    // combination of the two.
	    add: function(models, options) {
	      return this.set(models, _.extend({merge: false}, options, addOptions));
	    },

	    // Remove a model, or a list of models from the set.
	    remove: function(models, options) {
	      options = _.extend({}, options);
	      var singular = !_.isArray(models);
	      models = singular ? [models] : _.clone(models);
	      var removed = this._removeModels(models, options);
	      if (!options.silent && removed) this.trigger('update', this, options);
	      return singular ? removed[0] : removed;
	    },

	    // Update a collection by `set`-ing a new list of models, adding new ones,
	    // removing models that are no longer present, and merging models that
	    // already exist in the collection, as necessary. Similar to **Model#set**,
	    // the core operation for updating the data contained by the collection.
	    set: function(models, options) {
	      if (models == null) return;

	      options = _.defaults({}, options, setOptions);
	      if (options.parse && !this._isModel(models)) models = this.parse(models, options);

	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();

	      var at = options.at;
	      if (at != null) at = +at;
	      if (at < 0) at += this.length + 1;

	      var set = [];
	      var toAdd = [];
	      var toRemove = [];
	      var modelMap = {};

	      var add = options.add;
	      var merge = options.merge;
	      var remove = options.remove;

	      var sort = false;
	      var sortable = this.comparator && (at == null) && options.sort !== false;
	      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

	      // Turn bare objects into model references, and prevent invalid models
	      // from being added.
	      var model;
	      for (var i = 0; i < models.length; i++) {
	        model = models[i];

	        // If a duplicate is found, prevent it from being added and
	        // optionally merge it into the existing model.
	        var existing = this.get(model);
	        if (existing) {
	          if (merge && model !== existing) {
	            var attrs = this._isModel(model) ? model.attributes : model;
	            if (options.parse) attrs = existing.parse(attrs, options);
	            existing.set(attrs, options);
	            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
	          }
	          if (!modelMap[existing.cid]) {
	            modelMap[existing.cid] = true;
	            set.push(existing);
	          }
	          models[i] = existing;

	        // If this is a new, valid model, push it to the `toAdd` list.
	        } else if (add) {
	          model = models[i] = this._prepareModel(model, options);
	          if (model) {
	            toAdd.push(model);
	            this._addReference(model, options);
	            modelMap[model.cid] = true;
	            set.push(model);
	          }
	        }
	      }

	      // Remove stale models.
	      if (remove) {
	        for (i = 0; i < this.length; i++) {
	          model = this.models[i];
	          if (!modelMap[model.cid]) toRemove.push(model);
	        }
	        if (toRemove.length) this._removeModels(toRemove, options);
	      }

	      // See if sorting is needed, update `length` and splice in new models.
	      var orderChanged = false;
	      var replace = !sortable && add && remove;
	      if (set.length && replace) {
	        orderChanged = this.length != set.length || _.some(this.models, function(model, index) {
	          return model !== set[index];
	        });
	        this.models.length = 0;
	        splice(this.models, set, 0);
	        this.length = this.models.length;
	      } else if (toAdd.length) {
	        if (sortable) sort = true;
	        splice(this.models, toAdd, at == null ? this.length : at);
	        this.length = this.models.length;
	      }

	      // Silently sort the collection if appropriate.
	      if (sort) this.sort({silent: true});

	      // Unless silenced, it's time to fire all appropriate add/sort events.
	      if (!options.silent) {
	        for (i = 0; i < toAdd.length; i++) {
	          if (at != null) options.index = at + i;
	          model = toAdd[i];
	          model.trigger('add', model, this, options);
	        }
	        if (sort || orderChanged) this.trigger('sort', this, options);
	        if (toAdd.length || toRemove.length) this.trigger('update', this, options);
	      }

	      // Return the added (or merged) model (or models).
	      return singular ? models[0] : models;
	    },

	    // When you have more items than you want to add or remove individually,
	    // you can reset the entire set with a new list of models, without firing
	    // any granular `add` or `remove` events. Fires `reset` when finished.
	    // Useful for bulk operations and optimizations.
	    reset: function(models, options) {
	      options = options ? _.clone(options) : {};
	      for (var i = 0; i < this.models.length; i++) {
	        this._removeReference(this.models[i], options);
	      }
	      options.previousModels = this.models;
	      this._reset();
	      models = this.add(models, _.extend({silent: true}, options));
	      if (!options.silent) this.trigger('reset', this, options);
	      return models;
	    },

	    // Add a model to the end of the collection.
	    push: function(model, options) {
	      return this.add(model, _.extend({at: this.length}, options));
	    },

	    // Remove a model from the end of the collection.
	    pop: function(options) {
	      var model = this.at(this.length - 1);
	      return this.remove(model, options);
	    },

	    // Add a model to the beginning of the collection.
	    unshift: function(model, options) {
	      return this.add(model, _.extend({at: 0}, options));
	    },

	    // Remove a model from the beginning of the collection.
	    shift: function(options) {
	      var model = this.at(0);
	      return this.remove(model, options);
	    },

	    // Slice out a sub-array of models from the collection.
	    slice: function() {
	      return slice.apply(this.models, arguments);
	    },

	    // Get a model from the set by id.
	    get: function(obj) {
	      if (obj == null) return void 0;
	      var id = this.modelId(this._isModel(obj) ? obj.attributes : obj);
	      return this._byId[obj] || this._byId[id] || this._byId[obj.cid];
	    },

	    // Get the model at the given index.
	    at: function(index) {
	      if (index < 0) index += this.length;
	      return this.models[index];
	    },

	    // Return models with matching attributes. Useful for simple cases of
	    // `filter`.
	    where: function(attrs, first) {
	      return this[first ? 'find' : 'filter'](attrs);
	    },

	    // Return the first model with matching attributes. Useful for simple cases
	    // of `find`.
	    findWhere: function(attrs) {
	      return this.where(attrs, true);
	    },

	    // Force the collection to re-sort itself. You don't need to call this under
	    // normal circumstances, as the set will maintain sort order as each item
	    // is added.
	    sort: function(options) {
	      var comparator = this.comparator;
	      if (!comparator) throw new Error('Cannot sort a set without a comparator');
	      options || (options = {});

	      var length = comparator.length;
	      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

	      // Run sort based on type of `comparator`.
	      if (length === 1 || _.isString(comparator)) {
	        this.models = this.sortBy(comparator);
	      } else {
	        this.models.sort(comparator);
	      }
	      if (!options.silent) this.trigger('sort', this, options);
	      return this;
	    },

	    // Pluck an attribute from each model in the collection.
	    pluck: function(attr) {
	      return _.invoke(this.models, 'get', attr);
	    },

	    // Fetch the default set of models for this collection, resetting the
	    // collection when they arrive. If `reset: true` is passed, the response
	    // data will be passed through the `reset` method instead of `set`.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var success = options.success;
	      var collection = this;
	      options.success = function(resp) {
	        var method = options.reset ? 'reset' : 'set';
	        collection[method](resp, options);
	        if (success) success.call(options.context, collection, resp, options);
	        collection.trigger('sync', collection, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Create a new instance of a model in this collection. Add the model to the
	    // collection immediately, unless `wait: true` is passed, in which case we
	    // wait for the server to agree.
	    create: function(model, options) {
	      options = options ? _.clone(options) : {};
	      var wait = options.wait;
	      model = this._prepareModel(model, options);
	      if (!model) return false;
	      if (!wait) this.add(model, options);
	      var collection = this;
	      var success = options.success;
	      options.success = function(model, resp, callbackOpts) {
	        if (wait) collection.add(model, callbackOpts);
	        if (success) success.call(callbackOpts.context, model, resp, callbackOpts);
	      };
	      model.save(null, options);
	      return model;
	    },

	    // **parse** converts a response into a list of models to be added to the
	    // collection. The default implementation is just to pass it through.
	    parse: function(resp, options) {
	      return resp;
	    },

	    // Create a new collection with an identical list of models as this one.
	    clone: function() {
	      return new this.constructor(this.models, {
	        model: this.model,
	        comparator: this.comparator
	      });
	    },

	    // Define how to uniquely identify models in the collection.
	    modelId: function (attrs) {
	      return attrs[this.model.prototype.idAttribute || 'id'];
	    },

	    // Private method to reset all internal state. Called when the collection
	    // is first initialized or reset.
	    _reset: function() {
	      this.length = 0;
	      this.models = [];
	      this._byId  = {};
	    },

	    // Prepare a hash of attributes (or other model) to be added to this
	    // collection.
	    _prepareModel: function(attrs, options) {
	      if (this._isModel(attrs)) {
	        if (!attrs.collection) attrs.collection = this;
	        return attrs;
	      }
	      options = options ? _.clone(options) : {};
	      options.collection = this;
	      var model = new this.model(attrs, options);
	      if (!model.validationError) return model;
	      this.trigger('invalid', this, model.validationError, options);
	      return false;
	    },

	    // Internal method called by both remove and set.
	    _removeModels: function(models, options) {
	      var removed = [];
	      for (var i = 0; i < models.length; i++) {
	        var model = this.get(models[i]);
	        if (!model) continue;

	        var index = this.indexOf(model);
	        this.models.splice(index, 1);
	        this.length--;

	        if (!options.silent) {
	          options.index = index;
	          model.trigger('remove', model, this, options);
	        }

	        removed.push(model);
	        this._removeReference(model, options);
	      }
	      return removed.length ? removed : false;
	    },

	    // Method for checking whether an object should be considered a model for
	    // the purposes of adding to the collection.
	    _isModel: function (model) {
	      return model instanceof Model;
	    },

	    // Internal method to create a model's ties to a collection.
	    _addReference: function(model, options) {
	      this._byId[model.cid] = model;
	      var id = this.modelId(model.attributes);
	      if (id != null) this._byId[id] = model;
	      model.on('all', this._onModelEvent, this);
	    },

	    // Internal method to sever a model's ties to a collection.
	    _removeReference: function(model, options) {
	      delete this._byId[model.cid];
	      var id = this.modelId(model.attributes);
	      if (id != null) delete this._byId[id];
	      if (this === model.collection) delete model.collection;
	      model.off('all', this._onModelEvent, this);
	    },

	    // Internal method called every time a model in the set fires an event.
	    // Sets need to update their indexes when models change ids. All other
	    // events simply proxy through. "add" and "remove" events that originate
	    // in other collections are ignored.
	    _onModelEvent: function(event, model, collection, options) {
	      if ((event === 'add' || event === 'remove') && collection !== this) return;
	      if (event === 'destroy') this.remove(model, options);
	      if (event === 'change') {
	        var prevId = this.modelId(model.previousAttributes());
	        var id = this.modelId(model.attributes);
	        if (prevId !== id) {
	          if (prevId != null) delete this._byId[prevId];
	          if (id != null) this._byId[id] = model;
	        }
	      }
	      this.trigger.apply(this, arguments);
	    }

	  });

	  // Underscore methods that we want to implement on the Collection.
	  // 90% of the core usefulness of Backbone Collections is actually implemented
	  // right here:
	  var collectionMethods = { forEach: 3, each: 3, map: 3, collect: 3, reduce: 4,
	      foldl: 4, inject: 4, reduceRight: 4, foldr: 4, find: 3, detect: 3, filter: 3,
	      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
	      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
	      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
	      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
	      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
	      sortBy: 3, indexBy: 3};

	  // Mix in each Underscore method as a proxy to `Collection#models`.
	  addUnderscoreMethods(Collection, collectionMethods, 'models');

	  // Backbone.View
	  // -------------

	  // Backbone Views are almost more convention than they are actual code. A View
	  // is simply a JavaScript object that represents a logical chunk of UI in the
	  // DOM. This might be a single item, an entire list, a sidebar or panel, or
	  // even the surrounding frame which wraps your whole app. Defining a chunk of
	  // UI as a **View** allows you to define your DOM events declaratively, without
	  // having to worry about render order ... and makes it easy for the view to
	  // react to specific changes in the state of your models.

	  // Creating a Backbone.View creates its initial element outside of the DOM,
	  // if an existing element is not provided...
	  var View = Backbone.View = function(options) {
	    this.cid = _.uniqueId('view');
	    _.extend(this, _.pick(options, viewOptions));
	    this._ensureElement();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regex to split keys for `delegate`.
	  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	  // List of view options to be set as properties.
	  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

	  // Set up all inheritable **Backbone.View** properties and methods.
	  _.extend(View.prototype, Events, {

	    // The default `tagName` of a View's element is `"div"`.
	    tagName: 'div',

	    // jQuery delegate for element lookup, scoped to DOM elements within the
	    // current view. This should be preferred to global lookups where possible.
	    $: function(selector) {
	      return this.$el.find(selector);
	    },

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // **render** is the core function that your view should override, in order
	    // to populate its element (`this.el`), with the appropriate HTML. The
	    // convention is for **render** to always return `this`.
	    render: function() {
	      return this;
	    },

	    // Remove this view by taking the element out of the DOM, and removing any
	    // applicable Backbone.Events listeners.
	    remove: function() {
	      this._removeElement();
	      this.stopListening();
	      return this;
	    },

	    // Remove this view's element from the document and all event listeners
	    // attached to it. Exposed for subclasses using an alternative DOM
	    // manipulation API.
	    _removeElement: function() {
	      this.$el.remove();
	    },

	    // Change the view's element (`this.el` property) and re-delegate the
	    // view's events on the new element.
	    setElement: function(element) {
	      this.undelegateEvents();
	      this._setElement(element);
	      this.delegateEvents();
	      return this;
	    },

	    // Creates the `this.el` and `this.$el` references for this view using the
	    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
	    // context or an element. Subclasses can override this to utilize an
	    // alternative DOM manipulation API and are only required to set the
	    // `this.el` property.
	    _setElement: function(el) {
	      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
	      this.el = this.$el[0];
	    },

	    // Set callbacks, where `this.events` is a hash of
	    //
	    // *{"event selector": "callback"}*
	    //
	    //     {
	    //       'mousedown .title':  'edit',
	    //       'click .button':     'save',
	    //       'click .open':       function(e) { ... }
	    //     }
	    //
	    // pairs. Callbacks will be bound to the view, with `this` set properly.
	    // Uses event delegation for efficiency.
	    // Omitting the selector binds the event to `this.el`.
	    delegateEvents: function(events) {
	      events || (events = _.result(this, 'events'));
	      if (!events) return this;
	      this.undelegateEvents();
	      for (var key in events) {
	        var method = events[key];
	        if (!_.isFunction(method)) method = this[method];
	        if (!method) continue;
	        var match = key.match(delegateEventSplitter);
	        this.delegate(match[1], match[2], _.bind(method, this));
	      }
	      return this;
	    },

	    // Add a single event listener to the view's element (or a child element
	    // using `selector`). This only works for delegate-able events: not `focus`,
	    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
	    delegate: function(eventName, selector, listener) {
	      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Clears all callbacks previously bound to the view by `delegateEvents`.
	    // You usually don't need to use this, but may wish to if you have multiple
	    // Backbone views attached to the same DOM element.
	    undelegateEvents: function() {
	      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
	      return this;
	    },

	    // A finer-grained `undelegateEvents` for removing a single delegated event.
	    // `selector` and `listener` are both optional.
	    undelegate: function(eventName, selector, listener) {
	      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Produces a DOM element to be assigned to your view. Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _createElement: function(tagName) {
	      return document.createElement(tagName);
	    },

	    // Ensure that the View has a DOM element to render into.
	    // If `this.el` is a string, pass it through `$()`, take the first
	    // matching element, and re-assign it to `el`. Otherwise, create
	    // an element from the `id`, `className` and `tagName` properties.
	    _ensureElement: function() {
	      if (!this.el) {
	        var attrs = _.extend({}, _.result(this, 'attributes'));
	        if (this.id) attrs.id = _.result(this, 'id');
	        if (this.className) attrs['class'] = _.result(this, 'className');
	        this.setElement(this._createElement(_.result(this, 'tagName')));
	        this._setAttributes(attrs);
	      } else {
	        this.setElement(_.result(this, 'el'));
	      }
	    },

	    // Set attributes from a hash on this view's element.  Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _setAttributes: function(attributes) {
	      this.$el.attr(attributes);
	    }

	  });

	  // Backbone.sync
	  // -------------

	  // Override this function to change the manner in which Backbone persists
	  // models to the server. You will be passed the type of request, and the
	  // model in question. By default, makes a RESTful Ajax request
	  // to the model's `url()`. Some possible customizations could be:
	  //
	  // * Use `setTimeout` to batch rapid-fire updates into a single request.
	  // * Send up the models as XML instead of JSON.
	  // * Persist models via WebSockets instead of Ajax.
	  //
	  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
	  // as `POST`, with a `_method` parameter containing the true HTTP method,
	  // as well as all requests with the body as `application/x-www-form-urlencoded`
	  // instead of `application/json` with the model in a param named `model`.
	  // Useful when interfacing with server-side languages like **PHP** that make
	  // it difficult to read the body of `PUT` requests.
	  Backbone.sync = function(method, model, options) {
	    var type = methodMap[method];

	    // Default options, unless specified.
	    _.defaults(options || (options = {}), {
	      emulateHTTP: Backbone.emulateHTTP,
	      emulateJSON: Backbone.emulateJSON
	    });

	    // Default JSON-request options.
	    var params = {type: type, dataType: 'json'};

	    // Ensure that we have a URL.
	    if (!options.url) {
	      params.url = _.result(model, 'url') || urlError();
	    }

	    // Ensure that we have the appropriate request data.
	    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
	      params.contentType = 'application/json';
	      params.data = JSON.stringify(options.attrs || model.toJSON(options));
	    }

	    // For older servers, emulate JSON by encoding the request into an HTML-form.
	    if (options.emulateJSON) {
	      params.contentType = 'application/x-www-form-urlencoded';
	      params.data = params.data ? {model: params.data} : {};
	    }

	    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
	    // And an `X-HTTP-Method-Override` header.
	    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
	      params.type = 'POST';
	      if (options.emulateJSON) params.data._method = type;
	      var beforeSend = options.beforeSend;
	      options.beforeSend = function(xhr) {
	        xhr.setRequestHeader('X-HTTP-Method-Override', type);
	        if (beforeSend) return beforeSend.apply(this, arguments);
	      };
	    }

	    // Don't process data on a non-GET request.
	    if (params.type !== 'GET' && !options.emulateJSON) {
	      params.processData = false;
	    }

	    // Pass along `textStatus` and `errorThrown` from jQuery.
	    var error = options.error;
	    options.error = function(xhr, textStatus, errorThrown) {
	      options.textStatus = textStatus;
	      options.errorThrown = errorThrown;
	      if (error) error.call(options.context, xhr, textStatus, errorThrown);
	    };

	    // Make the request, allowing the user to override any Ajax options.
	    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
	    model.trigger('request', model, xhr, options);
	    return xhr;
	  };

	  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
	  var methodMap = {
	    'create': 'POST',
	    'update': 'PUT',
	    'patch':  'PATCH',
	    'delete': 'DELETE',
	    'read':   'GET'
	  };

	  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
	  // Override this if you'd like to use a different library.
	  Backbone.ajax = function() {
	    return Backbone.$.ajax.apply(Backbone.$, arguments);
	  };

	  // Backbone.Router
	  // ---------------

	  // Routers map faux-URLs to actions, and fire events when routes are
	  // matched. Creating a new one sets its `routes` hash, if not set statically.
	  var Router = Backbone.Router = function(options) {
	    options || (options = {});
	    if (options.routes) this.routes = options.routes;
	    this._bindRoutes();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regular expressions for matching named param parts and splatted
	  // parts of route strings.
	  var optionalParam = /\((.*?)\)/g;
	  var namedParam    = /(\(\?)?:\w+/g;
	  var splatParam    = /\*\w+/g;
	  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

	  // Set up all inheritable **Backbone.Router** properties and methods.
	  _.extend(Router.prototype, Events, {

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // Manually bind a single named route to a callback. For example:
	    //
	    //     this.route('search/:query/p:num', 'search', function(query, num) {
	    //       ...
	    //     });
	    //
	    route: function(route, name, callback) {
	      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
	      if (_.isFunction(name)) {
	        callback = name;
	        name = '';
	      }
	      if (!callback) callback = this[name];
	      var router = this;
	      Backbone.history.route(route, function(fragment) {
	        var args = router._extractParameters(route, fragment);
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route:' + name].concat(args));
	          router.trigger('route', name, args);
	          Backbone.history.trigger('route', router, name, args);
	        }
	      });
	      return this;
	    },

	    // Execute a route handler with the provided parameters.  This is an
	    // excellent place to do pre-route setup or post-route cleanup.
	    execute: function(callback, args, name) {
	      if (callback) callback.apply(this, args);
	    },

	    // Simple proxy to `Backbone.history` to save a fragment into the history.
	    navigate: function(fragment, options) {
	      Backbone.history.navigate(fragment, options);
	      return this;
	    },

	    // Bind all defined routes to `Backbone.history`. We have to reverse the
	    // order of the routes here to support behavior where the most general
	    // routes can be defined at the bottom of the route map.
	    _bindRoutes: function() {
	      if (!this.routes) return;
	      this.routes = _.result(this, 'routes');
	      var route, routes = _.keys(this.routes);
	      while ((route = routes.pop()) != null) {
	        this.route(route, this.routes[route]);
	      }
	    },

	    // Convert a route string into a regular expression, suitable for matching
	    // against the current location hash.
	    _routeToRegExp: function(route) {
	      route = route.replace(escapeRegExp, '\\$&')
	                   .replace(optionalParam, '(?:$1)?')
	                   .replace(namedParam, function(match, optional) {
	                     return optional ? match : '([^/?]+)';
	                   })
	                   .replace(splatParam, '([^?]*?)');
	      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
	    },

	    // Given a route, and a URL fragment that it matches, return the array of
	    // extracted decoded parameters. Empty or unmatched parameters will be
	    // treated as `null` to normalize cross-browser behavior.
	    _extractParameters: function(route, fragment) {
	      var params = route.exec(fragment).slice(1);
	      return _.map(params, function(param, i) {
	        // Don't decode the search params.
	        if (i === params.length - 1) return param || null;
	        return param ? decodeURIComponent(param) : null;
	      });
	    }

	  });

	  // Backbone.History
	  // ----------------

	  // Handles cross-browser history management, based on either
	  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
	  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
	  // and URL fragments. If the browser supports neither (old IE, natch),
	  // falls back to polling.
	  var History = Backbone.History = function() {
	    this.handlers = [];
	    this.checkUrl = _.bind(this.checkUrl, this);

	    // Ensure that `History` can be used outside of the browser.
	    if (typeof window !== 'undefined') {
	      this.location = window.location;
	      this.history = window.history;
	    }
	  };

	  // Cached regex for stripping a leading hash/slash and trailing space.
	  var routeStripper = /^[#\/]|\s+$/g;

	  // Cached regex for stripping leading and trailing slashes.
	  var rootStripper = /^\/+|\/+$/g;

	  // Cached regex for stripping urls of hash.
	  var pathStripper = /#.*$/;

	  // Has the history handling already been started?
	  History.started = false;

	  // Set up all inheritable **Backbone.History** properties and methods.
	  _.extend(History.prototype, Events, {

	    // The default interval to poll for hash changes, if necessary, is
	    // twenty times a second.
	    interval: 50,

	    // Are we at the app root?
	    atRoot: function() {
	      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
	      return path === this.root && !this.getSearch();
	    },

	    // Does the pathname match the root?
	    matchRoot: function() {
	      var path = this.decodeFragment(this.location.pathname);
	      var root = path.slice(0, this.root.length - 1) + '/';
	      return root === this.root;
	    },

	    // Unicode characters in `location.pathname` are percent encoded so they're
	    // decoded for comparison. `%25` should not be decoded since it may be part
	    // of an encoded parameter.
	    decodeFragment: function(fragment) {
	      return decodeURI(fragment.replace(/%25/g, '%2525'));
	    },

	    // In IE6, the hash fragment and search params are incorrect if the
	    // fragment contains `?`.
	    getSearch: function() {
	      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
	      return match ? match[0] : '';
	    },

	    // Gets the true hash value. Cannot use location.hash directly due to bug
	    // in Firefox where location.hash will always be decoded.
	    getHash: function(window) {
	      var match = (window || this).location.href.match(/#(.*)$/);
	      return match ? match[1] : '';
	    },

	    // Get the pathname and search params, without the root.
	    getPath: function() {
	      var path = this.decodeFragment(
	        this.location.pathname + this.getSearch()
	      ).slice(this.root.length - 1);
	      return path.charAt(0) === '/' ? path.slice(1) : path;
	    },

	    // Get the cross-browser normalized URL fragment from the path or hash.
	    getFragment: function(fragment) {
	      if (fragment == null) {
	        if (this._usePushState || !this._wantsHashChange) {
	          fragment = this.getPath();
	        } else {
	          fragment = this.getHash();
	        }
	      }
	      return fragment.replace(routeStripper, '');
	    },

	    // Start the hash change handling, returning `true` if the current URL matches
	    // an existing route, and `false` otherwise.
	    start: function(options) {
	      if (History.started) throw new Error('Backbone.history has already been started');
	      History.started = true;

	      // Figure out the initial configuration. Do we need an iframe?
	      // Is pushState desired ... is it available?
	      this.options          = _.extend({root: '/'}, this.options, options);
	      this.root             = this.options.root;
	      this._wantsHashChange = this.options.hashChange !== false;
	      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
	      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
	      this._wantsPushState  = !!this.options.pushState;
	      this._hasPushState    = !!(this.history && this.history.pushState);
	      this._usePushState    = this._wantsPushState && this._hasPushState;
	      this.fragment         = this.getFragment();

	      // Normalize root to always include a leading and trailing slash.
	      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

	      // Transition from hashChange to pushState or vice versa if both are
	      // requested.
	      if (this._wantsHashChange && this._wantsPushState) {

	        // If we've started off with a route from a `pushState`-enabled
	        // browser, but we're currently in a browser that doesn't support it...
	        if (!this._hasPushState && !this.atRoot()) {
	          var root = this.root.slice(0, -1) || '/';
	          this.location.replace(root + '#' + this.getPath());
	          // Return immediately as browser will do redirect to new url
	          return true;

	        // Or if we've started out with a hash-based route, but we're currently
	        // in a browser where it could be `pushState`-based instead...
	        } else if (this._hasPushState && this.atRoot()) {
	          this.navigate(this.getHash(), {replace: true});
	        }

	      }

	      // Proxy an iframe to handle location events if the browser doesn't
	      // support the `hashchange` event, HTML5 history, or the user wants
	      // `hashChange` but not `pushState`.
	      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
	        this.iframe = document.createElement('iframe');
	        this.iframe.src = 'javascript:0';
	        this.iframe.style.display = 'none';
	        this.iframe.tabIndex = -1;
	        var body = document.body;
	        // Using `appendChild` will throw on IE < 9 if the document is not ready.
	        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
	        iWindow.document.open();
	        iWindow.document.close();
	        iWindow.location.hash = '#' + this.fragment;
	      }

	      // Add a cross-platform `addEventListener` shim for older browsers.
	      var addEventListener = window.addEventListener || function (eventName, listener) {
	        return attachEvent('on' + eventName, listener);
	      };

	      // Depending on whether we're using pushState or hashes, and whether
	      // 'onhashchange' is supported, determine how we check the URL state.
	      if (this._usePushState) {
	        addEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        addEventListener('hashchange', this.checkUrl, false);
	      } else if (this._wantsHashChange) {
	        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
	      }

	      if (!this.options.silent) return this.loadUrl();
	    },

	    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
	    // but possibly useful for unit testing Routers.
	    stop: function() {
	      // Add a cross-platform `removeEventListener` shim for older browsers.
	      var removeEventListener = window.removeEventListener || function (eventName, listener) {
	        return detachEvent('on' + eventName, listener);
	      };

	      // Remove window listeners.
	      if (this._usePushState) {
	        removeEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        removeEventListener('hashchange', this.checkUrl, false);
	      }

	      // Clean up the iframe if necessary.
	      if (this.iframe) {
	        document.body.removeChild(this.iframe);
	        this.iframe = null;
	      }

	      // Some environments will throw when clearing an undefined interval.
	      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
	      History.started = false;
	    },

	    // Add a route to be tested when the fragment changes. Routes added later
	    // may override previous routes.
	    route: function(route, callback) {
	      this.handlers.unshift({route: route, callback: callback});
	    },

	    // Checks the current URL to see if it has changed, and if it has,
	    // calls `loadUrl`, normalizing across the hidden iframe.
	    checkUrl: function(e) {
	      var current = this.getFragment();

	      // If the user pressed the back button, the iframe's hash will have
	      // changed and we should use that for comparison.
	      if (current === this.fragment && this.iframe) {
	        current = this.getHash(this.iframe.contentWindow);
	      }

	      if (current === this.fragment) return false;
	      if (this.iframe) this.navigate(current);
	      this.loadUrl();
	    },

	    // Attempt to load the current URL fragment. If a route succeeds with a
	    // match, returns `true`. If no defined routes matches the fragment,
	    // returns `false`.
	    loadUrl: function(fragment) {
	      // If the root doesn't match, no routes can match either.
	      if (!this.matchRoot()) return false;
	      fragment = this.fragment = this.getFragment(fragment);
	      return _.some(this.handlers, function(handler) {
	        if (handler.route.test(fragment)) {
	          handler.callback(fragment);
	          return true;
	        }
	      });
	    },

	    // Save a fragment into the hash history, or replace the URL state if the
	    // 'replace' option is passed. You are responsible for properly URL-encoding
	    // the fragment in advance.
	    //
	    // The options object can contain `trigger: true` if you wish to have the
	    // route callback be fired (not usually desirable), or `replace: true`, if
	    // you wish to modify the current URL without adding an entry to the history.
	    navigate: function(fragment, options) {
	      if (!History.started) return false;
	      if (!options || options === true) options = {trigger: !!options};

	      // Normalize the fragment.
	      fragment = this.getFragment(fragment || '');

	      // Don't include a trailing slash on the root.
	      var root = this.root;
	      if (fragment === '' || fragment.charAt(0) === '?') {
	        root = root.slice(0, -1) || '/';
	      }
	      var url = root + fragment;

	      // Strip the hash and decode for matching.
	      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

	      if (this.fragment === fragment) return;
	      this.fragment = fragment;

	      // If pushState is available, we use it to set the fragment as a real URL.
	      if (this._usePushState) {
	        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

	      // If hash changes haven't been explicitly disabled, update the hash
	      // fragment to store history.
	      } else if (this._wantsHashChange) {
	        this._updateHash(this.location, fragment, options.replace);
	        if (this.iframe && (fragment !== this.getHash(this.iframe.contentWindow))) {
	          var iWindow = this.iframe.contentWindow;

	          // Opening and closing the iframe tricks IE7 and earlier to push a
	          // history entry on hash-tag change.  When replace is true, we don't
	          // want this.
	          if (!options.replace) {
	            iWindow.document.open();
	            iWindow.document.close();
	          }

	          this._updateHash(iWindow.location, fragment, options.replace);
	        }

	      // If you've told us that you explicitly don't want fallback hashchange-
	      // based history, then `navigate` becomes a page refresh.
	      } else {
	        return this.location.assign(url);
	      }
	      if (options.trigger) return this.loadUrl(fragment);
	    },

	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    _updateHash: function(location, fragment, replace) {
	      if (replace) {
	        var href = location.href.replace(/(javascript:|#).*$/, '');
	        location.replace(href + '#' + fragment);
	      } else {
	        // Some browsers require that `hash` contains a leading #.
	        location.hash = '#' + fragment;
	      }
	    }

	  });

	  // Create the default Backbone.history.
	  Backbone.history = new History;

	  // Helpers
	  // -------

	  // Helper function to correctly set up the prototype chain for subclasses.
	  // Similar to `goog.inherits`, but uses a hash of prototype properties and
	  // class properties to be extended.
	  var extend = function(protoProps, staticProps) {
	    var parent = this;
	    var child;

	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent constructor.
	    if (protoProps && _.has(protoProps, 'constructor')) {
	      child = protoProps.constructor;
	    } else {
	      child = function(){ return parent.apply(this, arguments); };
	    }

	    // Add static properties to the constructor function, if supplied.
	    _.extend(child, parent, staticProps);

	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent` constructor function.
	    var Surrogate = function(){ this.constructor = child; };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate;

	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps) _.extend(child.prototype, protoProps);

	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;

	    return child;
	  };

	  // Set up inheritance for the model, collection, router, view and history.
	  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

	  // Throw an error when a URL is needed, and none is supplied.
	  var urlError = function() {
	    throw new Error('A "url" property or function must be specified');
	  };

	  // Wrap an optional error callback with a fallback error event.
	  var wrapError = function(model, options) {
	    var error = options.error;
	    options.error = function(resp) {
	      if (error) error.call(options.context, model, resp, options);
	      model.trigger('error', model, resp, options);
	    };
	  };

	  return Backbone;

	}));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }

/******/ });