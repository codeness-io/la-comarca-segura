import communes from "@/data/communes.json"
import slugify from "slugify"

type PrecipitationData = {
  daily: {
    precipitation_sum: number[]
  }
}

function getCommuneLatLong(commune: string) {
  const communeData = communes.find((c: any) => slugify(c.Comuna, { lower: true }) === commune)

  if (!communeData) {
    throw new Error(`Commune ${commune} not found`)
  }

  return {
    latitude: communeData["Latitud (Decimal)"],
    longitude: communeData["Longitud (decimal)"]
  }
}

export async function getPrecipitationForecast(commune: string) {
  const { latitude, longitude } = getCommuneLatLong(commune)
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?daily=precipitation_sum&latitude=${latitude}&longitude=${longitude}&current=precipitation&timezone=America%2FSantiago&forecast_days=16`)
  const data = await response.json()
  return data as PrecipitationData
}
