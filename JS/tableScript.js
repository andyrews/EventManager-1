import {pushToList, getList, updateData} from '/JS/fireScript.js'
        let currentGroup;
        //let groups = document.querySelectorAll(".group")
        let tableContainer = document.querySelector(".tableExtraContainer")
        let fullAccess;
        let groupContainer = document.querySelector(".groupTask")
        let groupTitle = document.querySelector("#groupTitleText") //This is for the title of the group
        let addGroupBtn = document.querySelector(".addGroupBtn")

        //This function is for when the user types in a title on the left tab
        //and presses enter, adding a new group.
        //Also creates a new table on the right hand side

        const searchBarElement = document.getElementById("search-bar-text");
        searchBarElement.addEventListener("keyup", search);

        if(addGroupBtn){
        addGroupBtn.addEventListener("click", function(){
            let newGroupTitle = groupTitle.value;
            if(newGroupTitle === ""){
                return;
            } else {
                // Save groupTitle and newGroupTitle to Firebase Realtime Database
                let id = uuidv4()
                const resource = {
                    groupTitle: newGroupTitle,
                    groupId: id
                };
                try{
                    pushToList('groups', resource, false)
                    createGroupElement(newGroupTitle);
                    createTable(newGroupTitle, id);
                    groupTitle.value = ''
                }catch(error){
                    alert('Error encountered when adding group')
                }
            }
        })
    }
        function createTaskTemp(body, textInput, uniqueKey, status){
            console.log(uniqueKey)
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
            
            if(status !== undefined){
                console.log(status)
                switch(status){
                    case 'todo': break;
                    case 'inprogress': optionTwo.selected = true
                    break;
                    case 'done': optionThree.selected = true
                }
            }

            select.appendChild(optionOne)
            select.appendChild(optionTwo)
            select.appendChild(optionThree)

            select.addEventListener('change', (selectV) => {
                const update = {status:selectV.target.value}
                updateData(update, `groups/TASK_CONTAINER/${uniqueKey}`)
            })

            if(!fullAccess){
                select.disabled = true;
            }

            customSelect.appendChild(select)
            taskProgress.appendChild(customSelect)

            row.appendChild(taskTitle)
            row.appendChild(taskProgress)

            body.appendChild(row)
        }

        // Function to create a group element
        function createGroupElement(newGroupTitle) {
            let group = document.createElement("div");
            group.classList = "group";

            let groupTitleDiv = document.createElement("div");
            groupTitleDiv.classList = "groupTitle";

            let icon = document.createElement("i");
            icon.classList = "fa-solid fa-angle-right";

            let title = document.createElement("p");
            title.innerHTML = newGroupTitle;
            title.setAttribute("data-title", newGroupTitle); // Add data-title attribute

            groupTitleDiv.appendChild(icon);
            groupTitleDiv.appendChild(title);
            
            group.appendChild(groupTitleDiv);
            
            groupContainer.appendChild(group);
        }

        //This function is for updating the groups array
        //When user adds a new group, the group array is updated
        function updateGroupsArray(){
            groups = document.querySelectorAll(".group")
        }
        function createTableTemplate(tableTitle, cKey){
            let table = document.createElement("div")
            table.classList = "table"
            table.dataset.dbKey = cKey

            let titleContainer = document.createElement("div")
            titleContainer.classList = "titleContainer"
            let title = document.createElement("p")
            title.innerHTML = tableTitle

            titleContainer.appendChild(title)
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

            return [table, titleContainer, title, contentTable,
                    tbody, createNewTask, icon, createTaskP, 
                    newBox]
        }

        //This function is used in the "addGroupBtn.addEventListener..."
        //It's what helps add a new table on the right hand side
        //When a user adds a new group
        function createTable(tableTitle, cKey){
            let components = createTableTemplate(tableTitle, cKey)

            //-- This handles adding a new row to the table
            //This is for the "Create task" button in the (right-side) table view
            if(fullAccess){
            components[5].addEventListener("click", function(){
                //When user clicks on the "Create task button"
                //It opens up the overlay with the input text field
                if(!components[5].classList.contains("active")){
                    components[8].style.display = "block";
                    components[5].classList.add("active")
                }
                setCurrentGroup(this)
            })
        
            //This is for the input text field that appears after clicking
            //the "Create task" button.
            components[8].addEventListener("keyup", function(event){
                let textInput = components[8].querySelector("input").value;

                //If the user clicks enter
                if(event.keyCode == 13){
                    if(textInput != ""){ //If the text field is not empty when user clicks enter
                        // Get the group ID for the current group
                        const groupId = document.querySelector('.groupTitle p').textContent;
                        // Save the task to Firebase Realtime Database under the respective group title
                        const contKey = currentGroup.dataset.dbKey
                        const resource = {
                            task: textInput,
                            status: 'todo', // You can add additional fields as needed
                            groupId: contKey
                        };
                        //since true, a uniqueId is added to the task
                        pushToList("groups/TASK_CONTAINER", resource, true)
                        // A new row is added 
                        createTaskTemp(components[4], textInput, resource['uniqueId'])
                        
                        // Clear the input field and hide the overlay
                        components[8].querySelector("input").value = "";
                        components[8].style.display = "none";
                        components[5].classList.remove("active");
                    }
                }
            })
        
            //-- This handles adding a new row to the table

            //This is for the overlay text input field
            let input = document.createElement("input")
            input.setAttribute("type", "text")
            input.setAttribute("placeholder", "What is the task you want to add?")

            components[8].appendChild(input)

            components[5].appendChild(components[6])
            components[5].appendChild(components[7])
            components[5].appendChild(components[8])

            components[0].appendChild(components[5])
        }  
            //Lastly, all information about new row is added into the table container
            tableContainer.appendChild(components[0])
        }
        
        
        // Fetch group titles and tasks from Firebase when the page loads
        window.onload = async function() {
            fullAccess = canWriteRead();
            let list = await getList('groups')
            if(list.exists()){
                list.forEach( (data) => {                    
                    const values = data.val()
                    if(values.hasOwnProperty('groupId') && values.hasOwnProperty('groupTitle')){
                        createGroupElement(values.groupTitle)
                        createTable(values.groupTitle, values.groupId)
                    }else{
                        Object.values(values).forEach((taskData)=>{
                            const findGroup = document.querySelector(`.table[data-db-key="${taskData.groupId}"] .contentTable`)
                            const tbody = document.createElement('tbody')
                            createTaskTemp(tbody, taskData.task, taskData.uniqueId, taskData.status)
                            findGroup.appendChild(tbody)
                        
                        })
                    }
                });
            }
        };
        function setCurrentGroup(groupN){
            currentGroup = groupN.parentElement;
        }

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

        function canWriteRead(){
            const bodyEl = document.querySelector('body')
            return (bodyEl.dataset.roleK === 'guest')?false:true
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