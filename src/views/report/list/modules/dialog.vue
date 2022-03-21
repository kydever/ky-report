<template>
    <el-dialog v-model="dialogVisible" title="添加日报" width="600px">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="50px" :size="small">
            <el-form-item label="项目" prop="project">
                <el-input v-model="form.project" />
            </el-form-item>
            <el-form-item label="模块" prop="module">
                <el-input v-model="form.module" />
            </el-form-item>
            <el-form-item label="描述" prop="summary">
                <el-input v-model="form.summary" />
            </el-form-item>
            <el-form-item label="时间" prop="times">
                <el-time-picker
                    v-model="form.times"
                    is-range
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit()">保存</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, defineExpose } from 'vue'

let dialogVisible = ref(false)

let form = reactive({
    id: 0,
    project: "",
    module: "",
    summary: "",
    times: []
})

const rules = reactive({
    project: { required: false, message: "1", trigger: "blur" },
    module: { required: false, message: "1", trigger: "blur" },
    summary: { required: false, message: "1", trigger: "blur" },
    times: { required: false, message: "1", trigger: "blur" },
})

const formRef = ref()

const internalInstance:any = getCurrentInstance();
const globalProp = internalInstance.appContext.config.globalProperties

const init = () => {
    form.id = 0
    form.project = ''
    form.module = ''
    form.summary = ''
    form.times = []
    dialogVisible.value = true
}

const submit = () => {
    formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            let params:any = {
                ...form,
            }
            if (params.times && params.times.length !== 0) {
                params.begin_time = params.times[0]
                params.end_time = params.times[1]
                delete params.times
            }
            await globalProp.$api.saveRoport(params)
            globalProp.$message.success('已保存')
            globalProp.$emit('get-list')
            dialogVisible.value = false
        }
    })
}
defineExpose({
    init
})
</script>

<style>
</style>