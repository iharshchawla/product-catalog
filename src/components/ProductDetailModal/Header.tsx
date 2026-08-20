import { useModalContext } from "./ModalContext";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { onClose } = useModalContext();
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <button
        onClick={onClose}
        aria-label="Close"
        className="text-slate-400 hover:text-slate-700 text-xl leading-none"
      >
        ×
      </button>
    </div>
  );
}
