import { Request, Response } from 'express';
import { container } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    let providers: IUserResponse[] | undefined = await listProviders.execute({
      user_id,
    });

    if (providers) {
      providers = providers.map((user) => {
        const resultUser = user;
        if (resultUser.password) delete resultUser.password;
        return resultUser;
      });
    }

    return response.json(providers);
  }
}
