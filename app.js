const inquirer = require('inquirer')
const { startMenu, new_dept, new_role, new_emp, check } = require('./prompts')
const cTable = require('console.table')
const db = require('./connection')
const Employee = require('./Employee')
const mainMenu = () => {
  inquirer.prompt(startMenu).then((choice) => {
    switch (choice.startSelection) {
      case 'view_dept':
        view_dept()
        break

      case 'view_roles':
        view_roles()
        break

      case 'view_emp':
        view_emp()
        break

      case 'add_dept':
        add_dept()
        break

      case 'add_emp':
        add_emp()
        break
      default:
        console.log('damn it')
    }
  })
}

const view_dept = function () {
  db.promise().query('SELECT * FROM department').then(([rows, fields])=> {
    console.table(rows)
    inquirer.prompt(check).then(value => {
      if (value) {
        mainMenu()
      } else {
        console.log('something went wrong')
      }
    })
}
  )}


const add_dept = function () {
  inquirer.prompt(new_dept).then((dept_data) => {
    const dept_name = dept_data.new_dept
    db.promise().query('INSERT INTO department(department_name) VALUES (?)', [dept_name])
      .then((values,res) => {
        if (values) {
          console.log(res)
          mainMenu()
        } else {
          console.log('Something went wrong')
          mainMenu()
        }
      })
  })
}

const view_roles = function () {
  db.promise().query('SELECT * FROM roles').then(([rows, fields])=> {
    console.table(rows)

    inquirer.prompt(check).then(value => {
      if (value) {
        mainMenu()
      } else {
        console.log('something went wrong')
      }
    })
}
  )}

const view_emp = function () {
  db.promise().query(
`
SELECT  emp.id ,
emp.first_name AS 'First Name',
emp.last_name AS 'Last Name',
rl.role_name as Role,
dept.department_name as Department,
rl.role_salary AS Salary,
concat(mng.first_name, ' ' , mng.last_name) AS manager  
FROM employees AS emp
LEFT JOIN employees mng
ON emp.manager_id = mng.id
INNER JOIN roles rl 
ON emp.role_id = rl.id
INNER JOIN department dept
ON rl.role_department = dept.id`
  ).then(([rows, fields]) => {
    console.table(rows)

    inquirer.prompt(check).then(value => {
      if (value) {
        mainMenu()
      } else {
        console.log('something went wrong')
      }
    })
  })
}

const get_dept = function (rows) {
      
     inq_choice = rows[0].map((pair) => {
      const x ={ name: pair.role_name, value: pair.id }
     return x
     });
    
      return inq_choice;
    }

const add_emp = function () {
  db.promise()
    .query(`SELECT r.id, r.role_name FROM roles r`)
    .then((results) => {
      console.log(results);
      const role = get_dept(results);
      console.log(role);
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "Employee first name",
          },
          {
            type: "input",
            name: "last_name",
            message: "Employee last name",
          },
          {
            type: "list",
            name: "role",
            message: "employee role",
            choices: role,
          },
        ])
        .then((employeeResults) => {
          const employee = new Employee();
          employee.first_name = employeeResults.first_name;
          employee.last_name = employeeResults.last_name;
          employee.depts = employeeResults.depts;
          console.log(employee.first_name);
        });
    });
};




const change_role = function () {
  inquirer.prompt(new_role).then((role_data) => console.log(role_data))
}

add_emp()


