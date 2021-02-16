var express = require('express');
var router = express.Router();
const controller = require("../controller/index")
const {userController} = controller;  // 如果经常使用controller中的某一个属性，可以用这样的方式减少调用时候代码的长度

// req: request res: respond
router.put("/equipmentID/:equipmentID/borrowApply", async (req, res) => {
  let ret = await userController.putBorrowApply(req.body, req.params);
  // 调用一个controller, 获得处理的数据结果, 赋值给了ret
  res.send(ret).end();
})


module.exports = router;
