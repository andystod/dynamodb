// var AWS = require('aws-sdk');
// var config = {
//   "apiVersion": "2012-08-10",
//   "accessKeyId": "",
//   "secretAccessKey": "",
//   "region":"eu-west-1",
//   "endpoint": "dynamodb.eu-west-1.amazonaws.com"
// }
// var dynamodb = new AWS.DynamoDB(config);

// var proxy = require('proxy-agent');

// dynamodb.config.update({
//   httpOptions: { agent: proxy('') }
// });

// console.log(dynamodb.config);

// console.log(dynamodb);

// console.log(dynamodb.listTables(function (err, data)
// {
//    console.log('listTables',err,data);
// }));


var dynamoose = require('dynamoose');

// dynamoose.AWS.config.update({
//     accessKeyId : '',
//     secretAccessKey : '',
//     region : 'eu-west-1'
// });


var proxy = require('proxy-agent');


dynamoose.AWS.config.update({
  accessKeyId : '',
  secretAccessKey : '',
  region : 'eu-west-1',
  httpOptions: { agent: proxy('') }
});

//dynamoose.local();

// Create cat model with default options
var Entry = dynamoose.model('Entry', { EntryId : {type: String, hashKey: true}, TotalPoints : {type: Number, rangeKey: true} });

// Create a new cat object
var garfield = new Entry({EntryId: '433', TotalPoints : 54});

// Save to DynamoDB
garfield.save(function(error) {
  console.log(error);
});

// Lookup in DynamoDB
Entry.get({EntryId: '444', TotalPoints : 51})
.then(function (badCat) {
  console.log('Never trust a smiling cat. - ' + badCat.TotalPoints);
});


// Scan
Entry.scan().exec(function (err, entries) {
  console.log(entries);
  if(entries.lastKey) { // More dogs to get
    Dog.scan().startAt(entries.lastKey).exec(function (err, entries) {
      console.log(entries);
    });
  }
});