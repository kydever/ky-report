import fetchApi from '../plugins/fetch/index';
const base_url = '/oauth'

const common = {
    authorize: (data: object) => fetchApi.post(base_url + '/authorize', data),
    login: (data: object) => fetchApi.post(base_url + '/login', data),
}

export default common