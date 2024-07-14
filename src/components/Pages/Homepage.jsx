import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material';
import MovieItems from './Movies/MovieItems.js';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../../api-helpers/api-helpers.js';

const Homepage = () => {

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies().then((data) => setMovies(data.movies)).catch(err => console.log(err))
  }, []);

  return <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
    <Box margin={"auto"} width="80%" height={"60vh"} padding={2} border={"1px solid red"}>
      <img src="https://images.hdqwalls.com/wallpapers/deadpool-and-wolverine-unstoppable-heroes-rs.jpg" alt="Deadpool 3: Wolverine"
        width={"100%"} height={"100%"} />
    </Box>

    <Box padding={5} margin={"auto"} >
      <Typography variant='h4' textAlign={'center'}>New Releases</Typography>
    </Box>

    <Box margin={"auto"} display='flex' width="80%" justifyContent={'center'} alignItems={"center"} flexWrap='wrap' gap={1}>
      {movies && movies.slice(0,4).map((movie, index) => (<MovieItems id={movie.id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index} />))}
    </Box>
    <Box display={'flex'} padding={5} margin={"auto"}>
      <Button LinkComponent={Link} to="/movies" variant='outlined' sx={{ margin: "auto", color: '#2b2d42' }}>
        View All Movies
      </Button>
    </Box>

  </Box>

}

export default Homepage
