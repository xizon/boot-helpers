
/** 
 *************************************
 * boot-helpers
 *
 * @package: https://github.com/xizon/boot-helpers
 * @author: UIUX Lab <uiuxlab@gmail.com>
 * @license: MIT
 *
 *************************************
 */

const __ = (function () {

    'use strict';

	/**
	 * Create the constructor (Wrap the selector)
	 * @private
	 *
	 * @param  {String|Element|Array} s  - The selector to search for or HTML element to wrap with functionality
	 * @param  {Element} root            - OPTIONAL An HTML element to start the element query from
	 * @return {NodeList}                - The collection of elements, wrapped with functionality (see API methods)
	 */
    const Constructor = function (s, root) {
        if ( typeof (s) === 'undefined' ) return;
        

        // Backward compatibility, some methods need to use it
        this.storeSelector = this; 
        

        //
        this.elems = [];
		root = root || document;
        
        if ( Array.isArray(s) ) {
            //is array
            // eg.  [li#demo1, li#demo2, li#demo3]
            // [ [li#demo1, li#demo2, li#demo3] ]
            //----------

            // There may be Nested array, the array needs to be flattened
            s = [].concat(...s);

            this.elems = s;

        } else {

            //not array
            //----------
            
			if (typeof(s) === 'string') {
				//1) string
				this.elems = root.querySelectorAll(s);

			} else if (s.tagName) {
				//2) HTML elements
				this.elems = [s];

			} else {

                //3) window
				if ( s === window ) this.elems = [window];

				//4) document or other
				switch( s.nodeType ) {
					 case 9:
						//if Document
						this.elems = [document.body];
                        break;

					 default:
						
				} 

			}		

		}


    };

    /**
     * Instantiate a new constructor
     * @private
     */
    const $$ = function (s, root) {
        return new Constructor(s, root);
    };


    /**
     * Return a prototype that extending by adding new methods
     * @private
     */
    $$.fn = Constructor.prototype;



	/* ------------- Private Methods -------------- */

	/**
	 * Get real style data
	 * @private
	 */
    function getStyle( el, attr ) {
		const self = el;
		

		if ( typeof (window) !== 'undefined' ) {
			
			//document or window data
			//-----------------
			if ( self === document.body ) {
				if ( attr == 'height' ) return document.body.clientHeight;
				if ( attr == 'width' ) return document.body.clientWidth;
			}

			if ( self === window ) {
				if ( attr == 'height' ) return window.innerHeight;
				if ( attr == 'width' ) return window.innerWidth;
			}		
	

			//element data
			//-----------------
			let _val = 0;
			
			const computedStyle = window.getComputedStyle
								? getComputedStyle(self) // Standards
								: self.currentStyle;     // Old IE


			if (computedStyle) { // This will be true on nearly all browsers
				_val =  computedStyle[attr];  //return ??px
			}

            
			
			// if getComputedStyle return 'auto'
			if ( attr === 'height' && _val === 'auto' ) return actualPropertyValue(self, 'height');
			if ( attr === 'width'  && _val === 'auto' ) return actualPropertyValue(self, 'width');

			//
			const newVal = /\d+/.exec( _val ); // Array ["123"]
			return parseFloat( newVal );

		} else {
			return 0;
		}
    }
	

	
	/**
	 * Determine whether it is Child Node
	 * @private
	 */
	function isChild( el, p ) {
		if (!el || !p || !p.childNodes || !p.childNodes.length) {
			return false;
		}
		return ([].slice.call(p.childNodes).filter(function(n) {
			const found = (n === el);
			if (!found && n.childNodes && n.childNodes.length) {
				return isChild(el, n);
			}
			return found;
		})).length;
	}

	
	
	/**
	 * Determine whether it is in JSON format
	 * @private
	 */
	function isJSON( str ){
		
		if ( typeof(str) === 'string' && str.length > 0 ) {

			if ( str.replace( /\"\"/g, '' ).replace( /\,/g, '' ) == '[{}]' ) {
				return false;
			} else {

				if (/^[\],:{}\s]*$/.test( str.replace(/\\["\\\/bfnrtu]/g, '@' ).
				replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
				replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

					return true;

				}else{
					return false;
				}	

			}

		} else {
			
			if ( 
				typeof(str) === 'object' && 
				Object.prototype.toString.call(str) === '[object Object]' &&
			    ! str.length
			   ) {
				return true;
			} else {
				return false;
			}
			
		}

	}
	
	
	
	/**
	 * Delete elements in the array
	 * @private
	 */
	function removeArray(arr) {
		let what, 
			args = arguments, 
			len = args.length, 
			index;
		
		while (len > 1 && arr.length) {
			what = args[--len];
			while ((index = arr.indexOf(what)) !== -1) {
				arr.splice(index, 1);
			}
		}
		return arr;
	}
	
	
	/**
	 * Convert string to camel case
	 * @private
	 */
	function toCamelCase(s) {
		
		if (typeof(s) === 'string') {
			let firstWord="";
			let arr = s.split("-");

			for (let i = 1; i < arr.length; i++) 
			{
				firstWord = arr[i].charAt(0).toUpperCase();
				arr[i] = firstWord + arr[i].slice(1);  
			}
			arr = arr.join(""); //Convert the arr array to a string
			return arr;	
		} else {
			return s;
		}
	}
	

	

	/**
	 * Get CSS path from Dom element
	 * @private
	 */
	function elementPath(el) {

		if (!(el instanceof Element)) return;

		//
		const path = [];
		let itemIndex = 0;
		while (el.nodeType === Node.ELEMENT_NODE) {
			const oldSelector = el.nodeName.toLowerCase();
			let selector = oldSelector;

			if (el.id) {
				if ( itemIndex > 0 ) selector += '#' + el.id;
			} 
			if (el.className) {
				selector += '.' + el.className.replace(/\s+/g, ".");
			} 
			
			selector = selector.replace(/\.\./g, ".");


			//Add one or more items to the start of an array's result set.
			path.unshift(selector);


			//
			el = el.parentNode;

			//
			itemIndex++;
		}


		return path.join(" > ");
	}

	/**
	* Check if a string is a valid number
	* @private
	*/
	function isValidNumeric(str) {
		if (typeof str != "string") return false // we only process strings!  
		if ( 
			!isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)
			!isNaN(parseFloat(str)) // ensure strings of whitespace fail
		) {
			return true;
		} else {
			return false;
		}
	}


	/**
	* Convert string to hump naming
	* @private
	*/
	function stringlineToHump(str) {
		if ( typeof str === 'string' && str.length > 0 ) {
			const re=/-(\w)/g;
			str=str.replace(re,function($0,$1){
				return $1.toUpperCase();
			});
			return str;
		} else {
			return str;
		}
	}


	/**
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
		const style      = window.getComputedStyle ? window.getComputedStyle(el) : el.currentStyle,
			display    = style.display,
			position   = style.position,
			visibility = style.visibility;
			
		let marginWidth = 0;
		let marginHeight = 0;

		let maxVal;
		let actualVal;


		if ( config && config.includeMargin === true ) {
			marginWidth = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
			marginHeight = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
		}

		
		if ( prop === 'width' ) {
			maxVal = parseFloat( style.maxWidth );

			// if its not hidden we just return normal height
			if(display !== 'none' && maxVal !== '0') {
				return el.clientWidth;
			}
		}
		if ( prop === 'height' ) {
			maxVal = parseFloat( style.maxHeight );
			if(display !== 'none' && maxVal !== '0') {
				return el.clientHeight;
			} 
		}
		
		if ( prop === 'outerWidth' ) {
			maxVal = parseFloat( style.maxWidth );
			if(display !== 'none' && maxVal !== '0') {
				return el.offsetWidth + marginWidth;
			}
		}
		if ( prop === 'outerHeight' ) {
			maxVal = parseFloat( style.maxHeight );
			if(display !== 'none' && maxVal !== '0') {
				return el.offsetHeight + marginHeight;
			} 
		}

		// the element is hidden so:
		// making the el block so we can meassure its height but still be hidden
		el.style.position   = 'absolute';
		el.style.visibility = 'hidden';
		el.style.display    = 'block';


		if ( prop === 'width' ) actualVal = el.clientWidth;
		if ( prop === 'height' ) actualVal = el.clientHeight;
		if ( prop === 'outerWidth' ) actualVal = el.offsetWidth + marginWidth;
		if ( prop === 'outerHeight' ) actualVal = el.offsetHeight + marginHeight;

		// reverting to the original values
		el.style.display    = display;
		el.style.position   = position;
		el.style.visibility = visibility;

		return actualVal;
	}



	/**
	* Some easing functions
	* @private
	* @link: https://easings.net
	* @param {Number} t   - time (Amount of time that has passed since the beginning of the animation. Usually starts at 0 and is slowly increased using a game loop or other update function.)
	* @param {Number} b   - beginning value (The starting point of the animation. Usually it's a static value, you can start at 0 for example.)
	* @param {Number} c   - change in value (The amount of change needed to go from starting point to end point. It's also usually a static value.)
	* @param {Number} d   - duration (Amount of time the animation will take. Usually a static value aswell.)
	* @return {Number}
	*/
	function easeLinear (t, b, c, d) {
		return c * t / d + b;
	}

	function easeInQuart (t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	}

	function easeOutQuart (t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	}

	function easeInOutQuart (t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}

	function easeInCubic (t, b, c, d) {
		return c * (t /= d) * t * t + b;
	}

	function easeOutCubic (t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}

	function easeInOutCubic (t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}


	
	/* ------------- Independent Methods (public) -------------- */


	/**
	 * Object validation
	 * @public
	 *
	 * @return {Boolean}  
	 */
	$$.validate = $$.validate || ( () => {
		function t() { }

		return t.version = "0.0.1",

		t.isNumber = function(B) {
			const A = /^[\d|\.|,]+$/;
			return A.test(B);
		},
		t.isInt = function(B) {
			if (B == "") {
				return false;
			}
			const A = /\D+/;
			return ! A.test(B);
		},
		t.isEmail = function(A) {
			const B = /^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
			return B.test(A);
		},
		t.isTel = function(A) {
			//const B = /^[\d|\-|\s|\_]+$/;
			const B = /^[0-9- ]{7,20}$/; 
			return B.test(A);
		},
		t.isMobile = function(A) {
			//const B = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
			const B = /^1[0-9]{10}$/;
			return B.test(A);
		},
		t.isJSON = function(A) {
			return isJSON(A);
		},

		//
		t
		
	})();
	

	
	/**
	 * To determine if it is a touch screen.
	 * @public 
	 *
	 * @return {Boolean} 
	 */  
	$$.isTouchCapable = function() {
		return 'ontouchstart' in window ||
				window.DocumentTouch && document instanceof window.DocumentTouch ||
				window.navigator.maxTouchPoints > 0;  
	};					

	
	
	/**
	 * Determine whether it is a special browser
	 * @public
	 *
	 * @return {Json}  - Boolean judgment collection of common browsers
	 */  

	$$.browser = $$.browser || ( () => {
		
		let browser = {};
		
		if ( typeof (navigator) !== 'undefined' ) {
			
			// Test via a getter in the options object to see if the passive property is accessed
			let supportsPassive = false;
			
			try {
				const opts = Object.defineProperty({}, 'passive', {
					get: function() {
					supportsPassive = true;
					}
				});
				window.addEventListener("testPassive", null, opts);
				window.removeEventListener("testPassive", null, opts);
			} catch (e) {}


			browser = {
				isMobile        : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
				isAndroid       : /(android)/i.test(navigator.userAgent),
				isPC            : !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
				isSafari        : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /**Test to 9, 10. */
				isIE            : !!window.ActiveXObject || "ActiveXObject" in window,     /**Test to 6 ~ 11 (not edge) */
				supportsPassive : supportsPassive
			};	
		}
		
		return browser;

	})();
	

	
	/**
	 * Create GUID / UUID
	 * @public
	 *
	 * @description This function can be used separately in HTML pages or custom JavaScript.
	 * @return {String}                        - The globally-unique identifiers.
	 */  

	$$.GUID = $$.GUID || ( () => {
		function t() { }

		return t.version = "0.0.1",

			
			
		/**
		 * Generate a string of unique characters
		 *
		 * @return {String}
		 */		
		t.create = function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				const r = Math.random() * 16 | 0,
					  v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		},

		//
		t

	})();
	
	
	/**
	 * Evaluating a string as a mathematical expression in JavaScript
	 * @public
	 *
	 * @description This function can be used separately in HTML pages or custom JavaScript.
	 * @return {String}            - New calculation result.
	 */  

	$$.math = $$.math || ( () => {
		function t() { }

		return t.version = "0.0.2",

			
		/**
		 * Expression parsing and evaluation
		 *
		 * @param {String} s - A math expression given in string.
		 * @return {Number}  - Returns a pure number calculated.
		 */	
		t.evaluate = function(s) {

			const chars = s.replace(/\s/g, '').split("");
			let n = [], op = [], index = 0, oplast = true;

			n[index] = "";

			// Parse the expression
			for (let c = 0; c < chars.length; c++) {

				if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
					op[index] = chars[c];
					index++;
					n[index] = "";
					oplast = true;
				} else {
					n[index] += chars[c];
					oplast = false;
				}
			}

			// Calculate the expression
			s = parseFloat(n[0]);
			for (let o = 0; o < op.length; o++) {
				const num = parseFloat(n[o + 1]);
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
			
			
           
            
		/**
		 * Generate random number between two numbers
		 *
		 * @return {Number} min - Enter a expected minimum.
		 * @return {Number} max - Enter a expected maximum.
		 * @return {Number}     - A new random number
		 */
		t.getRandomFloat = function(min, max) {
			return Math.random() * (max - min) + min;
		},


		/**
		 * Returns the degree from radian.
		 *
		 * @return {Number} rad - Value of radian.
		 * @return {Number}
		 * @usage: 

		   angle = rad / ( Math.PI / 180 )  = rad * ( 180/Math.PI );
		 */

		t.getDegree = function(rad) {
			return rad / Math.PI * 180;
		},


		/**
		 * Returns the radian degree .
		 *
		 * @return {Number} deg - Value of degree.
		 * @return {Number}
		 * @usage: 

			rad = Math.PI / 180 * 30 ;
		 */
		t.getRadian = function(deg) {
			return deg * Math.PI / 180;
		},


		/**
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
		t.getPolarCoord = function(x, y, z) {
			const nx = Math.cos(x) * Math.cos(y) * z,
				  nz = Math.cos(x) * Math.sin(y) * z,
				  ny = Math.sin(x) * z;
			return {
			    x: nx,
				y: ny,
				z: nz
			};
		},



		//
		t
		
	})();
	
	
	/**
	 * Get the CSS property
	 * @public
	 *
	 * @description This function can be used separately in HTML pages or custom JavaScript.
	 * @param  {!Element} el     - The Element for which to get the computed style. Using class name or ID to locate.
	 * @return {String|Object}   - The value of property.
	 */  

	$$.cssProperty = $$.cssProperty || ( () => {
		function t() { }

		return t.version = "0.0.1",

			
		/**
		 * Get the -webkit-transition-duration property
		 *
		 * @param {Element} el - A DOM node containing one selector to match against.
		 * @return {Number}    - Returns a pure number.
		 */		
		t.getTransitionDuration = function( el ) {

			if ( typeof el === typeof undefined ) {
				return 0;
			}


			let style    = window.getComputedStyle(el),
				duration = style.webkitTransitionDuration,
				delay    = style.webkitTransitionDelay;

			if ( typeof duration != typeof undefined ) {
				// fix miliseconds vs seconds
				duration = (duration.indexOf("ms")>-1) ? parseFloat(duration) : parseFloat(duration)*1000;
				delay = (delay.indexOf("ms")>-1) ? parseFloat(delay) : parseFloat(delay)*1000;

				return duration;
			} else {
				return 0;
			}

		},

			
			
		/**
		 * Get an object's absolute position on the page
		 *
		 * @param {Element} el - A DOM node containing one selector to match against.
		 * @return {Json}    - An object containing the properties top and left. 
		 */	
		t.getAbsoluteCoordinates = function( el ) {

			let windowWidth     = window.innerWidth,
				leftPos         = null,
				topPos          = null;

			if ( ! document.getElementsByTagName( 'body' )[0].className.match(/rtl/) ) {
				leftPos = ( el.offsetLeft == 0 ) ? el.parentElement.offsetLeft : el.offsetLeft;
				topPos = ( el.offsetTop == 0 ) ? el.parentElement.offsetTop : el.offsetTop;
			} else {

				// width and height in pixels, including padding and border
				// Corresponds to outerWidth(), outerHeight()
				leftPos = ( el.offsetLeft == 0 ) ? ( windowWidth - ( el.parentElement.offsetLeft + el.parentElement.offsetWidth ) ) : ( windowWidth - ( el.offsetLeft + el.offsetWidth ) );
				topPos = ( el.offsetTop == 0 ) ? ( windowWidth - ( el.parentElement.offsetTop + el.parentElement.offsetHeight ) ) : ( windowWidth - ( el.offsetTop + el.offsetHeight ) );
			}


			return {
				'left': leftPos,
				'top': topPos
			};

		},


		 //
		t
		
	})();
	
	
	
	/**
	 * Perform an asynchronous HTTP (Ajax) request.
	 * @public
	 *
	 * @param  {Json} props   - The attribute and value to be set, the format is JSON
	 * @return {Void} 
	 */  
	$$.ajax = function(props) {

		if ( ! isJSON(props) ) return false;
		
		const self = this;
		const _url = typeof(props.url) !== 'undefined' ? props.url : '';
		const _method = typeof(props.method) !== 'undefined' ? props.method : 'POST';
		const _loadedFn = typeof(props.complete) !== 'undefined' ? props.complete : null;


		if ( _url != '' ) {
			
			let config = {
				mode: 'cors',
				method: _method
			};

		
			fetch(_url, config )
			.then(response => response.json())
			.then(result => {
				//console.log('Success:', result);
				
				if (_loadedFn && (typeof _loadedFn == 'function')) {
					_loadedFn.call(self,result);
				}		
				
			})
			.catch(error => {
	        	console.error('Error:', error);
			});

			
		}

	};
	
	
	/**
	 * Remove all spaces in the string
	 * @public
	 *
	 * @param  {String} s                 - Any string.
	 * @param  {Boolean} isGlobal         - If the value is `true`, remove all spaces including the middle
	 * @return {String}                   - A new string with no spaces
	 */  
    $$.trim = function(s, isGlobal = false) {
		if (typeof(s) === 'string') {
			let result;
			result = s.replace(/(^\s+)|(\s+$)/g, "");
			if ( isGlobal === true ) {
				result = result.replace(/\s/g, "");
			}
			return result;
		} else {
			return s;
		}
    };

	
	
	/**
	 * Capitalize the first letter of all words in a string
	 * @public
	 *
	 * @param  {String} s                 - Any string.
	 * @return {String}                   - A new string.
	 */  	
	$$.lastUrlParamFormat = function(s) {
		
		s = s || '';

		if ( s.length > 0 ) {
			
			s = s.replace(/\-/g, ' ' ).replace(/\_/g, ' ' );
			const pieces = s.split(" ");
			for ( let i = 0; i < pieces.length; i++ )
			{
				const j = pieces[i].charAt(0).toUpperCase();
				pieces[i] = j + pieces[i].substr(1);
			}
			return pieces.join(" ");	
			
		} else {
			return s;
		}
		

	};
	
	/**
	 * Convert HTML Element's `Style` Attribute to JSON
	 * @public
	 *
	 * @param  {String} str   - The content of the style attribute in the HTML element, usually a string
	 * @return {Json}     - An HTML element to a JSON object
	 */  
	$$.styleFormat = function(s) {
		
		s = s || '';

		if ( s.length > 0 ) {
			const styles = s.split(';'),
				  json = {};
			
			let i = styles.length,
				style, 
				k, 
				v;


			while (i--) {
				style = styles[i].split(':');
				k = toCamelCase($$.trim(style[0]));
				v = $$.trim(style[1]);
				if (k.length > 0 && v.length > 0)
				{
					json[k] = v;
				}
			}	
			
			return json;
		} else {
			return '';
		}


	};

	
	
	/**
	 * Remove first, last or both symbols
	 * @public
	 *
	 * @param  {String} str       - Any string.
	 * @param  {String} symbol    - The target string to remove.
	 * @param  {Number} type      - Type of all or not. if `0`, is all.
	 * @return {String}           - An new string.
	 */  
	$$.removeFirstLastStr = function( str, symbol = ',', type = 0 ) {

		if (typeof(str) === 'string') {
			if ( type == 0 ) {
				const flRegExp = new RegExp( '^\\'+symbol+'|\\'+symbol+'$' , 'g' );
				return str.replace( flRegExp, '' );
			} else {
				const flRegExp = new RegExp( ''+symbol+'\s*$' , 'g' );
				return str.replace( flRegExp, '' );
			}
		} else {
			return str;
		}

	};


	
	/**
	 * Convert a string to slug.
	 * @public
	 *
	 * @param  {String} str            - Any string.
	 * @return {String}                - A new string.
	 */  
	$$.toSlug = function( str ) {

		if ( typeof( str ) == 'string' && str.length > 0 ) {
			return str
					.toString()
					.replace(/[^\w\s\-！￥【】\u4e00-\u9eff]/gi, '')
					.replace(/\s/g, '-')
					.replace(/(\-){2,}/g, '-')
					.replace(/\-\s*$/, '' )
					.toLowerCase();



		} else {
			return str;
		}

	};

	
	/**
	 * Throttle
	 * @public
	 *
	 * @param  {Function} fn    - A function to be executed within the time limit.
	 * @param  {Number} limit   - Waiting time.
	 * @return {Function}       - Returns a new function.
	 */  
	$$.throttle = function( fn, limit = 300 ) {
		let waiting = false;                     
		return function () {                     
			if (!waiting) {                       
				fn.apply(this, arguments);  
				waiting = true;                  
				setTimeout(function () {          
					waiting = false;           
				}, limit);
			}
		}
	};
	
	
	
	/**
	 * Debounce
	 * @public
	 *
	 * @param  {Function} fn    - A function to be executed within the time limit.
	 * @param  {Number} limit   - Waiting time.
	 * @return {Function}       - Returns a new function.
	 */  
	$$.debounce = function( fn, limit = 300 ) {
		let timer;
		return function() {
		
			//Every time this returned function is called, the timer is cleared to ensure that fn is not executed
			clearTimeout(timer);

			// When the returned function is called for the last time (that is the user stops a continuous operation)
			// Execute fn after another delay milliseconds
			timer = setTimeout(function() {
				fn.apply(this, arguments);
			}, limit);
		}
	};
	
	
	

	/**
	 *  Create a deep copy of the set of matched elements.
	 * @public
	 *
	 * @param  {Object|Element} obj             - The array, JSON or HTML element to be copied.
	 * @return {Object|Element}   
	 */
	$$.deepClone = function(obj) {
		
		if ( obj.nodeType === 1 ) {
			return obj.cloneNode(true);
		} else {
			let objClone = Array.isArray(obj)?[]:{};
			if(obj && typeof obj==="object"){
				for(key in obj){
					if(obj.hasOwnProperty(key)){
						//Determine whether the ojb child element is an object, if it is, copy it recursively
						if(obj[key] && typeof obj[key] ==="object"){
							objClone[key] = deepClone(obj[key]);
						}else{
							//If not, simply copy
							objClone[key] = obj[key];
						}
					}
				}
			}
			return objClone;
		}

	};

	
	/**
	 *  HTML entities encode.
	 * @public
	 *
	 * @param {string} str          - Input text.
	 * @return {string}             - Filtered text.
	 */
	 $$.htmlEncode = function(str) {
		
		let res = '';
		if (typeof (document) === 'undefined') {
			res = str.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
				return '&#'+i.charCodeAt(0)+';';
			});
		} else {
			const div = document.createElement('div');

			//Creates a new Text node. This method can be used to escape HTML characters.
			div.appendChild(document.createTextNode(str));

			res = div.innerHTML;
		}


		//Convert single and double quotes
		res = res.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

		return res;

	};

	/**
	 *  HTML entities decode
	 * @public
	 *
	 * @param {string} str          - Input text.
	 * @return {string}             - Filtered text.
	 */
	 $$.htmlDecode = function(str) {

		let res = '';
		if (typeof (document) === 'undefined') {
			const entities = [
				['amp', '&'],
				['apos', '\''],
				['#x27', '\''],
				['#x2F', '/'],
				['#39', '\''],
				['#47', '/'],
				['lt', '<'],
				['gt', '>'],
				['nbsp', ' '],
				['quot', '"'],
				['#60', '<'],
				['#62', '>']
			];

			for (let i = 0, max = entities.length; i < max; i++) {
				str = str.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
			} 
			res = str;
			
		} else {
			const txt = document.createElement('textarea');
			txt.innerHTML = str;

			res = txt.value;
		}
		

		return res;

	};

	/**
	 *  Set a default JSON format configuration
	 * @public
	 *
	 * @param  {Json} props         - Set some default keys and values.
	 * @param  {Json} options       - A JSON variable passed in from outside, including key and value.
	 * @return {Json}               - Merge the new and old values.
	 */
	 $$.setDefaultOptions = function(props, options) {
		if ( typeof options === typeof undefined || options === null || options === false ) options = {};
		//Set a default configuration
		if ( isJSON(props) ) {

			const defaultConfigValues = Object.values(props);
			Object.keys(props).forEach(function(prop,index) {

				// Well-formed string type
				Object.keys(options).forEach(function(prop2, index2) {
					if ( prop2 === prop ) {
						let _v = options[prop2];
						if ( _v == 'true' ) _v = true;
						if ( _v == 'false' ) _v = false;
						if ( isValidNumeric(_v) ) _v = parseFloat(_v);
						if ( isJSON(_v) ) _v = Object.prototype.toString.call(_v) === '[object Object]' ? _v : JSON.parse(_v);

						options[prop2] = _v;
					}
					
				});

				//
				if ( typeof options[prop] === typeof undefined || options[prop] === null ) options[prop] = defaultConfigValues[index];
			});
		}
		return options;
	};





    /* ---------------- API methods ----------------- */

    /**
     * Returns the length of the node
     *
     * @return {Number} 
     */  
     Constructor.prototype.len = function () {
        let { elems } = this;
        return elems.length;
    };

    /**
     * Returns a native DOM element
     * 
     * @param  {Number} index   - A number for index.
     * @return {Element} 
     */  
     Constructor.prototype.get = function (index) {
        let { elems } = this;

        if ( index === -1 ) {
            //get all elements
            return elems;
        } else {
            return elems[index];
        }

    };
     

    /**
     * Iterate over an object, executing a function for each matched element.
     *
     * @param  {Function} fn         - A function to execute for each matched element.
     * @return {NodeList} 
     */  
     Constructor.prototype.each = function (fn) {
         if (fn && (typeof fn == 'function')) {
            let { elems } = this;
            elems = Array.prototype.slice.call(elems);
            elems.forEach(function (element, index, array) {

                //If the ID does not exist, itemDomsStr cannot be obtained
                // Very critical, other possible methods of manipulation dom will use id
                if ( (element.id !== undefined && element.id.length === 0) || element.id === undefined ) {
                    element.id = 'eachitem-' + $$.GUID.create();
                }

                //!import: The returned HTML element must be current, 
                //otherwise all HTML elements under document may be queried
                const itemDomsStr = '#' + element.id;

                fn.call(element, index, itemDomsStr, array);

            });
            
         }
    };




    /**
     * Code included inside the code will run once the entire page (all DOM) is ready.
     *
     * @param  {Function} fn   - A function to execute after the DOM is ready.
     * @return {Void}
     */
     Constructor.prototype.ready = function (fn) {
        if (document.readyState != 'loading') {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState != 'loading') fn();
            });
        }
    
    };


    /**
     * Detect when images and videos have been loaded. 
     *
     * @param  {Json} props   - Contains three event functions before loading, loading, and loading completed.
     * @return {Void}
     */
    Constructor.prototype.loader = function (props) {
        this.each(function () {
            const self = this;
            const sources = [];
            let loadingFn = null,
                progressFn = null,
                loadedFn = null,
                imagesSelector = 'body img',
                videosSelector = 'body video';


            if (isJSON(props)) {
                loadingFn = props.startEvent;
                progressFn = props.progressEvent;
                loadedFn = props.endEvent;
                imagesSelector = props.imagesSelector;
                videosSelector = props.videosSelector;
            }


            //count all images on a page
            if (typeof (document.images) !== 'undefined' && document.images.length == 0) {

                const imgPlaceholder = document.createElement("div");
                imgPlaceholder.innerHTML = '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style="display:none">';
                // insert liLast at the end of <>
                document.body.append(imgPlaceholder);

            }


            //loading
            if (loadingFn && (typeof loadingFn == 'function')) {
                loadingFn();
            }


            //Push all images from page
            const imgs = document.querySelectorAll(imagesSelector);
            for (let i = 0; i < imgs.length; i++) {
                sources.push(
                    {
                        "url": imgs[i].src,
                        "type": 'img'
                    }
                );
            }



            //Push all videos from page
            const videos = document.querySelectorAll(videosSelector);
            for (let i = 0; i < videos.length; i++) {

                const _sources = videos[i].getElementsByTagName('source');
                sources.push(
                    {
                        "url": _sources.length > 0 ? _sources[0].src : videos[i].src,
                        "type": 'video'
                    }
                );
            }



            //Execute after all images and videos have loaded
            let per = 0;
            let perInit = 1;
            if (sources.length == 0) {
                per = 100;
            }

            const loadResources = function () {
                let promises = [];

                for (let i = 0; i < sources.length; i++) {


                    if (sources[i].type == 'img') {

                        ///////////
                        // IMAGE //
                        ///////////   
                        promises.push(

                            new Promise(function (resolve, reject) {

                                const img = document.createElement('img');
                                img.crossOrigin = 'anonymous';
                                img.src = sources[i].url;

                                img.onload = function (image) {
                                    //Compatible with safari and firefox
                                    if (typeof image.path === typeof undefined) {
                                        return resolve(image.target.currentSrc);
                                    } else {
                                        return resolve(image.path[0].currentSrc);
                                    }
                                };

                            }).then(textureLoaded)
                        );

                    } else {

                        ///////////
                        // VIDEO //
                        ///////////    
                        promises.push(
                            new Promise(function (resolve, reject) {

                                const video = document.createElement('video');
                                video.addEventListener('loadedmetadata', function (video) {

                                    //Compatible with safari and firefox
                                    if (typeof video.path === typeof undefined) {
                                        return resolve(video.target.currentSrc);
                                    } else {
                                        return resolve(video.path[0].currentSrc);
                                    }


                                }, false);

                                video.src = sources[i].url;

                            }).then(textureLoaded)
                        );



                    }



                }//end for



                return Promise.all(promises);
            };

            const textureLoaded = function (url) {

                //progress number
                per = parseInt(100 * (perInit / sources.length));
                if (isNaN(per)) per = 100;

                //Call back progress 
                /** console.log( 'progress: ' + per + '%' ); */
                if (progressFn && (typeof progressFn == 'function')) {
                    progressFn.call(self, per);
                }


                perInit++;
                return per;

            };

            //and videos loaded
            //Must be placed behind the loadResources()
            loadResources().then(function (images) {
                if (loadedFn && (typeof loadedFn == 'function')) {
                    loadedFn();
                }
            });


        });
        return this;
    };


    /**
     * Puts data inside an element at the last index (Vanilla JS also has this method)
     *
     * @param  {Element|String} el   - An element or string to be parsed as HTML or XML and inserted into the tree.
     * @return {Void}
     */
    Constructor.prototype.append = function (el) {
        this.each(function () {
            if (typeof (el) === 'string') {

                // Just inside the element, after its last child.
                if (document.createElement("div").insertAdjacentHTML) {
                    this.insertAdjacentHTML("beforeend", el);
                }
            } else {
                const html = (typeof (el) === 'string') ? el : el.outerHTML;
                this.innerHTML += html;
            }
        });
        return this;

    };






    /**
     * Puts the prepending element at the first index.  (Vanilla JS also has this method)
     *
     * @param  {Element|String} el   - An element or string to be parsed as HTML or XML and inserted into the tree.
     * @return {Void}
     */
    Constructor.prototype.prepend = function (el) {
        this.each(function () {
            if (typeof (el) === 'string') {

                // Just inside the element, before its first child.
                if (document.createElement("div").insertAdjacentHTML) {
                    this.insertAdjacentHTML("afterbegin", el);
                }
            } else {

                const html = (typeof (el) === 'string') ? el : el.outerHTML;
                this.innerHTML = html + this.innerHTML;
            }
        });
        return this;


    };


    /**
     * Before the element itself.
     *
     * @param  {String} el   - The string to be parsed as HTML or XML and inserted into the tree.
     * @return {Void}
     */
    Constructor.prototype.before = function (el) {
        this.each(function () {
            if (typeof (el) === 'string') {

                // Before the element itself.
                if (document.createElement("div").insertAdjacentHTML) {
                    this.insertAdjacentHTML("beforebegin", el);
                }
            } else {

                const html = (typeof (el) === 'string') ? el : el.outerHTML;
                this.insertAdjacentHTML("beforebegin", html);
            }
        });
        return this;

    };


    /**
     * After the element itself.
     *
     * @param  {String} el   - The string to be parsed as HTML or XML and inserted into the tree.
     * @return {Void}
     */
    Constructor.prototype.after = function (el) {
        this.each(function () {
            if (typeof (el) === 'string') {

                //  After the element itself.
                if (document.createElement("div").insertAdjacentHTML) {
                    this.insertAdjacentHTML("afterend", el);
                }
            } else {

                const html = (typeof (el) === 'string') ? el : el.outerHTML;
                this.insertAdjacentHTML("afterend", html);
            }
        });
        return this;

    };

    /**
     * Insert an element as the first child node of another
     *
     * @param  {Element} el  - A DOM node containing one selector to match against.
     */
    Constructor.prototype.prependTo = function (el) {
        this.each(function () {
            if (this.firstChild) {
                this.insertBefore(el, this.firstChild);
            }
        });
        return this;

    };

    /**
     * Insert an element to the end of the target
     *
     * @param  {Element} el  - A DOM node containing one selector to match against.
     */
    Constructor.prototype.appendTo = function (el) {
        this.each(function () {
            this.appendChild(el);
        });
        return this;

    };



    /**
     * Wrap an HTML structure around the content of each element in the set of matched elements.
     *
     * @param  {String} el   - An HTML snippet.
     * @return {Void}
     */
    Constructor.prototype.wrapInner = function (el) {
        this.each(function () {
            //get old value
            const val = this.innerHTML;

            //empty default value
            this.innerHTML = '';

            //The DOMParser() method is awesome, but the parseFromString() method stops at IE10.
            const support = (function () {
                if (!window.DOMParser) return false;
                const parser = new DOMParser();
                try {
                    parser.parseFromString('x', 'text/html');
                } catch (err) {
                    return false;
                }
                return true;
            })();

            //Convert a template string into HTML DOM nodes
            const stringToHTML = function stringToHTML(str) {

                // If DOMParser is supported, use it
                if (support) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(str, 'text/html');
                    const wrapperEl = doc.body;
                    return wrapperEl.children[0];
                }

                // Otherwise, fallback to old-school method
                const dom = document.createElement('div');
                dom.innerHTML = str;
                const wrapperEl = dom;
                return wrapperEl.children[0];
            };

            if (typeof el === 'string') {
                const div = this.appendChild(stringToHTML(el));
                div.innerHTML = val;

                while (this.firstChild !== div) {
                    div.appendChild(this.firstChild);
                }
            }
        });

        return this;


    };


    /**
     * Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.
     *
     * @param  {?String} el   - A string of HTML to set as the content of each matched element.
     * @return {Void|String}     - The HTML content to set
     */
    Constructor.prototype.html = function (el) {
        const rootObject = this;
        let res = null;

        this.each(function () {
            if (el === undefined) {
                res = this.innerHTML;
            } else {
                this.innerHTML = el;
                res = rootObject;
            }
        });

        return res;

    };


    /**
     * Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.
     *
     * @param  {?String} el      - The text to set as the content of each matched element.
     * @return {Void|String}     - The HTML content to set
     */
    Constructor.prototype.text = function (el) {
        const rootObject = this;
        let res = null;

        this.each(function () {
            if (el === undefined) {

                //Remove HTML Tags
                let htmlstr = this.innerHTML;
                htmlstr = htmlstr.replace(/(<([^>]+)>)/ig, '');

                res = htmlstr;
            } else {
                this.innerHTML = $$.htmlEncode(el);
                res = rootObject;
            }
        });
        return res;


    };




    /**
     * Create a deep copy of the set of matched elements.
     *
     * @return {Array}          - Contains only a collection of HTML elements. 
     *                            Returns a duplicate of the node on which this method was called.
     */
    Constructor.prototype.clone = function () {
        let res = this;

        this.each(function () {
            res = this.cloneNode(true);
        });

        return res;
    };




    /**
     * Adds the specified class(es) to each element in the set of matched elements.
     *
     * @param  {String} c   - One or more space-separated classes to be added to the class attribute of each matched element.
     * @return {Void}
     */
    Constructor.prototype.addClass = function (c) {
        this.each(function () {
            if (! /^\S+$/g.test(c)) {
                // It has only whitespace
                const classArray = c.split(' ');
                let className;

                // Loop through the array of classes to add one class at a time
                for (let j = 0; j < classArray.length; j++) {
                    className = classArray[j];
                    this.classList.add(className);
                }
            } else {
                this.classList.add(c);
            }
        });

        return this;


    };




    /**
     * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
     *
     * @param  {String} c   - One or more space-separated classes to be removed from the class attribute of each matched element.
     * @return {Void}
     */
    Constructor.prototype.removeClass = function (c) {
        this.each(function () {

            if (! /^\S+$/g.test(c)) {
                // It has only whitespace
                const classArray = c.split(' ');
                let className;

                // Loop through the array of classes to add one class at a time
                for (let j = 0; j < classArray.length; j++) {
                    className = classArray[j];
                    this.classList.remove(className);
                }
            } else {
                this.classList.remove(c);
            }
        });

        return this;
    };



    /**
     * Add or remove one or more classes from each element in the set of matched elements, 
     * depending on either the class's presence or the value of the state argument.
     *
     * @param  {String} c   - One or more classes (separated by spaces) to be toggled for each element in the matched set.
     * @return {Void}
     */
    Constructor.prototype.toggleClass = function (c) {
        this.each(function () {
            if (! /^\S+$/g.test(c)) {
                // It has only whitespace
                const classArray = c.split(' ');
                let className;

                // Loop through the array of classes to add one class at a time
                for (let j = 0; j < classArray.length; j++) {
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
        });

        return this;
    };


    /**
     * Set the style properties of elements:
     *
     * @param  {Json} props   - The attribute and value to be set, the format is JSON
     * @return {Void}
     */
    Constructor.prototype.css = function (props, value) {
        this.each(function () {
            const self = this;

            if (isJSON(props)) {
                //the json is ok
                Object.keys(props).forEach(function (prop) {
                    self.style[prop] = props[prop];
                });
            } else {
                if (value !== undefined) {
                    self.style[props] = value;
                }

            }

        });
        return this;

    };



    /**
     * Get the descendants of each element in the current set of matched elements
     *
     * @param  {String} s           - A string containing a selector expression to match elements against.
     * @return {Array}              - The collection of elements
     */
    Constructor.prototype.find = function (s) {    
        let res = [];


        this.each(function () {

            // The symbol ">" is not allowed at the beginning of the find() method.
            if (/(^\s*|,\s*)>/.test(s)) {
                let removeId;
                if (!this.id) {
                    this.id = 'ID_' + new Date().getTime();
                    removeId = true;
                }
                s = s.replace(/(^\s*|,\s*)>/g, '$1#' + this.id + ' >');

                [].slice.call(document.querySelectorAll(s)).forEach(function(element){
                    res.push(element);
                });
                

                if (removeId) {
                    this.id = null;
                }
               
            } else {

                [].slice.call(this.querySelectorAll(s)).forEach(function(element){
                    res.push(element);
                });
            }
        });


        return $$(res);

    };



    /**
     * Reduce the set of matched elements to the one at the specified index.
     *
     * @param  {Number} index   - A number for index.
     * @return {Array}          - Contains only a collection of HTML elements.
     */
    Constructor.prototype.eq = function (index) {
        let res = [];
        
        let { elems } = this;
        elems = Array.prototype.slice.call(elems);
        elems.forEach(function (element, listIndex) {
            if ( index === listIndex ) res.push(element);
        });

        return $$(res);
    };


    /**
     * Returns the Element immediately prior to the specified one in its parent's children list, 
     * or null if the specified element is the first one in the list.
     *
     * @param  {String} s       - A string containing a selector expression to match elements against.
     * @return {Array}          - Contains only a collection of HTML elements.
     */
    Constructor.prototype.prev = function (s) {
        let res = [];

        this.each(function () {
            const el = this.previousElementSibling;

            if (s === undefined) {
                if (el !== null) res.push(el);
            } else {
                if (
                    el !== null &&
                    //Determine whether the ID, class and HTML nodes match
                    (el.nodeName.toLowerCase() === s || el.classList.contains(s.replace(/\./g, '')) || '#' + el.id === s)
                ) {
                    res.push(el);
                }

            }
        });
        
        return $$(res);

    };


    /**
     * Returns the element immediately following the specified one in its parent's children list, 
     * or null if the specified element is the last one in the list.
     *
     * @param  {String} s       - A string containing a selector expression to match elements against.
     * @return {Array}          - Contains only a collection of HTML elements.
     */
    Constructor.prototype.next = function (s) {
        let res = [];

        this.each(function () {

            const el = this.nextElementSibling;

            if (s === undefined) {
                if (el !== null) res.push(el);
            } else {
                if (
                    el !== null &&
                    //Determine whether the ID, class and HTML nodes match
                    (el.nodeName.toLowerCase() === s || el.classList.contains(s.replace(/\./g, '')) || '#' + el.id === s)
                ) {
                    res.push(el);
                }

            }
        });

        return $$(res);

    };

    /**
     * Returns the DOM node's parent Element, or null if the node either has no parent,
     * or its parent isn't a DOM Element.
     *
     * @param  {String} s       - A string containing a selector expression to match elements against.
     * @return {Array}          - Contains only a collection of HTML elements.
     */
    Constructor.prototype.parent = function (s) {
        let res = [];
        this.each(function () {

            const el = this.parentElement;

            if (s === undefined) {
                if (el !== null) res.push(el);
            } else {
                if (
                    el !== null &&
                    //Determine whether the ID, class and HTML nodes match
                    (el.nodeName.toLowerCase() === s || el.classList.contains(s.replace(/\./g, '')) || '#' + el.id === s)
                ) {
                    res.push(el);
                }

            }
        });

        return $$(res);

    };


    /**
     * Get the ancestors of each element in the current set of matched elements.
     *
     * @param  {String} s                 - A string containing a selector expression to match elements against.
     * @return {Array}                    - Contains only a collection of HTML elements.
     */
    Constructor.prototype.parents = function (s) {
        let res = [];

        this.each(function () {
            let parentSelector = document.querySelector(s);

            // If no parentSelector defined will bubble up all the way to *document*
            if (parentSelector === undefined) {
                parentSelector = document;
            }

            let _parent = this.parentNode;

            while (_parent !== parentSelector) {
                const _currentNode = _parent;

                //Determine whether the ID, class and HTML nodes match
                if (s !== undefined) {
                    if (
                        _currentNode.nodeName.toLowerCase() === s ||
                        _currentNode.classList.contains(s.replace(/\./g, '')) ||
                        '#' + _currentNode.id === s
                    ) {
                        res.push(_currentNode);
                    }

                } else {
                    res.push(_currentNode);
                }

                //
                _parent = _currentNode.parentNode;
            }

            // Push that parentSelector you wanted to stop at
            if (parentSelector !== null) res.push(parentSelector);


        });

        return $$(res);

    };

    /**
     * Returns a live HTMLCollection which contains all of the child elements 
     * of the node upon which it was called.
     *
     * @param  {Element} s         - The selector that needs to be filtered. A DOMstring containing 
     *                               one selector to match against.
     * @return {Array}              -  The collection of elements
     */
    Constructor.prototype.children = function (s) {
     
        let res = [];
        
        this.each(function () {
            const self = this;
            const childrenList = self.children;


            if (childrenList) {
                for (let i = 0; i < childrenList.length; i++) {

                    const _currentNode = childrenList[i];

                    //Determine whether the ID, class and HTML nodes match
                    if (s !== undefined) {
                        if (
                            _currentNode.nodeName.toLowerCase() === s ||
                            _currentNode.classList.contains(s.replace(/\./g, '')) ||
                            '#' + _currentNode.id === s
                        ) {
                            res.push(_currentNode);
                        }

                    } else {

                        res.push(_currentNode);
                    }

                }

            }

        });
        
        return $$(res);

    };


    /**
     * Reduce the set of matched elements to those that match the selector or pass the function's test.
     *
     * @param  {String} s           - A string containing a selector expression to match elements against.
     * @return {Array}              -  The collection of elements
     */
    Constructor.prototype.filter = function (s) {
        let res = [];

        this.each(function () {

            if (s !== undefined) {
                if (this.classList.contains(s.replace(/\./g, ''))) {
                    res.push(this);
                }
            }
      
        });

        return $$(res);

    };


    /**
     * Remove elements from the set of matched elements.
     *
     * @param  {String} s           - A string containing a selector expression to match elements against.
     * @return {Array}              -  The collection of elements
     */
    Constructor.prototype.not = function (s) {
        let res = [];

        this.each(function () {

            if (s !== undefined) {
                if (!this.classList.contains(s.replace(/\./g, ''))) {
                    res.push(this);
                }
            }

        });

        return $$(res);


    };


    /**
     * Get the siblings of each element in the set of matched elements
     *
     * @param  {String} s                 - A string containing a selector expression to match elements against.
     * @return {Array}              -  The collection of elements
     */
    Constructor.prototype.siblings = function (s) {
        let res = [];

        this.each(function () {
            const self = this;

            // if no parent, return no sibling
            if ( self.parentNode ) {
                
                // first child of the parent node
                let sibling = self.parentNode.firstChild;

                // collecting siblings
                while (sibling) {
                    if (sibling.nodeType === 1 && sibling !== self) {

                        //Determine whether the ID, class and HTML nodes match
                        if (s !== undefined) {
                            if (
                                sibling.nodeName.toLowerCase() === s ||
                                sibling.classList.contains(s.replace(/\./g, '')) ||
                                '#' + sibling.id === s
                            ) {
                                res.push(sibling);
                            }

                        } else {
                            res.push(sibling);
                        }


                    }

                    //
                    sibling = sibling.nextSibling;
                }
      
            }

        });


        return $$(res);
    };



    /**
     * Reduce the set of matched elements to the first in the set.
     *
     * @return {Array}          - Contains only a collection of HTML elements.
     */
    Constructor.prototype.first = function () {
        let res = [];
        
        let { elems } = this;
        elems = Array.prototype.slice.call(elems);
        elems.forEach(function (element, listIndex) {
            if ( 0 === listIndex ) res.push(element);
        });

        return $$(res);
    };


    /**
     * Reduce the set of matched elements to the last in the set.
     *
     * @return {Array}          - Contains only a collection of HTML elements.
     */
    Constructor.prototype.last = function () {
        let res = [];
        
        let { elems, storeSelector } = this;
        let max = storeSelector.elems.length;

        elems = Array.prototype.slice.call(elems);
        elems.forEach(function (element, listIndex) {
            if ( max-1 === listIndex ) res.push(element);
        });

        return $$(res);
    };



    /**
     * Traverses the Element and its parents (heading toward the document root) 
     * until it finds a node that matches the provided selector string. 
     *
     * @param  {String} s           - A string containing a selector expression to match elements against.
     * @return {Array}              - Contains only a collection of HTML elements.
     */
    Constructor.prototype.closest = function (s) {
        let res = [];

        this.each(function () {
            //using recursivity
            const el = this.closest(s);

            //Must judge the result of closest()
            if (el !== null) {
                res.push(el);
            }

        });

        return $$(res);

    };



    /**
     * Set one or more attributes for the set of matched elements.
     *
     * @param  {String} a                 - The name of the attribute to set.
     * @param  {String} v               - A value to set for the attribute. 
     * @return {Void|String}              - Get the value of an attribute for the first element in the set of matched elements.
     */
    Constructor.prototype.attr = function (a, v) {
        const rootObject = this;
        let res = null;

        this.each(function () {
            a = a || '';
            if (v === undefined) {
                let curVal = this.getAttribute(a);

                // Non-existent attributes
                res = curVal === null ? null : curVal;
            } else {
                this.setAttribute(a, v);
                res = rootObject;
            }
        });

        return res;

    };


    /**
     * Store arbitrary data associated with the matched elements.
     *
     * @param  {String} a                 - A string naming the piece of data to set
     * @param  {String} v                 - The new data value.
     * @return {Void|String}              - Return arbitrary data associated with the first element as set by data() or by an HTML5 data-* attribute.
     */
    Constructor.prototype.data = function (a, v) {
        const rootObject = this;
        let res = null;
        
        this.each(function () {
            a = a || '';
            const _s = stringlineToHump(a);

            if (v === undefined) {
                let curVal = this.dataset[_s];
                if (curVal == 'true') curVal = true;
                if (curVal == 'false') curVal = false;
                if (isValidNumeric(curVal)) curVal = parseFloat(curVal);
                
                //check if Array or JSON format
                if (isJSON(curVal)) {
                    if (Object.prototype.toString.call(curVal) === '[object Object]') {
                        curVal = curVal;
                    } else {
                        //If the curValult is an array, you need to determine whether it is the expected array
                        curVal = JSON.parse(curVal);
                    }
                }
                
                // Non-existent attributes
                res = curVal === undefined ? null : curVal;
            } else {
                this.dataset[_s] = v;
                res = rootObject;
            }
        });

        return res;

    };


    /**
     * Set one or more attributes for the set of matched Form elements.
     *
     * @param  {String} a                 - The name of the attribute to set.
     * @param  {String} v                 - A value to set for the attribute. 
     * @return {Void|String}              - Get the value of an attribute for the first element in the set of matched elements.
     */
    Constructor.prototype.prop = function (a, v) {
        const rootObject = this;
        let res = null;

        this.each(function () {
            a = a || '';
            if (v === undefined) {

                let curVal = this[a];
                if (curVal == 'true') curVal = true;
                if (curVal == 'false') curVal = false;
                if (isValidNumeric(curVal)) curVal = parseFloat(curVal);
                
                //check if Array or JSON format
                if (isJSON(curVal)) {
                    if (Object.prototype.toString.call(curVal) === '[object Object]') {
                        curVal = curVal;
                    } else {
                        //If the curValult is an array, you need to determine whether it is the expected array
                        curVal = JSON.parse(curVal);
                    }
                }
                // Non-existent attributes
                res = curVal === undefined ? null : curVal;
            } else {
                this[a] = v;
                res = rootObject;
            }
        });

        return res;
    };



    /**
     * Remove an attribute from each element in the set of matched elements.
     *
     * @param  {String} a                 - A string naming the piece of data to delete.
     * @return {Void} 
     */
    Constructor.prototype.removeAttr = function (a) {
        this.each(function () {
            a = a || '';
            this.removeAttribute(a);
        });

        return this;

    };


    /**
     * Remove a previously-stored piece of data.
     *
     * @param  {String} a                 - A string naming the piece of data to delete.
     * @return {Void} 
     */
    Constructor.prototype.removeData = function (a) {
        this.each(function () {
            a = a || '';
            const _s = stringlineToHump(a);
            delete this.dataset[_s];
        });

        return this;

    };



    /**
     * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
     *
     * @param  {String} eventType         - One event types and optional namespaces, such as "click" 
     * @param  {?String} selector         - A selector string to filter the descendants of the selected elements that trigger the event. 
     * @param  {Function} fn              - A function to execute when the event is triggered. 
     * @return {Void}      
     */
    Constructor.prototype.one = function (eventType, selector, fn) {
        this.each(function () {
            $$(this).on(eventType, selector, fn, true);
        });

        return this;

    };



    /**
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
    Constructor.prototype.on = function (eventType, selector, fn, once) {
        this.each(function () {
            if (typeof (once) === 'undefined') once = false;

            let _curFun = null;

            if (typeof (fn) !== 'function') {
                fn = selector;
                selector = null;
            }

            if (!this.myListeners) {
                this.myListeners = [];
            };

            if (selector) {
                //if string
                _curFun = function (evt) {

                    [].slice.call(this.querySelectorAll(selector)).forEach(function (el) {
                        if (el === evt.target) {
                            fn.call(el, evt);
                        } else if (isChild(evt.target, el)) {
                            fn.call(el, evt);
                        }
                    });
                };

                this.myListeners.push({
                    eType: eventType,
                    callBack: _curFun,
                    function: fn,
                    selector: selector
                });


            } else {

                //if HTML element
                _curFun = function (evt) {
                    fn.call(this, evt);
                };


                this.myListeners.push({
                    eType: eventType,
                    callBack: _curFun,
                    function: fn,
                    selector: selector
                });

            }

            if (once) {
                this.addEventListener(eventType, _curFun, { once: true });
            } else {
                this.addEventListener(eventType, _curFun);
            }

        });
        return this;

    };

    /**
     * Remove an event handler.
     *
     * @param  {?String} eventType             - One event types and optional namespaces, such as "click"
     * @param  {?String|Function} curSelector  - A selector string or function to filter the descendants of the selected elements that trigger the event. 
     * @return {Void}      
     */
    Constructor.prototype.off = function (eventType, curSelector) {
        this.each(function () {
            if (this.myListeners) {
                for (let i = 0; i < this.myListeners.length; i++) {

                    if (typeof (curSelector) !== 'undefined') {

                        if (typeof curSelector === 'function') {
                            //is function
                            if (curSelector === this.myListeners[i].function) this.removeEventListener(this.myListeners[i].eType, this.myListeners[i].callBack);
                        } else {
                            //is string
                            if (curSelector === this.myListeners[i].selector) this.removeEventListener(this.myListeners[i].eType, this.myListeners[i].callBack);
                        }


                    } else {
                        this.removeEventListener(this.myListeners[i].eType, this.myListeners[i].callBack);
                    }

                };
                delete this.myListeners;
            }
        });

        return this;


    };

    /**
     * Get the current coordinates of the first element in the set of matched elements, relative to the document.
     *
     * @return {Json}      - An object containing the properties top and left. 
     */
    Constructor.prototype.offset = function () {
        let res = { top: 0, left: 0 };

        this.each(function () {
            const box = this.getBoundingClientRect();
            let top = 0,
                left = 0;

            //Include scrollbar and border
            top = box.top + window.pageYOffset - document.documentElement.clientTop;
            left = box.left + window.pageXOffset - document.documentElement.clientLeft;

            res = { top: top, left: left };
        });

        return res;

    };


    /**
     * Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.
     *
     * @return {Json}      - An object containing the properties top and left.
     */
    Constructor.prototype.position = function () {
        let res = { top: 0, left: 0 };

        this.each(function () {

            let top = this.offsetTop ? this.offsetTop : 0,
                left = this.offsetLeft ? this.offsetLeft : 0;

                res = { top: top, left: left };
        });
        return res;
    };

    /**
     * Get the number of pixels that an element's content is scrolled vertically.
     *
     * @return {Number}  - Returns a pure number calculated.
     */
    Constructor.prototype.scrollTop = function () {
        let res = 0;

        this.each(function () {
            const supportPageOffset = window.pageXOffset !== undefined;
            const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
            const scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? this.scrollTop : document.body.scrollTop;
            res = scrollTop;
        });
        return res;

    };


    /**
     * Get the number of pixels that an element's content is scrolled from its left edge.
     *
         @return {Number}  - Returns a pure number calculated.
        */
    Constructor.prototype.scrollLeft = function (val) {
        let res = 0;

        this.each(function () {
            const supportPageOffset = window.pageXOffset !== undefined;
            const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
            const scrollLeft = supportPageOffset ? window.pageXOffset : isCSS1Compat ? this.scrollLeft : document.body.scrollLeft;
            res = scrollLeft;
        });
        return res;

    };



    /**
     * Get or set the current computed width for elenments
     *
     * @param  {?String|?Number} val         - An integer representing the number of pixels, or 
     *                                         an integer along with an optional unit of measure appended (as a string).
     * @return {Void|Number}                 -  Get the current computed width for the first element in the set of matched elements.
     */
    Constructor.prototype.width = function (val) {
        const rootObject = this;
        let res = 0;

        this.each(function () {
            const self = this;
            if (typeof (val) !== 'undefined') {
                self.style.width = !isNaN(val) ? val + 'px' : val;
                res = rootObject;
            } else {
                res = getStyle(self, 'width');
            }

        });

        return res;

    };


    /**
     * Get or set the current computed height for elenments
     *
     * @param  {?String|?Number} val         - An integer representing the number of pixels, or 
     *                                         an integer along with an optional unit of measure appended (as a string).
     * @return {Void|Number}                 -  Get the current computed height for the first element in the set of matched elements.
     */
    Constructor.prototype.height = function (val) {
        const rootObject = this;
        let res = 0;

        this.each(function () {
            const self = this;
            if (typeof (val) !== 'undefined') {
                self.style.height = !isNaN(val) ? val + 'px' : val;
                res = rootObject;
            } else {
                res = getStyle(self, 'height');
            }

            
        });
        return res;

    };



    /**
     * Get or set the current computed outer width for elenments (including padding, border, and optionally margin)
     *
     * @param  {Boolean} includeMargin         - A Boolean indicating whether to include the element's margin in the calculation.
     * @return {Number}  - Returns the width of the element, including left and right padding, border, and optionally margin, in pixels.
     */
    Constructor.prototype.outerWidth = function (includeMargin) {
        let res = 0;

        this.each(function () {
            const self = this;

            const width_IncPaddingBorderScrollbar = self.offsetWidth;
            const marginLeft = getStyle(self, 'marginLeft');
            const marginRight = getStyle(self, 'marginRight');
            const borderLeftWidth = getStyle(self, 'borderLeftWidth') || 0;
            const borderRightWidth = getStyle(self, 'borderRightWidth') || 0;

            let totalWidth = width_IncPaddingBorderScrollbar;

            if (typeof (includeMargin) !== 'undefined') {
                totalWidth = totalWidth + marginLeft + marginRight;
            }

            res = totalWidth;
        });
        return res;

    };

    /**
     * Get or set the current computed outer height for elenments (including padding, border, and optionally margin)
     *
     * @param  {Boolean} includeMargin         - A Boolean indicating whether to include the element's margin in the calculation.
     * @return {Number}   - Returns the height of the element, including left and right padding, border, and optionally margin, in pixels.
     */
    Constructor.prototype.outerHeight = function (includeMargin) {
        let res = 0;

        this.each(function () {

            const self = this;

            const height_IncPaddingBorderScrollbar = self.offsetHeight;
            const marginTop = getStyle(self, 'marginTop');
            const marginBottom = getStyle(self, 'marginBottom');
            const borderTopWidth = getStyle(self, 'borderTopWidth') || 0;
            const borderBottomWidth = getStyle(self, 'borderBottomWidth') || 0;

            let totalHeight = height_IncPaddingBorderScrollbar;

            if (typeof (includeMargin) !== 'undefined') {
                totalHeight = totalHeight + marginTop + marginBottom;
            }

            res = totalHeight;
        });

        return res;
    };


    /**
     * Remove the set of matched elements from the DOM.
     *
     * @return {Void} 
     */
    Constructor.prototype.remove = function () {
        this.each(function () {
            this.parentNode.removeChild(this);
        });

        return this;
    };

    /**
     * Remove all child nodes of the set of matched elements from the DOM.
     *
     * @return {Void} 
     */
    Constructor.prototype.empty = function () {
        this.each(function () {

            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
        });
        return this;

    };


    /**
     * Traverse all the attribute names and values in an HTML element
     *
     * @return {Array}              - A new array containing the properties name and value.
     */
    Constructor.prototype.allAttrs = function () {
        let res = [];

        this.each(function () {
            const newArr = [];
            Array.from(this.attributes)
                .filter(obj => {
                    return obj.specified; 
                })
                .map(obj => {
                    newArr[obj.nodeName] = obj.textContent;
                });

            res = newArr;

        });

        return res;

    };



    /**
     * Determine whether any of the matched elements are assigned the given class.
     *
     * @param  {String} v         - The class name to search for.
     * @return {Boolean}   - Return true if the class is assigned to an element
     */
    Constructor.prototype.hasClass = function (v) {
        let res = false;

        this.each(function () {
            res = this.classList.contains(v) ? true : false;
        });

        return res;
    };




    /**
     * Get or set the current value of the first element in the set of matched elements.
     *
     * @param  {?String|?Number|?Array} v      - Corresponding to the value of each matched element.
     * @return {String}          - Get the values of form elements.
     */
    Constructor.prototype.val = function (v) {
        const rootObject = this;
        let res = null;
        
        this.each(function () {
            const self = this;
            let controlType = '';
            if (this.tagName == "INPUT" || this.tagName == "TEXTARTA") {

                //not `radio`, `checkbox`
                if (this.type != 'checkbox' && this.type != 'radio') {
                    controlType = 'input-textarea';
                }

                //`checkbox`
                if (this.type == 'checkbox') {
                    controlType = 'checkbox';
                }

                //`radio`
                if (this.type == 'radio') {
                    controlType = 'radio';
                }

            }

            //`select`
            if (this.tagName == "SELECT") {
                controlType = 'select';
            }


            //set value
            if (typeof (v) !== 'undefined') {


                switch (controlType) {
                    case "input-textarea":

                        this.value = v;
                        res = rootObject;

                        break;
                    case "checkbox":

                        this.checked = v;
                        res = rootObject;

                        break;
                    case "radio":

                        if (self.value == v.toString()) {
                            self.checked = true;
                        }

                        res = rootObject;

                        break;
                    case "select":

                        this.value = v;
                        this.dispatchEvent(new Event('change'));
                        res = rootObject;

                        break;
                    default:
                        this.value = v;
                        res = rootObject;

                }//end switch


            } else {

                switch (controlType) {
                    case "input-textarea":
                        res = this.value;
                        break;

                    case "checkbox":
                        res = this.checked ? 1 : 0;
                        break;

                    case "radio":

                        if (self.checked) {
                            // do whatever you want with the checked radio
                            res = self.value;
                        }
                        
                        break;

                    case "select":
                        res = this.value;

                        break;

                    default:
                        res = this.value;

                }//end switch

            }




        });

        return res;

    };


    /**
     * Display the matched elements.
     *
     * @return {Void} 
     */
    Constructor.prototype.show = function () {
        this.each(function () {
            // use inherit so that your CSS controls block/flex/inline-block etc
            this.style.display = 'inherit';
        });
        return this;


    };

    /**
     * Hide the matched elements.
     *
     * @return {Void}    
     */
    Constructor.prototype.hide = function () {
        this.each(function () {
            this.style.display = 'none';
        });
        return this;

    };


    /**
     * Display the matched elements by fading them to opaque.
     *
     * @param  {Number} speed             - A string or number determining how long the animation will run.
     * @param  {Function} callback        - A function to call once the animation is complete, called once per matched element.
     * @return {Void} 
     */
    Constructor.prototype.fadeIn = function (speed, callback) {
        this.each(function () {
            const elem = this;
            let opacity = 0;

            if (!elem.style.opacity) {
                elem.style.opacity = 0;
            }

            elem.style.display = "inherit";

            const inInterval = setInterval(function () {

                opacity += .02;
                elem.style.opacity = opacity;

                if (opacity >= 1) {
                    clearInterval(inInterval);
                    //do something after inInterval()

                    elem.style.removeProperty("opacity");

                    if (callback && (typeof callback == 'function')) {
                        callback();
                    }
                }


            }, speed / 50);
        });
        return this;

    };


    /**
     * Hide the matched elements by fading them to transparent.
     *
     * @param  {Number} speed             - A string or number determining how long the animation will run.
     * @param  {Function} callback        - A function to call once the animation is complete, called once per matched element.
     * @return {Void} 
     */
    Constructor.prototype.fadeOut = function (speed, callback) {
        this.each(function () {
            const elem = this;
            let opacity = 1;


            if (!elem.style.opacity) {
                elem.style.opacity = 1;
            }

            const outInterval = setInterval(function () {

                opacity -= .02;
                elem.style.opacity = opacity;

                if (opacity <= 0) {
                    clearInterval(outInterval);
                    //do something after outInterval()

                    elem.style.opacity = 0;
                    elem.style.display = "none"; //adding dispaly property and equall to none	


                    if (callback && (typeof callback == 'function')) {
                        callback();
                    }


                }
            }, speed / 50);
        });
        return this;

    };



    /**
     * Serialize html form to JSON
     *
     * @return {Array}     - A collection of JSON arrays
     */
    Constructor.prototype.serializeArray = function () {
        let res = [];

        this.each(function () {
            const form = this;
            const objects = [];
            if (typeof form == 'object' && form.nodeName.toLowerCase() == "form") {

                const fieldsTypes = ['input', 'textarea', 'select', 'checkbox', 'progress', 'datalist'];
                fieldsTypes.map((item, index) => {
                    const fields = form.getElementsByTagName(item);
                    for (let i = 0; i < fields.length; i++) {
                        objects[objects.length] = {
                            name: fields[i].getAttribute("name"),
                            value: fields[i].value
                        };
                    }
                });


            }
            res = objects;
        });
        return res;

    };


    /**
     * Search for a given element from among the matched elements.
     *
     * @return {Number}     - The return value is an integer indicating the position of the 
     *                        first element within the object relative to its sibling elements.
     */
    Constructor.prototype.index = function () {
        let res = -1;

        this.each(function () {
            const self = this;
            const children = self.parentNode.childNodes;

            let num = 0;
            for (let i = 0; i < children.length; i++) {
                if (children[i] == self) res = num;
                if (children[i].nodeType == 1) num++;
            }
          
        });

        return res;
    };


    /**
     * Bind an event in the HTML element
     *
     * @param  {String} eventType         - One event types and optional namespaces, such as "click" 
     * @return {Void}  
     */
    Constructor.prototype.trigger = function (eventType) {
        this.each(function () {
            const fire = function (elem, type) {

                // create and dispatch the event
                const event = new CustomEvent(type, {
                    detail: {
                        hazcheeseburger: true
                    }
                });

                elem.dispatchEvent(event);
            };

            document.addEventListener("plop", function () { }, false);
            fire(this, eventType);
        });

        return this;

    };


    /**
     *  Find the Tallest or widest of all elements
     *
     * @return {Json}      - An object containing the properties width and height.
     */
    Constructor.prototype.maxDimension = function () {
        const { storeSelector } = this;      
        let res = {
            'height': 0,
            'width': 0
        };

        let traverseIndex = 0;
        let max = storeSelector.elems.length;

        this.each(function () {
            if (traverseIndex === max - 1) {

                const elementHeights = Array.prototype.map.call(storeSelector.elems, function (el) {
                    return el.clientHeight;
                });

                const elementWidths = Array.prototype.map.call(storeSelector.elems, function (el) {
                    return el.clientWidth;
                });

                const maxHeight = Math.max.apply(null, elementHeights);
                const maxWidth = Math.max.apply(null, elementWidths);


                res = {
                    'height': maxHeight,
                    'width': maxWidth
                };

            }

            // Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`
            traverseIndex++;
        });

        return res;

    };


    /**
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
    Constructor.prototype.animate = function (prop, from, to, unit, duration, easing, complete) {
        this.each(function () {
            const el = this;
            const start = new Date().getTime();
            const timer = setInterval(function () {
                const time = new Date().getTime() - start;
                let val;

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
                }


                //
                const styleValue = val + unit;
                el.style[prop] = styleValue;

                if (time >= duration) {
                    clearInterval(timer);

                    //
                    if (complete && (typeof complete == 'function')) {
                        complete.call(el);
                    }


                }
            }, 1000 / 60);
        });
        return this;

    };



	/* ------------- Global -------------- */

	if ( typeof (window) !== 'undefined' ) {
		window.__ = $$;
	}
	

	//
    return $$;

})();


//export default __;

