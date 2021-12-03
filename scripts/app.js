// Created By: Christopher DeLeon
// Date: November 30th, 2021

const url = 'https://api.nasa.gov/planetary/apod?api_key='
const apiKey = config.NASA_API_KEY

//Fetch data: method 1
function fetchData() {
    try {
        fetch(url+apiKey)
        .then(response=>response.json())
        .then(json=> {
            console.log('NASA Data:', json)
        displayData(json)
        })
    } catch(error) {
        console.log(error)
    }
}
fetchData()

const title = document.querySelector("#title");
const copyright = document.querySelector("#copyright");
const mediaSection = document.querySelector("#media-section");
const information = document.querySelector("#description");

function displayData(data) {
    title.innerHTML = data.title

    if(data.hasOwnProperty("copyright")) {
        copyright.innerHTML = data.copyright;
    } else {
        copyright.innerHTML = ""
    }

    const imageSection = `<a id="hdimg" href="" target="_blank">
        <div class="image-div"> 
        <img id="image_of_the_day" src="" alt="image-by-nasa"> 
        </div>
        </a>`
    const videoSection = `<div class="video-div"> <iframe id="videoLink" src="" frameborder="0"></iframe></div>`


    if(data.media_type == "video") {
        mediaSection.innerhtml = videoSection;
        document.getElementById("videoLink").src = data.url
    } else {
        mediaSection.innerHTML = imageSection;
        document.getElementById("hdimg").href = data.hdurl
        document.getElementById("image_of_the_day").src = data.url
    }

    

    information.innerHTML = data.explanation

}




// Fetch data: method 2
//const fetchData = async () => {
//    try {
//        const response = await fetch(`${url}${apiKey}`)
//        const data = await response.json()
//        console.log('NASA APOD Data', data)
//        displayData(data); // displays data from displayData
//    } catch (error) {
//        console.log(error)
//    }
//}
//
//const displayData = data => {
//    document.getElementById('title').textContent = data.title
//    document.getElementById('date').textContent = data.date
//    document.getElementById('picture').src = data.hdurl
//    document.getElementById('description').textContent = data.explanation
//}
//
//fetchData()