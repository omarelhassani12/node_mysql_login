const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const router = require('./routes/pages');
const routerAuth = require('./routes/auth.');


dotenv.config({path: path.join(__dirname, './.env')});


const app = express();




const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));
//parse url encoded bodies (as sent by html forms)
app.use(express.urlencoded({ extended:false}));
//parse json bodies (as sent by html forms)
app.use(express.json());

app.set('view engine', 'hbs');



app.use('/auth',routerAuth);
app.use(router);

app.listen(5000,( )=>{
    console.log("Listening on port 5000");
})