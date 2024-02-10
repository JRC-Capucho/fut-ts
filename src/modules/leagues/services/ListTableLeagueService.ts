import Team from '@modules/teams/entities/Team';
import LeaguesRepository from '../repositories/LeaguesRepository';

export default class ListTableLeagueService {
  public async execute(id: number): Promise<Team[] | undefined> {
    const leaguesRepository = new LeaguesRepository();

    const teams = await leaguesRepository.listTable(id);

    return teams;
  }
}
