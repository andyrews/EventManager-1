const editForm = document.querySelector('.edit-user-container');
const addForm = document.querySelector('.add-user-container');

const showMemPop = document.querySelectorAll('.member-edit');
const memPopup = document.querySelector('.member-container-form');

const showGuestPop = document.querySelectorAll('.guest-edit');
const guestPopup = document.querySelector('.guest-container-form');

const showNewPop = document.querySelector('.add-btn');
const newPopup = document.querySelector('.new-container-form');

const deleteBtn = document.querySelectorAll('.delete-btn');
const saveEditBtn = document.querySelector('.save-edit-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const saveNewBtn = document.querySelector('.save-new-btn');

for (let i = 0; i < showMemPop.length; i++) {
    showMemPop[i].onclick = () => {
        editForm.classList.add('active');
        memPopup.classList.add('active');
    };
}

for (let i = 0; i < showGuestPop.length; i++) {
    showGuestPop[i].onclick = () => {
	editForm.classList.add('active');
	guestPopup.classList.add('active');
    };
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
