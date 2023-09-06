import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import axios from "axios";
import {authConfig} from "@/features/authentication/auth-config";
import {atom} from "recoil";


const urlBase = process.env.BACKEND_URL;

export const isAuthenticated = atom({
    key: 'isAuthenticated',
    default: false,
});

export const signUp = async (user) => {

    const response = await axios.post(`${urlBase}auth/signup`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

export const signIn = async (user) => {

    const response = await axios.post(`${process.env.BACKEND_URL}auth/signin`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

