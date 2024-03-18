//For toggling groups
let groups = document.querySelectorAll(".group")
// let taskList = groups.querySelector(".taskList")

window.onload = function(){
    for(let i = 0; i < groups.length; i++){
        let group = groups[i]
        let taskList = group.querySelector(".taskList")
    
        group.addEventListener("click", function(){
            if(taskList.style.display === "none"){
                taskList.style.display = "block"
            }else{
                taskList.style.display = "none";
            }
        })
    }
}