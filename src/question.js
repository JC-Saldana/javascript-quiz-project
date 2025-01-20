class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text
        this.choices = choices
        this.answer = answer
        if (difficulty < 1 || difficulty > 3) {
            throw new Error("Difficulty must be a number between 1 and 3.");
        }
        this.difficulty = difficulty
    }
    shuffleChoices() {
        this.choices = this.choices.sort(() => Math.random() - 0.5);
    }
}