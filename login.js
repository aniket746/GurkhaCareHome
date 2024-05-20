document.addEventListener("DOMContentLoaded", function () {
  var loginLink = document.getElementById("login-link");
  var loginForm = document.getElementById("login-form");
  var signupLink = document.getElementById("signup-link");
  var signupBox = document.getElementById("signup-box");

  // Show login form when login link is clicked
  loginLink.addEventListener("click", function () {
    loginForm.style.display = "block";
  });

  // Show signup box when signup link is clicked
  signupLink.addEventListener("click", function () {
    signupBox.style.display = "block";
  });

  // Close modal when close button is clicked
  var closeButtons = document.getElementsByClassName("close");
  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function () {
      var modal = this.parentElement.parentElement;
      modal.style.display = "none";
    });
  }

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target == loginForm) {
      loginForm.style.display = "none";
    } else if (event.target == signupBox) {
      signupBox.style.display = "none";
    }
  });
});
