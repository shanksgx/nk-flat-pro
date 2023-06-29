import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{tsx,ts,css,html}'],
    exclude: ['node_modules', '.git', '.next']
  }
})
