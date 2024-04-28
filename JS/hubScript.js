//For circular progress
let progressBar = document.querySelectorAll(".circular-progress");
let valueContainer = document.querySelectorAll(".value-container");

updateProgressBar();

function updateProgressBar(){
    for(let i = 0; i < progressBar.length; i++){
        let degree = parseInt(valueContainer[i].textContent);
        console.log(degree);
        progressBar[i].style.background = `conic-gradient(#ff0000 ${1 * 3.6}deg, #D0D4DB ${degree * 3.6}deg)`
    }

}
