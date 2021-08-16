/* Global Variables */
const apiKey = '198d1075835c46496833d18310304bbf';
let country_code = 'us';
let zip_code = '94040';
const allPath = '/All';
const URL = `api.openweathermap.org/data/2.5/weather?zip=${zip_code},${country_code}&appid=${apiKey}`;

const generate_btn = document.querySelector("#generate");
const zip_textHolder = document.querySelector("#zip");
const feelings_textHolder = document.querySelector("#feelings");
// Create a new date instance dynamically with JS
// NOTE : I incremented month by 1 to get a valid month like calender 
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// GET ROUTE request to server
// The server should return the global object defined there 
let getServerData = async() => {
    const res = await fetch(allPath)
    try{
        let serverData = await res.json();
        
        console.log(serverData);
        return serverData;
    }catch(err){
        console.log("ERROR!",err);
    }
}
/*
GET ROUTE request to WorldWeatherMap
Returns weather object data 
*/
let getWeather = async (APIKey,zip_code) => {
    const res = await fetch(setupWeatherURLRequest(country_code,zip_code)+APIKey)
    try {

         let newData = await res.json();
         newEntry = { 
              temperature: newData.main.temp,
        }
        console.log(newEntry);
        return newEntry;
      }  catch(error) {
        console.log("error", error);
        
      }
}

/*
POST ROUTE 
sends data to server 
*/
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const server_response = await response.json();
        
        console.log(server_response);
        return server_response;
      }catch(error) {
      console.log("error", error);
      }
  }
getWeather(apiKey,zip_code);


//Function returns valid HTTP link to OpenWeatherMap to get Data corresponding to city 
//Defined by country ID (us,eg,...) and city zip code
function setupWeatherURLRequest(country_code,zip_code){
    return `http://api.openweathermap.org/data/2.5/weather?zip=${zip_code},${country_code}&appid=`
}

//Generate button listener to click event 
generate_btn.addEventListener("click",generate_btn_callback)

//Function call back when generate button is pressed/clicked
function generate_btn_callback(){
    const zipCode = zip_textHolder.value;
    console.log("ZipCode = "+zipCode);
    getWeather(apiKey,zipCode).then(data => appendUserDataAndDate(data)).then(data => updateUI(data))
}

//function to append meta data from client (Client feelings and current date)
function appendUserDataAndDate(data = {}){
    data["date"]= newDate;
    data["user_response"] = feelings_textHolder.value;
    return data
}
//Function to update UI with data 
function updateUI(data){
    //TODO 
 console.log(data);
}
