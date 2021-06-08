import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { ToastProvider, useToast } from '../../hooks/toast';

describe('Toast hook', () => {
  it('should be able to add toast', async () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.addToast({
        type: 'info',
        title: 'Title',
        description: 'Description',
      });
    });

    const hasAddedToast = result.current.messages.filter(
      t =>
        t.type === 'info' &&
        t.title === 'Title' &&
        t.description === 'Description',
    );

    expect(hasAddedToast).toHaveLength(1);
  });

  it('should be able to remove a toast', async () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.addToast({
        type: 'info',
        title: 'Title',
        description: 'Description',
      });
    });

    const hasAddedToast = result.current.messages.filter(
      t =>
        t.type === 'info' &&
        t.title === 'Title' &&
        t.description === 'Description',
    );

    expect(hasAddedToast).toHaveLength(1);

    act(() => {
      result.current.removeToast(hasAddedToast[0].id);
    });

    expect(result.current.messages).toHaveLength(0);
  });
});
