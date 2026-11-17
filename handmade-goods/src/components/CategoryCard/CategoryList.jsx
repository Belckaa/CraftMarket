import PropTypes from 'prop-types'
import CategoryCard from './CategoryCard'

const categories = [
  { name: 'Кераміка', count: 12, icon: '🏺' },
  { name: 'Текстиль', count: 8, icon: '🧶' },
  { name: 'Дерево', count: 5, icon: '🪵' },
  { name: 'Прикраси', count: 15, icon: '💍' },
  { name: 'Свічки', count: 6, icon: '🕯️' },
  { name: 'Косметика', count: 3, icon: '🧼' },
]

export default function CategoryList({ onCategoryClick }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-ink mb-4">Категорії</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        {categories.map((c) => (
          <CategoryCard 
            key={c.name} 
            {...c} 
            onClick={() => onCategoryClick(c.name)} 
          />
        ))}
      </div>
    </div>
  )
}

CategoryList.propTypes = {
  onCategoryClick: PropTypes.func.isRequired,
}
