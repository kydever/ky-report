<template>
	<div class="header">
		<div class="header__left">
			<Hamburger />

			<Breadcrumb />
		</div>

		<el-dropdown trigger="click">
			<span class="mr-2">{{ user.name || "Admin" }}</span>
			<el-image
				style="width: 36px; height: 36px; border-radius: 50%"
				:src="user.avatar"
				fit="cover"
			/>

			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>登出</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup lang="ts">
import { useStore as userStore } from "@/store/user"
const user = userStore()
</script>

<style lang="scss" scoped>
.header {
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	.header__left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	::v-deep .el-tooltip__trigger {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
}
</style>
