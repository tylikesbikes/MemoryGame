const gameContainer = document.getElementById("game");
const startBtn = document.getElementById('startGame');
const resetBtn = document.getElementById('resetGame');
const COLORS = [
  "red",  "blue",  "green",  "orange",  "purple",  "red",  "blue",  "green",  "orange",  "purple","gray","gray"
];
let howManyStartingColors = COLORS.length;
let shuffledColors = shuffle(COLORS);
let gameStarted=false;
let score=howManyStartingColors * 30;
let waiting=false;
let guessCount=0;
let guesses=[];
let bestScore = (localStorage.bestMemoryScore || 0)
let bestScoreLabel = document.querySelector('#best');
let scoreLabel = document.querySelector('#current');
let gameInProgress=false;
scoreLabel.innerText=score;
bestScoreLabel.innerText=bestScore;


function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}



function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}



startBtn.addEventListener('click',function () {
  if(!gameStarted) createDivsForColors(shuffledColors);
  gameStarted=true;
});

resetBtn.addEventListener('click', function() {
  if(gameStarted) {
    waiting=false;
    score=200;
    scoreLabel.innerText=score;
    guessCount=0;
    guess=[];
    shuffledColors = shuffle(COLORS);

    const gameDivs=document.querySelectorAll('#game div');
    
    for (each of gameDivs){
      each.remove();
    }
    createDivsForColors(shuffledColors);
    }
  });




function handleCardClick(event) {
  if(!waiting) {
    if (event.target.classList.contains('guess') || event.target.classList.contains('matched')) {

    } else {
      score-=10;
      let scoreLabel = document.querySelector('#current');
      scoreLabel.innerText=score;
      guessCount+=1;
      guesses.push(event.target);
      event.target.style.backgroundColor=event.target.classList[0];
      event.target.classList+=' guess';
      if (guesses.length===2) {
        if (guesses[0].style.backgroundColor===guesses[1].style.backgroundColor) {
          guesses[0].className+=' matched';
          guesses[1].className+=' matched';
          guesses=[];
        }
        else {
          guesses[0].classList.toggle('guess');
          guesses[1].classList.toggle('guess');
          setTimeout(function() {
            guesses[0].style.backgroundColor='white';
          guesses[1].style.backgroundColor='white';
          guesses=[];
        },333);
        }
      }
    }
    if (document.querySelectorAll('.matched').length===howManyStartingColors) {
      setTimeout(function () {alert(`Game over!  It only took you ${guessCount} guesses`);},200);;
      
      if (score>bestScore) {
      localStorage.setItem('bestMemoryScore',score)}
    }
    waiting=true;
    setTimeout(function() {waiting=false},333);
  }
}


