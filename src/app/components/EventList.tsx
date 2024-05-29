import React from 'react';
import CardComponent from './CardComponent';
import { IEvent } from '../types/types.store'


interface Props {
  events: IEvent[];
}

const EventList: React.FC<Props> = ({ events }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', maxWidth: '1200px', marginBottom: '30px' }}>
      {events.map(event => (
        <CardComponent key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
