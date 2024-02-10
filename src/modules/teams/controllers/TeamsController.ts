import AppError from '@shared/errors/AppError';
import CreateTeamService from '../services/CreateTeamService';
import { Response, Request } from 'express';
import ListTeamService from '../services/ListTeamService';
import UpdateTeamService from '../services/UpdateTeamService';
import DeleteTeamService from '../services/DeleteTeamService';

export default class TeamsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, leagueId } = req.body;
    const createTeam = new CreateTeamService();

    const team = await createTeam.execute({ name, leagueId });

    if (!team) throw new AppError('Failed to create.', 500);

    return res.status(200).json({ message: 'Resource successfully created!' });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listTeam = new ListTeamService();

    const teams = await listTeam.execute();

    return res.status(200).json(teams);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const { id } = req.params;

    const updateTeam = new UpdateTeamService();
    const team = await updateTeam.execute({ id, name });

    if (!team) throw new AppError('Failed to update.', 500);

    return res.status(200).json({ message: 'Resource successfully updated!' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const newId = Number(id);

    const deleteTeams = new DeleteTeamService();

    const team = await deleteTeams.execute(newId);

    if (!team) throw new AppError('Failed to deleted.', 500);

    return res.status(200).json({ message: 'Resource successfully deleted!' });
  }
}
