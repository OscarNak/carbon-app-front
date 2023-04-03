import React, { Suspense } from 'react'
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Grid,
  Paper,
  Button
} from '@mui/material';

const GesTable = React.lazy(() => import("./GesTable"))

export default function BilanGes() {

  //props
  const [perData, setPerData] = useState([])
  const [form, setForm] = useState({
    id_per: ''
  })

  const [res, setRes] = useState([])
  const [loadDynamicComp, setLoadDynamicComp] = useState(0);


  //at mount of component
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/per/all")
    .then(response => response.json())
    .then(data => setPerData(data))
  }, [])


  //on action
  function handleChangeForm(event){
    const value = event.target.value;
    setForm({
      ...form,
      [event.target.name]: value
    })
  }

  function handleValidate(){

    fetch("http://localhost:8080/api/v1/calcul/bilan?per_id=" + form.id_per, {
      method: 'post',
      Origin: '*'
    })
    .then(response => response.json())
    .then(data => {
      setRes(data)
      console.log(data)
      setLoadDynamicComp(1)
    })
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
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 300 }} variant='outlined'>
                  <InputLabel id="label-per">Site PER étudié</InputLabel>
                  <Select
                  required
                    name="id_per"
                    value={form.id_per}
                    label="Site PER étudié"
                    onChange={handleChangeForm}
                  >
                    {perData.map(item => (
                      <MenuItem value={item.id} key={item}>{item.nom}</MenuItem>
                    ))}


                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleValidate} disabled={!form.id_per}>Demander le bilan</Button>
              </Grid>

              
              <Grid item xs={12}>
              {loadDynamicComp ? 
              (
                <Suspense fallback={<div>Chargement....</div>}>
                  <GesTable res ={res}/>
                </Suspense>
              )

               : null}

              </Grid>
          </Grid>
      </Paper>
    </div>
  )
}
