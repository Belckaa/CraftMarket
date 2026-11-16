import PropTypes from 'prop-types'
import './SearchPanel.css'

function SearchPanel({ 
  searchQuery, 
  onSearchChange, 
  category, 
  onCategoryChange, 
  minPrice, 
  onMinPriceChange, 
  maxPrice, 
  onMaxPriceChange 
}) {
  // Варіант 6: Перевірка на некоректний діапазон
  const isPriceInvalid = minPrice && maxPrice && Number(minPrice) > Number(maxPrice)

  return (
    <div className="search-panel">
      <div className="search-panel__field">
        <label htmlFor="catalog-search" className="search-panel__label">
          Пошук за назвою
        </label>
        <input
          id="catalog-search"
          type="text"
          className="search-panel__input"
          placeholder="Введіть назву товару..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="search-panel__field">
        <label htmlFor="catalog-category" className="search-panel__label">
          Категорія
        </label>
        <select
          id="catalog-category"
          className="search-panel__select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">Всі категорії</option>
          <option value="Кераміка">Кераміка</option>
          <option value="Текстиль">Текстиль</option>
          <option value="Дерево">Дерево</option>
          <option value="Свічки">Свічки</option>
          <option value="Прикраси">Прикраси</option>
        </select>
      </div>

      <div className="search-panel__field search-panel__field--price">
        <label className="search-panel__label">Ціна (₴)</label>
        <div className="search-panel__price-inputs">
          <input
            type="number"
            className={`search-panel__input ${isPriceInvalid ? 'search-panel__input--error' : ''}`}
            placeholder="Від"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
          />
          <span className="search-panel__separator">—</span>
          <input
            type="number"
            className={`search-panel__input ${isPriceInvalid ? 'search-panel__input--error' : ''}`}
            placeholder="До"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </div>
        {isPriceInvalid && (
          <p className="search-panel__error">Мін. ціна не може бути більшою за макс.</p>
        )}
      </div>
    </div>
  )
}

SearchPanel.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  minPrice: PropTypes.string.isRequired,
  onMinPriceChange: PropTypes.func.isRequired,
  maxPrice: PropTypes.string.isRequired,
  onMaxPriceChange: PropTypes.func.isRequired,
}

export default SearchPanel
