const models = require("../model/index");

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
        let modelResult = await models.userModel.putBorrowApply(
            equipmentID,
            startTime,
            reason,
            contactInfo,
            returnTime,
            stuID
        );

        if (modelResult) {
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


exports.getLongestTime = async (params) => {
    let ret;
    let equipmentID = params.equipmentID;
    let modelResult = await models.userModel.getLongestTime(equipmentID);
    if (!modelResult) {
        ret = {
            errorCode: 400,
            errorMsg: "操作数据库出错",
            payload: {},
        };
    } else {
        ret = {
            errorCode: 200,
            errorMsg: "最长借用时间查询成功",
            payload: {
                longestBorrowTime: modelResult,
            }
        };
    }

    return ret;
};