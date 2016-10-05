var coap        = require('coap')
    , coapserver  = coap.createServer()
var mongodb = require('mongodb');
var redis = require("redis");

var redisClient;
var mongodbServer;
var mongodbClient;

function serverInit()
{
    mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
    mongodbClient = new mongodb.Db('devdb', mongodbServer);

    redisClient = redis.createClient();
    redisClient.on("error", function (err) {
       console.log("Error " + err);
    });
}
serverInit();

coapserver.on('request', function(req, res) {
  res.end('Hello ' + req.url.split('/')[1] + '\n')
})

coapserver.listen(function() {
  console.log('server started')
})  