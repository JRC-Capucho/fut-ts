import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import MatchesController from '../controllers/MatchesController';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.delete('/:id', isAuthenticated, matchesController.delete);

matchesRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
    [Segments.BODY]: {
      day: Joi.date().iso().required(),
      start: Joi.string()
        .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
        .required(),
      end: Joi.string()
        .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
        .required(),
      homeTeam: Joi.number().integer().required(),
      awayTeam: Joi.number().integer().required(),
      leagueId: Joi.number().integer().required(),
    },
  }),
  matchesController.update,
);

matchesRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      day: Joi.date().iso().required(),
      start: Joi.string()
        .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
        .required(),
      end: Joi.string()
        .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
        .required(),
      homeTeam: Joi.number().integer().required(),
      awayTeam: Joi.number().integer().required(),
      leagueId: Joi.number().integer().required(),
    },
  }),
  matchesController.create,
);

matchesRouter.patch(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
    [Segments.BODY]: {
      players: Joi.array().required(),
      homeTeam: Joi.number().integer().required(),
      awayTeam: Joi.number().integer().required(),
      awayTeamScoreboard: Joi.number().integer().required(),
      homeTeamScoreboard: Joi.number().integer().required(),
    },
  }),
  matchesController.endMatch
);

export default matchesRouter;
