$(document).ready(function(){
  $(".fa-trash-alt").on("click", function(){
    console.log("clicked");

    const listingId = $(this).find(".fave-item-id").text();
    console.log(listingId);
    $.ajax({
      url: `/listings/${listingId}/delete`,
      type: 'EDIT',
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
