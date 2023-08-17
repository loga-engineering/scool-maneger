import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const urlBase = process.env.BACKEND_URL + "school-years";


////////////////////////////////// research fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const searchSchoolYears = async ({query, page, size, sort, filter}) => {
    try {
        console.log("======> ", {query, page, size, sort, filter});

        const {data} = await axios.post(urlBase + "/search", {query, page, size, sort, filter});
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
export const useSearchSchoolYears = ({query, page, size, sort, filter}) => {
    const queryKey = ["school-years", "all", query, page, size, sort, filter];
    const queryFn = () => searchSchoolYears({query, page, size, sort, filter});
    return useQuery({queryKey, queryFn});
}

////////////////////////////////// findAll fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


export const findAllSchoolYears = async ({query}) => {
    try {
        const {data} = await axios.get(urlBase, {params: {query}});
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const findSchoolYearsByYear = async (query) => {
    try {
        const url = urlBase + "/years/" + query;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        throw error;
    }

};

export const useFindSchoolYears = ({query}) => {

    if (!query) {
        const queryKey = ["school-years", "all", query];
        const queryFn = () => findAllSchoolYears({query});

        return useQuery({queryKey, queryFn});
    }
    const isYear = /^\d{4}$/.test(query);
    if (isYear) {
        const queryKey = ["school-year", "year", query];
        const queryFn = () => findSchoolYearsByYear(query);

        return useQuery({queryKey, queryFn});

    }
}

////////////////////////////////// findById fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const findSchoolYearById = async (id) => {
    try {
        if (!id) return null;

        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const useFindSchoolYearById = (id) => {
    const queryKey = ["school-year", "id", id];
    const queryFn = () => findSchoolYearById(id);

    return useQuery({queryKey, queryFn});
}


////////////////////////////////// Create fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


export const createSchoolYear = async (schoolYear) => {
    const {data} = await axios.post(urlBase, schoolYear);

    return data;
}

export const updateSchoolYearById = async (id, schoolYear) => {
    try {
        const url = urlBase + "/" + id;
        const {data} = await axios.put(url, schoolYear);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

////////////////////////////////// delete fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const deleteSchoolYearById = async (id) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const response = await axios.delete(url);

        // Vérifier si le statut de la réponse est "no_content" (204)

        if (response.status === 204) {
            return {success: true, message: "Deleted successfully"};
        } else {
            throw new Error("Delete operation did not return a 'no_content' response.");
        }
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};
export const useDeleteSchoolYear = () => {
    return useMutation((id) => deleteSchoolYearById(id));
};


