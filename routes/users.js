var express = require('express');
var router = express.Router();

var Stu = require("../bin/DAO/stuDAO.js");

//添加学生接口
router.post("/login",(req,res)=>{
  var nameError = !req.body.name.trim();
  console.log(req.body)
  var telError = !/^1[3578]\d{9}$/.test(req.body.tel);
  if(nameError||telError){
      res.json({err:1,msg:"数据格式错误"});
      return;
  }

  var s = new Stu(req.body);
  s.save()
  .then(()=>{
      res.json({err:0,msg:"添加成功"});
  })
  .catch(err=>{
      res.json({err:2,msg:"未知错误"});
  });

});

module.exports = router;
