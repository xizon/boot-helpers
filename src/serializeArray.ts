

/**
 * Serialize html form to JSON
 *
 * @param  {Array} types   - An array of field strings.
 * @return {Array}     - A collection of JSON arrays
 */
function serializeArray(this: any, types: string[] = ['input', 'textarea', 'select', 'checkbox', 'progress', 'datalist']) {
    let res: any = [];

    this.each(function (this: any) {
        const form = this;
        const objects: any[] = [];
        if (typeof form == 'object' && form.nodeName.toLowerCase() == "form") {

            const fieldsTypes = types;
            fieldsTypes.map((item, index) => {
                const fields = form.getElementsByTagName(item);
                for (let i = 0; i < fields.length; i++) {

                    const _name: any = fields[i].getAttribute("name");
                    let _value: any = fields[i].value;

                    // if field is Array
                    if ( _name !== null && _name.match(/(\[.*?\])/gi) ) {

                        // foo[], foo[n]
                        const inputs = form.querySelectorAll("[name='"+_name+"']");
                        const _arrFieldValue = [];
                        for (let j = 0; j < inputs.length; j++) {
                            const _arrField = inputs[j];
                            //if checkbox or radio
                            if (_arrField.type === "radio" || _arrField.type === "checkbox") {
                                if (_arrField.checked === true) {
                                    _arrFieldValue.push(_arrField.value as never);
                                } else {
                                    _arrFieldValue.push("" as never);
                                }
                            } else {
                                _arrFieldValue.push(_arrField.value as never);
                            }
                        }
                        _value = _arrFieldValue;

                    }

                    
                    //if checkbox or radio
                    if ( fields[i].type === 'radio' || fields[i].type === 'checkbox' ) {
                        if ( fields[i].checked === true ) {
                            objects[objects.length] = {
                                name: _name,
                                value: _value
                            };
                        }
                    } else {
                        objects[objects.length] = {
                            name: _name,
                            value: _value
                        };
                    }
            

                }
            });


        }

        // remove Duplicate objects from JSON Array
        const clean = objects.filter((item, index, self) => index === self.findIndex((t) => (t.name === item.name)));

        res = clean;
    });
    return res;

}


export default serializeArray;
