import React from 'react'
import Typography from '@mui/material/Typography'
import {
  Grid,
  Paper,
  Button
} from '@mui/material'



export default function Admin() {

  function handleUpdate(){
    
  }


  return (
    <div style={{ padding: 100, margin: 'auto', width: 710}}>
      <Paper variant="outlined">

        <Grid
              container
              spacing={3}
              justify={'center'}
              alignItems={'left'}
              padding={3}
              >

          <Grid item xs={6}>
            <Button variant="contained"  onClick={handleUpdate}>Actuliser les facteurs d'émissions</Button>
          </Grid>
          <Grid item xs={6}>
          <Paper elevation={3} sx={{padding:1}}> 
            <Typography variant="body2" gutterBottom>
              Cette action à pour effet de mettre à jour les facteurs d'émissions utilisés dans l'application.
              Basé sur les dernières documentations de l'ADEME.
            </Typography>
          </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}