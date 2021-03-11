$(document).ready(function(){
  $(".favourite-icon").on("click", function(){
    console.log("clicked")
    $(this).toggleClass("red");
    const listingId = $(this).find(".fave-item-id").text();
    const userId = $(this).find(".fave-user-id").text();
    const addToFaves = {
      listingId,
      userId,
      isFave: null
    }

    if ($(this).hasClass("red") === false) {
      console.log("is not red")
      addToFaves.isFave = false;
      $.post("/favourite", addToFaves)
        .done(data => {
          console.log("Added to favourites");
        })
    } else {
      console.log("is red");
      addToFaves.isFave = true;
      $.post("/favourite", addToFaves)
      .done(data => {
        console.log("Added to favourites");
      })
    }


    console.log(addToFaves);
  })
})

/* "fave-item-id" style="display:none"><%= listingInfo[listing].id %> </div>
                <div class="fave-user-id" */
