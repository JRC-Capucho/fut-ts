import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import UsersRepository from '../repositories/UsersRepository';
import User from '../entities/User';

class UpdateUserService {
  public async execute({ name, email, password }: User): Promise<User> {
    const usersRepository = new UsersRepository();

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) throw new AppError('Email address already used.');

    const hashedPassword = await hash(password, 8);

    const user = await usersRepository.update({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default UpdateUserService;
