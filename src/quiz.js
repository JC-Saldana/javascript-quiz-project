class Quiz {

    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }

    moveToNextQuestion() {
        this.currentQuestionIndex += 1
    }

    shuffleQuestions() {
        this.questions = this.questions.sort(() => Math.random() - 0.5);
    }

    checkAnswer(answer) {
        const isAnswerCorrect = answer === this.questions[this.currentQuestionIndex].answer
        if (isAnswerCorrect) this.correctAnswers += 1
        return isAnswerCorrect
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        }
        if (this.currentQuestionIndex === this.questions.length) {
            return true
        }
    }

    filterQuestionsByDifficulty(difficulty) {
        if (difficulty < 1 || difficulty > 3 || typeof difficulty !== "number") return
        const filteredQuestions = this.questions.filter(question => question.difficulty === difficulty)
        this.questions = filteredQuestions
    }

    averageDifficulty() {
        const sumOfDifficulties = this.questions.reduce((acc, question) => acc + question.difficulty, 0)
        return sumOfDifficulties / this.questions.length
    }

}
