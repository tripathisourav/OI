import { createBrowserRouter } from "react-router";
import Login from "./src/features/auth/pages/Login";
import Register from "./src/features/auth/pages/Register";
import Dashboard from "./src/features/chat/pages/Dashboard";
import Protected from "./src/features/auth/components/Protected";
import { Navigate } from "react-router";
import VerifyEmailSuccess from "./src/features/auth/pages/verifyEmailSuccess";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <Protected> <Dashboard /> </Protected>
    },
    {
        path: '/dashboard',
        element: <Navigate to='/' replace />
    },
    {
        path: "/verify-email-success",
        element: <VerifyEmailSuccess />
    }
])