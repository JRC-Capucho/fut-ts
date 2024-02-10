import AppError from '@shared/errors/AppError';
import CreateMatchService from '../services/CreateMatchService';

export default class MatchesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { day, start, end, homeTeam, awayTeam, leagueId } = req.body;

    const createMatch = new CreateMatchService();

    const match = await createMatch.execute({
      day,
      start,
      end,
      homeTeam,
      awayTeam,
      leagueId,
    });

    if (!match) throw new AppError('Failed to created.', 500);

    return res.status(200).json({ message: 'Resource successfully created!' });
  }

  public async update(req: Request, res: Response): Promise<Response> {}
}
