import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {atom} from "recoil";

const urlBase = process.env.BACKEND_URL + "students";
export const studentQueryState = atom({
    key: 'studentQueryState',
    default: {
        query: "",
        firstName: "",
        lastName: "",
    },
});

export const studentSearchQueryState = atom({
    key: 'studentSearchQueryState',
    default: "",
});

////////////////////////////////// findAll fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const findAllStudents = async () => {
    try {
        const {data} = await axios.get(urlBase, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const findByRegistrationNumber = async (query) => {
    try {
        const url = urlBase + "/registration-number/"+query;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const useSearchStudents = (query) => {
    if (!query) {
        const queryKey = ["students", "all", query];
        const queryFn = () => findAllStudents({query});

        return useQuery({queryKey, queryFn});
    }
    const isValid = /^[a-z0-9]+$/i.test(query);
    if (isValid) {

        const queryKey = ["student", "registration-number", query];
        const queryFn = () => findByRegistrationNumber(query);

        return useQuery({queryKey, queryFn});
    }

}
////////////////////////////////// findById fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const findStudentById = async (id) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const useFindStudentById = (id) => {

    const queryKey = ["student", "id", id];
    const queryFn = () => findStudentById(id);

    return useQuery({queryKey, queryFn});

}


////////////////////////////////// findByClassroomId fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const findByClassroomId = async (id) => {
    try {
        if(id){
            const url = urlBase + "/classroom/" + id;
            console.log("=======+> url: ", url);
            const {data} = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            return data;
        }
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};
export const useFindByClassroomId = (id) => {

        const queryKey = ["useFindByClassroomId", "students", "classroom id"];
        const queryFn = () => findByClassroomId(id);

        return useQuery({queryKey, queryFn});

}

////////////////////////////////// createStudent fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const createStudent = async (student) => {
    const {data} = await axios.post(urlBase, student, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    return data;
};

export const useCreateStudent = () => {
    return useMutation((student) => createStudent(student));
};

////////////////////////////////// deleteStudentById fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const deleteStudentById = async (id) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

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

export const useDeleteStudent = () => {
    return useMutation((id) => deleteStudentById(id));
};

////////////////////////////////// updateStudentById fct + hook  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const updateStudentById = async (id, student) => {
    try {
        const url = urlBase + "/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.put(url, student, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }
};

export const useEditStudent = (id, student) => {
    return useMutation(() => updateStudentById(id, student));
};

////////////////////////////////// useCountStudents  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const countStudentsByClassroomId = async (id) => {
    try {
        const url = urlBase + "/count/" + id;
        console.log("=======+> url: ", url);
        const {data} = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return data;
    } catch (error) {
        console.error("===> ", error);
        throw error;
    }

};

export const useCountStudents = (classroomId) => {

    const queryKey = ["students", "classroom", classroomId];
    const queryFn = () => countStudentsByClassroomId(classroomId);

    return useQuery({queryKey, queryFn});

}