import { populateVoiceList } from './speech_api'
import { geoFindMe } from './geolocation_api'
import { getWeatherstackData } from './weatherstack_api'
import { googleTranslate } from './googleTranslate_api'
import { getDeezer } from './deezer_api'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;
const layout = document.createElement("DIV") as HTMLDivElement;

populateVoiceList();
geoFindMe();
getDeezer();

// Hae ja näytä Weatherstackin säädata käyttöliittymässä funktiolla getWeatherstackData().
// Huomaa! Käytössä on rajoitettu määrä API-pyyntöjä (noin 200), ennen kuin käyttäjätili voi lukkiutua Weatherstackissa.
// Jos pyyntö ei enää toimi, tarkista API-avaimen voimassaolo tai käyttörajoitukset.
// Tarkista myös konsolin virheilmoitukset virheiden selvittämiseksi.

// Haetaan viittaus säätiedotuksen div-elementtiin
const weatherOutputDiv = document.querySelector<HTMLDivElement>('#weather-output')!;

// Funktio, joka näyttää säätiedot
async function displayWeatherData() {
    try {
        const weatherData = await getWeatherstackData();
        
        if (weatherData) {
            const { name, humidity, feelslike, visibility, is_day, localtime, temperature } = weatherData;

            // Lisätään säätiedot weatherOutputDiv-elementtiin
            weatherOutputDiv.innerHTML = `
                <p>Kaupunki: ${name}</p>
                <p>Kosteus: ${humidity}%</p>
                <p>Tuntuu kuin: ${feelslike}°C</p>
                <p>Näkyvyys: ${visibility} km</p>
                <p>Onko päivä: ${is_day === 'yes' ? 'Kyllä' : 'Ei'}</p>
                <p>Paikallinen aika: ${localtime}</p>
                <p>Lämpötila: ${temperature}°C</p>
            `;
        } else {
            weatherOutputDiv.innerText = "Säätietojen noutaminen epäonnistui.";
        }
    } catch (error) {
        weatherOutputDiv.innerText = "Säätietojen noutaminen epäonnistui.";
    }
}

// Kutsutaan displayWeatherData-funktiota säätietojen lataamiseksi
displayWeatherData();

const translateForm = document.querySelector<HTMLFormElement>('#translate-form')!;
translateForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Haetaan lomakkeen arvot
    const sourceLang = (document.querySelector<HTMLSelectElement>('#source-lang')!).value;
    const targetLang = (document.querySelector<HTMLSelectElement>('#target-lang')!).value;
    const text = (document.querySelector<HTMLInputElement>('#text-input')!).value;

    // Kutsutaan googleTranslate-funktiota
    googleTranslate(sourceLang, targetLang, text);
});

layout.style.backgroundColor = "black";
layout.addEventListener("click", (event: MouseEvent) => {
    if ("geolocation" in navigator) {
        layout.innerText = "Sijaintipalvelut ovat käytettävissä";
    } else {
        layout.innerText = "Sijaintipalveluja EI OLE käytettävissä";
    }
});

app.append(layout);
