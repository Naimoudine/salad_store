import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Order {
  id?: number;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
}

class OrderRepository {
  // The C of CRUD - Create operation

  async create(order: Order) {
    const [Result] = await databaseClient.query<Result>(
      "insert into order_table (firstname, lastname, address, phone_number) values (?, ?, ?, ?)",
      [order.firstname, order.lastname, order.address, order.phone],
    );
    return Result.insertId;
  }

  async createBelongs(saladId: number, orderId: number) {
    const [Result] = await databaseClient.query<Result>(
      "insert into belongs (salad_id, order_id) values (?, ?)",
      [saladId, orderId],
    );
    return Result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all orders from the "order" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from order_table",
    );

    // Return the array of orders
    return rows as Order[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing order

  // async update(order: order) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an order by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new OrderRepository();
