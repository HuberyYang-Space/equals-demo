import gsap from 'gsap'

export function useGuidesStyle() {
  const main = ref<HTMLDivElement | null>()
  const hLine = ref<HTMLDivElement | null>()
  const vLine = ref<HTMLDivElement | null>()
  const { left, top, width, height } = useElementBounding(main)

  const isGuideLineShow = ref(false)
  function onBoxMouseLeave() {
    isGuideLineShow.value = false
  }

  function onBoxMouseEnter() {
    isGuideLineShow.value = true
  }

  // 绕开 Vue 响应式链路：mousemove 只缓存坐标，真正的样式写入放进 rAF，
  // 每帧只执行一次 gsap.quickSetter，避免高轮询率鼠标一帧内多次触发响应式更新
  let pendingX = 0
  let pendingY = 0
  let rafId = 0
  let setHLineY: (value: number) => void
  let setHLineScaleX: (value: number) => void
  let setVLineX: (value: number) => void
  let setVLineScaleY: (value: number) => void

  function applyGuideLinePosition() {
    rafId = 0
    const offsetX = pendingX - left.value
    const offsetY = pendingY - top.value
    setHLineY(offsetY)
    setHLineScaleX(width.value ? offsetX / width.value : 0)
    setVLineX(offsetX)
    setVLineScaleY(height.value ? offsetY / height.value : 0)
  }

  function onBoxMouseMove(e: MouseEvent) {
    pendingX = e.clientX
    pendingY = e.clientY
    if (!rafId)
      rafId = requestAnimationFrame(applyGuideLinePosition)
  }

  onMounted(() => {
    // hLine/vLine 是常驻元素（不再走 v-if 挂载/卸载），挂载后必定存在
    setHLineY = gsap.quickSetter(hLine.value!, 'y', 'px') as (value: number) => void
    setHLineScaleX = gsap.quickSetter(hLine.value!, 'scaleX') as (value: number) => void
    setVLineX = gsap.quickSetter(vLine.value!, 'x', 'px') as (value: number) => void
    setVLineScaleY = gsap.quickSetter(vLine.value!, 'scaleY') as (value: number) => void
  })

  onBeforeUnmount(() => {
    if (rafId)
      cancelAnimationFrame(rafId)
  })

  return {
    main,
    hLine,
    vLine,
    isGuideLineShow,
    onBoxMouseEnter,
    onBoxMouseLeave,
    onBoxMouseMove,
  }
}
