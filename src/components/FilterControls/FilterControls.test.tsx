import { render, screen } from '@testing-library/react';
import { FilterControls } from './index';

test('renders Search and CategoryDropdown children inside Root', () => {
    render(
        <FilterControls.Root>
            <FilterControls.Search value="" onChange={() => { }} />
            <FilterControls.CategoryDropdown value="" onChange={() => { }} categories={['Electronics']} />
        </FilterControls.Root>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
});