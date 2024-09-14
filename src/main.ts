import { populateVoiceList } from './speech_api'
import { geoFindMe } from './geolocation_api'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const layout = document.createElement("DIV") as HTMLDivElement

populateVoiceList()

geoFindMe()

layout.innerText = "Is Geolocation available? press here to find out"
layout.style.backgroundColor = "red"
layout.addEventListener("click", (event: MouseEvent)=>{

  if ("geolocation" in navigator) {
    layout.innerText = "geolocation is available" 
  } else {
    layout.innerText = "geolocation IS NOT available"
  }

})

app.append(layout)