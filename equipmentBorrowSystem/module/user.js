const pool = require("./pool");
const mysql = require("mysql2");

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

        // 获取最长借用时间
        let equipmentSql =
            "SELECT longestBorrowTime FROM equipment WHERE equipmentID = ?";
        let equipmentParam = [equipmentID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        let longestTime = equipmentRes[0][0].longestBorrowTime;z

        if (returnTime - startTime <= longestTime && returnTime > startTime) {
            let applySql = "INSERT INTO borrow_apply (equipmentID, stuID, startTime, contactInfo, reason, returnTime) VALUE (?, ?, ?, ?, ?, ?)";
            let applyParam = [equipmentID, stuID, startTime, contactInfo, reason, returnTime];
            let applyRet = await conn.query(applySql, applyParam);
            let result = 200;
            return result;
        } else {
            let result = 400;
            return result;
        }
    } catch {
        console.log("putBorrowApply Module Error");
        return null;
    } finally {
        await conn.release();
    }
};

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
// test(1, 123,"play", "13845679876", 132, 3190105240);