const bookScheme = {
    "uuid": "string",
    "name": "string",
    "releaseDate": "integer",
    "author": "string"
};

const isValueValid = (value, dataType) => {
    if (dataType === 'string') {
        return typeof value === 'string';
    }

    return (typeof value === 'number') && (value > 0);
};

const BookSchemeValidation = {
    isValid(data) {
        const inputPropertiesCount = Object.keys(data).length;
        if (!inputPropertiesCount) return false;

        const validMatch = [];
        Object.keys(bookScheme).forEach((property) => {
            if (!data.hasOwnProperty(property)) return;

            if (isValueValid(data[property], bookScheme[property])) {
                validMatch.push(property);
            }
        });

        return validMatch.length === inputPropertiesCount;
    }
};


module.exports = BookSchemeValidation;
