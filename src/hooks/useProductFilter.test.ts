import { renderHook } from '@testing-library/react';
import { useProductFilter } from './useProductFilter';
import type { Product } from '../types/product';

const products: Product[] = [
    { id: '1', name: 'Wireless Mouse', price: 80.24, category: 'Electronics' },
    { id: '2', name: 'Yoga Mat', price: 34.99, category: 'Sportswear' },
];

test('returns all products when search is empty', () => {
    const { result } = renderHook(() => useProductFilter(products, ''));
    expect(result.current).toHaveLength(2);
});

test('filters case-insensitively by name', () => {
    const { result } = renderHook(() => useProductFilter(products, 'MOUSE'));
    expect(result.current).toEqual([products[0]]);
});