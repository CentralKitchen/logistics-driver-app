/*
=========================================
 LogiTrack Beta
 SharePoint Connector
=========================================
*/

class SharePoint {

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

        }

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
