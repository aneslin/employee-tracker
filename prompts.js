const { createPromptModule } = require('inquirer');

const startMenu = [
  {
    type: "list",
    name: "startSelection",
    message: "Select an action",
    choices: [
      {name:"View all Departments", value:"view_dept"},
      {name:"View all roles", value:"view_role"},
      {name:"View all employees",value: "view_emp"},
      {name:"Add a department", value: "add_dept"},
      {name: "Add a role", value: "add_role"},
      {name:"Add an employee", values:"add_emp"},
      {name:"Update an employee role", value:"update_emp_role"}
    ],
  },
];





module.exports =  {startMenu : startMenu}