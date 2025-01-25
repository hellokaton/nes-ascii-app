<script setup lang="ts">
import {useAsciiArt} from '~/composables/useAsciiArt';
import StyleSelector from '~/components/StyleSelector.vue';

const {
  styles,
  inputText,
  selectedStyle,
  sceneText,
  completion,
  isLoading,
  generateText,
  copyToClipboard
} = useAsciiArt()
</script>

<template>
  <div class="min-h-screen p-4 transition-colors">
    <div class="max-w-4xl mx-auto">
      <Navbar/>

      <div class="space-y-8">
        <!-- 风格选择 -->
        <StyleSelector
            v-model="selectedStyle"
            :styles="styles"
        />

        <!-- 输入区域 -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold flex items-center gap-2">
            <span class="text-2xl">✏️</span>
            输入你想说的话
          </h2>
          
          <!-- 添加场景输入框 -->
          <div class="nes-field">
            <label for="scene_field" class="block mb-2 font-bold">
              <span class="text-xl">🎬</span> 场景描述
            </label>
            <input
              v-model="sceneText"
              type="text"
              id="scene_field"
              class="nes-input"
              placeholder="描述一下场景，比如：办公室、游戏世界、学校教室... (◕‿◕✿)"
            >
          </div>
          
          <div class="nes-field">
            <textarea
              v-model="inputText"
              class="nes-textarea"
              rows="4"
              placeholder="在这里输入你想要变成 ASCII 艺术的文字... (◕‿◕✿)"
            ></textarea>
          </div>
        </div>

        <!-- 生成按钮 -->
        <button
            class="w-full nes-btn is-primary"
            :class="{'is-disabled': isLoading}"
            @click="generateText"
            :disabled="isLoading"
        >
          <span class="flex items-center justify-center gap-2">
            <span class="text-xl">{{ isLoading ? '🤖' : '✨' }}</span>
            {{ isLoading ? '正在施展魔法...' : '开始生成' }}
          </span>
        </button>

        <!-- 生成结果 -->
        <div v-if="completion" class="space-y-4">
          <h2 class="text-2xl font-bold flex items-center gap-2">
            <span class="text-2xl">🎉</span>
            生成结果
          </h2>
          <div class="p-4 nes-container">
            <pre class="whitespace-pre-wrap">{{ completion }}</pre>
          </div>
          <button
              class="w-full nes-btn is-success"
              @click="copyToClipboard"
          >
            <span class="flex items-center justify-center gap-2">
              <span class="text-xl">📋</span>
              复制结果
            </span>
          </button>
        </div>
      </div>

      <Footer/>
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
