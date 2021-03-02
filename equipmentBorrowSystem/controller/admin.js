const models = require("../model/index");
const sso = require("./ssoUtil.js");
const { adminModel } = models;

exports.tokenChecker = async (accesstoken) => {
    let flag = 1;
    let result = await sso.getUserInformation(accesstoken).then().catch(function (err) {
        flag = 0;
        return {
            errorCode: 400,
            errorMsg: err,
            payload: {}
        };
    }
    );
    if(flag) {
        return {
            errorCode: 200,
            errorMsg: "accesstoken正确",
            payload: result
        };
    } else {
        return result;
    }
}

exports.isAdmin = async (stuID) => {
    let result = await adminModel.isAdmin(stuID);
    return result;
}

exports.getEquipmentOnLoan = async () => {
    let ret;
    let modelResult = await adminModel.getEquipmentOnLoan();

    if (modelResult) {
        ret = {
            errorCode: 200,
            errorMsg: "成功返回已借出设备",
            payload: modelResult 
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
    let onLoan = await adminModel.getEquipmentState(equipmentID);

    if (onLoan == null) {
        ret = {
            errorCode: 400,
            errorMsg: "数据库错误",
            payload: {}
        }
    } else if (onLoan == 0) {
        ret = {
            errorCode: 400,
            errorMsg: "当前设备未借出",
            payload: {}
        }
    } else {
        let modelResultFromEquipment = await adminModel.getEquipmentOnLoanMsgFromEquipment(equipmentID);
        let modelResultFromApply = await adminModel.getEquipmentOnLoanMsgFromApply(equipmentID);

        let { equipmentName, equipmentPicture, isCamera } = modelResultFromEquipment;
        let { stuID, startTime, returnTime, contactInfo } = modelResultFromApply;

        let name = await adminModel.getName(stuID);
        let modelResult = modelResultFromEquipment;
        modelResult.name = name;
        Object.assign(modelResult, modelResultFromApply);

        if (!name) {
            ret = {
                errorCode: 400,
                errorMsg: "user数据库错误",
                payload: {}
            }
        } else {
            ret = {
                errorCode: 200,
                errorMsg: "成功返回该借出设备信息",
                payload: modelResult
            }
        }

    }

    return ret;
}