<template>
  <ElDrawer v-model="visible" :title="title" size="50%" :destroy-on-close="true">
    <div class="p-4">
      <ElForm :model="mode" label-width="80px">
        <ElFormItem label="别名">
          <ElInput v-model="mode.alias" />
        </ElFormItem>
        <ElFormItem label="启用状态">
          <ElSwitch v-model="mode.enable" />
        </ElFormItem>
        <ElFormItem label="Content">
          <ElInput
            v-model="mode.content"
            type="textarea"
            :rows="15"
            placeholder="请输入JSON格式的content内容"
          />
        </ElFormItem>
      </ElForm>

      <div class="flex justify-end mt-4 space-x-3">
        <ElButton @click="visible = false">取消</ElButton>
        <ElButton type="primary" @click="handleSave">保存</ElButton>
      </div>
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ElButton, ElDrawer, ElForm, ElFormItem, ElInput, ElMessage, ElSwitch } from 'element-plus'
import { type ResSchema } from '../../types/model'

const $emits = defineEmits(['confirm'])

const visible = defineModel('visible', { default: false })
const mode = defineModel<ResSchema>({ required: true })
const { title = '创建' } = defineProps<{ title: string }>()

const handleSave = () => {
  visible.value = false
  $emits('confirm')
}
</script>
