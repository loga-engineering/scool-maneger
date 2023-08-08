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

export const createStudent = async (student) => {
    const {data} = await axios.post(urlBase, student);

    return data;
}