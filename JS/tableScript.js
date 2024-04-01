let groups = document.querySelectorAll(".group")
let tableContainer = document.querySelector(".tableExtraContainer")

let groupContainer = document.querySelector(".groupTask")
let groupTitle = document.querySelector("#groupTitleText") //This is for the title of the group
let addGroupBtn = document.querySelector(".addGroupBtn")

//This function is for when the user types in a title on the left tab
//and presses enter, adding a new group.
//Also creates a new table on the right hand side
addGroupBtn.addEventListener("click", function(){
    let newGroupTitle = groupTitle.value;

    if(newGroupTitle === ""){
        return
    }else{
        let group = document.createElement("div")
        group.classList = "group"

        let groupTitleDiv = document.createElement("div")
        groupTitleDiv.classList = "groupTitle"

        let icon = document.createElement("i")
        icon.classList = "fa-solid fa-angle-right"

        let title = document.createElement("p")
        title.innerHTML = newGroupTitle

        groupTitleDiv.appendChild(icon)
        groupTitleDiv.appendChild(title)
        
        group.appendChild(groupTitleDiv)

        //For due date
        let date = document.createElement("div")
        date.classList = "date"

        //From: 
        let divOne = document.createElement("div")
        let labelOne = document.createElement("label")
        labelOne.innerHTML = "Due Date:"

        let inputOne = document.createElement("input")
        inputOne.setAttribute("type", "date")
        inputOne.classList = "dueDate"
        inputOne.addEventListener("blur", function(){
            let dateArr = inputOne.value.split("-")
            
            if(dateArr.length > 1){
                let tableArr = document.querySelectorAll(".table")

                for(let i = 0; i < tableArr.length; i++){

                    if(tableArr[i].querySelector(".titleContainer p").innerHTML === newGroupTitle){
                        tableArr[i].querySelector(".titleContainer .tableDueDate").innerHTML = `${dateArr[1]} / ${dateArr[2]} / ${dateArr[0]}`
                    }

                    console.log(newGroupTitle);
                }
            }

        })

        divOne.appendChild(labelOne)
        divOne.appendChild(inputOne)

        date.appendChild(divOne)

        group.appendChild(date)

        group.addEventListener("click", function(e){

            if(e.target.parentNode.classList[0] === "group" || e.target.parentNode.classList[0] === "groupTitle"){
                if(group.classList.contains("active")){
                    group.classList.remove("active")
                }else{
                    group.classList.add("active")
                }
            }else{
                return
            }

        })
        
        groupContainer.appendChild(group)

        updateGroupsArray();
        createTable(newGroupTitle);

        groupTitle.value = "";
    }
})

//This function is for updating the groups array
//When user adds a new group, the group array is updated
function updateGroupsArray(){
    groups = document.querySelectorAll(".group")
}

//This function is used in the "addGroupBtn.addEventListener..."
//It's what helps add a new table on the right hand side
//When a user adds a new group
function createTable(tableTitle){
    let table = document.createElement("div")
    table.classList = "table"

    let titleContainer = document.createElement("div")
    titleContainer.classList = "titleContainer"
    let title = document.createElement("p")
    title.innerHTML = tableTitle
    let dueDate = document.createElement("p")
    dueDate.classList = "tableDueDate"
    dueDate.innerHTML = "Date not set" 

    titleContainer.appendChild(title)
    titleContainer.appendChild(dueDate)
    table.appendChild(titleContainer)

    let contentTable = document.createElement("table")
    contentTable.classList = "contentTable"

    let tbody = document.createElement("tbody")
    contentTable.appendChild(tbody)

    table.appendChild(contentTable)

    let createNewTask = document.createElement("div")
    createNewTask.classList = "createNewTask"

    let icon = document.createElement("i")
    icon.classList = "fa-solid fa-plus"

    let createTaskP = document.createElement("p")
    createTaskP.innerHTML = "Create task"
    
    let newBox = document.createElement("div")
    newBox.classList = "newBox"

    //-- This handles adding a new row to the table
    //This is for the "Create task" button in the (right-side) table view
    createNewTask.addEventListener("click", function(){
        //When user clicks on the "Create task button"
        //It opens up the overlay with the input text field
        if(createNewTask.classList != "active"){
            newBox.style.display = "block";
            createNewTask.classList.add("active")
        }
    })

    //This is for the input text field that appears after clicking
    //the "Create task" button.
    newBox.addEventListener("keyup", function(event){
        let textInput = newBox.querySelector("input").value;

        //If the user clicks enter
        if(event.keyCode == 13){
            if(textInput == ""){ //And the text field is empty, then the text field will disappear
                newBox.style.display = "none"
                createNewTask.classList.remove("active")
            }else{ //If the text field is not empty when user clicks enter
                //A new row is added 
                let row = document.createElement("tr")

                let taskTitle = document.createElement("td")
                taskTitle.classList = "taskTitle"
                taskTitle.innerHTML = textInput

                let taskProgress = document.createElement("td")
                taskProgress.classList = "taskProgress"

                let customSelect = document.createElement("div")
                customSelect.classList = "custom-select"

                let select = document.createElement("select")
                let optionOne = document.createElement("option")
                optionOne.value = "todo"
                optionOne.innerHTML = "TO DO"
                let optionTwo = document.createElement("option")
                optionTwo.value = "inprogress"
                optionTwo.innerHTML = "IN PROGRESS"
                let optionThree = document.createElement("option")
                optionThree.value = "done"
                optionThree.innerHTML = "DONE"

                select.appendChild(optionOne)
                select.appendChild(optionTwo)
                select.appendChild(optionThree)

                customSelect.appendChild(select)
                taskProgress.appendChild(customSelect)

                row.appendChild(taskTitle)
                row.appendChild(taskProgress)

                tbody.appendChild(row)
            }

        }
    })
    //-- This handles adding a new row to the table

    //This is for the overlay text input field
    let input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", "What is the task you want to add?")

    newBox.appendChild(input)

    createNewTask.appendChild(icon)
    createNewTask.appendChild(createTaskP)
    createNewTask.appendChild(newBox)

    table.appendChild(createNewTask)
    
    //Lastly, all information about new row is added into the table container
    tableContainer.appendChild(table)
}

//For searching
function search(){
    
    let searchBox = document.getElementById("search-bar-text").value.toUpperCase();
    let tables = document.querySelectorAll(".table")
    

    for(let i = 0; i < tables.length; i++){
        const titleContainer = tables[i].querySelector(".titleContainer")
        const title = titleContainer.querySelector("p")

        if(title){
            const textValue = title.textContent.toUpperCase()

            if(textValue.indexOf(searchBox) > -1){
                tables[i].style.display = "";
            }else{
                tables[i].style.display = "none";
            }
        }
    }

}

// //For getting date
// function getDateValue(e){
//     var dateArr = e.srcElement.value.split("-")

//     console.log(e.srcElement)

//     if(dateArr.length > 1){
//         //mm/dd/yyyy
//         console.log(`${dateArr[1]} / ${dateArr[2]} / ${dateArr[0]}`);
//     }
// }