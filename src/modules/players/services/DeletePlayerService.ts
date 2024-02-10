import { Player } from '../entities/Player';
import PlayerRepository from '../repositories/PlayersRepository';

export default class DeletePlayerService {
  public async execute(id: number): Promise<Player> {
    const playersRepository = new PlayerRepository();

    const player = await playersRepository.delete(id);

    return player;
  }
}
