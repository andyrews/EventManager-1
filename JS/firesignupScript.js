     // Import the functions you need from the SDKs you need
     import { getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
     import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
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
     let Username = document.getElementById('username');
     let Email = document.getElementById('email');
     let Password = document.getElementById('password');
     let User_type = document.getElementById('user_type');
     let SignupForm = document.getElementById('signupForm');
     let RegisterUser = evt =>{
         evt.preventDefault();
     
         createUserWithEmailAndPassword(auth, Email.value, Password.value)
         .then((credentials)=>{
             set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
                 username: Username.value,
                 email: Email.value,
                 password: Password.value, 
                 user_type: User_type.value,
             }).then(() => {
                 window.alert("Sign up successful!");
                 
             })
         })
         .catch((error)=>{
             alert(error.message);
             console.log(error.code);
             console.error(error.message);
         })

     }

     signupForm.addEventListener('submit', RegisterUser);
