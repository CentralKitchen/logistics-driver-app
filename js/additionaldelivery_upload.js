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

   function submitAdditionalDelivery(){

    alert("Additional Delivery submit function coming next.");

}
