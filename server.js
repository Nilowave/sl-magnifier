var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var express = require('express');


app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('client'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

var clicks = 0;
let max = 100;

let colors = ['red', 'blue', 'green'];
let colorCount = 0;
let color = colors[colorCount];


let players = [];

function setAmount() {
    let p = clicks <= max ? clicks / max : max;

    if (clicks >= max) {
        clicks = max;
    }
    
    return p
}

io.on('connection', function (socket) {
    console.log("connect")

    io.emit('update egg', { value: setAmount() });
    io.emit('update players', players);
    
    socket.on('click it', function (data) {
        clicks += data;

        let value = setAmount();
        
        if (value < max) {
            io.emit('update egg', { value: value });
        } else {
            io.emit('end game', players);
        }
    });

    socket.on('start game', function (data) {

        // check if player in game
        let currentPlayer = players.filter(p => {return p.name == data.name} )[0];
        if (currentPlayer) {
            console.log("player already in game")
            players.map((p, i) => {
                p.side = i > Math.floor((players.length-1)/2) ? "right":"left";
                return p;
            });
    
            io.emit('update players', players);
            return
        }

        let player = {
            ...data,
            offset: Math.floor(Math.random() * 9)
        }

        players.push(player);

        players.map((p, i) => {
            p.side = i > Math.floor((players.length-1)/2) ? "right":"left";
            return p;
        })

        // console.log(players)

        io.emit('update players', players);
    });

    socket.on('end game', function (data) {
        console.log("end game", data)
        players.map(p => {
            if (p.name == data.name) {
                return data
            }
            return p
        })
    });

});

let server = http.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log('listening on *:' + port);
});
