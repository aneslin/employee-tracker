const inquirer = require("inquirer");
const { startMenu } = require("./prompts");

const mainMenu = () => {
  inquirer.prompt(startMenu).then((choice) => {
    switch (choice){
      case "view_dept":
        view_dept();
        break;
      case "view_role":
        view_role();
        break;
    }
  });
};


