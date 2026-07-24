/*
=========================================
 LogiTrack Beta
 SharePoint Connector
=========================================
*/

class SharePoint {

 static flowUrl =
"https://defaultaf1a7dbfc35d455483b4aad0f8572e.87.environment.api.powerplatform.com/powerautomate/automations/direct/cu/06/workflows/9ecc610fb4064da9ba43e5a61c60426b/triggers/manual/paths/invoke?api-version=1";
 
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

    const response = await fetch(this.flowUrl, {

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

        let filter =
            `RouteID eq '${routeId}' and Trip eq '${trip}'`;

        return await this.getListItems(
            Auth.getList("stops"),
            filter
        );

    }

}
