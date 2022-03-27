'use strict';
var ot = require('ot');
var socketio = require('socket.io');
var rooms = {};

module.exports = function(server) {
    var io = socketio(server);
    var str = 'var x = x + 1;';

    io.on('connection', function(socket) {
        socket.on('joinRoom', function(info) {
            console.log(rooms[info.room])
            console.log(!rooms[info.room])
        if (!rooms[info.room]) {
            var socketioserver = new ot.EditorSocketIOServer(str, [], info.room, function(socket, cb) {
            var self = this;
            console.log("hello")
            console.log(info.room)
            Program.findByIdAndUpdate(info.room, {content: self.document}, function(err) {
            if (err){
                return cb(false);
            }
                cb(true);
            });
            });
            rooms[info.room] = socketioserver;
        }
        rooms[info.room].addClient(socket);
        rooms[info.room].setName(socket, info.user);
        socket.room = info.room;
        socket.join(info.room);
        });
    
        socket.on('disconnect', function() {
            socket.leave(socket.room);
        });

        socket.on('chatMsg', function(info) {
            io.to(socket.room).emit('chatMsg', info);
        });
    })
}
