<template>
  <div class="api">
    <ElInput v-if="$props.value.editMod" class="api-alias" v-model="$props.value.alias" />
    <ElTag v-else class="api-alias ellipsis" type="primary" size="large">
      {{ $props.value.alias }}
    </ElTag>

    <ElSelect v-if="$props.value.editMod" class="api-method" v-model="$props.value.method">
      <ElOption
        v-for="item in httpMethods"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ElSelect>
    <ElTag v-else class="api-method" :type="methodTagType($props.value.method)" size="large">{{
      $props.value.method
    }}</ElTag>

    <ElInput
      v-if="$props.value.editMod"
      class="api-url"
      v-model="$props.value.url"
      @change="onUrlChane"
    />
    <ElTag v-else class="api-url ellipsis" type="primary" size="large">
      {{ $props.value.url }}
    </ElTag>

    <ElButtonGroup class="api-opt">
      <!-- <ElButton :icon="Edit" :type="$props.value.editMod ? 'success' : 'primary'" @click="onUpdate">
        {{ $props.value.editMod ? '保存' : '修改' }}
      </ElButton> -->

      <template v-if="$props.value.editMod">
        <ElButton :icon="Edit" type="success" @click="onUpdate">保存</ElButton>
        <ElButton :icon="Delete" type="info" @click="$props.value.editMod = false"> 取消 </ElButton>
      </template>

      <template v-else>
        <ElButton :icon="Edit" type="primary" @click="onUpdate" />
        <ElButton :icon="Delete" type="warning" @click="onRemove" />
        <ElButton :icon="DocumentCopy" type="info" @click="onCopyToClipboard" />
        <ElButton :icon="MoreFilled" @click="onResponse" />
      </template>
    </ElButtonGroup>
  </div>
</template>

<script setup lang="ts">
import {
  ElButton,
  ElTag,
  ElInput,
  ElButtonGroup,
  ElSelect,
  ElOption,
  ElMessageBox,
  ElMessage,
} from 'element-plus'
import { Delete, Edit, MoreFilled, DocumentCopy } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { copyToClipboard, methodTagType } from '@/libs'

const $props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      url: '无',
      method: 'GET',
      alias: '无',
    }),
  },
  value: {
    type: Object,
    default: () => ({
      url: '无',
      method: 'GET',
      alias: '无',
      editMod: false,
    }),
  },
})

const $emit = defineEmits(['update:modelValue', 'save', 'remove', 'response'])

const httpMethods = ref([
  { value: 'get', label: 'GET' },
  { value: 'post', label: 'POST' },
  { value: 'put', label: 'PUT' },
  { value: 'delete', label: 'DELETE' },
])

const onUpdate = () => {
  $props.value.editMod = !$props.value.editMod
  if ($props.value.editMod === false) {
    $emit('save', $props.value)
  }
}

const onRemove = async () => {
  await ElMessageBox.confirm('确定删除接口吗', { type: 'warning' })
  $emit('remove', $props.value)
}
const onResponse = () => {
  $emit('response', $props.value)
}

const onUrlChane = (url: string) => {
  console.log('🚀 ~ onUrlChane ~ url:', url)
  if (!url) return
  // 补 /
  if (!url.startsWith('/')) {
    $props.value.url = '/' + $props.value.url
  }
  // 去除 query 参数
  $props.value.url = $props.value.url.split('?')[0]
}

const onCopyToClipboard = async () => {
  const port = '9468'
  let origin = window.location.origin
  origin = origin.replace(window.location.port, port)
  const str = origin + $props.value.url

  const result = await copyToClipboard(str)
  if (result) {
    ElMessage.success('复制成功')
  } else {
    ElMessage.warning('复制失败')
  }
}
</script>

<style scoped>
.l {
  outline: 1px solid red;
}
.api {
  display: flex;
  gap: 0.8rem;
}

.api-alias {
  width: 12rem;
  justify-content: flex-start;
}

.api-method {
  width: 7rem;
}

.api-url {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.api-opt {
  /* margin-left: auto; */
  width: 11.5rem;
}

.ellipsis {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}
</style>
