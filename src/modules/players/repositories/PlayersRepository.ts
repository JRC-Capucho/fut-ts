import PrismaService from '@modules/prisma/services/PrismaService';
import { Player } from '../entities/Player';

interface IRequest {
  name: string;
  shirtNumber: number;
  teamId: number;
}

interface IRequestUpdate {
  id: number;
  name?: string;
  shirtNumber?: number;
  teamId?: number;
}

export default class PlayerRepository {
  public async findByShirtNumber(
    teamId: number,
    shirtNumber: number,
  ): Promise<Player | undefined> {
    const prisma = new PrismaService();
    const player = await prisma.player.findFirst({
      where: {
        team_id: teamId,
        shirt_number: shirtNumber,
      },
    });
    return player;
  }

  public async findById(id: number): Promise<Player | undefined> {
    const prisma = new PrismaService();
    const player = await prisma.player.findFirst({
      where: {
        id,
      },
    });
    return player;
  }

  public async create({
    name,
    shirtNumber,
    teamId,
  }: IRequest): Promise<Player | undefined> {
    const prisma = new PrismaService();

    const player = await prisma.player.create({
      data: {
        name: name,
        shirt_number: shirtNumber,
        team_id: teamId,
      },
    });
    return player;
  }

  public async update({
    id,
    name,
    shirtNumber,
    teamId,
  }: IRequestUpdate): Promise<Player | undefined> {
    const prisma = new PrismaService();

    const player = await prisma.player.update({
      where: {
        id,
      },
      data: {
        name,
        shirt_number: shirtNumber,
        team_id: teamId,
      },
    });
    return player;
  }
  public async list(): Promise<Player[] | undefined> {
    const prisma = new PrismaService();
    const players = await prisma.player.findMany();
    return players;
  }

  public async listByTeam(id: number): Promise<Player[] | undefined> {
    const prisma = new PrismaService();
    const players = await prisma.player.findMany({
      where: {
        team_id: id,
      },
    });
    return players;
  }

  public async delete(id: number): Promise<Player | undefined> {
    const prisma = new PrismaService();
    const player = await prisma.player.delete({
      where: {
        id,
      },
    });
    return player;
  }

  public async updateEndMatch(id:number,gols:number):Promise<Player | undefined>{
    const prisma = new PrismaService();
    const player = await prisma.player.update({
      where:{
        id
      },
      data:{
        gols
      }
    })
    return player
  }
}
