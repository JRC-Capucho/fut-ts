import AppError from '@shared/errors/AppError';
import League from '../entities/League';
import LeaguesRepository from '../repositories/LeaguesRepository';

interface IRequest {
  name: string;
  start: Date;
  end: Date;
  user_id: number;
}

export default class CreateLeagueService {
  public async execute(dto: IRequest): Promise<League> {
    const leaguesRepository = new LeaguesRepository();

    const nameExists = await leaguesRepository.findByName(dto.name);

    if (nameExists) throw new AppError('Name already exist.', 409);

    const league = await leaguesRepository.create(dto);

    return league;
  }
}
