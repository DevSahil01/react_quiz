import React, { useEffect, useState } from 'react'
import { Container,Button,Typography,TableContainer,Table,TableHead,TableRow,TableCell,TableBody, Switch,
Dialog,DialogActions,DialogContent,DialogTitle,TextField
,FormControl} from '@mui/material'
import {Paper} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';



export default function Myquizes() {
  const [open, setOpen] = React.useState(false);
  const [editQuizIndex,seteditQuizIndex]=useState(null);
  const [formdata,setformdata]=useState([])

  const handleClickOpen = (index) => {
    setOpen(true);
    seteditQuizIndex(index)
    setformdata(myquizes)
  };

  const handleClose = () => {
    setOpen(false);
  };

  
   const [myquizes,setmyquizes]=useState([])

   //set my myquizes array after loading page
   useEffect(()=>{
    if(localStorage.getItem("myquizes")!==null){
     setmyquizes(JSON.parse(localStorage.getItem('myquizes')))
    }
   },[])

  //change status of quiz
  const inActiveQuiz=(index)=>{
      setmyquizes(currentStatus=>{
        const newState=currentStatus.map((quiz,i)=>{
            if(i===index){
              return quiz.status!=="Inactive"?{...quiz,status:"Inactive"}:{...quiz,status:"active"}
            }
            else{
              return quiz
            }
        })
       
        return newState
      })

      const storedstatus=JSON.parse(localStorage.getItem("myquizes"))
      storedstatus[index].status!=="Inactive"?storedstatus[index].status="Inactive":storedstatus[index].status="active"
      localStorage.setItem("myquizes",JSON.stringify(storedstatus))
  }


  //Remove quiz that is in myquiz array and also in localstorage
  const removeQuiz=(index)=>{
      const currentQuiz=JSON.parse(localStorage.getItem("myquizes"))
      currentQuiz.splice(index,1)
      localStorage.setItem("myquizes",JSON.stringify(currentQuiz))

      setmyquizes(quizes=>{
        return quizes.filter((_,i)=> i!== index)
      })
  }

  //update data 
   const handlechange=(e)=>{
       setformdata(currformdata=>{
         const updateData= currformdata.map((data,i)=>{
             if(i===editQuizIndex){
                return {...data,[e.target.name]:e.target.value}
             }
             else {
                return data
             }
          })
        return updateData
       })
   }

   //updated data is stored in localstorage
   const handleEdit=()=>{
     setmyquizes(formdata)
     localStorage.setItem("myquizes",JSON.stringify(formdata))
   }

  return (
    <>
    <Container maxWidth="filled"  sx={{backgroundColor:"#e7ebf0",height:"100vh"}}>
    <Typography variant='h4' sx={{fontFamily:"poppins"}}>My Quizes</Typography>
      <TableContainer sx={{display:"block"}} component={Paper}>
      <Table sx={{ minWidth: 650,backgroundColor:"white" }} aria-label="simple table"  >
        <TableHead>
          <TableRow>
            <TableCell >Quiz No</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">Created at</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myquizes.length!==0?
            myquizes.map((quiz,index)=>{
            index+=1
            let isactive=quiz.status==="active"
            return <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            key={index}
          >
            <TableCell component="th" scope="row" >
              {index}
            </TableCell>
            <TableCell align="right">{quiz.title}</TableCell>
            <TableCell align="right">
              <Typography variant='p'>{quiz.status}</Typography>
              <Switch checked={isactive}
                onChange={()=>{inActiveQuiz(index-1)}}/>
            </TableCell>
            <TableCell align="right">{quiz.timestamp.slice(0,15)}</TableCell>
            <TableCell align="right">
              <DeleteOutlineIcon sx={{cursor:"pointer"}} onClick={()=>removeQuiz(index-1)}/>
              <EditIcon sx={{m:"10",cursor:"pointer"}} onClick={()=>handleClickOpen(index-1)}/>
            </TableCell>
          </TableRow>
          }):<TableRow><TableCell>don't have any quizes</TableCell></TableRow>}
            
        </TableBody>
      </Table>
    </TableContainer>

    {/* Dialog box when we click on Edit buttton */}
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit title or Description </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={formdata.length!==0&&formdata[editQuizIndex].title}
            margin="dense"  
            name="title"
            label="Title of Quiz"
            type="text"
            onChange={handlechange}
          />
          <TextField 
            autoFocus
            margin="dense"
            label="Description"
            name='desc'
            type="text"
            value={formdata.length!==0&&formdata[editQuizIndex].desc}
            onChange={handlechange} 
          multiline/>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{handleClose();
          handleEdit()}} >Edit </Button>
        </DialogActions>
      </Dialog>
       
      </Container>
      </>
  )
}
