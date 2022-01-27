# APOD-API-NASA

[![Netlify Status](https://api.netlify.com/api/v1/badges/434fa586-d65c-42e1-bf98-f988a3f6c29a/deploy-status)](https://app.netlify.com/sites/apod-api-application/deploys)

A web-based application to display a picture of the day provided by NASA's APOD open API. Or you can choose a date from the past. The App works for both images and videos.

**Technologies Used:**

-   Nasa APOD open API which can be found at https://api.nasa.gov/
-   HTML 5
-   CSS
-   Vanilla Javascript
-   Github

**Key Takeaways**

-   Better understanding of HTML5 marking, CSS styling, & JavaScript programming.
-   Fetching from an Api and displaying that JS-object once fetched
-   DOM manipulation
-   Ignoring Private API keys in Github source code with config files
-   Ignoring Private API keys in Browser Inspect Elements with .env files
-   How to dynamically populate an HTML section element depending on an API's object response

**Sample Photo**
![Screenshot (58)](https://user-images.githubusercontent.com/49052244/151297835-3ce41659-aa3f-4ec8-9c5b-2ee0137ed3fe.png)

**References:**

-   https://sophiali.dev/javascript-fetch-api-with-nasa-api

**Dev Steps if Cloning:**

-   You will have to generate your [your own api key](https://api.nasa.gov/) via the NASA website (since my key isn't on github, your app won't work when pulling it)
-   Create a file called "config.js" located the scripts folder
-   Initialize a variable called NASA_API_KEY = "Paste your personal key"
-   Your pulled version should be functional
