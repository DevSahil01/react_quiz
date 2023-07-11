import React, { useState } from 'react';
import OptionForm from './OptionForm';
import { Button, Box, TextField, Card} from '@mui/material'



const QuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ text: '', isCorrect: false }]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (optionId, value) => {
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, text: value };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const handleCheckboxChange = (optionId) => {
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, isCorrect: true };
      }
      return { ...option, isCorrect: false };
    });
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (optionId) => {
    const updatedOptions = options.filter((option) => option.id !== optionId);
    setOptions(updatedOptions);
  };

  const addOption = () => {
    const newOptionId = options.length + 1;
    const newOption = { id: newOptionId, text: '', isCorrect: false };
    setOptions([...options, newOption]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      options,
    };
    onAddQuestion(newQuestion);
    setQuestion('');
    setOptions([{ text: '', isCorrect: false }]);
  };




  
  return (
    <>
    <form>
      <Card sx={{ mt: 2, mx: '3%', p: 3, textAlign: 'center' }}>
        <TextField variant='outlined' placeholder='Question' value={question} onChange={handleQuestionChange} sx={{ mt: '2%' }} style={{width:"100%"}}></TextField>
        <Box sx={{ display: 'grid', mt: '2%', gridTemplateColumns: { md: 'auto 20%', sm: 'auto 50%' } }} >
          <Box sx={{ display: 'grid', mt: '2%', gridTemplateColumns: { lg: 'auto auto', sm: 'auto 50%' }, gap: '2%' }}>
            {options.map((option, index) => (
              <OptionForm
                key={index}
                option={option}
                onOptionChange={(id, value) => {
                  handleOptionChange(option.id, value)
                }}
                onCheckboxChange={handleCheckboxChange}
                onRemoveOption={handleRemoveOption}
              />
            ))}
          </Box>
          <Button type="button" onClick={addOption} sx={{ height: 50, alignSelf: 'start', mt: '10%' }}>Add Option</Button>
        </Box>
        <Button variant='outlined' onClick={handleSubmit} sx={{ textAlign: 'center', mt: '2%', mx: 'auto' }}>Add Question</Button>
      </Card>
    </form>
    </>
  );
};

export default QuestionForm;
