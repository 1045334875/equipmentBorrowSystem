const models = require("../model/index");
const sso = require("./ssoUtil.js");

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

exports.putBorrowApply = async (body, params) => {
    let ret;
    let equipmentID = params.equipmentID;
    let startTime = body.startTime;
    let reason = body.reason;
    let contactInfo = body.contactInfo;
    let returnTime = body.returnTime;

    // let result = await sso.getUserInformation(accesstoken).then();
    // let stuID = result.id;

    let stuID = 3190105240; // 暂时写死

    let longestTime = await models.userModel.getLongestTime(equipmentID);

    if (returnTime - startTime <= longestTime && returnTime > startTime) {
        let moduleResult = await models.userModel.putBorrowApply(
            equipmentID,
            startTime,
            reason,
            contactInfo,
            returnTime,
            stuID
        );

        if (moduleResult) {
            ret = {
                errorCode: 200,
                errorMsg: "借用成功",
                payload: {},
            };
        } else {
            ret = {
                errorCode: 400,
                errorMsg: "操作数据库出错",
                payload: {},
            };
        }
    } else if (!longestTime) {
        ret = {
            errorCode: 400,
            errorMsg: "操作数据库出错",
            payload: {},
        };
    } else {
        ret = {
            errorCode: 400,
            errorMsg: "参数错误，借用失败",
            payload: {},
        };
    }

    return ret;
};

exports.getUserInfo = async (body, params, userInfo) => {
    let ret;
    //调用远程数据库获取学号;
    let stuID = userInfo.id;
    //console.log(stuID);
    //let stuID = "3200106058";
    let userResult = await models.userModel.getUserInfo(stuID);
    //let userResult = {ss:1};
    //console.log(userResult);
    if (userResult) {
        //将学号合并到结果中;
        userResult.stuID = stuID;
        ret = {
            errorCode: 200,
            errorMsg: "成功返回个人基本信息",
            payload: userResult
        };
    } else {
        ret = {
            errorCode: 600,
            errorMsg: "操作数据库出错，获取信息失败",
            payload: {}
        };
    }


    return ret;
};

exports.getBorrowedEquipment = async (body, params, userInfo) => {
    let ret;

    let stuID = userInfo.id;
    //stuID = "3200106058";
    let borrowedEquipment = await models.userModel.getBorrowedEquipment(stuID);

    if (!borrowedEquipment) {
        ret = {
            errorCode: 600,
            errorMsg: "操作数据库出错，获取信息失败",
            payload: {}
        };
    } else {
        ret = {
            errorCode: 200,
            errorMsg: "成功返回个人正在借用设备信息及归还日期",
            payload: {
                //返回数组;
                data: borrowedEquipment
            }
        };
    }
    

    return ret;
};

exports.putEquipmentRet = async (body, params, userInfo) => {
    let ret;
    let equipmentID = params.equipmentID;
    
    //let result = await sso.getUserInfo(accesstoken).then();
    let stuID = userInfo.id;
    //let stuID = "3200106058";
    let modelResult = await models.userModel.putEquipmentRet(equipmentID, stuID);
    if (!modelResult) {
        ret = {
            errorCode: 400,
            errorMsg: "操作数据库出错，归还失败",
            payload: {}
        };
    } else {
        ret = {
            errorCode: 200,
            errorMsg: "成功归还设备",
            payload: {}
        };
    }
    return ret;
};