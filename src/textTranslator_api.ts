export function textTranslator(sourceLang: string, targetLang: string, text: string) {
    const data = new FormData();
    data.append('source_language', sourceLang);
    data.append('target_language', targetLang);
    data.append('text', text);
    
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            const response = JSON.parse(this.responseText);
            const translatedText = response.data.translatedText;
            document.querySelector<HTMLDivElement>('#translation-output')!.innerText = translatedText;
        }
    });
    
    xhr.open('POST', 'https://text-translator2.p.rapidapi.com/translate');
    xhr.setRequestHeader('x-rapidapi-key', '574a34a165msh3655dfee45def17p11bb15jsnbf7ce346ea4c');
    xhr.setRequestHeader('x-rapidapi-host', 'text-translator2.p.rapidapi.com');
    
    xhr.send(data);
}
