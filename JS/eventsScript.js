import {writeData, getSpecRow} from "/JS/fireScript.js"

let submitBtn = document.querySelector("#submitBtn");
let eventBlock;

submitBtn.addEventListener("click", async function(){
    let eventDet;
    let canAdd = checkInputs();

    if(canAdd){
        let container = document.querySelector(".extraContainer .meetingsContainer")

        let eventItem = document.createElement("div")
        eventItem.classList = "event-d"

        //top with title, edit and delete
        let outerDiv = document.createElement("div");
        let titleDiv = document.createElement("div");
        let editdelDiv = document.createElement("div");
    
        outerDiv.className="header-btns"

        titleDiv.id="for-title"
        editdelDiv.id="for-editdel"

        let title = document.createElement("h3")
        title.innerHTML = document.querySelector("#title").value
    
        let edit_icon = document.createElement("i");
        edit_icon.classList.add("fa-solid", "fa-pen-to-square");
        edit_icon.id = "edit-event-button"
        edit_icon.addEventListener('click',(e)=>{
            setEventBlock(e)
            fillEditInputs();
        })

        let remove_icon = document.createElement("i");
        remove_icon.classList.add("fa-solid", "fa-xmark");
        remove_icon.id = "remove-event-button"
        remove_icon.addEventListener('click',(e)=>{
            setEventBlock(e)
            deleteSpec()
            funcOps('DELETE', eventItem.dataset.eventId)
        })


        let description = document.createElement("p")
        description.innerHTML = document.querySelector("#description").value.trim()
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
        try{ 
            if(getSpecRow())
		    funcOps('CREATE',newEv);
		    await wait(2700);

		    await getEventRes().then(result => {
			    eventDet = result;
	  	    })
		    writeData(addedRow.children[7].value, 'Event', eventDet)
         
	    }catch(error){
		    alert('Error: cannot add event')
		    console.log(error)
	    }

        eventItem.dataset.eventId = eventDet.id

        titleDiv.appendChild(title)
        editdelDiv.appendChild(edit_icon)
        editdelDiv.appendChild(remove_icon)

        outerDiv.appendChild(titleDiv)
        outerDiv.appendChild(editdelDiv)

        eventItem.appendChild(outerDiv)
        eventItem.appendChild(description)
        eventItem.appendChild(meetingDate)
        eventItem.appendChild(meetingTime)

        container.appendChild(eventItem)

        clearInputs();
    }
})

function reformatToDate(d){
    const parts = d.split("-");
    if(parts.length === 2){
        const startDate = parts[0].replaceAll(/\s/g,'').split('/')
        const endDate = parts[1].replaceAll(/\s/g,'').split('/')
        return [`${startDate[2]}-${startDate[0]}-${startDate[1]}`, 
                `${endDate[2]}-${endDate[0]}-${endDate[1]}`]
    }
    return [`${parts[2]}-${parts[0]-1}-${parts[1]}`]; 
}

function fillEditInputs(){
    const pElements = eventBlock.querySelectorAll("div.event-d p")
    const statedDate = reformatToDate(pElements[1].innerHTML)
    const splitTimes = pElements[2].innerHTML.split('-');

    document.querySelector("#title").value = eventBlock.querySelector("div#for-title h3").innerHTML;
    document.querySelector("#description").value = pElements[0].innerHTML
    document.querySelector("#start-date").value = statedDate[0]
    document.querySelector("#end-date").value = (statedDate.length === 2)?statedDate[1]:statedDate[0]
    document.querySelector("#start-time").value = `${splitTimes[0].trim()}:00`
    document.querySelector("#end-time").value = `${splitTimes[1].trim()}:00`
}

function clearInputs(){
    document.querySelector("#title").value = ""
    document.querySelector("#description").value = ""
    document.querySelector("#start-date").value = ""
    document.querySelector("#end-date").value = ""
    document.querySelector("#start-time").value = ""
    document.querySelector("#end-time").value = ""
}

function deleteSpec(){
    eventBlock.remove()
}

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

function setEventBlock(e){
    eventBlock = e.target.parentNode.parentNode.parentNode
}