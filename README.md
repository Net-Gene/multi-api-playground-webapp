# Multi Api Playground Webapp

This project is a browser-based web application built with TypeScript that integrates multiple third-party APIs to demonstrate real-world API usage, data handling, geolocation, and browser capabilities.

## 🧠 Purpose

This app was created as part of a **web development course** assignment. The goal was to practice integrating and working with various APIs and browser features while reinforcing core topics from the course such as:

- API usage and rate limits
- Client-side scripting with TypeScript
- Secure handling of API data
- Frontend interaction and user input
- Web accessibility through speech and location features

## 🌐 Features

- 🔍 **Geolocation Detection**  
  Detects whether the user's device supports and allows location services.

- ☁️ **Weatherstack Integration**  
  Displays current weather information based on the user's location using the Weatherstack API.

- 🎤 **Speech Synthesis**  
  Uses the browser's Speech Synthesis API to populate available voices (for future use).

- 🌍 **Google Translate**  
  Translates user-inputted text from one language to another.

- 🎵 **Deezer Music API**  
  Connects to the Deezer API to retrieve music-related data.

## 🛠️ Tech Stack

- **TypeScript**
- **HTML/CSS**
- **Browser-native APIs**
- **3rd-party REST APIs**

## 📦 APIs Used

- [Weatherstack](https://weatherstack.com/)
- [Google Translate API (Unofficial Wrapper)](https://cloud.google.com/translate)
- [Deezer API](https://developers.deezer.com/api)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Speech Synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

## 🚧 Notes

- Weatherstack API has a limited number of free requests (~200/month).
- If a request fails, check the browser console for errors (e.g., rate limits, invalid API keys).
- This project is intended for **learning purposes only**.
