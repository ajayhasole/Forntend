import React, { Fragment, useEffect, useState } from 'react';
import { getAdminById } from '../api-helpers/api-helpers';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        getAdminById()
            .then((res) => setAdmin(res.admin))
            .catch((err) => { console.log(err); });
    }, []);

  return (
    <Box width={"100%"} display={'flex'} justifyContent={'center'}>
            <Fragment>
                {admin && (
                    <Box
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={"30%"}
                        display={'flex'}
                    >
                        <AccountCircleRoundedIcon sx={{ fontSize: "10rem", ml: 19 }} />
                        <Typography
                            padding={1}
                            width={'auto'}
                            textAlign={'center'}
                            border={"1px solid #ccc"}
                            borderRadius={6}
                            mb={2}
                        >
                            Email: {admin.email}
                        </Typography>
                    </Box>
                )}

                {admin && admin.addedMovies.length > 0 && (
                    <Box
                        width={"70%"}
                        display={'flex'}
                        flexDirection={'column'}
                    >
                        <Typography
                            variant='h3'
                            fontFamily={'fantasy'}
                            textAlign={'center'}
                            padding={2}
                        >
                            Added Movies
                        </Typography>
                        <Box
                            margin={'auto'}
                            display={'flex'}
                            flexDirection={"column"}
                            width={"80%"}
                        >
                            <List>
                                {admin.addedMovies.map((movie, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{ bgcolor: "#35ab52", color: 'white', textAlign: 'center', margin: 1 }}
                                    >
                                        <ListItemText
                                            sx={{ margin: 1, width: 'auto', textAlign: "left" }}
                                        >
                                            Movie: {movie.title}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                )}
            </Fragment>
        </Box>
  )
}

export default AdminProfile
