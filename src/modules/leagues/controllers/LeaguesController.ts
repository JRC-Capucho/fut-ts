import { Request, Response } from 'express';
import CreateLeagueService from '../services/CreateLeagueService';
import UpdateLeagueService from '../services/UpdateLeagueService';
import AppError from '@shared/errors/AppError';
import ListTableLeagueService from '../services/ListTableLeagueService';
import DeleteLeagueService from '../services/DeleteLeagueService';

export default class LeaguesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, start, end, userId } = req.body;

    const createLeague = new CreateLeagueService();

    const league = await createLeague.execute({
      name,
      start,
      end,
      user_id: userId,
    });

    if (!league) throw new AppError('Failed to create.', 500);

    return res.status(200).json({ message: 'Resource successfully created!' });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, start, end } = req.body;

    const { id } = req.params;

    const newId = Number(id);

    const updateLeague = new UpdateLeagueService();

    const league = await updateLeague.execute({ id: newId, name, start, end });

    if (!league) throw new AppError('Failed to update.', 500);

    return res.status(200).json({ message: 'Resource successfully updated!' });
  }

  public async listTable(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const newId = Number(id);

    const listTable = new ListTableLeagueService();

    const table = await listTable.execute(newId);

    return res.status(200).json(table);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const newId = Number(id);

    const deleteLeague = new DeleteLeagueService();
    const league = await deleteLeague.execute(newId);

    if (!league) throw new AppError('Failed to deleted.', 500);

    return res.status(200).json({ message: 'Resource successfully deleted!' });
  }
}
