var express = require('express');
var router = express.Router();
const controller = require("../controller/index")
const {userController} = controller;


router.use("/", async (req, res, next) => {
	let ret = await userController.tokenChecker(req.headers['accesstoken']);
	console.log(ret);
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
})

// req: request res: respond
router.put("/equipmentID/:equipmentID/borrowApply", async (req, res) => {
	// console.log("Here!");
	let ret = await controller.putBorrowApply(req.body, req.params);
	// 调用一个controller, 获得处理的数据结果, 赋值给了ret
	res.send(ret).end();
})

//004.获取个人信息
router.get("/userInfo", async (req, res) => {
  let ret = await userController.getUserInfo(req.body, req.params, req.userInfo);
  res.send(ret).end();
})

//005.获取个人正在借用设备信息及归还日期
router.get("/borrowedEquipment", async (req, res) => {
  let ret = await userController.getBorrowedEquipment(req.body, req.params, req.userInfo);
  res.send(ret).end();
})

//006.归还设备
router.put("/equipmentID/:equipmentID/equipmentRet", async (req, res) => {
  let ret = await userController.putEquipmentRet(req.body, req.params, req.userInfo);
  res.send(ret).end();
})

module.exports = router;