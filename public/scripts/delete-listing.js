$(document).ready(function(){
  $(".delete-my-listing").on("click", function(){
    console.log("clicked");

    const listingId = $(this).find(".fave-item-id").text().trim();
    console.log(listingId);
    $.ajax({
      url: `/listings/${listingId}/delete`,
      type: 'DELETE',
      data: {
        listingId
      },
      success: location.reload()
    })
    .done(data => {
      console.log("post deleted");
    })
  })
})
