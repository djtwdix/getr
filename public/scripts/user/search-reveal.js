$(document).ready(function() {
  $(".search-icon").on("click", function() {
    console.log("clicked")
    if (search) {
      $(".search-field").fadeOut("slow")
      search = false;
    } else {
      $(".search-field").fadeIn("slow")
      search = true;
    }
  })
})

