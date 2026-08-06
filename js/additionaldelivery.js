document.getElementById("adhocBtn").addEventListener("click", () => {

    AppState.additionalDeliveryType =

        "New Ad-hoc Delivery";

    saveState();

    window.location.href =

        "additionaldelivery_upload.html";

});

document.getElementById("revisitBtn").addEventListener("click", () => {

    AppState.additionalDeliveryType =

        "Revisit Completed Delivery";

    saveState();

    window.location.href =

        "additionaldelivery_upload.html";

});
