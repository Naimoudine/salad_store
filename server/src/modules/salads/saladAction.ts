import type { RequestHandler } from "express";

// Import access to data
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

export default { browse };
