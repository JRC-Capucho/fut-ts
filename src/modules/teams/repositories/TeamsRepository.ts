import PrismaService from '@modules/prisma/services/PrismaService';
import Team from '../entities/Team';

interface IRequest {
  name: string;
  league_id: number;
}

interface IRequestEnd{
  id:number
  gols:number
  points:number
}

interface IRequestUpdate {
  id: number;
  name: string;
}

export default class TeamsRepository {
  public async findByName(name: string): Promise<Team | undefined> {
    const prisma = new PrismaService();

    const team = await prisma.team.findFirst({
      where: {
        name,
      },
    });
    return team;
  }

  public async findById(id: number): Promise<Team | undefined> {
    const prisma = new PrismaService();

    const team = await prisma.team.findFirst({
      where: {
        id,
      },
    });

    return team;
  }

  public async create(dto: IRequest): Promise<Team | undefined> {
    const prisma = new PrismaService();

    const team = await prisma.team.create({
      data: {
        ...dto,
      },
    });
    return team;
  }

  public async update({ id, name }: IRequestUpdate): Promise<Team | undefined> {
    const prisma = new PrismaService();
    const team = await prisma.team.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return team;
  }

  public async list(): Promise<Team[] | undefined> {
    const prisma = new PrismaService();
    const teams = await prisma.team.findMany();
    return teams;
  }

  public async delete(id: number): Promise<Team | undefined> {
    const prisma = new PrismaService();

    const team = await prisma.team.delete({
      where: {
        id,
      },
    });

    return team;
  }

  public async updateEndMatch({id,gols,points}:IRequestEnd):Promise<Team|undefined>
{
    const prisma = new PrismaService()

    const team = await prisma.team.update({
      where:{
        id
      },
      data:{
        gols,
        points
      }
    })
    return team
  }
}
