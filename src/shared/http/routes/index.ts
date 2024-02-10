import sessionRouter from '@modules/auth/routes/sessions.routes';
import leaguesRouter from '@modules/leagues/routes/leagues.routes';
import matchesRouter from '@modules/matches/routes/matches.routes';
import playersRouter from '@modules/players/routes/players.routes';
import teamsRouter from '@modules/teams/routes/teams.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/login', sessionRouter);
routes.use('/leagues', leaguesRouter);
routes.use('/teams', teamsRouter);
routes.use('/players', playersRouter);
routes.use('/matches', matchesRouter);

export default routes;
