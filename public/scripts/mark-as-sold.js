$(document).ready(function(){
  $(".mark-as-sold").on("click", function(){
    console.log("clicked");

    const listingId = $(this).find(".fave-item-id").text();
    let isSold = false;
    console.log(listingId);
   const soldText = $(this).text().trim().slice(0, 4)
   console.log(soldText)

  if (soldText === "Mark") {
    $(this).text("Sold")
    isSold = false;
  } else {
    $(this).text("Mark as sold")
    isSold = true;
  }

  $.ajax({
    url: `/listings/${listingId}/sold`,
    type: 'PUT',
    data: {
      isSold,
      listingId
    },
    /* success: location.reload() */
  })
  .done(data => {
    console.log("post deleted");
  })
  })
})
