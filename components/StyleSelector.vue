<script setup lang="ts">
import type { Style } from '~/types'

defineProps<{
  modelValue: Style
  styles: Style[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Style]
}>()
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold flex items-center gap-2">
      <span class="text-2xl">🎨</span>
      选择你喜欢的风格
    </h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div
          v-for="style in styles"
          :key="style.id"
          class="nes-container is-rounded cursor-pointer transition-colors overflow-hidden"
          :class="{
            'bg-zinc-600 dark:bg-zinc-700': modelValue.id === style.id,
          }"
          @click="emit('update:modelValue', style)"
      >
        <div class="relative">
          <h3 class="text-lg font-bold flex items-center gap-2"
              :class="{'text-white': modelValue.id === style.id}"
          >
            <span class="text-xl">{{ style.icon }}</span>
            {{ style.name }}
          </h3>
          <p class="text-sm mt-1"
             :class="modelValue.id === style.id ? 'text-gray-200' : 'text-gray-600 dark:text-gray-400'"
          >
            {{ style.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nes-container {
  margin: 0 !important;
}

.nes-container.is-dark::before {
  box-sizing: border-box;
}

.nes-container.is-rounded::before {
  box-sizing: border-box;
}
</style>
