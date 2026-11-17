import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const reviewSchema = z.object({
  authorName: z.string().trim().min(2, "Ім'я має містити щонайменше 2 символи").max(50),
  rating: z.coerce.number().min(1, 'Мінімум 1').max(5, 'Максимум 5'),
  reviewText: z.string().trim().min(10, 'Мінімум 10 символів').max(500),
})

export default function ReviewForm({ productName }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { authorName: '', rating: '', reviewText: '' },
  })

  const onSubmit = (data) => {
    console.log('Відгук:', data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 rounded-card border border-line bg-white p-6 shadow-card" noValidate>
      <h3 className="mb-4 font-display text-lg font-bold text-ink">
        Залишити відгук про <span className="text-clay-600">{productName}</span>
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="authorName" className="mb-1 block text-sm font-medium text-ink">Ваше ім'я</label>
          <input
            id="authorName"
            {...register('authorName')}
            aria-invalid={!!errors.authorName}
            className="w-full rounded-lg border border-edge bg-paper px-4 py-2 text-sm text-ink outline-none transition-colors aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50 focus:border-clay-600 focus:ring-1 focus:ring-clay-600"
          />
          {errors.authorName && <p className="mt-1 text-xs text-red-500">{errors.authorName.message}</p>}
        </div>

        <div>
          <label htmlFor="rating" className="mb-1 block text-sm font-medium text-ink">Оцінка (1-5)</label>
          <select
            id="rating"
            {...register('rating')}
            aria-invalid={!!errors.rating}
            className="w-full rounded-lg border border-edge bg-paper px-4 py-2 text-sm text-ink outline-none transition-colors aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50 focus:border-clay-600 focus:ring-1 focus:ring-clay-600"
          >
            <option value="">Оберіть...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating.message}</p>}
        </div>

        <div>
          <label htmlFor="reviewText" className="mb-1 block text-sm font-medium text-ink">Текст відгуку</label>
          <textarea
            id="reviewText"
            {...register('reviewText')}
            rows="3"
            aria-invalid={!!errors.reviewText}
            className="w-full rounded-lg border border-edge bg-paper px-4 py-2 text-sm text-ink outline-none transition-colors aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50 focus:border-clay-600 focus:ring-1 focus:ring-clay-600"
          ></textarea>
          {errors.reviewText && <p className="mt-1 text-xs text-red-500">{errors.reviewText.message}</p>}
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="mt-4 rounded-lg bg-clay-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-clay-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Надсилання...' : 'Надіслати'}
      </button>
      
      {isSubmitSuccessful && <p className="mt-2 text-sm text-green-600">Дякуємо за ваш відгук!</p>}
    </form>
  )
}

ReviewForm.propTypes = {
  productName: PropTypes.string.isRequired,
}
