let submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", function(){

    // checkInputs()

    let canAdd = checkInputs();

    if(canAdd == true){
    let container = document.querySelector(".extraContainer .meetingsContainer")

    let meeting = document.createElement("div")
    meeting.classList = "meeting"

    let title = document.createElement("h3")
    title.innerHTML = document.querySelector("#title").value

    let description = document.createElement("p")
    description.innerHTML = document.querySelector("#description").value
    description.classList = "description"

    let meetingDate = document.createElement("p")

    let startDateArr = document.querySelector("#start-date").value
    let endDateArr = document.querySelector("#end-date").value
    
    let startSplit = startDateArr.split('-')
    let endSplit = endDateArr.split('-')

    meetingDate.innerHTML = (startDateArr === endDateArr)?`${startSplit[1]} / ${startSplit[2]} / ${startSplit[0]}`:
    `${startSplit[1]} / ${startSplit[2]} / ${startSplit[0]} - ${endSplit[1]} / ${endSplit[2]} / ${endSplit[0]}`

    meetingDate.classList = "meetingDate"

    let meetingTime = document.createElement("p")
    let startTimeArr = document.querySelector("#start-time").value
    let endTimeArr = document.querySelector("#end-time").value

    let startTSplit = startTimeArr.split(':')
    let endTSplit = endTimeArr.split(':')

    meetingTime.innerHTML = `${startTimeArr} - ${endTimeArr}`
    meetingTime.classList = "meetingTime"
    
    const startDateTime = new Date(startDateArr)
    startDateTime.setHours(startTSplit[0], startTSplit[1])

    const endDateTime = new Date(endDateArr)
    endDateTime.setHours(endTSplit[0], endTSplit[1])

    const newEv = {
        'summary': document.querySelector("#title").value,
		'description': document.querySelector("#description").value,
		'start':{
			'dateTime': startDateTime.toISOString(),
			'timeZone': 'Asia/Manila'
		},
		'end':{
			'dateTime': endDateTime.toISOString(),
		  	'timeZone': 'Asia/Manila'
		},
        'colorId':9
    }
    console.log(newEv);

    funcOps('CREATE', newEv)

    meeting.appendChild(title)
    meeting.appendChild(description)
    meeting.appendChild(meetingDate)
    meeting.appendChild(meetingTime)

    container.appendChild(meeting)
    }

})


function checkInputs(){
    //Check title
    let title = document.querySelector("#title").value

    if(title === ""){
        return false;
    }

    //Check date
    let start_date = document.querySelector("#start-date").value
    let end_date = document.querySelector("#end-date").value

    if(start_date === "" || end_date === ""){
        return false;
    }

    //Check time
    let start_time = document.querySelector("#start-time").value
    let end_time = document.querySelector("#end-time").value

    if(start_time === "" || end_time === ""){
        return false;
    }

    //Check description
    let desc = document.querySelector("#description")

    if(desc === ""){
        return false;
    }

    return true;
}