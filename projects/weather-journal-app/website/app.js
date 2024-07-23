// Define a named callback function for handling the click event
function handleGenerateClick() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (zipCode && feelings) {
        // Your existing logic for fetching weather data and updating the UI
        fetchWeatherData(zipCode, feelings);
    } else {
        alert('Please enter a ZIP code and your feelings.');
    }
}

// Function to update the UI
function updateUI(data) {
    document.getElementById('date').textContent = `Date: ${data.date}`;
    document.getElementById('temp').textContent = `Temperature: ${data.temperature} °C`;
    document.getElementById('content').textContent = `Feeling: ${data.userResponse}`;
}

// Function to fetch weather data and handle the POST request
async function fetchWeatherData(zipCode, feelings) {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '0ee02ec5cc293b25f74dee40d12e2d51'; // Your API key

    try {
        // Fetch weather data
        const weatherResponse = await fetch(`${baseUrl}?zip=${zipCode}&appid=${apiKey}&units=metric`);
        if (!weatherResponse.ok) {
            throw new Error(`HTTP error! Status: ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();

        // POST data to server
        const postData = {
            temperature: weatherData.main.temp,
            date: new Date().toLocaleDateString(),
            userResponse: feelings
        };

        const postResponse = await fetch('http://localhost:3001/addData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!postResponse.ok) {
            throw new Error(`HTTP error! Status: ${postResponse.status}`);
        }

         await retrieveData();  
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('entryHolder').textContent = `Error fetching weather data: ${error.message}`;
    }
}

 const retrieveData = async () => {
    try {
         const request = await fetch('/all');
        
        if (!request.ok) {
            throw new Error(`HTTP error! Status: ${request.status}`);
        }
        
         const allData = await request.json();
        console.log(allData);

         document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' °C';
        document.getElementById('content').innerHTML = allData.userResponse;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.error('Error:', error);
         document.getElementById('entryHolder').innerHTML = 'Error fetching data';
    }
};

 document.getElementById('generate').addEventListener('click', handleGenerateClick);
