const express = require("express");

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());


const port = 8080;

app.use(express.static("demo"))

const server = app.listen(port,listening);
function listening(){

    console.log("server running...");
    console.log(`listenning localhost on port :  ${port}`);
}