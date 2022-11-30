// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const outputFileName = "README.md";

// TODO: Create an array of questions for user input
// const questions = [
//     {
//         type: "input",
//         message: "What is the title of your project?\n\n",
//         name: "title",
//     },
//     {
//         type: "input",
//         message: "Provide a short description explaining the what, why and how of your project. Use the following questions as a guide: \n" + 
//         "- What was your motivation?\n" +
//         "- Why did you build this project?\n" +
//         "- What problem does it solve?\n" +
//         "- What did you learn?\n\n",
//         name: "description",
//     },
//     {
//         type: "input",
//         message: "What are the steps required to install your project?\n" +
//         "Provide a step-by-step description of how to get the development environment running.\n\n",
//         name: "installation",
//     },
//     {
//         type: "input",
//         message: "Provide instructions and examples for use. Include screenshots as needed.\n" +
//         "- To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it.\n" +
//         "- Then, using the relative filepath, add it to your README using the following syntax:\n" +
//         "- ![alt text](assets/images/screenshot.png)\n\n",
//         name: "usage",
//     },
//     {
//         type: "list",
//         message: "The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project.\n" +
//         "If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).\n\n",
//         name: "license",
//         choices: [ "Choice A", "Choice B", "Choice C", "Choice D", "N/A" ],
//     },
//     {
//         type: "input",
//         message: "If you created an application or package and would like other developers to contribute to it, you can include guidelines for how to do so.\n" +
//         "The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.\n\n",
//         name: "contributing",
//     },
//     {
//         type: "input",
//         message: "Go the extra mile and write tests for your application. Then provide examples on how to run them here.\n\n",
//         name: "tests",
//     },
//     {
//         type: "input",
//         message: "Please enter your GitHub username:\n\n",
//         name: "github",
//     },
//     {
//         type: "input",
//         message: "Please enter your email address:\n\n",
//         name: "email",
//     }
// ];

const projectInfo = [
    {
        type: 'input',
        message: 'Project Title -\n' + 
        'What is the title of your project?\n\n',
        name: 'title',
    },
    {
        type: "input",
        message: "Description - \n" +
        "Provide a short description explaining the what, why and how of your project in this section. Use the following questions as a guide: \n" + 
        "- What was your motivation?\n" +
        "- Why did you build this project?\n" +
        "- What problem does it solve?\n" +
        "- What did you learn?\n\n",
        name: "description",
    },
    {
        type: "input",
        message: "Installation - \n" +
        "What are the steps required to install your project?\n" +
        "Provide a description of how to get the development environment running in this section.\n\n",
        name: "installation",
    }
];

const usageStep = [
    {
        type: "input",
        message: "Enter a new instructional step.\n\n",
        name: "step",
    },
    {
        type: "confirm",
        message: "Do you need to add a screenshot for this step?",
        name: "screenshotConfirm"
    }
];

const screenshot = [
    {
        type: "input",
        message: "Enter a new screenshot (ex. ![alt text](assets/images/screenshot.png) )",
        name: "screenshot"
    }
];

const additionalStep = [
    {
        type: "confirm",
        message: "Do you need to add an additional step?",
        name: "stepConfirm"
    }
];

const selectLicense = [
    {
        type: "list",
        message: "Do you need to add a license to your README?",
        name: "license",
        choices: [ "MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "N/A"],
    }
];

const contributingInfo = [
    {
        type: "input",
        message: "If you created an application or package and would like other developers to contribute to it, you can include guidelines for how to do so. Otherwise, enter `N/A`\n",
        name: "contributing",
    }
];

const testExample = [
    {
        type: "input",
        message: "Enter a new test example.",
        name: "testInput",
    },
    {
        type: "confirm",
        message: "Do you need to add an additional example?",
        name: "testConfirm",
    }
];

const questionsInfo = [
    {
        type: "input",
        message: "Enter your GitHub username.",
        name: "github",
    },
    {
        type: "input",
        message: "Enter your email address.",
        name: "email",
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    let text = generateMarkdown(data);

    fs.writeFile(fileName, text, () => {
        
        console.log("pizza is out the oven");
        console.log("You can find your README in `./output/README.md`");
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
        console.log("Usage -\nProvide instructions and examples for using your project in this section. Include screenshots as needed.\n");
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
        console.log("Your Screenshot");
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
        console.log("Tests - \nIf you have written tests for your project, provide examples of how to run them in this section. Otherwise, enter `N/A`");
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
    console.log("Questions -\n This section will contain information about how users can reach you regarding any questions about your project.");
    inquirer.prompt(questionsInfo).then((answers) => {
        data.github = answers.github;
        data.email = answers.email;
        console.log("Thank you for all of your input!\n Generating your README file now...");
        writeToFile(`./output/${outputFileName}`, data);
    });
}

// TODO: Create a function to initialize app
function init() {
    getProjectInfo();
    // let data = {
    //     title: "",
    //     description: "",
    //     installation: "",
    // };

    // // Prompt user for project title, description, and installation
    // inquirer.prompt(projectInfo).then((answers) => {
    //     data.title = answers.title;
    //     data.description = answers.description;
    //     data.installation = answers.installation;
    // }); 

    // console.log(test = testCall());

    
    // // Prompt user for usage instructions
    // let done = false;
    // // while (!done) {
    //     console.log("Provide instructions and examples for using the project. Include screenshots as needed.\n");
    //     done = true;
    //     await inquirer.prompt([
    //         {
    //             type: "input",
    //             message: "Enter a new instructional step.\n\n",
    //             name: "step",
    //         },
    //         {
    //             type: "confirm",
    //             message: "Do you need to add a screenshot for this step?",
    //             name: "screenshotConfirm"
    //         }
    //     ]).then((response) => {
    //         // store response.step

    //         if (response.screenshotConfirm) {
    //             await inquirer.prompt([
    //                 {
    //                     type: "input",
    //                     message: "Enter a new screenshot (ex. ![alt text](assets/images/screenshot.png) )\n",
    //                     name: "screenshot"
    //                 },
    //             ]).then((response) => {
    //                 // store response.screenshot
    //             });
    //         }

    //         await inquirer.prompt([
    //             {
    //                 type: "confirm",
    //                 message: "Do you need to add an additional step?\n",
    //                 name: "stepConfirm"
    //             }
    //         ]).then((response) => {
    //             if (!response.stepConfirm) {
    //                 done = true;
    //             }
    //         });
    //     });
    // // };

    // writeToFile(`./output/${outputFileName}`, answers);
}

init();