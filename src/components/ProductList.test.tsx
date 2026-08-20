import { render, screen } from '@testing-library/react';
import { ProductList } from './ProductList';
import type { Product } from '../types/product';

const products: Product[] = [
    { id: '1', name: 'Wireless Mouse', price: 80.24, category: 'Electronics' },
    { id: '2', name: 'Yoga Mat', price: 34.99, category: 'Sportswear' },
];

test('shows loading state', () => {
    render(<ProductList products={[]} loading error={undefined} onProductClick={() => { }} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('shows error state', () => {
    render(<ProductList products={[]} loading={false} error={new Error('Network error')} onProductClick={() => { }} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
});

test('shows empty state', () => {
    render(<ProductList products={[]} loading={false} error={undefined} onProductClick={() => { }} />);
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
});

test('renders product rows', () => {
    render(<ProductList products={products} loading={false} error={undefined} onProductClick={() => { }} />);
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('Yoga Mat')).toBeInTheDocument();
});