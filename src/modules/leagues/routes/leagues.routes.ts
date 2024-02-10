import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import LeaguesController from '../controllers/LeaguesController';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';

const leaguesRouter = Router();
const leaguesController = new LeaguesController();

leaguesRouter.get('/:id', isAuthenticated, leaguesController.listTable);

leaguesRouter.delete(
  '/:id',
  isAuthenticated,

  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  leaguesController.delete,
);

leaguesRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      start: Joi.date().required(),
      end: Joi.date().required(),
      userId: Joi.number().required(),
    },
  }),
  leaguesController.create,
);

leaguesRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      start: Joi.date(),
      end: Joi.date(),
    },
  }),
  leaguesController.update,
);

export default leaguesRouter;
