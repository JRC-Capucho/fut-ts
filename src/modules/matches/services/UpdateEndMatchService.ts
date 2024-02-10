import AppError from '@shared/errors/AppError';
import Match from '../entities/Match';
import MatchesRepository from '../repositories/MatchesRepository';
import PlayerRepository from '@modules/players/repositories/PlayersRepository';

interface PlayerData {
  id: number;
  gols: number;
}

interface IRequest {
  id: number;
  players: PlayerData[];
  homeTeamScoreboard: number;
  awayTeamScoreboard: number;
  homeTeam: number;
  awayTeam: number;
}

export default class UpdateEndMatchService {
  public async execute({
    id,
    players,
    homeTeam,
    awayTeam,
    homeTeamScoreboard,
    awayTeamScoreboard,
  }: IRequest): Promise<Match | undefined> {
    const matchesRepository = new MatchesRepository();
    const playersRepository = new PlayerRepository();
    const teamsRepository = new MatchesRepository();

    const finishMatch = await matchesRepository.findById(id);

    if (!finishMatch) throw new AppError('This game does not exist.', 404);

    let homeCountGols = 0;
    let awayCountGols = 0;

    for (const playerData of players) {
      const player = await playersRepository.findById(playerData.id);

      if (!player) continue;

      if (player.teamId === finishMatch.homeTeam) {
        homeCountGols += playerData.gols;
      } else if (player.teamId === finishMatch.awayTeam) {
        awayCountGols += playerData.gols;
      }
    }

    if (
      homeCountGols !== homeTeamScoreboard ||
      awayCountGols !== awayTeamScoreboard
    ) {
      throw new AppError('Goal discrepancy.', 409);
    }

    let winner = 0;

    if (homeTeamScoreboard > awayTeamScoreboard) {
      await teamsRepository.updateEndMatch(homeTeam, homeTeamScoreboard, 3);
      winner = homeTeam;
    } else if (homeTeamScoreboard < awayTeamScoreboard) {
      await teamsRepository.updateEndMatch(awayTeam, awayTeamScoreboard, 3);
      winner = awayTeam;
    } else {
      await teamsRepository.updateEndMatch(homeTeam, homeTeamScoreboard, 1);
      await teamsRepository.updateEndMatch(awayTeam, awayTeamScoreboard, 1);
    }

    for (const playerData of players) {
      await playersRepository.updateEndMatch(playerData.id, playerData.gols);
    }

    const match = await matchesRepository.updateEndMatch(
      id,
      homeTeamScoreboard,
      awayTeamScoreboard,
      winner,
    );

    return match;
  }
}
