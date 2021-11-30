// Created By: Christopher DeLeon
// Date: November 29, 2021

const url = 'https://api.nasa.gov/planetary/apod?api_key='
const api_key = config.NASA_API_KEY

const fetchNasaData = async () => {
    try {
        const response = await fetch(`${url}${api_key}`)
        const data = await response.json()
        console.log('NASA APOD API data', data)
    } catch (error) {
        console.log(error)
    }
}