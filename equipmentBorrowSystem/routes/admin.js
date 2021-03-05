var express = require('express');
var router = express.Router();
const controller = require("../controller/index")
const { adminController } = controller;

/*router.use("/", async (req, res, next) => {
    let ret = await adminController.tokenChecker(req.headers['access-token']);

    if (ret.errorCode == 200) {
        req.userInfo = ret.payload;

        let stuID = req.userInfo.id;
        let result = await adminController.isAdmin(stuID);
        
        if(!result) {
            let message = {
                errorCode: 400,
                errorMsg: "不是管理员",
                payload: {}
            }
            res.send(message).end();
        } else {
            next();
        }
    } else {
        let message = {
            errorCode: 400,
            errorMsg: "用户信息已过期",
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
    let ret = await adminController.getEquipmentOnLoanMsg(req.body, req.params);
    res.send(ret).end();
})*/

router.put("/equipmentID/:equipmentID/equipmentAdd", async (req, res) => {
    let ret = await adminController.putEquipmentAdd(req.body, req.params);
    res.send(ret).end();
})

router.delete("/equipmentID/:equipmentID/equipmentDelete", async (req, res) => {
    let ret = await adminController.deleteEquipmentDelete(req.body, req.params);
    res.send(ret).end();
})

module.exports = router;
