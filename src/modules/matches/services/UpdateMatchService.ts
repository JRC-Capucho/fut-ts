import AppError from '@shared/errors/AppError';
import Match from '../entities/Match';
import MatchesRepository from '../repositories/MatchesRepository';
import LeaguesRepository from '@modules/leagues/repositories/LeaguesRepository';

interface IRequest {
  id:number
  day: Date;
  start: Date;
  end: Date;
  leagueId: number;
  homeTeam: number;
  awayTeam: number;
}

export default class UpdateMatchService {
  public async execute({
    day,
    start,
    end,
    homeTeam,
    awayTeam,
    leagueId,
  }: IRequest): Promise<Match> {
    if (end < start)
      throw new AppError('End time is less than start time.', 422);

    const matchesRepository = new MatchesRepository();
    const leaguesRepository = new LeaguesRepository();

    const league = await leaguesRepository.findById(leagueId);

    if (!league) throw new AppError('League does not exist.', 404);

    if (day < league.start || day > league.end)
      throw new AppError(
        "The game date must be between the league's start and end dates.",
        422,
      );

    const existingGames = await matchesRepository.findByDay(day);

    if (existingGames) {
      for (const existingGame of existingGames) {
        const startDate = `${existingGame.start.getUTCHours().toString().padStart(2, '0')}:${existingGame.start.getUTCMinutes().toString().padStart(2, '0')}`;
        const endDate = `${existingGame.end.getUTCHours().toString().padStart(2, '0')}:${existingGame.end.getUTCMinutes().toString().padStart(2, '0')}`;
  if ((start.toString() >= startDate && start.toString() <= endDate) || (end.toString() >= startDate && end.toString() <= endDate))
      throw new AppError('The new match overlaps with an existing match.',  422);
    }
    }

    const match = await matchesRepository.update({
      id,
      day,
      start,
      end,
      homeTeam,
      awayTeam,
      leagueId,
    });

    return match;
  }
}
