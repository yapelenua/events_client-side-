export interface IEvent {
  id?: number;
  title: string;
  location: string;
  date: string;
  category: string;
  description: string;
}


export interface IMarker {
  id: number,
  position: {
    lat: number,
    lng: number
  }
}


export interface IField {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  multiline?: boolean;
}



export interface IErrorData {
  statusCode: number;
  error: {
    message: {
      property: string;
      constraints: Record<string, string>;
    }[];
  };
}

export interface IEventStore {
  events: IEvent[];
  loading: boolean;
  error: Error | null;
  filterBy: 'date' | 'category' | 'none';
  snackbarOpen: boolean;
  snackbarMessage: string;
  modalIsOpen: boolean;
  newEvent: {
    title: string;
    location: string;
    date: string;
    category: string;
    description: string;
  };
  setEvents: (events: IEvent[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setSnackbarOpen: (open: boolean) => void;
  setSnackbarMessage: (message: string) => void;
  setFilterBy: (filterBy: 'date' | 'category' | 'none') => void;
  setIsOpen: (isOpen: boolean) => void;
  setNewEvent: (newEvent: {
    title: string;
    location: string;
    date: string;
    category: string;
    description: string;
  }) => void;
  fetchEvents: () => Promise<void>;
  saveEvent: () => Promise<void>;
}



export interface IDetailsStore {
  event: IEvent | null;
  recommendation: IEvent[];
  loading: boolean;
  error: Error | null;
  isEditing: boolean;
  mapCenter: { lat: number; lng: number } | null;
  updatedEvent: IEvent;
  snackbarOpen: boolean;
  snackbarMessage: string;
  setEvent: (event: IEvent | null) => void;
  setRecommendation: (recommendation: IEvent[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setIsEditing: (isEditing: boolean) => void;
  setMapCenter: (mapCenter: { lat: number; lng: number } | null) => void;
  setUpdatedEvent: (event: IEvent) => void;
  setSnackbarOpen: (open: boolean) => void;
  setSnackbarMessage: (message: string) => void;
  fetchEvent: (id: string) => Promise<void>;
  handleSaveClick: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}