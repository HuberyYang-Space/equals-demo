export function useGuidesStyle() {
  const main = ref<HTMLDivElement | null>()
  const { x, y } = useMouse()
  const throttledX = useThrottle(x, 16)
  const throttledY = useThrottle(y, 16)
  const { left, top, width, height } = useElementBounding(main)
  const offsetX = computed(() => throttledX.value - left.value)
  const offsetY = computed(() => throttledY.value - top.value)
  // scaleX/scaleY 是引导线相对于棋盘尺寸的缩放比例，配合 transform 使用，
  // 避免在模板里直接改 width/height 触发 layout 重排
  const scaleX = computed(() => width.value ? offsetX.value / width.value : 0)
  const scaleY = computed(() => height.value ? offsetY.value / height.value : 0)

  const isGuideLineShow = ref(false)
  function onBoxMouseLeave() {
    isGuideLineShow.value = false
  }

  function onBoxMouseEnter() {
    isGuideLineShow.value = true
  }
  return {
    main,
    offsetX,
    offsetY,
    scaleX,
    scaleY,
    isGuideLineShow,
    onBoxMouseEnter,
    onBoxMouseLeave,
  }
}
