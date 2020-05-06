const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(uuid, TableName) {
        const params = {
            TableName,
            Key: {
                uuid,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for uuid of ${uuid} from ${TableName}`);
        }

        return data.Item;
    },
    // note: can retrieve up to 1MB of data; for larges sets pagination could be implemented
    async getAll(TableName) {
        const params = {TableName};

        const data = await documentClient.scan(params).promise();

        if (!data) {
            throw Error(`Can not retrieve all data from ${TableName}`);
        }

        return data.Items;
    },
    async put(data, TableName) {
        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error fetching the data for uuid of ${data.uuid} from ${TableName}`);
        }

        return res;
    },
    async update(uuid, TableName, UpdateExpression, ExpressionAttributeValues, ExpressionAttributeNames) {
        const params = {
            TableName,
            Key: {
                uuid,
            },
            UpdateExpression,
            ExpressionAttributeValues,
            ExpressionAttributeNames,
            ReturnValues: 'UPDATED_NEW',
        };

        const res = await documentClient.update(params).promise();

        if (!res) {
            throw Error(`Unable to update an item with uuid of ${uuid} from ${TableName}`);
        }

        return res;
    },
    async delete(uuid, TableName) {
        const params = {
            TableName,
            Key: {
                uuid,
            },
        };

        const res = await documentClient.delete(params).promise();

        if (!res) {
            throw Error(`Unable to delete an item with uuid of ${uuid} from ${TableName}`);
        }

        return res;
    },
};

module.exports = Dynamo;
