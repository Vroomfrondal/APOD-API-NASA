// Created By: Christopher DeLeon
// Date: November 30th, 2021

function nasaRequested() {
    const url = "https://api.nasa.gov/planetary/apod?api_key="
    const apiKey = config.NASA_API_KEY
    const title = document.querySelector("#title")
    const copyright = document.querySelector("#copyright")
    const mediaSection = document.querySelector("#media-section")
    const information = document.querySelector("#description")
    let currentDate = new Date().toISOString().slice(0, 10)

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
            copyright.innerHTML = "N/A"
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

    // change fetchData() to fetch API object with random date when HTML button is pressed (instead of todays date)
    document.querySelector("#random-day-generator").addEventListener("click", () => {
        function fetchData() {
            //utility function to generate a random date after 2010 (before 2010 causes bugs)
            function randomDate(start, end) {
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
            }
            let randomRolledDate = randomDate(new Date(2010, 0, 1), new Date())
            randomRolledDate = "&date=" + randomRolledDate.toISOString().slice(0, 10) + "&"

            try {
                //new API response
                fetch(url + apiKey + randomRolledDate)
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(`Fetching random day... ${json.date}`)
                        console.log("NASA Data:", json)
                        displayData(json)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    })

    // Call current day on reset-button click
    document.getElementById("reset-button").addEventListener("click", () => {
        console.log("Fetching today...")
        fetchData()
    })
}

// Check if calendar day has been inputted and update if so
const dateInput = document.querySelector("#datepicker")
dateInput.addEventListener("change", (e) => {
    e.preventDefault()
    nasaRequested()
})

nasaRequested()
