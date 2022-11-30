// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const outputFileName = "README.md";

// TODO: Create an array of questions for user input
const projectInfo = [
    {
        type: 'input',
        message: 'Project Title -\n' + 
        'What is the title of your project?\n\n',
        name: 'title',
    },
    {
        type: "input",
        message: "\nDescription - \n" +
        "Provide a short description explaining the what, why and how of your project in this section. Use the following questions as a guide: \n" + 
        "- What was your motivation?\n" +
        "- Why did you build this project?\n" +
        "- What problem does it solve?\n" +
        "- What did you learn?\n\n",
        name: "description",
    },
    {
        type: "input",
        message: "\nInstallation - \n" +
        "What are the steps required to install your project?\n" +
        "Provide a description of how to get the development environment running in this section.\n\n",
        name: "installation",
    }
];

const usageStep = [
    {
        type: "input",
        message: "Enter a new usage step.\n\n",
        name: "step",
    },
    {
        type: "confirm",
        message: "\nDo you need to add a screenshot for this step?",
        name: "screenshotConfirm"
    }
];

const screenshot = [
    {
        type: "input",
        message: "Enter a new screenshot {ex. ![alt text](assets/images/screenshot.png) }\n\n",
        name: "screenshot"
    }
];

const additionalStep = [
    {
        type: "confirm",
        message: "\nDo you need to add an additional step?",
        name: "stepConfirm"
    }
];

const selectLicense = [
    {
        type: "list",
        message: "\nDo you need to add a license to your README?",
        name: "license",
        choices: [ "MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "N/A"],
    }
];

const contributingInfo = [
    {
        type: "input",
        message: "\nIf you created an application or package and would like other developers to contribute to it, you can include guidelines for how to do so. Otherwise, enter `N/A`\n\n",
        name: "contributing",
    }
];

const testExample = [
    {
        type: "input",
        message: "\nEnter a new test example.\n\n",
        name: "testInput",
    },
    {
        type: "confirm",
        message: "\nDo you need to add an additional example?",
        name: "testConfirm",
    }
];

const questionsInfo = [
    {
        type: "input",
        message: "\nEnter your GitHub username.",
        name: "github",
    },
    {
        type: "input",
        message: "\nEnter your email address.",
        name: "email",
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    let text = generateMarkdown(data);

    fs.writeFile(fileName, text, () => {
        
        console.log("\nPizza is out the oven!");
        console.log("\nYou can find your README in `./output/README.md`");
    })
}

const data = {
    title: "",
    description: "",
    installation: "",
    usage: [],
    license: "",
    contributing: "",
    tests: [],
    github: "",
    email: "",
};

function getProjectInfo() {

    inquirer.prompt(projectInfo).then((answers) => {
        data.title = answers.title;
        data.description = answers.description;
        data.installation = answers.installation;
        console.log("\nUsage -\nProvide instructions and examples for using your project in this section. Include screenshots as needed.");
        getUsage();
    }); 
}

function getUsage() {

    inquirer.prompt(usageStep).then((answers) => {
        data.usage.push(answers.step);

        if (answers.screenshotConfirm) {
            getScreenshot();
        }
        else {
            getAdditionalStep();
        }
        
    });
}

function getScreenshot() {
    inquirer.prompt(screenshot).then((answers) => {
        data.usage.push(answers.screenshot);
        getAdditionalStep();
    })
}

function getAdditionalStep() {
    inquirer.prompt(additionalStep).then((answers) => {
        if (answers.stepConfirm) {
            getUsage();
        }
        else {
            getLicense();
        }
    });
}

function getLicense() {
    inquirer.prompt(selectLicense).then((answers) => {
        data.license = answers.license;
        getContributingInfo();
    })
}

function getContributingInfo() {
    inquirer.prompt(contributingInfo).then((answers) => {
        data.contributing = answers.contributing;
        console.log("\nTests - \nIf you have written tests for your project, provide examples of how to run them in this section. Otherwise, enter `N/A`");
        getTestInfo();
    })
}

function getTestInfo() {
    
    inquirer.prompt(testExample).then((answers) => {
        data.tests.push(answers.testInput);

        if (answers.testConfirm) {
            getTestInfo();
        }
        else {
            getQuestionsInfo();
        }
        
    });
}

function getQuestionsInfo() {
    console.log("\nQuestions -\n This section will contain information about how users can reach you regarding any questions about your project.");
    inquirer.prompt(questionsInfo).then((answers) => {
        data.github = answers.github;
        data.email = answers.email;
        console.log("\nThank you for all of your input!\n Generating your README file now...");
        writeToFile(`./output/${outputFileName}`, data);
    });
}

// TODO: Create a function to initialize app
function init() {
    getProjectInfo();
}

init();