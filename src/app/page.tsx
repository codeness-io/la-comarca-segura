import React from 'react'
import styles from './page.module.css'
import Form from "@/components/Form"
import { getTopNews, NewsType } from "@/api/news"
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image'

function CardNews({ news }: { news: NewsType }) {
  return (
    <Card sx={{ flexGrow: 1, maxWidth: 400 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={news.thumbnail}
        title={news.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {news.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {news.source.name} - {news.date}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default async function Home() {
  const news = await getTopNews()

  return (
    <main className={styles.main}>
      <Grid container sx={{ marginTop: 8, padding: "40px 120px 60px" }}>
        <Typography variant="h1" className={styles.mainTitle}>
          El cambio climático y sus consecuencias: lo que está en juego
        </Typography>
        <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
          <Grid container spacing={2}>
            {news.map((n) => (
              <Grid key={n.position} item xs={4} display="flex">
                <CardNews news={n} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
     
      <Grid container className={styles.numbersSection}>
        <Grid item xs={12}>
          <Typography variant="h2" component="h2" className={styles.subtitle}>
            Las inundaciones son el desastre natural con más ocurrencias en Chile
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
          <Card className={styles.reportCard}>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div" className={styles.number}>
                24,9%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inundaciones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
          <Card className={styles.reportCard}>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div" className={styles.number}>
                18,9%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Terremotos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
          <Card className={styles.reportCard}>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div" className={styles.number}>
                9,3%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Incendios
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ textAlign: 'center', marginTop: 5 }}>
            Fuente: Informe del Estado del medio ambiente (IEMA), 2020, Capítulo 17.
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ padding: "40px 120px", justifyContent: "center" }}>
        <Typography variant="h2" component="h2" sx={{ fontWeight: "bold" }}>
          La Comarca Segura
        </Typography>
        <Typography variant="body1" className={styles.formDescription}>
          Una herramienta para que las comunidades de Chile puedan conocer <strong>los riesgos de inundaciones</strong> y <strong>tomar medidas para protegerse</strong> ✨.
        </Typography>
        <Grid container xs={12} sx={{justifyContent: "center", paddingTop: "25px"}}>
          <Paper sx={{ padding: 4, width: 850 }}>
            <Typography variant="body1" sx={{ marginBottom: 4 }}>
              Selecciona la <strong>Región</strong> y <strong>Comuna</strong> de tu interés para conocer los riesgos de inundaciones y las recomendaciones para proteger a tu comunidad.
            </Typography>
            <Form />
          </Paper>
        </Grid>
      </Grid>
    </main>
  )
}
