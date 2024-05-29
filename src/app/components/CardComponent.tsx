import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { IEvent } from '../types/types.store'

interface IProps {
  event: IEvent;
}

const CardComponent: React.FC<IProps> = ({ event }) => {
  return (
    <Card sx={{ width: 275 }} variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {event.category}
        </Typography>
        <Typography variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {event.location}
        </Typography>
        <Typography variant="body2">
          {event.description}
          <br />
          <span>{event.date}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/events/${event.id}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default CardComponent;
