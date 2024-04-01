import {writeData, getSpecRow} from "/JS/fireMeetingsScript.js"

/*========================================================*/
const addmeetForm = document.querySelector('.add-meeting-container');
const addmeetPopup = document.querySelector('.meeting-container-form');
const mtgTable = document.querySelector('.cust-table');

const addBtn = document.querySelector('.add-btn');
const cancelBtn = document.querySelectorAll('.cancel-btn');
const createBtn = document.querySelectorAll('.save-new-btn');

const saveEditBtn = document.querySelectorAll('.save-edit-btn');
const nameCell = document.getElementById('meet-name-new');
const desCell = document.getElementById('meet-desc-new');

const dateStartCell = document.getElementById('meet-dtime-start-new');
const dateEndCell = document.getElementById('meet-dtime-end-new');
const addCheckboxes = document.getElementById("add-checkboxes").querySelectorAll("input[type='checkbox']");

const editMeetForm = document.querySelector('.edit-meeting-container');
const editMeetPopup = document.querySelector('.edit-container-form');
const deletBtn = document.querySelectorAll('.delete-btn');
var tableRow = null;
let eventDet = null;
/*========================================================*/
/*ADD MEETING*/
addBtn.addEventListener('click',() => {
	handleMeetPopups(true);
	resetNewMeetPopupInfo();
})

function verifyOtherAddValues(){
	let atLeastOneBox = false;
	let errors = "";
	if(new Date(dateStartCell.value) >= new Date(dateEndCell.value)){
		errors += "-Invalid Date!\n";
	}
	for (const checkbox of addCheckboxes) {
		if (checkbox.checked) {
			atLeastOneBox = true;
			break;
		}
	}

	if(!atLeastOneBox) errors += "-Error no attending roles!" 
	if(errors !== "")alert(errors);
	return errors;
}

function populateRow(addedRow){
	for(var i = 1; i <= 8; i++){
		const addedColumn = document.createElement('td');
		switch(i){
			case 1:{
				addedColumn.textContent = nameCell.value;
			}break;
			case 2:{
				addedColumn.textContent = desCell.value;
			}break;
			case 3:{
				addedColumn.textContent = outputAttendingRoles(addCheckboxes);
			}break;
			case 4:{
				addedColumn.textContent = dateStartCell.value;
			}break;
			case 5:{
				addedColumn.textContent = dateEndCell.value;
			}break;
			case 6:{
				const joinButton = document.createElement('button');
				joinButton.classList.add('join-button');
				joinButton.addEventListener('click', () => {
					window.open(`https://meet.google.com/${eventDet.conferenceData.conferenceId}`, '_blank');
				  });
				joinButton.textContent='Join';
				addedColumn.appendChild(joinButton);
			}break;
			case 7:{
				const editUserButton = document.createElement('button');
				editUserButton.textContent='Edit Details';
				editUserButton.classList.add('edit-details');
				editUserButton.addEventListener('click', (popup)=>{
					setTableRow(popup);
					handleEditPopups(true)
					getSpecRow(tableRow.children[7].value, 'Meetings')
					//let g = getEvent(new Date(tableRow.children[3].value), new Date(tableRow.children[4].value))
					
				});
				addedColumn.appendChild(editUserButton);
			}break;
			case 8:{
				addedColumn.textContent = uuidv4()
				addedColumn.style.fontSize = 'smaller';
			}
		}
		addedRow.appendChild(addedColumn);
	}
}

async function createMeeting(){
	const addedRow = document.createElement('tr');

	if(verifyOtherAddValues() !== ""){
		handleMeetPopups(false);
		return;
	}
	//Google Calendar Part

	let start = new Date(dateStartCell.value);
	let end = new Date(dateEndCell.value);

	const startDate = start;
	const endDate = end

	const newEv = {
		'summary': nameCell.value +' (Meeting)',
		'description': desCell.value,
		'start':{
			'dateTime': startDate,
			'timeZone': 'Asia/Manila'
		},
		'end':{
			'dateTime': endDate,
		  	'timeZone': 'Asia/Manila'
		},
		'conferenceData': {
			'createRequest': {
			  'conferenceSolutionKey': {
				'type': 'hangoutsMeet'
			  },
			  'requestId': uuidv4()
			}
		  }
	};	

	//dconsole.log(newEv);
	try{
		funcOps('CREATE',newEv);
		await wait(2700);

		await getEventRes().then(result => {
			eventDet = result;
	  	})
		populateRow(addedRow);
		writeData(addedRow.children[7].value, 'Meetings', eventDet)
		mtgTable.appendChild(addedRow);
	}catch(error){
		alert('Error: cannot add meeting')
		console.log(error)
	}
}

createBtn.forEach((b) => {
	b.addEventListener('click',()=>{createMeeting();handleMeetPopups(false);});
});

/*EDIT MEETING*/
saveEditBtn.forEach((b) => {//editMeeting
	b.addEventListener('click', ()=>{
		handleEditPopups(false);
		let meetingName = document.getElementById('meet-name-edit');
		let meetingDesc = document.getElementById('meet-desc-edit');
		let meetingRoles = document.getElementById('edit-checkboxes').querySelectorAll("input[type='checkbox']");
		let meetingStartTime = document.getElementById('meet-dtime-start-edit');
		let meetingEndTime = document.getElementById('meet-dtime-end-edit');

		tableRow.children[0].textContent = meetingName.value;
		tableRow.children[1].textContent = meetingDesc.value;
		tableRow.children[2].textContent = outputAttendingRoles(meetingRoles);
		tableRow.children[3].textContent = meetingStartTime.value;
		tableRow.children[4].textContent = meetingEndTime.value;

		const updRes = {
			'summary': meetingName.value +' (Meeting)',
			'description': meetingDesc.value,
			'start':{
				'dateTime': new Date(meetingStartTime.value),
				'timeZone': 'Asia/Manila'
			},
			'end':{
				'dateTime': new Date(meetingEndTime.value),
				  'timeZone': 'Asia/Manila'
			},
		};
		console.log(updRes)	

		funcOps('UPDATE', eventDet.id, updRes)
	});
});

/*DELETE MEETING*/
function deleteMeeting(){
	editMeetForm.classList.remove('active');
	editMeetPopup.classList.remove('active');
	tableRow.remove();
}

deletBtn.forEach((b) => {
	b.addEventListener('click',()=>{
		deleteMeeting();
		handleEditPopups(false);
		funcOps('DELETE', eventDet.id)
	});
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
		//get Row
		let meetingDetRow = retrieveMeetDetails(tableRow);
		//get edit element ids
		let meetingName = document.getElementById('meet-name-edit');
		let meetingDesc = document.getElementById('meet-desc-edit');
		let meetingRoles = document.getElementById('edit-checkboxes').querySelectorAll("input[type='checkbox']");
		let meetingStartTime = document.getElementById('meet-dtime-start-edit');
		let meetingEndTime = document.getElementById('meet-dtime-end-edit');
		
		meetingName.value = meetingDetRow[0];
		meetingDesc.value = meetingDetRow[1];
		updateEditBoxes(meetingDetRow[2].toLowerCase(), meetingRoles);
		meetingStartTime.value = meetingDetRow[3];
		meetingEndTime.value = meetingDetRow[4];

		editMeetForm.classList.add('active');
		editMeetPopup.classList.add('active');
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
	if(nameCell.value !== ''){
		nameCell.value = '';
	}
	if(desCell.value !== ''){
		desCell.value = '';
	}
	if(dateStartCell.value !== ''){
		dateStartCell.value = '';
	}
	if(dateEndCell.value !== ''){
		dateEndCell.value = '';
	}
	addCheckboxes.forEach(checkbox => checkbox.checked = false);
}

function setTableRow(popup){
	tableRow = popup.target.parentNode.parentNode;
}

function retrieveMeetDetails(det){
	let details = [];
	for (const child of det.children) {
		details.push(child.textContent);
	  }
	
	return details;
}

function fillTable(){

}