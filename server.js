/**
 * server.js
 *
 * @description Application to test an OCR tutorial about "How to make fast NodeJs application"
 * @author Nicolas GIGOU
 * @Source https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/socket-io-passez-au-temps-reel
 */


/**
 * ----------------------------------------------------------------------------------
 * NodeJs modules
 * ----------------------------------------------------------------------------------
 */
var http = require('http');
var fs = require('fs');


/**
 * ----------------------------------------------------------------------------------
 * Server settings
 * ----------------------------------------------------------------------------------
 */
// Loading of the index.html file displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});


/**
 * ----------------------------------------------------------------------------------
 * Server settings
 * ----------------------------------------------------------------------------------
 */
server.listen(8080, function()
{
	var host = 'localhost';
	var port = server.address().port;

	console.log("         _______      ");
	console.log("       _/       \\_      ");
	console.log("      / |       | \\      ");
	console.log("     /  |__   __|  \\      ");
	console.log("    |__/((o| |o))\\__|      ");
	console.log("    |      | |      |      ");
	console.log("    |\\     |_|     /|      ");
	console.log("    | \\           / |      ");
	console.log("     \\| /  ___  \\ |/      ");
	console.log("      \\ | / _ \\ | /      ");
	console.log("       \\_________/      ");
	console.log("        _|_____|_      ");
	console.log("   ____|_________|____   ");
	console.log("  /                   \\   ");

  	console.log('A monster is trying to send you messages at http://%s:%s', host, port);
});


/**
 * ----------------------------------------------------------------------------------
 * Server notifications
 * ----------------------------------------------------------------------------------
 */
// Loading of socket.io
var io = require('socket.io').listen(server);

// When a client comes to be connected, you notify it in the console
io.sockets.on('connection', function (socket) {

    // Log a new message when there is a new connection
    var clientIp = socket.request.connection.remoteAddress;
    console.log('New connection from ' + clientIp);

    // Notify the user by sending a message
    // socket.emit('message', { 'content': "You're logged in! Good boy!", 'importance': 1});
    // socket.broadcast.emit('message', { 'content': "another client is connected", 'importance': 1});

    // When receiving a "message" request from the client
    socket.on('message', function (message) {
        var cleanMessage = message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        console.log(socket.pseudo + ' (client) is talking to me. It\'s saying : "' + cleanMessage + '".');
    });

    // When a new client try to connect
    // We add his/her username in the socket object
    // (Not a good practise, just to try)
    socket.on('new_client', function(pseudo) {
        socket.pseudo = pseudo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') || 'A kid trying to hack the system';
    });
});