
const endpoint = "/reporting";
const path = {
    root: endpoint,
    predict: (id) => `${endpoint}/student/${id}/predict`,
    result: (id) => `${endpoint}/student/${id}`
}

export const reportingConfig = {
    path
}