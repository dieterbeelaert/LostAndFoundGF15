/**
 * Created by dietn on 18/12/14.
 */

var express = require('express');
var server = new express();
var settings = require("./settings.json");
var route = require('./Routing/RouteHandler.js');
//serve static files
server.use(express.static('Public'));

server.all('*',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    route.routeRequest(req,res);
});

server.listen(settings.port);
