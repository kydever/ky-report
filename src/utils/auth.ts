import Cookies from "js-cookie"

const TokenKey: string = "token"
const User: string = "user"

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
	return Cookies.get(User)
}

export function setUserInfo(user: any) {
	return Cookies.get(User, user, { expires: 1 })
}

export function removeUserInfo() {
	return Cookies.remove(User)
}
