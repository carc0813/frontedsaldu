import {loginUser} from '../../services/authService';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


export const loginUserAction = (email, password) => async (dispatch) => {
  try {
    const { token, user } = await loginUser(email, password); // Llama al servicio

    // Imprime la información del usuario descifrado en la consola
    console.log("Usuario Descifrado en Acción:", user);


    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });
    localStorage.setItem("token", token); // Almacena el token en localStorage
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
  }
};





