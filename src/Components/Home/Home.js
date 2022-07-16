import { AccountCircle, GitHub, MenuBook, MenuOpen, MenuOutlined } from '@mui/icons-material';
import { AppBar, Box, Button, Card, CardActions, CardContent, Grid, IconButton, Menu, Paper, Snackbar, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ProjectData } from '../../Data/projects.js'
import UserContext from '../../Contexts/UserContext';
import Login from '../Login/Login';
import HomeCard from './HomeCard';





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
    <Card sx={{ minWidth: 100, border:1,backgroundColor:'blue.100' }} elevation={0}>
        <CardContent>
          <Typography variant="h5" style={{textAlign:'center'}} component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" style={{textAlign:'center'}} color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent:'center'}}>
          {props.link && <Button size="small" href={props.link} >visit</Button>}
          
          {props.github && <IconButton href={props.github} target="_blank"><GitHub/></IconButton>}
        </CardActions>
    </Card>
  )
}

export default function Home() {
  var [projects, setProjects] = useState(ProjectData)
  return (
    <Paper elevation={0}>
      <Grid container>
        {rows(<HomeCard/>)}
        <Grid container item spacing='10px' padding={4}>
              
              {projects.map((project, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={4}>
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
    </Paper>
  )
}
