import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useMutation, useQuery} from "@tanstack/react-query";

const urlBase = process.env.BACKEND_URL + "classrooms";

////////////////////////////////// findAll fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const findAllClassrooms = async () => {
    try {
        const {data} = await axios.get(urlBase);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
export const findClassroomsByName = async ({query}) => {
    try {
        const url = urlBase + "/names/" + query;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
export const useSearchClassrooms = ({query}) => {
    if (!query) {
        const queryKey = ["classrooms", "all"];
        const queryFn = () => findAllClassrooms();

        return useQuery({queryKey, queryFn});
    }
    const isValid = /^[a-z0-9]+$/i.test(query);
    if (isValid) {

        const queryKey = ["classroom", "name", query];
        const queryFn = () => findClassroomsByName({query});

        return useQuery({queryKey, queryFn});
    }

}

//////////////////////////////////   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const findAllClassroomNames = async () => {
    try {
        const {data} = await axios.get(urlBase);
        const classrooms = [];

        data.map((classroom) => {
            const temp = {id : classroom.id, name : classroom.name};
            classrooms.push(temp);
        });
        console.log("=====>", classrooms);
        return classrooms;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};

////////////////////////////////// findById fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const findClassroomById = async (id) => {
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
export const useFindClassroomById = ({query}) => {

    if(query) {
        const queryKey = ["classroom", "id", query];
        const queryFn = () => findClassroomById(query);

        return useQuery({queryKey, queryFn});
    }

}

////////////////////////////////// create fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const createClassroom = async (Classroom) => {
    const {data} = await axios.post(urlBase, Classroom);

    return data;
}

export const useCreateClassroom = () => {
    return useMutation((classroom) => createClassroom(classroom));
};

////////////////////////////////// delete fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const deleteClassroomById = async (id) => {
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

export const useDeleteClassroom = () => {
    return useMutation((id) => deleteClassroomById(id));
};

////////////////////////////////// update fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const updateClassroomById = async (id, Classroom) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.put(url, Classroom);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const useEditClassroom = (id, classroom) => {
    return useMutation(() => updateClassroomById(id, classroom));
};