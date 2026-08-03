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

    const driverLabel = document.getElementById("driverLabel");

    type.addEventListener("change", () => {

        if (type.value === "Contractor") {

            contractorFields.style.display = "block";

            driverLabel.innerHTML = "Replacing Driver";

        } else {

            contractorFields.style.display = "none";

            driverLabel.innerHTML = "Driver Name";

        }

    });

}

/* ==========================================================
   Load Drivers
========================================================== */

async function loadDrivers() {

    const dropdown = document.getElementById("driver");

    dropdown.innerHTML = "";

	const placeholder = document.createElement("option");

	placeholder.value = "";

	placeholder.textContent = "-- Select Driver --";

	placeholder.disabled = true;
	
	placeholder.selected = true;

	dropdown.appendChild(placeholder);

    try {

       const drivers = await SharePoint.getDrivers();

	window.driverList = drivers;

	const contractors = await SharePoint.getContractors();

	window.contractorList = contractors;

	console.table(contractors);

        drivers.forEach(driver => {

            const option = document.createElement("option");

            option.value = driver.DriverID;

            option.textContent = driver.Name;

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
	
	const contractorName = document.getElementById("contractorName").value.trim();
	
	const company = document.getElementById("company").value.trim();
	
	const vehiclePlate = document.getElementById("vehiclePlate").value.trim();

	const enteredPin = document.getElementById("driverPin").value.trim();

    const driverID = driverDropdown.value;

    const selectedDriver = window.driverList.find(
        d => d.DriverID === driverID
    );

    if (!selectedDriver) {

        alert("Unable to find the selected driver.");

        return;

    }

	if (enteredPin === "") {

    alert("Please enter your PIN.");

    return;

	}

if (enteredPin !== String(selectedDriver.PIN)) {

    alert("Incorrect PIN.");

    return;

}

	if (typeDropdown.value === "Contractor") {

    if (
        contractorName === "" ||
        company === "" ||
        vehiclePlate === ""
    ) {

        alert("Please complete all contractor information.");

        return;

    }

}
	
    const driver = {

        id: selectedDriver.DriverID,

        name: selectedDriver.Name,

        routeID: selectedDriver.RouteID,

        driverType: selectedDriver.DriverType,

        type: typeDropdown ? typeDropdown.value : "",

      	company: company,

   		vehiclePlate: vehiclePlate,

   		contractorName: contractorName
		
    };

    setDriver(driver);

    console.table(driver);

    window.location.href = "trip.html";

}
