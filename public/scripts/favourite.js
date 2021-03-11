$(document).ready(function(){
  $(".favourite-icon").on("click", function(){
    console.log("clicked")
    $(this).toggleClass("red");
  })
})

