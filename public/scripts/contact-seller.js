$(document).ready(function(){
  $("#contact-seller").on("click", function(){
    $("#contact-seller-form").slideToggle();
    $("#contact-message").focus();
  });
  $(".close").on("click", function(){
    $("#contact-seller-form").slideUp();

  });
})
