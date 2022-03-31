import { defineStore } from "pinia"

interface StoreState {
	sidebar: {
		open: boolean
	}
	device: string
}

export const useStore = defineStore({
	id: "common",

	state: () => ({
		sidebar: {
			open: true,
		},
		device: "desktop",
	}),

	getters: {
		opened: (state: StoreState) => state.sidebar.open,
		isMobile: (state: StoreState) => state.device === "mobile",
	},

	actions: {
		toggleSideBar() {
			this.sidebar.open = !this.sidebar.open
		},
		closeSideBar() {
			this.sidebar.open = false
		},
		toggleDevice(device: string) {
			this.device = device
		},
	},
})
