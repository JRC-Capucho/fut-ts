import { Player } from '../entities/Player';
import PlayerRepository from '../repositories/PlayersRepository';

export default class ListPlayerService {
  public async execute(): Promise<Player[] | undefined> {
    const playersRepository = new PlayerRepository();
    const players = await playersRepository.list();
    return players;
  }
}
