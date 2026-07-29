export function useGuidesStyle() {
  const main = ref<HTMLDivElement | null>()
  const { x, y } = useMouse()
  const throttledX = useThrottle(x, 16)
  const throttledY = useThrottle(y, 16)
  const { left, top } = useElementBounding(main)
  const offsetX = computed(() => throttledX.value - left.value)
  const offsetY = computed(() => throttledY.value - top.value)

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
    isGuideLineShow,
    onBoxMouseEnter,
    onBoxMouseLeave,
  }
}
