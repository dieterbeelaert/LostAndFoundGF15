/**
 * Created by dietn on 17/07/15.
 */

var Controller = require('./Controller.js');

function ConnectController(req,res,ctx){
    console.log('init connectController');
    this.prototype = new Controller(req,res,ctx);
}
module.exports = ConnectController;
