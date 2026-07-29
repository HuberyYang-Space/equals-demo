import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetWind3,
} from 'unocss'
import { equalityMeta } from './src/utils/equality'

export default defineConfig({
  // equalityMeta 里的 class/icon 只出现在 src/utils/equality.ts 这个普通 .ts 文件里，
  // 不在 UnoCSS 默认扫描的 .vue/.tsx 模板范围内，需要显式加入 safelist 才能生成对应样式
  safelist: Object.values(equalityMeta).flatMap(meta => [meta.class, meta.icon]),
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
