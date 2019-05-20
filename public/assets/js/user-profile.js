// WHEN PAGE LOADS
// get access token out of local storage and use it to GET user profile information
function getProfile() {

  console.log("Inside getProfile() -> user-profile.js");

  const token = localStorage.getItem("accessToken");

  $.ajax({
      url: "/api/user",
      method: "get",
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(function (userData) {

      console.log(userData);

      // use data in userData to write into form input fields
      writeToUserProfilePage(userData);

    })
    .catch(function (err) {
      console.log(err);
    });

}

function writeToUserProfilePage(userData) {

  $('#firstName-input').val(userData.firstName);
  $('#lastName-input').val(userData.lastName);
  $('#phoneNo-input').val(userData.contact);

  $('#emailId-input').val(userData.email);
  $('#password-input')
    .val(userData.password)
    .prop('disabled', true);

  $('#location-input').val(userData.userLocation);
  $('#prefLocation-input').val(userData.preferredLocation);

  $("#inlineCheckbox1").attr('checked', userData.node);
  $("#inlineCheckbox2").attr('checked', userData.express);
  $("#inlineCheckbox3").attr('checked', userData.react);
  $("#inlineCheckbox4").attr('checked', userData.HTMLCSS);
  $("#inlineCheckbox5").attr('checked', userData.javascript);
  $("#inlineCheckbox6").attr('checked', userData.jQuery);
  $("#inlineCheckbox7").attr('checked', userData.AJAX);
  $("#inlineCheckbox8").attr('checked', userData.mySQL);
  $("#inlineCheckbox9").attr('checked', userData.sequelize);
  $("#inlineCheckbox10").attr('checked', userData.mongoDB);
  $("#inlineCheckbox11").attr('checked', userData.mongoose);
  $("#inlineCheckbox12").attr('checked', userData.java);
  $("#inlineCheckbox12").attr('checked', userData.OOPs);

  $('#resume-input').val(userData.resumeLink);
  $('#coverLetter-input').val(userData.coverLetterLink);

}



function updateProfile(event) {

  console.log("Inside updateProfile() -> user-profile.js");

  event.preventDefault();

  //user input in an object
  const userData = {

    firstName: $('#firstName-input').val().trim(),
    lastName: $('#lastName-input').val().trim(),
    contact: $("#phoneNo-input").val().trim(),

    password: $('#password-input').val().trim(),

    userLocation: $("#location-input").val().trim(),
    preferredLocation: $("#prefLocation-input").val().trim(),

    node: $("#inlineCheckbox1").is(':checked'),
    express: $("#inlineCheckbox2").is(':checked'),
    react: $("#inlineCheckbox3").is(':checked'),
    HTMLCSS: $("#inlineCheckbox4").is(':checked'),
    javascript: $("#inlineCheckbox5").is(':checked'),
    jQuery: $("#inlineCheckbox6").is(':checked'),
    AJAX: $("#inlineCheckbox7").is(':checked'),
    mySQL: $("#inlineCheckbox8").is(':checked'),
    sequelize: $("#inlineCheckbox9").is(':checked'),
    mongoDB: $("#inlineCheckbox10").is(':checked'),
    mongoose: $("#inlineCheckbox11").is(':checked'),
    java: $("#inlineCheckbox12").is(':checked'),
    OOPs: $("#inlineCheckbox13").is(':checked'),

    resumeLink: $("#resume-input").val().trim(),
    coverLetterLink: $("#coverLetter-input").val().trim(),

  };


  //If user wants to update password then only get the password value from the input
  // if($("#checkboxPwdUpd").is(':checked')){
  //   console.log("Password to be updated...");
  //   userData.password = $('#password-input').val().trim();
  // }


  console.log(userData);

  const token = localStorage.getItem("accessToken");

  $.ajax({
      url: "/api/user/update",
      method: "PUT",
      data: userData,
      headers: {
        authorization: `Bearer ${token}`
      }

    }).then(function (userData) {
      console.log("userdata after PUT completion...");
      console.log(userData);

      return swal({
          title: "User Profile Updated!",
          icon: 'success'
        })
        .then(function () {

          console.log("Writing new data to page...");
          // use data in userData to write into form input fields
          writeToUserProfilePage(userData);
        });
    })
    .catch(function (err) {
      console.log(err);
    })
}



function enablePasswordInputField() {

  console.log("Inside enablePasswordInputField()");

  if($("#checkboxPwdUpd").is(':checked')) {

    $('#password-input')
      .prop('disabled', false);

  } else {

    $('#password-input')
      .prop('disabled', true);
  }
}




$(document).ready(function () {

  console.log("Inside document.ready of user-profile.js");

  //Run get user profile functionality on load
  getProfile();

  $('#form-user-profile').on('submit', updateProfile);

  $("#checkboxPwdUpd").on('click', enablePasswordInputField);

});

