import { AppBar, Toolbar, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BilanGes from './components/BilanGes';
import FormPer from './components/FormPer';
import FormCollab from './components/FormCollab';
import Admin from './components/Admin';
import Login from './components/Login'
import { Link } from 'react-router-dom';
import './css/App.css';


function App() {

  return (
    
    <div className="App" elevation={0}>
      <AppBar >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{textDecoration: "none", color: "white"}} to="/">
              BILAN CARBONE
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Admin" element={<Admin />}/>
        <Route path="BilanGes" element={<BilanGes />}/>
        <Route path="FormCollab" element={<FormCollab />}/>
        <Route path="FormPer" element={<FormPer />}/>
        <Route path='Login' element={<Login />}/>
      </Routes>

    </div>
  );
}

export default App;
