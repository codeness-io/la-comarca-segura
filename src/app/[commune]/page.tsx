import { getFloodData } from "@/data"
import { getFloodSystemPrompt, getFloodUserPrompt } from "@/ai/report";

type Parameters = {
  params: {
    commune: string;
  };
};

export default async function Report({ params }: Parameters) {
  const data = await getFloodData(params.commune);
  const systemPrompt = getFloodSystemPrompt();
  const userPrompt = await getFloodUserPrompt(params.commune);

  return (
    <div>
      <h1>Report</h1>
      <code>
        {JSON.stringify(data, null, 2)}
      </code>
      <h2>Instructions</h2>
      <code style={{whiteSpace: 'pre-line'}}>
        {systemPrompt}
      </code>
      <h2>User Message</h2>
      <code style={{whiteSpace: 'pre-line'}}>
        {userPrompt}
      </code>
    </div>
  )
}
