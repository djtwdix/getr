const searchResults = `<div class="listings-page">
<div class="listings-title">
  Your search results...
</div>
<div class="listings">
  <div class="listings-item">
    <div class=listings-image>
      <img src="/public/images/start.jpeg">
    </div>
    <div class="listings-info">
      <div class="listings-mid">
        <div class="specs">
          <div class="listings-make">
            Fender
          </div>
          <div class="listings-model">
           Stratocastor
          </div>
         </div>
         <div class="listings-price">
           $829.99
         </div>
      </div>
       <div class="listings-description">
           Selling used fender Stratocastor....
       </div>
     </div>
     <div class="listings-footer">
       <div>
        <i class="fas fa-heart"></i>
       </div>
       <div>
         <i class="fas fa-envelope"></i>
       </div>
     </div>
   </div>
   <div class="listings-item">
     <div class=listings-image>
       <img src="/public/images/start.jpeg">
     </div>
     <div class="listings-info">
       <div class="listings-mid">
         <div class="specs">
           <div class="listings-make">
             Fender
           </div>
           <div class="listings-model">
            Stratocastor
           </div>
          </div>
          <div class="listings-price">
            $829.99
          </div>
       </div>
        <div class="listings-description">
            Selling used fender Stratocastor....
        </div>
      </div>
      <div class="listings-footer">
        <div>
         <i class="fas fa-heart"></i>
        </div>
        <div>
          <i class="fas fa-envelope"></i>
        </div>
      </div>
    </div>
</div>
</div>`

const createSearchResults = () => {
  $("main").append(searchResults);
};
