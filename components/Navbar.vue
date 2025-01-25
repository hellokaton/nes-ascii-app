<script setup lang="ts">
const colorMode = useColorMode()

// 使用 composable 来处理主题切换
const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
}

// 使用计算属性获取主题图标
const themeIcon = computed(() => colorMode.value === 'light' ? '🌞' : '🌙')

// 使用 useHead 来管理动态主题相关的 meta 标签
useHead({
  htmlAttrs: {
    class: computed(() => colorMode.value)
  },
  meta: [
    {
      name: 'color-scheme',
      content: computed(() => colorMode.value)
    }
  ]
})
</script>

<template>
  <header class="flex justify-between items-center mb-8">
    <NuxtLink to="/" class="nes-text is-error text-2xl">
      字符画生成器
    </NuxtLink>
    
    <ClientOnly>
      <button 
        class="nes-btn is-error" 
        @click="toggleColorMode"
        :aria-label="colorMode.preference === 'light' ? '切换到深色模式' : '切换到浅色模式'"
      >
        {{ themeIcon }}
      </button>
    </ClientOnly>
  </header>
</template>

<style scoped>
.nes-btn.is-error {
  @apply hover:opacity-90 transition-opacity duration-200;
}

.dark .nes-btn.is-error {
  @apply bg-red-600;
}

@media (max-width: 640px) {
  .nes-btn {
    @apply p-2;
  }
}
</style>
