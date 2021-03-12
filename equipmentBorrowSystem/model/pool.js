var mysql =require("mysql2/promise");

module.exports = (function(){
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'cairile',
        database: 'equipmentborrowsystem2.0',
    })
    
    pool.on("connection",function(connection){
        connection.query("SET SESSION auto_increment_increment=1");
    });
    return pool;
    
})();