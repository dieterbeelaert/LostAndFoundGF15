/**
 * Created by dietn on 17/07/15.
 */

var Controller = require('./Controller.js');
var DataHandler = require('../Data/DataHandler.js');

function ConnectController(req,res,ctx){
    console.log('init connectController');
    this.prototype = new Controller(req,res,ctx);
}
module.exports = ConnectController;

ConnectController.prototype.doRequest = function() {
    var self = this;
    self.prototype.setResJSON(); //this controller always returns JSON
    console.log(self.prototype.ctx.routeObj);
    switch(self.prototype.ctx.routeObj.action){
        case 'update': self.doUpdate();
            break;
        case 'status': self.doStatus();
            break;
        default: self.onConnect(); // no action provided so first login, register user's id,
        // if it is the second user just get the perfect location between both and throw it in the database
            break;
    }
}

ConnectController.prototype.doUpdate = function(){

}

ConnectController.prototype.doStatus = function(){
    //get data from database so that the users can refresh data
}

ConnectController.prototype.onConnect = function(){
    var self = this;
    var id = self.prototype.ctx.routeObj.action
    //check if it is the first or second one who connects
    DataHandler.isFirstConnected(self.prototype.ctx.routeObj.action,function(firstConnected){
        var token = self.prototype.ctx.getParam('token');
        var lat = self.prototype.ctx.getParam('lat');
        var lon = self.prototype.ctx.getParam('lon');
        if(!firstConnected){
           //insert and start to calculate the perfect point
            DataHandler.insertUser(id,token,lat,lon,function(){
                //calculate perfect location and insert int into database for records with this token
            });
        }else{
           //just insert him into the database
            DataHandler.insertUser(id, token,lat,lon);
        }
    })
}

