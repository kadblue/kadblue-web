import { Google } from '@mui/icons-material';
import { Box, Button, Link, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthURL, ClientId, DomainName } from '../../config';
import UserContext from '../../Contexts/UserContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxWidth: '500px',
  minWidth: '300px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

export default function Login(props) {

  const { Login } = useContext(UserContext) 
  const googleSignInLink = AuthURL+'/oauth2/authorize?identity_provider=Google&redirect_uri='+encodeURI(DomainName)+'&response_type=TOKEN&client_id='+encodeURI(ClientId)+'&scope=email openid phone profile'
  const accountCreationLink = AuthURL+'/signup?client_id='+encodeURI(ClientId)+'&response_type=token&scope=email+openid+phone+profile&redirect_uri='+encodeURI(DomainName)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)


  function HandleSubmit(e){
    e.preventDefault()

    Login(username,password)
    .then(res=>{
      props.setOpen(false)
      props.onSuccess()
    }).catch(err=>{
      setError(true)
    })
  }

  return (
    <Modal
        open={props.open}
        onClose={props.onClose}
    >
        <Box sx={style} >
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
            Don't Have an account? Create one <Link href={accountCreationLink}>here</Link>
          </div>
              
        </Box>
    </Modal>
  )
}
