import { defineStore } from 'pinia'

export const useStore = defineStore({
    id: 'common',

    state: () => ({
        sidebar: {
            open: false
        }
    }),

    getters: {
        opened: state => state.sidebar.open
    },

    actions: {
        toggleSideBar() {
            this.sidebar.open = !this.sidebar.open
        }
    }
})
