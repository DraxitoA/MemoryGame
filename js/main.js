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

let showMovements = document.getElementById('movements');
let showHits = document.getElementById('hits');
let showTime = document.getElementById('t-left');

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rigthAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers);

function countTime(){
    regressiveTimeId = setInterval(()=>{
        clock--;
        showTime.innerHTML = `Tiempo: ${clock}s`; 
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

function uncover(id){

    if(timer == false){
        countTime();
        timer = true;
    }

    uncoverCards++;
    console.log(uncoverCards)

    if(uncoverCards == 1){
        card1 = document.getElementById(id);
        firstResult = numbers[id]
        card1.innerHTML = `<img src="./img/${firstResult}.png" alt="">`;
        clickAudio.play();

        card1.disabled = true;
    }else if(uncoverCards == 2){
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = `<img src="./img/${secondResult}.png" alt="">`;

        card2.disabled = true;

        movements++;
        showMovements.innerHTML = `Movimientos: ${movements}`;

        if(firstResult == secondResult){
            uncoverCards = 0;

            hits++;
            showHits.innerHTML = `Aciertos: ${hits}`;
            rigthAudio.play();

            if(hits == 8){
                winAudio.play();
                clearInterval(regressiveTimeId);
                showHits.innerHTML = `Acertaste ${hits} veces...`
                showTime.innerHTML = `Demorastes ${initialClock - clock} segundos... ⌛`
                showMovements.innerHTML = `Hiciste ${movements} movimientos... 🧩`
            }

        }else{
            wrongAudio.play();
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
