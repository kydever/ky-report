<template>
	<el-row class="mb-5">
		<el-button @click="handleAction('add')">新建日报</el-button>
	</el-row>
	<el-table :data="data.tableData" border style="width: 100%">
		<el-table-column align="center" prop="date" label="ID" />
		<el-table-column align="center" prop="name" label="日期" />

		<!-- <el-table-column align="center" prop="address" label="日报条目" />
        <el-table-column align="center" prop="address" label="项目名" />
        <el-table-column align="center" prop="address" label="模块名" />
        <el-table-column align="center" prop="address" label="工作内容" />
        <el-table-column align="center" prop="address" label="时间" /> -->
		<el-table-column align="center" label="操作" fixed="right">
			<template #default="scope">
				<el-button type="primary" @click="handleAction('view', scope.row)">查看进度</el-button>
				<el-button type="danger" @click="handleAction('del', scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>

	<Dialog ref="dialogRef" @get-list="getList" />
	<Timeline ref="TimelineRef" />
</template>

<script setup lang="ts">
import Dialog from "./modules/Dialog.vue"
import Timeline from "./modules/Timeline.vue"
import { ref, reactive, getCurrentInstance, onMounted } from "vue"
import { getRoport } from "@/api/report.ts"

let data: any = reactive({
	tableData: [],
})

let query: any = reactive({
	page: 1,
	limit: 10,
})

const dialogRef = ref()
const TimelineRef = ref()

const internalInstance: any = getCurrentInstance()
const globalProp = internalInstance.appContext.config.globalProperties

onMounted(() => {
	getList()
})

const getList = async () => {
	let params = {
		offset: (query.page - 1) * query.limit,
		limit: query.limit,
	}
	let res = await getRoport(params)
	console.log(res)
	data.tableData = [
		...[
			{
				id: 1,
				dt: "2022-03-21",
				items: [
					{
						project: "月食",
						module: "日报",
						summary: "sdadasdsadada",
						begin_time: "10:00",
						end_time: "19:00",
					},
					{
						project: "月食",
						module: "日报",
						summary: "sdadasdsadada",
						begin_time: "10:00",
						end_time: "19:00",
					},
					{
						project: "月食",
						module: "日报",
						summary: "sdadasdsadada",
						begin_time: "10:00",
						end_time: "19:00",
					},
					{
						project: "月食",
						module: "日报",
						summary: "sdadasdsadada",
						begin_time: "10:00",
						end_time: "19:00",
					},
				],
			},
		],
	]
}

const handleAction = (type: string, argu?: any) => {
	let { id, dt, items } = argu || {}
	switch (type) {
		case "add":
			dialogRef.value.init()
			break

		case "view":
			console.log(items)
			let list = items.map((item: any) => {
				item.date = dt
				return item
			})
			TimelineRef.value.init(list)
			break

		case "del":
			globalProp
				.$confirm("是否确定删除该日报", "提醒", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
				.then(() => {
					globalProp.$api.deleteRoport(id)
					globalProp.$message("已删除")
				})
			break
	}
}
</script>

<style lang="scss" scoped></style>
