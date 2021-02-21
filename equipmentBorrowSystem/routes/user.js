var express = require('express');
var router = express.Router();
const controller = require("../controller/index")
const {userController} = controller;  // 解构：如果经常使用controller中的某一个属性，可以用这样的方式减少调用时候代码的长度


/*router.use("/", async (req, res, next) => {
	let ret = await controller.adminController.tokenChecker(req.headers['access-token']);

	if (ret.errorCode == 200) {
		req.userInfo = ret.payload;
		next();
	} else {
		let message = {
			errorCode: 400,
			errorMsg: "用户信息已过期",
			payload: {}
		}
		res.send(message).end();
	}
})*/

// req: request res: respond
router.put("/equipmentID/:equipmentID/borrowApply", async (req, res) => {
	// console.log("Here!");
	let ret = await controller.userController.putBorrowApply(req.body, req.params);
	// 调用一个controller, 获得处理的数据结果, 赋值给了ret
	res.send(ret).end();
})

//004.获取个人信息
router.get("/userInfo", async (req, res) => {
  let ret = await userController.getUserInfo(req.body, req.params/*, req.userInfo*/);
  res.send(ret).end();
})

//005.获取个人正在借用设备信息及归还日期
router.get("/borrowedEquipment", async (req, res) => {
  let ret = await userController.getBorrowedEquipment(req.body, req.params);
  res.send(ret).end();
})

//006.归还设备
router.put("/equipmentID/:equipmentID/equipmentRet", async (req, res) => {
  let ret = await userController.putEquipmentRet(req.body, req.params);
  res.send(ret).end();
})

module.exports = router;