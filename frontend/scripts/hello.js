// $(document).ready(function() {
//     localStorage.removeItem("token");
// })
// $("#registerform").submit(function(event) {
//     event.preventDefault();
//     $.ajax({
//         url: 'http://34.107.6.19:3000/signup',
//         type: 'POST',
//         data: {
//             name: $('#registerform #name').val(),
//             email: $('#registerform #email').val(),
//             password: $('#registerform #password').val(),
//             password_confirmation: $('#registerform #password_confirmation').val()
//         },
//         success: function(result) {
//             //alert(result.message);
//             localStorage.setItem('token', result.auth_token);
//             window.location.replace("file:///home/achudy/studia/WWWiJS/frontend/user-view.html");
//         },
//         error: function(error) {
//             if (error.status === 422) {
//                 alert(error.responseJSON.message);
//             }
//         }
//     });
// })
// $("#loginform").submit(function(event) {
//     event.preventDefault();
//     $.ajax({
//         url: 'http://34.107.6.19:3000/auth/login',
//         type: 'POST',
//         data: {
//             email: $('#loginform #email').val(),
//             password: $('#loginform #password').val(),
//         },
//         success: function(result) {
//             //alert(result.message);
//             localStorage.setItem('token', result.auth_token);
//             window.location.replace("file:///home/achudy/studia/WWWiJS/frontend/user-view.html");
//         },
//         error: function(error) {
//             if (error.status === 422) {
//                 alert(error.responseJSON.message);
//             }
//         }
//     });
// })