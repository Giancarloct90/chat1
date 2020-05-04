const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const engine = require('ejs-mate');

const app = express();
let server = http.createServer(app);
const path = require('path');

// SET VIEW ENGINE
app.set('views', path.join(__dirname, '../views/'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// TO RECIVE DATA FROM FRONTEND
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//ROUTER
app.use(require('./routes/chat'));

//PRINCIPAL CHAT
app.get('/', (req, res) => {
    res.render('home');
});

app.use(express.static(path.resolve(__dirname, '../public')));

module.exports.io = socketIO(server);
require('./socket/socket');


server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto `);
});