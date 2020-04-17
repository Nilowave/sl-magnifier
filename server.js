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
let base = 230;
let max = 230;
let ended = 0;

let colors = ['red', 'blue', 'green'];
let colorCount = 0;


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

        max = players.length * base;

        console.log("max increased",max)

        io.emit('update players', players);
    });

    socket.on('game on', function (data) {
        io.emit('game on', {});
    })

    socket.on('end game', function (data) {
        console.log("end game", data)
        ended++;
        players.map(p => {
            if (p.name == data.name) {
                return p.clicks = data.clicks
            }
            return p
        });

        let exclude = ["Danilo", "Kit", "Sean", "Kristina", "Sombra", "Yusaku", "Akiko"];

        if (ended == players.length) {
            let filtered = players.filter(p => {
                return !exclude.includes(p.name);
            })

            let sorted = filtered.sort((a, b) => {
                console.log("compare :", a.clicks, b.clicks)
                if (a.clicks > b.clicks) return -1;
                if (b.clicks > a.clicks) return 1;
              
                return 0;
            })

            io.emit('winner', sorted[0]);
            
            console.log("WHO CLICKED MOST???", sorted[0].name)
            console.log(sorted)
        }

        console.log("all",players)
    });

});

let server = http.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log('listening on *:' + port);
});
