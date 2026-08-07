/* =========================================
   Additional Delivery Upload
========================================= */

let selectedPhotoBase64 = "";

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("photoBtn")
        .addEventListener("click", takePhoto);

    document
        .getElementById("cameraInput")
        .addEventListener("change", previewPhoto);

    document
        .getElementById("submitBtn")
        .addEventListener("click", submitAdditionalDelivery);

    document
        .getElementById("backBtn")
        .addEventListener("click", () => {

            window.location.href =
                "additionaldelivery.html";

        });

});

function takePhoto(){

    document
        .getElementById("cameraInput")
        .click();

}

function previewPhoto(event){

    const file = event.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        selectedPhotoBase64 =
            e.target.result.split(",")[1];

        document
            .getElementById("photoPreview")
            .src = e.target.result;

        document
            .getElementById("photoPreview")
            .style.display = "block";

        document
            .getElementById("photoStatus")
            .innerHTML =

            "Photo captured successfully.";

    };

    reader.readAsDataURL(file);

}

   async function submitAdditionalDelivery(){

    // Validate Photo

    if(selectedPhotoBase64 === ""){

        alert("Please take a delivery photo.");

        return;

    }

    // Validate Remarks

    const remarks =

        document
        .getElementById("remarks")
        .value
        .trim();

    if(remarks === ""){

        alert("Please enter remarks.");

        return;

    }

    // Build Payload

    const payload = {

        DriverName:
            AppState.driver.name,

        DriverType:
            AppState.driver.type,

        ServiceDate:
            AppState.serviceDate,

        DeliveryType:
            AppState.additionalDeliveryType,

        Remarks:
            remarks,

        PhotoName:
            `${AppState.serviceDate.replace(/-/g,"")}_${AppState.driver.name.replace(/[^a-zA-Z0-9]/g,"")}_${new Date().getTime()}.jpg`,

        PhotoBase64:
            selectedPhotoBase64

    };

    console.log("========== ADDITIONAL DELIVERY ==========");

    try{

    await SharePoint.submitAdditionalDelivery(payload);

    alert("Additional Delivery submitted successfully.");

    window.location.href="stops.html";

}
catch(error){

    console.error(error);

    alert("Unable to submit. Please try again.");

}
