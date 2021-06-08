import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

interface IRequest extends Request {
  body: {
    provider_id: string;
    date: string;
  };
}

export default class AppointmentsController {
  public async create(
    request: IRequest,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createdAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createdAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}
