const CLIENT_ID = '744775517567-h2b5m9a20r4l6o53gq3uqr4tkc781t15.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDObVD6ejEPQ7B0edYr1LZj5Tb4dqcCK5I';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const CALENDAR_ID = '6a56a95b071dcf30ed7709246064b33dfd7342b74c58bc10d178072e43b191f5@group.calendar.google.com'
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';       

let eventRes;
let tokenClient;
let gapiInited = false;
let gisInited = false;
let expiry = new Date();

function gapiLoaded(){
    gapi.load("client",initializeGapiClient);
}

async function initializeGapiClient(){
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    console.log("new gapiloaded");
}

async function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback:""
        /*callback: (tokenResponse) =>{
            console.log("callback " + tokenResponse);
            if (tokenResponse && tokenResponse.access_token){
                console.log('Access token:', tokenResponse.accessToken);
                setCookie('TOKEN_RESPONSE', tokenResponse.accessToken);
            }
        }*/        
    });
    gisInited = true;
    console.log("new gisLoaded");
}

function addEvent(eventDetails){
    tokenClient.callback = async (response) => {
        if (response.error !== undefined){
            throw response;
        }
        console.log(response);
        saveToken(response);
        await scheduleEvent(eventDetails);
    };

    if (gapi.client.getToken() === null  && getCookie('TOKEN_RESPONSE') ){
        console.log("get token from cookie");
        coToken = {
            'access_token': getCookie('TOKEN_RESPONSE')
        }
        gapi.client.setToken(coToken);
    }
    if (gapi.client.getToken() === null || isCookieExpired()) {
        console.log("gapi.client.getToken() === null");
        tokenClient.requestAccessToken({ prompt: "consent"});
    }else{
        console.log("gapi.client.getToken() not null");
    //    tokenClient.requestAccessToken({ prompt: ""});
        console.log(gapi.client.getToken());
        scheduleEvent(eventDetails)
    }

    //scheduleEvent(eventDetails);
}

function loginTogGoogle(){
    tokenClient.callback = async (response) => {
        if (response.error !== undefined){
            throw response;
        }
        saveToken(response); 
        console.log(response);
    };
    tokenClient.requestAccessToken({ prompt: "consent"}); 

}

function isCookieExpired(){
    return Date.now() >= expiry.getTime();
}

function saveToken(response){
    expiry.setTime(expiry.getTime() + (response.expires_in * 1000));
    setCookie('TOKEN_RESPONSE', response.access_token,expiry);
    
    console.log(getCookie('TOKEN_RESPONSE'));
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

async function funcOps(ops, event){
    switch(ops){
        case 'CREATE':{
            addEvent(event);
        }break;
        case 'READ':{

        }break;
        case 'UPDATE':{

        }break;
        case 'DELETE':{
            
        }
    }
}

function deleteEvent(){

}

function scheduleEvent(newEv){
    const request = gapi.client.calendar.events.insert({
		'calendarId': CALENDAR_ID,
        'conferenceDataVersion': 1,
		'resource': newEv
	  });
	  
	  request.execute(function(event) {
	    console.log('Event created: ' + event.htmlLink);
        eventRes = event.result;
	  });
}

 function getEvent(){
    setTimeout(function(){console.log('test')}, 3000)
    return eventRes;
}





