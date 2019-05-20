

// function to GET all the scraped jobs
function getJobs(location) {

    console.log("Inside getJobs()");

    $.ajax({
            url: `/api/scrape/${location}`,
            method: 'GET',
        })
        .then(printScrapedJobs)
        .catch(err => {
            console.log(err);
        });
}


// function to print scraped jobs to page
function printScrapedJobs(jobData) {

    console.log("Inside printScrapedJobs()");

    //Empty the body
    $('#scrapedJobFeed').empty();

    //Print each job one by one
    jobData.forEach(
        (jobInfo) => {

            // console.log(jobInfo);

            let optionalDataString = "";

            if (jobInfo.company)
                optionalDataString += jobInfo.company;

            if (jobInfo.location)
                optionalDataString += " | " + jobInfo.location;

            if (jobInfo.salary)
                optionalDataString += " | " + jobInfo.salary;

            if (jobInfo.posted)
                optionalDataString += " | " + jobInfo.posted;


            // create a list item using jQuery
            let $li = $("<li>");
            $li
                .data(jobInfo)
                .addClass("list-group-item list-group-item-action flex-column align-items-start")
                .addClass("border border-info border-top-1");

            $divTitle = $("<div>");
            $divTitle
                .addClass("d-flex w-100 justify-content-between")
                .appendTo($li);
            $("<h4>")
                .addClass("mb-1")
                .text(jobInfo.jobTitle)
                .appendTo($divTitle);

            $("<button>")
                .attr("type", "button")
                .addClass("btn")
                .html(`📌`)
                .attr("data-toggle", "tooltip")
                .attr("data-placement", "top")
                .attr("title", "Save Job")
                .attr("id", "save-job")
                .appendTo($divTitle);


            $div2 = $("<div>");
            $div2
                .addClass("d-flex w-100 justify-content-between text-info")
                .appendTo($li);
            $("<small>")
                .append(optionalDataString)
                .appendTo($div2);


            $subdiv = $("<div>");
            $subdiv
                .addClass("d-flex w-100 justify-content-between")
                .appendTo($li);
            $("<p>")
                .text(jobInfo.description)
                .appendTo($subdiv);

            $('#scrapedJobFeed').append($li);

        });
}

// function to print user saved jobs to page
function printUserSavedJobs(jobData) {

    console.log("Inside printUserSavedJobs()");

    //Empty the body
    $('#mySavedJobFeed').empty();

    //Print each job one by one
    jobData.forEach(
        (jobInfo) => {

            // console.log(jobInfo);

            let optionalDataString = "";

            if (jobInfo.company)
                optionalDataString += jobInfo.company;

            if (jobInfo.location)
                optionalDataString += " | " + jobInfo.location;

            if (jobInfo.salary)
                optionalDataString += " | " + jobInfo.salary;

            if (jobInfo.posted)
                optionalDataString += " | " + jobInfo.posted;


            // create a list item using jQuery
            let $li = $("<li>");
            $li
                .data(jobInfo)
                .addClass("list-group-item list-group-item-action flex-column align-items-start")
                .addClass("border border-info border-top-1");

            $divTitle = $("<div>");
            $divTitle
                .addClass("d-flex w-100 justify-content-between")
                .appendTo($li);
            $("<h4>")
                .addClass("mb-1")
                .text(jobInfo.jobTitle)
                .appendTo($divTitle);

            $("<button>")
                .attr("type", "button")
                .addClass("btn")
                .html(`<i class="fas fa-trash-alt"></i>`)
                .attr("data-toggle", "tooltip")
                .attr("data-placement", "top")
                .attr("title", "Remove Job")
                .attr("id", "remove-job")
                .appendTo($divTitle);


            $div2 = $("<div>");
            $div2
                .addClass("d-flex w-100 justify-content-between text-info")
                .appendTo($li);
            $("<small>")
                .append(optionalDataString)
                .appendTo($div2);


            $subdiv = $("<div>");
            $subdiv
                .addClass("d-flex w-100 justify-content-between")
                .appendTo($li);
            $("<p>")
                .text(jobInfo.description)
                .appendTo($subdiv);

            $('#mySavedJobFeed').append($li);

        });
}

//Function that saves jobs in Database
//this is triggered when user clicks on 'save-job' pin button
function saveJobInDB() {

    console.log("Inside saveJobInDB()");

    // get information from <li> that this button lives in (the parent)
    const jobData = $(this).parent().parent().data();

    // get access token from localStorage
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return swal({
            title: 'You need to be logged in to do this!',
            icon: 'error'
        });
    }

    // console.log(jobData);

    // if there's token, make a Post request to create a new bookmark for the user
    $.ajax({
            url: '/api/jobs',
            method: 'POST',
            data: jobData,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(function (response) {
            console.log(response);

            //Refresh saved jobs tab
            getSavedJobsFromDB();

            if(response.success === true) {
                return swal({
                    title: response.message,
                    icon: 'success'
                });
            }
        })
        .catch(function (err) {
            console.log(err);
            handleError(err.responseJSON);
        });
}



function deleteJobFromDB() {

    console.log("Inside deleteJobFromDB()");

    const jobData = $(this).parent().parent().data();

    console.log("----------");
    console.log(jobData._id);
    console.log("----------");

     // retrieve token
     const token = localStorage.getItem('accessToken');

     if (!token) {
         return swal({
             title: 'You have to be logged in!',
             icon: 'error'
         });
     }

     $.ajax({
        url: '/api/jobs',
        method: 'DELETE',
        data: {
            jobId: jobData._id
        },
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    .then(function (response) {

        console.log(response);

        //Refresh saved jobs tab
        getSavedJobsFromDB();

        if(response.success === true) {
            return swal({
                title: response.message,
                icon: 'success'
            });
        }

    })
    .catch(err => {
        console.log(err);
        handleError(err.responseJSON);
    });

}



function getSavedJobsFromDB() {

    console.log("Inside getSavedJobsFromDB()");

    // retrieve token
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return swal({
            title: 'You have to be logged in!',
            icon: 'error'
        });
    }

    $.ajax({
            url: '/api/jobs',
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        //.then(function (jobsIds) {
        .then(function (jobsData) {

            console.log(jobsData);
            printUserSavedJobs(jobsData);

        })
        .catch(err => {
            console.log(err);
            handleError(err.responseJSON);
        });
}



//Show the tag which will show the saved jobs tag
function showSavedJobsTagAtLogin() {
    console.log("Inside showSavedJobsTagAtLogin()");
    $("#mySavedJobsTabId").show();

    //Now populate all the jobs saved by the user in his account
    getSavedJobsFromDB();
}

//Hide the tag which will hide the saved jobs tag
function hideSavedJobsTagAtLogin() {
    console.log("Inside hideSavedJobsTagAtLogin()");
    $("#mySavedJobsTabId").hide();
}







$(document).ready(function () {

    console.log("Inside document.ready of show-jobs.js");

    //Hide the tag which will hide the saved jobs tag
    hideSavedJobsTagAtLogin();

    //Get all jobs function is called by default with defalt location of "New York, NY"
    getJobs("New York, NY");

    $('#scrapedJobFeed').on('click', '#save-job', saveJobInDB);

    $('#mySavedJobFeed').on('click', "#remove-job", deleteJobFromDB);

});

//Initiate tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
