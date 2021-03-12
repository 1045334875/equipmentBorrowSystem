const models = require("../model/index");
const { param } = require("../routes/user");
const sso = require("./ssoUtil.js");

exports.tokenChecker = async (accesstoken) => {
    console.log(accesstoken);
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

exports.putBorrowApply = async (/*stuID,*/body, params) => {
    let ret;
    let equipmentID = params.equipmentID;
    let startTime = body.startTime;
    let reason = body.reason;
    let contactInfo = body.contactInfo;
    let returnTime = body.returnTime;
    // let result = await sso.getUserInformation(accesstoken).then();
    // let stuID = result.id;
    let longestTime = await models.userModel.getLongestTime(equipmentID);
    // console.log(longestTime);
    let stuID = 3200104385;
    if (returnTime - startTime <= longestTime && returnTime > startTime) {
        let modelResult = await models.userModel.putBorrowApply(
            equipmentID,
            startTime,
            reason,
            contactInfo,
            returnTime,
            stuID,
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
    //console.log(params);
    let ret;
    let equipmentID = params.equipmentID;
    //console.log(equipmentID);
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

exports.putEquipmentRet = async (body, params) => {
    let ret;
    let equipmentID = params.equipmentID;
    
    //let result = await sso.getUserInfo(accesstoken).then();
    //let stuID = result.id;
    let stuID = "3200106058";
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
exports.getequipmentInfo = async (body, params) => {
    let isCamera = body.isCamera;
    let size = params.size;
    let page = params.page;
    let data =[];
    let modelResult = await models.userModel.getequipmentInfo(isCamera);
    if(!modelResult){
        ret = {
            errorCode: 400,
            errorMsg: "操作数据库出错",
            payload:{},
        };
    } else {
        let totalNum = modelResult.totalNum;
        let equipmentRet = modelResult.data;
        //console.log(totalNum,equipmentRet);
        let start = (page-1)*size;
        let end = Math.min(start + parseInt(size),totalNum);
        //console.log(start,end,start + size);
        for (let i=start; i<end; i++){
            data.push( equipmentRet[i]);
        }
        if(data == false){
                ret = {
                errorCode: 400,
                errorMsg: "page 参数出错",
                payload: {}
            };
        } else{
            ret = {
                errorCode: 200,
                errorMsg: "成功返回设备信息",
                payload: {
                totalNum: totalNum,
                data: data,
                }
            };
        }   
    }
    return ret;
}
