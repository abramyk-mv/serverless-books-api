const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

/**
 * @description Get all books
 * @returns {Promise<*|{headers, body, statusCode}>}
 */
exports.handler = async () => {
    const books = await Dynamo.getAll(tableName)
        .catch((err) => {
            console.log('An error has occurred in DynamoDB GetAll', err);
            return null;
        });

    if (!books) {
        return Responses._500({message: 'Can not retrieve all books'});
    }

    return Responses._200(books);
};
