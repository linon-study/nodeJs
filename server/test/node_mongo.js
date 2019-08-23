
var MongoClient = require('mongodb').MongoClient;

//用来做mongoDB调试的
var assert = require('assert');

// Connection URL
const url = 'mongodb://admin:123456@47.98.123.242:27017';

// Database Name
const dbName = 'itying';

MongoClient.connect(url, function (err, client) {
  //client参数就是连接成功之后的mongoclient(个人理解为数据库客户端)
  assert.equal(null, err);
  if (err) {
    console.log("数据库连接失败");
    return;
  }
  console.log("数据库连接成功");

  //3.0新写法
  var db = client.db(dbName);

  // db.collection("user").insertOne({
  // "username": "jmin呀",
  // "age": 23,
  // "sex": "男"
  // }, function (err, result) {
  // if (err) {
  // res.send("插入数据失败");
  // return;
  // }
  // client.close();
  // })

  const collection = db.collection('user');

  let user_array = [];

  for (var i = 700000; i < 800000; i++) {

    console.log(i)

    const user = {
      "name": "zhangsan" + i,
      "score": 0 + i,
      "price": 2 + i,
      "qb": 10 + i,
    }

    user_array.push(user)
  }


  // console.log(user);

  // collection.insert(user, function (err, result) {
  // if (err) {
  // res.send("插入数据失败");
  // return;
  // }
  // console.log(user)
  // // client.close();
  // })

  collection.insertMany(user_array, function (err, result) {
    if (err) {
      res.send("插入数据失败");
      return;
    }
    console.log('批量插入成功')
    // client.close();
  })

});