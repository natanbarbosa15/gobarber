import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  waitForElement,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import Dashboard from '../../pages/Dashboard';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

apiMock.onGet().reply(200, []);

const mockedHistoryPush = jest.fn();
const mockedUser = {
  id: 'e724c288-224d-4bd3-af3a-30560bcd6802',
  name: 'John Doe',
  email: 'johndoe@example.com',
  avatar_url: 'http://localhost:3333/files/e198b84232bf7f3b3de5-Doe.jpg',
};
const mockedSignOut = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: mockedUser,
      signOut: mockedSignOut,
    }),
  };
});

describe('Dashboard Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to list appointments', async () => {
    const apiResponse = [
      {
        id: 'c30dceba-5f8c-4ecf-abc8-ca2e8f2d0da0',
        provider_id: '506ee969-3bd0-478e-a2fb-0e5cc7baf2a6',
        user_id: 'e724c288-224d-4bd3-af3a-30560bcd6802',
        date: '2021-03-16T17:00:00.000Z',
        created_at: '2021-03-13T23:21:41.272Z',
        updated_at: '2021-03-13T23:21:41.272Z',
        user: mockedUser,
      },
      {
        id: '2a7d386a-b9ad-4bc5-8072-52df3f16e559',
        provider_id: '506ee969-3bd0-478e-a2fb-0e5cc7baf2a6',
        user_id: 'e724c288-224d-4bd3-af3a-30560bcd6802',
        date: '2021-03-16T11:00:00.000Z',
        created_at: '2021-03-13T23:24:17.802Z',
        updated_at: '2021-03-13T23:24:17.802Z',
        user: mockedUser,
      },
    ];

    apiMock.onGet('/providers/me').reply(200, apiResponse);

    const { getByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByText('14')).toBeTruthy();
      expect(getByText('8')).toBeTruthy();
      expect(getByText('John Doe')).toBeTruthy();
    });
  });

  it('should be able to sign out', async () => {
    const { getByTestId } = render(<Dashboard />);

    fireEvent.click(getByTestId('dashboard-btn-signout'));

    await waitFor(() => {
      expect(mockedSignOut).toHaveBeenCalled();
    });
  });
});
