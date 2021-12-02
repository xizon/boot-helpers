
import $$ from './_core/instance';

/**
 * Get the descendants of each element in the current set of matched elements
 *
 * @param  {String} s           - A string containing a selector expression to match elements against.
 * @return {Array}              - The collection of elements
 */
function find(this: any, s) {
    const { storeSelector } = this;
    let res = this;

    this.each(function (this: any) {

        // The symbol ">" is not allowed at the beginning of the find() method.
        if (/(^\s*|,\s*)>/.test(s)) {
            let removeId;
            if (!this.id) {
                this.id = 'ID_' + new Date().getTime();
                removeId = true;
            }
            s = s.replace(/(^\s*|,\s*)>/g, '$1#' + this.id + ' >');

            const result = $$(s);

            if (removeId) {
                this.id = null;
            }

            res = result;
        } else {

            res = $$(s, storeSelector.elems.id);
        }
    });

    return res;

}



export default find;