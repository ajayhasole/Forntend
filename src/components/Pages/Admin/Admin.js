import React from 'react'
import AuthForm from '../Auth/AuthForm.js'
import { sendAdminAuthRequest } from '../../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../../store/store.js';

const Admin = () => {
  const dispatch = useDispatch();
  const getResponseReceived = (data) =>{
    console.log(data);
    dispatch(adminActions.login());  
    localStorage.setItem("adminId", data.id)
    localStorage.setItem("token", data.token)
  }
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
    .then(getResponseReceived)
    .catch((err) => console.error(err));
  }
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />

    </div>
  )
}

export default Admin
