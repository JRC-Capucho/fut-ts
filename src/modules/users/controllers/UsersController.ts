import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import AppError from '@shared/errors/AppError';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    if (!user) throw new AppError('Failed to create.', 500);

    return response
      .status(200)
      .json({ message: 'Resource successfully created!' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({ name, email, password });

    if (!user) throw new AppError('Failed to create.', 500);

    return response
      .status(200)
      .json({ message: 'Resource successfully created!' });
  }
}
