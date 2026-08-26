import { useDispatch } from "react-redux";
import { login, register, getMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";
// import { data } from "react-router";


export function useAuth() {

    const dispatch = useDispatch()

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true))
            const data = await register({ email, username, password })
            if (data?.user) {
                dispatch(setUser(data.user))
            }
            return data
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registeration failed"))
            return null
        } finally {
            dispatch(setLoading(false))
        }
    }


    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
            return data
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"))
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
            return data
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to fetch user data"))
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