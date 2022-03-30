import fetchApi from "../plugins/fetch/index"
const base_url = "/api/report"

export const saveRoport = (data: object) => fetchApi.post(`${base_url}/item`, data)
export const getRoport = (params: object = {}) => fetchApi.get(`${base_url}`, params)
export const deleteRoport = (id: number) => fetchApi.delete(`${base_url}/item/${id}`)
