var startBtn = document.querySelector('#start-btn');
var myTimer = document.querySelector('#timer');
var currentQuestion = document.querySelector('#question')
var btn1 = document.querySelector('.click1');
var btn2 = document.querySelector('.click2');
var btn3 = document.querySelector('.click3');
var btn4 = document.querySelector('.click4');
var show = document.querySelectorAll('.hide');
var result= document.querySelector("#results")
var questionNumber = document.querySelector('#question-number')
var questionContainer = document.getElementById('question-container');
var quizContainer = document.querySelector('.container')
var tasker = document.querySelector('.task');
var answerBtn = document.querySelector('#answer-buttons').children
var playAgain = document.querySelector('.play-again');
var scoreContainer = document.querySelector('.highscore-container');



var dataset =[{
    question: "What tool would you use for styling your HTML?",
    options:[ 
    "AWS",
    "CSS",
   "MongoDB",
     "mySQL"],
     answer:1
    
 },{
    question:  "What capability does the JavaScript .push() Method?",  
    options:["Delete the enitre Array",
    "Add to the middle of the Array",
     "Add to the end of an Array",
    "Make prototype of an Array"],
    answer:2
 },{
    question:  "What does HTML stand for?",  
    options:["Hyper Text Mark-Up Language",
    "Hyper Tool Mark Language",
     "Home Tool Mark-Up Language",
     "Hyper Tech Mark-Up Language"],
     answer:0,
 },{
  question:  "What does CSS stand for?",     
   options:["Cascade Style Stuff",
   "Cascade Style Sheet",
    "Colored Style Sheet",
    "Computer System Style"],
    answer: 1,
    
 },{
   question: "How would you select all Dom Elements with the same class name?",
   options:["document.getElementById()",
  "document.getElementByClassName()",
  "documet.querySelectorAll()",
  "document.querySelector()"],
  answer:2
 }]

 var timeLeft = 60;

function countdown() {
  // var timeLeft = 60;
  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {

 timeLeft --
 myTimer.textContent = timeLeft;
  if(timeLeft === 0){
EndGame();
  clearInterval(timeInterval);
  myTimer.textContent = "--";

  }
  },1000);
}
countdown();

var numberContainer = document.querySelector('.bottom');

startGame = () =>{
    tasker.classList.add('hide')
   startBtn.classList.add("hide");
   myTimer.classList.remove('hide');
   questionContainer.classList.remove('hide');
   result.classList.remove('hide')
   numberContainer.classList.remove('hide')
   count = 0;
   scoreCount = 0
  //  countdown();
   //The start Game functions will call the Generate function
  //  generateQuestion();
  AnswerGenerator()
  AnswerResult();


}

AnswerResult = () => {
  for(i = 0; i < answerBtn.length; i++){
      answerBtn[i].addEventListener('click', function(e){
        console.log(count)
         var correctAnswerIdx = dataset[count].answer
         var correctAnswer = dataset[count].options[correctAnswerIdx];
         if (e.target.textContent.toLowerCase() === correctAnswer.toLowerCase()){
           result.classList.add('correct')
         score();
         count++
         }else{
           result.classList.add("wrong")
           timeLeft -= 5;
           count++
         }
         
          //  count++
           AnswerGenerator();
      })
     
  }
  // AnswerGenerator();/
}




AnswerGenerator = () =>{
  //   var   index = current.textContent
console.log(count)
  if( count=== dataset.length){
    EndGame();
     }else{
    for(var i=0; i<= count ; i++){
      console.log(count)
      
        var currentData = dataset[i];
      //   console.log(currentData);
        currentQuestion.textContent = currentData.question;
        btn1.textContent = currentData.options[0];
        btn2.textContent = currentData.options[1];
        btn3.textContent = currentData.options[2];
        btn4.textContent = currentData.options[3]; 
       questionNumber.textContent = count + "/" + dataset.length 
       
   
       }
    }
  
  }

  score = () => {
    scoreCount+= 5
    console.log("score:" + scoreCount)
    return scoreCount;
   
}


var scoreResults = document.querySelector('.complete');

EndGame = () => {
  // var scoreResults = document.querySelector('.complete');
  var  removeResult = document.querySelector('#results');
  var finalScore = document.querySelector('.your-score');
  
  numberContainer.classList.add('hide')
  finalScore.textContent = scoreCount;
  scoreResults.classList.remove('hide')
  removeResult.classList.add('hide');
  myTimer.classList.add('hide');
  questionContainer.classList.add('hide');
  scoreContainer.classList.remove('.hide')
submitScore();
}



submitScore = () =>{
  var submitBtn = document.getElementById('submit-btn')
  var nameEntry = document.getElementById('fname');
  // scoreContainer.classList.add('.hide')
submitBtn.addEventListener('click', function(){
 

  viewHighscores();
})

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5;
viewHighscores = () =>{

 var  scoreList = document.querySelector('.score-list');
 const highScoreList = document.querySelector('.highScoreList')
 scoreResults.classList.add('hide')
 scoreContainer.classList.remove('hide')
 scoreList.classList.remove('hide')


 var latest = { 
   topScores: scoreCount,
   name: nameEntry.value.toUpperCase(),
 }

 highScores.push(latest)
 highScores.sort(function(a,b){return b.topScores - a.topScores;})
 
 highScores.splice(5) 



localStorage.setItem('highScores' , JSON.stringify(highScores))
// console.log(topScores[2]);

highScoreList.innerHTML = highScores.map( score =>{
  return `<li class='highScore'> ${score.name}: ${score.topScores}</li>`
}).join("");

 playAgain.addEventListener('click', function(){

   scoreContainer.classList.add('.hide')
playGameAgain();
 })
}

playGameAgain = () =>{
  scoreContainer.classList.add('hide')
  window.open("./index.html")
}

}
 
  startBtn.addEventListener('click', startGame);

//Add another button to check if the answer is correct or not 



