import AppError from '@shared/errors/AppError';
import { Player } from '../entities/Player';
import PlayerRepository from '../repositories/PlayersRepository';

interface IRequest {
  id: number;
  name: string;
  shirtNumber: number;
  teamId: number;
}

export default class UpdatePlayerService {
  public async execute({
    id,
    name,
    shirtNumber,
    teamId,
  }: IRequest): Promise<Player> {
    const playersRepository = new PlayerRepository();

    const oldPlayer = await playersRepository.findById(id);

    if (!oldPlayer) throw new AppError("Player don't exist.", 404);

    const numberExists = await playersRepository.findByShirtNumber(
      teamId,
      shirtNumber,
    );

    if (numberExists && shirtNumber != oldPlayer.shirtNumber)
      throw new AppError('Number already used.', 409);

    const player = await playersRepository.update({
      id,
      name,
      shirtNumber,
      teamId,
    });

    return player;
  }
}
