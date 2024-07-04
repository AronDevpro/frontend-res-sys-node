import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../Component/Loading.jsx";

const PrivateRoute=({children})=> {
    const auth = localStorage.getItem("isAuthenticated");
    // const [isCheckingSession, setIsCheckingSession] = useState(true);
    //
    // useEffect(() => {
    //     // Simulating session check delay with setTimeout
    //     const delay = setTimeout(() => {
    //         setIsCheckingSession(false);
    //     }, 1000);
    //
    //     return () => clearTimeout(delay);
    // }, []);
    //
    // if (isCheckingSession) {
    //     // Render loading indicator while checking session
    //     return <Loading/>;
    // }
    return auth ? <Outlet/> : <Navigate to="/login"/>;
}

export default PrivateRoute;