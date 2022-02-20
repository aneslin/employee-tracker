const inquirer = require("inquirer");
const { startMenu, new_dept, new_role, new_emp, check } = require("./prompts");
const cTable = require("console.table");
const db = require("./connection");
const Employee = require("./Employee");
const mainMenu = () => {
  inquirer.prompt(startMenu).then((choice) => {
    switch (choice.startSelection) {
      case "view_dept":
        view_dept();
        break;

      case "view_roles":
        view_roles();
        break;

      case "view_emp":
        view_emp();
        break;

      case "add_dept":
        add_dept();
        break;

      case "add_emp":
        add_emp();
        break;
      default:
        console.log("damn it");
    }
  });
};

const view_dept = function () {
  db.promise()
    .query("SELECT * FROM department")
    .then(([rows, fields]) => {
      console.table(rows);
      inquirer.prompt(check).then((value) => {
        if (value) {
          mainMenu();
        } else {
          console.log("something went wrong");
        }
      });
    });
};

const add_dept = function () {
  inquirer.prompt(new_dept).then((dept_data) => {
    const dept_name = dept_data.new_dept;
    db.promise()
      .query("INSERT INTO department(department_name) VALUES (?)", [dept_name])
      .then((values, res) => {
        if (values) {
          console.log(res);
          mainMenu();
        } else {
          console.log("Something went wrong");
          mainMenu();
        }
      });
  });
};

const view_roles = function () {
  db.promise()
    .query("SELECT * FROM roles")
    .then(([rows, fields]) => {
      console.table(rows);

      inquirer.prompt(check).then((value) => {
        if (value) {
          mainMenu();
        } else {
          console.log("something went wrong");
        }
      });
    });
};

const add_role = function () {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_name",
        message: "Employee first name",
      },
      {
        type: "input",
        name: "role_salary",
        message: "Employee last name",
      },
      {
        type: "input",
        name: "dept",
        message: "department",
      },
    ])
    .then(result`INSERT INTO roles ('')`);
};

const view_emp = function () {
  db.promise()
    .query(
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
    )
    .then(([rows, fields]) => {
      console.table(rows);

      inquirer.prompt(check).then((value) => {
        if (value) {
          mainMenu();
        } else {
          console.log("something went wrong");
        }
      });
    });
};

const new_emp_name = function () {
  const employee = new Employee();
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
    ])
    .then((results) => {
      (employee.first_name = results.first_name),
        (employee.last_name = results.last_name);
      employee_role(employee);
    });
};

const employee_role = function (employee) {
  db.promise()
    .query(`Select id, role_name from roles`)
    .then(([rows, fields]) => {
      console.table(rows);

      inquirer
        .prompt([
          {
            type: "input",
            name: "role_id",
            message: "enter role_id",
          },
        ])
        .then((results) => {
          employee.role_id = results.role_id;
          employee_dept(employee);
        });
    });
};

new_emp_name();

const employee_dept = function (employee) {
  db.promise()
    .query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      console.table(rows);
      inquirer
        .prompt([
          { type: "input", 
          name: "dept_id", 
          message: "enter department id" },
        ])
        .then((results) => {
          employee.dept_id = results.dept_id;
          emp_manager(employee);
        });
    });
};

const emp_manager = function(employee){
  db.promise().query(`SELECT id, CONCAT(first_name, ' ' , last_name) from employees`).then(([rows, fields]) => {
    console.table(rows)
    inquirer.prompt([{type:'input', name:'manager_id', message:"enter manager id or leave blank"}]).then(results => {
      if(results.manager_id){
        employee.manager_id = results.manager_id
        insert_emp(employee)
      } else 
      insert_emp(employee)
    }
    )
  }
  )
}

const insert_emp = function (employee) {
  console.log(employee)
  db.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?) `,[
      employee.first_name,
      employee.last_name,
      employee.role_id,
      employee.manager_id
    ], (err, result) => {
      if (err) { console.log(err)
        inquirer.prompt([{type:'choice', name: 'insert_error', message: "insert failed", choices: ['Main Menu', 'New Employee']}]).then(errchoice => {
          if (errchoice.insert_error ==='Main Menu' )  { mainMenu()} else {new_emp_name()}
        }
        ) 
      } console.log(result) 
        mainMenu()
    } 
  );
};


const getManagers = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT CONCAT(b.first_name, " ", b.last_name) AS Name 
        FROM employee a LEFT JOIN employee b
        ON a.manager_id = b.id
        WHERE a.manager_id IS NOT NULL;`,
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};
