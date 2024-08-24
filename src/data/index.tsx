import slugify from "slugify"

const floodAttributes = [
  'asentamientos_amen_inund_1_delta',
  'asentamientos_amen_inund_1_fut',
  'asentamientos_amen_inund_1_pres',
  'asentamientos_amen_inund_2_delta',
  'asentamientos_amen_inund_2_fut',
  'asentamientos_amen_inund_2_pres',
  'asentamientos_amen_inund_3_delta',
  'asentamientos_amen_inund_3_fut',
  'asentamientos_amen_inund_3_pres',
  'asentamientos_exp_inund_1_fut',
  'asentamientos_exp_inund_1_pres',
  'asentamientos_ind_amen_inund_fut',
  'asentamientos_ind_amen_inund_fut_estandar',
  'asentamientos_ind_amen_inund_pres',
  'asentamientos_ind_amen_inund_pres_estandar',
  'asentamientos_ind_exp_inund_fut',
  'asentamientos_ind_exp_inund_fut_estandar',
  'asentamientos_ind_exp_inund_pres',
  'asentamientos_ind_exp_inund_pres_estandar',
  'asentamientos_ind_riesgo_inund_fut',
  'asentamientos_ind_riesgo_inund_fut_estandar',
  'asentamientos_ind_riesgo_inund_pres',
  'asentamientos_ind_riesgo_inund_pres_estandar',
  'asentamientos_ind_sens_inund_estandar',
  'asentamientos_sens_inund_1_1',
  'asentamientos_sens_inund_1_3',
  'asentamientos_sens_inund_1_2',
  'asentamientos_sens_inund_1_5',
  'asentamientos_sens_inund_1_4',
  'asentamientos_sens_inund_1_6',
  'asentamientos_sens_inund_1_7',
  'asentamientos_sens_inund_2_1',
  'asentamientos_sens_inund_2_2',
  'asentamientos_sens_inund_2_3',
  'asentamientos_sens_inund_3_1',
  'asentamientos_sens_inund_3_2',
  'asentamientos_sens_inund_3_3',
  'asentamientos_sens_inund_3_4',
  'asentamientos_sens_inund_3_5',
  'asentamientos_sens_inund_3_6',
  'asentamientos_sens_inund_3_7',
  'NOM_PROVIN',
  'NOM_REGION',
  'NOM_COMUNA',
  'asentamientos_ind_amen_inund_delta',
  'asentamientos_ind_riesgo_inund_delta',
  'asentamientos_ind_resp_inund',
  'asentamientos_ind_res_estandar',
  'asentamientos_res_1_10',
  'asentamientos_res_1_1',
  'asentamientos_res_1_11',
  'asentamientos_res_1_12',
  'asentamientos_res_1_2',
  'asentamientos_res_1_3',
  'asentamientos_res_1_4',
  'asentamientos_res_1_5',
  'asentamientos_res_1_6',
  'asentamientos_res_1_7',
  'asentamientos_res_1_9',
  'asentamientos_res_1_8',
  'asentamientos_res_2_2',
  'asentamientos_res_2_1',
  'asentamientos_res_2_4',
  'asentamientos_res_2_3',
  'asentamientos_res_2_5',
  'asentamientos_res_2_6',
  'asentamientos_res_2_7',
  'asentamientos_res_3_1',
  'asentamientos_res_3_2',
  'asentamientos_res_3_3',
  'asentamientos_res_4_1',
  'asentamientos_res_3_4',
  'asentamientos_res_4_3',
  'asentamientos_res_4_2',
  'asentamientos_res_5_1',
  'asentamientos_res_4_4',
  'asentamientos_res_5_3',
  'asentamientos_res_5_2',
  'asentamientos_res_5_4',
  'asentamientos_ind_resiliencia_inund',
]

const dataUrl = {
  flood: `https://arclim.mma.gob.cl/features/attributes/comunas/?attributes=${floodAttributes.join(',')}&format=geojson&file_name=ARCLIM_asentamientos_inundaciones_comunas`
}

type FloodRow = {
  properties: {
    NOM_COMUNA: string
  } & {
    [key: string]: string
  }
}

type FloodCollection = {
  features: Array<FloodRow>
}

export async function getFloodData(commune: string) {
  const response = await fetch(dataUrl.flood)
  const floodData = await response.json()
  return ((floodData as any) as FloodCollection).features.find((data) => slugify(data.properties['NOM_COMUNA'], { lower: true }) === commune)
}
