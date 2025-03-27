<script setup lang="ts">
import ApiCpt from '@/components/Api.vue'
import { Plus } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'
import { ref } from 'vue'

import { type Api } from '@/types/model'
import { createApi } from '@/apis/api'

const apiList = ref<Api[]>([
  {
    id: 1,
    alias: '获取当前拉丝机头的生产信息1',
    url: '/admin-api/mes/terminal/pda/queryWireProductionInfo',
    method: 'POST',
    editMod: false,
  },
  {
    id: 2,
    alias: '获取当前拉丝机头的生产信息2',
    url: '/admin-api/mes/terminal/pda/queryWireProductionInfo',
    method: 'POST',
    editMod: false,
  },
])

const onApiSave = async (value: Api) => {
  console.log('value', value)
  if (value.temp) {
    // 发送请求保存数据，修改id，temp
    const { id, editMod, temp, ...api } = value
    const data = await createApi(api)
    console.log('data', data)
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
</script>

<template>
  <main>
    <ElButton type="primary" :icon="Plus" @click="onApiCreate">添加</ElButton>
    <ApiCpt
      v-for="item in apiList"
      :key="item.id"
      :value="item"
      @save="onApiSave"
      style="margin: 1rem 0"
    />

    <div>{{ apiList }}</div>
  </main>
</template>
