export function getRandomFacts(animalType: string, amount: number) {
    const url = `https://api.example.com/facts/random?animal_type=${animalType}&amount=${amount}`;  // Replace 'api.example.com' with the actual API URL

    fetch(url, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(facts => {
        console.log(facts); // Log the fetched facts

        // You can display the facts on a webpage by updating the innerHTML of an element
        const factsContainer = document.querySelector('#factsContainer');
        if (factsContainer) {
            factsContainer.innerHTML = facts.map((fact: { text: any; }) => `<p>${fact.text}</p>`).join('');
        }
    })
    .catch(error => {
        console.error('Error fetching facts:', error);
    });
}
