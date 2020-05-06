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
};

module.exports = Dynamo;
