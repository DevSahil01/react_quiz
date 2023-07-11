import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Myquizes from './components/Myquizes';
import Playquiz from './components/Playquiz';
import CreateNewQuiz from './components/CreateNewQuiz';
import QuizQuestion from './components/QuizQuestion';
function App() {

  //Provide that name to navbar
  const [name,setName]=useState("")
  const getName=(name)=>{
    setName(name)
  }


  return (
    <>
    <Navbar name={name}/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/myquizes' element={<Myquizes/>}></Route>
      <Route path='/playquiz' element={<Playquiz onPlay={getName}/>}></Route>
      <Route path='/CreateNewQuiz' element={<CreateNewQuiz/>}></Route>
      <Route path=':quiz' element={<QuizQuestion onFinish={getName}  name={name}/>}></Route>
    </Routes>
    </>
  );
}

export default App;
