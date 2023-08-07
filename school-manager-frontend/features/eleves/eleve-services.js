import axios from "axios";

const urlBase = process.env.BACKEND_URL + "eleves";

export const findAllEleves = async () => {
    try {
        const {data} = await axios.get(urlBase);
        return data;
    } catch (error) {
        console.error("===> ", e);
        throw error;
    }

};

export const createEleve = async (eleve) => {
    const {data} = await axios.post(urlBase, eleve);

    return data;
}