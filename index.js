require('dotenv').config();
const { Promise } = require('bluebird');
const AWS = require('aws-sdk');

const dynamoConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_DYNAMODB,
  secretAccessKey: process.env.AWS_SECRET_KEY_DYNAMODB,
  region: 'eu-west-1'
};

const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);

// Query to get all items for given page number

// function getEntries() {
//   return new Promise(function (resolve, reject) {
//     var params = {
//       TableName: 'Entry',
//       IndexName: 'pageNumber-tablePosition-index',
//       KeyConditionExpression: 'pageNumber = :pageNumber',
//       ExpressionAttributeValues: {
//         ':pageNumber': 2
//       }
//     };

//     docClient.query(params, function (err, data) {
//       if (err) return reject(err);
//       return resolve(data["Items"]);
//     });

//   });
// }

// getEntries()
//   .then(entries => {
//     console.log(entries);
//     console.log(entries[0]);
//     console.log(entries[1]);
//   })
//   .catch(error => {
//     console.log(error)
//   });

// Get single entry
function getEntry(entryID) {
  return new Promise(function (resolve, reject) {
    var params = {
      TableName: 'Entry',
      Key: { id: entryID }
    };

    docClient.get(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });

  });
}

getEntry("idvalue2")
  .then(entry => {
    console.log(entry);
  })
  .catch(error => {
    console.log(error)
  });

// Add item

// var table = "Entry";

// var year = 2015;
// var title = "The Big New Movie";

// var entry = {
//   "id": "idvalue3",
//   "pageNumber": 2,
//   "tablePosition": 1,
//   "predictions": [{ match: { home: "Liverpool", away: "Manchester United", score: { home: "1", away: "2" } }, pick: "Manchester United", points: 3 }]
// }

// function putItem(entry)
// {
//   return new Promise(function(resolve, reject) {

//     var params = {
//       TableName: table,
//       Item: entry
//     };

//     console.log("Adding a new item...");
//     docClient.put(params, function(err, data) {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(data);
//         }
//     });

//   })
// }


// console.log("Adding a new item...");
// putItem(entry)
//   .then(data => {
//       console.log("Added item:", JSON.stringify(data, null, 2));
//   })
//   .catch(error => {
//     console.log(error);
//     console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
//   });