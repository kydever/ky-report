<template>
    <el-dialog v-model="dialogVisible" title="当日进度" width="800px" custom-class="timeline">
        <el-timeline>
            <el-timeline-item center v-for="(item, index) in data.items" :key="index" :timestamp="item.end_time" placement="top">
                <el-card>
                    <h4>{{ item.project }} - {{ item.module }}</h4>
                    <p>{{ item.summary }}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose, toRefs } from 'vue'

let dialogVisible = ref(false)

let data = reactive({
    items: []
})

const init = (timeline: Array<any>) => {
    data.items = [ ...timeline ]
    dialogVisible.value = true
}
defineExpose({
    init
})
</script>
<style lang="scss" scoped>
.timeline {
    h4 {
        margin-bottom: 10px;
        font-size: 18px;
    }
    p {
        line-height: 1.4;
    }
}
</style>