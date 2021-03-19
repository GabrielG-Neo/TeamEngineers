const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var teamList = [];
const employeeQuestions = [
    {
        type: "input",
        name: "id",
        message: "What is your id number:",
    },
    {
        type: "input",
        name: "name",
        message: "Enter Employee name:",
    },
    {
        type: "input",
        name: "email",
        message: "Enter Your email:",
    },
    {
        type: "list",
        name: "role",
        message: "What is your role?",
        choices: ["engineer", "intern", "manager"]
    },
    {
        type: "input",
        name: "school",
        message: "Enter your school name:"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter your office number:"
    },
    {
        type: "input",
        name: "github",
        message: "Enter your github username:",
    },
    {
        type: "list",
        name: "addAnother",
        message: "Add another team member?",
        choices: ["Yes", "No"]
    }
]

function createTeamList() {
    inquirer.prompt(employeeQuestions).then(employeeInfo => {
        if (employeeInfo.role === "engineer") {
            var newMember = new Engineer(employeeInfo.id, employeeInfo.email, employeeInfo.name, employeeInfo.github);
        }
        if (employeeInfo.role === "manager") {
            var newMember = new Manager(employeeInfo.id, employeeInfo.email, employeeInfo.name, employeeInfo.officeNumber);
        } 
        else {
            var newMember = new Intern(employeeInfo.id, employeeInfo.email, employeeInfo.name, employeeInfo.school);
        }
        teamList.push(newMember);
        if (employeeInfo.addAnother === "Yes") {
            console.log(" ");
            createTeamList();
        } else {
            HtmlPage();
        }
    })
}

function HtmlPage() {
    let newFile = fs.readFileSync("./templates/main.html")
    fs.writeFileSync("./outputPath/team.html", newFile, function (err) {
        if (err) throw err;
    })
}
render();