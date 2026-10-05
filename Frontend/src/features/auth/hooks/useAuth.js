import { useDispatch } from "react-redux";
import { login, register, getMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";
// import { data } from "react-router";


export function useAuth() {

    const dispatch = useDispatch()
    const getErrorMessage = (error, fallback) =>
        error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || fallback

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await register({ email, username, password })
            dispatch(setError(null))
            // if (data?.user) {
            //     dispatch(setUser(data.user))
            // }
            return data
        } catch (error) {
            dispatch(setError(getErrorMessage(error, "Registration failed. Please try again.")))
            return null
        } finally {
            dispatch(setLoading(false))
        }
    }


    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
            dispatch(setError(null))
            return data
        } catch (error) {
            dispatch(setError(getErrorMessage(error, "Login failed. Please try again.")))
            return null
        } finally {
            dispatch(setLoading(false))
        }
    }


    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
            dispatch(setError(null))
            return data
        } catch (error) {
            if (error.response?.status !== 401) {
                dispatch(setError(getErrorMessage(error, "Failed to fetch user data")))
            }
            return null
        } finally {
            dispatch(setLoading(false))
        }
    }


    return {
        handleRegister,
        handleLogin,
        handleGetMe
    }
}