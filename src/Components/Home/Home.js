import { AccountCircle, GitHub, MenuBook, MenuOpen, MenuOutlined } from '@mui/icons-material';
import { AppBar, Box, Button, Card, CardActions, CardContent, Grid, IconButton, Menu, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import './home.css'
import { ProjectData } from '../../Data/projects.js'
import UserContext from '../../Contexts/UserContext';
import Login from '../Login/Login';



function HomeCard(props) {
    const {signedIn,GetUser} = useContext(UserContext)
    const [loginScreenOpen, setLoginScreenOpen] = useState(false)
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='transparent'>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
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
              // href='https://kadblue.auth.ap-south-1.amazoncognito.com/oauth2/authorize?client_id=5rplipmsb4a6l4a04ffh2g75d0&response_type=token&scope=email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000'
            >
              {signedIn ? GetUser().username : 'Login'}
            </Button>
          </Toolbar>
          <Login open={loginScreenOpen} setOpen={setLoginScreenOpen} onClose={()=>setLoginScreenOpen(false)}/>
          
        </AppBar>
      </Box>
    )
}

function rows(content){
  return (
    <Grid container item>
        <Grid item xs={2}/>
        <Grid item xs={8}>
          {content}
        </Grid>
        <Grid item xs={2}/>
      </Grid>
  )
}

function Project(props){
  return (
    <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" style={{textAlign:'center'}} component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" style={{textAlign:'center'}} color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent:'center'}}>
          {props.link && <Button size="small" href={props.link}>visit</Button>}
          
          {props.github && <IconButton href={props.github}><GitHub/></IconButton>}
        </CardActions>
    </Card>
  )
}

export default function Home() {
  var [projects, setProjects] = useState(ProjectData)
  return (
    <Grid container>
      <Grid container item height='30px'/>
      {rows(<HomeCard/>)}
      <Grid container item spacing='10px' padding={4}>
            
            {projects.map((project, index) => {
              return (
                <Grid key={index} item xs={4}>
                  <Project 
                    key={index} 
                    title={project.title} 
                    description={project.description} 
                    link={project.link} 
                    github={project.github}
                  />
                </Grid>
              )
            })}
      </Grid>
      
      
    </Grid>
  )
}
