import { manageUser, getList } from "/JS/fireScript.js";

let email = document.getElementById('email');
let password = document.getElementById('password');
let loginForm = document.getElementById('loginForm');

let SignInUser = evt => {
    evt.preventDefault();

    manageUser('LOGIN', email.value, password.value)
        .then((credentials) => {
            getList('UsersAuthList/' + credentials.user.uid)
                .then(async (snapshot) => {
                    if (snapshot.exists) {
                        sessionStorage.setItem("user-info", JSON.stringify({
                            email: snapshot.val().email,
                            user_type: snapshot.val().user_type
                        }))
                        sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                        switch (snapshot.val().user_type) {
                            case 'guest':
                                window.location.href = 'table-guest.html';
                                break;
                            case 'admin':
                                await validateConsent().then(() => {
                                    window.location.href = 'admin-users.html';
                                })
                                break;
                            case 'member':
                                await validateConsent().then(() => {
                                    window.location.href = 'hub.html';
                                })
                                break;
                            default:
                                console.error('Unknown user type');
                        }
                    }
                })
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.error(error.message);
        })
}

loginForm.addEventListener('submit', SignInUser)
