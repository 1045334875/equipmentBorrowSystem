const pool = require("./pool");
const mysql = require("mysql2");
let test = async (equipmentID,
    startTime,
    reason,
    contactInfo,
    returnTime,
    stuID) => {
    var conn = await pool.getConnection();
    let equipmentSql =
        "SELECT * FROM equipment WHERE equipmentID = ?";
    let equipmentParam = [equipmentID];
    let equipmentRes = await conn.query(equipmentSql, equipmentParam);
    let longestTime = equipmentRes[0][0].longestBorrowTime;
    console.log(equipmentRes);
}
test(1, 123,"play", "13845679876", 132, 3190105240);