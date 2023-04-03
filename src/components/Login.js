import React from 'react'
import { useState } from 'react';
import {
    Grid,
    TextField,
    Paper,
    Button
  } from '@mui/material';



export default function Login() {


    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return login.length > 0 && password.length > 0;
    }

    function handleLogin(event) {
        console.log(`${login} et ${password}`)
        //verify auth
    }



    return (

        <div style={{ padding: 200, margin: 'auto', width: 300}}>
        <Paper>
            <Grid
            container
            spacing={3}
            direction={'column'}
            justify={'center'}
            alignItems={'center'}
            >
            <Grid item xs={12}>
                <TextField label="Username" onChange={(e) => setLogin(e.target.value)}></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Password" type={'password'} onChange={(e) => setPassword(e.target.value)}></TextField>
            </Grid>
            <Grid item xs={12} paddingBottom={5}>
                <Button  variant="outlined" onClick={handleLogin} disabled={!validateForm()}> Login </Button>
            </Grid>
            </Grid>
        </Paper>
        </div>
    )
}
