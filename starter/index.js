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

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Prompts to create a team manager
const managerPrompts = () =>
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the team manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the team manager's id number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the team manager's email address?",
        },
        {
            type: "input",
            name: "office",
            message: "What is the team manager's office number?",
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
    .then((teamChoice) => {
        if (teamChoice.add === "Add an engineer") {
            engineerPrompts();
        } else if (teamChoice.add === "Add an intern") {
            internPrompts();
        } else {
            console.log(team);
        }
    });

// Prompt for new engineer information
const engineerPrompts = () =>
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github username?",
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
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?",
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the intern's school?",
        },
    ])
    .then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        team.push(intern);
        teamOptions();
    });

managerPrompts();