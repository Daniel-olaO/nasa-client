# Nasa Astronomical Picture of the Day Texting Service(client)

This is a react app that allows users to sign up for a daily text message of the NASA Astronomy Picture of the Day.

## Table of Contents

- [Motivation](#motivation)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [API](#api)
- [Tools](#tools)
- [Author](#author)
- [references](#references)

# Motivation

I created this app to share my love of space and astronomy with others. I also wanted to create a fun and easy way to learn about the universe.

# Installation

use npm install to install all dependencies

```bash
npm install
```

# Usage

add a .env file to the root directory and add the following:

```bash
REACT_APP_API_BASE_URL=your_nasa_apod_api_url
```

use npm start to start the app

```bash
npm start
```

users must sign up with a name, a phone number, an email address and a password. The phone number must have the country code of the country in which the phone number originated: Canada -> +16574832074. The email address must be valid. The user will receive a welcome text message. The user will also receive a text message every day with the NASA Astronomy Picture of the Day.

# Demo

link: https://nasa-client-production.up.railway.app/

# API

This uses the Nasa-APOD API to get the daily picture and description.

- API Repository: https://github.com/Daniel-olaO/nasa-APOD
- API URL: https://nasa-apod-production.up.railway.app/api

# Tools

This app was created using React, ESlint, material-UI, react-router-dom

# Author

Nasa-APOD Texting Service was created by:

### Daniel Adedeji

- [Github](https://github.com/Daniel-olaO)
- [LinkedIn](https://www.linkedin.com/in/daniel-adedeji-1a996220a/)

with the mentorship of:

### Russell Pollari

- [Github](https://github.com/Russell-Pollari)
- CEO of [SharpestMinds](https://www.sharpestminds.com/)
- [LinkedIn](https://www.linkedin.com/in/russell-pollari/)

# references

- [Material-UI](https://material-ui.com/)
- [Daniel-olaO/student-app](https://github.com/Daniel-olaO/student-app)
