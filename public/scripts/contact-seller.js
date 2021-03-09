$(document).ready(function () {
  /**
   * Animation to toggle send message to the seller
   * It also acts as scroll up :)
   */
  $("#contact-seller-button").on("click", (e) => {
    e.preventDefault();

    $("#contact-seller-card").slideToggle();
    //  Resizes the container for contact-seller for long messages see auto-resizer.js
    $("#message-to-seller").focus().autoResize();
  });
});
