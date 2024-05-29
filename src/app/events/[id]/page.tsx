"use client"

import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import EventList from '@/app/components/EventList';
import EventForm from '@/app/components/EventForm';
import MapDisplay from '@/app/components/MapDisplay';
import EventDetailsDisplay from '@/app/components/EventDetailsDisplay';
import useEventStore from '@/app/store/details.store';
import { usePathname } from 'next/navigation';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

export default function EventDetails() {
  const id = usePathname().slice(8);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const {
    event,
    loading,
    mapCenter,
    recommendation,
    isEditing,
    updatedEvent,
    setUpdatedEvent,
    fetchEvent,
    handleSaveClick,
    handleDelete,
    setIsEditing,
    snackbarOpen,
    snackbarMessage,
    setSnackbarOpen,
  } = useEventStore();

  useEffect(() => {
    fetchEvent(id);
  }, [id, fetchEvent]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleConfirmInputChange = (event: any) => {
    setConfirmInput(event.target.value);
  };

  const handleDeleteClick = (eventId: string) => {
    if (confirmInput.toLowerCase() === 'confirm') {
      handleDelete(eventId);
      setIsOpenModal(false);
    } else {
      console.log('Cannot delete event');
    }
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return <Typography variant="body1" color="textSecondary">No event found</Typography>;
  }

  return (
    <Box className="flex flex-wrap flex-col items-center p-4">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error" className="w-full">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div className="w-full flex flex-wrap mb-3 justify-center">
        <Box className="flex-1 mr-2">
          {isEditing ? (
            <EventForm event={updatedEvent} setEvent={setUpdatedEvent} handleSaveClick={() => handleSaveClick(id)} />
          ) : (
            <EventDetailsDisplay event={event} handleEditClick={handleEditClick} handleOpen={() => setIsOpenModal(true)} />
          )}

          <Box className="flex flex-col gap-2 justify-center max-w-4xl bg-white shadow-md rounded-md mt-[30px] p-4 w-[100%]">
            <Typography variant="h4" className="font-bold mb-2">You may also like</Typography>
            {recommendation.length > 0 ? (
              <EventList events={recommendation} />
            ) : (
              <Typography variant="body1" color="textSecondary">No recommendations found</Typography>
            )}
          </Box>
        </Box>

        <div className='flex justify-center'>
          {mapCenter && <MapDisplay center={mapCenter} />}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        eventId={String(event.id)}
        onDelete={handleDeleteClick}
        confirmInput={confirmInput}
        onConfirmInputChange={handleConfirmInputChange}
      />
    </Box>
  );
}
