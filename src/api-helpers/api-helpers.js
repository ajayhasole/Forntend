import axios from 'axios';


export const getAllMovies = async()=>{
    const response = await axios.get("/movie").catch(err=>console.log(err));

    if (response.status!==200){
        return console.log("No data available "); 
    }

    const data = await response.data;
    return data;
};

export const sendUserAuthRequest = async(data,signup) =>{
    const response = await axios.post(`/user/${signup ? "signup" : "login"}`,{
        name: signup? data.name :  "",
        email: data.email,
        password: data.password
    }
     ).catch(err=>console.log(err));


     if(response.status!==200 && response.status!==201){
        console.log("Unexpected Error Occurred");
     }

     const resData = await response.data;
     return resData;
}


export const sendAdminAuthRequest = async(data) =>{
   const response = await axios.post("/admin/login",{
        email: data.email,
        password: data.password
    }).catch((error)=>console.log(error));


    if(response.status!==200){
        console.log("Unexpected Error Occurred");
     }
     const resData = await response.data;
     return resData;
}


export const getMovieDetails = async(id)=>{
    const response = await axios.get(`/movie/${id}`).catch((err)=>console.log(err));

    if(response.status!==200){return console.log("movie not found");}
    const resData = await response.data;
    
    return resData;
}


export const newBooking = async(data) =>{
    const response = await axios.post('/booking',{
        movie: data.movie,
        seatNumber : data.seatNumber,
        date: data.date,
        user: localStorage.getItem("userId")
    }).catch((err)=>console.log(err));

    if(response.status!==200 ){
        return console.log("unexpected error");
    }
    const resData = await response.data;
    return resData;
}

export const getUserBooking = async() =>{
    const id = localStorage.getItem("userId");
    const response = await axios.get(`/user/bookings/${id}`)
    .catch((err)=>console.log(err));

    if(response.status!==200 ){
        return console.log("unexpected error");
    }
    const resData = await response.data;
    return resData;
}

export const deleteBooking = async(id) => {
    const response = axios.delete(`/booking/${id}`).catch((err)=>{console.log(err)})

    if(response.status!==200 ){
        return console.log("unexpected error");
    }
    const resData = await response.data;
    return resData;
}


export const getUserDetails = async() => {
    const id = localStorage.getItem("userId");
    const response = await axios.get(`/user/${id}`).catch((err)=>{console.log(err)})

    if(response.status!==200 ){
        return console.log("unexpected error");
    }
    const resData = await response.data;
    return resData;
}

export const addMovie = async(data) => {
    const response = await axios.post("/movie",{
        title       : data.title,
        description : data.description,
        releaseDate : data.releaseDate,
        posterUrl   : data.posterUrl,
        featured    : data.featured,
        actors      : data.actors,
        admin       : localStorage.getItem("adminId"),
    },{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).catch((err)=>console.log(err));
    console.log(response)

    if(response.status!==201 ){
        return console.log("unexpected error");
    }
    const resData = await response.data;
    return resData;
}

export const getAdminById = async() => {
    const id = localStorage.getItem("adminId");
    const response = await axios.get(`/admin/${id}`).catch((error)=>{console.log(error)});

    if(response.status!==200){
        return console.log("unexpected error");
    }
    const resData = await response.data;
    return resData;
}