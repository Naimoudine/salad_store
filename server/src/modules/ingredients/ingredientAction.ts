import type { RequestHandler } from "express";

// Import access to data
import ingredientRepository from "./ingredientRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all ingredients
    const ingredients = await ingredientRepository.readAll();

    // Respond with the ingredients in JSON format
    res.json(ingredients);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation

// The A of BREAD - Add (Create) operation

export default { browse };
