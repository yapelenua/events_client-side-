import { TextField, Button } from '@mui/material';
import { IField, IEvent } from '../types/types.store'


interface EventFormProps {
  event: IEvent;
  setEvent: (event: IEvent) => void;
  handleSaveClick: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, setEvent, handleSaveClick }) => {
  const fields: IField[] = [
    {
      label: 'Title',
      value: event.title,
      onChange: (value) => setEvent({ ...event, title: value }),
    },
    {
      label: 'Description',
      value: event.description,
      onChange: (value) => setEvent({ ...event, description: value }),
      multiline: true,
    },
    {
      label: 'Location',
      value: event.location,
      onChange: (value) => setEvent({ ...event, location: value }),
    },
    {
      label: 'Date',
      value: event.date,
      onChange: (value) => setEvent({ ...event, date: value }),
      type: 'date',
    },
    {
      label: 'Category',
      value: event.category,
      onChange: (value) => setEvent({ ...event, category: value }),
    },
  ];

  return (
    <>
      {fields.map((field, index) => (
        <TextField
          key={index}
          label={field.label}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          fullWidth
          margin="normal"
          multiline={field.multiline}
          type={field.type}
        />
      ))}
      <Button variant="contained" onClick={handleSaveClick}>Save</Button>
    </>
  );
};

export default EventForm;
