# CSC 317 Course Project

## Purpose

The purpose of this repository is to store all the code for your web application. This also includes the history of all commits made and who made them. Only code submitted on the master branch will be graded.

Please follow the instructions below and fill in the information requested when prompted.

## Student Information

|               | Information   |
|:-------------:|:-------------:|
| Student Name  | Naing Htet    |
| Student ID    | 921634165     |
| Student Email | nhtet1        |


# Build/Run Instructions

## Build Instructions
1.Clone or download the application

2.Open a terminal like powershell and "cd .../application", the "..." represent the name of the downloaded application

3.Afterward in the terminal start off by "npm run builddb" to create the database which host all the data of the application

4.Then create a file called '.env' in application folder to match the machine and database configuration. The ".env" file should include the required environment variables:
"DB_HOST" = DATABASE HOST
"DB_NAME" = DATABASE NAME
"DB_USER" = DATABASE USER
"DB_PASSWORD" = DATABASE PASSWORD
"PORT" = PORT NUMBER FOR THE APPLICATION

5.Install all required npm modules by running "npm install" or "npm i" in the terminal. This will install all the required dependencies for the application to work.

## Run Instructions
1.Afterward, "npm start" to start the server which host the application

2.Open browser and go the url "localhost:3000" and then you can use the application as desired.
