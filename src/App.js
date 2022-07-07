import { useEffect } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import { UserProvider } from './Contexts/UserContext';
import UserPool from './UserPool';
import { createTheme, CssBaseline, Paper } from '@mui/material'
import { ThemeProvider } from '@mui/system';
import { blue } from '@mui/material/colors';

function App() {

  var theme = createTheme({
    palette:{
      mode:'dark',
      text:{
        primary:blue[100],
      },
      background:{
        default:blue[900],
        paper:blue[900]
      }
    }
  })


  useEffect(() => {
    document.title = "Kadblue Projects"
  },[])


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Paper elevation={0}>
        <UserProvider>
          <Home/>
        </UserProvider>
      </Paper>

    </ThemeProvider>
    
  );
}

export default App;
