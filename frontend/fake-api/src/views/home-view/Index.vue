<script setup lang="ts">
import ApiCpt from '@/views/home-view/Api.vue'
import { Plus } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'
import { ref } from 'vue'

import { type Api } from '@/types/model'
import * as reqApi from '@/apis/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const apiList = ref<Api[]>([])

initApis()

const onApiSave = async (value: Api) => {
  console.log('onApiSave - 点击保存 value', value)
  // 创建新的api
  if (value.temp) {
    // 发送请求保存数据，
    const { id, editMod, temp, ...api } = value
    await reqApi.create(api)

    initApis()
  } else {
    // 修改api
    const { id, url, method, alias } = value
    await reqApi.update({ id, url, method, alias })
    initApis()
  }
}

const onApiCreate = () => {
  apiList.value.unshift({
    id: Date.now(),
    alias: '',
    url: '',
    method: 'get',
    editMod: true,
    temp: true,
  })
}

const onApiDelete = async (value: Api) => {
  const { id } = value
  await reqApi.remove(id)
  initApis()
}

const onResponse = async (value: Api) => {
  console.log('🚀 ~ onResponse ~ router:', router)
  router.push(`/${value.id}/res`)
}

async function initApis() {
  // 请求获取所有api
  const data = await reqApi.getAll()
  apiList.value = data
}
</script>

<template>
  <main class="min-h-screen bg-gray-50 p-4">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="text-xl font-medium">返回值列表</div>
      <div class="text-right">
        <ElButton type="primary" :icon="Plus" @click="onApiCreate"></ElButton>
      </div>
      <ApiCpt
        v-for="item in apiList"
        :key="item.id"
        :value="item"
        @save="onApiSave"
        @remove="onApiDelete"
        @response="onResponse"
        style="margin: 1rem 0"
      />
    </div>
  </main>
</template>
