import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetWind3,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'rounded-2 border border-color-transparent px-2 py-1 cursor-pointer transition-duration-250 transition-property-border-color bg-#f9f9f9  color-black hover:border-color-#646cff inline-block'],
  ],
  rules: [
    ['vertical-text', {
      /* 从左到右的垂直书写 */
      'writing-mode': 'vertical-lr',
      /* 文字朝向，使得文字保持正向 */
      'text-orientation': 'sideways',
      /* 防止文字换行 */
      'white-space': 'nowrap',
    }],
  ],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
