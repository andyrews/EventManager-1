/*Containers holding the popups*/
const editForm = document.querySelector('.edit-user-container');
const addForm = document.querySelector('.add-user-container');

/*Popup forms*/
const memPopup = document.querySelector('.member-container-form');
const guestPopup = document.querySelector('.guest-container-form');
const newPopup = document.querySelector('.new-container-form');

/*Buttons*/
const saveEditBtn = document.querySelectorAll('.save-edit-btn');
const cancelBtn = document.querySelectorAll('.cancel-btn');
const saveNewBtn = document.querySelector('.save-new-btn');

/**/
const userTable = document.getElementById('user-Table');
const selectShow = document.getElementById('new-user-roles');

/*Reassigned variables*/
var newEmail = document.getElementById('Email-new');
var passD = null;
var tableRow = null;

/*========================================================*/
/*ADD USER AND POPUP FUNCTIONALITIES*/
function openAddPopup(b) {
	let guestContainer = document.getElementById('guest-details-container');
	let guestTextbox = null; 

	handleNewPopups(true);
	selectShow.value = selectShow.selected;

	let inList = guestContainer.querySelector('.password-details'); 
	resetNewPopupInfo(inList, guestContainer);

	selectShow.addEventListener('change', () => {
		inList = guestContainer.querySelector('.password-details');
		const selectedGuestType = selectShow.value;

		if (isGuest(selectedGuestType) && !inList) {
			guestTextbox = document.createElement('input');
			guestTextbox.type = 'password';
			guestTextbox.placeholder = 'Password...';
			guestTextbox.classList.add('password-details');
			guestTextbox.setAttribute('required', true);
			guestContainer.appendChild(guestTextbox);
			inList = guestTextbox; 
		} else if (!isGuest(selectedGuestType) && inList) {
			guestContainer.removeChild(inList);
			guestTextbox = null; 
			inList = null; 
		}
	});
}

function addUser(){
	const addedRow = document.createElement('tr');
	for(var i = 1; i <= 3; i++){
		const addedColumn = document.createElement('td');
		switch(i){
			case 1:{
				addedColumn.textContent = newEmail.value;
				if(isGuest(selectShow.value)){
					updatePasswordDetails();
					addedColumn.textContent +='('+passD.value+')';
				}
			}break;
			case 2:{
				addedColumn.textContent = selectShow.value;
			}break;
			case 3:{
				const editUserButton = document.createElement('button');
				if(isGuest(selectShow.value)){
					editUserButton.classList.add('guest-edit');
				}else{
					editUserButton.classList.add('member-edit');
				}
				editUserButton.textContent='Edit User';
				editUserButton.addEventListener('click',openEditPopup);
				addedColumn.appendChild(editUserButton);
			}
		}
		addedRow.appendChild(addedColumn);
	}
	userTable.appendChild(addedRow);
}

saveNewBtn.addEventListener('click', ()=>{handleNewPopups(false);addUser();});

/*EDIT POPUP AND USER FUNCTIONALITIES*/

function openEditPopup(popup){
	setTableRow(popup);
	editForm.classList.add('active');
	
	let emailText = null;
	let editGuestPass = document.getElementById('Password');
	
	
	if(isGuest(tableRow.children[1].textContent)){
		let guestCreds = retrieveGuestCreds(tableRow.children[0].textContent);
		emailText = document.getElementById('Email-guest');
		editGuestPass.value = guestCreds[1];
		guestPopup.classList.add('active');
		emailText.value = guestCreds[0];
	}else{
		emailText = document.getElementById('Email-member');
		memPopup.classList.add('active');
		let roleSelect = document.getElementById('roles');

		emailText.value = tableRow.children[0].textContent;
		roleSelect.value = tableRow.children[1].textContent;
	}
}

saveEditBtn.forEach((b) => {//editUser
	b.addEventListener('click', closeEditPopups);
	b.addEventListener('click', ()=>{
		updatePasswordDetails();
		if(isGuest(tableRow.children[1].textContent)){
			let guestUser = document.getElementById('Email-guest').value;
			let guestPass = document.getElementById('Password').value;
			tableRow.children[0].textContent = guestUser+'('+guestPass+')';
		}else{
			let roleSelect = document.getElementById('roles');
			tableRow.children[0].textContent = document.getElementById('Email-member').value;
			tableRow.children[1].textContent = roleSelect.value;
		}
	});
});

/*DELETE FUNCTIONALITIES*/

function deleteUser(){
	editForm.classList.remove('active');
	if(isGuest(tableRow.children[1].textContent)){
		guestPopup.classList.remove('active');
	}else{
		memPopup.classList.remove('active');	
	}
	tableRow.remove();
}

/*GENERAL*/
cancelBtn.forEach((b) => {
	b.addEventListener('click', closeEditPopups);
	b.addEventListener('click', ()=> handleNewPopups(false));
});

/*=========HELPERS=========*/

function isGuest(b){
	return b === 'Guest';
}

function setTableRow(popup){
	tableRow = popup.target.parentNode.parentNode;
}

function handleNewPopups(b){
	if(b){
		addForm.classList.add('active');
		newPopup.classList.add('active');
	}else{
		 addForm.classList.remove('active');
		newPopup.classList.remove('active');
	}
}

function closeEditPopups() {
  editForm.classList.remove('active');
  guestPopup.classList.remove('active');
  memPopup.classList.remove('active');
};

function updatePasswordDetails(){
	passD = document.querySelector('.password-details');
}

function resetNewPopupInfo(inList, guestContainer){
	newEmail.value = '';
	if(inList){
		guestContainer.removeChild(passD);
		guestContainer.classList.remove('.password-details');
	}
}

function retrieveGuestCreds(text){
	return [text.split('(')[0],text.split('(')[1].slice(0,-1)];
}


