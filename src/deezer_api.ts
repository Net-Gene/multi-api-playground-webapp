export async function getDeezer() {
    const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '574a34a165msh3655dfee45def17p11bb15jsnbf7ce346ea4c',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        // Hae tiedot API:sta
        const response = await fetch(url, options);
        const result = await response.json(); // Muunna vastaus JSON-muotoon

        // Ota data talteen tuloksista
        const tracks = result.data; // Oletetaan, että data on "data"-avaimen alla

        // Kokoa HTML-sisältö
        let outputHtml = '';

        for (let index = 0; index < 5; index++) {
            const element = tracks[index];
            outputHtml += `
                <p>Otsikko: ${element.title}</p>
                <p>Artisti: ${element.artist.name}</p>
                <p>Albumi: ${element.album.title}</p>
                <p>Esikatselu: <a href="${element.preview}" target="_blank">Kuuntele</a></p>
                <hr> <!-- Lisää erotin parantamaan luettavuutta -->
            `;
        }

        // Näytä kootut tiedot output-divissä
        document.querySelector<HTMLDivElement>('#deezer-output')!.innerHTML = outputHtml;
        
        if (tracks.length === 0) {
            document.querySelector<HTMLDivElement>('#deezer-output')!.innerText = 'Kappaleita ei löytynyt.';
        }
        
    } catch (error) {
        console.error('Tietojen hakeminen Deezer API:sta epäonnistui:', error);
        document.querySelector<HTMLDivElement>('#deezer-output')!.innerText = 'Tietojen hakeminen Deezer API:sta epäonnistui.';
    }
}
