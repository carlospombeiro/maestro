'use strict';

const ipc=require('node-ipc');
const global = require('./lib/global');

ipc.config.id = global.ipc.maestro.id;
ipc.config.retry= 1500;
ipc.config.maxConnections=1;
//ipc.config.silent = true;

ipc.serveNet(global.ipc.maestro.port, function(){
    ipc.server.on('message', function(data,socket){
        ipc.log('got a message : ', data);
        ipc.server.emit(socket, 'message', data+' world!');
    });

    ipc.server.on('socket.disconnected', function(data,socket){
        console.log('DISCONNECTED\n\n',arguments);
    });
});

ipc.server.on('error', function(err){
    ipc.log('Got an ERROR!',err);
});

ipc.server.start();