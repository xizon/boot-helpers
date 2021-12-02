/**
 * Returns a native DOM element
 * 
 * @param  {Number} index   - A number for index.
 * @return {Element} 
 */
function get(this: any, index) {
    let { elems } = this;
    return elems[index];
}

export default get;
