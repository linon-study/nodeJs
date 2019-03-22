var mongoose = require("./connect.js");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

var User = mongoose.model("users",UserSchema);

module.exports = User;