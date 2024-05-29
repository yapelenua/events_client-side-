import React from 'react';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useEventStore from '../store/events.store';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  handleSaveEvent: () => void;
}

const EventModal: React.FC<Props> = ({ isOpen, closeModal, handleSaveEvent }) => {
  const { newEvent, setNewEvent } = useEventStore();

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '400px',
      width: '90%',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Modal"
      style={customStyles}
    >
      <div className="flex flex-col gap-4">
        <TextField label="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        <TextField label="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
        <TextField type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
        <TextField label="Category" value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} />
        <TextField label="Description" multiline value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
        <Button variant="contained" onClick={handleSaveEvent}>Save</Button>
      </div>
    </Modal>
  );
};

export default EventModal;
