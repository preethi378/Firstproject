import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/system'
import IconButton from'@mui/material/IconButton';
import { red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Blog = ({title,description, imageURL, userName,isUser,id}) => {
    const navigate = useNavigate();
    const handleEdit = (e) => {
        navigate(`/myBlogs/${id}`)
    }
   // console.log(title, isUser);
    const deleteRequest = async () => {
        const res = await axios.delete(`http://localhost:5000/api/blog/${id}`)
            .catch(err => console.log(err))
        const data = await res.data;
        return data;
    }

    const handleDelete = (e) => {
        deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"));
        
    };
    return (
        <div>
            { " "}
            <Card sx={{
                Width: "40%", margin: 'auto', mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc ",
                ":hover:": {
                boxShadow : "10px 10px 20px #ccc ",
                },
            }}
            >
                {isUser && (
                    <Box display="flex">
                        <IconButton onClick={ handleEdit} sx={{ marginLeft: 'auto' }}>
                            <ModeEditOutlineIcon  color="warning" />
                        </IconButton>
                        <IconButton onClick={ handleDelete}>
                            <DeleteForeverIcon color="error"/>
                        </IconButton>
                        </Box>
                )}
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {userName}
                                    </Avatar>
                                }
       
                                title={title}
                                subheader="September 14, 2016"
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={imageURL}
                                //image="/static/images/cards/paella.jpg"
                                alt="Paella dish"
                            />
                
                <CardContent>
                <hr />
                <br />
                                <Typography variant="body2" color="text.secondary">
                                    <b> {userName}</b> {":"} {description}
                                </Typography>
                            </CardContent>
    
                        </Card>
                    </div>
                )
                
};

export default Blog;