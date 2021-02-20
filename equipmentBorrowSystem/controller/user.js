const models = require("../model/index");

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
