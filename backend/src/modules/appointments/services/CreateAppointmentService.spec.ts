import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 7, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 2, 7, 13),
      user_id: '321',
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.user_id).toBe('321');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create a new appointment with same date', async () => {
    const appointmentDate = new Date(2021, 2, 23, 17);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '321',
      provider_id: '123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '321',
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 7, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 7, 11),
        user_id: '321',
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 7, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 7, 13),
        user_id: '123',
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before or after working hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 7, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 8, 7),
        user_id: '321',
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 8, 18),
        user_id: '321',
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
