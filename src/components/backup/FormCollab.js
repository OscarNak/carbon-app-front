import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import {v4} from 'uuid'

import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button
} from '@mui/material';


export default function FormCollab() {

  //redirect
  const navigate = useNavigate()


  //populated by fetch api
  const [perData, setPerData] = useState([])
  const [gazData, setGazData] = useState([])
  const [elecData, setElecData] = useState([])
  const [moto, setMoto] = useState([])
  const [type, setType] = useState([])

  const [switchT, setSwitchT] = useState(false)
  const [form, setForm] = useState({
    id_per: '',
    id_fournisseur_gaz: '',
    id_fournisseur_elec: '',
    nb_jours_teletravail_semaine: '',
    distance_maison_travail: '',
    nb_jours_voiture_semaine: '',
    nb_jours_bus_semaine: '',
    nb_jours_tramway_semaine: '',
    conso_elec_kwh_mois: '',
    conso_gaz_kwh_mois: '',
    conso_eau_m3_mois: '',
    dechets_kg_semaine: '',
    dechets_recyclage_kg_semaine: ''
  })

  const [listeVoitures, setListeVoitures] = useState({values : [{id_motorisation: "", id_type: "", age: ""}]})


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

    fetch("http://localhost:8080/api/v1/voiture/specs")
    .then(response => response.json())
    .then(data => {
      setMoto(data.motorisations)
      setType(data.types)
    })

  },[])


  function handleCarChange(index, e){
    let values = listeVoitures.values
    values[index][e.target.name] = e.target.value
    setListeVoitures({values})
  }

  function handleSwitchChange(event){
    setSwitchT(event.target.checked)
  }

  function handleChangeForm(event){
    const value = event.target.value;
    setForm({
      ...form,
      [event.target.name]: value
    })
  }

  function handleValidate(){

    if(!switchT){
      form.nb_jours_teletravail_semaine = 0
    }

    let finalForm = {
      ...form,
      voitures: listeVoitures.values
    }

    //verify first form is complete
    let isCompleted = true
    for (const [key, value] of Object.entries(finalForm)) {
      if(value === null || value === ''){
        isCompleted = false
      }
    }

    if(isCompleted){
      //api post form
      fetch ('http://localhost:8080/api/v1/collaborateur/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalForm),
        Origin: '*'
      }).then(function (response){
        return response.text()
      })
      .then(function(text){
        console.log(text)
      })
      .catch(function(error){
        console.error(error)
      })

      //redirect to home page
      navigate("/")
    }
    else{
      //alert form uncompleted
      alert("Veuillez remplir tous les champs")
    }
  }

  function removeFormFiels(i){
    let values =  listeVoitures.values
    values.splice(i, 1)
    setListeVoitures({values})
  }

  function addFormFields(){
    setListeVoitures({
      values : [...listeVoitures.values, 
                {id_motorisation: "", id_type: "", age: ""}
      ]
    })
  }

  return (
    <div style={{ padding: 100, margin: 'auto', width: 710}}>
      <Paper variant="outlined">
      <Typography variant='h2' sx={{ fontSize: 38 }} padding={3}>
        Formulaire Collaborateur
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
                  <InputLabel id="label-per">Site PER affilié(e)</InputLabel>
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
              <Grid item xs={12}>
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

              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Divider variant="middle"><Chip label="Télé-Travail" /></Divider>
              </Grid>
              <Grid item xs={6}>
              <FormGroup>
                <FormControlLabel control={
                    <Switch 
                      checked={switchT} 
                      onChange={handleSwitchChange}/>
                } label="Teleravail dans le contrat" />
              </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={!switchT}
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='nb_jours_teletravail_semaine'
                  onChange={handleChangeForm}
                  label="Nb de jours en TéléTravail"
                  placeholder='3'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">/Semaine</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle"><Chip label="Déplacement" /></Divider>
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='distance_maison_travail'
                  onChange={handleChangeForm}
                  label="Distance Maison Travail"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='nb_jours_voiture_semaine'
                  onChange={handleChangeForm}
                  label="Nb de jours en voiture"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">/Semaine</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='nb_jours_bus_semaine'
                  onChange={handleChangeForm}
                  label="Nb de jours en Bus"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  variant='outlined'
                  color="primary"
                  type="number"
                  name='nb_jours_tramway_semaine'
                  onChange={handleChangeForm}
                  label="Nb de jours en Tramway"
                  placeholder='15'
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle"><Chip label="Consommation" /></Divider>
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
              <Grid item xs={12}>
                <Divider variant="middle"><Chip label="Vos Voitures" /></Divider>
              </Grid>


                {listeVoitures.values.map((element, index) => (
                  <Grid item>
                        <Card >
                          <CardActions>
                              <FormControl variant='outlined'>
                                <InputLabel>Type</InputLabel>
                                <Select 
                                  label="Type"
                                  name="id_type" 
                                  sx={{ minWidth: 130}} 
                                  onChange={e => handleCarChange(index, e)}
                                  value={element.id_type || ""}
                                  >

                                  {type.map( item => (
                                    <MenuItem value={item.id} key={v4()}>{item.type}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>

                              <FormControl variant='outlined'>
                                <InputLabel>Motorisation</InputLabel>
                                <Select 
                                  label="Motorisation"
                                  name="id_motorisation" 
                                  sx={{ minWidth: 130}} 
                                  onChange={e => handleCarChange(index, e)}
                                  value={element.id_motorisation || ""}
                                  >
                                  {moto.map( item => (
                                    <MenuItem value={item.id} key={v4()}>{item.motorisation}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <TextField type="number" label="Age de la voiture" name="age" onChange={e => handleCarChange(index, e)} value={element.age || ""}/>
                              <IconButton onClick={() => removeFormFiels(index)}><DeleteForeverIcon /></IconButton>
                          </CardActions>
                        </Card>
                    </Grid>
                ))}


              <Grid item xs={12}>
                <Button onClick={addFormFields} variant="contained" endIcon={<AddBoxOutlinedIcon />}>
                  Ajouter
                </Button>
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
