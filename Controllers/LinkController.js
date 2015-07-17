/**
 * Created by dietn on 19/12/14.
 */
var Controller = require('./Controller.js');
var shortid = require('shortid');


/*Constructor*/
function LinkController(req,res,ctx){
    console.log("init linkController");
    this.prototype = new Controller(req,res,ctx);
}
module.exports = LinkController;

LinkController.prototype.doRequest = function(){
    var self = this;
    self.prototype.setResJSON(); //this controller always returns JSON
    console.log(self.prototype.ctx.routeObj);
    switch(self.prototype.ctx.routeObj.action){
        case 'generate': self.generate();
            break;
        default:
            //just stop request
            self.prototype.res.end();
            break;
    }
}

LinkController.prototype.generate = function(){
    var self = this;
    var toReturn = {};
    var id = shortid.generate();
    toReturn.uniqueLink = 'http://' + self.prototype.req.headers.host + '/connect/' + id,
    toReturn.id= id;
    self.prototype.returnJSON(toReturn);
}


