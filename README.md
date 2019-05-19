# Inspire Your Success

## Description
Main goals of the project:  
* Get introduced to Full stack.
* Build a minimal Job Portal that uses external apis to get jobs and allow users to persist them for future reference.
* Giving for job seekers free access to search for jobs, post resumes, and research companies.

## Directory structure
All the recommended files and directories should look like the following structure:

.JOB-PORTAL
|
├── controllers
│   └── dice-scrape.js
│   |__ indeed-scrape.js
|   |__  jobs-controller.js
|   |__  scraping-controller.js
|   |__  user-controller.js
|      
|__ middleware
|   |__ authentication.js
|
├── models
│   ├── index.js
│   └── job.js
|   |__ user.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
|   |   |__ html
|   |   |   |__job-listing.html
|   |   |   |__ user-profile.html
|   |   |
│   │   ├── img
│   │   │   └── ...
│   │   └── js
│   │       └── app.js
|   |       |__show-jobs.js
|   |       |__user-profile.js
|   |   
│   └── index.html
│
├── routes
| |  |__api
| |    |__index.js
| |    |__ jobs-routes.js
| |    |__ scrape-routes.js
| |    |__ user-routes.js
| |
| |________ index.js
|
|______utils
|       |__promise-handler.js
|_______.env
|_______.eslintignore
|_______ .eslintrc.json
|
|_______ .gitignore
|_______ package-lock.json
|_______ package.json
│
├── server.js



### Features

* This application allows user to:  

- Search for Full Stack Web Developer jobs based on its location and description 
- Bookmark the job for future application  
- Set their priority for that job  
- Edit the priority of a bookmarked job  
- Provide information on how to apply for job 


## Technologies/Modules we used :
 
- HTML
- CSS
- Bootstrap
- JavaScript
- jQuery
- NodeJS
- MongoDB
- Mongoose
- Heroku

## APIs Used
- Indeed API
- Dice API

## Upcoming Improvements
- More mobile responsibly


## Authors
  
  *  Ankita [@ankitadhyani](https://github.com/ankitadhyani)

  * Dimple [@dimple23](https://github.com/dimple23) 
  
      
  *  Jamshed [@fjamik](https://github.com/fjamik)

