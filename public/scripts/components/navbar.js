const navbar =  `<nav class="navbar my-navbar">
<div class="nav-left">
  <div class="logo">
    GETr
  </div>
</div>
<div class="my-nav-right">
<div class="search-icon">
  <i class="fas fa-search"></i>
</div>
  <form>
    <input class="search-field" type="search" placeholder="search">
  </form>
  <div class="my-account-dropdown">
    <div class="dropdown-button" id="my-account-btn">
      My Account
    </div>
    <div class="dropdown-list">
      <ul>
        <li>
          My Faves
        </li>
        <li>
          My Listings
        </li>
        <li id="post-ad-btn">
          Post Ad
        </li>
    </div>
    </ul>
  </div>
</div>
</nav>`



const createNavbar = () => {
  let search = false;
  $(".header").append(navbar);
  $(".search-icon").on("click", function() {
    console.log("clicked")
    if (search) {
      $(".search-field").fadeOut("slow")
      search = false;
    } else {
      $(".search-field").fadeIn("slow")
      search = true;
    }
  })
  $(".logo").on("click", function() {
    $("main").empty();
    createLanding();
  })
  $("#post-ad-btn").on("click", function() {
    $("main").empty();
    createPostAdForm();
  })
  $("#my-account-btn").on("click", function() {
    $("main").empty();
    createMyAccount();
  })
}

