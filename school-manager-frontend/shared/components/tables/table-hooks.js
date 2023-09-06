import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const searchData = async ({query, page, size, sort, filter, path}) => {
    try {
        console.log("======> ", {query, page, size, sort, filter});
        const url = process.env.BACKEND_URL + path;
        console.log("url ======> ",url);
        const {data} = await axios.post(url , {query, page, size, sort, filter}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
export const useSearch = ({query, page, size, sort, filter, path}) => {
    const queryKey = [path, "reSearch", query, page, size, sort, filter];
    const queryFn = () => searchData({query, page, size, sort, filter, path});
    return useQuery({queryKey, queryFn});
}