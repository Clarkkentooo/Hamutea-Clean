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
import Orders from "@pages/admin/Orders";
import Transactions from "@pages/admin/Transactions";
import AdminMenu from "@pages/admin/Menu";

//client
import Account from "@pages/client/Account";
import Menu from "@pages/client/Menu";
import Rewards from "@pages/client/Rewards";
import Processing from "@pages/client/Processing";
import ContactUs from "@pages/client/ContactUs";

const router = createBrowserRouter([
    {
        path: "*",
        element: <div>404</div>,
    },

    //auth
    {
        path: "/auth",
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
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "orders",
                element: <Orders />,
            },
            {
                path: "transactions",
                element: <Transactions />,
            },
            {
                path: "menu",
                element: <AdminMenu />,
            }
        ],
    },

    //client - main app routes
    {
        path: "/",
        element: (
            <ClientProvider>
                <ClientLayout />
            </ClientProvider>
        ),
        children: [
            {
                path: "",
                element: <Menu />, // Default route shows Menu
            },
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
                path: "processing",
                element: <Processing />,
            },
            {
                path: "contact-us",
                element: <ContactUs />,
            }
        ]
    }
])

export default router;