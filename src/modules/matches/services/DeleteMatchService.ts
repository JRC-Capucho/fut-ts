import Match from "../entities/Match";
import MatchesRepository from "../repositories/MatchesRepository";

export default class DeleteMatchService{
  public async execute(id:number):Promise<Match | undefined>{
    const matchesRepository = new MatchesRepository

    const match = await matchesRepository.delete(id)

    return match

  }
}
