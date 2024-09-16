import * as argon2 from "argon2";
import type { RequestHandler } from "express";
import employeeRepository from "./EmployeeRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const employee = await employeeRepository.readByUsername(req.body.username);

    if (!employee) {
      res.status(422).json({
        message:
          "We couldn't find any Employee account corresponding. Please, try again.",
      });
    }

    const verifiedPassword = await argon2.verify(
      employee.password,
      req.body.password,
    );

    if (!verifiedPassword) {
      res.status(422).json({
        message:
          "We couldn't find any Employee account corresponding. Please, try again.",
      });
    }

    const account = {
      id: employee.id,
      username: employee.username,
    };

    res.json(account);
  } catch (err) {
    next(err);
  }
};

export default { login };
