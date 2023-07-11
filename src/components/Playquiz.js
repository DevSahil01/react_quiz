import { Container, TextField,TableCell,TableContainer,Paper,TableBody,Table,TableHead,TableRow, Button,Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Playquiz(props) {
  const [activeQuizes,setactivequizes]=useState([])
  const [name,setname]=useState("")
  const navigate=useNavigate()
  const setQuizesFunc=()=>{
    let getquizes=JSON.parse(localStorage.getItem('myquizes'))
    if(getquizes!=null){
        getquizes=JSON.parse(localStorage.getItem('myquizes')).filter((quiz)=>{
        return quiz.status==="active"})
        return getquizes
    }
    else{
      return []
    }
  }
   
   
  useEffect(()=>{
      setactivequizes(setQuizesFunc())
  },[])

  
  return (
    <>
  <Container maxWidth="md" >
       <TextField
    margin='dense'
    autoFocus
    label="Enter your Name to start Quiz"
    onChange={(e)=>setname(e.target.value)}
    style={{width:"100%"}}
    />
    <TableContainer sx={{display:"block",mt:10}} component={Paper}>
      <Table sx={{ minWidth: 650,backgroundColor:"white" }} aria-label="simple table"  >
        <TableHead>
          <TableRow>
            <TableCell >Quiz No</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Created at</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeQuizes.length!==0?
            activeQuizes.map((quiz,index)=>{
            index+=1
            return <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            key={index}
          >
            <TableCell component="th" scope="row">{index}</TableCell>
            <TableCell align="right">{quiz.title}</TableCell>
            <TableCell align="right">{quiz.timestamp.slice(0,15)}</TableCell>
            <TableCell align="right">
              <Button variant="contained" onClick={()=>{name!="" && navigate(`/${quiz.title}`)
              props.onPlay(name)}}>Play</Button>
            </TableCell>
          </TableRow>
          }):<TableRow><TableCell>don't have any quizes</TableCell></TableRow>}
            
        </TableBody>
      </Table>

    </TableContainer> 
  </Container>

  </>

  )
}
