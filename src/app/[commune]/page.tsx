import { generateReport, recommendationsForTheCommunity } from "@/ai/report";
import Markdown from 'react-markdown'

type Parameters = {
  params: {
    commune: string;
  };
};

export default async function Report({ params }: Parameters) {
  const reportMarkdown = await generateReport(params.commune);
  const communityRecommendations = await recommendationsForTheCommunity(params.commune, reportMarkdown);

  return (
    <>
      <h2>Recomendaciones comunales</h2>
      <Markdown>{reportMarkdown}</Markdown>
      <h2>Recomendaciones para los vecinos</h2>
      <Markdown>{communityRecommendations}</Markdown>
    </>
  )
}
