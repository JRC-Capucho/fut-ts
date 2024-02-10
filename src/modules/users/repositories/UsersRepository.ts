import PrismaService from '@modules/prisma/services/PrismaService';
import User from '../entities/User';

export default class UsersRepository {
  public async create(dto: User): Promise<User | undefined> {
    const prisma = new PrismaService();
    const user = await prisma.user.create({
      data: {
        ...dto,
      },
    });
    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const prisma = new PrismaService();

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  public async update({ name, email, password }: User): Promise<User> {
    const prisma = new PrismaService();
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        password,
      },
    });
    return user;
  }
}
