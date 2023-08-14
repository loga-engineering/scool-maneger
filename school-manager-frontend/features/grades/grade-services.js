import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useMutation, useQuery} from "@tanstack/react-query";

const urlBase = process.env.BACKEND_URL + "grades";

////////////////////////////////// findAll fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const findAllGrades = async () => {
    try {
        const {data} = await axios.get(urlBase);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
export const findByGradesAsc = async () => {
    try {
        const url = urlBase + "/value-asc/asc";
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};
export const findByGradesDesc = async () => {
    try {
        const url = urlBase + "/value-desc/desc";
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};
export const useSearchGrades = ({query}) => {
    if(query===0) {
        const queryKey = ["grades", "all", query];
        const queryFn = () => findAllGrades();

        return useQuery({queryKey, queryFn});
    }else if(query === 1){
        const queryKey = ["grades", "all","asc", query];
        const queryFn = () => findByGradesAsc();

        return useQuery({queryKey, queryFn});

    }else if(query === 2){
        const queryKey = ["grades", "all","desc", query];
        const queryFn = () => findByGradesDesc();

        return useQuery({queryKey, queryFn});
    }
};

////////////////////////////////// findById fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const findGradeById = async (id) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
export const useFindGradeById = ({query}) => {

    if(query) {
        const queryKey = ["grade", "id", query];
        const queryFn = () => findGradeById(query);

        return useQuery({queryKey, queryFn});
    }

}
////////////////////////////////// create fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const createGrade = async (Grade) => {
    const {data} = await axios.post(urlBase, Grade);

    return data;
}
export const useCreateGrade = () => {
    return useMutation((grade) => createGrade(grade));
};
////////////////////////////////// delete fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const deleteGradeById = async (id) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const response = await axios.delete(url);

        // Vérifier si le statut de la réponse est "no_content" (204)

        if (response.status === 204) {
            return { success: true, message: "Deleted successfully" };
        } else {
            throw new Error("Delete operation did not return a 'no_content' response.");
        }
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};
export const useDeleteGrade = () => {
    return useMutation((id) => deleteGradeById(id));
};
////////////////////////////////// update fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const updateGradeById = async (id, Grade) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.put(url, Grade);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};
export const useEditGrade = (id, grade) => {
    return useMutation(() => updateGradeById(id, grade));
};