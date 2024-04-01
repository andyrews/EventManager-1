//For circular progress
let progressBar = document.querySelectorAll(".circular-progress");
let valueContainer = document.querySelectorAll(".value-container");

updateProgressBar();

function updateProgressBar(){
    for(let i = 0; i < progressBar.length; i++){
        let degree = parseInt(valueContainer[i].textContent);

        progressBar[i].style.background = `conic-gradient(#000000 ${degree * 3.6}deg, #D0D4DB ${degree * 3.6}deg)`
    }

}
