var express = require('express');
var server = require('http').createServer(app);
var app = express();
var io = require('socket.io')(server);

var port = 3696;
var connections = []

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.sockets.on('connection', function (socket) {

  console.log('user connected...');
  connections.push(socket)
  console.log('Connnected sockets = %s', connections.length);
  socket.events = {};

  socket.on('event.message', function (payload) {
    console.log("payload ",payload)
    io.sockets.emit('event.response', payload);
  });

  socket.on('event.subscribe', function (room) {
    console.log('subscribing to', room);
    socket.join(room);
  });

  socket.on('event.unsubscribe', function (room) {
    console.log('unsubscribing to ', room);
    socket.leave(room);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected...');
  });

});
