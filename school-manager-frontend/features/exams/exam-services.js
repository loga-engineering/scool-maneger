import axios from "axios";

const urlBase = process.env.BACKEND_URL + "exams";

export const findAllExams = async () => {
    try {
        const {data} = await axios.get(urlBase);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

// export const findAllExamNames = async () => {
//     try {
//         const {data} = await axios.get(urlBase);
//         const exams = [];
//
//         data.map((exam) => {
//             const temp = {id : exam.id, year : exam.year };
//             exams.push(temp);
//         });
//         console.log("=====>", exams);
//         return exams;
//     } catch (error) {
//         console.error("===> ", error);
//         throw error;
//     }
// };

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

export const createExam = async (exam) => {
    const {data} = await axios.post(urlBase, exam);

    return data;
}

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
