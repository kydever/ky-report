import { ElMessage } from "element-plus"
import { getToken } from "@/utils/auth"

const getUrlString = (data: any) => {
	const dataArr: string[] = []
	if (Object.keys(data).length) {
		Object.keys(data).forEach((key: string) => {
			dataArr.push(key + "=" + data[key])
		})
	} else {
		return ""
	}
	return dataArr.join("&")
}

const fetchApi = async (url: string, opts: object) => {
	const options = {
		cache: "no-store",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
			credentials: "include",
			topsession: getToken(),
		},
		...opts,
	}

	return await fetch(url, options)
		.then(async res => {
			const { code, data, message } = await res.clone().json()
			if (code === 0) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(message)
			}
		})
		.catch(err => {
			ElMessage.error(err)
			return Promise.reject(err)
		})
}

fetchApi.get = async (url: string, params = {}) => {
	if (JSON.stringify(params) !== "{}") {
		url += (url.indexOf("?") > -1 ? "&" : "?") + getUrlString(params)
	}

	return await fetchApi(url, {
		method: "GET",
	})
}

fetchApi.post = async (url: string, data: object) => {
	return await fetchApi(url, {
		method: "POST",
		body: JSON.stringify(data),
	})
}

fetchApi.delete = async (url: string) => {
	return await fetchApi(url, {
		method: "DELETE",
	})
}

export default fetchApi
