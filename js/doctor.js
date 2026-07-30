const doctorForm = document.getElementById("doctorForm");

const doctorName = document.getElementById("doctorName");
const specialization = document.getElementById("specialization");
const status = document.getElementById("status");
const waitingTime = document.getElementById("waitingTime");

const liveDoctor = document.getElementById("liveDoctor");
const liveSpecialization = document.getElementById("liveSpecialization");
const liveStatus = document.getElementById("liveStatus");
const liveWaiting = document.getElementById("liveWaiting");

const appointmentCount =
document.getElementById("appointmentCount");

const notificationList =
document.getElementById("notificationList");

// Load Data

window.onload = () => {

    loadNotifications();

};

// Save Doctor

doctorForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let doctors =
        JSON.parse(localStorage.getItem("doctors")) || [];

    const doctor = {

        id: Date.now(),

        name: doctorName.value,

        specialization: specialization.value,

        status: status.value,

        waiting: waitingTime.value

    };

    doctors.push(doctor);

    localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
    );

    showDoctor(doctor);

    alert("Doctor Added Successfully");

    doctorForm.reset();

});

// Live Preview

function showDoctor(doctor){

liveDoctor.innerHTML=doctor.name;

liveSpecialization.innerHTML=
doctor.specialization;

liveWaiting.innerHTML=
doctor.waiting+" Minutes";

if(doctor.status=="Online"){

liveStatus.innerHTML=
'<span class="badge bg-success">🟢 Online</span>';

}
else{

liveStatus.innerHTML=
'<span class="badge bg-danger">🔴 Offline</span>';

}

}

// Notifications

function loadNotifications(){

let appointments=
JSON.parse(localStorage.getItem("appointments"))||[];

appointmentCount.innerHTML=
appointments.length;

notificationList.innerHTML="";

if(appointments.length==0){

notificationList.innerHTML=
`
<li class="list-group-item">
No Appointments Yet
</li>
`;

return;

}

appointments.forEach(a=>{

notificationList.innerHTML+=`

<li class="list-group-item">

🔔 ${a.patient}

booked

${a.doctor}

</li>

`;

});

}