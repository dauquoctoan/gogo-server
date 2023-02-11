"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createSocket(io) {
    io.on('connection', (socket) => {
        console.log(`User Connected: ${socket.id}`);
        socket.on('join_room', (room) => {
            socket.join('123');
            console.log(`User with ID: ${socket.id} joined room: ${typeof room}`);
        });
        socket.on('send_message', (data) => {
            socket.to('123').emit('receive_message', data);
        });
        socket.on('disconnect', () => {
            console.log('User Disconnected', socket.id);
        });
    });
}
exports.default = createSocket;
