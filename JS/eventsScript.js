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

    let dateArr = document.querySelector("#date").value.split("-")

    meetingDate.innerHTML = `${dateArr[1]} / ${dateArr[2]} / ${dateArr[0]}`
    meetingDate.classList = "meetingDate"

    let meetingTime = document.createElement("p")
    meetingTime.innerHTML = document.querySelector("#time").value
    meetingTime.classList = "meetingTime"

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
    let date = document.querySelector("#date").value

    if(date === ""){
        return false;
    }

    //Check time
    let time = document.querySelector("#time").value

    if(time === ""){
        return false;
    }

    //Check description
    let desc = document.querySelector("#description")

    if(desc === ""){
        return false;
    }

    return true;
}