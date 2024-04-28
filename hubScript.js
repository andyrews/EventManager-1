//For circular progress
let progressBar = document.querySelectorAll(".circular-progress");
let legendBar = document.querySelectorAll(".legendText");
let valueContainer = document.querySelectorAll(".value-container");
let todo = '#ADD8E6';
let done = '#355E3B';
let inprog = '#ff0000';


updateProgressBar();

function createLegends() {
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
    return table;
}

function updateProgressBar() {
    for (let i = 0; i < progressBar.length; i++) {
        let degree = parseInt(valueContainer[i].textContent);
        legendBar[i].appendChild(createLegends())
        progressBar[i].style.background = `conic-gradient(${inprog} ${10 * 3.6}deg, ${todo} ${10 * 3.6}deg ${70 * 3.6}deg, ${done} ${70 * 3.6}deg)`
    }
}
