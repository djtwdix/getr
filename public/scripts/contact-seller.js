$(document).ready(function(){
  $("#contact-seller").on("click", function(){
    $("#contact-seller-form").slideToggle();
  });
  $(".close").on("click", function(){
    $("#contact-seller-form").slideUp();
  });
})
