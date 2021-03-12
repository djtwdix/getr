
$(document).ready(function() {

  $("#submit-message").on("click", function() {
    const message = $("#contact-message").val();
    const listingId = $("#message-listing-id").text();
    const senderId = $("#message-sender").text();
    console.log(message);
    console.log(listingId);
    console.log(senderId);
    const seller = getSeller(listingId);
    const buyer = getUserByID(senderId);
  })
})
