import { getCountriesDictionary} from "./countries.js";

/* Global Variables */
const apiKey = '198d1075835c46496833d18310304bbf';

const getAllPath = '/All';
const postPath = '/Post';
const countries = getCountriesDictionary();
const generate_btn = document.querySelector("#generate");
const zip_textHolder = document.querySelector("#zip");
const feelings_textHolder = document.querySelector("#feelings");
const date_elem = document.querySelector("#date");
const temp_elem = document.querySelector("#temp");
const zipHelp = document.querySelector("#zipHelp");
const content_elem = document.querySelector("#content");
const selector_elem = document.querySelector("#country_selector");
const baseURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&zip=`;
// Create a new date instance dynamically with JS
// NOTE : I incremented month by 1 to get a valid month like calender 
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//A function construct Selector element for countries codes and countries name
(function setOptionsOfCountry(){
    selector_elem.style.display = "none";
    Object.keys(countries).forEach(key => {
        const option_elem = document.createElement("option");
        option_elem.innerText = key;
        option_elem.setAttribute("value",countries[key])
        selector_elem.appendChild(option_elem);
    });
    selector_elem.style.display = 'block';
})();
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
let getWeather = async (APIKey,country_code,zip_code) => {
    const res = await fetch(setupWeatherURLRequest(country_code,zip_code,APIKey))
    try {

         let newData = await res.json();
         console.log(newData);
         const newEntry = { 
              temperature: newData.main.temp,
              place : newData.name,
        }
        console.log(newEntry);
        return newEntry;
      }  catch(error) {
        console.log("error", error);
        return error;
      }
}
//function to append meta data from client (Client feelings and current date)
async function appendUserDataAndDate(data = {}){
    try{
    data["date"]= newDate;
    data["user_response"] = feelings_textHolder.value;
    return data
    }catch(err){
        console.log("APPEND ERROR")
        return err;
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
        return data;
      }catch(error) {
      console.log("error", error);
      throw error;
      }
  }


//Function returns valid HTTP link to OpenWeatherMap to get Data corresponding to city 
//Defined by country ID (us,eg,...) and city zip code
function setupWeatherURLRequest(country_code,zip_code,APIKey){
    return baseURL+zip_code+','+country_code+'&appid='+APIKey;
}




//Function to update UI with data 
async function updateUI(data){

    if(data.temperature === undefined){
        zipHelp.textContent="Couldn't find data with specified zip code,make sure you enter a valid zip code";

    }else{
    content_elem.innerHTML = `${data.user_response}`;
    date_elem.innerHTML = ` ${data.date}`;
    temp_elem.innerHTML = `${data.place} : ${data.temperature} C°`;
    zipHelp.textContent = "";
    console.log(data);
    }
    
}
//Function call back when generate button is pressed/clicked

function generate_btn_callback(evt){
    evt.preventDefault();
    const zipCode = zip_textHolder.value;
    const country_code = selector_elem.value;
    console.log("ZipCode = "+zipCode+", Country Code = "+country_code);

    getWeather(apiKey,country_code,zipCode)
        .then(data => appendUserDataAndDate(data))
        .then(data => postData(postPath,data))
        .then(data => updateUI(data))
        
}

//Generate button listener to click event 
generate_btn.addEventListener("click",generate_btn_callback)


selector_elem.value = 'US';
zip_textHolder.value = 94040;
feelings_textHolder.value = "dummy input";