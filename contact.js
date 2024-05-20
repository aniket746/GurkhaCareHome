// Handle form submission
const contactForm = document.querySelector('#contact-us form');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = contactForm.querySelector('input[placeholder="Name"]').value;
  const email = contactForm.querySelector('input[placeholder="Email"]').value;
  const message = contactForm.querySelector('textarea').value;

  // Here, you can add your code to send the form data to a server or email service

  // Reset the form after submission
  contactForm.reset();
});
