import { Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import { UserService } from '../services/user.service.js'

const service = new UserService

export const signUp = Router();

signUp.post(
  '/',
  // middlewares
  // Validación y sanitización de los datos de entrada
  body('username').not().isEmpty().trim(),

  check('username').custom(async (username) => {

    const maybeUser = await service.findByUserName(username)

    if (maybeUser) {
      throw new Error('username already in use');
    }

    return true;
  }),

  body('password').isLength({ min: 6 }),

  //
  async (request, response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const user = await service.create(request.body)

      return response
        .status(201)
        .json({ username: user.username, createdAt: user.createdAt });
    } catch (error) {
      console.error(`[signIn]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
