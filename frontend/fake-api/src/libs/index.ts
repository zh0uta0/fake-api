import type { ElThemeType } from '@/types/model'

export const methodTagType = (method: string) => {
  const map: Record<string, string> = {
    get: 'success',
    post: 'primary',
    put: 'warning',
    delete: 'danger',
  }
  return map[method] as ElThemeType
}

// 通用复制函数（支持现代浏览器和旧版兼容方案）
export function copyToClipboard(text: string) {
  // 方案1：使用现代 Clipboard API（推荐）
  if (navigator.clipboard) {
    return navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch((err) => {
        console.error('现代API复制失败:', err)
        return false
      })
  }

  // 方案2：兼容旧浏览器的实现
  return new Promise((resolve) => {
    try {
      // 创建临时文本域
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed' // 避免滚动跳动
      textArea.style.opacity = '0' // 隐藏元素

      // 添加到DOM
      document.body.appendChild(textArea)

      // 选择内容
      textArea.select()

      // 兼容移动端
      if (navigator.userAgent.match(/iphone|ipad|ipod/i)) {
        textArea.setSelectionRange(0, textArea.value.length)
      }

      // 执行复制命令
      const success = document.execCommand('copy')

      // 清理DOM
      document.body.removeChild(textArea)

      resolve(success)
    } catch (err) {
      console.error('旧版复制失败:', err)
      resolve(false)
    }
  })
}
