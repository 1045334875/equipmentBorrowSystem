const models = require("../model/index");

exports.getEquipmentOnLoan = async () => {
    let ret;
    let modelResult = await models.adminModel.getEquipmentOnLoan();

    if (modelResult) {
        ret = {
            errorCode: 200,
            errorMsg: "成功返回已借出设备",
            payload: {modelResult}
        }
    } else {
        ret = {
            errorCode: 400,
            errorMsg: "数据库错误",
            payload: {}
        }
    }
    return ret;
}

exports.getEquipmentOnLoanMsg = async (params) => {
    let ret;
    let equipmentID = params.equipmentID;
    let onLoan = await models.adminModel.getEquipmentState(equipmentID);

    if (onLoan == null) {
        ret = {
            errorCode: 400,
            errorMsg: "数据库错误",
            payload: {}
        }
    } else if(onLoan == 0) {
        ret = {
            errorCode: 400,
            errorMsg: "当前设备未借出",
            payload: {}
        }
    } else {
        let modelResultFromEquipment = await models.adminModel.getEquipmentOnLoanMsgFromEquipment(equipmentID);
        let modelResultFromApply = await models.adminModel.getEquipmentOnLoanMsgFromApply(equipmentID);

        let {equipmentName, equipmentPicture, isCamera} = modelResultFromEquipment;
        let {stuID, startTime, returnTime, contactInfo} = modelResultFromApply;

        let result = await sso.getUserInformation(accesstoken).then();
        

        ret = {
            errorCode: 200,
            errorMsg: "成功返回该借出设备信息",
            payload: {
                equipmentID: equipmentID,
                equipmentName: equipmentName,
                equipmentPicture: equipmentPicture,
                isCamera: isCamera,
                name: stuID, //暂时返回id
                stuID: stuID,
                startTime: startTime,
                returnTime: returnTime,
                contactInfo: contactInfo
            }
        }
    }

    return ret;
}