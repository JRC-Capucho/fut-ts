import League from '../entities/League';
import LeaguesRepository from '../repositories/LeaguesRepository';

export default class DeleteLeagueService {
  public async execute(id: number): Promise<League> {
    const leaguesRepository = new LeaguesRepository();

    const league = await leaguesRepository.delete(id);

    return league;
  }
}
