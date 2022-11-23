//Variable Initialization
let uncoverCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let timer = false;
let clock = 60;
let initialClock = 60;
let regressiveTimeId = null;

//Appointing to HTML Document
let showMovements = document.getElementById('movements');
let showHits = document.getElementById('hits');
let showTime = document.getElementById('t-left');

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rigthAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

//Random Number Generation
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers);

//Functions
function countTime(){
    regressiveTimeId = setInterval(()=>{
        clock--;
        showTime.innerHTML = `Time : ${clock} seconds`; 
        if(clock == 0){
            clearInterval(regressiveTimeId);
            blockCards();
            loseAudio.play();
        }
    },1000);
}

function blockCards(){
    for (i = 0; i<=15; i++){
    let blockedCard = document.getElementById(i);
    blockedCard.innerHTML = `<img src="./img/${numbers[i]}.png" alt="">`;
    blockedCard.disabled = true;
    }
}

//Principal Function
function uncover(id){

    if(timer == false){
        countTime();
        timer = true;
    }

    uncoverCards++;
    console.log(uncoverCards)

    if(uncoverCards == 1){
        //Show 1st Number
        card1 = document.getElementById(id);
        firstResult = numbers[id]
        card1.innerHTML = `<img src="./img/${firstResult}.png" alt="">`;
        clickAudio.play();

        //Disable 1st Button
        card1.disabled = true;
    }else if(uncoverCards == 2){
        //Show 2nd Number
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = `<img src="./img/${secondResult}.png" alt="">`;

        //Disable 2nd Button
        card2.disabled = true;

        //Increase Movements
        movements++;
        showMovements.innerHTML = `Movements: ${movements}`;

        if(firstResult == secondResult){
            //Lock up uncovered cards
            uncoverCards = 0;

            //Increase Hits
            hits++;
            showHits.innerHTML = `Hits: ${hits}`;
            rigthAudio.play();

            if(hits == 8){
                winAudio.play();
                clearInterval(regressiveTimeId);
                showHits.innerHTML = `Hits: You got ${hits} hits!`
                showTime.innerHTML = ` You only took ${initialClock - clock} seconds!`
                showMovements.innerHTML = `Movements: You got ${movements} moves!`
            }

        }else{
            wrongAudio.play();
            //Show values momentarily & cover again
            setTimeout(()=>{
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                uncoverCards = 0;
            },800);
        }
    }

}