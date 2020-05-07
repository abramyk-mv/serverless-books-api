const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

/**
 * @description Get book details
 * @param event
 * @returns {Promise<*|{headers, body, statusCode}>}
 */
exports.handler = async event => {
    if (!event.pathParameters || !event.pathParameters.bookUuid) {
        return Responses._400({message: 'Missing the book uuid parameter'})
    }

    const bookUuid = event.pathParameters.bookUuid;
    const book = await Dynamo.get(bookUuid, tableName)
        .catch((err) => {
            console.log('An error has occurred in DynamoDB Get', err);
            return null;
        });

    if (!book) {
        return Responses._400({message: 'The book with a requested UUID does not exist'});
    }

    return Responses._200(book);
};
