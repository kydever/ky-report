import { defineStore } from "pinia"

interface StoreState {
	sidebar: {
		open: boolean
	}
}

export const useStore = defineStore({
	id: "common",

	state: () => ({
		sidebar: {
			open: false,
		},
	}),

	getters: {
		opened: (state: StoreState) => state.sidebar.open,
	},

	actions: {
		toggleSideBar() {
			this.sidebar.open = !this.sidebar.open
		},
	},
})
