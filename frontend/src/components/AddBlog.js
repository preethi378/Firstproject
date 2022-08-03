import { InputLabel, TextField, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const labelStyles= {mb:1,mt:2,fontSize:'24px', fontWeight: 'blod'}
const AddBlog = () => {
  const navigate = useNavigate();
   const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
   });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));   
  };
  const sendRequest= async () =>{
    const res = await axios.post("http://localhost:5000/api/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.imageURL,
      user: localStorage.getItem("userId")
      
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"))
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(52,9,121,1) 35%, rgba(0,212,255,1) 100%)" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={"auto"} marginTop={3} display='flex' flexDirection={'column'} width={"80%"}>
          <Typography fontWeight={'blod'} padding={3} color="grey" variant="h2" textAlign={'center'}>Post your Blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField  name="title" onchange={handleChange} value={ inputs.title} margin='auto' variant="outlined"/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name="description" onchange={handleChange} value={ inputs.description} margin='auto' variant="outlined"/>
          <InputLabel sx={labelStyles}>imageURL</InputLabel>
          <TextField  name="imageURL" onchange={handleChange} value={ inputs.imageURL} margin='auto' variant="outlined"/>
          <Button sx={{mt:2, borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
        </Box>
      </form>
    
    </div>
  )
}

export default AddBlog;