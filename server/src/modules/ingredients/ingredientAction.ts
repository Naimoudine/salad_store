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

const browseCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await ingredientRepository.readAllCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation

// The A of BREAD - Add (Create) operation

const add: RequestHandler = async (req, res, next) => {
  try {
    const newIngredient = {
      name: req.body.name,
      url: req.body.url,
      price: req.body.price,
      category: req.body.category,
    };
    const insertedId = await ingredientRepository.create(newIngredient);
    res.status(201).json(insertedId);
  } catch (err) {
    next(err);
  }
};

export default { browse, browseCategories, add };
