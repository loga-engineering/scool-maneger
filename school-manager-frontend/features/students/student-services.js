import axios from "axios";

const urlBase = process.env.BACKEND_URL + "students";

export const findAllStudents = async () => {
    try {
        const {data} = await axios.get(urlBase);
        return data;
    } catch (error) {
        console.error("===> ", e);
        throw error;
    }

};

export const findStudentById = async (id) => {
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

export const findByClassroomId = async (id) => {
    try {
        const url = urlBase + "/classroom/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const createStudent = async (student) => {
    const {data} = await axios.post(urlBase, student);

    return data;
};

export const deleteStudentById = async (id) => {
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

export const updateStudentById = async (id, student) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.put(url, student);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};

export const countStudentsByClassroomId = async (id) => {
    try {
        const url = urlBase + "/count/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
