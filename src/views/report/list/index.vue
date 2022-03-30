<template>
	<el-row class="mb-5">
		<el-button @click="handleAction('add')">新建日报</el-button>
	</el-row>
	<el-table :data="data.tableData" border style="width: 100%">
		<el-table-column align="center" prop="id" label="ID" />
		<el-table-column align="center" prop="dt" label="日期" />

		<!-- <el-table-column align="center" prop="address" label="日报条目" />
            <el-table-column align="center" prop="address" label="项目名" />
            <el-table-column align="center" prop="address" label="模块名" />
            <el-table-column align="center" prop="address" label="工作内容" />
            <el-table-column align="center" prop="address" label="时间" /> -->
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
import { ref, reactive, getCurrentInstance, onMounted } from "vue"
import { getRoport } from "@/api/report"

let data: any = reactive({
	tableData: [],
})

let page = ref(1)
let limit = ref(20)

const dialogRef = ref()
const TimelineRef = ref()

onMounted(() => {
	getList()
})

const getList = async () => {
	let params = {
		offset: (page.value - 1) * limit.value,
		limit: limit.value,
	}
	let res = await getRoport(params)
	data.tableData = res
}

const handleAction = (type: string, argu?: an) => {
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
