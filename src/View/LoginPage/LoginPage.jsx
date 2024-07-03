import React, {useEffect, useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {Container} from "@mui/system";
import axios from "axios";
import {user} from "../../utils/Server.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../Redux/Reducers/loginReducer.js";

function LoginPage() {
    const dispatch = useDispatch();
    const logUser = useSelector(state => state.login);
    const navigate = useNavigate();

    const [userData,setUserData] = useState({
        email:'',
        password:''
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUserData((preData) => ({
            ...preData,
            [name]: value,
        }))
    }
    function loginUser() {
        axios.post(`${user}/login`, userData).then((r) => {
            if (r.status === 201) {
                console.log(r.data)
                dispatch(login());
                localStorage.setItem("isAuthenticated", logUser.isAuthenticated);
                localStorage.setItem("token", r.data.Token);
                navigate("/");
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated){
            navigate("/");
        }
    }, [navigate]);

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
                Login
            </Typography>
            <Box paddingY={5} marginY={4} alignContent="center" align="center">
                <Stack gap={2} width={500} alignItems="center">
                <TextField name="email" label="E-mail" variant="outlined" type="email" fullWidth onChange={handleChange}/>
                <TextField name="password" label="password" variant="outlined" type="password" fullWidth onChange={handleChange}/>
                    <Button variant="contained" onClick={loginUser}>Login</Button>
                </Stack>
            </Box>
        </Container>
    );
}

export default LoginPage;