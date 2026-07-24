/*
=========================================
 LogiTrack Beta
 Authentication & Configuration
=========================================
*/

const CONFIG = {

    // Personal SharePoint (Development)
    siteUrl:
    "https://etonhousegroup-my.sharepoint.com/personal/mohamad_jufri_middleton_edu_sg",

    // List Names
    lists: {

        drivers: "LDP - Drivers",

        routes: "LDP - Routes",

        stops: "LDP - Stops",

        deliveries: "LDP - Deliveries"

    }

};

class Auth {

    static getSiteUrl() {

        return CONFIG.siteUrl;

    }

    static getList(name) {

        return CONFIG.lists[name];

    }

    static async checkLogin() {

        try {

            const response = await fetch(

                `${CONFIG.siteUrl}/_api/web/currentuser`,

                {

                    headers: {

                        "Accept":
                        "application/json;odata=nometadata"

                    },

                    credentials: "include"

                }

            );

            if (!response.ok)
                return false;

            const user = await response.json();

            console.log("Logged in as:", user.Title);

            return user;

        }

        catch (err) {

            console.error(err);

            return false;

        }

    }

}
