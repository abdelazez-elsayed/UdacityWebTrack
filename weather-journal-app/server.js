// Setup empty JS object to act as endpoint for all routes
let projectData = [];
const port = 8000;
// Require Express to run server and routes
const  express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


//Get route all returns JS object
app.get('/All',(req,res) => {
    res.send(projectData);
})

//POST Route 
//Saves client sent data to project global object in server
app.post('/Post',(req,res) => {
    console.log(req.body);
    let newEntry = {
         temperature : req.body.temperature,
         date : req.body.date,
         user_response : req.body.user_response
    }
    
    projectData.push(newEntry);
    res.send({response: "Data recived at the server"});
})

// Setup Server
app.listen(port,()=>{
    console.log("Server is running...");
    console.log(`Listening port ${port}`)
});