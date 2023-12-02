import { IUserLogin } from "../interfaces/User";
import { useState } from "react";
import { API } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGIN } from "../stores/rootReducer";
import { useDispatch } from "react-redux";

export function useLogin() {
    const Navigate = useNavigate()
    const Dispatch = useDispatch()

    const [formData, setFormData] = useState<IUserLogin>({
        email: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        console.log(name);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleLogin() {
        try {
            const response = await API.post('/auth/login', formData)
            Dispatch(AUTH_LOGIN(response.data))
            Navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return {handleChange, handleLogin, formData, setFormData}
}