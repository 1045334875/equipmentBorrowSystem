const models = require("../model/index");
const sso = require("./ssoUtil.js");

exports.tokenChecker = async (accesstoken) => {
    //console.log(accesstoken);
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

exports.putBorrowApply = async (stuID,contactInfo, body, params) => {
    let ret;
    let equipmentID = params.equipmentID;
    let startTime = body.startTime;
    let reason = body.reason;
    let returnTime = body.returnTime;
    let longestTime = await models.userModel.getLongestTime(equipmentID);
    if (returnTime - startTime <= longestTime && returnTime > startTime) {
        let modelResult = await models.userModel.putBorrowApply(
            equipmentID,
            startTime,
            reason,
            contactInfo,
            returnTime,
            stuID,
        );

        if (modelResult) {
            ret = {
                errorCode: 200,
                errorMsg: "借用成功",
                payload: {},
            };
        } else {
            ret = {
                errorCode: 400,
                errorMsg: "操作数据库出错",
                payload: {},
            };
        }
    } else if (!longestTime) {
        ret = {
            errorCode: 400,
            errorMsg: "操作数据库出错",
            payload: {},
        };
    } else {
        ret = {
            errorCode: 400,
            errorMsg: "参数错误，借用失败",
            payload: {},
        };
    }

    return ret;
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

exports.getUserInfo = async (body, params, userInfo) => {
    let ret;

    let stuID = userInfo.id;
    //console.log(stuID);
    //let stuID = "3200106058";
    let userResult = await models.userModel.getUserInfo(stuID);
    //let userResult = {ss:1};
    //console.log(userResult);
    if (userResult) {
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
            errorCode: 400,
            errorMsg: "操作数据库出错",
            payload: {},
        };
    } else {
        ret = {
            errorCode: 200,
            errorMsg: "最长借用时间查询成功",
            payload: {
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

    let equipmentBorrowed = await models.userModel.getBorrowedEquipment(stuID);
    let flag = 0;

    // console.log(equipmentBorrowed);
    
    if(equipmentBorrowed) {
        for(let i = 0; i < equipmentBorrowed.length; i++) {
            if(equipmentBorrowed[i].equipmentID == equipmentID) flag = 1;
        }
    }

    if(flag == 0) {
        ret = {
            errorCode: 400,
            errorMsg: "归还设备不正确，归还失败",
            payload: {}
        }
    } else {
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
    }    
    return ret;
};

exports.getequipmentInfo = async (params) => {
    let isCamera = params.isCamera;
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
