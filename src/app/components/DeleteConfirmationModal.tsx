
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import Modal from 'react-modal';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  onDelete: (eventId: string) => void;
  confirmInput: string;
  onConfirmInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '300px',
    width: '90%',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, eventId, onDelete, confirmInput, onConfirmInputChange }) => {
  const handleDeleteClick = () => {
    if (confirmInput.toLowerCase() === 'confirm') {
      onDelete(eventId);
    } else {
      console.log('Cannot delete event');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation Modal"
      style={customStyles}
    >
      <form>
        <input
          placeholder='Enter confirm to delete'
          value={confirmInput}
          onChange={onConfirmInputChange}
          className="mb-4 px-3 py-2 w-full rounded border border-gray-300"
        />
        <Link href={'/'}>
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Delete
          </button>
        </Link>
      </form>
    </Modal>
  );
};

export default DeleteConfirmationModal;
