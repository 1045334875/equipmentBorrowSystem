var express = require('express');
var router = express.Router();
const controller = require("../controller/index")
const {userController} = controller;


router.use("/", async (req, res, next) => {
	let ret = await controller.tokenChecker(req.headers['access-token']);

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


module.exports = router;