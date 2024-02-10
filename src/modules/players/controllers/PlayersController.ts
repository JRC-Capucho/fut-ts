import { Response, Request } from 'express';
import CreatePlayerService from '../services/CreatePlayerService';
import AppError from '@shared/errors/AppError';
import UpdatePlayerService from '../services/UpdatePlayerService';
import ListPlayerService from '../services/ListPlayerService';
import ListByTeamPlayerService from '../services/ListByTeamPlayerService';
import DeletePlayerService from '../services/DeletePlayerService';

export default class PlayersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, shirtNumber, teamId } = req.body;

    const createPlayer = new CreatePlayerService();

    const player = await createPlayer.execute({ name, shirtNumber, teamId });

    if (!player) throw new AppError('Failed to create.', 500);

    return res.status(200).json({ message: 'Resource successfully created!' });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, shirtNumber, teamId } = req.body;

    const { id } = req.params;

    const newId = Number(id);

    const updatePlayer = new UpdatePlayerService();

    const player = await updatePlayer.execute({
      id: newId,
      name,
      shirtNumber,
      teamId,
    });

    if (!player) throw new AppError('Failed to update.', 500);

    return res.status(200).json({ message: 'Resource successfully updated!' });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listPlayer = new ListPlayerService();

    const players = await listPlayer.execute();

    return res.status(200).json(players);
  }

  public async listByTeam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const newId = Number(id);

    const listByTeamPlayer = new ListByTeamPlayerService();

    const players = await listByTeamPlayer.execute(newId);

    return res.status(200).json(players);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const newId = Number(id);

    const deletePlayer = new DeletePlayerService();

    const player = await deletePlayer.execute(newId);

    if (!player) throw new AppError('Failed to create.', 500);

    return res.status(200).json({ message: 'Resource successfully deleted!' });
  }
}
