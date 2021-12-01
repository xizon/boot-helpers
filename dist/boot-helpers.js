/*!
 * 
 * 	Boot Helpers
 *
 * 	@source: https://github.com/xizon/boot-helpers
 * 	@version: 0.0.47 (December 1, 2021)
 * 	@author: UIUX Lab <uiuxlab@gmail.com>
 * 	@license: MIT
 *
 */
var BootHelpersLib;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

;// CONCATENATED MODULE: ./src/_internal/traverseIndex.ts
/*
* Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`
* @private
*/
var traverseIndex = {
  // for `each()`
  each: 0,
  // for `eq()`
  eq: 0,
  // for `first()`
  first: 0,
  // for `last()`
  last: 0,
  total_last: 0,
  // for `filter()`
  filter: 0,
  // for `not()`
  not: 0,
  // for `maxDimension()`
  maxDimension: 0,
  total_maxDimension: 0,
  elements_maxDimension: []
};
/* harmony default export */ const _internal_traverseIndex = (traverseIndex);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
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
;// CONCATENATED MODULE: ./src/_internal/isJSON.ts


/*
* Determine whether it is in JSON format
* @private
*/
function isJSON(str) {
  if (typeof str === 'string' && str.length > 0) {
    if (str.replace(/\"\"/g, '').replace(/\,/g, '') == '[{}]') {
      return false;
    } else {
      if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (_typeof(str) === 'object' && Object.prototype.toString.call(str) === '[object Object]' && !str.length) {
      return true;
    } else {
      return false;
    }
  }
}

/* harmony default export */ const _internal_isJSON = (isJSON);
;// CONCATENATED MODULE: ./src/_public/ajax.ts

/*
* Perform an asynchronous HTTP (Ajax) request.
* @public
*
* @param  {Json} props   - The attribute and value to be set, the format is JSON
* @return {Void} 
*/

function ajax(props) {
  if (!_internal_isJSON(props)) return false;
  var self = this;

  var _url = typeof props.url !== 'undefined' ? props.url : '';

  var _method = typeof props.method !== 'undefined' ? props.method : 'POST';

  var _loadedFn = typeof props.complete !== 'undefined' ? props.complete : null;

  if (_url != '') {
    var config = {
      mode: 'cors',
      method: _method
    };
    fetch(_url, config).then(function (response) {
      return response.json();
    }).then(function (result) {
      //console.log('Success:', result);
      if (_loadedFn && typeof _loadedFn == "function") {
        _loadedFn.call(self, result);
      }
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  }
}

/* harmony default export */ const _public_ajax = (ajax);
;// CONCATENATED MODULE: ./src/_public/browser.ts
/*
* Determine whether it is a special browser
* @public
*
* @return {Json}  - Boolean judgment collection of common browsers
*/
var browser = function () {
  var browser = {};

  if (typeof navigator !== 'undefined') {
    // Test via a getter in the options object to see if the passive property is accessed
    var supportsPassive = false;

    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
          supportsPassive = true;
        }
      });
      window.addEventListener("testPassive", function (e) {}, opts);
      window.removeEventListener("testPassive", function (e) {}, opts);
    } catch (e) {}

    browser = {
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isAndroid: /(android)/i.test(navigator.userAgent),
      isPC: !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
      isSafari: !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),

      /*Test to 9, 10. */
      isIE: !!window.ActiveXObject || "ActiveXObject" in window,

      /*Test to 6 ~ 11 (not edge) */
      supportsPassive: supportsPassive
    };
  }

  return browser;
}();

/* harmony default export */ const _public_browser = (browser);
;// CONCATENATED MODULE: ./src/_public/cssProperty.ts


/*
* Get the CSS property
* @public
*
* @description This function can be used separately in HTML pages or custom JavaScript.
* @param  {!Element} el     - The Element for which to get the computed style. Using class name or ID to locate.
* @return {String|Object}   - The value of property.
*/
var cssProperty = function () {
  function t() {}

  return t.version = "0.0.1",
  /*
  * Get the -webkit-transition-duration property
  *
  * @param {Element} el - A DOM node containing one selector to match against.
  * @return {Number}    - Returns a pure number.
  */
  t.getTransitionDuration = function (el) {
    if (_typeof(el) === ( true ? "undefined" : 0)) {
      return 0;
    }

    var style = window.getComputedStyle(el),
        duration = style.webkitTransitionDuration,
        delay = style.webkitTransitionDelay;

    if (_typeof(duration) != ( true ? "undefined" : 0)) {
      // fix miliseconds vs seconds
      duration = duration.indexOf("ms") > -1 ? parseFloat(duration) : parseFloat(duration) * 1000;
      delay = delay.indexOf("ms") > -1 ? parseFloat(delay) : parseFloat(delay) * 1000;
      return duration;
    } else {
      return 0;
    }
  },
  /*
  * Get an object's absolute position on the page
  *
  * @param {Element} el - A DOM node containing one selector to match against.
  * @return {Json}    - An object containing the properties top and left. 
  */
  t.getAbsoluteCoordinates = function (el) {
    var windowWidth = window.innerWidth,
        leftPos = null,
        topPos = null;

    if (!document.getElementsByTagName('body')[0].className.match(/rtl/)) {
      leftPos = el.offsetLeft == 0 ? el.parentElement.offsetLeft : el.offsetLeft;
      topPos = el.offsetTop == 0 ? el.parentElement.offsetTop : el.offsetTop;
    } else {
      // width and height in pixels, including padding and border
      // Corresponds to outerWidth(), outerHeight()
      leftPos = el.offsetLeft == 0 ? windowWidth - (el.parentElement.offsetLeft + el.parentElement.offsetWidth) : windowWidth - (el.offsetLeft + el.offsetWidth);
      topPos = el.offsetTop == 0 ? windowWidth - (el.parentElement.offsetTop + el.parentElement.offsetHeight) : windowWidth - (el.offsetTop + el.offsetHeight);
    }

    return {
      'left': leftPos,
      'top': topPos
    };
  }, //
  t;
}();

/* harmony default export */ const _public_cssProperty = (cssProperty);
;// CONCATENATED MODULE: ./src/_public/debounce.ts
/*
* Debounce
* @public
*
* @param  {Function} fn    - A function to be executed within the time limit.
* @param  {Number} limit   - Waiting time.
* @return {Function}       - Returns a new function.
*/
function debounce(fn) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var timer;
  return function () {
    //Every time this returned function is called, the timer is cleared to ensure that fn is not executed
    clearTimeout(timer); // When the returned function is called for the last time (that is the user stops a continuous operation)
    // Execute fn after another delay milliseconds

    timer = setTimeout(function () {
      fn.apply(this, arguments);
    }, limit);
  };
}

;
/* harmony default export */ const _public_debounce = (debounce);
;// CONCATENATED MODULE: ./src/_public/deepClone.ts


/*
*  Create a deep copy of the set of matched elements.
* @public
*
* @param  {Object|Element} obj             - The array, JSON or HTML element to be copied.
* @return {Object|Element}   
*/
function deepClone(obj) {
  if (obj.nodeType === 1) {
    return obj.cloneNode(true);
  } else {
    var objClone = Array.isArray(obj) ? [] : {};

    if (obj && _typeof(obj) === "object") {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          //Determine whether the ojb child element is an object, if it is, copy it recursively
          if (obj[key] && _typeof(obj[key]) === "object") {
            objClone[key] = deepClone(obj[key]);
          } else {
            //If not, simply copy
            objClone[key] = obj[key];
          }
        }
      }
    }

    return objClone;
  }
}

;
/* harmony default export */ const _public_deepClone = (deepClone);
;// CONCATENATED MODULE: ./src/_public/GUID.ts
/*
* Create GUID / UUID
* @public
*
* @description This function can be used separately in HTML pages or custom JavaScript.
* @return {String}                        - The globally-unique identifiers.
*/
var GUID = function () {
  function t() {}

  return t.version = "0.0.1",
  /*
  * Generate a string of unique characters
  *
  * @return {String}
  */
  t.create = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }, //
  t;
}();

/* harmony default export */ const _public_GUID = (GUID);
;// CONCATENATED MODULE: ./src/_public/htmlDecode.ts
/*
*  HTML entities decode
* @public
*
* @param {string} str          - Input text.
* @return {string}             - Filtered text.
*/
function htmlDecode(str) {
  var res = '';

  if (typeof document === 'undefined') {
    var entities = [['amp', '&'], ['apos', '\''], ['#x27', '\''], ['#x2F', '/'], ['#39', '\''], ['#47', '/'], ['lt', '<'], ['gt', '>'], ['nbsp', ' '], ['quot', '"'], ['#60', '<'], ['#62', '>']];

    for (var i = 0, max = entities.length; i < max; i++) {
      str = str.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
    }

    res = str;
  } else {
    var txt = document.createElement('textarea');
    txt.innerHTML = str;
    res = txt.value;
  }

  return res;
}

/* harmony default export */ const _public_htmlDecode = (htmlDecode);
;// CONCATENATED MODULE: ./src/_public/htmlEncode.ts
/*
*  HTML entities encode.
* @public
*
* @param {string} str          - Input text.
* @return {string}             - Filtered text.
*/
function htmlEncode(str) {
  var res = '';

  if (typeof document === 'undefined') {
    res = str.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
      return '&#' + i.charCodeAt(0) + ';';
    });
  } else {
    var div = document.createElement('div'); //Creates a new Text node. This method can be used to escape HTML characters.

    div.appendChild(document.createTextNode(str));
    res = div.innerHTML;
  } //Convert single and double quotes


  res = res.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  return res;
}

/* harmony default export */ const _public_htmlEncode = (htmlEncode);
;// CONCATENATED MODULE: ./src/_public/isTouchCapable.ts
/*
* To determine if it is a touch screen.
* @public
*
* @return {Boolean} 
*/
function isTouchCapable() {
  return 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || window.navigator.maxTouchPoints > 0;
}

/* harmony default export */ const _public_isTouchCapable = (isTouchCapable);
;// CONCATENATED MODULE: ./src/_public/lastUrlParamFormat.ts
/*
* Capitalize the first letter of all words in a string
* @public
*
* @param  {String} s                 - Any string.
* @return {String}                   - A new string.
*/
function lastUrlParamFormat(s) {
  s = s || '';

  if (s.length > 0) {
    s = s.replace(/\-/g, ' ').replace(/\_/g, ' ');
    var pieces = s.split(" ");

    for (var i = 0; i < pieces.length; i++) {
      var j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1);
    }

    return pieces.join(" ");
  } else {
    return s;
  }
}

/* harmony default export */ const _public_lastUrlParamFormat = (lastUrlParamFormat);
;// CONCATENATED MODULE: ./src/_public/math.ts
/*
* Evaluating a string as a mathematical expression in JavaScript
* @public
*
* @description This function can be used separately in HTML pages or custom JavaScript.
* @return {String}            - New calculation result.
*/
var math = function () {
  function t() {}

  return t.version = "0.0.2",
  /*
  * Expression parsing and evaluation
  *
  * @param {String} s - A math expression given in string.
  * @return {Number}  - Returns a pure number calculated.
  */
  t.evaluate = function (s) {
    var chars = s.replace(/\s/g, '').split("");
    var n = [],
        op = [],
        index = 0,
        oplast = true;
    n[index] = ""; // Parse the expression

    for (var c = 0; c < chars.length; c++) {
      if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
        op[index] = chars[c];
        index++;
        n[index] = "";
        oplast = true;
      } else {
        n[index] += chars[c];
        oplast = false;
      }
    } // Calculate the expression


    s = parseFloat(n[0]);

    for (var o = 0; o < op.length; o++) {
      var num = parseFloat(n[o + 1]);

      switch (op[o]) {
        case "+":
          s = s + num;
          break;

        case "-":
          s = s - num;
          break;

        case "*":
          s = s * num;
          break;

        case "/":
          s = s / num;
          break;
      }
    }

    return s;
  },
  /*
  * Generate random number between two numbers
  *
  * @return {Number} min - Enter a expected minimum.
  * @return {Number} max - Enter a expected maximum.
  * @return {Number}     - A new random number
  */
  t.getRandomFloat = function (min, max) {
    return Math.random() * (max - min) + min;
  },
  /*
  * Returns the degree from radian.
  *
  * @return {Number} rad - Value of radian.
  * @return {Number}
  * @usage: 
   angle = rad / ( Math.PI / 180 )  = rad * ( 180/Math.PI );
  */
  t.getDegree = function (rad) {
    return rad / Math.PI * 180;
  },
  /*
  * Returns the radian degree .
  *
  * @return {Number} deg - Value of degree.
  * @return {Number}
  * @usage: 
   rad = Math.PI / 180 * 30 ;
  */
  t.getRadian = function (deg) {
    return deg * Math.PI / 180;
  },
  /*
  * Convert three.js scene rotation to polar coordinates
  *
  * @return {Number} x - X coordinate value.
  * @return {Number} y - Y coordinate value.
  * @return {Number} z - Z coordinate value.
  * @return {Json}
  * @usage: 
   x = r * cos（θ）
  y = r * sin（θ）  
  */
  t.getPolarCoord = function (x, y, z) {
    var nx = Math.cos(x) * Math.cos(y) * z,
        nz = Math.cos(x) * Math.sin(y) * z,
        ny = Math.sin(x) * z;
    return {
      x: nx,
      y: ny,
      z: nz
    };
  }, //
  t;
}();

/* harmony default export */ const _public_math = (math);
;// CONCATENATED MODULE: ./src/_public/removeFirstLastStr.ts
/*
* Remove first, last or both symbols
* @public
*
* @param  {String} str       - Any string.
* @param  {String} symbol    - The target string to remove.
* @param  {Number} type      - Type of all or not. if `0`, is all.
* @return {String}           - An new string.
*/
function removeFirstLastStr(str) {
  var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (typeof str === 'string') {
    if (type == 0) {
      var flRegExp = new RegExp('^\\' + symbol + '|\\' + symbol + '$', 'g');
      return str.replace(flRegExp, '');
    } else {
      var _flRegExp = new RegExp('' + symbol + '\s*$', 'g');

      return str.replace(_flRegExp, '');
    }
  } else {
    return str;
  }
}

;
/* harmony default export */ const _public_removeFirstLastStr = (removeFirstLastStr);
;// CONCATENATED MODULE: ./src/_internal/isValidNumeric.ts
/*
* Check if a string is a valid number
* @private
*/
function isValidNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!  

  if (!isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)
  !isNaN(parseFloat(str)) // ensure strings of whitespace fail
  ) {
    return true;
  } else {
    return false;
  }
}

/* harmony default export */ const _internal_isValidNumeric = (isValidNumeric);
;// CONCATENATED MODULE: ./src/_public/setDefaultOptions.ts



/*
*  Set a default JSON format configuration
* @public
*
* @param  {Json} props         - Set some default keys and values.
* @param  {Json} options       - A JSON variable passed in from outside, including key and value.
* @return {Json}               - Merge the new and old values.
*/

function setDefaultOptions(props, options) {
  if (_typeof(options) === ( true ? "undefined" : 0) || options === null || options === false) options = {}; //Set a default configuration

  if (_internal_isJSON(props)) {
    var defaultConfigValues = Object.values(props);
    Object.keys(props).forEach(function (prop, index) {
      // Well-formed string type
      Object.keys(options).forEach(function (prop2, index2) {
        if (prop2 === prop) {
          var _v = options[prop2];
          if (_v == 'true') _v = true;
          if (_v == 'false') _v = false;
          if (_internal_isValidNumeric(_v)) _v = parseFloat(_v);
          if (_internal_isJSON(_v)) _v = Object.prototype.toString.call(_v) === '[object Object]' ? _v : JSON.parse(_v);
          options[prop2] = _v;
        }
      }); //

      if (_typeof(options[prop]) === ( true ? "undefined" : 0) || options[prop] === null) options[prop] = defaultConfigValues[index];
    });
  }

  return options;
}

;
/* harmony default export */ const _public_setDefaultOptions = (setDefaultOptions);
;// CONCATENATED MODULE: ./src/_internal/toCamelCase.ts
/*
* Convert string to camel case
* @private
*/
function toCamelCase(s) {
  if (typeof s === 'string') {
    var firstWord = "";
    var arr = s.split("-");

    for (var i = 1; i < arr.length; i++) {
      firstWord = arr[i].charAt(0).toUpperCase();
      arr[i] = firstWord + arr[i].slice(1);
    }

    arr = arr.join(""); //Convert the arr array to a string

    return arr;
  } else {
    return s;
  }
}

/* harmony default export */ const _internal_toCamelCase = (toCamelCase);
;// CONCATENATED MODULE: ./src/_public/trim.ts
/*
* Remove all spaces in the string
* @public
*
* @param  {String} s                 - Any string.
* @param  {Boolean} isGlobal         - If the value is `true`, remove all spaces including the middle
* @return {String}                   - A new string with no spaces
*/
function trim(s) {
  var isGlobal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof s === 'string') {
    var result;
    result = s.replace(/(^\s+)|(\s+$)/g, "");

    if (isGlobal === true) {
      result = result.replace(/\s/g, "");
    }

    return result;
  } else {
    return s;
  }
}

/* harmony default export */ const _public_trim = (trim);
;// CONCATENATED MODULE: ./src/_public/styleFormat.ts


/*
* Convert HTML Element's `Style` Attribute to JSON
* @public
*
* @param  {String} str   - The content of the style attribute in the HTML element, usually a string
* @return {Json}     - An HTML element to a JSON object
*/

function styleFormat(s) {
  s = s || '';

  if (s.length > 0) {
    var styles = s.split(';'),
        json = {};
    var i = styles.length,
        style,
        k,
        v;

    while (i--) {
      style = styles[i].split(':');
      k = _internal_toCamelCase(_public_trim(style[0]));
      v = _public_trim(style[1]);

      if (k.length > 0 && v.length > 0) {
        json[k] = v;
      }
    }

    return json;
  } else {
    return '';
  }
}

;
/* harmony default export */ const _public_styleFormat = (styleFormat);
;// CONCATENATED MODULE: ./src/_public/throttle.ts
/*
* Throttle
* @public
*
* @param  {Function} fn    - A function to be executed within the time limit.
* @param  {Number} limit   - Waiting time.
* @return {Function}       - Returns a new function.
*/
function throttle(fn) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var waiting = false;
  return function () {
    if (!waiting) {
      fn.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}

;
/* harmony default export */ const _public_throttle = (throttle);
;// CONCATENATED MODULE: ./src/_public/toSlug.ts
/*
* Convert a string to slug.
* @public
*
* @param  {String} str            - Any string.
* @return {String}                - A new string.
*/
function toSlug(str) {
  if (typeof str == 'string' && str.length > 0) {
    return str.toString().replace(/[^\w\s\-！￥【】\u4e00-\u9eff]/gi, '').replace(/\s/g, '-').replace(/(\-){2,}/g, '-').replace(/\-\s*$/, '').toLowerCase();
  } else {
    return str;
  }
}

;
/* harmony default export */ const _public_toSlug = (toSlug);
;// CONCATENATED MODULE: ./src/_public/validate.ts

/*
* Object validation
* @public
*
* @return {Boolean}  
*/

var validate = function () {
  function t() {}

  return t.version = "0.0.1", t.isNumber = function (B) {
    var A = /^[\d|\.|,]+$/;
    return A.test(B);
  }, t.isInt = function (B) {
    if (B == "") {
      return false;
    }

    var A = /\D+/;
    return !A.test(B);
  }, t.isEmail = function (A) {
    var B = /^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
    return B.test(A);
  }, t.isTel = function (A) {
    //const B = /^[\d|\-|\s|\_]+$/;
    var B = /^[0-9- ]{7,20}$/;
    return B.test(A);
  }, t.isMobile = function (A) {
    //const B = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
    var B = /^1[0-9]{10}$/;
    return B.test(A);
  }, t.isJSON = function (A) {
    return _internal_isJSON(A);
  }, //
  t;
}();

/* harmony default export */ const _public_validate = (validate);
;// CONCATENATED MODULE: ./src/find.ts
/*
* Get the descendants of each element in the current set of matched elements
*
* @param  {String} s           - A string containing a selector expression to match elements against.
* @return {Array}              - The collection of elements
*/
function find(s) {
  // The symbol ">" is not allowed at the beginning of the find() method.
  if (/(^\s*|,\s*)>/.test(s)) {
    var removeId;

    if (!this.id) {
      this.id = 'ID_' + new Date().getTime();
      removeId = true;
    }

    s = s.replace(/(^\s*|,\s*)>/g, '$1#' + this.id + ' >');
    var result = document.querySelectorAll(s);

    if (removeId) {
      this.id = null;
    }

    return [].slice.call(result);
  } else {
    return [].slice.call(this.querySelectorAll(s));
  }
}

;
/* harmony default export */ const src_find = (find);
;// CONCATENATED MODULE: ./src/closest.ts
/*
* Traverses the Element and its parents (heading toward the document root) 
* until it finds a node that matches the provided selector string. 
*
* @param  {String} s           - A string containing a selector expression to match elements against.
* @return {Array}              - Contains only a collection of HTML elements.
*/
function closest(s) {
  //using recursivity
  var el = this.closest(s); //Must judge the result of closest()

  if (el === null) {
    return [];
  } else {
    return el;
  }
}

/* harmony default export */ const src_closest = (closest);
;// CONCATENATED MODULE: ./src/prev.ts
/*
* Returns the Element immediately prior to the specified one in its parent's children list, 
* or null if the specified element is the first one in the list.
*
* @param  {String} s       - A string containing a selector expression to match elements against.
* @return {Array}          - Contains only a collection of HTML elements.
*/
function prev(s) {
  var el = this.previousElementSibling;

  if (s === undefined) {
    if (el !== null) return el;
  } else {
    if (el !== null && ( //Determine whether the ID, class and HTML nodes match
    el.nodeName.toLowerCase() === s || el.classList.contains(s.replace(/\./g, '')) || '#' + el.id === s)) {
      return el;
    } else {
      return [];
    }
  }
}

/* harmony default export */ const src_prev = (prev);
;// CONCATENATED MODULE: ./src/next.ts
/*
* Returns the element immediately following the specified one in its parent's children list, 
* or null if the specified element is the last one in the list.
*
* @param  {String} s       - A string containing a selector expression to match elements against.
* @return {Array}          - Contains only a collection of HTML elements.
*/
function next(s) {
  var el = this.nextElementSibling;

  if (s === undefined) {
    if (el !== null) return el;
  } else {
    if (el !== null && ( //Determine whether the ID, class and HTML nodes match
    el.nodeName.toLowerCase() === s || el.classList.contains(s.replace(/\./g, '')) || '#' + el.id === s)) {
      return el;
    } else {
      return [];
    }
  }
}

/* harmony default export */ const src_next = (next);
;// CONCATENATED MODULE: ./src/parent.ts
/*
* Returns the DOM node's parent Element, or null if the node either has no parent,
* or its parent isn't a DOM Element.
*
* @param  {String} s       - A string containing a selector expression to match elements against.
* @return {Array}          - Contains only a collection of HTML elements.
*/
function parent_parent(s) {
  var el = this.parentElement;

  if (s === undefined) {
    if (el !== null) return el;
  } else {
    if (el !== null && ( //Determine whether the ID, class and HTML nodes match
    el.nodeName.toLowerCase() === s || el.classList.contains(s.replace(/\./g, '')) || '#' + el.id === s)) {
      return el;
    } else {
      return [];
    }
  }
}

/* harmony default export */ const src_parent = (parent_parent);
;// CONCATENATED MODULE: ./src/parents.ts
/*
* Get the ancestors of each element in the current set of matched elements.
*
* @param  {String} s                 - A string containing a selector expression to match elements against.
* @return {Array}                    - Contains only a collection of HTML elements.
*/
function parents(s) {
  var parentSelector = document.querySelector(s); // If no parentSelector defined will bubble up all the way to *document*

  if (parentSelector === undefined) {
    parentSelector = document;
  }

  var parents = [];
  var _parent = this.parentNode;

  while (_parent !== parentSelector) {
    var _currentNode = _parent; //Determine whether the ID, class and HTML nodes match

    if (s !== undefined) {
      if (_currentNode.nodeName.toLowerCase() === s || _currentNode.classList.contains(s.replace(/\./g, '')) || '#' + _currentNode.id === s) {
        parents.push(_currentNode);
      }
    } else {
      parents.push(_currentNode);
    } //


    _parent = _currentNode.parentNode;
  } // Push that parentSelector you wanted to stop at


  if (parentSelector !== null) parents.push(parentSelector);
  return parents;
}

/* harmony default export */ const src_parents = (parents);
;// CONCATENATED MODULE: ./src/children.ts
/*
* Returns a live HTMLCollection which contains all of the child elements 
* of the node upon which it was called.
*
* @param  {Element} s         - The selector that needs to be filtered. A DOMstring containing 
*                               one selector to match against.
* @return {Array}              -  The collection of elements
*/
function children(s) {
  var self = this;
  var childrenList = self.children;
  var res = [];

  if (childrenList) {
    for (var i = 0; i < childrenList.length; i++) {
      var _currentNode = childrenList[i]; //Determine whether the ID, class and HTML nodes match

      if (s !== undefined) {
        if (_currentNode.nodeName.toLowerCase() === s || _currentNode.classList.contains(s.replace(/\./g, '')) || '#' + _currentNode.id === s) {
          res.push(_currentNode);
        }
      } else {
        res.push(_currentNode);
      }
    }
  }

  return res;
}

/* harmony default export */ const src_children = (children);
;// CONCATENATED MODULE: ./src/siblings.ts
/*
* Get the siblings of each element in the set of matched elements
*
* @param  {String} s                 - A string containing a selector expression to match elements against.
* @return {Array}              -  The collection of elements
*/
function siblings(s) {
  var self = this; // for collecting siblings

  var siblings = []; // if no parent, return no sibling

  if (!self.parentNode) {
    return siblings;
  } // first child of the parent node


  var sibling = self.parentNode.firstChild; // collecting siblings

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== self) {
      //Determine whether the ID, class and HTML nodes match
      if (s !== undefined) {
        if (sibling.nodeName.toLowerCase() === s || sibling.classList.contains(s.replace(/\./g, '')) || '#' + sibling.id === s) {
          siblings.push(sibling);
        }
      } else {
        siblings.push(sibling);
      }
    } //


    sibling = sibling.nextSibling;
  }

  return siblings;
}

/* harmony default export */ const src_siblings = (siblings);
;// CONCATENATED MODULE: ./src/each.ts


/*
* Iterate over an object, executing a function for each matched element.
*
* @param  {Function} fn         - A function to execute for each matched element.
* @return {Void} 
*/

function each(fn) {
  if (fn && typeof fn == "function") {
    //If the ID does not exist, itemDomsStr cannot be obtained
    if (this.id.length === 0) {
      this.id = 'eachitem-' + _public_GUID.create();
    } //!import: The returned HTML element must be current, 
    //otherwise all HTML elements under document may be queried


    var itemDomsStr = '#' + this.id;
    fn.call(this, _internal_traverseIndex.each, itemDomsStr); // Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`

    _internal_traverseIndex.each++;
  }
}

/* harmony default export */ const src_each = (each);
;// CONCATENATED MODULE: ./src/eq.ts

/*
* Reduce the set of matched elements to the one at the specified index.
*
* @param  {Number} index   - A number for index.
* @return {Array}          - Contains only a collection of HTML elements.
*/

function eq(index) {
  var res = [];

  if (_internal_traverseIndex.eq === index) {
    res = this;
  } // Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`


  _internal_traverseIndex.eq++;
  return res;
}

/* harmony default export */ const src_eq = (eq);
;// CONCATENATED MODULE: ./src/first.ts

/*
* Reduce the set of matched elements to the first in the set.
*
* @return {Array}          - Contains only a collection of HTML elements.
*/

function first() {
  var res = [];

  if (_internal_traverseIndex.first === 0) {
    res = this;
  } // Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`


  _internal_traverseIndex.first++;
  return res;
}

/* harmony default export */ const src_first = (first);
;// CONCATENATED MODULE: ./src/last.ts

/*
* Reduce the set of matched elements to the last in the set.
*
* @return {Array}          - Contains only a collection of HTML elements.
*/

function last() {
  var res = [];

  if (_internal_traverseIndex.last === _internal_traverseIndex.total_last - 1) {
    res = this;
  } // Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`


  _internal_traverseIndex.last++;
  return res;
}

/* harmony default export */ const src_last = (last);
;// CONCATENATED MODULE: ./src/filter.ts

/*
* Reduce the set of matched elements to those that match the selector or pass the function's test.
*
* @param  {String} s           - A string containing a selector expression to match elements against.
* @return {Array}              -  The collection of elements
*/

function filter(s) {
  var res = [];
  if (s === undefined) return res;

  if (this.classList.contains(s.replace(/\./g, ''))) {
    res.push(this);
  } // Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`


  _internal_traverseIndex.filter++;
  return res;
}

/* harmony default export */ const src_filter = (filter);
;// CONCATENATED MODULE: ./src/not.ts

/*
* Remove elements from the set of matched elements.
*
* @param  {String} s           - A string containing a selector expression to match elements against.
* @return {Array}              -  The collection of elements
*/

function not(s) {
  var res = [];
  if (s === undefined) return res;

  if (!this.classList.contains(s.replace(/\./g, ''))) {
    res.push(this);
  } // Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`


  _internal_traverseIndex.not++;
  return res;
}

/* harmony default export */ const src_not = (not);
;// CONCATENATED MODULE: ./src/maxDimension.ts

/*
*  Find the Tallest or widest of all elements
*
* @return {Json}      - An object containing the properties width and height.
*/

function maxDimension() {
  if (_internal_traverseIndex.maxDimension === _internal_traverseIndex.total_maxDimension - 1) {
    var currentSelector = _internal_traverseIndex.elements_maxDimension;
    var elementHeights = Array.prototype.map.call(currentSelector, function (el) {
      return el.clientHeight;
    });
    var elementWidths = Array.prototype.map.call(currentSelector, function (el) {
      return el.clientWidth;
    });
    var maxHeight = Math.max.apply(null, elementHeights);
    var maxWidth = Math.max.apply(null, elementWidths);
    return {
      'height': maxHeight,
      'width': maxWidth
    };
  } // Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`


  _internal_traverseIndex.maxDimension++;
  _internal_traverseIndex.elements_maxDimension.push(this);
}

/* harmony default export */ const src_maxDimension = (maxDimension);
;// CONCATENATED MODULE: ./src/ready.ts
/*
* Code included inside the code will run once the entire page (all DOM) is ready.
*
* @param  {Function} fn   - A function to execute after the DOM is ready.
* @return {Void}
*/
function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState != 'loading') fn();
    });
  }
}

/* harmony default export */ const src_ready = (ready);
;// CONCATENATED MODULE: ./src/loader.ts


/*
* Detect when images and videos have been loaded. 
*
* @param  {Json} props   - Contains three event functions before loading, loading, and loading completed.
* @return {Void}
*/

function loader(props) {
  var self = this;
  var sources = [];
  var loadingFn = null,
      progressFn = null,
      loadedFn = null,
      imagesSelector = 'body img',
      videosSelector = 'body video';

  if (_internal_isJSON(props)) {
    loadingFn = props.startEvent;
    progressFn = props.progressEvent;
    loadedFn = props.endEvent;
    imagesSelector = props.imagesSelector;
    videosSelector = props.videosSelector;
  } //count all images on a page


  if (typeof document.images !== 'undefined' && document.images.length == 0) {
    var imgPlaceholder = document.createElement("div");
    imgPlaceholder.innerHTML = '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style="display:none">'; // insert liLast at the end of <>

    document.body.append(imgPlaceholder);
  } //loading


  if (loadingFn && typeof loadingFn == "function") {
    loadingFn();
  } //Push all images from page


  var imgs = document.querySelectorAll(imagesSelector);

  for (var i = 0; i < imgs.length; i++) {
    sources.push({
      "url": imgs[i].src,
      "type": 'img'
    });
  } //Push all videos from page


  var videos = document.querySelectorAll(videosSelector);

  for (var _i = 0; _i < videos.length; _i++) {
    var _sources = videos[_i].getElementsByTagName('source');

    sources.push({
      "url": _sources.length > 0 ? _sources[0].src : videos[_i].src,
      "type": 'video'
    });
  } //Execute after all images and videos have loaded


  var per = 0;
  var perInit = 1;

  if (sources.length == 0) {
    per = 100;
  }

  var loadResources = function loadResources() {
    var promises = [];

    var _loop = function _loop(_i2) {
      if (sources[_i2].type == 'img') {
        ///////////
        // IMAGE //
        ///////////   
        var _promise = new Promise(function (resolve, reject) {
          var img = document.createElement('img');
          img.crossOrigin = 'anonymous';
          img.src = sources[_i2].url;

          img.onload = function (e) {
            //Compatible with safari and firefox
            if (_typeof(e.path) === ( true ? "undefined" : 0)) {
              return resolve(e.target.currentSrc);
            } else {
              return resolve(e.path[0].currentSrc);
            }
          };
        }).then(textureLoaded);

        promises.push(_promise);
      } else {
        ///////////
        // VIDEO //
        ///////////    
        var _promise2 = new Promise(function (resolve, reject) {
          var video = document.createElement('video');
          video.addEventListener("loadedmetadata", function (e) {
            //Compatible with safari and firefox
            if (_typeof(e.path) === ( true ? "undefined" : 0)) {
              return resolve(e.target.currentSrc);
            } else {
              return resolve(e.path[0].currentSrc);
            }
          }, false); // start download meta-datas

          video.src = sources[_i2].url;
        }).then(textureLoaded);

        promises.push(_promise2);
      }
    };

    for (var _i2 = 0; _i2 < sources.length; _i2++) {
      _loop(_i2);
    } //end for


    return Promise.all(promises);
  };

  var textureLoaded = function textureLoaded(url) {
    //progress number
    per = 100 * (perInit / sources.length);
    if (isNaN(per)) per = 100; //Call back progress 

    /* console.log( 'progress: ' + per + '%' ); */

    if (progressFn && typeof progressFn == "function") {
      progressFn.call(self, per);
    }

    perInit++;
    return per;
  }; //and videos loaded
  //Must be placed behind the loadResources()


  loadResources().then(function (images) {
    if (loadedFn && typeof loadedFn == "function") {
      loadedFn();
    }
  });
}

/* harmony default export */ const src_loader = (loader);
;// CONCATENATED MODULE: ./src/append.ts
/*
* Puts data inside an element at the last index (Vanilla JS also has this method)
*
* @param  {Element|String} el   - An element or string to be parsed as HTML or XML and inserted into the tree.
* @return {Void}
*/
function append(el) {
  if (typeof el === 'string') {
    // Just inside the element, after its last child.
    if (document.createElement("div").insertAdjacentHTML) {
      this.insertAdjacentHTML("beforeend", el);
      return this;
    }
  } else {
    var html = typeof el === 'string' ? el : el.outerHTML;
    this.innerHTML += html;
  }
}

/* harmony default export */ const src_append = (append);
;// CONCATENATED MODULE: ./src/prepend.ts
/*
* Puts the prepending element at the first index.  (Vanilla JS also has this method)
*
* @param  {Element|String} el   - An element or string to be parsed as HTML or XML and inserted into the tree.
* @return {Void}
*/
function prepend(el) {
  if (typeof el === 'string') {
    // Just inside the element, before its first child.
    if (document.createElement("div").insertAdjacentHTML) {
      this.insertAdjacentHTML("afterbegin", el);
      return this;
    }
  } else {
    var html = typeof el === 'string' ? el : el.outerHTML;
    this.innerHTML = html + this.innerHTML;
  }
}

/* harmony default export */ const src_prepend = (prepend);
;// CONCATENATED MODULE: ./src/before.ts
/*
* Before the element itself.
*
* @param  {String} el   - The string to be parsed as HTML or XML and inserted into the tree.
* @return {Void}
*/
function before(el) {
  if (typeof el === 'string') {
    // Before the element itself.
    if (document.createElement("div").insertAdjacentHTML) {
      this.insertAdjacentHTML("beforebegin", el);
      return this;
    }
  } else {
    var html = typeof el === 'string' ? el : el.outerHTML;
    this.insertAdjacentHTML("beforebegin", html);
  }
}

/* harmony default export */ const src_before = (before);
;// CONCATENATED MODULE: ./src/after.ts
/*
* After the element itself.
*
* @param  {String} el   - The string to be parsed as HTML or XML and inserted into the tree.
* @return {Void}
*/
function after(el) {
  if (typeof el === 'string') {
    //  After the element itself.
    if (document.createElement("div").insertAdjacentHTML) {
      this.insertAdjacentHTML("afterend", el);
      return this;
    }
  } else {
    var html = typeof el === 'string' ? el : el.outerHTML;
    this.insertAdjacentHTML("afterend", html);
  }
}

/* harmony default export */ const src_after = (after);
;// CONCATENATED MODULE: ./src/prependTo.ts
/*
* Insert an element as the first child node of another
*
* @param  {Element} el  - A DOM node containing one selector to match against.
*/
function prependTo(el) {
  if (this.firstChild) {
    this.insertBefore(el, this.firstChild);
  }
}

/* harmony default export */ const src_prependTo = (prependTo);
;// CONCATENATED MODULE: ./src/appendTo.ts
/*
* Insert an element to the end of the target
*
* @param  {Element} el  - A DOM node containing one selector to match against.
*/
function appendTo(el) {
  this.appendChild(el);
}

/* harmony default export */ const src_appendTo = (appendTo);
;// CONCATENATED MODULE: ./src/wrapInner.ts
/*
* Wrap an HTML structure around the content of each element in the set of matched elements.
*
* @param  {String} el   - An HTML snippet.
* @return {Void}
*/
function wrapInner(el) {
  //get old value
  var val = this.innerHTML; //empty default value

  this.innerHTML = ''; //The DOMParser() method is awesome, but the parseFromString() method stops at IE10.

  var support = function () {
    if (!window.DOMParser) return false;
    var parser = new DOMParser();

    try {
      parser.parseFromString('x', 'text/html');
    } catch (err) {
      return false;
    }

    return true;
  }(); //Convert a template string into HTML DOM nodes


  var stringToHTML = function stringToHTML(str) {
    // If DOMParser is supported, use it
    if (support) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(str, 'text/html');
      var _res = doc.body;
      return _res.children[0];
    } // Otherwise, fallback to old-school method


    var dom = document.createElement('div');
    dom.innerHTML = str;
    var res = dom;
    return res.children[0];
  };

  if (typeof el === 'string') {
    var div = this.appendChild(stringToHTML(el));
    div.innerHTML = val;

    while (this.firstChild !== div) {
      div.appendChild(this.firstChild);
    }
  }
}

/* harmony default export */ const src_wrapInner = (wrapInner);
;// CONCATENATED MODULE: ./src/html.ts
/*
* Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.
*
* @param  {?String} el   - A string of HTML to set as the content of each matched element.
* @return {Void|String}     - The HTML content to set
*/
function html(el) {
  if (el === undefined) {
    return {
      data: this.innerHTML
    };
  } else {
    this.innerHTML = el;
  }
}

/* harmony default export */ const src_html = (html);
;// CONCATENATED MODULE: ./src/text.ts

/*
* Get the combined text contents of each element in the set of matched elements, including 
* their descendants, or set the text contents of the matched elements.
*
* @param  {?String} el      - The text to set as the content of each matched element.
* @return {Void|String}     - The HTML content to set
*/

function text_text(el) {
  if (el === undefined) {
    //Remove HTML Tags
    var htmlstr = this.innerHTML;
    htmlstr = htmlstr.replace(/(<([^>]+)>)/ig, '');
    return {
      data: htmlstr
    };
  } else {
    this.innerHTML = _public_htmlEncode(el);
  }
}

/* harmony default export */ const src_text = (text_text);
;// CONCATENATED MODULE: ./src/clone.ts
/*
* Create a deep copy of the set of matched elements.
*
* @return {Array}          - Contains only a collection of HTML elements. 
*                            Returns a duplicate of the node on which this method was called.
*/
function clone() {
  return {
    data: this.cloneNode(true)
  };
}

/* harmony default export */ const src_clone = (clone);
;// CONCATENATED MODULE: ./src/addClass.ts
/*
* Adds the specified class(es) to each element in the set of matched elements.
*
* @param  {String} c   - One or more space-separated classes to be added to the class attribute of each matched element.
* @return {Void}
*/
function addClass(c) {
  if (!/^\S+$/g.test(c)) {
    // It has only whitespace
    var classArray = c.split(' ');
    var className; // Loop through the array of classes to add one class at a time

    for (var j = 0; j < classArray.length; j++) {
      className = classArray[j];
      this.classList.add(className);
    }
  } else {
    this.classList.add(c);
  }
}

/* harmony default export */ const src_addClass = (addClass);
;// CONCATENATED MODULE: ./src/removeClass.ts
/*
* Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
*
* @param  {String} c   - One or more space-separated classes to be removed from the class attribute of each matched element.
* @return {Void}
*/
function removeClass(c) {
  if (!/^\S+$/g.test(c)) {
    // It has only whitespace
    var classArray = c.split(' ');
    var className; // Loop through the array of classes to add one class at a time

    for (var j = 0; j < classArray.length; j++) {
      className = classArray[j];
      this.classList.remove(className);
    }
  } else {
    this.classList.remove(c);
  }
}

/* harmony default export */ const src_removeClass = (removeClass);
;// CONCATENATED MODULE: ./src/toggleClass.ts
/*
* Add or remove one or more classes from each element in the set of matched elements, 
* depending on either the class's presence or the value of the state argument.
*
* @param  {String} c   - One or more classes (separated by spaces) to be toggled for each element in the matched set.
* @return {Void}
*/
function toggleClass(c) {
  if (!/^\S+$/g.test(c)) {
    // It has only whitespace
    var classArray = c.split(' ');
    var className; // Loop through the array of classes to add one class at a time

    for (var j = 0; j < classArray.length; j++) {
      className = classArray[j];

      if (this.classList.contains(className)) {
        this.classList.remove(className);
      } else {
        this.classList.add(className);
      }
    }
  } else {
    if (this.classList.contains(c)) {
      this.classList.remove(c);
    } else {
      this.classList.add(c);
    }
  }
}

/* harmony default export */ const src_toggleClass = (toggleClass);
;// CONCATENATED MODULE: ./src/css.ts

/*
* Set the style properties of elements:
*
* @param  {Json} props   - The attribute and value to be set, the format is JSON
* @return {Void}
*/

function css(props, value) {
  var self = this;

  if (_internal_isJSON(props)) {
    //the json is ok
    Object.keys(props).forEach(function (prop) {
      self.style[prop] = props[prop];
    });
  } else {
    if (value !== undefined) {
      self.style[props] = value;
    }
  }
}

;
/* harmony default export */ const src_css = (css);
;// CONCATENATED MODULE: ./src/_internal/stringlineToHump.ts
/*
* Convert string to hump naming
* @private
*/
function stringlineToHump(str) {
  if (typeof str === 'string' && str.length > 0) {
    var re = /-(\w)/g;
    str = str.replace(re, function ($0, $1) {
      return $1.toUpperCase();
    });
    return str;
  } else {
    return str;
  }
}

/* harmony default export */ const _internal_stringlineToHump = (stringlineToHump);
;// CONCATENATED MODULE: ./src/removeData.ts

/*
* Remove a previously-stored piece of data.
*
* @param  {String} a                 - A string naming the piece of data to delete.
* @return {Void} 
*/

function removeData(a) {
  a = a || '';

  var _s = _internal_stringlineToHump(a);

  delete this.dataset[_s];
}

/* harmony default export */ const src_removeData = (removeData);
;// CONCATENATED MODULE: ./src/attr.ts
/*
* Set one or more attributes for the set of matched elements.
*
* @param  {String} a                 - The name of the attribute to set.
* @param  {String} v               - A value to set for the attribute. 
* @return {Void|String}              - Get the value of an attribute for the first element in the set of matched elements.
*/
function attr(a, v) {
  a = a || '';

  if (v === undefined) {
    var res = this.getAttribute(a); // Non-existent attributes

    return res == null ? null : res;
  } else {
    this.setAttribute(a, v);
  }
}

;
/* harmony default export */ const src_attr = (attr);
;// CONCATENATED MODULE: ./src/data.ts



/*
* Store arbitrary data associated with the matched elements.
*
* @param  {String} a                 - A string naming the piece of data to set
* @param  {String} v                 - The new data value.
* @return {Void|String}              - Return arbitrary data associated with the first element as set by data() or by an HTML5 data-* attribute.
*/

function data(a, v) {
  a = a || '';

  var _s = _internal_stringlineToHump(a);

  if (v === undefined) {
    var res = this.dataset[_s];
    if (res == 'true') res = true;
    if (res == 'false') res = false;
    if (_internal_isValidNumeric(res)) res = parseFloat(res); //check if Array or JSON format

    if (_internal_isJSON(res)) {
      if (Object.prototype.toString.call(res) === '[object Object]') {
        res = [res];
      } else {
        //If the result is an array, you need to determine whether it is the expected array
        res = [JSON.parse(res)];
      }
    } // Non-existent attributes


    return res == undefined ? null : res;
  } else {
    this.dataset[_s] = v;
  }
}

/* harmony default export */ const src_data = (data);
;// CONCATENATED MODULE: ./src/prop.ts


/*
* Set one or more attributes for the set of matched Form elements.
*
* @param  {String} a                 - The name of the attribute to set.
* @param  {String} v                 - A value to set for the attribute. 
* @return {Void|String}              - Get the value of an attribute for the first element in the set of matched elements.
*/

function prop(a, v) {
  a = a || '';

  if (v === undefined) {
    var res = this[a];
    if (res == 'true') res = true;
    if (res == 'false') res = false;
    if (_internal_isValidNumeric(res)) res = parseFloat(res); //check if Array or JSON format

    if (_internal_isJSON(res)) {
      if (Object.prototype.toString.call(res) === '[object Object]') {
        res = [res];
      } else {
        //If the result is an array, you need to determine whether it is the expected array
        res = [JSON.parse(res)];
      }
    } // Non-existent attributes


    return res == undefined ? null : res;
  } else {
    this[a] = v;
  }
}

/* harmony default export */ const src_prop = (prop);
;// CONCATENATED MODULE: ./src/removeAttr.ts
/*
* Remove an attribute from each element in the set of matched elements.
*
* @param  {String} a                 - A string naming the piece of data to delete.
* @return {Void} 
*/
function removeAttr(a) {
  a = a || '';
  this.removeAttribute(a);
}

/* harmony default export */ const src_removeAttr = (removeAttr);
;// CONCATENATED MODULE: ./src/one.ts

/*
* Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
*
* @param  {String} eventType         - One event types and optional namespaces, such as "click" 
* @param  {?String} selector         - A selector string to filter the descendants of the selected elements that trigger the event. 
* @param  {Function} fn              - A function to execute when the event is triggered. 
* @return {Void}      
*/

function one(eventType, selector, fn) {
  _core_wrap(this).on(eventType, selector, fn, true);
}

/* harmony default export */ const src_one = (one);
;// CONCATENATED MODULE: ./src/_internal/isChild.ts
/*
* Determine whether it is Child Node
* @private
*/
function isChild(el, p) {
  if (!el || !p || !p.childNodes || !p.childNodes.length) {
    return false;
  }

  return [].slice.call(p.childNodes).filter(function (n) {
    var found = n === el;

    if (!found && n.childNodes && n.childNodes.length) {
      return isChild(el, n);
    }

    return found;
  }).length;
}

/* harmony default export */ const _internal_isChild = (isChild);
;// CONCATENATED MODULE: ./src/on.ts

/*
* Attach an event handler function for one or more events to the selected elements.
*
* @param  {String} eventType         - One event types and optional namespaces, such as "click" 
* @param  {?String} selector         - A selector string to filter the descendants of the selected elements 
*                                      that trigger the event. 
* @param  {Function} fn              - A function to execute when the event is triggered. 
* @param  {Boolean} once             - A boolean value indicating that the listener should be invoked at most 
*                                      once after being added. If true, the listener would be automatically 
*                                      removed when invoked.
* @return {Void}      
*/

function on(eventType, selector, fn, once) {
  if (typeof once === 'undefined') once = false;
  var _curFun = null;

  if (typeof fn !== 'function') {
    fn = selector;
    selector = null;
  }

  if (!this.myListeners) {
    this.myListeners = [];
  }

  ;

  if (selector) {
    //if string
    _curFun = function _curFun(evt) {
      [].slice.call(this.querySelectorAll(selector)).forEach(function (el) {
        if (el === evt.target) {
          fn.call(el, evt);
        } else if (_internal_isChild(evt.target, el)) {
          fn.call(el, evt);
        }
      });
    };

    this.myListeners.push({
      eType: eventType,
      callBack: _curFun,
      "function": fn,
      selector: selector
    });
  } else {
    //if HTML element
    _curFun = function _curFun(evt) {
      fn.call(this, evt);
    };

    this.myListeners.push({
      eType: eventType,
      callBack: _curFun,
      "function": fn,
      selector: selector
    });
  }

  if (once) {
    this.addEventListener(eventType, _curFun, {
      once: true
    });
  } else {
    this.addEventListener(eventType, _curFun);
  }
}

/* harmony default export */ const src_on = (on);
;// CONCATENATED MODULE: ./src/off.ts
/*
* Remove an event handler.
*
* @param  {?String} eventType             - One event types and optional namespaces, such as "click"
* @param  {?String|Function} curSelector  - A selector string or function to filter the descendants of the selected elements that trigger the event. 
* @return {Void}      
*/
function off(eventType, curSelector) {
  if (this.myListeners) {
    for (var i = 0; i < this.myListeners.length; i++) {
      if (typeof curSelector !== 'undefined') {
        if (typeof curSelector === "function") {
          //is function
          if (curSelector === this.myListeners[i]["function"]) this.removeEventListener(this.myListeners[i].eType, this.myListeners[i].callBack);
        } else {
          //is string
          if (curSelector === this.myListeners[i].selector) this.removeEventListener(this.myListeners[i].eType, this.myListeners[i].callBack);
        }
      } else {
        this.removeEventListener(this.myListeners[i].eType, this.myListeners[i].callBack);
      }
    }

    ;
    delete this.myListeners;
  }

  ;
}

/* harmony default export */ const src_off = (off);
;// CONCATENATED MODULE: ./src/offset.ts
/*
* Get the current coordinates of the first element in the set of matched elements, relative to the document.
*
* @return {Json}      - An object containing the properties top and left. 
*/
function offset() {
  var box = this.getBoundingClientRect();
  var top = 0,
      left = 0; //Include scrollbar and border

  top = box.top + window.pageYOffset - document.documentElement.clientTop;
  left = box.left + window.pageXOffset - document.documentElement.clientLeft;
  return {
    top: top,
    left: left
  };
}

/* harmony default export */ const src_offset = (offset);
;// CONCATENATED MODULE: ./src/position.ts
/*
* Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.
*
* @return {Json}      - An object containing the properties top and left.
*/
function position() {
  var top = this.offsetTop ? this.offsetTop : 0,
      left = this.offsetLeft ? this.offsetLeft : 0;
  return {
    top: top,
    left: left
  };
}

/* harmony default export */ const src_position = (position);
;// CONCATENATED MODULE: ./src/scrollTop.ts
/*
* Get the number of pixels that an element's content is scrolled vertically.
*
* @return {Number}  - Returns a pure number calculated.
*/
function scrollTop() {
  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
  var scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? this.scrollTop : document.body.scrollTop;
  return scrollTop;
}

/* harmony default export */ const src_scrollTop = (scrollTop);
;// CONCATENATED MODULE: ./src/scrollLeft.ts
/*
* Get the number of pixels that an element's content is scrolled from its left edge.
*
@return {Number}  - Returns a pure number calculated.
*/
function scrollLeft(val) {
  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
  var scrollLeft = supportPageOffset ? window.pageXOffset : isCSS1Compat ? this.scrollLeft : document.body.scrollLeft;
  return scrollLeft;
}

/* harmony default export */ const src_scrollLeft = (scrollLeft);
;// CONCATENATED MODULE: ./src/_internal/actualPropertyValue.ts
/*
* Get the actual value with user specific methed
* it can be 'width', 'height', 'outerWidth', 'outerHeight'
* @private
* @param {Element} el           - A DOM node containing one selector to match against.
* @param {String} prop          - A string naming the property of style.
* @param {?Json} config         - Whether or not margin is included. The key `includeMargin` 
									takes effect when set to true
* @return {Number}              - Returns a pure number.
*/
function actualPropertyValue(el, prop, config) {
  var style = window.getComputedStyle ? window.getComputedStyle(el) : el.currentStyle,
      display = style.display,
      position = style.position,
      visibility = style.visibility;
  var marginWidth = 0;
  var marginHeight = 0;
  var maxVal;
  var actualVal;

  if (config && config.includeMargin === true) {
    marginWidth = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    marginHeight = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
  }

  if (prop === 'width') {
    maxVal = parseFloat(style.maxWidth); // if its not hidden we just return normal height

    if (display !== 'none' && maxVal !== '0') {
      return el.clientWidth;
    }
  }

  if (prop === 'height') {
    maxVal = parseFloat(style.maxHeight);

    if (display !== 'none' && maxVal !== '0') {
      return el.clientHeight;
    }
  }

  if (prop === 'outerWidth') {
    maxVal = parseFloat(style.maxWidth);

    if (display !== 'none' && maxVal !== '0') {
      return el.offsetWidth + marginWidth;
    }
  }

  if (prop === 'outerHeight') {
    maxVal = parseFloat(style.maxHeight);

    if (display !== 'none' && maxVal !== '0') {
      return el.offsetHeight + marginHeight;
    }
  } // the element is hidden so:
  // making the el block so we can meassure its height but still be hidden


  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';
  if (prop === 'width') actualVal = el.clientWidth;
  if (prop === 'height') actualVal = el.clientHeight;
  if (prop === 'outerWidth') actualVal = el.offsetWidth + marginWidth;
  if (prop === 'outerHeight') actualVal = el.offsetHeight + marginHeight; // reverting to the original values

  el.style.display = display;
  el.style.position = position;
  el.style.visibility = visibility;
  return actualVal;
}

/* harmony default export */ const _internal_actualPropertyValue = (actualPropertyValue);
;// CONCATENATED MODULE: ./src/_internal/getStyle.ts

/*
* Get real style data
* @private
*/

function getStyle(el, attr) {
  var self = el;

  if (typeof window !== 'undefined') {
    //document or window data
    //-----------------
    if (self === document.body) {
      if (attr == 'height') return document.body.clientHeight;
      if (attr == 'width') return document.body.clientWidth;
    }

    if (self === window) {
      if (attr == 'height') return window.innerHeight;
      if (attr == 'width') return window.innerWidth;
    } //element data
    //-----------------


    var _val = 0;
    var computedStyle = window.getComputedStyle ? getComputedStyle(self) // Standards
    : self.currentStyle; // Old IE

    if (computedStyle) {
      // This will be true on nearly all browsers
      _val = computedStyle[attr]; //return ??px
    } // if getComputedStyle return 'auto'


    if (attr === 'height' && _val === 'auto') return _internal_actualPropertyValue(self, 'height');
    if (attr === 'width' && _val === 'auto') return _internal_actualPropertyValue(self, 'width'); //

    var newVal = /\d+/.exec(_val); // Array ["123"]

    return parseFloat(newVal);
  } else {
    return 0;
  }
}

/* harmony default export */ const _internal_getStyle = (getStyle);
;// CONCATENATED MODULE: ./src/width.ts

/*
* Get or set the current computed width for elenments
*
* @param  {?String|?Number} val         - An integer representing the number of pixels, or 
*                                         an integer along with an optional unit of measure appended (as a string).
* @return {Void|Number}                 -  Get the current computed width for the first element in the set of matched elements.
*/

function width(val) {
  var self = this;

  if (typeof val !== 'undefined') {
    self.style.width = val.toString().indexOf('%') < 0 ? val + 'px' : val;
  }

  return _internal_getStyle(self, 'width');
}

/* harmony default export */ const src_width = (width);
;// CONCATENATED MODULE: ./src/height.ts

/*
* Get or set the current computed height for elenments
*
* @param  {?String|?Number} val         - An integer representing the number of pixels, or 
*                                         an integer along with an optional unit of measure appended (as a string).
* @return {Void|Number}                 -  Get the current computed height for the first element in the set of matched elements.
*/

function height(val) {
  var self = this;

  if (typeof val !== 'undefined') {
    self.style.height = val.toString().indexOf('%') < 0 ? val + 'px' : val;
  }

  return _internal_getStyle(self, 'height');
}

/* harmony default export */ const src_height = (height);
;// CONCATENATED MODULE: ./src/outerWidth.ts

/*
* Get or set the current computed outer width for elenments (including padding, border, and optionally margin)
*
* @param  {Boolean} includeMargin         - A Boolean indicating whether to include the element's margin in the calculation.
* @return {Number}  - Returns the width of the element, including left and right padding, border, and optionally margin, in pixels.
*/

function outerWidth_outerWidth(includeMargin) {
  var self = this;
  var width_IncPaddingBorderScrollbar = self.offsetWidth;
  var marginLeft = _internal_getStyle(self, 'marginLeft');
  var marginRight = _internal_getStyle(self, 'marginRight');
  var borderLeftWidth = _internal_getStyle(self, 'borderLeftWidth') || 0;
  var borderRightWidth = _internal_getStyle(self, 'borderRightWidth') || 0;
  var totalWidth = width_IncPaddingBorderScrollbar;

  if (typeof includeMargin !== 'undefined') {
    totalWidth = totalWidth + marginLeft + marginRight;
  }

  return totalWidth;
}

/* harmony default export */ const src_outerWidth = (outerWidth_outerWidth);
;// CONCATENATED MODULE: ./src/outerHeight.ts

/*
* Get or set the current computed outer height for elenments (including padding, border, and optionally margin)
*
* @param  {Boolean} includeMargin         - A Boolean indicating whether to include the element's margin in the calculation.
* @return {Number}   - Returns the height of the element, including left and right padding, border, and optionally margin, in pixels.
*/

function outerHeight_outerHeight(includeMargin) {
  var self = this;
  var height_IncPaddingBorderScrollbar = self.offsetHeight;
  var marginTop = _internal_getStyle(self, 'marginTop');
  var marginBottom = _internal_getStyle(self, 'marginBottom');
  var borderTopWidth = _internal_getStyle(self, 'borderTopWidth') || 0;
  var borderBottomWidth = _internal_getStyle(self, 'borderBottomWidth') || 0;
  var totalHeight = height_IncPaddingBorderScrollbar;

  if (typeof includeMargin !== 'undefined') {
    totalHeight = totalHeight + marginTop + marginBottom;
  }

  return totalHeight;
}

/* harmony default export */ const src_outerHeight = (outerHeight_outerHeight);
;// CONCATENATED MODULE: ./src/remove.ts
/*
* Remove the set of matched elements from the DOM.
*
* @return {Void} 
*/
function remove() {
  this.parentNode.removeChild(this);
}

/* harmony default export */ const src_remove = (remove);
;// CONCATENATED MODULE: ./src/empty.ts
/*
* Remove all child nodes of the set of matched elements from the DOM.
*
* @return {Void} 
*/
function empty() {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
}

/* harmony default export */ const src_empty = (empty);
;// CONCATENATED MODULE: ./src/allAttrs.ts
/*
* Traverse all the attribute names and values in an HTML element
*
* @return {Array}              - A new array containing the properties name and value.
*/
function allAttrs() {
  var newArr = [];
  Array.from(this.attributes).filter(function (obj) {
    return obj.specified;
  }).map(function (obj) {
    newArr[obj.nodeName] = obj.textContent;
  });
  return {
    data: newArr
  };
}

/* harmony default export */ const src_allAttrs = (allAttrs);
;// CONCATENATED MODULE: ./src/hasClass.ts
/*
* Determine whether any of the matched elements are assigned the given class.
*
* @param  {String} v         - The class name to search for.
* @return {Boolean}   - Return true if the class is assigned to an element
*/
function hasClass(v) {
  return this.classList.contains(v) ? true : false;
}

/* harmony default export */ const src_hasClass = (hasClass);
;// CONCATENATED MODULE: ./src/_internal/elementPath.ts
/*
* Get CSS path from Dom element
* @private
*/
function elementPath(el) {
  if (!(el instanceof Element)) return; //

  var path = [];
  var itemIndex = 0;

  while (el.nodeType === Node.ELEMENT_NODE) {
    var oldSelector = el.nodeName.toLowerCase();
    var selector = oldSelector;

    if (el.id) {
      if (itemIndex > 0) selector += '#' + el.id;
    }

    if (el.className) {
      selector += '.' + el.className.replace(/\s+/g, ".");
    }

    selector = selector.replace(/\.\./g, "."); //Add one or more items to the start of an array's result set.

    path.unshift(selector); //

    el = el.parentNode; //

    itemIndex++;
  }

  return path.join(" > ");
}

/* harmony default export */ const _internal_elementPath = (elementPath);
;// CONCATENATED MODULE: ./src/val.ts

/*
* Get or set the current value of the first element in the set of matched elements.
*
* @param  {?String|?Number|?Array} v      - Corresponding to the value of each matched element.
* @return {String}          - Get the values of form elements.
*/

function val(v) {
  var controlType = '';

  if (this.tagName == "INPUT" || this.tagName == "TEXTARTA") {
    //not `radio`, `checkbox`
    if (this.type != 'checkbox' && this.type != 'radio') {
      controlType = 'input-textarea';
    } //`checkbox`


    if (this.type == 'checkbox') {
      controlType = 'checkbox';
    } //`radio`


    if (this.type == 'radio') {
      controlType = 'radio';
    }
  } //`select`


  if (this.tagName == "SELECT") {
    controlType = 'select';
  } //


  if (typeof v !== 'undefined') {
    switch (controlType) {
      case "input-textarea":
        this.value = v;
        break;

      case "checkbox":
        this.checked = v;
        break;

      case "radio":
        var currentSelectorDomsStr = _internal_elementPath(this);
        var currentSelector = [].slice.call(document.querySelectorAll(currentSelectorDomsStr));
        currentSelector.map(function (item, index) {
          if (item.value == v.toString()) {
            item.checked = true;
          }
        });
        break;

      case "select":
        this.value = v;
        this.dispatchEvent(new Event('change'));
        break;

      default:
        this.value = v;
    } //end switch

  }

  switch (controlType) {
    case "input-textarea":
      return this.value;

    case "checkbox":
      return this.checked ? 1 : 0;

    case "radio":
      var _currentSelectorDomsStr = _internal_elementPath(this);

      var _currentSelector = [].slice.call(document.querySelectorAll(_currentSelectorDomsStr));

      var radios = _currentSelector;
      var _value = null;

      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          // do whatever you want with the checked radio
          _value = radios[i].value; // only one radio can be logically checked, don't check the rest

          break;
        }
      }

      return _value;

    case "select":
      return this.value;

    default:
      return this.value;
  } //end switch

}

/* harmony default export */ const src_val = (val);
;// CONCATENATED MODULE: ./src/show.ts
/*
* Display the matched elements.
*
* @return {Void} 
*/
function show() {
  // use inherit so that your CSS controls block/flex/inline-block etc
  this.style.display = 'inherit';
}

/* harmony default export */ const src_show = (show);
;// CONCATENATED MODULE: ./src/hide.ts
/*
* Hide the matched elements.
*
* @return {Void}    
*/
function hide() {
  this.style.display = 'none';
}

/* harmony default export */ const src_hide = (hide);
;// CONCATENATED MODULE: ./src/fadeIn.ts
/*
* Display the matched elements by fading them to opaque.
*
* @param  {Number} speed             - A string or number determining how long the animation will run.
* @param  {Function} callback        - A function to call once the animation is complete, called once per matched element.
* @return {Void} 
*/
function fadeIn(speed, callback) {
  var elem = this;
  var opacity = 0;

  if (!elem.style.opacity) {
    elem.style.opacity = 0;
  }

  elem.style.display = "inherit";
  var inInterval = setInterval(function () {
    opacity += .02;
    elem.style.opacity = opacity;

    if (opacity >= 1) {
      clearInterval(inInterval); //do something after inInterval()

      elem.style.removeProperty("opacity");

      if (callback && typeof callback == "function") {
        callback();
      }
    }
  }, speed / 50);
}

/* harmony default export */ const src_fadeIn = (fadeIn);
;// CONCATENATED MODULE: ./src/fadeOut.ts
/*
* Hide the matched elements by fading them to transparent.
*
* @param  {Number} speed             - A string or number determining how long the animation will run.
* @param  {Function} callback        - A function to call once the animation is complete, called once per matched element.
* @return {Void} 
*/
function fadeOut(speed, callback) {
  var elem = this;
  var opacity = 1;

  if (!elem.style.opacity) {
    elem.style.opacity = 1;
  }

  var outInterval = setInterval(function () {
    opacity -= .02;
    elem.style.opacity = opacity;

    if (opacity <= 0) {
      clearInterval(outInterval); //do something after outInterval()

      elem.style.opacity = 0;
      elem.style.display = "none"; //adding dispaly property and equall to none	

      if (callback && typeof callback == "function") {
        callback();
      }
    }
  }, speed / 50);
}

/* harmony default export */ const src_fadeOut = (fadeOut);
;// CONCATENATED MODULE: ./src/serializeArray.ts


/*
* Serialize html form to JSON
*
* @return {Void}    
*/
function serializeArray() {
  var form = this;
  var objects = [];

  if (_typeof(form) == 'object' && form.nodeName.toLowerCase() == "form") {
    var fieldsTypes = ['input', 'textarea', 'select', 'checkbox', 'progress', 'datalist'];
    fieldsTypes.map(function (item, index) {
      var fields = form.getElementsByTagName(item);

      for (var i = 0; i < fields.length; i++) {
        objects[objects.length] = {
          name: fields[i].getAttribute("name"),
          value: fields[i].value
        };
      }
    });
  }

  return objects;
}

/* harmony default export */ const src_serializeArray = (serializeArray);
;// CONCATENATED MODULE: ./src/getIndex.ts
/*
* Search for a given element from among the matched elements.
*
* @return {Number}     - The return value is an integer indicating the position of the 
*                        first element within the object relative to its sibling elements.
*/
function getIndex() {
  var self = this;
  var children = self.parentNode.childNodes;
  var num = 0;

  for (var i = 0; i < children.length; i++) {
    if (children[i] == self) return num;
    if (children[i].nodeType == 1) num++;
  }

  return -1;
}

/* harmony default export */ const src_getIndex = (getIndex);
;// CONCATENATED MODULE: ./src/trigger.ts
/*
* Bind an event in the HTML element
*
* @param  {String} eventType         - One event types and optional namespaces, such as "click" 
* @return {Void}  
*/
function trigger(eventType) {
  var fire = function fire(elem, type) {
    // create and dispatch the event
    var event = new CustomEvent(type, {
      detail: {
        hazcheeseburger: true
      }
    });
    elem.dispatchEvent(event);
  };

  document.addEventListener("plop", function () {}, false);
  fire(this, eventType);
}

/* harmony default export */ const src_trigger = (trigger);
;// CONCATENATED MODULE: ./src/_internal/easing.ts
/*
* Some easing functions
* @private
* @link: https://easings.net
* @param {Number} t   - time (Amount of time that has passed since the beginning of the animation. Usually starts at 0 and is slowly increased using a game loop or other update function.)
* @param {Number} b   - beginning value (The starting point of the animation. Usually it's a static value, you can start at 0 for example.)
* @param {Number} c   - change in value (The amount of change needed to go from starting point to end point. It's also usually a static value.)
* @param {Number} d   - duration (Amount of time the animation will take. Usually a static value aswell.)
* @return {Number}
*/
function easeLinear(t, b, c, d) {
  return c * t / d + b;
}

function easeInQuart(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
}

function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

function easeInCubic(t, b, c, d) {
  return c * (t /= d) * t * t + b;
}

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
}


;// CONCATENATED MODULE: ./src/animate.ts

/*
* Create a new Animation, applies it to the element, then plays the animation
* @param  {String} prop         - The style property to be set.
* @param  {Number} from         - The initial offset of the object
* @param  {Number} to           - The end offset of the object
* @param  {String} unit         - Unit string, such as `px` and `%`, and so on.
* @param  {Number} duration     - The number of milliseconds each iteration of the animation takes to complete
* @param  {String} easing       - The rate of the animation's change over time. Accepts the pre-defined values "linear", "ease-in", "ease-out", and "ease-in-out"
* @param  {Function} complete   - A function to call once the animation is complete, called once per matched element.
* @return {Void}
*/

function animate(prop, from, to, unit, duration, easing, complete) {
  var el = this;
  var start = new Date().getTime();
  var timer = setInterval(function () {
    var time = new Date().getTime() - start;
    var val;

    switch (easing) {
      case "linear":
        val = easeLinear(time, from, to - from, duration);
        break;

      case "ease-in":
        val = easeInCubic(time, from, to - from, duration);
        break;

      case "ease-out":
        val = easeOutCubic(time, from, to - from, duration);
        break;

      case "ease-in-out":
        val = easeInOutCubic(time, from, to - from, duration);
        break;

      default:
        val = easeLinear(time, from, to - from, duration);
    } //


    var res = val + unit;
    el.style[prop] = res;

    if (time >= duration) {
      clearInterval(timer); //

      if (complete && typeof complete == "function") {
        complete.call(el);
      }
    }
  }, 1000 / 60);
}

/* harmony default export */ const src_animate = (animate);
;// CONCATENATED MODULE: ./src/_core/wrap.ts

/*
* Wrap the selector
* @private
*
* @param  {String|Element} s       - The selector to search for or HTML element to wrap with functionality
* @param  {?Element} root          - OPTIONAL An HTML element to start the element query from
* @return {NodeList}               - The collection of elements, wrapped with functionality (see API methods)
*/

function nativeQuery(s, root) {
  root = root || document;

  if (typeof s !== 'undefined') {
    if (typeof s === 'string') {
      //1) string
      return wrap([].slice.call(root.querySelectorAll(s)));
    } else if (s.tagName) {
      //2) HTML elements
      return wrap([s]);
    } else {
      if (s == window) {
        return wrap([s]);
      } //3) document or other


      switch (s.nodeType) {
        case 9:
          //if Document
          return wrap([document.body]);

        default:
          return [];
      }
    }
  } //typeof (s) !== 'undefined'


  return [];
}
/* ------------- Independent Methods (public) -------------- */

/*
* Return a prototype that extending by adding new methods
* @public
*
* @return {Object.prototype}  
*/


if (typeof window['__fn'] !== 'undefined') {
  window['__fn'].forEach(function (item) {
    nativeQuery.prototype[item.name] = item.fn;
  });
}



















nativeQuery.ajax = _public_ajax;
nativeQuery.browser = _public_browser;
nativeQuery.cssProperty = _public_cssProperty;
nativeQuery.debounce = _public_debounce;
nativeQuery.deepClone = _public_deepClone;
nativeQuery.GUID = _public_GUID;
nativeQuery.htmlDecode = _public_htmlDecode;
nativeQuery.htmlEncode = _public_htmlEncode;
nativeQuery.isTouchCapable = _public_isTouchCapable;
nativeQuery.lastUrlParamFormat = _public_lastUrlParamFormat;
nativeQuery.math = _public_math;
nativeQuery.removeFirstLastStr = _public_removeFirstLastStr;
nativeQuery.setDefaultOptions = _public_setDefaultOptions;
nativeQuery.styleFormat = _public_styleFormat;
nativeQuery.throttle = _public_throttle;
nativeQuery.toSlug = _public_toSlug;
nativeQuery.trim = _public_trim;
nativeQuery.validate = _public_validate;
/* ------------- Private Methods -------------- */
//dom








 //traverse with index







 //other methods













































 //dom

nativeQuery.prototype.find = src_find;
nativeQuery.prototype.closest = src_closest;
nativeQuery.prototype.prev = src_prev;
nativeQuery.prototype.next = src_next;
nativeQuery.prototype.parent = src_parent;
nativeQuery.prototype.parents = src_parents;
nativeQuery.prototype.children = src_children;
nativeQuery.prototype.siblings = src_siblings; //traverse with index

nativeQuery.prototype.each = src_each;
nativeQuery.prototype.eq = src_eq;
nativeQuery.prototype.first = src_first;
nativeQuery.prototype.last = src_last;
nativeQuery.prototype.filter = src_filter;
nativeQuery.prototype.not = src_not;
nativeQuery.prototype.maxDimension = src_maxDimension; //other methods

nativeQuery.prototype.ready = src_ready;
nativeQuery.prototype.loader = src_loader;
nativeQuery.prototype.append = src_append;
nativeQuery.prototype.prepend = src_prepend;
nativeQuery.prototype.before = src_before;
nativeQuery.prototype.after = src_after;
nativeQuery.prototype.prependTo = src_prependTo;
nativeQuery.prototype.appendTo = src_appendTo;
nativeQuery.prototype.wrapInner = src_wrapInner;
nativeQuery.prototype.html = src_html;
nativeQuery.prototype.text = src_text;
nativeQuery.prototype.clone = src_clone;
nativeQuery.prototype.addClass = src_addClass;
nativeQuery.prototype.removeClass = src_removeClass;
nativeQuery.prototype.toggleClass = src_toggleClass;
nativeQuery.prototype.css = src_css;
nativeQuery.prototype.removeData = src_removeData;
nativeQuery.prototype.attr = src_attr;
nativeQuery.prototype.data = src_data;
nativeQuery.prototype.prop = src_prop;
nativeQuery.prototype.removeAttr = src_removeAttr;
nativeQuery.prototype.one = src_one;
nativeQuery.prototype.on = src_on;
nativeQuery.prototype.off = src_off;
nativeQuery.prototype.offset = src_offset;
nativeQuery.prototype.position = src_position;
nativeQuery.prototype.scrollTop = src_scrollTop;
nativeQuery.prototype.scrollLeft = src_scrollLeft;
nativeQuery.prototype.width = src_width;
nativeQuery.prototype.height = src_height;
nativeQuery.prototype.outerWidth = src_outerWidth;
nativeQuery.prototype.outerHeight = src_outerHeight;
nativeQuery.prototype.remove = src_remove;
nativeQuery.prototype.empty = src_empty;
nativeQuery.prototype.allAttrs = src_allAttrs;
nativeQuery.prototype.hasClass = src_hasClass;
nativeQuery.prototype.val = src_val;
nativeQuery.prototype.show = src_show;
nativeQuery.prototype.hide = src_hide;
nativeQuery.prototype.fadeIn = src_fadeIn;
nativeQuery.prototype.fadeOut = src_fadeOut;
nativeQuery.prototype.serializeArray = src_serializeArray;
nativeQuery.prototype.index = src_getIndex;
nativeQuery.prototype.trigger = src_trigger;
nativeQuery.prototype.animate = src_animate;
var API = {};
var fns = Object.values(nativeQuery.prototype);
Object.keys(nativeQuery.prototype).forEach(function (name, index) {
  API[name] = fns[index];
});

function wrap(list) {
  Object.keys(API).forEach(function (fn) {
    list[fn] = function () {
      //slice method can also be called to convert Array-like objects/collections to a new Array. 
      //You just bind the method to the object. The arguments inside a function is an example of an 'array-like object'.
      var args = arguments; //

      var result; // ////////////////////
      // Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`
      //----------------------	

      switch (fn) {
        case 'each':
          // for `each()`
          _internal_traverseIndex.each = 0;
          break;

        case 'eq':
          // for `eq()`
          _internal_traverseIndex.eq = 0;
          break;

        case 'first':
          // for `first()`
          _internal_traverseIndex.first = 0;
          break;

        case 'last':
          // for `last()`
          _internal_traverseIndex.last = 0;
          _internal_traverseIndex.total_last = list.length;
          break;

        case 'filter':
          // for `filter()`
          _internal_traverseIndex.filter = 0;
          break;

        case 'not':
          // for `not()`
          _internal_traverseIndex.not = 0;
          break;

        case 'maxDimension':
          // for `maxDimension()`
          _internal_traverseIndex.maxDimension = 0;
          _internal_traverseIndex.total_maxDimension = list.length;
          _internal_traverseIndex.elements_maxDimension = [];
          break;
      } // ////////////////////
      // Methods that return value is `DOM elements using selectors`
      //----------------------


      var selectors = this;

      if (Array.isArray(this)) {
        result = [];
        this.forEach(function (eachSelector) {
          var fnResult = API[fn].apply(eachSelector, [].slice.call(args));

          if (Array.isArray(fnResult)) {
            result = result.concat(fnResult);
          } else if (fnResult !== undefined) {
            result.push(fnResult);
          }
        });

        if (fn === 'find' || fn === 'closest' || fn === 'prev' || fn === 'next' || fn === 'first' || fn === 'last' || fn === 'parent' || fn === 'parents' || fn === 'children' || fn === 'eq' || fn === 'filter' || fn === 'not' || fn === 'siblings') {
          wrap(result);
        } else {
          result = result.length && result || undefined;
        }
      } else {
        result = API[fn].apply(this, [].slice.call(args));
      } //end Array.isArray(this)
      // ////////////////////
      // Methods that return value is `JSON`, `Boolean` or `Number`
      //----------------------


      if (fn === 'hasClass' || fn === 'offset' || fn === 'position' || fn === 'index' || fn === 'width' || fn === 'outerWidth' || fn === 'height' || fn === 'outerHeight' || fn === 'maxDimension' || fn === 'allAttrs' || fn === 'scrollTop' || fn === 'scrollLeft' || fn === 'html' || fn === 'text' || fn === 'clone') {
        return result === undefined ? this : typeof result[0].data !== 'undefined' ? result[0].data : result[0];
      } // ////////////////////
      // Methods that return value is `Array` or `HTML element`
      //----------------------


      if (fn === 'data' || fn === 'attr' || fn === 'prop' || fn === 'val') {
        return result === undefined ? this : result[0];
      } // ////////////////////
      // The default returns value from a function
      //----------------------


      return result === undefined ? this : result;
    };
  });
  return list;
}

/* harmony default export */ const _core_wrap = (nativeQuery);
;// CONCATENATED MODULE: ./src/_core/global.ts


var __ = function () {
  'use strict';

  if (typeof window !== 'undefined') {
    window.__ = _core_wrap;
  }

  return _core_wrap;
}();

/* harmony default export */ const global = (__);
;// CONCATENATED MODULE: ./src/index.ts

/* harmony default export */ const src = (global);
BootHelpersLib = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=dist/boot-helpers.js.map