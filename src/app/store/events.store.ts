import create from 'zustand';
import { IEvent, IErrorData, IEventStore } from '../types/types.store'
import { BASE_URL } from '../utils';



const useEventStore = create<IEventStore>((set, get) => ({
  events: [],
  loading: true,
  error: null,
  snackbarOpen: false,
  snackbarMessage: '',
  filterBy: 'none',
  modalIsOpen: false,
  newEvent: {
    title: '',
    location: '',
    date: '',
    category: '',
    description: '',
  },
  setEvents: (events) => set({ events }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilterBy: (filterBy) => set({ filterBy }),
  setIsOpen: (isOpen) => set({ modalIsOpen: isOpen }),
  setNewEvent: (newEvent) => set({ newEvent }),
  setSnackbarOpen: (open) => set({ snackbarOpen: open }),
  setSnackbarMessage: (message) => set({ snackbarMessage: message }),
  fetchEvents: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      set({ events: data });
    } catch (error) {
      set({ loading: false, error: error as Error });
    } finally {
      set({ loading: false });
    }
  },
  saveEvent: async () => {
    try {
      set({ loading: true, error: null });

      const { newEvent, events } = get();

      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        const errorData: IErrorData = await response.json();
        const isNotEmptyErrors = errorData.error.message
          .filter((error) => 'isNotEmpty' in error.constraints)
          .map((error) => error.constraints.isNotEmpty);

        const errorMessage = isNotEmptyErrors[0];
        set({ snackbarMessage: errorMessage, snackbarOpen: true });
        throw new Error(errorMessage);
      }

      const data: IEvent = await response.json();
      set({
        events: [...events, data],
        loading: false,
        newEvent: {
          title: '',
          location: '',
          date: '',
          category: '',
          description: '',
        },
        error: null,
      });
    } catch (error) {
      set({ loading: false, error: error as Error });
    }
  },
}));

export default useEventStore;
