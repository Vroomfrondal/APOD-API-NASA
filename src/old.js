const nasaRequested = () => {
    const url = 'https://api.nasa.gov/planetary/apod?api_key='
    const apiKey = config.NASA_API_KEY
    const title = document.querySelector('#title')
    const copyright = document.querySelector('#copyright')
    const mediaSection = document.querySelector('#media-section')
    const information = document.querySelector('#description')
    const dateInput = document.querySelector('#datepicker')
    const resetButtonEl = document.querySelector('#reset-button')
    const randomButtonEl = document.querySelector('#random-day-generator')
    const currentDate = new Date().toISOString().slice(0, 10)
    const newDate = '&date=' + dateInput.value + '&'
    const imageSection = `<a id="hdimg" href="" target="_blank" rel="noopener">
                            <div class="image-div"> 
                                <img id="image_of_the_day" src="" alt="image-by-nasa"> 
                            </div>
                          </a>`
    const videoSection = `<div class="video-div"> 
                            <iframe id="videoLink" src="" frameborder="0"></iframe>
                          </div>`

    const fetchData = async () => {
        try {
            const apiResponse = await fetch(url + apiKey + newDate)
            if (apiResponse.status === 200) {
                const data = await apiResponse.json()
                console.log('NASA Data:', data)
                displayData(data)
            } else alert('Nasa seems to be having an issue with their servers right now.')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    // Display data object in Browser that is returned from API
    const displayData = (data) => {
        // Title, Date, and media-description
        title.innerHTML = data.title
        date.innerHTML = data.date
        information.innerHTML = data.explanation

        // Ensure Calendar input only takes valid API days
        dateInput.max = currentDate
        dateInput.min = '1995-06-16'

        // Media author credits if API has them
        if (data.hasOwnProperty('copyright')) {
            copyright.innerHTML = data.copyright
        } else copyright.innerHTML = 'NASA'

        // Check to see if API returns pic or video
        if (data.media_type == 'video') {
            mediaSection.innerHTML = videoSection
            document.getElementById('videoLink').src = data.url
        } else {
            mediaSection.innerHTML = imageSection
            document.getElementById('hdimg').href = data.hdurl
            document.getElementById('image_of_the_day').src = data.url
        }
    }

    randomButtonEl.addEventListener('click', () => {
        const fetchData = async () => {
            // A random date after 2010 (before 2010 causes API errors)
            const randomDate = (start, end) => {
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
            }
            let randomRolledDate = randomDate(new Date(2010, 0, 1), new Date())

            randomRolledDate = '&date=' + randomRolledDate.toISOString().slice(0, 10) + '&'

            // fetch with a random date instead of today.
            try {
                const apiResponse = await fetch(url + apiKey + randomRolledDate)
                if (apiResponse.status === 200) {
                    const data = await apiResponse.json()
                    console.log('NASA Data:', data)
                    displayData(data)
                } else alert('Nasa seems to be having an issue with their servers right now.')
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }
        fetchData()
    })

    resetButtonEl.addEventListener('click', () => {
        console.log('Fetching today...')
        fetchData()
    })

    // Update if user enters specific calendar day
    dateInput.addEventListener('change', (e) => {
        e.preventDefault()
        nasaRequested()
    })

    fetchData()
}

nasaRequested()
