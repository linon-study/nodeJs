var mongoose = require("./connect.js");
var Schema = mongoose.Schema;

// define a schema
var animalSchema = new Schema({ name: String, type: String });

//添加 Model 的静态方法
animalSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

//查询助手作用于 query 实例，方便你自定义拓展你的 链式查询
animalSchema.query.byName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};

var Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;