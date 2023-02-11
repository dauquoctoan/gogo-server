"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createSocket(io) {
    const users = {};
    io.on('connection', (socket) => {
        const req = socket.request;
        /* message */
        socket.on('join_room', (room) => {
            socket.join(room);
            console.log(`User with ID: ${socket.id} joined room: ${typeof room}`);
        });
        socket.on('send_message', (data) => {
            socket.to(data.room).emit('receive_message', data);
        });
        /* gửi yêu cầu lên server chuyển cho người dùng b */
        socket.on('invite_to_the_match', (data) => {
            socket.to(data.my_id).emit('res_invite_to_the_match', data);
        });
        /*b gửi phản hồi khi chấp nhận */
        socket.on('accept_the_competition', (data) => {
            socket.to(data.room).emit('res_accept_the_competition', data);
        });
        /*gửi data cho thằng được mời*/
        socket.on('sen_lesson', (data) => {
            socket.to(data.room).emit('res_sen_lesson', data);
        });
        /* gửi danh sách đáp án */
        socket.on('send_list_answer', (data) => {
            console.log(data);
            socket.to(data.room).emit('res_answer', data);
        });
        socket.on('user_connected', (user_id) => {
            users[user_id] = req.session.id;
            req.session.user_id = user_id;
            req.session.save();
            io.sockets.emit('update_user_connected', users);
        });
        socket.on('disconnect', () => {
            delete users[req.session.user_id];
            socket.broadcast.emit('update_user_connected', users);
            console.log('User Disconnected', req.session.user_id);
        });
    });
}
exports.default = createSocket;
