import { Player } from '../entities/Player';
import PlayerRepository from '../repositories/PlayersRepository';

export default class ListByTeamPlayerService {
  public async execute(id: number): Promise<Player[] | undefined> {
    const playersRepository = new PlayerRepository();
    const players = await playersRepository.listByTeam(id);
    return players;
  }
}
