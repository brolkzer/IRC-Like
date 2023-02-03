import express from 'express';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('hello world')
})

http.listen(3000, function () {
    console.log('server running on port 3000');
    
})