// Tämä API:n ilmainen käyttöaika on päättynyt testauksen aikana. Tämän vuoksi oletetaan, että dataa saadaan.
// Varmuuden vuoksi olen jättänyt console.log-rivin, jotta voidaan tarkistaa, että ongelma johtuu API:n käyttöajasta eikä jostain muusta syystä.
export async function getWeatherstackData() {
    const url = 'https://api.weatherstack.com/current?access_key=848d55228659be0e5cc4c7ec040aa707&query=Rovaniemi';
    const options = {
        method: 'GET'
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        /* const {
            current: {
                humidity,       // Ilmankosteus
                feelslike,      // Lämpötila, miltä tuntuu
                visibility,     // Näkyvyys
                is_day,         // Onko päivä vai yö
                temperature,    // Lämpötila
            },
            location: { 
                name,           // Sijainnin nimi
                localtime       // Paikallinen aika
            }
        } = data; */

        // Tulostetaan koko saatu data konsoliin, jotta voidaan tarkistaa kaikki yksityiskohdat
        console.log(data); 
        /* Palautetaan objekti vaadituilla tiedoilla
        return { name, humidity, feelslike, visibility, is_day, localtime, temperature };
        */
    } catch (error) {
        // Tulostetaan virhe, jos API-kutsu epäonnistuu
        console.error(error);
        return null; // Palautetaan null virheen tapahtuessa
    }
}
