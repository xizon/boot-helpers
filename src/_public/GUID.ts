
/*
* Create GUID / UUID
*
* @description This function can be used separately in HTML pages or custom JavaScript.
* @return {String}                        - The globally-unique identifiers.
*/  

const GUID = ( () => {
    function t() { }

    return t.version = "0.0.1",
 
    /*
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

export default GUID;