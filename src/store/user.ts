import { defineStore } from "pinia"
import { getToken, setToken, removeToken } from "@/utils/auth"
import { authorize, login } from "@/api/common.ts"

interface login {
	username: String
	password: String
}

export const useStore = defineStore({
	id: "user",

	state: () => ({
		name: "",
		token: "",
		avatar: "",
	}),

	getters: {
		name: state => state.name,
	},

	actions: {
		async login(userinfo: login) {
			// const { token } = await login(userinfo)
			const token = "12313"
			this.token = token
			setToken(token)
		},

		async getInfo() {
			const params = { redirect_url: "http://127.0.0.1:9501/oauth/login" }
			const res = await authorize(params)
			console.log(11, res)
		},

		resetToken() {
			return new Promise(resolve => {
				removeToken() // must remove  token  first
				this.name = ""
				this.token = ""
				this.avatar = ""
				resolve(0)
			})
		},
	},
})
