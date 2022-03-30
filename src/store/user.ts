import { defineStore } from "pinia"
import {
	getToken,
	setToken,
	removeToken,
	setUserInfo,
	getUserInfo,
	removeUserInfo,
} from "@/utils/auth"
import { login } from "@/api/common"

export const useStore = defineStore({
	id: "user",

	state: () => ({
		name: "",
		token: "",
		avatar: "",
	}),

	actions: {
		async login(code: string) {
			let params = { code }
			const { token, user } = await login(params)
			this.token = token
			this.name = user.name
			this.avatar = user.avatar
			setToken(token)
			setUserInfo(user)
		},

		init() {
			const { name, avatar } = getUserInfo()
			const token = getToken()
			this.token = token
			this.name = name
			this.avatar = avatar
		},

		resetToken() {
			return new Promise(resolve => {
				removeToken() // must remove  token  first
				removeUserInfo()
				this.name = ""
				this.token = ""
				this.avatar = ""
				resolve(0)
			})
		},
	},
})
