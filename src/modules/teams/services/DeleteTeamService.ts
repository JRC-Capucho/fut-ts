import Team from '../entities/Team';
import TeamsRepository from '../repositories/TeamsRepository';

export default class DeleteTeamService {
  public async execute(id: number): Promise<Team> {
    const teamsRepository = new TeamsRepository();

    const league = await teamsRepository.delete(id);

    return league;
  }
}
