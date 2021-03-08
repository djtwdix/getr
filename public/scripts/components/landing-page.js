const landingPage = `<div class="landing">
<div class="landing-left">
  <div class="title">
      Find Your
    <br>
      Dream Guitar
  </div>
  <div class="subtitle">
      Don't go through life without finding <span class="text-emphasis">the ONE</span>
  </div>
  <div class="landing-search">
    <form>
      <input type="search" placeholder="Find yours now....">
    </form>
    <div class="search-icon search-submit">
      <i class="fas fa-search"></i>
    </div>
  </div>
  <div class="advanced-search">
    Advanced Search
  </div>
</div>
<div class="landing-right">
  <img src="svg/undraw_compose_music_ovo2.svg" alt="Music SVG">
</div>
</div>`

const createLanding = () => {
  $("main").append(landingPage);
  $(".search-submit").on("click", function(){
    $("main").empty();
    createSearchResults();
  })
}
