const CLIENT_ID = '744775517567-h2b5m9a20r4l6o53gq3uqr4tkc781t15.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDObVD6ejEPQ7B0edYr1LZj5Tb4dqcCK5I';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';        

var timeOfGettingToken = null;



function getTokenAfterInit(){
    return gapi.client.getToken();
}

function gapiLoaded() {
    gapi.load('client', async ()=>{
         gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    });
    alert("gapiloaded");
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) =>{
            if (tokenResponse && tokenResponse.access_token){
                setCookie("TOKEN_RESPONSE" ,JSON.stringify(tokenResponse));
                window.initializeGApiThroughToken(tokenResponse.access_token);
            }
            timeOfGettingToken = Date.now() + (tokenResponse.expires_in * 1000);
        }
    });
    gisInited = true;
}

function maybeEnableButtons(window) {
    if (gapiInited && gisInited) {
         handleAuthClick(window);
    }
}

function handleAuthClick(window) {
    const cookieToken = JSON.parse(getCookie("TOKEN_RESPONSE"));
    window.initializeGApi(gapi);
    if(cookieToken === null || Date.now() >= timeOfGettingToken){
        console.log('test');
        tokenClient.requestAccessToken();
    }else{
        window.initializeGApiThroughToken(cookieToken.access_token);   
    }
}

