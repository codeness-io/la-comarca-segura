'use client'

import {Alert, Button, Divider} from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DownloadRecommendation from "@/components/DownloadRecommendation";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};


export default function WeatherAlert({ date, recommendations } : { date: string, recommendations: string[] }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Alert
        severity="error"
        variant="outlined"
        sx={{ marginTop: 2 }}
        action={(
          <Button
            size="small"
            variant="outlined"
            color="inherit" sx={{ backgroundColor: "white" }}
            startIcon={<TipsAndUpdatesIcon />}
            onClick={handleOpen}
          >
            Ver recomendaciones para vecinos
          </Button>
        )}
      >
        Se esperan precipitaciones altas el día {date}.
      </Alert>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box id="recommendations" sx={{ backgroundColor: 'white', padding: 4 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
              Recomendaciones para mitigar riesgos de inundaciones
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ul>
                {recommendations.map((recommendation, index) => {
                  return (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <Typography variant="body1">
                        {recommendation}
                      </Typography>
                    </li>
                  )
                })}
              </ul>
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ px: 4, paddingTop: 2, paddingBottom: 4 }}>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              ✨ Puedes descargar las recomendaciones en formato de imagen para compartirlas con tu comunidad.
            </Typography>
            <DownloadRecommendation />
          </Box>
        </Box>
      </Modal>
    </>
  )
}
