import { useNavigate, useOutletContext } from 'react-router'
import ReviewForm from '@/components/ReviewForm/ReviewForm'

export default function ProductReviewPage() {
  // Варіант 11: отримуємо дані про товар з контексту батьківського Outlet
  const { productName, productId } = useOutletContext()
  const navigate = useNavigate()

  const handleSubmit = (data) => {
    // У реальному застосунку тут був би POST /api/reviews
    console.log('Review submitted:', data)
    // Після успішного сабміту — перехід назад на сторінку товару
    navigate(`/product/${productId}`)
  }

  return (
    <section className="mt-8 border-t border-ink-300/30 pt-8">
      <h2 className="mb-4 text-xl font-bold text-ink-900">Залишити відгук</h2>
      <p className="mb-6 text-ink-500">Ваш відгук про «{productName}»</p>
      <ReviewForm productName={productName} onReviewSubmit={handleSubmit} />
    </section>
  )
}
