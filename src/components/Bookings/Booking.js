import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

const Booking = () => {
    const [movie, setMovie] = useState();
    const [inputs, setInputs] = useState({seatNumber: "", date: "" });
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        getMovieDetails(id)
            .then((res) => setMovie(res.movie))
            .catch((err) => console.log(err));
    }, [id]);
    console.log(movie);


    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        newBooking({ ...inputs, movie: movie._id })
            .then((res) => { console.log(res) })
            .catch((err) => { console.log(err); })

    }
    return (
        <div>
            {movie && (
                <Fragment>
                    <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign="center">
                        Book Tickets for the Movie: {movie.title}
                    </Typography>
                    <Box display="flex" justifyContent="center">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                paddingTop: 3,
                                width: '50%',
                                marginRight: 2,
                            }}
                        >
                            <img
                                width="80%"
                                height="400px"
                                src={movie.posterUrl}
                                alt={movie.title}
                                style={{ margin: '0 auto' }}
                            />
                            <Box marginTop={3} padding={2} width={"75%"} marginLeft={"75px"}>
                                <Typography>{movie.description}</Typography>
                                <Typography fontWeight="bold" marginTop={1}>
                                    Actors/Actresses: {movie.actors}
                                </Typography>
                                <Typography fontWeight="bold" marginTop={1}>
                                    Release Date: {new Date(movie.releaseDate).toDateString()}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                paddingTop: 3,
                                width: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                marginLeft: 2,
                            }}
                        >
                            <form onSubmit={handleSubmit}>
                                <Box display="flex" flexDirection="column" marginRight={"150px"}>
                                    <FormLabel>Seat Number</FormLabel>
                                    <TextField
                                        name="seatNumber"
                                        type="number"
                                        margin="normal"
                                        variant="standard"
                                        value={inputs.seatNumber}
                                        onChange={handleChange}
                                    />
                                    <FormLabel>Booking Date</FormLabel>
                                    <TextField
                                        name="date"
                                        type="date"
                                        margin="normal"
                                        variant="standard"
                                        value={inputs.date}
                                        onChange={handleChange}
                                    />
                                    <Button
                                        type="submit"
                                        sx={{
                                            mt: 3,
                                            padding: '10px 20px',
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                                transform: 'scale(1.05)',
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Book now
                                    </Button>

                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Fragment>
            )}
        </div>
    );
};

export default Booking;
