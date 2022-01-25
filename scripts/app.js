// Created By: Christopher DeLeon
// Date: November 30th, 2021

function nasaRequested() {
    const url = "https://api.nasa.gov/planetary/apod?api_key="
    const apiKey = config.NASA_API_KEY
    const title = document.querySelector("#title")
    const copyright = document.querySelector("#copyright")
    const mediaSection = document.querySelector("#media-section")
    const information = document.querySelector("#description")
    const currentDate = new Date().toISOString().slice(0, 10)

    const imageSection = `<a id="hdimg" href="" target="_blank" rel="noopener">
<div class="image-div"> 
<img id="image_of_the_day" src="" alt="image-by-nasa"> 
</div>
</a>`
    const videoSection = `<div class="video-div"> <iframe id="videoLink" src="" frameborder="0"></iframe></div>`

    let newDate = "&date=" + dateInput.value + "&"

    //Fetch data: method 1
    function fetchData() {
        try {
            fetch(url + apiKey + newDate)
                .then((response) => response.json())
                .then((json) => {
                    console.log("NASA Data:", json)
                    displayData(json)
                })
        } catch (error) {
            console.log(error)
        }
    }

    // Display data object in Browser that is returned from API
    function displayData(data) {
        title.innerHTML = data.title

        if (data.hasOwnProperty("copyright")) {
            copyright.innerHTML = data.copyright
        } else {
            copyright.innerHTML = ""
        }

        date.innerHTML = data.date
        dateInput.max = currentDate
        dateInput.min = "1995-06-16"

        if (data.media_type == "video") {
            mediaSection.innerHTML = videoSection
            document.getElementById("videoLink").src = data.url
        } else {
            mediaSection.innerHTML = imageSection
            document.getElementById("hdimg").href = data.hdurl
            document.getElementById("image_of_the_day").src = data.url
        }
        information.innerHTML = data.explanation
    }
    fetchData()
}

// Check if calendar day has been inputted and update if so
const dateInput = document.querySelector("#datepicker")
dateInput.addEventListener("change", (e) => {
    e.preventDefault()
    nasaRequested()
})

nasaRequested()
