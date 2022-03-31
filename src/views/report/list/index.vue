<template>
	<el-row class="mb-5">
		<el-button @click="handleAction('add')">新建日报</el-button>
	</el-row>
	<el-table :data="data.tableData" border style="width: 100%" table-layout="auto">
		<el-table-column align="center" prop="id" label="ID" />
		<el-table-column align="center" prop="dt" label="日期" />
		<el-table-column align="center" label="操作" fixed="right">
			<template #default="scope">
				<el-button
					type="primary"
					:disabled="!scope.row.items"
					@click="handleAction('view', scope.row)"
					>查看日报详情</el-button
				>
			</template>
		</el-table-column>
	</el-table>

	<Dialog ref="dialogRef" @get-list="getList" />
	<Timeline ref="TimelineRef" @get-list="getList" />
</template>

<script setup lang="ts">
import Dialog from "./modules/Dialog.vue"
import Timeline from "./modules/Timeline.vue"
import { ref, reactive, onMounted } from "vue"
import { getRoport } from "@/api/report"
import { throttle } from "@/utils/index"
import { ElLoading } from "element-plus"

let data: any = reactive({
	tableData: [],
})

let page = ref(1)
let limit = ref(20)
let scrollbar: any = ref()
let isAllDate = ref(false)

const dialogRef = ref()
const TimelineRef = ref()

onMounted(() => {
	getList()
	scrollbar = document.querySelector(".custom-scrollbar")
	scrollbar.value?.addEventListener("scroll", throttle(isBottomed))
})

const isBottomed = async () => {
	const { clientHeight, scrollTop, scrollHeight } = scrollbar
	if (clientHeight + scrollTop === scrollHeight && !isAllDate.value) await getList()
}

const getList = async () => {
	const loading = ElLoading.service({
		lock: true,
		text: "Loading",
		background: "rgba(0, 0, 0, 0.7)",
	})
	let params = {
		offset: (page.value - 1) * limit.value,
		limit: limit.value,
	}
	let res = await getRoport(params)
	data.tableData = data.tableData.concat(res)
	page.value += 1
	if (res.length === 0 || res.length < limit.value) {
		isAllDate.value = true
	}
	loading.close()
}

const handleAction = (type: string, argu?: any) => {
	let { id, dt, items } = argu || {}
	switch (type) {
		case "add":
			dialogRef.value.init()
			break

		case "view":
			let list = items.map((item: any) => {
				item.date = dt
				return item
			})
			TimelineRef.value.init(list)
			break
	}
}
</script>

<style lang="scss" scoped></style>
