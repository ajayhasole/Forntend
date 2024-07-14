import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


const MovieItems = ({ title, releaseDate, posterUrl, id }) => {
    return (
        <Card 
            sx={{ 
                margin: 2, 
                width: 250, 
                height: 600, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                borderRadius: 5, 
                ":hover": { boxShadow: "10px 10px 20px #ccc" } 
            }}
        >
            <img 
                height={"50%"} 
                width={"100%"} 
                src={posterUrl} 
                alt={title} 
                style={{ objectFit: 'fill', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="button" color="GrayText">
                    {new Date(releaseDate).toDateString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button LinkComponent={Link} to={`/booking/${id}`} sx={{ margin: "auto" }} size="small">Book Tickets</Button>
            </CardActions>
        </Card>
    );
};

export default MovieItems;
