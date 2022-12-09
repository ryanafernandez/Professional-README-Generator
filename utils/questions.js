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
        message: "Enter the file name for your screenshot. Be sure to include the images in the `./assets/images/...` directory.\n",
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

module.exports = {
    projectInfo,
    usageStep,
    screenshot,
    additionalStep,
    selectLicense,
    contributingInfo,
    testExample,
    questionsInfo   
};