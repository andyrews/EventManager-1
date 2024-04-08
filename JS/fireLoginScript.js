import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, get, ref, child} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB0JAbXEgYyHuLsBI1lZ_XCBnlZzfFcU08",
    authDomain: "illuminata-eventmanager.firebaseapp.com",
    databaseURL: "https://illuminata-eventmanager-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "illuminata-eventmanager",
    storageBucket: "illuminata-eventmanager.appspot.com",
    messagingSenderId: "397265559679",
    appId: "1:397265559679:web:93d385aba41cb8e9495f4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

let email = document.getElementById('email');
let password = document.getElementById('password');
let loginForm = document.getElementById('loginForm');

let SignInUser = evt =>{
    evt.preventDefault();

    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((credentials)=>{

        get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot)=>{
            if(snapshot.exists){
               sessionStorage.setItem("user-info", JSON.stringify({
                    email: snapshot.val().email,
                    user_type: snapshot.val().user_type  
               })) 
               sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
               switch(snapshot.val().user_type) {  
                    case 'guest':
                        window.location.href = 'table-guest.html';
                        break;
                    case 'admin':
                            window.location.href = 'admin-users.html';
                        break;
                    case 'member':
                            window.location.href = 'hub.html';
                        break;
                    default:
                        console.error('Unknown user type');
                }
            }
        })
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.error(error.message); 
    })
}

loginForm.addEventListener('submit', SignInUser)
