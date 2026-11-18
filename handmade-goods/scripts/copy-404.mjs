import { copyFileSync } from 'node:fs'
try {
  copyFileSync('dist/index.html', 'dist/404.html')
  console.log('dist/404.html створено')
} catch (err) {
  console.warn('Не вдалося створити 404.html:', err.message)
}
