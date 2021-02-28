const pool = require("./pool");
const mysql = require("mysql2");
let test = async () => {
    var conn = await pool.getConnection();

    let equipmentSql = 
        "SELECT equipmentID, equipmentName, equipmentPicture FROM equipment WHERE state = ?";
    let equipmentParam = [1];
    let equipmentRes = await conn.query(equipmentSql, equipmentParam);
    let len = equipmentRes[0].length;

    let equipmentSql2 = 
        "SELECT equipmentID, returnTime FROM borrow_apply WHERE state = ?";
    let equipmentParam2 = [1];
    let equipmentRes2 = await conn.query(equipmentSql2, equipmentParam2);
    let len2 = equipmentRes2[0].length;

    for(let count = 0; count < len; count ++) {
        let equipmentID = equipmentRes[0][count].equipmentID;
        for(let count2 = 0; count2 < len; count2 ++) {
            if(equipmentID == equipmentRes2[0][count2].equipmentID) {
                equipmentRes[0][count].returnTime = equipmentRes2[0][count2].returnTime;
                break;
            }
        }
    }

    console.log(equipmentRes[0]);
    await conn.release();
}
test();