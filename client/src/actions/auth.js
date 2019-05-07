import axios from "axios";

import { FETCH_USER, GET_AUTH_TOKEN, UPDATE_USER } from "./types";


export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const get_auth_token = () => async dispatch => {
  const res = await axios.get("/api/auth_token");

  dispatch({ type: GET_AUTH_TOKEN, payload: res.data });
};

export const update_user =(value) => async dispatch =>{

   const res = await axios.post("/auth/updateUser",value);
    dispatch({type: UPDATE_USER, payload: res.data})
}
