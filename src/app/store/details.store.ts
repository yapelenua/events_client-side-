import create from 'zustand';
import { getLatLong } from '../helpers/helpers';
import { IEvent, IErrorData, IDetailsStore } from '../types/types.store'
import { BASE_URL } from '../utils';


const useEventStore = create<IDetailsStore>((set, get) => ({
  event: null,
  recommendation: [],
  loading: true,
  error: null,
  isEditing: false,
  mapCenter: null,
  updatedEvent: {
    id: 0,
    title: '',
    location: '',
    date: '',
    category: '',
    description: ''
  },
  snackbarOpen: false,
  snackbarMessage: '',
  setEvent: (event) => set({ event }),
  setRecommendation: (recommendation) => set({ recommendation }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setMapCenter: (mapCenter) => set({ mapCenter }),
  setUpdatedEvent: (event) => set({ updatedEvent: event }),
  setSnackbarOpen: (open) => set({ snackbarOpen: open }),
  setSnackbarMessage: (message) => set({ snackbarMessage: message }),
  fetchEvent: async (id: string) => {
    const { setEvent, setRecommendation, setUpdatedEvent, setMapCenter, setLoading, setError } = get();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${id}`);
      const recommendationResponse = await fetch(`${BASE_URL}${id}/recommends`);
      if (!response.ok || !recommendationResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const data: IEvent = await response.json();
      const recommendationData: IEvent[] = await recommendationResponse.json();
      setEvent(data);
      setRecommendation(recommendationData);
      setUpdatedEvent(data);
      if (data.location) {
        const coords = await getLatLong(data.location);
        if (coords) {
          setMapCenter(coords);
        }
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  },
  //   const apiKey = 'AIzaSyAMPbCkjXTAUlHfoxYBEyzk_ttZgilnfzM';
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     if (data.status === 'OK') {
  //       const location = data.results[0].geometry.location;
  //       return { lat: location.lat, lng: location.lng };
  //     } else {
  //       throw new Error('Geocoding failed. Please check your input.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     return null;
  //   }
  // },
  handleSaveClick: async (id: string) => {
    const { updatedEvent, setEvent, setIsEditing, setError, setSnackbarOpen, setSnackbarMessage } = get();
    if (!updatedEvent) return;

    const updatedEventBody = {
      title: updatedEvent.title,
      category: updatedEvent.category,
      location: updatedEvent.location,
      date: updatedEvent.date,
      description: updatedEvent.description,
    }
    try {
      const response = await fetch(`${BASE_URL}${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEventBody),
      });

      if (!response.ok) {
        const errorData: IErrorData = await response.json();
        const minLengthErrors = errorData.error.message
          .filter(error => 'minLength' in error.constraints)
          .map(error => error.constraints.minLength);

        const errorMessage = minLengthErrors[0];
        setSnackbarMessage(errorMessage);
        setSnackbarOpen(true);
        throw new Error(errorMessage);
      }

      const data: IEvent = await response.json();
      setEvent(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
      setError(error as Error);
    }
  },
  handleDelete: async (id: string) => {
    const { setEvent, setIsEditing, setError } = get();
    try {
      const response = await fetch(`${BASE_URL}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvent(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
      setError(error as Error);
    }
  },
}));

export default useEventStore;
