const module = require("../module/index");
const { param } = require("../routes/admin");

exports.getEquipmentOnLoan = async() => {
    let ret;

    let moduleRes = await modules.module.adminModule.getEquipmentOnLoan();
    
    if(moduleRes == null) {
        ret = {
            errorCode: 400,
            errorMsg: "操作数据库出错",
            payload: {}
        }
    } else {
        ret = {
            errorCode: 200,
            errorMsg: "成功返回已借出设备",
            payload: {moduleRes} 
        }
    }
    return ret;
}

exports.getEquipmentOnLoanMsg = async(params) => {
    let ret;

    let equipmentID = param.equipmentID;
    let moduleRes = await modules.module.adminModule.getEquipmentOnLoanMsg(equipmentID);
    
    if(moduleRes.errorCode == 400) {
        ret = {
            errorCode: 400,
            errorMsg: "选定的设备未借出",
            payload: {}
        }
    } else {
        ret = {
            errorCode: 200,
            errorMsg: "成功返回已借出设备",
            payload: {
                equipmentID: moduleRes.equipemntID,
                equipmentName: moduleRes.equipmentName,
                equipmentPicture: moduleRes.equipmentPicture,
                isCamera: moduleRes.isCamera,
                name: moduleRes.stuID,
                startTime: moduleRes.startTime,
                returnTime: moduleRes.returnTime,
                contactInfo: moduleRes.contactInfo
            }
        }
    }
    
    return ret;
}