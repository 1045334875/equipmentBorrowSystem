var express = require('express');
var router = express.Router();
const controller = require("../controller/index")
const {adminController} = controller;

router.use("/", async (req, res, next) => {
//   调用一个专门的controller, 将token发给这个controller
//   controller先检查一下token是否是null
//   controller调用新用户系统接口，返回用户的token是否过期、真实
//   以及如果没过期，用户的信息（包括学号等等）
//   如果token存在（即返回了用户信息），执行他真正的接口
//   执行真正接口的代码：next();
//   如果token不存在，或者过期，或者假的：res.send(message).end();
//   如果是admin的拦截？那还要多一步检测管理员身份
    console.log("Already Here !!!");
    let ret = await adminController.adminChecker(req.headers['access-token']);
    
    if(ret == 1) {
        next();
    } else {
        let message = {
            errorCode: 400,
            errorMsg: "并非管理员",
            payload: {}
        }
        res.send(message).end();
    }
})

router.get("/equipmentOnLoan", async (req, res) => {
    let ret = await adminController.getEquipmentOnLoan();
    res.send(ret).end();
})

router.get("/equipmentID/:equipmentID/equipmentOnLoanMsg", async (req, res) => {
    let ret = await adminController.getEquipmentOnLoanMsg(req.params);
    res.send(ret).end();
})

module.exports = router;
