

const endpoint = "/exams";
const path = {
    root: endpoint,
    new: `${endpoint}/new`,
    details: (id) => `${endpoint}/${id}`,
    edit: (id) => `${endpoint}/${id}/edit`,
    search: `exams/search`
}


export const examConfig = {
    path,
}