import fetchApi from "../plugins/fetch/index"
const base_url = "/api/oauth"

export const authorize = (data: object) => fetchApi.get(base_url + "/authorize", data)
// export const authorize = (data: object) => fetchApi.get("/api/auth", data)
export const login = (data: object) => fetchApi.post(base_url + "/login", data)
// export const login = (data: object) => fetchApi.post("/api/login", data)
