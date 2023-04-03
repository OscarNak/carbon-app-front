import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import {v4} from 'uuid'

import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button
} from '@mui/material';


export default function FormPer() {

  //populated by fetch api
  const [perData, setPerData] = useState([])
  const [gazData, setGazData] = useState([])
  const [elecData, setElecData] = useState([])

  const [form, setForm] = useState({
    id_per: '',
    id_fournisseur_gaz: '',
    id_fournisseur_elec: '',
    conso_elec_kwh_mois: '',
    conso_gaz_kwh_mois: '',
    conso_eau_m3_mois: '',
    dechets_kg_semaine: '',
    dechets_recyclage_kg_semaine: '',
    conso_papier_kilo_semaine: ''

  })

  const [alert, setAlert] = useState(false)
  
  //fetch data to populate form infos
  useEffect(() => {


    fetch("http://localhost:8080/api/v1/per/all")
    .then(response => response.json())
    .then(data => setPerData(data))

    fetch("http://localhost:8080/api/v1/fournisseur/gaz/all")
    .then(response => response.json())
    .then(data => setGazData(data))

    fetch("http://localhost:8080/api/v1/fournisseur/elec/all")
    .then(response => response.json())
    .then(data => setElecData(data))


  },[])

  useEffect(() =>{



    if(form.id_per){
      fetch("http://localhost:8080/api/v1/per/lastEntryDate?id_per="+form.id_per)
      .then(response => response.text())
      .then(data => {
        //verifier la date
        //si inférieur à un mois entre elle est ajd
          //ajouter message d'alerte dynamiqument

          var dateParts = data.split("/");

          // month is 0-based, that's why we need dataParts[1] - 1
          var lastEntry = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

          var lastMounthDate = new Date()
          lastMounthDate.setMonth(lastMounthDate.getMonth() - 1);


          if(lastEntry > lastMounthDate){
            console.log("la date " + lastEntry + " est entre 30 jours et maintenant")
            setAlert(true)
          }else{
            setAlert(false)
          }
      })
    }

  },[form.id_per])
  
  
  function handleChangeForm(event){
    const value = event.target.value;
    setForm({
      ...form,
      [event.target.name]: value
    })
  }

  function handleValidate(){
    console.log(form)
  }

  return (
    <div style={{ padding: 100, margin: 'auto', width: 710}}>
      <Paper variant="outlined">
      <Typography variant='h2' sx={{ fontSize: 38 }} padding={3}>
        Formulaire Site PER
      </Typography>
        <Grid
              container
              spacing={3}
              justify={'center'}
              alignItems={'left'}
              padding={3}
              >
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 300 }} variant='outlined'>
                  <InputLabel id="label-per">Site PER ciblé</InputLabel>
                  <Select
                  required
                    name="id_per"
                    value={form.id_per}
                    label="Site PER affilié(e)"
                    onChange={handleChangeForm}
                  >
                    {perData.map(item => (
                      <MenuItem value={item.id} key={v4()}>{item.nom}</MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} hidden={!alert}>
                <Alert severity="info">Un formulaire pour ce site a été saisi recemment <br />Voulez vous vraiment faire une saisie ?</Alert>
              </Grid>

              <Grid item xs={12}>
                <Divider variant="middle"><Chip label="Consommation Energetique" /></Divider>
              </Grid>

              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 300 }} variant='outlined'>
                    <InputLabel id="id_fournisseur_gaz">Fournisseur Gaz</InputLabel>
                    <Select
                      name="id_fournisseur_gaz"
                      value={form.id_fournisseur_gaz}
                      label="Fournisseur de Gaz"
                      onChange={handleChangeForm}
                    >

                      {gazData.map(item => (
                        <MenuItem value={item.id} key={v4()}>{item.nom}</MenuItem>
                      ))}
                    </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 300 }} variant='outlined'>
                  <InputLabel id="id_fournisseur_elec">Fournisseur d'Eléctricité</InputLabel>
                  <Select
                    name="id_fournisseur_elec"
                    value={form.id_fournisseur_elec}
                    label="Fournisseur d'Eléctricité"
                    onChange={handleChangeForm}
                  >
                    {elecData.map(item => (
                      <MenuItem value={item.id} key={v4()}>{item.nom}</MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='conso_elec_kwh_mois'
                  onChange={handleChangeForm}
                  label="Consommation Electrique"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kWh/mois</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='conso_gaz_kwh_mois'
                  onChange={handleChangeForm}
                  label="Consommation en Gaz"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kWh/mois</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='conso_eau_m3_mois'
                  onChange={handleChangeForm}
                  label="Consommation en eau"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">m3/mois</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle"><Chip label="Dechets" /></Divider>
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='dechets_kg_semaine'
                  onChange={handleChangeForm}
                  label="Dechets non recyclables"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Kg/semaine</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='dechets_recyclage_kg_semaine'
                  onChange={handleChangeForm}
                  label="Dechets recyclables"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Kg/semaine</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='conso_papier_kilo_semaine'
                  onChange={handleChangeForm}
                  label="Papier utilisé"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Kg/semaine</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle"><Chip label="Collaborateurs"/></Divider>
              </Grid>

              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='nb_collabs'
                  onChange={handleChangeForm}
                  label="Nombre de collabs ratachés au site"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider variant="middle"></Divider>
              </Grid>

              <Grid item>
                <Button variant="contained" onClick={handleValidate}>Valider le formulaire</Button>
              </Grid>
          </Grid>
      </Paper>
    </div>
  )
}
