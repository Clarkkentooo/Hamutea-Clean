import { createBrowserRouter } from "react-router-dom";

//context
import { ClientProvider } from "@context/ClientContext";

//layouts
import AdminLayout from "@components/layouts/AdminLayout";
import ClientLayout from "@components/layouts/ClientLayout";
import AuthLayout from "@components/layouts/AuthLayout";

//auth
import SignUp from "@pages/auth/SignUp";
import SignIn from "@pages/auth/SignIn";

//admin
import Dashboard from "@pages/admin/Dashboard";
import ProductList from "@pages/admin/ProductList";
import ProductForm from "@pages/admin/ProductForm";
import OrderList from "@pages/admin/OrderList";
import OrderDetail from "@pages/admin/OrderDetail";
import UserList from "@pages/admin/UserList";
import TransactionList from "@pages/admin/TransactionList";
import TransactionDetail from "@pages/admin/TransactionDetail";

//client
import Account from "@pages/client/Account";
import Menu from "@pages/client/Menu";
import Rewards from "@pages/client/Rewards";

// Protected Route
import ProtectedRoute from "@components/common/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "*",
        element: <div>404</div>,
    },

    //auth
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "",
                element: <SignIn />,
            },
            {
                path: "sign-up",
                element: <SignUp />,
            }
        ]
    },

    //admin
    {
        path: "/admin",
        element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "products",
                element: <ProductList />,
            },
            {
                path: "products/new",
                element: <ProductForm />,
            },
            {
                path: "products/edit/:id",
                element: <ProductForm />,
            },
            {
                path: "orders",
                element: <OrderList />,
            },
            {
                path: "orders/:id",
                element: <OrderDetail />,
            },
            {
                path: "users",
                element: <UserList />,
            },
            {
                path: "transactions",
                element: <TransactionList />,
            },
            {
                path: "transactions/:id",
                element: <TransactionDetail />,
            },
        ],
    },

    //client
    {
        path: "/",
        element: (
            <ClientProvider>
                <ClientLayout />
            </ClientProvider>
        ),
        children: [
            {
                path: "account",
                element: <Account />,
            },
            {
                path: "menu",
                element: <Menu />,
            },
            {
                path: "rewards",
                element: <Rewards />,
            }
        ]
    }
]);

export default router;