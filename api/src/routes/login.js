import { Router } from 'express';
import passport from 'passport'
import { body, validationResult } from 'express-validator';
import { AuthService } from '../services/auth.services.js'

const service = new AuthService

export const login = Router();

login.post(
  '/',
  // Validación y sanitización de los datos de entrada
  body('username').not().isEmpty().trim(),
  body('password').isLength({ min: 6 }),

  passport.authenticate('local', { session: false }), // upload user

  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const user = request.user

      const rta = await service.singToken(user)

      return response.status(201).json(rta);
    } catch (error) {
      console.error(`[signIn]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
