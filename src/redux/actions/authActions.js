import {loginUser} from '../../services/authService';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const  LOGOUT_SUCCESS='LOGOUT_SUCCESS'

export const loginUserAction = (email, password) => async (dispatch) => {
  try {
    // Llama al servicio para autenticar
    const { token, user, role } = await loginUser(email, password);

     // Almacena token y datos en localStorage
     localStorage.setItem("token", token);
     localStorage.setItem("user", JSON.stringify(user));
     localStorage.setItem("role", role);

    // Imprime el usuario descifrado en la consola (opcional)
    console.log("Usuario Descifrado en Acción:", user);

    // Actualiza el estado global
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user, role },
    });

   

  } catch (error) {
    // Manejo de error
    console.error("Error al iniciar sesión:", error);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
  }
};


export const logoutUserAction = () => (dispatch) => {
  console.log("Cerrando sesión...");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("products");
  console.log("Sesión cerrada exitosamente");
  dispatch({ type: LOGOUT_SUCCESS });
};
