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
    }
};

module.exports = Dynamo;
