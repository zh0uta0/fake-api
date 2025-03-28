<template>
  <div class="api">
    <ElInput v-if="$props.value.editMod" class="api-alias" v-model="$props.value.alias" />
    <ElTag v-else class="api-alias ellipsis" type="primary" size="large">{{
      $props.value.alias
    }}</ElTag>

    <ElInput v-if="$props.value.editMod" class="api-method" v-model="$props.value.method" />
    <ElTag v-else class="api-method" size="large">{{ $props.value.method }}</ElTag>

    <ElInput v-if="$props.value.editMod" class="api-url" v-model="$props.value.url" />
    <ElTag v-else class="api-url ellipsis" type="primary" size="large">
      {{ $props.value.url }}
    </ElTag>

    <div class="api-opt">
      <ElButton :icon="Edit" :type="$props.value.editMod ? 'success' : 'primary'" @click="onUpdate">
        {{ $props.value.editMod ? '保存' : '修改' }}
      </ElButton>

      <ElButton :icon="Delete" type="danger" @click="onRemove">删除</ElButton>
      <ElButton type="success" @click="onResponse">返回值</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton, ElTag, ElInput } from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'

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

const onUpdate = () => {
  $props.value.editMod = !$props.value.editMod
  if ($props.value.editMod === false) {
    $emit('save', $props.value)
  }
}

const onRemove = () => {
  $emit('remove', $props.value)
}
const onResponse = () => {
  $emit('response', $props.value)
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
  width: 4.5rem;
}

.api-url {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.api-opt {
  /* margin-left: auto; */
}

.ellipsis {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}
</style>
