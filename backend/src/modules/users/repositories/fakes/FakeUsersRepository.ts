import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter((user) => user.id !== except_user_id);
    }

    return new Promise((resolve) => resolve(users));
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return new Promise((resolve) => resolve(findUser));
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return new Promise((resolve) => resolve(findUser));
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex((u) => u.id === user.id);

    if (findIndex != null && findIndex !== -1) this.users[findIndex] = user;
    else this.users.push(user);

    return new Promise((resolve) => resolve(user));
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    await this.save(user);

    return user;
  }
}

export default FakeUsersRepository;
