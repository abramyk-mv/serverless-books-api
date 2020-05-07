
# A simple API that provides the possibility to manage books in the library  
## Available APIs  
**`GET - https://9mcsxpiynl.execute-api.us-east-1.amazonaws.com/dev/book/{bookUuid}`**

The API gets book details according to its UUID.
Response body example:

    {
        "uuid": "4f659890-8ff1-11ea-ba21-7d7ced63ba9e",
        "name": "Mastering AWS Development",
        "releaseDate": 1434750568000,
        "author": "Uchit Vyas"
    }
    
**`GET - https://9mcsxpiynl.execute-api.us-east-1.amazonaws.com/dev/books`**  
  
The API retrieves all available books.
Response body example:

    {
	    "uuid": "4f659890-8ff1-11ea-ba21-7d7ced63ba9e",
	    "name": "Mastering AWS Development",
	    "releaseDate": 1434750568000,
	    "author": "Uchit Vyas"
    }
In case there are no books in a table, an API will return an empty array.
  
  **`POST - https://9mcsxpiynl.execute-api.us-east-1.amazonaws.com/dev/book/add`**  

This allows to add a book to the table.
*Book model scheme looks in the following way:*

    {
	    "uuid": string,
	    "name": string,
	    "releaseDate": integer (timestamp),
	    "authorName": string
	}
Response example:

    {
	    "name": "Amazon Web Services in Action",
	    "releaseDate": 1445118568000,
	    "author": "Andreas Witting and Michael Wittig",
	    "uuid": "473dd7e0-8ffb-11ea-b271-f1c15ed57148"
	}

  **`POST - https://9mcsxpiynl.execute-api.us-east-1.amazonaws.com/dev/book/{bookUuid}/update`**
  
The API provides an ability to update existing book details.
*Available book properties:*

    {
		"uuid": string,
	    "name": string,
	    "releaseDate": integer (timestamp),
	    "authorName": string
	}

As a result, API returns an object with updated properties.

  **`POST - https://9mcsxpiynl.execute-api.us-east-1.amazonaws.com/dev/book/{bookUuid}/delete`**  

The API is used to delete a specific book from the table. A result of successful `update` operation is an empty object.
  
## How to use API
To test these APIs you need to have some tools that enables HTTP requests 
like [Postman](https://www.getpostman.com/), [Insomnia](https://insomnia.rest/), or just [curl](https://curl.haxx.se/).
### Seed data  
Ready-to-use data for checking APIs:
```
[
    {
        name: 'Amazon Web Services in Action',
        releaseDate: 1445118568000, // note:  October 17, 2015 9:49:28 PM (GMT)
        author: 'Andreas Witting and Michael Wittig',
    },
    {
        name: 'Mastering AWS Development',
        releaseDate: 1434750568000, // note:  June 19, 2015 9:49:28 PM (GMT)
        author: 'Uchit Vyas',
    },
    {
        name: 'Implementing Cloud Design Patterns for AWS',
        releaseDate: 1556660968000, // note:  April 30, 2019 9:49:28 PM (GMT)
        author: 'Marcus Young',
    },
]
```

## Followups
* validate requests
* add linter to check code consistency  
* write tests  
* manage different environments and environment variables  
* use logger instead of 'console.log'  
* add access key support to protect API