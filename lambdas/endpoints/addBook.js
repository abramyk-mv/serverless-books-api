const {v1: uuidV1} = require('uuid'); // note: UUIDs Version 1 is timestamp-based
const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

/**
 * @description Add a new book
 * @param event
 * @returns {Promise<*|{headers, body, statusCode}>}
 */
exports.handler = async event => {
    // todo: validate book data
    if (typeof event.body !== 'string') {
        return Responses._500({message: 'Failed to add a new book'});
    }

    const bookDetails = JSON.parse(event.body);
    const completeBookInfo = {...bookDetails, ...{uuid: uuidV1()}};

    // todo: generate uuid, check if it exists
    const newBook = await Dynamo.put(completeBookInfo, tableName)
        .catch((err) => {
            console.log('An error has occurred in DynamoDB Write', err);
            return null;
        });

    if (!newBook) {
        return Responses._500({message: 'Failed to add a new book'});
    }

    return Responses._200(completeBookInfo);
};
