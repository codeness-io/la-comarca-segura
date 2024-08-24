'use client'

import React, { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const REGIONES = [
  "I- Región de Tarapacá",
  "II- Región de Antofagasta",
  "III- Región de Atacama",
  "IV- Región de Coquimbo",
  "V- Región de Valparaíso",
  "VI- Región del Libertador General Bernardo O'Higgins",
  "VII- Región del Maule",
  "VIII- Región del Biobío",
  "IX- Región de La Araucanía",
  "X- Región de Los Lagos",
  "XI- Región Aysén del General Carlos Ibáñez del Campo",
  "XII- Región de Magallanes y de la Antártica Chilena",
  "XIII- Región Metropolitana de Santiago",
  "XIV- Región de Los Ríos",
  "XV- Región de Arica y Parinacota",
  "XVI- Región de Ñuble"
];

function BasicSelect() {
  const [region, setRegion] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Región</InputLabel>
        <Select
          labelId="region-select"
          id="region-select"
          value={region}
          label="Región"
          onChange={handleChange}
        >
          {REGIONES.map((region) => {
            return (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;