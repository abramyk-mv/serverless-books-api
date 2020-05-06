const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

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

// todo: move it to seed data
const data = [
    {
        uuid: '44343595-2c8e-40e7-a063-40b28970eec9',
        name: 'Amazon Web Services in Action',
        releaseDate: 1445118568000, // note:  October 17, 2015 9:49:28 PM (GMT)
        author: 'Andreas Witting and Michael Wittig',
    },
    {
        uuid: 'f3d7757b-5549-4c73-9bf7-64c852376a18',
        name: 'Mastering AWS Development',
        releaseDate: 1434750568000, // note:  June 19, 2015 9:49:28 PM (GMT)
        author: 'Uchit Vyas',
    },
    {
        uuid: '7216412d-c07b-45f1-8b0c-5252ac3c6826',
        name: 'Implementing Cloud Design Patterns for AWS',
        releaseDate: 1556660968000, // note:  April 30, 2019 9:49:28 PM (GMT)
        author: 'Marcus Young',
    },
];