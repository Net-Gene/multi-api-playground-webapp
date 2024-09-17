export function geoFindMe() {
  const status = document.querySelector("#status")!;
  const mapLink = document.querySelector("#map-link") as HTMLAnchorElement;
  
  // Alustetaan karttalinkin href ja tekstisisältö tyhjiksi
  mapLink.href = "";
  mapLink.textContent = "";
  
  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Päivitetään tilan tekstisisältö ja karttalinkki onnistuneen sijainnin haun jälkeen
    status.textContent = "Sijaintisi on löydetty!";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Leveysaste: ${latitude} °, Pituusaste: ${longitude} °`;
  }
  
  function error() {
    // Näytetään virheilmoitus, jos sijaintia ei voi hakea
    status.textContent = "Sijainnin hakeminen epäonnistui";
  }
  
  if (!navigator.geolocation) {
    // Näytetään virheilmoitus, jos geolocation ei ole tuettu
    status.textContent = "Selaimesi ei tue sijaintipalveluja";
  } else {
    // Näytetään viesti sijainnin etsimisestä ja käynnistetään sijainnin haku
    status.textContent = "Etsitään sijaintiasi…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// Lisätään kuuntelija "find-me" nappulalle, joka kutsuu geoFindMe-funktiota
document.querySelector("#find-me")!.addEventListener("click", geoFindMe);
