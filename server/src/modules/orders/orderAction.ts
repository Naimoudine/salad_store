import type { RequestHandler } from "express";

// Import access to data
import saladRepository from "../salads/saladRepository";
import orderRepository from "./orderRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all orders
    const orders = await orderRepository.readAll();

    // Respond with the orders in JSON format
    res.json(orders);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const salads = req.body.salads;
    let saladId: number | null = null;

    for (const salad of salads) {
      const exists = await saladRepository.readByName(salad.name);
      if (!exists) {
        saladId = await saladRepository.create(salad);
      } else {
        saladId = exists.id;
      }
    }

    const order = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    };

    const orderId = await orderRepository.create(order);

    if (!orderId && !saladId) {
      throw new Error("Error while creating belongs");
    }

    if (saladId !== null) {
      const insertedId = await orderRepository.createBelongs(saladId, orderId);
      res.status(201).json(insertedId);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, add };
