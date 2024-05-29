"use client";

import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Alert, Button, Snackbar } from '@mui/material';
import EventList from './components/EventList';
import EventFilter from './components/EventFilter';
import EventModal from './components/EventModal';
import useEventStore from './store/events.store';
import GlobalMap from './components/GlobalMap';
import { getLatLong } from './helpers/helpers';

interface IMarker {
  id?: number;
  position: {
    lat: number;
    lng: number;
  };
}

export default function Home() {
  const {
    events,
    loading,
    filterBy,
    modalIsOpen,
    newEvent,
    fetchEvents,
    setIsOpen,
    setSnackbarOpen,
    snackbarOpen,
    snackbarMessage,
    saveEvent,
  } = useEventStore();
  const [markers, setMarkers] = useState<IMarker[]>([]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    const logCoordinates = async () => {
      const updatedMarkers = [];
      for (const event of events) {
        const position = await getLatLong(event.location);
        if (position) {
          updatedMarkers.push({ id: event.id, position });
        }
      }
      setMarkers(updatedMarkers);
    };

    logCoordinates();
  }, [events]);

  const getFilteredEvents = () => {
    if (filterBy === 'date') {
      return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (filterBy === 'category') {
      return [...events].sort((a, b) => a.category.localeCompare(b.category));
    } else {
      return events;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const center = {
    lat: 49.839683,
    lng: 24.029717,
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const handleMarkerClick = (eventId: number) => {
    window.location.href = `/events/${eventId}`;
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '40px', marginBottom: '40px' }}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <EventFilter />
          <Button
            variant="contained"
            color="primary"
            onClick={openModal}
            sx={{
              marginLeft: 2,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Create
          </Button>
        </Box>
        <EventList events={getFilteredEvents()} />
        <GlobalMap center={center} markers={markers} onMarkerClick={handleMarkerClick} />
      </Box>
      <EventModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        handleSaveEvent={saveEvent}
      />
    </div>
  );
}
