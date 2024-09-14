import { populateVoiceList } from './speech_api'
import { geoFindMe } from './geolocation_api'
import { getWeatherstackData } from './weatherstack_api'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;
const layout = document.createElement("DIV") as HTMLDivElement;

populateVoiceList();
geoFindMe();

// Hae ja näytä suodatettu Weatherstack-datan käyttöliittymässä (funktiolla getWeatherstackData()).
// Huom! Käytössä on noin 200 API-pyyntöä ennen kuin käyttäjätilini lukkiutuu Weatherstackissa. 
// Jos pyyntö ei enää toimi, ongelma saattaa johtua API-avaimen vanhenemisesta tai käyttörajoituksista.
// Tarkista konsolin virheilmoitukset mahdollisten virheiden selvittämiseksi.

async function displayWeatherData() {
    const weatherData = await getWeatherstackData();

    if (weatherData) {
        const { name, humidity, feelslike, visibility, is_day, localtime, temperature } = weatherData;

        layout.innerHTML = `
            <p>City: ${name}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Feels Like: ${feelslike}°C</p>
            <p>Visibility: ${visibility} km</p>
            <p>Is Day: ${is_day === 'yes' ? 'Yes' : 'No'}</p>
            <p>Local Time: ${localtime}</p>
            <p>Temperature: ${temperature}°C</p>
        `;
    } else {
        layout.innerText = "Failed to retrieve weather data.";
    }
}

displayWeatherData();

layout.style.backgroundColor = "black";
layout.addEventListener("click", (event: MouseEvent) => {
    if ("geolocation" in navigator) {
        layout.innerText = "Geolocation is available";
    } else {
        layout.innerText = "Geolocation IS NOT available";
    }
});

app.append(layout);
