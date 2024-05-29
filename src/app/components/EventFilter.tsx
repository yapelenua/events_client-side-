import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import useEventStore from '../store/events.store';


const EventFilter: React.FC = () => {
  const {
    filterBy,
    setFilterBy,
  } = useEventStore();
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="filter-select-label">Filter By</InputLabel>
      <Select
        labelId="filter-select-label"
        id="filter-select"
        value={filterBy}
        label="Filter By"
        onChange={(event) => setFilterBy(event.target.value as "date" | "category" | "none")}
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="date">Date</MenuItem>
        <MenuItem value="category">Category</MenuItem>
      </Select>
    </FormControl>
  );
};

export default EventFilter;
