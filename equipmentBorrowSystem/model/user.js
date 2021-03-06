const pool = require("./pool");
const mysql = require("mysql2");

// 逻辑判断应当放在controller里面，所以应当将model函数拆分成两个
/* 原始代码 */
// exports.putBorrowApply = async (
//     equipmentID,
//     startTime,
//     reason,
//     contactInfo,
//     returnTime,
//     stuID
// ) => {
//     try {
//         // 连接数据库
//         var conn = await pool.getConnection();

//         // 获取最长借用时间
//         let equipmentSql =
//             "SELECT longestBorrowTime FROM equipment WHERE equipmentID = ?";
//         let equipmentParam = [equipmentID];
//         let equipmentRes = await conn.query(equipmentSql, equipmentParam);
//         let longestTime = equipmentRes[0][0].longestBorrowTime;

//         if (returnTime - startTime <= longestTime && returnTime > startTime) {
//             let applySql =
//                 "INSERT INTO borrow_apply (equipmentID, stuID, startTime, contactInfo, reason, returnTime) VALUE (?, ?, ?, ?, ?, ?)";
//             let applyParam = [
//                 equipmentID,
//                 stuID,
//                 startTime,
//                 contactInfo,
//                 reason,
//                 returnTime,
//             ];
//             let applyRet = await conn.query(applySql, applyParam);
//             let result = 200;
//             return result;
//         } else {
//             let result = 400;
//             return result;
//         }
//     } catch (err) {
//         console.log("putBorrowApply Model Error");
//         return null;
//     } finally {
//         await conn.release();
//     }
// };


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
            "INSERT INTO borrow_apply (equipmentID, stuID, startTime, contactInfo, reason, returnTime) VALUE (?, ?, ?, ?, ?, ?)";
        let applyParam = [
            equipmentID,
            stuID,
            startTime,
            contactInfo,
            reason,
            returnTime,
        ];
        let applyRet = await conn.query(applySql, applyParam);
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
        let equipmentSql = 
            "SELECT equipmentID, startTime, returnTime FROM borrow_apply WHERE stuID = ?";
        let equipmentParam = [stuID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        //console.log(equipmentRes[0][1].equipmentID);
        //提取id为数组
        let equipmentID = [];
        for ( let i = 0 ; i < equipmentRes[0].length ; i++) {
            equipmentID[i] = equipmentRes[0][i].equipmentID;
        }
        //console.log(equipmentID);
        //SQL由id数组查询name
        let equipmentNameSql =
            "SELECT equipmentName FROM equipment WHERE equipmentID in (?)";
        let equipmentNameParam = [equipmentID];
        let equipmentNameRes = await conn.query(equipmentNameSql, equipmentNameParam);
        //将name合并到对象中
        for ( let i = 0 ; i < equipmentRes[0].length ; i++) {
            equipmentRes[0][i].equipmentName = equipmentNameRes[0][i].equipmentName;
        }
        //console.log(equipmentRes[0]);
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

// const pool = require("./pool");
// const mysql = require("mysql2");
// let test = async (equipmentID,
//     startTime,
//     reason,
//     contactInfo,
//     returnTime,
//     stuID) => {
//     var conn = await pool.getConnection();
//     let applySql = "INSERT INTO borrow_apply (equipmentID, stuID, startTime, contactInfo, reason, returnTime) VALUE (?, ?, ?, ?, ?, ?)";
//     let applyParam = [equipmentID, stuID, startTime, contactInfo, reason, returnTime];
//     let applyRet = await conn.query(applySql, applyParam);
//     await conn.release();
// }
// test(1, 123, "play", "13845679876", 132, 3190105240);