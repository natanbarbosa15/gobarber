import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 2, 7, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 2, 7, 10, 0, 0),
    });

    const availability = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2021,
      month: 3,
      day: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });

  it('should be able to list appointments from cache', async () => {
    const provider_id = 'provider';
    const year = 2021;
    const month = 3;
    const day = 7;

    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id,
      user_id: 'user',
      date: new Date(year, month - 1, day, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id,
      user_id: 'user',
      date: new Date(year, month - 1, day, 10, 0, 0),
    });

    const cacheSaveFn = jest.spyOn(fakeCacheProvider, 'save');

    const availability = await listProviderAppointmentsService.execute({
      provider_id,
      year,
      month,
      day,
    });

    expect(availability).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );

    expect(cacheSaveFn).toHaveBeenCalledWith(cacheKey, [
      appointment1,
      appointment2,
    ]);

    const cacheRestoreFn = jest.spyOn(fakeCacheProvider, 'recover');

    await expect(
      listProviderAppointmentsService.execute({
        provider_id,
        year,
        month,
        day,
      }),
    ).resolves.toEqual(availability);

    expect(cacheRestoreFn).toHaveBeenCalledWith(cacheKey);
    expect(cacheRestoreFn).toHaveReturned();
  });
});
