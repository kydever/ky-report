import { ElMessage } from "element-plus"

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

const defaultOptions = {
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
}

const fetchApi = async (url: string, opts: object) => {
	const options = {
		...defaultOptions,
		...opts,
	}

	return await fetch(url, options)
		.then(async res => {
			console.log(1, res.json())
			const { code, data, msg } = await res.clone().json()
			console.log(2, code, data, msg)
			return code === 1 ? data : msg
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
		body: data,
	})
}

fetchApi.delete = async (url: string) => {
	return await fetchApi(url, {
		method: "DELETE",
	})
}

export default fetchApi
