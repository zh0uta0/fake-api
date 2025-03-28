<script setup lang="ts">
import ApiCpt from '@/components/Api.vue'
import { Plus } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'
import { ref } from 'vue'

import { type Api } from '@/types/model'
import { getApis, createApi, updateApi, deleteApi } from '@/apis/api'
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
    await createApi(api)

    initApis()
  } else {
    // 修改api
    const { id, url, method, alias } = value
    await updateApi({ id, url, method, alias })
    initApis()
  }
}

const onApiCreate = () => {
  apiList.value.unshift({
    id: Date.now(),
    alias: '',
    url: '',
    method: '',
    editMod: true,
    temp: true,
  })
}

const onApiDelete = async (value: Api) => {
  const { id } = value
  await deleteApi(id)
  initApis()
}

const onResponse = async (value: Api) => {
  console.log('🚀 ~ onResponse ~ router:', router)
  router.push(`/${value.id}/res`)
}

async function initApis() {
  // 请求获取所有api
  const data = await getApis()
  apiList.value = data
}
</script>

<template>
  <main>
    <ElButton type="primary" :icon="Plus" @click="onApiCreate">添加</ElButton>
    <ApiCpt
      v-for="item in apiList"
      :key="item.id"
      :value="item"
      @save="onApiSave"
      @remove="onApiDelete"
      @response="onResponse"
      style="margin: 1rem 0"
    />

    <ul>
      <li v-for="item in apiList" :key="item.id">{{ item }}</li>
    </ul>
  </main>
</template>
