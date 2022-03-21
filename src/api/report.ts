import fetchApi from '../plugins/fetch/index';
const base_url = '/report'

const report = {
    saveRoport: (data: object) => fetchApi.post(`${base_url}/item`, data),
    getRoport: (params: object) => fetchApi.get(`${base_url}`, params),
    deleteRoport: (id: number) => fetchApi.delete(`${base_url}/item/${id}`),
}

export default report