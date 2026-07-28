/* ==========================================================
   LogiTrack Driver App
   State Manager
   Version: Alpha 1.0
========================================================== */

const STORAGE_KEY = "logitrack-state";

/* ==========================================================
   Default Application State
========================================================== */

const defaultState = {

    serviceDate: "",

    driver: {

        id: "",
        type: "Permanent",
        name: "",
        phone: "",
        company: "",
        vehiclePlate: "",
        replacingDriver: ""

    },

    route: {

      RouteId:"",
    	trip:"",
    	driverId:""
    },

    deliveries: {

        total: 0,
        completed: 0,
        remaining: [],
        history: []

    },

    currentStop: null,

    gps: {

        latitude: null,
        longitude: null,
        verified: false

    },

    app: {

        version: "1.0.0",
        online: navigator.onLine

    }

};

/* ==========================================================
   State Object
========================================================== */

let AppState = loadState();

/* ==========================================================
   Load State
========================================================== */

function loadState() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        return structuredClone(defaultState);

    }

    try {

        return JSON.parse(saved);

    }

    catch {

        return structuredClone(defaultState);

    }

}

/* ==========================================================
   Save State
========================================================== */

function saveState() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(AppState)

    );

}

/* ==========================================================
   Reset State
========================================================== */

function resetState() {

    AppState = structuredClone(defaultState);

    saveState();

}

/* ==========================================================
   Driver
========================================================== */

function setDriver(driver) {

    AppState.driver = {

        ...AppState.driver,

        ...driver

    };

    saveState();

}

/* ==========================================================
   Route
========================================================== */

function setRoute(route) {

    AppState.route = {

        ...AppState.route,

        ...route

    };

    saveState();

}

/* ==========================================================
   Deliveries
========================================================== */

function setDeliveryList(list) {

    AppState.deliveries.remaining = list;

    AppState.deliveries.total = list.length;

    AppState.deliveries.completed = 0;

    saveState();

}

/* ==========================================================
   Current Stop
========================================================== */

function setCurrentStop(stop) {

    AppState.currentStop = stop;

    saveState();

}

/* ==========================================================
   Complete Stop
========================================================== */

function completeCurrentStop(data = {}) {

    if (!AppState.currentStop) {

        return;

    }

    const completed = {

        ...AppState.currentStop,

        ...data,

        completedTime: new Date().toISOString()

    };

    AppState.deliveries.history.push(completed);

  AppState.deliveries.remaining =

    AppState.deliveries.remaining.filter(

        stop => stop.StopID !== completed.StopID

    );

    AppState.deliveries.completed =
    AppState.deliveries.total -
    AppState.deliveries.remaining.length;

    AppState.currentStop = null;

    saveState();

}

/* ==========================================================
   GPS
========================================================== */

function updateGPS(lat, lng, verified = false) {

    AppState.gps.latitude = lat;

    AppState.gps.longitude = lng;

    AppState.gps.verified = verified;

    saveState();

}

/* ==========================================================
   Service Date
========================================================== */

function setServiceDate() {

    AppState.serviceDate =

        new Date()

        .toISOString()

        .substring(0,10);

    saveState();

}

/* ==========================================================
   Progress
========================================================== */

function progressPercent() {

    if (AppState.deliveries.total === 0)

        return 0;

    return Math.round(

        (AppState.deliveries.completed /

        AppState.deliveries.total)

        *100

    );

}

/* ==========================================================
   Online / Offline
========================================================== */

window.addEventListener("online", () => {

    AppState.app.online = true;

    saveState();

});

window.addEventListener("offline", () => {

    AppState.app.online = false;

    saveState();

});

/* ==========================================================
   Initialize
========================================================== */

if (!AppState.serviceDate) {

    setServiceDate();

}

saveState();
