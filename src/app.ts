const nasaRequested = () => {
    const url = 'https://api.nasa.gov/planetary/apod?api_key=' as string
    const apiKey = config.NASA_API_KEY as string
    const dateInput = document.querySelector<HTMLInputElement>('#datepicker')!
    const resetButtonEl = document.querySelector<HTMLButtonElement>('#reset-button')!
    const randomButtonEl = document.querySelector<HTMLButtonElement>('#random-day-generator')!
    const newDate = ('&date=' + dateInput?.value + '&') as string

    const fetchData = async () => {
        const apiResponse = await fetch(url + apiKey + newDate)
        if (apiResponse.status === 200) {
            const data = await apiResponse.json()
            console.log('NASA Data:', data)
            displayData(data)
        } else alert('Nasa seems to be having an issue with their servers right now.')
    }

    // Display data object in Browser that is returned from API
    const displayData = (data) => {
        const date = document.querySelector<HTMLParagraphElement>('#date')!
        const title = document.querySelector<HTMLHeadingElement>('#title')!
        const copyright = document.querySelector<HTMLElement>('#copyright')!
        const information = document.querySelector<HTMLParagraphElement>('#description')!
        const currentDate = new Date().toISOString().slice(0, 10) as string
        const mediaSection = document.querySelector<HTMLParagraphElement>('#media-section')!
        const imageSection = `<a id="hdimg" href="" target="_blank" rel="noopener">
                                <div class="image-div"> 
                                    <img id="image_of_the_day" src="" alt="image-by-nasa"> 
                                </div>
                              </a>`
        const videoSection = `<div class="video-div"> 
                                <iframe id="videoLink" src="" frameborder="0"></iframe>
                              </div>`

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
            document.getElementById('videoLink')!.src = data.url
        } else {
            mediaSection.innerHTML = imageSection
            document.querySelector<HTMLAnchorElement>('#hdimg')!.href = data.hdurl
            document.querySelector<HTMLImageElement>('#image_of_the_day')!.src = data.url
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
            const apiResponse = await fetch(url + apiKey + randomRolledDate)
            if (apiResponse.status === 200) {
                const data = await apiResponse.json()
                console.log('NASA Data:', data)
                displayData(data)
            } else alert('Nasa seems to be having an issue with their servers right now.')
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
