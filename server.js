const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const Port = 8080;

app.use(cors());

app.get('/api', (req,res) => {
res.send({message:'hello'});
});

server.listen(Port, ()=>{
    console.log('server is running on 8080');
});
