import { Typography, Button } from '@mui/material';
import Link from 'next/link';
import { IEvent } from '../types/types.store';

interface EventDetailsDisplayProps {
  event: IEvent;
  handleEditClick: () => void;
  handleDelete: (id: string) => Promise<void>;
}

const EventDetailsDisplay: React.FC<EventDetailsDisplayProps> = ({ event, handleEditClick, handleDelete }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="h2" gutterBottom className="font-bold mb-2">{event.title}</Typography>
      <Typography variant="body1" gutterBottom className="text-lg mb-2">{event.description}</Typography>
      <div className="flex items-center mb-2">
        <Typography variant="body2" color="textSecondary" className="mr-2">Location:</Typography>
        <Typography variant="body2" color="textSecondary">{event.location}</Typography>
      </div>
      <div className="flex items-center mb-2">
        <Typography variant="body2" color="textSecondary" className="mr-2">Date:</Typography>
        <Typography variant="body2" color="textSecondary">{event.date}</Typography>
      </div>
      <div className="flex items-center mb-2">
        <Typography variant="body2" color="textSecondary" className="mr-2">Category:</Typography>
        <Typography variant="body2" color="textSecondary">{event.category}</Typography>
      </div>
      <div className="flex">
        <Button variant="contained" onClick={handleEditClick} className="mr-2">
          Edit
        </Button>
        <Link href={`/`}>
          <Button variant="contained" onClick={() => handleDelete(String(event.id))} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventDetailsDisplay;
