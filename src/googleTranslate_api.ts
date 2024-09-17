/**
 * Kääntää tekstin lähdekielestä kohdekieleen käyttäen Google Translate API:ta.
 *
 * @param sourceLang - Lähdekielen koodi (esim. 'en' englannille).
 * @param targetLang - Kohdekielen koodi (esim. 'fi' suomelle).
 * @param text - Käännettävä teksti.
 * @returns Ei palauta mitään, mutta näyttää käännetyn tekstin elementissä, jonka id on 'translation-output'.
 */
export async function googleTranslate(sourceLang: string, targetLang: string, text: string) {
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect';
    const data = new FormData();

    // Määritellään HTTP-pyyntö
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '574a34a165msh3655dfee45def17p11bb15jsnbf7ce346ea4c',
            'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
            'Accept-Encoding': 'application/gzip'
        },
        body: data
    };

    // Lisätään tarvittavat tiedot pyynnön bodyyn
    data.append('source_language', sourceLang);
    data.append('target_language', targetLang);
    data.append('text', text);
    
    try {
        // Lähetetään pyyntö ja odotetaan vastausta
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        
        // Näytetään käännetty teksti HTML-elementissä
        const outputElement = document.querySelector<HTMLDivElement>('#translation-output');
        if (outputElement) {
            outputElement.innerText = result;
        } else {
            console.warn('Translation output elementtiä ei löytynyt.');
        }
    } catch (error) {
        console.error('Virhe käännöspyynnössä:', error);
    }
}
