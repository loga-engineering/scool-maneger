import axios from "axios";

const urlBase = process.env.BACKEND_URL + "grades";

export const findAllGrades = async () => {
    try {
        const {data} = await axios.get(urlBase);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

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

export const createGrade = async (Grade) => {
    const {data} = await axios.post(urlBase, Grade);

    return data;
}

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
