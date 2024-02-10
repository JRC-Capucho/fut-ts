import PrismaService from '@modules/prisma/services/PrismaService';
import League from '../entities/League';
import Team from '@modules/teams/entities/Team';

interface IRequest {
  name: string;
  start: Date;
  end: Date;
  user_id: number;
}

interface IRequestUpdate {
  id: number;
  name?: string | null;
  start?: Date | null;
  end?: Date | null;
}

export default class LeaguesRepository {
  public async create(dto: IRequest): Promise<League | undefined> {
    const prisma = new PrismaService();
    const league = await prisma.league.create({
      data: {
        ...dto,
      },
    });
    return league;
  }

  public async findByName(name: string): Promise<League | undefined> {
    const prisma = new PrismaService();
    const league = await prisma.league.findFirst({
      where: {
        name,
      },
    });
    return league;
  }

  public async findById(id: number): Promise<League | undefined> {
    const prisma = new PrismaService();
    const league = await prisma.league.findFirst({
      where: {
        id,
      },
    });
    return league;
  }

  public async update({
    id,
    name,
    start,
    end,
  }: IRequestUpdate): Promise<League | undefined> {
    const prisma = new PrismaService();
    const league = await prisma.league.update({
      where: {
        id,
      },
      data: {
        name: name,
        start: start,
        end: end,
      },
    });
    return league;
  }

  public async listTable(id: number): Promise<Team[] | undefined> {
    const prisma = new PrismaService();

    const table = await prisma.team.findMany({
      where: {
        id,
      },
      orderBy: {
        points: 'desc',
      },
    });

    return table;
  }

  public async delete(id: number): Promise<League | undefined> {
    const prisma = new PrismaService();

    const league = await prisma.league.delete({
      where: {
        id,
      },
    });

    return league;
  }
}
