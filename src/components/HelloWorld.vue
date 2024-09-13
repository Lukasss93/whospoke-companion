<script setup lang="ts">
import { ref } from 'vue'

//defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h2 class="text-2xl">
      <slot/>
  </h2>

  <div class="p-2">
      <button type="button" class="my-2" @click="count++">{{ count }}</button>
  </div>
</template>

<style scoped>
</style>
