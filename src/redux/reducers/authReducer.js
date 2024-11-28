import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
};



//Reducer para manejar el estado de autenticación.
const authReducer = (state = initialState, action) => {
   console.log("Acción recibida:", action);
   console.log("Estado actual:", state);

  switch (action.type) {
    
    case LOGIN_SUCCESS:
      return { ...state,
         user: action.payload, 
         error: null,
         isAuthenticated: true, };
    case LOGIN_FAILURE:
      console.log("Error en login:", action.payload);
      return { ...state,
          user: null,
          error: action.payload,
          isAuthenticated: false,
        };
    default:
      return state;
  }
};

export default authReducer;