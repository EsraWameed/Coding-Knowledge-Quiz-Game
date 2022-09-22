//our global variables
let timeleft;
let score;
let gameStart;
let currentQuestion_index;
let startButton= document.getElementById("startButton");
let choicesContainer= document.getElementById("choicesContainer");
let title= document.getElementById("title");
let scoreContainer = document.getElementById("scoreContainer");
let quizContainer = document.getElementById("quizContainer");
let scoreInput = document.getElementById("yourScore");
let replayButton = document.getElementById("replayButton");
let highScorePage = document.getElementById("highScorecontainer");
let buttonSubmit = document.getElementById("submit");
let questionEl= document.getElementById("question");
let listHighScoreEl = document.getElementById("high-score-list")
let initials = document.querySelector("yourInitials");
let timeDissapear= document.getElementById("countDown");
let gameRules= document.getElementById("rules");
//--------------------------------------------------------------
//create high score values
let createHighScore = function(event) { 
    event.preventDefault() 
    if (!initials) {
    alert("No initials were entered!");
    return;
  }

    buttonSubmit.reset();
    let HighScore = {
    initials: initials,
    score: score
} 

//push and sort scores
    HighScores.push(HighScore);
    HighScores.sort((a, b) => {return b.score-a.score});

//clear visibile list to resort
    while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
}
//create elements in order of high scores
    for (let i = 0; i < HighScores.length; i++) {
    let highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
}

    saveHighScore();
    displayHighScores();
}
//-----------------------------------------------------------------
function startpageDisplay(){
    highScorePage.style.display="none";
    //blank string means default
    quizContainer.style.display="";
    startButton.removeAttribute("class", "hide");
    title.removeAttribute("class", "hide");
}

function startQuiz(){
    gameStart=true;
    timeleft=20;
    timerBegin();
    score=0;
    currentQuestion_index=0;
    gameRules.setAttribute("class", "hide");
    startButton.setAttribute("class", "hide");
    title.setAttribute("class", "hide");
    getQuestions();
}

//dynamically render content
function getQuestions(){
    let currentQuestion = questions[currentQuestion_index];
//display the question from the array
    questionEl.textContent= currentQuestion.question;

    // create button for each choice 
    for (i=0; i<currentQuestion.choices.length; i++){
        //create button elements that holds the choices
        let choiceButton = document.createElement("button");
        choiceButton.textContent= currentQuestion.choices[i];
        choiceButton.setAttribute("style", "display: block");
        choicesContainer.append(choiceButton);
    }
}
//create function to handle question click, if user selected


// to display score
function scoreDisplay(){
    quizContainer.style.display="none";
    // display score here
    scoreContainer.style.display="flex";
    scoreInput.innerHTML=score;
}

// to display result page 

function highScorePageDisplay(){
    savedScores();
 scoreContainer.style.display = "none";
 highScorePage.style.display ="flex";
 getStoragevalue();
}

// local storage : 21-26 activity 25th and 26 
// add a timer that starts upon clicking start
function timerBegin(){
    var downloadTimer = setInterval(function(){  
    timeleft--;
 document.getElementById("countDown").textContent= timeleft
    if(timeleft <= 0 || gameStart===false){
 document.getElementById("countDown").textContent= ""
 choicesContainer.innerHTML= "";
 questionEl.innerHTML="";
 scoreDisplay();
    //   timeleft=0;
        clearInterval(downloadTimer);
        }
    },1000)} 

// upon each wrong  click deduct from timer
//check for actual input
//on click of submit, render your new score to a list of your stored scores in local storage

//event listeners at bottom of script
startButton.addEventListener("click", startQuiz);
choicesContainer.addEventListener("click", e =>{
    var element = e.target
    if ( element.matches ("button")){
        if (element.textContent=== questions[currentQuestion_index].answer){
            console.log ("correct");
            score+=5;
        }else{
            console.log("wrong");
            timeleft-=5;
        }
    if ( currentQuestion_index<questions.length-1){
       
        currentQuestion_index++;
        choicesContainer.innerHTML="";
        getQuestions();
    } else{
        gameStart=false;
// reach the last question. render the result page
    }
    }  
         
})
// user input saved to local storage, and can use getItem to put in out appended li
function savedScores(){
    localStorage.setItem(scoreInput.textContent, document.getElementById("yourInitials").value);
}

function getStoragevalue(){
    Object.keys(localStorage).forEach(function(key){
        var li = document.createElement("li");
        li.textContent= "Intials: " + localStorage.getItem(key) + " Score: " + key;
        document.getElementById("high-score-list").append(li);

    })
}
   
//add event listener to the submit button
 buttonSubmit.addEventListener("click", highScorePageDisplay);
replayButton.addEventListener("click",startpageDisplay);