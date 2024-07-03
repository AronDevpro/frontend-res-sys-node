import React, {useState} from 'react';
import {Container} from "@mui/system";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import axios from "axios";
import {user} from "../../utils/Server.js";

function RegisterPage() {
    const [userData,setUserData] = useState({});

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUserData((preData) => ({
            ...preData,
            [name]: value,
        }))
    }
    function registerUser() {
        axios.post(`${user}/register`, userData).then((r) => {
            if (r.status === 201) {
                console.log(r.data)
            }
        }).catch((err) => {
            console.log(err.response.data);
        });
    }
    return (
        <Container>
            <Typography
                variant="h2"
                component="h2"
                align="center"
                sx={{
                    backgroundImage: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,111,1) 50%, rgba(0,212,255,1) 100%)`,
                    backgroundSize: "100%",
                    backgroundRepeat: "repeat",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                Register
            </Typography>
            <Box paddingY={5} marginY={4} alignContent="center" align="center">
                <Stack gap={2} width={500} alignItems="center">
                    <TextField name="name" label="Name" variant="outlined" type="text" fullWidth onChange={handleChange}/>
                    <TextField name="email" label="E-mail" variant="outlined" type="email" fullWidth onChange={handleChange}/>
                    <TextField name="password" label="password" variant="outlined" type="password" fullWidth onChange={handleChange}/>
                    <Button variant="contained" onClick={registerUser}>Register</Button>
                </Stack>
            </Box>
        </Container>
    );
}

export default RegisterPage;