import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string(),
    },
  }),
  matchesController.update,
);

matchesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  matchesController.create,
);

export default matchesRouter;
