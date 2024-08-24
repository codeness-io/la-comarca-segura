import { getFloodData } from "@/data"

type Parameters = {
  params: {
    commune: string;
  };
};

export default async function Report({ params }: Parameters) {
  const data = await getFloodData(params.commune);

  return (
    <div>
      <h1>Report</h1>
      <code>
        {JSON.stringify(data, null, 2)}
      </code>
    </div>
  )
}
