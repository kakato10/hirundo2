const JSDataSchema = require('js-data-schema');

const schemator = new JSDataSchema();

schemator.defineDataType('arrayOfStrings', x => {
    // allow it not to be defined since
    // this properties are not always required
    if (typeof x === 'undefined') {
        return null;
    }

    if (x instanceof Array) {
        const failingTypes = [];
        const allAreStrings = x.every(e => {
            const type = typeof e;
            const isString = type === 'string';

            if (!isString) {
                failingTypes.push(type);
            }

            return isString;
        });

        if (allAreStrings) {
            return null;
        }

        return {
            rule: 'type',
            actual: failingTypes[0],
            expected: 'string'
        };
    }

    return {
        rule: 'type',
        actual: typeof x,
        expected: 'array'
    };
});

schemator.defineDataType('id', x => {
    // allow own id not to be defined
    // should end up here only on
    // entity create
    const type = typeof x;

    if (type === 'undefined') {
        return null;
    }

    if (type === 'string') {
        return null;
    }

    return {
        rule: 'type',
        actual: type,
        expected: 'string'
    };

});


module.exports = schemator;
