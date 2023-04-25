import { Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import passport from 'passport'
import { ProfileService } from '../../services/profile.services.js'
const service = new ProfileService

export const updateUser = Router();

updateUser.put(
  '/',
  // @todo: Validación y sanitización de los datos de entrada
  body('name').not().isEmpty().trim(),

  // @todo: Actualizar información usuario según la sesión del token JWT
  passport.authenticate('jwt', { session: false }),
  async (request, response) => {
    try {

      const profile = await service.findByUserId(request.user.sub)

      const update = await service.updateById(profile._id.toJSON(), request.body)

      return response.status(200).json({
        update
      });
    } catch (error) {
      console.error(`[signIn]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
