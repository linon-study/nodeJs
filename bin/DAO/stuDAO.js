var mongoose = require("./connect.js");

var stuSchema = new mongoose.Schema({
    name:String,
    sex:String,
    tel:String,
    age:Number
});

var Stu = mongoose.model("stu",stuSchema);

module.exports = Stu;