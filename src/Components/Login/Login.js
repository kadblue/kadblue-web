import { Google } from '@mui/icons-material';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import UserContext from '../../Contexts/UserContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

export default function Login(props) {

  const { Login } = useContext(UserContext) 
  const googleSignInLink = 'https://kadblue.auth.ap-south-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:3000&response_type=TOKEN&client_id=5rplipmsb4a6l4a04ffh2g75d0&scope=email openid phone profile'
  const accountCreationLink = 'https://kadblue.auth.ap-south-1.amazoncognito.com/signup?client_id=5rplipmsb4a6l4a04ffh2g75d0&response_type=token&scope=email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function HandleSubmit(e){
    e.preventDefault()
    console.log(username,password)

    Login(username,password)
    .then(res=>{
      props.setOpen(false)
    }).catch(err=>{
      setError(true)
    })
  }

  return (
    <Modal
        open={props.open}
        onClose={props.onClose}
    >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center'}}>
                Login
          </Typography>

          <Stack spacing={2}>
            <TextField label="username" variant="standard" error={error} onChange={(e)=>setUsername(e.target.value)}  />
            <TextField type='password' label="password" variant="standard" error={error} onChange={(e)=>setPassword(e.target.value)} />
            <div style={{justifyContent:'center',alignItems:'center',margin:'auto',marginTop:'20px'}}>
              <Button variant="contained" color="primary" onClick={HandleSubmit}>Login</Button>
            </div>
            <div style={{justifyContent:'center',alignItems:'center',margin:'auto',marginTop:'20px'}}>
              <Button variant="outlined" color="primary" href={googleSignInLink} endIcon={<Google/>}>Login With Google</Button>
            </div>
          </Stack>
          <div style={{textAlign:'center',marginTop:'20px'}}>
            Don't Have an account? Create one <a href={accountCreationLink}>here</a>
          </div>
              
        </Box>
    </Modal>
  )
}
