const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

/**
 * Build update expression. Map values
 * @param forUpdate {object} - an object that includes book properties and their new values
 * @returns {{expressionAttributeValues: object, updateExpression: string, expressionAttributeNames: object}}
 */
const buildUpdateParameters = (forUpdate) => {
    const updateExpression = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {}; // note: to escape reserved words

    Object.keys(forUpdate).forEach((key) => {
        const value = `:${key}Val`;
        const escapedName = `#${key}Escaped`;
        expressionAttributeValues[value] = forUpdate[key];
        expressionAttributeNames[escapedName] = key;
        updateExpression.push(`${escapedName} = ${value}`);
    });

    return {
        updateExpression: `Set `.concat(updateExpression.join(',')),
        expressionAttributeValues,
        expressionAttributeNames,
    }
};

/**
 * @description Update book details
 * @param event
 * @returns {Promise<*|{headers, body, statusCode}>}
 */
exports.handler = async event => {
    if (!event.pathParameters || !event.pathParameters.bookUuid) {
        return Responses._400({message: 'Missing the book uuid parameter'})
    }

    // todo: validate book data
    if (typeof event.body !== 'string') {
        return Responses._500({message: 'Failed to add a new book'});
    }

    const bookUuid = event.pathParameters.bookUuid;
    const forUpdate = JSON.parse(event.body);
    const {updateExpression, expressionAttributeValues, expressionAttributeNames} = buildUpdateParameters(forUpdate);

    const res = await Dynamo.update(
        bookUuid,
        tableName,
        updateExpression,
        expressionAttributeValues,
        expressionAttributeNames,
    )
        .catch((err) => {
            console.log('An error has occurred in DynamoDB Delete', err);
            return null;
        });

    if (!res) {
        return Responses._500({message: 'Unable to update a book'});
    }

    return Responses._200(res, {message: 'A book was updated'});
};
