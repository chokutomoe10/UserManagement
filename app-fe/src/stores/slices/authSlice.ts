import { IUser } from "../../interfaces/User";
import { createSlice } from '@reduxjs/toolkit'
import { setAuthToken } from "../../lib/api";

const initialAuthState: IUser = {
    id: 0,
    fullname: "",
    username: "",
    email: "",
    role: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN: (_, action) => {
            const payload = action.payload
            setAuthToken(payload.token)
            console.log("ini data yang ditangkap redux auth login :", payload)
            localStorage.setItem("token", payload.token)

            const user: IUser = {
                id: payload.user.id,
                fullname: payload.user.fullname,
                username: payload.user.username,
                email: payload.user.email,
                role: payload.user.role,
            };

            return user
        },
        AUTH_CHECK: (_, action) => {
            const payload = action.payload
            console.log("ini data yang ditangkap redux auth check :", payload)

            const user: IUser = {
                id: payload.id,
                fullname: payload.fullname,
                username: payload.username,
                email: payload.email,
                role: payload.role,
            };

            return user
        },
        AUTH_ERROR: () => {
            localStorage.removeItem("token")
        },
        AUTH_LOGOUT: () => {
            localStorage.removeItem("token")
        }
    }
})