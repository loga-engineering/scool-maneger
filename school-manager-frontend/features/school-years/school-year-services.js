import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const urlBase = process.env.BACKEND_URL + "school-years";

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
        const url = urlBase + "/years/"+query;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        throw error;
    }

};

export const useSearchSchoolYears = ({query}) => {

    if(!query) {
        const queryKey = ["school-years", "all", query];
        const queryFn = () => findAllSchoolYears({query});

        return useQuery({queryKey, queryFn});
    }
    const isYear = /^\d{4}$/.test(query);
    if (isYear)  {
        const queryKey = ["school-year", "year", query];
        const queryFn = () => findSchoolYearsByYear(query);

        return useQuery({queryKey, queryFn});

    }
}

////////////////////////////////// findById fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const findSchoolYearById = async (query) => {
    try {
        const url = urlBase + "/" + query;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const useFindSchoolYearById = ({query}) => {

    if(query) {
        const queryKey = ["school-year", "id", query];
        const queryFn = () => findSchoolYearById(query);

        return useQuery({queryKey, queryFn});
    }

}



////////////////////////////////// Create fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


export const createSchoolYear = async (schoolYear) => {
    const {data} = await axios.post(urlBase, schoolYear);

    return data;
}

export const useCreateSchoolYear = () => {
    return useMutation((schoolYear) => createSchoolYear(schoolYear));
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

////////////////////////////////// Update fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const updateSchoolYearById = async (id, schoolYear) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.put(url, schoolYear);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const useEditSchoolYear = (id, schoolYear) => {
    return useMutation(() => updateSchoolYearById(id, schoolYear));
};

//////////////////////////////
export const findAllSchoolYearNames = async () => {
    try {
        const {data} = await axios.get(urlBase);
        const schoolYears = [];

        data.map((schoolYear) => {
            const temp = {id: schoolYear.id, year: schoolYear.year};
            schoolYears.push(temp);
        });
        console.log("=====>", schoolYears);
        return schoolYears;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};







