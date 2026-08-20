import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryFilter } from './CategoryFilter';

const categories = ['Electronics', 'Sportswear'];

test('renders all category options plus "All Categories"', () => {
    render(<CategoryFilter value="" onChange={() => { }} categories={categories} />);
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Sportswear')).toBeInTheDocument();
});

test('calls onChange when a category is selected', async () => {
    const onChange = jest.fn();
    render(<CategoryFilter value="" onChange={onChange} categories={categories} />);
    await userEvent.selectOptions(screen.getByRole('combobox'), 'Electronics');
    expect(onChange).toHaveBeenCalledWith('Electronics');
});