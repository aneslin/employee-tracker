const inquirer = require('inquirer')
const { startMenu, new_dept, new_role, new_emp, check } = require('./prompts')
const cTable = require('console.table')
const db = require('./connection')

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
  db.promise().query('SELECT * FROM department').then(([rows, fields]) => {
    console.table(rows)
  }).then((inquirer.prompt(check)).then(value => {
    if (value) {
      mainMenu()
    } else {
      console.log('oops')
    }
  }))
}

const add_dept = function () {
  inquirer.prompt(new_dept).then((dept_data) => {
    const dept_name = dept_data.new_dept
    db.promise().query('INSERT INTO department(department_name) VALUES (?)', [dept_name])
      .then(values => {
        if (values) {
          mainMenu()
        } else {
          console.log('Something went wrong')
          mainMenu()
        }
      })
  })
}

const view_roles = function () {
  db.promise().query('SELECT * FROM roles').then(([rows, fields]) => {
    console.table(rows)
  }).then((inquirer.prompt(check)).then(value => {
    if (value) {
      mainMenu()
    } else {
      console.log('something went wrong')
    }
  }))
}

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
  }).then((inquirer.prompt(check)).then(value => {
    if (value) {
      mainMenu()
    } else {
      console.log('something went wrong')
    }
  }))
}

const add_emp = function () {
  inquirer.prompt(new_emp).then((empdata) => console.log(empdata))
}

const change_role = function () {
  inquirer.prompt(new_role).then((role_data) => console.log(role_data))
}

mainMenu()
