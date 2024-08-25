'use client'

import { Button } from "@mui/material";
import { useToPng } from '@hugocxl/react-to-image'
import DownloadIcon from '@mui/icons-material/Download';

export default function DownloadRecommendation() {
  const [state, convert] = useToPng<HTMLDivElement>({
    selector: '#recommendations',
    quality: 0.8,
    onSuccess: (data) => {
      const link = document.createElement('a');
      link.download = 'recomendaciones-inundaciones.jpeg';
      link.href = data;
      link.click();
    },
  })

  return (
    <Button variant="contained" onClick={convert} startIcon={<DownloadIcon />}>
      Descargar Recomendaciones (imagen)
    </Button>
  )
}
