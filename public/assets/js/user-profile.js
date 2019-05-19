// WHEN PAGE LOADS
// get access token out of local storage and use it to GET user profile information
function getUserProfile() {

  console.log("Inside getUserProfile() -> user-profile.js");

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
      // ie $("name-input").val(userData.name);


      $('#firstName-input').val(userData.firstName);

      $('#lastName-input').val(userData.lastName);

      $('#emailId-input').val(userData.email);

      $('#password-input').val(userData.password);

      $('#location-input').val(userData.userLocation);

      $('#prefLocation-input').val(userData.preferredLocation);

      $('#phoneNo-input').val(userData.contact);

      $('#resume-input').val(userData.resume);
      $('#coverLetter-input').val(userData.coverLetter);




    })
    .catch(function (err) {
      console.log(err);
    });

}

function updateProfile(event) {
  
  console.log("Inside updateProfile() -> user-profile.js");

  event.preventDefault();

  const token = localStorage.getItem("accessToken");


  //user input in an object
  const userData = {
    contact: $("#phoneNo-input").val().trim(),

    userLocation: $("#location-input").val().trim(),
    preferredLocation: $("#prefLocation-input").val().trim(),
    resume: $("#resume-input").val().trim(),
    coverLetter: $("#coverLetter-input").val().trim()
  };

  console.log(userData)
  $.ajax({
      url: "/api/user/update",
      method: "PUT",
      data: userData,
      headers: {
        authorization: `Bearer ${token}`
      }

    }).then(function (userData) {
      // console.log(userData);

      // use data in userData to write into form input fields
      // ie $("name-input").val(userData.name);


      return swal({
          title: userData.message,
          icon: 'success'
        })
        .then(function () {
          $("#phoneNo-input").val(userData.phoneNo);

          $("#location-input").val(userData.location);

          $("#prefLocation-input").val(userData.prefLocation);

          $("#resume-input").val(userData.resume);

          $("#coverLetter-input").val(userData.coverLetter);

        })

    })
    .catch(function (err) {
      console.log(err);
    })
}

// $(window).load(function() {
//   console.log("Inside window.load of user-profile.js");
// });

$(document).ready(function () {

  console.log("Inside document.ready of user-profile.js");
  $('#form-user-profile').on('submit', updateProfile);

  getUserProfile();
  updateProfile();
});

