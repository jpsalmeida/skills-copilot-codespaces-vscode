//Create web server
const express = require('express');
const app = express();
//Create web socket server
const server = require('http').Server(app);
const io = require('socket.io')(server);
//Create a connection to the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true});
const Comment = mongoose.model('Comment', { author: String, text: String });
//Create a connection to the database
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Create a connection to the database
const cors = require('cors');
app.use(cors());
//Create a connection to the database
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//Create a connection to the database
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        res.send(comments);
    });
});
//Create a connection to the database
app.post('/comments', (req, res) => {
    let comment = new Comment(req.body);
    comment.save((err) => {
        if (err) sendStatus(500);
        io.emit('comment', req.body);
        res.sendStatus(200);
    });
});
//Create a connection to the database
io.on('connection', (socket) => {
    console.log('a user connected');
});
//Create a connection to the database
const port = 3001;
server.listen(port, () => {
    console.log(`listening on port ${port}`);
});

