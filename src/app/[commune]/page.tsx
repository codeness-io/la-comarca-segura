import { generateReport, recommendationsForTheCommunity } from "@/ai/report";
import Markdown from 'react-markdown'
import { getPrecipitationForecast } from "@/api/weather"


type Parameters = {
  params: {
    commune: string;
  };
};

export default async function Report({ params }: Parameters) {
  const reportMarkdown = await generateReport(params.commune);
  const communityRecommendations = await recommendationsForTheCommunity(params.commune, reportMarkdown);
  const precipitationForecast = await getPrecipitationForecast(params.commune);
  const precipitation = precipitationForecast.daily.precipitation_sum.reduce((a, b) => a + b, 0);

  return (
    <>
      <h2>Recomendaciones comunales</h2>
      <Markdown>{reportMarkdown}</Markdown>
      <h2>Recomendaciones para los vecinos</h2>
      <Markdown>{communityRecommendations}</Markdown>
      <h2>¿Llueve o no llueve?</h2>
      <p>
        {precipitation > 0 ? `Sí, va a llover (${precipitation}mm)` : "No, no va a llover"}
      </p>
    </>
  )
}
