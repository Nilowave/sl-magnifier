import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

function connectSocket(callback) {
    socket.on('update egg', (data) => callback(null, data));
}

function clickEgg(value) {
    socket.emit('click it', value);
}

export { connectSocket, clickEgg }