import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

interface IRequest extends Request {
  body: {
    token: string;
    password: string;
  };
}

export default class ResetPasswordController {
  public async create(
    request: IRequest,
    response: Response,
  ): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ token, password });

    return response.sendStatus(204);
  }
}
