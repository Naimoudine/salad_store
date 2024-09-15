import type { RequestHandler } from "express";

// Import access to data
import ingredientRepository from "../ingredients/ingredientRepository";
import saladRepository from "./saladRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all salads
    const salads = await saladRepository.readAll();

    // Respond with the salads in JSON format
    res.json(salads);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newSalad = {
      name: req.body.name,
      url: req.body.url,
      sauce: req.body.sauce,
    };
    const saladId = await saladRepository.create(newSalad);
    if (saladId) {
      for (const ingredient of req.body.ingredients) {
        const id = await ingredientRepository.readIdByName(ingredient);
        await saladRepository.createCompose(id.id, saladId);
      }
      res.sendStatus(201);
    } else {
      throw new Error("error while create compose");
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, add };
