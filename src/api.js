import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

function connectSocket(callback) {
    
    socket.on('update egg', (data) => callback({
        type: "update-egg",
        data: data
    }));

    socket.on('update players', (data) => callback({
        type: "update-players",
        data: data
    }));

    socket.on('end game', (data) => callback({
        type: "end-game",
        data: data
    }));
}

function clickEgg(value) {
    socket.emit('click it', value);
}

function startGame(data) {
    window.localStorage.setItem("sl-magnifier", JSON.stringify(data));

    socket.emit('start game', data);
}

function endGame(player) {
    console.log("END GAME")
    socket.emit('end game', player);
}

export { connectSocket, clickEgg, startGame, endGame }