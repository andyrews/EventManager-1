const editForm = document.querySelector('.edit-user-container');
const addForm = document.querySelector('.add-user-container');

const memPopup = document.querySelector('.member-container-form');
const guestPopup = document.querySelector('.guest-container-form');
const newPopup = document.querySelector('.new-container-form');

const saveEditBtn = document.querySelector('.save-edit-btn');
const cancelBtn = document.querySelectorAll('.cancel-btn');
const saveNewBtn = document.querySelector('.save-new-btn');

const userTable = document.getElementById('user-Table');
const selectShow = document.getElementById('new-user-roles');
const newEmail = document.getElementById('Email-new');


const closeEditPopups = () => {
  editForm.classList.remove('active');
  guestPopup.classList.remove('active');
  memPopup.classList.remove('active');
};

const closeNewPopups = () => {
  addForm.classList.remove('active');
  newPopup.classList.remove('active');
};


var f = null;

function editUser(b){
	f = b.target.parentNode.parentNode;
	const username = f.children[0].textContent;
	editForm.classList.add('active');
	var emailText = null;
			
	if(isGuest(f.children[1].textContent)){
		emailText = document.getElementById('Email-guest');
		guestPopup.classList.add('active');

	}else{
		emailText = document.getElementById('Email-member');
		memPopup.classList.add('active');
		const role = f.children[1].textContent;
		var roleSelect = document.getElementById('roles');

		roleSelect.value = role;
	}
		emailText.value = username;
		
	
	
}

function isGuest(b){
	return b === 'Guest';
}

function addUser(b){
	addForm.classList.add('active');
	newPopup.classList.add('active');
	
	const guestTextbox = document.createElement('input');
	guestTextbox.type = 'password'; 
	guestTextbox.placeholder = 'Password...';
	guestTextbox.classList.add('password-details'); 
	guestTextbox.setAttribute('required', true);
	
	const passD = document.querySelector('.password-details');
	
	const guestContainer = document.getElementById('guest-details-container');
	const selectedValue = selectShow.value;
	console.log(selectedValue);
	if (isGuest(selectedValue) && !passD) {
		guestContainer.appendChild(guestTextbox);
	} else if(!isGuest(selectedValue) && passD) {
		console.log(guestTextbox);
		passD.remove();
		guestContainer.classList.remove('.password-details');
	}
}

const submitNewPopups = () => {
  addForm.classList.remove('active');
  newPopup.classList.remove('active');
  
  const addedRow = document.createElement('tr');
	const roleValue = selectShow.value;
	for(var i = 1; i <= 3; i++){
		const addedColumn = document.createElement('td');
		switch(i){
			case 1:{
				addedColumn.textContent = newEmail.value;
			}break;
			case 2:{
				addedColumn.textContent = roleValue;
			}break;
			case 3:{
				const editUserButton = document.createElement('button');
				if(isGuest(roleValue)){
					editUserButton.classList.add('guest-edit');
				}else{
					editUserButton.classList.add('member-edit');
				}
				editUserButton.textContent='Edit User';
				editUserButton.addEventListener('click',editUser);
				addedColumn.appendChild(editUserButton);
			}
		}
		addedRow.appendChild(addedColumn);
	}
	userTable.appendChild(addedRow);
};

function deleteUser(){
	editForm.classList.remove('active');
	if(isGuest(f.children[1].textContent)){
		guestPopup.classList.remove('active');
	}else{
		memPopup.classList.remove('active');	
	}
	f.remove();
}


selectShow.addEventListener('click', addUser);
saveEditBtn.addEventListener('click', closeEditPopups);

cancelBtn.forEach((b) => {
	b.addEventListener('click', closeEditPopups);
	b.addEventListener('click', closeNewPopups);
});
saveNewBtn.addEventListener('click', submitNewPopups);
