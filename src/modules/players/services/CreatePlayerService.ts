import AppError from '@shared/errors/AppError';
import { Player } from '../entities/Player';
import PlayerRepository from '../repositories/PlayersRepository';

interface IRequest {
  name: string;
  shirtNumber: number;
  teamId: number;
}
export default class CreatePlayerService {
  public async execute({
    name,
    shirtNumber,
    teamId,
  }: IRequest): Promise<Player> {
    const playersRepository = new PlayerRepository();

    const numberExists = await playersRepository.findByShirtNumber(
      teamId,
      shirtNumber,
    );

    if (numberExists) throw new AppError('Number already used.', 409);

    const player = await playersRepository.create({
      name,
      shirtNumber,
      teamId,
    });

    return player;
  }
}
