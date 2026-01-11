import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
            onClick={onClose}
        >
            <div
                className="relative mx-4 w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="absolute top-4 right-4" onClick={onClose}>
                    <XCircleIcon className="size-8 font-bold text-gray-800 transition hover:text-gray-600" />
                </button>
                {children}
            </div>
        </div>,
        document.body,
    );
}

export default Modal;
