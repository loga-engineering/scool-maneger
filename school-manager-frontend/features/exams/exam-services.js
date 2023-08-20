import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useMutation, useQuery} from "@tanstack/react-query";

const urlBase = process.env.BACKEND_URL + "exams";


////////////////////////////////// findAll fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const findAllExams = async () => {
    try {
        const {data} = await axios.get(urlBase);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const useFindAllExams = () => {

    const queryKey = ["exams", "all"];
    const queryFn = () => findAllExams();

    return useQuery({queryKey, queryFn});
}

////////////////////////////////// findExamBySubject fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const findExamBySubject = async (subject) => {
    try {
        const url = urlBase + "/subjects/" + subject;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};

export const useFindExamBySubject = (query) => {

    const queryKey = ["exams", "subjects", query];
    const queryFn = () => findExamBySubject(query);

    return useQuery({queryKey, queryFn});
};

////////////////////////////////// findById fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const findExamById = async (id) => {
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
export const useFindExamById = (id) => {

    if(id) {
        const queryKey = ["exam", "id", id];
        const queryFn = () => findExamById(id);

        return useQuery({queryKey, queryFn});
    }

}
////////////////////////////////// create fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const createExam = async (exam) => {
    const {data} = await axios.post(urlBase, exam);

    return data;
}
export const useCreateExam = () => {
    return useMutation((exam) => createExam(exam));
};
////////////////////////////////// delete fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const deleteExamById = async (id) => {
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
export const useDeleteExam = () => {
    return useMutation((id) => deleteExamById(id));
};

////////////////////////////////// update fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const updateExamById = async (id, exam) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.put(url, exam);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
export const useEditExam = (id, exam) => {
    return useMutation(() => updateExamById(id, exam));
};