import { Button, Dialog, DialogTitle, List, ListItem,  ListItemText} from '@mui/material'
import React, { useState } from 'react'
import QuizForm from './QuizForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/quizReducer';
export default function CreateNewQuiz() {
    const [open,setopen]=useState(true);
    const handelclose=()=>{
        setopen(false);
    }
    const store = configureStore({
      reducer: rootReducer,
    });

  const [questions, setQuestions] = useState([]);

  //after clicking add question
  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };
  return (
    <>
    <Dialog open={open} >
    <DialogTitle sx={{mb:2}}>Select Question Type</DialogTitle>
    <List>
    <ListItem disablePadding style={{display:'flex',justifyContent:'center'}}>
        <Button variant='contained' color='primary' onClick={handelclose} style={{textTransform:'none'}}>
        <ListItemText>
            MCQ(single correct)
        </ListItemText>
        </Button>
    </ListItem>
    </List>
    </Dialog>

             <Provider store={store}>
             <QuizForm />
             </Provider>
      
      {questions.map((question, index) =>{
        const {title,que,options}=question
         (<div key={index}>
          <h3>{title}</h3>
          <h3>{que}</h3>
          <ul>
            {options.map((option, optionIndex) => (
              <li key={optionIndex}>
                {option.text} - {option.isCorrect ? 'Correct' : 'Incorrect'}
              </li>
            ))}
          </ul>
        </div>)
})}
          
    </>
  )
}
