import { GitHub } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import './home.css'
import { ProjectData } from '../../Data/projects.js'



function HomeCard(props) {
    return (
      <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" textAlign='center' component="div">
              Welcome to Kadblue!
            </Typography>
          </CardContent>
      </Card>
    )
}

function rows(content){
  return (
    <Grid container item>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          {content}
        </Grid>
        <Grid item xs={3}/>
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
    <Grid container rowSpacing='10px'>
      <Grid container item height='50px'/>
      {rows(<HomeCard/>)}
      <Grid container item spacing='10px' margin='10px'>
            
            {projects.map((project, index) => {
              return (
                <Grid key={index} item xs={6}>
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
