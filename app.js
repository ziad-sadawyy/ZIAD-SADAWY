const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")


let questionCounter = 0;
let currentQuestion;
let avalableQuestion = [];
let avalableOptions = [];
let correctAnswers = 0;
let attempt = 0;


function setAvalableQuestion(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        avalableQuestion.push(quiz[i])
    }

}


function getNewQuestion(){

    quiz.length
    questionNumber.innerHTML = "السؤال" + (questionCounter + 1) + "من" + quiz.length;

    const questionIndex = avalableQuestion[Math.floor(Math.random() * avalableQuestion.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    const index1= avalableQuestion.indexOf(questionIndex);

    avalableQuestion.splice(index1,1);

 
    const optionLen = currentQuestion.options.length

    for(let i=0; i<optionLen; i++){
        avalableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;

    for(let i=-1; i<optionLen; i++){

        const optonIndex = avalableOptions.length;

        const index2 = avalableOptions.indexOf(optonIndex);

        avalableOptions.splice(index2,1)
        
     
        const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optonIndex];
    option.id = optonIndex;
    option.style.animationDelay =animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick","getResult(this)");
    }

    questionCounter++;
}

function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
       element.classList.add("correct");

       updateAnswersIndicator("correct");
       correctAnswers++;
    }else                            {
        element.classList.add("wrong");
        
        updateAnswersIndicator("wrong");

     const optionLen = optionContainer.children.length;
     for(let i=0; i<optionLen; i++){
        if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
            optionContainer.children[i].classList.add("correct");
        }
     }


    }
    attempt++;
    unclickableOptions();

}

function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0 ; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswersIndicator(markType){
        answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
    if(questionCounter === quiz.length){
      quizOver();
    }else{
        getNewQuestion();
    }
}

function quizOver(){

      quizBox.classList.add("hide");
      
      resultBox.classList.remove("hide");
      quizResult();

}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML =  attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz(){
     questionCounter = 0;
     correctAnswers = 0;
     attempt = 0;
}
 
function tryAgainQuiz(){
    resultBox.classList.add("hide");

    quizBox.classList.remove("hide");

    resetQuiz();
    startQuzi();
}


function startQuzi(){

     homeBox.classList.add("hide");

     quizBox.classList.remove("hide");

    setAvalableQuestion();
    getNewQuestion();
    answersIndicator();
}


window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}