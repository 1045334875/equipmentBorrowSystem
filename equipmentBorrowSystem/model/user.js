const pool = require("./pool");
const mysql = require("mysql2");
//const { getLongestTime } = require("../controller/user");

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
        if (!equipmentRes[0][0]){
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

//获取获取所有的摄像机/非摄像机简略信息
exports.getequipmentInfo = async (
    isCamera,
) => {
    try {
        var conn = await pool.getConnection();
        //查询摄像机/非摄像机的信息
        let equipmentSql =
        " SELECT a.equipmentID, a.equipmentName, a.equipmentPicture, a.state, b.returnTime FROM equipment a LEFT JOIN (SELECT returnTime,equipmentID FROM borrow_apply WHERE state = 1) b ON a.equipmentid = b.equipmentID WHERE a.isCamera =1";
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

// /* 调试单个sql语句的参考代码 */

//  const pool = require("./pool");
// const mysql = require("mysql2");
// let test = async (
//     isCamera
//     ) => {
//             var conn = await pool.getConnection();
        
//         let equipmentSql =
//         "SELECT a.equipmentID, a.equipmentName, a.equipmentPicture, a.state, b.returnTime FROM equipment a LEFT JOIN (SELECT returnTime,equipmentID FROM borrow_apply WHERE state = 1) b ON a.equipmentid = b.equipmentID WHERE a.isCamera = ?";
        
//         let equipmentParam = [isCamera];
//         let equipmentRet = await conn.query(equipmentSql, equipmentParam);
//         let totalNum = equipmentRet[0].length;
// console.log( totalNum,equipmentRet[0]);
//     await conn.release();
// }
// test(1);



// const pool = require("./pool");
// const mysql = require("mysql2");
// var test = async (
//     equipmentID
// ) => {
//     try {
//         // 连接数据库
//         var conn = await pool.getConnection();

//         // 获取最长借用时间
//         let equipmentSql =
//             "SELECT longestBorrowTime FROM equipment WHERE equipmentID = ?";
//         let equipmentParam = [equipmentID];
//         let equipmentRes = await conn.query(equipmentSql, equipmentParam);
//         if (!equipmentRes[0][0]){
//             throw new Error("equipmentID有误");
//         }
//         let longestTime = equipmentRes[0][0].longestBorrowTime;
        
//         console.log(longestTime);
//     } catch (err) {
//         console.log("getLongestTime Model Error" + err);
//     } finally {
//         await conn.release();
//     }
// };
// test(1);
