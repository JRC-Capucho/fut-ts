import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PlayersController from '../controllers/PlayersController';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';

const playersRouter = Router();
const playerController = new PlayersController();

playersRouter.get('/', isAuthenticated, playerController.index);

playersRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  playerController.index,
);

playersRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      shirtNumber: Joi.number().required(),
      teamId: Joi.number().required(),
    },
  }),
  playerController.create,
);

playersRouter.put(
  '/:id',
  isAuthenticated,

  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      shirtNumber: Joi.number(),
      teamId: Joi.number(),
    },
  }),
  playerController.update,
);

playersRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  playerController.delete,
);

export default playersRouter;
