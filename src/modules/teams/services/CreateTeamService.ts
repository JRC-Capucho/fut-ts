import AppError from '@shared/errors/AppError';
import Team from '../entities/Team';
import TeamsRepository from '../repositories/TeamsRepository';

interface IRequest {
  name: string;
  leagueId: number;
}
export default class CreateTeamService {
  public async execute({ name, leagueId }: IRequest): Promise<Team> {
    const teamsRepository = new TeamsRepository();

    const nameExists = await teamsRepository.findByName(name);

    if (nameExists) throw new AppError('Name already exists.', 409);

    const team = await teamsRepository.create({ name, league_id: leagueId });

    return team;
  }
}
