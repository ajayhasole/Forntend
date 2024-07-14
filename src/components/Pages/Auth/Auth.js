import React from 'react'
import AuthForm from './AuthForm.js'
import { sendUserAuthRequest } from '../../../api-helpers/api-helpers.js';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../store/store.js';

const Auth = () => {
  const dispatch = useDispatch();
  const getResponseReceived = (data) =>{
    console.log(data);
    dispatch(userActions.login());  
    localStorage.setItem("userId", data.userId)
  }
  const getData = (data) => {
    console.log("Auth", data);
    sendUserAuthRequest(data.inputs, data.signup)
    .then(getResponseReceived)
    .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  )
}

export default Auth;
