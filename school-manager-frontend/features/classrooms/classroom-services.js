import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const urlBase = process.env.BACKEND_URL + "classrooms";

export const findAllClassrooms = async () => {
    try {
        const {data} = await axios.get(urlBase);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

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

export const createClassroom = async (Classroom) => {
    const {data} = await axios.post(urlBase, Classroom);

    return data;
}

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
