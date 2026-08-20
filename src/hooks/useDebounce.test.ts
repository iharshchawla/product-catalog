import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

test('returns the debounced value after the delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: 'a' },
    });

    expect(result.current).toBe('a');

    rerender({ value: 'ab' });
    expect(result.current).toBe('a'); // not yet updated

    act(() => {
        jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('ab');
});