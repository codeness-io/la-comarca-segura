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
    <Card sx={{ flexGrow: 1 }}>
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
      <Container>
        <Grid container spacing={16}>
          <Grid item sx={{ marginTop: 8 }}>
            <Typography variant="h1" component="h1" gutterBottom>
              El cambio climático y sus consecuencias: lo que está en juego
            </Typography>
            <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
              <Grid container spacing={2}>
                {news.map((n) => (
                  <Grid key={n.position} item xs={4} display="flex">
                    <CardNews news={n} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item xs={8} sx={{ flexGrow: 1, alignItems: 'center', display: 'flex' }}>
                <Typography variant="h2" component="h2" sx={{ marginTop: -4 }}>
                  Las inundaciones son el desastre natural con más ocurrencias en Chile
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                <Image
                  src="/ocurrencias.png"
                  width={300}
                  height={393}
                  alt="Inundaciones tienen un 24.9% de ocurrencias en Chile"
                />
                <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
                  Fuente: Informe del Estado del medio ambiente (IEMA), 2020, Capítulo 17.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ marginBottom: 2 }}>
              Presentamos...
            </Typography>
            <Typography variant="h2" component="h2" sx={{ fontWeight: "bold" }}>
              La Comarca Segura
            </Typography>
            <Typography variant="h5">
              Una herramienta para que las comunidades de Chile puedan conocer <strong>los riesgos de inundaciones</strong> y <strong>tomar medidas para protegerse</strong> ✨.
            </Typography>
          </Grid>
          <Grid item sx={{ width: '100%', paddingBottom: 32 }}>
            <Paper sx={{ padding: 4 }}>
              <Typography variant="body1" sx={{ marginBottom: 4 }}>
                Selecciona la <strong>Región</strong> y <strong>Comuna</strong> de tu interés para conocer los riesgos de inundaciones y las recomendaciones para proteger a tu comunidad.
              </Typography>
              <Form />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}
