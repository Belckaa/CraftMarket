import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema } from '@/schemas/reviewSchema'
import './ReviewForm.css'

function ReviewForm({ productName, onReviewSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { authorName: '', rating: '', reviewText: '' },
  })

  const onSubmit = (data) => {
    onReviewSubmit(data)
    reset()
  }

  return (
    <div className="review-container">
      {/* Варіант 11: Виводимо назву товару в заголовку */}
      <h3 className="review-title">
        Залишити відгук про <span className="review-product-name">{productName}</span>
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="review-form">
        <div className="review-field">
          <label htmlFor="authorName" className="review-label">Ваше ім'я</label>
          <input
            id="authorName"
            type="text"
            {...register('authorName')}
            className={`review-input ${errors.authorName ? 'review-input--error' : ''}`}
            placeholder="Введіть ваше ім'я"
          />
          {errors.authorName && <p role="alert" className="review-error">{errors.authorName.message}</p>}
        </div>

        <div className="review-field">
          <label htmlFor="rating" className="review-label">Оцінка</label>
          <select
            id="rating"
            {...register('rating')}
            className={`review-input ${errors.rating ? 'review-input--error' : ''}`}
          >
            <option value="" disabled>Оберіть оцінку</option>
            <option value="1">1 - Жахливо</option>
            <option value="2">2 - Погано</option>
            <option value="3">3 - Задовільно</option>
            <option value="4">4 - Добре</option>
            <option value="5">5 - Відмінно</option>
          </select>
          {errors.rating && <p role="alert" className="review-error">{errors.rating.message}</p>}
        </div>

        <div className="review-field">
          <label htmlFor="reviewText" className="review-label">Текст відгуку</label>
          <textarea
            id="reviewText"
            rows={4}
            {...register('reviewText')}
            className={`review-input ${errors.reviewText ? 'review-input--error' : ''}`}
            placeholder="Що вам сподобалося або не сподобалося?"
          />
          {errors.reviewText && <p role="alert" className="review-error">{errors.reviewText.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="review-submit">
          {isSubmitting ? 'Надсилання…' : 'Залишити відгук'}
        </button>

        {isSubmitSuccessful && (
          <p className="review-success">Дякуємо за ваш відгук!</p>
        )}
      </form>
    </div>
  )
}

ReviewForm.propTypes = {
  productName: PropTypes.string.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
}

export default ReviewForm
