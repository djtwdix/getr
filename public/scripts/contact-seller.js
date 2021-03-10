function contact() {
  const form = document.getElementById("contact-seller-form");
  if (form.style.display === "none") {
    form.style.display = "block";
    form.scrollIntoView();

  } else {
    form.style.display = "none";
  }
}
