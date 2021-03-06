const postAd = `<div class="container-l" id="post-ad-card">
<form class="row g-3">
  <div class="banner container-xl">
    <h1>Post on Getr</h1>
    <figure class="figure">
      <img src="./docs/images/transaction.svg" alt="">
    </figure>
  </div>
  <div class="col-sm-7">
    <label class="form-label">Brand</label>
    <select class="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose...</option>
      <option>Charvel</option>
      <option>Epiphone</option>
      <option>Fender</option>
      <option>Gibson</option>
      <option>Ibanez</option>
      <option>PRS</option>
      <option>Squier</option>
      <option value="Other">Other...</option>
    </select>
  </div>

  <div class="col-sm-6">
    <label class="form-label">Model</label>
    <input type="text" class="form-control form-control-lg" maxlength="25" required>
  </div>



  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
  </div>
  <div id="price">
    <div class="input-group col-1">
      <label class="form-label"></label>
      <span class="input-group-text" id="left">$</span>
      <input type="text" class="form-control" id="price-input" aria-label="Amount (to the nearest dollar)"
        required>
      <span class="input-group-text" id="right">CAD</span>
    </div>
  </div>
  <div class="mb-3">
    <label for="formFile" class="form-label">What does it look like?</label>
    <input class="form-control" type="file" id="formFile">
  </div>

  <label for="basic-url">Or your image URL</label>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="image-url">https://</span>
    </div>
    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
  </div>

  <h2>Where are you located?</h2>

  <div class="col-md-5">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity" required>
  </div>
  <div class="col-md-4">
    <label for="validationCustom04" class="form-label">Province</label>
    <select class="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose...</option>
      <option value="AB">Alberta</option>
      <option value="BC">British Columbia</option>
      <option value="MB">Manitoba</option>
      <option value="NB">New Brunswick</option>
      <option value="NL">Newfoundland and Labrador</option>
      <option value="NS">Nova Scotia</option>
      <option value="ON">Ontario</option>
      <option value="PE">Prince Edward Island</option>
      <option value="QC">Quebec</option>
      <option value="SK">Saskatchewan</option>
      <option value="NT">Northwest Territories</option>
      <option value="NU">Nunavut</option>
      <option value="YT">Yukon</option>
    </select>
    <div class="invalid-feedback">
      Please select a valid province.
    </div>
  </div>
  <div class="col-md-3">
    <label for="validationCustom04" class="form-label">Country</label>
    <select class="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose...</option>
      <option>Canada</option>
    </select>
    <div class="invalid-feedback">
      Please select a valid country.
    </div>
  </div>

  <div class="d-flex justify-content-center" id="post-button">
    <button type="submit" class="btn">Post <i class="fas fa-pen"></i></button>
  </div>
</form>
</div>`;

const createPostAdForm = () => {
  $("main").prepend(postAd);
}
