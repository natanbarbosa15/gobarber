import { uuid } from 'uuidv4';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private usersTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    return new Promise((resolve) => {
      const userToken = new UserToken();

      Object.assign(userToken, {
        id: uuid(),
        token: uuid(),
        user_id,
        created_at: new Date(),
        updated_at: new Date(),
      });

      this.usersTokens.push(userToken);

      resolve(userToken);
    });
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return new Promise((resolve) => {
      resolve(this.usersTokens.find((t) => t.token === token));
    });
  }
}

export default FakeUserTokensRepository;
