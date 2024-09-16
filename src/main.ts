import { populateVoiceList } from './speech_api'
import { geoFindMe } from './geolocation_api'
import { getWeatherstackData } from './weatherstack_api'
import { textTranslator } from './textTranslator_api'
import { getRandomFacts } from './getRandomAnimalFacts'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;
const layout = document.createElement("DIV") as HTMLDivElement;

populateVoiceList();
geoFindMe();
getRandomFacts(`cat`, 1);

// Hae ja näytä suodatettu Weatherstack-datan käyttöliittymässä (funktiolla getWeatherstackData()).
// Huom! Käytössä on noin 200 API-pyyntöä ennen kuin käyttäjätilini lukkiutuu Weatherstackissa. 
// Jos pyyntö ei enää toimi, ongelma saattaa johtua API-avaimen vanhenemisesta tai käyttörajoituksista.
// Tarkista konsolin virheilmoitukset mahdollisten virheiden selvittämiseksi.

// Get reference to the weather output div
const weatherOutputDiv = document.querySelector<HTMLDivElement>('#weather-output')!;

// Function to display Weather data
async function displayWeatherData() {
    try {
        const weatherData = await getWeatherstackData();
        
        if (weatherData) {
            const { name, humidity, feelslike, visibility, is_day, localtime, temperature } = weatherData;

            // Add the weather data to the weatherOutputDiv
            weatherOutputDiv.innerHTML = `
                <p>City: ${name}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Feels Like: ${feelslike}°C</p>
                <p>Visibility: ${visibility} km</p>
                <p>Is Day: ${is_day === 'yes' ? 'Yes' : 'No'}</p>
                <p>Local Time: ${localtime}</p>
                <p>Temperature: ${temperature}°C</p>
            `;
        } else {
            weatherOutputDiv.innerText = "Failed to retrieve weather data.";
        }
    } catch (error) {
        weatherOutputDiv.innerText = "Failed to retrieve weather data.";
    }
}

// Call the displayWeatherData function to load the weather info
displayWeatherData();

const translateForm = document.querySelector<HTMLFormElement>('#translate-form')!;
translateForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const sourceLang = (document.querySelector<HTMLSelectElement>('#source-lang')!).value;
    const targetLang = (document.querySelector<HTMLSelectElement>('#target-lang')!).value;
    const text = (document.querySelector<HTMLInputElement>('#text-input')!).value;

    // Call the textTranslator function
    textTranslator(sourceLang, targetLang, text);
});


layout.style.backgroundColor = "black";
layout.addEventListener("click", (event: MouseEvent) => {
    if ("geolocation" in navigator) {
        layout.innerText = "Geolocation is available";
    } else {
        layout.innerText = "Geolocation IS NOT available";
    }
});

app.append(layout);
