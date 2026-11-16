# CraftMarket

Наскрізний проєкт з дисципліни «Веб-дизайн та веб-програмування (React)».

## Лабораторна робота №2. Компонент картки товару (ProductCard)

### Контракт props компонента `ProductCard`

Компонент приймає наступні пропси:

| Назва | Тип | Обов'язковий | За замовчуванням | Опис |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `string` | Так | — | Назва товару |
| `price` | `number` | Так | — | Ціна товару в гривнях |
| `image` | `string` | Ні | `placeholder.svg` | URL-адреса зображення товару |
| `category` | `string` | Так | — | Категорія товару |
| `inStock` | `boolean` | Ні | `true` | Ознака наявності товару |
| `onSale` | `boolean` | Ні | `false` | Ознака того, що товар на розпродажі (відображається бейдж для категорії "Кераміка") |

### Використання

```jsx
import ProductCard from '@/components/ProductCard/ProductCard'

<ProductCard 
  name="Ваза керамічна" 
  price={450} 
  category="Кераміка" 
  onSale={true} 
/>
