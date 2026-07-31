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

    /* ===========================================
Complete Delivery
=========================================== */

document.getElementById("completeBtn")

.addEventListener("click", async () => {

    if(photoBase64 === ""){

        alert("Please take a delivery photo first.");

        return;

    }

    const btn = document.getElementById("completeBtn");

    btn.disabled = true;

    btn.innerHTML = "Uploading...";
    
    try{

        const stop = AppState.currentStop;

    const payload = {

    ServiceDate: AppState.serviceDate,

    DriverID: AppState.driver.id,

    RouteID: AppState.route.routeId,

    Trip: AppState.route.trip,

    StopID: stop.StopID,

    StopOrder: stop.StopOrder,

    CentreName: stop.CentreName,

    CompletedTime: new Date().toISOString(),

    PhotoName:
    `${AppState.serviceDate.replace(/-/g,"")}_${AppState.route.routeId}_${AppState.route.trip.replace(/\s/g,"")}_Stop${String(stop.StopOrder).padStart(2,"0")}_${stop.CentreName.replace(/[^a-zA-Z0-9]/g,"")}.jpg`,

    PhotoBase64: photoBase64

};

console.log(payload);

await SharePoint.completeDelivery(payload);
       
         completeCurrentStop();

if(AppState.deliveries.remaining.length===0){

    window.location.href="completed.html";

}else{

    window.location.href="stops.html";

    }

    }
        
    catch(err){

    console.error(err);

    btn.disabled = false;

    btn.innerHTML = "✅ COMPLETE DELIVERY";

    alert("Upload failed.");

}

    });

});

