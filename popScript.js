const editForm = document.querySelector('.edit-user-container');
const addForm = document.querySelector('.add-user-container');

const showMemPop = document.querySelector('.member-edit');
const memPopup = document.querySelector('.member-container-form');

const showGuestPop = document.querySelector('.guest-edit');
const guestPopup = document.querySelector('.guest-container-form');

const showNewPop = document.querySelector('.add-btn');
const newPopup = document.querySelector('.new-container-form');

const deleteBtn = document.querySelectorAll('.delete-btn');
const saveEditBtn = document.querySelector('.save-edit-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const saveNewBtn = document.querySelector('.save-new-btn');

showGuestPop.onclick = () => {
	editForm.classList.add('active');
	guestPopup.classList.add('active');
}

showMemPop.onclick = () => {
	editForm.classList.add('active');
	memPopup.classList.add('active');
}

showNewPop.onclick = () => {
	addForm.classList.add('active');
	newPopup.classList.add('active');
}


const closeEditPopups = () => {
  editForm.classList.remove('active');
  guestPopup.classList.remove('active');
  memPopup.classList.remove('active');
};

const closeNewPopups = () => {
  addForm.classList.remove('active');
  newPopup.classList.remove('active');
};


deleteBtn.forEach(btn => {
  btn.addEventListener('click', closeEditPopups);
});
saveEditBtn.addEventListener('click', closeEditPopups);
cancelBtn.addEventListener('click', closeNewPopups);
saveNewBtn.addEventListener('click', closeNewPopups);
