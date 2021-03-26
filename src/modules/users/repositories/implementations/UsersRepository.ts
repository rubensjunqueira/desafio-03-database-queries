import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOneOrFail(user_id, {relations: ["games"]});
    return user;
    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query(
      "SELECT * FROM users ORDER BY first_name"
    ); 
    // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      `SELECT * FROM users 
      where concat(lower(first_name), ' ', lower(last_name)) = 
      concat(lower($1), ' ', lower($2))`, [first_name, last_name]
    ); 
    // Complete usando raw query
  }
}
