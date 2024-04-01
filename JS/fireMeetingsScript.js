     // Import the functions you need from the SDKs you need
     import { getDatabase, set, ref, get, child} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
     import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
     import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

     // Your web app's Firebase configuration
     const firebaseConfig = {
         apiKey: "AIzaSyB0JAbXEgYyHuLsBI1lZ_XCBnlZzfFcU08",
         authDomain: "illuminata-eventmanager.firebaseapp.com",
         databaseURL: "https://illuminata-eventmanager-default-rtdb.asia-southeast1.firebasedatabase.app/",
         projectId: "illuminata-eventmanager",
         storageBucket: "illuminata-eventmanager.appspot.com",
         messagingSenderId: "397265559679",
         appId: "1:397265559679:web:93d385aba41cb8e9495f4a"
     };

     // Initialize Firebase
     const app = initializeApp(firebaseConfig);
     const db = getDatabase(app);
     const auth = getAuth(app);

    export function writeData(id, table_name, event) {
        set(ref(db, `${table_name}/` + id), {
          event_id: event.id,
          summary: event.summary,
          start_time:event.start.dateTime,
          end_time:event.end.dateTime,
          creator:event.creator.email
        }).then(() => {
            console.log("Database Meeting log successful");
            
        })
    }

    export function getSpecRow(id, table_name){
        get(child(ref(db), `${table_name}/` + id)).then((snapshot)=>{
            if(snapshot.exists){
                return snapshot.val();
            }
        });
    }
