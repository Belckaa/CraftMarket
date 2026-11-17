import PropTypes from 'prop-types'

export default function FilterSidebar({ isOpen, onClose, query, setQuery, category, setCategory, sorting, setSorting }) {
  const categories = ['Усі категорії', 'Кераміка', 'Текстиль', 'Прикраси', 'Свічки']

  return (
    <>
      {/* Мобільна підкладка */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Сама панель */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-white p-6 shadow-xl transform transition-transform duration-300 ease-in-out
        lg:static lg:w-64 lg:shadow-none lg:border lg:border-line lg:rounded-card lg:translate-x-0 lg:z-0 lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full hidden lg:block'}
      `}>
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-lg font-bold text-ink">Фільтри</h2>
          <button onClick={onClose} className="text-ink-muted hover:text-ink">✕</button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Пошук</label>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Назва товару..."
              className="w-full h-11 rounded-lg border border-edge bg-paper px-3 text-base text-ink focus:border-clay-600 focus:outline-none focus:ring-1 focus:ring-clay-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">Категорія</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 rounded-lg border border-edge bg-white px-3 text-base text-ink focus:border-clay-600 focus:outline-none focus:ring-1 focus:ring-clay-600"
            >
              {categories.map((c) => (
                <option key={c} value={c === 'Усі категорії' ? 'all' : c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">Сортування</label>
            <select
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
              className="w-full h-11 rounded-lg border border-edge bg-white px-3 text-base text-ink focus:border-clay-600 focus:outline-none focus:ring-1 focus:ring-clay-600"
            >
              <option value="default">За замовчуванням</option>
              <option value="price-asc">Спочатку дешевші</option>
              <option value="price-desc">Спочатку дорожчі</option>
            </select>
          </div>
        </div>
      </aside>
    </>
  )
}

FilterSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  sorting: PropTypes.string.isRequired,
  setSorting: PropTypes.func.isRequired,
}
