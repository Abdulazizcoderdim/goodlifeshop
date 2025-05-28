import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-4 overflow-auto min-h-[600px]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
