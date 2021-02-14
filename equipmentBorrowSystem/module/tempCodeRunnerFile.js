const pool = require("./pool");
const mysql = require("mysql2");
let test = async (equipmentID,
    startTime,
    reason,
    contactInfo,
    returnTime,
    stuID) => {
    var conn = await pool.getConnection();
    let applySql = "INSERT INTO borrow_apply (equipmentID, stuID, startTime, contactInfo, reason, returnTime) VALUE (?, ?, ?, ?, ?, ?)";
    let applyParam = [equipmentID, stuID, startTime, contactInfo, reason, returnTime];
    let applyRet = await conn.query(applySql, applyParam);
    await conn.release();
}
test(1, 123,"play", "13845679876", 132, 3190105240);