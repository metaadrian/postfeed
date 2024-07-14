import React, { memo, useCallback, useEffect } from 'react';
interface ModalProps {
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = memo(({onClose, title, children}: ModalProps) => {
    useEffect(() => {
        document.body.classList.add('is-modal-open');
        return () => {
            document.body.classList.remove('is-modal-open');
        }
    }, []);

   const handleClose = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
       event.stopPropagation();
       onClose();
   }, []);

    return (
        <div className="modal-overlay">
            <div role="dialog" className="modal-content">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button role="close" className="close-button" onClick={handleClose}>Close</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
})