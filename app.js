const inquirer = require("inquirer");
const { startMenu, new_dept, check } = require("./prompts");
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
        ew_emp_name();
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
    .query(
      "SELECT role_name, role_salary, d.department_name FROM roles inner join department d on role_department = d.id "
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

const add_role_name = function () {
  const role = {};
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_name",
        message: "New role name",
      },
      {
        type: "input",
        name: "role_salary",
        message: "What is the salary for this role?",
      },
    ])
    .then((result) => {
      role.role_name = result.role_name;
      role.salary = result.role_salary;
      role_dept(role);
    });
};

const role_dept = function (role) {
  db.promise()
    .query(`select * from department`)
    .then(([rows, fields]) => {
      console.table(rows);
      inquirer
        .prompt([
          {
            type: "input",
            name: "r_dept",
            message: "What dept does this role belong to?",
          },
        ])
        .then((res) => {
          role.department = res.r_dept;
          console.log(role.salary);
          db.query(
            `INSERT INTO roles (role_name, role_salary, role_department) values (?,?,?)`,
            [role.role_name, role.salary, role.department],
            (err, result) => {
              if (err) {
                console.log(err);
                inquirer
                  .prompt([
                    {
                      type: "choice",
                      name: "insert_error",
                      message: "insert failed",
                      choices: ["Main Menu", "New Role"],
                    },
                  ])
                  .then((errchoice) => {
                    if (errchoice.insert_error === "Main Menu") {
                      mainMenu();
                    } else {
                      add_role_name();
                    }
                  });
              }
              console.log(result);
              mainMenu();
            }
          );
        });
    });
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

const employee_dept = function (employee) {
  db.promise()
    .query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      console.table(rows);
      inquirer
        .prompt([
          { type: "input", name: "dept_id", message: "enter department id" },
        ])
        .then((results) => {
          employee.dept_id = results.dept_id;
          emp_manager(employee);
        });
    });
};

const emp_manager = function (employee) {
  db.promise()
    .query(`SELECT id, CONCAT(first_name, ' ' , last_name) from employees`)
    .then(([rows, fields]) => {
      console.table(rows);
      inquirer
        .prompt([
          {
            type: "input",
            name: "manager_id",
            message: "enter manager id or leave blank",
          },
        ])
        .then((results) => {
          if (results.manager_id) {
            employee.manager_id = results.manager_id;
            insert_emp(employee);
          } else insert_emp(employee);
        });
    });
};

const insert_emp = function (employee) {
  console.log(employee);
  db.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?) `,
    [
      employee.first_name,
      employee.last_name,
      employee.role_id,
      employee.manager_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        inquirer
          .prompt([
            {
              type: "choice",
              name: "insert_error",
              message: "insert failed",
              choices: ["Main Menu", "New Employee"],
            },
          ])
          .then((errchoice) => {
            if (errchoice.insert_error === "Main Menu") {
              mainMenu();
            } else {
              new_emp_name();
            }
          });
      }
      console.log(result);
      mainMenu();
    }
  );
};


const change_role_finde = function () {
  employee = {};
  db.promise()
    .query(
      `SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) as Name, r.role_name from employees e inner join roles r on e.role_id = r.id `
    )
    .then(([rows, fields]) =>{console.table(rows)
      inquirer
        .prompt([
          {
            type: "input",
            name: "employee_id",
            message: "select the employee to update",
          },
        ])
        .then((result) => {
          employee.id = result.employee_id;
          change_role_findr(employee)
        })
      });
};

const change_role_findr = function (employee) {
  db.promise()
    .query(`SELECT id, role_name, role_salary from roles`)
    .then(([rows, fields])  => {console.table(rows)
      inquirer.prompt([
        {
          type: "input",
          name: "role_id",
          message: "select the role to assign to the employee",
        },
      ]).then(res => {db.query(`UPDATE employees SET role_id = ? where id = ? `, [res.role_id, employee.id], (err, result) => {
      if(err){ console.log(err)
        inquirer
        .prompt([
          {
            type: "choice",
            name: "insert_error",
            message: "insert failed",
            choices: ["Main Menu", "New Employee"],
          },
        ])
        .then((errchoice) => {
          if (errchoice.insert_error === "Main Menu") {
            mainMenu();
          } else {
            change_role_finde();
          }
        });
      } mainMenu()
      
      }) })
    });
};


                                                                                                    




change_role_finde();
