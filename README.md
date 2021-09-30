
# Technical Documentation of Mata SMA
this documentation will guide you to install Mata SMA from scratch until this application can run smoothly in you local computer  

## Prerequisites
1. PostgresSQL driver for your operating system (Windows/Mac/Linux)
2. PHP version 7.1 or above ([How to download and install](https://www.php.net/downloads))
3. NodeJS version 14 or above ([How to install](https://nodejs.org/dist/v14.18.0/node-v14.18.0.pkg))
4. NPM version 6 or above ([How to install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/))
5. Composer version 2 or above ([How to Install](https://getcomposer.org/download/))

## Backend Installation
1. Open terminal (or command prompt) in your computer
2. From root directory of this repository, go to `mata_backend` directory using this command `cd ./mata_backend`
3. Install dependencies of the app by running this command `composer install`
4. Wait until the process finishes
5. To run the app, run this command `php artisan serve`
6. Make sure there is text displaying `Laravel development server started: <http://127.0.0.1:8000>` in your terminal to indicate that the app runs successfully
7. Open `http://127.0.0.1:8000` or `http://localhost:8000` in your favorite web browser. If the page loads successfully, then, congratulations, you have successfully started the backend app :)

## Frontend Installation
1. Open terminal (or command prompt) in your computer
2. From root directory of this repository, go to `mata_frontend` directory using this command `cd ./mata_frontend`
3. Run this command for installing the libraries needed by the application `npm install`
4. Wait until the process finishes
5. Open file `app.js` located in `./src/js` using your favorite text editor (Visual Studio Code, Notepad++, or anything)
6. Find the text `localStorage.setItem('api_base','http://118.98.166.82:8883');`, then change `'http://118.98.166.82:8883'` with `'http://localhost:8000'` to redirect API request to localhost. To redirect it back to production, then change it back to original value (It will be better if you keep the original value somewhere safe to make sure you don't lose it). Save file to keep the modification.
7. To start the application, run this command: `npm run dev`
8. To make sure the application runs successfully, open ` http://localhost:8080/` in you favorite web browser
9. If the display in your web browser shows the homepage of the application , then, congratulations, you have successfully started the frontend app :)

## Backend System Architecture

`In progress`

## Frontend System Architecture
 
`In progress`

