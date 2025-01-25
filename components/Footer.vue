<script setup lang="ts">
</script>

<template>
  <footer class="mt-8 text-center">
    <div class=" is-rounded inline-block px-6">
      <p :class="['flex items-center gap-2']">
        Made by <i class="nes-icon is-small heart"/> <a target="_blank" href="https://x.com/hellokaton">hellokaton</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.dark .nes-container {
  @apply border-white;
}

.dark .nes-icon.heart::before {
  color: #ff0000;
}

.nes-icon.heart::before {
  color: #ff0000;
}
</style>
