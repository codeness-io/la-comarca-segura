import {floodAttributesToAnalyze, getFloodData} from "@/data"
import floodAttributesDescription from "@/data/flood_attributes.json"
import { json2csv } from 'json-2-csv'
import { generateText, generateObject } from 'ai';
import { openai } from '@ai-sdk/openai'; // Ensure OPENAI_API_KEY environment variable is set
import { z } from 'zod';

export function getFloodSystemPrompt() {
  const attributesSet = new Set(floodAttributesToAnalyze)
  const attributes = floodAttributesDescription.filter((attribute) => attributesSet.has(attribute['ID Atributo']))
  const attributesText = json2csv(attributes, { excludeKeys: ["Unidad"] })

  return `
Eres un asesor de gobierno sobre riesgo y mitigación de consecuencias del cambio climático en Chile.

Tu objetivo es explicar de manera simple (ELI5) los principales riesgos que vez en una comuna específica.

Para esto, te entregaremos indicadores sobre inundaciones de la comuna a analizar.

Los indicadores que te entregaremos son los siguientes (CSV):

${attributesText}

Tu misión es explicar de manera simple los riesgos que ves en la comuna a analizar.
  `
}

export async function getFloodUserPrompt(commune: string) {
  const floodData = await getFloodData(commune)

  return `
La comuna a analizar es: ${floodData.properties.NOM_COMUNA}

Los indicadores para esta comuna son: ${JSON.stringify(floodData.properties, null, 2)}
  
Para responder, hazlo en formato markdown, es español, y no incluyas los valores de los indicadores. Puedes marcar con negrita los puntos más importantes.

La estructura que debes seguir es la siguiente estructura (1 párrafo por item):

### Amenaza de inundaciones

...

### Exposición (Cuántas personas están en riesgo)

...

### Riesgo (amenaza vs exposición)

...

### Sugerencias de mejora

- sugerencia 1
- ...
- sugerencia N
  `.trim()
}

export async function generateReport(commune: string) {
  console.time('OpenAI GPT-4o')
  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: getFloodSystemPrompt(),
    prompt: await getFloodUserPrompt(commune),
  });
  console.timeEnd('OpenAI GPT-4o')

  return text
}

export async function recommendationsForTheCommunity(commune: string, report: string) {
  const systemPrompt = `
Eres un asesor de gobierno de Chile sobre riesgo y mitigación de consecuencias del cambio climático en Chile.

Tu objetivo es generar medidas recomendadas para los habitantes de la comuna en base a la información de un reporte de riesgo de inundaciones.

El reporte contiene la siguiente información: Amenazas, Exposición, Riesgo y Sugerencias de mejora.
`.trim()

  const userPrompt = `
  En base al siguiente reporte de la comuna de ${commune} (Chile), genera un listado de medidas recomendadas que un habitante normal puede seguir para mitigar los riesgos de inundaciones.
  
  Tu respuesta debe ser un listado recomendaciones en español (JSON). Cada recomendación debe ser simple, no técnica y fácil de seguir.
  
  {"recommendations": ["Medida 1", "**Medida 2**", ..., "Medida N"]}
  
  ${report}
`.trim()

  const expected = z.object({
    recommendations: z.array(z.string())
  })

  console.time('OpenAI GPT-4o (recommendationsForTheCommunity)')
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    schema: expected,
    system: systemPrompt,
    prompt: userPrompt,
  });
  console.timeEnd('OpenAI GPT-4o (recommendationsForTheCommunity)')

  return object.recommendations.map((item: string) => `- ${item}`).join('\n')
}
