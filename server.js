var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var express = require('express');


app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('client'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

var clicks = 0;
let max = 100;

let colors = ['red', 'blue', 'green'];
let colorCount = 0;
let color = colors[colorCount];

function setAmount() {
  let p = clicks <= max ? clicks/max : max;
  if (clicks >= max) {
    clicks = 0;
    colorCount = colorCount >= 2 ? 2 : colorCount + 1;
    color = colors[colorCount];
  }
  console.log(p)
  return p
}

io.on('connection', function(socket) {
  console.log("connect")
  io.emit('update egg', {color:color,value:setAmount()});
  socket.on('click it', function(data) {
    clicks += data;
    // console.log(clicks)
    io.emit('update egg', {color:color,value:setAmount()});
  });
});

let server = http.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('listening on *:' + port);
});
