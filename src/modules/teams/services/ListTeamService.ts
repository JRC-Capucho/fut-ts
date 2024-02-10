import Team from '../entities/Team';
import TeamsRepository from '../repositories/TeamsRepository';

export default class ListTeamService {
  public async execute(): Promise<Team[] | undefined> {
    const teamsRepository = new TeamsRepository();
    const teams = await teamsRepository.list();
    return teams;
  }
}
