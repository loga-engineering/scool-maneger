

const endpoint = "/classrooms";
const path = {
    root: endpoint,
    new: `${endpoint}/new`,
    details: (id) => `${endpoint}/${id}`,
    edit: (id) => `${endpoint}/${id}/edit`,
}


export const classroomConfig = {
    path,
}