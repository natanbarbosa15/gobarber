import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

interface IRequest extends Request {
  body: {
    provider_id: string;
    year: number;
    month: number;
    day: number;
  };
}

export default class ProviderAppointmentsController {
  public async index(request: IRequest, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const createdAppointment = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointment = await createdAppointment.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointment));
  }
}
