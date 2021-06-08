import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

interface IRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export default class UsersController {
  public async create(
    request: IRequest,
    response: Response,
  ): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.json(classToClass(user));
  }
}
