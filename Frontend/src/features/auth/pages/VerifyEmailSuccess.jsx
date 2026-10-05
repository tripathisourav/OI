import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const verifyEmailSuccess = () => {

    const navigate = useNavigate();
    const { handleGetMe } = useAuth();

    useEffect(() => {

        async function verifyUser() {

            const result = await handleGetMe();

            if (result?.user) {

                setTimeout(() => {
                    navigate("/");
                }, 2000);

            } else {
                navigate("/login");
            }
        }

        verifyUser();

    }, []);

    return (
        <div className="min-h-screen bg-void flex items-center justify-center">

            <div className="text-center">

                <div className="text-5xl mb-5">
                    ✓
                </div>

                <h1 className="text-2xl font-bold text-white">
                    Email Verified Successfully!
                </h1>

                <p className="mt-3 text-gray-400">
                    Your account has been verified. Redirecting you...
                </p>

            </div>

        </div>
    );
}

export default verifyEmailSuccess;
