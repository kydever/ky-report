import { defineStore } from 'pinia'
import menus from '@/menu'

export const useStore = defineStore({
    id: "menu",

    state: () => ({
        menus: menus
    }),
})
