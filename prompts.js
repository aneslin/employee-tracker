const inquirer = require('inquirer');
const db = require('./connection')


 /* const get_dept = function () {
   db.promise()
     .query("select * from department")
     .then((rows) => {
       inq_choice = rows[0].map((pair) => {
         const x = { name: pair.department_name, value: pair.id };
         return x;
       });
       console.log(inq_choice);
       return inq_choice;
     });
 }; 
get_dept() */
const startMenu = [
  {
    type: 'list',
    name: 'startSelection',
    message: 'Select an action',
    choices: [
      { name: 'View all Departments', value: 'view_dept' },
      { name: 'View all roles', value: 'view_roles' },
      { name: 'View all employees', value: 'view_emp' },
      { name: 'Add a department', value: 'add_dept' },
      { name: 'Add a role', value: 'add_role' },
      { name: 'Add an employee', value: 'add_emp' },
      { name: 'Update an employee role', value: 'update_emp_role' },
      {name: "View total utilized budget", value:'all_budg'}
    ]
  }
]

const new_dept = [
  {
    type: 'input',
    name: 'new_dept',
    message: 'Enter a name for the new department'
  }
]

const new_role = [

     {
    type: "list",
    name: "emp_department",
    message: "select employee department",
    }
  , 
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of this role?'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'What is the salary?'
  }, {
    type: 'input',
    name: 'department',
    message: 'What is the department?'
  }
]

const new_emp = [
  {
    type: 'input',
    name: 'first_name',
    message: 'Employee first name'
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'Employee last name'
  },

 
  {
    type: 'input',
    name: 'emp_department',
    message: 'Enter Employee Department'
  }

]

const c_role = [
  {
    type: 'input',
    name: 'target_emp',
    message: 'select employee to change role'
  },

  {
    type: 'input',
    name: 'n_role',
    message: 'select new role'
  }
]

check = [
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Return to main menu'
  }
]


/* db.promise().query("select department_name FROM department", (err, results, fields) => {
  results.map((pair) => {
     pair.department_name;
  });
}).then(thing => console.log(thing));
 */




module.exports = {
  startMenu: startMenu,
  new_dept: new_dept,
  new_role: new_role,
  new_emp: new_emp,
  check: check
}
