/*
=========================================
 LogiTrack Beta
 SharePoint Connector
=========================================
*/

class SharePoint {

 static driverFlowUrl =
"https://defaultaf1a7dbfc35d455483b4aad0f8572e.87.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/06/workflows/9ecc610fb4064da9ba43e5a61c60426b/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=arB1p_qgTXJjYWckjpsm-axtiri8D1RRdA04FMsR5M8";

 static stopFlowUrl =
 "https://defaultaf1a7dbfc35d455483b4aad0f8572e.87.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/16/workflows/f0f73189bb7940c4bd662c3331603e65/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VZbgmCo63FkCWoehmuMckMFWug4cbcIiJcREJxel94E";

 static completedStopsFlowUrl = 
 "https://defaultaf1a7dbfc35d455483b4aad0f8572e.87.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/05/workflows/85e3444387324e8f8598778cb6a43390/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gb_ViTS_KORI9tABNVehL-vih3xOSNUkclWnFGFZG-k";
 
 static completeDeliveryFlowUrl = 
 "https://defaultaf1a7dbfc35d455483b4aad0f8572e.87.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/22/workflows/e7e43362ce1949919b56a4b413790683/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LXuWIjZnQ5YO4hKJMdYS-oCno4XBDEBCor7f65lNf5M";
 
 static headers = {
        "Accept": "application/json;odata=nometadata"
    };

    static async getListItems(listName, filter = "") {

        let url =
            `${Auth.getSiteUrl()}/_api/web/lists/GetByTitle('${listName}')/items`;

        if (filter !== "") {
            url += `?$filter=${filter}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: this.headers,
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Unable to load ${listName}`);
        }

        const data = await response.json();

        return data.value;

    }

    static async getDrivers() {

    const response = await fetch(this.driverFlowUrl, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: "{}"

    });

   if (!response.ok) {

    const errorText = await response.text();

    console.error("FLOW ERROR:");
    console.error(errorText);

    throw new Error(errorText);

}

    return await response.json();

}

   static async getRoutes() {

    return await this.getListItems(
        Auth.getList("routes"),
        "Status eq 'Active'"
    );

}

static async getStops(routeId, trip) {

    const payload = {

        RouteID: routeId,
        Trip: trip

    };

    console.log("========== GET STOPS ==========");
    console.log(payload);

    const response = await fetch(this.stopFlowUrl, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(payload)

    });

    if (!response.ok) {

        throw new Error("Unable to load stops");

    }

    return await response.json();

}

static async getCompletedStops(serviceDate, driverId, routeId, trip) {

    const payload = {

        ServiceDate: serviceDate,
        DriverID: driverId,
        RouteID: routeId,
        Trip: trip

    };

    console.log("========== GET COMPLETED STOPS ==========");
    console.log(payload);

    const response = await fetch(this.completedStopsFlowUrl, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(payload)

    });

   const data = await response.json();

   console.log("Completed Stops");
   console.log(data);

   return data.body.value;

}
 
/* ===========================================
Complete Delivery
=========================================== */

static async completeDelivery(data) {

    const response = await fetch(this.completeDeliveryFlowUrl, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    if (!response.ok) {

        throw new Error("Unable to upload delivery.");

    }

    return await response.json();

}

}
