const models = require("../model/index");
const sso = require("./ssoUtil.js");
const { adminModel } = models;

/*exports.tokenChecker = async (accesstoken) => {
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
}*/


exports.putEquipmentAdd = async (body, params) => {
    let ret;
    let equipmentID = params.equipmentID;
    let equipmentName = body.equipmentName;
    let isCamera = body.isCamera;
    let equipmentPicture = body.equipmentPicture;
    let longestBorrowTime = body.longestBorrowTime;
    let modelResult = await models.adminModel.putEquipmentAdd(
        equipmentID,
        equipmentName,
        equipmentPicture,
        longestBorrowTime,
        isCamera);

    if (modelResult) {
        ret = {
            errorCode: 200,
            errorMsg: "成功添加设备",
            payload: {}
        };
    } else {
        ret = {
            errorCode: 400,
            errorMsg: "参数错误，添加失败",
            payload: {}
        };
    }
    return ret;
};

exports.deleteEquipmentDelete = async (body, params) => {
    let ret;
    let equipmentID = params.equipmentID;
    let modelResult = await models.adminModel.deleteEquipmentDelete(equipmentID);
    if (modelResult) {
        ret = {
            errorCode: 200,
            errorMsg: "成功删除设备",
            payload: {}
        };
    } else {
        ret = {
            errorCode: 400,
            errorMsg: "删除设备失败",
            payload: {}
        };
    }
    return ret;
};
