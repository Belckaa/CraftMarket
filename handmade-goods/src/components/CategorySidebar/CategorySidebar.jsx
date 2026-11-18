import { useCategories } from '@/hooks/useCategories'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { getErrorMessage } from '@/utils/getErrorMessage'

export default function CategorySidebar({ activeCategory, onSelectCategory }) {
  const { status, categories, error, retry } = useCategories()

  return (
    <div className="rounded-control border border-ink-300/30 bg-surface p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-ink-900">Категорії</h3>
      
      {status === 'loading' && <Loader label="Завантаження категорій..." />}
      
      {status === 'error' && (
        <ErrorMessage 
          title="Помилка категорій" 
          message={getErrorMessage(error)} 
          onRetry={retry} 
        />
      )}
      
      {status === 'success' && (
        <>
          {categories.length === 0 ? (
            // Варіант 6: Обробка порожнього масиву
            <p className="text-sm text-ink-500">Категорій ще немає</p>
          ) : (
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-control transition-colors ${activeCategory === 'all' ? 'bg-brand-100 text-brand-800 font-semibold' : 'hover:bg-ink-100 text-ink-600'}`}
                >
                  Всі категорії
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-control transition-colors ${activeCategory === cat.name ? 'bg-brand-100 text-brand-800 font-semibold' : 'hover:bg-ink-100 text-ink-600'}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
