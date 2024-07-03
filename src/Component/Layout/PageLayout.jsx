import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";

function PageLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default PageLayout;