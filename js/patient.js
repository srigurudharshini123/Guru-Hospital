const patientName = document.getElementById("patientName");
const searchDoctor = document.getElementById("searchDoctor");
const onlineFilter = document.getElementById("onlineFilter");
const doctorContainer = document.getElementById("doctorContainer");

// Events
searchDoctor.addEventListener("keyup", loadDoctors);
onlineFilter.addEventListener("change", loadDoctors);

window.onload = loadDoctors;

// Load All Doctors
function loadDoctors() {

    doctorContainer.innerHTML = "";

    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    if (doctors.length == 0) {

        doctorContainer.innerHTML = `
        <div class="col-12">
            <div class="alert alert-warning text-center">
                No Doctors Available
            </div>
        </div>`;
        return;
    }

    const search = searchDoctor.value.toLowerCase();

    doctors.forEach((doctor) => {

        // Search
        if (
            !doctor.name.toLowerCase().includes(search) &&
            !doctor.specialization.toLowerCase().includes(search)
        ) {
            return;
        }

        // Filter
        if (onlineFilter.checked && doctor.status !== "Online") {
            return;
        }

        let badge =
            doctor.status === "Online"
                ? `<span class="badge bg-success">🟢 Online</span>`
                : `<span class="badge bg-danger">🔴 Offline</span>`;

        let button =
            doctor.status === "Online"
                ? `<button class="btn btn-success book-btn"
                    onclick="bookAppointment(${doctor.id})">
                    Book Appointment
                </button>`
                : `<button class="btn btn-secondary book-btn" disabled>
                    Offline
                </button>`;

        doctorContainer.innerHTML += `
        <div class="col-md-6 mb-4">

            <div class="card doctor-card shadow">

                <img src="images/Doctor_12.png"
                     class="card-img-top">

                <div class="card-body">

                    <h4>${doctor.name}</h4>

                    <p>
                        <strong>Specialization :</strong><br>
                        ${doctor.specialization}
                    </p>

                    <p>${badge}</p>

                    <p>
                        <strong>Waiting Time :</strong>
                        ${doctor.waiting} Minutes
                    </p>

                    ${button}

                </div>

            </div>

        </div>`;
    });
}

// Book Appointment
function bookAppointment(id) {

    if (patientName.value.trim() == "") {

        alert("Please Enter Patient Name");

        return;

    }

    let doctors =
        JSON.parse(localStorage.getItem("doctors")) || [];

    let doctor =
        doctors.find(d => d.id == id);

    let appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push({

        patient: patientName.value,

        doctor: doctor.name,

        specialization: doctor.specialization,

        waiting: doctor.waiting,

        time: new Date().toLocaleString()

    });

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    // Modal Message

    document.getElementById("appointmentMessage").innerHTML =

    `
    <strong>Patient :</strong> ${patientName.value}<br>

    <strong>Doctor :</strong> ${doctor.name}<br>

    <strong>Specialization :</strong> ${doctor.specialization}<br>

    <strong>Waiting Time :</strong> ${doctor.waiting} Minutes
    `;

    // Show Modal

    const modal =
        new bootstrap.Modal(
            document.getElementById("appointmentModal")
        );

    modal.show();

    // Countdown

    startCountdown(
        parseInt(doctor.waiting)
    );

}

function startCountdown(minutes) {

    let seconds = minutes * 60;

    const timer =
        document.getElementById("countdownTimer");

    const interval = setInterval(function () {

        let min =
            Math.floor(seconds / 60);

        let sec =
            seconds % 60;

        timer.innerHTML =
            `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;

        seconds--;

        if (seconds < 0) {

            clearInterval(interval);

            timer.innerHTML = "00:00";

            alert("🔔 Your waiting time is over.\n\nPlease proceed to the Doctor's Room.");

        }

    }, 1000);

}