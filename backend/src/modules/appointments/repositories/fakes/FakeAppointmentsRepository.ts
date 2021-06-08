import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment: Appointment | undefined = this.appointments.find(
      (appointment) =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    const result: Appointment | undefined = await new Promise((resolve) =>
      resolve(findAppointment),
    );

    return result;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[] | undefined> {
    const appointments: Appointment[] = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) === month - 1 &&
        getYear(appointment.date) === year,
    );

    const result: Appointment[] | undefined = await new Promise((resolve) =>
      resolve(appointments),
    );

    return result;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[] | undefined> {
    const appointments: Appointment[] = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) === month - 1 &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day,
    );

    const result: Appointment[] | undefined = await new Promise((resolve) =>
      resolve(appointments),
    );

    return result;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    const result: Appointment = await new Promise((resolve) =>
      resolve(appointment),
    );

    return result;
  }
}

export default FakeAppointmentsRepository;
