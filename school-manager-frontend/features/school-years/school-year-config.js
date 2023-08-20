

const endpoint = "/school-years";
const path = {
    root: endpoint,
    new: `${endpoint}/new`,
    details: (id) => `${endpoint}/${id}`,
    edit: (id) => `${endpoint}/${id}/edit`,
    search: `school-years/search`
}


export const schoolYearConfig = {
    path,
}