import React from 'react';
import { Paper, TextField, IconButton, Checkbox, Box, FormControlLabel } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const OptionForm = ({
  index,
  option,
  onOptionChange,
  onCheckboxChange,
  onRemoveOption,
}) => {
  //event that changes options value
  const handleOptionChange = (e) => {
    onOptionChange(index, e.target.value);
  };

  //on change correct answer
  const handleCheckboxChange = () => {
    onCheckboxChange(option.id);
  };

  //on remove option
  const handleRemoveOption = () => {
    onRemoveOption(option.id);
  };

  return (
    <>
      <Paper style={{ marginTop: '1.5%' }}>
        <TextField style={{width:"100%"}} variant='filled'  value={option.text} onChange={handleOptionChange} ></TextField>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <FormControlLabel style={{ color: 'green' }} control={<Checkbox checked={option.isCorrect} onChange={handleCheckboxChange} style={{ color: 'green' }} aria-label='Correct'></Checkbox>} label="Correct" />
          <IconButton style={{ color: 'red' }} onClick={handleRemoveOption}><DeleteOutlineIcon /></IconButton>
        </Box>
      </Paper>
    
    </>
  );
};

export default OptionForm;
