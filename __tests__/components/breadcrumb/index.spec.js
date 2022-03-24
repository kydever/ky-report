import { mount, createLocalVue } from '@vue/test-utils'
import ElementPlus from 'element-plus'

import Breadcrumb from '@/components/Breadcrumb/index.vue'

const localVue = createLocalVue();

localVue.use(ElementPlus);

const options = {
    localVue,
    stubs: {
        transition: false
    },
}

describe('not data space component render', () => {
    const wrapper = mount(Breadcrumb, {
        ...options
    })

    it('html render', () => {
        expect(wrapper.text()).toMatch(`Space 推荐`)
        expect(wrapper.find('.el-icon-plus').exists()).toBe(true)
        expect(wrapper.text()).toMatch(`保存`)

        // 表格 el-table会渲染两遍column 
        const tableWrapperText = wrapper.find('.el-table').text()
        expect(tableWrapperText).toMatch(`名称`)
        expect(tableWrapperText).toMatch(`操作`)
    })
})

describe('handle space module action', () => {
    const wrapper = mount(Breadcrumb, {
        ...options,
        mocks: {
            $api: {
                getSpaceRecommendList: () => axios.get('/spaceRecommend'),
                saveSpaceRecommend: () => axios.post('/spaceRecommend'),
            }
        }
    })

    // dialog add and edit and cancel start
    it('click new space button and cancel button', async () => {
        wrapper.findAll('.el-button').filter(w => w.text() === '').at(0).trigger('click')
        expect(wrapper.find(AddDialog).vm.dialogFormVisible).toBe(true)

        await wrapper.vm.$nextTick()

        wrapper.findAll('.el-button').filter(w => w.text() === '取消').at(0).trigger('click')
        expect(wrapper.find(AddDialog).vm.dialogFormVisible).toBe(false)
    })

    it('click save button emit event', async () => {
        wrapper.findAll('.el-button').filter(w => w.text() === '').at(0).trigger('click')
        wrapper.find(AddDialog).setData({
            form: {
                space_id: '测试____123'
            }
        })
        await wrapper.find(AddDialog).vm.$emit('handleAction')
        expect(wrapper.find(AddDialog).emitted()['handleAction']).toBeTruthy()
    })
    // dialog add and edit and cancel end
})