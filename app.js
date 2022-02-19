const inquirer = require("inquirer");
const { startMenu, new_dept, new_role, new_emp } = require("./prompts");

const mainMenu = () => {
  inquirer.prompt(startMenu).then((choice) => {
    console.log(choice.startSelection.name);
    switch (choice.startSelection.name) {
      case "add_dept":
        add_dept();
        break;

      case "add_emp":
        add_emp();
        break;
      default:
        return;
    }
  });
};



const add_dept = function () {
  inquirer.prompt(new_dept).then((dept_data) => {
    const dept_name = dept_data.new_dept;
    console.log(dept_name)
    //sql and response here
  });
};

const add_emp = function () {
  console.log("hell0!");
  inquirer.prompt(new_emp).then((empdata) => console.log(empdata));
};

add_emp()