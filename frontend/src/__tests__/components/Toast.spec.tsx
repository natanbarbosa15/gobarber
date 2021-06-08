import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { act } from 'react-test-renderer';
import ToastContainer from '../../components/ToastContainer';
import { ToastMessage } from '../../hooks/toast';

const mockedRemoveToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      removeToast: mockedRemoveToast,
    }),
  };
});

describe('Toast component', () => {
  it('should be able to render an toast', () => {
    const message = Array.of<ToastMessage>({
      id: '123',
      title: 'test',
      description: 'test description',
    });

    const { getByText, getByTestId } = render(
      <ToastContainer messages={message} />,
    );

    expect(getByText('test')).toBeTruthy();
    expect(getByText('test description')).toBeTruthy();

    expect(getByTestId('icon-toast-container-info')).toBeTruthy();
  });

  it('should be able to render an toast with type error', () => {
    const message = Array.of<ToastMessage>({
      id: '123',
      type: 'error',
      title: 'test',
      description: 'test description',
    });

    const { getByText, getByTestId } = render(
      <ToastContainer messages={message} />,
    );

    expect(getByText('test')).toBeTruthy();
    expect(getByText('test description')).toBeTruthy();

    expect(getByTestId('icon-toast-container-error')).toBeTruthy();
  });

  it('should be able to render an toast with type success', () => {
    const message = Array.of<ToastMessage>({
      id: '123',
      type: 'success',
      title: 'test',
      description: 'test description',
    });

    const { getByText, getByTestId } = render(
      <ToastContainer messages={message} />,
    );

    expect(getByText('test')).toBeTruthy();
    expect(getByText('test description')).toBeTruthy();

    expect(getByTestId('icon-toast-container-success')).toBeTruthy();
  });

  it('should be able to remove a toast', async () => {
    jest.useFakeTimers();

    const message = Array.of<ToastMessage>({
      id: '123',
      type: 'success',
      title: 'test',
      description: 'test description',
    });

    const { getByText, getByTestId, unmount } = render(
      <ToastContainer messages={message} />,
    );

    expect(getByText('test')).toBeTruthy();
    expect(getByText('test description')).toBeTruthy();

    expect(getByTestId('icon-toast-container-success')).toBeTruthy();

    const closeButton = getByTestId('toast-close-button');

    act(() => {
      fireEvent.click(closeButton);
    });

    jest.advanceTimersByTime(3000);

    expect(mockedRemoveToast).toHaveBeenCalled();

    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);

    unmount();

    expect(clearTimeout).toHaveBeenCalled();
  });
});
