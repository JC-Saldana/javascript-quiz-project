document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let timer;

  const startTimer = () => {
    clearInterval(timer)
    timer = setInterval(() => {
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults();
        return;
      }
      quiz.timeRemaining--;
      updateTiming();
    }, 1000);
  }

  const updateTiming = () => {
    const minutes = Math.floor(quiz.timeRemaining / 60);
    const seconds = quiz.timeRemaining % 60;
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `Remaining time ${minutes}:${seconds}`;
  }

  startTimer()

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  function showQuestion() {

    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();
    questionContainer.innerHTML = question.text

    const progressPercentage = (quiz.currentQuestionIndex / questions.length) * 100
    progressBar.style.width = `${progressPercentage}%`

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of 4`;

    question.choices.forEach(choice => {
      const choiceElement = document.createElement("div")
      choiceElement.innerHTML = `
        <div class="choice-element">
          <input id="${choice}" type="radio" name="question" value="${choice}">
          <label for="${choice}">${choice}</label>
          <br>
        </div>
      `
      choiceContainer.appendChild(choiceElement)
    });

  }

  function nextButtonHandler() {
    const choiceElements = document.querySelectorAll(".choice-element")
    choiceElements.forEach(choice => {
      const selectedChoiceButton = choice.getElementsByTagName("input")[0]
      const isButtonChecked = selectedChoiceButton.checked
      if (isButtonChecked) quiz.checkAnswer(selectedChoiceButton.value)
    })
    quiz.moveToNextQuestion()
    showQuestion()
  }

  function showResults() {
    clearInterval(timer)
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`;
  }

  const resetQuizButton = document.getElementById("restartButton")
  resetQuizButton.onclick = () => {
    quiz.restartQuiz()
    clearInterval(timer);
    updateTiming()
    startTimer()
    quiz.timeRemaining = quizDuration
    showQuestion()
    quizView.style.display = "flex";
    endView.style.display = "none";
  }

});
