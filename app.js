//var app = require('express')();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
var io = require('socket.io')
({
	transports: ['websocket'],
});

/*
app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});
*/

var onlineUsers = {};

var onlineCount = 0;

io.on('connection', function(socket){
	console.log('a user connected');
	
    //socket.on('open',function(obj){
     //   console.log('open');
    //});
	/*
	socket.on('user:login', function(){
		console.log('user:login');
	});
*/
	socket.on('user:login', function(obj){
		console.log("user:login : "+ obj.email+ " : " + obj.pass );
	});

	socket.on('login', function(obj){
		console.log( obj );
        
		socket.name = obj.userid;
		
		if(!onlineUsers.hasOwnProperty(obj.userid)) {
			onlineUsers[obj.userid] = obj.username;
			onlineCount++;
		}
		
		io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
		console.log(obj.username);
	});
	
	socket.on('disconnect', function(){
	
		if(onlineUsers.hasOwnProperty(socket.name)) {
	
			var obj = {userid:socket.name, username:onlineUsers[socket.name]};
			delete onlineUsers[socket.name];
			onlineCount--;
	
			io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
			console.log(obj.username);
		}
	});
	
    socket.on('msg', function(msg){
	    console.log(msg);
		
		socket.emit('msg',  { name:"j", pw:"hey" } );
		//console.log(obj.username+':'+obj.content);
	});
  
	socket.on('message', function(obj){
	
		io.emit('message', obj);
		console.log(obj.username+':'+obj.content);
	});
  
});

/*
http.listen(5882, function(){
	console.log('listening on *:5882');
});
*/
io.attach(5882);
