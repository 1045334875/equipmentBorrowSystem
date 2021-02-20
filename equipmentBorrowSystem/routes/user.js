var express = require('express');
var router = express.Router();
const controller = require("../controller/index")
const {userController} = controller;  // 解构： 如果经常使用controller中的某一个属性，可以用这样的方式减少调用时候代码的长度
module.exports = router;

// 中间件，起识别拦截作用
// 这个中间件一定要放在route文件的最上面：route匹配是【从上到下&&从前到后】的。
//router.use("/", async (req, res, next) => {
  // 调用一个专门的controller, 将token发给这个controller
  // controller先检查一下token是否是null
  // controller调用新用户系统接口，返回用户的token是否过期、真实
  // 以及如果没过期，用户的信息（包括学号等等）
  // 如果token存在（即返回了用户信息），执行他真正的接口
  // 执行真正接口的代码：next();
  // 如果token不存在，或者过期，或者假的：res.send(message).end();
  // 如果是admin的拦截？那还要多一步检测管理员身份
//})
//const {userController} = controller;  // 解构：如果经常使用controller中的某一个属性，可以用这样的方式减少调用时候代码的长度


router.use("/", async (req, res, next) => {
	let ret = await adminController.tokenChecker(req.headers['access-token']);

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
router.get("/size/:size/page/:page/equipmentInfo", async(req, res)=>{
  let ret = await userController.getequipmentInfo(req.body,req.params);
  res.send(ret).end();
})

router.put("/equipmentID/:equipmentID/borrowApply", async (req, res) => {
	// console.log("Here!");
	let ret = await controller.userController.putBorrowApply(req.body, req.params);
	// 调用一个controller, 获得处理的数据结果, 赋值给了ret
	res.send(ret).end();
})

router.get("/equipmentID/:equipmentID/longestBorrowTime", async (req, res) =>{
  //console.log("Here!");
  let ret = await userController.getLongestTime(req.params);
  res.send(ret).end();
})

