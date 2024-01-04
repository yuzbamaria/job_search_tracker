# Job Search Tracker App 

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Motivation](#motivation)
4. [Technologies](#technologies)
5. [Collaboration](#collaboration )
5. [Resources](#resources)
7. [License](#license)

## Description

As we reached week 9, we had the opportunity to work collaborately and develop a solution for a real-world problem by integrating data received from multiple server-side API requests.

Considering that this was our first project as a team, we started from scratch and utilized canvas to create the wireframe of the application.

In order to facilitate effective collaboration, we utilized Trello as a tool to harness agile development methodologies. This allowed us to successfully implement various features and resolve any bugs through the use of a systematic git branch workflow and pull request system.

So what we came up with is the app that organizes job search by allowing a user to note key details like job title, company name, and location (city). 
The app also provides a map view of company locations and keeps you motivated with inspirational quotes, lets you filter job cards by type (remote, hybrid, office) and stage (applied, interview, rejected).

## Features:
- Provides inspirational quotes when user adds key information about opportunities.
- Visualizes all your opportunities on a map at the same time to see the general picture.
- Filters job cards by type (remote, hybrid, office) and stage (applied, interview, rejected).

## Future Enhancements:

- Add statistics on:
  - how many applications got the job stage status: rejected, interview, applied; 
  - how many applications were added per month; 
  
- Fix the small issue with the map rendering on initial load on big resolution screens as it loads there a bit slow and sometimes after the page is refreshed.
  
- Add an input for interview dates and Integrate calendar API to access dates for interviews.

- Add a functionality to be able to edit each card that is already created. 


## Motivation:
- As we approach the completion of the bootcamp and prepare to embark on our job search, as a team we found this idea particularly resonant and meaningful on a personal level.

## User story:
- AS the job seeker 

- I WANT to be able to log in the key data of each job posting I apply to 

- SO THAT to filter this data later and see how the progress goes and if I need to change my approach based on this statistics from the app.

## Technologies:

- API: Google map API, API Ninjas (https://api-ninjas.com/api) 
- Git/Github: Repo and version management.
- Bootstrap: For most of the CSS styling.
- NPM Packages: FontAwesome, bootstrap-icons.

## Collaboration 

**Challenges and Successes**

**Rupesh**

Challenges:
- To find an API for inspiring quotes.
- To retrieve a fresh quote every minute to provide motivation for the user.
- To save the user's input value in the local storage so that my team member can use that input value in her page.

Successes:
- With the assistance of the TA (Steve), I was able to locate the API for retrieving the quotes.
- I utilized the setInterval function to automatically refresh the quote every minute.
- I utilized object and array data structures to proficiently store the user input in a manner that consistently retains the information whenever the form is submitted.

**Maria**

Challenges:
- I was a bit challenging to work with map API to display all the markers on the map at the same time. 
- An issue with the page load as map itself is a bit heavy and it took me some time to find out how to improve it on the initial page load.

Successes:
- Overcoming the challenge of efficiently integrating map API functionality to display multiple markers simultaneously. I devised a solution by implementing a function to place individual markers, creating an array to aggregate them, and then successfully rendering all markers on the map.
- Addressing the issue of slow page load caused by the map's weighty nature. Through persistent effort and research, I successfully optimized the initial page load time, enhancing the overall performance.
- Accomplishing the integration of Bootstrap styling seamlessly, further enhancing the visual appeal and user experience of the project.

**Breakdown of tasks and roles**

**Rupesh:** 

Homepage:
- Implemented code that retrieves data from API Ninjas (https://api-ninjas.com/api) in order to showcase motivational quotes to the user.
- The user input will be stored in the local storage. However, if any of the input fields are left empty and the submit button is clicked, a modal will prompt the user to complete all the fields. If the user successfully submits the form, another modal will appear to inform the user that it has been successfully submitted.
- The clear button is designed to reset all input fields in case the user wishes to change their selections and start anew with the form.
- Linked this page with the dashboard page.

**Maria:**

Start page: 
- Made the page and linked it with the input page and dashboard.

Dashboard page: 
- Created code that fetches data from Google map API to display all companies locations. Then, when a user clicks a button “Show companies on map”, they will be able to see all the markers at the same time. 
created cards with job opportunities that get data from local storage and are rendered dynamically. Cards can be deleted. Also, cards contain a link “See job posting” which directs a user to the original job position they applied to.
- Added filters to filter cards by job stage and job type. 
- Linked this page with the Start page (by clicking Logo) and with Input page (by clicking “Create more cards”).



## Resources

**1. A link to the deployed application: https://yuzbamaria.github.io/job_search_tracker/**

**2. GitHub Repo: https://github.com/yuzbamaria/job_search_tracker**


## Installation
N/A

## Usage
