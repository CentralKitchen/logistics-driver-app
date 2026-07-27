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
