import { AccountCircle, ContentCopy, Refresh } from '@mui/icons-material'
import { Alert, Button, Card, CardActions, CardContent, IconButton, Snackbar, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../Contexts/UserContext'
import Login from '../Login/Login'

export default function AuthToken() {
    var {RefreshSession,GetSession,GetUser} = useContext(UserContext)
    const [token, setToken] = useState("")
    const [error, setError] = useState()
    const [loginScreenOpen, setLoginScreenOpen] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [pingError, setPingError] = useState(null)

    useEffect(() => {
        var session = GetSession().then(session=>{
            setToken(session.idToken.jwtToken)
        }).catch(err=>{
            setError(err)
        });
    }, [])

    function PingWithToken(){
        setPingError(null)
        fetch("https://placeclone.kadblue.com/api/pings",{"headers":{"Authorization":"Bearer "+token}}).then(res=>{
            if(res.status==200){
                setSnackbarOpen(true)
            }else{
                setSnackbarOpen(true)
                setPingError(res.statusText)
            }
        }).catch(err=>{
            setSnackbarOpen(true)
            setPingError(err)
        })
    }

    function handleSnackbarClose(){
        setSnackbarOpen(false)
    }

    function CopyToClipboard(text){
        navigator.clipboard.writeText(text)
    }
    function RefreshToken(){
        var session = RefreshSession().then(session=>{
            setToken(session.idToken.jwtToken)
        }).catch(err=>{
            setError(err)
        });
    }
    if(error){
        return(
            <>
            <Alert 
            severity="warning"
            action={
                <Button 
                    color="inherit" 
                    endIcon={<AccountCircle/>}
                    onClick={()=>setLoginScreenOpen(true)} 
                >
                    Login
                </Button>
            }
            >
                You are Not Logged in! Login to get your auth token to use this api
            </Alert>
            <Login open={loginScreenOpen} setOpen={setLoginScreenOpen} onClose={()=>setLoginScreenOpen(false)} onSuccess={()=>setError(null)}/>
          
            </>
        )
    }
    return(
        <Card sx={{ minWidth: 275,border:1 }}>
            <CardContent>
                <Typography sx={{ fontSize: 16,fontWeight: "bold" }} color="text.primary">
                    Auth Token:
                </Typography>
                <Typography color="text.secondary">
                {token}
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Copy">
                    <IconButton  onClick={()=>CopyToClipboard(token)}>
                        <ContentCopy/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Refresh">
                    <IconButton aria-label='refresh' onClick={RefreshToken}>
                        <Refresh/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Refresh">
                    <Button onClick={PingWithToken}>
                        Ping With Token
                    </Button>
                </Tooltip>
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical:'top', horizontal:'right' }}
                    open={snackbarOpen}
                    onClose={handleSnackbarClose}
                >
                    {pingError?
                        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                            Ping Failure! Try refreshing token!
                        </Alert>:
                        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            Ping Success!
                        </Alert>
                    }
                </Snackbar>
            </CardActions>
        </Card>
    )
}
