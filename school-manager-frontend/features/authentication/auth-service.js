import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import axios from "axios";
import {authConfig} from "@/features/authentication/auth-config";
import {atom} from "recoil";
import {useQuery} from "@tanstack/react-query";
import {findClassroomById} from "@/features/classrooms/classroom-services";


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

export const getProfile = async () => {

    const response = await axios.get( `${urlBase}test/profile`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    console.log("user ===> ",response.data);
    return response.data;
}

export const useFindProfile = () => {

        const queryKey = ["user", "profile"];
        const queryFn = () => getProfile();

        return useQuery({queryKey, queryFn});

}