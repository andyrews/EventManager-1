import {getList } from "/JS/fireScript.js";

//For circular progress
let progressBar = document.querySelectorAll(".circular-progress");
let legendBar = document.querySelectorAll(".legendText");
let valueContainer = document.querySelectorAll(".value-container");
let todo = '#ADD8E6';
let done = '#355E3B';
let inprog = '#ff0000';
var progContain = document.querySelector('.progressContainer')

//updateProgressBar();
function createGroupProg(key, progtext, taskNum) {
    const div = document.createElement("div")
    div.className="groupProgress"
    div.dataset.dbKey = key;
    div.appendChild(createGroupText(progtext, taskNum));

    progContain.appendChild(div)
}

function createLegends() {
    const legendDiv = document.createElement("div");
    legendDiv.className="legendText"
    const table = document.createElement("table");
    table.style.width = '100%';

    const divtodo = document.createElement("div");
    divtodo.className = 'todoLegend'
    const divdone = document.createElement("div");
    divdone.className = 'doneLegend'
    const divinprog = document.createElement("div");
    divinprog.className = 'progLegend'

    divtodo.style.backgroundColor = todo;
    divdone.style.backgroundColor = done;
    divinprog.style.backgroundColor = inprog;

    for (let i = 1; i <= 3; i++) {
        const row = table.insertRow();
        const td1 = row.insertCell();
        const td2 = row.insertCell();
        const label = document.createElement("p");
        switch (i) {
            case 1: {
                label.textContent = `TODO(${45})`
                td1.appendChild(divtodo)
                td2.appendChild(label)
            } break;
            case 2: {
                label.textContent = `DONE(${45})`
                td1.appendChild(divdone)
                td2.appendChild(label)
            } break;
            case 3: {
                label.textContent = `INPROGRESS(${45})`
                td1.appendChild(divinprog)
                td2.appendChild(label)
            }
        }
    }
    legendDiv.appendChild(table)
    return legendDiv;
}

function updateProgressBar() {
    for (let i = 0; i < progressBar.length; i++) {
        let degree = parseInt(valueContainer[i].textContent);
        legendBar[i].appendChild(createLegends())
        progressBar[i].style.background = `conic-gradient(${inprog} ${10 * 3.6}deg, ${todo} ${10 * 3.6}deg ${70 * 3.6}deg, ${done} ${70 * 3.6}deg)`
    }
}

function createGroupText(progT, tasksNum) {
    const groupText = document.createElement("div")
    groupText.className="groupText"

    const progH = document.createElement("h4")
    progH.className="progressTitle"
    progH.textContent = progT

    const overallTasksNum = document.createElement("p")
    overallTasksNum.className="progressTaskNum"
    overallTasksNum.textContent = `${tasksNum[0]} tasks`

    groupText.appendChild(progH)
    groupText.appendChild(overallTasksNum)
    return groupText
}

window.onload = async function () {
    let list = await getList('groups')
    let container_list = await getList('groups/TASK_CONTAINER')
    if (list.exists()) {
        list.forEach((data) => {
            const values = data.val()
            if (values.hasOwnProperty('groupId') && values.hasOwnProperty('groupTitle')) {
                let containerTasks = getTaskStats(values.groupId, container_list)
                createGroupProg(values.groupId, values.groupTitle,containerTasks)
            }
        });
    }
};
function updateStatsArray(task, stats) {
    console.log(task.status.toLowerCase())
    switch (task.status) {
        case "todo": stats[1]++;
            break;
        case "done": stats[2]++;
            break;
        case "inprogress": stats[3]++;
    }
    stats[0]++;
}

function getTaskStats(groupId, arr) {
    const stats = [0, 0, 0, 0];
    if(arr.exists()){
        arr.forEach((data) => {
            let val = data.val()
            console.log(data.groupId)
            if(val.groupId === groupId){updateStatsArray(val, stats)}
        })
    }
    return stats
}