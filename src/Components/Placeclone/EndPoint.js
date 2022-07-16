import { Button, Card, CardActions, CardContent, Grid, Paper, TextField, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../Contexts/UserContext'

export default function EndPoint(props) {

    const [token, setToken] = useState("")
    const [form, setForm ] = useState({})
    const [error, setError] = useState()
    const [output, setOutput] = useState("")
    
    var {GetSession} = useContext(UserContext)

    var args = []
    if (props.args) {
        args = props.args
    }


    function TestEndpoint(){
        var url = "https://placeclone.kadblue.com"+props.uri
        var method = props.method
        var body = ""
        if(method==="POST"){
            body = JSON.stringify(form)
        }
        var requestParams = {
            method:method,
            headers:{"Authorization":"Bearer "+token}
        }
        if( method!=="GET"){
           requestParams.body = body
        }
        fetch(url,requestParams)
        .then(res=>res.json())
        .then(res=>{
            if(res.status===200){
                setOutput(JSON.stringify(res,null,2))
            }else{
                setError(res.data)
                setOutput(JSON.stringify(res,null,2))
            }
        }).catch(err=>{
            setError(output)
        })
    }

    useEffect(() => {
        var session = GetSession().then(session=>{
            setToken(session.idToken.jwtToken)
        }).catch(err=>{
            setError(err)
        });
    }, [GetSession])

    
  return (
    <Card sx={{ minWidth: 275,border:1, marginTop:'10px'}}>
        <CardContent>
            <Typography sx={{fontWeight:'bold',fontSize:18}} color="white">
                Endpoint: <Typography sx={{fontWeight:'bold',fontSize:18}} color="text.primary">"{props.uri}"</Typography>
            </Typography>
            <Typography color="white">
                Method: <Typography color="text.primary">"{props.method}"</Typography>
            </Typography>
            <Typography color="white">
                Description: <Typography color="text.primary">{props.description}</Typography>
            </Typography>
            {props.args &&
                <>
                    <Typography color="white">Arguments:</Typography>
                    <Grid container>
                        {args.map((arg,index)=>{
                            return(
                                <Grid item xs={12} key={index}>
                                    <Card sx={{ border:1 ,marginTop:'10px'}}>
                                        <CardContent>
                                            <Typography color="text.primary">
                                                argument: {arg.name}
                                            </Typography>
                                            <Typography color="text.primary">
                                                description: {arg.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                    <Paper sx={{marginTop:"15px",border:1}}>
                            {args.map((arg,index)=>{
                                var inputtype = "text"
                                var inputId = "outlined-basic"
                                if (arg.type==="integer"){
                                    inputtype = "number"
                                    inputId = "outlined-number"
                                }
                                        return(
                                            <TextField
                                                id={inputId}
                                                label={arg.name}
                                                type={inputtype}
                                                sx={{margin:"10px"}}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e)=>{
                                                    var newForm = {...form}
                                                    if(arg.type==="integer"){
                                                        newForm[arg.name] = parseInt(e.target.value)
                                                    }
                                                    else{
                                                        newForm[arg.name] = e.target.value
                                                    }
                                                    setForm(newForm)
                                                }}
                                            />
                                        )
                                    })
                                    }
                        </Paper>
                </>
            }
            <Typography color="white">Output: </Typography>
            <Paper  sx={{marginTop:"15px",border:1,backgroundColor:'white',maxHeight:'400px'}}>
                <Typography color={"black"}>{output}</Typography>
                
            </Paper>
            
            
        </CardContent>
        <CardActions>
            <Tooltip title="Test Endpoint with Token">
                <Button variant='outlined' onClick={()=>TestEndpoint()}>
                    Test
                </Button>
            </Tooltip>
        </CardActions>
    </Card>
  )
}
