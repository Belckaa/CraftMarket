import PropTypes from 'prop-types'
import { Input } from '@/components/ui'

function SearchPanel({ 
  searchQuery, onSearchChange, 
  category, onCategoryChange, 
  minPrice, onMinPriceChange, 
  maxPrice, onMaxPriceChange, 
  sortBy, onSortChange 
}) {
  const isPriceInvalid = minPrice && maxPrice && Number(minPrice) > Number(maxPrice)

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 rounded-control border border-ink-300/30 bg-surface p-6 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
      <Input
        label="Пошук за назвою"
        placeholder="Введіть назву товару..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Input
        as="select"
        label="Категорія"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">Всі категорії</option>
        <option value="Кераміка">Кераміка</option>
        <option value="Текстиль">Текстиль</option>
        <option value="Дерево">Дерево</option>
        <option value="Свічки">Свічки</option>
        <option value="Прикраси">Прикраси</option>
      </Input>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-ink-900">Ціна (₴)</label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Від"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            error={isPriceInvalid ? ' ' : undefined}
          />
          <span className="text-ink-500">—</span>
          <Input
            type="number"
            placeholder="До"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            error={isPriceInvalid ? ' ' : undefined}
          />
        </div>
        {isPriceInvalid && <p className="text-sm font-medium text-danger-600 mt-1">Мін. ціна не може бути більшою за макс.</p>}
      </div>

      <Input
        as="select"
        label="Сортування"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">За замовчуванням</option>
        <option value="name-asc">Назва (А-Я)</option>
        <option value="price-asc">Ціна (від дешевих)</option>
        <option value="price-desc">Ціна (від дорогих)</option>
      </Input>
    </div>
  )
}

SearchPanel.propTypes = {
  searchQuery: PropTypes.string.isRequired, onSearchChange: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired, onCategoryChange: PropTypes.func.isRequired,
  minPrice: PropTypes.string.isRequired, onMinPriceChange: PropTypes.func.isRequired,
  maxPrice: PropTypes.string.isRequired, onMaxPriceChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired, onSortChange: PropTypes.func.isRequired,
}

export default SearchPanel
