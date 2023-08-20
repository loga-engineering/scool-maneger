

const endpoint = "/grades";
const path = {
    root: endpoint,
    new: `${endpoint}/new`,
    details: (id) => `${endpoint}/${id}`,
    edit: (id) => `${endpoint}/${id}/edit`,
    search: `grades/search`
}


export const gradeConfig = {
    path,
}