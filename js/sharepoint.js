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

        throw new Error("Unable to load drivers");

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

    const response = await fetch(this.stopFlowUrl, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            RouteID: routeId,
            Trip: trip
        })

    });

    if (!response.ok) {
        throw new Error("Unable to load stops");
    }

    return await response.json();

}

}
