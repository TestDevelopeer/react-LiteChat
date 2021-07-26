const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {cors: {origin: "http://localhost:3000"}});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const rooms = new Map();

app.get('/rooms/:id', (request, response) => {
    const roomId = request.params.id;
    const obj = rooms.has(roomId) ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()]
    } : {users: [], messages: []};
    response.json(obj);
});

app.post('/rooms', (request, response) => {
    const {roomId, userName} = request.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []]
        ]));
    }
    response.send();
});

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).emit('ROOM:SET_USERS', users);
    });

    socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text}) => {
        const obj = {userName, text}
        rooms.get(roomId).get('messages').push(obj);
        socket.to(roomId).emit('ROOM:NEW_MESSAGE', obj);
    });

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...rooms.get(roomId).get('users').values()];
                socket.to(roomId).emit('ROOM:SET_USERS', users);
            }
        });
    });

    console.log('user connected', socket.id);
})

server.listen(9999, (error) => {
    if (error) {
        throw Error(error);
    } else {
        console.log('Сервер запущен');
    }
});