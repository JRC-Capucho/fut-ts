import PrismaService from '@modules/prisma/services/PrismaService';
import Team from '../entities/Team';
import TeamsRepository from '../repositories/TeamsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: number;
  name: string;
}
export default class UpdateTeamService {
  public async execute({ id, name }: IRequest): Promise<Team> {
    const teamsRepository = new TeamsRepository();

    const oldTeam = await teamsRepository.findById(id);

    if (!oldTeam) throw new AppError('The team does not exist.', 404);

    const teamsExists = await teamsRepository.findByName(name);

    if (teamsExists && name != oldTeam.name)
      throw new AppError('Team already exists', 409);

    const team = await teamsRepository.update({ id, name });

    return team;
  }
}
