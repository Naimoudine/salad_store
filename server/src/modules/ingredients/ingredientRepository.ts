import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Ingredient {
  id?: number;
  name: string;
  url: string;
  category: string;
  price: string;
  employee_id?: number;
  created_at?: string;
}

class IngredientRepository {
  // The C of CRUD - Create operation

  async create(ingredient: Ingredient) {
    const [result] = await databaseClient.query<Result>(
      "insert into ingredient (name, url, price, category) values (?, ?, ?, ?)",
      [ingredient.name, ingredient.url, ingredient.price, ingredient.category],
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all ingredients from the "ingredient" table
    const [rows] = await databaseClient.query<Rows>("select * from ingredient");

    // Return the array of ingredients
    return rows as Ingredient[];
  }

  async readAllCategories() {
    const [rows] = await databaseClient.query<Rows>(
      "select category from ingredient",
    );
    return rows;
  }

  async readIdByName(name: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select id from ingredient where name = ?",
      [name],
    );
    return rows[0];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing ingredient

  // async update(ingredient: ingredient) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an ingredient by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new IngredientRepository();
