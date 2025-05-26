import { createBrowserRouter } from "react-router-dom";

//context
import { ClientProvider } from "@context/ClientContext";
import { ProductProvider } from "@context/ProductContext";

//layouts
import AdminLayout from "@components/layouts/AdminLayout";
import ClientLayout from "@components/layouts/ClientLayout";
import AuthLayout from "@components/layouts/AuthLayout";
import CashierLayout from "@components/layouts/CashierLayout";

//auth
import SignUp from "@pages/auth/SignUp";
import SignIn from "@pages/auth/SignIn";

//admin
import Dashboard from "@pages/admin/Dashboard";
import Analytics from "@pages/admin/Analytics";
import ProductList from "@pages/admin/ProductList";
import ProductForm from "@pages/admin/ProductForm";
import OrderList from "@pages/admin/OrderList";
import OrderDetail from "@pages/admin/OrderDetail";
import UserList from "@pages/admin/UserList";
import TransactionList from "@pages/admin/TransactionList";
import TransactionDetail from "@pages/admin/TransactionDetail";
import Orders from "@pages/admin/Orders";
import Transactions from "@pages/admin/Transactions";
import AdminMenu from "@pages/admin/Menu";

//client
import Account from "@pages/client/Account";
import Menu from "@pages/client/Menu";
import Rewards from "@pages/client/Rewards";
import ContactUs from "@pages/client/ContactUs";
import Processing from "@pages/client/Processing";
import FranchiseApplication from "@pages/client/FranchiseApplication";

// Using shared components for both admin and cashier

// Protected Route
import ProtectedRoute from "@components/common/ProtectedRoute";
import CashierProtectedRoute from "@components/common/CashierProtectedRoute";

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
        element: <ProtectedRoute><ProductProvider><AdminLayout /></ProductProvider></ProtectedRoute>,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "analytics",
                element: <Analytics />,
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
            {
                path: "orders-new",
                element: <Orders />,
            },
            {
                path: "transactions-new",
                element: <Transactions />,
            },
            {
                path: "menu-new",
                element: <AdminMenu />,
            },
        ],
    },

    //cashier
    {
        path: "/cashier",
        element: <CashierProtectedRoute><CashierLayout /></CashierProtectedRoute>,
        children: [
            {
                path: "orders",
                element: <OrderList />,
            },
            {
                path: "orders/:id",
                element: <OrderDetail />,
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
            },
            {
                path: "contact",
                element: <ContactUs />,
            },
            {
                path: "processing",
                element: <Processing />,
            },
            {
                path: "franchise",
                element: <FranchiseApplication />,
            }
        ]
    }
]);

export default router;