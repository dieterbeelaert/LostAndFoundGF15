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

function canConnect(id,callback){
    var query = 'select count(*) as count from connection where id = ?';
    db.query(query,[id],function(err,rows,fields){
        callback(rows[0].count < 2 ? true : false);
    });
}
module.exports.canConnect = canConnect;

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

function getStatus(id,token,callback){
    //gets the status of the other user
    var query = 'select * from connection where id = ? and user_token != ?';
    db.query(query,[id,token],function(err,row,fields){
        if(!err){
            callback(row);
        }
    });
}
module.exports.getStatus = getStatus;

function updateStatus(id,token,lat,lon){
    var query = 'update connection set lat = ? and lon = ? where id = ? and user_token = ?';
    db.query(query,[lat,lon,id,token],function(err,row,fields){
        if(err){
            console.log(err);
        }
    });
}
module.exports.updateStatus = updateStatus;


