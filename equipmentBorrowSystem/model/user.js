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

//获取个人信息
exports.getUserInfo = async (
    stuID
) => {
    try {
        //连接数据库
        var conn = await pool.getConnection();

        let userSql = 
            "SELECT name, department, departmentName, position, stuPicture, borrowTime FROM user_info WHERE stuID = ?";
        let userParam = [stuID];
        let userRes = await conn.query(userSql, userParam);
        let name = userRes[0][0].name;
        let department = userRes[0][0].department;
        let departmentName = userRes[0][0].departmentName;
        let position = userRes[0][0].position;
        let stuPicture = userRes[0][0].stuPicture;
        let borrowTime = userRes[0][0].borrowTime;

        return {
            name,
            department,
            departmentName,
            position,
            stuPicture,
            borrowTime
        }
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

        let equipmentSql = 
            "SELECT equipmentID, startTime, returnTime FROM borrow_apply WHERE stuID = ?";
        let equipmentParam = [stuID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        
        let equipmentID = [];
        for ( let i = 0 ; i < equipmentRes[0].length ; i++) {
            equipmentID[i] = equipmentRes[0][i].equipmentID;
        }
        
        let equipmentNameSql =
            "SELECT equipmentName FROM id_equipment WHERE equipmentID in (?)";
        let equipmentNameParam = [equipmentID];
        let equipmentNameRes = await conn.query(equipmentNameSql, equipmentNameParam);

        for ( let i = 0 ; i < equipmentRes[0].length ; i++) {
            equipmentRes[0][i].equipmentName = equipmentNameRes[0][i].equipmentName;
        }

        return equipmentRes[0];
    } catch (err) {
        console.log("getBorrrowedEquipment Model Error" + err);
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

/*const pool = require("./pool");
const mysql = require("mysql2");
let test = async (
    stuID
) => {
    try {
        console.log("dfvdfv");
        var conn = await pool.getConnection();

        let equipmentSql = 
            "SELECT equipmentID, startTime, returnTime FROM borrow_apply WHERE stuID = ?";
        let equipmentParam = [stuID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        let equipmentID = equipmentRes[0][0].equipmentID;
        let startTime = equipmentRes[0][0].startTime;
        let returnTime = equipmentRes[0][0].returnTime;
        console.log("1111");
        console.log(equipmentRes);
        return {
            equipmentID, 
            startTime, 
            returnTime
        }
    } catch (err) {
        console.log("getBorrrowedEquipment Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
};
test(2);

console.log("rvesv");
*/