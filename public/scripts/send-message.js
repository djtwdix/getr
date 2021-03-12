
$(document).ready(function() {

  $("#contact-form").on("submit", function() {
    const message = $("#contact-message").val();
    const listingId = $("#message-listing-id").text();
    const senderId = $("#message-sender").text();
    console.log(message);
    console.log(listingId);
    console.log(senderId);

    const contactInfo = {
      message,
      listingId,
      senderId
    }
    $.post("/email", contactInfo)

    .done(data => {
      console.log("done!")
    })
  })

})
