import Match from '../entities/Match';
import MatchesRepository from '../repositories/MatchesRepository';

interface IRequest {
  day: Date;
  start: Date;
  end: Date;
  leagueId: number;
  homeTeam: number;
  awayTeam: number;
}

export default class CreateMatchService {
  public async execute({
    day,
    start,
    end,
    homeTeam,
    awayTeam,
  }: IRequest): Promise<Match> {
    const matchesRepository = new MatchesRepository();
    const match = await matchesRepository.create({
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
