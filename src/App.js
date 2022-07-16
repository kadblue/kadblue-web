import { useEffect } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import { UserProvider } from './Contexts/UserContext';
import { createTheme, CssBaseline, Paper } from '@mui/material'
import { ThemeProvider } from '@mui/system';
import { blue } from '@mui/material/colors';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PlaceClone from './Components/Placeclone/Placeclone';

function App() {

  var theme = createTheme({
    palette:{
      mode:'dark',
      text:{
        primary:blue[100],
      },
      background:{
        default:"#00013b",
        paper:"#00013b"
      }
    }
  })


  useEffect(() => {
    document.title = "Kadblue Projects"
  },[])


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <UserProvider>
        <BrowserRouter>
          <Routes >
            <Route path="/" element={<Home/>}/>
            <Route path="/placeclone" element={<PlaceClone/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
      
    </ThemeProvider>
    
  );
}

export default App;
