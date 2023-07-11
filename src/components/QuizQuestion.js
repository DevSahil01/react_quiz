import { Container, Typography ,Button,Divider,Input,
Dialog,DialogContent,DialogActions,DialogContentText,DialogTitle
,Modal,Box} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import firework from '../assets/firework.png'
import Stack from '@mui/material/Stack'

const QuizQuestion = (props) => {
  const title=useParams()
  const navigate=useNavigate()
  const [quizQue,setquizQue]=useState([])
  //to check current question number
  const [currQue,setcurrentque]=useState(0)
  //answers is stored in this array
  const [ans,setans]=useState([''])
  //to check whether current question is attempt or not
  const [isAttempt,setIsAttempt]=useState(true)

  const [Dialogopen, setDialogOpen] = useState(false);
  const [Modalopen,setModalOpen]=useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:"fit-content",
    bgcolor: 'background.paper',
    borderRadius:"9px",
    boxShadow: 24,
    p: 4,
  };

  //it runs only one time while component is being rendered
  useEffect(()=>{
    if(localStorage.getItem('myquizes')!==null){
      const quiz=JSON.parse(localStorage.getItem('myquizes')).filter((quiz)=> quiz.title===title.quiz)
      setquizQue(quiz)
    }
  },[])

  //Get the test Score
  const getResult=()=>{
   let  score=0
   quizQue[0].questions.map((ques,i)=>{
        const options=ques.options.filter((opt)=>opt.isCorrect===true)
        if(ans[i]===options[0].text){
          score+=1
        }    
    })
    return score
  }

 
  //Check whether it is last question or not
  let isLastQue=quizQue.length!==0 && (currQue+1)!==quizQue[0].questions.length

  //Go to Next Question
  const handleNextQuestion=(currQue)=>{
    if((currQue+1)!==quizQue[0].questions.length){
        setcurrentque(currQue+1)
    }
    setIsAttempt(true)
  }

  //Set ans for current question
  const setchosenAns=(value)=>{
     const myarr=ans
     myarr[currQue]=value
     setans(myarr)
  }

  const handleFinish=()=>{
    handleClose()
    setModalOpen(true)
    getResult()
    props.onFinish("")
  }


  if(quizQue.length!==0){
    const {question,options}=quizQue[0].questions[currQue]
  return (
    <>
    <Container>
    <Typography variant='h5' my={2.5} textAlign={"center"}>{quizQue[0].title+" Quiz"}</Typography>
    <Divider variant="middle" />
    <Container maxWidth={'lg'} >
      <Typography variant='h6'>{currQue+1 +") "}{ question}</Typography>
    
      {options.map((opt,index)=>{
          return <Stack direction='row' spacing={5} my={4} sx={{backgroundColor:"#f7f7f7",height:"50px",width:"100%",borderRadius:"8px",alignItems:"center"}} key={index} >
            <Input type='radio' disableUnderline={true} name="options" value={opt.text} onClick={(e)=>{setchosenAns(e.target.value)
            setIsAttempt(false)}}  style={{width:"10%",height:"1.5em"}}  />
            <Typography variant='p' fontSize={'md'}>{opt.text}</Typography>
          </Stack>
         
      })}
     
    <Stack direction={"column"} spacing={5} width={"100%"}>
     <Typography variant='p'  color={"black"}>Question {currQue+1}/ {quizQue[0].questions.length}</Typography>
      <Button  type='submit' variant='contained' onClick={()=>handleNextQuestion(currQue)}
      sx={{display:isLastQue?"block":"none"}} disabled={isAttempt} >Next Question</Button>
      <Button variant="contained" sx={{display:isLastQue?"none":"block",width:"fit-content"}} onClick={handleClickOpen} value="submit">submit</Button>
    </Stack>
      </Container>
  </Container>

    {/* Dialog box to check user wants to submit the test */}
      <Dialog
            open={Dialogopen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Submit Test"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to sumbit the Test
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>handleClose()}>No</Button>
              <Button onClick={handleFinish} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

      {/* Modal To show the Test score */}
      <Modal
      open={Modalopen}
      onClose={()=>{setModalOpen(false)
       navigate('/playquiz')}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} textAlign={"center"}>
        <img src={firework} style={{height:"40px",width:"40px"}} />
        <Typography variant='h5' color={'#f39291'} fontSize={'1em'}>congratulations</Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          You scored {getResult()} out of {quizQue[0].questions.length}
        </Typography>
      </Box>
    </Modal>
   
  </>
    
    )}
}

export default QuizQuestion
