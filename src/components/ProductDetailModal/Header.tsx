import { useModalContext } from './ModalContext';

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    const { onClose } = useModalContext();
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2>{title}</h2>
            <button onClick={onClose} aria-label="Close">×</button>
        </div>
    );
}