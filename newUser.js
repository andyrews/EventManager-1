const selectShow = document.getElementById('user-roles');
const guestPassword = document.getElementById('guest-details-container');
var guestTextbox = null;


selectShow.addEventListener('change', (event) => {
  const selectedValue = event.target.value;
  if (selectedValue === 'Guest') {
    guestTextbox = document.createElement('input');
    guestTextbox.type = 'password'; 
    guestTextbox.placeholder = 'Password...';
    guestTextbox.classList.add('password-details'); 

    // Append the textbox to the container
    guestPassword.appendChild(guestTextbox);
  } else {
    guestPassword.classList.remove('.password-details'); // Hide password field
	guestPassword.removeChild(guestTextbox);
  }
});
