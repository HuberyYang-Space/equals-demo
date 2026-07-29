<script setup lang='ts'>
import type { EqualityKind } from '~/utils/equality'

defineProps<{ kind: EqualityKind }>()
</script>

<template>
  <div border="2" m=".25" flex items-center justify-center border-color-gray rounded-1 bg-gray:20 dark:border-color-gray:50 dark:bg-gray:10 hover:bg-black:50 dark:hover:bg-black:70>
    <span min-h-6 min-w-6 :class="[equalityMeta[kind].class, equalityMeta[kind].icon]" />
  </div>
</template>
