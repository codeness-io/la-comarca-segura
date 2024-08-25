import { generateReport, recommendationsForTheCommunity } from "@/ai/report";
import Markdown from 'react-markdown'
import { getPrecipitationForecast, PrecipitationData } from "@/api/weather"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Container, Grid, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import styles from './page.module.css';
import FloodIcon from '@mui/icons-material/Flood';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckIcon from '@mui/icons-material/Check';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';


type Parameters = {
  params: {
    commune: string;
  };
};

const hasPrecipitation = (precipitation: number) => {
  if (precipitation === 0) {
    return false;
  }
  return true;
}

export default async function Report({ params }: Parameters) {
  const report = await generateReport(params.commune);
  const communityRecommendations = await recommendationsForTheCommunity(params.commune, JSON.stringify(report, null, 2));
  const precipitationForecast = await getPrecipitationForecast(params.commune);
  console.log(precipitationForecast);
  const precipitation = precipitationForecast.daily.precipitation_sum.reduce((a, b) => a + b, 0);
  const firstPrecipitationDay = precipitationForecast.daily.precipitation_sum.findIndex((unit) => unit > 0);

  const capitalizeText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <Container>
      <Typography variant="h1">{`${capitalizeText(params.commune)}`}</Typography>
      <Grid container sx={{paddingTop: "40px"}}>
        <Grid item xs={12} md={6} sx={{paddingRight: "95px"}}>
          <Typography variant="h2" className="header-xxl">
            Datos comunales
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <p>
            Este reporte ha sido generado e interpretado por GPT-4, utilizando como base los indicadores proporcionados por ARClim (Atlas de Riesgos Climáticos para Chile).{' '}
            <Link href="https://arclim.mma.gob.cl/atlas/view/asentamientos_inundaciones/" target="_blank">Sitio web ARClim</Link>
          </p>
        </Grid>
        <Grid container spacing={2} sx={{marginTop: "20px"}}>
          <Grid item xs={12} md={4}>
            <Card className={styles.reportCard}>
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  <FloodIcon color="primary" fontSize="large" /> Amenaza
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.risk}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={styles.reportCard}>
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  <FamilyRestroomIcon color="primary" fontSize="large" /> Exposición
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.exposition}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={styles.reportCard}>
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  <WarningAmberIcon color="primary" fontSize="large" /> Riesgo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.risk_vs_exposition}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{paddingTop: "20px", marginTop: "20px"}}>
        <Grid item xs={12}>
          <Card className={styles.reportCard}>
            <CardContent>
              <Typography gutterBottom variant="h2" component="div">
                Recomendaciones comunales
              </Typography>
              <List sx={{ width: '100%' }} className={styles.listSection}>
                {report.improvements.map((improvement, index) => {
                  return (
                    <ListItem key={index} className={styles.listElement}>
                      <ListItemIcon>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <p className={styles.improvementDescription}>
                          {improvement}
                        </p>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container sx={{paddingTop: "20px", marginTop: "20px"}}>
        <Grid item xs={12}>
          <Card className={styles.reportCard}>
            <CardContent>
              <Typography gutterBottom variant="h2" component="div">
                <ThunderstormIcon color="primary" fontSize="large"/> Pronóstico de precipitaciones
              </Typography>
              {hasPrecipitation(precipitation) ? (
                <Typography variant="body1">
                  Se esperan {precipitationForecast.daily.precipitation_sum[firstPrecipitationDay]} mm de precipitaciones para el día {precipitationForecast.daily.time[firstPrecipitationDay]}
                </Typography>
              ) : (
                <Typography variant="body1">
                  No se esperan precipitaciones para los próximos 16 días.
                </Typography>
              )}
              
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <h2>¿Llueve o no llueve?</h2>
      <p>
        {precipitation > 0 ? `Sí, va a llover (${precipitation}mm)` : "No, no va a llover"}
      </p>
    </Container>
  )
}
