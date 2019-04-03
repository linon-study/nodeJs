var UserModel = require('./model/user.js');

var user = new UserModel({
  sn: '12345678123',
  age: 29,
});
user.save(function (err) {

  if (err) {
    console.log(err);
    return;
  }
  console.log('成功')
});