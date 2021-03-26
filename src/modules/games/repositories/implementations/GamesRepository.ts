import { createQueryBuilder, getRepository, Like, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder()
      .where("lower(title) LIKE :q", {q: `%${param.toLowerCase()}%`}).getMany();

      return games;
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("SELECT COUNT(*) FROM games"); 
    // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = await createQueryBuilder(User, "users")
    .leftJoin("users.games", "games").where("games.Id = :q", {q: id}).getMany();

    return users;
      // Complete usando query builder
  }
}
