/* Global Variables */
// Personal API Key for OpenWeatherMap API
const key = 'b283d9c44ce4206784f029b747ce7d8d'
const country = 'de'
const baseURL = 'http://localhost:3001/data';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getTemperature = async (data) => {
    const res = await fetch(`${weatherURL}?zip=${data.zip},${country}&appid=${key}&units=metric`)
    const weather = await res.json()
    return weather.main.temp
}

const getData = async () => {
    const res = await fetch(baseURL);
    return await res.json();
}

const postData = async (data) => {
    await fetch(baseURL, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(data), 
    });
}

const updateData = async() => {
    const { date, temp, feelings } = await getData()
    document.getElementById('date').innerHTML = `Date: ${date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${temp} °C`;
    document.getElementById('content').innerHTML = `Feelings: ${feelings}`;
}

const generate = async() => {
    const zip =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;
    try {
        const temp = await getTemperature({zip})
        await postData({date: newDate, feelings, temp});
        await updateData()
    } catch(error) {
        console.error(error)
    }
}

const btn = document.getElementById('generate');
btn.addEventListener('click', generate);