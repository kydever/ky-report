<template>
	<el-container
		class="layout__container"
		:class="[opened ? '' : 'is-collapse', isMobile ? 'mobile' : 'desktop']"
	>
		<div v-if="isMobile && opened" class="mobile__bg" @click="closeSidebar"></div>
		<el-aside>
			<el-scrollbar>
				<Sidebar :collapse="!opened" />
			</el-scrollbar>
		</el-aside>
		<el-container>
			<el-header>
				<Header />
			</el-header>
			<el-main>
				<el-scrollbar wrap-class="custom-scrollbar">
					<Main />
				</el-scrollbar>
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import Sidebar from "./Sidebar.vue"
import Header from "./Header.vue"
import Main from "./Main.vue"
import { useStore } from "@/store/common"
import ResizeHandler from "./composition/ResizeHandler"
import { computed } from "vue"

ResizeHandler()

const commonStore = useStore()
const isMobile = computed(() => commonStore.isMobile)
const opened = computed(() => commonStore.opened)

const closeSidebar = () => {
	commonStore.closeSideBar()
}
</script>

<style lang="scss" scoped>
.layout__container {
	height: 100vh;

	.el-aside {
		background-color: #304156;
		height: 100%;
		width: 200px;
		transition: width 0.3s ease, transform 0.3s ease;
	}

	.mobile__bg {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		background-color: #000;
		opacity: 0.3;
	}

	.el-header {
		background-color: #f0f2f5;
	}

	&.mobile .el-aside {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 9999;
	}

	&.is-collapse {
		&.desktop {
			.el-aside {
				width: 64px;
			}
		}

		&.mobile {
			.el-aside {
				transform: translateX(-100%);
			}
		}
	}
}
</style>
