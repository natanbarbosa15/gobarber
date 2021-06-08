import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

interface IRequest extends Request {
  body: {
    email: string;
  };
}

export default class ForgotPasswordController {
  public async create(
    request: IRequest,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({ email });

    return response.sendStatus(204);
  }
}
