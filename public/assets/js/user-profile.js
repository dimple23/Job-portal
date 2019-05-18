// WHEN PAGE LOADS
// get access token out of local storage and use it to GET user profile information
function getUserProfile() {
  const token = localStorage.getItem("accessToken");

  $.ajax({
    url: "/api/user",
    method: "get",
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then(function(userData) {
    console.log(userData);

    // use data in userData to write into form input fields
    // ie $("name-input").val(userData.name);


    $('#firstName-input').val(userData.firstName);
  
    $('#lastName-input').val(userData.lastName);
   
    $('#emailId-input').val(userData.email);

    $('#password-input').val(userData.password);
   
   
  })
  .catch(function(err) {
    console.log(err);
  });

}

function updateProfile(event) {

  console.log("Inside user profile (event)");

  event.preventDefault();



  //user input in an object
  const userData={
    phoneNo:$("#phoneNo-input").val().trim(),
    location: $("#location-input").val().trim(),
    prefLocation: $("#prefLocation-input").val().trim(),
    resume: $("#resume-input").val().trim(),
    coverLetter: $("#coverLetter-input").val().trim()
  };


  $.ajax({
    url: "/api/user",
    method: "PUT",
    data: userData
    // headers: {
    //   authorization: `Bearer ${token}`
    // }
    
  }).then(function(userData) {
    console.log(userData);

    // use data in userData to write into form input fields
    // ie $("name-input").val(userData.name);

  
    return swal({
      title:userData.message,
      icon: 'success'
    })
    .then (function(){
     $("#phoneNo-input").val(userData.phoneNo);

     $("#location-input").val(userData.location);

     $("#prefLocation-input").val(userData.prefLocation);

     $("inlineCheckbox1").val(userData.inlineCheckbox1)

     $("#resume-input").val(userData.resume);

     $("#coverLetter-input").val(userData.coverLetter);

    })

    
   
   
  })
  .catch(function(err) {
    console.log(err);
  })
}
$(document).ready(function () {

  $('#submit').on('click', updateProfile); 

getUserProfile();
updateProfile();
});