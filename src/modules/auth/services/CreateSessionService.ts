import UsersRepository from '@modules/users/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import configAuth from '@config/auth';
import User from '@modules/users/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = new UsersRepository();

    const jwt = require('jsonwebtoken');

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination.', 401);

    const matched = await compare(password, user.password);

    if (!matched)
      throw new AppError('Incorrect email/password combination.', 401);

    const token = jwt.sign({}, configAuth.jwt.secret, {
      subject: String(user.id),
      expiresIn: configAuth.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
