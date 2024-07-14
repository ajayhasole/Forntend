import { Header } from "./components/Header";

import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Pages/Homepage";
import Movies from "./components/Pages/Movies/Movies";
import Admin from "./components/Pages/Admin/Admin";
import Auth from "./components/Pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store/store";
import Booking from "./components/Bookings/Booking.js";
import UserProfile from "./Profile/UserProfile.js";
import AddMovie from "./components/Pages/Movies/AddMovie.js";
import AdminProfile from "./Profile/AdminProfile.js";









function App() {
  const dispatch = useDispatch();

  const isAdminLoggedIn = useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  console.log("isAdminLogged", isAdminLoggedIn);
  console.log("isUserLogged", isUserLoggedIn);
  

useEffect(()=>{
  if (localStorage.getItem("userId")) {
    dispatch(userActions.login())  
  } else if (localStorage.getItem("adminId")) {
    dispatch(adminActions.login())
  }
});


    return (
    <div>
<Header/>

<section>
  <Routes>
    <Route path="/" element={<Homepage/>} />
    <Route path="/movies" element={<Movies/>} />
    <Route path="/admin" element={<Admin/>} />
    <Route path="/auth" element={<Auth/>} />
    <Route path="/user" element={<UserProfile/>} />
    <Route path="/booking/:id" element={<Booking/>} />
    <Route path="/add" element={<AddMovie/>} />
    <Route path="/user-admin/" element={<AdminProfile/>} />
    

  </Routes>
</section>



    </div>
    
    
  );
}

export default App;
