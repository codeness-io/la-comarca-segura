'use client'

import React, {useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {navigate} from "@/app/actions";
import slugify from "slugify";
import RegionSelect from "@/components/RegionSelect";
import {COMUNAS, REGIONES} from "@/data/administrative_unit";
import CommuneSelect from "@/components/CommuneSelect";
import LoadingButton from '@mui/lab/LoadingButton';

export default function Form() {
  const [ region, setRegion ] = useState('');
  const [ commune, setCommune ] = useState('');
  const [loading, setLoading] = useState(false);

  const selectRegion = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
    console.log(region);
  };

  const selectCommune = (event: SelectChangeEvent) => {
    setCommune(event.target.value as string);
    //const selectedCommune = event.target.value as string;
    //console.log('Pidiendo reporte!!!'); //TODO agregar un loader!!!!
    //navigate(`/${slugify(selectedCommune, {lower: true})}`);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Pidiendo reporte!!!');
    event.preventDefault()
    setLoading(true)
    void navigate(`/${slugify(commune, {lower: true})}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <RegionSelect items={REGIONES} onChange={selectRegion} region={region}/>
      {region && (
        <CommuneSelect
          items={COMUNAS[region].sort((a, b) => a.localeCompare(b))}
          onChange={selectCommune}
          commune={commune}
        />
      )}
      <LoadingButton loading={loading} type="submit" variant="contained" color="primary" disabled={!region || !commune} sx={{ my: 4 }}>
        Ver Sugerencias
      </LoadingButton>
    </form>
  );
}
