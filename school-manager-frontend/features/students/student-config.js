
const endpoint = "/students";
const path = {
    root: endpoint,
    new: `${endpoint}/new`,
    details: (id) => `${endpoint}/${id}`,
    edit: (id) => `${endpoint}/${id}/edit`,
    search: `students/search`
}


export const studentConfig = {
    path
}