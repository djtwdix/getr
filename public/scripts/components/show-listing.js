const showListing = `<div class="listing-page">
<div class="listing">
 <div class="listing-image">
   <img src="/public/images/start.jpeg">
 </div>
 <div class="listing-right">
   <div class="listing-info">
     <div class="listing-mid">
       <div class="listing-specs">
         <div class="listing-make">
           Fender
         </div>
         <div class="listing-model">
          Stratocastor
         </div>
        </div>
        <div class="listing-price">
          $829.99
        </div>
     </div>
      <div class="listing-description">
          Selling used fender Stratocastor....
      </div>
    </div>
    <div class="listing-footer">
      <div>
       <i class="fas fa-heart"></i>
      </div>
      <div>
        <i class="fas fa-envelope"></i>
      </div>
    </div>

 </div>
</div>

</div>
</div>`

const createShowListing = () => {
  $("main").append(showListing);
  $(".fa-heart").on("click", function(){
    $(this).toggleClass("red");
  })
  $(".show-listing").on("click", function() {
    $("main").empty();
    createShowListing();
  })
}
