import traverseIndex from '../_internal/traverseIndex';



/*
* Wrap the selector
* @private
*
* @param  {String|Element} s       - The selector to search for or HTML element to wrap with functionality
* @param  {?Element} root          - OPTIONAL An HTML element to start the element query from
* @return {NodeList}               - The collection of elements, wrapped with functionality (see API methods)
*/
function nativeQuery(s, root?) {

    root = root || document;

    if (typeof (s) !== 'undefined') {

        if (typeof (s) === 'string') {
            //1) string
            return wrap([].slice.call(root.querySelectorAll(s)));

        } else if (s.tagName) {
            //2) HTML elements
            return wrap([s]);

        } else {

            if (s == window) {
                return wrap([s]);
            }

            //3) document or other
            switch (s.nodeType) {
                case 9:
                    //if Document
                    return wrap([document.body]);

                default:
                    return [];

            }

        }

    }//typeof (s) !== 'undefined'


    return [];
}



/* ------------- Independent Methods (public) -------------- */
/*
* Return a prototype that extending by adding new methods
* @public
*
* @return {Object.prototype}  
*/
if ( typeof(window['__fn']) !== 'undefined' ) {
    window['__fn'].forEach( function(item) {
        nativeQuery.prototype[item.name] = item.fn;
    });
}

import ajax from '../_public/ajax';
import browser from '../_public/browser';
import cssProperty from '../_public/cssProperty';
import debounce from '../_public/debounce';
import deepClone from '../_public/deepClone';
import GUID from '../_public/GUID';
import htmlDecode from '../_public/htmlDecode';
import htmlEncode from '../_public/htmlEncode';
import isTouchCapable from '../_public/isTouchCapable';
import lastUrlParamFormat from '../_public/lastUrlParamFormat';
import math from '../_public/math';
import removeFirstLastStr from '../_public/removeFirstLastStr';
import setDefaultOptions from '../_public/setDefaultOptions';
import styleFormat from '../_public/styleFormat';
import throttle from '../_public/throttle';
import toSlug from '../_public/toSlug';
import trim from '../_public/trim';
import validate from '../_public/validate';

nativeQuery.ajax = ajax;
nativeQuery.browser = browser;
nativeQuery.cssProperty = cssProperty;
nativeQuery.debounce = debounce;
nativeQuery.deepClone = deepClone;
nativeQuery.GUID = GUID;
nativeQuery.htmlDecode = htmlDecode;
nativeQuery.htmlEncode = htmlEncode;
nativeQuery.isTouchCapable = isTouchCapable;
nativeQuery.lastUrlParamFormat = lastUrlParamFormat;
nativeQuery.math = math;
nativeQuery.removeFirstLastStr = removeFirstLastStr;
nativeQuery.setDefaultOptions = setDefaultOptions;
nativeQuery.styleFormat = styleFormat;
nativeQuery.throttle = throttle;
nativeQuery.toSlug = toSlug;
nativeQuery.trim = trim;
nativeQuery.validate = validate;



/* ------------- Private Methods -------------- */
//dom
import $$find from '../find';
import $$closest from '../closest';
import $$prev from '../prev';
import $$next from '../next';
import $$parent from '../parent';
import $$parents from '../parents';
import $$children from '../children';
import $$siblings from '../siblings';

//traverse with index
import $$each from '../each';
import $$eq from '../eq';
import $$first from '../first';
import $$last from '../last';
import $$filter from '../filter';
import $$not from '../not';
import $$maxDimension from '../maxDimension';


//other methods
import $$ready from '../ready';
import $$loader from '../loader';
import $$append from '../append';
import $$prepend from '../prepend';
import $$before from '../before';
import $$after from '../after';
import $$prependTo from '../prependTo';
import $$appendTo from '../appendTo';
import $$wrapInner from '../wrapInner';
import $$html from '../html';	
import $$text from '../text';		
import $$clone from '../clone';
import $$addClass from '../addClass';
import $$removeClass from '../removeClass';
import $$toggleClass from '../toggleClass';
import $$css from '../css';
import $$removeData from '../removeData';
import $$attr from '../attr';
import $$data from '../data';
import $$prop from '../prop';
import $$removeAttr from '../removeAttr';
import $$one from '../one';
import $$on from '../on';
import $$off from '../off';
import $$offset from '../offset';
import $$position from '../position';		
import $$scrollTop from '../scrollTop';
import $$scrollLeft from '../scrollLeft';
import $$width from '../width';
import $$height from '../height';
import $$outerWidth from '../outerWidth';
import $$outerHeight from '../outerHeight';
import $$remove from '../remove';
import $$empty from '../empty';
import $$allAttrs from '../allAttrs';
import $$hasClass from '../hasClass';
import $$val from '../val';
import $$show from '../show';
import $$hide from '../hide';
import $$fadeIn from '../fadeIn';
import $$fadeOut from '../fadeOut';
import $$serializeArray from '../serializeArray';
import $$getIndex from '../getIndex';
import $$trigger from '../trigger';
import $$animate from '../animate';

//dom
nativeQuery.prototype.find = $$find;
nativeQuery.prototype.closest = $$closest;
nativeQuery.prototype.prev = $$prev;
nativeQuery.prototype.next = $$next;
nativeQuery.prototype.parent = $$parent;
nativeQuery.prototype.parents = $$parents;
nativeQuery.prototype.children = $$children;
nativeQuery.prototype.siblings = $$siblings;

//traverse with index
nativeQuery.prototype.each = $$each;
nativeQuery.prototype.eq = $$eq;
nativeQuery.prototype.first = $$first;
nativeQuery.prototype.last = $$last;
nativeQuery.prototype.filter = $$filter;
nativeQuery.prototype.not = $$not;
nativeQuery.prototype.maxDimension = $$maxDimension;


//other methods
nativeQuery.prototype.ready = $$ready;
nativeQuery.prototype.loader = $$loader;
nativeQuery.prototype.append = $$append;
nativeQuery.prototype.prepend = $$prepend;
nativeQuery.prototype.before = $$before;
nativeQuery.prototype.after = $$after;
nativeQuery.prototype.prependTo = $$prependTo;
nativeQuery.prototype.appendTo = $$appendTo;
nativeQuery.prototype.wrapInner = $$wrapInner;
nativeQuery.prototype.html = $$html;	
nativeQuery.prototype.text = $$text;		
nativeQuery.prototype.clone = $$clone;
nativeQuery.prototype.addClass = $$addClass;
nativeQuery.prototype.removeClass = $$removeClass;
nativeQuery.prototype.toggleClass = $$toggleClass;
nativeQuery.prototype.css = $$css;
nativeQuery.prototype.removeData = $$removeData;
nativeQuery.prototype.attr = $$attr;
nativeQuery.prototype.data = $$data;
nativeQuery.prototype.prop = $$prop;
nativeQuery.prototype.removeAttr = $$removeAttr;
nativeQuery.prototype.one = $$one;
nativeQuery.prototype.on = $$on;
nativeQuery.prototype.off = $$off;
nativeQuery.prototype.offset = $$offset;
nativeQuery.prototype.position = $$position;		
nativeQuery.prototype.scrollTop = $$scrollTop;
nativeQuery.prototype.scrollLeft = $$scrollLeft;
nativeQuery.prototype.width = $$width;
nativeQuery.prototype.height = $$height;
nativeQuery.prototype.outerWidth = $$outerWidth;
nativeQuery.prototype.outerHeight = $$outerHeight;
nativeQuery.prototype.remove = $$remove;
nativeQuery.prototype.empty = $$empty;
nativeQuery.prototype.allAttrs = $$allAttrs;
nativeQuery.prototype.hasClass = $$hasClass;
nativeQuery.prototype.val = $$val;
nativeQuery.prototype.show = $$show;
nativeQuery.prototype.hide = $$hide;
nativeQuery.prototype.fadeIn = $$fadeIn;
nativeQuery.prototype.fadeOut = $$fadeOut;
nativeQuery.prototype.serializeArray = $$serializeArray;
nativeQuery.prototype.index = $$getIndex;
nativeQuery.prototype.trigger = $$trigger;
nativeQuery.prototype.animate = $$animate;


const API = {};
const fns = Object.values( nativeQuery.prototype );
Object.keys( nativeQuery.prototype ).forEach(function( name, index ) {
    API[name] = fns[index];
});


function wrap(list) {
 
    Object.keys(API).forEach(function(fn) {


        list[fn] = function() {

            //slice method can also be called to convert Array-like objects/collections to a new Array. 
            //You just bind the method to the object. The arguments inside a function is an example of an 'array-like object'.
            const args = arguments;
            
            //
            let result;


            // ////////////////////
            // Traverse the counter of a selector, reset to 0 when calling 	`__(selector).XXX()`
            //----------------------	
            switch (fn) {
                case 'each':
                    // for `each()`
                    traverseIndex.each = 0;
                    break;
                case 'eq':
                    // for `eq()`
                    traverseIndex.eq = 0;
                    break;
                case 'first':
                    // for `first()`
                    traverseIndex.first = 0;
                    break;
                case 'last':
                    // for `last()`
                    traverseIndex.last = 0;
                    traverseIndex.total_last = list.length;
                    break;
                case 'filter':
                    // for `filter()`
                    traverseIndex.filter = 0;
                    break;
                case 'not':
                    // for `not()`
                    traverseIndex.not = 0;
                    break;
                case 'maxDimension':
                    // for `maxDimension()`
                    traverseIndex.maxDimension = 0;
                    traverseIndex.total_maxDimension = list.length;
                    traverseIndex.elements_maxDimension = [];
                    break;
            }
            

            // ////////////////////
            // Methods that return value is `DOM elements using selectors`
            //----------------------
            const selectors = this;

            if (Array.isArray(this)) {
                result = [];
                this.forEach(function (eachSelector) {

                    const fnResult = API[fn].apply(eachSelector, [].slice.call(args));
                    if (Array.isArray(fnResult)) {
                        result = result.concat(fnResult);
                    } else if (fnResult !== undefined) {
                        result.push(fnResult);
                    }

                });


                if (
                    fn === 'find' || 
                    fn === 'closest' ||
                    fn === 'prev' ||
                    fn === 'next' ||
                    fn === 'first' ||
                    fn === 'last' ||
                    fn === 'parent' ||
                    fn === 'parents' ||
                    fn === 'children' ||
                    fn === 'eq' ||
                    fn === 'filter' ||
                    fn === 'not' ||
                    fn === 'siblings'
                    

                ) {
                    wrap(result);
                    
                } else {
                    result = (result.length && result) || undefined;
                }
                
            } else {
                result = API[fn].apply(this, [].slice.call(args));
            }//end Array.isArray(this)

            

            
            // ////////////////////
            // Methods that return value is `JSON`, `Boolean` or `Number`
            //----------------------
            if (
                fn === 'hasClass' || 
                fn === 'offset' ||
                fn === 'position' ||
                fn === 'index' ||
                fn === 'width' ||
                fn === 'outerWidth' ||
                fn === 'height' ||
                fn === 'outerHeight' ||
                fn === 'maxDimension' ||
                fn === 'allAttrs' ||
                fn === 'scrollTop' ||
                fn === 'scrollLeft'	||
                fn === 'html' ||
                fn === 'text' ||
                fn === 'clone' 	

            ) {	
                return (result === undefined) ? this : ( typeof(result[0].data) !== 'undefined' ? result[0].data : result[0] );
            }
    
            
            
            // ////////////////////
            // Methods that return value is `Array` or `HTML element`
            //----------------------
            if (
                fn === 'data' ||
                fn === 'attr' ||
                fn === 'prop' ||
                fn === 'val'
            ) {	
                
                return (result === undefined) ? this : result[0];
                
            }
    
            
            // ////////////////////
            // The default returns value from a function
            //----------------------
            return (result === undefined) ? this : result;
        };
    });
    
    
    return list;
}

export default nativeQuery; 