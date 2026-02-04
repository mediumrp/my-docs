import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  // Настройки Code Hike (оставьте как есть или измените позже)
  components: { code: "Code" },
}

const mdxOptions = {
  remarkPlugins: [[remarkCodeHike, chConfig]],
  recmaPlugins: [[recmaCodeHike, chConfig]],
  jsx: true,
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Эта опция КРИТИЧЕСКА важна для GitHub Pages!
  output: 'export',
  // Базовый путь для кастомного домена
  basePath: '',
  // Опция для правильной работы навигации
  trailingSlash: true,
}

// Добавляем MDX настройки в конфиг Next.js
nextConfig.pageExtensions = ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
if (nextConfig.experimental?.mdxRs) {
  nextConfig.experimental.mdxRs.options = mdxOptions
} else {
  nextConfig.experimental = { ...nextConfig.experimental, mdxRs: { options: mdxOptions } }
}

export default nextConfig