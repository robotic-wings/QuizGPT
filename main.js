        
import { INFO1910_Paper } from "./info1910.js";

window.onload = function() {
    console.log(`Welcome to the GPT Exam Paper Generator!`);
    console.log(`Setting up the exam...`);
    // Change to any other exam paper templates you want to use
    const exam = new INFO1910_Paper();
    const content = document.getElementById('content');
    content.innerHTML = exam.getHTML();
    console.log(`Exam setup complete! Type 'exam' in the console to manipulate the data.`);
    window.exam = exam;
}

window.render = function() {
    document.getElementById('content').innerHTML = window.exam.getHTML();
}

window.delQuestion = function(section, number) {
    window.exam.sections[section].questions.splice(number - 1, 1);
}

// Quick commands
window.delop = (n) => {
    window.exam.sections["Output Predicting"].questions.splice(n - 1, 1);
    render();
}

window.delcode = (n) => {
    window.exam.sections["Coding"].questions.splice(n - 1, 1);
    render();
}

window.delbf = (n) => {
    window.exam.sections["Bug-fixing"].questions.splice(n - 1, 1);
    render();
}

window.deldisc = (n) => {
    window.exam.sections["Discussion"].questions.splice(n - 1, 1);
    render();
}

window.addop = async (n) => {
    for (let i = 0; i < n; i++) {
        await window.exam.generateOutputPredictingQuestion();
        render();
    }
}

window.addbf = async (n) => {
    for (let i = 0; i < n; i++) {
        await window.exam.generateBugFixingQuestion();
        render();
    }
}

window.adddisc = async (n) => {
    for (let i = 0; i < n; i++) {
        await window.exam.generateDiscussionQuestion();
        render();
    }
}

window.addcode = async (n) => {
    for (let i = 0; i < n; i++) {
        await window.exam.generateCodingQuestion();
        render();
    }
}