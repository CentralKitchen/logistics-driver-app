/* ==========================================================
   LogiTrack Driver App
   Main Application Script
   Version: Alpha 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {

    console.log("LogiTrack Started");

    // Reset old login if needed
    // resetState();

    initialiseDriverType();

    await loadDrivers();

    initialiseLogin();

}

/* ==========================================================
   Driver Type
========================================================== */

function initialiseDriverType() {

    const type = document.getElementById("driverType");

    const contractorFields = document.getElementById("contractorFields");

    type.addEventListener("change", () => {

        if (type.value === "Contractor") {

            contractorFields.style.display = "block";

        } else {

            contractorFields.style.display = "none";

        }

    });

}

/* ==========================================================
   Load Drivers
========================================================== */

async function loadDrivers() {

    const dropdown = document.getElementById("driver");

    dropdown.innerHTML = "";

    try {

        const drivers = await SharePoint.getDrivers();
	
	window.driverList = drivers;
	
	console.table(drivers);

        drivers.forEach(driver => {

            const option = document.createElement("option");

            option.value = driver.DriverID;

            option.textContent = driver.Title;

            dropdown.appendChild(option);

        });

    }

    catch(err){

        console.error(err);

    }

}

/* ==========================================================
   Login
========================================================== */

function initialiseLogin() {

    const loginButton = document.getElementById("loginBtn");

    loginButton.addEventListener("click", loginDriver);

}

/* ==========================================================
   Login Driver
========================================================== */

async function loginDriver() {

    const driverDropdown = document.getElementById("driver");
    const typeDropdown = document.getElementById("driverType");

    const driverID = driverDropdown.value;

    const selectedDriver = window.driverList.find(
        d => d.DriverID === driverID
    );

    if (!selectedDriver) {

        alert("Unable to find the selected driver.");

        return;

    }

    const driver = {

        id: selectedDriver.DriverID,

        name: selectedDriver.Title,

        routeID: selectedDriver.RouteID,

        driverType: selectedDriver.DriverType,

        type: typeDropdown ? typeDropdown.value : "",

        company: "",

        vehiclePlate: ""

    };

    setDriver(driver);

    console.table(driver);

    window.location.href = "trip.html";

}