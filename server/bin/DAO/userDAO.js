var mongoose = require("./connect.js");

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		index: true
	},
	status: {
		type: Number,
		default: 1     //指定默认参数
	}
}/*, {
        // collection: "users" //设置数据库name
    }*/
);

var User = mongoose.model("users", userSchema, 'users'); //第三个参数是数据库的name

module.exports = User;