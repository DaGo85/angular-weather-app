# Weather-APP

> A recreation of my Next.js(https://weather.davidgo.ch/) weather app, this time using Angular and SCSS. It displays various data about the current and upcoming weather.

Live demo: https://angular-weather.davidgo.ch/

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Contact](#contact)
- [License](#license)

## General Information

This project was created with the purpose of learning Angular, d3 and SCSS.

The intention was to rebuild my Next.js weather app to learn and see the difference between Next.js and Angular.

## Technologies Used

- Angular - version 14.2.0
- rxjs - version 7.5.0
- SCSS - version 1.55.0
- d3 - version 7.6.1
- TypeScript - version 4.7.2

## Features

- Styled page for weather data display
- Search function for cities
- Extensive informations for the current day
- Hourly temperature as a chart for the next 48 hours, which provides additional informations for every single hour as a tooltip
- A preview for the next 8 days

## Setup

For running it on your local environment first:

`npm install or yarn install`

You have to setup an .env with API_KEY=yourapikeyhere
You can get an API key for free at: https://openweathermap.org/api

To run development server:

`ng serve`

Open http://localhost:4200 with your browser to see the result.
For a full list of dependencies take a look at package.json.

## Usage

This app has a default city. Also you can search for another location at the navbar.

## Project Status

Project is: _complete_

This is the finished and working version of my Angular-Weather-APP.

## Room for Improvement

- Adding functionality for getting the visitors location
- Improving browser compatibility
- creating a backend for more security

## Contact

Created by [@DaGo85](https://www.github.com/DaGo85/) - feel free to contact me!

## License

Feel free to use this code for your own projects!
