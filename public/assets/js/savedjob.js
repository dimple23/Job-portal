
// function to savejobs
function savejobs() {
  // get information from <li> that this button lives in (the parent)
  const postData = $(this)
    .parent()
    .parent()
    .data();

  // get access token from localStorage
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return swal({
      title: 'You need to be logged in to do this!',
      icon: 'error'
    });
  }

  // if there's token, make a Post request to create a new bookmark for the user
  $.ajax({
    url: '/api/jobs',
    method: 'post',
    data: postData,
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
      handleError(err.responseJSON);
    });
}

function getSavedJobs() {
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
    .then(function(jobData) {
      console.log(jobData);
      printPosts(jobData.job);
    })
    .catch(err => {
      console.log(err);
      handleError(err.responseJSON);
    });
}

function handleError(errorData) {
  swal({
    title: 'Please login',
    text: errorData.message,
    icon: 'warning'
  }).then(() => {
    $('#user-info').hide();
    $('#user-tabs, #forms, #right-column-title').show();
    $('#login').tab('show');
  });
}

$postFeed.on('click', '#saveJob', savejobs);



$(document).ready(function () {

});