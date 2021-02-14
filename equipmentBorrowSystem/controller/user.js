const modules = require("../module/index");

exports.putBorrowApply = async (body, params) => {
    let ret;
    let equipmentID = params.equipmentID;
    let startTime = body.startTime;
    let reason = body.reason;
    let contactInfo = body.contactInfo;
    let returnTime = body.returnTime;
    let stuID = 3190105240;

    let moduleResult = await modules.module.userModule.putBorrowApply(
        equipmentID,
        startTime,
        reason,
        contactInfo,
        returnTime,
        stuID
    );

    if (moduleResult == 200) {
        ret = {
            errorCode: 200,
            errorMsg: "借用成功",
            payload: {}
        }
    } else if (moduleResult == 400) {
        ret = {
        errorCode: 400,
        errorMsg: "参数错误，借用失败",
        payload: {}
        }
    } else if (!moduleResult) {
        ret = {
            errorCode: 400,
            errorMsg: "操作数据库出错",
            payload: {}
        }
    }

    return ret;
};
