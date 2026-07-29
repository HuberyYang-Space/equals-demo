<script setup lang='ts'>
import type { Value } from '~/types'

const state = shallowRef(Array.from({ length: colValue.length }, () => Array.from({ length: rowValue.length })))
const {
  main,
  offsetX,
  offsetY,
  scaleX,
  scaleY,
  isGuideLineShow,
  onBoxMouseEnter,
  onBoxMouseLeave,
} = useGuidesStyle()

function matchVal(value: Value) {
  if (typeof value === 'string')
    return `"${value}"`
  if (value === undefined || value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY || Object.is(value, Number.NaN))
    return `${value}`
  return JSON.stringify(value)
}

const currentPos = ref<{ x?: number, y?: number }>({})

function onBlockMouseEnter(x: number, y: number) {
  currentPos.value = { x, y }
}
</script>

<template>
  <div ma w-fit flex items-end>
    <div flex="~ col items-end" mr-2.5>
      <span v-for="(value, i) in colValue" :key="i" :class="[i === currentPos.y && isGuideLineShow ? 'active' : '']" border="2 transparent" block min-h-6.5 min-w-6 transition-color-100 m=".25">{{ matchVal(value) }}</span>
    </div>
    <div>
      <div>
        <span v-for="(value, i) in rowValue" :key="i" :class="[i === currentPos.x && isGuideLineShow ? 'active' : '']" border="2 transparent" inline-block min-h-6 min-w-6.5 transition-color-100 vertical-text m=".25">{{ matchVal(value) }}</span>
      </div>
      <div ref="main" relative w-fit @mouseenter="onBoxMouseEnter" @mouseleave="onBoxMouseLeave">
        <TransitionGroup>
          <div v-if="isGuideLineShow" :style="{ transform: `translateY(${offsetY}px) scaleX(${scaleX})`, transformOrigin: 'left', willChange: 'transform' }" pointer-events-none absolute left-0 top-0 z-10 h-.5 w-full bg-red />
          <div v-if="isGuideLineShow" :style="{ transform: `translateX(${offsetX}px) scaleY(${scaleY})`, transformOrigin: 'top', willChange: 'transform' }" pointer-events-none absolute left-0 top-0 z-10 h-full w-.5 bg-red />
        </TransitionGroup>
        <div w-fit overflow-auto>
          <div v-for="(row, y) in state" :key="y" ma w-max flex items-center justify-center>
            <ValueBlock v-for="(_, x) in row" :key="x" :kind="getEqualityKind(rowValue[x], colValue[y])" @mouseenter="onBlockMouseEnter(x, y)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.active {
  color: rgba(248, 113, 113, 1);
}
</style>
