# Quality Life App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

## Description

Using [Teleport's APIs](https://developers.teleport.org/api/getting_started/) the application will retrive some information about a particular location typed in the search bar. In particular, the app will show a short description of the city and the general score of the city based on Teleport's users opinion. Moreover the user will be able to visualize the score for each category created by Teleport. 

At the start of the application, the user will be able to type the name of a city. If the city doesn't return any result, a message asking for another city will appear, on the contrary a list with the cities that match the query will be visible to the user. If clicked, each of these cities will lead to a details page.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
