import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import CreateMatchService from '../services/CreateMatchService';
import UpdateMatchService from '../services/UpdateMatchService';
import DeleteTeamService from '@modules/teams/services/DeleteTeamService';
import UpdateEndMatchService from '../services/UpdateEndMatchService';

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

  public async update(req: Request, res: Response): Promise<Response> {
    const { day, start, end, homeTeam, awayTeam, leagueId } = req.body;
    const { id } = req.params;
    const newId = Number(id);
    const updateMatch = new UpdateMatchService();
    const match = await updateMatch.execute({
      id: newId,
      day,
      start,
      end,
      homeTeam,
      awayTeam,
      leagueId,
    });
    if (!match) throw new AppError('Failed to updated.', 500);

    return res.status(200).json({ message: 'Resource successfully updated!' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const newId = Number(id);

    const deleteMatch = new DeleteTeamService();

    const match = await deleteMatch.execute(newId);

    if (!match) throw new AppError('Failed to deleted.', 500);

    return res.status(200).json({ message: 'Resource successfully deleted!' });
  }

  public async endMatch(req:Request,res:Response):Promise<Response>{
    const {
    players,
    homeTeam,
    awayTeam,
    homeTeamScoreboard,
    awayTeamScoreboard,
    } = req.body
      const {id}= req.params
    const newId = Number(id)
    const endMatch = new UpdateEndMatchService()
    const match = await endMatch.execute({id:newId,players,homeTeam,awayTeam,homeTeamScoreboard,awayTeamScoreboard})

    if (!match) throw new AppError('Failed to updated.', 500);

    return res.status(200).json({ message: 'Resource successfully updated!' });
  }
}
