import Cookies from "js-cookie"

const TokenKey: string = "token"
const User: string = "userinfo"

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token: string) {
	return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}

export function getUserInfo() {
	return JSON.parse(Cookies.get(User))
}

export function setUserInfo(user: any) {
	return Cookies.set(User, JSON.stringify(user), { expires: 1 })
}

export function removeUserInfo() {
	return Cookies.remove(User)
}
