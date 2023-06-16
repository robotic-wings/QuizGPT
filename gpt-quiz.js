const OPENAI_API_KEY = "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";


export async function askChatGPT(prompt) {
  if (prompt === "") {
    return "";
  }
  console.log(prompt);
  const sModel = "text-davinci-003";
  const iMaxTokens = 2048;
  const sUserId = "2";
  const dTemperature = 0.9;

  const data = {
    model: sModel,
    prompt,
    max_tokens: iMaxTokens,
    user: sUserId,
    temperature: dTemperature,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    
  };

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    if (jsonResponse.error && jsonResponse.error.message) {
      console.log("Error: " + jsonResponse.error.message);
    } else if (jsonResponse.choices && jsonResponse.choices[0].text) {
      return jsonResponse.choices[0].text.trim();
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}


export function parseHTML(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html").body.firstChild;
}

export class Question {
  constructor(additionalPrompt) {
    this.fieldDescription = {};
    this.additionalPrompt = additionalPrompt;
  }

  describe(fieldName, description) {
    this.fieldDescription[fieldName] = description;
    return this;
  }

  async fromGPT() {
    let jsonSpec = "";
    for (let fieldName in this.fieldDescription) {
      const description = this.fieldDescription[fieldName];
      jsonSpec += `- ${fieldName}: ${description}\n`;
    }
    const prompt = `
    ${this.additionalPrompt}
    The whole response should be in one single-line JSON. Please create the single-line JSON response that includes the following fields:
    ${jsonSpec}
    `;
    let resp;
    try {
      resp = await askChatGPT(prompt);
      resp = resp.replace(/\n/g, "");
      for (let i = 0; i < resp.length; i++) {
        if (resp[i] === '{') {
          resp = resp.substring(i);
          break;
        }
      }
      const obj = JSON.parse(resp);
      console.log("ChatGPT response: ", obj)
      for (let fieldName in obj) {
        this[fieldName] = obj[fieldName];
      }
    } catch (error) {
      console.error("ChatGPT has returned an incorrect response!");
      throw error;
    }
    return this;
  }

  getQuestionHTML(number) {
    throw new Error("Not implemented");
  }

  getAnswerHTML(number) {
    throw new Error("Not implemented");
  }

}

class Section {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.questions = new Array();
  }

  getQuestionHTML() {
    let questionHTML = ``;
    for (let i = 0; i < this.questions.length; i++) {
        questionHTML += this.questions[i].getQuestionHTML(i+1);
    }
    return `<div class="question-section"><h3>${this.title}: <i>${this.description}</i></h3>
    <div>${questionHTML}</div></div>`;
  }

  getAnswerHTML() {
    let answerHTML = ``;
    for (let i = 0; i < this.questions.length; i++) {
        answerHTML += this.questions[i].getAnswerHTML(i+1);
    }
    return `<div class="answer-section"><h3>${this.title}</i></h3>
    <div>${answerHTML}</div></div>`;
  }

  addQuestion(question) {
    this.questions.push(question);
    return this;
  }
}

export class ExamPaper {
  constructor(title, allowedMinutes, instruction) {
    this.title = title;
    this.allowedMinutes = allowedMinutes;
    this.sections = {};
    this.instruction = instruction;
  }

  addQuestionToSection(sectionTitle, question) {
    const section = this.sections[sectionTitle];
    section.addQuestion(question);
    return this;
  }

  addSection(title, description) {
    const section = new Section(title, description);
    this.sections[title] = section;
    return this;
  }
  
  getHTML() {
    let quizHTML = "";
    for (let title in this.sections) {
      quizHTML += this.sections[title].getQuestionHTML();
    }
    let answerSheetHTML = "";
    for (let title in this.sections) {
      answerSheetHTML += this.sections[title].getAnswerHTML();
    }
    return `<div class="title">
          <h1>${this.title}</h1>
          <h4>MAXIMUM ALLOWED TIME: ${this.allowedMinutes} minutes</h4>
          <hr>
          </div>
          <p><i><b>Instructions:</b> ${this.instruction}</i></p>
          <div class="quiz-container">
          ${quizHTML}
          <h3 class="title">END OF THE PRACTICE SHEET</h3>
          </div>
          <div class="answer-sheet-container">
          <h1 class="title">Answer Sheet</h1>
          ${answerSheetHTML}
          <h3 class="title">END OF THE ANSWER SHEET</h3>
          </div>
          `;
  }
  

}