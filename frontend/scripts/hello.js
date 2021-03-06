//This script defines the essential consts and provides the

//The address of the API, there is a http so that CORS doesn't block it.
const apiUrl = "http://34.107.6.19:3000/";
// const apiUrl = "http://localhost:3000/";

//The url to the login/signin page.
const mainUrl = "http://34.107.6.19/main.html";
//Change the line below if running on localhost.
// const mainUrl = "file://";

//Check immidiately if there is a token. If so, go to the main page.
if (localStorage.getItem("token")) {
  window.location.replace(mainUrl);
}

listenerToSubmitRegister();

listenerToLoginForm();

//Define how a POST request should be handled when registering.
//The data sent to the API is gathered from the form,
//When the register submit is successful, write down the token
//And go to the main page. If not, display an alert with a message.
function listenerToSubmitRegister() {
  $("#registerform").submit(function (event) {
    event.preventDefault();
    $.ajax({
      url: apiUrl + "signup",
      type: "POST",
      data: {
        name: $("#registerform #name").val(),
        email: $("#registerform #email").val(),
        password: $("#registerform #password").val(),
        password_confirmation: $("#registerform #password_confirmation").val(),
      },
    })
      .done(function (result) {
        localStorage.setItem("token", result.auth_token);
        window.location.replace(mainUrl);
      })
      .fail(function (error) {
        if (error.status == 422) {
          alert(error.responseJSON.message);
        } else if (error.status == 401) {
          alert(error.responseJSON.message);
        } else {
          alert(
            "There was an unfortunate error. Please wait a while and reload."
          );
        }
      });
  });
}

//Define how a POST request should be handled when logging in.
//The data sent to the API is gathered from the form,
//When the login submit is successful, write down the token
//And go to the main page. If not, display an alert with a message.
function listenerToLoginForm() {
  $("#loginform").submit(function (event) {
    event.preventDefault();
    $.ajax({
      url: apiUrl + "auth/login",
      type: "POST",
      data: {
        email: $("#loginform #email").val(),
        password: $("#loginform #password").val(),
      },
    })
      .done(function (result) {
        localStorage.setItem("token", result.auth_token);
        window.location.replace(mainUrl);
      })
      .fail(function (error) {
        if (error.status == 422) {
          alert(error.responseJSON.message);
        } else if (error.status == 401) {
          alert(error.responseJSON.message);
        } else {
          alert(
            "There was an unfortunate error. Please wait a while and reload."
          );
        }
      });
  });
}
