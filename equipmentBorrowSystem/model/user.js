const pool = require("./pool");
const mysql = require("mysql2");
//const { getLongestTime } = require("../controller/user");


// 获取最长借用时间
exports.getLongestTime = async (
    equipmentID
) => {
    try {
        // 连接数据库
        var conn = await pool.getConnection();

        // 获取最长借用时间
        let equipmentSql =
            "SELECT longestBorrowTime FROM equipment WHERE equipmentID = ?";
        let equipmentParam = [equipmentID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        if (!equipmentRes[0][0]) {
            throw new Error("equipmentID有误");
        }
        let longestTime = equipmentRes[0][0].longestBorrowTime;
        return longestTime;
    } catch (err) {
        console.log("getLongestTime Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
};

// 添加新的借用记录
exports.putBorrowApply = async (
    equipmentID,
    startTime,
    reason,
    contactInfo,
    returnTime,
    stuID
) => {
    try {
        // 连接数据库
        var conn = await pool.getConnection();

        let applySql =
            "INSERT INTO borrow_apply (equipmentID, stuID, startTime, contactInfo, reason, returnTime,state) VALUE (?, ?, ?, ?, ?, ?,?);"
        let equipmentSql=
            "UPDATE equipment SET state = ? WHERE equipmentID = ?"
        let applyParam = [
            equipmentID,
            stuID,
            startTime,
            contactInfo,
            reason,
            returnTime,
            1,
        ];
        let equipmentParam = [
            1,
            equipmentID
        ]
        let applyRet = await conn.query(applySql, applyParam);
        let equipmentRet = await conn.query(equipmentSql,equipmentParam);
        let result = 200;
        return result;
    } catch (err) {
        console.log("putBorrowApply Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
};

//获取个人信息
exports.getUserInfo = async (
    stuID
) => {
    try {
        
        //连接数据库
        var conn = await pool.getConnection();
        //SQL查询
        //console.log(stuID);
        let userSql = 
            "SELECT name, department, departmentName, position, stuPicture, borrowTime FROM user_info WHERE stuID = ?";
        let userParam = [stuID];
        let userRes = await conn.query(userSql, userParam);
        //console.log(userRes[0][0]);
        let privilegeSql = 
            "SELECT id FROM admin WHERE id = ?";
        let privilegeParam = [stuID];
        let privilegeRes = await conn.query(privilegeSql, privilegeParam);
        console.log(privilegeRes[0][0]);
        if(privilegeRes[0][0])  {
            userRes[0][0].privilege = 1;
        }else  {
            userRes[0][0].privilege = 0;
        }
        return userRes[0][0];
    } catch (err) {
        console.log("getUserInfo Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
};

//获取个人正在借用设备信息及归还日期
exports.getBorrowedEquipment = async (
    stuID
) => {
    try {
        var conn = await pool.getConnection();
        //SQL查询id,开始时间，结束时间
        console.log(stuID);
        let equipmentSql = 
            "SELECT equipmentID, startTime, returnTime FROM borrow_apply WHERE stuID = ? and state = ?";
        let equipmentParam = [stuID, 1];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        // console.log(equipmentRes[0]);
        //提取id为数组
        let equipmentID = [];
        for ( let i = 0 ; i < equipmentRes[0].length ; i++) {
            equipmentID[i] = equipmentRes[0][i].equipmentID;
        }
        //console.log(equipmentID);
        //SQL由id数组查询name
        // console.log("equipmentID : " + equipmentID);
        let equipmentNameSql =
            "SELECT equipmentName FROM equipment WHERE equipmentID in (?)";
        let equipmentNameParam = [equipmentID];
        let equipmentNameRes = await conn.query(equipmentNameSql, equipmentNameParam);
        //将name合并到对象中
        //console.log(equipmentRes[0]);
        for ( let i = 0 ; i < equipmentRes[0].length ; i++) {
            equipmentRes[0][i].equipmentName = equipmentNameRes[0][i].equipmentName;
        }
        // console.log(equipmentRes[0]);
        return equipmentRes[0];
    } catch (err) {
        console.log("getBorrrowedEquipment Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
};

//归还设备
exports.putEquipmentRet = async (
    equipmentID,
    stuID
) => {
    try {
        //连接数据库
        var conn = await pool.getConnection();
        
             
        //SQL修改设备状态为未借出
        let equipmentSql =
            "UPDATE equipment SET state = 0 WHERE equipmentID = ?";
        let equipmentParam = [equipmentID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        //SQL修改个人信息
        let userSql =
            "UPDATE user_info SET borrowTime = borrowTime + 1 WHERE stuID = ?";
        let userParam = [stuID];
        let userRes = await conn.query(userSql, userParam);
        //SQL修改设备借用信息为已归还
        let equipmentRetSql =
            "UPDATE borrow_apply SET state = 0 WHERE equipmentID = ?";
        let equipmentRetParam = [equipmentID];
        let equipmentRetPes = await conn.query(equipmentRetSql, equipmentRetParam);
        
        let result = 200;
        return result;
    } catch (err) {
        console.log("putEquipmentRet Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
};
/* 调试单个sql语句的参考代码 */
//获取获取所有的摄像机/非摄像机简略信息
exports.getequipmentInfo = async (
    isCamera,
) => {
    try {
        var conn = await pool.getConnection();
        //查询摄像机/非摄像机的信息
        let equipmentSql =
        " SELECT a.equipmentID, a.equipmentName, a.equipmentPicture, a.state, b.returnTime FROM equipment a LEFT JOIN (SELECT returnTime,equipmentID FROM borrow_apply WHERE state = 1) b ON a.equipmentid = b.equipmentID WHERE a.isCamera = ?";
        let equipmentParam = [isCamera];
        let equipmentRet = await conn.query(equipmentSql, equipmentParam);
        let totalNum = equipmentRet[0].length;//得到摄像机/非摄像机的总数
        if(!totalNum){
            throw new Error("isCamera 有误");
        }
        let result ={
            totalNum: totalNum,
            data: equipmentRet[0],
        };
        return result;
    } catch (err) {
        console.log("getequipmentInfo Mddel Error" + err);
        return null;
    } finally {
        await conn.release;
    }

};
