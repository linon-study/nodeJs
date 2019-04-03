
var MongoClient = require('mongodb').MongoClient;
//用来做mongoDB调试的
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017';

MongoClient.connect(url, function (err, client) {
  //client参数就是连接成功之后的mongoclient(个人理解为数据库客户端)
  if (err) {
    console.log("数据库连接失败");
    return;
  }
  console.log("数据库连接成功");
  //3.0新写法
  var db = client.db("mongoTest");
  db.collection("user").insertOne({
    "username": "jmin呀",
    "age": 23,
    "sex": "男"
  }, function (err, result) {
    if (err) {
      res.send("插入数据失败");
      return;
    }
    client.close();
  })

});