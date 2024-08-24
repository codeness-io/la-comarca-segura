'use client'

import React, { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Region } from '@/data/administrative_unit';

interface RegionSelectProps {
  items: Region[];
  onChange(event: SelectChangeEvent): void;
  region: string;
}

function RegionSelect({ items, onChange, region } : RegionSelectProps) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="region-select-label">Región</InputLabel>
        <Select
          labelId="region-select-label"
          id="region-select"
          value={region}
          onChange={onChange}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.number} value={item.number}>
                {`${item.number} - ${item.name}`}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default RegionSelect;