import { Router } from 'express';
import passport from 'passport'
import { ProfileService } from '../../services/profile.services.js'
const service = new ProfileService

export const deleteUser = Router();

deleteUser.delete(
  '/',
  // @todo: Validación y sanitización de los datos de entrada

  // @todo: Eliminar el usuario actual según la sesión del token JWT
  passport.authenticate('jwt', { session: false }),
  async (request, response) => {
    try {
      const profile = await service.findByUserId(request.user.sub)

      const deleteprofile = await service.deleteById(profile._id.toJSON())

      return response.status(200).json({
        deleteprofile
      });
    } catch (error) {
      console.error(`[signIn]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
