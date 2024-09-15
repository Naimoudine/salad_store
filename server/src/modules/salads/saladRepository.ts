import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Salad {
  id?: number;
  name: string;
  url: string;
  sauce: string;
  employee_id?: number;
  created_at?: string;
}

class SaladRepository {
  // The C of CRUD - Create operation

  async create(salad: Salad) {
    const [Result] = await databaseClient.query<Result>(
      "insert into salad (name, url, sauce) values (?, ?, ?)",
      [salad.name, salad.url, salad.sauce],
    );
    return Result.insertId;
  }

  async createCompose(ingredientId: number, saladId: number) {
    const [Result] = await databaseClient.query<Result>(
      "insert into compose (ingredient_id, salad_id) values (?, ?)",
      [ingredientId, saladId],
    );
    return Result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Salads from the "Salad" table
    const [rows] = await databaseClient.query<Rows>(
      "select s.*, GROUP_CONCAT(i.name SEPARATOR ', ') as ingredients,  GROUP_CONCAT(i.price SEPARATOR ', ') as ingredient_prices from salad as s join compose c on s.id = c.salad_id join ingredient i on i.id = c.ingredient_id group by s.id",
    );

    // Return the array of Salads
    return rows as Salad[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Salad

  // async update(Salad: Salad) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Salad by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new SaladRepository();
