const synth = window.speechSynthesis;

const inputForm = document.querySelector("form")!;
const inputTxt = document.querySelector<HTMLInputElement>(".txt")!;
const voiceSelect = document.querySelector("select")!;
const pitch = document.querySelector<HTMLInputElement>("#pitch")!;
// const pitchValue = document.querySelector(".pitch-value")!; // Poistettu, ei käytössä
const rate = document.querySelector<HTMLInputElement>("#rate")!;
// const rateValue = document.querySelector(".rate-value")!; // Poistettu, ei käytössä

let voices: SpeechSynthesisVoice[] = [];

// Äänilistan täyttöfunktio
export function populateVoiceList() {
  voices = synth.getVoices(); // Haetaan saatavilla olevat äänet

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option"); // Luodaan uusi <option>-elementti
    option.textContent = `${voices[i].name} (${voices[i].lang})`; // Lisätään äänen nimi ja kieli

    if (voices[i].default) {
      option.textContent += " — OLETUS"; // Lisätään merkintä, jos ääni on oletusääni
    }

    // Asetetaan data-attribuutit äänen kielelle ja nimelle
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option); // Lisätään vaihtoehto valikkoon
  }
}

// Tarkistetaan, onko äänet muuttuneet ja päivitetään lista tarvittaessa
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Lomakkeen lähetystapahtuman käsittelijä
inputForm.onsubmit = (event) => {
  event.preventDefault(); // Estetään sivun uudelleenlataus lomakkeen lähetyksessä

  const utterThis = new SpeechSynthesisUtterance(inputTxt.value); // Luodaan uusi puhesynteesiobjekti syötetyn tekstin perusteella
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name"); // Haetaan valittu ääni valikosta
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i]; // Asetetaan ääni, jos se löytyy äänilistasta
    }
  }
  // Asetetaan äänen sävelkorkeus ja nopeus lomakkeen arvojen mukaisesti
  utterThis.pitch = Number(pitch.value);
  utterThis.rate = Number(rate.value);
  synth.speak(utterThis); // Käynnistetään puhesynteesi

  inputTxt.blur(); // Poistetaan fokus tekstikentästä
};
