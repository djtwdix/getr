$(document).ready(function(){
  $(".favourite-icon").on("click", function(){
    console.log("clicked")
    $(this).toggleClass("red");
    const listingId = $(this).find(".fave-item-id").text();
    const userId = $(this).find(".fave-user-id").text();
    const addToFaves = {
      listingId,
      userId
    }

    $.post("/favourite", addToFaves)
      .done(data => {
        console.log("Added to favourites");
      })

    console.log(addToFaves);
  })
})

/* "fave-item-id" style="display:none"><%= listingInfo[listing].id %> </div>
                <div class="fave-user-id" */
