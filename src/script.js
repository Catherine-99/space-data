//ASTRONOMY PHOTO OF THE DAY IMAGE

//variable nasa api for astronomy image of the day 
const apodImageApi = 'https://api.nasa.gov/planetary/apod?api_key=Y14E8niFAi0ORbyu39xNms4D3h0hfLESdaouGkOX'

//retrieve data from nasa api and insert image url and description
async function setAstronomyImage() {
    try{
        const apodData = await fetch (apodImageApi);
        const apodImage = await apodData.json();
        const apodImageUrl = apodImage.url;
        const apodImageExplanation = apodImage.explanation;

        let currentImage = document.querySelector(".apod-photo");
        currentImage.setAttribute("src", apodImageUrl);

        let currentDescription = document.querySelector(".apod-description");
        currentDescription.innerHTML = apodImageExplanation;

    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}

//event listener to add the image and descrption on load 
window.addEventListener('load', setAstronomyImage());


//MARS ROVER IMAGES 
//create api url with a random sol between sol 0-4000
function setRandomApiKey() {
    let randomSol = Math.floor(Math.random() * 4000);
    let roverImageApi  = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${randomSol}&api_key=Y14E8niFAi0ORbyu39xNms4D3h0hfLESdaouGkOX`
    console.log('done');
    return roverImageApi;
}

//insert roverImage (first image of the random day selected)
async function setRandomRoverImage () {
    let apiUrl = setRandomApiKey();
    try{
        let roverData = await fetch(apiUrl);
        let roverImages =  await roverData.json();
        let todaysImageUrl = roverImages.photos[0].img_src

        let currentImage = document.querySelector(".mars-photo");
        currentImage.setAttribute("src", todaysImageUrl);

        let cameraName = roverImages.photos[0].camera.full_name;
        let solNumber = roverImages.photos[0].sol;
        let earthDate = roverImages.photos[0].earth_date;

        let currentDescription = document.querySelector(".mars-description");
        currentDescription.innerHTML = `Image taken on Sol ${solNumber} from ${cameraName} perspective. <br> Earth date image was taken: ${earthDate}`;

    } catch (error){
        console.log(`ERROR: ${error}`)
        window.location.reload();
    }
}

//event listener to add new image and description upon reload 
window.addEventListener('load', setRandomRoverImage());

//event listener to change image and description upon click on refresh button
let refreshButton = document.querySelector(".refresh-button");
refreshButton.addEventListener('click', setRandomRoverImage);


//OBJECTS CLOSE TO EARTH/ASTEROIDS
//date objects for todays date to create api request url
let today = new Date();
let isoDate = today.toISOString();
let asteroidDate = isoDate.substring(0,10);
console.log(asteroidDate);

//api url for asteroid api
let asteroidApi = `https://api.nasa.gov/neo/rest/v1/feed?end_date=${asteroidDate}&api_key=Y14E8niFAi0ORbyu39xNms4D3h0hfLESdaouGkOX`;

//function to retrieve and update asteroid data on website 
async function asteroidData(){
    try{
        let asteroidData = await fetch(asteroidApi);
        let asteroidInformation = await asteroidData.json();

        let currentAsteroids = document.getElementById("objects-number");
        currentAsteroids.innerHTML = asteroidInformation.element_count;
        
    } catch(error) {
        console.log('ERROR')
    }
}

//event listener to load astroid data
window.addEventListener('load', asteroidData());

//SOLAR FLARES
//solar flare Api Url
let solarFlareApi = 'https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=Y14E8niFAi0ORbyu39xNms4D3h0hfLESdaouGkOX'

//retrieve solar flare data and display on website
async function solarFlares(){
    try{
        let solarFlareData = await fetch(solarFlareApi);
        let solarFlareInformation = await solarFlareData.json();

        let currentNumber = document.getElementById("flares-number");
        currentNumber.innerHTML = solarFlareInformation.length;

    } catch (error) {
        console.log(`error${error}`);
    }
}

//event listener to load solar flare data
window.addEventListener('load', solarFlares());


//CORONAL MASS EJECTIONS

//url for cme api
let cmeApiUrl = 'https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=Y14E8niFAi0ORbyu39xNms4D3h0hfLESdaouGkOX'

async function coronalMassEjections() {
    try{
        let cmeData = await fetch(cmeApiUrl);
        let cmeNumber = await cmeData.json();

        let currentNumber = document.getElementById("coronalmass-number");
        currentNumber.innerHTML = cmeNumber.length;

    } catch(error){
        console.log(`error${error}`);
    }
}

//event listener to load cme data
window.addEventListener('load', coronalMassEjections());


//NAV SCROLL BEHAVIOUR
const apodNavButton = document.getElementById("apod-button");
const marsNavButton = document.getElementById("mars-button");
const spaceNavButton = document.getElementById("space-button");

apodNavButton.addEventListener('click', function() {
    document.querySelector(".apod-card").scrollIntoView({behavior: 'smooth'})
})

marsNavButton.addEventListener('click', function() {
    document.querySelector(".mars-rover-card").scrollIntoView({behavior: 'smooth'})
})

spaceNavButton.addEventListener('click', function() {
    document.querySelector(".space-events-section").scrollIntoView({behavior: 'smooth'})
})