import { parseHTML, Question, ExamPaper } from './gpt-quiz.js';

const examScopePrompt = `
- Structure charts-flow control
- Arrays
- Library functions, input and output
- Addresses and Pointer types
- Functions and top-down designs
- Preprocessors
`;

const learningGoalPrompt = `
LO1. employ programming style conventions for writing consistently readable code
LO2. design and construct new functionality to existing procedural program or function
LO3. compose a structured algorithmic design to solve the descriptive problem specification
LO4. compose an entire procedural program from descriptive problem specification
LO5. translate general programming problems between two distinctly differing procedural programming languages
LO6. demonstrate an understanding of programming principles, data types, variables and operators, control-flow: simple statement, sequence, if-then-else, while, functions: stack, input/output, reference memory model
LO7. compose, analyse and trace procedural code, scoping/variable lifetime, memory of the stack, references and globals, data types, operations on data types
LO8. construct code cliches for input and manipulating arrays, including maximum, minimum, search or traverse, with actions on each element for counting or summation
LO9. construct and assess code for recursively-defined numerical functions, and for recursively described array manipulations
LO10. apply testing methods and assess programs through debugging, write a set of tests for a small program or function
LO11. explain compilation process and debugging mechanism
LO12. use standard library functions
LO13. explain processing, memory and internal operations of procedural programming
`;

const codeRequirementPrompt = `
Code writing requirements for ChatGPT:
1. Remember to add a backlash character before each double quote.
Example: '"' -> '\\"'
2. Make the code as short as possible so it could be within 2048 tokens.
3. Replace all line breaks in the code piece with the symbol '\\n'.
`;

export class OutputPredicting extends Question {
    constructor() {
        super(`Hey ChatGPT, please generate a short but tricky C program and the output of the program. 
		The C program might use one or more of the following concepts/tools:
		${codeRequirementPrompt}
		`);
        this.describe("programCode", "The code of the program written by ChatGPT.")
           // .describe("blankWidth", "The width of the fill-in-the-blank space.")
            .describe("output", "The correct output of the program.");
    }

    getQuestionHTML(number) {
        const html = `<div class="question">
        <span>${number}. The result of the following program was <span class="fill-in-the-blank" style="width:100px;"></span>.</span>
        <pre class="code-box">${this.programCode}</pre>
    </div>`;
        return html;
    }

    getAnswerHTML(number) {
        const html = `<div class="answer">${number}. ${this.output}</div>`;
        return html;
    }
}

export class Coding extends Question {
    constructor() {
        super(`Hey ChatGPT, Please create a question that prompts the test-taker to write a brief C program. 
                Be sure to outline the specific requirements of the program and offer two test-cases as examples for the candidate to use. 
			   
        `);
        this.describe("requirement", "The requirement of the program.")
            .describe("input1", "The input to the program in the first test case.")
            .describe("output1", "The output to the program in the first test case.")
            .describe("input2", "The input to the program in the second test case.")
            .describe("output2", "The output to the program in the second test case.")

            // do not have enough length for sample code :(
            // .describe("sampleCode", "A sample C code for this question. You need to escape all characters in your code that may cause unexpected termination of json.");
    }

    getQuestionHTML(number) {
        return `<div class="question">
        <span>${number}. ${this.requirement}</span>
        <p>Input: <span class="code-font">${this.input1}</span></p>
        <p>Output: <span class="code-font">${this.output1}</span></p>
        <p>Input: <span class="code-font">${this.input2}</span></p>
        <p>Output: <span class="code-font">${this.output2}</span></p>
        </div>`
    }

    getAnswerHTML(number) {
        const html = `<div class="answer">${number}. Omitted</div>`;
        return html;
    }
}

export class BugFixing extends Question {
    constructor() {
        super(`Hey ChatGPT, Please create a question that requires the examinee to identify an error in a short and problematic C program, 
		along with suggesting a test case that would cause the program to malfunction. 
		Additionally, provide a brief description of the program's intended purpose.
		The program you generated should only use the following concepts/tools:
               ${examScopePrompt}
		${codeRequirementPrompt}
        `);
        this.describe("goal", "The goal of the program.")
            .describe("code", "The code of the program to be tested.")
            .describe("question", "The question to be asked.")
            .describe("testcaseInput", "The input of the sample test case provided by ChatGPT.")
            .describe("testcaseOutput", "The output of the sample test case provided by ChatGPT.");
    }

    getQuestionHTML(number) {
        return `<div class="question">
        <span>${number}. ${this.goal}</span>
        <p>Code: <pre class="code-box">${this.code}</pre></p>
        </div>`
    }

    getAnswerHTML(number) {
        const html = `<div class="answer">${number}. Sample Test Case:
        <p>Input: <span class="code-font">${this.testcaseInput}</span></p>
        <p>Output: <span class="code-font">${this.testcaseOutput}</span></p>
        </div>`;
        return html;
    }
}

export class Discussion extends Question {
    constructor() {
        super(`Hey ChatGPT, please design a practical and complex scenario that may be encountered during C programming, guide the reference person into the problem situation, and mobilize his own knowledge to solve this practical problem. 
		The problem you create should be based on one of the learning goals from LO1 to LO13. However, you shouldn't mention the learning goal explicitly in the problem statement.
            ${learningGoalPrompt}
			
			`);
        this.describe("question", "The question to discuss.")
            .describe("sampleAnswer", "The answer to the question.");
    }

    getQuestionHTML(number) {
        return `<div class="question">${number}. ${this.question}</div>`
    }

    getAnswerHTML(number) {
        const html = `<div class="answer">${number}. ${this.sampleAnswer}</div>`;
        return html;
    }
}

export class INFO1910_Paper extends ExamPaper {
    constructor() {
        super("C Practice Sheet", 120, `
        <ol>
      <li>This exam consists of several sections, each containing a number of questions. Please read the instructions for each section carefully before starting.</li>
      <li>You will need an A4 blank paper to write your answers. Ensure that you have sufficient paper to complete the entire exam.</li>
      <li>Write your answers in the space provided on the A4 paper, ensuring that you write the question number before each answer.</li>
      <li>You may use a pen or a pencil to write your answers. However, if you choose to use a pencil, make sure that your answers are clear and easy to read.</li>
      <li>Do not use any other materials or resources during the exam, including books, notes, or electronic devices.</li>
      <li>You are allowed the full duration of the exam to complete all sections. Please manage your time wisely to ensure that you have enough time to answer all questions.</li>
      <li>When you have completed the exam, ensure that you have written your name and student ID number on the top of the A4 paper.</li>
      <li>Finally, submit the completed A4 paper to the examiner or invigilator.</li>
    </ol>
`);
        this.addSection("Output Predicting", 
                        "Predict the output according to the given program code.")
            .addSection("Coding",
                        "Write short programs.")
            .addSection("Bug-fixing",
                        "Find bugs in given program codes. Propose test-cases that would make given programs fail.")
            .addSection("Discussion", 
                        "Discuss the following questions.");
    }
    
    async generateOutputPredictingQuestion() {
        console.log("Generating a new output predicting question...");
        // try {
            const q = new OutputPredicting();
            await q.fromGPT();
            this.addQuestionToSection("Output Predicting", q);
            console.log("Output predicting question generated!");
            return q;
        // } catch (e) {
        //     console.error("Error generating coding question: ", e);
        //     return null;
        // }
    }

    async generateCodingQuestion() {
        console.log("Generating a new coding question...");
        try {
            const q = new Coding();
            await q.fromGPT();
            this.addQuestionToSection("Coding", q);
            console.log("Coding question generated!");
            return q;
        } catch (e) {
            console.error("Error generating coding question: ", e);
            return null;
        }
    }

    async generateBugFixingQuestion() {
        console.log("Generating a new bug-fixing question...");
        try {
            const q = new BugFixing();
            await q.fromGPT();
            this.addQuestionToSection("Bug-fixing", q);
            console.log("Bug-fixing question generated!");
            
            return q;
        } catch (e) {
            console.error("Error generating bug-fixing question: ", e);
            return null;
        }
    }

    async generateDiscussionQuestion() {
        console.log("Generating a new discussion question...");
        try {
            const q = new Discussion();
            await q.fromGPT();
            this.addQuestionToSection("Discussion", q);
            console.log("Discussion question generated!");
            return q;
        } catch (e) {
            console.error("Error generating discussion question: ", e);
            return null;
        }
    }

}