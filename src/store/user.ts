import { defineStore } from "pinia"
import { getToken, setToken, removeToken } from "@/utils/auth"
import { login } from "@/api/common.ts"

interface loginType {
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

	actions: {
		async login(code: string) {
			let params = { code }
			const {
				token,
				user: { name, avatar },
			} = await login(params)
			const res = await login(params)
			this.token = token
			this.name = name
			this.avatar = avatar
			setToken(token)
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
