import React, { Fragment, useEffect, useState } from 'react'

import { deleteBooking, getUserBooking, getUserDetails } from '../api-helpers/api-helpers';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';


const UserProfile = () => {
    const [bookings, setBookings] = useState();
    const [user, setUser] = useState();




    useEffect(() => {
        getUserBooking()
            .then((res) => setBookings(res.bookings))
            .catch((err) => console.log("could not get the bookings", err))

        getUserDetails().then((res) => setUser(res.user)).catch((err)=>{console.log(err);})

    }, []);
    console.log(bookings);


    const handleDelete = (id) => {
        deleteBooking(id).then((res) => console.log(res)).catch((err) => console.log(err))
    }
    return (
        <Box width={"100%"} display={'flex'}>
        <Fragment>
        {user && (<Box
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            width={"30%"}>
            <AccountCircleRoundedIcon sx={{ fontSize: "10rem", ml: 19 }} />
            <Typography padding={1}
                width={'auto'}
                textAlign={'center'}
                border={"1px solid #ccc"}
                borderRadius={6}
                mb={2}>
                User: {user.name}
            </Typography>
            <Typography padding={1}
                width={'auto'}
                textAlign={'center'}
                border={"1px solid #ccc"}
                borderRadius={6}
                mb={2}>
                Email: {user.email}
            </Typography>
        </Box>
)}

        {bookings && (<Box
                width={"70%"}
                display={'flex'}
                flexDirection={'column'}>
                <Typography variant='h3'
                    fontFamily={'fantasy'}
                    textAlign={'center'}
                    padding={2}>
                    Bookings
                </Typography>
                <Box margin={'auto'}
                    display={'flex'}
                    flexDirection={"column"}
                    width={"80%"}
                >
                    <List>
                        {bookings.map((booking, index) => (
                            <ListItem sx={{ bgcolor: "#35ab52", color: 'white', textAlign: 'center', margin: 1 }}>
                                <ListItemText sx={{ margin: 1, width: 'auto', textAlign: "left" }}>
                                    Movie: {booking.movie.title}
                                </ListItemText>
                                <ListItemText sx={{ margin: 1, width: 'auto', textAlign: "left" }}>
                                    Seat Number: {booking.seatNumber}
                                </ListItemText>
                                <ListItemText sx={{ margin: 1, width: 'auto', textAlign: "left" }}>
                                    Date: {new Date(booking.date).toDateString()}
                                </ListItemText>
                                <IconButton onClick={() => handleDelete(booking._id)} sx={{ color: "white" }}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>

                </Box>
            </Box>)}
        </Fragment>
        </Box >
    );
};

export default UserProfile
