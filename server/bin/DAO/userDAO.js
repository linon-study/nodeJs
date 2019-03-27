var mongoose = require("./connect.js");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
}, {
    collection: "user" //设置数据库name
});

userSchema.index({ username: 1 }, {unique:true});

var User = mongoose.model("users",userSchema, 'user'); //第三个参数是数据库的name

module.exports = User;