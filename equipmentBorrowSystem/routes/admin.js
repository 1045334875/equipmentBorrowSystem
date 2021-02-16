var express = require('express');
const { controller } = require('../controller');
var router = express.Router();

router.get("/equipmentOnLoan", async (req, res) => {
    let ret = await controller.controller.adminController.getEquipmentOnLoan();
    res.send(ret).end();
})

router.get("/equipmentID/:equipmentID/equipmentOnLoanMsg", async (req, res) => {
    let ret = await controller.controller.adminController.getEquipmentOnLoanMsg(req.params);
    res.send(ret).end();
})

module.exports = router;
