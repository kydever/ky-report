import fetchApi from "../plugins/fetch/index"
const base_url = "/ky-api/oauth"

export const authorize = (data: object) => fetchApi.get(base_url + "/authorize", data)
export const login = (data: object) => fetchApi.post(base_url + "/login", data)
