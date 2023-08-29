import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {atom} from "recoil";

const urlBase = process.env.BACKEND_URL + "classrooms";

export const classroomQueryState = atom({
    key: 'classroomQueryState',
    default: {
        query: '',
    },
});
export const classroomSearchQueryState = atom({
    key: "classroomSearchQueryState",
    default: "",
});

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
export const useFindAllClassrooms = () => {

        const queryKey = ["classrooms", "all"];
        const queryFn = () => findAllClassrooms();

        return useQuery({queryKey, queryFn});

}
export const findClassroomsByName = async (name) => {
    try {
        const url = urlBase + "/names/" + name;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
export const useFindClassrooms = ({query}) => {

    if(!query){
        const queryKey = ["classrooms", "all", "usefindclassrooms", query];
        const queryFn = () => findAllClassrooms();

        return useQuery({queryKey, queryFn});

    }
    const isValid = /^[a-z0-9]+$/i.test(query);
    if (isValid) {
        const queryKey = ["classroom", "name", query];
        const queryFn = () => findClassroomsByName(query);

        return useQuery({queryKey, queryFn});
    }
}


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
export const useFindClassroomById = (id) => {

    if(id) {
        const queryKey = ["classroom", "id", id];
        const queryFn = () => findClassroomById(id);

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