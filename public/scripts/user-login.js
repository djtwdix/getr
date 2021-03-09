$(document).ready(function() {
  console.log("registration")
  $("#login-form").on("submit", function(event) {
    console.log("submitted")
    event.preventDefault();
    const email = $("#login-email").val();
    const password = $("#login-password").val();
    const userLoginInfo = {
      email,
      password,
    }
    console.log(userLoginInfo);

    $.post("/login", userLoginInfo)
      .done(data => console.log(data, "done"));
  })
})
