import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

function socketOnConnect(callback) {
    
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

function socketOnEggClick(value) {
    socket.emit('click it', value);
}

function socketOnStartGame(data) {
    window.localStorage.setItem("sl-magnifier", JSON.stringify(data));

    socket.emit('start game', data);
}

function socketOnEndGame(player) {
    console.log("END GAME")
    socket.emit('end game', player);
}

export { socketOnConnect, socketOnEggClick, socketOnStartGame, socketOnEndGame }