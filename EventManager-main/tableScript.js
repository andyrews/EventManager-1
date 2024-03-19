let groups = document.querySelectorAll(".group")

//For adding new group
let groupContainer = document.querySelector(".groupTask")
let groupTitle = document.querySelector("#groupTitleText")
let addGroupBtn = document.querySelector(".addGroupBtn")

addGroupBtn.addEventListener("click", function(){
    let newGroupTitle = groupTitle.value;

    if(newGroupTitle === ""){
        return
    }else{

        //For entire Group
        let group = document.createElement("div")
        group.classList = "group"

        //For Group Box
        let groupTitleDiv = document.createElement("div")
        groupTitleDiv.classList = "groupTitle"

        let icon = document.createElement("i")
        icon.classList = "fa-solid fa-angle-right"

        let title = document.createElement("p")
        title.innerHTML = newGroupTitle

        groupTitleDiv.appendChild(icon)
        groupTitleDiv.appendChild(title)
        
        group.appendChild(groupTitleDiv)
        
        groupContainer.appendChild(group)

        updateGroupsArray();
    }

    console.log(groups);
})

function updateGroupsArray(){
    groups = document.querySelectorAll(".group")
}

