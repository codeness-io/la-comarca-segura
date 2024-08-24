import { generateReport } from "@/ai/report";
import Markdown from 'react-markdown'

type Parameters = {
  params: {
    commune: string;
  };
};

export default async function Report({ params }: Parameters) {
  const reportMarkdown = await generateReport(params.commune);

  return (
    <>
      <h1>Reporte</h1>
      <Markdown>{reportMarkdown}</Markdown>
    </>
  )
}
