import React from 'react'
import { Grid } from '@mui/material';
import MediaCard from './MediaCard';

export default function Home() {
  return (
    <div className="App" elevation={0}>
        <div className='content'>
            <Grid container
            spacing={6}
            padding={20}
            >
                <Grid item xs={12} sm={6}>
                    <MediaCard 
                    name="Form Collaborateur" 
                    content="Je suis un collaborateur sur un site PER" 
                    imgUrl="../../figure-1.png"
                    buttonName="Remplir"
                    page="formCollab"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MediaCard 
                    name="Form PER" 
                    content="Je suis un responsable d'un batiment PER" 
                    imgUrl="../../figure-2.png"
                    buttonName="Remplir"
                    page="formPer"/>
                </Grid>
                <br />
                <Grid item xs={12} sm={6}>
                    <MediaCard 
                    name="Bilan Carbone" 
                    content="Je veux calculer le BEC d'un site PER" 
                    imgUrl="../../figure-3.png"
                    buttonName="Calculer"
                    page="bilanGes"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MediaCard 
                    name="Panel Admin" 
                    content="Je suis un administrateur et je veux modifier quelque chose" 
                    imgUrl="../../figure-4.png"
                    buttonName="Configurer"
                    page="admin"/> 
                </Grid>
            </Grid>
        </div>
  </div>
  )
}
