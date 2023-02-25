const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// create Team array used by the generateTeam() function in page-template.js
const team = [];


// ----VALID INPUT CHECKS---- //
// Throws error if there is no input
const validateAnswer = (answer) => {
    if (answer.length < 1) {
        console.error("Answer needed!");
        return false;
    } else {
        return true;
    }
};

// Throws an error if no @ in the user's input
const validateEmail = (answer) => {
    if (answer.length < 1 || !answer.includes("@")) {
        console.error("Please enter a valid email address");
        return false;
    } else {
        return true;
    }
};


// Prompts to create a team manager (this runs first)
const managerPrompts = () =>
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the team manager's name?",
            validate: answer => validateAnswer(answer),
        },
        {
            type: "input",
            name: "id",
            message: "What is the team manager's id?",
            validate: answer => validateAnswer(answer),
        },
        {
            type: "input",
            name: "email",
            message: "What is the team manager's email address?",
            validate: answer => validateEmail(answer),
        },
        {
            type: "input",
            name: "office",
            message: "What is the team manager's office number?",
            validate: (answer) => {
                if (answer.length < 1 || isNaN(answer)) {
                    console.error("Please enter a number");
                    return false;
                } else {
                    return true;
                }
            }
        },
    ])
    .then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
        team.push(manager);
        teamOptions();
    });

// Prompts option to add more team members
const teamOptions = () =>
    inquirer.prompt([
        {
            type: "list",
            name: "add",
            message: "Would you like to add another team member?",
            choices: ["Add an engineer", "Add an intern", "Finish building the team"],
            loop: false,
        }
    ])
    // Initialises the next set of prompts based on user selection, or creates the HTML file if user is done adding team members
    .then((teamChoice) => {
        if (teamChoice.add === "Add an engineer") {
            engineerPrompts();
        } else if (teamChoice.add === "Add an intern") {
            internPrompts();
        } else {
            const renderedHTML = render(team);
            fs.writeFile(outputPath, renderedHTML, (err) =>
            err ? console.error(err) : console.log("Your team page has been created"));
        }
    });

// Prompt for new engineer information
const engineerPrompts = () =>
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
            validate: answer => validateAnswer(answer),
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's id?",
            validate: answer => validateAnswer(answer),
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
            validate: answer => validateEmail(answer),
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github username?",
            validate: answer => validateAnswer(answer),
        },
    ])
    .then((answers) => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        team.push(engineer);
        teamOptions();
    });

// Prompts for new intern information
const internPrompts = () =>
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
            validate: answer => validateAnswer(answer),
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id?",
            validate: answer => validateAnswer(answer),
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?",
            validate: answer => validateEmail(answer),
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the intern's school?",
            validate: answer => validateAnswer(answer),
        },
    ])
    .then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        team.push(intern);
        teamOptions();
    });

// Initialises the sequence of prompts
managerPrompts();