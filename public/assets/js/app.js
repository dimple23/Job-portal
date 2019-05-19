
//show navbar by scrol up

$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    if (!$('.navbar').hasClass('fixed')) {
      $('.navbar').stop().addClass('fixed').css('top', '-50px').animate({
        'top': '0px'
      }, 500);
    }
  } else {
    $('.navbar').removeClass('fixed');
  }
});



/*****************************************************************************************
 * Function: signUp(event)
 * This function is triggerend when new user tries to register him/herself to the app
 * It stores user info to the DB and creates token
 *****************************************************************************************/

function signUp(event) {

  console.log("Inside signUp(event)");

  event.preventDefault();

  //Get user input in an object
  const userData = {
    firstName: $('#first-name-input')
      .val()
      .trim(),
    lastName: $('#last-name-input')
      .val()
      .trim(),
    email: $('#email-input')
      .val()
      .trim(),
    password: $('#password-input')
      .val()
      .trim()
  };

  //If even a single input is issing then through an error
  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    return swal({
      title: "All data is mandatory to be filled!",
      icon: 'error'
    });
  }

  //AJAX POST request to add data of user into the database
  $.ajax({
      url: '/api/user/register',
      method: 'POST',
      data: userData
    })
    .then(function (userData) {
      console.log(userData);

     
      return swal({
        title: userData.message,
        icon: 'success'
      });

      console.log(userData);
    })
    .then(function () {
      // custom bootstrap method
      // $('#signup').tab('hide'); //It's giving error
      $('#signup').hide();
      $('#login').tab('show');
      //$('.loginRegisterFormClass').hide();

      //Set user name field to the current user
      // $('#userName-labelId').text(`${userData.firstName} ${userData.lastName}`);
      // $("#userProfileId").show();
      // $('#user-info').show();
      // $('#full-name').text(userData.fullName);

    })
    .catch(err => {
      console.log(err);
      return swal({
        title: err.responseJSON.message,
        icon: 'error'
      });
    });

} //End of signUp(event)


/*****************************************************************************************
 * Function: login(event)
 * This function is triggerend when already registered user tries to login to the app
 * It verifies user info from the DB and fetches user data
 *****************************************************************************************/

function login(event) {

  console.log("Inside login(event)");

  event.preventDefault();

  const userData = {
    email: $('#email-input-login')
      .val()
      .trim(),
    password: $('#password-input-login')
      .val()
      .trim()
  };

  if (!userData.email || !userData.password) {
    return swal({
      title: "You're missing something!",
      icon: 'error'
    });
  }

  $.ajax({
      url: '/api/user/login',
      method: 'POST',
      data: userData
    })
    .then(function (accessToken) {
      // console.log(accessToken);
      localStorage.setItem('accessToken', accessToken);

      getUserProfile();

      //Show the tag which will show the saved jobs tag
      showSavedJobsTagAtLogin();
    })
    .catch(err => {
      console.log(err);
      return swal({
        title: err.responseJSON.error,
        icon: 'error'
      });
    });
}


/*****************************************************************************************
 * Function: logout()
 * This function is triggerend when user wants to logout of the app
 * Here the respective bearer token of the user will be deleted
 *****************************************************************************************/

function logout() {

  console.log("Inside logout()");

  localStorage.removeItem('accessToken');

  $('#email-input-login').text("");
  $('#password-input-login').text("");

  $('#user-info').hide();
  $("#userProfileId").hide();

  $('#user-tabs, #forms, #right-column-title').show();
  $('#login').tab('show');

  //Hide the tag which will hide the saved jobs tag
  // savedJobsTag.hideSavedJobsTagAtLogin();
  hideSavedJobsTagAtLogin();

}

/*****************************************************************************************
 * Function: getUserProfile()
 * This function reads the respective bearer token from local storage to validate the user
 *****************************************************************************************/

function getUserProfile() {

  console.log("Inside getUserProfile()");

  const token = localStorage.getItem('accessToken');

  $.ajax({
      url: '/api/user',
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(function (userData) {
      console.log(userData);
      $('#user-tabs, #forms, #right-column-title').hide();
      $('#user-info').show();
      $('#full-name').text(userData.fullName);
      $("#userProfileId").show();


      
    })
    .catch(err => {
      console.log(err);
      handleError(err.responseJSON);
    });
}


/*****************************************************************************************
 * Function: viewUserProfilePage()
 * This function is triggered when user wants to view/update his/her profile
 *****************************************************************************************/

// function viewUserProfilePage() {

//   window.open("assets/html/user-profile.html", "_blank");
//   // window.open("assets/html/user-profile.html", "_self");
// }


/*****************************************************************************************
 * Function: preferredLocation()
 * This function will store the user's preferred job location in the database
 *****************************************************************************************/

function preferredLocation() {

  console.log("Inside preferredLocation()");

  event.preventDefault();

  const userData = {
    preferredLocation: $("#inputLocationVal")
      .val()
      .trim()
  };

  if(!userData.preferredLocation) {
    return;
  }
  console.log("preferredLocation = " + userData.preferredLocation);

  //Get all jobs based on this new location
  getJobs(userData.preferredLocation);

}


/*****************************************************************************************
 * Function: formUserProfileUpdated()
 * This function will 
 *****************************************************************************************/

function formUserProfileUpdated() {

  console.log("Inside formUserProfileUpdated()");

  event.preventDefault();

  const userData = {
    firstName: $('#firstName-input').val().trim(),
    password: $('#password-input-login').val().trim()
  };

}


function handleError(errorData) {
  swal({
    title: 'Please login',
    text: errorData.message,
    icon: 'warning'
  }).then(() => {
    $('#user-info').hide();
    $("#userProfileId").hide();
    $('#user-tabs, #forms, #right-column-title').show();
    $('#login').tab('show');
  });
}





$(document).ready(function () {

  console.log("Inside document.ready of app.js");

  //Load joblisting page
  $("#jobfeedId").load("assets/html/job-listing.html");

  //Hide logout button before login/register
  $('#user-info').hide();

  //Hide link to user profile
  $("#userProfileId").hide();

  $('#signup-form').on('submit', signUp);

  $('#login-form').on('submit', login);

  $('#logout').on('click', logout);

  // $('#userProfileId').on('click', viewUserProfilePage);

  $('#inputLocationId').on('click', preferredLocation);

  $('#form-user-profile').on('submit', formUserProfileUpdated);

  

  localStorage.removeItem('accessToken');

});