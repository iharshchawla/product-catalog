import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductDetailModal } from './index';

test('does not render when isOpen is false', () => {
    render(
        <ProductDetailModal.Root isOpen={false} onClose={() => { }}>
            <ProductDetailModal.Header title="Test" />
        </ProductDetailModal.Root>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('renders title and content when open', () => {
    render(
        <ProductDetailModal.Root isOpen onClose={() => { }}>
            <ProductDetailModal.Header title="Wireless Mouse" />
            <ProductDetailModal.Body>
                <p>Price: $80.24</p>
            </ProductDetailModal.Body>
        </ProductDetailModal.Root>
    );
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('Price: $80.24')).toBeInTheDocument();
});

test('calls onClose when the × button is clicked', async () => {
    const onClose = jest.fn();
    render(
        <ProductDetailModal.Root isOpen onClose={onClose}>
            <ProductDetailModal.Header title="Test" />
        </ProductDetailModal.Root>
    );
    await userEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
});

test('calls onClose when clicking the overlay', async () => {
    const onClose = jest.fn();
    render(
        <ProductDetailModal.Root isOpen onClose={onClose}>
            <ProductDetailModal.Header title="Test" />
        </ProductDetailModal.Root>
    );
    await userEvent.click(screen.getByRole('presentation'));
    expect(onClose).toHaveBeenCalled();
});

test('does NOT call onClose when clicking inside the dialog content', async () => {
    const onClose = jest.fn();
    render(
        <ProductDetailModal.Root isOpen onClose={onClose}>
            <ProductDetailModal.Header title="Test" />
        </ProductDetailModal.Root>
    );
    await userEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
});

test('throws if Header is used outside Root (context guard)', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
    expect(() => render(<ProductDetailModal.Header title="Test" />)).toThrow();
    consoleError.mockRestore();
});

test('Body and Footer render their children', () => {
    render(
        <ProductDetailModal.Root isOpen onClose={() => { }}>
            <ProductDetailModal.Body>
                <span>body content</span>
            </ProductDetailModal.Body>
            <ProductDetailModal.Footer>
                <span>footer content</span>
            </ProductDetailModal.Footer>
        </ProductDetailModal.Root>
    );
    expect(screen.getByText('body content')).toBeInTheDocument();
    expect(screen.getByText('footer content')).toBeInTheDocument();
});