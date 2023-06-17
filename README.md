# GPT Exam Paper Generator

This project is a JavaScript-based exam paper generator. It's designed to be executed in a browser environment, where you interact with the console to manipulate the exam paper.

## Setup

The generator uses an exam paper template which can be found in `info1910.js`. On loading the webpage, an instance of the `INFO1910_Paper` class is created and the HTML content of the paper is rendered on the page.

Before using this application, please set the `OPENAI_API_key` in `ChatGPT.js` to your own OpenAI API key.

## How to Use

After the webpage has loaded, various commands are available in the browser console for manipulating the exam paper. Here's a brief overview of each command:

- `render()`: This function refreshes the rendered HTML content of the exam paper on the webpage.

- `delQuestion(section, number)`: This function deletes a question from a specified section of the exam paper. The `section` argument is a string representing the name of the section (e.g., "Output Predicting", "Coding", "Bug-fixing", "Discussion"), and the `number` argument is the 1-based index of the question in the section.

There are also some quick commands for specific sections:

- `delop(n)`: Delete the n-th question from the "Output Predicting" section.
- `delcode(n)`: Delete the n-th question from the "Coding" section.
- `delbf(n)`: Delete the n-th question from the "Bug-fixing" section.
- `deldisc(n)`: Delete the n-th question from the "Discussion" section.

You can add questions to the paper using the following commands:

- `addop(n)`: Add n new questions to the "Output Predicting" section.
- `addcode(n)`: Add n new questions to the "Coding" section.
- `addbf(n)`: Add n new questions to the "Bug-fixing" section.
- `adddisc(n)`: Add n new questions to the "Discussion" section.

## Notes

After any operation that modifies the paper, you should call `render()` to update the webpage with the changes. Note that some commands will automatically call `render()` after performing their operation.

For any debugging or manual modifications, you can access the current exam instance directly in the console using the `exam` variable.

## Examples

To delete the third question from the "Output Predicting" section, type `delop(3)` in the console and press enter. To add 5 new questions to the "Discussion" section, type `adddisc(5)` in the console and press enter.

## Dependencies

This project imports the `INFO1910_Paper` class from `./info1910.js`. Make sure this file is in the same directory as the script.

**Remember to always call `render()` to see the changes on the page.**
