import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/common.ts'

interface login {
    username: String
    password: String
}

export const useStore = defineStore({
    id: 'user',

    state: () => ({
        name: '',
        token: '',
        avatar: ''
    }),

    getters: {
        name: state => state.name
    },

    actions: {
        async login(userinfo: login) {
            // const { token } = await login(userinfo)
            let token = '12313'
            this.token = token
            setToken(token)
        },

        getInfo() {},

        resetToken() {
            return new Promise(resolve => {
                removeToken() // must remove  token  first
                this.name = ''
                this.token = ''
                this.avatar = ''
                resolve(0)
            })
        }
    }
})
