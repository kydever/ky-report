<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in data.levelList" :key="item.path">
                <span v-if="item.redirect === 'noRedirect' || index == data.levelList.length - 1" class="no-redirect">{{
                    item.meta.title
                }}</span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// const { pathToRegexp } = require("path-to-regexp");

const data = reactive({
    levelList: <any>[]
})

const router = useRouter()
const route = useRoute()

watch(route, () => {
    getBreadcrumb()
})

onMounted(() => {
    getBreadcrumb()
})

const getBreadcrumb = () => {
    // only show routes with meta.title
    let matched = route.matched.filter(item => item.meta && item.meta.title)

    data.levelList = matched.filter(item => item.meta && item.meta.title)
}
const isDashboard = (route: any) => {
    const name = route && route.name
    if (!name) {
        return false
    }
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
const pathCompile = (path: String) => {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = route
    var toPath = pathToRegexp.compile(path)
    return toPath(params)
}
const handleLink = (item: any) => {
    const { redirect, path } = item
    if (redirect) {
        router.push(redirect)
        return
    }
    router.push(pathCompile(path))
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
