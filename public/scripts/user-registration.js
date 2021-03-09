$(document).ready(function() {
  console.log("registration")
  $("#register-form").on("submit", function(event) {
    console.log("submitted")
    event.preventDefault();
    const first_name = $("#reg-first-name").val();
    const last_name = $("#reg-last-name").val();
    const email = $("#reg-email").val();
    const password = $("#reg-password").val();
    const profile_pic = $("#reg-photo").val();
    const userInfo = {
      first_name,
      last_name,
      email,
      password,
      profile_pic
    }
    /* console.log(userInfo); */

    $.post("/register", userInfo)
      .done(data => console.log(data, "done"));

    // $.ajax()
  })
})
