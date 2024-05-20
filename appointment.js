// Get modal elements
const modal = document.getElementById("appointment-modal");
const closeBtn = document.getElementsByClassName("close")[0];
const appointmentForm = document.getElementById("appointment-form");
const serviceInput = document.getElementById("service");
const doctorSelect = document.getElementById("doctor");
const appointmentMessage = document.getElementById("appointment-message");

// Get book appointment buttons
const bookAppointmentButtons = document.getElementsByClassName("book-appointment");

// Open modal and populate service and doctor options
for (let i = 0; i < bookAppointmentButtons.length; i++) {
  bookAppointmentButtons[i].addEventListener("click", function () {
    const service = this.dataset.service;
    const doctors = this.dataset.doctors.split(", ");

    serviceInput.value = service;
    doctorSelect.innerHTML = "";

    if (doctors.length > 0) {
      for (let j = 0; j < doctors.length; j++) {
        const option = document.createElement("option");
        option.value = doctors[j];
        option.text = doctors[j];
        doctorSelect.add(option);
      }
    } else {
      const option = document.createElement("option");
      option.value = "";
      option.text = "No doctors available";
      doctorSelect.add(option);
      doctorSelect.disabled = true;
    }

    modal.style.display = "block";
  });
}

// Close appointment modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Handle form submission
appointmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const service = serviceInput.value;
  const doctor = doctorSelect.value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (doctor === "") {
    appointmentMessage.textContent = "No doctors available for the selected service.";
  } else {
    appointmentMessage.textContent = `Appointment booked for ${service} with ${doctor} on ${date} at ${time}.`;
    appointmentForm.reset();
  }
});
