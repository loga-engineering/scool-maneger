import axios from "axios";

const urlBase = process.env.BACKEND_URL + "school-years";

export const findAllSchoolYears = async () => {
    try {
        const {data} = await axios.get(urlBase);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const findAllSchoolYearNames = async () => {
    try {
        const {data} = await axios.get(urlBase);
        const schoolYears = [];

        data.map((schoolYear) => {
            const temp = {id : schoolYear.id, year : schoolYear.year };
            schoolYears.push(temp);
        });
        console.log("=====>", schoolYears);
        return schoolYears;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};

export const findSchoolYearById = async (id) => {
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

export const createSchoolYear = async (schoolYear) => {
    const {data} = await axios.post(urlBase, schoolYear);

    return data;
}

export const deleteSchoolYearById = async (id) => {
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

export const updateSchoolYearById = async (id, schoolYear) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.put(url, schoolYear);
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
