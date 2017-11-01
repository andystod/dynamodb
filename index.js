require('dotenv').config();
// var dynamoose = require('dynamoose');
const {Promise} = require('bluebird');
const AWS = require('aws-sdk');

const dynamoConfig = {
  accessKeyId:      process.env.AWS_ACCESS_KEY_ID_DYNAMODB,
  secretAccessKey:  process.env.AWS_SECRET_KEY_DYNAMODB,
  region:           'eu-west-1'
};


const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);

// dynamoose.AWS.config.update({
//     accessKeyId : '',
//     secretAccessKey : '',
//     region : 'eu-west-1'
// });


// var proxy = require('proxy-agent');

// var a = proxy(process.env.PROXY);

// dynamoose.AWS.config.update({
//   accessKeyId : process.env.AWS_ACCESS_KEY_ID_DYNAMODB,
//   secretAccessKey : process.env.AWS_SECRET_KEY_DYNAMODB,
//   region : 'eu-west-1',
//   httpOptions: { agent: proxy(process.env.PROXY) }
// });


// dynamoose.AWS.config.update({
//   accessKeyId : process.env.AWS_ACCESS_KEY_ID_DYNAMODB,
//   secretAccessKey : process.env.AWS_SECRET_KEY_DYNAMODB,
//   region : 'eu-west-1'
// });

// //dynamoose.local();

// // Create cat model with default options
// var Entry = dynamoose.model('Entry', { ifasdd : {type: String, hashKey: true} });

// // // Create a new cat object
// // var garfield = new Entry({EntryId: '433', TotalPoints : 54});

// // // Save to DynamoDB
// // garfield.save(function(error) {
// //   console.log(error);
// // });

// // // Lookup in DynamoDB
// // Entry.get({EntryId: '444', TotalPoints : 51})
// // .then(function (badCat) {
// //   console.log('Never trust a smiling cat. - ' + badCat.TotalPoints);
// // });


// // Scan
// Entry.scan().exec().then(function (entries) {
//   console.log(entries);
//   return entries;
// }).then(function(entries){
//   if(entries.lastKey) { // More dogs to get
//     Entry.scan().startAt(entries.lastKey).exec().then(function (entries) {
//       console.log(entries);
//       return entries;
//     });
//   }
//   else {
//     return entries;
//   }
// })
// .catch(function(error){
//   console.log(error);
// });

function getEntries() {
  return new Promise(function(resolve, reject) {
    var params = { 
      TableName: 'Entry',
      IndexName: 'pageNumber-position-index',
      KeyConditionExpression: 'pageNumber = :pageNumber',
      ExpressionAttributeValues: { 
        ':pageNumber': 1
      }
     };

    docClient.query(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });

  });
}

getEntries()
.then(entries => {
  console.log(entries);
  console.log(entries[0]);
  console.log(entries[1]);
})
.catch(error => {
  console.log(error)
});