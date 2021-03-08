const myAccount = `<div class="container-l" id="dashboard-card">
<div class="container-l" id="dashboard-profile">
  <div class="user-profile">
    <img src="./images/user.jpg" alt="user">
    <h3>Yam</h3>
  </div>

  <div class="links container-l">
    <div class="link">
      <button type="button" class="btn" id="dashboard-fav">Favourites <i class="fas fa-heart"></i></button>
    </div>
    <div class="link" id="dashboard-listings">
      <button type="button" class="btn" id="dashboard-fav">Listings <i class="fas fa-stream"></i></button>
    </div>
    <div class="link" id="dashboard-messages">
      <button type="button" class="btn" id="dashboard-fav">Messages <i class="fas fa-comment"></i>
    </div>
  </div>
</div>

<div class="container-l" id="dashboard-lists">
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
</div>
</div>`;

const createMyAccount = () => {
  $("main").append(myAccount);
}
