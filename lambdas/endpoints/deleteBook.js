const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

/**
 * @description Delete a book
 * @param event
 * @returns {Promise<*|{headers, body, statusCode}>}
 */
exports.handler = async event => {
    if (!event.pathParameters || !event.pathParameters.bookUuid) {
        return Responses._400({message: 'Missing the book uuid parameter'})
    }

    const bookUuid = event.pathParameters.bookUuid;
    const res = await Dynamo.delete(bookUuid, tableName)
        .catch((err) => {
            console.log('An error has occurred in DynamoDB Delete', err);
            return null;
        });

    if (!res) {
        return Responses._400({message: 'Unable to delete a book'});
    }

    return Responses._200(res, {message: 'A book was deleted'});
};
