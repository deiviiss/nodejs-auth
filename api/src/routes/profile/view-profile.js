import { Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import passport from 'passport'
import { ProfileService } from '../../services/profile.services.js'
const service = new ProfileService

export const viewUser = Router();

viewUser.get(
  '/',
  // @todo: Validación y sanitización de los datos de entrada

  // @todo: Ver información del usuario actual según la sesión del token JWT
  passport.authenticate('jwt', { session: false }),
  async (request, response) => {
    try {

      const user = request.user
      const profile = await service.findByUserId(user.sub)

      return response.status(200).json({ profile })
    } catch (error) {
      console.error(`[profile]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
