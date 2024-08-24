'use client'

import React, { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface CommuneSelectProps {
  items: string[],
  onChange(event: SelectChangeEvent): void;
  commune: string;
}

function CommuneSelect({ items, onChange, commune } : CommuneSelectProps) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="commune-select-label">Comuna</InputLabel>
        <Select
          labelId="commune-select-label"
          id="commune-select"
          value={commune}
          onChange={onChange}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CommuneSelect;