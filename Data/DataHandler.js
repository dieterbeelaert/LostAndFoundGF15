/**
 * Created by dietn on 28/11/14.
 */

var connectionMgr = require("./ConnectionManager");
var db = connectionMgr.getConnection();

function doQueryAndCallbackData(query, callback){
    db.query(query,function(error,rows,fields){
        if(error){console.log(error);}
        callback(rows);
    });
}

function isFirstConnected(id,callback){
    var query = 'select count(*) as count from connection where id = ?';
    db.query(query,[id],function(err,rows,fields){
       callback(rows[0].count === 0 ? true : false);
    });
}
module.exports.isFirstConnected = isFirstConnected;

function

function insertUser(id,token,lat,lon,callback){
    var query = 'insert into connection(id,user_token,lat,lon,timestamp) values(?,?,?,?,now())';
    db.query(query,[id,token,lat,lon],function(err,row,fields){
        if(err){
            console.log(err);
        }
        if(callback !== undefined)
            callback();
    });
}
module.exports.insertUser = insertUser;


