// Created By: Christopher DeLeon
// Date: November 30th, 2021

const url = 'https://api.nasa.gov/planetary/apod?api_key='
const apiKey = config.NASA_API_KEY

//Fetch data: method 1
//function fetchData() {
//    try {
//        fetch(url+apiKey)
//        .then(response=>response.json())
//        .then(json=> {
//            console.log(json)
//        })
//    } catch(error) {
//        console.log(error)
//    }
//}
//fetchData()

// Fetch data: method 2
const fetchData = async () => {
    try {
        const response = await fetch(`${url}${apiKey}`)
        const data = await response.json()
        console.log('NASA APOD Data', data)
        displayData(data); // displays data from displayData
    } catch (error) {
        console.log(error)
    }
}

const displayData = data => {
    document.getElementById('title').textContent = data.title
    document.getElementById('date').textContent = data.date
    document.getElementById('picture').src = data.hdurl
    document.getElementById('description').textContent = data.explanation
}

fetchData()





























// Created By: Christopher DeLeon
// Date: November 29, 2021


// Global Variables
//const url = 'https://api.nasa.gov/planetary/apod?api_key='
//const api_key = config.NASA_API_KEY
//
////Request using fetch method, await response and parse JSON response into JavaScript Object
//const fetchNasaData = async () => {
//    try {
//        const response = await fetch(`${url}${api_key}`)
//        const data = await response.json()
//        console.log('NASA APOD data', data)
//        displayData(data);
//    } catch (error) {
//        console.log(error)
//    }
//};
//
//// Display data on our browser with function to update DOM
//const displayData = data => {
//    document.getElementById('title').textContent = data.title
//    document.getElementById('date').textContent = data.date
//    document.getElementById('picture').src = data.hdurl //data.hdurl
//    document.getElementById('explanation').textContent = data.explanation;
//}
//
//fetchNasaData()
//