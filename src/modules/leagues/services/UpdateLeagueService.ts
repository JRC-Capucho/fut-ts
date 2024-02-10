import AppError from '@shared/errors/AppError';
import League from '../entities/League';
import LeaguesRepository from '../repositories/LeaguesRepository';

interface IRequest {
  id: number;
  name: string;
  start: Date;
  end: Date;
}

export default class UpdateLeagueService {
  public async execute({ id, name, start, end }: IRequest): Promise<League> {
    const leaguesRepository = new LeaguesRepository();

    const oldLeague = await leaguesRepository.findById(id);

    if (!oldLeague) throw new AppError('The league does not exist.', 404);

    const leagueExists = await leaguesRepository.findByName(name);

    if (leagueExists && name != oldLeague.name)
      throw new AppError('League already exists', 409);

    const league = await leaguesRepository.update({ id, name, start, end });

    return league;
  }
}
