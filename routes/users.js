var express = require('express');
var router = express.Router();

var User = require("../bin/DAO/userDAO.js");

//添加接口
router.post("/login", (req, res) => {
    var nameError = !req.body.username.trim();
    var telError = !/^\d{6}$/.test(req.body.password);
    if (nameError || telError) {
        res.json({ err: 1, msg: "数据格式错误" });
        return;
    }
    console.log(req.body)

      var s = new User(req.body);
      s.save()
      .then(()=>{
          res.json({err:0,msg:"添加成功"});
      })
      .catch(err=>{
          res.json({err:2,msg:"未知错误"});
      });
    // res.send({
    //     code: 200,
    //     message: '操作成功！'
    // });

});

//查询每条数据的全部值
router.get("/getUserList", (req, res) => {
      User.find()
      .then((data, err)=>{
          console.log('data...........', data)
          res.json(data);
      })
      .catch(err=>{
          res.json({err:2,msg:"未知错误"});
      });

});

//查询每条数据的全部值
router.get("/getUserNameList", (req, res) => {
    User.find()
    .then((data, err)=>{
        console.log('data...........', data)
        res.json(data);
    })
    .catch(err=>{
        res.json({err:2,msg:"未知错误"});
    });

});

module.exports = router;
