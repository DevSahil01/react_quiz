import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuiz } from '../actions/quizActions';
import { Button, Dialog, DialogTitle, List, ListItem, ListItemText, Typography, TextField, Container, Paper } from '@mui/material';
import QuestionForm from './QuestionForm';
import { useNavigate } from 'react-router-dom';

const QuizForm = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [title, setTitle] = useState('');
  const [desc,setDesc]=useState('')
  const [questions, setQuestions] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleCreateQuiz = () => {
    const quiz = {
      title,
      desc,
      questions,
      status:"active",
      timestamp: new Date().toString(),
    };
    dispatch(addQuiz(quiz)); 
    storeMyQuizes(quiz)
    setTitle('');
    setQuestions([]);
    navigate('/')
  };


  //Function to store quiz in localstorage
  const storeMyQuizes=(quiz)=>{
     if(localStorage.myquizes==null){
         localStorage.setItem("myquizes",JSON.stringify([quiz]))
     }
     else{
         const quizes=JSON.parse(localStorage.getItem("myquizes"))
         quizes.push(quiz)
         localStorage.setItem("myquizes",JSON.stringify(quizes))
     }
  }
 


  const [open, setopen] = useState(true);
  const handelclose = () => {
    setopen(false);
  }

  return (
    <>
    <Container component={Paper}>
      <Dialog open={open} >
        <DialogTitle sx={{ mb: 2 }}>Select Question Type</DialogTitle>
        <List>
          <ListItem disablePadding style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' color='primary' onClick={handelclose} style={{ textTransform: 'none' }}>
              <ListItemText>
                MCQ(single correct)
              </ListItemText>
            </Button>
          </ListItem>
        </List>
      </Dialog>
      <Typography sx={{ mt: 7, fontWeight: 700, fontSize: 30 }}>Create New Quiz</Typography>
      <TextField variant='outlined' placeholder='Title' style={{width:"100%"}} value={title} onChange={handleTitleChange} sx={{mb:5}} />
      <TextField variant='outlined' placeholder='Enter Description' style={{width:"100%"}} value={desc} onChange={(e)=>setDesc(e.target.value)} multiline/>
      {/* Question Form component */}
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <Button onClick={handleCreateQuiz}>Create Quiz</Button>
      </Container>
    </>
  );
};

export default QuizForm;
