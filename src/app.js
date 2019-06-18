const express= require('express');
const app = express();
const exphbs = require('express-handlebars');
const hbs = exphbs.create();
const PORT=3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http); //para crear servidor

app.engine("handlebars",hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static('public'));

app.get('/', function(req,res){
   res.render('home') 
});
      
http.listen(PORT, function(){
  console.log('listening on *:3000');
});


//doesn't work
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
