const addmeetForm = document.querySelector('.add-meeting-container');
const addmeetPopup = document.querySelector('.meeting-container-form');
const mtgTable = document.querySelector('.cust-table');

const addBtn = document.querySelector('.add-btn');
const cancelBtn = document.querySelectorAll('.cancel-btn');
const createBtn = document.querySelectorAll('.save-new-btn');

const saveEditBtn = document.querySelectorAll('.save-edit-btn');

const desCell = document.getElementById('meet-desc-new');
const dateCell = document.getElementById('meet-dtime-new');
const addCheckboxes = document.getElementById("add-checkboxes").querySelectorAll("input[type='checkbox']");

const editMeetForm = document.querySelector('.edit-meeting-container');
const editMeetPopup = document.querySelector('.edit-container-form');
const deletBtn = document.querySelectorAll('.delete-btn');
var tableRow = null;

/*========================================================*/
/*ADD MEETING*/
function openAddMeetPopup() {
	handleMeetPopups(true);
	resetNewMeetPopupInfo();
}

function createMeeting(){
	const addedRow = document.createElement('tr');
	let selectedRoles = outputAttendingRoles(addCheckboxes);
	
	for(var i = 1; i <= 5; i++){
		const addedColumn = document.createElement('td');
		switch(i){
			case 1:{
				addedColumn.textContent = desCell.value;
			}break;
			case 2:{
				addedColumn.textContent = selectedRoles;
			}break;
			case 3:{
				addedColumn.textContent = dateCell.value;
			}break;
			case 4:{
				const joinButton = document.createElement('button');
				joinButton.classList.add('join-button');
				
				joinButton.textContent='Join';
				addedColumn.appendChild(joinButton);
			}break;
			case 5:{
				const editUserButton = document.createElement('button');
				editUserButton.textContent='Edit Details';
				editUserButton.classList.add('edit-details');
				editUserButton.addEventListener('click', (popup)=>{setTableRow(popup);handleEditPopups(true)});
				addedColumn.appendChild(editUserButton);
			}
		}
		
		addedRow.appendChild(addedColumn);
	}
	mtgTable.appendChild(addedRow);
}

createBtn.forEach((b) => {
	b.addEventListener('click',()=>{createMeeting();handleMeetPopups(false);});
});

/*EDIT MEETING*/
saveEditBtn.forEach((b) => {//editMeeting
	b.addEventListener('click', ()=>{
		handleEditPopups(false);
		tableRow.children[0].textContent = document.getElementById('meet-desc-edit').value;
		tableRow.children[1].textContent = outputAttendingRoles(document.getElementById('edit-checkboxes').querySelectorAll("input[type='checkbox']"));
		tableRow.children[2].textContent = document.getElementById('meet-dtime-edit').value;
	});
});

/*DELETE MEETING*/
function deleteMeeting(){
	editMeetForm.classList.remove('active');
	editMeetPopup.classList.remove('active');
	tableRow.remove();
}

deletBtn.forEach((b) => {
	b.addEventListener('click',()=>{deleteMeeting();handleEditPopups(false);});
});

/*GENERAL*/
cancelBtn.forEach((b) => {
	b.addEventListener('click', ()=>handleMeetPopups(false));
	b.addEventListener('click', ()=>handleEditPopups(false));
});

/*HELPER*/

function handleMeetPopups(b){
	if(b){
		addmeetForm.classList.add('active');
		addmeetPopup.classList.add('active');
	}else{
		addmeetForm.classList.remove('active');
		addmeetPopup.classList.remove('active');		
	}
}

function handleEditPopups(b){
	if(b){
		let meetingDetRow = retrieveMeetDetails(tableRow);
		let meetingDesc = document.getElementById('meet-desc-edit');
		let meetingDtime = document.getElementById('meet-dtime-edit');
		
		editMeetForm.classList.add('active');
		editMeetPopup.classList.add('active');
		
		meetingDesc.value = meetingDetRow[0];
		updateEditBoxes(meetingDetRow[1].toLowerCase(), document.getElementById('edit-checkboxes').querySelectorAll("input[type='checkbox']"));
		meetingDtime.value = meetingDetRow[2];
	}else{
		editMeetForm.classList.remove('active');
		editMeetPopup.classList.remove('active');		
	}
}

function outputAttendingRoles(checkBoxes){
	let selectedRoles = "";
	for (const checkbox of checkBoxes) {
		if (checkbox.checked) {
			const label = document.querySelector(`label[for='${checkbox.id}']`);
			selectedRoles += (selectedRoles.length > 0 ? "/" : "") + label.textContent.trim();
		}
	}
	return selectedRoles;
}	

function updateEditBoxes(stringRoles, checkboxes){
	let selectedRoles = stringRoles.split("/");
	for (const checkbox of checkboxes) {
		if (selectedRoles.includes(checkbox.id)) {
			checkbox.checked = true;
		} else {
			checkbox.checked = false;
		}
	}
}

function resetNewMeetPopupInfo(){
	desCell.value = '';
	dateCell.value='';
	addCheckboxes.forEach(checkbox => checkbox.checked = false);
}

function setTableRow(popup){
	tableRow = popup.target.parentNode.parentNode;
}

function retrieveMeetDetails(det){
	let details = [];
	details[0] = det.children[0].textContent;
	details[1] = det.children[1].textContent;
	details[2] = det.children[2].textContent;
	
	return details;
}