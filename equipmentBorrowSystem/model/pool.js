var mysql =require("mysql2/promise");

module.exports = (function(){
    var pool = mysql.createPool({
        host: '10.79.250.37',
        user: 'zjutv_pro',
        password: 'zjutv_pro2020',
        database: 'equipmentBorrowSystem',
    })
    
    pool.on("connection",function(connection){
        connection.query("SET SESSION auto_increment_increment=1");
    });
    return pool;
    
})();