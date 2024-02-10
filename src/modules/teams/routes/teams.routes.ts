import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import TeamsController from '../controllers/TeamsController';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/', isAuthenticated, teamsController.index);

teamsRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  teamsController.delete,
);

teamsRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      leagueId: Joi.number().required(),
    },
  }),
  teamsController.create,
);

teamsRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
    },
  }),
  teamsController.update,
);

export default teamsRouter;
