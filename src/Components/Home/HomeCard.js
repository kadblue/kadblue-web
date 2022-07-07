import { AccountCircle, Close } from "@mui/icons-material"
import { Alert, AppBar, Box, Button, IconButton, Snackbar, Toolbar, Typography } from "@mui/material"
import { useContext, useState } from "react"
import UserContext from "../../Contexts/UserContext"
import Login from "../Login/Login"



export default function HomeCard(props) {
    const {signedIn,GetUser} = useContext(UserContext)
    const [loginScreenOpen, setLoginScreenOpen] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    var username = ""
    if (GetUser() !== null){
        username = GetUser().username
    }

    function handleClose(){
        setSnackbarOpen(false)
    }

    const action = (
      <>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Close fontSize="small" />
        </IconButton>
      </>
    );

    return (
      <Box sx={{ flexGrow: 1}} >
        <AppBar position="static" color='transparent' elevation={0}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow:1,
              }}
            >
              Kadblue
            </Typography>
            <Button 
              color="inherit" 
              endIcon={<AccountCircle/>}
              onClick={()=>setLoginScreenOpen(true)} 
            >
              {signedIn ? username : 'Login'}
            </Button>
          </Toolbar>
          <Login open={loginScreenOpen} setOpen={setLoginScreenOpen} onClose={()=>setLoginScreenOpen(false)} onSuccess={()=>setSnackbarOpen(true)}/>
          <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{ vertical:'top', horizontal:'right' }}
            open={snackbarOpen}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {"Welcome "+username+"!"}
            </Alert>
          </Snackbar>
          
        </AppBar>
      </Box>
    )
}