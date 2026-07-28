/* ===========================================
Delivery Photo
=========================================== */

let photoBase64 = "";

document.addEventListener("DOMContentLoaded", () => {

    if (!AppState.currentStop) {

        alert("No delivery selected.");

        window.location.href = "stops.html";

        return;

    }

    const stop = AppState.currentStop;

    document.getElementById("centreName").innerHTML =
        stop.CentreName;

    document.getElementById("deliveryAddress").innerHTML =
        stop.Address;

    document.getElementById("deliveryUnit").innerHTML =
        stop.Unit;

    document.getElementById("deliveryPostal").innerHTML =
        "Singapore " + stop.PostalCode;

    document.getElementById("receiverName").innerHTML =
        stop.Receiver;

    document.getElementById("receiverContact").innerHTML =
        stop.ContactNumber;

});

/* ===========================================
Take Delivery Photo
=========================================== */

document

.getElementById("photoBtn")

.addEventListener("click", () => {

    document

    .getElementById("photoInput")

    .click();

});

/* ===========================================
Photo Preview
=========================================== */

document

.getElementById("photoInput")

.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        photoBase64 =

        e.target.result.split(",")[1];

        const preview =

        document.getElementById("photoPreview");

        preview.src = e.target.result;

        preview.style.display = "block";

        document.getElementById("photoStatus")

        .innerHTML =

        "✅ Photo ready to upload.";

        document.getElementById("photoBtn")

        .innerHTML =

        "📷 Retake Delivery Photo";

    };

    reader.readAsDataURL(file);

});

