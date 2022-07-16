import { ContentCopy } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
import AuthToken from './AuthToken';
import EndPoint from './EndPoint';
import { PlaceCloneEndpoints } from '../../Data/placeclone-endpoints';

export default function PlaceClone() {
    function CopyToClipboard(text){
        navigator.clipboard.writeText(text)
    }
    

    function ApiUrl(){
        var url = "https://placeclone.kadblue.com"
        return(
            <Card sx={{ minWidth: 275,border:1 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 16,fontWeight: "bold" }} color="text.primary">
                        Base URL:
                    </Typography>
                    <Typography  color="text.primary">
                        {url}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title="Copy">
                        <IconButton  onClick={()=>CopyToClipboard(url)}>
                            <ContentCopy/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        )
    }
    
    
    return (
        <Paper elevation={0}>
            <Grid container spacing={3} padding={4}>
                <Grid item xs={12}>
                    <Box sx={{marginTop:'10px',textAlign:'center'}}>
                        <RouterLink to="/">Go Home</RouterLink>
                    </Box>
                    <Box sx={{marginTop:'10px'}}>
                        {PlaceCloneEndpoints.map(endpoint=>{
                            return(
                                <EndPoint
                                    key={endpoint.name}
                                    uri={endpoint.uri}
                                    method={endpoint.method}
                                    description={endpoint.description}
                                    args={endpoint.args}
                                />
                            )
                        })}
                    </Box>
                    <Box sx={{marginTop:'10px'}}>
                        <ApiUrl/>
                    </Box>
                    <Box sx={{marginTop:'10px'}}>
                        <AuthToken/>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
