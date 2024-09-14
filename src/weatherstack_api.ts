export async function getWeatherstackData() {
    const url = 'https://api.weatherstack.com/current?access_key=848d55228659be0e5cc4c7ec040aa707&query=Rovaniemi';
    const options = {
        method: 'GET'
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const {
            current: {
                humidity,
                feelslike,
                visibility,
                is_day,
                temperature,
            },
            location: { 
                name,
                localtime }
        } = data;

        // Palauta objekti vaadituilla tiedoilla
        return { name, humidity, feelslike, visibility, is_day, localtime, temperature };
    } catch (error) {
        console.error(error);
        return null;
    }
}
