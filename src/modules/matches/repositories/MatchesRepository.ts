import PrismaService from '@modules/prisma/services/PrismaService';
import Match from '../entities/Match';

interface IRequest {
  day: Date;
  start: Date;
  end: Date;
  leagueId: number;
  homeTeam: number;
  awayTeam: number;
}

interface IRequestUpdate {
  id: number;
  day: Date;
  start: Date;
  end: Date;
  homeTeamScoreboard: number;
  awayTeamScoreboard: number;
  leagueId: number;
  homeTeam: number;
  awayTeam: number;
}

export default class MatchesRepository {
  public async findById(id: number): Promise<Match | undefined> {
    const prisma = new PrismaService();
    const match = await prisma.matches.findFirst({
      where: {
        id,
      },
    });
    return match;
  }

  public async create({
    day,
    start,
    end,
    homeTeam,
    awayTeam,
    leagueId,
  }: IRequest): Promise<Match | undefined> {
    const prisma = new PrismaService();
    const match = await prisma.matches.create({
      data: {
        day,
        start,
        end,
        home_team: homeTeam,
        away_team: awayTeam,
        league_id: leagueId,
      },
    });
    return match;
  }

  public async update({
    id,
    day,
    start,
    end,
    homeTeam,
    awayTeam,
  }: IRequestUpdate): Promise<Match | undefined> {
    const prisma = new PrismaService();

    const match = await prisma.matches.update({
      where: {
        id,
      },
      data: {
        day,
        start,
        end,
        home_team: homeTeam,
        away_team: awayTeam,
      },
    });
    return match;
  }

  public async delete(id: number): Promise<Match | undefined> {
    const prisma = new PrismaService();
    const match = await prisma.matches.delete({
      where: {
        id,
      },
    });
    return match;
  }

  public async findByDay(day: Date): Promise<Match | undefined> {
    const prisma = new PrismaService();
    const match = await prisma.matches.findFirst({
      where: {
        day,
      },
    });
    return match;
  }
}
