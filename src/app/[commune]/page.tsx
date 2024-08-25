import { generateReport, recommendationsForTheCommunity } from "@/ai/report";
import Markdown from 'react-markdown'
import { getPrecipitationForecast } from "@/api/weather"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


type Parameters = {
  params: {
    commune: string;
  };
};

export default async function Report({ params }: Parameters) {
  const report = await generateReport(params.commune);
  const communityRecommendations = await recommendationsForTheCommunity(params.commune, JSON.stringify(report, null, 2));
  const precipitationForecast = await getPrecipitationForecast(params.commune);
  const precipitation = precipitationForecast.daily.precipitation_sum.reduce((a, b) => a + b, 0);

  return (
    <>
      <h2>Recomendaciones comunales</h2>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Amenaza
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {report.risk}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <code style={{ whiteSpace: "pre-line" }}>
        {JSON.stringify(report, null, 2)}
      </code>
      <h2>Recomendaciones para los vecinos</h2>
      <Markdown>{communityRecommendations}</Markdown>
      <h2>¿Llueve o no llueve?</h2>
      <p>
        {precipitation > 0 ? `Sí, va a llover (${precipitation}mm)` : "No, no va a llover"}
      </p>
    </>
  )
}
