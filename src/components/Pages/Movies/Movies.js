import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../../api-helpers/api-helpers';
import MovieItems from './MovieItems';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies().then((data) => setMovies(data.movies)).catch(err => console.log(err))
  }, []);

  return (

    <Box margin={"auto"} marginTop={4}>
      <Typography margin={"auto"} variant='h4' padding={3} width={"auto"} bgcolor={"red"} color={"white"} textAlign={'center'}>
        All Movies
      </Typography>
      <Box margin={"auto"} display='flex' width="auto" justifyContent={'center'} alignItems={"center"} flexWrap='wrap' gap={1} marginTop={6}>
      {movies && movies.map((movie, index) =>
      (<MovieItems 
      id={movie._id} 
      title={movie.title} 
      posterUrl={movie.posterUrl} 
      releaseDate={movie.releaseDate} 
      key={index} />))}
    </Box>
    </Box>
    
    
  )
}

export default Movies
