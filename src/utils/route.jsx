import { Navigate} from "react-router-dom";
import HomePage from "../View/HomePage/HomePage.jsx";
import LoginPage from "../View/LoginPage/LoginPage.jsx";
import RegisterPage from "../View/RegisterPage/RegisterPage.jsx";
import CustomerPage from "../View/CustomerPage/CustomerPage.jsx";
import EmployeePage from "../View/EmployeePage/EmployeePage.jsx";
import MenuPage from "../View/MenuPage/MenuPage.jsx";
import OrderPage from "../View/OrderPage/OrderPage.jsx";
import SupplierPage from "../View/SupplierPage/SupplierPage.jsx";
import InventoryPage from "../View/InventoryPage/InventoryPage.jsx";
import ReservationPage from "../View/ReservationPage/ReservationPage.jsx";
import RestaurantPage from "../View/RestaurantPage/RestaurantPage.jsx";
import PageLayout from "../Component/Layout/PageLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const RouterBuilder = () => {
    const generalRoutes = [
        {
            path: '/home',
            element: <HomePage />,
        },

        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/register',
            element: <RegisterPage />,
        },
        {
            path: '*',
            element: <Navigate to="/login" replace />,
        },
    ];

    const protectedRoutes = [
        {
            path: '/',
            element: <CustomerPage />,
        },
        {
            path: '/employee',
            element: <EmployeePage />,
        },
        {
            path: '/menu',
            element: <MenuPage />,
        },
        {
            path: '/order',
            element: <OrderPage />,
        },
        {
            path: '/supplier',
            element: <SupplierPage />,
        },
        {
            path: '/inventory',
            element: <InventoryPage />,
        },
        {
            path: '/reservation',
            element: <ReservationPage />,
        },
        {
            path: '/restaurant',
            element: <RestaurantPage />,
        },
    ];


    const routes = [
        {
            element: <PageLayout />,
            children: [
                ...generalRoutes,
                {
                    element: <PrivateRoute/>,
                    children: protectedRoutes
                }
            ]
        },
    ];
    return routes;
};

export default RouterBuilder;
