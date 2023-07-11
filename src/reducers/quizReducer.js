const initialState = {
    quizzes: [],
  };
  
  const quizReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_QUIZ':
        return {
          ...state,
          quizzes: [...state.quizzes, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default quizReducer;
  