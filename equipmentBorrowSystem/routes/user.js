var express = require('express');
var router = express.Router();
const controller = require("../controller/index")

// req: request res: respond
router.put("/equipmentID/:equipmentID/borrowApply", async (req, res) => {
  let ret = await controller.controller.userController.putBorrowApply(req.body, req.params);
  // 调用一个controller, 获得处理的数据结果, 赋值给了ret
  res.send(ret).end();
})


module.exports = router;
