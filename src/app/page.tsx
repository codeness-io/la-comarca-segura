'use client'

import React, { useState } from 'react';
import styles from './page.module.css';
import { SelectChangeEvent } from '@mui/material/Select';
import { REGIONES, COMUNAS } from '../data/administrative_unit';
import RegionSelect from '@/components/RegionSelect';
import CommuneSelect from '@/components/CommuneSelect';
import slugify from 'slugify';
import { navigate } from './actions';

export default function Home() {
  const [ region, setRegion ] = useState('');
  const [ commune, setCommune ] = useState('');

  const selectRegion = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
    console.log(region);
  };

  const selectCommune = (event: SelectChangeEvent) => {
    setCommune(event.target.value as string);
    const selectedCommune = event.target.value as string;
    console.log('Pidiendo reporte!!!'); //TODO agregar un loader!!!!
    navigate(`/${slugify(selectedCommune, {lower: true})}`);
  }

  return (
    <main className={styles.main}>
      <RegionSelect items={REGIONES} onChange={selectRegion} region={region}/>
      {region && (
        <CommuneSelect items={COMUNAS[region]} onChange={selectCommune} commune={commune}/>
      )}
    </main>
  );
}
