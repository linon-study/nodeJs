var mongoose = require('mongoose');

var ArticleCateModel = require('./model/articlecate.js');

var UserModel = require('./model/user.js');

var ArticleModel = require('./model/article.js');


// //分类的增加
//   var cate=new ArticleCateModel({
//     title:'国际新闻',
//     descripton:'国际新闻'
//   })

//   cate.save();


// 增加用户
// var user = new UserModel({
//   username: 'zhangsan',
//   password: '123243cbvcvfdgfdvvfdv',
//   name: '张三',
//   age: 20,
//   sex: '男',
//   tel: 234324352332
// })

// user.save();




var cid = mongoose.Types.ObjectId('5ca2d034a0016e344420e6c6');
// var cid = mongoose.mongo.BSONPure.ObjectID.fromHexString("5ca2d034a0016e344420e6c6");
// 增加文章
var article = new ArticleModel({
  title: "这是一个国内新闻",
  // cid: cid,   /*国内新闻*/
  cid: '5ca2d034a0016e344420e6c6',   /*国内新闻*/
  author_id: '5ca2d14b639e3b38a8336053',
  author_name: '李四',
  descripton: '这是一个国内新闻11111111 此处省略300字',
  content: '习近平访问美国 这是一个国内新闻11111111'
});

// article.title = "这是一个国内新闻11111111"

// article.cid = '5ca2d034a0016e344420e6c6';   /*国内新闻*/
// article.author_id = '5ca2d18a678dd305a0499e02';
// article.author_name = '张三';
// article.descripton = '这是一个国内新闻11111111 此处省略300字';
// article.content = '习近平访问美国 这是一个国内新闻11111111'

article.save(function (err, docs) {
  if (err) {
    console.log(err);
    return;
  }
})