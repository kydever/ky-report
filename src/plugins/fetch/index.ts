const baseUrl = process.env.BASEURL

import { ElMessage } from 'element-plus'

const getUrlString = (data: object) => {
    let dataArr: string[] = []
    if (Object.keys(data).length) {
        Object.keys(data).forEach(key => {
            dataArr.push(key + '=' + data[key])
        })
    } else {
        return ''
    }
    return dataArr.join('&')
}

const fetchApi = async (url: string, opts: object) => {
    const options = {
        ...opts
    }

    return await fetch(url, options).then(async res => {
        let { code, data, msg } = await res.clone().json()
        return code === 1 ? data : msg
    }).catch(err => {
        ElMessage.error(err)
        return Promise.reject(err)
    })
}

fetchApi.get = async (url: string, params = {}) => {
    url = baseUrl + url
    if (JSON.stringify(params) !== '{}') {
        url += (url.indexOf('?') > -1 ? '&' : '?') + getUrlString(params)
    }

    return await fetchApi(url, {
        method: 'GET'
    })
}

fetchApi.post = async (url: string, data: object) => {
    return await fetchApi(url, {
        method: 'POST',
        body: data
    })
}

fetchApi.delete = async (url: string) => {
    return await fetchApi(url, {
        method: 'DELETE',
    })
}

export default fetchApi
