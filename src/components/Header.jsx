import { AppBar, Autocomplete, Box, Tab, Tabs, TextField, Toolbar } from '@mui/material';
import { ReactComponent as CustomIcon } from './cinema.svg';
import { useEffect, useState } from 'react';
import { getAllMovies } from '../api-helpers/api-helpers.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store/store.js';

export function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [value, setValue] = useState(0);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((error) => console.log(error));
    }, []);

    const logOut = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    };

    const handleMovieSelect = (event, value) => {
        if (value) {
            const selectedMovie = movies.find(movie => movie.title === value);
            if (selectedMovie) {
                navigate(`/booking/${selectedMovie._id}`); 
            }
        }
    };

    return (
        <AppBar position='sticky' sx={{ bgcolor: 'black' }}>
            <Toolbar variant='dense'>
                <Link to="/" width={"20%"}>
                    <CustomIcon style={{ width: '50px', height: '35px', cursor: 'pointer' }} />
                </Link>

                <Box width={"30%"} margin='auto' height='35px'>
                    <Autocomplete
                        options={movies && movies.map((option) => option.title)}
                        onChange={handleMovieSelect}
                        renderInput={(params) => (
                            <TextField
                                sx={{ input: { color: "white" } }}
                                variant='standard'
                                {...params}
                                placeholder="Search a movie"
                            />
                        )}
                    />
                </Box>

                <Box display={'flex'}>
                    <Tabs
                        textColor='inherit'
                        indicatorColor='secondary'
                        value={value}
                        onChange={(e, val) => { setValue(val); }}>
                        <Tab LinkComponent={Link} to='/movies' label="All Movies" />
                        {!isAdminLoggedIn && !isUserLoggedIn && <>
                            <Tab LinkComponent={Link} to='/admin' label="Admin" />
                            <Tab LinkComponent={Link} to='/auth' label="Auth" />
                        </>}
                        {isUserLoggedIn && <>
                            <Tab LinkComponent={Link} to='/user' label="Profile" />
                            <Tab onClick={() => logOut(false)} LinkComponent={Link} to='/' label="Logout" />
                        </>}
                        {isAdminLoggedIn && <>
                            <Tab LinkComponent={Link} to='/add' label="Add a Movie" />
                            <Tab LinkComponent={Link} to='/user-admin' label="Profile" />
                            <Tab onClick={() => logOut(true)} LinkComponent={Link} to='/' label="Logout" />
                        </>}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    );
}