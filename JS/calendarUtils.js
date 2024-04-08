const CLIENT_ID = '744775517567-h2b5m9a20r4l6o53gq3uqr4tkc781t15.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDObVD6ejEPQ7B0edYr1LZj5Tb4dqcCK5I';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const CALENDAR_ID = '6a56a95b071dcf30ed7709246064b33dfd7342b74c58bc10d178072e43b191f5@group.calendar.google.com'
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';       

let eventRes;
let tokenClient;
let gapiInited = false;
let gisInited = false;

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
    });
    gisInited = true;
    console.log("new gisLoaded");
}


function addEvent(eventDetails){
    if (gapi.client.getToken() === null  && getCookie('TOKEN_RESPONSE') ){
        console.log("get token from cookie");
        coToken = {
            'access_token': getCookie('TOKEN_RESPONSE')
        }
        gapi.client.setToken(coToken);
    }
    if (gapi.client.getToken() === null || isCookieExpired()) {
        alert('Token expired, please re-authorize for google resource access')
        tokenClient.requestAccessToken({ prompt: "consent"});
        throw new Error('Token expired, please re-authorize for google resource access')
    }else{
        console.log("gapi.client.getToken() not null");
    //    tokenClient.requestAccessToken({ prompt: ""});
        console.log(gapi.client.getToken());
        scheduleEvent(eventDetails)
    }

    //scheduleEvent(eventDetails);
}

 /*function validateConsent(){
    if (gapi.client.getToken() === null || isCookieExpired()) {
        alert('Please re-authorize for google resource access')
        requestToken()
        tokenClient.callback = (response) => {
            if (response.error !== undefined){
                throw response;
            }
            saveToken(response); 
            console.log(response);
        };
        //throw new Error('Token expired, please re-authorize for google resource access')
        setExistingToken();
    }else{
        console.log("gapi.client.getToken() not null");
    //    tokenClient.requestAccessToken({ prompt: ""});
        console.log(gapi.client.getToken());
    }
}*/

function validateConsent() {
    return new Promise((resolve, reject) => {
        setExistingToken()
      if (gapi.client.getToken() === null || isCookieExpired()) {
        console.log(isCookieExpired())
        alert('Please re-authorize for google resource access');
        requestToken();
        tokenClient.callback = (response) => {
          if (response.error !== undefined) {
            reject(response); // Reject the Promise with error
          } else {
            saveToken(response);
            console.log(response);
            resolve(); // Resolve the Promise on successful validation
          }
        };
        // Consider alternative approaches if setExistingToken is necessary
        // setExistingToken();
      } else {
        console.log("gapi.client.getToken() not null");
        console.log(gapi.client.getToken());
        resolve(); // Resolve the Promise if consent is already validated
      }
    });
  }

function setExistingToken(){
    if (gapi.client.getToken() === null  && getCookie('TOKEN_RESPONSE') ){
        console.log("get token from cookie");
        coToken = {
            'access_token': getCookie('TOKEN_RESPONSE')
        }
        gapi.client.setToken(coToken);
    }
}

function requestToken(){
        /*tokenClient.callback = (response) => {
            if (response.error !== undefined){
                throw response;
            }
            saveToken(response); 
            console.log(response);
            return res(response)
        };
        tokenClient.requestAccessToken({ prompt: "consent"}); */
        return tokenClient.requestAccessToken({ prompt: "consent"});
}



function isCookieExpired(){
    return Date.now() >= getCookie('EXPIRY_MILLI');
}

function saveToken(response){
    let expiry = new Date();
    expiry.setTime(expiry.getTime() + (response.expires_in * 1000));
    setCookie('TOKEN_RESPONSE', response.access_token,expiry);
    setCookie('EXPIRY_MILLI', expiry.getTime(), '');
    
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

async function funcOps(ops, event, resource=null){
    await validateConsent().then(() => {
        switch(ops){
            case 'CREATE':{
                scheduleEvent(event);
            }break;
            case 'READ':{
                //getEvents();
            }break;
            case 'UPDATE':{
                updateEvent(event, resource);
            }break;
            case 'DELETE':{
                deleteEvent(event)
            }
        }
    })
}

async function deleteEvent(eventId){
    const request =  gapi.client.calendar.events.delete({
		'calendarId': CALENDAR_ID,
        'eventId':eventId
	  });
	  request.execute(function(event) {
	    console.log('Event Deleted!');
	  });
}

async function updateEvent(eventId, resource){
    const request =  gapi.client.calendar.events.update({
		'calendarId': CALENDAR_ID,
        'eventId':eventId,
        'resource': resource
	  });
	  
	  request.execute(function(event) {
	    console.log('Event Updated!');
	  });
}

 function scheduleEvent(newEv){
    const request =  gapi.client.calendar.events.insert({
		'calendarId': CALENDAR_ID,
        'conferenceDataVersion': 1,
		'resource': newEv
	  });
	  
	  request.execute(function(event) {
	    console.log('Event created: ' + event.htmlLink);
        eventRes = event.result;
	  });
}

async function wait(milisec){
    await new Promise(resolve => {
        return setTimeout(resolve, milisec)
    })
}



async function getEventRes(){
    return eventRes;
}

async function getEvents(){
    try{
        let resp = await gapi.client.calendar.events.list({
            'calendarId': CALENDAR_ID,
            'timeZone': 'Asia/Manila'
        });
        return resp;
    }catch(error){
        alert(`Error at getEvents ${error}`)
        return 0;
    }
}





