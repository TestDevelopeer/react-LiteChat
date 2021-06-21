const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{cors:{origin:"http://localhost:3000"}});

const rooms = new Map();

app.get('/rooms', (request, response) => {
    response.json(rooms);
});

io.on('connection', socket => {
    console.log('user connected', socket.id);
})

server.listen(9999, (error) => {
    if (error) {
        throw Error(error);
    } else {
        console.log('Сервер запущен');
    }
});