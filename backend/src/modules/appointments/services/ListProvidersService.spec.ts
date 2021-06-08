import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toStrictEqual([user1, user2]);
  });

  it('should be able to list the providers from cache', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const cacheKey = `providers-list:${loggedUser.id}`;

    const cacheSaveFn = jest.spyOn(fakeCacheProvider, 'save');

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toStrictEqual([user1, user2]);

    expect(cacheSaveFn).toHaveBeenCalledWith(cacheKey, [user1, user2]);

    const cacheRestoreFn = jest.spyOn(fakeCacheProvider, 'recover');

    await expect(
      listProvidersService.execute({
        user_id: loggedUser.id,
      }),
    ).resolves.toEqual(providers);

    expect(cacheRestoreFn).toHaveBeenCalledWith(cacheKey);
    expect(cacheRestoreFn).toHaveReturned();
  });
});
