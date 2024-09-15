import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Employee {
  id: number;
  username: string;
  password: string;
  created_at: string;
}

class EmployeeRepository {
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific employee by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from employee where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the employee
    return rows[0] as Employee;
  }

  async readByUsername(username: string) {
    // Execute the SQL SELECT query to retrieve a specific employee by its username
    const [rows] = await databaseClient.query<Rows>(
      "select * from employee where username = ?",
      [username],
    );

    // Return the first row of the result, which represents the employee
    return rows[0] as Employee;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all employees from the "employee" table
    const [rows] = await databaseClient.query<Rows>("select * from employee");

    // Return the array of employees
    return rows as Employee[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing employee

  // async update(employee: employee) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an employee by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new EmployeeRepository();
