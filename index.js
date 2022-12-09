// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const {
    projectInfo,
    usageStep,
    screenshot,
    additionalStep,
    selectLicense,
    contributingInfo,
    testExample,
    questionsInfo
} = require("./utils/questions");
const outputFileName = "README.md";

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    let text = generateMarkdown(data);

    fs.writeFile(fileName, text, () => {
        
        console.log("\nPizza is out the oven!");
        console.log("\nYou can find your README in `./output/README.md`");
    })
}

// The global const data object will hold all of the data gathered through inquirer and will be used to pass our data to generateMarkdown
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

// TODO: Create a function to initialize app
// The init function presents the user with a brief description of the application and starts by calling getProjectInfo
function init() {
    console.log("To use this application, you will be presented with a section within the generated README file\n" +
"and will be asked a series of questions to create the information that will be included in that section.");
    console.log("Starting the README generator...\n");
    
    getProjectInfo();
}

// This function calls inquirer using the `projectInfo` array of questions to obtain the project title, description, and installation from the user
// When finished, the answers are stored in data and getUsage is called
function getProjectInfo() {
    inquirer.prompt(projectInfo).then((answers) => {
        data.title = answers.title;
        data.description = answers.description;
        data.installation = answers.installation;
        console.log("\nUsage -\nProvide instructions and examples for using your project in this section.\n" +
        "Include screenshots as needed.");
        getUsage();
    }); 
}

// Calls inquirer using `usageStep` to prompt the user to enter a step description and asks if the user needs to add a screenshot for the given step
// When finished, the step is pushed onto data.usage
// if screenshotConfirm is true, then call getScreenshot
// else call getAdditionalStep
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

// Calls inquirer using `screenshot` to direct the user to input the screenshot information into the markdown
// When finished calls getAdditionalStep
function getScreenshot() {
    inquirer.prompt(screenshot).then((answers) => {
        
        data.usage.push(`![placeholder](..\\assets\\images\\${answers.screenshot})`);
        getAdditionalStep();
    })
}

// Calls inquirer using `additionalStep` to ask the user if another step needs to be added to the Usage section
// if stepConfirm is true, then call getUsage and loop through again
// else, continue to getLicense
function getAdditionalStep() {
    inquirer.prompt(additionalStep).then((answers) => {
        if (answers.stepConfirm) {
            getUsage();
        }
        else {
            data.usage = data.usage.join('<br>');

            getLicense();
        }
    });
}

// Calls inquirer using `selectLicense` to ask if a specific license needs to be referenced in the project
function getLicense() {
    inquirer.prompt(selectLicense).then((answers) => {
        data.license = answers.license;
        getContributingInfo();
    })
}

// Directs the user to include guidelines for how other users can contribute to the project
function getContributingInfo() {
    inquirer.prompt(contributingInfo).then((answers) => {
        data.contributing = answers.contributing;
        console.log("\nTests - \nIf you have written tests for your project, provide examples of how to run them in this section. Otherwise, enter `N/A`");
        getTestInfo();
    })
}

// Prompts the user to provide examples for running any tests included in the project
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

// Prompts the user to provide their github and email.
// When finished, calls writeToFile to generate the README file
function getQuestionsInfo() {
    console.log("\nQuestions -\n This section will contain information about how users can reach you regarding any questions about your project.");
    inquirer.prompt(questionsInfo).then((answers) => {
        data.github = answers.github;
        data.email = answers.email;
        console.log("\nThank you for all of your input!\n Generating your README file now...");
        writeToFile(`./output/${outputFileName}`, data);
    });
}

init();